let scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    //-- Chiffre Random --//
    let dice = Math.floor(Math.random() * 6) + 1;

    //-- Afficher le Résultat --//
    let diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "images/de-" + dice + ".png";
    diceSound();

    //-- Mise à jour du Résultat si le chiffre était différent de 0 --//
    if (dice !== 1) {
      //-- Ajout du Score --//
      roundScore += dice;
      document.querySelector("#current-" + activePlayer).textContent =
        roundScore;
    } else {
      //-- Joueur Suivant --//
      nextPlayer();
      looseSound();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    // -- Ajout du score ACTUEl au score GLOBAL -- //
    scores[activePlayer] += roundScore;

    // -- Mise à Jour de l'interface Utilisateur -- //
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    // -- Vérifier si le joueur gagne la partie -- //
    if (scores[activePlayer] >= 100) {
      document.querySelector("#name-" + activePlayer).textContent = "Victoire!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
      victorySound();
    } else {
      //-- Joueur Suivant --//
      nextPlayer();
    }
  }
});

function nextPlayer() {
  initDice();
  //-- Joueur Suivant --//
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}

document.querySelector(".btn-new").addEventListener("click", init);

function initDice() {
  let diceDOM = document.querySelector(".dice");
  diceDOM.src = "images/de-1.png";
}

//-- Fonction "Sound" pour la Victoire, lancer de dé, et changement de joueur au chiffre 1 --//
function victorySound() {
  let victorySound = new Audio("sound/victorySound.mp3");
  victorySound.play();
  victorySound.volume = 0.6;
}

function diceSound() {
  let diceSound = new Audio("sound/diceSound.mp3");
  diceSound.play();
  diceSound.volume = 0.4;
}

function looseSound() {
  let looseSound = new Audio("sound/looseSound.mp3");
  looseSound.play();
  looseSound.volume = 0.3;
}

function init() {
  initDice();
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Joueur 1";
  document.getElementById("name-1").textContent = "Joueur 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
