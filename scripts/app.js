document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const width = 8
    const fullBoardSize = width * width
    const squares = []
    const scoreDisplay = document.getElementById('score')
    const timerDisplay = document.getElementById('timer')
    const timerBoard = document.querySelector('.timerboard')
    const bgImage = new Image()
    bgImage.src = 'images/cloud-background.jpg'
    document.getElementsByTagName('body')[0].style.backgroundImage = "url('images/cloud-background.jpg')"

    timerDisplay.innerHTML = "1:00"



    let score = 0

    let startMatchChecking
    let startCountDown
    let gameStarted = false

    const candyColors = [
        'url(images/red-candy.png)',
        'url(images/yellow-candy.png)',
        'url(images/orange-candy.png)',
        'url(images/purple-candy.png)',
        'url(images/green-candy.png)',
        'url(images/blue-candy.png)'
    ]

    //Load background image




    function makeCandyDraggable() {
        squares.forEach(square => {
            square.setAttribute('draggable', true)
        });
    }

    function makeBoardNotDraggable() {
        squares.forEach(square => square.setAttribute('draggable', false))
    }

    const stopBounce = () => {
        timerBoard.style.animation = "bounce 0.5s"
    }


    const startGame = () => {
        console.log("The buton was clicked")
        timerBoard.addEventListener('animationstart', () => console.log(""))
        timerBoard.addEventListener('click', stopBounce)
        gameStarted = true
        score = 0
        scoreDisplay.innerHTML = 0
        makeCandyDraggable()
        countDown()
        startMatchChecking = window.setInterval(function () {
            checkForAllMatches()
        }, 100)

    }

    document.getElementById('startButton').onclick = startGame


    const stopGame = () => {
        gameStarted = false
        timerBoard.style.animation = "bounce 0.5s infinite"
        clearInterval(startCountDown)
        clearInterval(startMatchChecking)
        makeBoardNotDraggable()
    }


    const countDown = () => {
        console.log(" TIME PARSED ", Date.parse("2011-10-10T14:48:00"))
        let seconds = 15
        startCountDown = window.setInterval(function () {
            console.log("Seconds ", seconds)
            seconds = seconds - 1
            if (seconds < 0) {
                //stop countdown
                stopGame()
                return timerDisplay.innerHTML = "0:00"
            }

            if (seconds < 10)
                return timerDisplay.innerHTML = `0:0${seconds}`

            return timerDisplay.innerHTML = `0:${seconds}`
        }, 1000)
    }




    // find matches per row
    const columnMatchesForEight = () => {
        for (let i = 0; i < fullBoardSize; i++) {
            let rowToCheck = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7]
            let decidedColor = squares[i].style.backgroundImage
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
                rowToCheck.forEach(index => { squares[index].addEventListener('animationend', removeBackgroundImage) })

            }

        }
    }


    const removeBackgroundImage = (element) => {
        element.target.style.backgroundImage = ''
        element.target.classList.remove('square')
        setTheBoard()
    }


    const checkRowForSeven = () => {
        for (let i = 0; i < fullBoardSize - 7; i++) {
            let rowToCheck = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6]
            let decidedColor = squares[i].style.backgroundImage
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
                rowToCheck.forEach(index => { squares[index].addEventListener('animationend', removeBackgroundImage) })

            }

        }
    }

    const checkRowForSix = () => {
        for (let i = 0; i < fullBoardSize - 6; i++) {
            let rowToCheck = [i, i + 1, i + 2, i + 3, i + 4, i + 5]
            let decidedColor = squares[i].style.backgroundImage
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
                rowToCheck.forEach(index => { squares[index].addEventListener('animationend', removeBackgroundImage) })

            }

        }
    }
    const checkRowForFive = () => {
        for (let i = 0; i < fullBoardSize - 5; i++) {
            let rowToCheck = [i, i + 1, i + 2, i + 3, i + 4]
            let decidedColor = squares[i].style.backgroundImage
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
                rowToCheck.forEach(index => { squares[index].addEventListener('animationend', removeBackgroundImage) })

            }

        }
    }

    const checkRowForFour = () => {
        for (let i = 0; i < fullBoardSize - 4; i++) {
            let rowToCheck = [i, i + 1, i + 2, i + 3]
            let decidedColor = squares[i].style.backgroundImage
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
                rowToCheck.forEach(index => { squares[index].addEventListener('animationend', removeBackgroundImage) })

            }

        }
    }




    // Find Matches Per Column

    const checkColumnForThree = () => {
        for (i = 0; i < fullBoardSize - width * 2; i++) {
            let columnToCheck = [i, i + width, i + width * 2]
            let decidedColor = squares[i].style.backgroundImage
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
                columnToCheck.forEach(index => { squares[index].addEventListener('animationend', removeBackgroundImage) })
            }
        }

    }

    const checkColumnForFour = () => {
        for (i = 0; i < fullBoardSize - width * 3; i++) {
            let columnToCheck = [i, i + width, i + width * 2, i + width * 3]
            let decidedColor = squares[i].style.backgroundImage
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
                columnToCheck.forEach(index => { squares[index].addEventListener('animationend', removeBackgroundImage) })
            }
        }

    }

    const checkColumnForFive = () => {
        for (i = 0; i < fullBoardSize - width * 4; i++) {
            let columnToCheck = [i, i + width, i + width * 2, i + width * 3, i + width * 4]
            let decidedColor = squares[i].style.backgroundImage
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
                columnToCheck.forEach(index => { squares[index].addEventListener('animationend', removeBackgroundImage) })
            }
        }

    }
    const checkColumnForSix = () => {
        for (i = 0; i < fullBoardSize - width * 5; i++) {
            let columnToCheck = [i, i + width, i + width * 2, i + width * 3, i + width * 4, i + width * 5]
            let decidedColor = squares[i].style.backgroundImage
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
                columnToCheck.forEach(index => { squares[index].addEventListener('animationend', removeBackgroundImage) })
            }
        }

    }
    const checkColumnForSeven = () => {
        for (i = 0; i < fullBoardSize - width * 6; i++) {
            let columnToCheck = [i, i + width, i + width * 2, i + width * 3, i + width * 4, i + width * 5, i + width * 6]
            let decidedColor = squares[i].style.backgroundImage
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
                columnToCheck.forEach(index => { squares[index].addEventListener('animationend', removeBackgroundImage) })
            }
        }

    }

    const checkColumnForEight = () => {
        for (i = 0; i < fullBoardSize - width * 7; i++) {
            let columnToCheck = [i, i + width, i + width * 2, i + width * 3, i + width * 4, i + width * 5, i + width * 6, i + width * 7]
            let decidedColor = squares[i].style.backgroundImage
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
                columnToCheck.forEach(index => { squares[index].addEventListener('animationend', removeBackgroundImage) })
            }
        }

    }


    //dag the candies

    let colorBeingDragged
    let colorBeingReplaced
    let squareIdBeingDragged
    let squareIdbeingReplaced

    const animationStart = (element) => {
        element.preventDefault()
    }

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

    const dragLeave = (element) => {

    }

    const isValidMove = () => {
        let validMoves = [squareIdBeingDragged - 1, squareIdBeingDragged - width, squareIdBeingDragged + 1, squareIdBeingDragged + width]
        return validMoves.includes(squareIdbeingReplaced)
    }


    const dragEnd = (element) => {
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
        for (let i = 0; i < fullBoardSize - 3; i++) {
            if (i % 8 > 5) continue
            let rowToCheck = [i, i + 1, i + 2]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''


            if (rowToCheck.every(index => (squares[index].style.backgroundImage === decidedColor && !isBlank))) {
                if (gameStarted) score += rowToCheck.length
                scoreDisplay.innerHTML = score


                rowToCheck.forEach(index => {

                    squares[index].classList.add('square')

                })
                rowToCheck.forEach(index => { squares[index].addEventListener('animationend', removeBackgroundImage) })

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
        startResetBoard = window.setInterval(function () {
            checkForAllMatches()
        }, 100)

        do {
            moveDown()
            isBoardFull = squares.every(square => square.style.backgroundImage !== '')
        } while (isBoardFull === false)


    }

    // drop candies onces some have been ceard 
    const moveDown = () => {
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
        for (i = 0; i < 55; i++) {
            const isFirstRow = firstRow.includes(i)
            if (squares[i + width].style.backgroundImage === '') {
                squares[i + width].style.backgroundImage = squares[i].style.backgroundImage

                squares[i].style.backgroundImage = ''
            }

            if (isFirstRow && squares[i].style.backgroundImage === '') {
                let randomColor = Math.floor(Math.random() * candyColors.length)
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
            square.addEventListener('animationstart', () => console.log('animation started!'))
            let randomColor = Math.floor(Math.random() * candyColors.length)
            square.style.backgroundImage = candyColors[randomColor]
            grid.appendChild(square)
            squares.push(square)
        }
        // setTheBoard()
        resetBoard()

        //setscore to zero
        score = 0;
        scoreDisplay.innerHTML = score

    }

    createBoard()



    // window.onload=function(){
    //     document.getElementsByTagName('body')[0].style.backgroundImage = "url('images/cloud-background.jpg')"
    //     createBoard()
    //     timerDisplay.innerHTML = "1:00"
    //     document.getElementById('startButton').onclick = startGame
    // }







    //Drag the candies
    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    squares.forEach(square => square.addEventListener('dragleave', dragLeave))
    squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('drop', dragDrop))




})