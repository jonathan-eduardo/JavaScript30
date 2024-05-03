// start with strings, numbers and booleans
let age = 26
let ageTwo = age
console.table({ age, ageTwo })
age = 30
console.log('after updating age')
console.table({ age, ageTwo })

let name = 'Bob'
let nameTwo = name
console.table({ name, nameTwo })
name = 'Robert'
console.log('after updating name')
console.table({ name, nameTwo })

// Let's say we have an array
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy']

// and we want to make a copy of it.
let playersCopy = players
console.table({ players, playersCopy })

// You might think we can just do something like this:
playersCopy[3] = 'Ronaldo'

// however what happens when we update that array?
console.log('after updating playersCopy')
console.log('oops, both arrays were updated, this is not what we want')
console.table({ players, playersCopy })

// now here is the problem!

// oh no - we have edited the original array too!

// Why? It's because that is an array reference, not an array copy. They both point to the same array!

// So, how do we fix this? We take a copy instead!

// one way
playersCopy = players.slice()

// or create a new array and concat the old one in
playersCopy = [].concat(players)

// you can also use the js Array()
playersCopy = Array.from(players)

// or use the new ES6 Spread
playersCopy = [...players]

// now when we update it, the original one isn't changed
playersCopy[3] = 'Pelé'
console.log('after updating playersCopy REAL copy')
console.table({ players, playersCopy })

// The same thing goes for objects, let's say we have a person object

// with Objects
const person = {
  name: 'Wes Bos',
  age: 80,
}

// and think we make a copy:
let personCopy = person // <- this is making a reference not a copy as we want

// how do we take a copy instead?
personCopy = Object.assign({}, person)

// And now you can also use spread with objects (ES9).
personCopy = { ...person, speed: 89 }
console.table({ person, personCopy })

// Things to note - this is only 1 level deep - both for Arrays and Objects. lodash has a cloneDeep method, but you should think twice before using it.

const newUser = {
  name: 'John',
  age: 32,
  social: {
    followers: 2300,
    following: 567,
  },
}

const newUserCopy = { ...newUser }
console.log('Now they still look the same, but if we update a deeper property')
console.table({ newUser, newUserCopy })
newUserCopy.social.following = 9999
console.table({ newUser, newUserCopy })
console.log('Now we have a problem at "social.following" property')
