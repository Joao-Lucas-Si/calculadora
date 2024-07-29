import { Modal, View, Text, ScrollView, Button, FlatList, TouchableHighlight, Dimensions } from "react-native"
import Formulas from "../../services/formulas/formulas"
import cores from "../../style/vars"
import FormulaForm from "../FormulaForm"
import { useState, useEffect } from "react"

export default function ModalForm({visivel, setVisivel}: {visivel: boolean, setVisivel: (visivel: boolean) => void}) {
  const [mostrarCalculos, setMostrarCalculos] = useState(false)
  const [formulaValores, setFormulaValores] = useState<Record<string, any>>({})
  const [tipoAtual, setTipoAtual] = useState<keyof typeof Formulas>("estatisticas")
  const [formulaAtual, setFormulaAtual] = useState<typeof Formulas[keyof typeof Formulas][number]|undefined>()
  
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
        { formulaAtual 
          ? <> 
              <Button
                color={cores.roxoClaro}
                title="voltar"
                
                onPress={() => {
                  setMostrarCalculos(false)
                  setFormulaAtual(undefined)
                }}
              />
              <View 
                style={{
                  flex: 0.8
                }}
              >
                <FormulaForm
                  definicao={formulaAtual.definicaoFormulario}
                  setValor={valores => setFormulaValores(valores)}
                />
              </View>
              <Button 
                onPress={() => setMostrarCalculos(!mostrarCalculos)}
                title={mostrarCalculos ? "ocultar" : "calcular"}
                color={cores.roxoMedio}
              />
              {mostrarCalculos && <ScrollView
                style={{
                  flex: 0.3,
                  padding: 5
                }}
              >
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 30,
                    textAlign: "center"
                  }}
                >passos</Text>
                {formulaAtual.obterPassos(formulaValores as any).map(passo => <Text
                  key={passo}
                  style={{
                    color: "#ffffff"
                  }}
                >{passo}</Text>)}
                <Text
                  style={{
                    color: "#ffffff"
                  }}
                >Resultado: {formulaAtual.obterResultado(formulaValores as any)}</Text>
                 <View 
                  style={{
                    marginBottom: 20
                  }}
                />
              </ScrollView>              
              }
              
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
                {(Object.keys(Formulas) as (keyof typeof Formulas)[]).map(formula => <Button
                  title={formula}
                  onPress={() => setTipoAtual(formula)}
                  color={cores.roxoClaro}
                ></Button>)}
              </ScrollView>
            </View>
            <FlatList
              data={Formulas[tipoAtual]}
              renderItem={(
                {item}: {item: typeof Formulas[keyof typeof Formulas][number]}
              ) => <TouchableHighlight
                onPress={() => setFormulaAtual(item)}
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
                >{item.titulo}</Text>
              </TouchableHighlight>}
            />
          </>
        }
        <Button 
          onPress={() => {
            setMostrarCalculos(false)
            setFormulaAtual(undefined)
            setVisivel(false)
          }}
          title="fechar"
          color={cores.roxoEscuro}
        />
      </View>
    </View>
  </Modal>
}