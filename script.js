let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

function updateDisplay(time) {
  const milliseconds = parseInt((time % 1000) / 10);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);

  display.textContent = 
    `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(num) {
  return num.toString().padStart(2, "0");
}

function startStopwatch() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay(elapsedTime);
  }, 10);
}

function stopStopwatch() {
  clearInterval(timerInterval);
}

startStopBtn.addEventListener("click", () => {
  if (!running) {
    startStopwatch();
    startStopBtn.textContent = "Pause";
    running = true;
  } else {
    stopStopwatch();
    startStopBtn.textContent = "Start";
    running = false;
  }
});

resetBtn.addEventListener("click", () => {
  stopStopwatch();
  elapsedTime = 0;
  updateDisplay(0);
  startStopBtn.textContent = "Start";
  laps.innerHTML = "";
  running = false;
});

lapBtn.addEventListener("click", () => {
  if (running) {
    const li = document.createElement("li");
    li.textContent = display.textContent;
    laps.appendChild(li);
  }
});
