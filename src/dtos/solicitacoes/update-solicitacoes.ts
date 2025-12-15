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
    // frequência diária
    matricula: z.string().optional(),
    nome: z.string().optional(),
    nomeChefia: z.string().optional(),
    lotacao: z.string().optional(),
    dia: z.coerce.date().optional(),
    entrada1: z.string().optional(),
    saida1: z.string().optional(),
    entrada2: z.string().optional(),
    saida2: z.string().optional(),
    opcao: z.enum(['FOLGA','PAGAMENTO']).optional(),
    espelhoDiarioId: z.number().optional(),
})

export type UpdateSolicitacaoDto = z.infer<typeof UpdateSchemaSolicitacao>
