
var wordArray = [
    "blue",
    "red",
    "yellow"
]

// selects a random word from the wordArray
var wordToGuess = wordArray[Math.floor(Math.random() * wordArray.length)]

// displays the correct number of blank spaces for the word that was randomly selected
function displayUnderscores() {
    var wordLength = wordToGuess.length;
    var underScores = document.getElementById("word_to_guess_container");
    var letter = "_ "
    underScores.innerHTML = letter.repeat(wordLength);
}

function checkLetters(letterGuessed) {
    var userLetter = letterGuessed.key;
    console.log("You guessed: " + userLetter);
    // if (letterGuessed.keyCode == /^[A-Za-z]+$/) {
    //     console.log("this is working?");
    // } else {
    //     console.log("this isn't working");
    // }
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
document.addEventListener('keyup', checkLetters);