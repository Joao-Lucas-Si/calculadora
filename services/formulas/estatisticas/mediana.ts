import { Formula } from "../Types"

const Mediana: Formula<{ valores: number[] }> = {
  titulo: "Mediana",
  definicaoFormulario: [
    {
      type: "listaNumeros",
      nome: "valores",
      titulo: "valores"
    }
  ],
  obterPassos: (params) => {
    const valores = params.valores.sort((i1, i2) => i1 - i2)
    const metade = Math.floor(valores.length / 2)
    const meio = ((metade - 1) * 2) === valores.length - 2
      ? [
        valores[metade - 1], 
        valores[metade ]
      ] 
      : [valores[metade]]
    return [
      `rol={${valores.sort((i1, i2) => i1 - i2).join(", ")}}`,
      `meio=${meio.join(", ")}`,
      ...(meio.length > 1 ? [
        `mediana=(${meio.join(" + ")}) / 2`,
        `mediana=${meio[0] + meio[1]} / 2`,
        `mediana=${(meio[0] + meio[1]) / 2}`
      ] : [`mediana=${meio[0]}`])
    ]
  },
  obterResultado: (params) => {
    const valores = params.valores.sort((i1, i2) => i1 - i2)
    const metade = Math.floor(valores.length / 2)
    const meio = ((metade - 1) * 2) === valores.length - 2 
    ? [
      valores[metade - 1], 
      valores[metade]
    ] 
    : [valores[(metade < 1 ? 0 : metade)]]
    return `mediana=${meio.length > 1 ? ((meio[0] + meio[1]) / 2) : meio[0]}`
  }
}


export default Mediana