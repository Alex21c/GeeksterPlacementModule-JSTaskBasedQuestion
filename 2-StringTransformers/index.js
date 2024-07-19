let textareaHavingData = document.querySelector("textarea#textareaHavingData");
let spanLowerCase = document.querySelector("span#spanLowerCase");
let spanUpperCase = document.querySelector("span#spanUpperCase");
let spanCamelCase = document.querySelector("span#spanCamelCase");
let spanPascalCase = document.querySelector("span#spanPascalCase");
let spanSnakeCase = document.querySelector("span#spanSnakeCase");
let spanKebabCase = document.querySelector("span#spanKebabCase");
let spanTrim = document.querySelector("span#spanTrim");
let stringData = "";

window.addEventListener("load", init);

function init() {
  console.clear();
  stringData = textareaHavingData.value;
  updateContainers();
  textareaHavingData.addEventListener("input", updateContainers);
}

function updateContainers() {
  stringData = textareaHavingData.value;
  spanLowerCase.innerText = stringData.toLocaleLowerCase();
  spanUpperCase.innerText = stringData.toLocaleUpperCase();
  spanCamelCase.innerText = camelCase(stringData);
  spanPascalCase.innerText = pascalCase(stringData);
  spanSnakeCase.innerText = stringData.replaceAll(" ", "_");
  spanKebabCase.innerText = stringData.replaceAll(" ", "-");
  spanTrim.innerText = stringData.replaceAll(" ", "");
}

function pascalCase(stringData) {
  let words = stringData.split(" ");
  for (i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  return words.join("");
}
function camelCase(stringData) {
  let words = stringData.split(" ");
  for (i = 0; i < words.length; i++) {
    if (i === 0) {
      words[i] = words[i].toLocaleLowerCase();
    } else {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
  }
  return words.join("");
}
