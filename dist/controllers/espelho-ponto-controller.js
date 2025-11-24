"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EspelhoPontoController = void 0;
const espelho_ponto_services_1 = require("../services/espelho-ponto-services");
const getInicioFimDoMes_1 = require("../utils/getInicioFimDoMes");
class EspelhoPontoController {
    service = new espelho_ponto_services_1.EspelhoPontoService();
    async gerarEspelhoMensal(request, response) {
        try {
            const { cpf, mesAno } = request.params;
            if (!cpf || !mesAno) {
                return response.json({
                    success: false,
                    error: `É necessário informar os dados CPF e DATA.`,
                });
            }
            if (cpf.length !== 11 || !/^\d+$/.test(cpf)) {
                return response.json({
                    success: false,
                    error: `CPF deve conter exatamente 11 dígitos numéricos.`,
                });
            }
            const mesAnoArray = mesAno.split('-');
            if (mesAnoArray.length !== 2) {
                return response.json({
                    success: false,
                    error: `Formato de data inválido. Use o formato MM-AAAA (ex: 01-2025).`,
                });
            }
            const [mes, ano] = mesAnoArray.map(Number);
            if (isNaN(mes) || isNaN(ano) || mes < 1 || mes > 12 || ano < 2000 || ano > 2100) {
                return response.json({
                    success: false,
                    error: `Data inválida. Mês deve ser entre 01-12 e ano entre 2000-2100.`,
                });
            }
            const agora = new Date();
            const mesAtual = agora.getMonth() + 1;
            const anoAtual = agora.getFullYear();
            if (ano > anoAtual || (ano === anoAtual && mes > mesAtual)) {
                return response.status(400).json({
                    success: false,
                    error: `Não é possível gerar espelho para mês futuro. Mês/Ano atual: ${mesAtual.toString().padStart(2, '0')}/${anoAtual}`,
                });
            }
            const { inicioDoMes, inicioDoProximoMes } = (0, getInicioFimDoMes_1.getInicioFimDoMes)(mes, ano);
            const espelho = await this.service.gerarEspelhoMensal(cpf, inicioDoMes, inicioDoProximoMes);
            return response.json({
                success: true,
                message: `Espelho mensal gerado com sucesso para ${mes.toString().padStart(2, '0')}/${ano}.`,
                data: espelho
            });
        }
        catch (error) {
            return response.json({
                success: false,
                error: `Erro ao gerar espelho mensal.`,
                message: error.message
            });
        }
    }
    async resgatarPontosDiariosDoMes(request, response) {
        try {
            const { cpf, mesAno } = request.params;
            // Validação básica de parâmetros
            if (!cpf || !mesAno) {
                response.status(400).json({
                    success: false,
                    error: `É necessário informar os dados CPF e DATA.`,
                });
            }
            // Validação do formato CPF (opcional)
            if (cpf.length !== 11 || !/^\d+$/.test(cpf)) {
                response.status(400).json({
                    success: false,
                    error: `CPF deve conter exatamente 11 dígitos numéricos.`,
                });
            }
            // Validação do formato de data MM-AAAA
            const formatoDataValido = /^\d{2}-\d{4}$/;
            if (!formatoDataValido.test(mesAno)) {
                response.status(400).json({
                    success: false,
                    error: `Formato de data inválido. Use o formato MM-AAAA (ex: 01-2025).`,
                });
            }
            const mesAnoArray = mesAno.split('-');
            if (mesAnoArray.length !== 2) {
                response.status(400).json({
                    success: false,
                    error: `Formato de data inválido. Use o formato MM-AAAA (ex: 01-2025).`,
                });
            }
            const [mes, ano] = mesAnoArray.map(Number);
            // Validação do formato da data
            if (isNaN(mes) || isNaN(ano) || mes < 1 || mes > 12 || ano < 2000 || ano > 2100) {
                response.status(400).json({
                    success: false,
                    error: `Data inválida. Mês deve ser entre 01-12 e ano entre 2000-2100.`,
                });
            }
            // Validação se o mês informado é maior que o atual
            const agora = new Date();
            const mesAtual = agora.getMonth() + 1;
            const anoAtual = agora.getFullYear();
            if (ano > anoAtual || (ano === anoAtual && mes > mesAtual)) {
                response.status(400).json({
                    success: false,
                    error: `Não é possível gerar espelho para mês futuro. Mês/Ano atual: ${mesAtual.toString().padStart(2, '0')}/${anoAtual}`,
                });
            }
            const { inicioDoMes, inicioDoProximoMes } = (0, getInicioFimDoMes_1.getInicioFimDoMes)(mes, ano);
            const espelho = await this.service.getEspelhoDiarioPorMes(cpf, inicioDoMes);
            response.status(200).json({
                success: true,
                message: `Espelho mensal resgatado com sucesso para ${mes.toString().padStart(2, '0')}/${ano}.`,
                data: espelho
            });
        }
        catch (error) {
            response.status(500).json({
                success: false,
                error: `Erro ao resgatar espelho mensal.`,
                message: `${error.message}`
            });
        }
    }
    async resgatarEspelhoDoMes(request, response) {
        try {
            const { cpf, mesAno } = request.params;
            // Validação básica de parâmetros
            if (!cpf || !mesAno) {
                response.json({
                    success: false,
                    error: `É necessário informar os dados CPF e DATA.`,
                });
            }
            // Validação do formato CPF (opcional)
            if (cpf.length !== 11 || !/^\d+$/.test(cpf)) {
                response.json({
                    success: false,
                    error: `CPF deve conter exatamente 11 dígitos numéricos.`,
                });
            }
            const mesAnoArray = mesAno.split('-');
            if (mesAnoArray.length !== 2) {
                response.json({
                    success: false,
                    error: `Formato de data inválido. Use o formato MM-AAAA (ex: 01-2025).`,
                });
            }
            const [mes, ano] = mesAnoArray.map(Number);
            // Validação do formato da data
            if (isNaN(mes) || isNaN(ano) || mes < 1 || mes > 12 || ano < 2000 || ano > 2100) {
                response.json({
                    success: false,
                    error: `Data inválida. Mês deve ser entre 01-12 e ano entre 2000-2100.`,
                });
            }
            // Validação se o mês informado é maior que o atual
            const agora = new Date();
            const mesAtual = agora.getMonth() + 1;
            const anoAtual = agora.getFullYear();
            if (ano > anoAtual || (ano === anoAtual && mes > mesAtual)) {
                response.status(400).json({
                    success: false,
                    error: `Não é possível gerar espelho para mês futuro. Mês/Ano atual: ${mesAtual.toString().padStart(2, '0')}/${anoAtual}`,
                });
            }
            const espelho = await this.service.getEspelhoFormado(cpf, String(mes), String(ano));
            response.json({
                success: true,
                message: `Espelho mensal do mês: ${mes.toString().padStart(2, '0')}/${ano}.`,
                data: espelho
            });
        }
        catch (error) {
            response.json({
                success: false,
                error: `Erro ao resgatar espelho mensal.`,
                message: `${error.message}`
            });
        }
    }
    async getallEspelhoDiario(request, response) {
        try {
            const espelhoDiario = await this.service.getEspelhoDiario();
            response.json({
                success: true,
                message: `Registros do ponto diario.`,
                data: espelhoDiario
            });
        }
        catch (error) {
            response.json({
                success: false,
                error: `Nenhum registro de ponto diario encontrado.`,
            });
        }
    }
    async getallEspelhoMensal(request, response) {
        try {
            const espelhoMensal = await this.service.getEspelhomensal();
            response.json({
                success: true,
                message: `Registros do ponto mensal.`,
                data: espelhoMensal
            });
        }
        catch (error) {
            response.json({
                success: false,
                error: `Nenhum registro de ponto diario encontrado.`,
            });
        }
    }
}
exports.EspelhoPontoController = EspelhoPontoController;
