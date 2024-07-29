import { DefinicaoFormulario, Formula } from "../Types"

const Triangulo: Formula<{ menor?: number, maior?: number, altura?: number, area?: number }> = {
  titulo: "Triângulo",
  definicaoFormulario: [
    {
      titulo: "base menor(b)",
      nome: "menor",
      opcional: true,
      type: "numero"
    },
    {
      titulo: "base maior(B)",
      nome: "maior",
      opcional: true,
      type: "numero"
    },
    {
      titulo: "altura(h)",
      nome: "altura",
      opcional: true,
      type: "numero"
    },
    {
      titulo: "area(A)",
      nome: "altura",
      opcional: true,
      type: "numero"
    },
  ],
  obterPassos: ({ maior, menor, altura }) => {
    return (altura && menor && maior) 
    ? [
      `F=(( B + b ) X h )/2`,
      `((${maior} + ${menor} ) X ${altura})/2`,
      `(${maior + menor} X ${altura})/2`,
      `${(maior + menor) * altura}/2`,
    ]
    : [

    ]
  },
  obterResultado: ({maior,menor, altura}) => `${((maior + menor) * altura) /2 }`
}

export default Triangulo