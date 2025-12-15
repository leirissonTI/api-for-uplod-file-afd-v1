"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SarhImportService = void 0;
const prisma_1 = require("../config/prisma");
const fs_1 = __importDefault(require("fs"));
class SarhImportService {
    prismaService;
    constructor(prismaService = prisma_1.prisma) {
        this.prismaService = prismaService;
    }
    detectDelimiter(line) {
        if (line.includes(";"))
            return ";";
        return ",";
    }
    splitCsvLine(line, delimiter) {
        const result = [];
        let current = '';
        let inQuotes = false;
        let i = 0;
        while (i < line.length) {
            const ch = line[i];
            if (ch === '"') {
                if (inQuotes && line[i + 1] === '"') { // escaped quote
                    current += '"';
                    i += 2;
                    continue;
                }
                inQuotes = !inQuotes;
                i++;
                continue;
            }
            if (!inQuotes && ch === delimiter) {
                result.push(current);
                current = '';
                i++;
                continue;
            }
            current += ch;
            i++;
        }
        result.push(current);
        return result;
    }
    cleanToken(token) {
        const t = token.trim().replace(/^\uFEFF/, "");
        return t.replace(/^"|"$/g, '');
    }
    parseCsv(content) {
        const lines = content.split(/\r?\n/).filter(l => l.trim().length > 0);
        if (!lines.length)
            return [];
        const delimiter = this.detectDelimiter(lines[0]);
        const rawHeaders = this.splitCsvLine(lines[0], delimiter);
        const headers = rawHeaders.map(h => this.cleanToken(h).toUpperCase());
        const rows = [];
        for (let i = 1; i < lines.length; i++) {
            const rawCols = this.splitCsvLine(lines[i], delimiter);
            const cols = rawCols.map(c => this.cleanToken(c));
            const row = {};
            for (let j = 0; j < headers.length; j++) {
                const key = headers[j];
                row[key] = cols[j] ?? null;
            }
            rows.push(row);
        }
        return rows;
    }
    clampString(v, max) {
        if (v === undefined || v === null)
            return null;
        const s = String(v);
        if (!s.length)
            return null;
        return s.length > max ? s.slice(0, max) : s;
    }
    toIntSafe(v, max) {
        if (v === undefined || v === null || v === '')
            return null;
        const n = Number(String(v).replace(/[^0-9-]/g, ''));
        if (!Number.isFinite(n))
            return null;
        if (max !== undefined && n > max)
            return null;
        return Math.trunc(n);
    }
    async existsByCod(cod) {
        const r = await this.prismaService.$queryRawUnsafe(`SELECT 1 FROM "sarh_funcionario" WHERE "COD_FUNCIONARIO" = ${cod} LIMIT 1`);
        return Array.isArray(r) && r.length > 0;
    }
    async importFromCsv(filePath) {
        const content = fs_1.default.readFileSync(filePath, { encoding: 'utf8' });
        const items = this.parseCsv(content);
        let inserted = 0, updated = 0, skipped = 0;
        const errors = [];
        // compute starting id for COD_FUNCIONARIO when missing
        let startId = 0;
        try {
            const res = await this.prismaService.$queryRawUnsafe(`SELECT COALESCE(MAX("COD_FUNCIONARIO"),0) AS max FROM "sarh_funcionario"`);
            startId = Number(res?.[0]?.max || 0);
        }
        catch { }
        let nextId = startId;
        for (const r of items) {
            try {
                const matriculaRaw = r.MATRICULA || '';
                const matriculaClamped = this.clampString(matriculaRaw, 15);
                const matricula = (matriculaClamped || '').replace(/'/g, "''");
                if (!matricula) {
                    skipped++;
                    continue;
                }
                const existentMat = await this.prismaService.$queryRawUnsafe(`SELECT "COD_FUNCIONARIO" FROM "sarh_funcionario" WHERE "MATRICULA" = '${matricula}' LIMIT 1`);
                const codCsv = this.toIntSafe(r.COD_FUNCIONARIO, 2147483647);
                const existentCod = codCsv != null ? await this.prismaService.$queryRawUnsafe(`SELECT "COD_FUNCIONARIO" FROM "sarh_funcionario" WHERE "COD_FUNCIONARIO" = ${codCsv} LIMIT 1`) : [];
                const payload = {
                    COD_FUNCIONARIO: codCsv ?? undefined,
                    CPF: this.clampString(r.CPF, 4000),
                    NOME: this.clampString(r.NOME, 50),
                    MATRICULA: matriculaClamped,
                    E_MAIL: this.clampString(r.E_MAIL, 60),
                    ENDERECO: this.clampString(r.ENDERECO, 100),
                    BAIRRO: this.clampString(r.BAIRRO, 50),
                    CIDADE: this.clampString(r.CIDADE, 50),
                    TELEFONE: this.clampString(r.TELEFONE, 20),
                    ID_TIPO_LOTACAO: this.toIntSafe(r.ID_TIPO_LOTACAO, 2147483647),
                    LOTACAO: this.clampString(r.LOTACAO, 120),
                    SIGLA: this.clampString(r.SIGLA, 20),
                    CARGO: this.clampString(r.CARGO, 100),
                };
                const numericCols = new Set(['COD_FUNCIONARIO', 'ID_TIPO_LOTACAO']);
                const colsAll = Object.keys(payload).filter(k => payload[k] !== undefined);
                const valueExpr = (col, val) => {
                    if (val === null || val === undefined || val === '')
                        return 'NULL';
                    if (numericCols.has(col))
                        return String(val);
                    return `'${String(val).replace(/'/g, "''")}'`;
                };
                if ((existentMat && existentMat.length) || (existentCod && existentCod.length)) {
                    // UPDATE
                    const targetId = (existentCod && existentCod.length) ? existentCod[0].COD_FUNCIONARIO : existentMat[0].COD_FUNCIONARIO;
                    const updCols = colsAll.filter(c => c !== 'COD_FUNCIONARIO');
                    const setExpr = updCols.map(c => `"${c}" = ${valueExpr(c, payload[c])}`).join(', ');
                    await this.prismaService.$executeRawUnsafe(`UPDATE "sarh_funcionario" SET ${setExpr} WHERE "COD_FUNCIONARIO" = ${targetId}`);
                    updated++;
                }
                else {
                    // INSERT with generated COD_FUNCIONARIO if missing
                    if (!payload.COD_FUNCIONARIO) {
                        nextId += 1;
                        payload.COD_FUNCIONARIO = nextId;
                    }
                    else {
                        if (existentCod && existentCod.length) {
                            do {
                                nextId += 1;
                            } while (await this.existsByCod(nextId));
                            payload.COD_FUNCIONARIO = nextId;
                        }
                    }
                    const insCols = Object.keys(payload).filter(k => payload[k] !== undefined);
                    const insVals = insCols.map(c => valueExpr(c, payload[c]));
                    const colExpr = insCols.map(c => `"${c}"`).join(', ');
                    const valExpr = insVals.join(', ');
                    await this.prismaService.$executeRawUnsafe(`INSERT INTO "sarh_funcionario" (${colExpr}) VALUES (${valExpr})`);
                    inserted++;
                }
            }
            catch (e) {
                errors.push(e?.message || String(e));
            }
        }
        return { inserted, updated, skipped, errors };
    }
    async listFuncionarios(params) {
        const q = (params.q || '').trim();
        const limit = Math.max(1, Math.min(500, params.limit || 50));
        const offset = Math.max(0, params.offset || 0);
        const where = q
            ? `WHERE ("MATRICULA" ILIKE '%${q.replace(/'/g, "''")}%' OR "NOME" ILIKE '%${q.replace(/'/g, "''")}%' OR "CPF" ILIKE '%${q.replace(/'/g, "''")}%')`
            : '';
        const sql = `SELECT "COD_FUNCIONARIO","CPF","NOME","MATRICULA","E_MAIL","LOTACAO","SIGLA","CARGO" FROM "sarh_funcionario" ${where} ORDER BY "MATRICULA" ASC LIMIT ${limit} OFFSET ${offset}`;
        const rows = await this.prismaService.$queryRawUnsafe(sql);
        return rows;
    }
}
exports.SarhImportService = SarhImportService;
