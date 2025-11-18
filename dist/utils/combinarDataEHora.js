"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combinarDataEHora = combinarDataEHora;
function combinarDataEHora(dataStr, horaStr) {
    const [dia, mes, ano] = dataStr.split('/').map(Number);
    const [horas, minutos, segundos] = horaStr.split(':').map(Number);
    return new Date(ano, mes - 1, dia, horas, minutos, segundos);
    // Cria a data em UTC e ajusta para UTC-4 (subtrai 4 horas)
}
