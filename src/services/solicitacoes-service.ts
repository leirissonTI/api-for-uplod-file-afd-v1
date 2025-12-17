import { PrismaClient } from "../generated/prisma";
import { prisma } from "../config/prisma";
import { CreateSolicitacaoDto } from "../dtos/solicitacoes/create-solicitacoes.dto";
import { UpdateSolicitacaoDto } from "../dtos/solicitacoes/update-solicitacoes";
import fs from "fs";



export class SolicitacoesService {
    constructor(private prismaService: PrismaClient = prisma) { }

    // async getAllSolicitacoes() {
    //     try {
    //         // 1) Buscar todas as solicitações com os campos necessários para exibição
    //         const solicitacoesBrutas = await this.prismaService.solicitacao.findMany({
    //             select: {
    //                 id: true,
    //                 status: true,
    //                 servidorMatricula: true,
    //                 nomeServidor: true,
    //                 nomeChefia: true,
    //                 lotacao: true,
    //                 dia: true,
    //                 entrada1: true,
    //                 saida1: true,
    //                 entrada2: true,
    //                 saida2: true,
    //                 opcao: true,
    //                 aprovador: { select: { nome: true } },
    //                 escala: {
    //                     select: {
    //                         id: true,
    //                         nome: true,
    //                         escalado: true,
    //                         servidorMatricula: true,
    //                         dataEscala: true,
    //                         recebePagamento: true,
    //                         lotacao: { select: { nome: true } },
    //                         recesso: { select: { descricao: true } },
    //                     }
    //                 }
    //             },
    //             orderBy: [{ dia: 'asc' }]
    //         })

    //         const matriculas_servidores = solicitacoesBrutas.map(solicitacao => solicitacao.servidorMatricula)

    //         const matricula_unicas = [...new Set(matriculas_servidores)]
    //         const servidores = matricula_unicas.map(async servidor_matricula => {
    //             return await this.prismaService.sarh_funcionario.findMany({
    //                 where: {
    //                     MATRICULA: servidor_matricula
    //                 }
    //             })
    //         })
    //         const servidoresResolvidos = await Promise.all(servidores)
    //         const cpf_unicos = [...new Set(servidoresResolvidos.map(servidor => servidor[0].CPF))]

    //         const pontos_diarios = cpf_unicos.map(async cpf => {
    //             return await this.prismaService.espelhoDiario.findMany({
    //                 where: {
    //                     cpf: cpf as string,
    //                 }
    //             })
    //         })
    //         const pontos_diariosResolvidos = await Promise.all(pontos_diarios)
    //         console.log(pontos_diariosResolvidos)



    //         // 2) Utilitário local: formata Date em HH:mm; retorna null se o valor não for uma data válida
    //         const formatHoraMinuto = (data?: Date | null): string | null => {
    //             if (!(data instanceof Date)) return null
    //             const horas = String(data.getHours()).padStart(2, '0')
    //             const minutos = String(data.getMinutes()).padStart(2, '0')
    //             return `${horas}:${minutos}`
    //         }

    //         // 3) Enriquecer o payload com strings de horário para facilitar consumo no frontend
    //         const solicitacoesFormatadas = (solicitacoesBrutas as Array<any>).map((sol) => ({
    //             ...sol,
    //             primeiraEntrada: formatHoraMinuto(sol.entrada1),
    //             segundaEntrada: formatHoraMinuto(sol.entrada2),
    //             primeiraSaida: formatHoraMinuto(sol.saida1),
    //             segundaSaida: formatHoraMinuto(sol.saida2),
    //         }))

    //         // 4) Retornar lista pronta para exibição, com ordenação previsível
    //         return solicitacoesFormatadas
    //     } catch (error) {
    //         // Tratamento de erro padronizado para facilitar diagnóstico
    //         console.log(`[Erro] Falha ao listar solicitações: ${(error as any).message || error}`)
    //         throw new Error(`Erro ao buscar todas as solicitações. ${error}`)
    //     }
    // }
    async getAllSolicitacoes() {
        try {
            /* =====================================================
             * 1. Buscar solicitações
             * ===================================================== */
            const solicitacoesBrutas = await this.prismaService.solicitacao.findMany({
                select: {
                    id: true,
                    status: true,
                    servidorMatricula: true,
                    nomeServidor: true,
                    nomeChefia: true,
                    lotacao: true,
                    dia: true,
                    entrada1: true,
                    saida1: true,
                    entrada2: true,
                    saida2: true,
                    opcao: true,
                    aprovador: { select: { nome: true } },
                    escala: {
                        select: {
                            id: true,
                            nome: true,
                            escalado: true,
                            servidorMatricula: true,
                            dataEscala: true,
                            recebePagamento: true,
                            lotacao: { select: { nome: true } },
                            recesso: { select: { descricao: true } },
                        },
                    },
                },
                orderBy: [{ dia: 'asc' }],
            })

            if (!solicitacoesBrutas.length) return []

            /* =====================================================
             * 2. Matrículas únicas
             * ===================================================== */
            const matriculasUnicas: string[] = [
                ...new Set(solicitacoesBrutas.map(s => s.servidorMatricula as string)),
            ]

            console.log(matriculasUnicas)

            /* =====================================================
             * 3. Buscar servidores (matrícula -> CPF)
             * ===================================================== */
            const servidores = await this.prismaService.sarh_funcionario.findMany({
                where: {
                    MATRICULA: { in: matriculasUnicas },
                },
                select: {
                    MATRICULA: true,
                    CPF: true,
                },
            })

            const matriculaCpfMap = new Map<string, string>()
            servidores.forEach(s =>
                matriculaCpfMap.set(s.MATRICULA as string, s.CPF as string),
            )


            /* =====================================================
             * 4. Buscar espelhos diários (CPF IN)
             * ===================================================== */
            const cpfsUnicos: string[] = [...new Set(servidores.map(s => s.CPF as string))]

            const pontosDiarios = await this.prismaService.espelhoDiario.findMany({
                where: {
                    cpf: { in: cpfsUnicos },
                },
            })
            


            /* =====================================================
             * 5. Indexar espelhos por CPF + Dia
             * ===================================================== */
            const espelhoMap = new Map<string, any>()
            const dateToDDMMYYYY = (d: Date) => {
                const dd = String(d.getDate()).padStart(2,'0')
                const mm = String(d.getMonth()+1).padStart(2,'0')
                const yy = String(d.getFullYear())
                return `${dd}/${mm}/${yy}`
            }
            const normalizeDateStr = (val: any): string => {
                if (val instanceof Date) return dateToDDMMYYYY(val)
                const s = String(val || '')
                const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})$/)
                if (iso) return `${iso[3]}/${iso[2]}/${iso[1]}`
                const ddmm = s.match(/^([0-3]?\d)\/([0-1]?\d)\/(\d{4})$/)
                if (ddmm) return `${ddmm[1].padStart(2,'0')}/${ddmm[2].padStart(2,'0')}/${ddmm[3]}`
                const d = new Date(s)
                if (!isNaN(d.getTime())) return dateToDDMMYYYY(d)
                return s
            }

            pontosDiarios.forEach(ponto => {
                const dia = normalizeDateStr((ponto as any).data)
                const chave = `${(ponto as any).cpf}_${dia}`
                espelhoMap.set(chave, ponto)
                console.log("Chave correta => ", chave)
            })

            /* =====================================================
             * 6. Utilitário de formatação
             * ===================================================== */
            const formatHoraMinuto = (data?: Date | null): string | null => {
                if (!(data instanceof Date)) return null
                const h = String(data.getHours()).padStart(2, '0')
                const m = String(data.getMinutes()).padStart(2, '0')
                return `${h}:${m}`
            }

            /* =====================================================
             * 7. Integração final
             * ===================================================== */
            const solicitacoesIntegradas = solicitacoesBrutas.map(sol => {
                const cpf = matriculaCpfMap.get(sol.servidorMatricula as string)
                console.log("cpf: " + cpf)

                if (!cpf) {
                    return {
                        ...sol,
                        primeiraEntrada: formatHoraMinuto(sol.entrada1),
                        primeiraSaida: formatHoraMinuto(sol.saida1),
                        segundaEntrada: formatHoraMinuto(sol.entrada2),
                        segundaSaida: formatHoraMinuto(sol.saida2),
                    }
                }

                const dia = dateToDDMMYYYY(sol.dia as Date)
                const chave = `${cpf}_${dia}`
                const espelho = espelhoMap.get(chave)

                const entrada1 = sol.entrada1 ?? espelho?.primeiraEntrada ?? null
                const saida1 = sol.saida1 ?? espelho?.primeiraSaida ?? null
                const entrada2 = sol.entrada2 ?? espelho?.segundaEntrada ?? null
                const saida2 = sol.saida2 ?? espelho?.segundaSaida ?? null
                
                return {
                    ...sol,
                    entrada1,
                    saida1,
                    entrada2,
                    saida2,

                    primeiraEntrada: formatHoraMinuto(entrada1),
                    primeiraSaida: formatHoraMinuto(saida1),
                    segundaEntrada: formatHoraMinuto(entrada2),
                    segundaSaida: formatHoraMinuto(saida2),
                }
            })

            return solicitacoesIntegradas
        } catch (error) {
            console.error('[Erro] getAllSolicitacoes:', error)
            throw new Error('Erro ao buscar todas as solicitações')
        }
    }


    async getSolicitacaoById(id: string) {
        try {
            return await this.prismaService.solicitacao.findUnique({
                where: {
                    id
                }
            })
        } catch (error) {
            throw new Error(`Erro ao buscar solicitação por ID. ${error}`)
        }
    }

    async createSolicitacao(solicitacao: CreateSolicitacaoDto) {
        try {
            const { chefeMatricula, ...rest } = solicitacao as any
            // Se aprovadorId não foi enviado e chefeMatricula foi informado, resolver pelo chefe
            if (!rest.aprovadorId && chefeMatricula) {
                const chefe = await this.prismaService.funcionario.findUnique({ where: { matricula: chefeMatricula }, select: { id: true } })
                if (!chefe) throw new Error(`Chefe com matrícula ${chefeMatricula} não encontrado.`)
                rest.aprovadorId = chefe.id
            }
            return this.prismaService.solicitacao.create({ data: rest })
        } catch (error) {
            throw new Error(`Erro ao criar solicitação. ${error}`)
        }
    }

    async updateSolicitacao(id: string, solicitacao: UpdateSolicitacaoDto) {
        try {
            return this.prismaService.solicitacao.update({
                where: {
                    id
                },
                data: solicitacao
            })
        } catch (error) {
            throw new Error(`Erro ao atualizar solicitação. ${error}`)
        }
    }

    async deleteSolicitacao(id: string) {
        try {
            return this.prismaService.solicitacao.delete({
                where: {
                    id
                }
            })
        } catch (error) {
            throw new Error(`Erro ao deletar solicitação. ${error}`)
        }
    }

    async importFromCsvBackup(filePath: string, recessoId: string): Promise<{ recebidos: number; criados: number; atualizados: number; erros: string[] }> {
        const content = fs.readFileSync(filePath, { encoding: 'utf8' })
        const lines = content.split(/\r?\n/).filter(l => l.trim().length > 0)
        if (!lines.length) return { recebidos: 0, criados: 0, atualizados: 0, erros: [] }
        const delimiter = lines[0].includes(';') ? ';' : ','
        const headers = lines[0].split(delimiter).map(h => h.trim().toUpperCase())
        const idx = (name: string) => headers.indexOf(name)
        const iMat = idx('MATRICULA')
        const iNome = idx('NOME')
        const iChefia = idx('NOME_CHEFIA')
        const iLot = idx('LOTACAO')
        const iDia = idx('DIA')
        const iE1 = idx('ENTRADA_1')
        const iS1 = idx('SAIDA_1')
        const iE2 = idx('ENTRADA_2')
        const iS2 = idx('SAIDA_2')
        const iOpc = idx('OPCAO')
        const iSta = idx('STATUS')
        const rows = lines.slice(1)
        const recebidos = rows.length
        const erros: string[] = []
        let criados = 0
        let atualizados = 0
        for (const line of rows) {
            try {
                const cols = line.split(delimiter).map(c => c.trim())
                const matricula = String(cols[iMat] || '').trim()
                const nomeServidor = String(cols[iNome] || '').trim()
                const nomeChefia = String(cols[iChefia] || '').trim()
                const lotacaoTxt = String(cols[iLot] || '').trim()
                const diaStr = String(cols[iDia] || '').trim()
                const e1 = String(cols[iE1] || '').trim()
                const s1 = String(cols[iS1] || '').trim()
                const e2 = String(cols[iE2] || '').trim()
                const s2 = String(cols[iS2] || '').trim()
                const opcaoRaw = String(cols[iOpc] || '').trim().toUpperCase()
                const statusRaw = String(cols[iSta] || '').trim().toUpperCase()
                if (!matricula || !diaStr) continue
                const dParts = diaStr.split('/')
                const dia = new Date(Number(dParts[2] || 0), Number(dParts[1] || 1) - 1, Number(dParts[0] || 1))
                const toTime = (base: Date, hhmmss?: string): Date | undefined => {
                    if (!hhmmss) return undefined
                    const m = hhmmss.match(/^(\d{2}):(\d{2}):(\d{2})$/)
                    if (!m) return undefined
                    const d = new Date(base)
                    d.setHours(Number(m[1] || 0))
                    d.setMinutes(Number(m[2] || 0))
                    d.setSeconds(Number(m[3] || 0))
                    d.setMilliseconds(0)
                    return d
                }
                let status: any = 'PENDENTE'
                if (statusRaw === 'VALIDADA' || statusRaw === 'APROVADA') status = 'APROVADA'
                else if (statusRaw === 'REJEITADA' || statusRaw === 'RECUSADA') status = 'RECUSADA'
                else if (statusRaw === 'CANCELADA') status = 'CANCELADA'
                const opcao = opcaoRaw === 'PAGAMENTO' ? 'PAGAMENTO' : (opcaoRaw === 'FOLGA' ? 'FOLGA' : null)
                let lotacaoId: string | undefined
                if (lotacaoTxt) {
                    const l1 = await this.prismaService.lotacao.findFirst({ where: { OR: [{ nome: lotacaoTxt }, { codigo: lotacaoTxt }] }, select: { id: true } })
                    if (l1) lotacaoId = l1.id
                    else {
                        const l2 = await this.prismaService.lotacao.create({ data: { nome: lotacaoTxt, codigo: lotacaoTxt } })
                        lotacaoId = l2.id
                    }
                } else {
                    lotacaoId = (await this.prismaService.lotacao.findFirst({ select: { id: true } }))?.id || (await this.prismaService.lotacao.create({ data: { nome: 'N/D' } })).id
                }
                const func = await this.prismaService.funcionario.findUnique({ where: { matricula }, select: { id: true } })
                const servidorId = func ? func.id : (await this.prismaService.funcionario.create({ data: { nome: nomeServidor || 'N/D', matricula, role: 'USER' } })).id
                const nomeEscala = `${nomeServidor || 'N/D'} - ${dia.toISOString().slice(0, 10)}`
                let escala = await this.prismaService.escala.findFirst({ where: { nome: nomeEscala, recessoId }, select: { id: true } })
                if (!escala) {
                    escala = await this.prismaService.escala.create({ data: { nome: nomeEscala, lotacaoId: lotacaoId!, recessoId, dataEscala: dia, recebePagamento: false, escalado: true, servidorId, servidorMatricula: matricula } })
                }
                const existente = await this.prismaService.solicitacao.findFirst({ where: { escalaId: escala.id, dia }, select: { id: true } })
                const payload = {
                    escalaId: escala.id,
                    criadorId: servidorId,
                    servidorMatricula: matricula,
                    nomeServidor,
                    nomeChefia: nomeChefia || undefined,
                    lotacao: lotacaoTxt || undefined,
                    dia,
                    entrada1: toTime(dia, e1),
                    saida1: toTime(dia, s1),
                    entrada2: toTime(dia, e2),
                    saida2: toTime(dia, s2),
                    opcao: opcao || undefined,
                    status,
                }
                if (existente) {
                    await this.prismaService.solicitacao.update({ where: { id: existente.id }, data: payload })
                    atualizados++
                } else {
                    await this.prismaService.solicitacao.create({ data: payload })
                    criados++
                }
            } catch (e: any) {
                erros.push(e?.message || String(e))
            }
        }
        return { recebidos, criados, atualizados, erros }
    }

    async getSolicitacoesPorMatricula(params: { matricula: string; recessoId?: string }) {
        const { matricula, recessoId } = params

        const where: any = { servidorMatricula: { equals: String(matricula), mode: 'insensitive' as any } }
        if (recessoId) where.escala = { recessoId }
        const solicitacoes = await this.prismaService.solicitacao.findMany({
            where,
            select: {
                id: true,
                status: true,
                aprovadorId: true,
                servidorMatricula: true,
                nomeServidor: true,
                nomeChefia: true,
                lotacao: true,
                dia: true,
                entrada1: true,
                saida1: true,
                entrada2: true,
                saida2: true,
                opcao: true,
                aprovador: { select: { nome: true, matricula: true, id: true } },
                escala: {
                    select: {
                        id: true,
                        nome: true,
                        escalado: true,
                        servidorMatricula: true,
                        dataEscala: true,
                        recebePagamento: true,
                        lotacao: { select: { nome: true } },
                        recesso: { select: { descricao: true } },
                    }
                }
            },
            orderBy: [{ dia: 'asc' }]
        })
        return solicitacoes
    }

    async aprovarSolicitacao(id: string, params: { aprovadorId?: string; chefeMatricula?: string; motivo?: string; status?: 'APROVADA' | 'RECUSADA' }) {
        const { aprovadorId, chefeMatricula, motivo } = params
        let aprovadorIdFinal = aprovadorId || null
        if (!aprovadorIdFinal && chefeMatricula) {
            const chefe = await this.prismaService.funcionario.findUnique({ where: { matricula: chefeMatricula }, select: { id: true } })
            if (chefe) aprovadorIdFinal = chefe.id
        }
        const status = params.status || 'APROVADA'
        return this.prismaService.solicitacao.update({
            where: { id },
            data: {
                aprovadorId: aprovadorIdFinal,
                status: status as any,
                motivo: motivo || undefined,
                updatedAt: new Date(),
            }
        })
    }

    async getSolicitacoesPorAprovadorMatricula(params: { matricula: string; recessoId?: string }) {
        const { matricula, recessoId } = params
        const where: any = { aprovador: { matricula: { equals: String(matricula), mode: 'insensitive' as any } } }
        if (recessoId) where.escala = { recessoId }
        const solicitacoes = await this.prismaService.solicitacao.findMany({
            where,
            select: {
                id: true,
                status: true,
                aprovadorId: true,
                servidorMatricula: true,
                nomeServidor: true,
                nomeChefia: true,
                lotacao: true,
                dia: true,
                entrada1: true,
                saida1: true,
                entrada2: true,
                saida2: true,
                opcao: true,
                aprovador: { select: { nome: true, matricula: true, id: true } },
                escala: {
                    select: {
                        id: true,
                        nome: true,
                        escalado: true,
                        servidorMatricula: true,
                        dataEscala: true,
                        recebePagamento: true,
                        lotacao: { select: { nome: true } },
                        recesso: { select: { descricao: true } },
                    }
                }
            },
            orderBy: [{ dia: 'asc' }]
        })
        return solicitacoes
    }
}
