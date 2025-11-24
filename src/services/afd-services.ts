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
        const startTime = Date.now();
        
        try {
            const fullPath = path.resolve(filePath)
            const content = fs.readFileSync(fullPath, 'utf8')

            const linhas = content.split(/\r?\n/).filter((l) => l.trim() !== '')
            
            console.log(`📄 Processando ${linhas.length} linhas do arquivo AFD...`)

            let numeroFabricacao = ''  // ✅ Usado como origem
            let registrosInvalidos = 0
            let registrosProcessados = 0

            const registros: TRegistroAFD[] = linhas.map((linha, index) => {
                try {
                    const tipo = linha.charAt(9)  // posição 10 (0-index)
                    let parsed: any = null

                    switch (tipo) {
                        case '1':
                            parsed = new RegistroTipo1(linha).toJSON()
                            numeroFabricacao = parsed.numeroFabricacao || ''  // ✅ Captura número de fabricação
                            break

                        case '3':
                            parsed = new RegistroTipo3(linha).toJSON()
                            // 🚨 Verificar se o registro é válido
                            if (parsed.valido === false) {
                                registrosInvalidos++
                                console.warn(`⚠️ Registro inválido na linha ${index + 1}: ${parsed.erro}`)
                            }
                            break

                        default:
                            console.warn(`⚠️ Tipo de registro desconhecido na linha ${index + 1}: ${tipo}`)
                            parsed = null
                    }

                    registrosProcessados++

                    return {
                        tipo,
                        linha,
                        parsed: parsed ? { ...parsed, origem: numeroFabricacao } : null, // ✅ Adiciona origem
                    }
                } catch (error: any) {
                    registrosInvalidos++
                    console.error(`❌ Erro ao processar linha ${index + 1}: ${error.message}`)
                    console.error(`Linha problemática: ${linha.substring(0, 50)}...`)
                    
                    return {
                        tipo: 'ERRO',
                        linha,
                        parsed: null,
                        erro: error.message
                    }
                }
            })

            console.log(`✅ Processamento concluído: ${registrosProcessados} processados, ${registrosInvalidos} inválidos`)
            console.log(`⏱️ Tempo de processamento: ${Date.now() - startTime}ms`)

            return registros

        } catch (error: any) {
            console.error('❌ Erro ao ler arquivo AFD:', error.message)
            throw new Error(`Falha ao processar arquivo AFD: ${error.message}`)
        }
    }

    private validarRegistros(registros: TRegistroAFD[]): TRegistroAFD[] {
        const registrosValidos: TRegistroAFD[] = [];
        const registrosInvalidos: any[] = [];

        for (const registro of registros) {
            try {
                // Validar estrutura básica
                if (!registro.parsed) {
                    registrosInvalidos.push({ registro, erro: 'Registro sem parsed' });
                    continue;
                }

                const parsed = registro.parsed;

                // 🚨 Validações críticas para registros tipo 3
                if (registro.tipo === '3') {
                    // Verificar flag de validade primeiro
                    if ((parsed as any).valido === false) {
                        registrosInvalidos.push({ 
                            registro, 
                            erro: `Registro marcado como inválido: ${(parsed as any).erro}` 
                        });
                        continue;
                    }

                    // Validar NSR
                    if (!parsed.nsr || isNaN(Number(parsed.nsr))) {
                        registrosInvalidos.push({ 
                            registro, 
                            erro: `NSR inválido: ${parsed.nsr}` 
                        });
                        continue;
                    }

                    // Validar CPF
                    if (!parsed.cpfEmpregado || parsed.cpfEmpregado.length !== 11 || !/^\d+$/.test(parsed.cpfEmpregado)) {
                        registrosInvalidos.push({ 
                            registro, 
                            erro: `CPF inválido: ${parsed.cpfEmpregado}` 
                        });
                        continue;
                    }

                    // Validar dataCompleta - CRÍTICO!
                    if (!parsed.dataCompleta || !(parsed.dataCompleta instanceof Date) || isNaN(parsed.dataCompleta.getTime())) {
                        registrosInvalidos.push({ 
                            registro, 
                            erro: `dataCompleta inválida: ${parsed.dataCompleta}` 
                        });
                        continue;
                    }

                    // Validar data e hora strings
                    const dataStr = String(parsed.data || '');
                    if (!parsed.data || parsed.data === 'DATA INVÁLIDA' || !/^\d{2}\/\d{2}\/\d{4}$/.test(dataStr)) {
                        registrosInvalidos.push({ 
                            registro, 
                            erro: `Data inválida: ${parsed.data}` 
                        });
                        continue;
                    }

                    const horaStr = String(parsed.hora || '');
                    if (!parsed.hora || parsed.hora === 'HORA INVÁLIDA' || !/^\d{2}:\d{2}:\d{2}$/.test(horaStr)) {
                        registrosInvalidos.push({ 
                            registro, 
                            erro: `Hora inválida: ${parsed.hora}` 
                        });
                        continue;
                    }

                    // Validar CRC
                    if (!parsed.crc || parsed.crc.length < 4) {
                        registrosInvalidos.push({ 
                            registro, 
                            erro: `CRC inválido: ${parsed.crc}` 
                        });
                        continue;
                    }

                    // 🎯 Tudo válido - adicionar à lista
                    registrosValidos.push(registro);

                } else {
                    // Para outros tipos, validação básica
                    if (parsed && Object.keys(parsed).length > 0) {
                        registrosValidos.push(registro);
                    } else {
                        registrosInvalidos.push({ 
                            registro, 
                            erro: 'Registro parsed vazio' 
                        });
                    }
                }

            } catch (error: any) {
                registrosInvalidos.push({ 
                    registro, 
                    erro: `Exceção na validação: ${error.message}` 
                });
            }
        }

        // 📊 Relatório de validação
        if (registrosInvalidos.length > 0) {
            console.warn(`⚠️ ${registrosInvalidos.length} registros inválidos encontrados:`);
            console.warn('Primeiros 5 registros inválidos:', registrosInvalidos.slice(0, 5));
            
            // Estatísticas por tipo de erro
            const estatisticasErros = registrosInvalidos.reduce((acc, item) => {
                const erro = item.erro.split(':')[0]; // Pegar tipo do erro
                acc[erro] = (acc[erro] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);
            
            console.warn('📊 Estatísticas de erros:', estatisticasErros);
        }

        console.log(`✅ ${registrosValidos.length}/${registros.length} registros válidos`);
        return registrosValidos;
    }

    async salvarRegistros(registros: TRegistroAFD[]): Promise<void> {
        const startTime = Date.now();
        
        try {
            console.log(`💾 Iniciando salvamento de ${registros.length} registros...`);

            // 🔍 Validar e filtrar registros antes de processar
            const registrosValidos = this.validarRegistros(registros);
            console.log(`✅ ${registrosValidos.length} registros válidos após validação`);

            if (registrosValidos.length === 0) {
                console.warn('⚠️ Nenhum registro válido para salvar');
                return;
            }

            // Agrupar registros por tipo e origem
            const registrosTipo3PorOrigem: Record<string, any[]> = {};
            const outrosRegistros: TRegistroAFD[] = [];

            for (const registro of registrosValidos) {
                if (registro.tipo === '3' && registro.parsed) {
                    const origem = registro.parsed.origem ?? 'sem_origem';
                    if (!registrosTipo3PorOrigem[origem]) {
                        registrosTipo3PorOrigem[origem] = [];
                    }
                    registrosTipo3PorOrigem[origem].push(registro);
                } else if (registro.parsed && registro.tipo !== '3') {
                    outrosRegistros.push(registro);
                }
            }

            // Processar em transaction para garantir consistência
            await prisma.$transaction(async (tx) => {
                // 1. Carregar últimos NSR por origem com lock otimista
                const origens = Object.keys(registrosTipo3PorOrigem);
                const ultimosNSRPorOrigem: Record<string, number> = {};

                for (const origem of origens) {
                    const registro10 = await tx.registroTipo10.findUnique({
                        where: { origem },
                        select: { ultimo_nsr: true },
                    });
                    ultimosNSRPorOrigem[origem] = registro10?.ultimo_nsr ?? 0;
                }

                // 2. Validar e filtrar registros com NSR sequencial
                const registrosParaInserir: any[] = [];
                const novosUltimosNSRPorOrigem: Record<string, number> = {};
                const registrosIgnorados: { origem: string; nsr: number; motivo: string }[] = [];

                for (const origem in registrosTipo3PorOrigem) {
                    const registrosOrigem = registrosTipo3PorOrigem[origem];
                    const ultimoNSRConhecido = ultimosNSRPorOrigem[origem];
                    
                    // Ordenar por NSR para garantir sequencialidade
                    const registrosOrdenados = registrosOrigem.sort((a, b) => 
                        Number(a.parsed.nsr) - Number(b.parsed.nsr)
                    );

                    for (const registro of registrosOrdenados) {
                        const parsed = registro.parsed;
                        const nsrAtual = Number(parsed.nsr);

                        // Validar sequencialidade (NSR deve ser > último NSR conhecido)
                        if (nsrAtual <= ultimoNSRConhecido) {
                            registrosIgnorados.push({
                                origem,
                                nsr: nsrAtual,
                                motivo: `NSR ${nsrAtual} <= último NSR ${ultimoNSRConhecido}`
                            });
                            continue;
                        }

                        // Validar se é o próximo NSR esperado
                        const nsrEsperado = ultimoNSRConhecido + registrosParaInserir.filter(r => r.origem === origem).length + 1;
                        if (nsrAtual !== nsrEsperado) {
                            console.warn(`⚠️ Gap de NSR detectado em ${origem}: esperado ${nsrEsperado}, encontrado ${nsrAtual}`);
                        }

                        // Remover campos que não existem no banco de dados
                        const { valido, erro, ...dadosParaInserir } = parsed;
                        registrosParaInserir.push(dadosParaInserir);

                        // Atualizar último NSR para esta origem
                        if (!novosUltimosNSRPorOrigem[origem] || nsrAtual > novosUltimosNSRPorOrigem[origem]) {
                            novosUltimosNSRPorOrigem[origem] = nsrAtual;
                        }
                    }
                }

                // 3. Inserir registros em lote com validação
                if (registrosParaInserir.length > 0) {
                    console.log(`💾 Inserindo ${registrosParaInserir.length} registros de marcação...`);
                    
                    // Verificar se existe índice único antes de usar skipDuplicates
                    try {
                        await tx.marcacoesRelogio.createMany({
                            data: registrosParaInserir,
                            skipDuplicates: true
                        });
                        console.log(`✅ ${registrosParaInserir.length} registros inseridos com sucesso`);
                    } catch (error: any) {
                        if (error.code === 'P2002') { // Unique constraint violation
                            console.warn('⚠️ Registros duplicados detectados, ignorando duplicatas');
                        } else {
                            throw error;
                        }
                    }
                }

                // 4. Atualizar últimos NSR com validação de concorrência
                for (const origem in novosUltimosNSRPorOrigem) {
                    const novoUltimoNSR = novosUltimosNSRPorOrigem[origem];
                    
                    // Usar update com condição para prevenir condições de corrida
                    const updated = await tx.registroTipo10.updateMany({
                        where: { 
                            origem,
                            ultimo_nsr: { lt: novoUltimoNSR }
                        },
                        data: { ultimo_nsr: novoUltimoNSR }
                    });

                    if (updated.count === 0) {
                        // Se não atualizou, criar novo registro
                        await tx.registroTipo10.upsert({
                            where: { origem },
                            update: { ultimo_nsr: novoUltimoNSR },
                            create: { origem, ultimo_nsr: novoUltimoNSR }
                        });
                    }
                    
                    console.log(`📊 NSR atualizado para ${origem}: ${novoUltimoNSR}`);
                }

                // 5. Processar outros tipos de registros
                if (outrosRegistros.length > 0) {
                    console.log(`💾 Processando ${outrosRegistros.length} registros de outros tipos...`);
                    
                    for (const registro of outrosRegistros) {
                        const { tipo, parsed } = registro;
                        await this.salvarTipoGenerico(tipo, parsed, tx);
                    }
                }

                // 6. Registrar log de processamento
                if (registrosIgnorados.length > 0) {
                    console.warn(`⚠️ ${registrosIgnorados.length} registros ignorados:`, 
                        registrosIgnorados.slice(0, 10)); // Mostrar apenas primeiros 10
                }

                console.log(`✅ Transaction concluída: ${registrosParaInserir.length} registros processados em ${Date.now() - startTime}ms`);
            }, {
                maxWait: 30000, // 30 segundos
                timeout: 60000, // 1 minuto
                isolationLevel: 'Serializable' // Maior consistência
            });

            // Gerar espelhos automaticamente com base nos registros deste upload
            const totalRegistrosProcessados = registrosValidos.filter(r => r.tipo === '3' && r.parsed).length;
            if (totalRegistrosProcessados > 0) {
                console.log(`🔄 Iniciando geração automática de espelhos com base no lote (${totalRegistrosProcessados} marcações válidas)...`);
                
                // Executar em background para não bloquear o response
                setImmediate(async () => {
                    try {
                        await this.gerarEspelhosParaBatch(registrosValidos);
                    } catch (error) {
                        console.error('❌ Erro na geração automática de espelhos (batch):', error);
                    }
                });
            }

        } catch (error: any) {
            console.error('❌ Erro crítico ao salvar registros:', error);
            
            // Log detalhado para debugging
            if (error.code === 'P2034') {
                throw new Error('Erro de concorrência detectado. Por favor, tente novamente.');
            } else if (error.code === 'P2002') {
                throw new Error('Violação de unicidade detectada. Registros já existem no banco.');
            }
            
            throw new Error(`Falha ao salvar registros: ${error.message}`);
        }
    }


    private async salvarTipoGenerico(tipo: string, data: any, tx: any = prisma) {
        switch (tipo) {
            case '1': await tx.registroTipo1.create({ data })
                break
        }
    }

    private async RegistrarEspelhoAutomaticoOtimizado() {
        const startTime = Date.now();
        
        try {
            console.log("🚀 Iniciando registro automático de espelhos otimizado...");

            // 🔍 Buscar CPFs que tiveram marcações nos últimos 7 dias
            const dataLimite = new Date();
            dataLimite.setDate(dataLimite.getDate() - 7); // Últimos 7 dias

            // Como não temos created_at, vamos buscar CPFs com marcações recentes baseado na data_completa
            const cpfsAtivos = await prisma.marcacoesRelogio.findMany({
                distinct: ['cpfEmpregado'],
                where: {
                    dataCompleta: {
                        gte: dataLimite
                    }
                },
                select: { cpfEmpregado: true },
                orderBy: { cpfEmpregado: 'asc' },
                take: 50 // Limitar para evitar processamento excessivo
            });

            if (cpfsAtivos.length === 0) {
                console.log("📭 Nenhum CPF com novas marcações encontrado.");
                return;
            }

            console.log(`📊 ${cpfsAtivos.length} CPFs com novas marcações identificados`);

            // 🔍 Identificar meses que precisam ser reprocessados
            const mesesParaProcessar = await this.identificarMesesParaReprocessar(cpfsAtivos.map(c => c.cpfEmpregado));
            
            if (mesesParaProcessar.length === 0) {
                console.log("📭 Todos os espelhos estão atualizados.");
                return;
            }

            console.log(`📅 ${mesesParaProcessar.length} combinações CPF/mês para processar`);

            // 🎯 Solução 2: Aplicar reorganização cronológica
            const mesesOrdenados = this.reorganizarPorOrdemCronologica(mesesParaProcessar);

            // 🎯 Solução 4: Logging detalhado do processamento
            console.log(`🔍 Detalhamento do processamento:`);
            console.log(`   Total de combinações: ${mesesOrdenados.length}`);
            console.log(`   CPFs únicos: ${new Set(mesesOrdenados.map(m => m.cpf)).size}`);
            console.log(`   Períodos únicos: ${new Set(mesesOrdenados.map(m => `${m.ano}-${m.mes}`)).size}`);
            
            // Mostrar distribuição por período
            const distribuicaoPorMes = mesesOrdenados.reduce((acc, item) => {
                const periodo = `${item.ano}-${item.mes.toString().padStart(2, '0')}`;
                acc[periodo] = (acc[periodo] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);
            
            console.log(`📊 Distribuição por período:`, distribuicaoPorMes);

            // Configuração de processamento sequencial via variável de ambiente
            const processarSequencial = process.env.PROCESSAR_SEQUENCIAL === 'true';
            if (processarSequencial) {
                console.log(`🎯 Modo sequencial ativado via PROCESSAR_SEQUENCIAL=true`);
            }

            // 🔄 Processar com concorrência controlada
            const resultados = await this.processarConcorrenteOtimizado(mesesOrdenados, 3, processarSequencial); // 3 concorrentes
            
            const tempoTotal = Date.now() - startTime;
            console.log(`✅ Processamento concluído: ${resultados.sucessos} sucessos, ${resultados.erros} erros em ${tempoTotal}ms`);

        } catch (error) {
            console.error("❌ Erro no registro automático otimizado:", error);
            throw error;
        }
    }

    private async gerarEspelhosParaBatch(registros: TRegistroAFD[]) {
        try {
            console.log('📦 Gerando espelhos a partir do lote enviado...');
            const mapaCpfMes = new Map<string, Set<string>>();

            for (const r of registros) {
                if (r.tipo === '3' && r.parsed && r.parsed.dataCompleta && r.parsed.cpfEmpregado) {
                    const d: Date = r.parsed.dataCompleta as Date;
                    if (!(d instanceof Date) || isNaN(d.getTime())) continue;
                    const mes = String(d.getMonth() + 1).padStart(2, '0');
                    const ano = d.getFullYear();
                    const mesAno = `${mes}/${ano}`;

                    const cpf = String(r.parsed.cpfEmpregado);
                    if (!mapaCpfMes.has(cpf)) mapaCpfMes.set(cpf, new Set<string>());
                    mapaCpfMes.get(cpf)!.add(mesAno);
                }
            }

            const tarefas: Promise<void>[] = [];
            for (const [cpf, meses] of mapaCpfMes.entries()) {
                for (const mesAno of meses) {
                    const [mesStr, anoStr] = mesAno.split('/');
                    const mes = Number(mesStr);
                    const ano = Number(anoStr);
                    const { inicioDoMes, inicioDoProximoMes } = getInicioFimDoMes(mes, ano);
                    tarefas.push(this.serviceEspelhoPonto.gerarEspelhoMensal(cpf, inicioDoMes, inicioDoProximoMes));
                }
            }

            if (tarefas.length === 0) {
                console.log('📭 Nenhum espelho necessário para este lote.');
                return;
            }

            await Promise.all(tarefas);
            console.log(`✅ Espelhos gerados para ${tarefas.length} combinações CPF/mês do lote.`);
        } catch (error: any) {
            console.error('❌ Erro ao gerar espelhos do lote:', error);
            throw error;
        }
    }

    private async identificarMesesParaReprocessar(cpfs: string[]): Promise<{ cpf: string; mes: number; ano: number }[]> {
        const mesesParaProcessar: { cpf: string; mes: number; ano: number }[] = [];
        
        // Configurar quantidade de meses para processar (padrão: 2 meses)
        const mesesProcessar = parseInt(process.env.MESES_PROCESSAR || '2');
        
        // Validar valor para evitar processamento excessivo
        const mesesValidos = Math.max(1, Math.min(mesesProcessar, 12)); // Entre 1 e 12 meses
        
        if (mesesValidos !== mesesProcessar) {
            console.warn(`⚠️ Valor MESES_PROCESSAR=${mesesProcessar} ajustado para ${mesesValidos} meses`);
        }
        
        console.log(`📅 Processando ${mesesValidos} meses para ${cpfs.length} CPFs`);
        
        const hoje = new Date();
        
        for (const cpf of cpfs) {
            for (let i = 0; i < mesesValidos; i++) { // Últimos N meses configuráveis
                const dataVerificacao = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
                const mes = dataVerificacao.getMonth() + 1;
                const ano = dataVerificacao.getFullYear();
                
                // Verificar se já existe espelho para este CPF/mês
                const espelhoExistente = await prisma.espelhoMensal.findFirst({
                    where: { 
                        cpf,
                        mesAno: `${mes.toString().padStart(2, '0')}/${ano}`
                    },
                    select: { id: true }
                });

                // Verificar se há marcações para este mês
                const temMarcacoes = await prisma.marcacoesRelogio.findFirst({
                    where: {
                        cpfEmpregado: cpf,
                        dataCompleta: {
                            gte: new Date(ano, mes - 1, 1),
                            lt: new Date(ano, mes, 1)
                        }
                    },
                    select: { id: true }
                });

                // Precisa reprocessar se:
                // 1. Não tem espelho, mas tem marcações
                // 2. Tem espelho e tem marcações (atualizar)
                const precisaReprocessar = !espelhoExistente && temMarcacoes || 
                    (espelhoExistente && temMarcacoes);

                if (precisaReprocessar) {
                    mesesParaProcessar.push({ cpf, mes, ano });
                }
            }
        }

        // 🎯 Solução 1: Ordenar por CPF + Mês/Ano para processamento previsível
        mesesParaProcessar.sort((a, b) => {
            // Primeiro ordena por CPF
            if (a.cpf !== b.cpf) {
                return a.cpf.localeCompare(b.cpf);
            }
            // Depois ordena por Ano/Mês
            if (a.ano !== b.ano) {
                return a.ano - b.ano;
            }
            return a.mes - b.mes;
        });

        console.log(`📋 Meses ordenados para processamento:`, 
            mesesParaProcessar.map(m => `${m.cpf}: ${m.mes}/${m.ano}`).slice(0, 10));

        return mesesParaProcessar;
    }

    private reorganizarPorOrdemCronologica(mesesParaProcessar: { cpf: string; mes: number; ano: number }[]): { cpf: string; mes: number; ano: number }[] {
        // 🎯 Solução 2: Agrupar por período (ano/mês) e processar todos CPFs do mesmo mês juntos
        const mesesPorPeriodo = new Map<string, { cpf: string; mes: number; ano: number }[]>();
        
        // Agrupar por período (ano/mês)
        for (const item of mesesParaProcessar) {
            const chavePeriodo = `${item.ano}-${item.mes.toString().padStart(2, '0')}`;
            if (!mesesPorPeriodo.has(chavePeriodo)) {
                mesesPorPeriodo.set(chavePeriodo, []);
            }
            mesesPorPeriodo.get(chavePeriodo)!.push(item);
        }
        
        // Ordenar períodos cronologicamente
        const periodosOrdenados = Array.from(mesesPorPeriodo.keys()).sort();
        
        // Criar novo array na ordem cronológica
        const resultado: { cpf: string; mes: number; ano: number }[] = [];
        for (const periodo of periodosOrdenados) {
            const itensDoPeriodo = mesesPorPeriodo.get(periodo)!;
            // Ordenar CPFs dentro do período para consistência
            itensDoPeriodo.sort((a, b) => a.cpf.localeCompare(b.cpf));
            resultado.push(...itensDoPeriodo);
        }
        
        console.log(`📅 Reorganização cronológica: ${resultado.length} meses em ${periodosOrdenados.length} períodos`);
        console.log(`📋 Ordem cronológica:`, periodosOrdenados);
        
        return resultado;
    }

    private async processarSequencialmentePorPeriodo(
        mesesParaProcessar: { cpf: string; mes: number; ano: number }[]
    ): Promise<{ sucessos: number; erros: number; detalhesErros: string[] }> {
        
        console.log(`🎯 Processando sequencialmente por período (sem concorrência)`);
        
        let sucessos = 0;
        let erros = 0;
        const detalhesErros: string[] = [];
        
        // Agrupar por período
        const mesesPorPeriodo = new Map<string, { cpf: string; mes: number; ano: number }[]>();
        
        for (const item of mesesParaProcessar) {
            const chavePeriodo = `${item.ano}-${item.mes.toString().padStart(2, '0')}`;
            if (!mesesPorPeriodo.has(chavePeriodo)) {
                mesesPorPeriodo.set(chavePeriodo, []);
            }
            mesesPorPeriodo.get(chavePeriodo)!.push(item);
        }
        
        // Ordenar períodos cronologicamente
        const periodosOrdenados = Array.from(mesesPorPeriodo.keys()).sort();
        
        for (const periodo of periodosOrdenados) {
            const itensDoPeriodo = mesesPorPeriodo.get(periodo)!;
            console.log(`\n📅 Processando período ${periodo} (${itensDoPeriodo.length} CPFs)`);
            console.log(`   CPFs:`, itensDoPeriodo.map(i => i.cpf));
            
            for (const { cpf, mes, ano } of itensDoPeriodo) {
                try {
                    const { inicioDoMes, inicioDoProximoMes } = getInicioFimDoMes(mes, ano);
                    await this.serviceEspelhoPonto.gerarEspelhoMensal(cpf, inicioDoMes, inicioDoProximoMes);
                    
                    sucessos++;
                    console.log(`✅ ${cpf} - ${mes}/${ano}`);
                } catch (error: any) {
                    erros++;
                    const erroMsg = `CPF ${cpf} - ${mes}/${ano}: ${error.message}`;
                    detalhesErros.push(erroMsg);
                    console.error(`❌ Erro: ${erroMsg}`);
                }
            }
            
            console.log(`📊 Período ${periodo} concluído: ${itensDoPeriodo.length} processados`);
        }
        
        return { sucessos, erros, detalhesErros };
    }

    private async processarConcorrenteOtimizado(
        mesesParaProcessar: { cpf: string; mes: number; ano: number }[],
        concorrenciaMaxima: number = 3,
        processarSequencialmente: boolean = false
    ): Promise<{ sucessos: number; erros: number; detalhesErros: string[] }> {
        
        let sucessos = 0;
        let erros = 0;
        const detalhesErros: string[] = [];
        let processados = 0;

        // 🎯 Solução 3: Opção de processamento sequencial por período
        if (processarSequencialmente) {
            return await this.processarSequencialmentePorPeriodo(mesesParaProcessar);
        }

        // Processar em grupos pequenos
        const batchSize = concorrenciaMaxima;
        
        for (let i = 0; i < mesesParaProcessar.length; i += batchSize) {
            const batch = mesesParaProcessar.slice(i, i + batchSize);
            
            // 🎯 Solução 4: Logging detalhado do lote atual
            console.log(`\n📦 Lote ${Math.floor(i / batchSize) + 1}/${Math.ceil(mesesParaProcessar.length / batchSize)}:`);
            console.log(`   Processando:`, batch.map(b => `${b.cpf} - ${b.mes}/${b.ano}`));
            
            const promessas = batch.map(async ({ cpf, mes, ano }) => {
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
            });

            await Promise.all(promessas);
            
            processados += batch.length;
            const percentual = ((processados / mesesParaProcessar.length) * 100).toFixed(1);
            console.log(`📊 Progresso: ${processados}/${mesesParaProcessar.length} (${percentual}%)`);
        }

        return { sucessos, erros, detalhesErros };
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
                orderBy: { cpfEmpregado: 'desc' }
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
