import { View, TextInput, Text, Button } from "react-native"
import { useState, useEffect } from "react"
import cores from "../../style/vars"

export default function EntradaNumero({ titulo, setValor, opcional, valorPadroa }: { titulo: string, setValor: (numero: number|undefined) => void, opcional?: boolean, valorPadroa?: number }) {
  const [numero, setNumero] = useState<number|undefined>(valorPadroa)
  const [numeroString, setNumeroString] = useState(valorPadroa ? String(valorPadroa) : "")

  useEffect(() => {
    if (opcional && numero === undefined) setValor(undefined)
    else if (numero) setValor(numero)
  }, [numero, opcional])

  return <View>
      <Text
        style={{
          color: "#ffffff"
        }}
      >{titulo}</Text>
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "center"
      }}
    >
      <TextInput 
        value={numeroString}
        onBlur={() => setNumero(parseFloat(numeroString))}
        onChangeText={text => setNumeroString(text)}
        keyboardType="numeric"  
        style={{
          backgroundColor: "#ffffff",
          padding: 5,
          width: 200
        }}
      />
    </View>
  </View>
}