const inputs = document.querySelectorAll('input')

inputs.forEach((input) => {
  input.addEventListener('input', () => {
    const view = document.querySelector(`.${input.name}-view`)
    const varName = `--${input.name}`
    const unit = input.dataset.unit
    const value = input.value.includes('#')
      ? input.value
      : `${input.value}${unit}`

    document.body.style.setProperty(varName, value)
    view.textContent = value
  })
})
