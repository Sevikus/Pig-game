/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying;

function reset() {
scores = [0, 0];
roundScore = 0;
activePlayer = 0;
gamePlaying = true;
document.querySelector('.dice').style.display = 'none';
document.querySelector('.dice1').style.display = 'none'; 
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
};
reset();

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    // 1. random number
	dice = Math.floor(Math.random() * 6) + 1;
  dice1 = Math.floor(Math.random() * 6) + 1;
	// 2. display the result
	var diceDOM = document.querySelector('.dice');
	diceDOM.style.display = 'block';
	diceDOM.src = 'dice-' + dice + '.png'; 

  var diceDOM1 = document.querySelector('.dice1');
  diceDOM1.style.display = 'block';
  diceDOM1.src = 'dice-' + dice1 + '.png'; 
	document.querySelector('#current-' + activePlayer).textContent = dice + dice1;
        // 3. update the round score IF the rolled number was not a 1 
	if (dice !== 1 && dice1 !== 1) {
        roundScore = roundScore + dice + dice1;
        document.getElementById('current-' + activePlayer).textContent = roundScore;		
	} else {nextPlayer();}
  }   
 });   

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    // 1. add current score to flobal
    scores[activePlayer] += roundScore;
    // 2. update the UI   
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];    
    // 3. Chack if player won the game
    if (scores[activePlayer] > 50) {
    	document.getElementById('name-' + activePlayer).textContent = 'Winner';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice1').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    } else {
    // 4. next player
    nextPlayer();
    }
  }  
});

function nextPlayer() {
	roundScore = 0;
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	//if (activePlayer = 0) {activePlayer = 1;} 
    //else {activePlayer = 0;}
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
        
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    //document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', function() {
   reset(); 
   document.querySelector('.player-0-panel').classList.remove('winner');
   document.querySelector('.player-1-panel').classList.remove('winner');
   document.querySelector('.player-0-panel').classList.add('active');
   document.querySelector('.player-1-panel').classList.remove('active')

   document.getElementById('name-0').textContent = 'PLAYER 1';
   document.getElementById('name-1').textContent = 'PLAYER 2';
});

//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//var x = document.querySelector('#score-0').textContent;