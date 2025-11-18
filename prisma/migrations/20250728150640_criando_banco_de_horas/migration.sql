-- CreateTable
CREATE TABLE "espelho_de_ponto_mensal" (
    "id" TEXT NOT NULL,
    "mesEmAberto" BOOLEAN NOT NULL DEFAULT false,
    "cpf" TEXT NOT NULL,
    "mesAno" TEXT NOT NULL,
    "diaDoMes" TEXT NOT NULL,
    "credito" DOUBLE PRECISION NOT NULL,
    "debito" DOUBLE PRECISION NOT NULL,
    "horasNormais" DOUBLE PRECISION NOT NULL,
    "horasExtras" DOUBLE PRECISION NOT NULL,
    "saldo" DOUBLE PRECISION NOT NULL,
    "motivoReajuste" TEXT,
    "data" TEXT NOT NULL,
    "primeiraEntrada" TEXT,
    "primeiraSaida" TEXT,
    "segundaEntrada" TEXT,
    "segundaSaida" TEXT,
    "horasTrabalhadas" DOUBLE PRECISION NOT NULL,
    "observacoes" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "origem" TEXT,

    CONSTRAINT "espelho_de_ponto_mensal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "frequencia" (
    "id" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "primeiraEntrada" TIMESTAMP(3),
    "primeiraSaida" TIMESTAMP(3),
    "segundaEntrada" TIMESTAMP(3),
    "segundaSaida" TIMESTAMP(3),

    CONSTRAINT "frequencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banco_de_horas" (
    "id" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "saldoHoras" DOUBLE PRECISION NOT NULL,
    "ultima_atualizacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "banco_de_horas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "frequencia_cpf_data_key" ON "frequencia"("cpf", "data");

-- CreateIndex
CREATE UNIQUE INDEX "banco_de_horas_cpf_key" ON "banco_de_horas"("cpf");
