import { PrismaClient } from "../generated/prisma"
import { prisma } from "../config/prisma"

export class FrequenciaService {
  constructor(private prismaService: PrismaClient = prisma) {}

  async importarDoEspelho(params: { recessoId: string; servidorMatricula: string }) {
    const { recessoId, servidorMatricula } = params
    const recesso = await this.prismaService.recesso.findUnique({ where: { id: recessoId }, select: { id: true, DataInicial: true, dataFinal: true } })
    if (!recesso) throw new Error(`Recesso ${recessoId} não encontrado.`)
    const servidor = await this.prismaService.funcionario.findUnique({ where: { matricula: servidorMatricula }, select: { id: true, nome: true } })
    if (!servidor) throw new Error(`Servidor com matrícula ${servidorMatricula} não encontrado.`)

    let cpf: string | undefined
    try {
      const matriculaSafe = servidorMatricula.replace(/'/g, "''")
      const rows: Array<{ CPF?: string }> = await this.prismaService.$queryRawUnsafe(`SELECT CPF FROM sarh_funcionario WHERE MATRICULA = '${matriculaSafe}'`)
      if (rows && rows.length && rows[0].CPF) cpf = String(rows[0].CPF)
    } catch {}

    const start = new Date(recesso.DataInicial)
    const end = new Date(recesso.dataFinal)
    const days: Date[] = []
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d))
    }

    const resultados: { criadas: number; atualizadas: number; semEspelho: number } = { criadas: 0, atualizadas: 0, semEspelho: 0 }

    const toTime = (baseDate: Date, hhmm?: string | null): Date | undefined => {
      if (!hhmm) return undefined
      const parts = hhmm.split(':')
      if (parts.length < 2) return undefined
      const h = Number(parts[0])
      const m = Number(parts[1])
      const d = new Date(baseDate)
      d.setHours(h)
      d.setMinutes(m)
      d.setSeconds(0)
      d.setMilliseconds(0)
      return d
    }

    for (const dia of days) {
      const yyyy = dia.getFullYear()
      const mm = String(dia.getMonth() + 1)
      const dd = String(dia.getDate())
      const mesComZero = `${mm.padStart(2,'0')}/${yyyy}`
      const mesSemZero = `${Number(mm)}/${yyyy}`
      const diaComZero = `${dd.padStart(2,'0')}`
      const diaSemZero = `${Number(dd)}`

      let ed = null as null | { primeiraEntrada?: string | null; primeiraSaida?: string | null; segundaEntrada?: string | null; segundaSaida?: string | null }
      if (cpf) {
        ed = await this.prismaService.espelhoDiario.findFirst({
          where: {
            cpf,
            OR: [
              { mesAno: mesComZero, diaDoMes: diaComZero },
              { mesAno: mesComZero, diaDoMes: diaSemZero },
              { mesAno: mesSemZero, diaDoMes: diaComZero },
              { mesAno: mesSemZero, diaDoMes: diaSemZero },
            ]
          },
          select: { primeiraEntrada: true, primeiraSaida: true, segundaEntrada: true, segundaSaida: true }
        })
      }
      if (!ed) { resultados.semEspelho++; continue }

      const nomeFinal = `${servidor.nome} - ${dia.toISOString().slice(0,10)}`
      let escala = await this.prismaService.escala.findFirst({ where: { nome: nomeFinal, recessoId }, select: { id: true } })
      if (!escala) {
        escala = await this.prismaService.escala.create({
          data: {
            nome: nomeFinal,
            lotacaoId: (await this.prismaService.lotacao.findFirst({ select: { id: true } }))?.id || (await this.prismaService.lotacao.create({ data: { nome: `N/D-${servidorMatricula}` } })).id,
            recessoId,
            dataEscala: dia,
            recebePagamento: false,
            escalado: true,
            servidorId: servidor.id,
            servidorMatricula: servidorMatricula,
          }
        })
      }

      const existente = await this.prismaService.solicitacao.findFirst({ where: { escalaId: escala.id, dia }, select: { id: true } })
      if (existente) {
        await this.prismaService.solicitacao.update({
          where: { id: existente.id },
          data: {
            criadorId: servidor.id,
            servidorMatricula: servidorMatricula,
            nomeServidor: servidor.nome,
            dia,
            entrada1: toTime(dia, ed.primeiraEntrada || undefined),
            saida1: toTime(dia, ed.primeiraSaida || undefined),
            entrada2: toTime(dia, ed.segundaEntrada || undefined),
            saida2: toTime(dia, ed.segundaSaida || undefined),
            opcao: 'FOLGA',
          }
        })
        resultados.atualizadas++
      } else {
        await this.prismaService.solicitacao.create({
          data: {
            escalaId: escala.id,
            criadorId: servidor.id,
            servidorMatricula: servidorMatricula,
            nomeServidor: servidor.nome,
            dia,
            entrada1: toTime(dia, ed.primeiraEntrada || undefined),
            saida1: toTime(dia, ed.primeiraSaida || undefined),
            entrada2: toTime(dia, ed.segundaEntrada || undefined),
            saida2: toTime(dia, ed.segundaSaida || undefined),
            opcao: 'FOLGA',
          }
        })
        resultados.criadas++
      }
    }

    return resultados
  }

  async listarPorRecesso(recessoId: string): Promise<Array<{
    matricula: string
    nome: string
    lotacao: string
    dia: Date
    entrada1?: Date | null
    saida1?: Date | null
    entrada2?: Date | null
    saida2?: Date | null
    opcao?: string | null
    status?: string
    aprovado?: boolean
  }>> {
    const solicitacoes = await this.prismaService.solicitacao.findMany({
      where: { escala: { recessoId } },
      select: {
        dia: true,
        entrada1: true,
        saida1: true,
        entrada2: true,
        saida2: true,
        opcao: true,
        status: true,
        nomeServidor: true,
        servidorMatricula: true,
        escala: {
          select: {
            nome: true,
            servidorMatricula: true,
            lotacao: { select: { nome: true } },
          }
        }
      }
    })
    const mapped = solicitacoes.map(s => {
      const matricula = String(s.servidorMatricula || s.escala?.servidorMatricula || 'N/D')
      let nome = String(s.nomeServidor || '')
      if (!nome) {
        const n = s.escala?.nome ? String(s.escala.nome) : ''
        nome = n ? n.split(' - ')[0] : 'N/D'
      }
      const lotacao = s.escala?.lotacao?.nome || 'N/D'
      return {
        matricula,
        nome,
        lotacao,
        dia: s.dia,
        entrada1: s.entrada1 || null,
        saida1: s.saida1 || null,
        entrada2: s.entrada2 || null,
        saida2: s.saida2 || null,
        opcao: s.opcao || null,
        status: String(s.status || ''),
        aprovado: String(s.status || '') === 'APROVADA'
      }
    })
    mapped.sort((a, b) => {
      if (a.matricula === b.matricula) return a.dia.getTime() - b.dia.getTime()
      return a.matricula.localeCompare(b.matricula)
    })
    return mapped
  }
}
