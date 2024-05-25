const divs = document.querySelectorAll('.box')
const btnOnce = document.getElementById('btn-once')
const toggleBubbling = document.getElementById('btn-bubble')

let stopBubbling = false

function handleClick(e) {
  if (stopBubbling) {
    e.stopPropagation()
  }

  const name = this.dataset.value
  this.style.setProperty(`--${name}-before`, '"Clicked!"')

  setTimeout(() => {
    this.style.setProperty(`--${name}-before`, `"${name}"`)
  }, 500)
}

divs.forEach((div) =>
  div.addEventListener('click', handleClick, { capture: false })
)

toggleBubbling.addEventListener('click', () => (stopBubbling = !stopBubbling))
btnOnce.addEventListener('click', () => alert('thils will happen once'), {
  once: true,
})
