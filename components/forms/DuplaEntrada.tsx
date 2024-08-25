import { View, TextInput, Text, Button } from "react-native"
import { useState, useEffect } from "react"
import cores from "../../style/vars"

export default function DuplaNumero({ titulo, setValor, opcional, valorPadroa }: { titulo: string, setValor: (numero: [number, number]|undefined) => void, opcional?: boolean, valorPadroa?: [number, number] }) {
  const [numero, setNumero] = useState<[number, number]|undefined>(valorPadroa)
  const [numeroString, setNumeroString] = useState(valorPadroa ? valorPadroa.map(valor => String(valor)) : ["", ""])

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
        value={numeroString[0]}
        onBlur={() => setNumero([parseFloat(numeroString[0]), numero ? numero[1] : 0])}
        onChangeText={text => setNumeroString([text, numeroString[1]])}
        keyboardType="numeric"  
        style={{
          backgroundColor: "#ffffff",
          padding: 5,
          width: 200
        }}
      />
      <TextInput 
        value={numeroString[1]}
        onBlur={() => setNumero([numero ? numero[0] : 0, parseFloat(numeroString[1])])}
        onChangeText={text => setNumeroString([numeroString[1], text])}
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