import { Points } from '@ixfx/geometry.js';
import { clamp } from '@ixfx/numbers.js';
import * as Util from './util.js';

const settings = Object.freeze({
  agitationDecay: 0.99,
  resistanceGrowth: 4,
  minMovementFactor: 0.02,
  decayRate: 0.5,
  jitterStrength: 0.3,   // how many px of jitter per unit of leftMoveAccum
  jitterMax: 15,
  jitterRelief: 1.5 
});

/**
 * Define our thing
 * @typedef {Readonly<{
 *  position: Points.Point
 *  positionAtDragStart: Points.Point
 *  cursorDragStart: Points.Point
 *  cursorDragNow: Points.Point
 *  lastCursorPos: Points.Point
 *  dragDifference: Points.Point
 *  leftMoveAccum: number
 *  leftDragCount: number
 *  el: HTMLElement
 *  colorHue: number
 * }>} Thing
 */

/**
 * Make use of data from `thing` somehow...
 * @param {Thing} thing 
 */
export const use = (thing) => {
  const { el, position, cursorDragStart, colorHue, leftDragCount } = thing;

  if (Points.isPlaceholder(cursorDragStart)) {
    el.classList.remove(`dragging`);
  } else {
    el.classList.add(`dragging`);
  }
  // Calculate top-left pos from relative center position
  Util.positionFromMiddle(el, position);

  // Only jitter while a drag is actively happening
  const isDragging = !Points.isPlaceholder(cursorDragStart);
  const jitterAmount = isDragging
    ? clamp(leftDragCount * settings.jitterStrength, 0, settings.jitterMax)
    : 0;

  if (jitterAmount > 0) {
    const jitterX = (Math.random() * 2 - 1) * jitterAmount;
    const jitterY = (Math.random() * 2 - 1) * jitterAmount;
    el.style.transform += ` translate(${jitterX}px, ${jitterY}px)`;
  }

  el.style.backgroundColor = `hsl(${colorHue}, 40%, 50%)`;
};

/**
 * Helper function for when drag is done.
 * @param {Thing} originalThing 
 * @returns {Thing}
 */
export const onDragDone = (originalThing) => {
  const dx = originalThing.dragDifference.x;
  let count = originalThing.leftDragCount;

  if (dx < 0) {
    count += 1;                                         // left drag: more jitter
  } else if (dx > 0) {
    count = Math.max(0, count - settings.jitterRelief); // right drag: less jitter
  }
  return Object.freeze({
    ...originalThing,
    positionAtDragStart: Points.Placeholder,
    cursorDragNow: Points.Placeholder,
    cursorDragStart: Points.Placeholder,
    lastCursorPos: Points.Placeholder,
    leftDragCount: count
  });
};

/**
 * Helper function for when drag has started done.
 * @param {Thing} originalThing 
 * @param {Points.Point} cursorRelativePosition
 * @returns {Thing}
 */
export const onDragStart = (originalThing, cursorRelativePosition) => {
  return Object.freeze({
    ...originalThing,
    positionAtDragStart: originalThing.position,
    cursorDragStart: cursorRelativePosition,
    cursorDragNow: cursorRelativePosition,
    lastCursorPos: cursorRelativePosition
  });
};

/**
 * Updates a given thing based on state
 * @param {Thing} thing
 * @param {import('./script.js').State} ambientState
 * @returns {Thing}
 */
export const update = (thing, ambientState) => {
  const { cursorDragNow, cursorDragStart, lastCursorPos } = thing;
  let { position, leftMoveAccum: leftMoveAccum } = thing;

  let dragDifference = { x: 0, y: 0 };
  let newLastCursorPos = lastCursorPos;

  if (!Points.isPlaceholder(cursorDragStart) && !Points.isPlaceholder(cursorDragNow)) {

    // How far the cursor moved since the LAST FRAME (not since drag start)
    if (!Points.isPlaceholder(lastCursorPos)) {
      const frameDelta = Points.subtract(cursorDragNow, lastCursorPos);
      if (frameDelta.x < 0) {
        // Leftward movement builds up resistance
        leftMoveAccum -= frameDelta.x;
      } else if (frameDelta.x > 0) {
        // Rightward movement lets resistance decay back down
        leftMoveAccum = Math.max(0, leftMoveAccum - frameDelta.x * settings.decayRate);
      }
    }
    newLastCursorPos = cursorDragNow;

    // Total difference between where drag was started and where pointer is now
    dragDifference = Points.subtract(cursorDragNow, cursorDragStart);

    // The more rightward movement has accumulated (ever), the weaker the drag becomes
    const resistance = clamp(
      1 / (1 + leftMoveAccum * settings.resistanceGrowth),
      settings.minMovementFactor,
      1
    );

    const dampedDifference = {
      x: dragDifference.x * resistance,
      y: 0
    };

    position = Points.sum(thing.positionAtDragStart, dampedDifference);
  }

  // Return new Thing
  return Object.freeze({
    ...thing,
    dragDifference,
    position,
    leftMoveAccum,
    lastCursorPos: newLastCursorPos
  });
};

/**
 * Creates a new thing
 * @returns {Thing}
 */
export const create = () => {
  const element = document.createElement(`div`);
  element.classList.add(`thing`);
  document.body.append(element);

  const size = 50;
  element.style.width = `${size}px`;
  element.style.height = `${size}px`;

  const position = { x: 0.7, y: 0.5 };
  return {
    colorHue: Math.random() * 360,
    cursorDragNow: Points.Placeholder,
    cursorDragStart: Points.Placeholder,
    lastCursorPos: Points.Placeholder,
    dragDifference: Points.Placeholder,
    leftMoveAccum: 0,
    leftDragCount: 0,
    position: position,
    positionAtDragStart: position,
    el: element
  };
};

/**
 * Merge `changes` with `originalThing`. Works like `saveState`.
 * @param {Thing} originalThing 
 * @param {Partial<Thing>} changes 
 * @returns Thing
 */
export const saveThingState = (originalThing, changes) => {
  return Object.freeze({
    ...originalThing,
    ...changes
  });
};