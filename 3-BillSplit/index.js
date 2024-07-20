let btnsTip = document.querySelectorAll("button.btnTip");
let inputCustomTip = document.querySelector("input#inputCustomTip");
let inputNoOfPeople = document.querySelector("input#inputNoOfPeople");
let btnGenerateBill = document.querySelector("button#btnGenerateBill");
let inputBillAmount = document.querySelector("input#inputBillAmount");
let btnReset = document.querySelector("input#btnReset");
let spanTipAmount = document.querySelector("span#spanTipAmount");
let spanTotal = document.querySelector("span#spanTotal");
let spanEachPersonBill = document.querySelector("span#spanEachPersonBill");

let previouslySelectedTipBtn = undefined;
let billAmount = 0,
  tip = undefined,
  numOfPeople = undefined,
  totalBill = 0,
  eachPersonBill = 0;

window.addEventListener("load", init);

function init() {
  // disable select tip buttons and input
  disableSelectTipBtnsAndInput();
  // disable input number of pople
  disableElement(inputNoOfPeople);
  // disable btnGenerateBill
  disableElement(btnGenerateBill);

  inputBillAmount.addEventListener("input", handleInputBillAmount);
  inputNoOfPeople.addEventListener("input", handleInputNoOfPeople);
  inputCustomTip.addEventListener("input", handleInputCustomTip);
  btnGenerateBill.addEventListener("click", generateBill);
  btnReset.addEventListener("click", reset);
}

function reset(event) {
  event.preventDefault();
  // disable select tip buttons and input
  disableSelectTipBtnsAndInput();
  // disable input number of pople
  disableElement(inputNoOfPeople);
  // disable btnGenerateBill
  disableElement(btnGenerateBill);

  // clear input bill, num of people, custom tip amount
  inputBillAmount.value = "";
  inputCustomTip.value = "";
  inputNoOfPeople.value = "";
  previouslySelectedTipBtn &&
    previouslySelectedTipBtn.classList.remove("activeTipBtn");

  // reset values
  previouslySelectedTipBtn = undefined;
  (billAmount = 0),
    (tip = undefined),
    (numOfPeople = undefined),
    (totalBill = 0),
    (eachPersonBill = 0);
  // reset the labels for output

  spanTipAmount.innerText = "₹ ";
  spanTotal.innerText = "₹ ";
  spanEachPersonBill.innerText = "₹ ";
}

function generateBill() {
  // each person bill ?
  eachPersonBill = Math.ceil(totalBill / numOfPeople);
  spanTipAmount.innerText = "₹ " + Math.ceil(tip);
  spanTotal.innerText = "₹ " + Math.ceil(totalBill);
  spanEachPersonBill.innerText = "₹ " + Math.ceil(eachPersonBill);
}

function handleInputCustomTip() {
  if (inputNoOfPeople.value !== "" && inputCustomTip.value !== "") {
    enableElement(btnGenerateBill);
  } else {
    disableElement(btnGenerateBill);
  }

  // reset tip % btn if any highlighted
  if (previouslySelectedTipBtn) {
    previouslySelectedTipBtn.classList.remove("activeTipBtn");
  }
  // just add the amount into total bill
  tip = Number(inputCustomTip.value);
  totalBill = Number(billAmount) + tip;
  console.log(totalBill, tip);
}

function handleInputNoOfPeople() {
  if (inputNoOfPeople.value === "") {
    disableElement(btnGenerateBill);
  } else if (tip) {
    enableElement(btnGenerateBill);
  }
  numOfPeople = Number(inputNoOfPeople.value);
}

function setTipAsPercentOfBillAmount(event, tipPercent) {
  event.preventDefault();
  // clear if any custom tip
  inputCustomTip.value = "";

  if (inputNoOfPeople.value !== "") {
    enableElement(btnGenerateBill);
  }
  // highlight border
  if (previouslySelectedTipBtn) {
    previouslySelectedTipBtn.classList.remove("activeTipBtn");
  }
  event.target.classList.add("activeTipBtn");
  previouslySelectedTipBtn = event.target;

  tipPercent = Number(tipPercent);
  tip = Number(billAmount) * Number(tipPercent);
  totalBill = Number(billAmount) + tip;

  // console.log(totalBill, tip);
}
function handleInputBillAmount() {
  billAmount = inputBillAmount.value;
  if (inputBillAmount.value == "") {
    disableSelectTipBtnsAndInput();
    disableElement(inputNoOfPeople);
  } else {
    enableSelectTipBtnsAndInput();
    enableElement(inputNoOfPeople);
  }
}

function enableElement(element) {
  element.disabled = false;
  element.classList.remove("disabled");
}
function disableElement(element) {
  element.disabled = true;
  element.classList.add("disabled");
}

function enableSelectTipBtnsAndInput() {
  btnsTip.forEach((btn) => {
    enableElement(btn);
  });

  enableElement(inputCustomTip);
}

function disableSelectTipBtnsAndInput() {
  console.clear();

  btnsTip.forEach((btn) => {
    disableElement(btn);
  });

  disableElement(inputCustomTip);
}
