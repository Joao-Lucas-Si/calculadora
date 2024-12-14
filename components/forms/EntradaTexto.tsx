import { View, TextInput, Text, Button } from "react-native"
import { useState, useEffect } from "react"
import cores from "../../style/vars"

export default function EntradaTexto({ titulo, setValor, valorPadroa }: { titulo: string, setValor: (numero: string) => void, opcional?: boolean, valorPadroa?: string }) {
  const [texto, setTexto] = useState<string>(valorPadroa ?? "")

  useEffect(() => {
    if (texto) setValor(texto)
  }, [texto])

  return <View style={{ flex: 1 }}>
      <Text
        style={{
          color: "#ffffff"
        }}
      >{titulo}</Text>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        width: "100%"
      }}
    >
      <TextInput 
        value={texto}
        onChangeText={text => setTexto(text)}
        style={{
          backgroundColor: "#ffffff",
          padding: 5,
          width: "100%"
        }}
      />
    </View>
  </View>
}