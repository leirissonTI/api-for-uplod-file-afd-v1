"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistroTipo1 = void 0;
class RegistroTipo1 {
    tipo;
    idSequencial;
    tipoIdentificadorEmpregador;
    cnpjCpfEmpregador;
    cnoCaepf;
    razaoSocial;
    numeroFabricacao;
    dataInicial;
    dataFinal;
    dataHoraGeracao;
    versaoLayout;
    tipoIdentificadorFabricante;
    cnpjCpfFabricante;
    modelo;
    crc;
    constructor(linha) {
        this.idSequencial = linha.substring(0, 9).trim(); // 001–009
        this.tipo = linha.substring(9, 10).trim(); // 010
        this.tipoIdentificadorEmpregador = linha.substring(10, 11); // 011
        this.cnpjCpfEmpregador = linha.substring(11, 25).trim(); // 012–025
        this.cnoCaepf = linha.substring(25, 39).trim(); // 026–039
        this.razaoSocial = linha.substring(39, 189).trim(); // 040–189
        this.numeroFabricacao = linha.substring(189, 206).trim(); // 190–206
        this.dataInicial = linha.substring(206, 216).trim(); // 207–216
        this.dataFinal = linha.substring(216, 226).trim(); // 217–226
        this.dataHoraGeracao = linha.substring(226, 250).trim(); // 227–250
        this.versaoLayout = linha.substring(250, 253).trim(); // 251–253
        this.tipoIdentificadorFabricante = linha.substring(253, 254); // 254
        this.cnpjCpfFabricante = linha.substring(254, 268).trim(); // 255–268
        this.modelo = linha.substring(268, 298).trim(); // 269–298
        this.crc = linha.substring(298, 302).trim(); // 299–302
    }
    toJSON() {
        return {
            tipo: this.tipo,
            idSequencial: this.idSequencial,
            tipoIdentificadorEmpregador: this.tipoIdentificadorEmpregador,
            cnpjCpfEmpregador: this.cnpjCpfEmpregador,
            cnoCaepf: this.cnoCaepf,
            razaoSocial: this.razaoSocial,
            numeroFabricacao: this.numeroFabricacao,
            dataInicial: this.dataInicial,
            dataFinal: this.dataFinal,
            dataHoraGeracao: this.dataHoraGeracao,
            versaoLayout: this.versaoLayout,
            tipoIdentificadorFabricante: this.tipoIdentificadorFabricante,
            cnpjCpfFabricante: this.cnpjCpfFabricante,
            modelo: this.modelo,
            crc: this.crc
        };
    }
}
exports.RegistroTipo1 = RegistroTipo1;
