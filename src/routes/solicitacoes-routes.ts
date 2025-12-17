import { Router, Request, Response, RequestHandler } from "express"
import { SolicitacoesController } from "../controllers/solicitacoes-controller";
import { SolicitacoesService } from "../services/solicitacoes-service";
import { prisma } from "../config/prisma";
import { upload } from "../config/multerConfig";

const solicitacoesController = new SolicitacoesController(new SolicitacoesService(prisma));




export const solicitacoesRouter = Router();


const getAllHandler: RequestHandler = (req: Request, res: Response) => { solicitacoesController.getAllSolicitacoes(req, res) }
const createHandler: RequestHandler = (req: Request, res: Response) => { solicitacoesController.createSolicitacao(req, res) }
const updateHandler: RequestHandler = (req: Request, res: Response) => { solicitacoesController.updateSolicitacao(req, res) }
const getByIdHandler: RequestHandler = (req: Request, res: Response) => { solicitacoesController.getSolicitacaoById(req, res) }
const deleteHandler: RequestHandler = (req: Request, res: Response) => { solicitacoesController.deleteSolicitacao(req, res) }
const searchHandler: RequestHandler = (req: Request, res: Response) => { (solicitacoesController as any).buscarPorMatricula(req, res) }
const approveHandler: RequestHandler = (req: Request, res: Response) => { (solicitacoesController as any).aprovarSolicitacao(req, res) }
const searchAprovadorHandler: RequestHandler = (req: Request, res: Response) => { (solicitacoesController as any).buscarPorAprovadorMatricula(req, res) }


solicitacoesRouter.get("/all", getAllHandler);
solicitacoesRouter.get("/search", searchHandler);
solicitacoesRouter.get("/search/aprovador", searchAprovadorHandler);
solicitacoesRouter.post("/create", createHandler);
solicitacoesRouter.put("/update/:id", updateHandler);
solicitacoesRouter.put("/approve/:id", approveHandler);
solicitacoesRouter.get("/:id", getByIdHandler);
solicitacoesRouter.delete("/delete/:id", deleteHandler);
solicitacoesRouter.post("/import/csv", upload.single('file'), ((req: Request, res: Response) => { solicitacoesController.importFromCsvBackup(req, res) }) as RequestHandler);

