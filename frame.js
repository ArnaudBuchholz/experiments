let lastFpsDisplayTick
let lastFrameCount
const callbacks = {
  fps: [],
  paint: []
}

function paint () {
  const tick = performance.now()
  ++lastFrameCount
  const ticks = tick - lastFpsDisplayTick
  if (ticks > 250) {
    const fps = Math.floor(1000 * lastFrameCount / ticks)
    lastFpsDisplayTick = tick
    lastFrameCount = 0
    callbacks.fps.forEach(callback => callback(fps))
  }
  callbacks.paint.forEach(callback => callback(tick))
  window.requestAnimationFrame(paint)
}

export function register (type, callback) {
  callbacks[type].push(callback)
}

export function unregister (type, callback) {
  const list = callbacks[type]
  const pos = list.indexOf(callback)
  if (pos !== -1) {
    list.splice(pos, 1)
  }
}

export function start () {
  lastFpsDisplayTick = performance.now()
  lastFrameCount = 0
  window.requestAnimationFrame(paint)
}
