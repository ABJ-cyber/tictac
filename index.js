//selectors
newGameBtn = document.querySelector(".cpu-btn")
newGamePage = document.querySelector(".new-game-page")
gamePage = document.querySelector(".game-page")
btnX = document.querySelector('.btn-x')
btnO = document.querySelector('.btn-o')
xWinPage = document.querySelector('.x-win-page')
oWinPage = document.querySelector('.o-win-page')
nextRndBtn = document.querySelector('.next-rnd-btn')
quitBtn = document.querySelector('.qui-btn')


youWins = document.getElementById('you-wins')
ties = document.getElementById('ties')
cpuWins = document.getElementById('cpu-wins')
winner = document.querySelector('.winner')

cell1 = document.querySelector('.game-cell-1')
cell2 = document.querySelector('.game-cell-2')
cell3 = document.querySelector('.game-cell-3')
cell4 = document.querySelector('.game-cell-4')
cell5 = document.querySelector('.game-cell-5')
cell6 = document.querySelector('.game-cell-6')
cell7 = document.querySelector('.game-cell-7')
cell8 = document.querySelector('.game-cell-8')
cell9 = document.querySelector('.game-cell-9')


//event-listeners
newGameBtn.addEventListener('click', newGame)
nextRndBtn.addEventListener('click',newGame)
quitBtn.addEventListener('click', quit)
btnX.addEventListener('click', pick)
btnO.addEventListener('click', pick)
cell1.addEventListener('click', addX)
cell2.addEventListener('click', addX)
cell3.addEventListener('click', addX)
cell4.addEventListener('click', addX)
cell5.addEventListener('click', addX)
cell6.addEventListener('click', addX)
cell7.addEventListener('click', addX)
cell8.addEventListener('click', addX)
cell9.addEventListener('click', addX)

let playerTurn 

let XrowsContainer
let XcolumnsContainer
let XdiagonalContainer
let XdiagonalContainer2

let OrowsContainer
let OcolumnsContainer
let OdiagonalContainer
let OdiagonalContainer2

let moveCount

let xWinCount = 0
let oWinCount = 0
let tieCount = 0

//functions
function newGame() {
    
    console.log('newgame')
    newGamePage.classList.add('passive')
    gamePage.classList.remove('passive')
    xWinPage.classList.add('passive')

    moveCount = 0
    playerTurn = 'game-cell-active-x'
    
    XrowsContainer = [0,0,0]
    XcolumnsContainer = [0,0,0]
    XdiagonalContainer = 0
    XdiagonalContainer2 = 0

    OrowsContainer = [0,0,0]
    OcolumnsContainer = [0,0,0]
    OdiagonalContainer = 0
    OdiagonalContainer2 = 0

    cell1.classList.remove('game-cell-active-x', 'game-cell-active-o')
    cell2.classList.remove('game-cell-active-x', 'game-cell-active-o')
    cell3.classList.remove('game-cell-active-x', 'game-cell-active-o')
    cell4.classList.remove('game-cell-active-x', 'game-cell-active-o')
    cell5.classList.remove('game-cell-active-x', 'game-cell-active-o')
    cell6.classList.remove('game-cell-active-x', 'game-cell-active-o')
    cell7.classList.remove('game-cell-active-x', 'game-cell-active-o')
    cell8.classList.remove('game-cell-active-x', 'game-cell-active-o')
    cell9.classList.remove('game-cell-active-x', 'game-cell-active-o')


    }


function pick(){
    btnX.classList.toggle('btn-active')
    btnO.classList.toggle('btn-active')
}

function addX(){

    if(this.classList.contains('game-cell-active-x') || this.classList.contains('game-cell-active-o')){
        return
    }

    else{
        this.classList.add(playerTurn)
    }


    if(playerTurn==='game-cell-active-x'){
        checkX(this.classList[1][10])
        playerTurn = 'game-cell-active-o'
    }
    else{
        checkO(this.classList[1][10])
        playerTurn = 'game-cell-active-x'
    }

    moveCount+=1
    if(moveCount===9){
        console.log('Tie')
        tie()
    }
}

function getRowColumn(cell){
    let row
    let column 

    if(cell % 3 === 1){
        column = 1
    }

    else if(cell %3 === 2){
        column = 2
    }

    else{
        column = 3
    }

    if(cell<=3){
        row = 1
    }

    else if(cell<=6){
        row = 2
    }

    else{
        row = 3
    }


    return [row, column]

}

function checkX(cell){
    const coord = getRowColumn(cell)
    const row = coord[0]
    const column= coord[1]

    XrowsContainer[row-1]+=1 
    XcolumnsContainer[column-1]+=1


    if(row===2 && column===2){

        XdiagonalContainer+=1
        XdiagonalContainer2+=1
    }
    else if(row===column){
        XdiagonalContainer+=1 
    }


    if(row-column===2 || column-row===2){
    
        XdiagonalContainer2 +=1
    }

    if(XrowsContainer[row-1]===3){
        console.log('winsbyrow')
        xWins()
    }

    if(XcolumnsContainer[column-1]===3){
        xWins()

    }

    if(XdiagonalContainer===3){
        console.log('winsbydiagX')
        xWins()
    }

    if(XdiagonalContainer2===3){
        console.log('winsbydiag-X')
        console.log(XdiagonalContainer2)
        xWins()
    }


}

function checkO(cell){
    const coord = getRowColumn(cell)
    const row = coord[0]
    const column= coord[1]

    OrowsContainer[row-1]+=1 
    OcolumnsContainer[column-1]+=1

    if(row===2 && column===2){

        OdiagonalContainer+=1
        OdiagonalContainer2+=1
    }
    else if(row===column){
        OdiagonalContainer+=1 
    }

    if(row-column===2 || column-row===2){
        OdiagonalContainer2 +=1
    }
    if(OrowsContainer[row-1]===3){
        oWins()
    }

    if(OcolumnsContainer[column-1]===3){
        oWins()

    }

    if(OdiagonalContainer===3){
        console.log('winsbydiagO')
        oWins()
    }

    if(OdiagonalContainer2===3){
        console.log('winsbydiag-O')
        oWins()
    }


}


function xWins(){
    winner.textContent='X takes the Round'
    xWinPage.classList.remove('passive')
    xWinCount +=1
    youWins.textContent = xWinCount
}

function oWins(){
    winner.textContent="O takes the Round"
    xWinPage.classList.remove('passive')
    oWinCount += 1
    cpuWins.textContent = oWinCount
}

function tie(){
    winner.textContent="Round was a Tie"
    xWinPage.classList.remove('passive')
    tieCount+=1
    ties.textContent = tieCount
}


function quit(){
    newGamePage.classList.remove('passive')
    gamePage.classList.add('passive')
    xWinPage.classList.add('passive')
}