const videosContainer = document.querySelector('.videos')
const videosHeader = document.querySelector('.header')
const changeButton = document.querySelector('.change-view')
const videosDuration = document.querySelector('.duration')
const videos = []

async function getData(url) {
  const data = await fetch(url)
  const response = await data.json()
  videos.push(...response)
}

function createVideoElements(videos) {
  return videos
    .map((video, index) => {
      return `
        <div class="video" data-time="${video.duration}">
          <div class="thumbnail">
            <img src="./img/course-${index + 1}.png" class="video-image">
            <span class="video-time">${video.duration}</span>
          </div>
          <div class="video-info">
            <div class="video-header">
              <h1 class="video-title">${video.title}</h1>
              <p class="video-author">${video.author}</p>
              <p class="video-description">${video.description}</p>
            </div>
            <div class="footer">
              <p class="video-views">${video.views} views</p>
              <p class="video-date">${video.date_posted}</p>
            </div>
          </div>
        </div>
      `
    })
    .join('')
}

function changeVisualization() {
  if (changeButton.classList.contains('list')) {
    changeButton.classList.remove('list')
    changeButton.classList.add('grid')
  } else {
    changeButton.classList.remove('grid')
    changeButton.classList.add('list')
  }

  videosContainer.classList.toggle('horizontal')
}

function getVideosDuration() {
  const videosEl = Array.from(document.querySelectorAll('[data-time]'))
  let durationInSeconds = videosEl.reduce((total, atual) => {
    const time = atual.dataset.time
    let [minutes, seconds] = time.split(':').map(Number)

    return (total += minutes * 60 + seconds)
  }, 0)

  let hours = Math.floor(durationInSeconds / 3600)
  let minutes = Math.floor((durationInSeconds % 3600) / 60)
  let seconds = durationInSeconds % 60

  hours = String(hours).padStart(2, '0')
  minutes = String(minutes).padStart(2, '0')
  seconds = String(seconds).padStart(2, '0')

  return `${hours}:${minutes}:${seconds}`
}

window.addEventListener('load', async function () {
  await getData('data.json')
  const videoElements = createVideoElements(videos)

  videosContainer.innerHTML = videoElements
  videosDuration.innerHTML = getVideosDuration()
  changeButton.addEventListener('click', changeVisualization)
})
