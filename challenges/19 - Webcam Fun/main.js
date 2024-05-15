const photos = []
const video = document.getElementById('video')
const takePhotoButton = document.getElementById('take-photo')
const toggleCameraButton = document.getElementById('toggle-camera')
const toggleRedEffectButton = document.getElementById('toggle-red')
const toggleRgbButton = document.getElementById('toggle-rgb')
const removeEffectsButton = document.getElementById('remove-effects')
const webcamScreen = document.getElementById('webcam-screen')
const photosList = document.getElementById('webcam-photos')
const videoCanvas = document.getElementById('video-canvas')
const snap = document.getElementById('snap-audio')
const context = videoCanvas.getContext('2d', { willReadFrequently: true })

function startWebcam() {
  getMedia(video, 'video')
  video.addEventListener('canplay', drawOnCanvas)
  let effect = null

  function drawOnCanvas() {
    const width = video.videoWidth
    const height = video.videoHeight
    videoCanvas.width = width
    videoCanvas.height = height

    context.translate(videoCanvas.width, 0)
    context.scale(-1, 1)
    setInterval(() => {
      context.drawImage(video, 0, 0, width, height)
      let pixels = context.getImageData(0, 0, width, height)
      pixels = effects.greenScreen(pixels)

      if (effect) pixels = effects[effect](pixels)

      context.putImageData(pixels, 0, 0)
    }, 16)
  }

  video.addEventListener('play', () => {
    webcamScreen.classList.add('active')
    toggleCameraButton.classList.add('active')
  })

  toggleCameraButton.addEventListener('click', async () => {
    webcamScreen.classList.toggle('active')
    toggleCameraButton.classList.toggle('active')
  })

  takePhotoButton.addEventListener('click', () => {
    if (webcamScreen.classList.contains('active')) {
      takePhoto()
    }
  })

  toggleRedEffectButton.addEventListener('click', () => (effect = 'redEffect'))
  toggleRgbButton.addEventListener('click', () => (effect = 'rgbSplit'))
  removeEffectsButton.addEventListener('click', () => (effect = null))
}

async function getMedia(media, type) {
  const options = { [type]: true }

  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia(options)
    media.srcObject = mediaStream
    media.play()
  } catch (error) {
    console.error(`Error ${error}`)
  }
}

function takePhoto() {
  playAudio()
  const photoSrc = videoCanvas.toDataURL('image/png')
  photos.push(photoSrc)
  updatePhotos()
}

function playAudio() {
  snap.currentTime = 0
  snap.play()
}

function updatePhotos() {
  photosList.innerHTML = createPhotoElements()
  photosList.parentElement.classList.add('has-photos')
}

function createPhotoElements() {
  const photoElements = photos.map((src) => {
    return `
      <li class="photo">
        <a href="${src}" download="screenshot" class="link">
          <img
            src="${src}"
            alt="Webcam Screenshot"
            class="photo-screenshot"
            id="photo"
          />
          <span class="photo-download-icon icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
          >
            <path
              fill="#fff"
              d="m12 16-5-5 1.4-1.45 2.6 2.6V4h2v8.15l2.6-2.6L17 11l-5 5Zm-6 4c-.55 0-1.02-.196-1.412-.587A1.93 1.93 0 0 1 4 18v-3h2v3h12v-3h2v3c0 .55-.196 1.021-.587 1.413A1.92 1.92 0 0 1 18 20H6Z"
            />
          </svg>
        </span>
        </a>
        <canvas id="canvas" class="canvas"></canvas>
        
      </li>
      `
  })
  return photoElements.join('')
}

const effects = {
  redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
      const red = i + 0
      const green = i + 1
      const blue = i + 2

      pixels.data[red] = pixels.data[red] + 200
      pixels.data[green] = pixels.data[green] - 50
      pixels.data[blue] = pixels.data[blue] * 0.5
    }

    return pixels
  },
  rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
      pixels.data[i - 150] = pixels.data[i + 0] // R
      pixels.data[i + 500] = pixels.data[i + 1] // G
      pixels.data[i - 550] = pixels.data[i + 2] // B
    }
    return pixels
  },
  greenScreen(pixels) {
    const levels = {}

    document.querySelectorAll('input[type="range"]').forEach((input) => {
      const { value, max } = input
      const labelElement = input.parentElement.querySelector('.value')
      const labelValue = Math.floor((Number(value) / Number(max)) * 100)
      levels[input.name] = value
      labelElement.textContent = `${Math.floor(labelValue)}%`
    })

    for (i = 0; i < pixels.data.length; i = i + 4) {
      red = pixels.data[i + 0]
      green = pixels.data[i + 1]
      blue = pixels.data[i + 2]
      alpha = pixels.data[i + 3]

      if (
        red >= levels['red-min'] &&
        green >= levels['green-min'] &&
        blue >= levels['blue-min'] &&
        red <= levels['red-max'] &&
        green <= levels['green-max'] &&
        blue <= levels['blue-max']
      ) {
        pixels.data[i + 3] = 0
      }
    }

    return pixels
  },
}

window.addEventListener('load', startWebcam)
