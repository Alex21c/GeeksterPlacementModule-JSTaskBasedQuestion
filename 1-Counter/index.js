let currentValue = 0;
let divResultValue = document.getElementById("divResultValue");
let divBtnPlus = document.getElementById("divBtnPlus");
let divBtnMinus = document.getElementById("divBtnMinus");
let incrementDecrementBy = document.getElementById("incrementDecrementBy");
let btnReset = document.getElementById("btnReset");

window.addEventListener("load", () => {
  divBtnPlus.addEventListener("click", plus);
  divBtnMinus.addEventListener("click", minus);
  btnReset.addEventListener("click", reset);
});

function plus() {
  currentValue += Number(incrementDecrementBy.value);
  updateValue();
}
function minus() {
  currentValue -= Number(incrementDecrementBy.value);
  updateValue();
}

function reset() {
  currentValue = 0;
  updateValue();
  incrementDecrementBy.value = 1;
}
function updateValue() {
  divResultValue.innerText = currentValue;
}
