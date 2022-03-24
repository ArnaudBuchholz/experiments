export const TRIGO_FACTOR = 10000
export const TRIGO_2PI_FACTOR = Math.floor(2 * Math.PI * TRIGO_FACTOR)

const cosTable = []
const sinTable = []


export function sin (radian) {
  return sinTable[radian % TRIGO_2PI_FACTOR]
}

export function cos (radian) {
  return cosTable[radian % TRIGO_2PI_FACTOR]
}

for (let i = 0; i < TRIGO_2PI_FACTOR; ++i) {
  const radian = i / TRIGO_FACTOR
  cosTable[i] = Math.floor(TRIGO_FACTOR * Math.cos(radian))
  sinTable[i] = Math.floor(TRIGO_FACTOR * Math.sin(radian))
}
