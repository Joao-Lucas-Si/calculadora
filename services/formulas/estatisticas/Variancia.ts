import { Formula } from "../Types"
import myMath from "../../myMath"

const Variancia: Formula<{ items: number[] }> = {
 definicaoFormulario: [
    {
      titulo: "items",
      nome: "items",
      type: "listaNumeros"
    }
  ],
  obterPassos: ({ items }) => {
    const media = myMath.med(...items)
    return [
      `(${items.join(" + ")})/${items.length}`,
      `${myMath.som(...items)}/${items.length}`,
      `${media}`,
      ...(items.map(item => [
        `(${item} - ${media})²`,
        `${item - media}²`,
        `${(item - media) ** 2}`
      ]).flat()),
      `${items.map(item => (item - media) ** 2).join(" + ")}/${items.length}`,
      `${myMath.som(...items.map(item =>  (item - media) ** 2))}/${items.length}`,
      `${myMath.med(...items.map(item =>  (item - media) ** 2))}`
    ]
  },
  obterResultado: ({ items }) => `v=${myMath.med(...items.map(item =>  (item - myMath.med(...items)) ** 2))}`, 
  titulo: "Variância"
}

export default Variancia