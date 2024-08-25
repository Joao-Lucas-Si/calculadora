import { Modal, Text, Button, TouchableHighlight, View, TextInput, Dimensions } from "react-native"
import { useState } from "react"
import cores from "../../style/vars"
import { Variavel } from "../../models/DB"
import * as FormulaService from "../../models/formula"
import EntradaTexto from "../forms/EntradaTexto"
import ModalBase from "./ModalBase"

export default function FormulaCustomizada({
  visivel, 
  setVisivel,
  calculo,
  variaveis
} : {
  visivel: boolean,
  setVisivel: (visivel: boolean) => void,
  calculo: string[],
  variaveis: Record<string, number|number[]>
}) {
  const [nome, setNome] = useState("")
  function salvar() {
    FormulaService.salvar({
      id: 0,
      nome,
      calculo: calculo.join("|"),
      parametros: (() => {
        const variaveisLista: Variavel[] = []
        for (const variavel in variaveis) {
          const valor = variaveis[variavel]
          variaveisLista.push(
            valor instanceof Array ? 
            { 
              id: 0, 
              nome: variavel, 
              tipo: "lista", 
              valores: valor 
            } 
            : 
            { 
              id: 0, 
              nome: variavel, 
              valor, 
              tipo: "normal"  
            }
          )
        }
        return variaveisLista
      })()
    })
    setVisivel(false)
  }

  return (
    <ModalBase
      visivel={visivel}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "space-between"
        }}
      >
        <View
          style={{
            flex: 0.1,
            alignContent:"center",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <EntradaTexto  
            setValor={setNome}
            titulo="nome"
          />
        </View>
        <View 
          style={{
            flex: 0.1,
            gap: 5,
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "row"
          }}
        >
          <TouchableHighlight style={{
            flex: 0.5,
            backgroundColor: cores.roxoClaro,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }} onPress={salvar} >
            <Text 
              style={{
                fontSize: 30,
                color: "#fff"
              }}
            >salvar</Text>
          </TouchableHighlight>
          <TouchableHighlight style={{
            flex: 0.5,
            justifyContent: "center",
            backgroundColor: cores.roxoMedio,
            flexDirection: "row",
            alignItems: "center"
          }} onPress={() => setVisivel(false)} >
            <Text 
              style={{
                fontSize: 30,
                color: "#fff"
              }}
            >fechar</Text>
          </TouchableHighlight>
        </View>
      </View>
    </ModalBase>
  )
}