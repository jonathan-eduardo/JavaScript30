const cardList = document.querySelector('.cards')
const cards = Array(25).fill(createCard())
let pressing = false
let xPosition = null

function createCard() {
  return `
    <li class="card">
      <div class="content image"></div>
      <div class="box">
        <div class="content medium"></div>
        <div class="content small"></div>
      </div>
      <div class="box">
        <div class="content medium"></div>
        <div class="content medium"></div>
        <div class="content large"></div>
      </div>
      <div class="content large"></div>
    </li>
  `
}

function handleDragging(e) {
  if (pressing) {
    const step = 10

    if (e.clientX < xPosition) cardList.scrollTo(cardList.scrollLeft + step, 0)
    if (e.clientX > xPosition) cardList.scrollTo(cardList.scrollLeft - step, 0)
    xPosition = e.clientX
  }
}

function handleFirstClick(e) {
  pressing = true
  xPosition = e.clientX
}

cardList.innerHTML = cards.join('')
cardList.addEventListener('mousemove', handleDragging)
cardList.addEventListener('mousedown', handleFirstClick)
cardList.addEventListener('mouseup', () => (pressing = false))
cardList.addEventListener('mouseleave', () => (pressing = false))
