import { DefinicaoFormulario, Formula } from "../Types"

const DensidadeDemografica: Formula<{ populacao: number, area: number, concentracaoPopulacional?: number,  concentracaoTerritorial?: number }> = {
  titulo: "Densidade Demográfica",
  definicaoFormulario: [
    {
      titulo: "população(p)",
      nome: "populacao",
      type: "numero"
    },
    // {
    //   titulo: "concentração populacional(c)",
    //   nome: "concentracaoPopulacional",
    //   opcional: true,
    //   type: "numero"
    // },
    // {
    //   titulo: "concentração territórial(t)",
    //   nome: "concentracaoTerritorial",
    //   opcional: true,
    //   type: "numero"
    // },
    {
      titulo: "area(a)",
      nome: "area",
      type: "numero"
    }
  ],
  obterPassos: ({ populacao, concentracaoPopulacional, concentracaoTerritorial, area }) => {
    return (populacao && concentracaoPopulacional && concentracaoTerritorial && area)
     ? [

     ]
     : (populacao && area) 
      ? [
        "F=p/a",
        `D= ${populacao} / ${area}`,
      ]
      : ["não é possivel calcular"]
  },
  obterResultado: ({populacao, concentracaoPopulacional, concentracaoTerritorial, area}) => 
    (populacao && concentracaoPopulacional && concentracaoTerritorial && area) 
      ? ""
      : (populacao && area) 
        ? `${populacao / area} Hab/km²`
        : "não é possivel calcular"
}

export default DensidadeDemografica