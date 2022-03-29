export function sin (trigo, radian) {
  return trigo.sinTable[radian % trigo.factored2PI]
}

export function cos (trigo, radian) {
  return trigo.cosTable[radian % trigo.factored2PI]
}

export function prepare (factor) {
  const factored2PI = Math.floor(2 * Math.PI * factor + 1)
  const cosTable = []
  const sinTable = []
  for (let factoredRadian = 0; factoredRadian < factored2PI; ++factoredRadian) {
    const radian = factoredRadian / factor
    cosTable[factoredRadian] = Math.floor(factor * Math.cos(radian))
    sinTable[factoredRadian] = Math.floor(factor * Math.sin(radian))
  }
  return {
    factor,
    factored2PI,
    cosTable,
    sinTable
  }
}
