import z from 'zod'

export const SchemaIdRecesso = z.object({
    id: z.string().uuid(),
})
export type TIdRecessoDto = z.infer<typeof SchemaIdRecesso>
