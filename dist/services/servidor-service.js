"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServidorService = void 0;
const prisma_1 = require("../config/prisma");
class ServidorService {
    prismaService;
    constructor(prismaService = prisma_1.prisma) {
        this.prismaService = prismaService;
    }
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
            });
        }
        catch (error) {
            throw new Error(`Erro ao buscar todos os servidores. ${error.message}`);
        }
    }
    async buscarPorNome(nome) {
        try {
            const rows = await this.prismaService.funcionario.findMany({
                where: { nome: { contains: nome, mode: 'insensitive' } },
                select: {
                    id: true,
                    nome: true,
                    email: true,
                    matricula: true,
                    createdAt: true,
                    updatedAt: true,
                }
            });
        }
        catch (error) {
            throw new Error(`Erro ao buscar servidores por nome. ${error.message}`);
        }
    }
    /**
     * Cria um novo servidor.
     * @param servidor - Os dados do servidor a ser criado.
     * @returns Uma promessa que resolve para o servidor criado.
     */
    async createServidor(servidor) {
        try {
            const { nome, email, matricula, role } = servidor;
            const emailRegex = /.+@.+\..+/;
            const emailFinal = email && emailRegex.test(email) ? email.trim().toLowerCase() : undefined;
            return await this.prismaService.funcionario.create({
                data: {
                    nome,
                    email: emailFinal,
                    matricula,
                    role,
                }
            });
        }
        catch (error) {
            throw new Error(`Erro ao criar servidor. ${error.message}`);
        }
    }
    /**
     * Cria um novo servidor.
     * @param servidor - Os dados do servidor a ser criado.
     * @returns Uma promessa que resolve para o servidor criado.
     */
    async createServidorEmLote(servidor) {
        try {
            const { nome, email, matricula, role } = servidor;
            return await this.prismaService.funcionario.create({
                data: {
                    nome,
                    email,
                    matricula,
                    role,
                }
            });
        }
        catch (error) {
            throw new Error(`Erro ao criar servidor. ${error.message}`);
        }
    }
    async getServidorById(id) {
        try {
            return await this.verificarExistenciaServidor(id);
        }
        catch (error) {
            throw new Error(`Erro ao buscar servidor por id. ${error.message}`);
        }
    }
    /**
     * Importa servidores em lote.
     * @param registros - Os registros de servidor a serem importados.
     * @returns Uma promessa que resolve para um objeto contendo o número de registros recebidos, inseridos, ignorados, inválidos e erros.
     */
    async importarServidoresEmLote(registros) {
        const recebidos = registros.length;
        const erros = [];
        const emailRegex = /.+@.+\..+/;
        const normalizados = registros.map(r => ({
            nome: String(r.nome || '').trim(),
            matricula: String(r.matricula || '').trim(),
            email: (r.email ? String(r.email).trim().toLowerCase() : ''),
            role: (r.role === 'USER' || r.role === 'CHEFE' || r.role === 'ADMIN') ? r.role : 'USER'
        }));
        const validos = [];
        for (const r of normalizados) {
            if (!r.nome || !r.matricula) {
                erros.push(`Registro inválido: matricula=${r.matricula || '-'} nome ausente`);
                continue;
            }
            if (r.email && !emailRegex.test(r.email)) {
                r.email = '';
            }
            validos.push(r);
        }
        const invalidos = erros.length;
        const dedupeMapMat = new Map();
        const dedupeMapEmail = new Map();
        const unicos = [];
        for (const r of validos) {
            const keyM = r.matricula;
            const keyE = r.email || '';
            if (dedupeMapMat.has(keyM) || (keyE && dedupeMapEmail.has(keyE)))
                continue;
            dedupeMapMat.set(keyM, 1);
            if (keyE)
                dedupeMapEmail.set(keyE, 1);
            unicos.push(r);
        }
        const ignorados = validos.length - unicos.length;
        if (unicos.length === 0) {
            return { recebidos, inseridos: 0, ignorados, invalidos, erros };
        }
        // Apenas registros com email serão inseridos devido à restrição de esquema
        const comEmail = unicos.filter(u => !!u.email);
        const semEmail = unicos.filter(u => !u.email).map(u => ({ nome: u.nome, matricula: u.matricula, role: u.role }));
        const payloadComEmail = comEmail.map(u => ({ nome: u.nome, matricula: u.matricula, email: u.email, role: u.role }));
        const res1 = payloadComEmail.length ? await this.prismaService.funcionario.createMany({ data: payloadComEmail, skipDuplicates: true }) : { count: 0 };
        const res2 = semEmail.length ? await this.prismaService.funcionario.createMany({ data: semEmail, skipDuplicates: true }) : { count: 0 };
        const inseridos = (res1.count || 0) + (res2.count || 0);
        return { recebidos, inseridos, ignorados, invalidos, erros };
    }
    async importarDoSarh() {
        try {
            const rows = await this.prismaService.sarh_funcionario.findMany({
                select: { NOME: true, MATRICULA: true, E_MAIL: true }
            });
            const erros = [];
            const emailRegex = /.+@.+\..+/;
            const recebidos = rows.length;
            const mapMat = new Map();
            for (const r of rows) {
                const nome = String(r.NOME || '').trim();
                const matricula = String(r.MATRICULA || '').trim();
                let email = String(r.E_MAIL || '').trim().toLowerCase();
                if (!nome || !matricula)
                    continue;
                if (email && !emailRegex.test(email))
                    email = '';
                if (!mapMat.has(matricula))
                    mapMat.set(matricula, { nome, matricula, email: email || undefined });
            }
            let inseridos = 0;
            let atualizados = 0;
            let ignorados = recebidos - mapMat.size;
            for (const r of mapMat.values()) {
                try {
                    const exists = await this.prismaService.funcionario.findUnique({ where: { matricula: r.matricula } });
                    if (exists) {
                        await this.prismaService.funcionario.update({ where: { matricula: r.matricula }, data: { nome: r.nome, email: r.email } });
                        atualizados++;
                    }
                    else {
                        await this.prismaService.funcionario.create({ data: { nome: r.nome, matricula: r.matricula, email: r.email, role: 'USER' } });
                        inseridos++;
                    }
                }
                catch (e) {
                    erros.push(e?.message || String(e));
                }
            }
            return { recebidos, inseridos, atualizados, ignorados, invalidos: 0, erros };
        }
        catch (error) {
            throw new Error(`Erro ao importar servidores do SARH. ${error.message}`);
        }
    }
    /**
     * Atualiza um servidor existente.
     * @param id - O ID do servidor a ser atualizado.
     * @param servidor - Os dados do servidor a serem atualizados.
     * @returns Uma promessa que resolve para o servidor atualizado.
     */
    async updateServidor(id, servidor) {
        try {
            const { nome, email, matricula, role } = servidor;
            const emailRegex = /.+@.+\..+/;
            const emailFinal = email && emailRegex.test(email) ? email.trim().toLowerCase() : undefined;
            return await this.prismaService.funcionario.update({
                where: {
                    id,
                },
                data: {
                    nome,
                    email: emailFinal,
                    matricula,
                    role: role,
                }
            });
        }
        catch (error) {
            throw new Error(`Erro ao atualizar servidor. ${error.message}`);
        }
    }
    async deleteServidor(id) {
        try {
            const servidor = await this.verificarExistenciaServidor(id);
            return await this.prismaService.funcionario.delete({
                where: {
                    id: servidor.id,
                }
            });
        }
        catch (error) {
            throw new Error(`Erro ao deletar servidor. ${error.message}`);
        }
    }
    async verificarExistenciaServidor(id) {
        try {
            const servidor = await this.prismaService.funcionario.findUnique({
                where: {
                    id,
                }
            });
            if (!servidor) {
                throw new Error(`Servidor com id ${id} não encontrado.`);
            }
            return servidor;
        }
        catch (error) {
            throw new Error(`Erro ao verificar existência de servidor. ${error.message}`);
        }
    }
}
exports.ServidorService = ServidorService;
