import { Request, Response } from 'express'
import { EspelhoPontoService } from '../services/espelho-ponto-services'
import { getInicioFimDoMes } from '../utils/getInicioFimDoMes'
import { AppError } from '../utils/app-erro'

export class EspelhoPontoController {
    private service = new EspelhoPontoService()
    async gerarEspelhoMensal(request: Request, response: Response): Promise<any> {
        try {
            const { cpf, mesAno } = request.params

            if (!cpf || !mesAno) {
                return response.json({
                    success: false,
                    error: `É necessário informar os dados CPF e DATA.`,
                })
            }

            if (cpf.length !== 11 || !/^\d+$/.test(cpf)) {
                return response.json({
                    success: false,
                    error: `CPF deve conter exatamente 11 dígitos numéricos.`,
                })
            }

            const mesAnoArray = mesAno.split('-')
            if (mesAnoArray.length !== 2) {
                return response.json({
                    success: false,
                    error: `Formato de data inválido. Use o formato MM-AAAA (ex: 01-2025).`,
                })
            }

            const [mes, ano] = mesAnoArray.map(Number)

            if (isNaN(mes) || isNaN(ano) || mes < 1 || mes > 12 || ano < 2000 || ano > 2100) {
                return response.json({
                    success: false,
                    error: `Data inválida. Mês deve ser entre 01-12 e ano entre 2000-2100.`,
                })
            }

            const agora = new Date()
            const mesAtual = agora.getMonth() + 1
            const anoAtual = agora.getFullYear()

            if (ano > anoAtual || (ano === anoAtual && mes > mesAtual)) {
                return response.status(400).json({
                    success: false,
                    error: `Não é possível gerar espelho para mês futuro. Mês/Ano atual: ${mesAtual.toString().padStart(2, '0')}/${anoAtual}`,
                })
            }

            const { inicioDoMes, inicioDoProximoMes } = getInicioFimDoMes(mes, ano)

            const espelho = await this.service.gerarEspelhoMensal(cpf, inicioDoMes, inicioDoProximoMes)

            return response.json({
                success: true,
                message: `Espelho mensal gerado com sucesso para ${mes.toString().padStart(2, '0')}/${ano}.`,
                data: espelho
            })

        } catch (error: any) {
            return response.json({
                success: false,
                error: `Erro ao gerar espelho mensal.`,
                message: error.message
            })
        }
    }

    async resgatarPontosDiariosDoMes(request: Request, response: Response) {
        try {
            const { cpf, mesAno } = request.params

            // Validação básica de parâmetros
            if (!cpf || !mesAno) {
                return response.status(400).json({
                    success: false,
                    error: `É necessário informar os dados CPF e DATA.`,
                })
            }

            // Validação do formato CPF (opcional)
            if (cpf.length !== 11 || !/^\d+$/.test(cpf)) {
                return response.status(400).json({
                    success: false,
                    error: `CPF deve conter exatamente 11 dígitos numéricos.`,
                })
            }

            // Validação do formato de data MM-AAAA
            const formatoDataValido = /^\d{2}-\d{4}$/
            if (!formatoDataValido.test(mesAno)) {
                return response.status(400).json({
                    success: false,
                    error: `Formato de data inválido. Use o formato MM-AAAA (ex: 01-2025).`,
                })
            }

            const mesAnoArray = mesAno.split('-')
            if (mesAnoArray.length !== 2) {
                return response.status(400).json({
                    success: false,
                    error: `Formato de data inválido. Use o formato MM-AAAA (ex: 01-2025).`,
                })
            }

            const [mes, ano] = mesAnoArray.map(Number)

            // Validação do formato da data
            if (isNaN(mes) || isNaN(ano) || mes < 1 || mes > 12 || ano < 2000 || ano > 2100) {
                return response.status(400).json({
                    success: false,
                    error: `Data inválida. Mês deve ser entre 01-12 e ano entre 2000-2100.`,
                })
            }

            // Validação se o mês informado é maior que o atual
            const agora = new Date()
            const mesAtual = agora.getMonth() + 1
            const anoAtual = agora.getFullYear()

            if (ano > anoAtual || (ano === anoAtual && mes > mesAtual)) {
                return response.status(400).json({
                    success: false,
                    error: `Não é possível gerar espelho para mês futuro. Mês/Ano atual: ${mesAtual.toString().padStart(2, '0')}/${anoAtual}`,
                })
            }

            const { inicioDoMes, inicioDoProximoMes } = getInicioFimDoMes(mes, ano)

            const espelho = await this.service.getEspelhoDiarioPorMes(cpf, inicioDoMes)

            return response.status(200).json({
                success: true,
                message: `Espelho mensal resgatado com sucesso para ${mes.toString().padStart(2, '0')}/${ano}.`,
                data: espelho
            })

        } catch (error: any) {
            if (error instanceof AppError) {
                return response.status(404).json({
                    success: false,
                    error: `Nenhum registro encontrado para os parâmetros informados.`,
                    message: `${error.message}`
                })
            }
            return response.status(500).json({
                success: false,
                error: `Erro ao resgatar espelho mensal.`,
                message: `${error.message}`
            })
        }
    }

    async resgatarEspelhoDoMes(request: Request, response: Response) {
        try {
            const { cpf, mesAno } = request.params

            // Validação básica de parâmetros
            if (!cpf || !mesAno) {
                return response.status(400).json({
                    success: false,
                    error: `É necessário informar os dados CPF e DATA.`,
                })
            }

            // Validação do formato CPF (opcional)
            if (cpf.replace(/\D/g, '').length !== 11 || !/^\d+$/.test(cpf)) {
                return response.status(400).json({
                    success: false,
                    error: `CPF deve conter exatamente 11 dígitos numéricos.`,
                })
            }

            const mesAnoArray = mesAno.split('-')
            if (mesAnoArray.length !== 2) {
                return response.status(400).json({
                    success: false,
                    error: `Formato de data inválido. Use o formato MM-AAAA (ex: 01-2025).`,
                })
            }

            const [mes, ano] = mesAnoArray.map(Number)

            // Validação do formato da data
            if (isNaN(mes) || isNaN(ano) || mes < 1 || mes > 12 || ano < 2000 || ano > 2100) {
                return response.status(400).json({
                    success: false,
                    error: `Data inválida. Mês deve ser entre 01-12 e ano entre 2000-2100.`,
                })
            }

            // Validação se o mês informado é maior que o atual
            const agora = new Date()
            const mesAtual = agora.getMonth() + 1
            const anoAtual = agora.getFullYear()

            if (ano > anoAtual || (ano === anoAtual && mes > mesAtual)) {
                response.status(400).json({
                    success: false,
                    error: `Não é possível gerar espelho para mês futuro. Mês/Ano atual: ${mesAtual.toString().padStart(2, '0')}/${anoAtual}`,
                })
            }

            const espelho = await this.service.getEspelhoFormado(cpf.replace(/\D/g, ''), String(mes), String(ano))

            return response.status(200).json({
                success: true,
                message: `Espelho mensal do mês: ${mes.toString().padStart(2, '0')}/${ano}.`,
                data: espelho
            })

        } catch (error: any) {
            return response.status(500).json({
                success: false,
                error: `Erro ao resgatar espelho mensal.`,
                message: `${error.message}`
            })
        }
    }

    async getallEspelhoDiario(request: Request, response: Response) {
        try {
            const espelhoDiario = await this.service.getEspelhoDiario()
            response.json({
                success: true,
                message: `Registros do ponto diario.`,
                data: espelhoDiario
            })

        } catch (error: any) {
            response.json(
                {
                    success: false,
                    error: `Nenhum registro de ponto diario encontrado.`,
                }
            )
        }
    }

    async getallEspelhoMensal(request: Request, response: Response) {
        try {
            const espelhoMensal = await this.service.getEspelhomensal()
            response.json({
                success: true,
                message: `Registros do ponto mensal.`,
                data: espelhoMensal
            })


        } catch (error: any) {

            response.json(
                {
                    success: false,
                    error: `Nenhum registro de ponto diario encontrado.`,
                }
            )
        }
    }
}
