import Botao from "./Botao"
import { View, ScrollView, Text, StyleSheet, Button, Pressable } from "react-native"
import styleVars from "../style/vars"
import modal from "../style/modal"
import { historicoInterface } from "../models/DB"
interface props {
  historico: Array<historicoInterface>,
  funcaoFechar: Function,
  funcaoRecuperar: Function,
  funcaoCalcular: Function,
  funcaoLimpar: Function
  funcaoRemover: (id: number) => void
}

export default function ModalHistorico(props: props) {
  return (
    <View style={modal.modal}>
          <ScrollView style={{ height: "80%", width: "100%", flex: 1, flexGrow: 8 }}>
            {
              props.historico.map(historico => (
                <View style={styles.historico}>
                  <Text 
                    onPress={() => props.funcaoRecuperar(historico.calculo, historico.a, historico.b, historico.c)} 
                    style={styles.calculo}
                  >
                    {historico.calculo}
                  </Text>
                  <Text style={styles.calculado}>{historico.resultado}</Text>
                  <Text style={styles.variaveis}>a={historico.a}, b={historico.b}, c={historico.c}</Text>
                  <Botao
                    funcao={() => props.funcaoRemover(historico.id)}
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
            <Botao funcao={props.funcaoLimpar} texto="limpar" styles={{ flex: 1, width: "50%", height: "100%", borderRadius: 0  }} />
            <Botao funcao={props.funcaoFechar} texto="fechar" styles={{ flex: 1, width: "50%", height: "100%", borderRadius: 0 }} />
          </View>
        </View>
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