import { Router, Request,Response, RequestHandler } from "express";

import { EspelhoPontoController } from '../controllers/espelho-ponto-controller'

const espelhoPontoController = new EspelhoPontoController()

export const espelhoPontoRoutes = Router()


espelhoPontoRoutes.get('/diario', (req: Request, res: Response) => espelhoPontoController.getallEspelhoDiario(req, res))
espelhoPontoRoutes.get('/mensal', (req: Request, res: Response) => espelhoPontoController.getallEspelhoMensal(req, res))
espelhoPontoRoutes.post('/gerar-espelho/:cpf/:mesAno', (req: Request, res: Response) => espelhoPontoController.gerarEspelhoMensal(req, res))
espelhoPontoRoutes.get('/resgatar-espelho-mes/:cpf/:mesAno', ((req: Request, res: Response) => { espelhoPontoController.resgatarEspelhoDoMes(req, res) }) as RequestHandler)
espelhoPontoRoutes.get('/resgatar-espelho-diario-mes/:cpf/:mesAno', ((req: Request, res: Response) => { espelhoPontoController.resgatarPontosDiariosDoMes(req, res) }) as RequestHandler)
