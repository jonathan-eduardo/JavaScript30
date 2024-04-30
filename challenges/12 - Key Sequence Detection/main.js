let userSequence = []
let secretCode = 'javascript'

function handleKey({ key }) {
  userSequence.push(key)

  if (userSequence.length > secretCode.length) {
    userSequence.shift()
  }
  if (userSequence.join('') === secretCode) {
    console.log('CONGRATULATIONS!!!')
    cornify_add()
  }
}

window.addEventListener('keydown', handleKey)
