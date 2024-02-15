import { useMemo } from "react"
import {Text, View, ScrollView, StyleSheet} from "react-native"
import styleVars from "../style/vars"

interface props {
  calculo: string,
  calculado: any,
  valorZ: number,
  valorY: number,
  valorX: number,
  posicao: number
}

export default function Visor({ calculo, calculado, valorX, valorY, valorZ, posicao }: props) {
   const valores = useMemo(() => {
    let comPosicao =
      calculo.slice(0, calculo.length - posicao) +
      '|' +
      calculo.slice(calculo.length - posicao);
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
        selectable={true} 
        
        style={{
          textAlign: 'right',
          width: '100%',
          color: styleVars.roxoClaro,
          fontSize: 25,
        }}>
        {calculado}
      </Text>
      <Text>x={valorX}, y={valorY}, z={valorZ}</Text>
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