import { Router, Request, Response, RequestHandler } from "express"
import { SolicitacoesController } from "../controllers/solicitacoes-controller";
import { SolicitacoesService } from "../services/solicitacoes-service";
import { prisma } from "../config/prisma";

const solicitacoesController = new SolicitacoesController(new SolicitacoesService(prisma));




export const solicitacoesRouter = Router();


const getAllHandler: RequestHandler = (req: Request, res: Response) => { solicitacoesController.getAllSolicitacoes(req, res) }
const createHandler: RequestHandler = (req: Request, res: Response) => { solicitacoesController.createSolicitacao(req, res) }
const updateHandler: RequestHandler = (req: Request, res: Response) => { solicitacoesController.updateSolicitacao(req, res) }
const getByIdHandler: RequestHandler = (req: Request, res: Response) => { solicitacoesController.getSolicitacaoById(req, res) }
const deleteHandler: RequestHandler = (req: Request, res: Response) => { solicitacoesController.deleteSolicitacao(req, res) }


solicitacoesRouter.get("/all", getAllHandler);
solicitacoesRouter.post("/create", createHandler);
solicitacoesRouter.put("/update/:id", updateHandler);
solicitacoesRouter.get("/:id", getByIdHandler);
solicitacoesRouter.delete("/delete/:id", deleteHandler);

