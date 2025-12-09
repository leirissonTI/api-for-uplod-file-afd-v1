import { Router } from "express"
import { arquivoAfdRoutes } from "./arquivo-afd-routes"
import { espelhoPontoRoutes } from "./espelho-ponto-routes"
import { recessoRoutes } from "./recesso-routes"
import { escalaRoutes } from "./escala-routes"
import { servidorRoutes } from "./servidores-routes"
import { lotacaoRoutes } from "./lotacao-routes"
import { solicitacoesRouter } from "./solicitacoes-routes"

export const routes = Router()

// rotas da aplicação
routes.use('/afd-registros', arquivoAfdRoutes)
routes.use('/espelho', espelhoPontoRoutes)
routes.use('/recesso', recessoRoutes)
routes.use('/lotacao', lotacaoRoutes)
routes.use('/escala', escalaRoutes)
routes.use('/servidor', servidorRoutes)
routes.use('/solicitacoes', solicitacoesRouter)