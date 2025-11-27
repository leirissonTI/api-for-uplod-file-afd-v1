import { z } from "zod";

export const SchemaUpdateRecesso = z.object({
       ano:  z.coerce.string().optional(),
       descricao: z.string().min(1).optional(),
       processoSei: z.string().min(1).optional(),
       abertoParaFrequencia: z.boolean().optional(),
       data_inicio: z.coerce.date().optional(),
       data_fim: z.coerce.date().optional(),
})
export type TUpdateRecessoDto = z.infer<typeof SchemaUpdateRecesso>
