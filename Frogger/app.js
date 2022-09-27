const timeLeftDisplay = document.querySelector('#time-left');
const resultDisplay = document.querySelector('#result');
const startPauseBtn = document.querySelector('#start-pause-button');
const squares = document.querySelectorAll('.grid div');
const logsLeft = document.querySelectorAll('.log-left');
const logsRight = document.querySelectorAll('.log-right');
const carLeft = document.querySelectorAll('.car-left');
const carRight = document.querySelectorAll('.car-right');
let currentIndex = 76;
const width = 9;
let timerId;
let currentTime = 20;
let checkOutcome;

function moveFrog(e) {
  squares[currentIndex].classList.remove('frog');

  if (currentIndex >= 0 || currentIndex <= 81) {
    switch (e.key) {
      case 'ArrowLeft':
        console.log('move left', currentIndex);
        if (currentIndex % width !== 0) currentIndex -= 1;
        break;
      case 'ArrowRight':
        console.log('move right', currentIndex);
        if (currentIndex % width < 8) currentIndex += 1;
        break;
      case 'ArrowUp':
        console.log('move up', currentIndex);
        if (currentIndex > width) currentIndex -= width;
        break;
      case 'ArrowDown':
        console.log('move down', currentIndex);
        if (currentIndex < 72) currentIndex += width;
        break;
    }
  }
  squares[currentIndex].classList.add('frog');
}

function avtoMove() {
  currentTime--;
  logsLeft.forEach((lLeft) => moveLogsLeft(lLeft));
  logsRight.forEach((lRight) => moveLogsRight(lRight));
  carLeft.forEach((lCar) => moveCarsLeft(lCar));
  carRight.forEach((rCar) => moveCarsRight(rCar));
  timeLeftDisplay.textContent = currentTime;
}

function outcome() {
  lose();
  win();
}

function moveLogsLeft(lLeft) {
  switch (true) {
    case lLeft.classList.contains('l1'):
      lLeft.classList.remove('l1'), lLeft.classList.add('l2');
      break;
    case lLeft.classList.contains('l2'):
      lLeft.classList.remove('l2'), lLeft.classList.add('l3');
      break;
    case lLeft.classList.contains('l3'):
      lLeft.classList.remove('l3'), lLeft.classList.add('l4');
      break;
    case lLeft.classList.contains('l4'):
      lLeft.classList.remove('l4'), lLeft.classList.add('l5');
      break;
    case lLeft.classList.contains('l5'):
      lLeft.classList.remove('l5'), lLeft.classList.add('l1');
      break;
  }
}

function moveLogsRight(lRight) {
  switch (true) {
    case lRight.classList.contains('l5'):
      lRight.classList.remove('l5'), lRight.classList.add('l4');
      break;
    case lRight.classList.contains('l4'):
      lRight.classList.remove('l4'), lRight.classList.add('l3');
      break;
    case lRight.classList.contains('l3'):
      lRight.classList.remove('l3'), lRight.classList.add('l2');
      break;
    case lRight.classList.contains('l2'):
      lRight.classList.remove('l2'), lRight.classList.add('l1');
      break;
    case lRight.classList.contains('l1'):
      lRight.classList.remove('l1'), lRight.classList.add('l5');
      break;
  }
}

function moveCarsLeft(lCar) {
  switch (!!lCar) {
    case lCar.classList.contains('c1'):
      lCar.classList.remove('c1');
      lCar.classList.add('c2');
      break;
    case lCar.classList.contains('c2'):
      lCar.classList.remove('c2');
      lCar.classList.add('c3');
      break;
    case lCar.classList.contains('c3'):
      lCar.classList.remove('c3');
      lCar.classList.add('c1');
      break;
    case lCar.classList.contains('c1'):
      lCar.classList.remove('c1');
      lCar.classList.add('c2');
      break;
    case lCar.classList.contains('c2'):
      lCar.classList.remove('c2');
      lCar.classList.add('c3');
      break;
  }
}

function moveCarsRight(rCar) {
  switch (!!rCar) {
    case rCar.classList.contains('c3'):
      rCar.classList.remove('c3');
      rCar.classList.add('c2');
      break;
    case rCar.classList.contains('c2'):
      rCar.classList.remove('c2');
      rCar.classList.add('c1');
      break;
    case rCar.classList.contains('c1'):
      rCar.classList.remove('c1');
      rCar.classList.add('c3');
      break;
    case rCar.classList.contains('c3'):
      rCar.classList.remove('c3');
      rCar.classList.add('c2');
      break;
    case rCar.classList.contains('c2'):
      rCar.classList.remove('c2');
      rCar.classList.add('c1');
      break;
  }
}

function lose() {
  if (
    squares[currentIndex].classList.contains('c1') ||
    squares[currentIndex].classList.contains('l4', 'l5') ||
    currentTime == 0
  ) {
    resultDisplay.textContent = ' dead :((';
    squares[currentIndex].classList.remove('frog');
    document.removeEventListener('keyup', moveFrog);
    clearInterval(timerId);
    clearInterval(outcome);
  }
}

function win() {
  if (squares[currentIndex].classList.contains('ending-block')) {
    resultDisplay.textContent = ' the WINNER !!!';
    squares[currentIndex].classList.remove('frog');
    document.removeEventListener('keyup', moveFrog);
    clearInterval(timerId);
    clearInterval(outcome);
  }
}

startPauseBtn.addEventListener('click', startPause);

function startPause() {
  if (timerId) {
    clearInterval(timerId);
    clearInterval(outcome);
    outcome = null;
    timerId = null;
    document.removeEventListener('keyup', moveFrog);
  } else {
    timerId = setInterval(avtoMove, 1000);
    checkOutcome = setInterval(outcome, 50);
    document.addEventListener('keyup', moveFrog);
  }
}
