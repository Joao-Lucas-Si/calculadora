import { DefinicaoFormulario, Formula } from "../Types"
import { View, Text } from "react-native"
import myMath from "../../myMath"

function Linhas({ linhas }:{linhas: {numeros: number[], multiplo: number}[]}) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        gap: 4,
      }}
    >
      <View
        style={{
          flex: 1,
          paddingRight: 4,
          alignItems: "flex-end",
          borderRightWidth: 5,
          borderRightColor: "#fff"
        }}
      >
        {linhas.map(linha => linha.numeros).map(numeros => <Text
          style={{
            color: "#fff"
          }}
        >{numeros.join(", ")}</Text>)}
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        {linhas.map(linha => linha.multiplo).map(multiplo => <Text
          style={{
           
            color: "#fff"
          }}
        >{multiplo}</Text>)}
      </View>
    </View>
  )
}

const MMC: Formula<{ numeros: number[] }> = {
  titulo: "Mínimo multiplo comum",
  definicaoFormulario: [
    {
      titulo: "números",
      nome: "numeros",
      type: "listaNumeros"
    },
  ],
  obterPassos: ({ numeros }) => {
    const multiplos = obterMultiplos(numeros)

    return [
      Linhas({ linhas: multiplos.map((multiplo, index) => ({ 
        multiplo, 
        numeros: numeros.map(
          numero => multiplos.slice(0, index).reduce((acumulacao, mul) => (acumulacao / mul) === Math.floor(acumulacao / mul) ? acumulacao / mul : acumulacao, numero)
        )
      })) }),
      `MMC=${multiplos.join(" X ")}`
    ]
  },
  obterResultado: ({numeros}) => {
    const multiplos = obterMultiplos(numeros)
    return `MMC=${myMath.mul(...multiplos)}`
  },
}

export const obterMultiplos = (numeros: number[]) => {
  const multiplos: number[] = []
  while (
    multiplos.length === 0 
      ? true 
      : !numeros.every(numero => multiplos.reduce(
          (acumulacao, num) => acumulacao === 1 
            ? acumulacao 
            : Number.isInteger(acumulacao / num)
              ? acumulacao / num
              : acumulacao
          , numero
        ) === 1
      )
  ) {
    multiplos.push(
      acharComum(
        numeros.map(
          numero => multiplos.length === 0 
            ? numero 
            : multiplos.reduce(
              (acumulacao, num) => acumulacao === 1 
                ? acumulacao 
                : Number.isInteger(acumulacao / num) 
                  ? acumulacao / num 
                  : acumulacao
              , 
              numero
            )
        )
      )
    )
  }
  return multiplos
}

function acharComum(numeros: number[]) {
  for (let i = 2; i <= Math.max(...numeros); i++) {
    if (
      myMath.verificarPrimo(i) && 
      numeros.filter(numero => numero !== 1).some(numero => Number.isInteger(numero / i)
    )) return i
  }
  return Math.min(...numeros.filter(numero => numero !== 1))
}


export default MMC