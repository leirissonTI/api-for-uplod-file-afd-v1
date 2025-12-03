"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateServidorSchema = void 0;
const zod_1 = require("zod");
exports.updateServidorSchema = zod_1.z.object({
    nome: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
    matricula: zod_1.z.string().optional(),
    role: zod_1.z.string().optional(),
});
