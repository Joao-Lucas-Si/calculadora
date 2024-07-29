import { Modal, View, Text, ScrollView, Button, FlatList, TouchableHighlight, Dimensions } from "react-native"
import Conversoes from "../../services/conversao/conversoes"
import { UnidadeDados, UnidadeConversao } from "../../services/conversao/Types"
import cores from "../../style/vars"
import { useState, useEffect } from "react"

export default function ModalForm({visivel, setVisivel, setUnidades, setConversor}: {  visivel: boolean, setVisivel: (visivel: boolean) => void, setUnidades: (unidades: {base: UnidadeDados, transformar: UnidadeDados}|undefined) => void, setConversor: (conversor: undefined|((base: number) => number)) => void}) {
  const [conversaoBase, setConversaoBase] = useState<{ dados: UnidadeDados, nome: string}|undefined>()
  const [tipoAtual, setTipoAtual] = useState<keyof typeof Conversoes>("Comprimento")
  
  const UnidadeCard = ({item, aoClicar}: {item: UnidadeDados, aoClicar: (item: UnidadeDados) => void}) => <TouchableHighlight
      onPress={() => aoClicar(item)}
      style={{
        borderBottomColor: cores.roxoEscuro,
        borderBottomWidth: 5,
        padding: 4
      }}
    >
      <Text
        style={{
          fontSize: 20,
          color: cores.roxoClaro
        }}
      >{item.nome} - {item.unidade}</Text>
    </TouchableHighlight>

  return <Modal
    visible={visivel}
    transparent
  >
    <View
      style={{
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        paddingHorizontal: Dimensions.get("window").width * 0.1,
        paddingVertical: Dimensions.get("window").height * 0.1
      }}
    >
      <View 
        style={{
          height: "100%",
          backgroundColor: cores.fundo,
          borderWidth: 5,
          borderColor: cores.roxoMedio
        }}
      >
        { conversaoBase
          ? <> 
              <Button
                color={cores.roxoClaro}
                title="voltar"
                
                onPress={() => {
                  setConversaoBase(undefined)
                }}
              />
              <FlatList
                data={Object.values(Conversoes)
                  .flatMap(conversao => Object.entries(conversao.unidades))
                  .filter(([unidade, dados]) => conversaoBase.dados.disponiveis.includes(unidade))}
                renderItem={({item: [nome, item]}: {item: [string, UnidadeDados]}) => <UnidadeCard 
                  item={item}
                  aoClicar={() => {
                    setUnidades({
                      base: conversaoBase.dados,
                      transformar: item
                    })
                    console.log(Conversoes)
                    
                    setConversor(() => Conversoes[tipoAtual].converter(conversaoBase.nome, nome))
                    setVisivel(false)
                    setConversaoBase(undefined)
                  }}
                />}
              />
          </>
          : <>
            <View
              style={{
                height: 50
              }}
            >
              <ScrollView
                horizontal
                style={{
                  borderBottomWidth: 5,
                  borderBottomColor: cores.roxoEscuro
                }}
              >
                {(Object.keys(Conversoes) as (keyof typeof Conversoes)[]).map(formula => <Button
                  title={formula}
                  onPress={() => setTipoAtual(formula)}
                  color={cores.roxoClaro}
                ></Button>)}
              </ScrollView>
            </View>
            <FlatList
              data={Object.entries(Conversoes[tipoAtual].unidades)}
              renderItem={(
                {item: [nome, item]}: {item: [string, UnidadeDados]}
              ) => <UnidadeCard 
                item={item}
                aoClicar={item => setConversaoBase({ dados: item, nome})}
              />}
            />
          </>
        }
        <Button 
          onPress={() => {
            setConversor(undefined)
            setUnidades(undefined)
            setConversaoBase(undefined)
            setVisivel(false)
          }}
          title="desativar"
          color={cores.roxoEscuro}
        />
        <Button 
          onPress={() => {
            setConversaoBase(undefined)
            setVisivel(false)
          }}
          title="fechar"
          color={cores.roxoMedio}
        />
      </View>
    </View>
  </Modal>
}