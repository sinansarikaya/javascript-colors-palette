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
const closeBox = document.querySelector(".fa-xmark");
const search = document.querySelector(".search");

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

deleteColor.forEach((element) => {
  // getList = localStorage.getItem("Colors Palette");
  // getList = JSON.parse(getList);
  element.addEventListener("click", (e) => {
    delete getList[e.currentTarget.dataset.key];
    localStorage.setItem("Colors Palette", JSON.stringify(getList));
    colorList.innerHTML = "";
    getItems(hasLocal);
  });
});

changeColor();
