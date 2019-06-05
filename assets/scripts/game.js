
var wordArray = [
    "blue",
    "red",
    "yellow"
]

var messages = {
    "winMessage": "Congrats, you've guessed the word correctly!",
    "lostMessage": "You've Lost!",
    "errorMessage": "Something's not working here",
    "guessedAlready": "You've already guessed that letter!",
    "blankMessage": " "
}

// An array to store the underscores that represent the missing letters.
var underscoreArray = [];

// Randomly selects a word from the wordArray.
var wordToGuess = wordArray[Math.floor(Math.random() * wordArray.length)];

// fills the UnderscoreArray with the correct number of underscores for the randomly selected word.
for (i = 0; i < wordToGuess.length; i++) {
    underscoreArray[i] = "_"; 
}


var lettersRemaining = wordToGuess.length;
var guessesRemaining = 5;
var wins = 0;
var guessedLettersIncorrect = [];
var startedGame = false;
var endedGame = false;
var userLetterAnyCase = "";
var userLetter = "";


function reset() {
  wordToGuess = wordArray[Math.floor(Math.random() * wordArray.length)];
}

// displays the correct number of blank spaces for the word that was randomly selected. Also adds a space between each underscore.
function displayUnderscores() {
    var underScores = document.getElementById("word_to_guess_container");
    underScores.innerHTML = underscoreArray.join(" ");
}

function wrongLetter() {
    if (guessedLettersIncorrect.includes(userLetter) === true) {
    // if the user picks an incorrect letter that they already picked, don't remove a guess, and pop up a message that tells
    // them they already picked that letter.
        var alreadyGuessed = document.getElementById("guessed_already");
        alreadyGuessed.innerHTML = messages["guessedAlready"];
        setTimeout(function(){
            alreadyGuessed.innerHTML = '';
        }, 3000);
    } else if (wordToGuess.includes(userLetter) === false) {
    //If the letter is not included in the word to guess, reduce guesses remaining by 1 and add the incorrect letter to the guessed letters section.
        guessesRemaining--;
        var guessElement = document.getElementById("guesses_remaining_container");
        guessElement.innerHTML = guessesRemaining;
        guessedLettersIncorrect.push(userLetter);
        var guessedLetters = document.getElementById("guessed_letters_container");
        guessedLetters.innerHTML = guessedLettersIncorrect.join(" ");
    }
}

        function checkLetters(keyPressed) {
            // whichever key the user presses will be converted to lower case to check against the array.
            userLetterAnyCase = keyPressed.key;
            userLetter = userLetterAnyCase.toLowerCase();
                if (wordToGuess.includes(userLetter) === false) {
                    wrongLetter();
                } else if (wordToGuess.includes(userLetter) === true) {
            // if the user picks a letter that is in the word, then replace the underscore at the correct index with the letter.
                    for( a = 0; a < wordToGuess.length ; a++) {
                        if (wordToGuess[a] == userLetter) {
                            underscoreArray[a] = userLetter;
                            lettersRemaining--;
                        }
                    }
                } 
            displayUnderscores();
            checkWin();
        }

        function checkWin() {
            if(underscoreArray.indexOf("_") === -1){
                alert("You've guessed the right word!");
                wins++;
                reset();
                getContainers("wins_container", wins);
            } else if(guessesRemaining < 0) {
                alert("You've run out of guesses for this word!");
            }
        }

function getContainers(container, replacementhtml) {
    var element = document.getElementById(container);
    element.innerHTML = replacementhtml;
}

var letters = /^[A-Za-z]+$/;


// Event Listeners
// window.addEventListener('load', startGame);
// document.addEventListener('keyup', logKey);
document.addEventListener('keyup', checkLetters);
