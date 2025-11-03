const startButton = document.getElementById("start");
const menu = document.getElementById("menu");
const modeButton = document.getElementById("gameMode");
const timeModeButton = document.getElementById("timeMode");
const score = document.getElementById("score");
const soundEffect = document.getElementById("soundEffect");
const gameArea = document.getElementById("gameArea");
const scoreContainer = document.getElementById("scoreContainer");
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
    modeButton.textContent = "Micro-adjustment";
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
  menu.style.display = "none";
  gameArea.classList.add("active");
  scoreContainer.classList.add("active");
  score.textContent = "0";
  const targetContainer = document.createElement("div");
  targetContainer.id = "targetContainer";
  const target = document.createElement("div");
  target.id = "target";
  targetContainer.className = "targetContainer";
  if (modeButton.textContent === "Micro-adjustment") {
    gameArea.classList.add("microAdjustment");
    targetContainer.classList.add("micro");
  }
  targetContainer.appendChild(target);

  applyTargetStyle(target);
  moveTarget(targetContainer);
  gameArea.appendChild(targetContainer);
  target.addEventListener("click", () => onTargetClick(targetContainer));
  startTimeout(targetContainer);
}

function applyTargetStyle(target) {
  if (modeButton.textContent === "Normal") {
    target.className = "normalTarget";
  } else {
    target.className = "microTarget";
  }
}

function moveTarget(targetContainer) {
  const x =
    Math.random() * (gameArea.clientWidth - targetContainer.offsetWidth);
  const y =
    Math.random() * (gameArea.clientHeight - targetContainer.offsetHeight);
  targetContainer.style.left = `${x}px`;
  targetContainer.style.top = `${y}px`;
}

function onTargetClick(targetContainer) {
  soundEffect.play();
  clearTimeout(timeoutId);
  moveTarget(targetContainer);
  count++;
  score.textContent = count;
  if (timeModeButton.textContent === "Infinite") {
    startTimeout(targetContainer);
  }
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
      score.style.display = "none";
      count = 0;
      menu.style.display = "block";
    }, duration);
  } else {
    duration = 2000;
    let targetTimeBar = document.getElementById("targetTimeBar");
    if (!targetTimeBar) {
      targetTimeBar = document.createElement("div");
      targetTimeBar.id = "targetTimeBar";
      targetTimeBar.className = "targetTimeBar";
      targetContainer.appendChild(targetTimeBar);
    }
    targetTimeBar.style.animation = "none";
    targetTimeBar.offsetHeight;
    targetTimeBar.style.animation = `shrinkBar ${duration}ms linear forwards`;
    timeoutId = setTimeout(() => {
      targetContainer.remove();
      alert(`Defeat\nYour score: ${count}`);
      scoreContainer.style.display = "none";
      gameArea.classList.remove("active");
      menu.style.display = "block";
    }, duration);
  }
}
// separar em mais funcoes
