import { Formula } from "../Types"
import myMath from "../../myMath"

const Permutacao: Formula<{ numero: number }> = {
  titulo: "permutação",
  definicaoFormulario: [
    {
      nome: "numero",
      titulo: "número",
      type: "numero"
    }
  ],
  obterPassos: ({ numero }) => {
    const numeros = Array.from(Array(numero)).map((a, i) => i + 1)
    return [
      `${numero}!`,
      `${numeros.join(" X ")}`,
      ...(numeros.map(i => i !== numeros.length ? `${myMath.fatorial(i)} X ${numeros.filter(n => n > i).join(" X ")}` : `${myMath.fatorial(numero)}`)),
    ]
  },
  obterResultado: ({ numero }) => `${myMath.fatorial(numero)}`
}

export default Permutacao