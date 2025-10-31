const startButton = document.getElementById("start");
const menu = document.getElementById("menu");
const modeButton = document.getElementById("gameMode");
const countDisplay = document.getElementById("countDisplay");
let isStarted = false;
let count = 0;
let timeoutId;

modeButton.textContent = "Normal";

modeButton.addEventListener("click", toggleMode);
startButton.addEventListener("click", startGame);

function toggleMode() {
  if (modeButton.textContent === "Normal") {
    modeButton.textContent = "Mini flick";
    console.log("if");
  } else {
    console.log("else");
    modeButton.textContent = "Normal";
  }
}

function startGame() {
  const target = document.createElement("div");
  countDisplay.textContent = "Contador:";
  target.id = "target";
  applyTargetStyle(target);
  moveTarget(target);
  document.body.appendChild(target);
  target.addEventListener("click", () => onTargetClick(target));
  startTimeout(target);
}

function applyTargetStyle(target) {
  if (modeButton.textContent === "Normal") {
    target.className = "normalTarget";
  } else {
  }
}

function moveTarget(target) {
  const x = Math.random() * (window.innerWidth - 1000);
  const y = Math.random() * (window.innerHeight - 500);
  target.style.left = `${x}px`;
  target.style.top = `${y}px`;
}

function onTargetClick(target) {
  clearTimeout(timeoutId);
  moveTarget(target);
  count++;
  countDisplay.textContent = "Contador:" + count;
  startTimeout(target);
}
function startTimeout(target) {
  timeoutId = setTimeout(() => {
    target.remove();
    alert("defeat");
  }, 800);
}
