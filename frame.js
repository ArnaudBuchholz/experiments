const callbacks = {
  fps: [],
  paint: []
}

let lastFpsDisplayTick
let lastFrameCount
let lastFps = 0
let stability = 0

function paint () {
  const tick = performance.now()
  ++lastFrameCount
  const ticks = tick - lastFpsDisplayTick
  if (ticks > 250) {
    const fps = Math.floor(1000 * lastFrameCount / ticks)
    if (lastFps === fps) {
      stability += ticks
    } else if (!lastFps || lastFps - 1 > fps || fps > lastFps + 1) {
      lastFps = fps
      stability = 0
    }
    lastFpsDisplayTick = tick
    lastFrameCount = 0
    callbacks.fps.forEach(callback => callback(fps, stability))
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
