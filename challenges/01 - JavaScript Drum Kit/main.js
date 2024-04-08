const audios = document.querySelectorAll('audio')
const volumeView = document.querySelector('.volume-view')
const volumeInput = document.getElementById('volume')
const root = document.documentElement

function getRootVariable(name) {
  return getComputedStyle(root).getPropertyValue(name)
}

function handleKeyPressed(event) {
  let keyName = ''

  if (event.type === 'click') {
    keyName = event.target.dataset.key || event.target.parentElement.dataset.key
  } else {
    keyName = event.key.toUpperCase()
  }

  const key = document.querySelector(`div[data-key="${keyName}"]`)
  const audio = document.querySelector(`audio[data-key="${keyName}"]`)
  const transitionTime = getRootVariable('--transition-time-in-seconds')

  if (!audio) return
  audio.currentTime = 0
  audio.volume = getCurrentVolume()
  audio.play()
  key.classList.add('playing')
  setTimeout(() => {
    key.classList.remove('playing')
  }, transitionTime * 1000)
}

function getCurrentVolume() {
  return Number(volumeInput.value) / 100
}

function updateVolumeView() {
  volumeView.textContent = this.value + '%'
}

document.addEventListener('keydown', handleKeyPressed)
document.addEventListener('click', handleKeyPressed)
volumeInput.addEventListener('input', updateVolumeView)
