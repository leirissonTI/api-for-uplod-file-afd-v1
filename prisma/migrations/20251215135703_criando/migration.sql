/*
  Warnings:

  - The primary key for the `sarh_funcionario` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "public"."sarh_funcionario" DROP CONSTRAINT "sarh_funcionario_pkey",
ALTER COLUMN "CPF" DROP NOT NULL,
ADD CONSTRAINT "sarh_funcionario_pkey" PRIMARY KEY ("COD_FUNCIONARIO");
