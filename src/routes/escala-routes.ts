import { Router, Request, Response } from "express"
import { EscalaController } from "../controllers/escala-controller";
import { EscalaService } from "../services/escala-service";


const router = Router()
const escalaController = new EscalaController(new EscalaService())

export const escalaRoutes = router

escalaRoutes.get("/all", (req: Request, res: Response) => escalaController.getAllEscalas(req, res))
