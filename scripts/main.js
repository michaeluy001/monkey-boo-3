// Variable declarations & DOM Initialization
const bgMusic = new Audio('./sounds/Jungle music.wav'); 
bgMusic.loop = true;
bgMusic.load();
const taDaSound = new Audio('./sounds/ta-da.mp3');
taDaSound.load();
const gameOverLose = new Audio('./sounds/gameover.mp3'); 
gameOverLose.load();
gameOverLose.loop= true;
const monkeySound = new Audio('./sounds/Monkey scream.wav');
monkeySound.load();
const youWonSound = new Audio('./sounds/you won.wav');
youWonSound.load();
const toggleSwitch = document.getElementById("switch-BG");
const playAgainButton = document.getElementById("play-again");
playAgainButton.addEventListener("click", playAgain);
const nextLevelButton = document.getElementById("next-level");
nextLevelButton.addEventListener("click", nextLevel);
const backButton = document.getElementById("back");
backButton.addEventListener("click", back);
const board = document.getElementById("status");
const score = document.getElementById("score");
const displayCurLevel = document.getElementById("current-level");
// experimental: for saving the highScore variable
let grid = document.querySelector(".grid");
let currentLevel = 1; // Level set to 1 by dafault
displayCurLevel.innerText = currentLevel;
let cells = grid.children;
let monkeyCell;
let finalScore = 0 ;
let retrievedHighScore = Number(localStorage.getItem("highScore")); 
let bananasToFind;
let bananasFoundPerRound = 0;
let totalBananasFound = 0;
let gameIsOver = false;
let monkeysCurrentNums = new Array;
let bananaCells = new Array; // contains bananas to hit
let roundClear = false;



// determines the current level the player is at.

startGame();

function guess(event) { 
    // bgMusic.play();
    let clickedCell = document.getElementById(event.target.getAttribute("id"));                           
    const pop = new Audio('./sounds/pop.mp3');
    pop.currentTime = 0;
    pop.load();

    if (monkeysCurrentNums.includes(clickedCell)) {  /* It checks every hit if it's the monkey */
        monkeySound.play();
        // Reveal Monkey-boos
        for (let i = 0; i < bananaCells.length; i++) { 
            document.getElementById(bananaCells[i].getAttribute("id")).style.backgroundImage = "url('pictures/banana.png')";
        } 
        for (let i = 0; i < monkeysCurrentNums.length; i++) { 
            document.getElementById(monkeysCurrentNums[i].getAttribute("id")).style.backgroundImage = "url('pictures/monkey-boo!.png')";
        }
        board.innerText = "You just got Monkey-booed! \n You Got:";
        gameOver();   
        deactivateCell()
        gameOverLose.play();

    } else { 
            bananasFoundPerRound++;
            score.innerText = bananasFoundPerRound;
            board.innerText = randomPhrase();
            pop.play();
            deactivateCell();
        if (bananasFoundPerRound == bananasToFind) {
            for (let i=0; i < monkeysCurrentNums.length; i++) {
                document.getElementById(monkeysCurrentNums[i].getAttribute("id")).style.backgroundImage = "url('pictures/frustrated monkey.png')";
            }
            roundClear = true;
            gameOver();
            deactivateCell();
            board.innerText = "Great job! \n Now, move to the next level.";
            youWonSound.play();
        }     
    }
    function deactivateCell() {
        if(gameIsOver) {
            for (let i = 0; i < cells.length; i++) {
                cells[i].style.borderColor = "rgb(129, 163, 71)"; 
                cells[i].style.backgroundColor = "rgb(206, 206, 183)";
                removeAllListeners();
            }
        } else {
            clickedCell.style.backgroundImage = "url('pictures/banana.png')";
            clickedCell.style.backgroundColor = "rgb(206, 206, 183)";
            clickedCell.style.borderColor = "rgb(129, 163, 71)"; 
            clickedCell.removeEventListener("click", guess);
        }
    }
}   
/* This function shows random phrases. To eliminate repetition, previously used phrase will be removed */
function randomPhrase() {
    let phrases = new Array (
        "You’ve got the instincts of a tiger!",
        "Swinging through like a true jungle explorer!",
        "That’s a wild success!",
        "You’re roaring with confidence!",
        "Spot on, just like a jaguar in the night!",
        "That’s the way, jungle master!",
        "Perfect aim, like an eagle’s!",
        "You’re as clever as a monkey!",
        "Trekking through like a pro adventurer!",
        "Bingo! You’re the king of this jungle!"
    );
    function randNum(min, max) { return Math.floor(Math.random()*phrases.length); } /* Generate a random index */ 
    let randPhrase = phrases[randNum(0,cells.length)]; 
    return randPhrase;
}
/* Finally, the gameOver function */
function gameOver() {
    gameIsOver = true;
    bgMusic.pause();
    totalBananasFound = totalBananasFound + bananasFoundPerRound; // totalBananasFound holds the total score for the current session
    finalScore = totalBananasFound; // copies the value of totalBananasFound to finalScore which is used for storing the high score
    score.innerText = finalScore;
    if (totalBananasFound == retrievedHighScore+1) { //I came up with this after struggling for 30 mins :D
        taDaSound.play();     
    }   
    saveState(finalScore); //Call save function for storing current highest score.
    if(roundClear==true) {
        nextLevelButton.style.display = "flex";
    } else {
        playAgainButton.style.display = "flex";
    }   
    function saveState(n) {   // A function to save the total score on the current session and store it ONLY IF it beats the previous score.
        if (n > retrievedHighScore) { 
            localStorage.setItem("highScore", n);
        }
    }
}
function removeAllListeners() { // A function to remove all listeners, triggered when the game is over 
    for (let i = 0; i < cells.length; i++) { cells[i].removeEventListener("click", guess); }
}
function back() {
    location.replace("index.html");
}
function playAgain() { 
    location.reload();
}
function nextLevel() {
    currentLevel = currentLevel + 1;
    displayCurLevel.innerText = currentLevel;
    //Resets every cell's appearance to default
    for(let i=0; i < cells.length; i++) {
        document.getElementById(cells[i].getAttribute("id")).style.backgroundImage = "";
        document.getElementById(cells[i].getAttribute("id")).style.backgroundColor = "beige";
        document.getElementById(cells[i].getAttribute("id")).style.borderColor = "darkolivegreen"; 
    }

    // This part is intended for reseting the current value of some variables when the player proceeds to the next level.
    bananasFoundPerRound = 0;
    gameIsOver = false;
    roundClear = false;
    nextLevelButton.style.display = "none";
    monkeysCurrentNums = new Array;
    startGame(); 
}


function startGame() {
    score.innerText = "Click on any cell to begin.";

    //Switch case for setting the number of goals to hit on every level.
    switch (currentLevel) { 
        case 1: bananasToFind = cells.length-1;
                board.innerText =  "Gather as much bananas as you can. Beware! Monkey-boo is hiding in one of the cells. ";
                break;
        case 2: bananasToFind = cells.length-2;
                board.innerText = "Heads up! Two Monkey-boos are hiding now. Can you dodge their tricks?";
                break;
        case 3: bananasToFind = cells.length-3; 
                board.innerText = "Brace yourself! Three Monkey-boos are on the loose. Stay sharp!";
                break;
        case 4: bananasToFind = cells.length-4; 
                 board.innerText =  "Watch out! Four Monkey-boos are lurking. One wrong move, and it’s Monkey-boo!";
                break;
        case 5: bananasToFind = cells.length-5; 
                board.innerText = "Things are heating up. Five Monkey-boos are in the shadows now. Can you handle the pressure?";       
                break;
        case 6: bananasToFind = cells.length-6; 
                board.innerText = "Get ready! Now, Six Monkey-boos are hiding. Don’t let them catch you off guard!";              
                break;
        case 7: bananasToFind = cells.length-7; 
                board.innerText =  "It’s getting wild! Seven Monkey-boos are waiting to strike. You’ll need more than luck!";       
                break;
        case 8: bananasToFind = cells.length-8; 
                board.innerText =  "You are on the final phase. Eight Monkey-boos are hiding. \n"
                                    "It means only 1 banana is remaining. Good luck!";       
                break;
    }

    // Give each cell an event listener and then generate random index nums for the monkey-boos.
    for (let i = 0; i < cells.length; i++) { cells[i].addEventListener("click", guess); }
    while (monkeysCurrentNums.length < currentLevel) {
        function randNum(min, max) { return Math.floor(Math.random()*cells.length); } 
        monkeyCell = cells[randNum(0,cells.length)];
        if (monkeysCurrentNums.includes(monkeyCell) == false) {
            monkeysCurrentNums.push(monkeyCell);
        } 
    }   
    console.log("Monkey-boo is in these locations: ", monkeysCurrentNums); // for debugging
    let counter = 0;

    while( counter < bananasToFind)  {  // Make an array for bananas to be hit.
        for (let i = 0; i < cells.length; i++) { 
            if (!(monkeysCurrentNums.includes(cells[i]))) {
                bananaCells.push(cells[i]);
                counter++;
            }
        }
    }  

}






    