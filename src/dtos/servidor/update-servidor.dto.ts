import { z } from "zod";


export const updateServidorSchema = z.object({
    nome: z.string().optional(),
    email: z.string().email().optional(),
    matricula: z.string().optional(),
    role: z.string().optional(),
})

export type UpdateServidorDto = z.infer<typeof updateServidorSchema>

