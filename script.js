let timerElement = document.getElementById('timer');
let buzzer = document.getElementById('buzzer');

buzzer.src = './500649-USER_INTERFACE_BELL_-Bright_Ringing_Win_Payout_or_Trigger_Alarm_007856_.wav';

let startTime = 10.00; 
let interval;
let isRunning = false;
let countdownStartTime;
let elapsed = 0;

function startTimer() {
  if (!isRunning) {
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
    resetTimer(); 
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

    if (finalTime.toFixed(2) == "2.50"  ) {
      buzzer.play(); 
      timerElement.style.color = "green"; 
    } else {
      timerElement.style.color = "red"; 
    }

    setTimeout(resetTimer, 1000); 
  }
}

function resetTimer() {
  cancelAnimationFrame(interval);
  timerElement.innerHTML = "10.00";
  timerElement.style.color = "#fff"; 
  isRunning = false;
  elapsed = 0; 
}

function handleKeyPress(event) {
  if (event.code === "Space") {
    if (isRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  }
}

document.addEventListener('keydown', handleKeyPress);

window.onload = function() {
  resetTimer(); 
};
