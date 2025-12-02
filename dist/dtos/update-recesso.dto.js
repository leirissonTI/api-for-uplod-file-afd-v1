"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaUpdateRecesso = void 0;
const zod_1 = require("zod");
exports.SchemaUpdateRecesso = zod_1.z.object({
    ano: zod_1.z.coerce.string().optional(),
    descricao: zod_1.z.string().min(1).optional(),
    processoSei: zod_1.z.string().min(1).optional(),
    abertoParaFrequencia: zod_1.z.boolean().optional(),
    data_inicio: zod_1.z.coerce.date().optional(),
    data_fim: zod_1.z.coerce.date().optional(),
});
