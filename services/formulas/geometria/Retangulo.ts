import { DefinicaoFormulario, Formula } from "../Types"

const Retangulo: Formula<{ base?: number, altura?: number, area?: number }> = {
  titulo: "Retângulo",
  definicaoFormulario: [
    {
      titulo: "base(b)",
      nome: "base",
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
      titulo: "area(a)",
      nome: "area",
      opcional: true,
      type: "numero"
    }
  ],
  obterPassos: ({ base, altura, area }) => {
    return (base && altura) 
      ? [
        `F= b X h`,
        `${base} X ${altura}`,
      ]
      : (area && (altura || base)) 
        ? [
          `F= b X h`,
          `${altura ? "h" : "b"}= A / ${altura ? "b" : "h"}`,
          `${altura ? "h" : "b"}= ${area} / ${altura ?? base ?? 0}`
        ]
        : [
          "não é possível calcular"
        ]
  },
  obterResultado: ({base, altura, area}) => (base && altura) 
    ? `${(base * altura)}`
    : (area && (base || altura))
      ? `${area / (base ?? altura ?? 0)}`
      : "sem resultado"
}

export default Retangulo