let workouts = [
  {
    id: 101,
    name: "cycling",
    duration: 45,
  },
  {
    id: 102,
    name: "shoulder exercise",
    duration: 30,
  },
];

let inputWorkoutType = document.querySelector("input#inputWorkoutType");
let inputWorkoutDuration = document.querySelector("input#inputWorkoutDuration");
let btnAddWorkout = document.querySelector("input#btnAddWorkout");
let ulWorkoutLog = document.querySelector("ul#ulWorkoutLog");
window.addEventListener("load", () => {
  btnAddWorkout.addEventListener("click", addWorkout);
  console.clear();
  updateUL();
});

function addWorkout(event) {
  event.preventDefault();
  //safeguad
  if (inputWorkoutType.value == "" || inputWorkoutDuration == "") {
    return;
  }
  const workout = {
    id: new Date().getTime(),
    name: inputWorkoutType.value,
    duration: Number(inputWorkoutDuration.value),
  };

  workouts.push(workout);
  updateUL();
  (inputWorkoutType.value = ""), (inputWorkoutDuration.value = "");
}
function deleteWorkout(workoutID) {
  workouts = workouts.filter((workout) => workout.id !== workoutID);
  updateUL();
}

function updateUL() {
  ulWorkoutLog.innerHTML = "";
  workouts.forEach((workout) => {
    createHtmlWorkoutLi(workout);
  });
}

function createHtmlWorkoutLi(workoutObj) {
  let li = document.createElement("li");
  li.className = "flex justify-between bg-slate-600 p-[1rem] rounded-md";
  li.innerHTML = `
            <div>
              <span>${workoutObj.name}-</span>
              <span>${workoutObj.duration} minutes</span>
            </div>
            <span onClick="deleteWorkout(${workoutObj.id})" class="bg-red-400 text-stone-100 rounded-md font-medium  text-[1rem] transition border-[.15rem] border-stone-200 w-[5rem] opacity-[.8] hover:opacity-[1] p-[.3rem] cursor-pointer select-none text-center">Delete</span>
              
  `;

  ulWorkoutLog.append(li);
}
