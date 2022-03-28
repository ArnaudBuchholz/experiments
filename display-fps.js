import { register } from './frame.js'

window.addEventListener('load', () => {
  const fps = document.body.appendChild(document.createElement('div'))
  fps.className = 'fps'
  fps.innerHTML = '0'
  const title = document.title
  register('fps', count => {
    fps.innerHTML = count
    document.title = `${title} [${count}]`
  })
})
