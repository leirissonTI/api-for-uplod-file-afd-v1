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
     async getAllServidores(){
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

    /**
     * Cria um novo servidor.
     * @param servidor - Os dados do servidor a ser criado.
     * @returns Uma promessa que resolve para o servidor criado.
     */
    async createServidor(servidor: CreateServidorDto){
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
    async createServidorEmLote(servidor: CreateServidorDto){
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

    async updateServidor(id: string, servidor: UpdateServidorDto){
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
}
