import { View, TextInput, Text, Button } from "react-native"
import { useState, useEffect } from "react"
import cores from "../../style/vars"

export default function EntradaTexto({ titulo, setValor, valorPadroa }: { titulo: string, setValor: (numero: string) => void, opcional?: boolean, valorPadroa?: string }) {
  const [texto, setTexto] = useState<string>(valorPadroa ?? "")

  useEffect(() => {
    if (texto) setValor(texto)
  }, [texto])

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
        value={texto}
        onChangeText={text => setTexto(text)}
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