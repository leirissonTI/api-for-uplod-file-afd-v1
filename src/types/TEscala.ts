export type TCreateEscalaDto = {
    nome: string
    lotacaoId: string
    recessoId: string
    dataEscala?: Date
    diasEscala?: Array<Date | { data: string | Date; opcao?: 'folga' | 'pagamento' }>
    servidorId?: string
    servidorMatricula?: string
    chefeId: string
    chefeMatricula?: string
    motivo?: string
    receberPagamento: boolean
    escalado: boolean
    escalaFolgar?: Array<string | Date>
    escalaReceberPagamento?: Array<string | Date>
}
