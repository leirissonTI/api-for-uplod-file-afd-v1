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
    // frequência diária
    matricula: zod_1.z.string().optional(),
    nome: zod_1.z.string().optional(),
    nomeChefia: zod_1.z.string().optional(),
    lotacao: zod_1.z.string().optional(),
    dia: zod_1.z.coerce.date().optional(),
    entrada1: zod_1.z.string().optional(),
    saida1: zod_1.z.string().optional(),
    entrada2: zod_1.z.string().optional(),
    saida2: zod_1.z.string().optional(),
    opcao: zod_1.z.enum(['FOLGA', 'PAGAMENTO']).optional(),
    espelhoDiarioId: zod_1.z.number().optional(),
});
