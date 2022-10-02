document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div');
  const displayCurrunetPlayer = document.querySelector('#currentPlayer');
  const result = document.querySelector('#result');
  let currentPlayer = 1;

  for (let i = 0; i < squares.length; i++) {
    squares[i].onclick = () => {
      // If the square bellow is taken, then you can step on top of it
      if (squares[i + 7].classList.contains('taken')) {
        // Here I check how's turn now and set a ball poin, switch the second player
        if (currentPlayer == 1) {
          squares[i].classList.add('taken');
          squares[i].classList.add('player-one');
          currentPlayer = 2;
          displayCurrunetPlayer.innerHTML = currentPlayer;
          // In this circle I check for the winner colissions horizontaly and vertically
          if (
            squares[i].classList.contains('player-one') &&
            squares[i + 1].classList.contains('player-one') &&
            squares[i + 2].classList.contains('player-one') &&
            squares[i + 3].classList.contains('player-one') 
          ) {
            displayCurrunetPlayer.innerHTML = ' ONE WINNER FLOOR!';

          } else if (
            squares[i].classList.contains('player-one') &&
            squares[i - 1].classList.contains('player-one') &&
            squares[i - 2].classList.contains('player-one') &&
            squares[i - 3].classList.contains('player-one') 
          ) {
            displayCurrunetPlayer.innerHTML = ' ONE WINNER FLOOR!';

          } else if (squares[i + 7, i + 14, i + 21].classList.contains('player-one')) {
            displayCurrunetPlayer.innerHTML = ' ONE WINNER TOWER !';
          }

        // Here I check how's turn now and set a ball poin, switch to the first player
        } else if (currentPlayer == 2) {
          squares[i].classList.add('taken');
          squares[i].classList.add('player-two');
          currentPlayer = 1;
          displayCurrunetPlayer.innerHTML = currentPlayer;
          // In this circle I check for the winner colissions horizontaly and vertically
          if (
            squares[i].classList.contains('player-two') &&
            squares[i + 1].classList.contains('player-two') &&
            squares[i + 2].classList.contains('player-two') &&
            squares[i + 3].classList.contains('player-two') 
          ) {
            displayCurrunetPlayer.innerHTML = ' ONE WINNER FLOOR!';

          } else if (
            squares[i].classList.contains('player-two') &&
            squares[i - 1].classList.contains('player-two') &&
            squares[i - 2].classList.contains('player-two') &&
            squares[i - 3].classList.contains('player-two') 
          ) {
            displayCurrunetPlayer.innerHTML = ' TWO WINNER FLOOR!';

          } else if (squares[i + 7, i + 14, i + 21].classList.contains('player-two')) {
            displayCurrunetPlayer.innerHTML = ' TWO WINNER TOWER !';
          }
        }
      } else {
        alert("You can't go there!");
      }
    };
  }
});
