import {
  alert,
  RGBToHex,
  RGBToHSL,
  RGBToArray,
  colorVariables,
  createElement,
} from "./functions.js";
// Menu Doms
const navbar = document.querySelector(".navbar");
const hamburger = document.querySelector(".hamburger");
// Menu Doms End

// Save Doms
const saveBtn = document.querySelector(".save");
const saveBox = document.querySelector("#saveBox");
const saveBoxClose = document.querySelector("#saveBox .fa-xmark");
const saveSubmit = document.querySelector(".saveSubmit");
// Save Doms End

const main = document.querySelector("main");
const colorContainer = document.querySelector("#colors");
const colorPalets = document.querySelectorAll("#colors .palette");
const colorCode = document.querySelectorAll(".color-code");
const logo = document.querySelector(".logo");
const lock = document.querySelectorAll(".lock");
const colorList = document.querySelector(".colorList");
const search = document.querySelector(".search");

// Get items from localStorage
let getLocalColors = localStorage.getItem("Colors Palette");
getLocalColors = JSON.parse(getLocalColors);
let palettes = {};

let isLocked = [false, false, false, false, false];
let boxOpen = false;

let selectedColor = search.value;

search.addEventListener("input", () => {
  if (!getLocalColors) {
    selectedColor = search.value;
    console.log(selectedColor);
    filterColor(selectedColor);
    getColors();
  }
});

const filterColor = (clr) => {
  colorList.innerHTML = "";
  const filteredColor = Object.keys(getLocalColors)
    .filter((key) => clr.includes(key))
    .reduce((obj, key) => {
      obj[key] = getLocalColors[key];
      return obj;
    }, {});
  return filteredColor;
};

const getColors = () => {
  if (!search.value) {
    selectedColor = Object.keys(getLocalColors);
  }
  Object.keys(filterColor(selectedColor)).forEach((key) => {
    createElement(key, getLocalColors[key]);
  });
};

// Check if localStorage has items or not
if (getLocalColors == null) {
  localStorage.setItem("Colors Palette", JSON.stringify(palettes));
} else {
  palettes = getLocalColors;
  getColors();
}

// ------- Menu Events -------
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navbar.classList.toggle("active");
});
// ------- Menu Events End -------

// ------- Save Box Events -------
// Open Save Box
saveBtn.addEventListener("click", () => {
  saveBox.classList.add("active");
  boxOpen = true;
});

// Close Event
const close = () => {
  saveBox.classList.remove("active");
  boxOpen = false;
};

// Close Save Box
saveBoxClose.addEventListener("click", () => {
  close();
});

// Escape Close Box Event
document.addEventListener("keydown", (e) => {
  if (e.code == "Escape" && boxOpen) {
    close();
  }
});

// Save Color Event
saveSubmit.addEventListener("click", (e) => {
  let colors = [];

  colorCode.forEach((colorCodeEl) => {
    colors.push(colorCodeEl.innerText);
  });

  let paletteName = e.target.parentElement.querySelector(".pName").value;
  e.target.parentElement.querySelector(".pName").value = "";

  palettes[paletteName] = colors;
  createElement(paletteName, colors);

  localStorage.setItem("Colors Palette", JSON.stringify(palettes));
  close();

  //! ALERT TEST ---->>
  alert("Success!", "Color added successfully.");
});
// ------- Save Box Events End -------

// ------- Random Colors -------
// Generate Random Colors
const generateRandomColors = () => {
  for (let i = 0; i < colorPalets.length; i++) {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    if (isLocked[i] === false && !boxOpen) {
      colorPalets[i].style.backgroundColor = `#${randomColor}`;
      colorCode[i].innerText = `${randomColor}`;
    }
  }
};

// Logo Color Event
logo.addEventListener("click", () => {
  generateRandomColors();
});

// Space Color Event
document.addEventListener("keydown", (e) => {
  if (e.code == "Space") {
    generateRandomColors();
  }
});

//! Change Color Button ---->>

generateRandomColors();
// ------- Random Colors End -------

// ------- Lock Events -------
lock.forEach((lockEl, i) =>
  lockEl.addEventListener("click", (e) => {
    let event = e.target.classList;

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
// ------- Lock Event End -------

// ------- Color Container Events -------
colorContainer.addEventListener("click", (e) => {
  // Color Variable Event
  if (e.target.classList == "material-symbols-outlined") {
    e.target.parentElement.parentElement.style.backgroundColor;
    let rgbCode = RGBToArray(
      e.target.parentElement.parentElement.style.backgroundColor
    );

    let changedHLS = RGBToHSL(rgbCode[0], rgbCode[1], rgbCode[2]);

    for (const child of e.target.parentElement.children) {
      child.style.display = "none";
    }
    let colorVrbContainer = document.createElement("div");
    colorVrbContainer.setAttribute("class", "colorsContainer");
    e.target.parentElement.appendChild(colorVrbContainer);

    let hlsCode = RGBToHSL(rgbCode[0], rgbCode[1], rgbCode[2]);

    for (let i = 0; i < colorVariables(changedHLS[2]).length; i++) {
      let vrbItems = document.createElement("div");
      vrbItems.setAttribute("class", "vrbItems");
      colorVrbContainer.appendChild(vrbItems);
      vrbItems.style.backgroundColor = `hsl(${hlsCode[0]}, ${hlsCode[1]}%, ${
        colorVariables(changedHLS[2])[i]
      }%)`;

      let vrbBg = RGBToArray(vrbItems.style.backgroundColor);

      vrbItems.innerText = RGBToHex(vrbBg[0], vrbBg[1], vrbBg[2]);
    }
  }

  // Color Copy Event
  if (e.target.classList == "fa-regular fa-copy") {
    navigator.clipboard.writeText(
      e.target.parentElement.querySelector(".color-code").innerText
    );
    //! ALERT TEST ---->>
    alert("Success!", "Color copied successfully.");
  }
});
// ------- Color Container Events End -------

// ------- Color Variables Click Events -------
main.addEventListener("click", (e) => {
  if (e.target.className == "vrbItems") {
    for (const child of e.target.parentElement.parentElement.children) {
      child.style.display = "";
    }
    e.target.parentElement.parentElement.parentElement.style.backgroundColor =
      e.target.style.backgroundColor;
    let rgbBgCode = RGBToArray(e.target.style.backgroundColor);
    e.target.parentElement.parentElement.querySelector(
      ".color-code"
    ).innerText = RGBToHex(rgbBgCode[0], rgbBgCode[1], rgbBgCode[2]);

    e.target.parentElement.remove();
  }
});
// ------- Color Variables Click Events End -------

// Color list events from navbar
colorList.addEventListener("click", (e) => {
  // Delete Color
  if (e.target.className == "fa-solid fa-xmark deleteColor") {
    e.target.parentElement.previousElementSibling.remove();
    e.target.parentElement.remove();
    delete getLocalColors[e.target.getAttribute("data-key")];
    localStorage.setItem("Colors Palette", JSON.stringify(getLocalColors));
    //! ALERT TEST ---->>
    alert("Success!", "Color deleted successfully.");
  }

  // Use Color
  if (e.target.className == "list-color") {
    let element = e.target.parentElement.children;

    for (let i = 0; i < element.length; i++) {
      colorPalets[i].style.backgroundColor = element[i].style.backgroundColor;
    }
  }
});
