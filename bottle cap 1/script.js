import { Points } from '@ixfx/geometry.js';
import * as Things from './thing.js';
import * as Util from './util.js';

const settings = Object.freeze({
  updateRateMs: 1
});

/** 
 * @typedef {{
 *  thing:Things.Thing
 * }} State
 */

/** @type {State} */
let state = Object.freeze({
  // Create our thing
  thing: Things.create()
});


const use = () => {
  Things.use(state.thing);
};

const update = () => {
  let { thing } = state;

  // Update thing, this creates a new copy
  thing = Things.update(thing, state);

  // TODO: other state changes? eg to the 'world' state?

  // Save the new copy
  saveState({ thing });

  // Loop!
  setTimeout(update, 10);
};


/**
 * Pointer is pressed
 * @param {PointerEvent} event 
 */
function onPointerDown(event) {
  const { thing } = state;
  const target = event.target;

  // Pointerdown happened on something other than a Thing, not interested
  if (thing.el !== target) return;

  // Relative point at which drag was started
  // ie. go from pixel x, y to scalar 0..1, 0..1
  const startedAt = Util.relativePoint(event.x, event.y);

  // Keep track of its dragged state and where it started
  const changedThing = Things.onDragStart(thing, startedAt);
  saveState({ thing: changedThing });
}

/**
 * Pointer is up or has left the window. Stop the drag
 * @param {PointerEvent} event 
 */
function onPointerUp(event) {
  // Update our state
  saveState({ thing: Things.onDragDone(state.thing) });
}

/**
 * Pointer has moved.
 * This will fire if we're dragging or not
 * @param {PointerEvent} event 
 */
function onPointerMove(event) {
  const { thing } = state;

  // Haven't started dragging, don't care
  if (Points.isPlaceholder(thing.cursorDragStart)) return;

  // Get pointer position in relative terms
  const pointerPosition = Util.relativePoint(event.x, event.y);

  const movedThing = Things.saveThingState(thing, { cursorDragNow: pointerPosition });
  saveState({ thing: movedThing });
}

function setup() {
  document.addEventListener(`pointerdown`, onPointerDown);
  document.addEventListener(`pointermove`, onPointerMove);
  document.addEventListener(`pointerup`, onPointerUp);

  setInterval(() => {
    update();
    use();
  }, settings.updateRateMs);
}

setup();


/**
 * Save state
 * @param {Partial<State>} s 
 */
function saveState(s) {
  state = Object.freeze({
    ...state,
    ...s
  });
  return state;
}