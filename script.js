const startButton = document.getElementById("start");
const menu = document.getElementById("menu");
const modeButton = document.getElementById("gameMode");
const countDisplay = document.getElementById("countDisplay");
let count = 0;

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
  console.log("starting...");
  const target = document.createElement("div");
  target.id = "target";
  applyTargetStyle(target);
  moveTarget(target);
  document.body.appendChild(target);
  target.addEventListener("click", () => onTargetClick(target));
}

function applyTargetStyle(target) {
  if (modeButton.textContent === "Normal") {
    target.className = "normalTarget";
  } else {
  }
}

function moveTarget(target) {
  const x = Math.random() * (window.innerWidth - 400);
  const y = Math.random() * (window.innerHeight - 200);
  target.style.left = `${x}px`;
  target.style.top = `${y}px`;
}

function onTargetClick(target) {
  moveTarget(target);
  count++;
  countDisplay.textContent = count;
}
