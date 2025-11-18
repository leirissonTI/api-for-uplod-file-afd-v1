"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArquivoAfdController = void 0;
const afd_services_1 = require("../services/afd-services");
const send_response_1 = require("../utils/send-response");
class ArquivoAfdController {
    afdService;
    registrosCache;
    constructor() {
        this.afdService = new afd_services_1.AfdService();
        this.registrosCache = [];
    }
    async uploadFile(request, response) {
        try {
            const file = request.file;
            if (!file) {
                (0, send_response_1.sendResponse)(response, {
                    success: false,
                    error: 'Arquivo não enviado',
                    statusCode: 400,
                });
                return;
            }
            const registros = await this.afdService.parseFile(file.path);
            this.registrosCache = registros;
            (0, send_response_1.sendResponse)(response, {
                success: true,
                message: 'Arquivo processado com sucesso',
                data: {
                    totalRegistros: registros.length,
                    registrosPreview: registros.slice(0, 400),
                },
                statusCode: 200,
            });
        }
        catch (error) {
            (0, send_response_1.sendResponse)(response, {
                success: false,
                error: error.message || 'Erroro ao processar o arquivo',
                statusCode: 500,
            });
        }
    }
    async getRegistrosPorTipo(request, response) {
        try {
            const tipo = request.params.tipo;
            // Se não houver cache, retorna erro
            if (!this.registrosCache.length) {
                (0, send_response_1.sendResponse)(response, {
                    success: false,
                    error: 'Nenhum arquivo processado.',
                    statusCode: 400,
                });
                return;
            }
            //filtrando registros por tipo
            const registrosDoTipo = this.registrosCache
                .filter((registro) => registro.tipo === tipo)
                .map((registro) => registro.parsed);
            // Se não houver registros do tipo solicitado, retorna erro
            if (registrosDoTipo.length === 0) {
                (0, send_response_1.sendResponse)(response, {
                    success: false,
                    error: `Nenhum registro do tipo ${tipo} encontrado.`,
                    statusCode: 404,
                });
                return;
            }
            // Retorna os registros filtrados
            (0, send_response_1.sendResponse)(response, {
                success: true,
                message: `Registros do tipo ${tipo}`,
                data: {
                    tipo,
                    total: registrosDoTipo.length,
                    registros: registrosDoTipo,
                },
                statusCode: 200,
            });
        }
        catch (error) {
            // Captura erros e envia resposta de erro
            (0, send_response_1.sendResponse)(response, {
                success: false,
                error: error.message || 'Erro ao buscar registros',
                statusCode: 500,
            });
        }
    }
    async getRegistrosPorCpf(request, response) {
        let registro;
        try {
            const cpf = request.params.cpf;
            // Filtra registros do tipo '3' e usa parsed
            registro = this.registrosCache
                .filter((r) => r.tipo === '3')
                .map((r) => r.parsed);
            // Agora filtra pelos registros com CPF igual ao solicitado
            registro = registro.filter((r) => r.cpfEmpregado === cpf);
            // Se não houver registros do tipo solicitado, retorna erro
            if (registro.length === 0) {
                response.json({
                    success: false,
                    error: `Nenhum registro do CPF ${cpf} encontrado.`,
                    statusCode: 404,
                });
                return;
            }
            // Retorna os registros filtrados
            response.json({
                success: true,
                message: `Registros do CPF ${cpf}`,
                data: {
                    cpf,
                    total: registro.length,
                    registro,
                }
            });
        }
        catch (error) {
            // Captura erros e envia resposta de erro
            (0, send_response_1.sendResponse)(response, {
                success: false,
                error: error.message || 'Erro ao buscar registros',
                statusCode: 500,
            });
        }
    }
    async salvarRegistros(request, response) {
        try {
            if (!this.registrosCache.length) {
                (0, send_response_1.sendResponse)(response, {
                    success: false,
                    error: 'Nenhum arquivo processado.',
                    statusCode: 400,
                });
                return;
            }
            // Verifica se já existem registros salvos
            await this.afdService.salvarRegistros(this.registrosCache);
            (0, send_response_1.sendResponse)(response, {
                success: true,
                message: 'Registros salvos com sucesso',
                statusCode: 201,
            });
        }
        catch (error) {
        }
    }
}
exports.ArquivoAfdController = ArquivoAfdController;
