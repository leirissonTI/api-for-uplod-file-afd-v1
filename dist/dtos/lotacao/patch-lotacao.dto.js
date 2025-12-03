"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchSchemaLotacao = void 0;
const zod_1 = require("zod");
exports.patchSchemaLotacao = zod_1.z.object({
    nome: zod_1.z.string().min(1, 'Nome é obrigatório')
});
