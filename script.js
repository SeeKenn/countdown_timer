let timerElement = document.getElementById('timer');
let buzzer = document.getElementById('buzzer');

let startTime = 10.00; // Start time in seconds with 2 decimal places
let interval;
let isRunning = false;
let countdownStartTime;
let elapsed = 0;

// Function to start the timer
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    countdownStartTime = performance.now() - elapsed * 1000; // Adjust for any previous elapsed time
    interval = requestAnimationFrame(updateTimer);
    
    // Reset the timer color to white when starting
    timerElement.style.color = "#fff";
  }
}

// Function to update the timer
function updateTimer(currentTime) {
  elapsed = (currentTime - countdownStartTime) / 1000;
  let remainingTime = (startTime - elapsed).toFixed(2); // Keep two decimal places

  if (remainingTime <= 0) {
    timerElement.innerHTML = "0.00";
    isRunning = false;
    cancelAnimationFrame(interval);
    resetTimer();  // Automatically reset the timer if it reaches 0
    return;
  }

  timerElement.innerHTML = remainingTime;
  if (isRunning) {
    interval = requestAnimationFrame(updateTimer);
  }
}

// Function to stop the timer
function stopTimer() {
  if (isRunning) {
    cancelAnimationFrame(interval);
    isRunning = false;
    let finalTime = parseFloat(timerElement.innerHTML);

    // Check if the user stopped at exactly 2.50 seconds
    if (finalTime.toFixed(2) === "2.50") {
      buzzer.play(); // Play the buzzer sound
      timerElement.style.color = "green"; // Change color to green for success
    } else {
      timerElement.style.color = "red"; // Change color to red for failure
    }

    // Reset the timer after a short delay
    setTimeout(resetTimer, 1000); // Delay to allow the user to see the color change
  }
}

// Function to reset the timer
function resetTimer() {
  cancelAnimationFrame(interval);
  timerElement.innerHTML = "10.00";
  timerElement.style.color = "#fff"; // Reset the color to white
  isRunning = false;
  elapsed = 0; // Reset elapsed time
}

// Function to handle Spacebar key press
function handleKeyPress(event) {
  if (event.code === "Space") {
    // Toggle between start and stop when spacebar is pressed
    if (isRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  }
}

// Event listener for keydown event to listen for Spacebar
document.addEventListener('keydown', handleKeyPress);

// Start the timer when the page loads
window.onload = function() {
  resetTimer(); // Initialize with reset state
};
