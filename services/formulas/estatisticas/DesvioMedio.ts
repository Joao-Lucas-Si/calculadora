import { Formula } from "../Types"
import myMath from "../../myMath"

const DesvioMedio: Formula<{ items: number[] }> = {
  definicaoFormulario: [
    {
      nome: "items",
      titulo: "items",
      type: "listaNumeros",
      
    }
  ],
  obterPassos: ({ items }) => {
    const media = myMath.med(...items)
    return [
      `(${items.join(" + ")})/${items.length}`,
      `${myMath.som(...items)}/${items.length}`,
      `${media}`,
      ...items.map(item => {
        return [
          `${item} - ${media}`,
          `${item - media}`,
        ]
      }).flat(),
      `${items.map(item => (item - media)).join(" + ")}/${items.length}`,
      `${myMath.som(...items.map(item =>  (item - media)))}/${items.length}`,
      `${myMath.med(...items.map(item =>  (item - media)))}`
    ]
  },
  obterResultado: ({ items }) => `dm=${myMath.med(...items.map(item =>  (item - myMath.med(...items))))}`, 
  titulo: "Desvio Medio"
}

export default DesvioMedio