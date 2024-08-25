import { Variavel, db, VariavelValor } from "./DB"


export async function salvar(variavel: Variavel, id: number, tabela: "formula"|"calculo") {
  const relacionamento = tabela === "formula" ? "formula_id" : "calculo_id"
  
  const resultado = await db.runAsync(
    `insert into variavel (tipo, nome, valor, ${relacionamento}) values (?, ?, ?, ?)`, 
    variavel.tipo, 
    variavel.nome, 
    variavel.tipo === "lista" ? 0 : variavel.valor, 
    id
  )
  if (variavel.tipo === "lista") {
    for (const valor of variavel.valores) {
      await db.runAsync(`insert into variavel_valor (valor, variavel_id) values (?, ?)`, valor, resultado.lastInsertRowId)
    }
  }
}

export async function coletarTodos(id: number, tabela: "formula"|"calculo") {
  const relacionamento = tabela === "formula" ? "formula_id" : "calculo_id"
  const variaveis = await db.getAllAsync<Variavel>(`select * from variavel where ${relacionamento} = ?`, id)

  for (const variavel of variaveis) {
    if (variavel.tipo === "lista") {
      const valores = await db.getAllAsync<VariavelValor>(`select * from variavel_valor where variavel_id = ?`, variavel.id)
      variavel.valores = valores.map(valor => valor.valor)
    }
  }

  return variaveis
}


export async function deletar(id: number, tabela: "formula"|"calculo") {
  const relacionamento = tabela === "formula" ? "formula_id" : "calculo_id"
  const variaveisLista = await db.getAllAsync(`select * from variavel where ${relacionamento} = ? and tipo = 'lista'`, id)
  for (const variavel of variaveisLista) {
    await db.runAsync(`delete from variavel_valor where variavel_id = ?`, )
  }
  await db.runAsync(`delete from variavel where ${relacionamento} = ?`, id)
}