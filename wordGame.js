const WPI_QWEN_URL = "https://ggpt-llm-p-u02.int.wpi.edu/v1/chat/completions";
const WPI_QWEN_MODEL = "qwen-cli";
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
const apiKeyField = document.getElementById("apiKeyField");
let hintText = document.getElementById("hintText");
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
function loadPage(){
    const savedApiKey= localStorage.getItem("wpiQwenApiKey") || "";
    apiKeyField.value = savedApiKey;
    hideSecretWord();

}
function saveApiKey(){
    localStorage.setItem("wpiQwenApiKey", apiKeyField.value);
    messageText.textContent="saved api key"
}
function clearApiKey(){
    localStorage.removeItem("wpiQwenApiKey");
    apiKeyField.value="";
    messageText.textContent= "api cleared from local storage"
}
async function askQwen(prompt) {
    const apiKey = localStorage.getItem("wpiQwenApiKey")||apiKeyField.value;
    if(!apiKey){
        messageText.textContent ="please enter your api key"
        throw new Error("Missing Qwen api key")
    }
    const response = await fetch(WPI_QWEN_URL,{
      method:"POST",
      headers:{
        "auth": `Bearer${apiKey}`,
        "ContentType": "application/json"
      },
      body:JSON.stringify({
        model: WPI_QWEN_MODEL, 
        messages:[{
            role:"system",
            content:"/no_think You are helping students play a simple word guessing game. follow the directions exactly"
        },
    {
        role:"user",
        content:prompt
    }],
        temperature: 0.7,
        max_tokens:200,
        stream: false,
        chat_temperature_kwargs:{
            enable_thinking:false``
        }
      })
    });
    if(!response.ok){
        throw new Error("failed to fetch response from Qwen api");
    }
    const data = await response.json();
    return data.choice[0].message.content.trim();
}
async function askForHint() {
  if(!secretWord){
    messageText.textContent="Please enter a word first"
    return
  }
    const prompt = `The secret word is "${secretWord}"\
    Give one short hint for a 9th grader to guess the word\
    do not revel the word or any letters \
    the hint should be a single sentence`;
    hintText.innerHTML="Asking AI for a hint..."
  try{
    const response = await askQwen(prompt);
    hintText.innerHTML = response;
  }catch(error){
    hintText.innerHTML="error fetching hint from ai"
  }
}
loadPage();
if(mode===false){
startGame();
}