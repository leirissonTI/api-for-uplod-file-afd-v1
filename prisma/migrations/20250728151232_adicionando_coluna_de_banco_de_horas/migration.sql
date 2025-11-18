/*
  Warnings:

  - Added the required column `bancoDeHoras` to the `espelho_diario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horas_do_almoco` to the `espelho_diario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "espelho_diario" ADD COLUMN     "bancoDeHoras" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "horas_do_almoco" DOUBLE PRECISION NOT NULL;
