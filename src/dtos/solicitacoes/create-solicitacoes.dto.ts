import { z } from 'zod'

export const CreateSchemaSolicitacao = z.object({
    escalaId: z.string().min(1),
    criadorId: z.string().min(1),
    motivo: z.string().optional(),
    aprovadorId: z.string().optional(),
    chefeMatricula: z.string().optional(),
})

export type CreateSolicitacaoDto = z.infer<typeof CreateSchemaSolicitacao>
