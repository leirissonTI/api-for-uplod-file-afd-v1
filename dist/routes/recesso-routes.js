"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recessoRoutes = void 0;
const express_1 = require("express");
const recesso_controller_1 = require("../controllers/recesso-controller");
const recesso_service_1 = require("../services/recesso-service");
const prisma_1 = require("../config/prisma");
// Criando uma instância do serviço RecessoService
// Isso é necessário para injetar a dependência do PrismaClient no serviço
// passando a ultilizar a injeção de dependência no controller e no service
// para melhor separar as responsabilidades e facilitar a manutenção
const recessoService = new recesso_service_1.RecessoService(prisma_1.prisma);
const recessoController = new recesso_controller_1.RecessoController(recessoService);
exports.recessoRoutes = (0, express_1.Router)();
exports.recessoRoutes.get('/all', (req, res) => recessoController.getAllRecesso(req, res));
exports.recessoRoutes.get('/:id', (req, res) => recessoController.getRecessoById(req, res));
exports.recessoRoutes.put('/update/:id', (req, res) => recessoController.updateRecesso(req, res));
exports.recessoRoutes.post('/create', (req, res) => recessoController.createRecesso(req, res));
exports.recessoRoutes.delete('/delete/:id', (req, res) => recessoController.deleteRecesso(req, res));
