const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const link = document.getElementById('download')

canvas.width = window.innerWidth
canvas.height = window.innerHeight
context.lineJoin = 'round'
context.lineCap = 'round'
context.fillStyle = 'white'
context.fillRect(0, 0, canvas.width, canvas.height)

let isPressed = false

const line = {
  minWidth: 0,
  currentWidth: 100,
  maxWidth: 100,
  widthStep: 0,
  colorStep: 0,
  initialX: 0,
  initialY: 0,
  direction: 1,
}

function handleDraw({ offsetX, offsetY }) {
  if (isPressed) {
    if (line.currentWidth === line.maxWidth) line.direction = -1
    if (line.currentWidth === line.minWidth) line.direction = 1

    context.strokeStyle = `hsl(${line.colorStep}deg 100% 50%)`
    context.lineWidth = line.currentWidth

    context.beginPath()
    context.moveTo(line.initialX, line.initialY)
    context.lineTo(offsetX, offsetY)
    context.stroke()

    line.currentWidth = line.currentWidth + line.direction
    line.colorStep++
    line.widthStep++
    setNewLinePosition({ offsetX, offsetY })
  }
}

const handlePressed = ({ offsetX, offsetY }) => {
  isPressed = true
  setNewLinePosition({ offsetX, offsetY })
}

function setNewLinePosition({ offsetX, offsetY }) {
  line.initialX = offsetX
  line.initialY = offsetY
}

canvas.addEventListener('mousemove', handleDraw)
canvas.addEventListener('mousedown', handlePressed)
canvas.addEventListener('mouseup', () => (isPressed = false))
canvas.addEventListener('mouseout', () => (isPressed = false))

canvas.addEventListener('touchmove', handleDraw)
canvas.addEventListener('touchstart', handlePressed)
canvas.addEventListener('touchend', () => (isPressed = false))

function downloadImage(e) {
  this.href = canvas.toDataURL('image/jpeg', 1.0)
  this.download = 'untitled.jpg'
}

link.addEventListener('click', downloadImage)
