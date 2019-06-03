
var wordArray = [
    "blue",
    "red",
    "yellow"
]

// selects a random word from the wordArray
var wordToGuess = wordArray[Math.floor(Math.random() * wordArray.length)];
// An array to store the underscores that represent the missing letters.
var underscoreArray = [];
// fills the UnderscoreArray with the correct number of underscores for the randomly selected word.
for (i = 0; i < wordToGuess.length; i++) {
    underscoreArray[i] = "_"; 
}

var lettersRemaining = wordToGuess.length;
var guessesRemaining = 5;
var wins = 0;
var lost = "You Lost!";


function startGame() {
    displayUnderscores();
    getContainers("guesses_remaining_container", guessesRemaining);
    getContainers("wins_container", wins);
}
// displays the correct number of blank spaces for the word that was randomly selected. Also adds a space between each underscore.
function displayUnderscores() {
    var underScores = document.getElementById("word_to_guess_container");
    underScores.innerHTML = underscoreArray.join(" ");
}


        function checkLetters(keyPressed) {
            var userLetterAnyCase = keyPressed.key;
            var userLetter = userLetterAnyCase.toLowerCase();
            if (lettersRemaining > 0 && guessesRemaining <=0) {
                getContainers("lost_container", lost);
            } else if (lettersRemaining > 0 && guessesRemaining > 0) {
                if (wordToGuess.includes(userLetter) === false) {
                    guessesRemaining--;
                    var guessElement = document.getElementById("guesses_remaining_container");
                    guessElement.innerHTML = guessesRemaining;
                } else if (wordToGuess.includes(userLetter) === true) {
                    for( a = 0; a < wordToGuess.length ; a++) {
                        if (wordToGuess[a] == userLetter) {
                            underscoreArray[a] = userLetter;
                            lettersRemaining--;
                        }
                    }
                } 
            } else if (underscoreArray.join("") === wordToGuess) {
                getContainers("wins_container", wins++);
            }
            displayUnderscores();
        }

function getContainers(container, replacementhtml) {
    var element = document.getElementById(container);
    element.innerHTML = replacementhtml;
}

var letters = /^[A-Za-z]+$/;

// function logKey(keyPressed) {
//   if (keyPressed.keyCode == letters){
//     getContainers("wins_container");
//   }
// }

// Event Listeners
window.addEventListener('load', startGame);
// document.addEventListener('keyup', logKey);
document.addEventListener('keyup', checkLetters);
