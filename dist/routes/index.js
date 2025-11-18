"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const arquivo_afd_routes_1 = require("./arquivo-afd-routes");
const espelho_ponto_routes_1 = require("./espelho-ponto-routes");
exports.routes = (0, express_1.Router)();
// rotas da aplicação
exports.routes.use('/afd-registros', arquivo_afd_routes_1.arquivoAfdRoutes);
exports.routes.use('/espelho', espelho_ponto_routes_1.espelhoPontoRoutes);
