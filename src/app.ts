import express, { Request, Response } from 'express'
import { routes } from './routes'
import cors from 'cors'
export const app = express()

app.use(express.json())

//adicionar o cors
// Ou libera apenas para um domínio específico:
app.use(cors({
    origin: [
        '*',
        'http://pontojus.app.am.trf1.gov.br',
        'http://localhost:5007',
        'http://localhost:3003',
        'http://192.168.0.100:3003',
        'http://172.20.48.1:3003',
        'http://172.27.80.1:3003',
        'http://172.19.33.23:3004',
        'http://172.19.3.52:3004',
        'http://localhost:3004',
        'http://172.19.5.127:3007',
        'http://172.20.48.1:5007',
        'http://172.19.3.52:5007',
        'http://172.19.3.52:3007',
        'http://172.19.5.127:5007',
        '*'
    ], // origens específicas
    credentials: true // permite cookies e auth headers
}))




app.get('/', (_: Request, response: Response) => {
    response.json({
        messgae: 'api funcionando'
    })
})

//rotas 
app.use('/api/v1', routes)