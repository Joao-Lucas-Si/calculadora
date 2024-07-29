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
import ModalForm from "./components/modals/ModalForm"
import ModalConversao from "./components/modals/ModalConversao"
import Visor from "./components/Visor"
import myMath from "./services/myMath"
import { Card } from 'react-native-paper';
import Botao from './components/Botao';
import styleVars from './style/vars';
import { save, deleteAll, selectAll, historicoInterface, remove } from "./models/DB"
// import create from "./models/DB"
// import ModalHistorico from './components/ModalHistorico';
import { UnidadeDados } from "./services/conversao/Types"
import ModalVariaveisValores from "./components/ModalVariaveisValores"
import ModalVariaveis from "./components/modals/ModalVariaveis"

export default function App() {
  // create()
  const [unidadeAtual, setUnidadeAtual] = useState<Record<"base"|"transformar", UnidadeDados>|undefined>()
  const [mostrarConversao, setMostrarConversao] = useState(false)
  const [conversor, setConversor] = useState<((base: number) => number)|undefined>(undefined)
  const [mostrarVariaveis, setMostrarVariaveis] = useState(false)
  const [mostrarFormulas, setMostrarFormulas] = useState(false)
  const [variaveis, setVariaveis] = useState<Record<string, number|number[]>>({})
  const [historicoAberto, setHistoricoAberto] = useState(false);
  const [valoresVariaveisAberto, setValoresVariaveisAberto] = useState(false);
  const [exibirExtras, setExibirExtras] = useState(false);
  const [posicao, setPosicao] = useState(0);
  const [calculo, setCalculo] = useState<(string|string[])[]>([]);
  const [historico, setHistorico] = useState<historicoInterface[]>(Array());

  const constantes = {
    pi: "𝝅",
    aurea: "φ",
    beta: 'β*',
    //dirac: "δ",
    vacuo: "μ",
    gases: "L",
    euler: "e"
  }

  const botoes: [string, (string|[string]), (boolean|[boolean, boolean])?, ((char: string) => void)?][][] = [
    [
      ["1", "val", false, char => char === "val" ? setMostrarVariaveis(true) : adicionar(char)],
      ["2", ["som"]],
      ["3", ["mul"]],
      ["+", "tan", true],
    ],
    [
      ["4", ["med"]],
      ["5", ["len"]],
      ["6", [constantes.pi]],
      ["-", ["sen"], true],
    ],
    [
      ["7", [constantes.beta]],
      ["8", [constantes.aurea]],
      ["9", [constantes.gases]],
      ["X", ["cons"], true],
    ],
    [
      ["0", constantes.vacuo],
      ["(", "%", [false, true]],
      [")", "!", [false, true]],
      [
        "del", 
        "del", 
        true, 
        (char: string) =>
          setCalculo(
            [...calculo.slice(0, calculo.length - posicao - 1),
            ...calculo.slice(calculo.length - posicao)
            ]
          )
      ]
    ],
    [
      [".", ","],
      ["/", "log", true],
      ["^", "√", true],
      [
        "cls", 
        "cls", 
        true,
        (char: string) => {
          setCalculo([]);
          setPosicao(0);
        }
      ]
    ],
  ]

  // function fatorial(numero: number) {
  //   return Array.from({length: numero}, (_, i) => i + 1).reduce((acumulacao, atual) => acumulacao * atual)
  // }


  const constanteEspacosas = Object.values(constantes).filter(constante => constante.length > 1)

  function porcentagem(num1: number, num2: number) {
    return (num2 / 100) * num1
  }

  const calculado = useMemo(calcular, [calculo, calcular]);

  function calcular(calculoPametro: (string|string[])[] = calculo): string {
    "use strin"
      try {
        let calculoTemporario = calculoPametro.flat().join("");
        const mudar = [
          [constantes.pi, '3.141592653'],
          [constantes.aurea, '1.618033988'],
          // [constantes.euler, '2.718281828'],
          [constantes.beta, '0.70258'],
          [constantes.gases, '0.110001000'],
          [constantes.vacuo, '1.451369234'],
          ['X', '*'],
          ['^', '**'],
          // [',', '.'],
          ...Object.entries(variaveis).sort(([var1], [var2]) => var1.length - var2.length).reverse().map(([nome, valor]) => [nome, valor instanceof  Array ? String(valor.join(",")) : String(valor)])
        ] as const
        
        mudar.forEach(caracteres => 
          calculoTemporario = calculoTemporario.replaceAll(
            caracteres[0], 
            caracteres[1]
          )
        )

        const executarCalculosEspeciais = (
          regex: RegExp, 
          resultado: (match: RegExpMatchArray) => string
        ) => {
          for (const match of calculoTemporario.matchAll(
            regex
          )) {
            calculoTemporario = calculoTemporario.replace(
              match[0],
              resultado(match)
            );
          }
        }

        const executarCalculoSinal = (char: string, mudar: (match: RegExpMatchArray) => string, bilateral = false) => {
          const regex = new RegExp(`([0-9]+(\\.[0-9]+)?)?(\\(.+\\))?${char}${bilateral ? "([0-9]+(\\.[0-9]+)?)" : ""}`, "g")
          executarCalculosEspeciais(
            regex,
            mudar
          )
        }

        const executarFuncoes = ({nome, bilateral, transformar} : {nome: string, bilateral?: boolean, transformar: (direita: string, esquerda: string) => string }) => {
          // ([0-9\.]*)?(\(.*?\))?log([0-9\.]*)?(\(.+?\))?
          const regex = new RegExp(`${bilateral ? "\\(([\.,]*?)\\)" : ""}${nome}\\((.+?)\\)`, "g")          
          executarCalculosEspeciais(
            regex,
            match => {
              const direitaIndividual = match[bilateral ? 4 : 1]
              const direitaGrupo = match[bilateral ? 3 : 2]
              const esquerdaIndividual = match[1]
              const esquerdaGrupo = match[2]
              const esquerda = esquerdaIndividual ?? esquerdaGrupo
              const direita = direitaGrupo ?? direitaIndividual

              return transformar(direita, esquerda)
            } 
          )
        }

        executarFuncoes({ 
          nome: "som", 
          transformar: (direita) => `som(${direita})`
        })
        executarFuncoes({ 
          nome: "len", 
          transformar: (direita) => `len(${direita})`
        })
        executarFuncoes({
          nome: "mul", 
          transformar: (direita) => `mul(${direita})`
        })
        executarFuncoes({
          nome: "med", 
          transformar: (direita) => `med(${direita})`
        })
        executarFuncoes({
          nome: "len",
          transformar: (direita) => `len(${direita})`
        })

        executarFuncoes({
          nome: "log",
          bilateral: true, 
          transformar: (direita, esquerda) => `Math.log(${direita}) ${
            esquerda
              ? `/ Math.log(${esquerda})`
              : ""
          }`
        })
        executarFuncoes({
          nome: "log",
          bilateral: true, 
          transformar: (direita, esquerda) => `Math.log(${direita}) ${
            esquerda
              ? `/ Math.log(${esquerda})`
              : ""
          }`
        })
          
        executarCalculoSinal(
          "√",
          match => `Math.sqrt(${
              match[2]
                ? match[2].replace(/^\(/g, '').replace(/\)$/g, '')
                : match[1]
            })`
        )

        executarFuncoes({
          nome: "sen",
          bilateral: false, 
          transformar: (direita, esquerda) => `Math.sin(${direita})`
        })

        executarFuncoes({
          nome: "cos",
          bilateral: false, 
          transformar: (direita, esquerda) => `Math.cos(${direita})`
        })

        executarFuncoes({
          nome: "tan",
          bilateral: false, 
          transformar: (direita, esquerda) => `Math.tan(${direita})`
        })

        executarCalculoSinal("!", (match) => {
          console.log(match)
          return `${myMath.fatorial(
            eval(match[0].startsWith("(") ? match[3] : match[1]) as number
          )}`
        })

        executarCalculoSinal("%", match =>  `${porcentagem(eval(match[1]), eval(match[3]))}`, true)

        const evalMath = `
        const som = (...numeros) =>  numeros.reduce((acumulacao, num) => acumulacao + num, 0);
  const mul = (...numeros) =>numeros.reduce((acumulacao, num) => acumulacao * num, 1);
  const med = (...numeros) => numeros.reduce((acumulacao, num) => acumulacao + num, 0) / numeros.length;
  const len = (...numeros) => numeros.length;`
        const resultado = eval(evalMath + calculoTemporario)
        if (resultado == parseInt("aaa")) return 'calculo invalído'
        if (String(resultado).startsWith("function")) return 'calculo invalído'
        return String(conversor 
          ? conversor(resultado)
          : eval(resultado)
        );
      } 
      catch {
        return 'calculo invalído';
      }
  }

  function salvar() {
    //save(calculo, calcular(), valorX, valorY, valorZ)
    setCalculo(calcular(calculo).split(""))
  }

  // function remover(id: number) {
  //   remove(id)
  //   selectAll(setHistorico)
  // }
  // function limpar() {
  //   deleteAll()
  //   setHistoricoAberto(false)
  // }

  function adicionar(valor: string): void {
      setCalculo(
        [...calculo.slice(0, calculo.length - posicao),
        valor,
        ...calculo.slice(calculo.length - posicao)
        ]
      );
  }

  // function coletarHistorico() {
  //   selectAll(setHistorico)
  // }

  function mudarPosicao(valor: number) {
    if (valor >= 0 && valor <= calculo.length) {
      setPosicao(valor);
    }
  }

  return (
    <View style={styles.app}>
      <ModalForm 
        visivel={mostrarFormulas}
        setVisivel={setMostrarFormulas}
      />
      <ModalConversao 
        visivel={mostrarConversao}
        setVisivel={setMostrarConversao}
        setConversor={setConversor}
        setUnidades={setUnidadeAtual}
      />
      <ModalVariaveis
        variaveis={variaveis}
        setVisivel={setMostrarVariaveis}
        visivel={mostrarVariaveis}
        adicionar={adicionar}
      />
      {
      //   historicoAberto ? (
      //     <ModalHistorico
      //       funcaoRecuperar={(calculoAntigo: string, aAntigo: number, bAntigo: number, cAntigo: number) => {
      //         setCalculo(calculoAntigo);
      //         setValorX(aAntigo)
      //         setValorY(bAntigo)
      //         setValorZ(cAntigo)
      //         setHistoricoAberto(false);
      //       }}
      //       funcaoFechar={() => setHistoricoAberto(false)}
      //       historico={historico}
      //       funcaoCalcular={calcular}
      //       funcaoLimpar={limpar}
      //       funcaoRemover={remover}
      //     />
      //   ) : (
      //     ''
      //   )
      }
      {
        valoresVariaveisAberto ? <ModalVariaveisValores 
          setVariaveis={setVariaveis}
          variaveis={variaveis}
          funcaoFechar={()=> setValoresVariaveisAberto(false)}
        />
        : ''
      }

      <View style={styles.calculadora}>
        <Visor 
          calculado={calculado} 
          variaveis={variaveis}
          calculo={calculo} 
          posicao={posicao} 
          unidadeBase={unidadeAtual?.base}
          unidadeTransformar={unidadeAtual?.transformar}
        />
        <View style={styles.entrada}>
          <View style={styles.opcoes}>
            <Botao
              funcao={() => {
                setHistoricoAberto(true);
                //coletarHistorico();
              }}
              styles={{ alignSelf: 'flex-end' }}
              texto="H"
            />
            <Botao
              funcao={() => {
                setValoresVariaveisAberto(true)
              }}
              styles={{ alignSelf: 'flex-end' }}
              texto="Z"
            />
            <Botao
              funcao={() => setExibirExtras(!exibirExtras)}
              styles={{ alignSelf: 'flex-end' }}
              texto="V"
            />
            <Botao
              funcao={() => setMostrarFormulas(true)}
              styles={{ alignSelf: 'flex-end' }}
              texto="F"
            />
            <Botao
              funcao={() => setMostrarConversao(true)}
              styles={{ alignSelf: 'flex-end' }}
              texto="C"
            />
          </View>
          {
            botoes.map(conjunto => <View style={styles.opcoes}>
            {
              conjunto.map(botao => <Botao
                key={botao[0]}
                funcao={botao[3] ? botao[3] : adicionar}
                especial={botao[2] instanceof Array ? botao[2][exibirExtras ? 1 : 0] : botao[2]}
                texto={exibirExtras ? (botao[1] instanceof Array ? botao[1][0] : botao[1] ) : botao[0]}
              />
            )}
            </View>)
          }
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
