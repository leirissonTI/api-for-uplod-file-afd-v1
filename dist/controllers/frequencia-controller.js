"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrequenciaController = void 0;
const zod_1 = require("zod");
const importSchema = zod_1.z.object({
    recessoId: zod_1.z.string().min(1),
    servidorMatricula: zod_1.z.string().min(1),
});
const recessoQuerySchema = zod_1.z.object({
    recessoId: zod_1.z.string().min(1),
});
class FrequenciaController {
    frequenciaService;
    constructor(frequenciaService) {
        this.frequenciaService = frequenciaService;
    }
    async importar(req, res) {
        try {
            const body = importSchema.parse(req.body);
            const data = await this.frequenciaService.importarDoEspelho(body);
            return res.status(200).json({ success: true, message: 'Frequências importadas do espelho diário', data });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return res.status(400).json({ success: false, error: 'Erro de validação', message: error.issues.map(i => i.message).join(', ') });
            }
            return res.status(500).json({ success: false, error: 'Erro ao importar frequências', message: `${error.message || error}` });
        }
    }
    async listarPorRecesso(req, res) {
        try {
            const { recessoId } = recessoQuerySchema.parse({ recessoId: String(req.query.recessoId || req.params.recessoId || '') });
            const data = await this.frequenciaService.listarPorRecesso(recessoId);
            return res.status(200).json({ success: true, message: 'Frequências por recesso', data });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return res.status(400).json({ success: false, error: 'Erro de validação', message: error.issues.map(i => i.message).join(', ') });
            }
            return res.status(500).json({ success: false, error: 'Erro ao listar frequências', message: `${error.message || error}` });
        }
    }
}
exports.FrequenciaController = FrequenciaController;
