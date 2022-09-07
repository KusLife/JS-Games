const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const score = document.querySelector('#score');
const timeLeft = document.querySelector('#time-left');

let result = 0;

// remove the 'mole' class
// for now we don't use this func
function randomSquare() {
  squares.forEach((square) => square.classList.remove('mole'));
}

// randomaser for square 'mole' and adding the class to a div
function randomSquarePosition() {
    let randomPosition = squares[Math.floor(Math.random() * 9)]
    randomPosition.classList.add('mole')
}

randomSquarePosition()