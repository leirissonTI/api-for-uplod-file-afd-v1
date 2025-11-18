// export function formatarDataEHora(linha: string): { DATA: string,  HORA: string } {
//   // Extrai a parte da data/hora (posições 11 a 29)
//   const dataHoraISO = linha.substring(10, 29).trim()  // Ex: "2024-05-31T10:57:00"

//   // Valida o formato básico
//   if (!dataHoraISO || dataHoraISO.length < 19) {
//     return { DATA: 'DATA INVÁLIDA', HORA: 'HORA INVÁLIDA' }
//   }

//   try {
//     const [dataPart, horaPart] = dataHoraISO.split('T')

//     // Formato esperado de dataPart: YYYY-MM-DD
//     const [ano, mes, dia] = dataPart.split('-')

//     const DATA_FORMATADA = `${dia}/${mes}/${ano}`
//     const HORA_FORMATADA = horaPart.substring(0, 8)  // HH:mm:ss

//     return {
//       DATA: DATA_FORMATADA,
//       HORA: HORA_FORMATADA
//     }
//   } catch (error) {
//     console.error('Erro ao formatar data/hora:', error)
//     return { DATA: 'ERRO', HORA: 'ERRO' }
//   }
// }

export function formatarDataEHora(linha: string): { DATA: string, HORA: string } {
  // Validação inicial da entrada
  if (!linha || typeof linha !== 'string') {
    return { DATA: 'DATA INVÁLIDA', HORA: 'HORA INVÁLIDA' }
  }

  try {
    // Extrai a parte da data/hora (posições 10 a 29)
    const dataHoraISO = linha.substring(10, 29).trim()
    
    // Valida o formato básico
    if (!dataHoraISO || dataHoraISO.length < 19) {
      console.warn('Formato de data/hora inválido:', { linha, dataHoraISO })
      return { DATA: 'DATA INVÁLIDA', HORA: 'HORA INVÁLIDA' }
    }

    // Valida se contém o caractere 'T'
    if (!dataHoraISO.includes('T')) {
      console.warn('Formato ISO inválido - falta caractere T:', dataHoraISO)
      return { DATA: 'DATA INVÁLIDA', HORA: 'HORA INVÁLIDA' }
    }

    const [dataPart, horaPart] = dataHoraISO.split('T')

    // Valida partes da data
    if (!dataPart || !horaPart) {
      console.warn('Partes de data/hora inválidas:', { dataPart, horaPart })
      return { DATA: 'DATA INVÁLIDA', HORA: 'HORA INVÁLIDA' }
    }

    // Valida formato da data (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(dataPart)) {
      console.warn('Formato de data inválido:', dataPart)
      return { DATA: 'DATA INVÁLIDA', HORA: 'HORA INVÁLIDA' }
    }

    // Valida formato da hora (HH:mm:ss)
    const timeRegex = /^\d{2}:\d{2}:\d{2}/
    if (!timeRegex.test(horaPart)) {
      console.warn('Formato de hora inválido:', horaPart)
      return { DATA: 'DATA INVÁLIDA', HORA: 'HORA INVÁLIDA' }
    }

    // Extrai componentes da data
    const [ano, mes, dia] = dataPart.split('-')
    const DATA_FORMATADA = `${dia}/${mes}/${ano}`
    
    // Extrai hora (apenas HH:mm:ss, remove milissegundos se existirem)
    const HORA_FORMATADA = horaPart.substring(0, 8)

    // Validações finais
    if (DATA_FORMATADA.includes('NaN') || HORA_FORMATADA.includes('NaN')) {
      console.warn('Erro na formatação:', { DATA_FORMATADA, HORA_FORMATADA })
      return { DATA: 'DATA INVÁLIDA', HORA: 'HORA INVÁLIDA' }
    }

    return {
      DATA: DATA_FORMATADA,
      HORA: HORA_FORMATADA
    }
  } catch (error) {
    console.error('Erro ao formatar data/hora:', error)
    return { DATA: 'ERRO PROCESSAMENTO', HORA: 'ERRO PROCESSAMENTO' }
  }
}