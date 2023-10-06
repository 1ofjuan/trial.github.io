const cursor = document.querySelector('.cursor');
const holes = [...document.querySelectorAll('.hole')];
const scoreEl = document.querySelector('.score span');
const finalScoreEl = document.getElementById('finalScore');
let score = 0;
const sound = new Audio('assets_smash.mp3');

let originalTime = 20; // Set the initial time to 15 seconds
let timeLeft = originalTime;
const countdown = document.getElementById('countdown');
let timerInterval;

function showPopup(finalScore) {
    finalScoreEl.textContent = finalScore; // Update the final score in the popup
    const scorePopup = document.getElementById('scorePopup');
    scorePopup.style.display = 'flex';
}

function endGame() {
    clearInterval(timerInterval); // Stop the timer
    showPopup(score); // Show the popup with the final score
}

function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(function () {
            timeLeft--;
            countdown.textContent = `${timeLeft} seconds`;

            if (timeLeft === 0) {
                endGame(); // Call endGame when the timer reaches zero
            }
        }, 1000);
    }
}

function resetGame() {
  score = 0;
  scoreEl.textContent = score;
  timeLeft = originalTime;
  countdown.textContent = timeLeft + " seconds";
  clearInterval(timerInterval);
  timerInterval = null;
}
// Define a variable to track whether the game has started
let isGameStarted = false;

// Event listener for the Play Again button
const playAgainButton = document.getElementById("playAgainButton");
playAgainButton.addEventListener("click", () => {
    closeScorePopup(); // Close the popup
    resetGame(); // Reset the game state and start the timer again
    isGameStarted = false; // Set the game as not started
});

function run() {
    const i = Math.floor(Math.random() * holes.length);
    const hole = holes[i];
    let timer = null;

    const img = document.createElement('img');
    img.classList.add('mole');
    img.src = 'mole.png';

    img.addEventListener('click', () => {
        score += 10;
        sound.play();
        scoreEl.textContent = score;
        img.src = 'mole-whacked.png';
        clearTimeout(timer);
        setTimeout(() => {
            hole.removeChild(img);
            run();
        }, 500);
    });

    hole.appendChild(img);

    timer = setTimeout(() => {
        hole.removeChild(img);
        run();
    }, 1500);
}

run();

window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px';
    cursor.style.left = e.pageX + 'px';
});

window.addEventListener('mousedown', () => {
  cursor.classList.add('active');
  if (!isGameStarted) {
      startTimer(); // Start the timer when you click your cursor, only if the game has not started
      isGameStarted = true; // Set the game as started
  }
});

window.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
});

// Function to close the score popup
function closeScorePopup() {
    const scorePopup = document.getElementById("scorePopup");
    scorePopup.style.display = "none";
}

// Event listener for closing the score popup
const closePopupButton = document.getElementById("closePopup");
closePopupButton.addEventListener("click", () => {
    closeScorePopup(); // Close the popup
});
