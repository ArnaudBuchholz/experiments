import { register, start } from './frame.js'
import { cos, sin, TRIGO_2PI_FACTOR, TRIGO_FACTOR } from './trigo.js'

const particles = new Array(1000).fill(null)

function frame (tick) {
  const width = window.innerWidth
  const height = window.innerHeight
  const cx = width / 2
  const cy = height / 2
  const size = Math.min(cx, cy) / 2
//   const offset = Math.floor(tick * 10)

  particles.forEach(({ sprite, radius, radians }) => {
    const adjustedRadians = (radians + Math.floor(tick * radius / 10)) % TRIGO_2PI_FACTOR
    const x = cx + (size * radius / 100 * cos(adjustedRadians) / TRIGO_FACTOR)
    const y = cy + (size * radius / 100 * sin(adjustedRadians) / TRIGO_FACTOR)
    sprite.setAttribute('style', `left: ${x}px; top: ${y}px;`)
  })
}

window.addEventListener('load', () => {
  particles.forEach((_, index) => {
    const sprite = document.body.appendChild(document.createElement('div'))
    sprite.className = 'particle'
    const radius = Math.floor(Math.random() * 100)
    const radians = Math.floor(Math.random() * TRIGO_2PI_FACTOR)
    particles[index] = { sprite, radius, radians }
  })
  register(frame)
  start()
})
