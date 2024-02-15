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
import Visor from "./components/Visor"
import { Card } from 'react-native-paper';
import Botao from './components/Botao';
import styleVars from './style/vars';
import { save, deleteAll, selectAll, historicoInterface, remove } from "./models/DB"
import create from "./models/DB"
import ModalHistorico from './components/ModalHistorico';
import ModalVariaveisValores from "./components/ModalVariaveisValores"

export default function App() {
  create()
  const [valorX, setValorX] = useState(0);
  const [valorY, setValorY] = useState(0);
  const [valorZ, setValorZ] = useState(0);
  const [historicoAberto, setHistoricoAberto] = useState(false);
  const [valoresVariaveisAberto, setValoresVariaveisAberto] = useState(false);
  const [exibirExtras, setExibirExtras] = useState(false);
  const [posicao, setPosicao] = useState(0);
  const [calculo, setCalculo] = useState('');
  const [historico, setHistorico] = useState<historicoInterface[]>(Array());

  function fatorial(numero: number) {
    return Array.from({length: numero}, (_, i) => i + 1).reduce((acumulacao, atual) => acumulacao * atual)
  }

  function porcentagem(num1: number, num2: number) {
    return (num2 / 100) * num1
  }

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
          .replaceAll('φ', '1.618033988')
          .replaceAll('e', '2.718281828')
          .replaceAll('β*', '0.70258')
          .replaceAll('δ', '4.66920')
          .replaceAll('L', '0.110001000')
          .replaceAll('μ', '1.451369234')
          .replaceAll('X', '*')
          .replaceAll('^', '**')
          .replaceAll(',', '.')
          .replaceAll('a', String(valorX))
          .replaceAll('b', String(valorY))
          .replaceAll('c', String(valorZ));
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
        for (const fatorialNumero of calculoTemporario.matchAll(/(([0-9]+(\.[0-9]+)?)?(\(.*\))?)!/g)) {
          console.log(fatorialNumero)
          console.log("fatorial:" + eval(fatorialNumero[2]))
          calculoTemporario = calculoTemporario.replace(
            fatorialNumero[0],
            `${fatorial(eval(fatorialNumero[0].startsWith("(") ? fatorialNumero[4] : fatorialNumero[2]) as number)}`
          )
        }
        for (const porcentagemMatch of calculoTemporario.matchAll(/([0-9]+(\.[0-9]+)?)%([0-9]+(\.[0-9]+)?)/g)) {
          console.log(porcentagemMatch)
          calculoTemporario = calculoTemporario.replace(
            porcentagemMatch[0],
            `${porcentagem(eval(porcentagemMatch[1]), eval(porcentagemMatch[3]))}`
          )
        }
        console.log(calculoTemporario)
        return String(eval(calculoTemporario)).replace('.', ',');
      } catch {
        return 'calculo invalído';
      }
    }
  }

  function salvar() {
    console.log(calculo, calcular)
    save(calculo, calcular(), valorX, valorY, valorZ)
    setCalculo(calcular)
  }

  function remover(id: number) {
    remove(id)
    selectAll(setHistorico)
  }
  function limpar() {
    deleteAll()
    setHistoricoAberto(false)
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

  function coletarHistorico() {
    selectAll(setHistorico)
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
          funcaoRecuperar={(calculoAntigo: string, aAntigo: number, bAntigo: number, cAntigo: number) => {
            setCalculo(calculoAntigo);
            setValorX(aAntigo)
            setValorY(bAntigo)
            setValorZ(cAntigo)
            setHistoricoAberto(false);
          }}
          funcaoFechar={() => setHistoricoAberto(false)}
          historico={historico}
          funcaoCalcular={calcular}
          funcaoLimpar={limpar}
          funcaoRemover={remover}
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
        <Visor calculado={calculado} valorX={valorX} valorY={valorY} valorZ={valorZ} calculo={calculo} posicao={posicao} />
        <View style={styles.entrada}>
          <View style={styles.opcoes}>
            <Botao
              funcao={() => {
                setHistoricoAberto(true);
                coletarHistorico();
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
            <Botao funcao={adicionar} texto={exibirExtras ? 'a' : '1'} />
            <Botao funcao={adicionar} texto={exibirExtras ? 'b' : '2'} />
            <Botao funcao={adicionar} texto={exibirExtras ? 'c' : '3'} />
            <Botao
              funcao={adicionar}
              especial={true}
              texto={exibirExtras ? 'tan' : '+'}
            />
          </View>
          <View style={styles.opcoes}>
            <Botao funcao={adicionar} texto={exibirExtras ? '𝝅' : '4'} />
            <Botao funcao={adicionar} texto={exibirExtras ? 'e' :'5'} />
            <Botao funcao={adicionar} texto={exibirExtras ? 'φ' :'6'} />
            <Botao
              funcao={adicionar}
              especial={true}
              texto={exibirExtras ? 'sen' : '-'}
            />
          </View>
          <View style={styles.opcoes}>
            <Botao funcao={adicionar} texto={exibirExtras ? 'β*' :'7'} />
            <Botao funcao={adicionar} texto={exibirExtras ? 'δ' : '8'} />
            <Botao funcao={adicionar} texto={exibirExtras ? 'L' : '9'} />
            <Botao
              funcao={adicionar}
              especial={true}
              texto={exibirExtras ? 'cos' : 'X'}
            />
          </View>
          <View style={styles.opcoes}>
            <Botao funcao={adicionar} texto={exibirExtras ? 'μ' :"0"} />
            <Botao 
              funcao={adicionar} 
              texto={exibirExtras ? "%" : "("} 
              especial={exibirExtras}
            />


            <Botao 
              funcao={adicionar} 
              especial={exibirExtras}
              texto={exibirExtras ? "!" : ")"} 
            />

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
