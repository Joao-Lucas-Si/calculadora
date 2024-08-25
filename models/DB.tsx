import * as SQLite from 'expo-sqlite';

export interface Historico {
  id: number,
  calculo: string,
  resultado: string,
  variaveis: Variavel[]
}

export type Variavel = {
  id: number,
  tipo: "normal"|"lista"
  nome: string,
} & ({ tipo: "lista", valores: number[] }|{ tipo: "normal", valor: number})

export interface VariavelValor {
  id: number,
  valor: number
}

export interface Formula {
  id: number,
  calculo: string,
  nome: string,
  parametros: Variavel[]
}

export const db = SQLite.openDatabaseSync('../bd.db');

export default async function create() {
  await db.execAsync( `
    create table if not exists calculo (
      id integer primary key AUTOINCREMENT,
      calculo text not null,
      resultado text not null
    );
    create table if not exists formula (
      id integer primary key autoincrement,
      nome text not null
    );
    create table if not exists variavel (
      id integer primary key autoincrement,
      tipo text not null,
      valor number null,
      nome text not null,
      calculo_id integer null references calculo(id) on delete cascade,
      formula_id integer null references formula(id) on delete cascade
    );
    create table if not exists variavel_valor (
      id integer primary key autoincrement,
      valor number not null,
      variavel_id integer references variavel(id) on delete cascade
    );
  `);
}