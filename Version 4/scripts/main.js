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
const playAgainButton = $("#play-again");
playAgainButton.on("click", playAgain);
const nextLevelButton = $("#next-level");
nextLevelButton.on("click", nextLevel);
const backButton = $("#back");
backButton.on("click", back);
const board = $("#status");
const score = $("#score");
const displayCurLevel = $("#current-level");
let currentLevel = 1; 
displayCurLevel.text(currentLevel);

// This functionality creates an array, store each of the child element of class grid into it.

let cells = [];
 $(".grid  *").each(function(i) {
     cells.push(this);
 });

console.log(cells[0]);
console.log("Here is the array :", cells);

let monkeyCell;
let finalScore = 0 ;
let retrievedHighScore = Number(localStorage.getItem("highScore")); 
let bananasToFind;
let bananasFoundPerRound = 0;
let totalBananasFound = 0;
let gameIsOver = false;
let monkeysCurrentNums = new Array;
let bananaCells = new Array; 
let roundClear = false;


startGame();

function guess(event) { 
    
    clickedCell = event.target;   
             
    const pop = new Audio('./sounds/pop.mp3');
    pop.currentTime = 0;
    pop.load();

    if (monkeysCurrentNums.includes(clickedCell)) { 
        monkeySound.play();
        $(bananaCells).each(function(i) {
            $(bananaCells[i]).css("background-image", "url('pictures/banana.png')");
        })  
        $(monkeysCurrentNums).each(function(i)  { 
            $(monkeysCurrentNums[i]).css("background-image", "url('pictures/monkey-boo!.png')");
        })

        board.text("You just got Monkey-booed! \n You Got:");
        gameOver();   
        deactivateCell()
        gameOverLose.play();

    } else { 
            bananasFoundPerRound++;
            score.text(bananasFoundPerRound); // these will be shown on a dialogbox soon
            board.text(randomPhrase); // these will be shown on a dialogbox soon
            pop.play();
            deactivateCell();
        if (bananasFoundPerRound == bananasToFind) {
            $(monkeysCurrentNums).each(function(i)  {            
                $(monkeysCurrentNums[i]).css("background-image", "url('pictures/frustrated monkey.png')");
            });
            roundClear = true;
            gameOver();
            deactivateCell();
            board.innerText = "Great job! \n Now, move to the next level.";
            youWonSound.play();
            totalBananasFound = totalBananasFound + bananasFoundPerRound; 
            finalScore = totalBananasFound; 
            score.innerText = finalScore;
            saveState(finalScore);
        }     
    }
    function deactivateCell() {
        if(gameIsOver) {
            $(cells).each(function(i) {
                $(cells[i]).css("border-color", "rgb(129, 163, 71)");
                $(cells[i]).css("background-color", "rgb(206, 206, 183)");
                $(cells).off("click", guess);
            })
        } else {
            $(clickedCell).css("background-image", "url('pictures/banana.png')")
            $(clickedCell).css("background-color", "rgb(206, 206, 183)");
            $(clickedCell).css("border-color", "rgb(129, 163, 71)"); 
            $(clickedCell).off("click", guess);
        }
    }
}   
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
    let randNum =  Math.floor(Math.random()*phrases.length);  /* Generate a random index */ 
    let randPhrase = phrases.pop(randNum); 
    return randPhrase;
}

function gameOver() {
    gameIsOver = true;
    bgMusic.pause();
    if(roundClear==true) {
        nextLevelButton.css("display", "flex");

    } else {
        playAgainButton.css("display", "flex");
    }   
}
function back() {
    location.replace("index.html");
}
function playAgain() { 
    location.reload();
}
function nextLevel() {
    currentLevel = currentLevel + 1;
    displayCurLevel.text(currentLevel);

    $(cells).each(function(i) {
        $(cells[i]).css("background-image", "none");
        $(cells[i]).css("background-color", "beige");
        $(cells[i]).css("border-color", "darkolivegreen");
    });


    bananasFoundPerRound = 0;
    gameIsOver = false;
    roundClear = false;
    nextLevelButton.css("display", "none");
    monkeysCurrentNums = [];
    startGame(); 
}

function startGame() {
    score.text("Click on any cell to begin.");
    switch (currentLevel) { 
        case 1: bananasToFind = cells.length-1;
                board.text("Gather as much bananas as you can. Beware! Monkey-boo is hiding in one of the cells. ");
                break;
        case 2: bananasToFind = cells.length-2;
                board.text("Heads up! Two Monkey-boos are hiding now. Can you dodge their tricks?");
                break;
        case 3: bananasToFind = cells.length-3; 
                board.text("Brace yourself! Three Monkey-boos are on the loose. Stay sharp!");
                break;
        case 4: bananasToFind = cells.length-4; 
                board.text("Watch out! Four Monkey-boos are lurking. One wrong move, and it’s Monkey-boo!");
                break;
        case 5: bananasToFind = cells.length-5; 
                board.text("Things are heating up. Five Monkey-boos are in the shadows now. Can you handle the pressure?");       
                break;
        case 6: bananasToFind = cells.length-6; 
                board.text("Get ready! Now, Six Monkey-boos are hiding. Don’t let them catch you off guard!");              
                break;
        case 7: bananasToFind = cells.length-7; 
                board.text("It’s getting wild! Seven Monkey-boos are waiting to strike. You’ll need more than luck!");       
                break;
        case 8: bananasToFind = cells.length-8; 
                board.text("You are on the final phase. Eight Monkey-boos are hiding. <br> It means only 1 banana is remaining. Good luck!");       
                break;
    }

    $(cells).on("click", guess); 

    while (monkeysCurrentNums.length < currentLevel) {
        let randNum = Math.floor(Math.random()*cells.length); 
        monkeyCell = cells[randNum];

        if (monkeysCurrentNums.includes(monkeyCell) == false) {
            monkeysCurrentNums.push(monkeyCell);
        } 
    }    
    console.log("Monkey-boo is in these locations: ", monkeysCurrentNums);

    let counter = 0;

    while(counter < bananasToFind)  {
        $(cells).each(function(i) { 
            if (!(monkeysCurrentNums.includes(cells[i]))) {
                bananaCells.push(cells[i]);
                counter++;
            }
        })
    }  
}

function saveState(finalScore) {   
    if (finalScore > retrievedHighScore) { 
       localStorage.setItem("highScore", finalScore);
       taDaSound.play(); 
   }
};

function closeDialogBox() {
    dialogBox.close();
 }





    