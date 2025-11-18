import fs from 'fs'
import path from 'path'
import { prisma } from '../config/prisma'
import { RegistroTipo1 } from '../models/registro-tipo1'
import { RegistroTipo3 } from '../models/registro-tipo3'
import { TRegistroAFD } from '../types/TRegistro'
import { EspelhoPontoService } from '../services/espelho-ponto-services'
import { getInicioFimDoMes } from '../utils/getInicioFimDoMes'



export class AfdService {

    private serviceEspelhoPonto = new EspelhoPontoService()


    parseFile(filePath: string): TRegistroAFD[] {
        const fullPath = path.resolve(filePath)
        const content = fs.readFileSync(fullPath, 'utf8')

        const linhas = content.split(/\r?\n/).filter((l) => l.trim() !== '')

        let numeroFabricacao = ''  // ✅ Usado como origem

        const registros: TRegistroAFD[] = linhas.map((linha) => {
            const tipo = linha.charAt(9)  // posição 10 (0-index)
            let parsed: any = null

            switch (tipo) {
                case '1':
                    parsed = new RegistroTipo1(linha).toJSON()
                    numeroFabricacao = parsed.numeroFabricacao || ''  // ✅ Captura número de fabricação
                    break

                case '3':
                    parsed = new RegistroTipo3(linha).toJSON()
                    break

                default:
                    parsed = null
            }

            return {
                tipo,
                linha,
                parsed: parsed ? { ...parsed, origem: numeroFabricacao } : null, // ✅ Adiciona origem
            }
        })

        return registros
    }

    async salvarRegistros(registros: TRegistroAFD[]): Promise<void> {

        // 1. Agrupar registros tipo 3 por origem
        const registrosTipo3PorOrigem: Record<string, any[]> = {}

        for (const registro of registros) {
            if (registro.tipo === '3' && registro.parsed) {
                const origem = registro.parsed.origem ?? 'sem_origem';
                if (!registrosTipo3PorOrigem[origem]) {
                    registrosTipo3PorOrigem[origem] = [];
                }
                registrosTipo3PorOrigem[origem].push(registro);
            }
        }

        // 2. Carregar últimos NSR por origem
        const ultimosNSRPorOrigem: Record<string, number> = {};
        const origens = Object.keys(registrosTipo3PorOrigem);

        for (const origem of origens) {
            const registro10 = await prisma.registroTipo10.findUnique({
                where: { origem },
                select: { ultimo_nsr: true },
            });

            ultimosNSRPorOrigem[origem] = registro10?.ultimo_nsr ?? 0;
        }

        // Processar registros tipo 3 com NSR maior que o último
        const novosUltimosNSRPorOrigem: Record<string, number> = {};
        const registrosParaInserir: any[] = [];


        // 3. Coletar registros válidos para inserção
        for (const origem in registrosTipo3PorOrigem) {
            const registrosOrigem = registrosTipo3PorOrigem[origem];
            const ultimoNSRConhecido = ultimosNSRPorOrigem[origem];

            for (const registro of registrosOrigem) {
                const parsed = registro.parsed;
                const nsrAtual = Number(parsed.nsr)


                if (nsrAtual <= ultimoNSRConhecido)
                    continue

                registrosParaInserir.push(parsed)


                // Atualiza o novo último NSR para esta origem
                if (!novosUltimosNSRPorOrigem[origem] || nsrAtual > novosUltimosNSRPorOrigem[origem]) {
                    novosUltimosNSRPorOrigem[origem] = nsrAtual;
                }
            }
        }



        // 4. Inserir registros em lote
        if (registrosParaInserir.length > 0) {
            await prisma.marcacoesRelogio.createMany({
                data: registrosParaInserir,
                skipDuplicates: true // Precisa ter índice único no banco!
            });
        }



        // 5. Atualizar último NSR
        for (const origem in novosUltimosNSRPorOrigem) {
            const novoUltimoNSR = novosUltimosNSRPorOrigem[origem];

            await prisma.registroTipo10.upsert({
                where: { origem },
                update: { ultimo_nsr: novoUltimoNSR },
                create: { origem, ultimo_nsr: novoUltimoNSR },
            });
        }

        // 6. Salvar outros tipos (tipo 1, 2, etc.)
        for (const registro of registros) {
            const { tipo, parsed } = registro;
            if (!parsed || tipo === '3') continue;

            await this.salvarTipoGenerico(tipo, parsed);
        }

        // tentando salvar automaticamente o espelho do ponto
        // removendo cpf duplicados
        await this.RegistrarEspelhoAutomatico()
    }


    private async salvarTipoGenerico(tipo: string, data: any) {
        switch (tipo) {
            case '1': await prisma.registroTipo1.create({ data })
                break
        }
    }

    private async RegistrarEspelhoAutomatico() {
        const checkpoint = {
            inicio: Date.now(),
            etapas: [] as { nome: string; tempo: number; detalhes?: string }[]
        };

        const marcarCheckpoint = (nome: string, detalhes?: string) => {
            const tempo = Date.now();
            checkpoint.etapas.push({
                nome,
                tempo: tempo - checkpoint.inicio,
                detalhes
            });
            console.log(`✅ Checkpoint: ${nome} - Tempo: ${tempo - checkpoint.inicio}ms${detalhes ? ` - ${detalhes}` : ''}`);
        };

        try {
            console.log("🚀 Iniciando registro automático de espelhos...");

            // 🔹 CHECKPOINT 1: Busca otimizada de CPFs únicos
            const cpfUnicosResult = await prisma.marcacoesRelogio.findMany({
                distinct: ['cpfEmpregado'],
                select: { cpfEmpregado: true },
                orderBy: { cpfEmpregado: 'asc' }
            });

            const cpfUnicos = cpfUnicosResult.map(reg => reg.cpfEmpregado);
            marcarCheckpoint('Busca de CPFs', `${cpfUnicos.length} CPFs encontrados`);

            if (cpfUnicos.length === 0) {
                console.log("📭 Nenhum CPF encontrado. Nada a processar.");
                return;
            }

            // 🔹 CHECKPOINT 2: Definição do período
            const hoje = new Date();
            const dataLimite = new Date();
            dataLimite.setMonth(hoje.getMonth() - 12); // 24

            // 🔹 CHECKPOINT 3: Geração otimizada de meses/anos
            const mesesAnos = this.gerarMesesAnos(dataLimite, hoje);
            marcarCheckpoint('Geração de períodos', `${mesesAnos.length} meses a processar`);

            // 🔹 CHECKPOINT 4: Processamento otimizado com concorrência controlada
            const resultados = await this.processarConcorrente(cpfUnicos, mesesAnos, 5); // 5 concorrentes
            marcarCheckpoint('Processamento completo',
                `Sucesso: ${resultados.sucessos}, Erros: ${resultados.erros}`);

            // 🔹 CHECKPOINT FINAL: Relatório
            const tempoTotal = Date.now() - checkpoint.inicio;
            this.gerarRelatorioPerformance(checkpoint, tempoTotal, resultados);

        } catch (error) {
            console.error("❌ Erro fatal no registro automático de espelhos:", error);
            throw error;
        }
    }

    // 🔧 Função auxiliar para gerar meses/anos
    private gerarMesesAnos(dataInicio: Date, dataFim: Date): { mes: number; ano: number }[] {
        const mesesAnos = [];
        let dataAtual = new Date(dataInicio);

        while (dataAtual <= dataFim) {
            const mes = dataAtual.getMonth() + 1;
            const ano = dataAtual.getFullYear();
            mesesAnos.push({ mes, ano });
            dataAtual = new Date(ano, mes, 1);
        }

        return mesesAnos;
    }

    // 🔧 Processamento concorrente otimizado
    private async processarConcorrente(
        cpfUnicos: string[],
        mesesAnos: { mes: number; ano: number }[],
        concorrenciaMaxima: number = 5
    ): Promise<{ sucessos: number; erros: number; detalhesErros: string[] }> {

        console.log(`🔄 Iniciando processamento com concorrência de ${concorrenciaMaxima}`);

        let sucessos = 0;
        let erros = 0;
        const detalhesErros: string[] = [];
        let processados = 0;
        const totalOperacoes = cpfUnicos.length * mesesAnos.length;

        // Função para processar uma única operação
        const processarOperacao = async (cpf: string, mes: number, ano: number) => {
            try {
                const { inicioDoMes, inicioDoProximoMes } = getInicioFimDoMes(mes, ano);

                await this.serviceEspelhoPonto.gerarEspelhoMensal(cpf, inicioDoMes, inicioDoProximoMes);

                sucessos++;
                return { sucesso: true, cpf, mes, ano };
            } catch (error: any) {
                erros++;
                const erroMsg = `CPF ${cpf} - ${mes}/${ano}: ${error.message}`;
                detalhesErros.push(erroMsg);
                console.error(`❌ Erro: ${erroMsg}`);
                return { sucesso: false, cpf, mes, ano, erro: error.message };
            }
        };

        // Processamento em batches com concorrência controlada
        const batchSize = concorrenciaMaxima * 2;

        for (let i = 0; i < mesesAnos.length; i++) {
            const { mes, ano } = mesesAnos[i];
            console.log(`\n📅 Processando mês: ${mes}/${ano} (${i + 1}/${mesesAnos.length})`);

            // Processa todos os CPFs para este mês em batches
            for (let j = 0; j < cpfUnicos.length; j += batchSize) {
                const batchCpfs = cpfUnicos.slice(j, j + batchSize);

                // Processa o batch com concorrência controlada
                const promessas = batchCpfs.map(cpf =>
                    processarOperacao(cpf, mes, ano)
                );

                await Promise.all(promessas);

                processados += batchCpfs.length;
                const percentual = ((processados / totalOperacoes) * 100).toFixed(1);
                console.log(`📊 Progresso: ${processados}/${totalOperacoes} (${percentual}%)`);
            }
        }

        return { sucessos, erros, detalhesErros };
    }

    // 🔧 Geração de relatório de performance
    private gerarRelatorioPerformance(
        checkpoint: { etapas: { nome: string; tempo: number; detalhes?: string }[] },
        tempoTotal: number,
        resultados: { sucessos: number; erros: number }
    ): void {
        console.log(`\n📈 RELATÓRIO DE PERFORMANCE FINAL:`);
        console.log(`   • Tempo total: ${tempoTotal}ms (${(tempoTotal / 1000 / 60).toFixed(2)} minutos)`);
        console.log(`   • Operações bem-sucedidas: ${resultados.sucessos}`);
        console.log(`   • Erros: ${resultados.erros}`);
        console.log(`   • Taxa de sucesso: ${((resultados.sucessos / (resultados.sucessos + resultados.erros)) * 100).toFixed(1)}%`);

        checkpoint.etapas.forEach((etapa, index) => {
            const percentual = ((etapa.tempo / tempoTotal) * 100).toFixed(1);
            console.log(`   • ${etapa.nome}: ${etapa.tempo}ms (${percentual}%)${etapa.detalhes ? ` - ${etapa.detalhes}` : ''}`);
        });
    }
}