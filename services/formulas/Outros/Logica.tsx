import { Formula } from "../Types"
const Logica: Formula<{ valor: string }> = {
  titulo: "lógica",
  definicaoFormulario: [
    {
      nome: "valor",
      titulo: "valor",
      type: "texto"
    }
  ],
  obterPassos: ({ valor }) => {
  
  }
}