-- CreateTable
CREATE TABLE "public"."Recesso" (
    "id" TEXT NOT NULL,
    "ano" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,
    "processo_sei" TEXT NOT NULL,
    "aberto_para_frequencia" BOOLEAN NOT NULL DEFAULT false,
    "data_inicial" TIMESTAMP(3) NOT NULL,
    "data_final" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recesso_pkey" PRIMARY KEY ("id")
);
