import { Router, Request, Response, RequestHandler } from "express"
import { FrequenciaController } from "../controllers/frequencia-controller"
import { FrequenciaService } from "../services/frequencia-service"

const frequenciaController = new FrequenciaController(new FrequenciaService())

export const frequenciaRoutes = Router()

frequenciaRoutes.post('/importar', ((req: Request, res: Response) => { frequenciaController.importar(req, res) }) as RequestHandler)
frequenciaRoutes.get('/por-recesso', ((req: Request, res: Response) => { frequenciaController.listarPorRecesso(req, res) }) as RequestHandler)
frequenciaRoutes.get('/por-recesso/:recessoId', ((req: Request, res: Response) => { frequenciaController.listarPorRecesso(req, res) }) as RequestHandler)
