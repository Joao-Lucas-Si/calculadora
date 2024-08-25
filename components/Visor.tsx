import { useMemo } from "react"
import {Text, View, ScrollView, StyleSheet} from "react-native"
import { UnidadeDados } from "../services/conversao/Types"
import styleVars from "../style/vars"
import VisualizadorVariaveis from "./VisualizadorVariaveis"

interface props {
  unidadeBase: UnidadeDados|undefined,
  unidadeTransformar: UnidadeDados|undefined
  calculo: (string|string[])[],
  calculado: any,
  variaveis: Record<string, number|number[]>
  posicao: number
}

export default function Visor({ calculo, unidadeBase, unidadeTransformar, calculado, variaveis, posicao }: props) {
   const valores = useMemo(() => {
    let comPosicao =
      calculo.slice(0, calculo.length - posicao).join("") +
      '|' +
      calculo.slice(calculo.length - posicao).join("");
    return comPosicao
      .replaceAll('+', ' + ')
      .replaceAll('-', ' - ')
      .replaceAll('X', ' X ')
      .replaceAll('/', ' / ')
      .replaceAll("%", " % ")
      .replaceAll('^', ' ^ ');
  }, [calculo, posicao]);
  return (
    <View style={styles.visor}>
      <ScrollView style={{ height: 50}} horizontal={true}>
        <Text selectable={true} numberOfLines={1} style={{ fontSize: 25, color: '#fff', width: "100%", height: 50 }}>
          {valores}
        </Text>
      </ScrollView>
      <Text
        style={{
          textAlign: "left",
          fontSize: 10,
          color: "#fff"
        }}
      >{unidadeBase?.unidade ?? ""}</Text>
      <Text 
        selectable={true} 
        
        style={{
          textAlign: 'right',
          width: '100%',
          color: styleVars.roxoClaro,
          fontSize: 25,
        }}>
        {calculado == "undefined" ? "" : calculado}
      </Text>
      <Text
        style={{
          textAlign: "right",
          fontSize: 10,
          color: styleVars.roxoClaro
        }}
      >{unidadeTransformar?.unidade ?? ""}</Text>
      <VisualizadorVariaveis variaveis={variaveis} />
    </View>
  )
}

const styles = StyleSheet.create({
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
})