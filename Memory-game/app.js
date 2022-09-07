// doubles imeges for the card board
const cardArrey = [
  { name: 'cheeseburger', img: 'images/cheeseburger.png' },
  { name: 'fries', img: 'images/fries.png' },
  { name: 'hotdog', img: 'images/hotdog.png' },
  { name: 'ice-cream', img: 'images/ice-cream.png' },
  { name: 'milkshake', img: 'images/milkshake.png' },
  { name: 'pizza', img: 'images/pizza.png' },
  { name: 'cheeseburger', img: 'images/cheeseburger.png' },
  { name: 'fries', img: 'images/fries.png' },
  { name: 'hotdog', img: 'images/hotdog.png' },
  { name: 'ice-cream', img: 'images/ice-cream.png' },
  { name: 'milkshake', img: 'images/milkshake.png' },
  { name: 'pizza', img: 'images/pizza.png' },
];

// const additionalCards = [
//   { name: 'blank', img: 'images/blank.png' },
//   { name: 'white', img: 'images/white.png' },
// ];

// chosen viriable where to store cards in the game
const gridDisplay = document.querySelector('#grid');
const resultDisplay = document.querySelector('#result');
let cardChoicen = [];
let cardChoicenIds = [];
let cardWon = [];

// random and sort combo method to shuffle cards
cardArrey.sort(() => 0.5 - Math.random());

// iteration and creating elements, add event listenr and pass to a func
// set cover img and path to its, put cover card in grid
function cardBord() {
  for (let i = 0; i < cardArrey.length; i++) {
    const card = document.createElement('img');
    card.setAttribute('src', 'images/blank.png');
    card.setAttribute('id', i);
    card.addEventListener('click', cardFlip);
    gridDisplay.append(card);
  }
}
// call the func to see our result on the screen
cardBord();

// compare cards and turn answers of a result
// in  case of sucs, remove visually those cards and event listeners
// at the end of the func we clean arrays of clicked ids
function chechMatch() {
  const cards = document.querySelectorAll('img');
  const cardOneId = cardChoicenIds[0];
  const cardTwoId = cardChoicenIds[1];

  if (cardOneId == cardTwoId) {
    alert('You click the same card!');
    cards[cardOneId].setAttribute('src', 'images/blank.png');
    cards[cardTwoId].setAttribute('src', 'images/blank.png');
  } else if (cardChoicen[0] == cardChoicen[1]) {
    alert('You got a match!');
    cards[cardOneId].setAttribute('src', 'images/white.png');
    cards[cardTwoId].setAttribute('src', 'images/white.png');
    cards[cardOneId].removeEventListener('click', cardFlip);
    cards[cardTwoId].removeEventListener('click', cardFlip);
    cardWon.push(cardChoicen);
  } else {
    cards[cardOneId].setAttribute('src', 'images/blank.png');
    cards[cardTwoId].setAttribute('src', 'images/blank.png');
    alert('Sorry try again!');
  }
  resultDisplay.textContent = cardWon.length;
  
  if (cardWon.length == cardArrey.length / 2) {
    resultDisplay.textContent = 'Congratulations, you won!';
  }

  cardChoicen = [];
  cardChoicenIds = [];
}

/* check on which card was clicked, then get the id and find an img from our
arrey.  Pushing new ids to our ampty arrays. At the end of the func 
we check if we clicked on a second card, then call the func after 500 ms */
function cardFlip() {
  const cardId = this.getAttribute('id');
  cardChoicen.push(cardArrey[cardId].name);
  cardChoicenIds.push(cardId);
  // console.log(cardChoicen)
  // console.log(cardChoicenIds)

  this.setAttribute('src', cardArrey[cardId].img);
  if (cardChoicen.length === 2) {
    setTimeout(chechMatch, 500);
  }
}
