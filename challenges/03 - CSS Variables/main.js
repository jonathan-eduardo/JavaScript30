const inputs = document.querySelectorAll('input')

function handleInput() {
  const view = document.querySelector(`.${this.name}-view`)
  const varName = `--${this.name}`
  const unit = this.dataset.unit || ''
  const value = `${this.value}${unit}`

  document.documentElement.style.setProperty(varName, value)
  view.textContent = value
}

inputs.forEach((input) => input.addEventListener('input', handleInput))
