const endPoint =
  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'
const cities = []

fetch(endPoint)
  .then((response) => response.json())
  .then((jsonResponse) => {
    cities.push(...jsonResponse)
  })

window.addEventListener('load', function () {
  const cityInput = document.querySelector('.search-input')
  const resultList = document.querySelector('.result-list')
  const resultCount = document.querySelector('.result-count')

  cityInput.addEventListener('keyup', function () {
    const regex = new RegExp(this.value, 'gi')
    let matches = []

    if (!this.value) {
      resultList.innerHTML = ''
      resultCount.innerHTML = ''
      return
    }

    matches = cities.filter(({ city, state }) => {
      return city.match(regex) || state.match(regex)
    })

    const htmlElements = matches
      .map((place) => {
        const { city, state } = place
        const match = '$&'
        const cityHighlight = city.replace(regex, createHighlight(match))
        const stateHighlight = state.replace(regex, createHighlight(match))
        return createCityElement({ cityHighlight, stateHighlight, ...place })
      })
      .join('')

    resultCount.innerHTML = createResultCountElement(matches.length)
    resultList.innerHTML = htmlElements
  })
})

function createResultCountElement(numberOfMatches) {
  return `<p>Results: ${numberOfMatches}</p>`
}

function createHighlight(match) {
  return `<span class="highlight">${match}</span>`
}

function formatWithCommas(numberToFormat) {
  return Number(numberToFormat).toLocaleString()
}

function createCityElement({ cityHighlight, stateHighlight, ...place }) {
  return `
    <li class="result-item">
      <div class="result-title" onclick="this.parentElement.classList.toggle('active')">
        <p class="city-title">${cityHighlight}, ${stateHighlight}</p>
        <p class="city-population">${formatWithCommas(place.population)}</p>
      </div>

      <ul class="city-details">
        <li class="detail">
          <span class="detail-title">City: </span>
          <span class="detail-content">${place.city}</span>
        </li>
        <li class="detail">
          <span class="detail-title">State: </span>
          <span class="detail-content">${place.state}</span>
        </li>
        <li class="detail">
          <span class="detail-title">Population: </span>
          <span class="detail-content">${formatWithCommas(
            place.population
          )}</span>
        </li>
        <li class="detail">
          <span class="detail-title">Latitude: </span>
          <span class="detail-content">${place.latitude}</span>
        </li>
        <li class="detail">
          <span class="detail-title">Longitude: </span>
          <span class="detail-content">${place.longitude}</span>
        </li>
      </ul>
    </li>`
}
