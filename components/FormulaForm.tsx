import { DefinicaoFormulario } from "../services/formulas/Types"
import ListaNumeros from "./forms/ListaNumeros"
import EntradaNumero from "./forms/EntradaNumero"
import { useReducer, useEffect } from "react"
import { View, ScrollView, Text, Button, Touchable, Modal, FlatList } from "react-native"

function reducer(state: Record<string, any>, action: (state: Record<string, any>) => Record<string, any>) {
  return action(state)
}

export default function FormulaForm({ definicao, setValor }: { 
  setValor: (state: Record<string, any>) => void, 
  definicao: DefinicaoFormulario[], 
}) {
  const [state, dispatch] = useReducer(reducer, {})

  useEffect(() => setValor({...state}), [state])

  const mudarValor = (campo: typeof definicao[number]) => (numeros: any) => dispatch(state => {
        state[campo.nome] = numeros
        return {...state}
      })
  return <ScrollView
    style={{
      paddingHorizontal: 30,
      paddingTop: 10
    }}
  >
    <FlatList
      data={definicao}
      renderItem={({item: campo}) => campo.type === "listaNumeros" ? <ListaNumeros
        key={campo.nome}
        titulo={campo.titulo}
        setValor={mudarValor(campo)}
      /> : <EntradaNumero
        key={campo.nome}
        titulo={campo.titulo}
        opcional={campo.opcional}
        setValor={mudarValor(campo)}
      />}
    />
    <View 
      style={{
        marginBottom: 20
      }}
    />
  </ScrollView>
}