export type EscalaEntity = {
    id: String
    nome: String
    lotacaoId: String
    dataEscala: Date
    recebePagamento: Boolean
    escalado: Boolean
    createdAt?: Date
    updatedAt?: Date | null
    recessoId: String
}
