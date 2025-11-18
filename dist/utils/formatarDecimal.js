"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatarDecimal = formatarDecimal;
function formatarDecimal(valor) {
    return parseFloat(valor.toFixed(2));
}
