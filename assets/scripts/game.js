
//Global Variables

var underscoreArray = [];
var wordToGuess = "";
var pokeImage = "";
var lettersRemaining = wordToGuess.length;
var guessesRemaining = 5;
var wins = 0;
var losses = 0;
var guessedLettersIncorrect = [];
var userLetter = "";

// selects a random pokemon from the array, picks out the name and image of the pokemon, applies the image to the screen,
// and fills the underscore array with an underscore for each letter of the pokemon name.
function startGame() {
    var pokeIndex = Math.floor(Math.random()*pokes.length);
    wordToGuess = pokes[pokeIndex]["name"];
    pokeImage = pokes[pokeIndex]["img"];
    document.getElementById("topical_image").src = "assets/images/pokemonImages/" + pokeImage;
    document.getElementById("topical_image").classList.add("blur");
    for (i = 0; i < wordToGuess.length; i++) {
        underscoreArray[i] = "_"; 
    }
    displayUnderscores();
}

// After the user has won or lost a game, it resets the guesses remaining counter, and emptys the arrays for the incorrect letters and underscores.
// Also resets the image and the pokeDex text.
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
}


// If the user selected a letter that does not appear in the word to guess, this function adds the incorrect letters to an array of incorrect
// letters, displays them, and reduces the guesses remaining by 1. If they had already guessed that letter, it does not remove a guess or
// add the letter to the incorrect letters, but instead makes the pokeDex area display an error message.
function wrongLetter() {
    if (guessedLettersIncorrect.includes(userLetter) === true) {
        var alreadyGuessed = document.getElementById("pokeDex");
        alreadyGuessed.value = "You've already picked that letter before!";

        setTimeout(function(){
            alreadyGuessed.value = "The PokeDex says...";
        }, 3000);
    } else if (wordToGuess.includes(userLetter) === false) {
        guessesRemaining--;
        var guessElement = document.getElementById("guesses_remaining_container");
        guessElement.innerHTML = guessesRemaining;
        guessedLettersIncorrect.push(userLetter);
        var guessedLetters = document.getElementById("guessed_letters_container");
        guessedLetters.innerHTML = guessedLettersIncorrect.join(" ");
    }
}

// Checks if the letter the user inputted is in the word to Guess. If it does not appear, it runs the function wrongLetter. If it does, it
// replaces the underscore at the correct index for the letter. Then updates the display of the underscores.
function checkLetters(keyPressed) {
    userLetter = keyPressed.key.toLowerCase();
    if (wordToGuess.includes(userLetter) === false) {
        wrongLetter();
    } else if (wordToGuess.includes(userLetter) === true) {
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

// Checks if the user has won the game by seeing if there are any underscores remaining in the underscore array. Checks if the user
// has lost the game by seeing if they have any remaining guesses. Adds to the wins or the losses counters. Then runs the reset function.
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
        document.getElementById("topical_image").classList.remove("blur");
        var lost = document.getElementById("pokeDex");
        lost.value = "You've lost! The pokemon was " + wordToGuess + ". Restarting game now...";
        losses++;
        getContainers("lost_container", losses);
        setTimeout(function(){
            reset();
        }, 3000);
    }
}

// a function to make it faster to set the innerhtml of various elements with Ids.
function getContainers(container, replacementhtml) {
    var element = document.getElementById(container);
    element.innerHTML = replacementhtml;
}

// The array from which the random word to guess is selected. 

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
    { "name": "caterpie", "img": "010Caterpie.png" },
    { "name": "metapod", "img": "011Metapod.png" },
    { "name": "butterfree", "img": "012Butterfree.png" },
    { "name": "weedle", "img": "013Weedle.png" },
    { "name": "kakuna", "img": "013Weedle.png" },
    { "name": "beedrill", "img": "015Beedrill.png" },
    { "name": "pidgey", "img": "016Pidgey.png" },
    { "name": "pidgeotto", "img": "017Pidgeotto.png" },
    { "name": "pidgeot", "img": "018Pidgeot.png" },
    { "name": "rattata", "img": "019Rattata.png" },
    { "name": "raticate", "img": "020Raticate.png" },
    { "name": "spearow", "img": "021Spearow.png" },
    { "name": "fearow", "img": "022Fearow.png" },
    { "name": "ekans", "img": "023Ekans.png" },
    { "name": "arbok", "img": "024Arbok.png" },
    { "name": "pikachu", "img": "025Pikachu.png" },
    { "name": "raichu", "img": "026Raichu.png" },
    { "name": "sandshrew", "img": "027Sandshrew.png" },
    { "name": "sandslash", "img": "028Sandslash.png" },
    { "name": "nidoran", "img": "029Nidoran.png" },
    { "name": "nidorina", "img": "030Nidorina.png" },
    { "name": "nidoqueen", "img": "031Nidoqueen.png" },
    { "name": "nidoran", "img": "032Nidoran.png" },
    { "name": "nidorino", "img": "033Nidorino.png" },
    { "name": "nidoking", "img": "034Nidoking.png" },
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
    // { "name": "", "img": "" },
    // { "name": "", "img": "" },
    // { "name": "", "img": "" },

    { "name": "jigglypuff", "img": "039Jigglypuff.png"}
]

// Event Listeners
window.addEventListener('load', startGame);
document.addEventListener('keyup', checkLetters);
