
const playButton = document.getElementById("play");
// const animateScreen = new Animation;
// const keyFrameScreen = new KeyframeEffect;
playButton.addEventListener("click", startGame);

let highScoreContainer = document.getElementById("current-high-score");


let showScore = Number(localStorage.getItem("highScore"));

if (showScore == 0 ) { 
   highScoreContainer.innerText = "?";
} else {
   highScoreContainer.innerText = showScore;
} 

function startGame() {

   location.replace("game.html");

}

// keyFrameScreen.setKeyframes();



