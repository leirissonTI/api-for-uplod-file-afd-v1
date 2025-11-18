import { Router } from "express"
import { upload } from "../config/multerConfig"

//contrler
import { ArquivoAfdController } from "../controllers/afd-controller"

const arquivoAfdController = new ArquivoAfdController()

export const arquivoAfdRoutes = Router()

arquivoAfdRoutes.post('/upload', upload.single('file'), arquivoAfdController.uploadFile.bind(arquivoAfdController))
arquivoAfdRoutes.post('/salvar', arquivoAfdController.salvarRegistros.bind(arquivoAfdController))
arquivoAfdRoutes.get('/:tipo', arquivoAfdController.getRegistrosPorTipo.bind(arquivoAfdController))
arquivoAfdRoutes.get('/cpf/:cpf', arquivoAfdController.getRegistrosPorCpf.bind(arquivoAfdController))