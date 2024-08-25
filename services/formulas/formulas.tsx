import Mediana from "./estatisticas/mediana"
import Moda from "./estatisticas/moda"
import Media from "./estatisticas/media"
import Variancia from "./estatisticas/Variancia"
import DesvioMedio from "./estatisticas/DesvioMedio"
import DesvioPadrao from "./estatisticas/DesvioPadrao"
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
import Serie from "./resistores/Serie"
import Paralelo from "./resistores/Paralelo"
import Misto from "./resistores/Misto"
import MMC from "./Outros/MCC"

export default {
  "estatisticas": [
    Mediana,
    Moda,
    Media,
    Variancia,
    DesvioMedio,
    DesvioPadrao
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
  ],
  "resistores": [
    Serie,
    Paralelo,
    Misto
  ],
  "outros": [
    MMC,
  ]
} as const