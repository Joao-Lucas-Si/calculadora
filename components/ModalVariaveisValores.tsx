import Botao from "./Botao"
import { useState, useEffect } from "react"
import EntradaNumero from "./forms/EntradaNumero"
import ListaNumeros from "./forms/ListaNumeros"
import { View, ScrollView, Text, StyleSheet, TextInput, FlatList } from "react-native"
import styleVars from "../style/vars"
interface props {
  funcaoFechar: Function,
  variaveis: Record<string, number|number[]>,
  setVariaveis: (variaveis: Record<string, number|number[]>) => void
}
import modal from "../style/modal"

interface historico {
  id: number,
  calculo: string
}

const alfabeto = "abcdefghijklmnopqrstuvwxyz".split("")

export default function ModalVariaveisValores(props: props) {
  const [numeroVariaveis, setNumeroVariaveis] = useState<("numero"|"lista")[]>(Object.values<number|number[]>(props.variaveis).map(variavel => variavel instanceof Array ? "lista" : "numero"))
  const [variaveis, setVariaveis] = useState<Record<string, number|number[]>>(props.variaveis)
  
  useEffect(() => {
    props.setVariaveis(variaveis)
  }, [variaveis])

  return (
    <View style={modal.modal}>
      <View
        style={{
          flex: 0.8,
          width: "100%",
          height: "80%",
          alignItems: "center"
        }}
      >

        <FlatList
          data={numeroVariaveis}
          renderItem={({item: tipo, index: numero}: {item: "lista"|"numero", index: number}) => {
            const letras: string[] = []
            for (let i = 0; i < Math.floor((numero ?? 0) / alfabeto.length); i++) {
              letras.push(alfabeto[i])
            }
            letras.push(alfabeto[numero % alfabeto.length])
            
            const nome = letras.join("")
            
            return tipo === "lista" 
            ? <ListaNumeros 
                setValor={(valor) => {
                  variaveis[nome] = valor ?? []
                  setVariaveis(variaveis)
                }}
                valorPadroa={(variaveis[nome] ?? []) as number[]}
                titulo={nome}
              />
            : <EntradaNumero 
                titulo={nome}

                valorPadroa={variaveis[nome] as number}
                setValor={(valor) => {
                  variaveis[nome] = valor ?? 0
                  setVariaveis(variaveis)
                }}
              />
          }}
        />
      </View>
      <View
        style={{
          flex: 0.2,
          width: "100%",
          alignItems: "center"
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            gap: 5
          }}
        >
          <Botao 
            funcao={() => setNumeroVariaveis([...numeroVariaveis, "numero"])}
            texto="normal"
          />
          <Botao
            funcao={() => setNumeroVariaveis([...numeroVariaveis, "lista"])}
            texto="lista"
          />
        </View>
        <Botao funcao={props.funcaoFechar} texto="fechar" styles={{ flex: 1, width: "100%", height: "20%", borderRadius: 0 }} />
      </View>
    </View>
    )
}
