"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
// Configuração do armazenamento
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/'); // Pasta onde os arquivos serão salvos
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`); // Nome único para evitar conflitos
    }
});
// Filtro opcional para aceitar apenas certos tipos de arquivo
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'text/plain' || file.mimetype === 'application/octet-stream' || file.mimetype === 'text/csv') {
        cb(null, true);
    }
    else {
        cb(new Error('Tipo de arquivo não permitido'), false);
    }
};
exports.upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
});
