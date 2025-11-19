import { combinarDataEHora } from '../utils/combinarDataEHora.js'
import { formatarDataEHora } from '../utils/formatters.js'


export class RegistroTipo3 {
  nsr: string
  tipo: string
  dataCompleta: Date
  data: string
  hora: string
  cpfEmpregado: string
  crc: string
  origem?: number  | string | 'sem origem' 
  valido: boolean
  erro?: string

  constructor(linha: string) {
    this.valido = true // Assume válido até prova em contrário
    
    try {
      this.nsr = linha.substring(0, 9).trim()                       // 001–009
      this.tipo = linha.substring(9, 10).trim()                     // 010
      this.cpfEmpregado = linha.substring(34, 46).trim()           // 035–046
      this.crc = linha.substring(46, 50).trim()                     // 047–050

      const { DATA, HORA } = formatarDataEHora(linha)
      this.data = DATA
      this.hora = HORA

      // 🚨 Tratamento de erro crítico
      if (DATA === 'DATA INVÁLIDA' || HORA === 'HORA INVÁLIDA') {
        this.valido = false
        this.erro = `Data/hora inválida: ${DATA} / ${HORA}`
        this.dataCompleta = new Date('2000-01-01') // Data padrão para evitar crash
        console.warn(`⚠️ Registro Tipo3 inválido detectado: ${this.erro}`)
      } else {
        try {
          this.dataCompleta = combinarDataEHora(DATA, HORA)
        } catch (error: any) {
          this.valido = false
          this.erro = `Falha ao combinar data/hora: ${error.message}`
          this.dataCompleta = new Date('2000-01-01')
          console.warn(`⚠️ Erro ao combinar data/hora: ${this.erro}`)
        }
      }
    } catch (error: any) {
      this.valido = false
      this.erro = `Erro no parsing da linha: ${error.message}`
      this.dataCompleta = new Date('2000-01-01')
      this.data = 'ERRO_PARSING'
      this.hora = 'ERRO_PARSING'
      this.nsr = '0'
      this.tipo = '3'
      this.cpfEmpregado = '00000000000'
      this.crc = 'ERRO'
      console.warn(`⚠️ Erro crítico no parsing Tipo3: ${this.erro}`)
    }
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
      valido: this.valido,
      erro: this.erro
    }
  }
}