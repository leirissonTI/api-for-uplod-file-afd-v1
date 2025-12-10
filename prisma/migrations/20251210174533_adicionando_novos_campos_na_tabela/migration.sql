-- AlterTable
ALTER TABLE "public"."Escala" ADD COLUMN     "chefeId" TEXT,
ADD COLUMN     "chefeMatricula" TEXT,
ADD COLUMN     "motivo" TEXT,
ADD COLUMN     "servidorId" TEXT,
ADD COLUMN     "servidorMatricula" TEXT;

-- CreateIndex
CREATE INDEX "Escala_servidorId_idx" ON "public"."Escala"("servidorId");

-- CreateIndex
CREATE INDEX "Escala_chefeId_idx" ON "public"."Escala"("chefeId");

-- AddForeignKey
ALTER TABLE "public"."Escala" ADD CONSTRAINT "Escala_servidorId_fkey" FOREIGN KEY ("servidorId") REFERENCES "public"."Funcionario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Escala" ADD CONSTRAINT "Escala_chefeId_fkey" FOREIGN KEY ("chefeId") REFERENCES "public"."Funcionario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
