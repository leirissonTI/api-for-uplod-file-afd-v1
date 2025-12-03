import { z } from 'zod'
import { SolicitacaoStatus } from '../../generated/prisma'

export const CreateSchemaSolicitacao = z.object({
        id: z.string(),
        escalaId: z.string(),
        criadorId: z.string(),
        aprovadorId: z.string().nullable(),
        status: z.nativeEnum(SolicitacaoStatus),
        motivo: z.string().nullable(),
        createdAt: z.date(),
        updatedAt: z.date().nullable(),
})

export type CreateSolicitacaoDto = z.infer<typeof CreateSchemaSolicitacao>