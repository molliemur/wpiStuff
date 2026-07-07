const numField = document.getElementById('numField');
const messageText = document.getElementById('messageText');
const guessCountText = document.getElementById('guessCountText');
const guessButton = document.getElementById('guessButton');
const resetButton = document.getElementById('resetButton');
//set min and max values for the game
let min=1;
let max=100;
// secret number to be guessed
let secret;
// count of guesses to be made
let guessCount = 0;

function loadGame(){
secret = Math.floor(Math.random()*(max-min+1))+min;
guessCount=0;
messageText.textContent="Enter a number and make your first guess";
guessCountText.textContent="Guess count: 0";

console.log("secret# is " + secret);//for debugging purposes
}
loadGame();