import {z} from "zod"

export const createSchemaServidor = z.object({
    nome: z.string().min(1, "O nome é obrigatório"),
    email: z.string().optional(),
    matricula: z.string().min(1, "A matrícula é obrigatória"),
    role: z.enum(['ADMIN', 'USER','CHEFE']).default('USER')
})

export type CreateServidorDto = z.infer<typeof createSchemaServidor>
