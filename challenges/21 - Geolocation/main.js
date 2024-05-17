window.addEventListener('load', () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.watchPosition((position) => {
      handlePosition(position), (error) => console.error('Something went wrong')
    })
  } else {
    alert("Sorry, this device/browser doesn't support this feature")
  }

  function handlePosition({ coords }) {
    const compass = document.querySelector('.compass-icon')
    const speed = document.querySelector('.speed')

    compass.style.transform = `rotate(${coords.heading}deg)`
    speed.textContent = coords.speed || 0
  }
})
