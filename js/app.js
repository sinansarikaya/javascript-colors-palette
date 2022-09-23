import {
  alert,
  RGBToHex,
  RGBToHSL,
  RGBToArray,
  colorVariables,
  createElement,
  generateDarkColorHsl,
  generateLightColorHsl,
  HSLToHex,
  HSLtoObject,
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
const typeBox = document.querySelector("#typeBox");
const typeBoxClose = document.querySelector("#typeBox .fa-xmark");
const typeBoxSave = document.querySelector("#typeBox .saveType");
const typeBoxColorTypes = document.querySelector("#colorTypes");
// Save Doms End

const main = document.querySelector("main");
const colorContainer = document.querySelector("#colors");
const colorPalets = document.querySelectorAll("#colors .palette");
const colorCode = document.querySelectorAll(".color-code");
const logo = document.querySelector(".logo");
const lock = document.querySelectorAll(".lock");
const colorList = document.querySelector(".colorList");
const search = document.querySelector(".search");
const howWorks = document.querySelector(".how-works");
const howWorksClose = document.querySelector(".how-works .fa-xmark");
const question = document.querySelector(".social .fa-circle-question");

// Get items from localStorage
let getLocalColors = localStorage.getItem("Colors Palette");
getLocalColors = JSON.parse(getLocalColors);
let palettes = {};

let isLocked = [false, false, false, false, false];
let boxOpen = false;
let colorSelected = true;

//! ------- How to use section -------
let getLocalWorks = localStorage.getItem("How Works");
let howWorksOpen = "true";
if (getLocalWorks != null) {
  howWorksOpen = getLocalWorks;
}

if (howWorksOpen === "true") {
  howWorks.classList.add("active");
} else {
  howWorks.classList.remove("active");
}

question.addEventListener("click", () => {
  howWorks.classList.add("active");
  howWorksOpen = "true";
  localStorage.setItem("How Works", howWorksOpen);
});

howWorksClose.addEventListener("click", () => {
  howWorksOpen = "false";
  howWorks.classList.remove("active");
  localStorage.setItem("How Works", howWorksOpen);
});
//! ------- How to use section End -------

//! ------- Filter And Search Colors -------
let selectedColor = search.value;
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

search.addEventListener("focusin", () => {
  boxOpen = true;
});

search.addEventListener("focusout", () => {
  boxOpen = false;
});

search.addEventListener("input", () => {
  selectedColor = search.value;
  getLocalColors = localStorage.getItem("Colors Palette");
  getLocalColors = JSON.parse(getLocalColors);
  if (getLocalColors != "") {
    selectedColor = search.value;
    filterColor(selectedColor);
    getColors();
  }
});
//! -------Filter And Search Colors End -------

//! ------- Get All Colors -------
const getColors = () => {
  if (!search.value) {
    selectedColor = Object.keys(getLocalColors);
  }
  Object.keys(filterColor(selectedColor)).forEach((key) => {
    createElement(key, getLocalColors[key]);
  });
};
//! ------- Get All Colors End -------

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

//! ------- Save Box Events -------
// Open Save Box
saveBtn.addEventListener("click", () => {
  if (boxOpen) {
    return;
  }
  saveBox.classList.add("active");
  boxOpen = true;
});

// ------- Close Event -------
const close = (element) => {
  element.classList.remove("active");
  boxOpen = false;
};
// ------- Close Event End -------

// ------- Close Save Box -------
saveBoxClose.addEventListener("click", () => {
  close(saveBox);
});
// ------- Close Save Box End -------

// ------- Escape Close Box Event -------
document.addEventListener("keydown", (e) => {
  if (e.code == "Escape" && boxOpen) {
    close(saveBox);
  }
});
// ------- Escape Close Box Event End -------

// ------- Color Save Submit Event -------
saveSubmit.addEventListener("click", (e) => {
  if (!e.target.parentElement.querySelector(".pName").value) {
    alert("Error!", "You must fill the form!");
    return;
  }
  let colors = [];

  colorCode.forEach((colorCodeEl) => {
    let convertedRgb =
      colorCodeEl.parentElement.parentElement.style.backgroundColor;
    convertedRgb = RGBToArray(convertedRgb);
    convertedRgb = RGBToHex(convertedRgb[0], convertedRgb[1], convertedRgb[2]);
    colors.push(convertedRgb);
  });

  let paletteName = e.target.parentElement.querySelector(".pName").value;
  e.target.parentElement.querySelector(".pName").value = "";

  palettes[paletteName] = colors;
  createElement(paletteName, colors);

  localStorage.setItem("Colors Palette", JSON.stringify(palettes));
  close(saveBox);

  alert("Success!", "Color added successfully!");
});
// ------- Color Save Submit Event End -------
//! ------- Save Box Events End  -------

//! ------- Random Colors -------
// ------- Generate Random Colors -------
const generateRandomColors = () => {
  if (!colorSelected) {
    alert("Error!", "Please select a color to generate random colors");
    return;
  }
  for (let i = 0; i < colorPalets.length; i++) {
    if (isLocked[i] === false && !boxOpen && i <= 2) {
      const randomDarkColor = generateDarkColorHsl();
      let convertedHslDark = HSLtoObject(randomDarkColor);
      convertedHslDark = HSLToHex(
        convertedHslDark.hue,
        convertedHslDark.saturation,
        convertedHslDark.lightness
      );

      colorPalets[i].style.backgroundColor = `${randomDarkColor}`;
      colorCode[i].innerText = `${convertedHslDark}`;
    }

    if (isLocked[i] === false && !boxOpen && i >= 2) {
      const randomLightColor = generateLightColorHsl();
      let convertedHslLight = HSLtoObject(randomLightColor);
      convertedHslLight = HSLToHex(
        convertedHslLight.hue,
        convertedHslLight.saturation,
        convertedHslLight.lightness
      );

      colorPalets[i].style.backgroundColor = `${randomLightColor}`;

      colorCode[i].innerText = `${convertedHslLight}`;
    }
  }
};
// ------- Generate Random Colors End -------

// ------- Logo Color Event -------
logo.addEventListener("click", () => {
  generateRandomColors();
});
// ------- Logo Color Event End -------

// ------- Space Key Color Event -------
document.addEventListener("keydown", (e) => {
  if (e.code == "Space") {
    generateRandomColors();
  }
});
// ------- Space Key Color Event End -------

generateRandomColors();
//! ------- Random Colors End -------

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

//! ------- Color Container Events -------
colorContainer.addEventListener("click", (e) => {
  // ------- Color Variable Event -------
  if (e.target.classList == "material-symbols-outlined") {
    colorSelected = false;

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

    for (let i = 0; i <= 19; i++) {
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
  // ------- Color Variable Event End -------

  // ------- Color Copy Event -------
  if (e.target.classList == "fa-regular fa-copy") {
    navigator.clipboard.writeText(
      e.target.parentElement.querySelector(".color-code").innerText
    );
    alert("Success!", "Color copied successfully.");
  }
  // ------- Color Copy Event End -------

  // ------- Color Code Type Change Events -------
  if (e.target.classList == "color-code") {
    if (boxOpen) {
      return;
    }
    boxOpen = true;
    typeBox.classList.add("active");

    // ------- Color Typye Change Box Close Event -------
    typeBoxClose.addEventListener("click", () => {
      close(typeBox);
    });
    // ------- Color Typye Change Box Close Event End -------

    // ------- Color Typye Change Box Save Event -------
    typeBoxSave.addEventListener("click", () => {
      colorPalets.forEach((color) => {
        let changedBg = RGBToArray(color.style.backgroundColor);
        let palettesText = color.querySelector(".color-code");

        if (typeBoxColorTypes.value == "RGB") {
          palettesText.innerText = color.style.backgroundColor;
        } else if (typeBoxColorTypes.value == "HSL") {
          changedBg = RGBToHSL(changedBg[0], changedBg[1], changedBg[2]);
          palettesText.innerText = `hsl(${changedBg[0]}, ${changedBg[1]}%, ${changedBg[2]}%)`;
        } else if (typeBoxColorTypes.value == "Hex") {
          changedBg = RGBToHex(changedBg[0], changedBg[1], changedBg[2]);
          palettesText.innerText = changedBg;
        }
      });
      close(typeBox);
    });
    // ------- Color Typye Change Box Save Event End -------
  }
  // ------- Color Code Type Change Events End -------
});
//! ------- Color Container Events End -------

//! ------- Color Variables Click Events -------
main.addEventListener("click", (e) => {
  if (e.target.className == "vrbItems") {
    for (const child of e.target.parentElement.parentElement.children) {
      child.style.display = "";
    }
    colorSelected = true;
    e.target.parentElement.parentElement.parentElement.style.backgroundColor =
      e.target.style.backgroundColor;
    let rgbBgCode = RGBToArray(e.target.style.backgroundColor);
    e.target.parentElement.parentElement.querySelector(
      ".color-code"
    ).innerText = RGBToHex(rgbBgCode[0], rgbBgCode[1], rgbBgCode[2]);

    e.target.parentElement.remove();
  }
});
//! ------- Color Variables Click Events End -------

//! -------  Color List Events From Navbar -------
colorList.addEventListener("click", (e) => {
  // ------- Delete Color -------
  if (e.target.className == "fa-solid fa-xmark deleteColor") {
    e.target.parentElement.previousElementSibling.remove();
    e.target.parentElement.remove();
    delete getLocalColors[e.target.getAttribute("data-key")];
    localStorage.setItem("Colors Palette", JSON.stringify(getLocalColors));
    alert("Warning!", "Color deleted!");
  }
  // ------- Delete Color End -------

  // ------- Use Color -------
  if (e.target.className == "list-color") {
    let element = e.target.parentElement.children;

    for (let i = 0; i < element.length; i++) {
      colorPalets[i].style.backgroundColor = element[i].style.backgroundColor;
    }
  }
  // ------- Use Color End -------
});
//! -------  Color List Events From Navbar End -------
