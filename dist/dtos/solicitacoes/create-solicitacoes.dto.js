"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSchemaSolicitacao = void 0;
const zod_1 = require("zod");
exports.CreateSchemaSolicitacao = zod_1.z.object({
    escalaId: zod_1.z.string().min(1),
    criadorId: zod_1.z.string().min(1),
    motivo: zod_1.z.string().optional(),
    aprovadorId: zod_1.z.string().optional(),
    chefeMatricula: zod_1.z.string().optional(),
});
