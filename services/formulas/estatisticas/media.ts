import { DefinicaoFormulario, Formula } from "../Types"

const Media: Formula<{ valores: number[] }> = {
  titulo: "Media",
  definicaoFormulario: [
    {
      titulo: "valores",
      nome: "valores",
      type: "listaNumeros"
    }
  ],
  obterPassos: ({ valores }) => {
    return [
      `media=(${valores.join(", ")})/${valores.length}`,
      `media=${valores.reduce((i1, i2) => i1 + i2, 0)}/${valores.length}`,
      `media=${valores.reduce((i1, i2) => i1 + i2, 0)/valores.length}`
    ]
  },
  obterResultado: ({valores}) => `media=${valores.reduce((i1, i2) => i1 + i2, 0)/valores.length}`
}

export default Media