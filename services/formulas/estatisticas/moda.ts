import { DefinicaoFormulario, Formula } from "../Types"

const Moda: Formula<{ valores: number[] }> = {
  titulo: "Moda",
  definicaoFormulario: [
    {
      titulo: "valores",
      nome: "valores",
      type: "listaNumeros"
    }
  ],
  obterPassos: (params) => {
    return [
      `rol={${params.valores.sort((i, i2) => i - i2).join(", ")}}`,
      ...(Object.entries(obterModa(params.valores).repeticoes).map(([numero, repeticao]) => `${numero}=${repeticao}`))
    ]
  },
  obterResultado: (params) => {
    const modas = obterModa(params.valores).modas
    return `moda=${modas.length > 1 ? "{" : ""}${modas.map(moda => moda.numero).join(", ")}${modas.length > 1 ? "}" : ""}`
  }
}

function obterModa(valores: number[]) {
  const repeticoes: Record<number, number> = {}
  
  valores.forEach((valor) => {
    repeticoes[valor] = valor in repeticoes ? repeticoes[valor] + 1 : 1
  })
  const possiveisModas = Object.entries(repeticoes).sort(([i1, i1r], [i2, i2r]) => i1r - i2r).map(([numero, repeticao]) => ({ numero, repeticao }))
  const maiorRepeticao = Object.entries(repeticoes).sort(([i1, i1r], [i2, i2r]) => i1r - i2r).map(([numero, repeticao]) => ({ numero, repeticao }))[Object.keys(repeticoes).length - 1]

  const modas = possiveisModas.filter(moda => moda.repeticao === maiorRepeticao.repeticao)

  return {
    repeticoes,
    modas
  }
}

export default Moda