document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const width = 8
  const fullBoardSize = width * width
  const squares = []
  const scoreDisplay = document.getElementById('score')
  const timerDisplay = document.getElementById('timer')
  const timerBoard = document.querySelector('.timerboard')
  const bgImage = new Image()
  const startButton = document.getElementById('startButton')
  bgImage.src = 'images/cloud-background.jpg'
  // document.getElementsByTagName('body')[0].style.backgroundImage = "url('images/cloud-background.jpg')"


  timerDisplay.innerHTML = '1:00'



  let score = 0

  let startMatchChecking
  let startCountDown
  let gameStarted = false

  const candyColors = [
    'url(images/dragon-candy.png)',
    'url(images/pumpkin-candy.png)',
    'url(images/purple-teeth.png)',
    'url(images/cup-candy.png)',
    'url(images/skull-candy.png)',
    'url(images/worm-candy.png)'
  ]

  //Load background image




  function makeCandyDraggable() {
    squares.forEach(square => {
      square.setAttribute('draggable', true)
    })
  }

  function makeBoardNotDraggable() {
    squares.forEach(square => square.setAttribute('draggable', false))
  }

  const stopBounce = () => {
    timerBoard.style.animation = 'bounce 0.5s'
  }


  const startGame = () => {
    startButton.style.animation ='click 0.2s'
    timerBoard.style.animation = ''
    timerBoard.addEventListener('click', stopBounce)
    gameStarted = true
    score = 0
    scoreDisplay.innerHTML = 0
    timerBoard.style.animation = ''
    makeCandyDraggable()
    countDown()
    startMatchChecking = window.setInterval(function () {
      checkForAllMatches()
    }, 100)

  }

  startButton.addEventListener('click',startGame)
    
    

  const stopGame = () => {
    startButton.style.animation =''
    gameStarted = false
    timerBoard.style.animation = 'bounce 0.5s infinite'
    clearInterval(startCountDown)
    clearInterval(startMatchChecking)
    makeBoardNotDraggable()
  }


  const countDown = () => {
    let seconds = 59
    startCountDown = window.setInterval(function () {
      seconds = seconds - 1
      if (seconds < 0) {
        //stop countdown
        stopGame()
        timerDisplay.innerHTML = '0:00'
        return timerDisplay
      }

      if (seconds < 10) {
        timerDisplay.innerHTML = `0:0${seconds}`
        return timerDisplay
      }
      timerDisplay.innerHTML = `0:${seconds}`
      return timerDisplay
    }, 1000)
  }




  // find matches per row
  const columnMatchesForEight = () => {
    for (let i = 0; i < fullBoardSize; i++) {
      const rowToCheck = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7]
      const decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''

      if (i % 8 > 0) continue

      if (rowToCheck.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        if (gameStarted) score += rowToCheck.length
        scoreDisplay.innerHTML = score
        // rowToCheck.forEach(index => {squares[index].style.backgroundImage = ''})
        rowToCheck.forEach(index => {
          squares[index].classList.add('square')

          //    squares[index].style.backgroundImage = ''
        })
        rowToCheck.forEach(index => {
          squares[index].addEventListener('animationend', removeBackgroundImage)
        })

      }

    }
  }


  const removeBackgroundImage = (element) => {
    element.target.style.backgroundImage = ''
    element.target.classList.remove('square')
    setTheBoard()
  }


  const checkRowForSeven = () => {
    for (let i = 0; i < fullBoardSize - 6; i++) {
      const rowToCheck = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6]
      const decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''

      if (i % 8 > 1) continue

      if (rowToCheck.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        if (gameStarted) score += rowToCheck.length
        scoreDisplay.innerHTML = score
        // rowToCheck.forEach(index => {squares[index].style.backgroundImage = ''})
        rowToCheck.forEach(index => {
          squares[index].classList.add('square')

          //    squares[index].style.backgroundImage = ''
        })
        rowToCheck.forEach(index => {
          squares[index].addEventListener('animationend', removeBackgroundImage)
        })

      }

    }
  }

  const checkRowForSix = () => {
    for (let i = 0; i < fullBoardSize - 5; i++) {
      const rowToCheck = [i, i + 1, i + 2, i + 3, i + 4, i + 5]
      const decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''

      if (i % 8 > 2) continue

      if (rowToCheck.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        if (gameStarted) score += rowToCheck.length
        scoreDisplay.innerHTML = score
        // rowToCheck.forEach(index => {squares[index].style.backgroundImage = ''})
        rowToCheck.forEach(index => {
          squares[index].classList.add('square')

          //    squares[index].style.backgroundImage = ''
        })
        rowToCheck.forEach(index => {
          squares[index].addEventListener('animationend', removeBackgroundImage)
        })

      }

    }
  }
  const checkRowForFive = () => {
    for (let i = 0; i < fullBoardSize - 4; i++) {
      const rowToCheck = [i, i + 1, i + 2, i + 3, i + 4]
      const decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''

      if (i % 8 > 3) continue

      if (rowToCheck.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        if (gameStarted) score += rowToCheck.length
        scoreDisplay.innerHTML = score
        // rowToCheck.forEach(index => {squares[index].style.backgroundImage = ''})
        rowToCheck.forEach(index => {
          squares[index].classList.add('square')

          //    squares[index].style.backgroundImage = ''
        })
        rowToCheck.forEach(index => {
          squares[index].addEventListener('animationend', removeBackgroundImage)
        })

      }

    }
  }

  const checkRowForFour = () => {
    for (let i = 0; i < fullBoardSize - 3; i++) {
      const rowToCheck = [i, i + 1, i + 2, i + 3]
      const decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''

      if (i % 8 > 4) continue

      if (rowToCheck.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        if (gameStarted) score += rowToCheck.length
        scoreDisplay.innerHTML = score
        // rowToCheck.forEach(index => {squares[index].style.backgroundImage = ''})
        rowToCheck.forEach(index => {
          squares[index].classList.add('square')

          //    squares[index].style.backgroundImage = ''
        })
        rowToCheck.forEach(index => {
          squares[index].addEventListener('animationend', removeBackgroundImage)
        })

      }

    }
  }




  // Find Matches Per Column

  const checkColumnForThree = () => {
    for (let i = 0; i < fullBoardSize - width * 2; i++) {
      const columnToCheck = [i, i + width, i + width * 2]
      const decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''

      if (columnToCheck.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        if (gameStarted) score += columnToCheck.length
        scoreDisplay.innerHTML = score
        // columnToCheck.forEach(index =>{
        //     squares[index].style.backgroundImage=''
        // })
        columnToCheck.forEach(index => {
          squares[index].classList.add('square')

          //    squares[index].style.backgroundImage = ''
        })
        columnToCheck.forEach(index => {
          squares[index].addEventListener('animationend', removeBackgroundImage)
        })
      }
    }

  }

  const checkColumnForFour = () => {
    for (let i = 0; i < fullBoardSize - width * 3; i++) {
      const columnToCheck = [i, i + width, i + width * 2, i + width * 3]
      const decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''

      if (columnToCheck.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        if (gameStarted) score += columnToCheck.length
        scoreDisplay.innerHTML = score
        // columnToCheck.forEach(index =>{
        //     squares[index].style.backgroundImage=''
        // })
        columnToCheck.forEach(index => {
          squares[index].classList.add('square')

          //    squares[index].style.backgroundImage = ''
        })
        columnToCheck.forEach(index => {
          squares[index].addEventListener('animationend', removeBackgroundImage)
        })
      }
    }

  }

  const checkColumnForFive = () => {
    for (let i = 0; i < fullBoardSize - width * 4; i++) {
      const columnToCheck = [i, i + width, i + width * 2, i + width * 3, i + width * 4]
      const decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''

      if (columnToCheck.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        if (gameStarted) score += columnToCheck.length
        scoreDisplay.innerHTML = score
        // columnToCheck.forEach(index =>{
        //     squares[index].style.backgroundImage=''
        // })
        columnToCheck.forEach(index => {
          squares[index].classList.add('square')

          //    squares[index].style.backgroundImage = ''
        })
        columnToCheck.forEach(index => {
          squares[index].addEventListener('animationend', removeBackgroundImage)
        })
      }
    }

  }
  const checkColumnForSix = () => {
    for (let i = 0; i < fullBoardSize - width * 5; i++) {
      const columnToCheck = [i, i + width, i + width * 2, i + width * 3, i + width * 4, i + width * 5]
      const decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''

      if (columnToCheck.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        if (gameStarted) score += columnToCheck.length
        scoreDisplay.innerHTML = score
        // columnToCheck.forEach(index =>{
        //     squares[index].style.backgroundImage=''
        // })
        columnToCheck.forEach(index => {
          squares[index].classList.add('square')

          //    squares[index].style.backgroundImage = ''
        })
        columnToCheck.forEach(index => {
          squares[index].addEventListener('animationend', removeBackgroundImage)
        })
      }
    }

  }
  const checkColumnForSeven = () => {
    for (let i = 0; i < fullBoardSize - width * 6; i++) {
      const columnToCheck = [i, i + width, i + width * 2, i + width * 3, i + width * 4, i + width * 5, i + width * 6]
      const decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''

      if (columnToCheck.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        if (gameStarted) score += columnToCheck.length
        scoreDisplay.innerHTML = score
        // columnToCheck.forEach(index =>{
        //     squares[index].style.backgroundImage=''
        // })
        columnToCheck.forEach(index => {
          squares[index].classList.add('square')

          //    squares[index].style.backgroundImage = ''
        })
        columnToCheck.forEach(index => {
          squares[index].addEventListener('animationend', removeBackgroundImage)
        })
      }
    }

  }

  const checkColumnForEight = () => {
    for (let i = 0; i < fullBoardSize - width * 7; i++) {
      const columnToCheck = [i, i + width, i + width * 2, i + width * 3, i + width * 4, i + width * 5, i + width * 6, i + width * 7]
      const decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''

      if (columnToCheck.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        if (gameStarted) score += columnToCheck.length
        scoreDisplay.innerHTML = score
        // columnToCheck.forEach(index =>{
        //     squares[index].style.backgroundImage=''
        // })
        columnToCheck.forEach(index => {
          squares[index].classList.add('square')

          //    squares[index].style.backgroundImage = ''
        })
        columnToCheck.forEach(index => {
          squares[index].addEventListener('animationend', removeBackgroundImage)
        })
      }
    }

  }


  //dag the candies

  let colorBeingDragged
  let colorBeingReplaced
  let squareIdBeingDragged
  let squareIdbeingReplaced

  const dragStart = (element) => {
    colorBeingDragged = element.target.style.backgroundImage
    squareIdBeingDragged = parseInt(element.target.id)
  }

  const dragOver = (element) => {
    element.preventDefault()
  }

  const dragEnter = (element) => {
    element.preventDefault()

  }

  const isValidMove = () => {
    const validMoves = [squareIdBeingDragged - 1, squareIdBeingDragged - width, squareIdBeingDragged + 1, squareIdBeingDragged + width]
    return validMoves.includes(squareIdbeingReplaced)
  }


  const dragEnd = () => {
    const validMove = isValidMove()
    if (squareIdbeingReplaced && validMove) {
      squareIdbeingReplaced = null
    } else if (squareIdbeingReplaced && !validMove) {
      squares[squareIdbeingReplaced].style.backgroundImage = colorBeingReplaced
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
    } else {
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
    }

  }

  const dragDrop = (element) => {
    if (!gameStarted) {
      return
    }
    colorBeingReplaced = element.target.style.backgroundImage //yellow
    squareIdbeingReplaced = parseInt(element.target.id) //2

    const validMove = isValidMove()

    if (!validMove) {
      squares[squareIdbeingReplaced].style.backgroundImage = colorBeingReplaced
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
      return
    }
    element.target.style.backgroundImage = colorBeingDragged //
    element.target.id = squareIdbeingReplaced
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced



    //Fill the board and check for matches if there is an empty square
    setTheBoard()

  }



  const checkRowForThree = () => {
    for (let i = 0; i < fullBoardSize - 2; i++) {
      if (i % 8 > 5) continue
      const rowToCheck = [i, i + 1, i + 2]
      const decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''


      if (rowToCheck.every(index => (squares[index].style.backgroundImage === decidedColor && !isBlank))) {
        if (gameStarted) score += rowToCheck.length
        scoreDisplay.innerHTML = score


        rowToCheck.forEach(index => {

          squares[index].classList.add('square')

        })
        rowToCheck.forEach(index => {
          squares[index].addEventListener('animationend', removeBackgroundImage)
        })

      }

    }

  }



  const checkForAllMatches = () => {
    columnMatchesForEight()
    checkColumnForEight()
    checkColumnForSeven()
    checkRowForSeven()
    checkRowForSix()
    checkColumnForSix()
    checkRowForFive()
    checkColumnForFive()
    checkColumnForFour()
    checkRowForFour()
    checkRowForThree()
    checkColumnForThree()
  }

  const resetBoard = () => {
    let isBoardFull = false
    window.setInterval(function () {
      checkForAllMatches()
    }, 100)

    do {
      moveDown()
      isBoardFull = squares.every(square => square.style.backgroundImage !== '')
    } while (isBoardFull === false)


  }

  // drop candies onces some have been cleard 
  const moveDown = () => {
    const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
    const lastRow = [56, 57,58,59,60,61,62,63]
    for (let i = 0; i < 56; i++) {
      const isFirstRow = firstRow.includes(i)
      const isLastRow = lastRow.includes(i)

      if (!isLastRow && squares[i + width].style.backgroundImage === '') {
        squares[i + width].style.backgroundImage = squares[i].style.backgroundImage

        squares[i].style.backgroundImage = ''
      }

      if (isFirstRow && squares[i].style.backgroundImage === '') {
        const randomColor = Math.floor(Math.random() * candyColors.length)
        squares[i].style.backgroundImage = candyColors[randomColor]
      }

    }

  }

  const setTheBoard = () => {
    let isBoardFull = false

    do {
      moveDown()
      isBoardFull = squares.every(square => square.style.backgroundImage !== '')
    } while (isBoardFull === false)

  }



  //create board
  function createBoard() {
    for (let i = 0; i < fullBoardSize; i++) {
      const square = document.createElement('div')
      square.setAttribute('id', i)
      const randomColor = Math.floor(Math.random() * candyColors.length)
      square.style.backgroundImage = candyColors[randomColor]
      grid.appendChild(square)
      squares.push(square)
    }
    // setTheBoard()
    resetBoard()

    //setscore to zero
    score = 0
    scoreDisplay.innerHTML = score

  }

  createBoard()



  //Drag the candies
  squares.forEach(square => square.addEventListener('dragstart', dragStart))
  squares.forEach(square => square.addEventListener('dragover', dragOver))
  squares.forEach(square => square.addEventListener('dragenter', dragEnter))
  squares.forEach(square => square.addEventListener('dragend', dragEnd))
  squares.forEach(square => square.addEventListener('drop', dragDrop))




})