import Botao from "./Botao"
import { View, ScrollView, Text, StyleSheet, TextInput } from "react-native"
import styleVars from "../style/vars"
interface props {
  funcaoFechar: Function,
  funcaoCeder: Function,
  x: Function,
  y: Function,
  z: Function,
}
import modal from "../style/modal"

interface historico {
  id: number,
  calculo: string
}

export default function ModalVariaveisValores(props: props) {
  return (
    <View style={modal.modal}>
      <View style={styles.entradas}>
        <View style={styles.entrada}>
          <Text style={styles.variavel}>x</Text>
          <TextInput 
            defaultValue={String(props.x())} 
            style={styles.input} 
            keyboardType="numeric"
            onChangeText={(text) => {
              props.funcaoCeder("x", text == "" ? 0 : parseInt(text))}
              }
             />
        </View>
        <View style={styles.entrada}>
          <Text style={styles.variavel}>y</Text>
          <TextInput 
            defaultValue={String(props.y())} 
            style={styles.input} 
            keyboardType="numeric"
            onChangeText={(text) => {
              props.funcaoCeder("y", text == "" ? 0 : parseInt(text))}
              } />
        </View>
        <View style={styles.entrada}>
          <Text style={styles.variavel}>z</Text>
          <TextInput 
            defaultValue={String(props.z())} 
            style={styles.input} 
            keyboardType="numeric"
            onChangeText={(text) => {
              props.funcaoCeder("z", text == "" ? 0 : parseInt(text))}
              } />
        </View>
        
      </View>
      <Botao funcao={props.funcaoFechar} texto="fechar" styles={{ flex: 1, width: "100%", height: "20%", borderRadius: 0 }} />
    </View>
    )
}

const styles = StyleSheet.create({
  entradas: {
    flex: 1,
    height: "80%",
    flexGrow: 7,
    flexShrink: 0,
    flexBasis: 1,
    justifyContent: "flex-start",
    alignContent: "flex-start",
    alignItems: "flex-start"
  },
  entrada: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    height: 0
    
  },
  variavel: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    width: "20%",
    backgroundColor: styleVars.fundo3
  },
  input: {
    height:50,
    width: "80%",
    borderBottomColor: styleVars.roxoEscuro,
    borderBottomWidth: 5,
    borderTopColor: styleVars.roxoEscuro,
    borderTopWidth: 5,
    color: "#fff",
    fontSize: 20
  }
})