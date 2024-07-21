let spanProfession = document.querySelector("span#spanProfession");
let btnAddNewProfession = document.querySelector("input#btnAddNewProfession");
let inputNewProfession = document.querySelector("input#inputNewProfession");
let inputSpeedChange = document.querySelector("input#inputSpeedChange");
let professions = ["commodity trader", "SDE"];
let speed = 100;
let idx = 0;
let subIdx = 0;
let movingForward = true;
let intervalID = null;

window.addEventListener("load", () => {
  console.clear();
  btnAddNewProfession.addEventListener("click", addNewProfession);
  disableElement(btnAddNewProfession);
  inputNewProfession.addEventListener("input", handleProfessionInput);
  inputSpeedChange.addEventListener("input", handleInputSpeedChange);
});
function handleInputSpeedChange(event) {
  if (intervalID) {
    clearInterval(intervalID);
  }
  speed = Number(event.target.value);
  intervalID = setInterval(updateProfession, speed);
}
function disableElement(element) {
  element.disabled = true;
  element.classList.add("disabled");
}
function enableElement(element) {
  element.disabled = false;
  element.classList.remove("disabled");
}

function handleProfessionInput(event) {
  if (event.target.value === "") {
    disableElement(btnAddNewProfession);
  } else {
    enableElement(btnAddNewProfession);
  }
}
function addNewProfession(event) {
  event.preventDefault();
  // does the profession already exist?
  const profession = inputNewProfession.value;
  disableElement(btnAddNewProfession);
  inputNewProfession.value = "";
  if (profession === "") {
    return;
  }

  if (professions.includes(profession)) {
    console.log("profession already exist");
    return;
  }

  // add it
  professions.push(profession);
}

function updateProfession() {
  let profession = professions[idx];
  spanProfession.innerText = profession.slice(0, subIdx);
  // console.log(subIdx, profession.length, movingForward);

  if (subIdx === profession.length) {
    movingForward = false;
  } else if (subIdx === 0) {
    movingForward = true;
  }

  if (movingForward) {
    subIdx++;
  } else {
    subIdx--;
  }

  if (subIdx === 0 && !movingForward) {
    subIdx = 0;
    idx++;
    if (idx >= professions.length) {
      idx = 0;
    }
  }
}

intervalID = setInterval(updateProfession, speed);

window.addEventListener("beforeunload", (event) => {
  event.preventDefault;
  clearInterval(intervalID);
  alert("good bye");
});
