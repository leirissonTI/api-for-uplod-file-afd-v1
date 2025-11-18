"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInicioFimDoMes = getInicioFimDoMes;
function getInicioFimDoMes(mes, ano) {
    const inicioDoMes = new Date(ano, mes - 1, 1);
    const inicioDoProximoMes = new Date(ano, mes, 1);
    return { inicioDoMes, inicioDoProximoMes };
}
// EXEMPLO DE USO  => const { primeiroDia, ultimoDia } = getInicioFimDoMes(data);
