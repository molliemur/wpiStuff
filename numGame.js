const numField = document.getElementById('numField');
const messageText = document.getElementById('messageText');
const guessCountText = document.getElementById('guessCountText');
const guessButton = document.getElementById('guessButton');
const resetButton = document.getElementById('resetButton');
var pastGuesses = [];

//set min and max values for the game
let min=1;
let max=10000;
// secret number to be guessed
let secret;
// count of guesses to be made
let guessCount = 0;

let myConfetti = null;
if(window.confetti){
    myConfetti= confetti.create(null, {
        resize: true,
        useWorker: true
    });
}

function loadGame(){
secret = Math.floor(Math.random()*(max-min+1))+min;
guessCount=0;
messageText.textContent="Enter a number and make your first guess";
guessCountText.textContent="Guess Count: 0";
numField.value='';
numField.textContent='';
pastGuesses=[];


console.log("secret# is " + secret);//for debugging purposes
}
function makeGuess(){

    const guess = parseInt(numField.value);
    if(isNaN(guess)){
        messageText.textContent = "Please enter a valid number.";
        return;
    }
    
  



    if(guess===secret){
        messageText.textContent ="Congrats you did it";
        if(myConfetti){
            myConfetti({
                particalCount:100,
                spread:160
            });
        }
    loadGame();
    }
    else if(pastGuesses.includes(guess)){
        messageText.textContent="you already guessed this number guess a diffrent number";
        guessCount--;
    }else if(guess < secret){
        messageText.textContent = "Too low. Try again";
    }else if(guess>secret){
        messageText.textContent="Too high. Try again";
    }
    guessCount++;
    guessCountText.textContent = "Guess Count: "+guessCount; 
    pastGuesses[guessCount-1]=guess;
    console.log("past guesses " + pastGuesses);//for debugging purposes
    return;
}
numField.addEventListener('keypress',function(event){
    if(event.key==='Enter'){
        makeGuess();
    }
});

loadGame();