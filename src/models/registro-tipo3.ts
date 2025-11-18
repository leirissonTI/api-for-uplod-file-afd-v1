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



  constructor(linha: string) {
    this.nsr = linha.substring(0, 9).trim()                       // 001–009
    this.tipo = linha.substring(9, 10).trim()                     // 010
    this.cpfEmpregado = linha.substring(34, 46).trim()           // 035–046
    this.crc = linha.substring(46, 50).trim()                     // 047–050


    const { DATA, HORA } = formatarDataEHora(linha)
    this.data = DATA
    this.hora = HORA

    this.dataCompleta = combinarDataEHora(DATA, HORA)
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
    }
  }
}