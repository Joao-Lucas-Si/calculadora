import { Text, View ,SafeAreaView, StyleSheet, Pressable } from 'react-native';

import styleVars from "../style/vars"

interface props {
  texto: string,
  funcao: Function,
  especial?: boolean,
  styles?: object

}

export default function Botao(props: props) {
  return (
    <Pressable onPress={() => props.funcao(props.texto)} style={[ styles.botao, (props.especial == true) ? styles.especial: {}, props.styles,]}>
      <Text style={styles.texto}>{props.texto}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  especial: {
    backgroundColor: styleVars.roxoClaro   
  },
  botao: {
    width: '20%',
    height: 70,
    backgroundColor: styleVars.roxoMedio,
    borderRadius: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    height: "100%",
    textAlign: 'center',
    fontSize: 40,
    fontWeight: '600',
    color: "#fff"
  }
});
