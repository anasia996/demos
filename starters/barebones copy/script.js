import { interpolate } from '@ixfx/numbers.js';
import * as Random from '@ixfx/random.js';

const settings = {
  el: /** @type HTMLElement */(document.querySelector(`#random`)),
  circle: /** @type HTMLElement */(document.querySelector(`#circle`)),
  updateInterval: 5,
  targetInterval: 1000
};

/**
 * Define the type for 'State'
 * @typedef {Readonly<{
 * randomValue: number
 * currentValue: number
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  randomValue: 0,
  currentValue: 0
});

// Use state
function use() {
  const { circle } = settings;
  let { currentValue } = state;
  // el.innerText = currentValue.toFixed(2);
  // const hsl = `hsl(340deg, ${currentValue*100}%, 80%)`;
  // document.body.style.backgroundColor = hsl;

  //let x = (currentValue*200) + 50;
  //let x = scale( currentValue, 0, 1, 200, 300);
  let halfWidth = window.innerWidth/2;
  let x = halfWidth - (currentValue*halfWidth);
  circle.style.translate = `${x}px 100px`;

}

// Compute state
function updateTarget() {
  // Compute
  const randomValue = Random.float();

  // At the end, save state
  saveState({
    randomValue
  });
}

function update(){
  let {randomValue, currentValue} = state;
  currentValue = interpolate (0.01, currentValue, randomValue);
  console.log(currentValue);
  saveState({currentValue});
}

function setup() {
  // Call update() and use() every half a second
  setInterval(() => {
    update();
    use();
  }, settings.updateInterval);

  setInterval(() => {
    updateTarget();
  }, settings.targetInterval);
}

/**
 * Saves the state
 * @param {Partial<State>} s 
 * @returns 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
  return state;
}
setup();
