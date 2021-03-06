/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;

document.querySelector(".btn-roll").addEventListener("click", function() {
    
    if (gamePlaying) {
        var dice = Math.floor(Math.random() * 6) + 1;
    
        var diceDOM = document.querySelector(".dice");
        diceDOM.style.display = "block";
        diceDOM.src = "dice-" + dice + ".png";

        if (dice === 6 && lastDice === 6) {
            scores[activePlayer] = 0;
            document.getElementById("score-" + activePlayer).innerHTML = 0;
            nextPlayer();
        } else if (dice !== 1) {
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).innerHTML = '<em>' + roundScore + '<em>';
        } else { 
            nextPlayer();
        }
        lastDice = dice;
    }
});    
 
document.querySelector(".btn-hold").addEventListener("click", function() {
    if (gamePlaying) {   
        scores[activePlayer] += roundScore;
        document.getElementById("score-" + activePlayer).innerHTML = scores[activePlayer];
       
        var input = document.querySelector(".final-score").value;
        var winningScore
        if(input && !isNaN(input)) {
            var winningScore = input;
        } else { 
            winningScore = 100; 
        }


        if (scores[activePlayer] >= winningScore) {
            document.getElementById("name-" + activePlayer).innerHTML = "WINNER";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else {
            nextPlayer(); 
        }
    }
});   

document.querySelector(".btn-new").addEventListener("click", init);
    
function nextPlayer() {
    document.getElementById("current-" + activePlayer).innerHTML = 0;
    roundScore = 0; 
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;  
    document.querySelector(".player-0-panel").classList.toggle("active"); 
    document.querySelector(".player-1-panel").classList.toggle("active");  
}
    
function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;  
    gamePlaying = true;
    document.querySelector(".dice").style.display = "none";
    document.getElementById("score-0").innerHTML = 0;
    document.getElementById("score-1").innerHTML = 0;
    document.getElementById("current-0").innerHTML = 0;
    document.getElementById("current-1").innerHTML = 0;

    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");

    document.getElementById("name-0").innerHTML = "Player 1";
    document.getElementById("name-1").innerHTML = "Player 2";

    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
}

































