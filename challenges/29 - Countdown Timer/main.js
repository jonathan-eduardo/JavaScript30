const timerButtons = document.querySelector('.timer-buttons')
const buttons = timerButtons.querySelectorAll('.btn')
const display = document.querySelector('.display')
const displayTimer = display.querySelector('.timer')
const displayTimerEnd = display.querySelector('.timer-end')
const customTimer = document.querySelector('.custom-timer')
const userLanguage = navigator.language
let timerInterval = null

function toggleActiveButtons() {
  const activeButton = document.querySelector('.btn-active')
  activeButton && activeButton.classList.remove('btn-active')
}

function updateTimerView(minutes, seconds) {
  seconds = String(seconds).padStart(2, '0')
  const timeRemaining = `${minutes}:${seconds}`
  displayTimer.textContent = timeRemaining
  document.title = timeRemaining
}

function updateEndTime(duration) {
  const totalTime = new Date(Date.now() + duration * 1000)
  const hourOptions = { hour: 'numeric', minute: '2-digit' }
  const endTime = totalTime.toLocaleTimeString(userLanguage, hourOptions)
  displayTimerEnd.textContent = `Be back at ${endTime}`
}

function handleTimer(duration, type, caller) {
  clearInterval(timerInterval)

  let seconds = 0
  let minutes = 0
  let count = 0

  if (type === 'hours') {
    minutes = duration * 60
    duration *= 3600
  } else if (type === 'minutes') {
    minutes = duration
    duration *= 60
  } else {
    seconds = duration
  }

  display.classList.add('active')

  updateEndTime(duration)
  handleInterval()

  function handleInterval() {
    updateTimerView(minutes, seconds)

    if (count === duration) {
      caller && caller.classList.remove('btn-active')
      display.classList.remove('active')

      clearInterval(timerInterval)
      return
    }

    if (seconds === 0) {
      seconds = 60
      minutes = minutes > 0 ? minutes - 1 : minutes
    }

    seconds--
    count++
  }

  timerInterval = setInterval(handleInterval, 1000)
}

function handleButtonClick() {
  const { duration, type } = this.dataset

  if (duration && type) {
    toggleActiveButtons()
    this.classList.add('btn-active')

    handleTimer(Number(duration), type, this)
  }
}

function createTimerButton(duration, type) {
  toggleActiveButtons()

  const btn = document.createElement('button')
  btn.setAttribute('data-duration', duration)
  btn.setAttribute('data-type', type)
  btn.textContent = `${duration} min(s)`
  btn.classList.add('btn', 'btn-active')
  btn.addEventListener('click', handleButtonClick)

  return btn
}

function handleCustomTimer(event) {
  event.preventDefault()

  const timerInput = this.querySelector('.timer-input')
  const duration = Number(timerInput.value)
  const buttonLimit = 18

  if (isNaN(duration) || duration <= 0 || !Number.isInteger(duration)) return

  const type = timerInput.dataset.type
  handleTimer(duration, type)
  timerInput.value = ''

  if (timerButtons.children.length < buttonLimit) {
    const newTimerButton = createTimerButton(duration, type)
    timerButtons.appendChild(newTimerButton)
  }
}

buttons.forEach((button) => {
  button.addEventListener('click', handleButtonClick)
})

customTimer.addEventListener('submit', handleCustomTimer)
