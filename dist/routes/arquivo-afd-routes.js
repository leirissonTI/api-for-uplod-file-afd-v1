"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arquivoAfdRoutes = void 0;
const express_1 = require("express");
const multerConfig_1 = require("../config/multerConfig");
//contrler
const afd_controller_1 = require("../controllers/afd-controller");
const arquivoAfdController = new afd_controller_1.ArquivoAfdController();
exports.arquivoAfdRoutes = (0, express_1.Router)();
exports.arquivoAfdRoutes.post('/upload', multerConfig_1.upload.single('file'), arquivoAfdController.uploadFile.bind(arquivoAfdController));
exports.arquivoAfdRoutes.post('/salvar', arquivoAfdController.salvarRegistros.bind(arquivoAfdController));
exports.arquivoAfdRoutes.get('/:tipo', arquivoAfdController.getRegistrosPorTipo.bind(arquivoAfdController));
exports.arquivoAfdRoutes.get('/cpf/:cpf', arquivoAfdController.getRegistrosPorCpf.bind(arquivoAfdController));
