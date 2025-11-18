"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistroTipo3 = void 0;
const combinarDataEHora_js_1 = require("../utils/combinarDataEHora.js");
const formatters_js_1 = require("../utils/formatters.js");
class RegistroTipo3 {
    nsr;
    tipo;
    dataCompleta;
    data;
    hora;
    cpfEmpregado;
    crc;
    origem;
    constructor(linha) {
        this.nsr = linha.substring(0, 9).trim(); // 001–009
        this.tipo = linha.substring(9, 10).trim(); // 010
        this.cpfEmpregado = linha.substring(34, 46).trim(); // 035–046
        this.crc = linha.substring(46, 50).trim(); // 047–050
        const { DATA, HORA } = (0, formatters_js_1.formatarDataEHora)(linha);
        this.data = DATA;
        this.hora = HORA;
        this.dataCompleta = (0, combinarDataEHora_js_1.combinarDataEHora)(DATA, HORA);
    }
    toJSON() {
        return {
            nsr: Number(this.nsr),
            tipo: this.tipo,
            dataCompleta: this.dataCompleta,
            data: this.data,
            hora: this.hora,
            cpfEmpregado: this.cpfEmpregado,
            crc: this.crc,
            origem: this.origem,
        };
    }
}
exports.RegistroTipo3 = RegistroTipo3;
