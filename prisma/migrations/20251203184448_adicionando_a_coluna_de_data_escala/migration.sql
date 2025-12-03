/*
  Warnings:

  - Added the required column `data_escala` to the `Escala` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Escala" ADD COLUMN     "data_escala" TIMESTAMP(3) NOT NULL;
