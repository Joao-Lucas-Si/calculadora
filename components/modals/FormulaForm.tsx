import { DefinicaoFormulario } from "../../services/formulas/Types"
import ListaNumeros from "../forms/ListaNumeros"
import EntradaNumero from "../forms/EntradaNumero"
import { useReducer, useEffect, useState } from "react"
import { View, ScrollView, Text, Button, Touchable, Modal } from "react-native"


function reducer(state: Record<string, any>, action: (state: Record<string, any>) => Record<string, any>) {
  return action(state)
}

export default function FormulaForm({ definicao, setValor }: { 
  setValor: (state: Record<string, any>) => void, 
  definicao: DefinicaoFormulario[], 
}) {
  const [state, dispatch] = useReducer(reducer, {})
  const [camposDinamicos, setCamposDinamicos] = useState<DefinicaoFormulario[]>([])

  useEffect(() => setValor({...state}), [state])

  const mudarValor = (campo: typeof definicao[number]) => (numeros: any) => dispatch(state => {
    state[campo.nome] = numeros
    return {...state}
  })

  const mudarValorDinamico = (campo: typeof definicao[number], index: number) => (numeros: any) => dispatch(state => {
    state[campo.nome][index] = numeros
    return {...state}
  })

  return <ScrollView
    style={{
      paddingHorizontal: 30,
      paddingTop: 10
    }}
  >
    {definicao.map(campo => campo.type === "listaNumeros" 
      ? <ListaNumeros
      key={campo.nome}
      titulo={campo.titulo}
      setValor={mudarValor(campo)}
    /> 
      : campo.type === "adicionar" 
        ? <Button 
            key={campo.nome}
            title={campo.titulo}
            onPress={() => {

              setCamposDinamicos([...camposDinamicos, {
                nome: campo.nome,
                titulo: `${campo.titulo} - ${(state[campo.nome]?.length ?? 0) + 1}`,
                type: "numero",
                opcional: campo.opcional
              }])
              dispatch(state => {
                if (!state[campo.nome]) state[campo.nome] = []
                return state
              })
            }}
          />
        : campo.type === "adicionarLista"
          ? <Button 
            key={campo.nome}
            title={campo.titulo}
            onPress={() => {
              setCamposDinamicos([...camposDinamicos, {
                nome: campo.nome,
                titulo: `${campo.titulo} - ${(state[campo.nome]?.length ?? 0) + 1}`,
                type: "listaNumeros",
                opcional: campo.opcional
              }])
              dispatch(state => {
                if (!state[campo.nome]) state[campo.nome] = []
                return state
              })
            }}
          />
          : <EntradaNumero
              key={campo.nome}
              titulo={campo.titulo}
              opcional={campo.opcional}
              setValor={mudarValor(campo)}
            />
    )}
    {
      camposDinamicos.map((campo, i) => campo.type === "listaNumeros" 
        ? <ListaNumeros
          key={campo.titulo}
          titulo={campo.titulo}
          setValor={mudarValorDinamico(campo, i)}
        /> 
        : <EntradaNumero
            key={campo.titulo}
            titulo={campo.titulo}
            opcional={campo.opcional}
            setValor={mudarValorDinamico(campo, i)}
          />
      )
    }
    <View 
      style={{
        marginBottom: 20
      }}
    />
  </ScrollView>
}