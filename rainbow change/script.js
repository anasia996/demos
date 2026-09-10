// @ts-nocheck
import * as Random from '@ixfx/random.js';
const square = document.getElementById("square");
square.style.transition = "background-color 1.5s ease-out"; // delayed degree shift time

let hue = 0;
let direction = 1;

// --- Envelope definition ---
const envelope = {
  attackMs: 1000,        // delay 
  degreesPerSecond: 20, // degree shift when triggered
  reserveDegrees: 20,   // delayed degree shift 
};

// Returns the degree shift for a given elapsed time, before release.
function envelopeHeldValue(elapsedMs) {
  if (elapsedMs <= envelope.attackMs) return 0;
  const elapsedSec = elapsedMs / 1000;
  const trueValue = elapsedSec * envelope.degreesPerSecond;
  return Math.max(0, trueValue - envelope.reserveDegrees);
}

// Returns the full degree shift once released (no reserve held back).
function envelopeReleaseValue(elapsedMs) {
  const elapsedSec = elapsedMs / 1000;
  return elapsedSec * envelope.degreesPerSecond;
}
// --- end envelope definition ---

let keydownTime = null;
let animationFrameId = null;
let baseHue = null;

// Just clamps the value now — no automatic direction flip here anymore.
function clampHue(h) {
  if (h >= 360) return 360;
  if (h <= 0) return 0;
  return h;
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

  square.style.backgroundColor = `hsl(${clampedHue}, 88%, 70%)`;
  animationFrameId = requestAnimationFrame(liveUpdate);
}

function handleKeyDown(event) {
  if(event.keyCode !== 32) return;
  if (keydownTime !== null) return; // ignore key-repeat
  keydownTime = Date.now();
  baseHue = hue;
  animationFrameId = requestAnimationFrame(liveUpdate);
}

function handleKeyUp() {
  if(event.keyCode !== 32) return;
  if (keydownTime === null) return;

  const elapsedMs = Date.now() - keydownTime;

  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  if (elapsedMs < envelope.attackMs) {
    // Quick tap, released before the shift even started — treat as a manual
    // direction switch instead of a color shift.
    direction *= -1;
  } else {
    const shiftDegrees = envelopeReleaseValue(elapsedMs);
    hue = applyShift(shiftDegrees);
  }

  square.style.backgroundColor = `hsl(${hue}, 88%, 70%)`;
  keydownTime = null;
}

function setup() {
  document.addEventListener("keydown", handleKeyDown);
  
  document.addEventListener("keyup", handleKeyUp);
}

setup();