"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolicitacoesController = void 0;
const create_solicitacoes_dto_1 = require("../dtos/solicitacoes/create-solicitacoes.dto");
const UpdateSolicitacaoModule = __importStar(require("../dtos/solicitacoes/update-solicitacoes"));
const path_1 = __importDefault(require("path"));
class SolicitacoesController {
    solicitacoesService;
    constructor(solicitacoesService) {
        this.solicitacoesService = solicitacoesService;
    }
    async getAllSolicitacoes(req, res) {
        try {
            res.json(await this.solicitacoesService.getAllSolicitacoes());
        }
        catch (error) {
            console.log(error);
        }
    }
    /**
     * Cria uma nova solicitação
     * @param req
     * @param res
     */
    async createSolicitacao(req, res) {
        try {
            // validar o body da requisição
            const body = create_solicitacoes_dto_1.CreateSchemaSolicitacao.parse(req.body);
            const criada = await this.solicitacoesService.createSolicitacao(body);
            return res.status(201).json({ success: true, message: 'Solicitação criada com sucesso.' });
        }
        catch (error) {
            if (error.issues) {
                return res.status(400).json({ success: false, error: 'Erro de validação', message: error.issues });
            }
            return res.status(500).json({ success: false, error: 'Erro ao criar solicitação', message: `${error.message || error}` });
        }
    }
    /**
     * Obtém uma solicitação por ID
     * @param req
     * @param res
     */
    async getSolicitacaoById(req, res) {
        try {
            const id = req.params.id;
            const solicitacao = await this.solicitacoesService.getSolicitacaoById(id);
            if (!solicitacao) {
                return res.status(404).json({ success: false, error: 'Solicitação não encontrada.' });
            }
            return res.status(200).json({ success: true, solicitacao });
        }
        catch (error) {
            return res.status(500).json({ success: false, error: 'Erro ao obter solicitação por ID', message: `${error.message || error}` });
        }
    }
    async updateSolicitacao(req, res) {
        try {
            // validar o body da requisição
            const id = req.params.id;
            const body = UpdateSolicitacaoModule.UpdateSchemaSolicitacao.parse(req.body);
            const atualizada = await this.solicitacoesService.updateSolicitacao(id, body);
            return res.status(200).json({ success: true, message: 'Solicitação atualizada com sucesso.' });
        }
        catch (error) {
            if (error.issues) {
                return res.status(400).json({ success: false, error: 'Erro de validação', message: error.issues });
            }
            return res.status(500).json({ success: false, error: 'Erro ao atualizar solicitação', message: `${error.message || error}` });
        }
    }
    async deleteSolicitacao(req, res) {
        try {
            const id = req.params.id;
            await this.solicitacoesService.deleteSolicitacao(id);
            return res.status(200).json({ success: true, message: 'Solicitação deletada com sucesso.' });
        }
        catch (error) {
            return res.status(500).json({ success: false, error: 'Erro ao deletar solicitação', message: `${error.message || error}` });
        }
    }
    async importFromCsvBackup(req, res) {
        try {
            const recessoId = String(req.query.recessoId || req.params.recessoId || '').trim();
            if (!recessoId)
                return res.status(400).json({ success: false, error: 'Parâmetros inválidos', message: 'Informe recessoId' });
            if (!req.file)
                return res.status(400).json({ success: false, error: 'Arquivo não enviado', message: 'Envie um arquivo CSV no campo file' });
            const filePath = path_1.default.resolve(req.file.path);
            const resultado = await this.solicitacoesService.importFromCsvBackup(filePath, recessoId);
            return res.status(200).json({ success: true, message: 'Importação de frequências concluída.', data: resultado });
        }
        catch (error) {
            return res.status(500).json({ success: false, error: 'Erro ao importar frequências do backup', message: `${error.message || error}` });
        }
    }
    async buscarPorMatricula(req, res) {
        try {
            const matricula = String(req.query.matricula || req.params.matricula || '').trim();
            const recessoId = String(req.query.recessoId || '').trim();
            if (!matricula)
                return res.status(400).json({ success: false, error: 'Parâmetros inválidos', message: 'Informe matricula' });
            const data = await this.solicitacoesService.getSolicitacoesPorMatricula({ matricula, recessoId: recessoId || undefined });
            return res.status(200).json({ success: true, message: 'Solicitações filtradas por matrícula', data });
        }
        catch (error) {
            return res.status(500).json({ success: false, error: 'Erro ao buscar solicitações por matrícula', message: `${error.message || error}` });
        }
    }
    async aprovarSolicitacao(req, res) {
        try {
            const id = String(req.params.id || '').trim();
            const { aprovadorId, chefeMatricula, motivo, status } = (req.body || {});
            if (!id)
                return res.status(400).json({ success: false, error: 'Parâmetros inválidos', message: 'Informe id' });
            const atualizada = await this.solicitacoesService.aprovarSolicitacao(id, { aprovadorId, chefeMatricula, motivo, status });
            return res.status(200).json({ success: true, message: 'Solicitação atualizada com sucesso.', data: atualizada });
        }
        catch (error) {
            return res.status(500).json({ success: false, error: 'Erro ao aprovar/atualizar solicitação', message: `${error.message || error}` });
        }
    }
    async buscarPorAprovadorMatricula(req, res) {
        try {
            const matricula = String(req.query.matricula || req.params.matricula || '').trim();
            const recessoId = String(req.query.recessoId || '').trim();
            if (!matricula)
                return res.status(400).json({ success: false, error: 'Parâmetros inválidos', message: 'Informe matricula' });
            const data = await this.solicitacoesService.getSolicitacoesPorAprovadorMatricula({ matricula, recessoId: recessoId || undefined });
            return res.status(200).json({ success: true, message: 'Solicitações filtradas por matrícula de aprovador', data });
        }
        catch (error) {
            return res.status(500).json({ success: false, error: 'Erro ao buscar solicitações por matrícula de aprovador', message: `${error.message || error}` });
        }
    }
}
exports.SolicitacoesController = SolicitacoesController;
