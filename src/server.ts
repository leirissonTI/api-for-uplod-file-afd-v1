import 'dotenv/config'
import { app } from './app'


const PORT = Number(process.env.PORT) || 3333
const HOST =  process.env.HOST || 'localhost'//'172.19.5.127'
app.listen(PORT, HOST, () => {
    console.log(`Servidor rodando em http://${HOST}:${PORT}`)
})

