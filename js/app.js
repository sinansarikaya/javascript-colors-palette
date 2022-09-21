const navbar = document.querySelector(".navbar");
const hamburger = document.querySelector(".hamburger");
const colorsDom = document.querySelector("#colors");
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
const closeBox = document.querySelector(".fa-xmark");
const search = document.querySelector(".search");
const colorX = document.querySelector(".colorList .fa-xmark");

let getList = localStorage.getItem("Colors Palette");
getList = JSON.parse(getList);
//let colorKeys = String(Object.keys(getList));

let isLocked = [false, false, false, false, false];
let boxOpen = false;
let hasLocal = false;
if (getList != null) {
  hasLocal = true;
} else {
  hasLocal = false;
}

const alert = (type, msg) => {};

let selectedColor = search.value;

search.addEventListener("input", () => {
  selectedColor = search.value;
  filterColor(selectedColor);
  getItems(hasLocal);
});

const filterColor = (clr) => {
  if (!hasLocal) {
    return;
  }
  colorList.innerHTML = "";
  const filteredColor = Object.keys(getList)
    .filter((key) => clr.includes(key))
    .reduce((obj, key) => {
      obj[key] = getList[key];
      return obj;
    }, {});
  return filteredColor;
};
filterColor(selectedColor);

console.log(filterColor(selectedColor));

getItems = (hasLocal) => {
  // console.log(getList); // Object
  // console.log(colorKeys); // Keys
  // console.log(getList[colorKeys]); //Values

  if (!hasLocal) {
    return;
  }
  if (!search.value) {
    selectedColor = Object.keys(getList);
  }

  // getList = localStorage.getItem("Colors Palette");
  // getList = JSON.parse(getList);

  Object.keys(filterColor(selectedColor)).forEach((key) => {
    const newH5 = document.createElement("h5");
    const colorG = document.createElement("div");
    const closeI = document.createElement("i");
    const newLi = document.createElement("li");

    newH5.classList.add("list-title");
    colorG.classList.add("color-group");
    closeI.classList.add("fa-solid", "fa-xmark", "deleteColor");
    closeI.setAttribute("data-key", key);
    newLi.classList.add("list-item");
    newLi.setAttribute("data-key", key);

    colorList.appendChild(newH5);
    colorList.appendChild(colorG);
    colorG.appendChild(closeI);
    colorG.appendChild(newLi);

    newH5.innerText = key;

    getList[key].forEach((element) => {
      const newdiv = document.createElement("div");
      newdiv.classList.add("list-color");
      newLi.appendChild(newdiv);
      newdiv.style.backgroundColor = `#${element}`;
    });

    // console.log(key, getList[key]);
    return getList;
  });
};

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

const close = () => {
  saveBox.classList.remove("active");
  boxOpen = false;
};
closeBox.addEventListener("click", () => {
  close();
});

saveSubmit.addEventListener("click", (e) => {
  let palettes = {};

  if (hasLocal) {
    palettes = getList;
  }

  let palettesArray = [];
  colorCode.forEach((colorCodeEl) => {
    palettesArray.push(colorCodeEl.innerText);
  });
  palettes[paletteName.value] = palettesArray;
  localStorage.setItem("Colors Palette", JSON.stringify(palettes));

  hasLocal = true;

  pName.value = "";
  colorList.innerHTML = "";
  close();
  e.preventDefault();
  getItems(hasLocal);
});
getItems(hasLocal);

const listItem = document.querySelectorAll(".list-item");

listItem.forEach((item) => {
  item.addEventListener("click", (e) => {
    const colorGet = Object.keys(getList)
      .filter((key) => key.includes(e.currentTarget.dataset.key))
      .reduce((obj, key) => {
        return Object.assign(obj, {
          [key]: getList[key],
        });
      }, {});

    Object.keys(colorGet).forEach((key) => {
      colorGet[key].forEach((element, i) => {
        colors[i].style.backgroundColor = `#${element}`;
        colorCode[i].innerText = `${element}`;
      });
    });
  });
});

const deleteColor = document.querySelectorAll(".deleteColor");

//capturing
colorList.addEventListener("click", (e) => {
  if (e.target.className == "fa-solid fa-xmark deleteColor") {
    e.target.parentElement.previousElementSibling.remove();
    e.target.parentElement.remove();
    delete getList[e.target.getAttribute("data-key")];
    localStorage.setItem("Colors Palette", JSON.stringify(getList));
    getItems(hasLocal);
  }
});

const colorVariables = (num) => {
  let colorLight = [];
  let colorDark = [];
  let clrList = [];
  let number = num;

  const darkest = (n) => {
    for (n; n >= 0; ) {
      colorDark.push(n);
      n -= 5;
    }
    return colorDark;
  };

  const lightest = (nu) => {
    for (nu; nu <= 100; ) {
      colorLight.push(nu);
      nu += 5;
    }
    return colorLight;
  };

  darkest(number - 5);
  lightest(number);

  clrList = clrList.concat(colorDark, colorLight);
  clrList = clrList.sort(function (a, b) {
    return a - b;
  });

  return clrList.reverse();
};

const RGBToHSL = (r, g, b) => {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  // Calculate hue
  // No difference
  if (delta == 0) h = 0;
  // Red is max
  else if (cmax == r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [Math.round(h), Math.round(s), Math.round(l)];
};

const RGBToHex = (r, g, b) => {
  r = parseInt(r).toString(16);
  g = parseInt(g).toString(16);
  b = parseInt(b).toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return r + g + b;
};
const RGBToArray = (rgb) => {
  rgb = rgb
    .replace("rgb(", "")
    .replace(")", "")
    .replace(" ", "")
    .replace(" ", "")
    .split(",");

  return rgb;
};

colorsDom.addEventListener("click", (e) => {
  if (e.target.classList == "material-symbols-outlined") {
    e.target.parentElement.parentElement.style.backgroundColor;
    let rgbCode = e.target.parentElement.parentElement.style.backgroundColor;
    console.log(rgbCode);
    rgbCode = rgbCode
      .replace("rgb(", "")
      .replace(")", "")
      .replace(" ", "")
      .replace(" ", "")
      .split(",");

    let changedHLS = RGBToHSL(rgbCode[0], rgbCode[1], rgbCode[2]);
    console.log(changedHLS);

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

      console.log(
        `hsl(${hlsCode[0]}, ${hlsCode[1]}%, ${
          colorVariables(changedHLS[2])[i]
        }%)`
      );
      let vrbBg = vrbItems.style.backgroundColor
        .replace("rgb(", "")
        .replace(")", "")
        .replace(" ", "")
        .replace(" ", "")
        .split(",");
      // console.log(vrbItems.style.backgroundColor);
      console.log(vrbBg[0], vrbBg[1], vrbBg[2]);
      vrbItems.innerText = RGBToHex(vrbBg[0], vrbBg[1], vrbBg[2]);
    }
  }
});

const main = document.querySelector("main");
main.addEventListener("click", (e) => {
  if (e.target.className == "vrbItems") {
    // console.log(e.target.style.backgroundColor);
    // console.log(e.target.parentElement);
    for (const child of e.target.parentElement.parentElement.children) {
      child.style.display = "";
    }
    e.target.parentElement.parentElement.parentElement.style.backgroundColor =
      e.target.style.backgroundColor;
    rgbBgCode = RGBToArray(e.target.style.backgroundColor);
    e.target.parentElement.parentElement.querySelector(
      ".color-code"
    ).innerText = RGBToHex(rgbBgCode[0], rgbBgCode[1], rgbBgCode[2]);

    console.log(rgbBgCode[0], rgbBgCode[1], rgbBgCode[2]);

    e.target.parentElement.remove();
  }
});

changeColor();
