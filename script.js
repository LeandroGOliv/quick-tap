const startButton = document.getElementById("start");
const menu = document.getElementById("menu");
const modeButton = document.getElementById("gameMode");
const timeModeButton = document.getElementById("timeMode");
const countDisplay = document.getElementById("countDisplay");
let isStarted = false;
let count = 0;
let timeoutId;

timeModeButton.textContent = "Infinite";
modeButton.textContent = "Normal";

timeModeButton.addEventListener("click", toggleTimeMode);
modeButton.addEventListener("click", toggleGameMode);
startButton.addEventListener("click", startGame);

function toggleGameMode() {
  if (modeButton.textContent === "Normal") {
    modeButton.textContent = "Mini flick";
  } else {
    modeButton.textContent = "Normal";
  }
}
function toggleTimeMode() {
  if (timeModeButton.textContent === "Infinite") {
    timeModeButton.textContent = "With time"; // TO DO, add time customization
  } else {
    timeModeButton.textContent = "Infinite";
  }
}

function startGame() {
  countDisplay.style.visibility = "visible";
  countDisplay.textContent = "Contador: 0";
  const targetContainer = document.createElement("div");
  targetContainer.id = "targetContainer";
  const target = document.createElement("div");
  target.id = "target";
  targetContainer.appendChild(target);
  targetContainer.className = "targetContainer";
  applyTargetStyle(target);
  moveTarget(targetContainer);
  document.body.appendChild(targetContainer);
  target.addEventListener("click", () => onTargetClick(targetContainer));
  menu.style.display = "none";
  startTimeout(targetContainer);
}

function applyTargetStyle(target) {
  if (modeButton.textContent === "Normal") {
    target.className = "normalTarget";
  } else {
  }
}

function moveTarget(targetContainer) {
  const x = Math.random() * (window.innerWidth - 1000);
  const y = Math.random() * (window.innerHeight - 500);
  targetContainer.style.left = `${x}px`;
  targetContainer.style.top = `${y}px`;
}

function onTargetClick(targetContainer) {
  clearTimeout(timeoutId);
  moveTarget(targetContainer);
  count++;
  countDisplay.textContent = "Contador: " + count;
}
function startTimeout(targetContainer) {
  let duration;
  if (timeModeButton.textContent === "With time") {
    duration = 50000;
    const timeBar = document.createElement("div");
    timeBar.id = "timeBar";
    document.body.appendChild(timeBar);
    timeBar.className = "timeBar";
    timeBar.style.animation = "none";
    timeBar.offsetHeight;
    timeBar.style.animation = `shrinkBar ${duration}ms linear forwards`;

    timeoutId = setTimeout(() => {
      targetContainer.remove();
      alert(`Time is up!. \nYour score: ${count}`);
      countDisplay.style.visibility = "hidden";
      count = 0;
      menu.style.display = "block";
    }, duration);
  } else {
    duration = 2000;
    const targetTimeBar = document.createElement("div");
    targetTimeBar.id = "targetTimeBar";
    targetContainer.appendChild(targetTimeBar);
    targetTimeBar.className = "targetTimeBar";
    targetTimeBar.style.animation = "none";
    targetTimeBar.offsetHeight;
    targetTimeBar.style.animation = `shrinkBar ${duration}ms linear forwards`;
  }
  timeoutId = setTimeout(() => {
    targetContainer.remove();
    alert(`Defeat\nYour score: ${count}`);
  }, duration);
}
// separar em mais funcoes
