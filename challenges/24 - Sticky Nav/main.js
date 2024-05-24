const header = document.querySelector('header')
const content = document.querySelector('.content')
const headerDistanceFromTop = header.offsetTop

function handleScroll() {
  if (window.scrollY >= headerDistanceFromTop) {
    header.classList.add('fixed')
    content.style.marginTop = `${header.offsetHeight}px`
  } else {
    content.style.marginTop = 0
    header.classList.remove('fixed')
  }
}

window.addEventListener('scroll', handleScroll)
