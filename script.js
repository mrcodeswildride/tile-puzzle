let squares = document.getElementsByClassName(`square`)
let messageParagraph = document.getElementById(`messageParagraph`)

let gameOver = false
let selectedSquare

randomSetup()

for (let square of squares) {
  square.addEventListener(`click`, clickSquare)
}

function randomSetup() {
  let backgroundPositions = []

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      backgroundPositions.push(`${j * -100}px ${i * -100}px`)
    }
  }

  for (let i = 0; i < 100; i++) {
    let randomNumber1 = Math.floor(Math.random() * backgroundPositions.length)
    let randomNumber2 = Math.floor(Math.random() * backgroundPositions.length)

    let temp = backgroundPositions[randomNumber1]
    backgroundPositions[randomNumber1] = backgroundPositions[randomNumber2]
    backgroundPositions[randomNumber2] = temp
  }

  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundPosition = backgroundPositions[i]
  }
}

function clickSquare() {
  if (!gameOver) {
    if (selectedSquare == null) {
      selectedSquare = this
      selectedSquare.classList.add(`selected`)
    }
    else {
      let temp = selectedSquare.style.backgroundPosition
      selectedSquare.style.backgroundPosition = this.style.backgroundPosition
      this.style.backgroundPosition = temp

      selectedSquare.classList.remove(`selected`)
      selectedSquare = null

      if (isSolved()) {
        messageParagraph.innerHTML = `Good job!`
        gameOver = true
      }
    }
  }
}

function isSolved() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let index = (i * 3) + j
      let correctPosition = `${j * -100}px ${i * -100}px`

      if (squares[index].style.backgroundPosition != correctPosition) {
        return false
      }
    }
  }

  return true
}