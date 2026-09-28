// @ts-nocheck
import * as Random from '@ixfx/random.js';
const square = document.getElementById("square");
square.style.transition = "background-color 10s ease-out"; // delayed shift time


let progress = 255; // 0 = pure blue, 255 = pure red
let direction = -1;


const envelope = {
 attackMs: 1000,        // delay
 degreesPerSecond: 30,  // shift speed when triggered
 reserveDegrees: 20,    // delayed shift amount
};


// Returns the shift amount for a given elapsed time, before release.
function envelopeHeldValue(elapsedMs) {
 if (elapsedMs <= envelope.attackMs) return 0;
 const elapsedSec = elapsedMs / 1000;
 const trueValue = elapsedSec * envelope.degreesPerSecond;
 return Math.max(0, trueValue - envelope.reserveDegrees);
}


// Returns the full shift amount once released (no reserve held back).
function envelopeReleaseValue(elapsedMs) {
 const elapsedSec = elapsedMs / 1000;
 return elapsedSec * envelope.degreesPerSecond;
}
// --- end envelope definition ---


let keydownTime = null;
let animationFrameId = null;
let baseProgress = null;


// Clamps progress to the pure-blue/pure-red range.
function clampProgress(p) {
 if (p >= 255) return 255;
 if (p <= 0) return 0;
 return p;
}


function applyShift(units) {
 const rawProgress = baseProgress + units * direction;
 return clampProgress(rawProgress);
}


// Interpolates directly between pure blue (0,0,255) and pure red (255,0,0) —
// only red and blue channels move, so it never passes through pink/purple.
function progressToRgb(p) {
 const red = Math.round(p);
 const blue = Math.round(255 - p);
 return `rgb(${red}, 0, ${blue})`;
}


// Paint the square immediately on load.
square.style.backgroundColor = progressToRgb(progress);


function liveUpdate() {
 if (keydownTime === null) return;


 const elapsedMs = Date.now() - keydownTime;
 const shiftUnits = envelopeHeldValue(elapsedMs);
 const clampedProgress = applyShift(shiftUnits);


 square.style.backgroundColor = progressToRgb(clampedProgress);
 animationFrameId = requestAnimationFrame(liveUpdate);
}


function handleKeyDown(event) {
 if (event.keyCode !== 32) return;
 if (keydownTime !== null) return; // ignore key-repeat
 keydownTime = Date.now();
 baseProgress = progress;
 animationFrameId = requestAnimationFrame(liveUpdate);
}


function handleKeyUp(event) {
 if (event.keyCode !== 32) return;
 if (keydownTime === null) return;


 const elapsedMs = Date.now() - keydownTime;


 if (animationFrameId !== null) {
   cancelAnimationFrame(animationFrameId);
   animationFrameId = null;
 }


 if (elapsedMs < envelope.attackMs) {
   direction *= -1;
 } else {
   const shiftUnits = envelopeReleaseValue(elapsedMs);
   progress = applyShift(shiftUnits);
 }


 square.style.backgroundColor = progressToRgb(progress);
 keydownTime = null;
}


function setup() {
 document.addEventListener("keydown", handleKeyDown);
 document.addEventListener("keyup", handleKeyUp);
}


setup();
