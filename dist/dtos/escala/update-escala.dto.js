"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEscalaDto = void 0;
const zod_1 = require("zod");
exports.updateEscalaDto = zod_1.z.object({
    nome: zod_1.z.string().optional(),
    lotacaoId: zod_1.z.string().optional(),
    recessoId: zod_1.z.string().optional(),
    dataEscala: zod_1.z.date().optional(),
    receberPagamento: zod_1.z.boolean().optional(),
    escalado: zod_1.z.boolean().optional(),
});
