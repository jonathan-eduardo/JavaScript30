const videoPlayer = document.querySelector('.video-player')
const progressBar = document.querySelector('.progress-bar')
const videoControls = document.querySelector('.video-controls')
const playButton = document.querySelector('.play')
const pauseButton = document.querySelector('.pause')
const rewindButton = document.querySelector('.rewind-10')
const forwardButton = document.querySelector('.forward-10')
const volumeInput = document.querySelector('.volume')
const volumeButton = document.querySelector('.volume-button')
const fullscreenButton = document.querySelector('.fullscreen-button')
const speedButton = document.querySelector('.speed-button')
const timeInfo = document.querySelector('.time-info')
const videoWrapper = document.querySelector('.video-wrapper')

let isVideoPlaying = false
let lastVolume = null
let isPressing = false
let videoDurationInMinutes = null

function getProgressWidth(currentTime) {
  return (currentTime / videoPlayer.duration) * 100
}

function showControls() {
  videoControls.classList.add('active')
}

function hideControls() {
  if (!videoPlayer.paused) videoControls.classList.remove('active')
}

function updateCurrentProgress(progress) {
  document.documentElement.style.setProperty('--progress-width', `${progress}%`)
}

function updatePlayIcon() {
  if (!videoPlayer.paused) {
    videoControls.classList.remove('paused')
    videoControls.classList.add('playing')
  } else {
    videoControls.classList.add('paused')
    videoControls.classList.remove('playing')
  }
}

function handlePlay({ keyCode }) {
  if (keyCode && keyCode !== 32) return

  if (!videoDurationInMinutes) {
    videoDurationInMinutes = getVideoTime(videoPlayer.duration)
  }

  if (videoPlayer.paused) {
    videoPlayer.play()
    setTimeout(hideControls, 1000)
  } else {
    videoPlayer.pause()
    showControls()
  }
}

function handleRewind() {
  const seconds = 10
  videoPlayer.currentTime = videoPlayer.currentTime - seconds
}

function handleForward() {
  const seconds = 10
  videoPlayer.currentTime = videoPlayer.currentTime + seconds
}

function handleProgressBar({ offsetX, type }) {
  if (type === 'click' || isPressing) {
    const barSize = (offsetX / videoPlayer.clientWidth) * 100
    const newVideoTime = (barSize / 100) * videoPlayer.duration

    videoPlayer.currentTime = newVideoTime
    updateCurrentProgress(barSize)
    updateVideoTimeInfo()
  }
}

function toggleMute() {
  if (volumeInput.value == 0) {
    volumeInput.value = lastVolume
    videoPlayer.volume = lastVolume
    volumeButton.classList.remove('muted')
  } else {
    lastVolume = volumeInput.value
    volumeInput.value = 0
    videoPlayer.volume = 0
    volumeButton.classList.add('muted')
  }
}

function handleVolume() {
  if (this.name === 'toggle-volume') {
    toggleMute()
  } else {
    videoPlayer.volume = this.value

    if (this.value == 0) {
      volumeButton.classList.add('muted')
    } else {
      volumeButton.classList.remove('muted')
    }
  }
}

function handleSpeed() {
  const rate = videoPlayer.playbackRate
  videoPlayer.playbackRate = rate == 2 ? 0.25 : rate + 0.25
  this.innerText = `${videoPlayer.playbackRate}x`
}

function resetControls() {
  videoControls.classList.remove('playing')
  videoPlayer.playbackRate = 1
  speedButton.innerText = '1x'
}

function getVideoTime(videoSeconds) {
  let hours = Math.floor(videoSeconds / 3600)
  const minutes = String(Math.floor((videoSeconds % 3600) / 60))
  const seconds = String(Math.round(videoSeconds % 60))

  hours = hours ? hours + ':' : ''

  return `${hours}${minutes}:${seconds.padStart(2, '0')}`
}

function updateVideoTimeInfo() {
  timeInfo.innerText = `${getVideoTime(
    videoPlayer.currentTime
  )} / ${videoDurationInMinutes}`
}

videoPlayer.addEventListener('loadeddata', () => {
  videoDurationInMinutes = getVideoTime(videoPlayer.duration)
  updateVideoTimeInfo()
})

videoPlayer.addEventListener('play', updatePlayIcon)
videoPlayer.addEventListener('pause', updatePlayIcon)
videoPlayer.addEventListener('click', handlePlay)
videoPlayer.addEventListener('mouseover', showControls)
videoPlayer.addEventListener('mouseleave', hideControls)
videoPlayer.addEventListener('ended', resetControls)
videoPlayer.addEventListener('timeupdate', () => {
  const currentProgress = getProgressWidth(videoPlayer.currentTime)
  updateCurrentProgress(currentProgress)
  updateVideoTimeInfo()
})

videoControls.addEventListener('mouseover', showControls)
videoControls.addEventListener('mouseleave', hideControls)

playButton.addEventListener('click', handlePlay)
rewindButton.addEventListener('click', handleRewind)
forwardButton.addEventListener('click', handleForward)

progressBar.addEventListener('click', handleProgressBar)
progressBar.addEventListener('mousemove', handleProgressBar)
progressBar.addEventListener('mousedown', () => (isPressing = true))
progressBar.addEventListener('mouseup', () => (isPressing = false))

volumeInput.addEventListener('input', handleVolume)
volumeButton.addEventListener('click', handleVolume)
speedButton.addEventListener('click', handleSpeed)

fullscreenButton.addEventListener('click', () => {
  if (document.fullscreenElement == videoWrapper) {
    document.exitFullscreen()
  } else {
    videoWrapper.requestFullscreen()
  }
})

document.addEventListener('keydown', handlePlay)
