// @ts-nocheck
import * as Random from '@ixfx/random.js';
const square = document.getElementById("square");
document.body.style.transition = "background-color 2s ease-out"; // delayed shift time

let lightness = 50; 
let direction = 1;

const envelope = {
 attackMs: 1000,        // delay
 degreesPerSecond: 5,  // shift speed when triggered
 reserveDegrees: 10,  // delayed shift amount
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


let animationFrameId = null;
let baseLightness = 50;

let keydownTime = null;
let tapCount = 0;
let tapTimer = null;

// --- add near your other state ---
const doubleTapThreshold = 300; // ms window to count as a "double tap"

let lastKeyDownTime = 0;

let growState = 'idle'; // 'idle' | 'growing' | 'frozen' | 'shrinking'
let lastActivePhase = 'growing'; // remembers which direction to resume into
let growFrameId = null;
let currentScale = 1;
let scaleAtPhaseStart = 1;
let phaseStartTime = null;
const growthRate = 0.3;      // scale units/sec while growing
const minScale = 0.1; 

function toggleGrow() {
  const now = Date.now();

  if (growState === 'idle') {
    growState = 'growing';
    lastActivePhase = 'growing';
    scaleAtPhaseStart = currentScale;
    phaseStartTime = now;
    if (growFrameId === null) {
      growFrameId = requestAnimationFrame(growUpdate);
    }
  } else if (growState === 'frozen') {
    growState = lastActivePhase === 'growing' ? 'shrinking' : 'growing';
    lastActivePhase = growState;
    scaleAtPhaseStart = currentScale;
    phaseStartTime = now;
  } else {
    // currently growing or shrinking -> freeze at current size
    growState = 'frozen';
  }
}

function growUpdate() {
  if (growState === 'idle') {
    growFrameId = null;
    return;
  }

  if (growState === 'growing') {
    const elapsedSec = (Date.now() - phaseStartTime) / 1000;
    currentScale = scaleAtPhaseStart + elapsedSec * growthRate;
  } else if (growState === 'shrinking') {
    const elapsedSec = (Date.now() - phaseStartTime) / 1000;
    currentScale = Math.max(minScale, scaleAtPhaseStart - elapsedSec * growthRate);
  }
  // 'frozen' just leaves currentScale as-is

  square.style.transform = `scale(${currentScale})`;

  growFrameId = requestAnimationFrame(growUpdate);
}

// Clamps progress to the pure-blue/pure-red range.
function clampLightness(p) {
 if (p >= 100) return 100;
 if (p <= 0) return 0;
 return p;
}


function applyShift(degrees) {
 const rawLightness = baseLightness + degrees * direction;
 return clampLightness(rawLightness);
}


function liveUpdate() {
 if (keydownTime === null) return;

 const elapsedMs = Date.now() - keydownTime;
 const shiftDegrees = envelopeHeldValue(elapsedMs);
 const clampedLightness = applyShift(shiftDegrees);


 document.body.style.backgroundColor = `hsl(0deg, 0%, ${clampedLightness}%)`;
 animationFrameId = requestAnimationFrame(liveUpdate);
}


function handleKeyDown(event) {
 if (event.keyCode !== 32) return;
 if (keydownTime !== null) return; 

 const now = Date.now();
 const isDoubleTap = now - lastKeyDownTime < doubleTapThreshold;
 lastKeyDownTime = now;

 if (isDoubleTap) {
   toggleGrow();
   keydownTime = now;
   return; // skip background/lightness logic on the tap that triggers the toggle
 }

 keydownTime = now;
 baseLightness = lightness;
 animationFrameId = requestAnimationFrame(liveUpdate);
}


function handleKeyUp(event) {
 if (event.keyCode !== 32) return;
 if (keydownTime === null) return;

  if (baseLightness === null) {
   keydownTime = null;
   return;
 }

 const elapsedMs = Date.now() - keydownTime;

 if (animationFrameId !== null) {
   cancelAnimationFrame(animationFrameId);
   animationFrameId = null;
 }

 if (elapsedMs < envelope.attackMs) {
   direction *= -1;
 } else {
   const shiftDegrees = envelopeReleaseValue(elapsedMs);
   lightness = applyShift(shiftDegrees);
 }


 document.body.style.backgroundColor = `hsl(0, 0%, ${lightness}%)`;
 keydownTime = null;
}


function setup() {
 document.addEventListener("keydown", handleKeyDown);
 document.addEventListener("keyup", handleKeyUp);
}


setup();
