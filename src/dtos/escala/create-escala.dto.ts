import {z} from "zod"

export const createEscalaDtoSchema = z.object({
    nome: z.string().min(1, "O nome é obrigatório."),
    lotacaoId: z.string().min(1, "A lotação é obrigatória."),
    recessoId: z.string().min(1, "O recesso é obrigatório."),
    dataEscala: z.coerce.date({ invalid_type_error: 'dataEscala inválida' }).optional(),
    diasEscala: z.array(z.coerce.date()).optional(),
    receberPagamento: z.boolean().default(false),
    escalado: z.boolean().default(false),
    servidorId: z.string().optional(),
    servidorMatricula: z.string().optional(),
    chefeId: z.string().optional(),
    chefeMatricula: z.string().optional(),
    motivo: z.string().optional(),
}).refine(o => !!o.dataEscala || (!!o.diasEscala && o.diasEscala.length > 0), { message: 'Informe dataEscala ou diasEscala', path: ['diasEscala'] })

export type TCreateEscalaDto = z.infer<typeof createEscalaDtoSchema>
