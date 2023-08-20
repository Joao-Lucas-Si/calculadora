import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Button,
  ScrollView,
  Pressable,
} from 'react-native';
import { useState, useEffect, useMemo } from 'react';
// You can import supported modules from npm
import { Card } from 'react-native-paper';
import Botao from './components/Botao';
// or any files within the Snack
import styleVars from './style/vars';
import * as SQLite from 'expo-sqlite';
import ModalHistorico from './components/ModalHistorico';
import ModalVariaveisValores from "./components/ModalVariaveisValores"

export default function App() {
  const db = SQLite.openDatabase('database.db');
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `create table if not exists calculo (
        id integer primary key AUTOINCREMENT,
        calculo varchar(500)
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
  }, [db]);
  interface selectInterface {
    _array: historicoInterface[];
  }

  interface result {
    rows: selectInterface;
  }

  interface historicoInterface {
    id: number;
    calculo: String;
  }
  const [valorX, setValorX] = useState(0);
  const [valorY, setValorY] = useState(0);
  const [valorZ, setValorZ] = useState(0);
  const [historicoAberto, setHistoricoAberto] = useState(false);
  const [valoresVariaveisAberto, setValoresVariaveisAberto] = useState(false);
  const [exibirExtras, setExibirExtras] = useState(false);
  const [posicao, setPosicao] = useState(0);
  const [calculo, setCalculo] = useState('');
  const [historico, setHistorico] = useState(Array());
  const valores = useMemo(() => {
    let comPosicao =
      calculo.slice(0, calculo.length - posicao) +
      '|' +
      calculo.slice(calculo.length - posicao);
    return comPosicao
      .replaceAll('+', ' + ')
      .replaceAll('-', ' - ')
      .replaceAll('X', ' X ')
      .replaceAll('/', ' / ')
      .replaceAll('^', ' ^ ');
  }, [calculo, posicao]);

  const calculado = useMemo(calcular, [calculo, calcular]);

  function calcular(calculoPametro: string = calculo): string {
    if (
      ['+', '-', '/', 'X', '^', ','].some((char) =>
        calculoPametro.endsWith(char)
      ) ||
      (calculoPametro.match(/\(/g) || []).length !=
        (calculoPametro.match(/\)/g) || []).length
    ) {
      return '';
    } else if (calculoPametro == '') {
      return '';
    } else {
      try {
        let calculoTemporario = calculoPametro;
        calculoTemporario = calculoTemporario
          .replaceAll('𝝅', '3.141592653')
          .replaceAll('X', '*')
          .replaceAll('^', '**')
          .replaceAll(',', '.')
          .replaceAll('x', String(valorX))
          .replaceAll('y', String(valorY))
          .replaceAll('z', String(valorZ));
        for (const mathLog of calculoTemporario.matchAll(
          /([0-9\.]*)?(\(.*?\))?log([0-9\.]*)?(\(.+?\))?/g
        )) {
          calculoTemporario = calculoTemporario.replace(
            mathLog[0],
            `Math.log(${
              mathLog[4]
                ? mathLog[4].replace('(', '').replace(')', '')
                : mathLog[3]
            }) ${
              mathLog[1]
                ? '/ Math.log(' +
                  (mathLog[2]
                    ? mathLog[2].replace(')', '').replace('(', '')
                    : mathLog[1]) +
                  ')'
                : ''
            }`
          );
        }
        for (const mathRoot of calculoTemporario.matchAll(
          /√([0-9\.])?(\(.+?\))?/g
        )) {
          calculoTemporario = calculoTemporario.replace(
            mathRoot[0],
            `Math.sqrt(${
              mathRoot[2]
                ? mathRoot[2].replace(/^\(/g, '').replace(/\)$/g, '')
                : mathRoot[1]
            })`
          );
        }
        for (const mathSin of calculoTemporario.matchAll(
          /sen([0-9\.]*)?(\(.*?\))?/g
        )) {
          calculoTemporario = calculoTemporario.replace(
            mathSin[0],
            `Math.sin(${
              mathSin[2]
                ? mathSin[2].replace(/^\(/g, '').replace(/\)$/g, '')
                : mathSin[1]
            })`
          );
        }
        for (const mathCos of calculoTemporario.matchAll(
          /cos([0-9\.]*)?(\(.*?\))?/g
        )) {
          calculoTemporario = calculoTemporario.replace(
            mathCos[0],
            `Math.cos(${
              mathCos[2]
                ? mathCos[2].replace(/^\(/g, '').replace(/\)$/g, '')
                : mathCos[1]
            })`
          );
        }
        for (const mathTan of calculoTemporario.matchAll(
          /tan([0-9\.]*)?(\(.*?\))?/g
        )) {
          calculoTemporario = calculoTemporario.replace(
            mathTan[0],
            `Math.tan(${
              mathTan[2]
                ? mathTan[2].replace(/^\(/g, '').replace(/\)$/g, '')
                : mathTan[1]
            })`
          );
        }

        return String(eval(calculoTemporario)).replace('.', ',');
      } catch {
        return 'calculo invalido';
      }
    }
  }

  function remover() {}

  function salvar() {
    db.transaction((tx) => {
      tx.executeSql(
        `insert into calculo (calculo) values (?)`,
        [calculo],
        (_, result) => {
          console.log('Inserido com sucesso!');
        },
        (_, error) => {
          console.log('Erro ao inserir:', error);
          return true;
        }
      );
    });
    setCalculo(calculado);
  }
  function limpar() {
    db.transaction((tx) => {
      tx.executeSql(
        `delete from calculo`,
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
    setCalculo(calculado);
  }

  function adicionar(valor: string): void {
    if (calculo == '' &&
      ['/', '^', 'X'].includes(valor)
    ) {
      return;
    } else if (
      ['+', '-', 'X', '/', '^'].includes(
        calculo[calculo.length - posicao - 1]
      ) &&
      ['+', '-', 'X', '/', '^'].includes(valor)
    ) {
      setCalculo(
        calculo.slice(0, calculo.length - posicao - 1) +
          valor +
          calculo.slice(calculo.length - posicao)
      );
    } else {
      setCalculo(
        calculo.slice(0, calculo.length - posicao) +
          (valor == 'log' ? valor + '(' : valor) +
          calculo.slice(calculo.length - posicao)
      );
    }
  }

  function coletatHistorico() {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from calculo`,
        [],
        (_, result: result) => {
          console.log(result.rows._array);
          setHistorico(result.rows._array);
        },
        (_, error) => {
          console.log('Erro ao selecionar:', error);
          return true;
        }
      );
    });
  }

  function mudarPosicao(valor: number) {
    if (valor >= 0 && valor <= calculo.length) {
      setPosicao(valor);
    }
  }

  return (
    <View style={styles.app}>
      {historicoAberto ? (
        <ModalHistorico
          funcaoRecuperar={(calculoAntigo: string) => {
            setCalculo(calculoAntigo);
            setHistoricoAberto(false);
          }}
          funcaoFechar={() => setHistoricoAberto(false)}
          historico={historico}
          funcaoCalcular={calcular}
          funcaoLimpar={limpar}
        />
      ) : (
        ''
      )}
      {
        valoresVariaveisAberto ? <ModalVariaveisValores 
          x={() => valorX}
          y={() => valorY}
          z={() => valorZ}
          funcaoFechar={()=> setValoresVariaveisAberto(false)}
          funcaoCeder={(variavel: string, novoValor: number)=> {
            if (variavel == "x") {
              setValorX(novoValor)
            }
            else if (variavel == "y") {
              setValorY(novoValor)
            }
            else {
              setValorZ(novoValor)
            }
          }
          }
        />
        : ''
      }

      <View style={styles.calculadora}>
        <View style={styles.visor}>
          <ScrollView style={{ height: 50 }}>
            <Text numberOfLines={1} style={{ fontSize: 25, color: '#fff' }}>
              {valores}
            </Text>
          </ScrollView>
          <Text
            style={{
              textAlign: 'right',
              width: '100%',
              color: styleVars.roxoClaro,
              fontSize: 25,
            }}>
            {calculado}
          </Text>
          <Text>x={valorX}, y={valorY}, z={valorZ}</Text>
        </View>
        <View style={styles.entrada}>
          <View style={styles.opcoes}>
            <Botao
              funcao={() => {
                setHistoricoAberto(true);
                coletatHistorico();
              }}
              styles={{ alignSelf: 'flex-end' }}
              texto="H"
            />
            <Botao
              funcao={() => {
                setValoresVariaveisAberto(true)
              }}
              styles={{ alignSelf: 'flex-end' }}
              texto="XYZ"
            />
            <Botao
              funcao={() => setExibirExtras(!exibirExtras)}
              styles={{ alignSelf: 'flex-end' }}
              texto="V"
            />
          </View>
          <View style={styles.opcoes}>
            <Botao funcao={adicionar} texto={exibirExtras ? 'x' : '1'} />
            <Botao funcao={adicionar} texto={exibirExtras ? 'y' : '2'} />
            <Botao funcao={adicionar} texto={exibirExtras ? 'z' : '3'} />
            <Botao
              funcao={adicionar}
              especial={true}
              texto={exibirExtras ? 'tan' : '+'}
            />
          </View>
          <View style={styles.opcoes}>
            <Botao funcao={adicionar} texto={exibirExtras ? '𝝅' : '4'} />
            <Botao funcao={adicionar} texto={'5'} />
            <Botao funcao={adicionar} texto={'6'} />
            <Botao
              funcao={adicionar}
              especial={true}
              texto={exibirExtras ? 'sen' : '-'}
            />
          </View>
          <View style={styles.opcoes}>
            <Botao funcao={adicionar} texto={'7'} />
            <Botao funcao={adicionar} texto={'8'} />
            <Botao funcao={adicionar} texto={'9'} />
            <Botao
              funcao={adicionar}
              especial={true}
              texto={exibirExtras ? 'cos' : 'X'}
            />
          </View>
          <View style={styles.opcoes}>
            <Botao funcao={adicionar} texto="0" />
            <Botao funcao={adicionar} texto="(" />

            <Botao funcao={adicionar} texto=")" />

            <Botao
              funcao={(char: string) =>
                setCalculo(
                  calculo.slice(0, calculo.length - posicao - 1) +
                    calculo.slice(calculo.length - posicao)
                )
              }
              especial={true}
              texto="del"
            />
          </View>
          <View style={styles.opcoes}>
            <Botao funcao={adicionar} texto="," />
            <Botao
              funcao={adicionar}
              especial={true}
              texto={exibirExtras ? 'log' : '/'}
            />
            <Botao
              funcao={adicionar}
              especial={true}
              texto={exibirExtras ? '√' : '^'}
            />
            <Botao
              funcao={(char: string) => {
                setCalculo('');
                setPosicao(0);
              }}
              especial={true}
              texto="cls"
            />
          </View>
          <View style={styles.opcoes}>
            <Botao
              funcao={(char: string) => mudarPosicao(posicao + 1)}
              especial={true}
              texto="<"
            />
            <Botao
              funcao={(char: string) => salvar()}
              especial={true}
              texto="="
            />
            <Botao
              funcao={(char: string) => mudarPosicao(posicao - 1)}
              especial={true}
              texto=">"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  entrada: {
    flex: 1,
  },
  visor: {
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 20,
    paddingBottom: 30,
    fontSize: 20,
    width: '100%',
    borderBottomWidth: 5,
    borderColor: styleVars.roxoEscuro,
    backgroundColor: styleVars.fundo3,
    paddingTop: 60,
  },
  app: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignContent: 'center',
    backgroundColor: styleVars.roxoMedio,
    position: 'relative',
  },
  calculadora: {
    flex: 1,
    width: '100%',
    flexGrow: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: styleVars.fundo,
    overflow: 'hidden',

    gap: 10,
  },
  opcoes: {
    flex: 2,
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    paddingHorizontal: 10,
    height: 70,
  },
});
