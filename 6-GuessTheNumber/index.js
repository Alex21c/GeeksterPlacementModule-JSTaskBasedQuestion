const inputMinGuess = document.querySelector("input#inputMinGuess");
const inputMaxGuess = document.querySelector("input#inputMaxGuess");
const inputUserGuess = document.querySelector("input#inputUserGuess");
const pHavingGuessesLog = document.querySelector("p#pHavingGuessesLog");
const h2YourGuessProximity = document.querySelector("h2#h2YourGuessProximity");
const btnSubmitGuess = document.querySelector("input#btnSubmitGuess");
const h2AnswerIs = document.querySelector("h2#h2AnswerIs");
const btnTellUserTheAnswer = document.querySelector(
  "button#btnTellUserTheAnswer"
);
const btnResetTheGame = document.querySelector("button#btnResetTheGame");

const inputValidationAfterNMilliseconds = 3000;
const minimumDifference = 5;
let userGuessesLog = [];
let computerGuessesNum = null;
window.addEventListener("load", () => {
  console.clear();
  inputMinGuess.addEventListener("input", handleInputMinGuess);
  inputMaxGuess.addEventListener("input", handleInputMaxGuess);
  btnSubmitGuess.addEventListener("click", handleBtnSubmitGuess);
  btnTellUserTheAnswer.addEventListener("click", handleBtnTellUserTheAnswer);
  btnResetTheGame.addEventListener("click", handleBtnResetTheGame);
  computerGuessAnyNumber();
});

function handleBtnResetTheGame() {
  computerGuessAnyNumber();
  userGuessesLog = [];
  updateParagraphShowingGuessesLog();
  h2AnswerIs.classList.add("displayNone");
  h2YourGuessProximity.classList.add("displayNone");
}

function handleBtnTellUserTheAnswer() {
  h2AnswerIs.classList.remove("displayNone");
  h2AnswerIs.innerText = "Answer : " + computerGuessesNum;
}

function computerGuessAnyNumber() {
  const min = Number(inputMinGuess.value);
  const max = Number(inputMaxGuess.value);
  computerGuessesNum = min + Math.floor(Math.random() * (max - min + 1));
  // console.log("answer is: " + computerGuessesNum);
  guessProximity(2, computerGuessesNum);
}

function handleBtnSubmitGuess(event) {
  h2YourGuessProximity.classList.remove("displayNone");
  event.preventDefault();
  const guess = Number(inputUserGuess.value);
  inputUserGuess.value = "";
  userGuessesLog.push(guess);
  updateParagraphShowingGuessesLog();

  guessProximity(guess, computerGuessesNum);
}

function guessProximity(guess = null, computerGuessesNum = null) {
  const min = Number(inputMinGuess.value);
  const max = Number(inputMaxGuess.value);

  if (!guess || !computerGuessesNum) {
    return;
  }
  const totalNums = max - min + 1;

  if (guess === computerGuessesNum) {
    h2YourGuessProximity.innerText = "Correct, You Won the game !";
    return;
  }

  if (
    guess >= Math.floor(computerGuessesNum - 0.2 * computerGuessesNum) &&
    guess <= Math.ceil(computerGuessesNum + 0.2 * computerGuessesNum)
  ) {
    let hintMin = Math.floor(computerGuessesNum - 0.2 * computerGuessesNum);
    if (hintMin < min) {
      hintMin = min;
    }
    let hintMax = Math.ceil(computerGuessesNum + 0.2 * computerGuessesNum);
    if (hintMax > max) {
      hintMax = max;
    }

    h2YourGuessProximity.innerHTML = `Too Close,<Br> hint: guess between ${hintMin} and ${hintMax}`;
  } else if (
    guess >= Math.floor(computerGuessesNum - 0.3 * computerGuessesNum) &&
    guess <= Math.ceil(computerGuessesNum + 0.3 * computerGuessesNum)
  ) {
    h2YourGuessProximity.innerText = "Close Enough";
  } else {
    h2YourGuessProximity.innerText = "Too far !";
  }
}
let safeguardHandleConflictBothMinAndMaxAreSame = () => {
  if (inputMinGuess.value == "") {
    inputMinGuess.value = 1;
  }
  if (Number(inputMinGuess.value) === Number(inputMaxGuess.value)) {
    // then set the max value as minimumDifference points away from min
    inputMaxGuess.value = Number(inputMaxGuess.value) + minimumDifference;
  } else if (Number(inputMinGuess.value) > Number(inputMaxGuess.value)) {
    // then set the max value as minimumDifference points away from min
    inputMinGuess.value = Number(inputMaxGuess.value) - minimumDifference;
  }
};
function debounce(fn, delay) {
  let timeoutID = null;
  return function (...args) {
    if (timeoutID) {
      clearTimeout();
    }
    setTimeout(() => {
      fn(args);
    }, delay);
  };
}

let debouncedSafeguardHandleConflictBothMinAndMaxAreSame = debounce(
  safeguardHandleConflictBothMinAndMaxAreSame,
  inputValidationAfterNMilliseconds
);
function handleInputMaxGuess() {
  debouncedSafeguardHandleConflictBothMinAndMaxAreSame();
  computerGuessAnyNumber();
}
function handleInputMinGuess() {
  debouncedSafeguardHandleConflictBothMinAndMaxAreSame();
  computerGuessAnyNumber();
}

function updateParagraphShowingGuessesLog() {
  if (userGuessesLog.length <= 0) {
    pHavingGuessesLog.innerText = "";
    return;
  }

  pHavingGuessesLog.innerText = userGuessesLog.join(", ");
}
