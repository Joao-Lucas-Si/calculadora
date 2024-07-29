import { Formula } from "../Types"
import myMath from "../../myMath"

const Arranjo: Formula<{ numero: number, grupo: number }> = {
  titulo: "Arranjo",
  definicaoFormulario: [
    {
      nome: "numero",
      titulo: "número",
      type: "numero"
    },
    {
      nome: "grupo",
      type: "numero",
      titulo: "tamanho do grupo",
    }
  ],
  obterPassos: ({ numero, grupo }) => {
    const numeros = Array.from(Array(numero)).map((a, i) => i + 1)
    return [
      `${numero}!/(${numero} - ${grupo})!`,
      `${numero}!/${numero - grupo}!`,
      `(${numero - grupo}! X ${numeros.filter(n => n > numero - grupo).join(" X ")})/${numero - grupo}!`,
      ...(numeros.filter(n => n > numero - grupo).map(i => i !== numeros.length ? `${myMath.fatorial(i) / myMath.fatorial(numero - grupo)} X ${numeros.filter(n => n > i).join(" X ")}` : `${myMath.fatorial(numero) / myMath.fatorial(numero - grupo)}`)),
    ]
  },
  obterResultado: ({ numero, grupo }) => `${
    myMath.fatorial(numero)
    /
    myMath.fatorial(numero - grupo)
  }`
}

export default Arranjo