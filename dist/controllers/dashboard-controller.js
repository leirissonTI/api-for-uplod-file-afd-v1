"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const zod_1 = require("zod");
const querySchema = zod_1.z.object({
    recessoId: zod_1.z.string().min(1),
    meses: zod_1.z.string().optional(),
});
class DashboardController {
    dashboardService;
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    async getResumoServidores(req, res) {
        try {
            const { recessoId, meses } = querySchema.parse(req.query);
            const data = await this.dashboardService.getResumoServidores({ recessoId, meses });
            return res.status(200).json({ success: true, message: 'Resumo por servidor e mês', data });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return res.status(400).json({ success: false, error: 'Erro de validação', message: error.issues.map(i => i.message).join(', ') });
            }
            return res.status(500).json({ success: false, error: 'Erro ao gerar resumo', message: `${error.message || error}` });
        }
    }
}
exports.DashboardController = DashboardController;
