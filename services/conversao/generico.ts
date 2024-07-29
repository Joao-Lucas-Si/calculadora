export const conversor = (unidades: string[], distancia: number = 10, extra: number = 1) => function converter(base: string, transformar: string) {
  const baseIndice = (unidades.findIndex(unidade => unidade == base) ?? 0) + 1
  const transformarIndice = (unidades.findIndex(unidade => unidade === transformar) ?? 0) + 1

  const diferenca = (baseIndice < transformarIndice ? transformarIndice - baseIndice : baseIndice - transformarIndice) * extra
  console.log(diferenca)
  return baseIndice < transformarIndice ? conversorMaior(diferenca, distancia) : conversorMenor(diferenca, distancia)

}


export function conversorMenor(diferenca: number, distancia: number) {
  
  return (base: number) => base / (distancia ** diferenca)
}

export function conversorMaior(diferenca: number, distancia: number) {
  return (base: number) => base * (distancia ** diferenca)
}