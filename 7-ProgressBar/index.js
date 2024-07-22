const spanProgressLabel = document.querySelector("span#spanProgressLabel");
const progressBar = document.querySelector("progress#progressBar");
const btnStart = document.querySelector("button#btnStart");
const btnStop = document.querySelector("button#btnStop");
const btnReset = document.querySelector("button#btnReset");
const progressBarSpeed = 50;
const progressBarInitialValue = 0;
let intervalId = null;
window.addEventListener("load", () => {
  btnStart.addEventListener("click", handleBtnStart);
  btnStop.addEventListener("click", handleBtnStop);
  btnReset.addEventListener("click", handleBtnReset);
});

function handleBtnStop() {
  clearInterval(intervalId);
}
function handleBtnReset() {
  progressBar.value = 0;
  spanProgressLabel.innerText = progressBar.value + "%";
  clearInterval(intervalId);
}

function handleBtnStart() {
  intervalId = setInterval(() => {
    let progressBarCurrentValue = Number(progressBar.value);
    if (progressBarCurrentValue >= 100) {
      return clearInterval(intervalId);
    }
    progressBar.value = progressBarCurrentValue + 1;
    spanProgressLabel.innerText = progressBar.value + "%";
  }, progressBarSpeed);
}
