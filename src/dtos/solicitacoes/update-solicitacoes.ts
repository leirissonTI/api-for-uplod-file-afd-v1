import z from "zod"
import { SolicitacaoStatus } from "../../generated/prisma"

export const UpdateSchemaSolicitacao = z.object({
    escalaId: z.string().optional(),
    criadorId: z.string().optional(),
    aprovadorId: z.string().nullable(),
    status: z.nativeEnum(SolicitacaoStatus).optional(),
    motivo: z.string().nullable().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().nullable().optional(),
})

export type UpdateSolicitacaoDto = z.infer<typeof UpdateSchemaSolicitacao>
