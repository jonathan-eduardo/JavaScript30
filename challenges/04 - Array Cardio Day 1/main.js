// Get your shorts on - this is an array workout!
// ## Array Cardio Day 1

// Some data we can work with

const inventors = [
  { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
  { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
  { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
  { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
  { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
  { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
  { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
  { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
  { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
  { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
  { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
  { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 },
]

const people = [
  'Bernhard, Sandra',
  'Bethea, Erin',
  'Becker, Carl',
  'Bentsen, Lloyd',
  'Beckett, Samuel',
  'Blake, William',
  'Berger, Ric',
  'Beddoes, Mick',
  'Beethoven, Ludwig',
  'Belloc, Hilaire',
  'Begin, Menachem',
  'Bellow, Saul',
  'Benchley, Robert',
  'Blair, Robert',
  'Benenson, Peter',
  'Benjamin, Walter',
  'Berlin, Irving',
  'Benn, Tony',
  'Benson, Leana',
  'Bent, Silas',
  'Berle, Milton',
  'Berry, Halle',
  'Biko, Steve',
  'Beck, Glenn',
  'Bergman, Ingmar',
  'Black, Elk',
  'Berio, Luciano',
  'Berne, Eric',
  'Berra, Yogi',
  'Berry, Wendell',
  'Bevan, Aneurin',
  'Ben-Gurion, David',
  'Bevel, Ken',
  'Biden, Joseph',
  'Bennington, Chester',
  'Bierce, Ambrose',
  'Billings, Josh',
  'Birrell, Augustine',
  'Blair, Tony',
  'Beecher, Henry',
  'Biondo, Frank',
]

// Array.prototype.filter()
// 1. Filter the list of inventors for those who were born in the 1500's
const bornIn1500 = inventors.filter(({ year }) => year > 1499 && year < 1600)
console.log("People who were born in the 1500's")
console.table(bornIn1500)

// Array.prototype.map()
// 2. Give us an array of the inventors first and last names
const fullNames = inventors.map(({ first, last }) => `${first} ${last}`)

console.table('Full names: ')
console.table(fullNames)

// Array.prototype.sort()
// 3. Sort the inventors by birthdate, oldest to youngest
const oldestToYoungest = [...inventors].sort(
  (personA, personB) => personA.year - personB.year
)
console.log('Oldest to youngest inventor: ')
console.table(oldestToYoungest)

// Array.prototype.reduce()
// 4. How many years did all the inventors live all together?
const sumOfYearsLived = inventors.reduce(
  (yearsLived, { passed, year }) => yearsLived + (passed - year),
  0
)
console.log('Sum of years lived by all the inventors: ', sumOfYearsLived)

// 5. Sort the inventors by years lived
const mostToLeastYearsLived = [...inventors]
mostToLeastYearsLived.sort((personA, personB) => {
  const yearsLivedA = personA.passed - personA.year
  const yearsLivedB = personB.passed - personB.year
  return yearsLivedB - yearsLivedA
})
console.log('Inventors who lived the most to the least: ')
console.table(mostToLeastYearsLived)

// 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
const boulevardsLinks = document.querySelectorAll('.mw-category a')
const boulevardsInParis = Array.from(boulevardsLinks)
  .map((link) => link.textContent)
  .filter((boulevardName) => boulevardName.includes('de'))

console.log('Boulevard names: ')
console.table(boulevardsInParis)
// run the above code at "https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris" to see the result

// 7. sort Exercise
// Sort the people alphabetically by last name
const alphabeticallyByLastName = [...people]
alphabeticallyByLastName.sort((personA, personB) => {
  const [lastA, firstA] = personA.split(', ')
  const [lastB, firstB] = personB.split(', ')
  return lastA.localeCompare(lastB)
})
console.log('Names ordered alphabetically by last name: ')
console.table(alphabeticallyByLastName)

// 8. Reduce Exercise
// Sum up the instances of each of these
const data = [
  'car',
  'car',
  'truck',
  'truck',
  'bike',
  'walk',
  'car',
  'van',
  'bike',
  'walk',
  'car',
  'van',
  'car',
  'truck',
]

const instancesSum = data.reduce((vehicles, current) => {
  return {
    ...vehicles,
    [current]: vehicles[current] + 1 || 1,
  }
}, {})
console.table(instancesSum)
