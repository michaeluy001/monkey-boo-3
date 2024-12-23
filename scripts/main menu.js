
const playButton = document.getElementById("play");
// const animateScreen = new Animation;
// const keyFrameScreen = new KeyframeEffect;
playButton.addEventListener("click", startGame);
const currentHighScore = 0;

getHighScore();

function getHighScore() {
   document.getElementById("current-high-score").innerText = localStorage.getItem(currentHighScore);
}


function startGame() {

   location.replace("game.html");

}

// keyFrameScreen.setKeyframes();



