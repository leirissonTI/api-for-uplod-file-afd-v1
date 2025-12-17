import { Request, Response } from "express"
import { z } from "zod"
import { DashboardService } from "../services/dashboard-service"

const querySchema = z.object({
  recessoId: z.string().min(1),
  meses: z.string().optional(),
})

const statusQuerySchema = z.object({
  recessoId: z.string().min(1),
  setor: z.string().optional(),
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

  async getEscalaEspelhoJoin(req: Request, res: Response) {
    try {
      const recessoId = String(req.query.recessoId || req.params.recessoId || '')
      if (!recessoId) return res.status(400).json({ success: false, error: 'Parâmetro recessoId é obrigatório' })
      const data = await this.dashboardService.getEscalaEspelhoJoin(recessoId)
      return res.status(200).json({ success: true, message: 'Join Escala x EspelhoDiario', data })
    } catch (error: any) {
      return res.status(500).json({ success: false, error: 'Erro ao executar join', message: `${error.message || error}` })
    }
  }

  async getStatusRecessoPorCpf(req: Request, res: Response) {
    try {
      const { recessoId, setor } = statusQuerySchema.parse(req.query as any)
      const data = await this.dashboardService.getStatusRecessoPorCpf({ recessoId, setor })
      return res.status(200).json({ success: true, message: 'Status RECESSO por CPF', data })
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, error: 'Erro de validação', message: error.issues.map(i=>i.message).join(', ') })
      }
      return res.status(500).json({ success: false, error: 'Erro ao gerar status de recesso', message: `${error.message || error}` })
    }
  }
}
