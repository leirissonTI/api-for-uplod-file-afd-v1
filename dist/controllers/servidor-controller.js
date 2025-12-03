"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServidorController = void 0;
const zod_1 = require("zod");
const create_servidor_dto_1 = require("../dtos/servidor/create-servidor.dto");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const update_servidor_dto_1 = require("../dtos/servidor/update-servidor.dto");
class ServidorController {
    servidorService;
    constructor(servidorService) {
        this.servidorService = servidorService;
    }
    async getAllServidores(req, res) {
        try {
            const servidores = await this.servidorService.getAllServidores();
            return res.status(200).json({
                success: true,
                message: 'Servidores resgatados com sucesso.',
                data: servidores
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                error: 'Erro ao buscar todos os servidores.',
                message: `${error.message}`
            });
        }
    }
    /**
     * Cria um novo servidor.
     * @param req - O objeto de solicitação HTTP.
     * @param res - O objeto de resposta HTTP.
     * @returns Uma promessa que resolve para o servidor criado.
     */
    async createServidor(req, res) {
        try {
            const payload = create_servidor_dto_1.createSchemaServidor.parse(req.body);
            const criado = await this.servidorService.createServidor(payload);
            return res.status(201).json({ success: true, message: 'Servidor criado com sucesso.', data: criado });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return res.status(400).json({ success: false, error: 'Erro de validação.', message: error.issues.map(i => i.message).join(', ') });
            }
            return res.status(500).json({ success: false, error: 'Erro ao criar servidor.', message: `${error.message}` });
        }
    }
    async importarServidoresEmLote(req, res) {
        try {
            const schema = zod_1.z.array(create_servidor_dto_1.createSchemaServidor);
            let registros;
            if (req.file) {
                const filePath = req.file.path;
                const content = fs_1.default.readFileSync(path_1.default.resolve(filePath), 'utf8');
                const lines = content.split(/\r?\n/).filter(l => l.trim() !== '');
                const headerLine = lines[0];
                const delimiter = headerLine.includes(';') ? ';' : ',';
                const headers = headerLine.split(delimiter).map(h => h.trim().toLowerCase());
                const rows = lines.slice(1).map(line => {
                    const cols = line.split(delimiter).map(c => c.trim());
                    const obj = {};
                    headers.forEach((h, idx) => { obj[h] = cols[idx] ?? ''; });
                    return obj;
                });
                registros = rows.map(r => ({
                    nome: String(r.nome || r["name"] || '').trim(),
                    email: String(r.email || '').trim(),
                    matricula: String(r.matricula || r["matricula"] || '').trim(),
                    role: String(r.role || '').toUpperCase()
                }));
            }
            else {
                registros = schema.parse(req.body);
            }
            const registrosValidados = schema.parse(registros);
            const resultado = await this.servidorService.importarServidoresEmLote(registrosValidados);
            return res.status(200).json({ success: true, message: 'Importação concluída.', data: resultado });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return res.status(400).json({ success: false, error: 'Erro de validação.', message: error.issues.map(i => i.message).join(', ') });
            }
            return res.status(500).json({ success: false, error: 'Erro ao importar servidores em lote.', message: `${error.message}` });
        }
    }
    async getServidorById(req, res) {
        try {
            const servidor = await this.servidorService.getServidorById(req.params.id);
            return res.status(200).json({ success: true, message: 'Servidor resgatado com sucesso.', data: servidor });
        }
        catch (error) {
            return res.status(500).json({ success: false, error: 'Erro ao buscar servidor por id.', message: `${error.message}` });
        }
    }
    /**
     * Atualiza um servidor existente.
     * @param req - O objeto de solicitação HTTP.
     * @param res - O objeto de resposta HTTP.
     * @returns Uma promessa que resolve para o servidor atualizado.
     */
    async updateServidor(req, res) {
        try {
            const payload = update_servidor_dto_1.updateServidorSchema.parse(req.body);
            const atualizado = await this.servidorService.updateServidor(req.params.id, payload);
            return res.status(200).json({ success: true, message: 'Servidor atualizado com sucesso.', data: atualizado });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return res.status(400).json({ success: false, error: 'Erro de validação.', message: error.issues.map(i => i.message).join(', ') });
            }
            return res.status(500).json({ success: false, error: 'Erro ao atualizar servidor.', message: `${error.message}` });
        }
    }
    /**
     * Deleta um servidor existente.
     * @param req - O objeto de solicitação HTTP.
     * @param res - O objeto de resposta HTTP.
     * @returns Uma promessa que resolve para o servidor deletado.
     */
    async deleteServidor(req, res) {
        try {
            await this.servidorService.deleteServidor(req.params.id);
            return res.status(200).json({ success: true, message: 'Servidor deletado com sucesso.' });
        }
        catch (error) {
            return res.status(500).json({ success: false, error: 'Erro ao deletar servidor.', message: `${error.message}` });
        }
    }
}
exports.ServidorController = ServidorController;
