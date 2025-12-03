import { PrismaClient } from "@prisma/client";
import { prisma } from "../config/prisma";
import { CreateLotacaoDto } from "../dtos/lotacao/create-lotacao.dto";
import { PatchLotacaoDto } from "../dtos/lotacao/patch-lotacao.dto";




export class LotacaoService {
    constructor(private prismaService: PrismaClient = prisma) { }

    /**
     * Retorna todas as lotações.
     * @returns {Promise<LotacaoEntity[]>} Uma promessa que resolve para um array de entidades de lotação.
     * @throws {Error} Se ocorrer um erro ao buscar todas as lotações.
     */
    async getAllLotacao() {
        try {
            return  await this.prismaService.lotacao.findMany()
        } catch (error) {
            throw new Error(`Erro ao buscar todas as lotações. ${error}`)
        }
    }

   /**
    * Retorna uma lotação pelo ID.
    * @param id O ID da lotação a ser buscada.
    * @returns {Promise<LotacaoEntity | null>} Uma promessa que resolve para a entidade de lotação correspondente ao ID, ou null se não for encontrada.
    * @throws {Error} Se ocorrer um erro ao buscar a lotação por ID.
    */
    async getLotacaoById(id: string) {
        try {
            return  await this.prismaService.lotacao.findUnique({
                where: {
                    id,
                }
            })
        } catch (error) {
            throw new Error(`Erro ao buscar lotação por ID. ${error}`)
        }
    }


    /**
     * Cria uma nova lotação.
     * @param lotacao A entidade de lotação a ser criada.
     * @returns {Promise<LotacaoEntity>} Uma promessa que resolve para a entidade de lotação criada.
     * @throws {Error} Se ocorrer um erro ao criar a lotação.
     */

    async createLotacao(lotacao: CreateLotacaoDto) {
        try {
            return  await this.prismaService.lotacao.create({
                data: lotacao
            })
        } catch (error) {
            throw new Error(`Erro ao criar lotação. ${error}`)
        }
    }

    async updateLotacao(id: string, lotacao: PatchLotacaoDto) {
        try {
            return  await this.prismaService.lotacao.update({
                where: {
                    id,
                },
                data: lotacao
            })
        } catch (error) {
            throw new Error(`Erro ao atualizar lotação. ${error}`)
        }
    }

    async deleteLotacao(id: string) {
        try {
            await this.prismaService.lotacao.delete({
                where: {
                    id,
                }
            })
        } catch (error) {
            throw new Error(`Erro ao deletar lotação. ${error}`)
        }
    }
    
    
}