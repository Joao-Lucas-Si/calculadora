import { DefinicaoFormulario, Formula } from "../Types"

const Quadrado: Formula<{ lado: number }> = {
  titulo: "Quadrado",
  definicaoFormulario: [
    {
      titulo: "lado",
      nome: "lado",
      type: "numero"
    }
  ],
  obterPassos: ({ lado }) => {
    return [
      `${lado}^2`
    ]
  },
  obterResultado: ({lado}) => `${lado ** 2}`
}

export default Quadrado