export type DefinicaoFormulario = {
  titulo: string,
  nome: string,
  opcional?: boolean,
  type: "numero"|"listaNumeros"|"selecao"
}

export type Formula<ParametrosResultado extends object> = {
  titulo: string,
  definicaoFormulario: DefinicaoFormulario[],
  obterPassos: (params: ParametrosResultado) => string[],
  obterResultado: (params: ParametrosResultado) => string
}