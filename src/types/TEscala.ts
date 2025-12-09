export type TCreateEscalaDto = {
    nome: string
    lotacaoId: string
    recessoId: string
    dataEscala?: Date
    diasEscala?: Date[]
    servidorId?: string
    servidorMatricula?: string
    chefeId?: string
    chefeMatricula?: string
    motivo?: string
    receberPagamento: boolean
    escalado: boolean
}
