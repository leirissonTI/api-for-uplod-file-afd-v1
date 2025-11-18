import { Request, Response } from 'express'
import { AfdService } from '../services/afd-services'
import { sendResponse } from "../utils/send-response"
import { IResgistros } from "../interfaces/IResgistros"



export class ArquivoAfdController {
    private afdService: AfdService
    private registrosCache: any[]


    constructor() {
        this.afdService = new AfdService()
        this.registrosCache = []
    }

    async uploadFile(request: Request, response: Response): Promise<void> {
        try {
            const file = request.file
            if (!file) {
                sendResponse(response, {
                    success: false,
                    error: 'Arquivo não enviado',
                    statusCode: 400,
                })
                return
            }

            const registros = await this.afdService.parseFile(file.path)
            this.registrosCache = registros

            sendResponse(response, {
                success: true,
                message: 'Arquivo processado com sucesso',
                data: {
                    totalRegistros: registros.length,
                    registrosPreview: registros.slice(0, 400),
                },
                statusCode: 200,
            })

        } catch (error: any) {
            sendResponse(response, {
                success: false,
                error: error.message || 'Erroro ao processar o arquivo',
                statusCode: 500,
            })
        }
    }


    async getRegistrosPorTipo(request: Request, response: Response): Promise<void> {
        try {

            const tipo = request.params.tipo

            // Se não houver cache, retorna erro
            if (!this.registrosCache.length) {
                sendResponse(response, {
                    success: false,
                    error: 'Nenhum arquivo processado.',
                    statusCode: 400,
                })
                return
            }

            //filtrando registros por tipo
            const registrosDoTipo = this.registrosCache
                .filter((registro) => registro.tipo === tipo)
                .map((registro) => registro.parsed)


            // Se não houver registros do tipo solicitado, retorna erro
            if (registrosDoTipo.length === 0) {
                sendResponse(response, {
                    success: false,
                    error: `Nenhum registro do tipo ${tipo} encontrado.`,
                    statusCode: 404,
                })
                return
            }

            // Retorna os registros filtrados
            sendResponse(response, {
                success: true,
                message: `Registros do tipo ${tipo}`,
                data: {
                    tipo,
                    total: registrosDoTipo.length,
                    registros: registrosDoTipo,
                },
                statusCode: 200,
            })

        } catch (error: any) {
            // Captura erros e envia resposta de erro
            sendResponse(response, {
                success: false,
                error: error.message || 'Erro ao buscar registros',
                statusCode: 500,
            })
        }
    }

    async getRegistrosPorCpf(request: Request, response: Response): Promise<void> {
        let registro: IResgistros[]


        try {
            const cpf = request.params.cpf
            

            // Filtra registros do tipo '3' e usa parsed
            registro = this.registrosCache
                .filter((r) => r.tipo === '3')
                .map((r) => r.parsed)
        


            // Agora filtra pelos registros com CPF igual ao solicitado
            registro = registro.filter((r) => r.cpfEmpregado === cpf)


            // Se não houver registros do tipo solicitado, retorna erro
            if (registro.length === 0) {
                response.json({
                    success: false,
                    error: `Nenhum registro do CPF ${cpf} encontrado.`,
                    statusCode: 404,
                })
                return
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
            })
        } catch (error: any) {
            // Captura erros e envia resposta de erro
            sendResponse(response, {
                success: false,
                error: error.message || 'Erro ao buscar registros',
                statusCode: 500,
            })

        }
    }

    async salvarRegistros(request: Request, response: Response): Promise<void> {
        try {
            if (!this.registrosCache.length) {
                sendResponse(response, {
                    success: false,
                    error: 'Nenhum arquivo processado.',
                    statusCode: 400,
                })
                return
            }

            // Verifica se já existem registros salvos
            await this.afdService.salvarRegistros(this.registrosCache)

            sendResponse(response, {
                success: true,
                message: 'Registros salvos com sucesso',
                statusCode: 201,
            })

        } catch (error: any) {

        }
    }
    
}