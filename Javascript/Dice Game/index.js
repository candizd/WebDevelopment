function getRandomInt(max) {
  return Math.floor(Math.random() * max + 1);
}

function changeDice(randomNumber1, randomNumber2) {
  document.querySelector(".img1").setAttribute("src", "images/dice" + randomNumber1 + ".png");
  document.querySelector(".img2").setAttribute("src", "images/dice" + randomNumber2 + ".png");
}

function declareWinner(randomNumber1, randomNumber2) {
  if (randomNumber1 == randomNumber2) {
    document.querySelector("h1").innerHTML = "DRAW";
  }
  else if (randomNumber1 > randomNumber2) {
    document.querySelector("h1").innerHTML = "🚩 Player 1 Wins";
  }
  else {
    document.querySelector("h1").innerHTML = "Player 2 Wins 🚩";
  }

}

var randomNumber1 = getRandomInt(6);
var randomNumber2 = getRandomInt(6);


changeDice(randomNumber1, randomNumber2);
declareWinner(randomNumber1,randomNumber2);
