import { Modal, View, Text, ScrollView, Button, FlatList, TouchableHighlight, Dimensions } from "react-native"
import { DefinicaoFormulario } from "../../services/formulas/Types"
import Formulas from "../../services/formulas/formulas"
import cores from "../../style/vars"
import FormulaForm from "./FormulaForm"
import { useState, useEffect } from "react"
import { Formula, Variavel } from "../../models/DB"
import ModalBase from "./ModalBase"
import * as FormulaService from "../../models/formula"

export default function ModalForm({visivel, setVisivel, calcular}: {visivel: boolean, setVisivel: (visivel: boolean) => void, calcular: (calculo: string[], variaveis: Record<string, number|number[]>) => string}) {
  const [customizados, setCustomizados] = useState<Formula[]>([])
  const [mostrarCalculos, setMostrarCalculos] = useState(false)
  const [formulaValores, setFormulaValores] = useState<Record<string, any>>({})
  const [tipoAtual, setTipoAtual] = useState<keyof typeof Formulas|"customizados">("estatisticas")
  const [formulaAtual, setFormulaAtual] = useState<typeof Formulas[keyof typeof Formulas][number]|undefined>()

  useEffect(() => {
    if (visivel) FormulaService.coletarTodos(setCustomizados)
  },[visivel])

  function converterVariaveis(variavelLinhas: Variavel[]) {
    const variaveis: Record<string, number|number[]> = {}

    variavelLinhas.forEach(variavel => {
      variaveis[variavel.nome] = variavel.tipo === "lista" ? variavel.valores : variavel.valor
    })

    return variaveis
  }
  
  return (
    <ModalBase
      visivel={visivel}
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
              {formulaAtual.obterPassos(formulaValores as any).map(passo => typeof passo ==="string" 
                ? <Text
                    key={passo}
                    style={{
                      color: "#ffffff"
                    }}
                  >{passo}</Text> 
                : passo
              )}
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
              {[...(Object.keys(Formulas) as (keyof typeof Formulas)[]), "customizados" as const].map(formula => <Button
                key={formula}
                title={formula}
                onPress={() => setTipoAtual(formula)}
                color={cores.roxoClaro}
              ></Button>)}
            </ScrollView>
          </View>
          <FlatList
            data={tipoAtual === "customizados" ? customizados : Formulas[tipoAtual]}
            keyExtractor={(item, i) => "id" in item ? item.id : item.titulo}
            renderItem={(
              {item}: {item: typeof Formulas[keyof typeof Formulas][number]|Formula}
            ) => <TouchableHighlight
              onPress={() => setFormulaAtual("id" in item ? {
                definicaoFormulario: (item as Formula).parametros.map<DefinicaoFormulario>(parametro => ({ nome: parametro.nome, titulo: parametro.nome, type: parametro.tipo === "lista" ? "listaNumeros" : "numero" })),
                obterPassos: () => [item.calculo.replaceAll("|", "")],
                titulo: item.nome,
                obterResultado: (variaveis: any) =>  calcular(item.calculo.split("|"), variaveis)
              } : item)}
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
              >{"nome" in item ? item.nome : item.titulo}</Text>
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
    </ModalBase>
  )
}