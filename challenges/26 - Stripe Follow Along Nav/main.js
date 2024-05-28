const options = document.querySelectorAll('.nav-item')
const highlight = document.createElement('div')

highlight.classList.add('highlight')
document.body.appendChild(highlight)

function handleMouseOver() {
  const selectedOption = this.querySelector(`.${this.dataset.name}`)
  this.classList.add('active')
  handleHighlight(selectedOption)
}

function handleHighlight(element) {
  const { width, height, x, y } = element.getBoundingClientRect()

  highlight.style.width = `${width}px`
  highlight.style.height = `${height}px`
  highlight.style.transform = `translate(${x}px, ${y}px)`
  highlight.classList.add('active')
}

function handleMouseLeave(e) {
  if (e.relatedTarget != highlight) {
    this.classList.remove('active')
    highlight.classList.remove('active')
  }
}

options.forEach((option) => {
  option.addEventListener('mouseover', handleMouseOver)
  option.addEventListener('mouseleave', handleMouseLeave)
})
