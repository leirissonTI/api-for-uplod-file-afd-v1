import { Router, Request, Response, RequestHandler } from "express"
import { LotacaoController } from "../controllers/lotacao-controller"
import { LotacaoService } from "../services/lotacao-service"
import { prisma } from "../config/prisma";

const lotacaoController = new LotacaoController(new LotacaoService(prisma))

export const lotacaoRoutes = Router()

lotacaoRoutes.get("/all",((req: Request, res: Response) => { lotacaoController.getAllLotacao(req, res) }) as RequestHandler)
lotacaoRoutes.get("/search",((req: Request, res: Response) => { lotacaoController.buscarPorNome(req, res) }) as RequestHandler)
lotacaoRoutes.post("/create",((req: Request, res: Response) => { lotacaoController.createLotacao(req, res) }) as RequestHandler)
lotacaoRoutes.patch("/update/:id",((req: Request, res: Response) => { lotacaoController.updateLotacao(req, res) }) as RequestHandler)
lotacaoRoutes.delete("/delete/:id",((req: Request, res: Response) => { lotacaoController.deleteLotacao(req, res) }) as RequestHandler)
lotacaoRoutes.post("/import/from-sarh",((req: Request, res: Response) => { lotacaoController.importarDoSarh(req, res) }) as RequestHandler)
