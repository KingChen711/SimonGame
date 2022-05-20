let level = 1;
let requestButtons = [];
let indexOfCheckingButton = 0;
let selectedButtons = [];
const buttonsName = ["green", "red", "yellow", "blue"];
const buttons = document.querySelectorAll(".btn");
let started = false;
let h1 = document.querySelector('h1');

document.addEventListener("keypress", async function () {
  if (!started) {
    started = true;
    h1.innerHTML = `level 1`;
    await addRequestButton();
  }
})

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    if (started) {
      clickButton(buttonsName[i]);
    }
  });
}

function clickButton(clickedButton) {

  let checkedButton = true;

  animationPressed(clickedButton);

  selectedButtons.push(clickedButton);
  if (selectedButtons[selectedButtons.length - 1] === requestButtons[indexOfCheckingButton]) {
    indexOfCheckingButton++;
    if (selectedButtons.length === requestButtons.length) {
      levelUp();
    }
  }
  else {
    checkedButton = false;
  }

  if (checkedButton === true) {
    makeSound(clickedButton);
  }
  else {
    makeSound("wrong");
  }

  if (!checkedButton) {

    let body = document.querySelector("body");
    body.style.backgroundColor = "red";
    setTimeout(() => {
      body.style.backgroundColor = "#011F3F";
    }, 300);

    started = false;

    h1.innerHTML = `Game Over, Press Any Key To Restart`;
    level = 1;
    requestButtons = [];
    indexOfCheckingButton = 0;
    selectedButtons = [];

  }

}

async function levelUp() {
  level++;
  h1.innerHTML = `level ${level}`;
  selectedButtons = [];
  indexOfCheckingButton = 0;
  await addRequestButton();

}

function addRequestButton() {
  return new Promise((resolve) => {
    setTimeout(() => {
      let randomIndex = Math.floor(Math.random() * 4);
      requestButtons.push(buttonsName[randomIndex]);
      makeSound(buttonsName[randomIndex]);
      animationPressed(buttonsName[randomIndex]);
      return resolve();
    }, 1000)
  })
}

function animationPressed(button) {
  let pressedButton = document.querySelector("." + button);
  pressedButton.classList.add("pressed");
  setTimeout(() => {
    pressedButton.classList.remove("pressed");
  }, 300);
}

function makeSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

