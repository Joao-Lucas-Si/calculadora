import { UnidadeConversao, UnidadeDados} from "./Types"
import { conversor } from "./generico"

const unidades = ["yotabyte", "zetabyte", "exabyte", "petabyte", "terabyte", "gigabyte", "megabyte", "kilobyte", "byte"] as const

type Unidades = typeof unidades[number]

const Armazenamento: UnidadeConversao<Unidades> = {
  unidades: {
    kilobyte: {
    unidade: "kb",
    disponiveis: unidades.filter(unidade => unidade !== "kilobyte"),
    nome: "kilobyte"
  },
  byte: {
    unidade: "b",
    nome: "byte",
    disponiveis: unidades.filter(unidade => unidade !== "byte"),
  },
  exabyte: {
    nome: "exabyte",
    unidade: "eb",
     disponiveis: unidades.filter(unidade => unidade !== "exabyte"),
  },
  gigabyte: {
    nome: "gigabyte",
    unidade: "gb",
    disponiveis: unidades.filter(unidade => unidade !== "gigabyte"),
  },
  megabyte: {
    nome: "megabyte",
    unidade: "mg",
    disponiveis: unidades.filter(unidade => unidade !== "megabyte"),
  },
  petabyte: {
    nome: "petabyte",
    unidade: "pb",
    disponiveis: unidades.filter(unidade => unidade !== "petabyte"),
  },
  terabyte: {
    nome: "terabyte",
    unidade: "tb",
    disponiveis: unidades.filter(unidade => unidade !== "terabyte"),
  },
  yotabyte: {
    nome: "yotabyte",
    unidade: "yb",
    disponiveis: unidades.filter(unidade => unidade !== "yotabyte"),
  },
  zetabyte: {
    nome: "zetabyte",
    unidade: "zb",
    disponiveis: unidades.filter(unidade => unidade !== "zetabyte"),
  },
  },
  converter: conversor(unidades, 2, 10)
}

export default Armazenamento
