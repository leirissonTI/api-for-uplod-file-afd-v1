import { PrismaClient } from "../src/generated/prisma"


const prisma = new PrismaClient()

async function main(){
    try {
        await prisma.recesso.createMany({
            data:[
                {
                    ano: new Date("2024-01-01"),
                    descricao: 'Recesso 2024/2025',
                    processoSei: '0003571-24.2024.4.01.8002',
                    abertoParaFrequencia: false,
                    DataInicial: new Date("2024-12-20"),
                    dataFinal: new Date("2025-01-06"),
                },
                {
                    ano: new Date("2025-01-01"),
                    descricao: 'Recesso 2025/2026',
                    processoSei: '0003970-19.2025.4.01.8002',
                    abertoParaFrequencia: false,
                    DataInicial: new Date("2025-12-22"),
                    dataFinal: new Date("2026-01-06"),
                },
            ]
        })
    } catch (error) {
        console.error(error)
    }
}

main()
