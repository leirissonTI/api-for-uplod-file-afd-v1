"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSchemaSolicitacao = void 0;
const zod_1 = __importDefault(require("zod"));
const prisma_1 = require("../../generated/prisma");
exports.UpdateSchemaSolicitacao = zod_1.default.object({
    escalaId: zod_1.default.string().optional(),
    criadorId: zod_1.default.string().optional(),
    aprovadorId: zod_1.default.string().nullable(),
    status: zod_1.default.nativeEnum(prisma_1.SolicitacaoStatus).optional(),
    motivo: zod_1.default.string().nullable().optional(),
    createdAt: zod_1.default.date().optional(),
    updatedAt: zod_1.default.date().nullable().optional(),
    // frequência diária
    matricula: zod_1.default.string().optional(),
    nome: zod_1.default.string().optional(),
    nomeChefia: zod_1.default.string().optional(),
    lotacao: zod_1.default.string().optional(),
    dia: zod_1.default.coerce.date().optional(),
    entrada1: zod_1.default.string().optional(),
    saida1: zod_1.default.string().optional(),
    entrada2: zod_1.default.string().optional(),
    saida2: zod_1.default.string().optional(),
    opcao: zod_1.default.enum(['FOLGA', 'PAGAMENTO']).optional(),
    espelhoDiarioId: zod_1.default.number().optional(),
});
