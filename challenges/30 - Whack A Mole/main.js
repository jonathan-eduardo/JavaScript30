const moles = document.querySelectorAll('.mole')
const playButton = document.querySelector('.btn-play')
const difficultyButtons = document.querySelectorAll('.btn-difficulty')
const hitView = document.querySelector('.hits')
const hitAudio = document.querySelector('.hit-audio')

const difficultyLevels = {
  easy: {
    min: 700,
    max: 1000,
  },
  normal: {
    min: 500,
    max: 700,
  },
  hard: {
    min: 300,
    max: 500,
  },
}

hitAudio.volume = 0.5
hitAudio.playbackRate = 1.5

let gameInterval = null
let lastMoleClicked = null
let currentDifficulty = 'normal'
let gameDurationInMilliseconds = 10000

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function toggleMole(mole, milliseconds) {
  mole.classList.add('out')
  setTimeout(() => mole.classList.remove('out'), milliseconds)
}

function getRandomIndex(lastIndex, limit = 6) {
  const index = Math.floor(Math.random() * limit)

  if (lastIndex === index) {
    return getRandomIndex(lastIndex)
  } else {
    return index
  }
}

function toggleButtons(option = false) {
  const buttons = [playButton, ...difficultyButtons]

  buttons.forEach((button) => {
    button.disabled = option
  })
}

function start() {
  toggleButtons(true)
  clearInterval(gameInterval)

  let finished = false
  let lastIndex = null

  const { min, max } = difficultyLevels[currentDifficulty]
  const milliseconds = getRandomNumber(min, max)
  const delay = 150

  hitView.textContent = 0
  this.textContent = 'Go!'

  gameInterval = setInterval(() => {
    if (finished) {
      toggleButtons(false)
      this.textContent = 'Play'

      return
    }

    const index = getRandomIndex(lastIndex)
    const currentMole = moles[index]
    lastIndex = index
    toggleMole(currentMole, getRandomNumber(min, max))
  }, milliseconds + delay)

  setTimeout(() => {
    finished = true
  }, gameDurationInMilliseconds)
}

function handleClick(e) {
  if (lastMoleClicked === this || !e.isTrusted) return

  hitAudio.currentTime = 0
  hitAudio.play()
  hitView.textContent = Number(hitView.textContent) + 1
  this.classList.remove('out')
  lastMoleClicked = this
}

function handleDifficulty() {
  const activeButton = document.querySelector('.btn-active')
  if (activeButton) activeButton.classList.remove('btn-active')

  this.classList.add('btn-active')
  currentDifficulty = this.textContent
}

moles.forEach((mole) => {
  mole.addEventListener('click', handleClick)
})

difficultyButtons.forEach((button) =>
  button.addEventListener('click', handleDifficulty)
)

playButton.addEventListener('click', start)
