const navbar = document.querySelector(".navbar");
const hamburger = document.querySelector(".hamburger");
const colors = document.querySelectorAll("#colors .palette");
const colorCode = document.querySelectorAll(".color-code");
const lock = document.querySelectorAll(".lock");
const copy = document.querySelectorAll(".fa-copy");
const save = document.querySelector(".save");
const saveBox = document.querySelector("#saveBox");
const paletteName = document.querySelector("#palette-name");
const saveSubmit = document.querySelector(".saveSubmit");
const pName = document.querySelector(".pName");
const colorList = document.querySelector(".colorList");

let isLocked = [false, false, false, false, false];
let boxOpen = false;

const alert = (type, msg) => {};

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navbar.classList.toggle("active");
});

const changeColor = () => {
  for (let i = 0; i < colors.length; i++) {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    if (isLocked[i] === false) {
      colors[i].style.backgroundColor = `#${randomColor}`;
      colorCode[i].innerText = `${randomColor}`;
    }
  }
};

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !boxOpen) {
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
  })
);

copy.forEach((copyEl, i) =>
  copyEl.addEventListener("click", (e) => {
    navigator.clipboard.writeText(
      e.target.closest("div").querySelector(".color-code").innerText
    );
  })
);

save.addEventListener("click", () => {
  saveBox.classList.add("active");
  boxOpen = true;
});

saveSubmit.addEventListener("click", () => {
  let palettes = {};
  let palettesArray = [];
  colorCode.forEach((colorCodeEl) => {
    palettesArray.push(colorCodeEl.innerText);
  });

  palettes[paletteName.value] = palettesArray;
  localStorage.setItem("Colors Palette", JSON.stringify(palettes));
});

getItems = () => {
  let getList = localStorage.getItem("Colors Palette");

  getList = JSON.parse(getList);
  let colorKeys = String(Object.keys(getList));
  console.log(colorKeys);
  console.log(getList[colorKeys]);
};
getItems();
changeColor();