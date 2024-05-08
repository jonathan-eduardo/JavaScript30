const bandContainer = document.querySelector('.band-list')
const sortButton = document.querySelector('.sort-button')
const bandList = [
  'The Plot in You',
  'The Devil Wears Prada',
  'Pierce the Veil',
  'Norma Jean',
  'The Bled',
  'Say Anything',
  'The Midway State',
  'We Came as Romans',
  'Counterparts',
  'Oh, Sleeper',
  'A Skylit Drive',
  'Anywhere But Here',
  'An Old Dog',
]

function createBandList(bands) {
  const bandListElements = bands.map((name) => {
    return `
      <li class="band-item">
        <span class="marker"></span>
        <span class="band-name">${name}</span>
      </li>
    `
  })
  return bandListElements.join('')
}

function removeArticle(bandName) {
  const regex = /^(?:the|a|an)\s\b/i
  return bandName.replace(regex, '')
}

function sortBandList() {
  return bandList.sort((bandA, bandB) => {
    return removeArticle(bandA).localeCompare(removeArticle(bandB))
  })
}

function updateView() {
  bandContainer.innerHTML = createBandList(bandList)
}

window.addEventListener('load', () => {
  sortBandList()
  updateView()
})

sortButton.addEventListener('click', () => {
  bandList.reverse()
  updateView()
})
