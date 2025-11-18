/*
  Warnings:

  - A unique constraint covering the columns `[cpf,mesAno]` on the table `espelho_mensal` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "espelho_mensal_cpf_mesAno_key" ON "espelho_mensal"("cpf", "mesAno");
