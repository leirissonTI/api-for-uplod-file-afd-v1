/*
  Warnings:

  - Added the required column `dia` to the `Solicitacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Solicitacao" ADD COLUMN     "dia" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "entrada1" TIMESTAMP(3),
ADD COLUMN     "entrada2" TIMESTAMP(3),
ADD COLUMN     "lotacao" TEXT,
ADD COLUMN     "nomeChefia" TEXT,
ADD COLUMN     "opcao" TEXT,
ADD COLUMN     "saida1" TIMESTAMP(3),
ADD COLUMN     "saida2" TIMESTAMP(3);
