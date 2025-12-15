import { Router, Request, Response, RequestHandler } from "express"
import { DashboardController } from "../controllers/dashboard-controller"
import { DashboardService } from "../services/dashboard-service"

const dashboardController = new DashboardController(new DashboardService())

export const dashboardRoutes = Router()

dashboardRoutes.get('/servidores-resumo', ((req: Request, res: Response) => { dashboardController.getResumoServidores(req, res) }) as RequestHandler)
dashboardRoutes.get('/escala-espelho-join', ((req: Request, res: Response) => { dashboardController.getEscalaEspelhoJoin(req, res) }) as RequestHandler)
