import { DefinicaoFormulario, Formula } from "../Types"

const Circulo: Formula<{ raio?: number, area?: number }> = {
  titulo: "Círculo",
  definicaoFormulario: [
    {
      titulo: "raio(r)",
      nome: "raio",
      opcional: true,
      type: "numero"
    },
    {
      titulo: "area(A)",
      nome: "area",
      opcional: true,
      type: "numero"
    },
  ],
  obterPassos: ({ raio, area }) => {
    return raio 
      ? [
        `F= 𝝅 X r^2`,
        `A = 3,14 X ${raio}^2`,
        `3,14 X ${raio**2}`,
      ] 
      : area 
        ? [
          `F = 𝝅 X r^2`,
          `r = √𝝅 / A`,
          `√3,14 / ${area}`,
          `√${3.14 / area}`
        ]
        : ["não é possivel calcular"]
  },
  obterResultado: ({raio, area}) => raio 
    ? `A=${3.14 * (raio ** 2)}`.replaceAll(".", ",")
    : area
      ? `r=${Math.sqrt(3.14 / area)}`.replaceAll(".", ",")
      : "sem resultados"
}

export default Circulo