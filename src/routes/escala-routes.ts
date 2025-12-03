import { Router, Request, Response, RequestHandler } from "express"
import { EscalaController } from "../controllers/escala-controller";
import { EscalaService } from "../services/escala-service";


const router = Router()
const escalaController = new EscalaController(new EscalaService())

export const escalaRoutes = router

escalaRoutes.get("/all", ((req: Request, res: Response) => escalaController.getAllEscalas(req, res)) as RequestHandler)
escalaRoutes.post("/create",((req: Request, res: Response) => escalaController.createEscala(req, res)) as RequestHandler)
escalaRoutes.put("/update/:id", ((req: Request, res: Response) => escalaController.updateEscala(req, res)) as RequestHandler)
escalaRoutes.delete("/delete/:id", ((req: Request, res: Response) => escalaController.deleteEscala(req, res)) as RequestHandler)