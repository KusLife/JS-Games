// here we get elemennts from our html to work with here 
const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const score = document.querySelector('#score');
const timeLeft = document.querySelector('#time-left');

// Variebles set globaly for ineracting in functions   
let result = 0;
let hitPosition;
let timerId = null;
let currentTime = 60

// remove the 'mole' class
// randomaser for square 'mole' and adding the class to a div
function randomSquare() {
  squares.forEach((square) => square.classList.remove('mole'));

  let randomPosition = squares[Math.floor(Math.random() * 9)];
  randomPosition.classList.add('mole');

  hitPosition = randomPosition.id;
}

// watching where was a click, then compare with hot spot
squares.forEach((square) => {
  square.addEventListener('mousedown', () => {
    if (square.id == hitPosition) {
      result++;
      score.textContent = result;
      hitPosition = null;
    }
  });
});

// have an additiional global variable 'timerId' to manipulate. 
function moleMove() {
  timerId = setInterval(randomSquare, 1000);
}
moleMove()

//dicrimenting time value and stoping counters
function counter() {
     currentTime--
     timeLeft.textContent = currentTime
      if (currentTime == 0) {
        clearInterval(countDownTimer)
        clearInterval(timerId)
        alert('Game over! Your score is ' + result)
      }
}

let countDownTimer = setInterval(counter, 1000)