const star1 = document.querySelector("i#star1");
const star2 = document.querySelector("i#star2");
const star3 = document.querySelector("i#star3");
const star4 = document.querySelector("i#star4");
const star5 = document.querySelector("i#star5");
const emoji = document.querySelector("div#emoji");
const starsWrapper = document.querySelector("div#starsWrapper");
let currentStarRating = 5;
const emojis = ["😐", "😞", "😐", "😀", "😎"];

const classNamesStars = {
  highlighted: "fa-solid fa-star cursor-pointer",
  unhighlighted: "fa-regular fa-star cursor-pointer text-stone-200",
};

window.addEventListener("load", () => {
  star1.addEventListener("mouseenter", handleHoverStar1);
  star2.addEventListener("mouseenter", handleHoverStar2);
  star3.addEventListener("mouseenter", handleHoverStar3);
  star4.addEventListener("mouseenter", handleHoverStar4);
  star5.addEventListener("mouseenter", handleHoverStar5);
  star1.addEventListener("click", () => {
    currentStarRating = 1;
    updateEmoji();
  });
  star2.addEventListener("click", () => {
    currentStarRating = 2;
    updateEmoji();
  });
  star3.addEventListener("click", () => {
    currentStarRating = 3;
    updateEmoji();
  });
  star4.addEventListener("click", () => {
    currentStarRating = 4;
    updateEmoji();
  });
  star5.addEventListener("click", () => {
    currentStarRating = 5;
    updateEmoji();
  });

  starsWrapper.addEventListener("mouseleave", prepareStage);
});

function updateEmoji() {
  emoji.innerText = emojis[currentStarRating - 1];
}
function prepareStage() {
  // setting emoji
  updateEmoji();
  // setting stars
  switch (currentStarRating) {
    case 1:
      handleHoverStar1();
      break;
    case 2:
      handleHoverStar2();
      break;
    case 3:
      handleHoverStar3();
      break;
    case 4:
      handleHoverStar4();
      break;
    case 5:
      handleHoverStar5();
      break;
  }
}

function handleHoverStar1() {
  // highlight star 1
  star1.className = classNamesStars.highlighted;
  // unhighlight all other stars
  star2.className = classNamesStars.unhighlighted;
  star3.className = classNamesStars.unhighlighted;
  star4.className = classNamesStars.unhighlighted;
  star5.className = classNamesStars.unhighlighted;
}
function handleHoverStar2() {
  // highlight star 1, 2
  star1.className = classNamesStars.highlighted;
  star2.className = classNamesStars.highlighted;
  // unhighlight all other stars
  star3.className = classNamesStars.unhighlighted;
  star4.className = classNamesStars.unhighlighted;
  star5.className = classNamesStars.unhighlighted;
}
function handleHoverStar3() {
  // highlight star 1, 2, 3
  star1.className = classNamesStars.highlighted;
  star2.className = classNamesStars.highlighted;
  star3.className = classNamesStars.highlighted;
  // unhighlight all other stars
  star4.className = classNamesStars.unhighlighted;
  star5.className = classNamesStars.unhighlighted;
}
function handleHoverStar4() {
  // highlight star 1, 2, 3, 4
  star1.className = classNamesStars.highlighted;
  star2.className = classNamesStars.highlighted;
  star3.className = classNamesStars.highlighted;
  star4.className = classNamesStars.highlighted;
  // unhighlight all other stars
  star5.className = classNamesStars.unhighlighted;
}
function handleHoverStar5() {
  // highlight all
  star1.className = classNamesStars.highlighted;
  star2.className = classNamesStars.highlighted;
  star3.className = classNamesStars.highlighted;
  star4.className = classNamesStars.highlighted;
  star5.className = classNamesStars.highlighted;
}
