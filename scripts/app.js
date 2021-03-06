document.addEventListener('DOMContentLoaded', ()=>{
    const grid = document.querySelector('.grid')
    const width = 8
    const fullBoardSize = width*width
    const squares = []
    const scoreDisplay = document.getElementById('score')
    let score = 0

    const candyColors = [
        'url(images/red-candy.png)',
        'url(images/yellow-candy.png)',
        'url(images/orange-candy.png)',
        'url(images/purple-candy.png)',
        'url(images/green-candy.png)',
        'url(images/blue-candy.png)'
    ]



    // drop candies onces some have been ceard 
    const moveDown = () =>{
        const firstRow = [0,1,2,3,4,5,6,7]

        for(i=0; i<55; i++){
            const isFirstRow = firstRow.includes(i)
            if(squares[i+width].style.backgroundImage === ''){
                squares[i+width].style.backgroundImage = squares[i].style.backgroundImage
                squares[i].style.backgroundImage = ''
            }

            if(isFirstRow && squares[i].style.backgroundImage === ''){
                let randomColor = Math.floor(Math.random() * candyColors.length)
                squares[i].style.backgroundImage =  candyColors[randomColor]        
            }



        }
    }
    // find matches per row
    const columnMatchesForEight = () =>{
        for(let i = 0; i < fullBoardSize ; i++){
            let rowToCheck = [i, i+1,i+2, i+3,i+4,i+5,i+6, i+7]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            if(i%8 > 0) continue

            if(rowToCheck.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank )){
                score += rowToCheck.length()
                scoreDisplay.innerHTML = score
                rowToCheck.forEach(index => {squares[index].style.backgroundImage = ''})
                
            }

        }
    }

    const checkRowForSeven = () =>{
        for(let i = 0; i < fullBoardSize -7 ; i++){
            let rowToCheck = [i, i+1,i+2, i+3,i+4, i+5, i+6]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            if(i%8 > 1) continue

            if(rowToCheck.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank )){
                score += rowToCheck.length
                scoreDisplay.innerHTML = score
                rowToCheck.forEach(index => {squares[index].style.backgroundImage = ''})
                
            }

        }
    }

    const checkRowForSix = () =>{
        for(let i = 0; i < fullBoardSize -6 ; i++){
            let rowToCheck = [i, i+1,i+2, i+3,i+4, i+5]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            if(i%8 > 2) continue

            if(rowToCheck.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank )){
                score += rowToCheck.length
                scoreDisplay.innerHTML = score
                rowToCheck.forEach(index => {squares[index].style.backgroundImage = ''})
                
            }

        }
    }
    const checkRowForFive = () =>{
        for(let i = 0; i < fullBoardSize -5 ; i++){
            let rowToCheck = [i, i+1,i+2, i+3,i+4]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            if(i%8 > 3) continue

            if(rowToCheck.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank )){
                score += rowToCheck.length
                scoreDisplay.innerHTML = score
                rowToCheck.forEach(index => {squares[index].style.backgroundImage = ''})
                
            }

        }
    }

    const checkRowForFour = () =>{
        for(let i = 0; i < fullBoardSize -4 ; i++){
            let rowToCheck = [i, i+1,i+2, i+3]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            if(i%8 > 4) continue

            if(rowToCheck.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank )){
                score += rowToCheck.length
                scoreDisplay.innerHTML = score
                rowToCheck.forEach(index => {squares[index].style.backgroundImage = ''})
                
            }

        }
    }

    const checkRowForThree = () =>{
        for(let i = 0; i < fullBoardSize -3 ; i++){
            let rowToCheck = [i, i+1,i+2]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            if(i%8 > 5) continue

            if(rowToCheck.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank )){
                score += rowToCheck.length
                scoreDisplay.innerHTML = score
                rowToCheck.forEach(index => {squares[index].style.backgroundImage = ''})
                
            }

        }
    }

    // Find Matches Per Column

    const checkColumnForThree = () =>{
        for(i=0; i< fullBoardSize - width*2; i++){
            let columnToCheck = [i, i+width, i+width*2]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            if(columnToCheck.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
                score += columnToCheck.length
                scoreDisplay.innerHTML = score
                columnToCheck.forEach(index =>{
                    squares[index].style.backgroundImage=''
                })
            }
        }

    }

    const checkColumnForFour = () =>{
        for(i=0; i< fullBoardSize - width*3; i++){
            let columnToCheck = [i, i+width, i+width*2, i+width*3]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            if(columnToCheck.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
                score += columnToCheck.length
                scoreDisplay.innerHTML = score
                columnToCheck.forEach(index =>{
                    squares[index].style.backgroundImage=''
                })
            }
        }

    }

    const checkColumnForFive = () =>{
        for(i=0; i< fullBoardSize - width*4; i++){
            let columnToCheck = [i, i+width, i+width*2, i+width*3, i+width*4]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            if(columnToCheck.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
                score += columnToCheck.length
                scoreDisplay.innerHTML = score
                columnToCheck.forEach(index =>{
                    squares[index].style.backgroundImage=''
                })
            }
        }

    }
    const checkColumnForSix = () =>{
        for(i=0; i< fullBoardSize - width*5; i++){
            let columnToCheck = [i, i+width, i+width*2, i+width*3, i+width*4, i+width*5]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            if(columnToCheck.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
                score += columnToCheck.length
                scoreDisplay.innerHTML = score
                columnToCheck.forEach(index =>{
                    squares[index].style.backgroundImage=''
                })
            }
        }

    }
    const checkColumnForSeven = () =>{
        for(i=0; i< fullBoardSize - width*6; i++){
            let columnToCheck = [i, i+width, i+width*2, i+width*3, i+width*4, i+width*5, i+width*6]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            if(columnToCheck.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
                score += columnToCheck.length
                scoreDisplay.innerHTML = score
                columnToCheck.forEach(index =>{
                    squares[index].style.backgroundImage=''
                })
            }
        }

    }

    const checkColumnForEight = () =>{
        for(i=0; i< fullBoardSize - width*7; i++){
            let columnToCheck = [i, i+width, i+width*2, i+width*3, i+width*4, i+width*5, i+width*6, i+width*7]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            if(columnToCheck.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
                score += columnToCheck.length
                scoreDisplay.innerHTML = score
                columnToCheck.forEach(index =>{
                    squares[index].style.backgroundImage=''
                })
            }
        }

    }


    //dag the candies

    let colorBeingDragged
    let colorBeingReplaced
    let squareIdBeingDragged
    let squareIdbeingReplaced

    const dragStart = (element) =>{
        colorBeingDragged = element.target.style.backgroundImage
        squareIdBeingDragged = parseInt(element.target.id)
        // console.log(element.target.id, "Drag Start event", " Color ", colorBeingDragged)
    }

    const dragOver = (element) =>{
        element.preventDefault()
        // console.log(element.target.id,"Drag over event")
    }

    const dragEnter = (element) =>{
        element.preventDefault()
        console.log(element.target.id,"Drag Enter event")
    }

    const dragLeave = (element) =>{
        console.log(element.target.id,"Drag Leave event")
    }

    const isValidMove = () =>{
        let validMoves = [squareIdBeingDragged -1, squareIdBeingDragged -width, squareIdBeingDragged+1, squareIdBeingDragged+width]
        return validMoves.includes(squareIdbeingReplaced)
    }

   
    const dragEnd = (element) =>{
        const validMove = isValidMove()
        if(squareIdbeingReplaced && validMove){
            squareIdbeingReplaced = null
        } else if ( squareIdbeingReplaced && !validMove){
            squares[squareIdbeingReplaced].style.backgroundImage = colorBeingReplaced
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
        } else {
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
        }

    }

    const dragDrop = (element) => {
         
        colorBeingReplaced = element.target.style.backgroundImage
        squareIdbeingReplaced = parseInt(element.target.id)

        const validMove = isValidMove()
        
        if(!validMove){
            squares[squareIdbeingReplaced].style.backgroundImage = colorBeingReplaced
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
            return
        }
        element.target.style.backgroundImage = colorBeingDragged
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced

        
        
        //Fill the board and check for matches if there is an empty square
        setTheBoard()
       
    }


    const checkForAllMatches = () =>{
        moveDown()
        checkRowForFive()
        checkColumnForFive()
        checkColumnForFour()
        checkRowForFour()
        checkRowForThree()
        checkColumnForThree()
    }

    const setTheBoard = () =>{
        let isBoardFull = false
        do{
            checkForAllMatches()
            isBoardFull = squares.every(square => square.style.backgroundImage !== '')
        } while (isBoardFull === false)
            
    }

    const resetScore = () =>{
        score = 0;
        scoreDisplay.innerHTML = score
    }

    //create board
    function createBoard(){
        for(let i = 0; i < fullBoardSize; i++){
            const square = document.createElement('div')
            square.setAttribute('draggable', true)
            square.setAttribute('id', i)
            let randomColor = Math.floor(Math.random() * candyColors.length)
            square.style.backgroundImage = candyColors[randomColor]
            grid.appendChild(square)
            squares.push(square)
        }
        setTheBoard()
        resetScore()
    }

    createBoard()



    //Drag the candies
    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    squares.forEach(square => square.addEventListener('dragleave', dragLeave))
    squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('drop', dragDrop))


    

})