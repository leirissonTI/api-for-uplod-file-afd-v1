/*
  Warnings:

  - The primary key for the `Checkpoint` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Checkpoint` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Checkpoint` table. All the data in the column will be lost.
  - You are about to drop the column `ultimoMes` on the `Checkpoint` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Checkpoint` table. All the data in the column will be lost.
  - Added the required column `mesAno` to the `Checkpoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Checkpoint` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Checkpoint_cpf_key";

-- AlterTable
ALTER TABLE "Checkpoint" DROP CONSTRAINT "Checkpoint_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "ultimoMes",
DROP COLUMN "updatedAt",
ADD COLUMN     "detalhes" TEXT,
ADD COLUMN     "mesAno" TEXT NOT NULL,
ADD COLUMN     "status" VARCHAR(20) NOT NULL,
ADD COLUMN     "ultimaAtualizacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "Checkpoint_pkey" PRIMARY KEY ("cpf", "mesAno");

-- CreateIndex
CREATE INDEX "Checkpoint_status_idx" ON "Checkpoint"("status");
