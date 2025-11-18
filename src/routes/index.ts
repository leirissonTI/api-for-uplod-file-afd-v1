import { Router } from "express"
import { arquivoAfdRoutes } from "./arquivo-afd-routes"
import { espelhoPontoRoutes } from "./espelho-ponto-routes"

export const routes = Router()

// rotas da aplicação
routes.use('/afd-registros', arquivoAfdRoutes)
routes.use('/espelho', espelhoPontoRoutes)