import { DefinicaoFormulario, Formula } from "../Types"

const Triangulo: Formula<{ base: number, altura: number }> = {
  titulo: "Triângulo",
  definicaoFormulario: [
    {
      titulo: "base(b)",
      nome: "base",
      type: "numero"
    },
    {
      titulo: "altura(h)",
      nome: "altura",
      type: "numero"
    }
  ],
  obterPassos: ({ base, altura }) => {
    return [
      `F=(b X h)/2`,
      `(${base} X ${altura})/2`,
      `${base * altura}/2`,
    ]
  },
  obterResultado: ({base, altura}) => `${(base * altura)/2}`
}

export default Triangulo