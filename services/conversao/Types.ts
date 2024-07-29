export type UnidadeDados = {
  nome: string,
  unidade: string,
  disponiveis: string[]
}

export type UnidadeConversao<Unidades extends string = string> = {
  unidades: Record<Unidades, UnidadeDados>
  converter: (base: string, transformar: string) => (base: number) => number 
}