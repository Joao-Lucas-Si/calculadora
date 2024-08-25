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
import create, { Variavel, Historico } from "./models/DB"
import FormulaCustomizada from "./components/modals/FormulaCustomizada"
import * as HistoricoService from "./models/calculo"
import ModalHistorico from './components/modals/ModalHistorico';
import { UnidadeDados } from "./services/conversao/Types"
import ModalVariaveisValores from "./components/modals/ModalVariaveisValores"
import ModalVariaveis from "./components/modals/ModalVariaveis"
import Teclado from "./components/Teclado"

export default function App() {
  const [unidadeAtual, setUnidadeAtual] = useState<Record<"base"|"transformar", UnidadeDados>|undefined>()
  const [mostrarConversao, setMostrarConversao] = useState(false)
  const [conversor, setConversor] = useState<((base: number) => number)|undefined>(undefined)
  const [mostrarFormulaCustomizada, setMostrarFormulaCustomizada] = useState(false)
  const [mostrarVariaveis, setMostrarVariaveis] = useState(false)
  const [mostrarFormulas, setMostrarFormulas] = useState(false)
  const [variaveis, setVariaveis] = useState<Record<string, number|number[]>>({})
  const [historicoAberto, setHistoricoAberto] = useState(false);
  const [valoresVariaveisAberto, setValoresVariaveisAberto] = useState(false);
  const [posicao, setPosicao] = useState(0);
  const [calculo, setCalculo] = useState<string[]>([]);

  useEffect(() => {
    create()
  }, [])

  function limpar() {
    setCalculo([]);
    setPosicao(0);
  }

  function deletar() {
    setCalculo(
      [...calculo.slice(0, calculo.length - posicao - 1),
      ...calculo.slice(calculo.length - posicao)
      ]
    )
  }

  const constantes = myMath.constantes
  
  function porcentagem(num1: number, num2: number) {
    return (num2 / 100) * num1
  }

  const calculado = useMemo(calcular, [calculo, calcular]);

  function calcular(calculoPametro: string[] = calculo, variaveisParametro = variaveis): string {
      try {
        let calculoTemporarioArray = calculoPametro;
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
          ...Object.entries(variaveisParametro).sort(([var1], [var2]) => var1.length - var2.length).reverse().map(([nome, valor]) => [nome, valor instanceof  Array ? String(valor.join(",")) : String(valor)])
        ] as const
        
        calculoTemporarioArray = calculoTemporarioArray.map(caractere => {
          const mudanca = mudar.find(mudar => mudar[0] === caractere)

          return mudanca ? mudanca[1] : caractere
        })

        let calculoTemporario = calculoTemporarioArray.join("")

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
          transformar: (direita) => `Math.sin(${direita})`
        })

        executarFuncoes({
          nome: "cos",
          bilateral: false, 
          transformar: (direita) => `Math.cos(${direita})`
        })

        executarFuncoes({
          nome: "tan",
          bilateral: false, 
          transformar: (direita) => `Math.tan(${direita})`
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
          const len = (...numeros) => numeros.length;
        `
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
    HistoricoService.salvar({
      id: 0,
      calculo: calculo.join("|"),
      resultado: calcular(calculo),
      variaveis: Object.entries(variaveis).map<Variavel>(([nome, valor]) => valor instanceof Array ?
        {
          tipo: "lista",
          nome,
          id: 0,
          valores: valor
        }
      : {
          tipo: "normal",
          id: 0,
          nome,
          valor
        }
      )
    })
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
        calcular={calcular}
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
      <FormulaCustomizada 
        setVisivel={setMostrarFormulaCustomizada}
        visivel={mostrarFormulaCustomizada}
        calculo={calculo}
        variaveis={variaveis}
      />
      <ModalHistorico
        visivel={historicoAberto}
        funcaoRecuperar={(calculoAntigo, variaveis) => {
          setCalculo(calculoAntigo.split("|"));
          setVariaveis(variaveis)
          setHistoricoAberto(false);
        }}
        funcaoFechar={() => setHistoricoAberto(false)}
        funcaoCalcular={calcular}
      />
      <ModalVariaveisValores 
          visivel={valoresVariaveisAberto}
          setVariaveis={setVariaveis}
          variaveis={variaveis}
          funcaoFechar={()=> setValoresVariaveisAberto(false)}
        />

      <View style={styles.calculadora}>
        <Visor 
          calculado={calculado} 
          variaveis={variaveis}
          calculo={calculo} 
          posicao={posicao} 
          unidadeBase={unidadeAtual?.base}
          unidadeTransformar={unidadeAtual?.transformar}
        />
        <Teclado 
          adicionar={adicionar}
          deletar={deletar}
          limpar={limpar}
          salvar={salvar}
          setMostrarVariaveis={setMostrarVariaveis}
          mudarPosicao={mudarPosicao}
          posicao={posicao}
          setHistoricoAberto={setHistoricoAberto}
          setMostrarConversao={setMostrarConversao}
          setMostrarFormulaCustomizada={setMostrarFormulaCustomizada}
          setMostrarFormulas={setMostrarFormulas}
          setValoresVariaveisAberto={setValoresVariaveisAberto}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  
  
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
});
