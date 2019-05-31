
var wordArray = [
    "blue",
    "red",
    "yellow"
]

// selects a random word from the wordArray
var wordToGuess = wordArray[Math.floor(Math.random() * wordArray.length)]

function displayUnderscores() {
    var wordLength = wordToGuess.length;
    console.log(wordLength);
}

function getContainers(x) {
    var element = document.getElementById(x);
    element.innerHTML = wordToGuess;
}


function logKey(keyPressed) {
  if (keyPressed.keyCode == 87){
    getContainers("wins_container");
  }
}

// Event Listeners

document.addEventListener('keyup', logKey);
document.addEventListener('keyup', displayUnderscores);