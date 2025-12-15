import { Request, Response } from "express"
import { z } from "zod"
import { FrequenciaService } from "../services/frequencia-service"

const importSchema = z.object({
  recessoId: z.string().min(1),
  servidorMatricula: z.string().min(1),
})

const recessoQuerySchema = z.object({
  recessoId: z.string().min(1),
})

export class FrequenciaController {
  constructor(private frequenciaService: FrequenciaService) {}

  async importar(req: Request, res: Response) {
    try {
      const body = importSchema.parse(req.body as any)
      const data = await this.frequenciaService.importarDoEspelho(body)
      return res.status(200).json({ success: true, message: 'Frequências importadas do espelho diário', data })
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, error: 'Erro de validação', message: error.issues.map(i=>i.message).join(', ') })
      }
      return res.status(500).json({ success: false, error: 'Erro ao importar frequências', message: `${error.message || error}` })
    }
  }

  async listarPorRecesso(req: Request, res: Response) {
    try {
      const { recessoId } = recessoQuerySchema.parse({ recessoId: String(req.query.recessoId || req.params.recessoId || '') })
      const data = await this.frequenciaService.listarPorRecesso(recessoId)
      return res.status(200).json({ success: true, message: 'Frequências por recesso', data })
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, error: 'Erro de validação', message: error.issues.map(i=>i.message).join(', ') })
      }
      return res.status(500).json({ success: false, error: 'Erro ao listar frequências', message: `${error.message || error}` })
    }
  }
}
