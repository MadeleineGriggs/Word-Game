

var pokes = [
    { "name": "bulbasaur", "img": "001Bulbasaur.png" },
    { "name": "ivysaur", "img": "002Ivysaur.png" },
    { "name": "venusaur", "img": "003Venusaur.png" },
    { "name": "charmander", "img": "004Charmander.png" },
    { "name": "charmeleon", "img": "005Charmeleon.png" },
    { "name": "charizard", "img": "006Charizard.png" },
    { "name": "squirtle", "img": "007Squirtle.png" },
    { "name": "wartortle", "img": "008Wartortle.png" },
    { "name": "blastoise", "img": "009Blastoise.png" },
    // { "name": "", "img": "" },
    // { "name": "", "img": "" },
    // { "name": "", "img": "" },
    // { "name": "", "img": "" },
    // { "name": "", "img": "" },
    // { "name": "", "img": "" },
    // { "name": "", "img": "" },
    // { "name": "", "img": "" },
    // { "name": "", "img": "" },
    // { "name": "", "img": "" },
    // { "name": "", "img": "" },
    // { "name": "", "img": "" },
    // { "name": "", "img": "" },

    { "name": "jigglypuff", "img": "039Jigglypuff.png"}
]


var messages = {
    "winMessage": "Congrats, you've guessed the word correctly!",
    "lostMessage": "You've Lost!",
    "errorMessage": "Something's not working here",
    "guessedAlready": "You've already guessed that letter!",
    "blankMessage": " "
}

var underscoreArray = [];
var wordToGuess = "";
var pokeImage = "";
var lettersRemaining = wordToGuess.length;
var guessesRemaining = 5;
var wins = 0;
var losses = 0;
var guessedLettersIncorrect = [];
var userLetterAnyCase = "";
var userLetter = "";


function startGame() {
    var pokeIndex = Math.floor(Math.random()*pokes.length);
    wordToGuess = pokes[pokeIndex]["name"];
    pokeImage = pokes[pokeIndex]["img"];
    document.getElementById("topical_image").src = "assets/images/" + pokeImage;
    document.getElementById("topical_image").classList.add("blur");
    for (i = 0; i < wordToGuess.length; i++) {
        underscoreArray[i] = "_"; 
    }
    displayUnderscores();
}

function reset() {
    guessesRemaining = 5;
    getContainers("guesses_remaining_container", guessesRemaining);
    guessedLettersIncorrect = [];
    getContainers("guessed_letters_container", guessedLettersIncorrect);
    underscoreArray = [];
    pokeImage = "";
    var won = document.getElementById("pokeDex");
    won.value = "The PokeDex says...";
    startGame();
}

// displays the correct number of blank spaces for the word that was randomly selected. Also adds a space between each underscore.
function displayUnderscores() {
    var underScores = document.getElementById("word_to_guess_container");
    underScores.innerHTML = underscoreArray.join(" ");
    // checkWin();
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
    setTimeout(checkWin, 20);
}

function checkWin() {
    if(underscoreArray.indexOf("_") === -1){
        document.getElementById("topical_image").classList.remove("blur");
        var won = document.getElementById("pokeDex");
        won.value = "You've won! The pokemon was " + wordToGuess + ". Restarting game now...";
        wins++;
        getContainers("wins_container", wins);
        setTimeout(function(){
            reset();
        }, 3000);
        
 
        
    } else if(guessesRemaining < 0) {
        alert("You've run out of guesses for this word!");
        losses++;
        reset();
        getContainers("lost_container", losses);
    }
}

function getContainers(container, replacementhtml) {
    var element = document.getElementById(container);
    element.innerHTML = replacementhtml;
}


// Event Listeners
window.addEventListener('load', startGame);
document.addEventListener('keyup', checkLetters);
