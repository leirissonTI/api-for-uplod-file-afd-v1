/*
  Warnings:

  - You are about to drop the column `ajustesEAbonos` on the `espelho_mensal` table. All the data in the column will be lost.
  - You are about to drop the column `dataCriacao` on the `espelho_mensal` table. All the data in the column will be lost.
  - You are about to drop the column `diasTrabalhados` on the `espelho_mensal` table. All the data in the column will be lost.
  - You are about to drop the column `diasUteis` on the `espelho_mensal` table. All the data in the column will be lost.
  - You are about to drop the column `mesAno` on the `espelho_mensal` table. All the data in the column will be lost.
  - You are about to drop the column `registrosCorretos` on the `espelho_mensal` table. All the data in the column will be lost.
  - You are about to drop the column `saldoHoras` on the `espelho_mensal` table. All the data in the column will be lost.
  - You are about to drop the column `totalHorasDevidas` on the `espelho_mensal` table. All the data in the column will be lost.
  - You are about to drop the column `totalHorasTrabalhadas` on the `espelho_mensal` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpf,mes_ano]` on the table `espelho_mensal` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dias_trabalhados` to the `espelho_mensal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dias_uteis` to the `espelho_mensal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mes_ano` to the `espelho_mensal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saldo_horas` to the `espelho_mensal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_de_horas_devidas` to the `espelho_mensal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totoal_de_horas_trabalhadas` to the `espelho_mensal` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "espelho_mensal_cpf_mesAno_key";

-- AlterTable
ALTER TABLE "espelho_mensal" DROP COLUMN "ajustesEAbonos",
DROP COLUMN "dataCriacao",
DROP COLUMN "diasTrabalhados",
DROP COLUMN "diasUteis",
DROP COLUMN "mesAno",
DROP COLUMN "registrosCorretos",
DROP COLUMN "saldoHoras",
DROP COLUMN "totalHorasDevidas",
DROP COLUMN "totalHorasTrabalhadas",
ADD COLUMN     "ajustes_e_abonos" INTEGER,
ADD COLUMN     "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dias_corridos" INTEGER,
ADD COLUMN     "dias_trabalhados" INTEGER NOT NULL,
ADD COLUMN     "dias_uteis" INTEGER NOT NULL,
ADD COLUMN     "mes_ano" TEXT NOT NULL,
ADD COLUMN     "saldo_horas" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total_de_horas_devidas" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totoal_de_horas_trabalhadas" DOUBLE PRECISION NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "espelho_mensal_cpf_mes_ano_key" ON "espelho_mensal"("cpf", "mes_ano");
