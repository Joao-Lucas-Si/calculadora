import Mediana from "./estatisticas/mediana"
import Moda from "./estatisticas/moda"
import Media from "./estatisticas/media"
import Arranjo from "./combinatoria/Arranjo"
import Combinacao from "./combinatoria/combinacao"
import Permutacao from "./combinatoria/permutacao"
import Quadrado from './geometria/Quadrado'
import Triangulo from './geometria/Triangulo'
import Losango from './geometria/Losango'
import Retangulo from './geometria/Retangulo'
import Circulo from './geometria/Circulo'
import Trapezio from './geometria/Trapezio'
import DensidadeDemografica from "./geografia/DensidadeDemografica"

export default {
  "estatisticas": [
    Mediana,
    Moda,
    Media
  ],
  "analíse combinatória": [
    Permutacao,
    Arranjo,
    Combinacao
  ],
  "geometria": [
    Quadrado,
    Triangulo,
    Losango,
    Retangulo,
    Trapezio,
    Circulo
  ],
  "geográfia": [
    DensidadeDemografica
  ]
} as const