const dishes = document.querySelector('.content-dishes')
const dishForm = document.querySelector('.restaurant-form')
const dishesContainer = document.querySelector('.restaurant-content')
const removeAllButton = document.getElementById('dish-remove-all')
const toggleButton = document.getElementById('dish-toggle')

function createDish(dishes = [], singleDish = false) {
  let dishesElement = dishes
    .map((dish, index) => {
      return `
    <li class="content-dish ${!singleDish ? 'slide-in' : ''}">
      <label class="dish-label" for="${dish.id}">
        <input
          type="checkbox"
          name="${dish.id}"
          class="dish-input"
          id="${dish.id}"
          ${dish.checked ? 'checked' : ''}
        />
        ${dish.name}
      </label>
    </li>
  `
    })
    .join('')

  if (singleDish) {
    const wrapperElement = document.createElement('div')
    wrapperElement.innerHTML = dishesElement
    dishesElement = wrapperElement.firstElementChild
  }

  return dishesElement
}

function checkScroll() {
  if (dishesContainer.scrollHeight > document.body.scrollHeight) {
    dishesContainer.scrollTo(0, dishesContainer.scrollHeight)
  }
}

function handleClick(e) {
  if (!e.target.matches('input')) return

  const dishStorage = localStorage.getItem('dishStorage')
  const dishArray = JSON.parse(dishStorage)
  const dishElement = dishArray.find((el) => el.id === e.target.id)
  const dishIndex = dishArray.indexOf(dishElement)

  dishArray[dishIndex].checked = !dishArray[dishIndex].checked
  localStorage.setItem('dishStorage', JSON.stringify(dishArray))
}

function addDish(e) {
  e.preventDefault()
  const targetInput = e.target[0]
  const dishStorage = localStorage.getItem('dishStorage')
  const dishArray = []

  if (!targetInput.value || !targetInput.value.trim()) return

  if (dishStorage) {
    dishArray.push(...JSON.parse(dishStorage))
  }

  const newDishObject = {
    name: targetInput.value,
    checked: false,
    id: `${targetInput.value}-${dishArray.length}`,
  }
  const newDishElement = createDish([newDishObject], true)
  const newDishesStorage = [...dishArray, newDishObject]

  dishes.appendChild(newDishElement)
  localStorage.setItem('dishStorage', JSON.stringify(newDishesStorage))

  setTimeout(() => {
    newDishElement.classList.add('slide-in')
  }, 100)

  checkScroll()
  this.reset()
  targetInput.focus()
}

function updateLocalDishes() {
  const dishStorage = localStorage.getItem('dishStorage')

  if (dishStorage) {
    const dishArray = JSON.parse(dishStorage)
    dishes.innerHTML = createDish(dishArray)
  }
}

function removeAllDishes(e) {
  e.preventDefault()
  localStorage.removeItem('dishStorage')
  dishes.innerHTML = ''
}

function toggleDishes(e) {
  e.preventDefault()
  const dishStorage = localStorage.getItem('dishStorage')
  const dishArray = JSON.parse(dishStorage)

  dishArray.map((item) => (item.checked = !item.checked))
  localStorage.setItem('dishStorage', JSON.stringify(dishArray))

  updateLocalDishes()
}

window.addEventListener('load', updateLocalDishes)
dishForm.addEventListener('submit', addDish)
dishes.addEventListener('click', handleClick)
removeAllButton.addEventListener('click', removeAllDishes)
toggleButton.addEventListener('click', toggleDishes)
