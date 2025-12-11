import { Request, Response } from "express"
import { z } from "zod"
import { DashboardService } from "../services/dashboard-service"

const querySchema = z.object({
  recessoId: z.string().min(1),
  meses: z.string().optional(),
})

export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  async getResumoServidores(req: Request, res: Response) {
    try {
      const { recessoId, meses } = querySchema.parse(req.query as any)
      const data = await this.dashboardService.getResumoServidores({ recessoId, meses })
      return res.status(200).json({ success: true, message: 'Resumo por servidor e mês', data })
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, error: 'Erro de validação', message: error.issues.map(i=>i.message).join(', ') })
      }
      return res.status(500).json({ success: false, error: 'Erro ao gerar resumo', message: `${error.message || error}` })
    }
  }
}
