function isValidPosition(squareIndex) {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  return 0 <= squareIndex && squareIndex <= 63
=======
    return 0 <= squareIndex && squareIndex <= 63
>>>>>>> dafed93 (restore .json files)
=======
  return 0 <= squareIndex && squareIndex <= 63
>>>>>>> 7819b0a (adding Husky)
=======
=======
>>>>>>> 8aba79a (update package.json)
  return 0 <= squareIndex && squareIndex <= 63
=======
    return 0 <= squareIndex && squareIndex <= 63
>>>>>>> 702f017 (update script)
<<<<<<< HEAD
>>>>>>> 1316244 (restore package.json)
=======
=======
  return 0 <= squareIndex && squareIndex <= 63
>>>>>>> 07d5b01 (add husky integration)
>>>>>>> 8aba79a (update package.json)
=======
  return 0 <= squareIndex && squareIndex <= 63
>>>>>>> 44ed82e (update app.js)
=======
  return 0 <= squareIndex && squareIndex <= 63
=======
    return 0 <= squareIndex && squareIndex <= 63
>>>>>>> 83de04d (fix: logic modification to prevent moves)
>>>>>>> d8547cd (restore .json files to remedy rebase)
}

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
    'url(images/red-candy.png)',
    'url(images/yellow-candy.png)',
    'url(images/orange-candy.png)',
    'url(images/dragon-candy.png)',
    'url(images/green-candy.png)',
    'url(images/blue-candy.png)'
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


<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const startGame = () => {
<<<<<<< HEAD
    startButton.style.animation = 'click 0.2s'
=======
    startButton.style.animation ='click 0.2s'
=======
=======
>>>>>>> d8547cd (restore .json files to remedy rebase)
  const startGame = () => {
    startButton.style.animation = 'click 0.2s'
>>>>>>> 486652c (Husky integration)
>>>>>>> 7819b0a (adding Husky)
=======
  const startGame = () => {
    startButton.style.animation = 'click 0.2s'
>>>>>>> 44ed82e (update app.js)
    timerBoard.style.animation = ''
    timerBoard.addEventListener('click', stopBounce)
    gameStarted = true
    score = 0
    scoreDisplay.innerHTML = 0
    timerBoard.style.animation = ''
    makeCandyDraggable()
    countDown()
<<<<<<< HEAD
<<<<<<< HEAD
    startMatchChecking = window.setInterval(function() {
=======
<<<<<<< HEAD
    startMatchChecking = window.setInterval(function () {
>>>>>>> 7819b0a (adding Husky)
      checkForAllMatches()
    }, 100)
<<<<<<< HEAD

  }

  startButton.addEventListener('click', startGame)


=======
=======
    const startGame = () => {
        startButton.style.animation = 'click 0.2s'
        timerBoard.style.animation = ''
        timerBoard.addEventListener('click', stopBounce)
        gameStarted = true
        score = 0
        scoreDisplay.innerHTML = 0
        timerBoard.style.animation = ""
        makeCandyDraggable()
        countDown()
        startMatchChecking = window.setInterval(function () {
            checkForAllMatches()
        }, 100)
>>>>>>> 83de04d (fix: logic modification to prevent moves)

  }

<<<<<<< HEAD
  startButton.addEventListener('click',startGame)
    
    
>>>>>>> dafed93 (restore .json files)
=======
    startMatchChecking = window.setInterval(function() {
      checkForAllMatches()
    }, 100)
=======
    const startGame = () => {
        startButton.style.animation = 'click 0.2s'
        timerBoard.style.animation = ''
        timerBoard.addEventListener('click', stopBounce)
        gameStarted = true
        score = 0
        scoreDisplay.innerHTML = 0
        timerBoard.style.animation = ""
        makeCandyDraggable()
        countDown()
        startMatchChecking = window.setInterval(function () {
            checkForAllMatches()
        }, 100)
>>>>>>> 83de04d (fix: logic modification to prevent moves)

  }

<<<<<<< HEAD
  startButton.addEventListener('click', startGame)
=======
    startButton.addEventListener('click', startGame)



    const stopGame = () => {
        startButton.style.animation = ''
        gameStarted = false
        timerBoard.style.animation = "bounce 0.5s infinite"
        clearInterval(startCountDown)
        clearInterval(startMatchChecking)
        makeBoardNotDraggable()
    }
>>>>>>> 83de04d (fix: logic modification to prevent moves)


>>>>>>> 44ed82e (update app.js)

  const stopGame = () => {
    startButton.style.animation = ''
    gameStarted = false
    timerBoard.style.animation = 'bounce 0.5s infinite'
    clearInterval(startCountDown)
    clearInterval(startMatchChecking)
    saveHighScore()
    makeBoardNotDraggable()
  }


  const countDown = () => {
    let seconds = 60
    startCountDown = window.setInterval(function() {
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

<<<<<<< HEAD
  const checkColumnForEight = () => {
    for (let i = 0; i < fullBoardSize - width * 7; i++) {
      const columnToCheck = [i, i + width, i + width * 2, i + width * 3, i + width * 4, i + width * 5, i + width * 6, i + width * 7]
      const decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''
=======
    //drag the candies

    let colorBeingDragged
    let colorBeingReplaced
    let squareIdBeingDragged
    let squareIdbeingReplaced
>>>>>>> 83de04d (fix: logic modification to prevent moves)

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

<<<<<<< HEAD
<<<<<<< HEAD
  //drag the candies
=======
<<<<<<< HEAD
=======
    //drag the candies
>>>>>>> 83de04d (fix: logic modification to prevent moves)

  //dag the candies
>>>>>>> dafed93 (restore .json files)
=======
  //drag the candies
>>>>>>> 44ed82e (update app.js)

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
<<<<<<< HEAD
  }

<<<<<<< HEAD
  function isFoundMatching() {
    return hasRowMatching() || hasColumnMatching()
=======
<<<<<<< HEAD
>>>>>>> dafed93 (restore .json files)
  }

  function hasColumnMatching() {
    return isMiddleMatchVertical() || isUpMatch() || isDownMatch()
  }

<<<<<<< HEAD
  function hasRowMatching() {
    return isLeftSideHasMatch() || isRightSideHasMatch() || isMiddleMatchingHorizontal()
  }
=======
=======
    function isFoundMatching() {
        return hasRowMatching() || hasColumnMatching()
=======
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
>>>>>>> 486652c (Husky integration)
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

<<<<<<< HEAD
<<<<<<< HEAD
  //drag the candies
=======
    //drag the candies

>>>>>>> 702f017 (update script)
=======
  //drag the candies
>>>>>>> 07d5b01 (add husky integration)

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
<<<<<<< HEAD

<<<<<<< HEAD
=======
  }

>>>>>>> 44ed82e (update app.js)
  function isFoundMatching() {
    return hasRowMatching() || hasColumnMatching()
  }

  function hasColumnMatching() {
    return isMiddleMatchVertical() || isUpMatch() || isDownMatch()
  }

  function hasRowMatching() {
    return isLeftSideHasMatch() || isRightSideHasMatch() || isMiddleMatchingHorizontal()
  }

  function isMiddleMatchingHorizontal() {
    const squareIndex = squareIdbeingReplaced
    const oneSquareRight = squareIndex + 1
    const oneSquareLeft = squareIndex - 1
    if (isValidPosition(oneSquareRight) && isValidPosition(oneSquareLeft)) {
      if (isSameRow(squareIndex, oneSquareRight) && isSameRow(squareIndex, oneSquareLeft)) {
        const middleImage = squares[squareIdBeingDragged].style.backgroundImage
        const rightImage = squares[oneSquareRight].style.backgroundImage
        const leftImage = squares[oneSquareLeft].style.backgroundImage
        console.log('In middle matching')
        console.log('right image is: ', rightImage)
        console.log('middle image is: ', middleImage)
        console.log('left image is: ', leftImage)
        if (middleImage === rightImage && rightImage === leftImage) {
          return true
        }
      }
    }
    return false
  }

  function isMiddleMatchVertical() {
    const squareIndex = squareIdbeingReplaced
    const oneSquareUp = squareIndex - 8
    const oneSquareDown = squareIndex + 8
    if (isValidPosition(oneSquareUp) && isValidPosition(oneSquareDown)) {
      if (isSameColumn(squareIndex, oneSquareUp) && isSameColumn(squareIndex, oneSquareDown)) {
        const middleImage = squares[squareIdBeingDragged].style.backgroundImage
        const upperImage = squares[oneSquareUp].style.backgroundImage
        const lowerImage = squares[oneSquareDown].style.backgroundImage
        console.log('In middle matching vertical')
        console.log('upper image is: ', upperImage)
        console.log('middle image is: ', middleImage)
        console.log('lower image is: ', lowerImage)
        if (middleImage === upperImage && upperImage === lowerImage) {
          return true
        }
      }
    }
<<<<<<< HEAD
    return false
  }

  function isRightSideHasMatch() {
    const squareIndex = squareIdbeingReplaced
    const oneSquareRight = squareIndex + 1
    const twoSquareRight = squareIndex + 2
    if (isValidPosition(oneSquareRight) && isValidPosition(twoSquareRight)) {
      if (isSameRow(squareIndex, oneSquareRight) && isSameRow(squareIndex, twoSquareRight)) {
        const leftImage = squares[squareIdBeingDragged].style.backgroundImage
        const middleImage = squares[oneSquareRight].style.backgroundImage
        const rightImage = squares[twoSquareRight].style.backgroundImage
        console.log('In right matching')
        console.log('right image is: ', rightImage)
        console.log('middle image is: ', middleImage)
        console.log('left image is: ', leftImage)
        if (leftImage === middleImage && middleImage === rightImage) {
          return true
        }
      }
    }
    return false
  }

  function isUpMatch() {
    const squareIndex = squareIdbeingReplaced
    const oneSquareUp = squareIndex - 8
    const twoSquareUp = squareIndex - 16
    if (isValidPosition(oneSquareUp) && isValidPosition(twoSquareUp)) {
      if (isSameColumn(squareIndex, oneSquareUp) && isSameColumn(squareIndex, twoSquareUp)) {
        const lowerImage = squares[squareIdBeingDragged].style.backgroundImage
        const middleImage = squares[oneSquareUp].style.backgroundImage
        const upperImage = squares[twoSquareUp].style.backgroundImage
        console.log('In up matching')
        console.log('upper image is: ', upperImage)
        console.log('middle image is: ', middleImage)
        console.log('lower image is: ', lowerImage)
        if (lowerImage === middleImage && middleImage === upperImage) {
          return true
=======

    function isFoundMatching() {
        return hasRowMatching() || hasColumnMatching()
    }

    function hasColumnMatching() {
        return isMiddleMatchVertical() || isUpMatch() || isDownMatch()
    }

    function hasRowMatching() {
        return isLeftSideHasMatch() || isRightSideHasMatch() || isMiddleMatchingHorizontal()
    }

    function isMiddleMatchingHorizontal() {
        let squareIndex = squareIdbeingReplaced
        let oneSquareRight = squareIndex + 1
        let oneSquareLeft = squareIndex - 1
        if (isValidPosition(oneSquareRight) && isValidPosition(oneSquareLeft)) {
            if (isSameRow(squareIndex, oneSquareRight) && isSameRow(squareIndex, oneSquareLeft)) {
                let middleImage = squares[squareIdBeingDragged].style.backgroundImage
                let rightImage = squares[oneSquareRight].style.backgroundImage
                let leftImage = squares[oneSquareLeft].style.backgroundImage
                console.log('In middle matching')
                console.log('right image is: ', rightImage)
                console.log('middle image is: ', middleImage)
                console.log('left image is: ', leftImage)
                if (middleImage === rightImage && rightImage === leftImage) {
                    return true
                }
            }
        }
        return false
    }

    function isMiddleMatchVertical() {
        let squareIndex = squareIdbeingReplaced
        let oneSquareUp = squareIndex - 8
        let oneSquareDown = squareIndex + 8
        if (isValidPosition(oneSquareUp) && isValidPosition(oneSquareDown)) {
            if (isSameColumn(squareIndex, oneSquareUp) && isSameColumn(squareIndex, oneSquareDown)) {
                let middleImage = squares[squareIdBeingDragged].style.backgroundImage
                let upperImage = squares[oneSquareUp].style.backgroundImage
                let lowerImage = squares[oneSquareDown].style.backgroundImage
                console.log('In middle matching vertical')
                console.log('upper image is: ', upperImage)
                console.log('middle image is: ', middleImage)
                console.log('lower image is: ', lowerImage)
                if (middleImage === upperImage && upperImage === lowerImage) {
                    return true
                }
            }
        }
        return false
    }

    function isRightSideHasMatch() {
        let squareIndex = squareIdbeingReplaced
        let oneSquareRight = squareIndex + 1
        let twoSquareRight = squareIndex + 2
        if (isValidPosition(oneSquareRight) && isValidPosition(twoSquareRight)) {
            if (isSameRow(squareIndex, oneSquareRight) && isSameRow(squareIndex, twoSquareRight)) {
                let leftImage = squares[squareIdBeingDragged].style.backgroundImage
                let middleImage = squares[oneSquareRight].style.backgroundImage
                let rightImage = squares[twoSquareRight].style.backgroundImage
                console.log('In right matching')
                console.log('right image is: ', rightImage)
                console.log('middle image is: ', middleImage)
                console.log('left image is: ', leftImage)
                if (leftImage === middleImage && middleImage === rightImage) {
                    return true
                }
            }
        }
        return false
    }

    function isUpMatch() {
        let squareIndex = squareIdbeingReplaced
        let oneSquareUp = squareIndex - 8
        let twoSquareUp = squareIndex - 16
        if (isValidPosition(oneSquareUp) && isValidPosition(twoSquareUp)) {
            if (isSameColumn(squareIndex, oneSquareUp) && isSameColumn(squareIndex, twoSquareUp)) {
                let lowerImage = squares[squareIdBeingDragged].style.backgroundImage
                let middleImage = squares[oneSquareUp].style.backgroundImage
                let upperImage = squares[twoSquareUp].style.backgroundImage
                console.log('In up matching')
                console.log('upper image is: ', upperImage)
                console.log('middle image is: ', middleImage)
                console.log('lower image is: ', lowerImage)
                if (lowerImage === middleImage && middleImage === upperImage) {
                    return true
                }
            }
        }
        return false
    }

    function isLeftSideHasMatch() {
        let squareIndex = squareIdbeingReplaced
        let oneSquareLeft = squareIndex - 1
        let twoSquareLeft = squareIndex - 2
        if (isValidPosition(oneSquareLeft) && isValidPosition(twoSquareLeft)) {
            if (isSameRow(squareIndex, oneSquareLeft) && isSameRow(squareIndex, twoSquareLeft)) {
                let rightImage = squares[squareIdBeingDragged].style.backgroundImage
                let middleImage = squares[oneSquareLeft].style.backgroundImage
                let leftImage = squares[twoSquareLeft].style.backgroundImage
                console.log('In left matching')
                console.log('right image is: ', rightImage)
                console.log('middle image is: ', middleImage)
                console.log('left image is: ', leftImage)
                if (leftImage === middleImage && middleImage === rightImage) {
                    return true
                }
            }
        }
        return false
    }

    function isDownMatch() {
        let squareIndex = squareIdbeingReplaced
        let oneSquareDown = squareIndex + 8
        let twoSquareDown = squareIndex + 16
        if (isValidPosition(oneSquareDown) && isValidPosition(twoSquareDown)) {
            if (isSameColumn(squareIndex, oneSquareDown) && isSameColumn(squareIndex, twoSquareDown)) {
                let upperImage = squares[squareIdBeingDragged].style.backgroundImage
                let middleImage = squares[oneSquareDown].style.backgroundImage
                let lowerImage = squares[twoSquareDown].style.backgroundImage
                console.log('In down matching')
                console.log('upper image is: ', upperImage)
                console.log('middle image is: ', middleImage)
                console.log('lower image is: ', lowerImage)
                if (lowerImage === middleImage && middleImage === upperImage) {
                    return true
                }
            }
        }
        return false
    }

    function isSameRow(currentIndex, offsetIndex) {
        let currentIndexRow = Math.floor(currentIndex / 8)
        let offsetIndexRow = Math.floor(offsetIndex / 8)
        return currentIndexRow == offsetIndexRow
    }

    function isSameColumn(currentIndex, offsetIndex) {
        return (currentIndex % 8) == (offsetIndex % 8)
    }

    function isValidMove(event) {
        let validMoves = [squareIdBeingDragged - 1, squareIdBeingDragged - width, squareIdBeingDragged + 1, squareIdBeingDragged + width]
        return validMoves.includes(squareIdbeingReplaced) && isFoundMatching()
    }

    const dragEnd = (event) => {
        console.log('in dragEnd')
        const validMove = isValidMove(event)
        if (squareIdbeingReplaced && validMove) {
            squareIdbeingReplaced = null
        } else if (squareIdbeingReplaced && !validMove) {
            squares[squareIdbeingReplaced].style.backgroundImage = colorBeingReplaced
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
        } else {
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
>>>>>>> 83de04d (fix: logic modification to prevent moves)
        }
      }
    }
<<<<<<< HEAD
    return false
  }

  function isLeftSideHasMatch() {
    const squareIndex = squareIdbeingReplaced
    const oneSquareLeft = squareIndex - 1
    const twoSquareLeft = squareIndex - 2
    if (isValidPosition(oneSquareLeft) && isValidPosition(twoSquareLeft)) {
      if (isSameRow(squareIndex, oneSquareLeft) && isSameRow(squareIndex, twoSquareLeft)) {
        const rightImage = squares[squareIdBeingDragged].style.backgroundImage
        const middleImage = squares[oneSquareLeft].style.backgroundImage
        const leftImage = squares[twoSquareLeft].style.backgroundImage
        console.log('In left matching')
        console.log('right image is: ', rightImage)
        console.log('middle image is: ', middleImage)
        console.log('left image is: ', leftImage)
        if (leftImage === middleImage && middleImage === rightImage) {
          return true
        }
      }
    }
    return false
  }

  function isDownMatch() {
    const squareIndex = squareIdbeingReplaced
    const oneSquareDown = squareIndex + 8
    const twoSquareDown = squareIndex + 16
    if (isValidPosition(oneSquareDown) && isValidPosition(twoSquareDown)) {
      if (isSameColumn(squareIndex, oneSquareDown) && isSameColumn(squareIndex, twoSquareDown)) {
        const upperImage = squares[squareIdBeingDragged].style.backgroundImage
        const middleImage = squares[oneSquareDown].style.backgroundImage
        const lowerImage = squares[twoSquareDown].style.backgroundImage
        console.log('In down matching')
        console.log('upper image is: ', upperImage)
        console.log('middle image is: ', middleImage)
        console.log('lower image is: ', lowerImage)
        if (lowerImage === middleImage && middleImage === upperImage) {
          return true
        }
      }
    }
    return false
  }

  function isSameRow(currentIndex, offsetIndex) {
    const currentIndexRow = Math.floor(currentIndex / 8)
    const offsetIndexRow = Math.floor(offsetIndex / 8)
    return currentIndexRow === offsetIndexRow
  }

  function isSameColumn(currentIndex, offsetIndex) {
    return (currentIndex % 8) === (offsetIndex % 8)
  }

  function isValidMove() {
    const validMoves = [squareIdBeingDragged - 1, squareIdBeingDragged - width, squareIdBeingDragged + 1, squareIdBeingDragged + width]
    return validMoves.includes(squareIdbeingReplaced) && isFoundMatching()
  }

<<<<<<< HEAD
<<<<<<< HEAD
    const dragEnd = (event) => {
        console.log('in dragEnd')
        const validMove = isValidMove(event)
        if (squareIdbeingReplaced && validMove) {
            squareIdbeingReplaced = null
        } else if (squareIdbeingReplaced && !validMove) {
            squares[squareIdbeingReplaced].style.backgroundImage = colorBeingReplaced
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
        } else {
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
        }
>>>>>>> 83de04d (fix: logic modification to prevent moves)
>>>>>>> dafed93 (restore .json files)

  function isMiddleMatchingHorizontal() {
    const squareIndex = squareIdbeingReplaced
    const oneSquareRight = squareIndex + 1
    const oneSquareLeft = squareIndex - 1
    if (isValidPosition(oneSquareRight) && isValidPosition(oneSquareLeft)) {
      if (isSameRow(squareIndex, oneSquareRight) && isSameRow(squareIndex, oneSquareLeft)) {
        const middleImage = squares[squareIdBeingDragged].style.backgroundImage
        const rightImage = squares[oneSquareRight].style.backgroundImage
        const leftImage = squares[oneSquareLeft].style.backgroundImage
        console.log('In middle matching')
        console.log('right image is: ', rightImage)
        console.log('middle image is: ', middleImage)
        console.log('left image is: ', leftImage)
        if (middleImage === rightImage && rightImage === leftImage) {
          return true
        }
      }
    }
    return false
  }

  function isMiddleMatchVertical() {
    const squareIndex = squareIdbeingReplaced
    const oneSquareUp = squareIndex - 8
    const oneSquareDown = squareIndex + 8
    if (isValidPosition(oneSquareUp) && isValidPosition(oneSquareDown)) {
      if (isSameColumn(squareIndex, oneSquareUp) && isSameColumn(squareIndex, oneSquareDown)) {
        const middleImage = squares[squareIdBeingDragged].style.backgroundImage
        const upperImage = squares[oneSquareUp].style.backgroundImage
        const lowerImage = squares[oneSquareDown].style.backgroundImage
        console.log('In middle matching vertical')
        console.log('upper image is: ', upperImage)
        console.log('middle image is: ', middleImage)
        console.log('lower image is: ', lowerImage)
        if (middleImage === upperImage && upperImage === lowerImage) {
          return true
        }
      }
    }
    return false
  }

  function isRightSideHasMatch() {
    const squareIndex = squareIdbeingReplaced
    const oneSquareRight = squareIndex + 1
    const twoSquareRight = squareIndex + 2
    if (isValidPosition(oneSquareRight) && isValidPosition(twoSquareRight)) {
      if (isSameRow(squareIndex, oneSquareRight) && isSameRow(squareIndex, twoSquareRight)) {
        const leftImage = squares[squareIdBeingDragged].style.backgroundImage
        const middleImage = squares[oneSquareRight].style.backgroundImage
        const rightImage = squares[twoSquareRight].style.backgroundImage
        console.log('In right matching')
        console.log('right image is: ', rightImage)
        console.log('middle image is: ', middleImage)
        console.log('left image is: ', leftImage)
        if (leftImage === middleImage && middleImage === rightImage) {
          return true
        }
      }
    }
    return false
  }

  function isUpMatch() {
    const squareIndex = squareIdbeingReplaced
    const oneSquareUp = squareIndex - 8
    const twoSquareUp = squareIndex - 16
    if (isValidPosition(oneSquareUp) && isValidPosition(twoSquareUp)) {
      if (isSameColumn(squareIndex, oneSquareUp) && isSameColumn(squareIndex, twoSquareUp)) {
        const lowerImage = squares[squareIdBeingDragged].style.backgroundImage
        const middleImage = squares[oneSquareUp].style.backgroundImage
        const upperImage = squares[twoSquareUp].style.backgroundImage
        console.log('In up matching')
        console.log('upper image is: ', upperImage)
        console.log('middle image is: ', middleImage)
        console.log('lower image is: ', lowerImage)
        if (lowerImage === middleImage && middleImage === upperImage) {
          return true
        }
      }
    }
    return false
  }

  function isLeftSideHasMatch() {
    const squareIndex = squareIdbeingReplaced
    const oneSquareLeft = squareIndex - 1
    const twoSquareLeft = squareIndex - 2
    if (isValidPosition(oneSquareLeft) && isValidPosition(twoSquareLeft)) {
      if (isSameRow(squareIndex, oneSquareLeft) && isSameRow(squareIndex, twoSquareLeft)) {
        const rightImage = squares[squareIdBeingDragged].style.backgroundImage
        const middleImage = squares[oneSquareLeft].style.backgroundImage
        const leftImage = squares[twoSquareLeft].style.backgroundImage
        console.log('In left matching')
        console.log('right image is: ', rightImage)
        console.log('middle image is: ', middleImage)
        console.log('left image is: ', leftImage)
        if (leftImage === middleImage && middleImage === rightImage) {
          return true
        }
      }
    }
    return false
  }

  function isDownMatch() {
    const squareIndex = squareIdbeingReplaced
    const oneSquareDown = squareIndex + 8
    const twoSquareDown = squareIndex + 16
    if (isValidPosition(oneSquareDown) && isValidPosition(twoSquareDown)) {
      if (isSameColumn(squareIndex, oneSquareDown) && isSameColumn(squareIndex, twoSquareDown)) {
        const upperImage = squares[squareIdBeingDragged].style.backgroundImage
        const middleImage = squares[oneSquareDown].style.backgroundImage
        const lowerImage = squares[twoSquareDown].style.backgroundImage
        console.log('In down matching')
        console.log('upper image is: ', upperImage)
        console.log('middle image is: ', middleImage)
        console.log('lower image is: ', lowerImage)
        if (lowerImage === middleImage && middleImage === upperImage) {
          return true
        }
      }
    }
    return false
  }

  function isSameRow(currentIndex, offsetIndex) {
    const currentIndexRow = Math.floor(currentIndex / 8)
    const offsetIndexRow = Math.floor(offsetIndex / 8)
    return currentIndexRow === offsetIndexRow
  }

<<<<<<< HEAD
  function isSameColumn(currentIndex, offsetIndex) {
    return (currentIndex % 8) === (offsetIndex % 8)
  }

  function isValidMove() {
    const validMoves = [squareIdBeingDragged - 1, squareIdBeingDragged - width, squareIdBeingDragged + 1, squareIdBeingDragged + width]
    return validMoves.includes(squareIdbeingReplaced) && isFoundMatching()
=======
<<<<<<< HEAD
>>>>>>> dafed93 (restore .json files)
  }

=======
>>>>>>> 486652c (Husky integration)
=======
>>>>>>> 44ed82e (update app.js)
  const dragDrop = (element) => {
    if (!gameStarted) {
      return
    }
    colorBeingReplaced = element.target.style.backgroundImage //yellow
    squareIdbeingReplaced = parseInt(element.target.id) //2
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
=======

>>>>>>> d8547cd (restore .json files to remedy rebase)
    const dragDrop = (event) => {
        console.log('in dragDrop ', event)
        if (!gameStarted) {
            return
        }
        colorBeingReplaced = event.target.style.backgroundImage //yellow
        squareIdbeingReplaced = parseInt(event.target.id) //2

        const validMove = isValidMove(event)

        if (!validMove) {
            squares[squareIdbeingReplaced].style.backgroundImage = colorBeingReplaced
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
            return
        }
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced
        squares[squareIdbeingReplaced].style.backgroundImage = colorBeingDragged
>>>>>>> 83de04d (fix: logic modification to prevent moves)

    const validMove = isValidMove()

    if (!validMove) {
      squares[squareIdbeingReplaced].style.backgroundImage = colorBeingReplaced
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
      return
    }
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced
<<<<<<< HEAD
=======
=======
=======
>>>>>>> 44ed82e (update app.js)

    const validMove = isValidMove()

    if (!validMove) {
      squares[squareIdbeingReplaced].style.backgroundImage = colorBeingReplaced
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
      return
    }
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced
>>>>>>> 7819b0a (adding Husky)
    squares[squareIdbeingReplaced].style.backgroundImage = colorBeingDragged


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

<<<<<<< HEAD
  const resetBoard = () => {
    let isBoardFull = false
    window.setInterval(function() {
      checkForAllMatches()
    }, 100)
=======
    // drop candies onces some have been cleard 
    const moveDown = () => {
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
        const lastRow = [56, 57, 58, 59, 60, 61, 62, 63]
        for (let i = 0; i < 56; i++) {
            const isFirstRow = firstRow.includes(i)
            const isLastRow = lastRow.includes(i)
>>>>>>> 83de04d (fix: logic modification to prevent moves)

    do {
      moveDown()
      isBoardFull = squares.every(square => square.style.backgroundImage !== '')
    } while (isBoardFull === false)


  }

  // drop candies onces some have been cleard 
  const moveDown = () => {
    const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
<<<<<<< HEAD
<<<<<<< HEAD
    const lastRow = [56, 57, 58, 59, 60, 61, 62, 63]
=======
<<<<<<< HEAD
    const lastRow = [56, 57,58,59,60,61,62,63]
=======
    const lastRow = [56, 57, 58, 59, 60, 61, 62, 63]
>>>>>>> 486652c (Husky integration)
>>>>>>> 7819b0a (adding Husky)
=======
    const lastRow = [56, 57, 58, 59, 60, 61, 62, 63]
>>>>>>> 44ed82e (update app.js)
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

  // Saving the high score to the local storage
<<<<<<< HEAD
<<<<<<< HEAD
  const saveHighScore = () => {
    const highScore = getHighScore()
    const endScore = document.getElementById('score').textContent
    // Comparing the high Score (if it exists) with the score the user got
    if (highScore === null || parseInt(endScore) > parseInt(highScore)) {
      localStorage.setItem('highScore', endScore)
      displayHighScore()
    }
  }

  // Displaying the high score
  const displayHighScore = () => {
    const highScore = getHighScore()
    document.getElementById('highScore').innerText = highScore === null ? 0 : highScore
=======
<<<<<<< HEAD
  const saveHighScore = () => 
  {
      const highScore = getHighScore()
      const score = document.getElementById("score").textContent
      // Comparing the high Score (if it exists) with the score the user got
      if(highScore === null || parseInt(score) > parseInt(highScore))
      {
          localStorage.setItem("highScore", score)
          displayHighScore()
      }
  }

  // Displaying the high score
  const displayHighScore = () => 
  {
      const highScore = getHighScore()
      document.getElementById("highScore").innerText = highScore === null ? 0 : highScore
=======
=======
>>>>>>> 44ed82e (update app.js)
  const saveHighScore = () => {
    const highScore = getHighScore()
    const endScore = document.getElementById('score').textContent
    // Comparing the high Score (if it exists) with the score the user got
    if (highScore === null || parseInt(endScore) > parseInt(highScore)) {
      localStorage.setItem('highScore', endScore)
      displayHighScore()
    }
  }

  // Displaying the high score
  const displayHighScore = () => {
    const highScore = getHighScore()
    document.getElementById('highScore').innerText = highScore === null ? 0 : highScore
<<<<<<< HEAD
>>>>>>> 486652c (Husky integration)
>>>>>>> 7819b0a (adding Husky)
=======
>>>>>>> 44ed82e (update app.js)
  }

  // Returning the high store
  const getHighScore = () => {
<<<<<<< HEAD
<<<<<<< HEAD
    return localStorage.getItem('highScore')
=======
<<<<<<< HEAD
      return localStorage.getItem("highScore")
>>>>>>> 7819b0a (adding Husky)
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

    // Displaying the high score
    displayHighScore()

=======
=======
>>>>>>> 44ed82e (update app.js)
    return localStorage.getItem('highScore')
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

    // Displaying the high score
    displayHighScore()

  }

  createBoard()

<<<<<<< HEAD


  //Drag the candies
  squares.forEach(square => square.addEventListener('dragstart', dragStart))
  squares.forEach(square => square.addEventListener('dragover', dragOver))
  squares.forEach(square => square.addEventListener('dragenter', dragEnter))
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
  squares.forEach(square => square.addEventListener('dragend', dragEnd))
>>>>>>> 7819b0a (adding Husky)
  squares.forEach(square => square.addEventListener('drop', dragDrop))
<<<<<<< HEAD


})
module.exports = { isValidPosition }
=======
=======
    //Drag the candies
    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    // squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('drop', dragDrop))
>>>>>>> 83de04d (fix: logic modification to prevent moves)
=======
  squares.forEach(square => square.addEventListener('drop', dragDrop))
<<<<<<< HEAD
>>>>>>> 486652c (Husky integration)
=======
<<<<<<< HEAD
>>>>>>> f7bcb5f (update package.json)


})
<<<<<<< HEAD
module.exports = { isValidPosition };
>>>>>>> dafed93 (restore .json files)
=======
module.exports = { isValidPosition }
<<<<<<< HEAD
>>>>>>> 7819b0a (adding Husky)
=======
=======
    //Drag the candies
    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    // squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('drop', dragDrop))


})
module.exports = { isValidPosition };
>>>>>>> 702f017 (update script)
<<<<<<< HEAD
>>>>>>> 1316244 (restore package.json)
=======
=======


})
module.exports = { isValidPosition }
>>>>>>> 07d5b01 (add husky integration)
>>>>>>> 8aba79a (update package.json)
=======
  squares.forEach(square => square.addEventListener('drop', dragDrop))


})
module.exports = { isValidPosition }
<<<<<<< HEAD
>>>>>>> 44ed82e (update app.js)
=======
=======
    //Drag the candies
    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    // squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('drop', dragDrop))


})
module.exports = { isValidPosition };
>>>>>>> 83de04d (fix: logic modification to prevent moves)
>>>>>>> d8547cd (restore .json files to remedy rebase)
