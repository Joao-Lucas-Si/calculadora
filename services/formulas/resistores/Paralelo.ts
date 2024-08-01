import { DefinicaoFormulario, Formula } from "../Types"
import MMC, {obterMultiplos} from "../Outros/MCC"
import myMath from "../../myMath"

const Paralelo: Formula<{ resistores: number[] }> = {
  titulo: "Resistores Paralelos",
  definicaoFormulario: [
    {
      titulo: "resistores",
      nome: "resistores",
      type: "listaNumeros"
    },
  ],
  obterPassos: ({ resistores }) => {
    const multiplos = obterMultiplos(resistores)
    const mmc  = myMath.mul(...multiplos)
    return [
      `${resistores.map(resitor => `(1/${resitor})`).join("+")}`,
      `1/req= ${resistores.map(resitor => `(1/${resitor})`).join("+")}`,
      `mmc`,
      ...MMC.obterPassos({ numeros: resistores }),
      `1/req=(${resistores.map(resitor => `(${mmc}/${resitor})`).join(" + ")})/${mmc}`,
      `1/req=(${resistores.map(resitor => `${mmc / resitor}`).join(" + ")})/${mmc}`,
      `1/req=${myMath.som(...resistores.map(resitor => mmc / resitor))}/${mmc}`,
      `req=${mmc}/${myMath.som(...resistores.map(resitor => mmc / resitor))}`,
    ]
  },
  obterResultado: ({resistores}) => {
    const multiplos = obterMultiplos(resistores)
    const mmc = myMath.mul(...multiplos)
    return `req=~${mmc / myMath.som(...resistores.map(resistor => mmc / resistor))}`
  },
}

export const obterResultadoBruto = (resistores: number[]) => {
  const multiplos = obterMultiplos(resistores)
  const mmc = myMath.mul(...multiplos)
  return mmc / myMath.som(...resistores.map(resistor => mmc / resistor))
}

export default Paralelo