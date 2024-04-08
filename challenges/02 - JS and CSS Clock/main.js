const secondView = document.querySelector('.second')
const minuteView = document.querySelector('.minute')
const hourView = document.querySelector('.hour')
const digitalTimeView = document.querySelector('.digital-time')

function setDate() {
  const now = new Date()
  const seconds = now.getSeconds()
  const minutes = now.getMinutes()
  const hours = now.getHours()
  const digitalTime = now.toLocaleTimeString('en-US', {
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  })

  const secondsDegrees = (seconds / 60) * 360
  const minutesDegrees = (minutes / 60) * 360
  const hoursDegrees = (hours / 12) * 360

  secondView.style.transform = `rotate(${secondsDegrees}deg)`
  minuteView.style.transform = `rotate(${minutesDegrees}deg)`
  hourView.style.transform = `rotate(${hoursDegrees}deg)`
  digitalTimeView.textContent = digitalTime
}

setInterval(setDate, 1000)
