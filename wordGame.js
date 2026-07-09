let words = ["words","guess","lives",]
const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
let secretWord =""
let tries = 0;
let mode
const guessField = document.getElementById("guessField");
const messageText = document.getElementById("messageText");
const historyTableBody = document.getElementById("historyTableBody")
const secretDisplay = document.getElementById("secretDisplay")
const wordListFile = document.getElementById("wordListFile")

// function easyMode(){
// mode =words;
// }
// function hardMode(){
// const hardLetter1 = letters[Math.floor(Math.random()*letters.length)];
// const hardLetter2 = letters[Math.floor(Math.random()*letters.length)];
// const hardLetter3 = letters[Math.floor(Math.random()*letters.length)];
// const hardLetter4 = letters[Math.floor(Math.random()*letters.length)];
// const hardLetter5 = letters[Math.floor(Math.random()*letters.length)];
// secretWord = hardLetter1+hardLetter2+hardLetter3+hardLetter4+hardLetter5;
// console.log("secret word:", secretWord);
// }
function startGame(){
   if(mode===words){ 
    secretWord = words[Math.floor(Math.random()*words.length)];
        console.log("secret word: ", secretWord)
}
    tries =0;
    guessField.value="";
    guessField.value=0;
    historyTableBody.innerHTML="";
    hideSecretWord();
}

function easyMode(){
mode =words;
startGame();
}
function hardMode(){
const hardLetter1 = letters[Math.floor(Math.random()*letters.length)];
const hardLetter2 = letters[Math.floor(Math.random()*letters.length)];
const hardLetter3 = letters[Math.floor(Math.random()*letters.length)];
const hardLetter4 = letters[Math.floor(Math.random()*letters.length)];
const hardLetter5 = letters[Math.floor(Math.random()*letters.length)];
secretWord = hardLetter1+hardLetter2+hardLetter3+hardLetter4+hardLetter5;
console.log("secret word:", secretWord);
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
    secretDisplay.textContent=" ";
    for (let i=0; i<secretWord.length; i++){
        let box = document.createElement("span");
        box.innerHTML = secretWord[i];
        secretDisplay.appendChild(box);

    }
}
function checkGuess(){
    const guess = guessField.value.toLowerCase();
    tries++;
    if(guess.length !== secretWord.length){
        messageText.textContent = "please enter a 5 letter word";
        return;
    }
    resultHTML = buildLetterFeedback(guess);
    if(guess === secretWord){
        messageText.textContent = "yay";
            showSecretWord();
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
        let importedWords = [];
        let validWords=[];

        for (let i = 0;  i < importedWords.length; i++) {
            let word = importedWords[i].trim().toLowerCase();
            if(word.length === 5){
                validWords.push(word);
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
}

startGame();