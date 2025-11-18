"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const cors_1 = __importDefault(require("cors"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
//adicionar o cors
// Ou libera apenas para um domínio específico:
exports.app.use((0, cors_1.default)({
    origin: [
        '*',
        'http://pontojus.app.am.trf1.gov.br',
        'http://localhost:5007',
        'http://localhost:3003',
        'http://192.168.0.100:3003',
        'http://172.20.48.1:3003',
        'http://172.27.80.1:3003',
        'http://172.19.33.23:3004',
        'http://172.19.3.52:3004',
        'http://localhost:3004',
        'http://172.19.5.127:3007',
        'http://172.20.48.1:5007',
        'http://172.19.3.52:5007',
        'http://172.19.3.52:3007',
        'http://172.19.5.127:5007'
    ], // origens específicas
    credentials: true // permite cookies e auth headers
}));
exports.app.get('/', (_, response) => {
    response.json({
        messgae: 'api funcionando'
    });
});
//rotas 
exports.app.use('/api/v1', routes_1.routes);
