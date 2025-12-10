import { z } from 'zod'


export const createRecessoSchema = z.object({
    ano: z.union([z.string(), z.coerce.number(), z.coerce.date()]),
    descricao: z.string().min(1),
    processoSei: z.string().min(1),
    abertoParaFrequencia: z.boolean(),
    data_inicio: z.union([z.string(), z.coerce.date()]),
    data_fim: z.union([z.string(), z.coerce.date()]),
})

export type CreateRecessoDto = z.infer<typeof createRecessoSchema>



