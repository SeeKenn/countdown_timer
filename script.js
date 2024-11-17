let timerElement = document.getElementById('timer');
let buzzer = document.getElementById('buzzer');

buzzer.src = './500649-USER_INTERFACE_BELL_-Bright_Ringing_Win_Payout_or_Trigger_Alarm_007856_.wav';

let startTime = 10.00; 
let interval;
let isRunning = false;
let gameOver = false; // Tracks if the game has ended
let countdownStartTime;
let elapsed = 0;

function startTimer() {
  if (!isRunning && !gameOver) {
    isRunning = true;
    countdownStartTime = performance.now() - elapsed * 1000; 
    interval = requestAnimationFrame(updateTimer);
    timerElement.style.color = "#fff";
  }
}

function updateTimer(currentTime) {
  elapsed = (currentTime - countdownStartTime) / 1000;
  let remainingTime = (startTime - elapsed).toFixed(2); 

  if (remainingTime <= 0) {
    isRunning = false;
    cancelAnimationFrame(interval);
    endGame(false); // Game ends as a loss
    return;
  }

  timerElement.innerHTML = remainingTime;
  if (isRunning) {
    interval = requestAnimationFrame(updateTimer);
  }
}

function stopTimer() {
  if (isRunning) {
    cancelAnimationFrame(interval);
    isRunning = false;
    let finalTime = parseFloat(timerElement.innerHTML);

    if (finalTime.toFixed(2) = "2.50") {
      buzzer.play(); // Play buzzer sound
      timerElement.style.color = "green"; // Change timer color to green

      // Trigger confetti
      launchConfetti();
      endGame(true); // Game ends as a win
    } else {
      timerElement.style.color = "red"; // Indicate an incorrect time
      endGame(false); // Game ends as a loss
    }
  }
}

function endGame(win) {
  gameOver = true;
  isRunning = false;
  if (!win) {
    timerElement.innerHTML = "GAME OVER";
  }
  document.addEventListener('keydown', resetGameListener); // Enable reset on spacebar
}

function resetTimer() {
  cancelAnimationFrame(interval);
  timerElement.innerHTML = "10.00";
  timerElement.style.color = "#fff"; 
  isRunning = false;
  elapsed = 0; 
  gameOver = false;
}

function resetGameListener(event) {
  if (event.code === "Space" && gameOver) {
    resetTimer(); // Reset the game
    document.removeEventListener('keydown', resetGameListener); // Remove listener
  }
}

function handleKeyPress(event) {
  if (event.code === "Space") {
    if (gameOver) {
      return; // Do nothing if the game is over (reset listener handles this)
    }

    if (isRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  }
}

function launchConfetti() {
  // Basic confetti configuration
  const duration = 3 * 1000; // 3 seconds
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5, // Particles per frame
      angle: Math.random() * 360,
      spread: 60,
      startVelocity: 40,
      origin: { x: Math.random(), y: Math.random() - 0.2 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

document.addEventListener('keydown', handleKeyPress);

window.onload = function() {
  resetTimer(); 
};
