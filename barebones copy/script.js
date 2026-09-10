// @ts-nocheck
import * as Random from '@ixfx/random.js';
const square = document.getElementById("square");
square.style.transition = "background-color 1.0s ease-out"; // release phase animates smoothly

let hue = 135;
let direction = 1;

// --- Envelope definition ---
const envelope = {
  attackMs: 1000,        // delay before any shift is audible/visible
  degreesPerSecond: 15, // rate of rise once past attack
  reserveDegrees: 10,   // how far behind "held" value trails the true value
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
let baseDirection = null;

function clampHue(h, dir) {
  if (h >= 360) return { hue: 360, direction: -1 };
  if (h <= 135) return { hue: 135, direction: 1 };
  return { hue: h, direction: dir };
}

function applyShift(degrees) {
  const rawHue = baseHue + degrees * baseDirection;
  return clampHue(rawHue, baseDirection);
}

function liveUpdate() {
  if (keydownTime === null) return;

  const elapsedMs = Date.now() - keydownTime;
  const shiftDegrees = envelopeHeldValue(elapsedMs);
  const clamped = applyShift(shiftDegrees);

  square.style.backgroundColor = `hsl(${clamped.hue}, 88%, 70%)`;
  animationFrameId = requestAnimationFrame(liveUpdate);
}

function handleKeyDown() {
  if (keydownTime !== null) return; // ignore key-repeat
  keydownTime = Date.now();
  baseHue = hue;
  baseDirection = direction;
  animationFrameId = requestAnimationFrame(liveUpdate);
}

function handleKeyUp() {
  if (keydownTime === null) return;

  const elapsedMs = Date.now() - keydownTime;

  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  const shiftDegrees = envelopeReleaseValue(elapsedMs);
  const clamped = applyShift(shiftDegrees);

  hue = clamped.hue;
  direction = clamped.direction;
  square.style.backgroundColor = `hsl(${hue}, 88%, 70%)`;

  keydownTime = null;
}

function setup() {
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
}

setup();