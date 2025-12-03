import { Request, Response } from "express";
import { ServidorService } from "../services/servidor-service";
import { z } from "zod";
import { createSchemaServidor } from "../dtos/servidor/create-servidor.dto";
import fs from "fs";
import path from "path";
import { updateServidorSchema } from "../dtos/servidor/update-servidor.dto";




export class ServidorController {
    constructor(private servidorService: ServidorService ) { }
    
    async getAllServidores(req: Request, res: Response){
        try {
            const servidores = await this.servidorService.getAllServidores()
            return res.status(200).json({
                success: true,
                message: 'Servidores resgatados com sucesso.',
                data: servidores
            })
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: 'Erro ao buscar todos os servidores.',
                message: `${error.message}`
            })
        }
    }

    /**
     * Cria um novo servidor.
     * @param req - O objeto de solicitação HTTP.
     * @param res - O objeto de resposta HTTP.
     * @returns Uma promessa que resolve para o servidor criado.
     */
    async createServidor(req: Request, res: Response){
        try {
            const payload = createSchemaServidor.parse(req.body)
            const criado = await this.servidorService.createServidor(payload)
            return res.status(201).json({ success: true, message: 'Servidor criado com sucesso.', data: criado })
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ success: false, error: 'Erro de validação.', message: error.issues.map(i => i.message).join(', ') })
            }
            return res.status(500).json({ success: false, error: 'Erro ao criar servidor.', message: `${error.message}` })
        }
    }

    async importarServidoresEmLote(req: Request, res: Response){
        try {
            const schema = z.array(createSchemaServidor)

            let registros: Array<{ nome: string; email?: string; matricula: string; role?: 'ADMIN' | 'USER' | 'CHEFE' }>

            if (req.file) {
                const filePath = (req.file as any).path as string
                const content = fs.readFileSync(path.resolve(filePath), 'utf8')

                const lines = content.split(/\r?\n/).filter(l => l.trim() !== '')
                const headerLine = lines[0]
                const delimiter = headerLine.includes(';') ? ';' : ','
                const headers = headerLine.split(delimiter).map(h => h.trim().toLowerCase())

                const rows = lines.slice(1).map(line => {
                    const cols = line.split(delimiter).map(c => c.trim())
                    const obj: any = {}
                    headers.forEach((h, idx) => { obj[h] = cols[idx] ?? '' })
                    return obj
                })

                registros = rows.map(r => ({
                    nome: String(r.nome || r["name"] || '').trim(),
                    email: String(r.email || '').trim(),
                    matricula: String(r.matricula || r["matricula"] || '').trim(),
                    role: String(r.role || '').toUpperCase() as any
                }))
            } else {
                registros = schema.parse(req.body)
            }

            const registrosValidados = schema.parse(registros)
            const resultado = await this.servidorService.importarServidoresEmLote(registrosValidados)
            return res.status(200).json({ success: true, message: 'Importação concluída.', data: resultado })
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ success: false, error: 'Erro de validação.', message: error.issues.map(i => i.message).join(', ') })
            }
            return res.status(500).json({ success: false, error: 'Erro ao importar servidores em lote.', message: `${error.message}` })
        }
    }

    async getServidorById(req: Request, res: Response){
        try {
            const servidor = await this.servidorService.getServidorById(req.params.id)
            return res.status(200).json({ success: true, message: 'Servidor resgatado com sucesso.', data: servidor })
        } catch (error: any) {
            return res.status(500).json({ success: false, error: 'Erro ao buscar servidor por id.', message: `${error.message}` })
        }
    }
    /**
     * Atualiza um servidor existente.
     * @param req - O objeto de solicitação HTTP.
     * @param res - O objeto de resposta HTTP.
     * @returns Uma promessa que resolve para o servidor atualizado.
     */
    async updateServidor(req: Request, res: Response){
        try {
            const payload = updateServidorSchema.parse(req.body)
            const atualizado = await this.servidorService.updateServidor(req.params.id, payload)
            return res.status(200).json({ success: true, message: 'Servidor atualizado com sucesso.', data: atualizado })
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ success: false, error: 'Erro de validação.', message: error.issues.map(i => i.message).join(', ') })
            }
            return res.status(500).json({ success: false, error: 'Erro ao atualizar servidor.', message: `${error.message}` })
        }
    }
    
    /**
     * Deleta um servidor existente.
     * @param req - O objeto de solicitação HTTP.
     * @param res - O objeto de resposta HTTP.
     * @returns Uma promessa que resolve para o servidor deletado.
     */
    async deleteServidor(req: Request, res: Response){
        try {
            await this.servidorService.deleteServidor(req.params.id)
            return res.status(200).json({ success: true, message: 'Servidor deletado com sucesso.' })
        } catch (error: any) {
            return res.status(500).json({ success: false, error: 'Erro ao deletar servidor.', message: `${error.message}` })
        }
    }
}
