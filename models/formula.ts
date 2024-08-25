import { Formula, db, Variavel} from "./DB"
import * as VarivelService from "./variavel"

export async function coletarTodos(setter: (formulas: Formula[]) => void) {
  const formulas = await db.getAllAsync<Formula>(`select * from formula`)
  for (let formula of formulas) {
    const variaveis = await VarivelService.coletarTodos(formula.id, "formula")
    formula.parametros = variaveis
  }
  setter(formulas)
}

export async function salvar(formula: Formula) {
  const resultado = await db.runAsync(`insert into formula (nome, calculo) values (?, ?)`, formula.nome, formula.calculo)
  for (const parametro of formula.parametros) {
    await VarivelService.salvar(parametro, resultado.lastInsertRowId, "formula")
  }
}

