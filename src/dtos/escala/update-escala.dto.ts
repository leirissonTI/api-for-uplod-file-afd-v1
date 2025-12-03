import {z} from "zod"


export const updateEscalaDto = z.object({
    nome: z.string().optional(),
    lotacaoId: z.string().optional(),
    recessoId: z.string().optional(),
    dataEscala: z.date().optional(),
    receberPagamento: z.boolean().optional(),
    escalado: z.boolean().optional(),
})

export type TUpdateEscalaDto = z.infer<typeof updateEscalaDto>
