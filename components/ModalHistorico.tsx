import Botao from "./Botao"
import { View, ScrollView, Text, StyleSheet } from "react-native"
import styleVars from "../style/vars"
import modal from "../style/modal"
interface props {
  historico: Array<historico>,
  funcaoFechar: Function,
  funcaoRecuperar: Function,
  funcaoCalcular: Function,
  funcaoLimpar: Function
}

interface historico {
  id: number,
  calculo: string
}

export default function ModalHistorico(props: props) {
  return (
    <View style={modal.modal}>
          <ScrollView style={{ height: "80%", width: "100%", flex: 1, flexGrow: 8 }}>
            {
              props.historico.map(historico => (
                <View style={styles.historico}>
                  <Text 
                    onPress={() => props.funcaoRecuperar(historico.calculo)} 
                    style={styles.calculo}
                  >
                    {historico.calculo}
                  </Text>
                  <Text style={styles.calculado}>{props.funcaoCalcular(historico.calculo)}</Text>
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
  calculo: {
    color: "#fff",
    fontSize: 22,
  },
  calculado: {
    alignSelf: "flex-end",
    color: styleVars.roxoClaro,
    fontSize: 18,
  }
})