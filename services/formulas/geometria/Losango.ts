import { DefinicaoFormulario, Formula } from "../Types"

const Losango: Formula<{ menor: number, maior: number }> = {
  titulo: "Losango",
  definicaoFormulario: [
    {
      titulo: "diagonal maior(D)",
      nome: "maior",
      type: "numero"
    },
    {
      titulo: "diagonal menor(d)",
      nome: "menor",
      type: "numero"
    }
  ],

  obterPassos: ({ maior, menor }) => {
    return [
      `F=(D X d)/2`,
      `(${maior} X ${menor})/2`,
      `${maior * menor}/2`,
    ]
  },
  obterResultado: ({menor, maior}) => `${(maior * menor)/2}`
}

export default Losango