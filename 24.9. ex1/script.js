import { clamp, movingAverage } from '@ixfx/numbers.js';
import * as Random from '@ixfx/random.js';

const settings = Object.freeze({
  el: /** @type HTMLElement */(document.querySelector(`#random`)),
  updateInterval: 20,
  speedAverager: movingAverage(100),
  maxSpeed: 200
});

/**
 * Define the type for 'State'
 * @typedef {Readonly<{
 * speed: number
 * }>} State
 */

/** @type State */
let state = Object.freeze({
  speed: 0
});

// Use state
function use() {
  const { el } = settings;
  let { speed } = state;
  el.innerText = speed.toFixed(2);
  const hsl = `hsl(280deg, ${speed * 100}%, 50%)`;
  document.body.style.backgroundColor = hsl;
}
//dont put background color in update - too fast
// Compute state 
function update() {
 const { speedAverager } = settings;
 let {speed} = state;

 const smoothSpeed = speedAverager(speed);
 console.log(`smoothed: ${smoothSpeed}`);
 saveState({ speed: smoothSpeed });

}

/**
 * @param {PointerEvent} event
 */

function onPointerMove(event) {
  const x = Math.abs(event.movementX);
  const y = Math.abs(event.movementY);  
  const total = x + y;
  const relative = clamp(total/settings.maxSpeed);
  //console.log(  `${relative.toFixed(2)}`);

  saveState({ speed: relative });

}

function setup() {
  document.addEventListener('pointermove', onPointerMove);
  // Call update() and use() every half a second
  setInterval(() => {
    update();
    use();
  }, settings.updateInterval);
}

/**
 * Saves the state
 * @param {Partial<State>} changes 
 * @returns Changed state
 */
function saveState(changes) {
  state = Object.freeze({
    ...state,
    ...changes
  });
  return state;
}
setup();
