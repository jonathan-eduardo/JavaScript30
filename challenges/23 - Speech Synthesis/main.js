const speechForm = document.getElementById('speech-form')
const voiceSelect = document.getElementById('voice-select')
const controls = document.querySelectorAll('.control')
const views = Array.from(document.querySelectorAll('.view'))
const textfield = document.getElementById('speech-text')
const playButton = document.querySelector('.play')

let voices = []
let defaultVoice = null

function handleVoices() {
  voices = speechSynthesis.getVoices()

  voices.forEach((voice) => {
    const option = document.createElement('option')
    option.setAttribute('value', voice.name)
    option.innerText = `${voice.name} (${voice.lang})`
    voiceSelect.appendChild(option)

    if (voice.default) defaultVoice = voice.name
  })
}

function handleSubmit(event) {
  event.preventDefault()
  const message = new SpeechSynthesisUtterance(textfield.value)
  const type = event.submitter.id

  if (type === 'stop' && speechSynthesis.speaking) {
    playButton.toggleAttribute('disabled')
    speechSynthesis.cancel()
    return
  }

  if (type === 'play' && message.text && !speechSynthesis.speaking) {
    playButton.toggleAttribute('disabled')

    const pitch = document.getElementById('pitch')
    const rate = document.getElementById('rate')
    const selectedOption = voiceSelect.selectedOptions[0].value || defaultVoice
    const selectedVoice = voices.find((voice) => voice.name === selectedOption)

    message.voice = selectedVoice
    message.pitch = pitch.value
    message.rate = rate.value

    speechSynthesis.speak(message)
  }

  message.addEventListener('end', () => playButton.toggleAttribute('disabled'))
}

function handleControl({ target }) {
  views.map((view) => {
    if (view.dataset.name === target.name) {
      view.textContent = target.value
    }
    return view
  })
}

function autoResizeField() {
  this.style.height = 'auto'
  this.style.height = `${this.scrollHeight}px`
}

speechSynthesis.addEventListener('voiceschanged', handleVoices)
speechForm.addEventListener('submit', handleSubmit)
textfield.addEventListener('input', autoResizeField)
controls.forEach((control) => control.addEventListener('input', handleControl))
