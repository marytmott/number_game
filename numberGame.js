$(function() {
  var remainingPlayerNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var remainingComputerNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var $playerScore = $('#player-score');
  var $computerScore = $('#computer-score');
  var $gameOutcome = $('.game-outcome');

  function getPlayerNum() {
    var playerNum = parseInt(prompt('Choose a number between 1 and 10 which you haven\'t previously chosen. \nThese are your remaining numbers: \n' + remainingPlayerNums));

      if (!isNaN(playerNum)) {
        removeNum(playerNum, 'player');
        return playerNum;
      } else {
        getPlayerNum();
      }
  }

  function getComputerNum() {
    var computerNum = remainingComputerNums[Math.floor(Math.random() * remainingComputerNums.length)];
    removeNum(computerNum, 'computer');
    return computerNum;
  }

  function removeNum(num, player) {
    var indexOfNum;

    if (player === 'player') {
      indexOfNum = remainingPlayerNums.indexOf(num);
      remainingPlayerNums.splice(indexOfNum, 1);
    } else {
      indexOfNum = remainingComputerNums.indexOf(num);
      remainingComputerNums.splice(indexOfNum, 1);
    }
  }

  function getWinner(playerNum, computerNum) {
    var playerPoints;
    var computerPoints;
    var numsChosen = 'Player chose ' + playerNum + '. Computer chose ' + computerNum + '.';
    var winnerMsg;

    if (playerNum === computerNum) {
      winnerMsg = 'The result is a tie.'
    } else if (playerNum < computerNum) {
      if (playerNum === computerNum - 1) {
        playerPoints = 2;
      } else {
        playerPoints = 1;
      }
      winnerMsg = 'You win this round.';
      $playerScore.html(parseInt($playerScore.html()) + playerPoints);
    } else {
      if (computerNum === playerNum - 1) {
        computerPoints = 2;
      } else {
        computerPoints = 1;
      }
      winnerMsg = 'The computer wins this round.';
      $computerScore.html(parseInt($computerScore.html()) + computerPoints);
    }

    $gameOutcome.html('');
    $gameOutcome.append('<h3>' + numsChosen + '</h3>');
    $gameOutcome.append('<h3>' + winnerMsg + '</h3>');
  }

  function checkForWinner() {
    var playAgain;

    if ($playerScore.html() >= 5 || $computerScore.html() >= 5
    || remainingPlayerNums.length === 0 || remainingComputerNums.length === 0) {

      playAgain = prompt('Do you want to play again? (y/n)');

      if (playAgain.toLowerCase() === 'y') {
        $playerScore.html('0');
        $computerScore.html('0');
        $gameOutcome.html('');
        playGame();
      }

    } else playGame();
  }

  function playGame() {
    var playerNum = getPlayerNum();
    var computerNum = getComputerNum();

    getWinner(playerNum, computerNum);
    checkForWinner();
  }

  playGame();
});