
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

// displays the correct number of blank spaces for the word that was randomly selected. Also adds a space between each underscore.
function displayUnderscores() {
    var underScores = document.getElementById("word_to_guess_container");
    underScores.innerHTML = underscoreArray.join(" ");
}

    function checkLetters(keyPressed) {
        var userLetter = keyPressed.key;
        for( a = 0; a < wordToGuess.length ; a++) {
            if (wordToGuess[a] == userLetter) {
                underscoreArray[a] = userLetter;
                lettersRemaining--;
            } else if (wordToGuess[a] !== userLetter){
                console.log("This letter doesn't match.");
            }
        }
        displayUnderscores();
    }

function getContainers(x) {
    var element = document.getElementById(x);
    element.innerHTML = wordToGuess;
}

var letters = /^[A-Za-z]+$/;

function logKey(keyPressed) {
  if (keyPressed.keyCode == letters){
    getContainers("wins_container");
  }
}

// Event Listeners

document.addEventListener('keyup', logKey);
document.addEventListener('keyup', checkLetters);
// document.addEventListener('keyup', displayUnderscores);


// function checkLetters(letterGuessed) {
//     var userLetter = letterGuessed.key;
//     console.log("You guessed: " + userLetter);
//     if (wordToGuess.includes(userLetter)) {

//         for (var i = 0; i < wordToGuess.length; i++) {
//             var letterCorrect = wordToGuess.charAt(i);
//             if (wordToGuess.includes(letterCorrect)) {
//                 console.log(wordToGuess.charAt(i));
//             } else {
//                 console.log("This letter does not appear.");
//             }
//           }
//         console.log("the letter you picked is contained in the word.");
//     } else {
//         console.log("Not sure...");
//     }
// }