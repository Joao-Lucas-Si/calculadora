import { Formula } from "../Types"
import myMath from "../../myMath"
import Variancia from "./Variancia"

const DesvioPadrao: Formula<{ items: number[] }> = {
  definicaoFormulario: [
    {
      nome: "items",
      titulo: "items",
      type: "listaNumeros",
    }
  ],
  obterPassos: ({ items }) => {
    const variancia = myMath.med(...items.map(item =>  (item - myMath.med(...items)) ** 2))
    console.log(...Variancia.obterPassos({ items }))
    return [
     ...Variancia.obterPassos({ items }),
     `√${variancia}`,
    ]
  },
  obterResultado: ({ items }) =>  {
    const variancia = myMath.med(...items.map(item =>  (item - myMath.med(...items)) ** 2))
    return `${Math.sqrt(variancia)}`
  },
  titulo: "Desvio padrão"
}

export default DesvioPadrao