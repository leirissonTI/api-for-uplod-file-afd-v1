import { IEspelhoMensal } from '../interfaces/IEspelhoMensal'
import { prisma } from '../config/prisma'
import { IEspelhoDiario } from '../interfaces/IEspelhoDiario'
import { IStatusDia } from '../interfaces/IStatusDia'
import { AppError } from '../utils/app-erro'
import { getDiasUteis } from '../utils/getDiasUteis'
import { EspelhoDiario, Prisma } from '../generated/prisma'

export class EspelhoPontoService {

    async getEspelhoDiario() {
        const espelhoDiario = prisma.espelhoDiario.findMany()
        return espelhoDiario
    }

    async getEspelhoDiarioPorMes(cpf: string, inicioDoMes: Date) {
        try {
            // Extrair mês e ano da data fornecida e aceitar ambos formatos (MM/YYYY e M/YYYY)
            const mesNumero = inicioDoMes.getMonth() + 1;
            const anoNumero = inicioDoMes.getFullYear();
            const mesAnoComZero = `${String(mesNumero).padStart(2, '0')}/${anoNumero}`;
            const mesAnoSemZero = `${mesNumero}/${anoNumero}`;

            // Buscar registros no banco com CPF e filtro no campo `mesAno`
            const registros = await prisma.espelhoDiario.findMany({
                where: {
                    cpf: cpf,
                    mesAno: { in: [mesAnoComZero, mesAnoSemZero] }
                },
                orderBy: {
                    data: 'asc'
                }
            });

            return registros

        } catch (error: any) {
            throw new AppError(`Erro ao tentar resgatar os pontos do mês, mensagem: ${error.message}`)
        }
    }

    async getEspelhomensal() {
        const espelhoMensal = prisma.espelhoMensal.findMany()
        return espelhoMensal
    }

    async getEspelhoFormado(cpf: string, mes: string | number, ano: string | number) {
        // Função auxiliar para formatar mês/ano como "MM/AAAA"
        function formatarMesAno(mes: string | number, ano: string | number): string {
            const numeroMes = Number(mes);
            const numeroAno = Number(ano);

            if (!Number.isInteger(numeroMes) || numeroMes < 1 || numeroMes > 12) {
                throw new Error(`Mês inválido: ${mes}. Deve estar entre 01 e 12.`);
            }

            if (!Number.isInteger(numeroAno) || numeroAno < 1000 || numeroAno > 9999) {
                throw new Error(`Ano inválido: ${ano}. Deve ter 4 dígitos.`);
            }

            const mesFormatado = String(numeroMes).padStart(2, '0');
            return `${mesFormatado}/${numeroAno}`;
        }

        // Validação simples de CPF (apenas tamanho)
        function validarCPF(cpf: string): boolean {
            const cpfLimpo = cpf.replace(/\D/g, '');
            return cpfLimpo.length === 11;
        }

        if (!validarCPF(cpf)) {
            throw new AppError('CPF inválido.');
        }

        const mesAno = formatarMesAno(mes, ano);



        try {
            const registros = await
                prisma.$queryRaw(
                    Prisma.sql`
                SELECT * FROM espelho_de_atual
                WHERE cpf = ${cpf} AND mes_ano = ${mesAno}
                LIMIT 1
                `);

            if (!registros) {
                return null  // Nenhum registro encontrado
            }
            return registros;

        } catch (error: any) {
            console.error('Erro ao executar consulta SQL:', error);
            throw new AppError('Erro ao tentar resgatar os pontos do mês.', error);
        }
    }

    async gerarEspelhoMensal(cpf: string, inicioDoMes: Date, inicioDoProximoMes: Date): Promise<void> {
        try {
            // Busca de registros do banco
            const registros = await prisma.marcacoesRelogio.findMany({
                where: {
                    cpfEmpregado: cpf,
                    dataCompleta: {
                        gte: inicioDoMes,
                        lt: inicioDoProximoMes,
                    },
                },
                orderBy: {
                    dataCompleta: 'asc', // Ordenar ascendente para consistência
                },
            });

            const diasAgrupados = this.agruparPorDia(registros);
            const mesAno = this.getMesAno(inicioDoMes);
            const espelhosDiarios: IEspelhoDiario[] = [];

            // Gera todas as datas do mês
            const todasAsDatas = this.gerarTodasDatasDoMes(inicioDoMes);

            for (const data of todasAsDatas) {
                const dataStr = this.formatarData(data, 'DD/MM/YYYY');

                // Verifica se tem marcação para esse dia
                const marcas = diasAgrupados[dataStr] || [];

                let espelhoDiario: IEspelhoDiario;

                if (marcas.length > 0) {
                    // Processa como dia com marcação
                    espelhoDiario = this.processarDia(cpf, mesAno, dataStr, marcas as any[]);
                } else {
                    // Processa como dia sem marcação (ex: sábado, domingo ou folga)
                    const diaDaSemana = data.getDay(); // 0 (domingo) a 6 (sábado)
                    const status: IStatusDia = [0, 6].includes(diaDaSemana) ? 'Folga' : 'Sem Registro';
                    // const status: IStatusDia = [0, 6].includes(diaDaSemana) ? 'Folga' : 'Ausente';

                    espelhoDiario = {
                        cpf,
                        diaDoMes: this.formatarData(data, 'Extenso'),
                        credito: this.formatarDecimal(0),
                        debito: this.formatarDecimal(0),
                        horasNormais: this.formatarDecimal(0),
                        horasExtras: this.formatarDecimal(0),
                        saldo: this.formatarDecimal(0),
                        motivoReajuste: '',
                        data: dataStr,
                        primeiraEntrada: null,
                        primeiraSaida: null,
                        segundaEntrada: null,
                        segundaSaida: null,
                        horasTrabalhadas: this.formatarDecimal(0),
                        observacoes: 'Dia sem marcação registrada',
                        horasAlmoco: 0,
                        bancoDeHoras: 0,
                        origem: '',
                        status,
                        mesAno
                    };
                }

                espelhosDiarios.push(espelhoDiario);
            }

            // Otimização: Usar transaction para melhor performance e consistência
            await prisma.$transaction(async (tx) => {
                // Limpa os espelhos diários existentes
                await tx.espelhoDiario.deleteMany({
                    where: {
                        cpf,
                        mesAno,
                    },
                });

                // Insere todos os espelhos diários
                if (espelhosDiarios.length > 0) {
                    await tx.espelhoDiario.createMany({
                        data: espelhosDiarios.map((d: IEspelhoDiario) => ({
                            cpf: d.cpf,
                            mesAno: d.mesAno,
                            data: d.data, // Já está formatado como string
                            diaDoMes: d.diaDoMes,
                            credito: typeof d.credito === 'number' ? this.formatarDecimal(d.credito) : d.credito,
                            debito: typeof d.debito === 'number' ? this.formatarDecimal(d.debito) : d.debito,
                            horasNormais: typeof d.horasNormais === 'number' ? this.formatarDecimal(d.horasNormais) : d.horasNormais,
                            horasExtras: typeof d.horasExtras === 'number' ? this.formatarDecimal(d.horasExtras) : d.horasExtras,
                            saldo: typeof d.saldo === 'number' ? this.formatarDecimal(d.saldo) : d.saldo,
                            motivoReajuste: d.motivoReajuste || '',
                            primeiraEntrada: d.primeiraEntrada,
                            primeiraSaida: d.primeiraSaida,
                            segundaEntrada: d.segundaEntrada,
                            segundaSaida: d.segundaSaida,
                            horasTrabalhadas: typeof d.horasTrabalhadas === 'number' ? this.formatarDecimal(d.horasTrabalhadas) : d.horasTrabalhadas,
                            observacoes: d.observacoes,
                            horasAlmoco: d.horasAlmoco,
                            bancoDeHoras: d.bancoDeHoras,
                            status: d.status,
                            origem: d.origem
                        })),
                    });
                }

                // Calcula dias úteis com base no calendário
                const ano = inicioDoMes.getFullYear();
                const mes = inicioDoMes.getMonth() + 1; // JS retorna 0-11
                const diasUteis = getDiasUteis(mes, ano);

                // Melhoria: Contagem mais precisa de dias trabalhados
                const diasTrabalhados = espelhosDiarios.filter(d =>
                    d.status === 'Presente' ||
                    // (d.horasTrabalhadas > 0 && d.status !== 'Ausente')
                    (d.horasTrabalhadas > 0 && d.status !== 'Sem Registro')
                ).length;

                const faltas = Math.max(diasUteis - diasTrabalhados, 0);
                const cargaDevida = diasUteis * 7;

                // Melhoria: Garantir que os valores sejam números antes do reduce
                const totalHorasTrabalhadas = espelhosDiarios.reduce((acc, curr) => {
                    const horas = (typeof curr.horasTrabalhadas === 'string')
                        ? parseFloat((curr.horasTrabalhadas as string).replace(',', '.'))
                        : (typeof curr.horasTrabalhadas === 'number' ? curr.horasTrabalhadas : 0);
                    return acc + (isNaN(horas) ? 0 : horas);
                }, 0);

                const saldoHoras = totalHorasTrabalhadas - cargaDevida;

                // Upsert Espelho Mensal
                await tx.espelhoMensal.upsert({
                    where: {
                        cpf_mesAno: { cpf, mesAno } // Chave única composta
                    },
                    create: {
                        cpf,
                        mesAno,
                        diasUteis,
                        diasTrabalhados,
                        faltas,
                        totalHorasTrabalhadas: this.formatarDecimal(totalHorasTrabalhadas),
                        totalHorasDevidas: this.formatarDecimal(cargaDevida),
                        saldoHoras: this.formatarDecimal(saldoHoras)
                    },
                    update: {
                        diasUteis,
                        diasTrabalhados,
                        faltas,
                        totalHorasTrabalhadas: this.formatarDecimal(totalHorasTrabalhadas),
                        totalHorasDevidas: this.formatarDecimal(cargaDevida),
                        saldoHoras: this.formatarDecimal(saldoHoras)
                    }
                });
            });

            console.log(`Espelho mensal gerado com sucesso para CPF ${cpf}, mês ${mesAno}`);

        } catch (error: any) {
            console.error(`Erro ao gerar espelho mensal para CPF ${cpf}:`, error);
            throw new Error(`Falha ao gerar espelho mensal: ${error.message}`);
        }
    }




    private gerarTodasDatasDoMes(dataInicial: Date): Date[] {
        const datas = [];
        const data = new Date(dataInicial);
        data.setDate(1); // Primeiro dia do mês

        const proximoMes = new Date(data);
        proximoMes.setMonth(data.getMonth() + 1);
        proximoMes.setDate(1); // Primeiro dia do próximo mês

        while (data < proximoMes) {
            datas.push(new Date(data));
            data.setDate(data.getDate() + 1);
        }

        return datas;
    }



    private agruparPorDia(registros: any[]) {
        return registros.reduce((acc, reg) => {
            const data = reg.data;
            if (!acc[data]) acc[data] = [];
            acc[data].push(reg);
            return acc;
        }, {} as Record<string, any[]>);
    }


    private formatarData(data: Date, formato: string): string {
        const ano = data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
        const dia = String(data.getDate()).padStart(2, '0');

        const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        const diaSemana = diasSemana[data.getDay()];

        switch (formato) {
            case 'DD/MM/YYYY':
                return `${dia}/${mes}/${ano}`;
            case 'YYYY-MM-DD':
                return `${ano}-${mes}-${dia}`;
            case 'Extenso':
                return `${diaSemana}, ${dia}/${mes}/${ano}`;
            case 'MM/YYYY':
                return `${mes}/${ano}`;
            default:
                throw new Error(`Formato desconhecido: "${formato}"`);
        }
    }

    private getMesAno(data: Date): string {
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        return `${mes}/${ano}`;
    }



    /**
 * Calcula horas trabalhadas e retorna no formato HH.MM
 * @param entrada - horário de entrada (ex: "08:30")
 * @param saida - horário de saída (ex: "17:45")
 * @returns número no formato HH.MM (ex: 9.15 para 9 horas e 15 minutos)
 */
    private calcularHorasTrabalhadas(entrada: string | null, saida: string | null): number {
        if (!entrada || !saida) return 0;

        const entradaMatch = this.extrairHorario(entrada);
        const saidaMatch = this.extrairHorario(saida);

        if (!entradaMatch || !saidaMatch) return 0;

        const [eh, em] = entradaMatch;
        const [sh, sm] = saidaMatch;

        // Criar datas fictícias para cálculo
        let inicio = new Date();
        inicio.setHours(eh, em, 0, 0);

        let fim = new Date();
        fim.setHours(sh, sm, 0, 0);

        // Se saída for antes da entrada, assume que foi no dia seguinte
        if (fim < inicio) {
            fim.setDate(fim.getDate() + 1);
        }

        // Diferença em milissegundos
        const diffMs = fim.getTime() - inicio.getTime();
        const totalMinutos = Math.floor(diffMs / (1000 * 60));

        // Converter para formato HH.MM (não decimal)
        return this.converterMinutosParaHorasHMM(totalMinutos);
    }

    /**
     * Extrai hora e minuto de uma string no formato 'HH:mm'
     * @param horario - string no formato 'HH:mm'
     * @returns [hora, minuto] ou undefined se inválido
     */
    private extrairHorario(horario: string): [number, number] | undefined {
        const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!regex.test(horario)) return undefined;

        const [h, m] = horario.split(':').map(Number);
        return [h, m];
    }



 


    /**
 * Converte minutos para o formato HH.MM (ex: 75 → 1.15, não 1.25)
 * @param minutos - número total de minutos
 * @returns número no formato HH.MM
 * @example
 * converterMinutosParaHorasHMM(75)  // retorna 1.15 (1 hora e 15 minutos)
 * converterMinutosParaHorasHMM(90)  // retorna 1.30 (1 hora e 30 minutos)
 * converterMinutosParaHorasHMM(135) // retorna 2.15 (2 horas e 15 minutos)
 */
    private converterMinutosParaHorasHMM(minutos: number): number {
        if (minutos === 0) return 0;
        if (!isFinite(minutos)) return 0;

        const horas = Math.floor(minutos / 60);
        const minutosRestantes = minutos % 60;

        // Formata para HH.MM (multiplica minutos por 0.01 para manter formato)
        const resultado = horas + (minutosRestantes / 100);

        // Arredonda para 2 casas decimais para evitar problemas de precisão
        return Math.round(resultado * 100) / 100;
    }

    private processarDia(cpf: string, mesAno: string, dataStr: string, marcas: any[]): IEspelhoDiario {
    // Constante: 20 minutos em milissegundos
    const TEMPO_20_MINUTOS_EM_MS = 20 * 60 * 1000;

    // Ordena as marcas por hora
    marcas.sort((a, b) => a.hora.localeCompare(b.hora));

    // Filtra batidas duplicadas: mantém apenas a primeira dentro de 20 minutos
    const marcasFiltradas: any[] = [];
    let ultimaHoraMs: number | null = null;

    for (const marca of marcas) {
        const [horas, minutos] = marca.hora.split(':').map(Number);
        const horaAtualMs = new Date(0, 0, 0, horas, minutos).getTime();

        // Se for a primeira marcação ou estiver fora do intervalo de 20 minutos
        if (ultimaHoraMs === null || horaAtualMs - ultimaHoraMs >= TEMPO_20_MINUTOS_EM_MS) {
            marcasFiltradas.push(marca);
            ultimaHoraMs = horaAtualMs;
        }
        // Caso contrário, ignora a batida (considerada duplicada)
    }

    // Adiciona observação se houver batidas duplicadas removidas
    const observacaoDuplicadas = marcas.length > marcasFiltradas.length 
        ? 'Batidas duplicadas (≤20 min) foram ignoradas.' 
        : '';

    // Extrai as batidas válidas após o filtro
    const primeiraEntrada = marcasFiltradas[0]?.hora?.slice(0, 5) || null;
    const primeiraSaida = marcasFiltradas[1]?.hora?.slice(0, 5) || null;
    const segundaEntrada = marcasFiltradas[2]?.hora?.slice(0, 5) || null;
    const segundaSaida = marcasFiltradas[3]?.hora?.slice(0, 5) || null;

    // Calcula horas trabalhadas
    let periodo1 = 0;
    let periodo2 = 0;

    if (primeiraEntrada && primeiraSaida) {
        periodo1 = this.calcularHorasTrabalhadas(primeiraEntrada, primeiraSaida);
    }
    if (segundaEntrada && segundaSaida) {
        periodo2 = this.calcularHorasTrabalhadas(segundaEntrada, segundaSaida);
    }

    const horasTrabalhadas = parseFloat((periodo1 + periodo2).toFixed(2));

    // REGRAS EXATAS
    const JORNADA_PADRAO = 8;

    let horasNormais = 8;
    let horasExtras = 0;
    let horasDeAlmoco = 0;
    let bancoDeHoras = 0;

    if (horasTrabalhadas > 0) {
        if (horasTrabalhadas === 7) {
            horasNormais = 8;
            horasDeAlmoco = 0;
        } else if (horasTrabalhadas === 8) {
            horasNormais = 8;
            horasDeAlmoco = 1;
        } else if (horasTrabalhadas === 9) {
            horasNormais = 8;
            horasDeAlmoco = 2;
        } else if (horasTrabalhadas >= 10) {
            horasNormais = 8;
            horasDeAlmoco = 2;
            bancoDeHoras = parseFloat((horasTrabalhadas - 10).toFixed(2));
        } else if (horasTrabalhadas > 7 && horasTrabalhadas < 8) {
            horasNormais = 8;
            horasDeAlmoco = 0;
            bancoDeHoras = parseFloat((horasTrabalhadas - 7).toFixed(2));
        } else if (horasTrabalhadas > 8 && horasTrabalhadas < 9) {
            horasNormais = 8;
            horasDeAlmoco = 1;
            bancoDeHoras = parseFloat((horasTrabalhadas - 8).toFixed(2));
        } else if (horasTrabalhadas > 9 && horasTrabalhadas < 10) {
            horasNormais = 8;
            horasDeAlmoco = 2;
            bancoDeHoras = parseFloat((horasTrabalhadas - 9).toFixed(2));
        }
    }

    // Cálculo do saldo
    const saldo = parseFloat((horasTrabalhadas - JORNADA_PADRAO).toFixed(2));
    const credito = Math.max(saldo, 0);
    const debito = Math.abs(Math.min(saldo, 0));

    // Status final
    let status: IStatusDia;
    const batidasValidas = [
        primeiraEntrada,
        primeiraSaida,
        segundaEntrada,
        segundaSaida
    ].filter(Boolean).length;

    if (batidasValidas === 0) {
        // status = 'Ausente';
        status = 'Sem Registro';
    } else if (batidasValidas === 1) {
        status = 'Parcial';
    } else if (horasTrabalhadas >= 7) {
        status = 'Presente';
    } else {
        status = 'Parcial';
    }

    // Observações
    const observacoes: string[] = [];
    if (!primeiraEntrada) observacoes.push('Primeira entrada não registrada');
    if (!primeiraSaida) observacoes.push('Primeira saída não registrada');
    if (!segundaEntrada) observacoes.push('Segunda entrada não registrada');
    if (!segundaSaida) observacoes.push('Segunda saída não registrada');
    if (observacaoDuplicadas) observacoes.push(observacaoDuplicadas);

    // Parse da data
    const [d, m, a] = dataStr.split('/').map(Number);
    const data = new Date(a, m - 1, d);

    return {
        cpf,
        diaDoMes: this.formatarData(data, 'Extenso'),
        credito: this.formatarDecimal(credito),
        debito: this.formatarDecimal(debito),
        horasNormais: this.formatarDecimal(JORNADA_PADRAO),
        horasExtras: this.formatarDecimal(horasExtras),
        saldo: this.formatarDecimal(saldo),
        motivoReajuste: '',
        data: dataStr,
        primeiraEntrada,
        primeiraSaida,
        segundaEntrada,
        segundaSaida,
        horasTrabalhadas: this.formatarDecimal(horasTrabalhadas),
        observacoes: observacoes.length > 0 ? observacoes.join('; ') : 'Nenhuma',
        origem: marcas[0]?.origem || '',
        status,
        horasAlmoco: horasDeAlmoco,
        mesAno,
        bancoDeHoras: this.formatarDecimal(bancoDeHoras)
    }
}


    private formatarDecimal(valor: number | null | undefined): number {
        if (valor === null || valor === undefined || isNaN(valor)) {
            return 0;
        }
        return parseFloat(valor.toFixed(2));
    }


}
