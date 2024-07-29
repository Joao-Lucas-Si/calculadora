import { UnidadeConversao, UnidadeDados} from "./Types"
import { conversor } from "./generico"

const unidadesArray = ["quilometros", "hectometro", "decametro", "metros", "decimetro", "centimetros", "milimetro"] as const

type Unidades = typeof unidadesArray[number]

const unidades: Record<Unidades, UnidadeDados> = {
  quilometros: {
    unidade: "km",
    disponiveis: unidadesArray.filter(unidade => unidade !== "quilometros"),
    nome: "quilômetros"
  },
  centimetros: {
    unidade: "cm",
    nome: "centímetros",
     disponiveis: unidadesArray.filter(unidade => unidade !== "centimetros"),
  },
  metros: {
    nome: "metros",
    unidade: "m",
     disponiveis: unidadesArray.filter(unidade => unidade !== "metros"),
  },
  decametro: {
    nome: "decâmetro",
    unidade: "dam",
    disponiveis: unidadesArray.filter(unidade => unidade !== "decametro"),
  },
  decimetro: {
    nome: "decímetro",
    unidade: "dm",
    disponiveis: unidadesArray.filter(unidade => unidade !== "decimetro"),
  },
  hectometro: {
    nome: "hectômetro",
    unidade: "hm",
    disponiveis: unidadesArray.filter(unidade => unidade !== "hectometro"),
  },
  milimetro: {
    nome: "milímetro",
    unidade: "mm",
    disponiveis: unidadesArray.filter(unidade => unidade !== "milimetro"),
  }
}

const Comprimento: UnidadeConversao<Unidades> = {
  unidades,
  converter: conversor(unidadesArray)
}

export default Comprimento
