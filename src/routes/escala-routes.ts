import { Router, Request, Response, RequestHandler } from "express"
import { EscalaController } from "../controllers/escala-controller";
import { EscalaService } from "../services/escala-service";


const router = Router()
const escalaController = new EscalaController(new EscalaService())

export const escalaRoutes = router

const getAllHandler: RequestHandler = (req: Request, res: Response) => { escalaController.getAllEscalas(req, res) }
const createHandler: RequestHandler = (req: Request, res: Response) => { escalaController.createEscala(req, res) }
const createByNamesHandler: RequestHandler = (req: Request, res: Response) => { escalaController.createEscalaPorNomes(req, res) }
const resumoHandler: RequestHandler = (req: Request, res: Response) => { escalaController.getResumo(req, res) }
const updateHandler: RequestHandler = (req: Request, res: Response) => { escalaController.updateEscala(req, res) }
const deleteHandler: RequestHandler = (req: Request, res: Response) => { escalaController.deleteEscala(req, res) }
const byDescricaoHandler: RequestHandler = (req: Request, res: Response) => { escalaController.getEscalasPorRecessoDescricao(req, res) }

escalaRoutes.get("/all", getAllHandler)
escalaRoutes.post("/create", createHandler)
escalaRoutes.post("/create/by-names", createByNamesHandler)
escalaRoutes.get("/resumo/:recessoId/:matricula", resumoHandler)
escalaRoutes.get("/recesso/descricao/:descricao", byDescricaoHandler)
escalaRoutes.put("/update/:id", updateHandler)
escalaRoutes.delete("/delete/:id", deleteHandler)
