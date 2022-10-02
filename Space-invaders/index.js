const grid = document.querySelector('.grid');
let displayResult = document.querySelector('#result');
let currentShooterPosition = 202;
let width = 15;
let derection = 1;
let goingRight = true;
let invadersId;
let aliensRemoved = []
let result = 0

for (let i = 0; i < 225; i++) {
  const square = document.createElement('div');
  grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll('.grid div'));

const alianInvaders = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39,
];

function draw() {
  for (let i = 0; i < alianInvaders.length; i++) {

    if (!aliensRemoved.includes(i)) {
    squares[alianInvaders[i]].classList.add('aliens')
    }
  }
}
draw();

function remove() {
  for (let i = 0; i < alianInvaders.length; i++) {
    squares[alianInvaders[i]].classList.remove('aliens');
  }
}
squares[currentShooterPosition].classList.add('shooter');

function moveShooter(e) {
  squares[currentShooterPosition].classList.remove('shooter');
  switch (e.key) {
    case 'ArrowLeft':
      if (currentShooterPosition % width !== 0) currentShooterPosition -= 1;
      break;
    case 'ArrowRight':
      if (currentShooterPosition % width < width - 1)
        currentShooterPosition += 1;
  }
  squares[currentShooterPosition].classList.add('shooter');
}

document.addEventListener('keydown', moveShooter);

function moveInvaders() {
  const leftEdge = alianInvaders[0] % width === 0;
  const rightEdge =
    alianInvaders[alianInvaders.length - 1] % width === width - 1;
  remove();
  

  if (rightEdge && goingRight) {
    for (let i = 0; i < alianInvaders.length; i++) {
      alianInvaders[i] += width + 1;
      derection = -1;
      goingRight = false;
    }
  }

  if (leftEdge && !goingRight) {
    for (let i = 0; i < alianInvaders.length; i++) {
      alianInvaders[i] += width - 1;
      derection = 1;
      goingRight = true;
    }
  }

  for (let i = 0; i < alianInvaders.length; i++) {
    alianInvaders[i] += derection;
  }

  draw();
  
  if (squares[currentShooterPosition].classList.contains('aliens', 'shooter')) {
    displayResult.innerHTML = 'GAME OVER';
    clearInterval(invadersId);
  } 

  for (let i = 0; i < alianInvaders.length; i++) {
    if (alianInvaders[i] >= squares.length - width) {
      clearInterval(invadersId);
      displayResult.innerHTML = 'GAME OVER';
    } 
  }

  if (aliensRemoved.length === alianInvaders.length) {
    displayResult.innerHTML = 'YOU WIN!'
    clearInterval(laserId)
  }
}


invadersId = setInterval(moveInvaders, 400);


function shoot(e) {
  let laserId
  let currentLaserPosition = currentShooterPosition
  function moveLaser() {
    squares[currentLaserPosition].classList.remove('laser')
    currentLaserPosition -= width
    squares[currentLaserPosition].classList.add('laser')
  
  if (squares[currentLaserPosition].classList.contains('aliens')) {
    squares[currentLaserPosition].classList.remove('laser')
    squares[currentLaserPosition].classList.remove('aliens')
    squares[currentLaserPosition].classList.add('boom')

    setTimeout(()=> squares[currentLaserPosition].classList.remove('boom'), 50)
    clearInterval(laserId)
    result++
    displayResult.innerHTML = result

    const alienRemoval = alianInvaders.indexOf(currentLaserPosition)
    aliensRemoved.push(alienRemoval)
    }
    
  }
 
  switch(e.key) {
    case 'ArrowUp':
      laserId = setInterval(moveLaser, 50)
  }
}

document.addEventListener('keydown' ,shoot)