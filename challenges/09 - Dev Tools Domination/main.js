const paragraph = document.querySelector('.paragraph')
paragraph.addEventListener('click', makeGreen)

const dogs = [
  { name: 'Snickers', age: 2 },
  { name: 'hugo', age: 8 },
]

function makeGreen() {
  this.style.color = '#BADA55'
  this.style.fontSize = '4rem'
}

// Regular
console.log('Something')

// Interpolated
const msg = 'coding'
console.log('I love %s, really!', msg)
console.log(`I love ${msg}, really!`)

// Styled
console.log(
  '%cHELLO THERE',
  'font-size: 5rem; color: #212121; background-color: #ffffff; padding: 1rem'
)

// warning!
console.warn('Be careful, something is wrong...')

// Error :|
console.error('oops, something bad happened...')

// Info
console.info('I have no enemies')

// Testing
console.assert(1 + 1 === 3, '1 + 1 must be 2')

// clearing
console.clear()

// Viewing DOM Elements
console.log(paragraph)
console.dir(paragraph)

// Grouping together
dogs.forEach((dog) => {
  console.groupCollapsed(`${dog.name}`)
  console.log(`Dog name: ${dog.name}`)
  console.log(`Dog age: ${dog.age}`)
  console.groupEnd(`${dog.name}`)
})

// counting
console.count('Snickers')
console.count('Snickers')
console.count('hugo')
console.count('hugo')
console.count('Snickers')
console.count('hugo')
console.count('Snickers')
console.count('hugo')
console.count('hugo')
console.count('hugo')
console.count('hugo')
console.count('hugo')
console.count('Snickers')

// timing
console.time('fetching data')
fetch('https://api.github.com/users/jonathan-eduardo')
  .then((response) => response.json())
  .then((json) => {
    console.timeEnd('fetching data')
    console.log(json)
  })

// table
console.table(dogs)
