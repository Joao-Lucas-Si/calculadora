import { UnidadeConversao, UnidadeDados} from "./Types"
import { conversor } from "./generico"

const unidadesArray = ["quilograma", "hectograma", "decagrama", "grama", "decigrama", "centigrama", "miligrama"] as const

type Unidades = typeof unidadesArray[number]

const unidades: Record<Unidades, UnidadeDados> = {
  quilograma: {
    unidade: "kg",
    disponiveis: unidadesArray.filter(unidade => unidade !== "quilograma"),
    nome: "quilôgrama"
  },
  centigrama: {
    unidade: "cg",
    nome: "centígrama",
     disponiveis: unidadesArray.filter(unidade => unidade !== "centigrama"),
  },
  grama: {
    nome: "grama",
    unidade: "g",
     disponiveis: unidadesArray.filter(unidade => unidade !== "grama"),
  },
  decagrama: {
    nome: "decâgrama",
    unidade: "dag",
    disponiveis: unidadesArray.filter(unidade => unidade !== "decagrama"),
  },
  decigrama: {
    nome: "decígrama",
    unidade: "dg",
    disponiveis: unidadesArray.filter(unidade => unidade !== "decigrama"),
  },
  hectograma: {
    nome: "hectôgrama",
    unidade: "hg",
    disponiveis: unidadesArray.filter(unidade => unidade !== "hectograma"),
  },
  miligrama: {
    nome: "milígrama",
    unidade: "mg",
    disponiveis: unidadesArray.filter(unidade => unidade !== "miligrama"),
  }
}

const Massa: UnidadeConversao<Unidades> = {
  unidades,
  converter: conversor(unidadesArray)
}

export default Massa
