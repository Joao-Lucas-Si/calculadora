export default {
  fatorial: (numero: number)  => {
    let resultado = 1
    for (let n = numero; n > 0; n--) {
      resultado *= n
    }
    return resultado
  },
  verificarPrimo: (num: number) => {
    for (let i = 2; i < num; i++) {
      if (num % i === 0) return false
    }
    return true
  },
  constantes: {
    pi: "𝝅",
    aurea: "φ",
    beta: 'β*',
    //dirac: "δ",
    vacuo: "μ",
    gases: "L",
    euler: "e"
  },
  som: (...numeros: number[]) =>  numeros.reduce((acumulacao, num) => acumulacao + num, 0),
  mul: (...numeros: number[]) =>numeros.reduce((acumulacao, num) => acumulacao * num, 1),
  med: (...numeros: number[]) => numeros.reduce((acumulacao, num) => acumulacao + num, 0) / numeros.length,
  len: (...numeros: number[]) => numeros.length,
}