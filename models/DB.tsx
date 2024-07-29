import * as SQLite from 'expo-sqlite';

interface selectInterface {
  _array: historicoInterface[];
}

interface result {
  rows: selectInterface;
}

export interface historicoInterface {
  id: number,
  calculo: string,
  resultado: string,
  a: number,
  b: number,
  c: number
}

const db = SQLite.openDatabaseSync('../bd.db');

export function save(calculo: string, resultado: string, a: number, b:number, c:number) {
  db.transaction((tx) => {
    tx.executeSql(
      `insert into calculo (calculo, resultado, a, b, c) values (?,?,?,?,?)`,
      [calculo, resultado, a, b, c],
      (_, result) => {
        console.log('Inserido com sucesso!');
      },
      (_, error) => {
        console.log('Erro ao inserir:', error);
        return true;
      }
    );
  });
}

export function deleteAll() {
  db.transaction((tx) => {
    tx.executeSql(
      `delete from calculo`,
      [],
      (_, result) => {
        console.log('limpado com sucesso!');
      },
      (_, error) => {
        console.log('Erro ao limpar:', error);
        return true;
      }
    );
  });
}

export function remove(id: number) {
  db.transaction((tx) => {
    tx.executeSql(
      `delete from calculo
       where id = ${id}
      `,
      [],
      (_, result) => {
        console.log('limpado deletado com sucesso!');
      },
      (_, error) => {
        console.log('Erro ao limpar:', error);
        return true;
      }
    );
  });
}

export function selectAll(setter: (rows: historicoInterface[]) => void) {
  db.transaction((tx) => {
    tx.executeSql(
      `select * from calculo`,
      [],
      (_, result: result) => {
        console.log(result.rows._array);
        setter(result.rows._array);
      },
      (_, error) => {
        console.log('Erro ao selecionar:', error);
        return true;
      }
    );
  });
}

export default function create() {
db.transaction((tx) => {
    tx.executeSql(
      `create table if not exists calculo (
      id integer primary key AUTOINCREMENT,
      calculo varchar(500),
      resultado varchar(500),
      a numeric,
      b numeric,
      c numeric
      )`,
      [],
      (_, result) => {
        console.log('criado com sucesso!');
      },
      (_, error) => {
        console.log('Erro ao criar:', error);
        return true;
      }
    );
  });
}