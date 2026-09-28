import { PointTracker, radianToDegree } from '@ixfx/geometry.js';
import { clamp, movingAverage } from '@ixfx/numbers.js';
import * as Random from '@ixfx/random.js';

const settings = Object.freeze({
  el: /** @type HTMLElement */(document.querySelector(`#random`)),
  updateInterval: 10,
  maxSpeed: 50,
  speedAverager: movingAverage(60),
  tracker: new PointTracker({sampleLimit: 10})
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
 const {tracker} = settings
 const angle = tracker.angleFromStart();
 if (angle) { 
  const degrees = radianToDegree(angle);
  console.log(`Angle: ${degrees.toFixed(2)}`);
 }
 
 const speed = tracker.speedFromStart()*1000;
}

/**
 * @param {PointerEvent} event
 */

function onPointerMove(event) {
  const { tracker } = settings;
  const x = Math.abs(event.x)/window.innerWidth;
  const y = Math.abs(event.y)/window.innerHeight;  
  //console.log(`${x.toFixed(2)}, ${y.toFixed(2)}`);
  tracker.seen({x,y});
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
