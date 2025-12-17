"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEscalaDtoSchema = void 0;
const zod_1 = require("zod");
const diaItemSchema = zod_1.z.union([
    zod_1.z.coerce.date(),
    zod_1.z.object({
        data: zod_1.z.union([zod_1.z.string(), zod_1.z.coerce.date()]),
        opcao: zod_1.z.enum(['folga', 'pagamento']).optional()
    })
]);
exports.createEscalaDtoSchema = zod_1.z.object({
    nome: zod_1.z.string().min(1, "O nome é obrigatório."),
    lotacaoId: zod_1.z.string().min(1, "A lotação é obrigatória."),
    recessoId: zod_1.z.string().min(1, "O recesso é obrigatório."),
    chefeId: zod_1.z.string().optional(),
    dataEscala: zod_1.z.union([zod_1.z.coerce.date(), zod_1.z.string()]).optional(),
    diasEscala: zod_1.z.array(diaItemSchema).optional(),
    escalaFolgar: zod_1.z.array(zod_1.z.union([zod_1.z.string(), zod_1.z.coerce.date()])).optional(),
    escalaReceberPagamento: zod_1.z.array(zod_1.z.union([zod_1.z.string(), zod_1.z.coerce.date()])).optional(),
    receberPagamento: zod_1.z.boolean().default(false),
    escalado: zod_1.z.boolean().default(false),
    servidorId: zod_1.z.string().optional(),
    servidorMatricula: zod_1.z.string().optional(),
    chefeMatricula: zod_1.z.string().optional(),
    motivo: zod_1.z.string().optional(),
}).refine(o => !!o.dataEscala || (!!o.diasEscala && o.diasEscala.length > 0), { message: 'Informe dataEscala ou diasEscala', path: ['diasEscala'] });
