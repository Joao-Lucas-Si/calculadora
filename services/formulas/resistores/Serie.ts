import { DefinicaoFormulario, Formula } from "../Types"

const Serie: Formula<{ resistores: number[] }> = {
  titulo: "Resistor em serie",
  definicaoFormulario: [
    {
      titulo: "resistores",
      nome: "resistores",
      type: "listaNumeros"
    },
  ],
  obterPassos: ({ resistores }) => {
    return [
      `F= ${resistores.join(" + ")}`,
    ]
  },
  obterResultado: ({resistores}) => `Req=${resistores.reduce((acumulacao, num) => acumulacao + num, 0)}`
}

export default Serie