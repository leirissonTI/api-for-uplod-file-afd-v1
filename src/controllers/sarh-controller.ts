import { Request, Response } from "express"
import { SarhImportService } from "../services/sarh-import-service"
import { z } from "zod"

const paramsSchema = z.object({
  recessoId: z.string().min(1).optional(),
})

export class SarhController {
  constructor(private sarhService: SarhImportService) {}

  async importCsv(req: Request, res: Response) {
    try {
      paramsSchema.parse(req.query as any)
      const file = (req as any).file
      if (!file || !file.path) return res.status(400).json({ success: false, error: 'Arquivo CSV não encontrado no upload (campo file)' })
      const result = await this.sarhService.importFromCsv(file.path)
      return res.status(200).json({ success: true, message: 'Importação de sarh_funcionario concluída', data: result })
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, error: 'Erro de validação', message: error.issues.map(i=>i.message).join(', ') })
      }
      return res.status(500).json({ success: false, error: 'Erro ao importar CSV', message: `${error.message || error}` })
    }
  }

  async listar(req: Request, res: Response) {
    try {
      const q = typeof req.query.q === 'string' ? req.query.q : undefined
      const limit = req.query.limit ? Number(req.query.limit) : undefined
      const offset = req.query.offset ? Number(req.query.offset) : undefined
      const data = await this.sarhService.listFuncionarios({ q, limit, offset })
      return res.status(200).json({ success: true, message: 'Lista de funcionários SARH', data })
    } catch (error: any) {
      return res.status(500).json({ success: false, error: 'Erro ao listar SARH', message: `${error.message || error}` })
    }
  }
}
