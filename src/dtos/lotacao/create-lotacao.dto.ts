import {z} from 'zod'


export const createSchmeaLotacao = z.object({
    nome: z.string().min(1, 'Nome é obrigatório')
})

export type CreateLotacaoDto = z.infer<typeof createSchmeaLotacao>
