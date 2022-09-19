const grid = document.querySelector('.grid');

const displayScore = document.querySelector('#score');
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;
const ballDiametr = 20;
let ballTimerId;
let xDirection = 2;
let yDirection = 2;
let score = 0;

const userStart = [230, 10];
let currentPosition = userStart;

const ballStart = [260, 30];
let currentBallPosition = ballStart;

// Create Block
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRihgt = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

// My blocks
const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(120, 240),
  new Block(10, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];

// Draw all my blocks
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.style.left = blocks[i].bottomLeft[0] + 'px';
    block.style.bottom = blocks[i].bottomLeft[1] + 'px';
    grid.appendChild(block);
  }
}
addBlocks();

// Add the usser
const user = document.createElement('div');
user.classList.add('user');
drawUser();
grid.appendChild(user);

// Draw the user
function drawUser() {
  user.style.left = currentPosition[0] + 'px';
  user.style.bottom = currentPosition[1] + 'px';
}

// Draw the ball
const ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
grid.appendChild(ball);

// Move user
function moveUser(e) {
  switch (e.key) {
    case 'ArrowLeft':
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        drawUser();
      }
      break;
    case 'ArrowRight':
      if (currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 10;
        drawUser();
      }
      break;
  }
}

document.addEventListener('keydown', moveUser);

// Draw the ball
function drawBall() {
  ball.style.left = currentBallPosition[0] + 'px';
  ball.style.bottom = currentBallPosition[1] + 'px';
}

// Move the ball
function moveBall() {
  currentBallPosition[0] += xDirection;
  currentBallPosition[1] += yDirection;
  drawBall();
  checkForCollisions();
}

ballTimerId = setInterval(moveBall, 30);

// Check for collisions
function checkForCollisions() {
  // Check for blocks collision
  for (let i = 0; i < blocks.length; i++) {
    if (
      currentBallPosition[0] > blocks[i].bottomLeft[0] &&
      currentBallPosition[0] < blocks[i].bottomRight[0] &&
      currentBallPosition[1] + ballDiametr > blocks[i].bottomLeft[1] &&
      currentBallPosition[1] < blocks[i].bottomRight[1]
    ) {
      const allBlocks = Array.from(document.querySelectorAll('.block'));
      allBlocks[i].classList.remove('block');
      blocks.splice(i, 1);
      changeDirection();
      score++;
      displayScore.innerHTML = score;
    }

    // Check if I won
    if (blocks.length === 0) {
       displayScore.innerHTML = 'YOU WIN!'
       clearInterval(ballTimerId)
       document.removeEventListener('keydown', moveUser)

    }
  }

  // Check for collision with walls
  if (
    currentBallPosition[0] >= boardWidth - ballDiametr ||
    currentBallPosition[1] >= boardHeight - ballDiametr ||
    currentBallPosition[0] <= 0
  ) {
    changeDirection();
  }

  // Check for user collision
  if (
    currentBallPosition[0] > currentPosition[0] &&
    currentBallPosition[0] < currentPosition[0] + blockWidth &&
    currentBallPosition[1] > currentPosition[1] &&
    currentBallPosition[1] < currentPosition[1] + blockHeight
  ) {
    changeDirection();
  }

  // Check if the game finished
  if (currentBallPosition[1] <= 0) {
    clearInterval(ballTimerId);
    displayScore.innerHTML = 'Game ovar';
    document.removeEventListener('keydown', moveUser);
  }
}

// Change ball diraction
function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
  } else if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
  } else if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
  } else if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
  }
}
