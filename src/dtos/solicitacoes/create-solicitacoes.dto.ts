import { z } from 'zod'

export const CreateSchemaSolicitacao = z.object({
    escalaId: z.string().min(1),
    criadorId: z.string().min(1),
    motivo: z.string().optional(),
    aprovadorId: z.string().optional(),
    chefeMatricula: z.string().optional(),
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

export type CreateSolicitacaoDto = z.infer<typeof CreateSchemaSolicitacao>
