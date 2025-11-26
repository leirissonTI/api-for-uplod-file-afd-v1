"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecessoSchema = void 0;
const zod_1 = require("zod");
exports.createRecessoSchema = zod_1.z.object({
    ano: zod_1.z.coerce.date(),
    descricao: zod_1.z.string().min(1),
    processoSei: zod_1.z.string().min(1),
    abertoParaFrequencia: zod_1.z.boolean(),
    data_inicio: zod_1.z.coerce.date(),
    data_fim: zod_1.z.coerce.date(),
});
