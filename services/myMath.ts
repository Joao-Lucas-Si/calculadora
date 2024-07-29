export default {
  fatorial: (numero: number)  => {
    let resultado = 1
    for (let n = numero; n > 0; n--) {
      console.log(n)
      console.log(resultado * n)
      resultado *= n
    }
    return resultado
  },
  som: (...numeros: number[]) =>  numeros.reduce((acumulacao, num) => acumulacao + num, 0),
  mul: (...numeros: number[]) =>numeros.reduce((acumulacao, num) => acumulacao * num, 1),
  med: (...numeros: number[]) => numeros.reduce((acumulacao, num) => acumulacao + num, 0) / numeros.length,
  len: (...numeros: number[]) => numeros.length,
}