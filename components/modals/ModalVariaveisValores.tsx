import Botao from "../Botao"
import { useState, useEffect } from "react"
import EntradaNumero from "../forms/EntradaNumero"
import ListaNumeros from "../forms/ListaNumeros"
import { View, ScrollView, Text, StyleSheet, TextInput, FlatList, TouchableHighlight, Button } from "react-native"
import cores from "../../style/vars"
import ModalBase from "./ModalBase"

interface props {
  visivel: boolean,
  funcaoFechar: Function,
  variaveis: Record<string, number|number[]>,
  setVariaveis: (variaveis: Record<string, number|number[]>) => void
}

const alfabeto = "abcdefghijklmnopqrstuvwxyz".split("")

export default function ModalVariaveisValores(props: props) {
  function valoresParaDefinicao(variaveis: Record<string, number|number[]>) {
    return Object.values<number|number[]>(props.variaveis).map(variavel => variavel instanceof Array ? "lista" : "numero")
  }
  const [numeroVariaveis, setNumeroVariaveis] = useState<("numero"|"lista")[]>(valoresParaDefinicao(props.variaveis))

  useEffect(() => {
    setNumeroVariaveis(valoresParaDefinicao(props.variaveis))
    setVariaveis(props.variaveis)
  }, [props.variaveis])
  const [variaveis, setVariaveis] = useState<Record<string, number|number[]>>(props.variaveis)
  
  useEffect(() => {
    props.setVariaveis(variaveis)
  }, [variaveis])

  return (
    <ModalBase
      visivel={props.visivel}
    >
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
            
            return <View
              style={{
                flex: 1,
                gap: 5,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "flex-start",

                flexDirection: "row"
              }}
            >
              {
                tipo === "lista" 
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
              }
              <Button 
                color={"#f00"}
                title="remover" onPress={() => {
                setNumeroVariaveis(variaveis => {
                  return variaveis.filter((_, i) => i !== numero)
                })
                setVariaveis(variaveis => {
                  delete variaveis[nome]
                  return variaveis
                })
              }} />
            </View>
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
    </ModalBase>
  )
}
