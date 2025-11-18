export function getInicioFimDoMes(mes: number, ano:number) {

  const inicioDoMes = new Date(ano, mes - 1, 1)
  const inicioDoProximoMes = new Date(ano, mes, 1)


  return { inicioDoMes, inicioDoProximoMes };
}

// EXEMPLO DE USO  => const { primeiroDia, ultimoDia } = getInicioFimDoMes(data);