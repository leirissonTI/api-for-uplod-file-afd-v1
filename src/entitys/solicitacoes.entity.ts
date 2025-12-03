import { SolicitacaoStatus } from "../generated/prisma"

export type solicitacao = {
    id: string
    escalaId: string
    criadorId: string
    aprovadorId: string | null
    status: SolicitacaoStatus
    motivo: string | null
    createdAt: Date
    updatedAt: Date | null
}