import {z} from 'zod'

export const patchSchemaLotacao = z.object({
    nome: z.string().min(1, 'Nome é obrigatório')
})

export type PatchLotacaoDto = z.infer<typeof patchSchemaLotacao>
