import { db, Historico, Variavel } from "./DB"
import * as VariavelService from "./variavel"

export async function salvar(historico: Historico) {
  const resultado = await db.runAsync(`insert into calculo (calculo, resultado) values (?, ?)`, historico.calculo, historico.resultado)
  for (const variavel of historico.variaveis)  {
    await VariavelService.salvar(variavel, resultado.lastInsertRowId, "calculo")
  }
}

export async function coletarTodos(setter: (historico: Historico[]) => void) {
  const historicos = await db.getAllAsync<Historico>(`select * from calculo`)
  for (let historico of historicos) {
    const variaveis = await VariavelService.coletarTodos(historico.id, "calculo")
    historico.variaveis = variaveis
  }
  setter(historicos)
}

export async function deletar(id: number) {
  await db.runAsync(`delete from calculo where id = ?`, id)
}

export async function deletarTodos() {
  await db.runAsync(`delete from calculo`)
}