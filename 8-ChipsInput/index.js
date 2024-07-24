const inputChip = document.querySelector("input#inputChip");
const ulHoldingChips = document.querySelector("ul#ulHoldingChips");
let livePreviewLi = null;
const chips = ["apple", "orange", "grapes"];
window.addEventListener("load", () => {
  inputChip.addEventListener("input", handleInputChip);
  inputChip.addEventListener("keyup", isEnterPressed);

  prepareStage();
});

function isEnterPressed(event) {
  if (event.code === "Enter" && inputChip.value !== "") {
    chips.push(inputChip.value);
    inputChip.value = "";

    prepareStage();
  }
}

function prepareStage() {
  ulHoldingChips.innerHTML = "";
  chips.forEach((chipValue, idx) => createLiChip(chipValue, idx));
  createLivePreviewLi();
}

function handleInputChip() {
  if (inputChip.value === "") {
    livePreviewLi.classList.add("displayNone");
  } else {
    livePreviewLi.classList.remove("displayNone");
  }
  livePreviewLi.innerText = inputChip.value;
}

function deleteChip(idx) {
  chips.splice(idx, 1);
  prepareStage();
}

function createLivePreviewLi() {
  livePreviewLi = document.createElement("li");
  livePreviewLi.innerText = "";
  livePreviewLi.className =
    "bg-yellow-400 px-[1rem] py-[.5rem] flex gap-[1rem] rounded-xl items-center border-[.10rem] border-stone-700 shadow-yellow-200 shadow-sm displayNone";

  ulHoldingChips.append(livePreviewLi);
}
function createLiChip(value, idx) {
  const liChip = document.createElement("li");
  liChip.className =
    "bg-yellow-400 px-[1rem] py-[.5rem] flex gap-[1rem] rounded-xl items-center border-[.10rem] border-stone-700 shadow-yellow-200 shadow-sm ";
  const span = document.createElement("span");
  span.className = "font-medium";
  span.innerText = value;
  liChip.append(span);
  const deleteBtn = document.createElement("i");
  deleteBtn.className =
    "fa-solid fa-trash text-red-600 text-[1.5rem] hover:text-red-800 transition";
  deleteBtn.addEventListener("click", () => deleteChip(idx));
  liChip.append(deleteBtn);

  ulHoldingChips.append(liChip);
}
