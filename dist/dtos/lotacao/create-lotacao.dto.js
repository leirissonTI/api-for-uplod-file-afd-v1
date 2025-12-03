"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchmeaLotacao = void 0;
const zod_1 = require("zod");
exports.createSchmeaLotacao = zod_1.z.object({
    nome: zod_1.z.string().min(1, 'Nome é obrigatório')
});
