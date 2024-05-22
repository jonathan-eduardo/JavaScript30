const links = document.querySelectorAll('a')
const highlight = document.createElement('span')

highlight.classList.add('hightlight')
document.body.appendChild(highlight)

function handleHighlight({ target }) {
  const width = target.offsetWidth
  const height = target.offsetHeight
  const x = target.offsetLeft
  const y = target.offsetTop

  highlight.style.background = '#ced4da'
  highlight.style.width = `${width}px`
  highlight.style.height = `${height}px`
  highlight.style.transform = `translate(${x}px, ${y}px)`
}

links.forEach((link) => link.addEventListener('mouseover', handleHighlight))
