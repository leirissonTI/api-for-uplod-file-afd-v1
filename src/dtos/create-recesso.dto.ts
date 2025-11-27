import { z } from 'zod'


export const createRecessoSchema = z.object({
    ano: z.coerce.string(),
    descricao: z.string().min(1),
    processoSei: z.string().min(1),
    abertoParaFrequencia: z.boolean(),
    data_inicio: z.coerce.date(),
    data_fim: z.coerce.date(),
})

export type CreateRecessoDto = z.infer<typeof createRecessoSchema>



