import { Router, Request, Response, RequestHandler } from "express"
import { SarhController } from "../controllers/sarh-controller"
import { SarhImportService } from "../services/sarh-import-service"
import { upload } from "../config/multerConfig"

const sarhController = new SarhController(new SarhImportService())

export const sarhRoutes = Router()

sarhRoutes.post('/importar-csv', upload.single('file'), ((req: Request, res: Response) => { sarhController.importCsv(req, res) }) as RequestHandler)
sarhRoutes.get('/listar-funcionarios', ((req: Request, res: Response) => { sarhController.listar(req, res) }) as RequestHandler)
