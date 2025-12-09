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
});
