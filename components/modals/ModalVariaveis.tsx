import { Modal, View, Text, ScrollView, Button, FlatList, TouchableHighlight, Dimensions } from "react-native"
import ModalBase from "./ModalBase"
import Conversoes from "../../services/conversao/conversoes"
import { UnidadeDados, UnidadeConversao } from "../../services/conversao/Types"
import cores from "../../style/vars"
import { useState, useEffect } from "react"

export default function ModalForm({
  visivel, 
  setVisivel, 
  variaveis, 
  adicionar
}: {  
  visivel: boolean, 
  setVisivel: (visivel: boolean) => void, 
  adicionar: (char: string) => void, 
  variaveis: Record<string, number|number[]>
}) {
  
  return (
    <ModalBase
      visivel={visivel}
    >
      <FlatList
        data={Object.entries(variaveis)}
        renderItem={(
          {item: [nome, valor]}: {item: [string, number[]|number]}
        ) => <TouchableHighlight
          onPress={() => adicionar(nome)}
          style={{
            borderColor: cores.roxoMedio,
            borderWidth: 3,
            borderRadius: 10,
            padding: 5,
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <>
            <Text
              style={{
                fontSize: 30,
                color: "#fff",
              }}
            >{nome}</Text>
            <Text
              style={{
                color: cores.fundo3,
                fontSize: 15
              }}
            >{valor instanceof Array ? valor.join(",") : valor}</Text>
          </>
        </TouchableHighlight>}
      />
      <Button 
        onPress={() => {
          setVisivel(false)
        }}
        title="fechar"
        color={cores.roxoMedio}
      />
    </ModalBase>
  )
}