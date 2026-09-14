// @ts-nocheck
import * as Random from '@ixfx/random.js';
const square = document.getElementById("square");
document.body.style.transition = "background-color 1.5s ease-out"; // delayed shift time

let hue = 230; 
let direction = 1;

const envelope = {
 attackMs: 1000,        // delay
 degreesPerSecond: 30,  // shift speed when triggered
 reserveDegrees: 10,    // delayed shift amount
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
let baseHue = null;


// Clamps progress to the pure-blue/pure-red range.
function clampHue(p) {
 if (p >= 350) return 350;
 if (p <= 230) return 230;
 return p;
}


function applyShift(degrees) {
 const rawHue = baseHue + degrees * direction;
 return clampHue(rawHue);
}


function liveUpdate() {
 if (keydownTime === null) return;

 const elapsedMs = Date.now() - keydownTime;
 const shiftDegrees = envelopeHeldValue(elapsedMs);
 const clampedHue = applyShift(shiftDegrees);


 document.body.style.backgroundColor = `hsl(${clampedHue}, 92%, 93%)`;
 animationFrameId = requestAnimationFrame(liveUpdate);
}


function handleKeyDown(event) {
 if (event.keyCode !== 32) return;
 if (keydownTime !== null) return; 
 keydownTime = Date.now();
 baseHue = hue;
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
   const shiftDegrees = envelopeReleaseValue(elapsedMs);
   hue = applyShift(shiftDegrees);
 }


 document.body.style.backgroundColor = `hsl(${hue}, 92%, 93%)`;
 keydownTime = null;
}


function setup() {
 document.addEventListener("keydown", handleKeyDown);
 document.addEventListener("keyup", handleKeyUp);
}


setup();
