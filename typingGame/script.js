window.addEventListener('load', init);
//Global Variables

//Available Levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 2
}
// to change levels
let currentLevel = levels.easy;
let time = currentLevel;
let score = 0;
let isPlaying;

//DOM Element Variables
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const timeDisplay = document.querySelector('#time');
const scoreDisplay = document.querySelector('#score');
const seconds = document.querySelector('#seconds')
const message = document.querySelector('#message')
const difficulty = document.querySelector('#difficulty');
const highscoreTxt = document.querySelector('#highscoreTxt');
var highScore = localStorage.getItem(`highscore-${difficulty.value}`);


const words = ['fantastic',
  'amazing',
  'incredible',
  'unbelievable',
  'wonderful',
  'marvelous',
  'dreamy',
  'fabulous',
  'outstanding',
  'intriguing',
  'inspiring',
  'grand',
  'delightful',
  'charming',
  'enchanting',
  'surreal',
  'spectacular',
  'sensational',
  'superb',
  'poingnant',
  'spellbinding',
  'whimsical',
  'fanciful',
  'frivolous',
  'astonishing',
  'winsome',
  'sweet',
  'exotic',
  'remarkable',
  'astounding',
  'terrific',
  'beautiful',
  'darling',
  'lovely',
  'tantamount',
  'endearing',
  'gorgeous',
  'exciting',
  'ubiquitous'
];


function init() {
  //Show number Seconds
  seconds.innerHTML = currentLevel;
  //Show High score
  highscoreTxt.innerHTML = highScore;
  //load word from arry
  showWord(words)
  //  Start matching on input
  wordInput.addEventListener('input', startMatch);
  //Call Countdown Every seconds
  setInterval(countdown, 1000);
  //Change difficulty
  difficulty.addEventListener('change', changeLevel);
}

// Start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    wordInput.value = '';
    showWord(words);
    score = score + 1;
    scoreDisplay.innerHTML = score;
  }
  if (score == -1) {
    scoreDisplay.innerHTML = 0;
  }
}
// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'Correct!!!';
    wordInput.classList.remove('over');
    message.style['color'] = 'white';
    return true
  } else {
    return false
  }
}

function showWord(words) {
  const randIndex = Math.floor(Math.random() * words.length);
  currentWord.innerHTML = words[randIndex];
}


function countdown() {
  if (time > 0) {
    time--;
  } else if (time === 0) {
    isPlaying = false;
    if (!isPlaying && time === 0) {
      storeScore(score);
      message.style['color'] = 'red';
      message.innerHTML = 'Game Over!!!'
      wordInput.classList.add('over');
      score = -1;
    }
  }
  timeDisplay.innerHTML = time;
}

function changeLevel() {
  message.innerHTML = '';
  wordInput.classList.remove('over');
  message.style['color'] = 'white';
  score = 0
  scoreDisplay.innerHTML = score;
  getHighScore();
  switch (this.value) {
    case 'easy':
      currentLevel = 5
      break;
    case 'medium':
      currentLevel = 3
      break;
    case 'hard':
      currentLevel = 1
      break;
    default:
  }
  seconds.innerHTML = currentLevel;
  time = currentLevel;
  startMatch()
}


function storeScore(){
if(score !== -1 && score !== 0 && score > highScore){
  localStorage.setItem(`highscore-${difficulty.value}`, score);
  highScore = localStorage.getItem(`highscore-${difficulty.value}`, score);
  getHighScore();
}
}

function getHighScore(){
  highScore = localStorage.getItem(`highscore-${difficulty.value}`);
if(highScore == null){
  highScore = 0;
}
  highscoreTxt.innerHTML = highScore;
}
