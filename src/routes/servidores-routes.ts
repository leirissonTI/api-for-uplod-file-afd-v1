import { Router, Request, Response, RequestHandler } from "express";
import { upload } from "../config/multerConfig";
import { ServidorController } from "../controllers/servidor-controller";
import { ServidorService } from "../services/servidor-service";
import { prisma } from "../config/prisma";

const servidorService = new ServidorService(prisma)
const servidorController = new ServidorController(servidorService)

export const servidorRoutes = Router()

servidorRoutes.get('/all', ((req: Request, res: Response) => { servidorController.getAllServidores(req, res) }) as RequestHandler)
servidorRoutes.post('/create', ((req: Request, res: Response) => { servidorController.createServidor(req, res) }) as RequestHandler)
servidorRoutes.post('/create/bulk', upload.single('file'), ((req: Request, res: Response) => { servidorController.importarServidoresEmLote(req, res) }) as RequestHandler)
servidorRoutes.post('/create', ((req: Request, res: Response) => { servidorController.createServidor(req, res) }) as RequestHandler)
servidorRoutes.get('/:id', ((req: Request, res: Response) => { servidorController.getServidorById(req, res) }) as RequestHandler)
servidorRoutes.put('/:id', ((req: Request, res: Response) => { servidorController.updateServidor(req, res) }) as RequestHandler)
servidorRoutes.delete('/:id', ((req: Request, res: Response) => { servidorController.deleteServidor(req, res) }) as RequestHandler)
