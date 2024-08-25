import { Text } from "react-native"

export default function VisualizadorVariaveis({variaveis}: {variaveis: Record<string, number|number[]>}) {
  return (
    <Text>{Object.entries(variaveis).map(([nome, valor]) => `${nome}=${valor instanceof Array ? `[${valor.join(",")}]`: valor}`).join(", ")}</Text>
  )
}