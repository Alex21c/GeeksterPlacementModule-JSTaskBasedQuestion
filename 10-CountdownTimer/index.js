"use strict";
const inputM1 = document.querySelector("input#inputM1");
const inputM2 = document.querySelector("input#inputM2");
const inputS1 = document.querySelector("input#inputS1");
const inputS2 = document.querySelector("input#inputS2");
const btnStart = document.querySelector("button#btnStart");
const btnStop = document.querySelector("button#btnStop");
const btnReset = document.querySelector("button#btnReset");
const validationDelayInMilliseconds = 400;
const countdownSpeed = 1000; // in seconds
let intervalID = null;

const defaultState = {
  m1: 0,
  m2: 0,
  s1: 0,
  s2: 9,
};
let currentState = {
  ...defaultState,
};

function updateUI() {
  inputM1.value = currentState.m1;
  inputM2.value = currentState.m2;
  inputS1.value = currentState.s1;
  inputS2.value = currentState.s2;
}

function countdown() {
  // convert total time in seconds
  const minutes = Number(`${currentState.m1}${currentState.m2}`);
  const seconds = Number(`${currentState.s1}${currentState.s2}`);
  // console.log(minutes, seconds);
  let totalSeconds = minutes * 60 + seconds;

  // decrease 1 second from it
  --totalSeconds;
  // update currentState
  const mintuesRemaining = Math.floor(totalSeconds / 60);
  const secondsRemaining = totalSeconds - mintuesRemaining * 60;
  // console.log(mintuesRemaining, secondsRemaining);
  if (secondsRemaining < 10) {
    currentState.s1 = 0;
    currentState.s2 = secondsRemaining;
  } else {
    currentState.s1 = Math.floor(secondsRemaining / 10);
    currentState.s2 = secondsRemaining % 10;
  }

  if (mintuesRemaining < 10) {
    currentState.m1 = Math.floor(mintuesRemaining / 10);
    currentState.m2 = mintuesRemaining % 10;
  }

  //safeguard
  if (
    currentState.m1 <= 0 &&
    currentState.m2 <= 0 &&
    currentState.s1 <= 0 &&
    currentState.s2 <= 0
  ) {
    currentState.m1 = 0;
    currentState.m2 = 0;
    currentState.s1 = 0;
    currentState.s2 = 0;
    clearInterval(intervalID);
    intervalID = null;
    enableStartBtn();
  }

  // update UI
  updateUI();
}
function handleBtnStart() {
  if (
    !intervalID &&
    (currentState.m1 != 0 ||
      currentState.m2 != 0 ||
      currentState.s1 != 0 ||
      currentState.s2 != 0)
  ) {
    intervalID = setInterval(countdown, countdownSpeed);
    btnStart.classList.add("disabled");
  }

  btnStart.classList.add("disabled");
}

function enableStartBtn() {
  btnStart.classList.remove("disabled");
}

function handleBtnStop() {
  clearInterval(intervalID);
  intervalID = null;
  enableStartBtn();
}
function handleBtnReset() {
  currentState = {
    ...defaultState,
  };
  enableStartBtn();
  updateUI();
}

let validateValue = (inputField, field) => {
  if (inputField.value.trim() === "") {
    inputField.value = 0;
  }

  switch (field) {
    case "m1":
    case "m2":
    case "s2":
      if (Number(inputField.value) > 9) {
        inputField.value = 9;
      } else if (Number(inputField.value) < 0) {
        inputField.value = 0;
      }
      break;
    case "s1":
      if (Number(inputField.value) > 5) {
        inputField.value = 5;
      } else if (Number(inputField.value) < 0) {
        inputField.value = 0;
      }
      break;
  }

  switch (field) {
    case "m1":
      currentState.m1 = Number(inputField.value);
      break;
    case "m2":
      currentState.m2 = Number(inputField.value);
      break;
    case "s1":
      currentState.s1 = Number(inputField.value);
      break;
    case "s2":
      currentState.s2 = Number(inputField.value);
      break;
  }

  console.log(currentState);
};
function debounce(fxn, delay) {
  let timeoutIdDebounced = null;

  return function (...args) {
    if (timeoutIdDebounced) {
      clearTimeout(timeoutIdDebounced);
    }
    timeoutIdDebounced = setTimeout(() => {
      fxn(...args);
    }, delay);
  };
}

let debouncedValidateInput = debounce(
  validateValue,
  validationDelayInMilliseconds
);

window.addEventListener("load", () => {
  console.clear();
  inputM1.addEventListener("click", () => {
    inputM1.select();
  });
  inputM2.addEventListener("click", () => {
    inputM2.select();
  });
  inputS1.addEventListener("click", () => {
    inputS1.select();
  });
  inputS2.addEventListener("click", () => {
    inputS2.select();
  });

  inputM1.addEventListener("input", () => {
    debouncedValidateInput(inputM1, "m1");
  });
  inputM2.addEventListener("input", () => {
    debouncedValidateInput(inputM2, "m2");
  });
  inputS1.addEventListener("input", () => {
    debouncedValidateInput(inputS1, "s1");
  });
  inputS2.addEventListener("input", () => {
    debouncedValidateInput(inputS2, "s2");
  });

  btnStart.addEventListener("click", handleBtnStart);
  btnStop.addEventListener("click", handleBtnStop);
  btnReset.addEventListener("click", handleBtnReset);

  // update UI
  updateUI();
});
