import { Router, Request,Response, RequestHandler } from "express";
import { RecessoController } from "../controllers/recesso-controller";
import { RecessoService } from "../services/recesso-service";
import { prisma } from "../config/prisma";

// Criando uma instância do serviço RecessoService
// Isso é necessário para injetar a dependência do PrismaClient no serviço
// passando a ultilizar a injeção de dependência no controller e no service
// para melhor separar as responsabilidades e facilitar a manutenção
const recessoService = new RecessoService(prisma)
const recessoController = new RecessoController(recessoService)

export const recessoRoutes = Router()


recessoRoutes.get('/all', (req: Request, res: Response) => recessoController.getAllRecesso(req, res))
recessoRoutes.get('/:id', (req: Request, res: Response) => recessoController.getRecessoById(req, res))
recessoRoutes.put('/update/:id', (req: Request, res: Response) => recessoController.updateRecesso(req, res))
recessoRoutes.post('/create', (req: Request, res: Response) => recessoController.createRecesso(req, res))
recessoRoutes.delete('/delete/:id', (req: Request, res: Response) => recessoController.deleteRecesso(req, res))
