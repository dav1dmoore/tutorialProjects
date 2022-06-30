document.addEventListener('DOMContentLoaded', () => {

const grid = document.querySelector('.grid');
let width = 10
let squares = [];
let bombAmount = 20;
let isGameOver = false;
let flags = 0;
const BOMB_INTERVAL_AMOUNT = 10
const difficult = document.querySelector('#game-difficulty')
const diffDisplay = document.querySelector('#start-game-btn')
const flagsDispl = document.querySelector('.flags-left')
const gameResult = document.querySelector('.game-result')

//create board
function createBoard(){

// Below were added to reset board without reloading the browser
grid.innerHTML = ''
flags = 0;
isGameOver = false;
squares = [];

//get shuffled game array with random bombs
const bombsArray = Array(bombAmount).fill('bomb');
const emptyArray = Array(width*width - bombAmount).fill('valid');
const gamesArray = emptyArray.concat(bombsArray);
const shuffledArray = gamesArray.sort(() => Math.random() -0.5);


  for(let i = 0; i < width*width; i++){
    const square = document.createElement('div');
    square.setAttribute('id', i);
    square.classList.add(shuffledArray[i])
    grid.appendChild(square)
    squares.push(square);

    //normal click
    square.addEventListener('click', function(e){
      click(square)
    })
//cntrl and leftclick
square.oncontextmenu = function(e){
  e.preventDefault()
  addFlag(square)
}
}



//add numbers
for(let i = 0; i < squares.length; i++){
  let total = 0;
  const leftEdge = (i%width === 0);
  const rightEdge = (i%width === width-1);

if (squares[i].classList.contains('valid')){
  if(i > 0 && !leftEdge && squares[i - 1].classList.contains('bomb')) total++
  if(i > 9 && !rightEdge && squares[i + 1 - width].classList.contains('bomb')) total++
  if(i >= 10 && squares[i-width].classList.contains('bomb')) total++
  // Fixed bug by adding >= to lines 60 & 62, allowing squares to assess index[0] for class of bomb.
  if(i >= 11 && !leftEdge && squares[i-1-width].classList.contains('bomb')) total++
  if(i <= 98 && !rightEdge && squares[i+1].classList.contains('bomb')) total++
  if(i < 90 && !leftEdge && squares[i-1+width].classList.contains('bomb')) total++
  if(i < 88 && !rightEdge && squares[i+1+width].classList.contains('bomb')) total++
  if(i < 89 && squares[i+width].classList.contains('bomb')) total++
}
squares[i].setAttribute('data', total);
console.log(total);
switch(total) {
  case 0:
  break;
  case 1:
  squares[i].style['color'] = 'red';
  break;
  case 2:
  squares[i].style['color'] = 'blue';
  break;
  case 3:
  squares[i].style['color'] = 'yellow';
  break;
  case 4:
  squares[i].style['color'] = 'green';
  break;
  case 5:
  squares[i].style['color'] = 'purple';
  break;
  case 6:
  squares[i].style['color'] = 'brown';
  break;
  default:
  break;
}
}
}

//  Removed Original Createboard function
// createBoard();

//add flag with right clicked
function addFlag(square){
  if (isGameOver) return
  if (!square.classList.contains('checked') && (flags < bombAmount)){
    if(!square.classList.contains('flag')){
      square.classList.add('flag')
      square.innerHTML = '&#9873'
      flags ++
      checkForWin();
      displayFlagsLeft();
    } else {
      square.classList.remove('flag')
      square.innerHTML = ''
      flags --
      displayFlagsLeft();
    }
  }
  }



//click on square actions
function click(square){
  let currentId = square.id
  if (isGameOver) return
  if (square.classList.contains('checked') || square.classList.contains('flag')) return
  if (square.classList.contains('bomb')){
    gameOver(square);
  } else {
    let total = square.getAttribute('data')
    if(total !=0){
      square.classList.add('checked')
      square.innerHTML = total
      return
    }
    checkSquare(square, currentId)
  }
    square.classList.add('checked')
  }

// checking neighboring squares once square is clicked.
function checkSquare(square, currentId){
  const isLeftEdge = (currentId % width === 0)
  const isRightEdge = (currentId % width === width - 1)

  setTimeout(() => {
    if (currentId > 0 && !isLeftEdge){
      const newId = squares[parseInt(currentId) -1].id
      const newSquare = document.getElementById(newId);
      click(newSquare)
    }
    if(currentId > 9 && !isRightEdge) {
      const newId = squares[parseInt(currentId)+1-width].id
      const newSquare = document.getElementById(newId);
      click(newSquare)
    }
    if(currentId > 10){
      const newId = squares[parseInt(currentId - width)].id
      const newSquare = document.getElementById(newId)
      click(newSquare)
    }
    if (currentId > 11 && !isLeftEdge){
      const newId = squares[parseInt(currentId) -1 - width].id
      const newSquare = document.getElementById(newId);
      click(newSquare)
    }
    if(currentId <= 98 && !isRightEdge){
      const newId = squares[parseInt(currentId)+1].id
      const newSquare = document.getElementById(newId)
      click(newSquare)
    }
    if (currentId < 90 && !isLeftEdge){
      const newId = squares[parseInt(currentId) -1+width].id
      const newSquare = document.getElementById(newId)
      click(newSquare)
    }
    if (currentId < 88 && !isRightEdge){
      const newId = squares[parseInt(currentId) +1 +width].id
      const newSquare = document.getElementById(newId)
      click(newSquare)
    }
    if (currentId < 89){
      const newId = squares[parseInt(currentId)+width].id
      const newSquare = document.getElementById(newId)
      click(newSquare)
    }

  }, 10)
}

//Game over
function gameOver(square){
  isGameOver = true;

  //show all the bombs
  squares.forEach(square => {
    if(square.classList.contains('bomb')){
      square.classList.add('checked')
      square.innerHTML = '&#9955'
    }
  })
  gameResult.innerHTML = 'BOOM! Game Over!'
  reset();
}

//check for w1n

function checkForWin(){
  let matches = 0;
  for(let i = 0; i<squares.length; i++){
    if(squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')){
      matches++
    }
    if(matches === bombAmount){
      isGameOver = true
      gameResult.innerHTML = 'You Win!'
      reset();
    }
  }
}

function setDifficultyLevel(level){
  bombAmount = level*BOMB_INTERVAL_AMOUNT;
  console.log(bombAmount);
}

//Game Difficulty
difficult.addEventListener('change', setDifficultyLevel);

function setDifficultyLevel(){
bombAmount = BOMB_INTERVAL_AMOUNT * this.value
}

// Game difficulty diffDisplay
diffDisplay.addEventListener('click', startGame)
function startGame(){
difficult.setAttribute('disabled', '')
diffDisplay.setAttribute('hidden', 'true')
createBoard();
displayFlagsLeft();
gameResult.innerHTML = ''
}

function displayFlagsLeft(){
let flagLeft = bombAmount - flags
flagsDispl.innerHTML = `${flagLeft} Flags Left`;
}

//Additional Function To Reset Game without Browser Reload
function reset(){
  difficult.removeAttribute('disabled')
  diffDisplay.removeAttribute('hidden')
}

});
