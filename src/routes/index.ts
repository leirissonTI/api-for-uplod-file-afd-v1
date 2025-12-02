import { Router } from "express"
import { arquivoAfdRoutes } from "./arquivo-afd-routes"
import { espelhoPontoRoutes } from "./espelho-ponto-routes"
import { recessoRoutes } from "./recesso-routes"
import { escalaRoutes } from "./escala-routes"
import { servidorRoutes } from "./servidores-routes"

export const routes = Router()

// rotas da aplicação
routes.use('/afd-registros', arquivoAfdRoutes)
routes.use('/espelho', espelhoPontoRoutes)
routes.use('/recesso', recessoRoutes)
routes.use('/escala', escalaRoutes)
routes.use('/servidor', servidorRoutes)