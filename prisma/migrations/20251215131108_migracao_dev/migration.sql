/*
  Warnings:

  - The primary key for the `sarh_funcionario` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "public"."sarh_funcionario" DROP CONSTRAINT "sarh_funcionario_pkey",
ALTER COLUMN "COD_FUNCIONARIO" SET DATA TYPE DECIMAL(10,0),
ADD CONSTRAINT "sarh_funcionario_pkey" PRIMARY KEY ("CPF", "COD_FUNCIONARIO");
