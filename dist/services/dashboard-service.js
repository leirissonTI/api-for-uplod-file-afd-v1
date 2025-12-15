"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const prisma_1 = require("../config/prisma");
class DashboardService {
    prismaService;
    constructor(prismaService = prisma_1.prisma) {
        this.prismaService = prismaService;
    }
    async getResumoServidores(params) {
        const { recessoId, meses } = params;
        // capturar o recesso 
        let resgatandoORecesso = await this.getRecesso(recessoId);
        if (!resgatandoORecesso)
            throw new Error(`Recesso ${recessoId} não encontrado.`);
        const { descricao, DataInicial, dataFinal } = resgatandoORecesso;
        console.log("[join das tabelas]");
        const joins = await this.prismaService.$queryRawUnsafe(`
 select	
r.id  as recesso_id,
e."servidorMatricula" as matricula,
e."chefeMatricula" as chafeMatricula,
e.nome as nome,
e.data_escala as data_escala,
sf."CPF" as cpf,
sf."SIGLA" as lotacao,
ed."primeiraEntrada" as primeiraEntrada,
ed."segundaEntrada" as segundaEntrada,
ed."primeiraSaida" as primeiraSaida,
ed."segundaSaida"  as segundaSaida
from	"Recesso" r 
join "Escala" e on r.id = e."recessoId"
left join sarh_funcionario sf on e."servidorMatricula" = sf."MATRICULA" 
left join espelho_diario ed on sf."CPF" = ed.cpf 
    `);
        const resgatandoEscalas = await this.getEscalas(recessoId);
        const MatriculasUnicas = resgatandoEscalas.map(e => e.servidorMatricula || '');
        console.log(`[Dashboard] - matriculas únicas=${MatriculasUnicas.join(',')}`);
        // 4) Agrupa escalas por servidor e por mês
        const mapPorServidorEMes = this.agrupaEscalasPorServidorEMes(resgatandoEscalas);
        for (const [matricula, mapMes] of mapPorServidorEMes) {
            console.log(`[Dashboard] - matricula=${matricula}`);
            for (const [mes, escalas] of mapMes) {
                console.log(`[Dashboard] - mes=${mes} total=${escalas.length}`);
            }
        }
        // =====================================
        // 1) Carrega o recesso e define meses alvo (parametrizado ou derivado do período)
        const recesso = await this.prismaService.recesso.findUnique({ where: { id: recessoId }, select: { descricao: true, DataInicial: true, dataFinal: true } });
        if (!recesso)
            throw new Error(`Recesso ${recessoId} não encontrado.`);
        const mesesAlvo = params.meses ? params.meses.split(',').map(s => s.trim()) : this.mesesDoRecesso(recesso);
        //console.log(`[Dashboard] recessoId=${recessoId} mesesAlvo=${mesesAlvo.join(',')}`)
        // 2) Busca todas as escalas do recesso (com servidor e lotação)
        const escalas = await this.prismaService.escala.findMany({
            where: { recessoId },
            select: { id: true, nome: true, dataEscala: true, servidorId: true, servidorMatricula: true, lotacao: { select: { nome: true } } }
        });
        // console.log(`[Dashboard] escalas carregadas=${escalas.length}`)
        // 3) Agrupa escalas por servidor e por mês
        const mapPorServidor = new Map();
        const escalaIdsPorMes = new Map();
        for (const e of escalas) {
            const mes = `${String(e.dataEscala.getMonth() + 1).padStart(2, '0')}/${e.dataEscala.getFullYear()}`;
            if (!mesesAlvo.includes(mes))
                continue;
            let nome = '';
            let matricula = e.servidorMatricula || '';
            if (e.servidorId) {
                const f = await this.prismaService.funcionario.findUnique({ where: { id: e.servidorId }, select: { nome: true, matricula: true } });
                if (f) {
                    nome = f.nome;
                    matricula = f.matricula;
                }
            }
            if (!nome) {
                // tentar via funcionario pela matrícula
                if (matricula) {
                    const f = await this.prismaService.funcionario.findUnique({ where: { matricula }, select: { nome: true } });
                    if (f)
                        nome = f.nome;
                }
            }
            if (!nome && e.nome) {
                nome = String(e.nome).split(' - ')[0];
            }
            if (!nome)
                nome = 'N/D';
            const key = `${matricula || 'N/D'}|${nome}`;
            if (!mapPorServidor.has(key)) {
                mapPorServidor.set(key, { nome, matricula: matricula || 'N/D', setor: e.lotacao?.nome || 'N/D', meses: new Map() });
            }
            const entry = mapPorServidor.get(key);
            if (!entry.meses.has(mes))
                entry.meses.set(mes, { escalaIds: [], datas: [] });
            const bucket = entry.meses.get(mes);
            bucket.escalaIds.push(e.id);
            bucket.datas.push(e.dataEscala);
            if (!escalaIdsPorMes.has(mes))
                escalaIdsPorMes.set(mes, []);
            escalaIdsPorMes.get(mes).push(e.id);
        }
        // mapear CPF via sarh_funcionario
        // 4) Resolve CPF/Setor via sarh_funcionario para correlacionar com espelho mensal
        const cpfsPorMatricula = new Map();
        const matriculas = Array.from(mapPorServidor.values()).map(v => v.matricula).filter(m => m && m !== 'N/D');
        if (matriculas.length) {
            // Monta lista segura de matrículas para IN
            const inList = matriculas.map(m => `'${m.replace(/'/g, "''")}'`).join(',');
            const query = `SELECT "CPF" AS cpf, "MATRICULA" AS matricula, "SIGLA" AS setor FROM "sarh_funcionario" WHERE "MATRICULA" IN (${inList})`;
            const resultados = await this.prismaService.$queryRawUnsafe(query);
            for (const r of resultados) {
                cpfsPorMatricula.set(String(r.matricula), { cpf: String(r.cpf), setor: r.setor ? String(r.setor) : undefined });
            }
            console.log(`[Dashboard] SARH resolvidos=${resultados.length} CPFs únicos=${cpfsPorMatricula.size}`);
        }
        // carregar espelho mensal por cpf + meses
        // 5) Carrega espelhos mensais por CPF em meses alvo
        const cpfs = Array.from(cpfsPorMatricula.values()).map(v => v.cpf);
        const mesesComZeroOuSemZero = (m) => {
            const [mm, yy] = m.split('/');
            return [`${mm.padStart(2, '0')}/${yy}`, `${Number(mm)}/${yy}`];
        };
        let espelhos = [];
        if (cpfs.length) {
            const alvoMeses = mesesAlvo.flatMap(m => this.variantesMesAno(m));
            espelhos = await this.prismaService.espelhoMensal.findMany({
                where: { cpf: { in: cpfs }, mesAno: { in: alvoMeses } },
                select: { cpf: true, mesAno: true, totalHorasTrabalhadas: true, totalHorasDevidas: true }
            });
            console.log(`[Dashboard] espelhos carregados=${espelhos.length}`);
        }
        // carregar solicitações por mês
        // 6) Carrega solicitações por mês (status/aprovador)
        const solicitacoesPorMes = new Map();
        for (const mes of mesesAlvo) {
            const escalaIds = escalaIdsPorMes.get(mes) || [];
            if (!escalaIds.length)
                continue;
            const sol = await this.prismaService.solicitacao.findMany({
                where: { escalaId: { in: escalaIds } },
                select: { status: true, updatedAt: true, aprovador: { select: { nome: true } } }
            });
            solicitacoesPorMes.set(mes, sol.map(s => ({ status: s.status, aprovadorNome: s.aprovador?.nome, updatedAt: s.updatedAt || new Date(0) })));
            //console.log(`[Dashboard] solicitacoes carregadas para ${mes} = ${sol.length}`)
        }
        const mapStatus = (s) => s === 'APROVADA' ? 'VALIDADA' : (s === 'RECUSADA' ? 'REJEITADA' : (s ? 'PENDENTE' : 'SEM DADOS'));
        // 7) Consolida resultado por servidor
        const resultados = [];
        for (const [key, val] of mapPorServidor.entries()) {
            const cpf = cpfsPorMatricula.get(val.matricula || '')?.cpf;
            const horasAcumuladas = [];
            for (const mes of mesesAlvo) {
                if (cpf) {
                    const hs = espelhos.filter(e => e.cpf === cpf && e.mesAno.endsWith(mes)).map(e => e.totalHorasTrabalhadas);
                    if (hs.length) {
                        horasAcumuladas.push(...hs);
                    }
                    else {
                        const variantes = this.variantesMesAno(mes);
                        const diarios = await this.prismaService.espelhoDiario.findMany({
                            where: { cpf, mesAno: { in: variantes } },
                            select: { horasTrabalhadas: true }
                        });
                        const sum = (diarios || []).map((d) => Number(d.horasTrabalhadas || 0));
                        if (sum.length)
                            horasAcumuladas.push(sum.reduce((a, b) => a + b, 0));
                    }
                }
            }
            const totalHoras = this.hhmm(horasAcumuladas);
            const dez = mesesAlvo.find(m => m.startsWith('12/'));
            const jan = mesesAlvo.find(m => m.startsWith('01/'));
            const pickUltima = (mes) => {
                const arr = mes ? (solicitacoesPorMes.get(mes) || []) : [];
                if (!arr.length)
                    return { avaliacao: 'N/D', status: 'SEM DADOS' };
                arr.sort((a, b) => (a.updatedAt?.getTime() || 0) - (b.updatedAt?.getTime() || 0));
                const ultimo = arr[arr.length - 1];
                return { avaliacao: ultimo.aprovadorNome || 'N/D', status: mapStatus(ultimo.status) };
            };
            const dezRes = pickUltima(dez);
            const janRes = pickUltima(jan);
            resultados.push({
                nome: val.nome,
                matricula: val.matricula,
                setor: val.setor,
                totalHoras,
                avaliacaoDezembro: dezRes.avaliacao,
                avaliacaoJaneiro: janRes.avaliacao,
                statusDezembro: dezRes.status,
                statusJaneiro: janRes.status,
            });
        }
        //console.log(`[Dashboard] resultados carregados=${resultados.length}`)
        return resultados;
    }
    mesesDoRecesso(recesso) {
        const meses = new Set();
        const add = (d) => meses.add(`${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`);
        add(recesso.DataInicial);
        add(recesso.dataFinal);
        return Array.from(meses);
    }
    hhmm(totalHorasTrabalhadas) {
        const minutos = Math.round((totalHorasTrabalhadas.reduce((a, b) => a + b, 0)) * 60);
        const hh = Math.floor(minutos / 60);
        const mm = Math.abs(minutos % 60);
        return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
    }
    variantesMesAno(mes) {
        if (mes instanceof Date) {
            const mm = String(mes.getMonth() + 1);
            const yy = String(mes.getFullYear());
            return [`${mm.padStart(2, '0')}/${yy}`, `${Number(mm)}/${yy}`];
        }
        const [mm, yy] = mes.split('/');
        return [`${mm.padStart(2, '0')}/${yy}`, `${Number(mm)}/${yy}`];
    }
    // Mapeia status da solicitação para rótulos de exibição
    mapStatus(status) {
        return status === 'APROVADA' ? 'VALIDADA' : (status === 'RECUSADA' ? 'REJEITADA' : (status ? 'PENDENTE' : 'SEM DADOS'));
    }
    // Seleciona o registro mais recente (updatedAt) e retorna avaliação e status
    pickUltimaSolicitacao(entries) {
        if (!entries.length)
            return { avaliacao: 'N/D', status: 'SEM DADOS' };
        const sorted = [...entries].sort((a, b) => (a.updatedAt?.getTime() || 0) - (b.updatedAt?.getTime() || 0));
        const ultimo = sorted[sorted.length - 1];
        return { avaliacao: ultimo.aprovadorNome || 'N/D', status: this.mapStatus(ultimo.status) };
    }
    async getEscalaEspelhoJoin(recessoId) {
        const sql = `
      SELECT
        e."id"                          AS "escalaId",
        e."nome"                        AS "nome",
        e."servidorMatricula"           AS "servidorMatricula",
        l."nome"                        AS "lotacao",
        e."data_escala"                 AS "dataEscala",
        ed."primeiraEntrada"            AS "primeiraEntrada",
        ed."primeiraSaida"              AS "primeiraSaida",
        ed."segundaEntrada"             AS "segundaEntrada",
        ed."segundaSaida"               AS "segundaSaida"
      FROM "Escala" e
      JOIN "Lotacao" l ON l."id" = e."lotacaoId"
      LEFT JOIN "Solicitacao" s ON s."escalaId" = e."id"
      LEFT JOIN "sarh_funcionario" sf ON sf."MATRICULA" = COALESCE(s."matricula", e."servidorMatricula")
      LEFT JOIN "EspelhoDiario" ed
        ON ed."cpf" = sf."CPF"
       AND ed."mesAno" IN (to_char(e."data_escala", 'MM/YYYY'), to_char(e."data_escala", 'FMMM/YYYY'))
       AND ed."diaDoMes" IN (to_char(e."data_escala", 'DD'), to_char(e."data_escala", 'FMDD'))
      WHERE e."recessoId" = $1
      ORDER BY e."data_escala" ASC, e."nome" ASC`;
        const rows = await this.prismaService.$queryRawUnsafe(sql, recessoId);
        console.log(`[Dashboard] JOIN Escala x EspelhoDiario rows=${rows.length}`);
        return rows;
    }
    // =====================================
    // 1) Carrega o recesso e define meses alvo (parametrizado ou derivado do período)
    getRecesso(recessoId) {
        return this.prismaService.recesso.findUnique({
            where: { id: recessoId },
            select: { descricao: true, DataInicial: true, dataFinal: true }
        });
    }
    // 2) Carregar todas as escalas
    async getEscalas(recessoId) {
        const escalas = await this.prismaService.escala.findMany({
            where: { recessoId },
            select: {
                id: true,
                nome: true,
                dataEscala: true,
                servidorId: true,
                servidorMatricula: true,
                lotacao: {
                    select: {
                        nome: true
                    }
                }
            }
        });
        return escalas;
    }
    // Agrupa escalas por servidor e por mês
    agrupaEscalasPorServidorEMes(escalas) {
        const map = new Map();
        for (const escala of escalas) {
            const matricula = escala.servidorMatricula || '';
            const mesAno = this.variantesMesAno(escala.dataEscala);
            for (const ma of mesAno) {
                if (!map.has(matricula))
                    map.set(matricula, new Map());
                const mesMap = map.get(matricula);
                if (!mesMap.has(ma))
                    mesMap.set(ma, []);
                mesMap.get(ma).push(escala);
            }
        }
        return map;
    }
}
exports.DashboardService = DashboardService;
