import {z} from "zod"

export const createEscalaDtoSchema = z.object({
    nome: z.string().min(1, "O nome é obrigatório."),
    lotacaoId: z.string().min(1, "A lotação é obrigatória."),
    recessoId: z.string().min(1, "O recesso é obrigatório."),
    dataEscala: z.coerce.date({ invalid_type_error: 'dataEscala inválida' }),
    receberPagamento: z.boolean().default(false),
    escalado: z.boolean().default(false),
})

export type TCreateEscalaDto = z.infer<typeof createEscalaDtoSchema>
