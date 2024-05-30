const speedControl = document.querySelector('.speed-control')
const video = document.querySelector('.video')

function handleSpeedControl({ offsetY }) {
  const speedElement = this.firstElementChild
  const baseValue = offsetY / this.offsetHeight
  const speedValue = baseValue * 4
  const minValue = 0.2
  if (speedValue >= minValue) {
    const percentage = Math.round(baseValue * 100)
    speedElement.style.height = `${percentage}%`
    speedElement.innerText = `${speedValue.toFixed(1)}x`
    video.playbackRate = Number(speedValue.toFixed(1))
  }
}

speedControl.addEventListener('mousemove', handleSpeedControl)
