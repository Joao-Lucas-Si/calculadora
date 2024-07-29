import { TextInput, Text, View, TouchableHighlight, FlatList, Button } from "react-native"
import { useState, useEffect } from "react"
import cores from "../../style/vars"

export default function ListNumeros({ titulo, setValor, valorPadroa=[] }: { 
  titulo: string, 
  setValor: (state: number[]) => void,
  valorPadroa?: number[]
}) {
  const [numeroString, setNumeroString] = useState("")
  const [numero, setNumero] = useState<number|undefined>()
  const [numeros, setNumeros] = useState<number[]>(valorPadroa)

  useEffect(() => {
    setValor(numeros)
  }, [numeros])

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
      <Button
        onPress={() => {
          if (numero) {
            setNumeros([...numeros, numero])
            setNumero(undefined)
            setNumeroString("")
          }
        }}
        color={cores.roxoMedio}
        title="+"
      />
    </View>
    <FlatList 
      data={numeros}
      renderItem={({ item }: {item: number}) => <View
        style={{
          flex: 1,
          flexDirection: "row",
          gap: 10
        }}
      >
        <Text
          style={{
            color: "#ffffff",
            fontSize: 20
          }}
        >{item}</Text>
        <TouchableHighlight
          onPress={() => setNumeros(numeros.filter(n => n !== item))}
        >
          <Text 
            style={{
              color: "#ffffff",
              fontSize: 20
            }}
          >X</Text>
        </TouchableHighlight>
      </View>}
    />
  </View>
}