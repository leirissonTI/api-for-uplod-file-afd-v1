"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchemaServidor = void 0;
const zod_1 = require("zod");
exports.createSchemaServidor = zod_1.z.object({
    nome: zod_1.z.string().min(1, "O nome é obrigatório"),
    email: zod_1.z.string().optional(),
    matricula: zod_1.z.string().min(1, "A matrícula é obrigatória"),
    role: zod_1.z.enum(['ADMIN', 'USER', 'CHEFE']).default('USER')
});
