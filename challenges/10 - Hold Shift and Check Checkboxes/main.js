const checkboxes = Array.from(
  document.querySelectorAll('input[name="options"]')
)
let lastSelected = null
let holdingShift = false

function getElementsBetween(...elements) {
  const [first, last] = elements
    .map((element) => checkboxes.indexOf(element))
    .sort()
  return checkboxes.slice(first + 1, last)
}

function handleShift(event) {
  if (event.keyCode !== 16) return
  holdingShift = event.type === 'keydown' ? true : false
}

function handleCheckbox() {
  if (!lastSelected) lastSelected = this

  if (holdingShift && this.checked) {
    const elementsToCheck = getElementsBetween(this, lastSelected)
    elementsToCheck.forEach((element) => (element.checked = true))
  }
  lastSelected = this
}

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', handleCheckbox)
})
document.addEventListener('keydown', handleShift)
document.addEventListener('keyup', handleShift)
