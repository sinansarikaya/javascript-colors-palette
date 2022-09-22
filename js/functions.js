const colorList = document.querySelector(".colorList");
const alertDom = document.querySelector("#alert");
// Alert
export const alert = (type, msg) => {
  if (type == "Error!") {
    alertDom.classList.add("error");
  } else if (type == "Success!") {
    alertDom.classList.add("success");
  } else if (type == "Warning!") {
    alertDom.classList.add("warning");
  }

  alertDom.querySelector(".type").innerText = type;
  alertDom.querySelector(".description").innerText = msg;

  setTimeout(() => (alertDom.className = ""), 3000);
};

// Rgb to Array Converter
export const RGBToArray = (rgb) => {
  rgb = rgb
    .replace("rgb(", "")
    .replace(")", "")
    .replace(" ", "")
    .replace(" ", "")
    .split(",");

  return rgb;
};

// Rgb to Hex Converter
export const RGBToHex = (r, g, b) => {
  r = parseInt(r).toString(16);
  g = parseInt(g).toString(16);
  b = parseInt(b).toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return r + g + b;
};

// Rgb to Hls Converter
export const RGBToHSL = (r, g, b) => {
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

// Color Variable Creator
export const colorVariables = (num) => {
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

// ------- Create Color Elements -------
export const createElement = (key, color) => {
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

  color.forEach((clr) => {
    const newdiv = document.createElement("div");
    newdiv.classList.add("list-color");
    newLi.appendChild(newdiv);
    newdiv.style.backgroundColor = `#${clr}`;
  });
};
// ------- Create Color Elements End-------
