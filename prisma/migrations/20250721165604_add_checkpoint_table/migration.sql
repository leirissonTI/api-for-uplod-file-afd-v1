-- CreateTable
CREATE TABLE "Checkpoint" (
    "id" SERIAL NOT NULL,
    "cpf" TEXT NOT NULL,
    "ultimoMes" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Checkpoint_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Checkpoint_cpf_key" ON "Checkpoint"("cpf");

-- CreateIndex
CREATE INDEX "Checkpoint_cpf_idx" ON "Checkpoint"("cpf");
