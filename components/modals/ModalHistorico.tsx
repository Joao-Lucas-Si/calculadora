import Botao from "../Botao"
import { View, ScrollView, Text, StyleSheet, Button, Pressable } from "react-native"
import styleVars from "../../style/vars"
import { useState, useEffect } from "react"
import modal from "../../style/modal"
import { Historico, Variavel } from "../../models/DB"
import * as HistoricoService from "../../models/calculo"
import ModalBase from "./ModalBase"
import VisualizadorVariaveis from "../VisualizadorVariaveis"
interface props {
  visivel: boolean,
  funcaoFechar: Function,
  funcaoRecuperar: (calculo: string, variaveis: Record<string, number|number[]>) => void,
  funcaoCalcular: Function,
}

export default function ModalHistorico(props: props) {
  const [historicos, setHistoricos] = useState<Historico[]>([])

  useEffect(() => {
    if (props.visivel) HistoricoService.coletarTodos(setHistoricos)
  }, [props.visivel])

  function remover(id: number) {
    HistoricoService.deletar(id)
    HistoricoService.coletarTodos(setHistoricos)
  }

  function limpar() {
    HistoricoService.deletarTodos()
    HistoricoService.coletarTodos(setHistoricos)
  } 

  function converterVariaveis(variavelLinhas: Variavel[]) {
    const variaveis: Record<string, number|number[]> = {}

    variavelLinhas.forEach(variavel => {
      variaveis[variavel.nome] = variavel.tipo === "lista" ? variavel.valores : variavel.valor
    })

    return variaveis
  }

  return (
    <ModalBase
      visivel={props.visivel}
    >
      <ScrollView style={{ height: "80%", width: "100%", flex: 1, flexGrow: 8 }}>
        {
          historicos.map(historico => (
            <View key={historico.id} style={styles.historico}>
              <Text 
                onPress={() => props.funcaoRecuperar(historico.calculo, converterVariaveis(historico.variaveis))} 
                style={styles.calculo}
              >
                {historico.calculo.replaceAll("|", "")}
              </Text>
              <Text style={styles.calculado}>{historico.resultado}</Text>
              <VisualizadorVariaveis variaveis={converterVariaveis(historico.variaveis)} />
              <Botao
                funcao={() => remover(historico.id)}
                texto="X"
                fontSize={20}
                normal={false}
                styles={styles.remover}
              />
            </View>
            )
        )}
      </ScrollView>
      <View style={{ flex: 1, flexDirection: "row",width: "100%", height: "0%", backgroundColor: styleVars.roxoEscuro, gap: 5 }}>
        <Botao funcao={limpar} texto="limpar" styles={{ flex: 1, width: "50%", height: "100%", borderRadius: 0  }} />
        <Botao funcao={props.funcaoFechar} texto="fechar" styles={{ flex: 1, width: "50%", height: "100%", borderRadius: 0 }} />
      </View>
    </ModalBase>
  )
}

const styles = StyleSheet.create({
  historico: {
    width: "100%",
    borderBottomColor: styleVars.roxoEscuro,
    borderBottomWidth: 5,
    paddingHorizontal: 20,
    paddingVertical: 30,
    flex: 1,

  },
  remover: {
    backgroundColor: "#f00",
    borderRadius: 10,
    marginTop: 10,
    flex: 1,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  calculo: {
    color: "#fff",
    fontSize: 25,
  },
  calculado: {
    alignSelf: "flex-end",
    color: styleVars.roxoClaro,
    fontSize: 20,
  }, 
  variaveis: {
    fontSize: 18
  }
})