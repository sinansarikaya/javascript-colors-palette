const navbar = document.querySelector(".navbar");
const hamburger = document.querySelector(".hamburger");
const colors = document.querySelectorAll("#colors .palette");
const colorCode = document.querySelectorAll(".color-code");
const lock = document.querySelectorAll(".lock");

let isLocked = [false, false, false, false, false];

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navbar.classList.toggle("active");
});

const changeColor = () => {
  for (let i = 0; i < colors.length; i++) {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    if (isLocked[i] === false) {
      colors[i].style.backgroundColor = `#${randomColor}`;
      colorCode[i].innerText = `#${randomColor}`;
    }
  }
};
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    changeColor();
  }
});

lock.forEach((lockEl, i) =>
  lockEl.addEventListener("click", (e) => {
    let event = e.target.classList;
    console.log(e.target.classList);
    if (event.contains("fa-lock-open")) {
      event.remove("fa-lock-open");
      event.add("fa-lock");
      isLocked[i] = true;
    } else {
      event.remove("fa-lock");
      event.add("fa-lock-open");
      isLocked[i] = false;
    }
    //
  })
);

changeColor();
