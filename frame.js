let title
let lastFpsDisplayTick
let lastFrameCount
const callbacks = []

function paint () {
  const tick = performance.now()
  ++lastFrameCount
  const ticks = tick - lastFpsDisplayTick
  if (ticks > 500) {
    const fps = Math.floor(1000 * lastFrameCount / ticks)
    document.title = title + ' [' + fps + ']'
    lastFpsDisplayTick = tick
    lastFrameCount = 0
  }
  callbacks.forEach(callback => callback(tick))
  window.requestAnimationFrame(paint)
}

export function register (callback) {
  callbacks.push(callback)
}

export function unregister (callback) {
  const pos = callbacks.indexOf(callback)
  if (pos !== -1) {
    callbacks.splice(pos, 1)
  }
}

export function start () {
  title = document.title
  lastFpsDisplayTick = performance.now()
  lastFrameCount = 0
  window.requestAnimationFrame(paint)
}
