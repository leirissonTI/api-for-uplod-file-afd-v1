import { PrismaClient, Role } from "../generated/prisma";
import { prisma } from "../config/prisma";
import { CreateServidorDto } from "../dtos/servidor/create-servidor.dto";
import { UpdateServidorDto } from "../dtos/servidor/update-servidor.dto";

export class ServidorService {
    constructor(private prismaService: PrismaClient = prisma) { }

    /**
     * Busca todos os servidores.
     * @returns Uma promessa que resolve para um array de servidores.
     */
    async getAllServidores() {
        try {
            return await this.prismaService.funcionario.findMany({
                select: {
                    id: true,
                    nome: true,
                    email: true,
                    matricula: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                }
            })
        } catch (error: any) {
            throw new Error(`Erro ao buscar todos os servidores. ${error.message}`)
        }
    }

    async buscarPorNome(nome: string) {
        try {
            return await this.prismaService.funcionario.findMany({
                where: { nome: { contains: nome, mode: 'insensitive' as any } },
                select: {
                    id: true,
                    nome: true,
                    email: true,
                    matricula: true,
                    createdAt: true,
                    updatedAt: true,
                }
            })


        } catch (error: any) {
            throw new Error(`Erro ao buscar servidores por nome. ${error.message}`)
        }
    }

    /**
     * Cria um novo servidor.
     * @param servidor - Os dados do servidor a ser criado.
     * @returns Uma promessa que resolve para o servidor criado.
     */
    async createServidor(servidor: CreateServidorDto) {
        try {
            const { nome, email, matricula, role } = servidor
            const emailRegex = /.+@.+\..+/
            const emailFinal = email && emailRegex.test(email) ? email.trim().toLowerCase() : undefined
            return await this.prismaService.funcionario.create({
                data: {
                    nome,
                    email: emailFinal,
                    matricula,
                    role,
                }
            })
        } catch (error: any) {
            throw new Error(`Erro ao criar servidor. ${error.message}`)
        }
    }

    /**
     * Cria um novo servidor.
     * @param servidor - Os dados do servidor a ser criado.
     * @returns Uma promessa que resolve para o servidor criado.
     */
    async createServidorEmLote(servidor: CreateServidorDto) {
        try {
            const { nome, email, matricula, role } = servidor
            return await this.prismaService.funcionario.create({
                data: {
                    nome,
                    email,
                    matricula,
                    role,
                }
            })
        } catch (error: any) {
            throw new Error(`Erro ao criar servidor. ${error.message}`)
        }
    }

    async getServidorById(id: string) {
        try {
            return await this.verificarExistenciaServidor(id)
        } catch (error: any) {
            throw new Error(`Erro ao buscar servidor por id. ${error.message}`)
        }
    }

    /**
     * Importa servidores em lote.
     * @param registros - Os registros de servidor a serem importados.
     * @returns Uma promessa que resolve para um objeto contendo o número de registros recebidos, inseridos, ignorados, inválidos e erros.
     */
    async importarServidoresEmLote(registros: Array<{ nome: string; matricula: string; email?: string; role?: Role }>): Promise<{ recebidos: number; inseridos: number; ignorados: number; invalidos: number; erros: string[] }> {
        const recebidos = registros.length
        const erros: string[] = []
        const emailRegex = /.+@.+\..+/
        const normalizados = registros.map(r => ({
            nome: String(r.nome || '').trim(),
            matricula: String(r.matricula || '').trim(),
            email: (r.email ? String(r.email).trim().toLowerCase() : ''),
            role: (r.role === 'USER' || r.role === 'CHEFE' || r.role === 'ADMIN') ? r.role : 'USER'
        }))
        const validos: { nome: string; matricula: string; email?: string; role: Role }[] = []
        for (const r of normalizados) {
            if (!r.nome || !r.matricula) {
                erros.push(`Registro inválido: matricula=${r.matricula || '-'} nome ausente`)
                continue
            }
            if (r.email && !emailRegex.test(r.email)) {
                r.email = ''
            }
            validos.push(r as unknown as { nome: string; matricula: string; email?: string; role: Role })
        }
        const invalidos = erros.length
        const dedupeMapMat: Map<string, number> = new Map()
        const dedupeMapEmail: Map<string, number> = new Map()
        const unicos: typeof validos = []
        for (const r of validos) {
            const keyM = r.matricula
            const keyE = r.email || ''
            if (dedupeMapMat.has(keyM) || (keyE && dedupeMapEmail.has(keyE))) continue
            dedupeMapMat.set(keyM, 1)
            if (keyE) dedupeMapEmail.set(keyE, 1)
            unicos.push(r)
        }
        const ignorados = validos.length - unicos.length
        if (unicos.length === 0) {
            return { recebidos, inseridos: 0, ignorados, invalidos, erros }
        }
        // Apenas registros com email serão inseridos devido à restrição de esquema
        const comEmail = unicos.filter(u => !!u.email) as Array<{ nome: string; matricula: string; email: string; role: Role }>
        const semEmail = unicos.filter(u => !u.email).map(u => ({ nome: u.nome, matricula: u.matricula, role: u.role })) as Array<{ nome: string; matricula: string; role: Role }>
        const payloadComEmail = comEmail.map(u => ({ nome: u.nome, matricula: u.matricula, email: u.email, role: u.role }))
        const res1 = payloadComEmail.length ? await this.prismaService.funcionario.createMany({ data: payloadComEmail, skipDuplicates: true }) : { count: 0 }
        const res2 = semEmail.length ? await this.prismaService.funcionario.createMany({ data: semEmail, skipDuplicates: true }) : { count: 0 }
        const inseridos = (res1.count || 0) + (res2.count || 0)
        return { recebidos, inseridos, ignorados, invalidos, erros }
    }

    async importarDoSarh() {
        try {
            const rows = await this.prismaService.sarh_funcionario.findMany({
                select: { NOME: true, MATRICULA: true, E_MAIL: true }
            })
            const erros: string[] = []
            const emailRegex = /.+@.+\..+/
            const recebidos = rows.length
            const mapMat: Map<string, { nome: string; matricula: string; email?: string }> = new Map()
            for (const r of rows) {
                const nome = String(r.NOME || '').trim()
                const matricula = String(r.MATRICULA || '').trim()
                let email = String(r.E_MAIL || '').trim().toLowerCase()
                if (!nome || !matricula) continue
                if (email && !emailRegex.test(email)) email = ''
                if (!mapMat.has(matricula)) mapMat.set(matricula, { nome, matricula, email: email || undefined })
            }
            let inseridos = 0
            let atualizados = 0
            let ignorados = recebidos - mapMat.size
            for (const r of mapMat.values()) {
                try {
                    const exists = await this.prismaService.funcionario.findUnique({ where: { matricula: r.matricula } })
                    if (exists) {
                        await this.prismaService.funcionario.update({ where: { matricula: r.matricula }, data: { nome: r.nome, email: r.email } })
                        atualizados++
                    } else {
                        await this.prismaService.funcionario.create({ data: { nome: r.nome, matricula: r.matricula, email: r.email, role: 'USER' as Role } })
                        inseridos++
                    }
                } catch (e: any) {
                    erros.push(e?.message || String(e))
                }
            }
            return { recebidos, inseridos, atualizados, ignorados, invalidos: 0, erros }
        } catch (error: any) {
            throw new Error(`Erro ao importar servidores do SARH. ${error.message}`)
        }
    }

    /**
     * Atualiza um servidor existente.
     * @param id - O ID do servidor a ser atualizado.
     * @param servidor - Os dados do servidor a serem atualizados.
     * @returns Uma promessa que resolve para o servidor atualizado.
     */
    async updateServidor(id: string, servidor: UpdateServidorDto) {
        try {
            const { nome, email, matricula, role } = servidor
            const emailRegex = /.+@.+\..+/
            const emailFinal = email && emailRegex.test(email) ? email.trim().toLowerCase() : undefined
            return await this.prismaService.funcionario.update({
                where: {
                    id,
                },
                data: {
                    nome,
                    email: emailFinal,
                    matricula,
                    role: role as Role,
                }
            })
        } catch (error: any) {
            throw new Error(`Erro ao atualizar servidor. ${error.message}`)
        }
    }

    async deleteServidor(id: string) {
        try {
            const servidor = await this.verificarExistenciaServidor(id)
            return await this.prismaService.funcionario.delete({
                where: {
                    id: servidor.id,
                }
            })
        } catch (error: any) {
            throw new Error(`Erro ao deletar servidor. ${error.message}`)
        }
    }

    private async verificarExistenciaServidor(id: string) {
        try {
            const servidor = await this.prismaService.funcionario.findUnique({
                where: {
                    id,
                }
            })
            if (!servidor) {
                throw new Error(`Servidor com id ${id} não encontrado.`)
            }
            return servidor
        } catch (error: any) {
            throw new Error(`Erro ao verificar existência de servidor. ${error.message}`)
        }
    }
}
