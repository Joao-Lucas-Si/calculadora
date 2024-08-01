import { DefinicaoFormulario, Formula } from "../Types"
import Serie from "./Serie"
import Paralelo, { obterResultadoBruto } from "./Paralelo"

const Misto: Formula<{ resistores: (number[]|number)[] }> = {
  titulo: "Resistores misto",
  definicaoFormulario: [
    {
      titulo: "adicionar",
      nome: "resistores",
      type: "adicionar",
      tituloDinamico: "resistor"
    },
    {
      titulo: "adicionar paralelo",
      nome: "resistores",
      tituloDinamico: "resistor paralelo",
      type: "adicionarLista"
    },
  ],
  obterPassos: ({ resistores }) => {

    const paralelos = resistores.filter(resistor => resistor instanceof Array).map(paralelo => ({passos: Paralelo.obterPassos({resistores: paralelo as number[]}), resultado: Paralelo.obterResultado({resistores:  paralelo as number[]})}))

    return [
      `F= ${resistores.map(resistor => resistor instanceof Array ? Paralelo.obterPassos({ resistores: resistor })[0] : resistor).join(" + ")}`,
      ...paralelos.map(paralelo => [...paralelo.passos, paralelo.resultado]).flat(),
      ...Serie.obterPassos({resistores: resistores.map(resistor => resistor instanceof Array ? obterResultadoBruto(resistor) : resistor) })
    ]
  },
  obterResultado: ({resistores}) => {
    return Serie.obterResultado({resistores: resistores.map(resistor => resistor instanceof Array ? obterResultadoBruto(resistor) : resistor) })
  }
}

export default Misto