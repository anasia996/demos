import {clamp} from '@ixfx/numbers.js';
import { Easings, jitter } from '@ixfx/modulation.js';
import * as Random from '@ixfx/random.js';


const settings = {
  thing: /** @type HTMLElement */(document.querySelector(`#thing`)),
  el: /** @type HTMLElement */(document.querySelector(`#random`)),
  updateInterval: 50
};

/**
 * Define the type for 'State'
 * @typedef {Readonly<{
 * currentValue: number
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  currentValue: 0
});

// Use state
function use() {
  const { el, thing } = settings;
  let { currentValue } = state;
  // el.innerText = randomValue.toFixed(2);
  const easedValue = Easings.Named.bell( currentValue); //can move this to the settings
  el.innerText = `current: ${currentValue.toFixed(2)} eased: ${easedValue.toFixed(2)}`
  const j = jitter( {absolute: 0.005}); //can move this to the settings
  const jitteredValue = j(easedValue);

  const w = window.innerWidth;
  const x = jitteredValue*w;

  thing.style.translate = `${x}px 0px`;
}

// Compute state
function update() {
  // Compute
  let {currentValue} = state;
  currentValue += 0.01;
  currentValue = clamp(currentValue);
  const randomValue = Random.float();

  // At the end, save state
  saveState({
    currentValue
  });
}

function setup() {
  // Call update() and use() every half a second
  setInterval(() => {
    update();
    use();
  }, settings.updateInterval);
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
