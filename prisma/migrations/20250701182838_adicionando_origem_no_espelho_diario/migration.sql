/*
  Warnings:

  - Added the required column `origem` to the `espelho_diario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "espelho_diario" ADD COLUMN     "origem" TEXT NOT NULL;
