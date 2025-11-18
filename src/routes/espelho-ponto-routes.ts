import { Router, Request,Response } from "express";

import { EspelhoPontoController } from '../controllers/espelho-ponto-controller'

const espelhoPontoController = new EspelhoPontoController()

export const espelhoPontoRoutes = Router()


espelhoPontoRoutes.get('/diario', espelhoPontoController.getallEspelhoDiario.bind(espelhoPontoController))
espelhoPontoRoutes.get('/mensal', espelhoPontoController.getallEspelhoMensal.bind(espelhoPontoController))
espelhoPontoRoutes.post('/gerar-espelho/:cpf/:mesAno', espelhoPontoController.gerarEspelhoMensal.bind(espelhoPontoController))
espelhoPontoRoutes.get('/resgatar-espelho-mes/:cpf/:mesAno', espelhoPontoController.resgatarEspelhoDoMes.bind(espelhoPontoController))
espelhoPontoRoutes.get('/resgatar-espelho-diario-mes/:cpf/:mesAno', espelhoPontoController.resgatarPontosDiariosDoMes.bind(espelhoPontoController))