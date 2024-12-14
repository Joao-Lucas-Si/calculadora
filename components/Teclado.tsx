import { View, StyleSheet } from "react-native"
import Botao from "./Botao"
import { useState } from "react"
import myMath from '../services/myMath'

export default function Teclado({ 
  setMostrarVariaveis, 
  adicionar, 
  limpar,
  deletar,
  salvar,
  setMostrarFormulaCustomizada,
  setHistoricoAberto,
  setValoresVariaveisAberto,
  setMostrarFormulas,
  posicao,
  setMostrarConversao,
  mudarPosicao
}:{ 
  adicionar: (char: string) => void, 
  mudarPosicao: (posicao: number) => void,
  posicao: number
} 
  & Record<"limpar"|"deletar"|"salvar", () => void>
  & Record<"setMostrarFormulas"|"setMostrarConversao"|"setMostrarVariaveis"|"setValoresVariaveisAberto"|"setMostrarFormulaCustomizada"|"setHistoricoAberto", (mostrar: boolean) => void>) {
  const [exibirExtras, setExibirExtras] = useState(false);
  const constantes = myMath.constantes
  const botoes: [string, (string|[string, string]), (boolean|[boolean, boolean])?, ((char: string) => void)?][][] = [
    [
      ["1", "val", false, char => char === "val" ? setMostrarVariaveis(true) : adicionar(char)],
      ["2", ["som", "som("]],
      ["3", ["mul", "mul("]],
      ["+", ["tan", "tan("], true],
    ],
    [
      ["4", ["med", "med("]],
      ["5", ["len", "len("]],
      ["6", "for", false, char => char === "for" ? setMostrarFormulaCustomizada(true) : adicionar(char)],
      ["-", ["sen", "sen("], true],
    ],
    [
      ["7", constantes.pi],
      ["8", constantes.aurea],
      ["9", constantes.gases],
      ["X", ["cos", "cos("], true],
    ],
    [
      ["0", constantes.vacuo],
      ["(", "%", [false, true]],
      [")", "!", [false, true]],
      [
        "del", 
        "del", 
        true, 
        deletar
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
        limpar
      ]
    ],
  ]

  return (
    <View style={styles.entrada}>
      <View style={styles.opcoes}>
        <Botao
          funcao={() => {
            setHistoricoAberto(true);
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
        botoes.map(conjunto => <View key={conjunto[0][0]} style={styles.opcoes}>
        {
          conjunto.map(botao => <Botao
            key={botao[0]}
            funcao={botao[3] ? botao[3] : () => adicionar(exibirExtras ? (botao[1] instanceof Array ? botao[1][1] : botao[1] ) : botao[0])}
            especial={botao[2] instanceof Array ? botao[2][exibirExtras ? 1 : 0] : botao[2]}
            texto={exibirExtras ? (botao[1] instanceof Array ? botao[1][0] : botao[1] ) : botao[0]}
          />
        )}
        </View>)
      }
      <View style={styles.opcoes}>
        <Botao
          funcao={() => mudarPosicao(posicao + 1)}
          especial={true}
          texto="<"
        />
        <Botao
          funcao={() => salvar()}
          especial={true}
          texto="="
        />
        <Botao
          funcao={() => mudarPosicao(posicao - 1)}
          especial={true}
          texto=">"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
   entrada: {
    flex: 1,
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
})