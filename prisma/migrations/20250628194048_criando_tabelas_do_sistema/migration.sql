-- CreateTable
CREATE TABLE "registros_cabecalho" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "idSequencial" TEXT NOT NULL,
    "tipoIdentificadorEmpregador" TEXT NOT NULL,
    "cnpjCpfEmpregador" TEXT NOT NULL,
    "cnoCaepf" TEXT NOT NULL,
    "razaoSocial" TEXT NOT NULL,
    "numeroFabricacao" TEXT NOT NULL,
    "dataInicial" TEXT NOT NULL,
    "dataFinal" TEXT NOT NULL,
    "dataHoraGeracao" TEXT NOT NULL,
    "versaoLayout" TEXT NOT NULL,
    "tipoIdentificadorFabricante" TEXT NOT NULL,
    "cnpjCpfFabricante" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "crc" TEXT NOT NULL,
    "origem" TEXT,

    CONSTRAINT "registros_cabecalho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registros_ultimo_nsr" (
    "id" TEXT NOT NULL,
    "ultimo_nsr" INTEGER NOT NULL,
    "origem" TEXT NOT NULL,

    CONSTRAINT "registros_ultimo_nsr_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registros_ponto" (
    "id" TEXT NOT NULL,
    "nsr" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "data_completa" TIMESTAMP(3) NOT NULL,
    "data" TEXT NOT NULL,
    "hora" TEXT NOT NULL,
    "cpfEmpregado" TEXT NOT NULL,
    "crc" TEXT NOT NULL,
    "origem" TEXT,

    CONSTRAINT "registros_ponto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "espelho_diario" (
    "id" SERIAL NOT NULL,
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

    CONSTRAINT "espelho_diario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "espelho_mensal" (
    "id" SERIAL NOT NULL,
    "cpf" TEXT NOT NULL,
    "mesAno" TEXT NOT NULL,
    "diasUteis" INTEGER NOT NULL,
    "diasTrabalhados" INTEGER NOT NULL,
    "registrosCorretos" INTEGER,
    "ajustesEAbonos" INTEGER,
    "faltas" INTEGER,
    "totalHorasTrabalhadas" DOUBLE PRECISION NOT NULL,
    "totalHorasDevidas" DOUBLE PRECISION NOT NULL,
    "saldoHoras" DOUBLE PRECISION NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "espelho_mensal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EspelhoDiarioToEspelhoMensal" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_EspelhoDiarioToEspelhoMensal_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "registros_ultimo_nsr_origem_key" ON "registros_ultimo_nsr"("origem");

-- CreateIndex
CREATE UNIQUE INDEX "registros_ultimo_nsr_ultimo_nsr_key" ON "registros_ultimo_nsr"("ultimo_nsr");

-- CreateIndex
CREATE UNIQUE INDEX "registros_ponto_nsr_cpfEmpregado_data_hora_origem_key" ON "registros_ponto"("nsr", "cpfEmpregado", "data", "hora", "origem");

-- CreateIndex
CREATE UNIQUE INDEX "espelho_diario_cpf_mesAno_key" ON "espelho_diario"("cpf", "mesAno");

-- CreateIndex
CREATE UNIQUE INDEX "espelho_mensal_cpf_key" ON "espelho_mensal"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "espelho_mensal_mesAno_key" ON "espelho_mensal"("mesAno");

-- CreateIndex
CREATE INDEX "_EspelhoDiarioToEspelhoMensal_B_index" ON "_EspelhoDiarioToEspelhoMensal"("B");

-- AddForeignKey
ALTER TABLE "_EspelhoDiarioToEspelhoMensal" ADD CONSTRAINT "_EspelhoDiarioToEspelhoMensal_A_fkey" FOREIGN KEY ("A") REFERENCES "espelho_diario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EspelhoDiarioToEspelhoMensal" ADD CONSTRAINT "_EspelhoDiarioToEspelhoMensal_B_fkey" FOREIGN KEY ("B") REFERENCES "espelho_mensal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
