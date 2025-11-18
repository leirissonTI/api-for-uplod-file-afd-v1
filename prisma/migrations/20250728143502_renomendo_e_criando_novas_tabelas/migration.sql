/*
  Warnings:

  - The primary key for the `_EspelhoDiarioToEspelhoMensal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Checkpoint` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `espelho_mensal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `registros_ponto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EspelhoDiarioToEspelhoMensal" DROP CONSTRAINT "_EspelhoDiarioToEspelhoMensal_B_fkey";

-- AlterTable
ALTER TABLE "_EspelhoDiarioToEspelhoMensal" DROP CONSTRAINT "_EspelhoDiarioToEspelhoMensal_AB_pkey",
ALTER COLUMN "B" SET DATA TYPE TEXT,
ADD CONSTRAINT "_EspelhoDiarioToEspelhoMensal_AB_pkey" PRIMARY KEY ("A", "B");

-- DropTable
DROP TABLE "Checkpoint";

-- DropTable
DROP TABLE "espelho_mensal";

-- DropTable
DROP TABLE "registros_ponto";

-- CreateTable
CREATE TABLE "marcacões_de_ponto" (
    "id" TEXT NOT NULL,
    "nsr" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "data_completa" TIMESTAMP(3) NOT NULL,
    "data" TEXT NOT NULL,
    "hora" TEXT NOT NULL,
    "cpfEmpregado" TEXT NOT NULL,
    "crc" TEXT NOT NULL,
    "origem" TEXT,

    CONSTRAINT "marcacões_de_ponto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarcacoesUsuario" (
    "id" TEXT NOT NULL,
    "primeira_entrada" TIMESTAMP(3) NOT NULL,
    "primeira_saida" TIMESTAMP(3) NOT NULL,
    "segunda_entrada" TIMESTAMP(3) NOT NULL,
    "segunda_saida" TIMESTAMP(3) NOT NULL,
    "pausa_do_almoco" TIMESTAMP(3),

    CONSTRAINT "MarcacoesUsuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "espelho_de_atual" (
    "id" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "mes_ano" TEXT NOT NULL,
    "dias_uteis" INTEGER NOT NULL,
    "dias_trabalhados" INTEGER NOT NULL,
    "dias_corridos" INTEGER,
    "ajustes_e_abonos" INTEGER,
    "faltas" INTEGER,
    "totoal_de_horas_trabalhadas" DOUBLE PRECISION NOT NULL,
    "total_de_horas_devidas" DOUBLE PRECISION NOT NULL,
    "saldo_horas" DOUBLE PRECISION NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "MesAberto" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "espelho_de_atual_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "marcacões_de_ponto_nsr_cpfEmpregado_data_hora_origem_key" ON "marcacões_de_ponto"("nsr", "cpfEmpregado", "data", "hora", "origem");

-- CreateIndex
CREATE UNIQUE INDEX "espelho_de_atual_cpf_mes_ano_key" ON "espelho_de_atual"("cpf", "mes_ano");

-- AddForeignKey
ALTER TABLE "_EspelhoDiarioToEspelhoMensal" ADD CONSTRAINT "_EspelhoDiarioToEspelhoMensal_B_fkey" FOREIGN KEY ("B") REFERENCES "espelho_de_atual"("id") ON DELETE CASCADE ON UPDATE CASCADE;
