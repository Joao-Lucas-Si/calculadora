import { ReactNode } from "react"

export type DefinicaoFormulario = {
  titulo: string,
  nome: string,
  opcional?: boolean,
  type: "numero"|"listaNumeros"|"selecao"|"adicionarLista"|"adicionar"|"texto"|"duplo"
} & ({
  type: "adicionarLista"|"adicionar",
  tituloDinamico: string
}| {})

export type Formula<ParametrosResultado extends object> = Record<string, any> & {
  titulo: string,
  definicaoFormulario: DefinicaoFormulario[],
  obterPassos: (params: ParametrosResultado) => (string|ReactNode)[],
  obterResultado: (params: ParametrosResultado) => (string|ReactNode)
}