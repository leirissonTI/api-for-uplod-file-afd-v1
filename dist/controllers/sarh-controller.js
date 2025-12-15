"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SarhController = void 0;
const zod_1 = require("zod");
const paramsSchema = zod_1.z.object({
    recessoId: zod_1.z.string().min(1).optional(),
});
class SarhController {
    sarhService;
    constructor(sarhService) {
        this.sarhService = sarhService;
    }
    async importCsv(req, res) {
        try {
            paramsSchema.parse(req.query);
            const file = req.file;
            if (!file || !file.path)
                return res.status(400).json({ success: false, error: 'Arquivo CSV não encontrado no upload (campo file)' });
            const result = await this.sarhService.importFromCsv(file.path);
            return res.status(200).json({ success: true, message: 'Importação de sarh_funcionario concluída', data: result });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return res.status(400).json({ success: false, error: 'Erro de validação', message: error.issues.map(i => i.message).join(', ') });
            }
            return res.status(500).json({ success: false, error: 'Erro ao importar CSV', message: `${error.message || error}` });
        }
    }
    async listar(req, res) {
        try {
            const q = typeof req.query.q === 'string' ? req.query.q : undefined;
            const limit = req.query.limit ? Number(req.query.limit) : undefined;
            const offset = req.query.offset ? Number(req.query.offset) : undefined;
            const data = await this.sarhService.listFuncionarios({ q, limit, offset });
            return res.status(200).json({ success: true, message: 'Lista de funcionários SARH', data });
        }
        catch (error) {
            return res.status(500).json({ success: false, error: 'Erro ao listar SARH', message: `${error.message || error}` });
        }
    }
}
exports.SarhController = SarhController;
