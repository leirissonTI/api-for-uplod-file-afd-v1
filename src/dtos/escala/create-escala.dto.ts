import { z } from "zod"

const diaItemSchema = z.union([
  z.coerce.date(),
  z.object({
    data: z.union([z.string(), z.coerce.date()]),
    opcao: z.enum(['folga', 'pagamento']).optional()
  })
])

export const createEscalaDtoSchema = z.object({
  nome: z.string().min(1, "O nome é obrigatório."),
  lotacaoId: z.string().min(1, "A lotação é obrigatória."),
  recessoId: z.string().min(1, "O recesso é obrigatório."),
  chefeId: z.string().min(1, "O chefeId é obrigatório."),
  dataEscala: z.union([z.coerce.date(), z.string()]).optional(),
  diasEscala: z.array(diaItemSchema).optional(),
  escalaFolgar: z.array(z.union([z.string(), z.coerce.date()])).optional(),
  escalaReceberPagamento: z.array(z.union([z.string(), z.coerce.date()])).optional(),
  receberPagamento: z.boolean().default(false),
  escalado: z.boolean().default(false),
  servidorId: z.string().optional(),
  servidorMatricula: z.string().optional(),
  chefeMatricula: z.string().optional(),
  motivo: z.string().optional(),
}).refine(o => !!o.dataEscala || (!!o.diasEscala && o.diasEscala.length > 0), { message: 'Informe dataEscala ou diasEscala', path: ['diasEscala'] })

export type TCreateEscalaDto = z.infer<typeof createEscalaDtoSchema>
