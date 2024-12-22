// Variable declarations & DOM Initialization
const bgMusic = new Audio('./sounds/Jungle music.wav'); 
bgMusic.loop = true;
bgMusic.load();
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
let grid = document.querySelector(".grid");
let currentLevel = 1; // Level set to 1 by dafault
let cells = grid.children;
let monkeyCell;
let finalScore = 0 ;

let bananasToFind;
let bananasFound = 0;

let gameIsOver = false;
let monkeysCurrentNums = new Array;
let bananaCells = new Array; // contains bananas to hit
let roundClear = false;

displayCurLevel.innerText = currentLevel;
console.log(currentLevel);

// determines the current level the player is at.


startGame();

function guess(event) { 
    console.log(bananasFound);
    console.log(bananasToFind);
    bgMusic.play();
    let clickedCell = document.getElementById(event.target.getAttribute("id"));                           
    const pop = new Audio('./sounds/pop.mp3');
    pop.currentTime = 0;
    pop.load();

    if (monkeysCurrentNums.includes(clickedCell)) {  /* It checks every hit if it's the monkey */
        monkeySound.play();
        // assign monkeys
        for (let i = 0; i < monkeysCurrentNums.length; i++) { 
            document.getElementById(monkeysCurrentNums[i].getAttribute("id")).style.backgroundImage = "url('pictures/monkey-boo!.png')";
        }
        // assign non-monkey cells
        for (let i = 0; i < bananaCells.length; i++) { 
            document.getElementById(bananaCells[i].getAttribute("id")).style.backgroundImage = "url('pictures/banana.png')";
        }

        board.innerText = "Monkey-boo! \n You Got:";
        gameOver();   
        deactivateCell()
        gameOverLose.play();

    } else { 
            bananasFound++;
            score.innerText = bananasFound;
            board.innerText = randomPhrase();
            pop.play();
            deactivateCell();

        if (bananasFound == bananasToFind) {
                clickedCell.style.backgroundImage = "url('pictures/banana.png')";
                monkeyCell.style.backgroundImage = "url('pictures/frustrated monkey.png')";
                clickedCell.removeEventListener("click", guess);
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
                cells[i].style.border = "5px solid rgb(129, 163, 71)"; 
                cells[i].style.backgroundColor = "rgb(206, 206, 183)";
            }
        } else {
            clickedCell.style.backgroundImage = "url('pictures/banana.png')";
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
    removeAllListeners();
    finalScore = finalScore + bananasFound;
    score.innerText = finalScore;

    if(roundClear==true) {
        nextLevelButton.style.display = "flex";
    } else {
        playAgainButton.style.display = "flex";
    }   
}
function removeAllListeners() { /* A function to remove all listeners, triggered when the game is over */
    for (let i = 0; i < cells.length; i++) { cells[i].removeEventListener("click", guess); }
}
function back() {
    location.replace("index.html");
}
function playAgain() {
    location.reload();
}
function nextLevel() {
    currentLevel = currentLevel+ 1;
    displayCurLevel.innerText = currentLevel;
    for(let i=0; i < cells.length; i++) {
        document.getElementById(cells[i].getAttribute("id")).style.backgroundImage = "";
        document.getElementById(cells[i].getAttribute("id")).style.backgroundColor = "beige";
    }
    startGame();
    bananasFound = 0;
    gameIsOver = false;
    roundClear = false;
    nextLevelButton.style.display = "none";
}
function startGame() {

    switch (currentLevel) { 
        case 1: bananasToFind = cells.length-1; break;
        case 2: bananasToFind = cells.length-2; break;
        case 3: bananasToFind = cells.length-3; break;
        case 4: bananasToFind = cells.length-4; break;
        case 5: bananasToFind = cells.length-5; break;
        case 6: bananasToFind = cells.length-6; break;
        case 7: bananasToFind = cells.length-7; break;
        case 8: bananasToFind = cells.length-8; break;
    }
    
    for (let i = 0; i < cells.length; i++) { cells[i].addEventListener("click", guess); }
    // Generate a random index for the monkey cell, give each cell an event listener
    while (monkeysCurrentNums.length < currentLevel) {
        function randNum(min, max) { return Math.floor(Math.random()*cells.length); } 
        monkeyCell = cells[randNum(0,cells.length)];
        if (monkeysCurrentNums.includes(monkeyCell) == false) {
            monkeysCurrentNums.push(monkeyCell);
        } 
    }   
    console.log(monkeysCurrentNums);
    let counter = 0;
    while( counter < bananasToFind)  { 
        for (let i = 0; i < cells.length; i++) { 
            if (!(monkeysCurrentNums.includes(cells[i]))) {
                bananaCells.push(cells[i]);
                counter++;
            }
        }
    }    
}
 
 const highScore = finalScore;
    



/* This is a project of mine so I can be familiar again with programming, 
test my logical power and imagination though writting codes. This is just a generic name that over time will 
get updated with more functions and features to make it as exciting and fun to play.

I do hope that along the way,
 I will be able to make the code as efficient and as precise as I could, 
 promoting flexibility and readabilty 

===================================================================================================================

Monkey Boo project all rights reserved 2024

Mechanics:

Reveal the monkey when there is only 1 cell left (meaning all fruits were gathered) - done
Add more Buttons and options like "Try again" and revise scoring system - done
Get as much fruit as you can by click-guessing on each of the cells - done
Different fruits will be added (different points)
Add more cells 
Different fruits will be added (different points)
difficulty progress (more monkeys will be added)


User Interface/Audio:
User interface should be improved - long term plan
more SFX
Get the BG music running - ys but with flaw
===================================================================================================================
PSEUDOCODE

Pseudocode Monkey Boo!

Everytime the player clicks, checks two conditions

1. if it hits the cell containing the monkey, then call gameOver function. Otherwise, register the click and store it in an incrementing variable.
   and then prevent the player from clicking on the cell.
2.If the player has enough bananas, call gameOver function


gameOver function:

If bananas were all gathered, do action 1
Otherwise, do action 2

Finally,
 displays the final score; disable clicks on all cells; the "Play again Button"(reset the browser)


Action 1: play winning audio, reveal monkey 1
Action 2: play losing audio, reveal monkey 2

===================================================================================================================

 UPDATES WRITTEN HERE 




















*/










