import { UnidadeConversao, UnidadeDados} from "./Types"
import { conversorMaior, conversorMenor } from "./generico"

const unidades = ["segundos", "minuto", "hora", "dia", "semana", "mes", "ano", "decada", "seculo", "milenio",] as const

type Unidades = typeof unidades[number]

const minutos = 60

const horas = 60

const dias = 24

const semanas = 7

const meses = 4

const anos = 12

const decadas = 10

const seculos = 10

const milenios = 10



function conversor(base: string, transformar: string) {
  const baseIndice = (unidades.findIndex(unidade => unidade == base) ?? 0) + 1
  const transformarIndice = (unidades.findIndex(unidade => unidade === transformar) ?? 0) + 1

  const diferenca = (baseIndice < transformarIndice ? transformarIndice - baseIndice : baseIndice - transformarIndice)

  const calculos = [
    
  ]
  
  return baseIndice < transformarIndice ? conversorMaior(diferenca, 1) : conversorMenor(diferenca, 1)
}


const Capacidade: UnidadeConversao<Unidades> = {
  unidades: {
    segundos: {
      unidade: "s",
      disponiveis: unidades.filter(unidade => unidade !== "segundos"),
      nome: "segundos"
    },
    minuto: {
      unidade: "min",
      nome: "minutos",
      disponiveis: unidades.filter(unidade => unidade !== "minuto"),
    },
    hora: {
      nome: "horas",
      unidade: "h",
      disponiveis: unidades.filter(unidade => unidade !== "hora"),
    },
    dia: {
      nome: "dias",
      unidade: "d",
      disponiveis: unidades.filter(unidade => unidade !== "dia"),
    },
    semana: {
      nome: "semanas",
      unidade: "sem",
      disponiveis: unidades.filter(unidade => unidade !== "semana"),
    },
    mes: {
      nome: "meses",
      unidade: "m",
      disponiveis: unidades.filter(unidade => unidade !== "mes"),
    },
    ano: {
      nome: "anos",
      unidade: "a",
      disponiveis: unidades.filter(unidade => unidade !== "ano"),
    },
    decada: {
      nome: "décadas",
      unidade: "dec",
      disponiveis: unidades.filter(unidade => unidade !== "decada"),
    },
    seculo: {
      nome: "séculos",
      unidade: "sec",
      disponiveis: unidades.filter(unidade => unidade !== "seculo"),
    },
    milenio: {
      nome: "milênio",
      unidade: "mile",
      disponiveis: unidades.filter(unidade => unidade !== "milenio"),
    },
  },
  converter: conversor(unidadesArray)
}

export default Capacidade
