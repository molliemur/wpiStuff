let words = []
const letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
let secretWord =""
let tries = 0;
let mode=false;
const guessField = document.getElementById("guessField");
const messageText = document.getElementById("messageText");
const historyTableBody = document.getElementById("historyTableBody")
const secretDisplay = document.getElementById("secretDisplay")
const wordListFile = document.getElementById("wordListFile")
let myConfetti = null;
if(window.confetti){
    myConfetti= confetti.create(null, {
        resize: true,
        useWorker: true
    });
}


function hardMode(){
mode = true;
startGame();
const hardLetter1 = letters[Math.floor(Math.random()*letters.length)];
const hardLetter2 = letters[Math.floor(Math.random()*letters.length)];
const hardLetter3 = letters[Math.floor(Math.random()*letters.length)];
const hardLetter4 = letters[Math.floor(Math.random()*letters.length)];
const hardLetter5 = letters[Math.floor(Math.random()*letters.length)];
hardWord = [hardLetter1+hardLetter2+hardLetter3+hardLetter4+hardLetter5]
secretWord = hardWord.toString();
console.log("secret word:", secretWord);
mode=false;
}
async function getRandomWord() {
    try{
        const response = await fetch("https://random-word-api.herokuapp.com/word?length=5&number=20")
        const data = await response.json();
        return data

    } catch(error){
        console.error("error fetching random word", error);
        return null;
    }
}
async function startGame() {
     if(mode===false){
        words = await getRandomWord();
        secretWord = words[Math.floor(Math.random()*words.length)];
        console.log("secret word:", secretWord);
        if(!secretWord){
            messageText.textContent = "your a failure try again"
            return;
        }
    }
            tries =0;
    guessField.value="";
    historyTableBody.innerHTML="";
    hideSecretWord();
    
}


function hideSecretWord(){
    secretDisplay.textContent=" ";
    for(let i=0; i< secretWord.length; i++){
        let box = document.createElement("span");
        box.innerHTML = " "
        secretDisplay.appendChild(box);
    }
}
function showSecretWord(){
    // secretWord=secretWord.toUpperCase
    secretDisplay.textContent=" ";
    for (let i=0; i<secretWord.length; i++){
        let box = document.createElement("span");
        box.innerHTML = secretWord[i];
        secretDisplay.appendChild(box);

    }
}
function checkGuess(){
    const guess = guessField.value.toLowerCase();
    // secretWord=secretWord.toLowerCase();
    tries++;
    if(guess.length !== secretWord.length){
        messageText.textContent = "please enter a 5 letter word";
        return;
    }
    resultHTML = buildLetterFeedback(guess);
    if(guess === secretWord){
        messageText.textContent = "yay";
            showSecretWord();
            if(myConfetti){
            myConfetti({
                particalCount:100,
                spread:160
            });
        }
    } else{
        addGuessToTable(guess, resultHTML);
        messageText.textContent = "nope";
    }
    guessField.value="";
}
function buildLetterFeedback(guess){
    let resultHTML = " ";
    for (let i= 0; i<guess.length; i++){
        let letter = guess[i]
        let cssClass = "";
        if(letter === secretWord[i]){
            cssClass ="correct";
            
        }else if(secretWord.includes(letter)){
            cssClass="close";
        }else{
            cssClass="wrong";
        }
        resultHTML += `<span class="letter-box ${cssClass}">${letter.toUpperCase()}</span>`;

    }
    return resultHTML;
}
function addGuessToTable(guess, resultHTML){
    const row = document.createElement("tr");
    let tryCell = document.createElement("td");
    tryCell.textContent=tries;
    let guessCell = document.createElement("td");
    guessCell.textContent = guess.toUpperCase();
    let resultCell = document.createElement("td");
    resultCell.innerHTML = resultHTML;
    row.appendChild(tryCell);
    row.appendChild(guessCell);
    row.appendChild(resultCell);
    historyTableBody.appendChild(row)
}
function importWordListFile(){
    let file = wordListFile.files[0];
    if(!file){
        messageText.innerHTML="invalid file";
    }
    let reader = new FileReader();
    reader.onload = function(event){
        let fileText = event.target.result;
        let importedWords = fileText.split("\n");
        let validWords=[];

        for (let i = 0;  i < importedWords.length; i++) {
            let words = importedWords[i].trim().toLowerCase();
            if(words.length === 5){
                validWords.push(words);
            }
        }
        if(validWords.length===0){
            messageText.innerHTML = "no valid five letter words"
            return;
        }
        words = validWords;
        messageText.innerHTML = "imported " + validWords.length +" words. starting new game."
        
        startGame();
    }
    reader.readAsText(file);
}
if(mode===false){
startGame();
}