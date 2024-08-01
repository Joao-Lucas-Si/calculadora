import { UnidadeConversao, UnidadeDados} from "./Types"
import { conversor } from "./generico"
import { unidadesArray as unidadesCapacidade } from "./capacidade"

const unidadesArray = ["quilometros", "hectometro", "decametro", "metros", "decimetro", "centimetros", "milimetro"] as const

type Unidades = typeof unidadesArray[number]

function converter(baseUnidade: string, transformar: string) {
  if (unidadesCapacidade.includes(transformar)) {
    const conversorVolume = baseUnidade !== "metros" ? conversor(unidadesArray, 1000)(baseUnidade, "metros") : undefined
    const conversorCapacidade = transformar === "litro" ? undefined : conversor(unidadesArray)("litro", transformar)
    return (base: number) => {
      const volume = (conversorVolume 
        ? conversorVolume(base) 
        : base
      ) * 1000
      return conversorCapacidade 
        ? conversorCapacidade(volume) 
        : volume
    }
  }
  else {
    return conversor(unidadesArray, 1000)(baseUnidade, transformar)
  }

}

const Comprimento: UnidadeConversao<Unidades> = {
  unidades: {
    quilometros: {
      unidade: "km³",
      disponiveis: [...unidadesArray.filter(unidade => unidade !== "quilometros"), ...unidadesCapacidade],
      nome: "quilômetros cúbicos"
    },
    centimetros: {
      unidade: "cm³",
      nome: "centímetros cúbicos",
      disponiveis: [...unidadesArray.filter(unidade => unidade !== "centimetros"), ...unidadesCapacidade],
    },
    metros: {
      nome: "metros cúbicos",
      unidade: "m³",
      disponiveis: [...unidadesArray.filter(unidade => unidade !== "metros"), ...unidadesCapacidade],
    },
    decametro: {
      nome: "decâmetros cúbicos",
      unidade: "dam³",
      disponiveis: [...unidadesArray.filter(unidade => unidade !== "decametro"), ...unidadesCapacidade],
    },
    decimetro: {
      nome: "decímetros cúbicos",
      unidade: "dm³",
      disponiveis: [...unidadesArray.filter(unidade => unidade !== "decimetro"), ...unidadesCapacidade],
    },
    hectometro: {
      nome: "hectômetros cúbicos",
      unidade: "hm³",
      disponiveis: [...unidadesArray.filter(unidade => unidade !== "hectometro"), ...unidadesCapacidade],
    },
    milimetro: {
      nome: "milímetros cúbicos",
      unidade: "mm³",
      disponiveis: [...unidadesArray.filter(unidade => unidade !== "milimetro"), ...unidadesCapacidade],
    },
  },
  converter
}

export default Comprimento
