const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoiceDisplay = document.getElementById('user-choice');
const resultDisplay = document.getElementById('result');
const possibleChoices = document.querySelectorAll('button');

let userChoice;

possibleChoices.forEach((possibleChoice) =>
  possibleChoice.addEventListener('click', (e) => {
    userChoice = e.target.id;
    userChoiceDisplay.innerHTML = userChoice;
    genarateComputerChoice();
  })
);

function genarateComputerChoice() {
  let randomNumber = Math.floor(Math.random() * 3) + 1; // or possibleChoices.length

  if (randomNumber === 1) {
    computerChoice = 'rock';
  } else if (randomNumber === 2) {
    computerChoice = 'paper';
  } else if (randomNumber === 3) {
    computerChoice = 'scissors';
  }
  computerChoiceDisplay.innerHTML = computerChoice;
  getResult()
}

function getResult() {
    if (computerChoice === userChoice) {
        result = 'it\'s a draw '
    } else if (
       computerChoice === 'rock' && userChoice === 'paper' 
    || computerChoice === 'paper' && userChoice === 'scissors' 
    || computerChoice === 'scissors' && userChoice === 'rock') {
        result = 'You win!'
    } else {
        result = 'You lost :('
    }

    resultDisplay.innerHTML = result
}
