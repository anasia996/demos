import * as Random from '@ixfx/random.js';

const square = document.getElementById("square");

let hue = 270;
let direction = 1; 

function changeColor() {
  hue += 20 * direction;
  if (hue >= 360) {
    hue = 360;
    direction = -1;
  } else if (hue <= 180) {
    hue = 180;
    direction = 1;
  }
  square.style.backgroundColor = `hsl(${hue}, 90%, 90%)`;
}

function setup() {
  document.addEventListener("keyup", changeColor);
}

setup();