-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'CHEFE', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."SolicitacaoStatus" AS ENUM ('PENDENTE', 'APROVADA', 'RECUSADA', 'CANCELADA');

-- CreateTable
CREATE TABLE "public"."Lotacao" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "codigo" TEXT,

    CONSTRAINT "Lotacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Escala" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "lotacaoId" TEXT NOT NULL,
    "recebePagamento" BOOLEAN NOT NULL DEFAULT false,
    "escalado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "recessoId" TEXT NOT NULL,

    CONSTRAINT "Escala_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Funcionario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "managerId" TEXT,

    CONSTRAINT "Funcionario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Solicitacao" (
    "id" TEXT NOT NULL,
    "escalaId" TEXT NOT NULL,
    "criadorId" TEXT NOT NULL,
    "aprovadorId" TEXT,
    "status" "public"."SolicitacaoStatus" NOT NULL DEFAULT 'PENDENTE',
    "motivo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Solicitacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lotacao_nome_key" ON "public"."Lotacao"("nome");

-- CreateIndex
CREATE INDEX "Escala_recessoId_idx" ON "public"."Escala"("recessoId");

-- CreateIndex
CREATE INDEX "Escala_lotacaoId_idx" ON "public"."Escala"("lotacaoId");

-- CreateIndex
CREATE UNIQUE INDEX "Escala_nome_recessoId_key" ON "public"."Escala"("nome", "recessoId");

-- CreateIndex
CREATE UNIQUE INDEX "Funcionario_matricula_key" ON "public"."Funcionario"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "Funcionario_email_key" ON "public"."Funcionario"("email");

-- CreateIndex
CREATE INDEX "Funcionario_role_idx" ON "public"."Funcionario"("role");

-- CreateIndex
CREATE INDEX "Solicitacao_escalaId_idx" ON "public"."Solicitacao"("escalaId");

-- CreateIndex
CREATE INDEX "Solicitacao_criadorId_idx" ON "public"."Solicitacao"("criadorId");

-- CreateIndex
CREATE INDEX "Solicitacao_aprovadorId_idx" ON "public"."Solicitacao"("aprovadorId");

-- CreateIndex
CREATE INDEX "Solicitacao_status_idx" ON "public"."Solicitacao"("status");

-- CreateIndex
CREATE INDEX "Recesso_ano_idx" ON "public"."Recesso"("ano");

-- AddForeignKey
ALTER TABLE "public"."Escala" ADD CONSTRAINT "Escala_recessoId_fkey" FOREIGN KEY ("recessoId") REFERENCES "public"."Recesso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Escala" ADD CONSTRAINT "Escala_lotacaoId_fkey" FOREIGN KEY ("lotacaoId") REFERENCES "public"."Lotacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Funcionario" ADD CONSTRAINT "Funcionario_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "public"."Funcionario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Solicitacao" ADD CONSTRAINT "Solicitacao_escalaId_fkey" FOREIGN KEY ("escalaId") REFERENCES "public"."Escala"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Solicitacao" ADD CONSTRAINT "Solicitacao_criadorId_fkey" FOREIGN KEY ("criadorId") REFERENCES "public"."Funcionario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Solicitacao" ADD CONSTRAINT "Solicitacao_aprovadorId_fkey" FOREIGN KEY ("aprovadorId") REFERENCES "public"."Funcionario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
