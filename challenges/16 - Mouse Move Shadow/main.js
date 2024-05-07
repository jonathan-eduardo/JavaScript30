const title = document.querySelector('.title')
let [shadowX, shadowY] = [0, 0]

function setTitleBoxShadow(x, y) {
  title.style.textShadow = `${x}px ${y}px 1px rgba(0, 0, 0, 0.2)`
}

function moveTextShadow(event) {
  let mouseX = 0
  let mouseY = 0

  if (event.type === 'touchmove') {
    mouseX = event.touches[0].clientX
    mouseY = event.touches[0].clientY
  } else {
    mouseX = event.x
    mouseY = event.y

    title.setAttribute('contenteditable', true)
  }

  const moveStep = 15
  const centerXposition = title.offsetLeft + title.clientWidth / 2
  const centerYposition = title.offsetTop + title.clientHeight / 2

  if (mouseX < centerXposition || mouseX > centerXposition) {
    shadowX = Math.round((mouseX - centerXposition) / moveStep)
  }

  if (mouseY < centerYposition || mouseY > centerYposition) {
    shadowY = Math.round((mouseY - centerYposition) / moveStep)
  }

  setTitleBoxShadow(shadowX, shadowY)
}

window.addEventListener('mousemove', moveTextShadow)
window.addEventListener('touchmove', moveTextShadow)
window.addEventListener('touchend', () => setTitleBoxShadow(0, 0))
