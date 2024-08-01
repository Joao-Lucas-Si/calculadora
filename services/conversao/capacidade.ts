import { UnidadeConversao, UnidadeDados} from "./Types"
import { conversor } from "./generico"

export const unidadesArray = ["quilolitro", "hectolitro", "decalitro", "litro", "decilitro", "centilitro", "mililitro"] as const

type Unidades = typeof unidadesArray[number]

const unidades: Record<Unidades, UnidadeDados> = {
  quilolitro: {
    unidade: "kl",
    disponiveis: unidadesArray.filter(unidade => unidade !== "quilolitro"),
    nome: "quilôlitro"
  },
  centilitro: {
    unidade: "cl",
    nome: "centílitro",
     disponiveis: unidadesArray.filter(unidade => unidade !== "centilitro"),
  },
  litro: {
    nome: "litro",
    unidade: "l",
     disponiveis: unidadesArray.filter(unidade => unidade !== "litro"),
  },
  decalitro: {
    nome: "decâgrama",
    unidade: "dal",
    disponiveis: unidadesArray.filter(unidade => unidade !== "decalitro"),
  },
  decilitro: {
    nome: "decílitro",
    unidade: "dl",
    disponiveis: unidadesArray.filter(unidade => unidade !== "decilitro"),
  },
  hectolitro: {
    nome: "hectôlitro",
    unidade: "hl",
    disponiveis: unidadesArray.filter(unidade => unidade !== "hectolitro"),
  },
  mililitro: {
    nome: "milílitro",
    unidade: "ml",
    disponiveis: unidadesArray.filter(unidade => unidade !== "mililitro"),
  }
}

const Capacidade: UnidadeConversao<Unidades> = {
  unidades,
  converter: conversor(unidadesArray)
}

export default Capacidade
