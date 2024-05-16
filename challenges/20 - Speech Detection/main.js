window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition

const paragraphs = document.querySelector('.paragraphs')
const copyButton = document.querySelector('.copy-button')
const currentLanguage = document.querySelector('.language')
const recognition = new SpeechRecognition()
const userLanguage = navigator.language
currentLanguage.innerText = userLanguage

paragraph = document.createElement('p')
paragraphs.appendChild(paragraph)

recognition.lang = userLanguage
recognition.interimResults = true
recognition.start()

recognition.addEventListener('result', ({ results }) => {
  const transcript = results[0][0].transcript
  paragraph.textContent = transcript

  if (transcript && copyButton.disabled) {
    copyButton.disabled = false
  }

  if (results[0].isFinal) {
    paragraph = document.createElement('p')
    paragraphs.appendChild(paragraph)
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }
})

recognition.addEventListener('end', recognition.start)

copyButton.addEventListener('click', (event) => {
  copyToClipBoard(paragraphs.innerText)
})

function copyToClipBoard(text) {
  navigator.clipboard.writeText(text).then(() => {
    const buttonText = copyButton.innerText
    copyButton.innerText = 'Copied!'
    copyButton.classList.add('copied')

    setTimeout(() => {
      copyButton.innerText = buttonText
      copyButton.classList.remove('copied')
    }, 500)
  })
}
