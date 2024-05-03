const images = document.querySelectorAll('.slide-in')

function debounce(func, delayToRun = 75) {
  let timeout

  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), delayToRun)
  }
}

function handleSlide() {
  const { clientHeight } = document.documentElement

  images.forEach((image) => {
    if (image.getBoundingClientRect().top <= clientHeight * 0.7) {
      image.classList.add('animate-slide')
    } else {
      image.classList.remove('animate-slide')
    }
  })
}

window.addEventListener('scroll', debounce(handleSlide))
