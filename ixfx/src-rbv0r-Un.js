import { n as __exportAll } from "./chunk-CaR5F9JI.js";
import { H as continuously, Wt as cloneFromFields } from "./src-D552aW4b.js";
import { C as numberInclusiveRangeTest, N as resultThrow, T as percentTest, k as resultErrorToString, m as arrayTest, w as numberTest } from "./src-DZFdrMH_.js";
import { v as pairwise } from "./src-B6pmAinX.js";
import { f as MapOfSimpleMutable, i as StackImmutable, u as QueueImmutable } from "./src-CkNW04JY.js";
import { n as SimpleEventEmitter } from "./src-CRR1VQls.js";
import { A as round$1, P as interpolate, V as clamp$2, b as quantiseEvery, g as scaler, p as scaleClamped, rt as clamp$1, y as scalerTwoWay } from "./src-C1pyiFt0.js";
import { C as ElementSizer, G as resolveElementTry, W as resolveEl } from "./src-CvrfRWyP.js";
import { At as subtractSize, B as toCartesian, D as isQuadraticBezier, E as isCubicBezier, Ft as EmptyPositioned, H as angleConvert, I as fromNumbers, It as PlaceholderPositioned, Kt as applyFields, Mt as isLine, Nt as isEqual, Pt as Empty, U as angleParse, Ut as corners$1, Wt as center, Xt as guard$5, Yt as isRectPositioned, _ as cells, g as rows, h as offset, i as corners, j as PointsTracker, jt as multiplyScalar, m as indexFromCell, o as scaler$1, qt as guard$6, z as fromLine, zt as subtract } from "./src-D8pW0Dyk.js";
import { G as delayLoop } from "./src-cfydFvc4.js";

//#region ../node_modules/.pnpm/colorizr@4.0.1/node_modules/colorizr/dist/index.mjs
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
	enumerable: true,
	configurable: true,
	writable: true,
	value
}) : obj[key] = value;
var __export = (target, all) => {
	for (var name2 in all) __defProp(target, name2, {
		get: all[name2],
		enumerable: true
	});
};
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var COLOR_KEYS = {
	hsl: [
		"h",
		"s",
		"l"
	],
	oklab: [
		"l",
		"a",
		"b"
	],
	oklch: [
		"l",
		"c",
		"h"
	],
	rgb: [
		"r",
		"g",
		"b"
	]
};
var COLOR_MODELS = [
	"hsl",
	"oklab",
	"oklch",
	"rgb"
];
var DEG2RAD = Math.PI / 180;
var LAB_TO_LMS = {
	l: [.3963377773761749, .2158037573099136],
	m: [-.1055613458156586, -.0638541728258133],
	s: [-.0894841775298119, -1.2914855480194092]
};
var LRGB_TO_LMS = {
	l: [
		.4122214708,
		.5363325363,
		.0514459929
	],
	m: [
		.2119034982,
		.6806995451,
		.1073969566
	],
	s: [
		.0883024619,
		.2817188376,
		.6299787005
	]
};
var LSM_TO_LAB = {
	l: [
		.2104542553,
		.793617785,
		.0040720468
	],
	a: [
		1.9779984951,
		2.428592205,
		.4505937099
	],
	b: [
		.0259040371,
		.7827717662,
		.808675766
	]
};
var LSM_TO_RGB = {
	r: [
		4.076741636075958,
		-3.307711539258063,
		.2309699031821043
	],
	g: [
		-1.2684379732850315,
		2.609757349287688,
		-.341319376002657
	],
	b: [
		-.0041960761386756,
		-.7034186179359362,
		1.7076146940746117
	]
};
var PRECISION = 5;
var RAD2DEG = 180 / Math.PI;
var MESSAGES = {
	alpha: "alpha must be a number between 0 and 1",
	alphaAdjustment: "alpha must be a number between -1 and 1",
	amount: "amount must be a number between 0 and 100",
	colorRequired: "color is required",
	degreesRange: "degrees must be a number between -360 and 360",
	hueArgs: "point, chroma and h are required",
	hueRange: "hue must be a number between 0 and 360",
	input: "input is required",
	inputHex: "input is required and must be a hex",
	inputNumber: "input is required and must be a number",
	inputString: "input is required and must be a string",
	invalid: "invalid input",
	invalidColor: "invalid color",
	invalidCSS: "invalid CSS string",
	invalidHex: "invalid hex",
	invalidKey: "invalid key",
	invalidModel: "invalid model",
	invalidRange: "color value out of range",
	left: "left is required and must be a string",
	lightnessRange: "lightness must be a number between 0 and 1",
	options: "invalid options",
	paletteSize: "palette size must be at least 2",
	ratioRange: "ratio must be a number between 0 and 1",
	right: "right is required and must be a string",
	threshold: "threshold must be a number between 0 and 255",
	thresholdNormalized: "threshold must be a number between 0 and 1"
};
function invariant(condition, message) {
	if (condition) return;
	if (message === void 0) throw new Error("invariant requires an error message argument");
	const error = !message ? /* @__PURE__ */ new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.") : new Error(message);
	error.name = "colorizr";
	throw error;
}
var cssColors = {
	aliceblue: "#f0f8ff",
	antiquewhite: "#faebd7",
	aqua: "#00ffff",
	aquamarine: "#7fffd4",
	azure: "#f0ffff",
	beige: "#f5f5dc",
	bisque: "#ffe4c4",
	black: "#000000",
	blanchedalmond: "#ffebcd",
	blue: "#0000ff",
	blueviolet: "#8a2be2",
	brown: "#a52a2a",
	burlywood: "#deb887",
	cadetblue: "#5f9ea0",
	chartreuse: "#7fff00",
	chocolate: "#d2691e",
	coral: "#ff7f50",
	cornflowerblue: "#6495ed",
	cornsilk: "#fff8dc",
	crimson: "#dc143c",
	cyan: "#00ffff",
	darkblue: "#00008b",
	darkcyan: "#008b8b",
	darkgoldenrod: "#b8860b",
	darkgray: "#a9a9a9",
	darkgreen: "#006400",
	darkkhaki: "#bdb76b",
	darkmagenta: "#8b008b",
	darkolivegreen: "#556b2f",
	darkorange: "#ff8c00",
	darkorchid: "#9932cc",
	darkred: "#8b0000",
	darksalmon: "#e9967a",
	darkseagreen: "#8fbc8f",
	darkslateblue: "#483d8b",
	darkslategray: "#2f4f4f",
	darkslategrey: "#2f4f4f",
	darkturquoise: "#00ced1",
	darkviolet: "#9400d3",
	deeppink: "#ff1493",
	deepskyblue: "#00bfff",
	dimgray: "#696969",
	dimgrey: "#696969",
	dodgerblue: "#1e90ff",
	firebrick: "#b22222",
	floralwhite: "#fffaf0",
	forestgreen: "#228b22",
	fuchsia: "#ff00ff",
	gainsboro: "#dcdcdc",
	ghostwhite: "#f8f8ff",
	gold: "#ffd700",
	goldenrod: "#daa520",
	gray: "#808080",
	grey: "#808080",
	green: "#008000",
	greenyellow: "#adff2f",
	honeydew: "#f0fff0",
	hotpink: "#ff69b4",
	indianred: "#cd5c5c",
	indigo: "#4b0082",
	ivory: "#fffff0",
	khaki: "#f0e68c",
	lavender: "#e6e6fa",
	lavenderblush: "#fff0f5",
	lawngreen: "#7cfc00",
	lemonchiffon: "#fffacd",
	lightblue: "#add8e6",
	lightcoral: "#f08080",
	lightcyan: "#e0ffff",
	lightgoldenrodyellow: "#fafad2",
	lightgray: "#d3d3d3",
	lightgreen: "#90ee90",
	lightgrey: "#d3d3d3",
	lightpink: "#ffb6c1",
	lightsalmon: "#ffa07a",
	lightseagreen: "#20b2aa",
	lightskyblue: "#87cefa",
	lightslategray: "#778899",
	lightslategrey: "#778899",
	lightsteelblue: "#b0c4de",
	lightyellow: "#ffffe0",
	lime: "#00ff00",
	limegreen: "#32cd32",
	linen: "#faf0e6",
	magenta: "#ff00ff",
	maroon: "#800000",
	mediumaquamarine: "#66cdaa",
	mediumblue: "#0000cd",
	mediumorchid: "#ba55d3",
	mediumpurple: "#9370db",
	mediumseagreen: "#3cb371",
	mediumslateblue: "#7b68ee",
	mediumspringgreen: "#00fa9a",
	mediumturquoise: "#48d1cc",
	mediumvioletred: "#c71585",
	midnightblue: "#191970",
	mintcream: "#f5fffa",
	mistyrose: "#ffe4e1",
	moccasin: "#ffe4b5",
	navajowhite: "#ffdead",
	navy: "#000080",
	oldlace: "#fdf5e6",
	olive: "#808000",
	olivedrab: "#6b8e23",
	orange: "#ffa500",
	orangered: "#ff4500",
	orchid: "#da70d6",
	palegoldenrod: "#eee8aa",
	palegreen: "#98fb98",
	paleturquoise: "#afeeee",
	palevioletred: "#db7093",
	papayawhip: "#ffefd5",
	peachpuff: "#ffdab9",
	peru: "#cd853f",
	pink: "#ffc0cb",
	plum: "#dda0dd",
	powderblue: "#b0e0e6",
	purple: "#800080",
	rebeccapurple: "#663399",
	red: "#ff0000",
	rosybrown: "#bc8f8f",
	royalblue: "#4169e1",
	saddlebrown: "#8b4513",
	salmon: "#fa8072",
	sandybrown: "#f4a460",
	seagreen: "#2e8b57",
	seashell: "#fff5ee",
	sienna: "#a0522d",
	silver: "#c0c0c0",
	skyblue: "#87ceeb",
	slateblue: "#6a5acd",
	slategray: "#708090",
	slategrey: "#708090",
	snow: "#fffafa",
	springgreen: "#00ff7f",
	steelblue: "#4682b4",
	tan: "#d2b48c",
	teal: "#008080",
	thistle: "#d8bfd8",
	tomato: "#ff6347",
	turquoise: "#40e0d0",
	violet: "#ee82ee",
	wheat: "#f5deb3",
	white: "#ffffff",
	whitesmoke: "#f5f5f5",
	yellow: "#ffff00",
	yellowgreen: "#9acd32"
};
var hexRegex = /^#(?:[\da-f]{3,4}|[\da-f]{6,8})$/i;
function hasValidMatches(input) {
	return Array.isArray(input) && input.length === 6;
}
function isHex(input) {
	if (!isString(input)) return false;
	return hexRegex.test(input);
}
function isHSL(input) {
	if (!isPlainObject(input)) return false;
	const entries = Object.entries(input);
	return !!entries.length && entries.every(([key, value]) => {
		if (key === "h") return value >= 0 && value <= 360;
		if (key === "alpha") return value >= 0 && value <= 1;
		return COLOR_KEYS.hsl.includes(key) && value >= 0 && value <= 100;
	});
}
function isLAB(input) {
	if (!isPlainObject(input)) return false;
	const entries = Object.entries(input);
	return !!entries.length && entries.every(([key, value]) => {
		if (key === "l") return value >= 0 && value <= 100;
		if (key === "alpha") return value >= 0 && value <= 1;
		return COLOR_KEYS.oklab.includes(key) && value >= -1 && value <= 1;
	});
}
function isLCH(input) {
	if (!isPlainObject(input)) return false;
	const entries = Object.entries(input);
	return !!entries.length && entries.every(([key, value]) => {
		if (key === "l") return value >= 0 && value <= 100;
		if (key === "alpha") return value >= 0 && value <= 1;
		return COLOR_KEYS.oklch.includes(key) && value >= 0 && value <= (key === "h" ? 360 : 1);
	});
}
function isNamedColor(input) {
	return isString(input) && Object.keys(cssColors).includes(input.toLowerCase());
}
function isNumber(input) {
	return typeof input === "number" && !Number.isNaN(input);
}
function isNumberInRange(input, min, max) {
	return isNumber(input) && input >= min && input <= max;
}
function isPlainObject(input) {
	if (!input) return false;
	const { toString } = Object.prototype;
	const prototype = Object.getPrototypeOf(input);
	return toString.call(input) === "[object Object]" && (prototype === null || prototype === Object.getPrototypeOf({}));
}
function isRGB(input) {
	if (!isPlainObject(input)) return false;
	const entries = Object.entries(input);
	return !!entries.length && entries.every(([key, value]) => {
		if (key === "alpha") return value >= 0 && value <= 1;
		return COLOR_KEYS.rgb.includes(key) && value >= 0 && value <= 255;
	});
}
function isString(input, validate = true) {
	const isValid = typeof input === "string";
	if (validate) return isValid && !!input.trim().length;
	return isValid;
}
function isValidColorModel(input) {
	return isHSL(input) || isRGB(input) || isLAB(input) || isLCH(input);
}
function formatHex(input) {
	invariant(isHex(input), MESSAGES.inputHex);
	let color = input.replace("#", "");
	if (color.length === 3 || color.length === 4) {
		const values = [...color];
		color = "";
		values.forEach((d) => {
			color += `${d}${d}`;
		});
	}
	const hex = `#${color}`;
	invariant(isHex(hex), MESSAGES.invalidHex);
	return hex;
}
function addAlpha(input, alpha) {
	invariant(isValidColorModel(input), MESSAGES.invalid);
	let value = alpha;
	if (value === void 0) return input;
	if (value > 1) value /= 100;
	if (value === 1) return input;
	return {
		...input,
		alpha: value
	};
}
function clamp(value, min = 0, max = 100) {
	return Math.min(Math.max(value, min), max);
}
function constrainDegrees(input, amount) {
	invariant(isNumber(input), MESSAGES.inputNumber);
	let value = input + amount;
	if (value > 360) value %= 360;
	if (value < 0) value += 360;
	return Math.abs(value);
}
function extractAlpha(input) {
	if (Array.isArray(input)) return;
	return input.alpha;
}
function limit(input, model, key) {
	invariant(isNumber(input), MESSAGES.inputNumber);
	invariant(COLOR_MODELS.includes(model), `${MESSAGES.invalidModel}${model ? `: ${model}` : ""}`);
	invariant(COLOR_KEYS[model].includes(key), `${MESSAGES.invalidKey}${key ? `: ${key}` : ""}`);
	switch (model) {
		case "hsl":
			invariant(COLOR_KEYS.hsl.includes(key), MESSAGES.invalidKey);
			if (["l", "s"].includes(key)) return clamp(input);
			return clamp(input, 0, 360);
		case "rgb":
			invariant(COLOR_KEYS.rgb.includes(key), MESSAGES.invalidKey);
			return clamp(input, 0, 255);
		default: throw new Error("Invalid inputs");
	}
}
function parseInput(input, model) {
	const keys = COLOR_KEYS[model];
	const validator = {
		hsl: isHSL,
		oklab: isLAB,
		oklch: isLCH,
		rgb: isRGB
	};
	invariant(isPlainObject(input) || Array.isArray(input), MESSAGES.invalid);
	const value = Array.isArray(input) ? {
		[keys[0]]: input[0],
		[keys[1]]: input[1],
		[keys[2]]: input[2]
	} : input;
	invariant(validator[model](value), `${MESSAGES.invalidColor}: ${model}`);
	return value;
}
function restrictValues(input, precision = PRECISION, forcePrecision = true) {
	const output = new Map(Object.entries(input));
	for (const [key, value] of output.entries()) output.set(key, round(value, precision, forcePrecision));
	return Object.fromEntries(output);
}
function round(input, precision = 2, forcePrecision = true) {
	if (!isNumber(input) || input === 0) return 0;
	if (forcePrecision) {
		const factor2 = 10 ** precision;
		return Math.round(input * factor2) / factor2;
	}
	const absInput = Math.abs(input);
	let digits = Math.abs(Math.ceil(Math.log(absInput) / Math.LN10));
	if (digits === 0) digits = 2;
	else if (digits > precision) digits = precision;
	let exponent = precision - (digits < 0 ? 0 : digits);
	if (exponent <= 1 && precision > 1) exponent = 2;
	else if (exponent > precision || exponent === 0) exponent = precision;
	const factor = 10 ** exponent;
	return Math.round(input * factor) / factor;
}
function addAlphaToHex(input, alpha) {
	invariant(isHex(input), MESSAGES.inputHex);
	invariant(isNumberInRange(alpha, 0, 1), MESSAGES.alpha);
	if (alpha >= 1) return removeAlphaFromHex(input);
	return `${removeAlphaFromHex(input)}${convertAlphaToHex(alpha)}`;
}
function convertAlphaToHex(input) {
	invariant(isNumber(input), MESSAGES.inputNumber);
	let alpha = input;
	if (input > 1) alpha /= 100;
	return Math.round(alpha * 255).toString(16).padStart(2, "0");
}
function extractAlphaFromHex(input) {
	invariant(isHex(input), MESSAGES.inputString);
	const alpha = input.substring(7, 9);
	if (!alpha) return 1;
	return round(parseInt(alpha, 16) / 255);
}
function removeAlphaFromHex(input) {
	invariant(isHex(input), MESSAGES.inputHex);
	if (input.length === 5) return input.substring(0, 4);
	return input.substring(0, 7);
}
function hex2rgb(input) {
	invariant(isHex(input), MESSAGES.inputHex);
	const hex = formatHex(input).slice(1);
	const alpha = extractAlphaFromHex(input);
	return addAlpha({
		r: parseInt(hex.charAt(0) + hex.charAt(1), 16),
		g: parseInt(hex.charAt(2) + hex.charAt(3), 16),
		b: parseInt(hex.charAt(4) + hex.charAt(5), 16)
	}, alpha);
}
var converters_exports = {};
__export(converters_exports, {
	hex2hsl: () => hex2hsl,
	hex2oklab: () => hex2oklab,
	hex2oklch: () => hex2oklch,
	hex2rgb: () => hex2rgb,
	hsl2hex: () => hsl2hex,
	hsl2oklab: () => hsl2oklab,
	hsl2oklch: () => hsl2oklch,
	hsl2rgb: () => hsl2rgb,
	oklab2hex: () => oklab2hex,
	oklab2hsl: () => oklab2hsl,
	oklab2oklch: () => oklab2oklch,
	oklab2rgb: () => oklab2rgb,
	oklch2hex: () => oklch2hex,
	oklch2hsl: () => oklch2hsl,
	oklch2oklab: () => oklch2oklab,
	oklch2rgb: () => oklch2rgb,
	rgb2hex: () => rgb2hex,
	rgb2hsl: () => rgb2hsl,
	rgb2oklab: () => rgb2oklab,
	rgb2oklch: () => rgb2oklch
});
function rgb2hsl(input) {
	const value = parseInput(input, "rgb");
	const alpha = extractAlpha(input);
	const rLimit = limit(value.r, "rgb", "r") / 255;
	const gLimit = limit(value.g, "rgb", "g") / 255;
	const bLimit = limit(value.b, "rgb", "b") / 255;
	const min = Math.min(rLimit, gLimit, bLimit);
	const max = Math.max(rLimit, gLimit, bLimit);
	const delta = max - min;
	let h = 0;
	let s;
	const l = (max + min) / 2;
	let rate;
	switch (max) {
		case rLimit:
			rate = !delta ? 0 : (gLimit - bLimit) / delta;
			h = 60 * rate;
			break;
		case gLimit:
			rate = (bLimit - rLimit) / delta;
			h = 60 * rate + 120;
			break;
		case bLimit:
			rate = (rLimit - gLimit) / delta;
			h = 60 * rate + 240;
			break;
		default: break;
	}
	if (h < 0) h = 360 + h;
	if (min === max) s = 0;
	else s = l < .5 ? delta / (2 * l) : delta / (2 - 2 * l);
	return addAlpha({
		h: Math.abs(+(h % 360).toFixed(2)),
		s: +(s * 100).toFixed(2),
		l: +(l * 100).toFixed(2)
	}, alpha);
}
function hex2hsl(input) {
	invariant(isHex(input), MESSAGES.inputHex);
	const alpha = extractAlphaFromHex(input);
	return addAlpha(rgb2hsl(hex2rgb(input)), alpha);
}
var { cbrt, sign } = Math;
function rgb2lrgb(input) {
	const abs2 = Math.abs(input);
	if (abs2 < .04045) return input / 12.92;
	return (sign(input) || 1) * ((abs2 + .055) / 1.055) ** 2.4;
}
function rgb2oklab(input, precision = PRECISION) {
	const value = parseInput(input, "rgb");
	const alpha = extractAlpha(input);
	const [lr, lg, lb] = [
		rgb2lrgb(value.r / 255),
		rgb2lrgb(value.g / 255),
		rgb2lrgb(value.b / 255)
	];
	const l = cbrt(LRGB_TO_LMS.l[0] * lr + LRGB_TO_LMS.l[1] * lg + LRGB_TO_LMS.l[2] * lb);
	const m = cbrt(LRGB_TO_LMS.m[0] * lr + LRGB_TO_LMS.m[1] * lg + LRGB_TO_LMS.m[2] * lb);
	const s = cbrt(LRGB_TO_LMS.s[0] * lr + LRGB_TO_LMS.s[1] * lg + LRGB_TO_LMS.s[2] * lb);
	return addAlpha(restrictValues({
		l: LSM_TO_LAB.l[0] * l + LSM_TO_LAB.l[1] * m - LSM_TO_LAB.l[2] * s,
		a: LSM_TO_LAB.a[0] * l - LSM_TO_LAB.a[1] * m + LSM_TO_LAB.a[2] * s,
		b: LSM_TO_LAB.b[0] * l + LSM_TO_LAB.b[1] * m - LSM_TO_LAB.b[2] * s
	}, precision), alpha);
}
function hex2oklab(input, precision) {
	invariant(isHex(input), MESSAGES.inputHex);
	const alpha = extractAlphaFromHex(input);
	return addAlpha(rgb2oklab(hex2rgb(input), precision), alpha);
}
var { atan2, sqrt } = Math;
function oklab2oklch(input, precision) {
	const { l, a, b } = restrictValues(parseInput(input, "oklab"));
	const alpha = extractAlpha(input);
	const c = sqrt(a ** 2 + b ** 2);
	let h = (atan2(b, a) * RAD2DEG + 360) % 360;
	if (round(c * 1e4) === 0) h = 0;
	return addAlpha(restrictValues({
		l,
		c,
		h
	}, precision), alpha);
}
function rgb2oklch(input, precision) {
	const value = parseInput(input, "rgb");
	const alpha = extractAlpha(input);
	return addAlpha(oklab2oklch(rgb2oklab(value, precision), precision), alpha);
}
function hex2oklch(input, precision) {
	invariant(isHex(input), MESSAGES.inputHex);
	const alpha = extractAlphaFromHex(input);
	return addAlpha(rgb2oklch(hex2rgb(input), precision), alpha);
}
function hue2rgb(point, chroma2, h) {
	invariant(isNumber(point) && isNumber(chroma2) && isNumber(h), MESSAGES.hueArgs);
	let hue = h;
	if (hue < 0) hue += 1;
	if (hue > 1) hue -= 1;
	if (hue < 1 / 6) return round(point + (chroma2 - point) * 6 * hue, 4);
	if (hue < 1 / 2) return round(chroma2, 4);
	if (hue < 2 / 3) return round(point + (chroma2 - point) * (2 / 3 - hue) * 6, 4);
	return round(point, 4);
}
function hsl2rgb(input) {
	const value = parseInput(input, "hsl");
	const alpha = extractAlpha(input);
	const h = round(value.h) / 360;
	const s = round(value.s) / 100;
	const l = round(value.l) / 100;
	let r;
	let g;
	let b;
	let point;
	let chroma2;
	if (s === 0) {
		r = l;
		g = l;
		b = l;
	} else {
		chroma2 = l < .5 ? l * (1 + s) : l + s - l * s;
		point = 2 * l - chroma2;
		r = hue2rgb(point, chroma2, h + 1 / 3);
		g = hue2rgb(point, chroma2, h);
		b = hue2rgb(point, chroma2, h - 1 / 3);
	}
	return addAlpha({
		r: Math.round(r * 255),
		g: Math.round(g * 255),
		b: Math.round(b * 255)
	}, alpha);
}
function rgb2hex(input) {
	const rgb = parseInput(input, "rgb");
	const alpha = extractAlpha(input);
	const hex = `#${[
		rgb.r,
		rgb.g,
		rgb.b
	].map((d) => `0${Math.floor(d).toString(16)}`.slice(-2)).join("")}`;
	return alpha !== void 0 && alpha < 1 ? addAlphaToHex(hex, alpha) : hex;
}
function hsl2hex(input) {
	const value = parseInput(input, "hsl");
	const alpha = extractAlpha(input);
	const hex = rgb2hex(hsl2rgb(value));
	return alpha !== void 0 && alpha < 1 ? addAlphaToHex(hex, alpha) : hex;
}
function hsl2oklab(input, precision) {
	const value = parseInput(input, "hsl");
	const alpha = extractAlpha(input);
	return addAlpha(rgb2oklab(hsl2rgb(value), precision), alpha);
}
function hsl2oklch(input, precision) {
	const value = parseInput(input, "hsl");
	const alpha = extractAlpha(input);
	return addAlpha(rgb2oklch(hsl2rgb(value), precision), alpha);
}
var { abs } = Math;
function lrgb2rgb(input) {
	const absoluteNumber = abs(input);
	const sign2 = input < 0 ? -1 : 1;
	if (absoluteNumber > .0031308) return sign2 * (absoluteNumber ** (1 / 2.4) * 1.055 - .055);
	return input * 12.92;
}
function oklab2rgb(input, precision = 0) {
	const { l: L, a: A, b: B } = parseInput(input, "oklab");
	const alpha = extractAlpha(input);
	const l = (L + LAB_TO_LMS.l[0] * A + LAB_TO_LMS.l[1] * B) ** 3;
	const m = (L + LAB_TO_LMS.m[0] * A + LAB_TO_LMS.m[1] * B) ** 3;
	const s = (L + LAB_TO_LMS.s[0] * A + LAB_TO_LMS.s[1] * B) ** 3;
	const r = 255 * lrgb2rgb(LSM_TO_RGB.r[0] * l + LSM_TO_RGB.r[1] * m + LSM_TO_RGB.r[2] * s);
	const g = 255 * lrgb2rgb(LSM_TO_RGB.g[0] * l + LSM_TO_RGB.g[1] * m + LSM_TO_RGB.g[2] * s);
	const b = 255 * lrgb2rgb(LSM_TO_RGB.b[0] * l + LSM_TO_RGB.b[1] * m + LSM_TO_RGB.b[2] * s);
	return addAlpha({
		r: clamp(round(r, precision), 0, 255),
		g: clamp(round(g, precision), 0, 255),
		b: clamp(round(b, precision), 0, 255)
	}, alpha);
}
function oklab2hex(input) {
	const value = parseInput(input, "oklab");
	const alpha = extractAlpha(input);
	const hex = rgb2hex(oklab2rgb(value));
	return alpha !== void 0 && alpha < 1 ? addAlphaToHex(hex, alpha) : hex;
}
function oklab2hsl(input) {
	const value = parseInput(input, "oklab");
	const alpha = extractAlpha(input);
	return addAlpha(rgb2hsl(oklab2rgb(value)), alpha);
}
var { sin, cos } = Math;
function oklch2oklab(input, precision) {
	let { l, c, h } = parseInput(input, "oklch");
	const alpha = extractAlpha(input);
	if (Number.isNaN(h) || h < 0) h = 0;
	return addAlpha(restrictValues({
		l,
		a: c * cos(h * DEG2RAD),
		b: c * sin(h * DEG2RAD)
	}, precision), alpha);
}
function oklch2rgb(input, precision = 0) {
	const value = parseInput(input, "oklch");
	const alpha = extractAlpha(input);
	return addAlpha(oklab2rgb(oklch2oklab(value), precision), alpha);
}
function oklch2hex(input) {
	const value = parseInput(input, "oklch");
	const alpha = extractAlpha(input);
	const hex = rgb2hex(oklch2rgb(value));
	return alpha !== void 0 && alpha < 1 ? addAlphaToHex(hex, alpha) : hex;
}
function oklch2hsl(input) {
	const value = parseInput(input, "oklch");
	const alpha = extractAlpha(input);
	return addAlpha(rgb2hsl(oklch2rgb(value)), alpha);
}
var MODEL = "(rgb|hsl|oklab|oklch)a?";
var SEP = "(?:\\s*[,/]\\s*|\\s+)";
var VALUE = "(none|[\\d%.-]+(?:deg|grad|rad|turn)?)";
var colorRegex = new RegExp(`${MODEL}\\s*\\(\\s*${VALUE}${SEP}${VALUE}${SEP}${VALUE}(?:${SEP}${VALUE})?\\s*\\)`, "i");
function parseAngle(value) {
	const number_ = parseFloat(value);
	let result;
	if (value.endsWith("grad")) result = number_ * .9;
	else if (value.endsWith("rad")) result = number_ * (180 / Math.PI);
	else if (value.endsWith("turn")) result = number_ * 360;
	else result = number_;
	return Math.round(result * 1e5) / 1e5;
}
function extractColorParts(input) {
	invariant(isString(input), MESSAGES.inputString);
	if (isHex(input)) {
		const keys2 = COLOR_KEYS.rgb;
		const { r, g, b } = hex2rgb(input);
		const alpha2 = extractAlphaFromHex(input);
		return {
			model: "rgb",
			[keys2[0]]: r,
			[keys2[1]]: g,
			[keys2[2]]: b,
			alpha: alpha2 < 1 ? alpha2 : void 0
		};
	}
	const matches = colorRegex.exec(input);
	invariant(hasValidMatches(matches), MESSAGES.invalidCSS);
	const model = matches[1];
	const keys = COLOR_KEYS[model];
	let alpha = matches[5] ? parseFloat(matches[5]) : 1;
	if (alpha > 1) alpha /= 100;
	const parseValue = (value, index) => {
		if (value === "none") return 0;
		if (model === "hsl" && index === 0 || model === "oklch" && index === 2) return parseAngle(value);
		const parsedValue = parseFloat(value);
		if (!value.includes("%")) return parsedValue;
		if (model === "oklch") {
			if (index === 1) return parsedValue * .4 / 100;
		} else if (model === "oklab") {
			if (index === 1 || index === 2) return parsedValue * .4 / 100;
		}
		return parsedValue;
	};
	const values = [
		parseValue(matches[2], 0),
		parseValue(matches[3], 1),
		parseValue(matches[4], 2)
	];
	if (model === "oklab") {
		invariant(values[1] >= -.4 && values[1] <= .4, MESSAGES.invalidRange);
		invariant(values[2] >= -.4 && values[2] <= .4, MESSAGES.invalidRange);
	} else if (model === "oklch") invariant(values[1] >= 0 && values[1] <= .4, MESSAGES.invalidRange);
	return {
		model,
		[keys[0]]: values[0],
		[keys[1]]: values[1],
		[keys[2]]: values[2],
		alpha: alpha < 1 ? alpha : void 0
	};
}
var toHslConverters = {
	oklab: oklab2hsl,
	oklch: oklch2hsl,
	rgb: rgb2hsl
};
var toOklabConverters = {
	hsl: hsl2oklab,
	oklch: oklch2oklab,
	rgb: rgb2oklab
};
var toOklchConverters = {
	hsl: hsl2oklch,
	oklab: oklab2oklch,
	rgb: rgb2oklch
};
var toRgbConverters = {
	hsl: hsl2rgb,
	oklab: oklab2rgb,
	oklch: oklch2rgb
};
var toHexConverters = {
	hsl: hsl2hex,
	oklab: oklab2hex,
	oklch: oklch2hex,
	rgb: rgb2hex
};
var fromHexConverters = {
	hsl: hex2hsl,
	oklab: hex2oklab,
	oklch: hex2oklch,
	rgb: hex2rgb
};
var converterTables = {
	hsl: toHslConverters,
	oklab: toOklabConverters,
	oklch: toOklchConverters,
	rgb: toRgbConverters
};
function convertFromCSS(value, output) {
	const { alpha, model, ...color } = extractColorParts(value);
	if (["oklab", "oklch"].includes(model) && color.l > 1) color.l = round(color.l / 100, PRECISION);
	const colorTuple = Object.values(color);
	if (output === "hex") {
		const alphaPrefix = alpha ? convertAlphaToHex(alpha) : "";
		return `${toHexConverters[model](colorTuple)}${alphaPrefix}`;
	}
	const converter = converterTables[output]?.[model];
	return addAlpha(converter ? converter(colorTuple) : color, alpha);
}
function convertFromHex(value, output) {
	const alpha = extractAlphaFromHex(value);
	if (output === "hex") return `${removeAlphaFromHex(value)}${alpha !== 1 ? convertAlphaToHex(alpha) : ""}`;
	return addAlpha(fromHexConverters[output](value), alpha);
}
function parseCSS(input, format) {
	invariant(isString(input), MESSAGES.inputString);
	const value = isNamedColor(input) ? cssColors[input.toLowerCase()] : input;
	const output = format ?? (isHex(value) ? "hex" : extractColorParts(value).model);
	if (isHex(value)) return convertFromHex(value, output);
	return convertFromCSS(value, output);
}
var mainTRC = 2.4;
var normBG = .56;
var normTXT = .57;
var revBG = .65;
var revTXT = .62;
var sRco = .2126729;
var sGco = .7151522;
var sBco = .072175;
var blkThreshold = .022;
var blkClamp = 1.414;
var scaleBoW = 1.14;
var scaleWoB = 1.14;
var loBoWOffset = .027;
var loWoBOffset = .027;
var loClip = .1;
var deltaYmin = 5e-4;
function softClamp(Y) {
	return Y > blkThreshold ? Y : Y + (blkThreshold - Y) ** blkClamp;
}
function sRGBtoY(r, g, b) {
	return sRco * (r / 255) ** mainTRC + sGco * (g / 255) ** mainTRC + sBco * (b / 255) ** mainTRC;
}
function apcaContrast(background, foreground) {
	invariant(isString(background), MESSAGES.inputString);
	invariant(isString(foreground), MESSAGES.inputString);
	const bg = hex2rgb(parseCSS(background, "hex"));
	const fg = hex2rgb(parseCSS(foreground, "hex"));
	const txtY = softClamp(sRGBtoY(fg.r, fg.g, fg.b));
	const bgY = softClamp(sRGBtoY(bg.r, bg.g, bg.b));
	if (Math.abs(bgY - txtY) < deltaYmin) return 0;
	const SAPC = bgY > txtY ? (bgY ** normBG - txtY ** normTXT) * scaleBoW : (bgY ** revBG - txtY ** revTXT) * scaleWoB;
	if (Math.abs(SAPC) < loClip) return 0;
	return round(SAPC > 0 ? (SAPC - loBoWOffset) * 100 : (SAPC + loWoBOffset) * 100, 5);
}
function brightnessDifference(left, right, precision = PRECISION) {
	invariant(isString(left), MESSAGES.left);
	invariant(isString(right), MESSAGES.right);
	const RGBLeft = parseCSS(left, "rgb");
	const RGBRight = parseCSS(right, "rgb");
	const brightnessLeft = (RGBLeft.r * 299 + RGBLeft.g * 587 + RGBLeft.b * 114) / 1e3;
	const brightnessRight = (RGBRight.r * 299 + RGBRight.g * 587 + RGBRight.b * 114) / 1e3;
	return round(Math.abs(brightnessRight - brightnessLeft), precision);
}
function chroma(input) {
	invariant(isString(input), MESSAGES.inputString);
	const { r, g, b } = parseCSS(input, "rgb");
	return round((Math.max(r, g, b) - Math.min(r, g, b)) / 255, 4);
}
function colorDifference(left, right) {
	invariant(isString(left), MESSAGES.left);
	invariant(isString(right), MESSAGES.right);
	const RGBLeft = parseCSS(left, "rgb");
	const RGBRight = parseCSS(right, "rgb");
	return Math.max(RGBLeft.r, RGBRight.r) - Math.min(RGBLeft.r, RGBRight.r) + (Math.max(RGBLeft.g, RGBRight.g) - Math.min(RGBLeft.g, RGBRight.g)) + (Math.max(RGBLeft.b, RGBRight.b) - Math.min(RGBLeft.b, RGBRight.b));
}
function luminance(input) {
	invariant(isString(input), MESSAGES.inputString);
	const { r, g, b } = parseCSS(input, "rgb");
	const rgb = [
		r / 255,
		g / 255,
		b / 255
	];
	for (let index = 0; index < rgb.length; index++) if (rgb[index] <= .04045) rgb[index] /= 12.92;
	else rgb[index] = ((rgb[index] + .055) / 1.055) ** 2.4;
	return round(.2126 * rgb[0] + .7152 * rgb[1] + .0722 * rgb[2], 4);
}
function contrast(left, right) {
	invariant(isString(left), MESSAGES.left);
	invariant(isString(right), MESSAGES.right);
	const LuminanceLeft = luminance(left);
	const LuminanceRight = luminance(right);
	return round(LuminanceLeft >= LuminanceRight ? (LuminanceLeft + .05) / (LuminanceRight + .05) : (LuminanceRight + .05) / (LuminanceLeft + .05));
}
function compare(left, right) {
	invariant(isString(left), MESSAGES.left);
	invariant(isString(right), MESSAGES.right);
	const colorThreshold = 500;
	const brightnessThreshold = 125;
	const colorDifference2 = colorDifference(left, right);
	const contrast2 = contrast(left, right);
	const brightnessDifference2 = brightnessDifference(left, right);
	const isBright = brightnessDifference2 >= brightnessThreshold;
	const hasEnoughDifference = colorDifference2 >= colorThreshold;
	let compliant = 0;
	if (isBright && hasEnoughDifference) compliant = 2;
	else if (isBright || hasEnoughDifference) compliant = 1;
	return {
		brightnessDifference: brightnessDifference2,
		colorDifference: colorDifference2,
		compliant,
		contrast: contrast2,
		largeAA: contrast2 >= 3,
		largeAAA: contrast2 >= 4.5,
		normalAA: contrast2 >= 4.5,
		normalAAA: contrast2 >= 7
	};
}
function getColorModel(input) {
	if (isHex(input) || isNamedColor(input)) return "hex";
	if (isHSL(input)) return "hsl";
	if (isLAB(input)) return "oklab";
	if (isLCH(input)) return "oklch";
	if (isRGB(input)) return "rgb";
	throw new Error(MESSAGES.invalid);
}
function getColorValue(input, output) {
	const value = isNamedColor(input) ? cssColors[input.toLowerCase()] : input;
	const from = getColorModel(value);
	if (from === output) return value;
	const converter = converters_exports[`${from}2${output}`];
	if (!converter) throw new Error(`Converter not found for ${from} to ${output}`);
	return converter(value);
}
function formatCSS(input, options = {}) {
	invariant(isHex(input) || isValidColorModel(input), MESSAGES.invalid);
	const { alpha, format = "hex", precision = PRECISION, separator: baseSeparator = " " } = options;
	const opacity2 = alpha && alpha !== 1 ? `${round(alpha * 100)}%` : null;
	let params = [];
	let separator = baseSeparator;
	switch (format) {
		case "hsl": {
			const { h, s, l } = getColorValue(input, "hsl");
			params = [
				h,
				`${s}%`,
				`${l}%`
			];
			break;
		}
		case "oklab": {
			separator = " ";
			const { l, a, b } = restrictValues(getColorValue(input, "oklab"), precision);
			params = [
				`${round(l * 100, precision)}%`,
				a,
				b
			];
			break;
		}
		case "oklch": {
			separator = " ";
			const { l, c, h } = restrictValues(getColorValue(input, "oklch"), precision);
			params = [
				`${round(l * 100, precision)}%`,
				c,
				h
			];
			break;
		}
		case "rgb": {
			const { r, g, b } = getColorValue(input, "rgb");
			params = [
				r,
				g,
				b
			];
			break;
		}
		default: {
			const hex = removeAlphaFromHex(getColorValue(input, "hex"));
			if (alpha && alpha !== 1) return `${hex}${convertAlphaToHex(alpha)}`;
			return hex;
		}
	}
	return `${format}(${params.join(separator)}${opacity2 ? ` / ${opacity2}` : ""})`;
}
function updater(key, operator, format) {
	return (input, amount) => {
		invariant(isString(input), MESSAGES.inputString);
		invariant(isNumberInRange(amount, 0, 100), MESSAGES.amount);
		const color = parseCSS(input, "hsl");
		const output = isHex(input) || isNamedColor(input) ? "hex" : extractColorParts(input).model;
		return formatCSS({
			...color,
			[key]: clamp(color[key] + (operator === "+" ? amount : -amount), 0, 100)
		}, { format: format ?? output });
	};
}
function darken(input, amount, format) {
	return updater("l", "-", format)(input, amount);
}
function desaturate(input, amount, format) {
	return updater("s", "-", format)(input, amount);
}
function grayscale(input, format) {
	invariant(isString(input), MESSAGES.inputString);
	const output = isHex(input) || isNamedColor(input) ? "hex" : extractColorParts(input).model;
	const lch = parseCSS(input, "oklch");
	return formatCSS({
		...lch,
		c: 0
	}, {
		format: format ?? output,
		alpha: lch.alpha
	});
}
function rotate(input, degrees, format) {
	invariant(isString(input), MESSAGES.inputString);
	invariant(isNumberInRange(degrees, -360, 360), MESSAGES.degreesRange);
	const color = parseCSS(input, "hsl");
	const output = isHex(input) || isNamedColor(input) ? "hex" : extractColorParts(input).model;
	return formatCSS({
		...color,
		h: constrainDegrees(color.h, degrees)
	}, { format: format ?? output });
}
function invert(input) {
	invariant(isString(input), MESSAGES.inputString);
	const format = isHex(input) || isNamedColor(input) ? "hex" : extractColorParts(input).model;
	return formatCSS(rotate(parseCSS(input, "hex"), 180), { format });
}
function lighten(input, amount, format) {
	return updater("l", "+", format)(input, amount);
}
function interpolateHue(h1, h2, c1, c2, ratio) {
	if (c1 < 1e-4) return h2;
	if (c2 < 1e-4) return h1;
	let diff = h2 - h1;
	if (diff > 180) diff -= 360;
	else if (diff < -180) diff += 360;
	let result = h1 + diff * ratio;
	if (result < 0) result += 360;
	else if (result >= 360) result -= 360;
	return result;
}
function mix(color1, color2, ratio = .5, format) {
	invariant(isString(color1), MESSAGES.inputString);
	invariant(isString(color2), MESSAGES.inputString);
	invariant(isNumberInRange(ratio, 0, 1), MESSAGES.ratioRange);
	const output = isHex(color1) || isNamedColor(color1) ? "hex" : extractColorParts(color1).model;
	const lch1 = parseCSS(color1, "oklch");
	const lch2 = parseCSS(color2, "oklch");
	const l = lch1.l + (lch2.l - lch1.l) * ratio;
	const c = lch1.c + (lch2.c - lch1.c) * ratio;
	const h = interpolateHue(lch1.h, lch2.h, lch1.c, lch2.c, ratio);
	const alpha1 = lch1.alpha ?? 1;
	const alpha = alpha1 + ((lch2.alpha ?? 1) - alpha1) * ratio;
	return formatCSS({
		l,
		c,
		h
	}, {
		format: format ?? output,
		alpha: alpha < 1 ? alpha : void 0
	});
}
function parseColor(color) {
	invariant(!!color, MESSAGES.input);
	const output = {};
	if (isString(color)) {
		const { alpha = 1 } = extractColorParts(color);
		const type = isHex(color) ? "hex" : extractColorParts(color).model;
		output.hex = addAlphaToHex(parseCSS(color, "hex"), alpha);
		output.hsl = addAlpha(parseCSS(color, "hsl"), alpha);
		output.oklab = addAlpha(parseCSS(color, "oklab"), alpha);
		output.oklch = addAlpha(parseCSS(color, "oklch"), alpha);
		output.rgb = addAlpha(parseCSS(color, "rgb"), alpha);
		output.alpha = alpha;
		output.type = type;
	} else if (isPlainObject(color)) {
		const { alpha = 1 } = color;
		if (isHSL(color)) {
			output.hsl = {
				h: limit(color.h, "hsl", "h"),
				s: limit(color.s, "hsl", "s"),
				l: limit(color.l, "hsl", "l")
			};
			output.rgb = hsl2rgb(output.hsl);
			output.oklab = hsl2oklab(output.hsl);
			output.oklch = hsl2oklch(output.hsl);
			output.type = "hsl";
		} else if (isLAB(color)) {
			output.hsl = oklab2hsl(color);
			output.oklab = color;
			output.oklch = oklab2oklch(color);
			output.rgb = oklab2rgb(color);
			output.type = "oklab";
		} else if (isLCH(color)) {
			output.hsl = oklch2hsl(color);
			output.oklab = oklch2oklab(color);
			output.oklch = color;
			output.rgb = oklch2rgb(color);
			output.type = "oklch";
		} else if (isRGB(color)) {
			output.rgb = {
				r: limit(color.r, "rgb", "r"),
				g: limit(color.g, "rgb", "g"),
				b: limit(color.b, "rgb", "b")
			};
			output.hsl = rgb2hsl(output.rgb);
			output.oklab = rgb2oklab(output.rgb);
			output.oklch = rgb2oklch(output.rgb);
			output.type = "rgb";
		} else throw new Error("invalid color");
		output.hex = addAlphaToHex(hsl2hex(output.hsl), alpha);
		output.hsl = addAlpha(output.hsl, alpha);
		output.oklab = addAlpha(output.oklab, alpha);
		output.oklch = addAlpha(output.oklch, alpha);
		output.rgb = addAlpha(output.rgb, alpha);
		output.alpha = alpha;
	} else throw new Error(MESSAGES.input);
	return output;
}
function opacify(input, alpha, format) {
	invariant(isString(input), MESSAGES.inputString);
	invariant(isNumberInRange(alpha, 0, 1), MESSAGES.alpha);
	const type = isHex(input) || isNamedColor(input) ? "hex" : extractColorParts(input).model;
	return formatCSS(parseCSS(input, "rgb"), {
		format: format ?? type,
		alpha
	});
}
function opacity(input) {
	invariant(isString(input), MESSAGES.inputString);
	if (isHex(input)) return extractAlphaFromHex(input);
	else if (Object.keys(cssColors).includes(input)) return 1;
	const { alpha } = extractColorParts(input);
	if (!alpha) return 1;
	return alpha;
}
function pickByContrast(darkContrast, lightContrast, darkColor, lightColor) {
	return darkContrast >= lightContrast ? darkColor : lightColor;
}
function readableColor(backgroundColor, options = {}) {
	const { darkColor = "#000000", lightColor = "#ffffff", method = "yiq", threshold } = options;
	invariant(isString(backgroundColor), MESSAGES.inputString);
	switch (method) {
		case "yiq": {
			const yiqThreshold = threshold ?? 128;
			invariant(yiqThreshold >= 0 && yiqThreshold <= 255, MESSAGES.threshold);
			const { r, g, b } = hex2rgb(parseCSS(backgroundColor, "hex"));
			return (r * 299 + g * 587 + b * 114) / 1e3 >= yiqThreshold ? darkColor : lightColor;
		}
		case "wcag": {
			const wcagThreshold = threshold ?? .5;
			invariant(wcagThreshold >= 0 && wcagThreshold <= 1, MESSAGES.thresholdNormalized);
			return luminance(backgroundColor) >= wcagThreshold ? darkColor : lightColor;
		}
		case "contrast": return pickByContrast(contrast(darkColor, backgroundColor), contrast(lightColor, backgroundColor), darkColor, lightColor);
		case "oklab": {
			const oklabThreshold = threshold ?? .5;
			invariant(oklabThreshold >= 0 && oklabThreshold <= 1, MESSAGES.thresholdNormalized);
			const { l } = hex2oklab(parseCSS(backgroundColor, "hex"));
			return l >= oklabThreshold ? darkColor : lightColor;
		}
		case "apca": return pickByContrast(Math.abs(apcaContrast(backgroundColor, darkColor)), Math.abs(apcaContrast(backgroundColor, lightColor)), darkColor, lightColor);
		default: throw new Error(`Unknown method: ${method}`);
	}
}
function saturate(input, amount, format) {
	return updater("s", "+", format)(input, amount);
}
function transparentize(input, alpha, format) {
	invariant(isString(input), MESSAGES.inputString);
	invariant(isNumberInRange(alpha, -1, 1), MESSAGES.alphaAdjustment);
	return formatCSS(parseCSS(input, "oklab"), {
		format,
		alpha: round(clamp(opacity(input) - alpha, 0, 1))
	});
}
var Colorizr = class {
	constructor(color, options = {}) {
		/** The alpha/opacity value (0-1). */
		__publicField(this, "alpha");
		__publicField(this, "hex");
		__publicField(this, "hsl");
		__publicField(this, "oklab");
		__publicField(this, "oklch");
		__publicField(this, "rgb");
		__publicField(this, "type");
		invariant(!!color, MESSAGES.colorRequired);
		const { alpha, hex, hsl, oklab, oklch, rgb, type } = parseColor(color);
		this.hex = hex;
		this.hsl = hsl;
		this.oklab = oklab;
		this.oklch = oklch;
		this.rgb = rgb;
		this.alpha = alpha;
		this.type = options.format ?? type;
	}
	/**
	* Get CSS string
	*/
	get css() {
		return this.currentColor;
	}
	/**
	* Get the red value
	*/
	get red() {
		return this.rgb.r;
	}
	/**
	* Get the green value
	*/
	get green() {
		return this.rgb.g;
	}
	/**
	* Get the blue value
	*/
	get blue() {
		return this.rgb.b;
	}
	/**
	* Get the hue value
	*/
	get hue() {
		return this.hsl.h;
	}
	/**
	* Get the saturation value
	*/
	get saturation() {
		return this.hsl.s;
	}
	/**
	* Get the lightness value
	*/
	get lightness() {
		return this.hsl.l;
	}
	/**
	* Get the luminance value
	*/
	get luminance() {
		return luminance(this.currentColor);
	}
	/**
	* Get the chroma value
	*/
	get chroma() {
		return chroma(this.currentColor);
	}
	get opacity() {
		return opacity(this.currentColor);
	}
	/**
	* Get the most readable color (light or dark) for this color as a background.
	*/
	get readableColor() {
		return readableColor(this.currentColor);
	}
	get currentColor() {
		return formatCSS(this[this.type], {
			format: this.type,
			alpha: this.alpha
		});
	}
	/**
	* Get the brightness difference between this color and another.
	*
	* @param input - The color to compare against.
	* @returns The brightness difference value.
	*/
	brightnessDifference(input) {
		return brightnessDifference(this.currentColor, input);
	}
	/**
	* Get the color difference between this color and another.
	*
	* @param input - The color to compare against.
	* @returns The color difference value.
	*/
	colorDifference(input) {
		return colorDifference(this.currentColor, input);
	}
	/**
	* Test 2 colors for WCAG compliance.
	*
	* @param input - The color to compare against.
	* @returns Analysis object with compliance information.
	*/
	compare(input) {
		return compare(this.currentColor, input);
	}
	/**
	* Get the contrast ratio between this color and another.
	*
	* @param input - The color to compare against.
	* @returns The contrast ratio.
	*/
	contrast(input) {
		return contrast(this.currentColor, input);
	}
	/**
	* Format the color to a specific type.
	*
	* @param type - The color format to convert to.
	* @param precision - The decimal precision for the output.
	* @returns The formatted color string.
	*/
	format(type, precision) {
		return formatCSS(this.rgb, {
			alpha: this.alpha,
			format: type,
			precision
		});
	}
	/**
	* Increase lightness.
	*
	* @param amount - A number between 0 and 100.
	* @returns The lightened color string.
	*/
	lighten(amount) {
		return lighten(this.currentColor, amount);
	}
	/**
	* Decrease lightness.
	*
	* @param amount - A number between 0 and 100.
	* @returns The darkened color string.
	*/
	darken(amount) {
		return darken(this.currentColor, amount);
	}
	/**
	* Increase saturation.
	*
	* @param amount - A number between 0 and 100.
	* @returns The saturated color string.
	*/
	saturate(amount) {
		return saturate(this.currentColor, amount);
	}
	/**
	* Decrease saturation.
	*
	* @param amount - A number between 0 and 100.
	* @returns The desaturated color string.
	*/
	desaturate(amount) {
		return desaturate(this.currentColor, amount);
	}
	/**
	* Convert to grayscale.
	*
	* @returns The grayscale color string.
	*/
	grayscale() {
		return grayscale(this.currentColor);
	}
	/**
	* Invert color.
	*
	* @returns The inverted color string.
	*/
	invert() {
		return invert(this.currentColor);
	}
	/**
	* Mix with another color.
	*
	* @param color - The color to mix with.
	* @param ratio - A number between 0 and 1 (0 = this color, 1 = input color).
	* @returns The mixed color string.
	*/
	mix(color, ratio) {
		return mix(this.currentColor, color, ratio);
	}
	/**
	* Add opacity to the color.
	*
	* @param alpha - A number between 0 and 1.
	* @returns The opacified color string.
	*/
	opacify(alpha = .9) {
		return opacify(this.currentColor, alpha, this.type);
	}
	/**
	* Rotate color hue.
	*
	* @param degrees - A number between -360 and 360.
	* @returns The rotated color string.
	*/
	rotate(degrees) {
		return rotate(this.currentColor, degrees);
	}
	/**
	* Make the color more transparent.
	*
	* @param alpha - A number between -1 and 1.
	* @returns The transparentized color string.
	*/
	transparentize(alpha = .1) {
		return transparentize(this.currentColor, alpha, this.type);
	}
};
function convert$1(input, format) {
	return formatCSS(parseCSS(input, format), { format });
}
/* v8 ignore next 3  -- @preserve */

//#endregion
//#region ../packages/visual/src/colour/guards.ts
function isHsl(v) {
	if (typeof v !== `object`) return false;
	if (!(`h` in v)) return false;
	if (!(`s` in v)) return false;
	if (!(`l` in v)) return false;
	if (!(`unit` in v)) return false;
	if (!(`space` in v)) return false;
	if (v.space !== `hsl`) return false;
	return true;
}
function isRgb(v) {
	if (typeof v !== `object`) return false;
	if (!(`r` in v)) return false;
	if (!(`g` in v)) return false;
	if (!(`b` in v)) return false;
	if (!(`space` in v)) return false;
	if (!(`unit` in v)) return false;
	if (v.space === `srgb`) return true;
	return false;
}
/**
* If the input object has r,g&b properties, it will return a fully-
* formed Rgb type with `unit` and `space` properties.
*
* If it lacks these basic three properties or they are out of range,
*  _undefined_ is returned.
*
* If RGB values are less than 1 assumes unit:scalar. Otherwise unit:8bit.
* If RGB values exceed 255, _undefined_ returned.
* @param v
* @returns Rgb object or _undefined_ if the input object is not a valid Rgb type.
*/
function tryParseObjectToRgb(v) {
	if (typeof v !== `object`) throw new TypeError(`Param 'v' is expected to be an object, got: ${typeof v}`);
	if (!(`r` in v && `g` in v && `b` in v)) return;
	if (!(`unit` in v)) if (v.r <= 1 && v.g <= 1 && v.b <= 1) v.unit = `scalar`;
	else if (v.r > 255 && v.g <= 255 && v.b <= 255) return;
	else v.unit = `8bit`;
	if (!(`space` in v)) v.space = `srgb`;
	return v;
}
function tryParseObjectToOkLch(v) {
	if (typeof v !== `object`) throw new TypeError(`Param 'v' is expected to be an object, got: ${typeof v}`);
	if (!(`l` in v && `c` in v && `h` in v)) return;
	if (!(`unit` in v)) v.unit = `scalar`;
	if (!(`space` in v)) v.space = `oklch`;
	return v;
}
/**
* If the input object has h, s and l properties, it will return a fully-
* formed Hsl type with `unit` and `space` properties.
*
* If it lacks these basic three properties or they are out of range,
*  _undefined_ is returned.
*
* If HSL values are less than 1 assumes unit:scalar. Otherwise unit:8bit.
* If HSL values exceed 100, _undefined_ returned.
* @param v
* @returns Hsl object or _undefined_ if the input object is not a valid Hsl type.
*/
function tryParseObjectToHsl(v) {
	if (!(`h` in v && `s` in v && `l` in v)) return;
	if (!(`unit` in v)) if (v.s <= 1 && v.l <= 1) v.unit = `scalar`;
	else if (v.s > 100 || v.l > 100) return;
	else v.unit = `absolute`;
	if (!(`space` in v)) v.space = `hsl`;
	return v;
}
function isOkLch(v) {
	if (typeof v !== `object`) return false;
	if (!(`l` in v)) return false;
	if (!(`c` in v)) return false;
	if (!(`h` in v)) return false;
	if (!(`unit` in v)) return false;
	if (!(`space` in v)) return false;
	if (v.space === `lch`) return true;
	if (v.space === `oklch`) return true;
	return false;
}
function isColourish(v) {
	if (typeof v === `string`) return true;
	if (typeof v !== `object`) return false;
	if (isHsl(v)) return true;
	if (isOkLch(v)) return true;
	if (isRgb(v)) return true;
	return false;
}

//#endregion
//#region ../packages/visual/src/colour/utility.ts
function calculateHueDistance(a, b, limit = 1) {
	let long = -1;
	let short = -1;
	if (b < a) {
		long = b - a;
		short = limit - (a - b);
	} else {
		long = b - a;
		short = long - limit;
	}
	const forward = short > 0 ? short : long;
	const backward = short > 0 ? long : short;
	if (Math.abs(long) < Math.abs(short)) {
		const t = short;
		short = long;
		long = t;
	}
	return {
		long,
		short,
		forward,
		backward
	};
}
function libraryRgbToHexString(rgb) {
	const componentToHex = (c) => {
		const hex = Math.floor(c).toString(16);
		return hex.length === 1 ? `0${hex}` : hex;
	};
	let part = `#${componentToHex(rgb.r)}${componentToHex(rgb.g)}${componentToHex(rgb.b)}`;
	if (typeof rgb.alpha !== `undefined` && rgb.alpha !== 255) part += componentToHex(rgb.alpha);
	return part;
}
function wrapScalarHue(value) {
	value = value % 1;
	if (value < 0) return (1 - Math.abs(value)) % 1;
	return value;
}

//#endregion
//#region ../packages/visual/src/colour/hsl.ts
var hsl_exports = /* @__PURE__ */ __exportAll({
	absolute: () => absolute$1,
	changeLightness: () => changeLightness$1,
	fromCss: () => fromCss$3,
	fromHexString: () => fromHexString$3,
	generateScalar: () => generateScalar$1,
	guard: () => guard$4,
	interpolator: () => interpolator$3,
	parseCssHslFunction: () => parseCssHslFunction,
	scalar: () => scalar$3,
	toAbsolute: () => toAbsolute$1,
	toCssString: () => toCssString$2,
	toHexString: () => toHexString$3,
	toLibraryRgb: () => toLibraryRgb,
	toScalar: () => toScalar$3,
	withOpacity: () => withOpacity$3
});
/**
* Scales the opacity value of an input HSL value
* ```js
* withOpacity()
* ```
* @param value Colour
* @param fn Function that calcules opacity based on input scalar value
*/
function withOpacity$3(value, fn) {
	switch (value.unit) {
		case `absolute`: return {
			...value,
			opacity: fn((value.opacity ?? 100) / 100, value) * 100
		};
		case `scalar`: return {
			...value,
			opacity: fn(value.opacity ?? 1, value)
		};
	}
}
/**
* Increases or decreases lightness by this percentage, returning new colour
*
* Amount to change:
* 'fixed': a fixed amount
* 'delta': increase/decrease by this amount
* 'pdelta': proportion of current value to change by ('percentage delta')
*
* ```
* const colour = { h: 0.5, s: 0.5, l: 0.5, space: `hsl`, unit: `scalar` };
* changeLightness(colour, { pdelta: 0.1 }); // l: 0.55
* changeLightness(colour, { delta: 0.1 });  // l: 0.6
* changeLightness(colour, { fixed: 0.5 });  // l: 0.5
* ```
*
* Keep in mind the numerical value will depend on the unit of `value`. If it's scalar,
* lightness is 0..1 scale, otherwise 0..100 scale.
*
* Use negative values to decrease (does not apply to 'fixed')
* @param value Hsl colour
* @param amount Amount to change
*/
function changeLightness$1(value, amount) {
	let newL = 0;
	if (typeof amount.pdelta !== `undefined`) newL = value.l + value.l * amount.pdelta;
	else if (typeof amount.delta !== `undefined`) newL = amount.delta + value.l;
	else if (typeof amount.fixed !== `undefined`) {
		if (amount.fixed < 0) throw new TypeError(`Cannot use negative value with 'fixed'`);
		newL = amount.fixed;
	} else throw new TypeError(`Parameter 'amount' is missing 'delta/pdelta/fixed' properties`);
	return {
		...value,
		l: scaleProperty(value, newL, `l`)
	};
}
function scaleProperty(hsl, value, property) {
	if (hsl.unit === `scalar`) {
		if (value > 1) value = 1;
		else if (value < 0) value = 0;
	} else if (value > 100) value = 100;
	else if (value < 0) value = 0;
	return value;
}
const hslTransparent = Object.freeze({
	h: 0,
	s: 0,
	l: 0,
	opacity: 0,
	unit: `absolute`,
	space: `hsl`
});
function fromHexString$3(hexString, options = {}) {
	return fromLibrary$2(hex2hsl(hexString), options);
}
function fromCss$3(value, options = {}) {
	value = value.toLowerCase();
	if (value.startsWith(`hsla(`)) throw new Error(`hsla() not supported`);
	if (value.startsWith(`rgba(`)) throw new Error(`rgba() not supported`);
	if (value.startsWith(`#`)) return fromHexString$3(value, options);
	if (value.startsWith(`--`)) try {
		value = resolveCss(value);
	} catch (error) {
		if (typeof options.fallbackString !== `undefined`) value = options.fallbackString;
		if (typeof options.fallbackColour !== `undefined`) return options.fallbackColour;
		throw error;
	}
	if (value === `transparent`) return hslTransparent;
	if (typeof cssDefinedHexColours[value] !== `undefined`) return fromHexString$3(cssDefinedHexColours[value], options);
	if (value.startsWith(`rgb(`)) return fromLibrary$2(toLibraryHsl(value), options);
	if (!value.startsWith(`hsl(`)) try {
		value = convert$1(value, `hsl`);
	} catch (error) {
		if (options.fallbackString) value = options.fallbackString;
		else throw error;
	}
	try {
		const hsl = parseCssHslFunction(value);
		if (options.scalar) return toScalar$3(hsl);
		return toAbsolute$1(hsl);
	} catch (error) {
		if (options.fallbackColour) return options.fallbackColour;
		throw error;
	}
}
function toCssString$2(hsl) {
	const abs = toAbsolute$1(hsl);
	let css = `hsl(${abs.h}deg ${abs.s}% ${abs.l}%`;
	if (`opacity` in abs && abs.opacity !== void 0 && abs.opacity < 100) css += ` / ${abs.opacity}%`;
	css += `)`;
	return css;
}
function toHexString$3(hsl) {
	return libraryRgbToHexString(toLibraryRgb(hsl));
}
function fromLibrary$2(hsl, parsingOptions = {}) {
	if (typeof hsl === `undefined` || hsl === null) {
		if (parsingOptions.fallbackColour) return parsingOptions.fallbackColour;
	}
	const scalarOpt = parsingOptions.scalar ?? true;
	resultThrow(numberInclusiveRangeTest(hsl.h, 0, 360, `h`), numberInclusiveRangeTest(hsl.s, 0, 100, `s`), numberInclusiveRangeTest(hsl.l, 0, 100, `l`), percentTest(hsl.alpha ?? 1, `alpha`));
	if (scalarOpt) return scalar$3(hsl.h / 360, hsl.s / 100, hsl.l / 100, hsl.alpha ?? 1);
	else return absolute$1(hsl.h, hsl.s, hsl.l, (hsl.alpha ?? 1) * 100);
}
function toAbsolute$1(hslOrString) {
	if (typeof hslOrString === `string`) return fromCss$3(hslOrString, { scalar: false });
	if (isRgb(hslOrString)) return toAbsolute$1(fromLibrary$2(toLibraryHsl(hslOrString), { scalar: false }));
	const hsl = hslOrString;
	guard$4(hsl);
	if (hsl.unit === `absolute`) return hsl;
	return {
		h: hsl.h * 360,
		s: hsl.s * 100,
		l: hsl.l * 100,
		opacity: (hsl.opacity ?? 1) * 100,
		unit: `absolute`,
		space: `hsl`
	};
}
/**
* Generates a {@link HslScalar} value.
*
* ```js
* generateScaler(10); // 10deg, default to full saturation, half lightness and full opacity
*
* // Generate HSL value from radian angle and 50% saturation
* generateScalar(`10rad`, 0.5);
*
* // Generate from numeric CSS variable
* generateScalar(`--hue`);
* ```
* @param absoluteHslOrVariable Hue angle or CSS variable
* @param saturation
* @param lightness
* @param opacity
*/
function generateScalar$1(absoluteHslOrVariable, saturation = 1, lightness = .5, opacity = 1) {
	if (typeof absoluteHslOrVariable === `string`) {
		if (absoluteHslOrVariable.startsWith(`--`)) absoluteHslOrVariable = getComputedStyle(document.body).getPropertyValue(absoluteHslOrVariable).trim();
	}
	const hue = angleParse(absoluteHslOrVariable);
	if (saturation > 1) throw new TypeError(`Param 'saturation' must be between 0..1`);
	if (lightness > 1) throw new TypeError(`Param 'lightness' must be between 0..1`);
	if (opacity > 1) throw new TypeError(`Param 'opacity' must be between 0..1`);
	return {
		h: angleConvert(hue, `deg`).value / 360,
		s: saturation,
		l: lightness,
		opacity,
		unit: `scalar`,
		space: `hsl`
	};
}
/**
* Converts a {@link Hsl} value to scalar units, or parses a colour string
* and converts it.
*
* ```js
* toScalar({ h: 100, s: 50, l: 100, unit: `absolute` });
* toScalar(`red`);
* ```
* @param colour
*/
function toScalar$3(colour) {
	if (typeof colour === `string`) return fromCss$3(colour, { scalar: true });
	if (isRgb(colour)) return toScalar$3(fromLibrary$2(toLibraryHsl(colour), { scalar: true }));
	const hsl = colour;
	guard$4(hsl);
	if (hsl.unit === `scalar`) return hsl;
	return {
		h: hsl.h / 360,
		s: hsl.s / 100,
		l: hsl.l / 100,
		opacity: (hsl.opacity ?? 1) / 100,
		unit: `scalar`,
		space: `hsl`
	};
}
function guard$4(hsl) {
	const { h, s, l, opacity, space, unit } = hsl;
	if (space !== `hsl`) throw new Error(`Space is expected to be 'hsl'. Got: ${space}`);
	if (unit === `absolute`) resultThrow(numberTest(h, `finite`, `h`), numberInclusiveRangeTest(s, 0, 100, `s`), numberInclusiveRangeTest(l, 0, 100, `l`), () => {
		if (typeof opacity === `number`) return numberInclusiveRangeTest(opacity, 0, 100, `opacity`);
	});
	else if (unit === `scalar`) resultThrow(numberTest(h, `percentage`, `h`), numberTest(s, `percentage`, `s`), numberTest(l, `percentage`, `l`), () => {
		if (typeof opacity === `number`) return numberTest(opacity, `percentage`, `opacity`);
	});
	else throw new Error(`Unit is expected to be 'absolute' or 'scalar'. Got: ${unit}`);
}
function interpolator$3(a, b, direction = `shorter`) {
	a = toScalar$3(a);
	b = toScalar$3(b);
	const aOpacity = a.opacity ?? 1;
	const distanceCalc = calculateHueDistance(a.h, b.h, 1);
	const hueDistance = direction === `longer` ? distanceCalc.long : distanceCalc.short;
	const satDistance = b.s - a.s;
	const lightDistance = b.l - a.l;
	const opacityDistance = (b.opacity ?? 1) - aOpacity;
	return (amount) => {
		amount = clamp$1(amount);
		let h = interpolate(amount, 0, Math.abs(hueDistance));
		if (hueDistance < 0) h = a.h - h;
		else h = a.h + h;
		const s = interpolate(amount, 0, satDistance);
		const l = interpolate(amount, 0, lightDistance);
		const o = interpolate(amount, 0, opacityDistance);
		return scalar$3(wrapScalarHue(h), s + a.s, l + a.l, o + aOpacity);
	};
}
/**
* Creates a HslScalar value from scalar (0..1) values
* @param hue
* @param sat
* @param lightness
* @param opacity
*/
function scalar$3(hue = .5, sat = 1, lightness = .5, opacity = 1) {
	const hsl = {
		unit: `scalar`,
		space: `hsl`,
		h: hue,
		s: sat,
		l: lightness,
		opacity
	};
	guard$4(hsl);
	return hsl;
}
function absolute$1(hue = 200, sat = 100, lightness = 50, opacity = 100) {
	const hsl = {
		unit: `absolute`,
		space: `hsl`,
		h: hue,
		s: sat,
		l: lightness,
		opacity
	};
	guard$4(hsl);
	return hsl;
}
/**
* It seems Colorizr can't handle 'deg' units
* @param value
*/
function parseCssHslFunction(value) {
	if (value.startsWith(`hsla`)) throw new Error(`hsla() is not supported`);
	if (!value.startsWith(`hsl(`)) throw new Error(`Expected hsl(..) CSS colour`);
	const start = value.indexOf(`(`);
	const end = value.indexOf(`)`);
	if (end < start) throw new Error(`Is hsl() not terminated? Missing ')'`);
	let split = value.substring(start + 1, end).split(/[\s,]+/);
	if (split.length < 3) throw new Error(`Expected three tokens. Got: ${split.length} length`);
	let returnRelative = false;
	if (split[0].endsWith(`%`)) returnRelative = true;
	if (split[1].endsWith(`%`) && split[2].endsWith(`%`)) returnRelative = true;
	const valueAsScalar = (v, pos) => {
		if (v === `none`) return 0;
		if (v.endsWith(`%`)) return Number.parseFloat(v.substring(0, v.length - 1)) / 100;
		if (v.endsWith(`deg`) && pos === 0) v = v.substring(0, v.length - 3);
		const vf = Number.parseFloat(v);
		if (pos === 0) return vf / 360;
		if (pos === 3) return vf;
		return vf / 100;
	};
	const valueAsAbs = (v, pos) => {
		if (v === `none`) return 0;
		if (v.endsWith(`%`)) {
			const vf = Number.parseFloat(v.substring(0, v.length - 1));
			if (pos === 0) return vf * 360;
			return vf;
		}
		if (v.endsWith(`deg`) && pos === 0) return Number.parseFloat(v.substring(0, v.length - 3));
		return Number.parseFloat(v);
	};
	if (split.length > 3) {
		if (split[3] === `/`) split = [
			split[0],
			split[1],
			split[2],
			split[4]
		];
	}
	if (returnRelative) return scalar$3(valueAsScalar(split[0], 0), valueAsScalar(split[1], 1), valueAsScalar(split[2], 2), valueAsScalar(split[3] ?? `100%`, 3));
	else return absolute$1(valueAsAbs(split[0], 0), valueAsAbs(split[1], 1), valueAsAbs(split[2], 2), valueAsAbs(split[3] ?? `100%`, 3));
}
/**
* Converts a Hsl structure (or CSS string) to Colorizr's RGB format
* @param hsl HSL colour
*/
function toLibraryRgb(hsl) {
	if (typeof hsl === `string`) return toLibraryRgb(fromCss$3(hsl, { scalar: false }));
	hsl = toAbsolute$1(hsl);
	return {
		...hsl2rgb({
			h: hsl.h,
			s: hsl.s,
			l: hsl.l
		}),
		alpha: (hsl.opacity ?? 100) / 100 * 255
	};
}

//#endregion
//#region ../packages/visual/src/colour/srgb.ts
var srgb_exports = /* @__PURE__ */ __exportAll({
	changeLightness: () => changeLightness,
	eightBit: () => eightBit$1,
	fromCss: () => fromCss$2,
	fromHexString: () => fromHexString$2,
	guard: () => guard$3,
	interpolator: () => interpolator$2,
	lightness: () => lightness,
	parseCssRgbFunction: () => parseCssRgbFunction,
	scalar: () => scalar$2,
	to8bit: () => to8bit$1,
	toCssString: () => toCssString$1,
	toHexString: () => toHexString$2,
	toLibraryHsl: () => toLibraryHsl,
	toScalar: () => toScalar$2,
	withOpacity: () => withOpacity$2
});
function withOpacity$2(value, fn) {
	switch (value.unit) {
		case `8bit`: return {
			...value,
			opacity: fn((value.opacity ?? 255) / 255, value) * 255
		};
		case `scalar`: return {
			...value,
			opacity: fn(value.opacity ?? 1, value)
		};
	}
}
function fromHexString$2(hexString, scalar = true) {
	return fromLibrary$1(hex2rgb(hexString), { scalar });
}
const srgbTansparent = Object.freeze({
	r: 0,
	g: 0,
	b: 0,
	opacity: 0,
	unit: `8bit`,
	space: `srgb`
});
/**
* Converts a colour in a legal CSS form into Rgb value, by default RgbScalar (0..1) scale.
* ```js
* fromCss(`rebeccapurple`);
* fromCss(`rgb(40% 20% 60%)`);
*
* // Get 8bit version on 0..255 scale
* fromCss(`blue`, { scalar: false });
* ```
*
* @param value
* @param options
*/
function fromCss$2(value, options = {}) {
	value = value.toLowerCase();
	if (value.startsWith(`hsla(`)) throw new Error(`hsla() not supported`);
	if (value.startsWith(`rgba(`)) throw new Error(`rgba() not supported`);
	const scalar = options.scalar ?? true;
	if (value.startsWith(`#`)) return fromHexString$2(value, scalar);
	if (value === `transparent`) return srgbTansparent;
	if (typeof cssDefinedHexColours[value] !== `undefined`) return fromHexString$2(cssDefinedHexColours[value], scalar);
	if (value.startsWith(`hsl(`)) return fromLibrary$1(toLibraryRgb(value), options);
	if (!value.startsWith(`rgb(`)) try {
		value = convert$1(value, `rgb`);
	} catch (error) {
		if (options.fallbackString) value = options.fallbackString;
		else throw error;
	}
	try {
		const rgb = parseCssRgbFunction(value);
		if (scalar) return toScalar$2(rgb);
		return to8bit$1(rgb);
	} catch (error) {
		if (options.fallbackColour) return options.fallbackColour;
		throw error;
	}
}
function toHexString$2(rgb) {
	return libraryRgbToHexString(toLibrary$1(rgb));
}
function toCssString$1(rgb) {
	guard$3(rgb);
	switch (rgb.unit) {
		case `8bit`:
			if (rgb.opacity === void 0 || rgb.opacity === 255) return `rgb(${rgb.r} ${rgb.g} ${rgb.b})`;
			return `rgb(${rgb.r} ${rgb.g} ${rgb.b} / ${(rgb.opacity ?? 255) / 255})`;
		case `scalar`:
			if (rgb.opacity === void 0 || rgb.opacity === 1) return `rgb(${rgb.r * 100}% ${rgb.g * 100}% ${rgb.b * 100}%)`;
			return `rgb(${rgb.r * 100}% ${rgb.g * 100}% ${rgb.b * 100}% / ${(rgb.opacity ?? 1) * 100}%)`;
		default: throw new Error(`Unknown unit: ${rgb.unit}`);
	}
}
function toLibrary$1(rgb) {
	const abs = to8bit$1(rgb);
	return {
		r: abs.r,
		g: abs.g,
		b: abs.b,
		alpha: abs.opacity
	};
}
function fromLibrary$1(rgb, parsingOptions = {}) {
	if (parsingOptions.scalar) return {
		r: rgb.r / 255,
		g: rgb.g / 255,
		b: rgb.b / 255,
		opacity: rgb.alpha ?? 1,
		unit: `scalar`,
		space: `srgb`
	};
	else return {
		r: rgb.r,
		g: rgb.g,
		b: rgb.b,
		opacity: rgb.alpha ?? 255,
		unit: `8bit`,
		space: `srgb`
	};
}
function to8bit$1(rgbOrString) {
	if (typeof rgbOrString === `string`) return fromCss$2(rgbOrString, { scalar: false });
	if (isHsl(rgbOrString)) return to8bit$1(fromLibrary$1(toLibraryRgb(rgbOrString), { scalar: false }));
	guard$3(rgbOrString);
	if (rgbOrString.unit === `8bit`) return rgbOrString;
	return {
		r: rgbOrString.r * 255,
		g: rgbOrString.g * 255,
		b: rgbOrString.b * 255,
		opacity: (rgbOrString.opacity ?? 1) * 255,
		unit: `8bit`,
		space: `srgb`
	};
}
function toScalar$2(rgbOrString) {
	if (typeof rgbOrString === `string`) return fromCss$2(rgbOrString, { scalar: true });
	if (isHsl(rgbOrString)) return toScalar$2(fromLibrary$1(toLibraryRgb(rgbOrString), { scalar: true }));
	guard$3(rgbOrString);
	if (rgbOrString.unit === `scalar`) return rgbOrString;
	return {
		r: rgbOrString.r / 255,
		g: rgbOrString.g / 255,
		b: rgbOrString.b / 255,
		opacity: (rgbOrString.opacity ?? 1) / 255,
		unit: `scalar`,
		space: `srgb`
	};
}
function guard$3(rgb) {
	const { r, g, b, opacity, space, unit } = rgb;
	if (space !== `srgb`) throw new Error(`Space is expected to be 'srgb'. Got: ${space}`);
	if (unit === `8bit`) resultThrow(numberInclusiveRangeTest(r, 0, 255, `r`), numberInclusiveRangeTest(g, 0, 255, `g`), numberInclusiveRangeTest(b, 0, 255, `b`), () => {
		if (typeof opacity === `number`) return numberInclusiveRangeTest(opacity, 0, 255, `opacity`);
	});
	else if (unit === `scalar`) resultThrow(numberTest(r, `percentage`, `r`), numberTest(g, `percentage`, `g`), numberTest(b, `percentage`, `b`), () => {
		if (typeof opacity === `number`) return numberTest(opacity, `percentage`, `opacity`);
	});
	else throw new Error(`Unit is expected to be '8bit' or 'scalar'. Got: ${unit}`);
}
/**
* Sets the lightness value.
*
* Amount to change:
* 'fixed': a fixed amount
* 'delta': increase/decrease by this amount
* 'pdelta': proportion of current value to change by ('percentage delta')
*
* Use negative values to decrease
* @param rgb Colour
* @param amount Amount to change
*/
function changeLightness(rgb, amount) {
	let newL = 0;
	const co = new Colorizr(toCssString$1(rgb));
	const scalarUnit = rgb.unit === `scalar`;
	if (typeof amount.pdelta !== `undefined`) newL = co.oklab.l + co.oklab.l * amount.pdelta;
	else if (typeof amount.delta !== `undefined`) newL = co.oklab.l + amount.delta;
	else if (typeof amount.fixed !== `undefined`) {
		if (amount.fixed < 0) throw new TypeError(`Amount cannot be negative when using 'fixed'`);
		newL = amount.fixed;
	} else throw new TypeError(`Parameter 'amount' is missing 'pdelta/delta/fixed' properties`);
	if (newL < 0) newL = 0;
	else if (newL > 1) newL = 1;
	return fromLibrary$1(oklab2rgb({
		a: co.oklab.a,
		b: co.oklab.b,
		l: newL,
		alpha: co.oklab.alpha
	}), { scalar: scalarUnit });
}
/**
* Returns a lightness value (0..1) for an RGB input
*
* Calculates lightness by converting to Oklab and using the 'L' value
* @param rgb
*/
function lightness(rgb) {
	return new Colorizr(toCssString$1(rgb)).oklab.l;
}
/**
* Creates a Rgb8Bit value from 8bit (0..255) values
* @param red
* @param green
* @param blue
* @param opacity
*/
function eightBit$1(red = 100, green = 100, blue = 100, opacity = 255) {
	const rgb = {
		unit: `8bit`,
		space: `srgb`,
		r: red,
		g: green,
		b: blue,
		opacity
	};
	guard$3(rgb);
	return rgb;
}
/**
* Creates a RgbScalar value from scalar (0..1) values
* @param red
* @param green
* @param blue
* @param opacity
*/
function scalar$2(red = .5, green = .5, blue = .5, opacity = 1) {
	const rgb = {
		unit: `scalar`,
		space: `srgb`,
		r: red,
		g: green,
		b: blue,
		opacity
	};
	guard$3(rgb);
	return rgb;
}
/**
* It seems Colorizr can't handle % values properly :'(
* @param value
*/
function parseCssRgbFunction(value) {
	if (value.startsWith(`rgba`)) throw new Error(`RGBA is not supported`);
	if (!value.startsWith(`rgb(`)) throw new Error(`Expected rgb(..) CSS colour`);
	const start = value.indexOf(`(`);
	const end = value.indexOf(`)`);
	if (end < start) throw new Error(`Is rgb() not terminated? Missing ')'`);
	let split = value.substring(start + 1, end).split(/[\s,]+/);
	if (split.length < 3) throw new Error(`Expected three tokens. Got: ${split.length} length`);
	let relativeCount = 0;
	for (const s of split) if (s.endsWith(`%`)) relativeCount++;
	const valueAsScalar = (v, pos) => {
		if (v.endsWith(`%`)) return Number.parseFloat(v.substring(0, v.length - 1)) / 100;
		if (pos < 3) return Number.parseFloat(v) / 255;
		else return Number.parseFloat(v);
	};
	const valueAs8bit = (v, pos) => {
		if (v.endsWith(`%`)) return Number.parseFloat(v.substring(0, v.length - 1)) / 100 * 255;
		if (pos < 3) return Number.parseFloat(v);
		else return Number.parseFloat(v) * 255;
	};
	if (split.length > 3) {
		if (split[3] === `/`) split = [
			split[0],
			split[1],
			split[2],
			split[4]
		];
	}
	if (relativeCount > 1) return scalar$2(valueAsScalar(split[0], 0), valueAsScalar(split[1], 1), valueAsScalar(split[2], 2), valueAsScalar(split[3] ?? `1`, 3));
	else return eightBit$1(valueAs8bit(split[0], 0), valueAs8bit(split[1], 1), valueAs8bit(split[2], 2), valueAs8bit(split[3] ?? `1`, 3));
}
/**
* Interpolates colours in Srgb space. Probably
* really ugly, use OkLch space isntead.
*
* ```js
* const i = interpolator(`red`, `blue`);
* i(0.5); // Get 50% between these colours
* ```
* @param colourA
* @param colourB
*/
function interpolator$2(colourA, colourB) {
	const aa = toScalar$2(colourA);
	const bb = toScalar$2(colourB);
	const aOpacity = aa.opacity ?? 1;
	const opacityDistance = (bb.opacity ?? 1) - aOpacity;
	const r = bb.r - aa.r;
	const g = bb.g - aa.g;
	const b = bb.b - aa.b;
	return (amount) => {
		amount = clamp$1(amount);
		return scalar$2(aa.r + interpolate(amount, 0, r), aa.g + interpolate(amount, 0, g), aa.b + interpolate(amount, 0, b), aOpacity + interpolate(amount, 0, opacityDistance));
	};
}
/**
* Converts a Rgb structure (or CSS string) to Colorizr's HSL format
* @param rgb
*/
function toLibraryHsl(rgb) {
	if (typeof rgb === `string`) return toLibraryHsl(fromCss$2(rgb, { scalar: false }));
	rgb = to8bit$1(rgb);
	return {
		...rgb2hsl({
			r: rgb.r,
			g: rgb.g,
			b: rgb.b
		}),
		alpha: (rgb.opacity ?? 255) / 255
	};
}

//#endregion
//#region ../packages/visual/src/colour/oklch.ts
var oklch_exports = /* @__PURE__ */ __exportAll({
	OKLCH_CHROMA_MAX: () => OKLCH_CHROMA_MAX,
	absolute: () => absolute,
	fromCss: () => fromCss$1,
	fromHexString: () => fromHexString$1,
	fromLibrary: () => fromLibrary,
	generateScalar: () => generateScalar,
	guard: () => guard$2,
	interpolator: () => interpolator$1,
	scalar: () => scalar$1,
	toAbsolute: () => toAbsolute,
	toCssString: () => toCssString,
	toHexString: () => toHexString$1,
	toScalar: () => toScalar$1,
	withOpacity: () => withOpacity$1
});
const OKLCH_CHROMA_MAX = .4;
function guard$2(lch) {
	const { l, c, h, opacity, space, unit } = lch;
	if (space !== `oklch`) throw new Error(`Space is expected to be 'oklch'. Got: ${space}`);
	if (unit === `absolute`) resultThrow(percentTest(l, `l`), () => {
		if (typeof c === `number`) return numberInclusiveRangeTest(c, 0, OKLCH_CHROMA_MAX, `c`);
	}, () => {
		if (typeof h === `number`) return numberInclusiveRangeTest(h, 0, 360, `h`);
	}, percentTest(opacity ?? 1, `opacity`));
	else if (unit === `scalar`) resultThrow(percentTest(l, `l`), percentTest(c, `c`), percentTest(h, `h`), percentTest(lch.opacity ?? 1, `opacity`));
	else throw new Error(`Unit is expected to be 'absolute' or 'scalar'. Got: ${unit}`);
}
function fromLibrary(lch, parsingOptions = {}) {
	if (typeof lch === `undefined` || lch === null) {
		if (parsingOptions.fallbackColour) return parsingOptions.fallbackColour;
	}
	const scalarReturn = parsingOptions.scalar ?? true;
	resultThrow(percentTest(lch.l, `l`), percentTest(lch.c, `c`), numberInclusiveRangeTest(lch.h, 0, 360, `h`), percentTest(lch.alpha ?? 1, `alpha`));
	if (scalarReturn) return scalar$1(lch.l, lch.c / OKLCH_CHROMA_MAX, lch.h / 360, lch.alpha ?? 1);
	else return absolute(lch.l, lch.c, lch.h, lch.alpha ?? 1);
}
/**
* Parse a HEX-formatted colour into OkLch structured format
* @param hexString
* @param options
*/
function fromHexString$1(hexString, options = {}) {
	return fromLibrary(hex2oklch(hexString), options);
}
const oklchTransparent = Object.freeze({
	l: 0,
	c: 0,
	h: 0,
	opacity: 0,
	unit: `absolute`,
	space: `oklch`
});
function fromCss$1(value, options = {}) {
	value = value.toLowerCase();
	if (value.startsWith(`#`)) return fromHexString$1(value, options);
	if (value === `transparent`) return oklchTransparent;
	if (typeof cssDefinedHexColours[value] !== `undefined`) return fromHexString$1(cssDefinedHexColours[value], options);
	if (value.startsWith(`rgb(`)) {
		const rgb = to8bit$1(parseCssRgbFunction(value));
		return fromLibrary(rgb2oklch({
			r: rgb.r,
			g: rgb.g,
			b: rgb.b
		}), options);
	}
	if (!value.startsWith(`hsl(`) && !value.startsWith(`oklch(`)) try {
		value = convert$1(value, `oklch`);
	} catch (error) {
		if (options.fallbackString) value = options.fallbackString;
		else throw error;
	}
	const lch = new Colorizr(value).oklch;
	return fromLibrary(lch, options);
}
/**
* Returns a string or {@link OkLch} value to absolute form.
*
* This means ranges are:
* lightness: 0..1
* chroma: 0...CHROMA_MAX (0.4)
* hue: 0..360
* @param lchOrString
*/
function toAbsolute(lchOrString) {
	if (typeof lchOrString === `string`) return toAbsolute(fromCss$1(lchOrString, { scalar: true }));
	guard$2(lchOrString);
	if (lchOrString.unit === `absolute`) return lchOrString;
	return {
		space: `oklch`,
		unit: `absolute`,
		l: lchOrString.l,
		c: lchOrString.c * OKLCH_CHROMA_MAX,
		h: lchOrString.h * 360,
		opacity: lchOrString.opacity
	};
}
function toScalar$1(lchOrString) {
	if (typeof lchOrString === `string`) return toScalar$1(fromCss$1(lchOrString, { scalar: true }));
	const lch = lchOrString;
	guard$2(lch);
	if (lch.unit === `scalar`) return lch;
	return {
		l: lch.l,
		c: lch.c / OKLCH_CHROMA_MAX,
		h: lch.h / 360,
		opacity: lch.opacity ?? 1,
		unit: `scalar`,
		space: `oklch`
	};
}
function toLibrary(lch) {
	const abs = toAbsolute(lch);
	return {
		l: abs.l,
		c: abs.c,
		h: abs.h,
		alpha: abs.opacity
	};
}
/**
* Returns the colour as a CSS colour string: `oklch(l c h / opacity)`.
*
* @param lch Colour
* @param precision Set precision of numbers, defaults to 3
* @returns CSS colour string
*/
function toCssString(lch, precision = 3) {
	guard$2(lch);
	const { l, c, h, opacity } = lch;
	let css = ``;
	switch (lch.unit) {
		case `absolute`:
			css = `oklch(${(l * 100).toFixed(precision)}% ${c.toFixed(precision)} ${h.toFixed(precision)}`;
			break;
		case `scalar`:
			css = `oklch(${l.toFixed(precision)} ${(c * OKLCH_CHROMA_MAX).toFixed(precision)} ${(h * 360).toFixed(precision)}`;
			break;
	}
	if (typeof opacity !== `undefined` && opacity !== 1) css += ` / ${opacity.toFixed(precision)}`;
	css += `)`;
	return css;
}
function toHexString$1(lch) {
	const lch1 = toLibrary(lch);
	return libraryRgbToHexString(oklch2rgb(lch1));
}
function generateScalar(absoluteHslOrVariable, chroma = 1, lightness = .5, opacity = 1) {
	if (typeof absoluteHslOrVariable === `string`) {
		if (absoluteHslOrVariable.startsWith(`--`)) absoluteHslOrVariable = getComputedStyle(document.body).getPropertyValue(absoluteHslOrVariable).trim();
	}
	if (lightness > 1) throw new TypeError(`Param 'lightness' must be between 0..1`);
	if (chroma > 1) throw new TypeError(`Param 'chroma' must be between 0..1`);
	const hueDeg = angleConvert(angleParse(absoluteHslOrVariable), `deg`).value / 360;
	if (opacity > 1) throw new TypeError(`Param 'opacity' must be between 0..1`);
	return {
		l: lightness,
		c: chroma,
		h: hueDeg,
		opacity,
		unit: `scalar`,
		space: `oklch`
	};
}
/**
* Scales the opacity value of an input Oklch value
* ```js
* withOpacity()
* ```
* @param value
* @param fn
*/
function withOpacity$1(value, fn) {
	switch (value.unit) {
		case `absolute`: return {
			...value,
			opacity: fn((value.opacity ?? 100) / 100, value) * 100
		};
		case `scalar`: return {
			...value,
			opacity: fn(value.opacity ?? 1, value)
		};
	}
}
function interpolator$1(a, b, direction = `shorter`) {
	a = toScalar$1(a);
	b = toScalar$1(b);
	const aOpacity = a.opacity ?? 1;
	const distanceCalc = calculateHueDistance(a.h, b.h, 1);
	const hueDistance = direction === `longer` ? distanceCalc.long : distanceCalc.short;
	const chromaDistance = b.c - a.c;
	const lightDistance = b.l - a.l;
	const opacityDistance = (b.opacity ?? 1) - aOpacity;
	return (amount) => {
		amount = clamp$1(amount);
		let h = interpolate(amount, 0, Math.abs(hueDistance));
		if (hueDistance < 0) h = a.h - h;
		else h = a.h + h;
		const c = interpolate(amount, 0, chromaDistance);
		const l = interpolate(amount, 0, lightDistance);
		const o = interpolate(amount, 0, opacityDistance);
		return scalar$1(l + a.l, c + a.c, wrapScalarHue(h), o + aOpacity);
	};
}
function scalar$1(lightness = .7, chroma = .1, hue = .5, opacity = 1) {
	const lch = {
		unit: `scalar`,
		space: `oklch`,
		l: lightness,
		c: chroma,
		h: hue,
		opacity
	};
	guard$2(lch);
	return lch;
}
/**
* Create an LCH colour using absolute hue
* @param l Lightness 0..1
* @param c Chroma 0..4
* @param h Hue 0..360
* @param opacity
*/
function absolute(l, c, h, opacity = 1) {
	const lch = {
		space: `oklch`,
		unit: `absolute`,
		opacity,
		l,
		c,
		h
	};
	guard$2(lch);
	return lch;
}

//#endregion
//#region ../packages/visual/src/colour/css-colours.ts
/**
* Converts from some kind of colour that is legal in CSS
* into a structured Colour type.
* 
* Handles: hex format, CSS variables, colour names
* ```js
* fromCssColour(`#ffffff`);
* fromCssColour(`blue`);
* fromCssColour(`--some-variable`);
* fromCssColour(`hsl(50, 50%, 50%)`);
* fromCssColour(`rgb(50, 100, 100)`);
* ```
* @param colour 
* @returns 
*/
const fromCssColour = (colour) => {
	if (colour.startsWith(`#`)) return fromHexString$2(colour, true);
	if (colour.startsWith(`--`)) {
		const fromCss = getComputedStyle(document.body).getPropertyValue(colour).trim();
		if (fromCss.length === 0 || fromCss === null) throw new Error(`Variable missing: ${colour}`);
		return fromCssColour(fromCss);
	}
	const colourLower = colour.toLowerCase();
	if (typeof cssDefinedHexColours[colourLower] !== `undefined`) return fromHexString$2(cssDefinedHexColours[colourLower], true);
	if (colourLower.startsWith(`hsl(`)) return fromCss$3(colour, { scalar: true });
	if (colourLower.startsWith(`rgb(`)) return fromCss$2(colour, { scalar: true });
	if (colourLower.startsWith(`oklch(`)) return fromCss$1(colour, { scalar: true });
	throw new Error(`String colour is not a hex colour, CSS variable nor well-defined colour. Input: '${colour}'`);
};
/**
* Resolves a named colour or CSS variable to a colour string.
* Doesn't do conversion or parsing.
* 
* ```js
* resolveCss(`red`);
* resolveCss(`my-var`);
* ```
* @param colour Colour
* @param fallback Fallback if CSS variable is missing
* @returns 
*/
function resolveCss(colour, fallback) {
	if (colour.startsWith(`--`)) {
		const fromCss = getComputedStyle(document.body).getPropertyValue(colour).trim();
		if (fromCss.length === 0 || fromCss === null) {
			if (typeof fallback !== `undefined`) return fallback;
			throw new Error(`CSS variable missing: '${colour}'`);
		}
		return resolveCss(fromCss);
	}
	if (typeof cssDefinedHexColours[colour] !== `undefined`) return cssDefinedHexColours[colour];
	return colour;
}
const cssDefinedHexColours = Object.freeze({
	"aliceblue": "#f0f8ff",
	"antiquewhite": "#faebd7",
	"aqua": "#00ffff",
	"aquamarine": "#7fffd4",
	"azure": "#f0ffff",
	"beige": "#f5f5dc",
	"bisque": "#ffe4c4",
	"black": "#000000",
	"blanchedalmond": "#ffebcd",
	"blue": "#0000ff",
	"blueviolet": "#8a2be2",
	"brown": "#a52a2a",
	"burlywood": "#deb887",
	"cadetblue": "#5f9ea0",
	"chartreuse": "#7fff00",
	"chocolate": "#d2691e",
	"coral": "#ff7f50",
	"cornflowerblue": "#6495ed",
	"cornsilk": "#fff8dc",
	"crimson": "#dc143c",
	"cyan": "#00ffff",
	"darkblue": "#00008b",
	"darkcyan": "#008b8b",
	"darkgoldenrod": "#b8860b",
	"darkgray": "#a9a9a9",
	"darkgreen": "#006400",
	"darkkhaki": "#bdb76b",
	"darkmagenta": "#8b008b",
	"darkolivegreen": "#556b2f",
	"darkorange": "#ff8c00",
	"darkorchid": "#9932cc",
	"darkred": "#8b0000",
	"darksalmon": "#e9967a",
	"darkseagreen": "#8fbc8f",
	"darkslateblue": "#483d8b",
	"darkslategray": "#2f4f4f",
	"darkturquoise": "#00ced1",
	"darkviolet": "#9400d3",
	"deeppink": "#ff1493",
	"deepskyblue": "#00bfff",
	"dimgray": "#696969",
	"dodgerblue": "#1e90ff",
	"firebrick": "#b22222",
	"floralwhite": "#fffaf0",
	"forestgreen": "#228b22",
	"fuchsia": "#ff00ff",
	"gainsboro": "#dcdcdc",
	"ghostwhite": "#f8f8ff",
	"gold": "#ffd700",
	"goldenrod": "#daa520",
	"gray": "#808080",
	"green": "#008000",
	"greenyellow": "#adff2f",
	"honeydew": "#f0fff0",
	"hotpink": "#ff69b4",
	"indianred": "#cd5c5c",
	"indigo": "#4b0082",
	"ivory": "#fffff0",
	"khaki": "#f0e68c",
	"lavender": "#e6e6fa",
	"lavenderblush": "#fff0f5",
	"lawngreen": "#7cfc00",
	"lemonchiffon": "#fffacd",
	"lightblue": "#add8e6",
	"lightcoral": "#f08080",
	"lightcyan": "#e0ffff",
	"lightgoldenrodyellow": "#fafad2",
	"lightgray": "#d3d3d3",
	"lightgreen": "#90ee90",
	"lightpink": "#ffb6c1",
	"lightsalmon": "#ffa07a",
	"lightseagreen": "#20b2aa",
	"lightskyblue": "#87cefa",
	"lightslategray": "#778899",
	"lightsteelblue": "#b0c4de",
	"lightyellow": "#ffffe0",
	"lime": "#00ff00",
	"limegreen": "#32cd32",
	"linen": "#faf0e6",
	"magenta": "#ff00ff",
	"maroon": "#800000",
	"mediumaquamarine": "#66cdaa",
	"mediumblue": "#0000cd",
	"mediumorchid": "#ba55d3",
	"mediumpurple": "#9370db",
	"mediumseagreen": "#3cb371",
	"mediumslateblue": "#7b68ee",
	"mediumspringgreen": "#00fa9a",
	"mediumturquoise": "#48d1cc",
	"mediumvioletred": "#c71585",
	"midnightblue": "#191970",
	"mintcream": "#f5fffa",
	"mistyrose": "#ffe4e1",
	"moccasin": "#ffe4b5",
	"navajowhite": "#ffdead",
	"navy": "#000080",
	"oldlace": "#fdf5e6",
	"olive": "#808000",
	"olivedrab": "#6b8e23",
	"orange": "#ffa500",
	"orangered": "#ff4500",
	"orchid": "#da70d6",
	"palegoldenrod": "#eee8aa",
	"palegreen": "#98fb98",
	"paleturquoise": "#afeeee",
	"palevioletred": "#db7093",
	"papayawhip": "#ffefd5",
	"peachpuff": "#ffdab9",
	"peru": "#cd853f",
	"pink": "#ffc0cb",
	"plum": "#dda0dd",
	"powderblue": "#b0e0e6",
	"purple": "#800080",
	"rebeccapurple": "#663399",
	"red": "#ff0000",
	"rosybrown": "#bc8f8f",
	"royalblue": "#4169e1",
	"saddlebrown": "#8b4513",
	"salmon": "#fa8072",
	"sandybrown": "#f4a460",
	"seagreen": "#2e8b57",
	"seashell": "#fff5ee",
	"sienna": "#a0522d",
	"silver": "#c0c0c0",
	"skyblue": "#87ceeb",
	"slateblue": "#6a5acd",
	"slategray": "#708090",
	"snow": "#fffafa",
	"springgreen": "#00ff7f",
	"steelblue": "#4682b4",
	"tan": "#d2b48c",
	"teal": "#008080",
	"thistle": "#d8bfd8",
	"tomato": "#ff6347",
	"turquoise": "#40e0d0",
	"violet": "#ee82ee",
	"wheat": "#f5deb3",
	"white": "#ffffff",
	"whitesmoke": "#f5f5f5",
	"yellow": "#ffff00",
	"yellowgreen": "#9acd32",
	"transparent": "#00000000"
});

//#endregion
//#region ../packages/visual/src/colour/conversion.ts
/**
* Converts an object or string representation of colour to ixfx's
* structured colour.
* Use {@link convertToString} if you want a CSS colour string instead.
* @param colour
* @param destination
*/
function convert(colour, destination) {
	if (destination === `hsl-scalar`) {
		if (typeof colour === `string` || isHsl(colour) || isRgb(colour)) return toScalar$3(colour);
	} else if (destination === `hsl-absolute`) {
		if (typeof colour === `string` || isHsl(colour)) return toAbsolute$1(colour);
	} else if (destination === `oklch-scalar`) {
		if (typeof colour === `string` || isOkLch(colour)) return toScalar$1(colour);
	} else if (destination === `oklch-absolute`) {
		if (typeof colour === `string` || isOkLch(colour)) return toAbsolute(colour);
	} else if (destination === `srgb-8bit`) {
		if (typeof colour === `string` || isRgb(colour)) return to8bit$1(colour);
	} else if (destination === `srgb-scalar`) {
		if (typeof colour === `string` || isRgb(colour)) return toScalar$2(colour);
	} else throw new Error(`Destination '${destination}' not supported for input: ${JSON.stringify(colour)}`);
	return convert(toCssColour(colour), destination);
}
/**
* Like {@link convert}, but result is a CSS colour string
* @param colour
* @param destination
*/
function convertToString(colour, destination) {
	return toCssColour(convert(colour, destination));
}
/**
* Converts some kind of colour into a scalar representation. Supports oklch, hsl and srgb.
* @param colour Colour to convert
* @param destination Destination colour format
*/
function convertScalar(colour, destination) {
	if (destination === `oklch`) return convert(colour, `oklch-scalar`);
	if (destination === `srgb`) return convert(colour, `srgb-scalar`);
	if (destination === `hsl`) return convert(colour, `hsl-scalar`);
	throw new Error(`Unknown destination: '${destination}'`);
}
function toCssColour(colour) {
	if (typeof colour === `string`) return colour;
	if (isHsl(colour)) return toCssString$2(colour);
	if (isRgb(colour)) return toCssString$1(colour);
	if (isOkLch(colour)) return toCssString(colour);
	const asRgb = tryParseObjectToRgb(colour);
	if (asRgb) return toCssString$1(asRgb);
	const asHsl = tryParseObjectToHsl(colour);
	if (asHsl) return toCssString$2(asHsl);
	const asOkLch = tryParseObjectToOkLch(colour);
	if (asOkLch) return toCssString(asOkLch);
	throw new Error(`Unknown colour format: '${JSON.stringify(colour)}'`);
}
function toHexColour(colour) {
	if (isHsl(colour)) return toHexString$3(colour);
	if (isRgb(colour)) return toHexString$2(colour);
	if (isOkLch(colour)) return toHexString$1(colour);
	if (typeof colour === `string`) {
		if (colour.startsWith(`#`)) return colour;
		const c = convert(colour, `srgb-8bit`);
		return toHexString$2(c);
	}
	const asRgb = tryParseObjectToRgb(colour);
	if (asRgb) return toHexString$2(asRgb);
	const asHsl = tryParseObjectToHsl(colour);
	if (asHsl) return toHexString$3(asHsl);
	throw new Error(`Unknown colour format: '${JSON.stringify(colour)}'`);
}
function toLibraryColour(colour) {
	return new Colorizr(toCssColour(colour));
}
function guard$1(colour) {
	switch (colour.space) {
		case `hsl`:
			guard$4(colour);
			break;
		case `srgb`:
			guard$3(colour);
			break;
		case `oklch`:
			guard$2(colour);
			break;
		default: throw new Error(`Unsupported colour space: '${colour.space}'`);
	}
}
function toColour(colourish) {
	if (!isColourish(colourish)) throw new Error(`Could not parse input. Expected CSS colour string or structured colour {r,g,b}, {h,s,l} etc. Got: ${JSON.stringify(colourish)}`);
	let c;
	if (typeof colourish === `string`) c = fromCssColour(colourish);
	else c = colourish;
	if (c === void 0) throw new Error(`Could not parse input. Expected CSS colour string or structured colour {r,g,b}, {h,s,l} etc.`);
	guard$1(c);
	return c;
}
/**
* Returns a CSS-ready string
* representation.
* ```js
* element.style.backgroundColor = resolveToString(`red`);
* ```
*
* Tries each parameter in turn, returning the value
* for the first that resolves. This can be useful for
* having fallback values.
*
* ```js
* // Try a CSS variable, a object property or finally fallback to red.
* element.style.backgroundColor = toStringFirst('--some-var', opts.background, `red`);
* ```
* @param colours Array of colours to resolve
*/
function toStringFirst(...colours) {
	for (const colour of colours) {
		if (colour === void 0) continue;
		if (colour === null) continue;
		try {
			return toCssColour(toColour(colour));
		} catch {}
	}
	return `rebeccapurple`;
}
function rgbToHsl(rgb, scalarResult) {
	let { r, g, b } = rgb;
	const opacity = rgb.opacity ?? 1;
	if (rgb.unit === `8bit`) {
		r /= 255;
		g /= 255;
		b /= 255;
	}
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h = (max + min) / 2;
	let s = h;
	const l = h;
	if (max === min) if (scalarResult) return scalar$3(0, 0, 0, opacity);
	else return absolute$1(0, 0, 0, opacity);
	const d = max - min;
	s = l >= .5 ? d / (2 - (max + min)) : d / (max + min);
	switch (max) {
		case r:
			h = ((g - b) / d + 0) * 60;
			break;
		case g:
			h = ((b - r) / d + 2) * 60;
			break;
		case b:
			h = ((r - g) / d + 4) * 60;
			break;
	}
	if (scalarResult) return scalar$3(h / 360, s, l, opacity);
	else return absolute$1(h, s * 100, l * 100, opacity);
}

//#endregion
//#region ../packages/visual/src/colour/generate.ts
/**
* Returns a full HSL colour string (eg `hsl(20,50%,75%)`) based on a index.
* It's useful for generating perceptually different shades as the index increments.
*
* ```
* el.style.backgroundColor = goldenAgeColour(10);
* ```
*
* Saturation and lightness can be specified, as numeric ranges of 0-1.
*
* @param saturation Saturation (0-1), defaults to 0.5
* @param lightness Lightness (0-1), defaults to 0.75
* @param alpha Opacity (0-1), defaults to 1.0
* @returns HSL colour string eg `hsl(20,50%,75%)`
*/
function goldenAngleColour(index, saturation = .5, lightness = .75, alpha = 1) {
	resultThrow(numberTest(index, `positive`, `index`), numberTest(saturation, `percentage`, `saturation`), numberTest(lightness, `percentage`, `lightness`), numberTest(alpha, `percentage`, `alpha`));
	return toCssString$2(scalar$3(index * 137.508 % 360 / 360, saturation, lightness, alpha));
}
/**
* Returns a random hue component (0..359)
*
* ```
* // Generate hue
* const h = randomHue(); // 0-359
*
* // Generate hue and assign as part of a HSL string
* el.style.backgroundColor = `hsl(${randomHue(), 50%, 75%})`;
* ```
* @param rand
* @returns Random hue in angle degrees
*/
const randomHue = (rand = Math.random) => Math.floor(rand() * 360);

//#endregion
//#region ../packages/visual/src/colour/interpolate.ts
/**
* Returns a function to interpolate between colours, with results as a structured {@link Colour} object.
* ```js
* const i = interpolator([`orange`, `yellow`, `red`]);
*
* // Get a random colour on the above spectrum
* i(Math.random());
* ```
*
* Results will vary depending on the colour space used, play with the options.
* When using a hue-based colour space, the `hue` option sets the logic for how hue values wrap.
*
* ```js
* interpolator([`orange`, `yellow`, `red`], { space: `hsl`, hue: `longer })
* ```
*
* Example: Draw the interpolation as a spectrum on a canvas, where each pixel is one step
* ```js
* let v = 0;
* let incrementBy = 0.01;
* while (v <= 1) {
*  // Get colour at this interpolation point 0..1
*  const colour = fn(v);
*  // Convert to a CSS string
*  ctx.fillStyle = Colour.toCssColour(colour);
*  // Draw a 1px wide rect, and shuffle along to the next x position
*  ctx.fillRect(x, y, 1, h);
*  x += 1;
*  v += incrementBy;
* }
* ```
* @param colours Colours to interpolate between
* @param opts Options for interpolation
* @returns Function that interpolates based on an amount, returning a structured Colour
*/
function interpolator(colours, opts = {}) {
	const direction = opts.direction ?? `shorter`;
	const destination = opts.destination ?? `oklch-scalar`;
	const space = opts.space ?? `oklch`;
	const ranges = interpolateInit(colours, space);
	const rangeInterpolators = ranges.map((range) => interpolatorDual(range[0], range[1], {
		space,
		direction,
		destination
	}));
	const asTargetDestination = colours.map((c) => convert(c, destination));
	return (amt) => {
		if (amt >= 1) return asTargetDestination.at(-1);
		if (amt <= 0) return asTargetDestination.at(0);
		const s = scaleClamped(amt, 0, 1, 0, ranges.length);
		const index = Math.floor(s);
		const amtAdjusted = s - index;
		const ri = rangeInterpolators[index];
		return ri(amtAdjusted);
	};
}
/**
* Returns a set of pairwise colours, convert to the destination colour space in scalar form
* @param colours
* @param destination
* @returns Array of pairwise colours, converted to destination scalar
*/
function interpolateInit(colours, destination = `hsl`) {
	if (!Array.isArray(colours)) throw new Error(`Param 'colours' is not an array as expected. Got: ${typeof colours}`);
	if (colours.length < 2) throw new Error(`Param 'colours' should be at least two in length. Got: ${colours.length}`);
	return [...pairwise(colours.map((colour) => convertScalar(colour, destination)))];
}
/**
* Returns a CSS `linear-gradient` with stops corresponding to the given list of `colours`.
* ```js
* element.style.background = Colour.cssLinearGradient(['red','green','blue']);
* ```
* @param colours
* @returns A 'linear-gradient' string for use in CSS, eg for background.
*/
function cssLinearGradient(colours) {
	return `linear-gradient(to right, ${colours.map((c) => toCssColour(c)).join(`, `)})`;
}
/**
* Returns a function that interpolates between two colours. Returns string colour values.
* If you want the result as a structured colour, use {@link interpolatorDual} instead.
*
* By default takes a shorter direction and uses the OkLCH colourspace.
* ```js
* const i = interpolator(`blue`, `red`);
* i(0.5); // Get the colour at 50%, as a string.
* ```
*
* To work with structured colour values, use one of the space's `interpolate` functions.
*
* If you want to create discrete steps, consider {@link createSteps} or {@link scale}.
*
* @param colourA First colour
* @param colourB Second colour
* @param options Interpolation options. By default uses shorter direction and OkLCH colour space.
*/
function interpolatorDualToString(colourA, colourB, options = {}) {
	const f = interpolatorDual(colourA, colourB, options);
	return (amount) => toCssColour(f(amount));
}
/**
* Returns a function that interpolates between two colours. Returns structured colour values.
* If you want the result as a ready-to-use CSS string, use {@link interpolatorDualToString} instead.
*
* By default takes a shorter direction and uses the OkLCH colourspace.
* ```js
* const i = interpolator(`blue`, `red`);
* i(0.5); // Get the colour at 50%, as a Colour structure.
* ```
*
* If you want to create discrete steps, consider {@link createSteps} or {@link scale}.
* @param colourA First colour
* @param colourB Second colour
* @param options Interpolation options. By default uses shorter direction and OkLCH colour space.
* @returns Function that interpolates between two colours, returning a structured Colour
*/
function interpolatorDual(colourA, colourB, options = {}) {
	const space = options.space ?? `oklch`;
	const direction = options.direction ?? `shorter`;
	const destination = options.destination ?? `oklch-scalar`;
	let inter;
	switch (space) {
		case `hsl`: {
			const hslInter = interpolator$3(convert(colourA, `hsl-scalar`), convert(colourB, `hsl-scalar`), direction);
			inter = (amount) => {
				return convert(hslInter(amount), destination);
			};
			break;
		}
		case `srgb`: {
			const srgbInter = interpolator$2(convert(colourA, `srgb-scalar`), convert(colourB, `srgb-scalar`));
			inter = (amount) => {
				return convert(srgbInter(amount), destination);
			};
			break;
		}
		default: {
			const oklchInter = interpolator$1(convert(colourA, `oklch-scalar`), convert(colourB, `oklch-scalar`), direction);
			inter = (amount) => {
				return convert(oklchInter(amount), destination);
			};
		}
	}
	return (amount) => inter(amount);
}
/**
* Produces a stepped scale of colours.
*
* Builds off {@link createSteps} which can only step between two colours.
*
* ```js
* // A scale of from red to green, with three colours in-between
* const steps = Colour.scale([ `red`, `green` ], { stepsBetween: 3 });
* for (const step of steps) {
*  // A CSS colour string
* }
* ```
*
* {@link cssLinearGradient} can produce a smooth gradient in CSS on the basis
* of the stepped colours.
* @param colours
* @param opts
* @returns Array of colours in string form
*/
function scale(colours, opts = {}) {
	const direction = opts.direction ?? `shorter`;
	const space = opts.space ?? `oklch`;
	const pieces = interpolateInit(colours, space);
	let stepsBetween = 0;
	if (typeof opts.stepsBetween === `number`) {
		stepsBetween = opts.stepsBetween;
		if (stepsBetween < 1) throw new Error(`Param 'stepsBetween' must be at least 1`);
	} else if (typeof opts.stepsTotal === `number`) {
		if (opts.stepsTotal <= colours.length) throw new Error(`Param 'stepsTotal' must be greater than number of provided colour stops (${colours.length}) +1 per stop`);
		const totalSteps = opts.stepsTotal - colours.length;
		stepsBetween = Math.floor(totalSteps / pieces.length);
	}
	const steps = pieces.map((piece) => {
		const pieceSteps = createSteps(piece[0], piece[1], {
			steps: stepsBetween,
			space,
			direction,
			exclusive: true
		});
		pieceSteps.push(piece[1]);
		return pieceSteps;
	});
	const firstPiece = pieces[0];
	steps.unshift([firstPiece[0]]);
	return steps.flat().map((c) => toCssColour(c));
}
function createSteps(a, b, options = {}) {
	const exclusive = options.exclusive ?? false;
	const steps = options.steps ?? 5;
	const space = options.space ?? `oklch`;
	const direction = options.direction ?? `shorter`;
	if (!exclusive && steps < 2) throw new Error(`Param 'steps' should be at least 2 when 'exclusive' is false`);
	if (exclusive && steps < 1) throw new Error(`Param 'steps' should be at least 1 when 'exlusive' is true`);
	const aa = convertScalar(a, space);
	const bb = convertScalar(b, space);
	let inter;
	switch (space) {
		case `hsl`:
			inter = interpolator$3(aa, bb, direction);
			break;
		case `oklch`:
			inter = interpolator$1(aa, bb, direction);
			break;
		case `srgb`:
			inter = interpolator$2(aa, bb);
			break;
		default: throw new Error(`Colour space '${space}' not supported for interpolation.`);
	}
	if (!inter) throw new Error(`Could not create interpolator for space: ${space}`);
	let stepBy = 0;
	let startAt = 0;
	let endAt = 1;
	if (exclusive) {
		stepBy = 1 / (steps + 1);
		startAt = stepBy;
		endAt = 1 - stepBy;
	} else stepBy = 1 / (steps - 1);
	const results = [];
	for (let interpolateAmount = startAt; interpolateAmount <= endAt; interpolateAmount += stepBy) results.push(inter(interpolateAmount));
	return results;
}

//#endregion
//#region ../packages/visual/src/colour/math.ts
/**
* Multiplies the opacity of a colour by `amount`, returning a computed CSS colour.
*
* ```js
* multiplyOpacity(`red`, 0.5); // Returns a colour string
* ```
*
* For example, to half the opacity, use `amount: 0.5`.
* Clamps the result to ensure it's between 0..1
* @param colourish Colour
* @param amount Amount
*/
function multiplyOpacity(colourish, amount) {
	return withOpacity(colourish, (o) => clamp$1(o * amount));
}
/**
* Does a computation with the opacity of a colour, returning colour.
*
* Passes operation to `HslSpace` or `SrgbSpace` depending on space of `colourish`.
* @param colourish Colour
* @param fn Function that takes original opacity as input and returns output opacity
*/
function withOpacity(colourish, fn) {
	const colour = toColour(colourish);
	let result;
	switch (colour.space) {
		case `hsl`:
			result = withOpacity$3(colour, fn);
			break;
		case `srgb`:
			result = withOpacity$2(colour, fn);
			break;
		case `oklch`:
			result = withOpacity$1(colour, fn);
			break;
		default: throw new Error(`Unknown space: '${colour.space}'. Expected hsl, srgb, oklch`);
	}
	if (!result) throw new Error(`Is colour in correct form?`);
	if (typeof colourish === `string`) return toCssColour(result);
	return result;
}
function setOpacity(colourish, opacity) {
	const colour = toColour(colourish);
	colour.opacity = opacity;
	if (typeof colourish === `string`) return toCssColour(colour);
	return colour;
}

//#endregion
//#region ../packages/visual/src/colour/to-integer.ts
/**
* Encode 8-bit RGB values into a 24-bit value (0...16_777_215)
* 
* Assumes RGB values are within 0..255 range
* @param rgb 
* @returns 
*/
function encodeRgbTo24Bit(rgb) {
	return rgb.r << 16 | rgb.g << 8 | rgb.b;
}
/**
* Decode a 24-bit number (0...16_777_215) into 8-bit RGB
* @param colour 
* @returns 
*/
function decodeRgbFrom24Bit(colour) {
	if (colour > 16777215) throw new TypeError(`Param 'colour' is out of range. Expected max value of 16_777_215, got ${colour}`);
	return {
		r: colour >> 16 & 255,
		g: colour >> 8 & 255,
		b: colour & 255,
		unit: `8bit`,
		space: `srgb`
	};
}
/**
* Encodes 8-bit RGB value into 16-bit RGB565 (0..65_535)
* 5-bit are used for R & B channels, 6 bits for G
* 
* Read more: https://rgbcolorpicker.com/565
* @param rgb 
* @returns 
*/
function encodeRgbTo16Bit565(rgb) {
	const r = rgb.r >> 3 & 31;
	const g = rgb.g >> 2 & 63;
	const b = rgb.b >> 3 & 31;
	return r << 11 | g << 5 | b;
}
/**
* Decodes 8-bit RGB value from a 16-bit RGB565 value (0...65_535)
* Read more: https://rgbcolorpicker.com/565
* @param colour 
* @returns 
*/
function decodeRgbFrom16Bit565(colour) {
	if (colour > 65535) throw new TypeError(`Param 'colour' is out of range. Expected max: 65_535. Got: ${colour}`);
	return {
		r: (colour >> 11 & 31) << 3,
		g: (colour >> 5 & 63) << 2,
		b: (colour & 31) << 3,
		unit: `8bit`,
		space: `srgb`
	};
}

//#endregion
//#region ../packages/visual/src/colour/ycbcr.ts
var ycbcr_exports = /* @__PURE__ */ __exportAll({
	eightBit: () => eightBit,
	fromCss: () => fromCss,
	fromHexString: () => fromHexString,
	fromSrgTo8bit: () => fromSrgTo8bit,
	guard: () => guard,
	scalar: () => scalar,
	to8bit: () => to8bit,
	toHexString: () => toHexString,
	toScalar: () => toScalar,
	toSrgb8bit: () => toSrgb8bit
});
/**
* Creates a YCbCr8bit value from 8bit (0..255) values
* @param y Luma 0..255
* @param cb Chroma blue 0..255
* @param cr Chroma red 0..255
* @param opacity 0..255
* @returns YCbCr8bit
*/
function eightBit(y = 100, cb = 100, cr = 100, opacity = 255) {
	const rgb = {
		unit: `8bit`,
		space: `ycbcr`,
		y,
		cb,
		cr,
		opacity
	};
	guard(rgb);
	return rgb;
}
/**
* Creates a YCbCr8bit value from scalar (0..1) values
* @param y Luma 0..1
* @param cb Chroma blue 0..1
* @param cr Chroma red 0..1
* @param opacity 0..1
* @returns YCbCrScalar
*/
function scalar(y = .5, cb = .5, cr = .5, opacity = 1) {
	const rgb = {
		unit: `scalar`,
		space: `ycbcr`,
		y,
		cb,
		cr,
		opacity
	};
	guard(rgb);
	return rgb;
}
/**
* Converts from scalar or 8bit RGB to YCbCr8bit
* @param rgb
* @returns
*/
function fromSrgTo8bit(rgb) {
	const { r, g, b, opacity } = to8bit$1(rgb);
	return eightBit(.299 * r + .587 * g + .114 * b + 0, -.169 * r + -.331 * g + .5 * b + 128, .5 * r + -.419 * g + -.081 * b + 128, opacity);
}
function toSrgb8bit(ycbcr) {
	const { y, cb, cr, opacity } = to8bit(ycbcr);
	return {
		unit: `8bit`,
		space: `srgb`,
		r: 1 * y + 0 * (cb - 128) + 1.4 * (cr - 128),
		g: 1 * y + -.343 * (cb - 128) + -.711 * (cr - 128),
		b: 1 * y + 1.765 * (cb - 128) + 0 * (cr - 128),
		opacity
	};
}
/**
* Returns a YCbCr8bit format from either scalar or 8bit.
* If the input is already 8bit, it is returned as-is.
* @param ycbcr 8bit or scalar YCbCr value
* @returns YCbCr8bit
*/
function to8bit(ycbcr) {
	guard(ycbcr);
	if (ycbcr.unit === `8bit`) return ycbcr;
	const { y, cb, cr, opacity } = ycbcr;
	return eightBit(y * 255, cb * 255, cr * 255, typeof opacity === `number` ? opacity * 255 : 255);
}
function fromHexString(hexString, options = {}) {
	return fromSrgTo8bit(fromHexString$2(hexString, false));
}
function fromCss(value, options = {}) {
	const scalar = options.scalar ?? false;
	const rgb = fromCss$2(value, {
		fallbackString: options.fallbackString,
		scalar: false,
		ensureSafe: options.ensureSafe
	});
	if (scalar) return toScalar(fromSrgTo8bit(rgb));
	else return fromSrgTo8bit(rgb);
}
function toScalar(colour) {
	if (typeof colour === `string`) return fromCss(colour, { scalar: true });
	if (isHsl(colour) || isRgb(colour)) return toScalar(fromSrgTo8bit(toScalar$2(colour)));
	guard(colour);
	if (colour.unit === `scalar`) return colour;
	const { y, cb, cr, opacity } = colour;
	return scalar(y / 255, cb / 255, cr / 255, typeof opacity === `number` ? opacity / 255 : 1);
}
function guard(rgb) {
	const { y, cb, cr, opacity, space, unit } = rgb;
	if (space !== `ycbcr`) throw new Error(`Space is expected to be 'ycbcr'. Got: ${space}`);
	if (unit === `8bit`) resultThrow(numberInclusiveRangeTest(y, 0, 255, `y`), numberInclusiveRangeTest(cb, 0, 255, `cb`), numberInclusiveRangeTest(cr, 0, 255, `cr`), () => {
		if (typeof opacity === `number`) return numberInclusiveRangeTest(opacity, 0, 255, `opacity`);
	});
	else if (unit === `scalar`) resultThrow(numberTest(y, `percentage`, `y`), numberTest(cb, `percentage`, `cb`), numberTest(cr, `percentage`, `cr`), () => {
		if (typeof opacity === `number`) return numberTest(opacity, `percentage`, `opacity`);
	});
	else throw new Error(`Unit is expected to be '8bit' or 'scalar'. Got: ${unit}`);
}
/**
* Converts a YCbCr colour to a RGB hex string.
* @param ycbcr
* @returns
*/
function toHexString(ycbcr) {
	return toHexString$2(toSrgb8bit(ycbcr));
}

//#endregion
//#region ../packages/visual/src/colour/index.ts
var colour_exports = /* @__PURE__ */ __exportAll({
	HslSpace: () => hsl_exports,
	OklchSpace: () => oklch_exports,
	SrgbSpace: () => srgb_exports,
	YCbCrSpace: () => ycbcr_exports,
	convert: () => convert,
	convertScalar: () => convertScalar,
	convertToString: () => convertToString,
	createSteps: () => createSteps,
	cssDefinedHexColours: () => cssDefinedHexColours,
	cssLinearGradient: () => cssLinearGradient,
	decodeRgbFrom16Bit565: () => decodeRgbFrom16Bit565,
	decodeRgbFrom24Bit: () => decodeRgbFrom24Bit,
	encodeRgbTo16Bit565: () => encodeRgbTo16Bit565,
	encodeRgbTo24Bit: () => encodeRgbTo24Bit,
	fromCssColour: () => fromCssColour,
	goldenAngleColour: () => goldenAngleColour,
	guard: () => guard$1,
	interpolator: () => interpolator,
	interpolatorDual: () => interpolatorDual,
	interpolatorDualToString: () => interpolatorDualToString,
	isColourish: () => isColourish,
	isHsl: () => isHsl,
	isOkLch: () => isOkLch,
	isRgb: () => isRgb,
	multiplyOpacity: () => multiplyOpacity,
	randomHue: () => randomHue,
	resolveCss: () => resolveCss,
	rgbToHsl: () => rgbToHsl,
	scale: () => scale,
	setOpacity: () => setOpacity,
	toColour: () => toColour,
	toCssColour: () => toCssColour,
	toHexColour: () => toHexColour,
	toLibraryColour: () => toLibraryColour,
	toStringFirst: () => toStringFirst,
	tryParseObjectToHsl: () => tryParseObjectToHsl,
	tryParseObjectToOkLch: () => tryParseObjectToOkLch,
	tryParseObjectToRgb: () => tryParseObjectToRgb,
	withOpacity: () => withOpacity
});

//#endregion
//#region ../packages/visual/src/drawing.ts
var drawing_exports = /* @__PURE__ */ __exportAll({
	arc: () => arc,
	bezier: () => bezier,
	circle: () => circle$1,
	connectedPoints: () => connectedPoints,
	copyToImg: () => copyToImg,
	dot: () => dot,
	drawingStack: () => drawingStack,
	ellipse: () => ellipse,
	getContext: () => getContext,
	line: () => line$1,
	lineThroughPoints: () => lineThroughPoints,
	makeHelper: () => makeHelper$1,
	paths: () => paths,
	pointLabels: () => pointLabels,
	polarRay: () => polarRay,
	rect: () => rect,
	textBlock: () => textBlock,
	textBlockAligned: () => textBlockAligned,
	textHeight: () => textHeight,
	textRect: () => textRect,
	textWidth: () => textWidth,
	translatePoint: () => translatePoint,
	triangle: () => triangle
});
const PIPI = Math.PI * 2;
/**
* Gets a 2d drawing context from canvas element or query, or throws an error
* @param canvasElementContextOrQuery Canvas element reference or DOM query
* @returns Drawing context.
*/
const getContext = (canvasElementContextOrQuery) => {
	if (canvasElementContextOrQuery === null) throw new Error(`canvasElCtxOrQuery null. Must be a 2d drawing context or Canvas element`);
	if (canvasElementContextOrQuery === void 0) throw new Error(`canvasElCtxOrQuery undefined. Must be a 2d drawing context or Canvas element`);
	const ctx = canvasElementContextOrQuery instanceof CanvasRenderingContext2D ? canvasElementContextOrQuery : canvasElementContextOrQuery instanceof HTMLCanvasElement ? canvasElementContextOrQuery.getContext(`2d`) : typeof canvasElementContextOrQuery === `string` ? resolveEl(canvasElementContextOrQuery).getContext(`2d`) : canvasElementContextOrQuery;
	if (ctx === null) throw new Error(`Could not create 2d context for canvas`);
	return ctx;
};
/**
* Makes a helper object that wraps together a bunch of drawing functions that all use the same drawing context
* @param ctxOrCanvasEl Drawing context or canvs element reference
* @param canvasBounds Bounds of drawing (optional). Used for limiting `textBlock`
* @returns
*/
const makeHelper$1 = (ctxOrCanvasEl, canvasBounds) => {
	const ctx = getContext(ctxOrCanvasEl);
	return {
		ctx,
		paths(pathsToDraw, opts) {
			paths(ctx, pathsToDraw, opts);
		},
		polarRay(rayToDraw, opts) {
			polarRay(ctx, rayToDraw, opts);
		},
		line(lineToDraw, opts) {
			line$1(ctx, lineToDraw, opts);
		},
		rect(rectsToDraw, opts) {
			rect(ctx, rectsToDraw, opts);
		},
		bezier(bezierToDraw, opts) {
			bezier(ctx, bezierToDraw, opts);
		},
		connectedPoints(pointsToDraw, opts) {
			connectedPoints(ctx, pointsToDraw, opts);
		},
		pointLabels(pointsToDraw, opts) {
			pointLabels(ctx, pointsToDraw, opts);
		},
		dot(dotPosition, opts) {
			dot(ctx, dotPosition, opts);
		},
		circle(circlesToDraw, opts) {
			circle$1(ctx, circlesToDraw, opts);
		},
		arc(arcsToDraw, opts) {
			arc(ctx, arcsToDraw, opts);
		},
		textBlock(lines, opts) {
			if (opts.bounds === void 0 && canvasBounds !== void 0) opts = {
				...opts,
				bounds: {
					...canvasBounds,
					x: 0,
					y: 0
				}
			};
			textBlock(ctx, lines, opts);
		}
	};
};
/**
* Creates a drawing op to apply provided options
* @param opts Drawing options that apply
* @returns Stack
*/
const optsOp = (opts) => coloringOp(opts.strokeStyle, opts.fillStyle);
/**
* Applies drawing options to `ctx`, returning a {@link DrawingStack}
* @param ctx Context
* @param opts Options
* @returns
*/
const applyOpts$1 = (ctx, opts = {}, ...additionalOps) => {
	if (ctx === void 0) throw new Error(`ctx undefined`);
	const stack = drawingStack(ctx).push(optsOp(opts), ...additionalOps);
	stack.apply();
	return stack;
};
/**
* Draws one or more arcs.
* @param ctx
* @param arcs
* @param opts
*/
const arc = (ctx, arcs, opts = {}) => {
	applyOpts$1(ctx, opts);
	const draw = (arc) => {
		ctx.beginPath();
		ctx.arc(arc.x, arc.y, arc.radius, arc.startRadian, arc.endRadian);
		ctx.stroke();
	};
	const arcsArray = Array.isArray(arcs) ? arcs : [arcs];
	for (const arc of arcsArray) draw(arc);
};
/**
* Colouring drawing op. Applies `fillStyle` and `strokeStyle`
* @param strokeStyle
* @param fillStyle
* @returns
*/
const coloringOp = (strokeStyle, fillStyle) => {
	const apply = (ctx) => {
		if (fillStyle) ctx.fillStyle = fillStyle;
		if (strokeStyle) ctx.strokeStyle = strokeStyle;
	};
	return apply;
};
const lineOp = (lineWidth, lineJoin, lineCap) => {
	const apply = (ctx) => {
		if (lineWidth) ctx.lineWidth = lineWidth;
		if (lineJoin) ctx.lineJoin = lineJoin;
		if (lineCap) ctx.lineCap = lineCap;
	};
	return apply;
};
/**
* Creates and returns an immutable drawing stack for a context
* @param ctx Context
* @param stk Initial stack operations
* @returns
*/
const drawingStack = (ctx, stk) => {
	stk ??= new StackImmutable();
	const push = (...ops) => {
		stk ??= new StackImmutable();
		const s = stk.push(...ops);
		for (const o of ops) o(ctx);
		return drawingStack(ctx, s);
	};
	const pop = () => {
		const s = stk?.pop();
		return drawingStack(ctx, s);
	};
	const apply = () => {
		if (stk === void 0) return drawingStack(ctx);
		for (const op of stk.data) op(ctx);
		return drawingStack(ctx, stk);
	};
	return {
		push,
		pop,
		apply
	};
};
/**
* Draws a curved line through a set of points
* @param ctx 
* @param points 
* @param opts 
*/
const lineThroughPoints = (ctx, points, opts) => {
	applyOpts$1(ctx, opts);
	ctx.moveTo(points[0].x, points[0].y);
	for (const [index, p] of points.entries()) {
		if (index + 2 >= points.length) continue;
		const pNext = points[index + 1];
		const mid = {
			x: (p.x + pNext.x) / 2,
			y: (p.y + pNext.y) / 2
		};
		const cpX1 = (mid.x + p.x) / 2;
		const cpX2 = (mid.x + pNext.x) / 2;
		ctx.quadraticCurveTo(cpX1, pNext.y, mid.x, mid.y);
		ctx.quadraticCurveTo(cpX2, pNext.y, pNext.x, pNext.y);
	}
};
/**
* Draws one or more circles. Will draw outline/fill depending on
* whether `strokeStyle` or `fillStyle` params are present in the drawing options.
*
* ```js
* // Draw a circle with radius of 10 at 0,0
* circle(ctx, {radius:10});
*
* // Draw a circle of radius 10 at 100,100
* circle(ctx, {radius: 10, x: 100, y: 100});
*
* // Draw two blue outlined circles
* circle(ctx, [ {radius: 5}, {radius: 10} ], {strokeStyle:`blue`});
* ```
* @param ctx Drawing context
* @param circlesToDraw Circle(s) to draw
* @param opts Drawing options
*/
const circle$1 = (ctx, circlesToDraw, opts = {}) => {
	applyOpts$1(ctx, opts);
	const draw = (c) => {
		ctx.beginPath();
		ctx.arc(c.x, c.y, c.radius, 0, PIPI);
		if (opts.strokeStyle) ctx.stroke();
		if (opts.fillStyle) ctx.fill();
	};
	if (Array.isArray(circlesToDraw)) for (const c of circlesToDraw) draw(c);
	else draw(circlesToDraw);
};
/**
* Draws one or more ellipses. Will draw outline/fill depending on
* whether `strokeStyle` or `fillStyle` params are present in the drawing options.
* @param ctx
* @param ellipsesToDraw
* @param opts
*/
const ellipse = (ctx, ellipsesToDraw, opts = {}) => {
	applyOpts$1(ctx, opts);
	const draw = (ellipse) => {
		ctx.beginPath();
		const rotation = ellipse.rotation ?? 0;
		const startAngle = ellipse.startAngle ?? 0;
		const endAngle = ellipse.endAngle ?? PIPI;
		ctx.ellipse(ellipse.x, ellipse.y, ellipse.radiusX, ellipse.radiusY, rotation, startAngle, endAngle);
		if (opts.strokeStyle) ctx.stroke();
		if (opts.fillStyle) ctx.fill();
	};
	const ellipsesArray = Array.isArray(ellipsesToDraw) ? ellipsesToDraw : [ellipsesToDraw];
	for (const ellipse of ellipsesArray) draw(ellipse);
};
/**
* Draws one or more paths.
* supported paths are quadratic beziers and lines.
* @param ctx
* @param pathsToDraw
* @param opts
*/
const paths = (ctx, pathsToDraw, opts = {}) => {
	applyOpts$1(ctx, opts);
	const draw = (path) => {
		if (isQuadraticBezier(path)) quadraticBezier(ctx, path, opts);
		else if (isLine(path)) line$1(ctx, path, opts);
		else throw new Error(`Unknown path type ${JSON.stringify(path)}`);
	};
	if (Array.isArray(pathsToDraw)) for (const p of pathsToDraw) draw(p);
	else draw(pathsToDraw);
};
/**
* Draws a line between all the given points.
* If a fillStyle is specified, it will be filled.
*
* See also:
* * {@link line}: Draw one or more lines
*
* @param ctx
* @param pts
*/
const connectedPoints = (ctx, pts, opts = {}) => {
	const shouldLoop = opts.loop ?? false;
	resultThrow(arrayTest(pts, `pts`));
	if (pts.length === 0) return;
	for (const [index, pt] of pts.entries()) guard$5(pt, `Index ${index}`);
	applyOpts$1(ctx, opts);
	if (opts.lineWidth) ctx.lineWidth = opts.lineWidth;
	ctx.beginPath();
	ctx.moveTo(pts[0].x, pts[0].y);
	for (const pt of pts) ctx.lineTo(pt.x, pt.y);
	if (shouldLoop) ctx.lineTo(pts[0].x, pts[0].y);
	if (opts.strokeStyle || opts.strokeStyle === void 0 && opts.fillStyle === void 0) ctx.stroke();
	if (opts.fillStyle) ctx.fill();
};
/**
* Draws labels for a set of points
* @param ctx
* @param pts Points to draw
* @param opts
* @param labels Labels for points
*/
const pointLabels = (ctx, pts, opts = {}, labels) => {
	if (pts.length === 0) return;
	for (const [index, pt] of pts.entries()) guard$5(pt, `Index ${index}`);
	applyOpts$1(ctx, opts);
	for (const [index, pt] of pts.entries()) {
		const label = labels !== void 0 && index < labels.length ? labels[index] : index.toString();
		ctx.fillText(label.toString(), pt.x, pt.y);
	}
};
/**
* Returns `point` with the canvas's translation matrix applied
* @param ctx
* @param point
* @returns
*/
const translatePoint = (ctx, point) => {
	const m = ctx.getTransform();
	return {
		x: point.x * m.a + point.y * m.c + m.e,
		y: point.x * m.b + point.y * m.d + m.f
	};
};
/**
* Creates a new HTML IMG element with a snapshot of the
* canvas. Element will need to be inserted into the document.
*
* ```
* const myCanvas = document.getElementById('someCanvas');
* const el = copyToImg(myCanvas);
* document.getElementById('images').appendChild(el);
* ```
* @param canvasEl
* @returns
*/
const copyToImg = (canvasEl) => {
	const img = document.createElement(`img`);
	img.src = canvasEl.toDataURL(`image/jpeg`);
	return img;
};
/**
* Draws filled circle(s) at provided point(s)
* @param ctx
* @param pos
* @param opts
*/
const dot = (ctx, pos, opts) => {
	opts ??= {};
	const radius = opts.radius ?? 10;
	const positions = Array.isArray(pos) ? pos : [pos];
	const stroke = opts.stroke ?? opts.strokeStyle !== void 0;
	let filled = opts.filled ?? opts.fillStyle !== void 0;
	if (!stroke && !filled) filled = true;
	applyOpts$1(ctx, opts);
	for (const pos of positions) {
		ctx.beginPath();
		if (`radius` in pos) ctx.arc(pos.x, pos.y, pos.radius, 0, 2 * Math.PI);
		else ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
		if (filled) ctx.fill();
		if (stroke) ctx.stroke();
	}
};
/**
* Draws a cubic or quadratic bezier
* @param ctx
* @param bezierToDraw
* @param opts
*/
const bezier = (ctx, bezierToDraw, opts) => {
	if (isQuadraticBezier(bezierToDraw)) quadraticBezier(ctx, bezierToDraw, opts);
	else if (isCubicBezier(bezierToDraw)) cubicBezier(ctx, bezierToDraw, opts);
};
const cubicBezier = (ctx, bezierToDraw, opts = {}) => {
	let stack = applyOpts$1(ctx, opts);
	const { a, b, cubic1, cubic2 } = bezierToDraw;
	const isDebug = opts.debug ?? false;
	if (isDebug) {}
	ctx.beginPath();
	ctx.moveTo(a.x, a.y);
	ctx.bezierCurveTo(cubic1.x, cubic1.y, cubic2.x, cubic2.y, b.x, b.y);
	ctx.stroke();
	if (isDebug) {
		stack = stack.push(optsOp({
			...opts,
			strokeStyle: multiplyOpacity(opts.strokeStyle ?? `silver`, .6),
			fillStyle: multiplyOpacity(opts.fillStyle ?? `yellow`, .4)
		}));
		stack.apply();
		ctx.moveTo(a.x, a.y);
		ctx.lineTo(cubic1.x, cubic1.y);
		ctx.stroke();
		ctx.moveTo(b.x, b.y);
		ctx.lineTo(cubic2.x, cubic2.y);
		ctx.stroke();
		ctx.fillText(`a`, a.x + 5, a.y);
		ctx.fillText(`b`, b.x + 5, b.y);
		ctx.fillText(`c1`, cubic1.x + 5, cubic1.y);
		ctx.fillText(`c2`, cubic2.x + 5, cubic2.y);
		dot(ctx, cubic1, { radius: 3 });
		dot(ctx, cubic2, { radius: 3 });
		dot(ctx, a, { radius: 3 });
		dot(ctx, b, { radius: 3 });
		stack = stack.pop();
		stack.apply();
	}
};
const quadraticBezier = (ctx, bezierToDraw, opts = {}) => {
	const { a, b, quadratic } = bezierToDraw;
	const isDebug = opts.debug ?? false;
	let stack = applyOpts$1(ctx, opts);
	ctx.beginPath();
	ctx.moveTo(a.x, a.y);
	ctx.quadraticCurveTo(quadratic.x, quadratic.y, b.x, b.y);
	ctx.stroke();
	if (isDebug) {
		stack = stack.push(optsOp({
			...opts,
			strokeStyle: multiplyOpacity(opts.strokeStyle ?? `silver`, .6),
			fillStyle: multiplyOpacity(opts.fillStyle ?? `yellow`, .4)
		}));
		connectedPoints(ctx, [
			a,
			quadratic,
			b
		]);
		ctx.fillText(`a`, a.x + 5, a.y);
		ctx.fillText(`b`, b.x + 5, b.y);
		ctx.fillText(`h`, quadratic.x + 5, quadratic.y);
		dot(ctx, quadratic, { radius: 3 });
		dot(ctx, a, { radius: 3 });
		dot(ctx, b, { radius: 3 });
		stack = stack.pop();
		stack.apply();
	}
};
/**
* Draws one or more polar rays.
*
* Each ray is drawn independently, ie it's not assumed rays are connected.
*
* See also:
* * {@link connectedPoints}: Draw a series of connected points
* @param ctx
* @param toDraw
* @param opts
*/
const polarRay = (ctx, toDraw, opts = {}) => {
	const rays = Array.isArray(toDraw) ? toDraw : [toDraw];
	line$1(ctx, toCartesian(rays), opts);
};
/**
* Draws one or more lines.
*
* Each line is drawn independently, ie it's not assumed lines are connected.
*
* See also:
* * {@link connectedPoints}: Draw a series of connected points
* @param ctx
* @param toDraw
* @param opts
*/
const line$1 = (ctx, toDraw, opts = {}) => {
	const isDebug = opts.debug ?? false;
	applyOpts$1(ctx, opts, lineOp(opts.lineWidth, opts.lineJoin, opts.lineCap));
	const draw = (d) => {
		const { a, b } = d;
		ctx.beginPath();
		ctx.moveTo(a.x, a.y);
		ctx.lineTo(b.x, b.y);
		if (isDebug) {
			ctx.fillText(`a`, a.x, a.y);
			ctx.fillText(`b`, b.x, b.y);
			dot(ctx, a, {
				radius: 5,
				strokeStyle: `black`
			});
			dot(ctx, b, {
				radius: 5,
				strokeStyle: `black`
			});
		}
		ctx.stroke();
	};
	if (Array.isArray(toDraw)) for (const t of toDraw) draw(t);
	else draw(toDraw);
};
/**
* Draws one or more triangles
* @param ctx
* @param toDraw
* @param opts
*/
const triangle = (ctx, toDraw, opts = {}) => {
	applyOpts$1(ctx, opts);
	const draw = (t) => {
		connectedPoints(ctx, corners(t), {
			...opts,
			loop: true
		});
		if (opts.debug) pointLabels(ctx, corners(t), void 0, [
			`a`,
			`b`,
			`c`
		]);
	};
	if (Array.isArray(toDraw)) for (const t of toDraw) draw(t);
	else draw(toDraw);
};
/**
* Draws one or more rectangles.
* 
* @param ctx
* @param toDraw
* @param opts
*/
const rect = (ctx, toDraw, opts = {}) => {
	applyOpts$1(ctx, opts);
	const filled = opts.filled ?? (opts.fillStyle === void 0 ? false : true);
	const stroke = opts.stroke ?? (opts.strokeStyle === void 0 ? false : true);
	const draw = (d) => {
		const x = `x` in d ? d.x : 0;
		const y = `y` in d ? d.y : 0;
		if (filled) ctx.fillRect(x, y, d.width, d.height);
		if (stroke) {
			if (opts.strokeWidth) ctx.lineWidth = opts.strokeWidth;
			ctx.strokeRect(x, y, d.width, d.height);
		}
		if (opts.crossed) {
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(d.width, d.height);
			ctx.stroke();
			ctx.moveTo(0, d.height);
			ctx.lineTo(d.width, 0);
			ctx.stroke();
		}
		if (opts.debug) pointLabels(ctx, corners$1(d), void 0, [
			`NW`,
			`NE`,
			`SE`,
			`SW`
		]);
	};
	if (Array.isArray(toDraw)) for (const t of toDraw) draw(t);
	else draw(toDraw);
};
/**
* Returns the width of `text`. Rounds number up to nearest multiple if provided. If
* text is empty or undefined, 0 is returned.
* @param ctx
* @param text
* @param widthMultiple
* @returns
*/
const textWidth = (ctx, text, padding = 0, widthMultiple) => {
	return textRect(ctx, text, padding, widthMultiple).width;
};
const textRect = (ctx, text, padding = 0, widthMultiple) => {
	if (text === void 0 || text === null || text.length === 0) return Empty;
	const m = ctx.measureText(text);
	return {
		width: widthMultiple ? quantiseEvery(m.width, widthMultiple) + padding : m.width + padding,
		height: m.actualBoundingBoxAscent + m.actualBoundingBoxDescent + padding + padding
	};
};
const textHeight = (ctx, text, padding = 0) => {
	return textRect(ctx, text, padding).height;
};
/**
* Draws a block of text. Each array item is considered a line.
* @param ctx
* @param lines
* @param opts
*/
const textBlock = (ctx, lines, opts) => {
	applyOpts$1(ctx, opts);
	const anchorPadding = opts.anchorPadding ?? 0;
	const align = opts.align ?? `top`;
	const anchor = opts.anchor;
	const bounds = opts.bounds ?? {
		x: 0,
		y: 0,
		width: 1e6,
		height: 1e6
	};
	const blocks = lines.map((l) => ctx.measureText(l));
	const widths = blocks.map((tm) => tm.width);
	const heights = blocks.map((tm) => tm.actualBoundingBoxAscent + tm.actualBoundingBoxDescent + 3);
	const maxWidth = Math.max(...widths);
	const totalHeight = heights.reduce((accumulator, value) => accumulator + value, 0);
	let { x, y } = anchor;
	if (anchor.x + maxWidth > bounds.width) x = bounds.width - (maxWidth + anchorPadding);
	else x -= anchorPadding;
	if (x < bounds.x) x = bounds.x + anchorPadding;
	if (anchor.y + totalHeight > bounds.height) y = bounds.height - (totalHeight + anchorPadding);
	else y -= anchorPadding;
	if (y < bounds.y) y = bounds.y + anchorPadding;
	if (align === `top`) ctx.textBaseline = `top`;
	else ctx.textBaseline = `middle`;
	for (const [index, line] of lines.entries()) {
		ctx.fillText(line, x, y);
		y += heights[index];
	}
};
/**
* Draws an aligned text block
*/
const textBlockAligned = (ctx, text, opts) => {
	const { bounds } = opts;
	const { horiz = `left`, vert = `top` } = opts;
	const lines = typeof text === `string` ? [text] : text;
	applyOpts$1(ctx, opts);
	ctx.save();
	ctx.translate(bounds.x, bounds.y);
	ctx.textAlign = `left`;
	ctx.textBaseline = `top`;
	const middleX = bounds.width / 2;
	const middleY = bounds.height / 2;
	const blocks = lines.map((l) => ctx.measureText(l));
	const heights = blocks.map((tm) => tm.actualBoundingBoxAscent + tm.actualBoundingBoxDescent);
	const totalHeight = heights.reduce((accumulator, value) => accumulator + value, 0);
	let y = 0;
	if (vert === `center`) y = middleY - totalHeight / 2;
	else if (vert === `bottom`) y = bounds.height - totalHeight;
	for (const [index, line] of lines.entries()) {
		let x = 0;
		if (horiz === `center`) x = middleX - blocks[index].width / 2;
		else if (horiz === `right`) x = bounds.width - blocks[index].width;
		ctx.fillText(line, x, y);
		y += heights[index];
	}
	ctx.restore();
};

//#endregion
//#region ../packages/visual/src/image-data-grid.ts
var image_data_grid_exports = /* @__PURE__ */ __exportAll({
	accessor: () => accessor,
	byColumn: () => byColumn,
	byRow: () => byRow,
	grid: () => grid$1,
	setter: () => setter,
	wrap: () => wrap
});
/**
* Returns a {@link https://api.ixfx.fun/_ixfx/geometry/Grids/Grid/} based on the provided `image`
* @param image ImageData
* @returns Grid
*/
function grid$1(image) {
	return {
		rows: image.width,
		cols: image.height
	};
}
/**
* Returns an object that allows get/set grid semantics on the underlying `image` data.
* Uses 8-bit sRGB values, meaning 0..255 range for red, green, blue & opacity.
*
* ```js
* // Get CANVAS element, drawing context and then image data
* const canvasEl = document.querySelector(`#my-canvas`);
* const ctx = canvasEl.getContext(`2d`);
* const imageData = ctx.getImageData();
*
* // Now that we have image data, we can wrap it:
* const asGrid = ImageDataGrid.wrap(imageData);
* asGrid.get({ x:10, y: 20 }); // Get pixel at 10,20
* asGrid.set(colour, { x:10, y: 20 }); // Set pixel value
*
* // Display changes back on the canvas
* ctx.putImageData(imageData, 0, 0)
* ```
* @param image
*/
function wrap(image) {
	return {
		...grid$1(image),
		get: accessor(image),
		set: setter(image)
	};
}
/**
* Returns a function to access pixel values by x,y
* @param image
*/
function accessor(image) {
	const g = grid$1(image);
	const data = image.data;
	const fn = (cell, bounds = `undefined`) => {
		const index = indexFromCell(g, cell, bounds);
		if (index === void 0) return;
		const pxIndex = index * 4;
		return {
			r: data[pxIndex],
			g: data[pxIndex + 1],
			b: data[pxIndex + 2],
			opacity: data[pxIndex + 3],
			unit: `8bit`,
			space: `srgb`
		};
	};
	return fn;
}
/**
* Returns a function that sets pixel values
* @param image
*/
function setter(image) {
	const g = grid$1(image);
	const data = image.data;
	const fn = (value, cell, bounds = `undefined`) => {
		const index = indexFromCell(g, cell, bounds);
		if (index === void 0) throw new Error(`Cell out of range. ${cell.x},${cell.y}`);
		const pixel = to8bit$1(value);
		const pxIndex = index * 4;
		data[pxIndex] = pixel.r;
		data[pxIndex + 1] = pixel.g;
		data[pxIndex + 2] = pixel.b;
		data[pxIndex + 3] = pixel.opacity ?? 255;
	};
	return fn;
}
/**
* Yields pixels of an image row by row
* @param image
*/
function* byRow(image) {
	const a = accessor(image);
	const g = grid$1(image);
	const v = rows(g, {
		x: 0,
		y: 0
	});
	for (const row of v) yield row.map((p) => a(p, `undefined`));
}
/**
* Yields pixels of an image column by column
* @param image
*/
function* byColumn(image) {
	const a = accessor(image);
	const g = grid$1(image);
	for (let x = 0; x < g.cols; x++) {
		const col = [];
		for (let y = 0; y < g.rows; y++) {
			const p = a({
				x,
				y
			}, `undefined`);
			if (p) col.push(p);
		}
		yield col;
	}
}

//#endregion
//#region ../packages/visual/src/canvas-helper.ts
/**
* A wrapper for the CANVAS element that scales the canvas for high-DPI displays
* and helps with resizing.
* 
* ```js
* const canvas = new CanvasHelper(`#my-canvas`, { resizeLogic: `both` });
* const { ctx, width, height } = canvas.ctx; // Get drawing context, width & height
* ```
* 
* Draw whenever it is resized using the 'resize' event
* ```js
* canvas.addEventListener(`resize`, ({ctx, size}) => {
*  // Use ctx...  
* });
* ```
* 
* Or provide a function when initialising:
* ```js
* const onResize = (ctx, size) => {
*  // Do drawing
* }
* const canvas = new CanvasHelper(`#my-canvas`, { resizeLogic: `both`, onResize });
* ```
* 
* Automatically draw at animation speeds:
* ```js
* const draw = () => {
* }
* const canvas = new CanvasHelper(`#my-canvas`, { resizeLogic: `both`, draw });
* ```
*/
var CanvasHelper = class extends SimpleEventEmitter {
	el;
	opts;
	#scaler;
	#scalerSize;
	#viewport = EmptyPositioned;
	#logicalSize = Empty;
	#ctx;
	#drawHelper;
	#resizer;
	#disposed = false;
	constructor(domQueryOrEl, opts = {}) {
		super();
		if (!domQueryOrEl) throw new Error(`Param 'domQueryOrEl' is null or undefined. Expected canvas element.`);
		this.el = resolveEl(domQueryOrEl);
		if (this.el.nodeName !== `CANVAS`) throw new Error(`Expected CANVAS HTML element. Got: ${this.el.nodeName}`);
		const size = this.el.getBoundingClientRect();
		this.opts = {
			resizeLogic: opts.resizeLogic ?? `none`,
			disablePointerEvents: opts.disablePointerEvents ?? false,
			pixelZoom: opts.pixelZoom ?? (window.devicePixelRatio || 1),
			height: opts.height ?? size.height,
			width: opts.width ?? size.width,
			zIndex: opts.zIndex ?? -1,
			coordinateScale: opts.coordinateScale ?? `both`,
			onResizing: opts.onResizing,
			onResized: opts.onResized,
			clearOnResize: opts.clearOnResize ?? true,
			draw: opts.draw,
			skipCss: opts.skipCss ?? false,
			colourSpace: `srgb`
		};
		this.#scaler = scaler$1(`both`);
		this.#scalerSize = scaler$1(`both`, size);
		this.#init();
	}
	getRectangle() {
		return {
			x: 0,
			y: 0,
			...this.#logicalSize
		};
	}
	dispose(reason) {
		if (this.#disposed) return;
		this.#disposed = true;
		if (this.#resizer) {
			this.#resizer.dispose(`CanvasHelper disposing ${reason}`.trim());
			this.#resizer = void 0;
		}
	}
	#getContext(reset = false) {
		if (this.#ctx === void 0 || reset) {
			const ratio = this.ratio;
			const c = this.el.getContext(`2d`);
			if (c === null) throw new Error(`Could not create drawing context`);
			this.#ctx = c;
			c.setTransform(1, 0, 0, 1, 0, 0);
			c.scale(ratio, ratio);
		}
		return this.#ctx;
	}
	/**
	* Gets the drawable area of the canvas.
	* This accounts for scaling due to high-DPI displays etc.
	* @returns 
	*/
	getPhysicalSize() {
		return {
			width: this.width * this.ratio,
			height: this.height * this.ratio
		};
	}
	/**
	* Creates a drawing helper for the canvas.
	* If one is already created it is reused.
	*/
	getDrawHelper() {
		if (!this.#drawHelper) this.#drawHelper = makeHelper$1(this.#getContext(), {
			width: this.width,
			height: this.height
		});
		return this.#drawHelper;
	}
	setLogicalSize(logicalSize) {
		guard$6(logicalSize, `logicalSize`);
		const logicalSizeInteger = applyFields((v) => Math.floor(v), logicalSize);
		const ratio = this.opts.pixelZoom;
		this.#scaler = scaler$1(this.opts.coordinateScale, logicalSize);
		this.#scalerSize = scaler$1(`both`, logicalSize);
		const pixelScaled = multiplyScalar(logicalSize, ratio);
		this.el.width = pixelScaled.width;
		this.el.height = pixelScaled.height;
		this.el.style.width = logicalSizeInteger.width.toString() + `px`;
		this.el.style.height = logicalSizeInteger.height.toString() + `px`;
		this.#getContext(true);
		if (this.opts.clearOnResize) this.ctx.clearRect(0, 0, this.width, this.height);
		this.#logicalSize = logicalSizeInteger;
		if (this.opts.onResizing) this.opts.onResizing(this.ctx, this.size, this);
		this.fireEvent(`resize`, {
			ctx: this.ctx,
			size: this.#logicalSize,
			helper: this
		});
	}
	#init() {
		const d = this.opts.draw;
		if (d) {
			const sched = () => {
				d(this.ctx, this.#logicalSize, this);
				requestAnimationFrame(sched);
			};
			setTimeout(() => {
				sched();
			}, 100);
		}
		if (!this.opts.disablePointerEvents) this.#handleEvents();
		if ((this.opts.resizeLogic ?? `none`) === `none`) this.setLogicalSize({
			width: this.opts.width,
			height: this.opts.height
		});
		else {
			const resizerOptions = {
				onSizeChanging: (size) => {
					if (isEqual(this.#logicalSize, size)) return;
					this.setLogicalSize(size);
				},
				onSizeDone: (size, el) => {
					this.#onResizeDone(size);
				},
				containerEl: this.opts.containerEl,
				naturalSize: {
					width: this.opts.width,
					height: this.opts.height
				},
				stretch: this.opts.resizeLogic ?? `none`
			};
			this.#resizer = new ElementSizer(this.el, resizerOptions);
		}
		this.#getContext();
	}
	#onResizeDone(size) {
		if (this.opts.onResized) this.opts.onResized(this.ctx, this.size, this);
		this.fireEvent(`resized`, {
			ctx: this.ctx,
			size: this.#logicalSize,
			helper: this
		});
	}
	#handleEvents() {
		const handlePointerEvent = (event) => {
			const { offsetX, offsetY } = event;
			const physicalX = offsetX * this.ratio;
			const physicalY = offsetY * this.ratio;
			event = cloneFromFields(event);
			const eventData = {
				physicalX,
				physicalY,
				...event
			};
			switch (event.type) {
				case `pointerup`:
					this.fireEvent(`pointerup`, eventData);
					break;
				case `pointermove`:
					this.fireEvent(`pointermove`, eventData);
					break;
				case `pointerdown`:
					this.fireEvent(`pointerup`, eventData);
					break;
			}
		};
		this.el.addEventListener(`pointermove`, handlePointerEvent);
		this.el.addEventListener(`pointerdown`, handlePointerEvent);
		this.el.addEventListener(`pointerup`, handlePointerEvent);
	}
	/**
	* Clears the canvas.
	* 
	* Shortcut for:
	* `ctx.clearRect(0, 0, this.width, this.height)`
	*/
	clear() {
		if (!this.#ctx) return;
		this.#ctx.clearRect(0, 0, this.width, this.height);
	}
	/**
	* Fills the canvas with a given colour.
	* 
	* Shortcut for:
	* ```js
	* ctx.fillStyle = ``;
	* ctx.fillRect(0, 0, this.width, this.height);
	* ```
	* @param colour Colour
	*/
	fill(colour) {
		if (!this.#ctx) return;
		if (colour) this.#ctx.fillStyle = colour;
		this.#ctx.fillRect(0, 0, this.width, this.height);
	}
	/**
	* Gets the drawing context
	*/
	get ctx() {
		if (this.#ctx === void 0) throw new Error(`Context not available`);
		return this.#getContext();
	}
	get viewport() {
		return this.#viewport;
	}
	/**
	* Gets the logical width of the canvas
	* See also: {@link height}, {@link size}
	*/
	get width() {
		return this.#logicalSize.width;
	}
	/**
	* Gets the logical height of the canvas
	* See also: {@link width}, {@link size}
	*/
	get height() {
		return this.#logicalSize.height;
	}
	/**
	* Gets the logical size of the canvas
	* See also: {@link width}, {@link height}
	*/
	get size() {
		return this.#logicalSize;
	}
	/**
	* Gets the current scaling ratio being used
	* to compensate for high-DPI display
	*/
	get ratio() {
		return window.devicePixelRatio || 1;
	}
	/**
	* Returns the width or height, whichever is smallest
	*/
	get dimensionMin() {
		return Math.min(this.width, this.height);
	}
	/**
	* Returns the width or height, whichever is largest
	*/
	get dimensionMax() {
		return Math.max(this.width, this.height);
	}
	drawBounds(strokeStyle = `green`) {
		const ctx = this.#getContext();
		rect(ctx, {
			x: 0,
			y: 0,
			width: this.width,
			height: this.height
		}, {
			crossed: true,
			strokeStyle,
			strokeWidth: 1
		});
		rect(ctx, this.#viewport, {
			crossed: true,
			strokeStyle: `silver`,
			strokeWidth: 3
		});
	}
	/**
	* Returns a Scaler that converts from absolute
	* to relative coordinates.
	* This is based on the canvas size.
	* 
	* ```js
	* // Assuming a canvas of 800x500
	* toRelative({ x: 800, y: 600 });  // { x: 1,   y: 1 }
	* toRelative({ x: 0, y: 0 });   // { x: 0,   y: 0 }
	* toRelative({ x: 400, y: 300 }); // { x: 0.5, y: 0.5 }
	* ```
	*/
	get toRelative() {
		return this.#scaler.rel;
	}
	/**
	* Returns a scaler for points based on width & height
	*/
	get toAbsoluteFixed() {
		return this.#scalerSize.abs;
	}
	/**
	* Returns a scaler for points based on width & height
	*/
	get toRelativeFixed() {
		return this.#scalerSize.rel;
	}
	get logicalCenter() {
		return {
			x: this.#logicalSize.width / 2,
			y: this.#logicalSize.height / 2
		};
	}
	/**
	* Returns a Scaler that converts from relative to absolute
	* coordinates.
	* This is based on the canvas size.
	* 
	* ```js
	* // Assuming a canvas of 800x600
	* toAbsolute({ x: 1, y: 1 });      // { x: 800, y: 600}
	* toAbsolute({ x: 0, y: 0 });      // { x: 0, y: 0}
	* toAbsolute({ x: 0.5, y: 0.5 });  // { x: 400, y: 300}
	* ```
	*/
	get toAbsolute() {
		return this.#scaler.abs;
	}
	/**
	* Gets the center coordinate of the canvas
	*/
	get center() {
		return {
			x: this.width / 2,
			y: this.height / 2
		};
	}
	/**
	* Gets the image data for the canvas.
	* Uses the 'physical' canvas size. Eg. A logical size of 400x400 might be
	* 536x536 with a high-DPI display.
	* @returns 
	*/
	getImageData() {
		const size = this.getPhysicalSize();
		const data = this.ctx.getImageData(0, 0, size.width, size.height, { colorSpace: this.opts.colourSpace });
		if (data === null || data === void 0) throw new Error(`Could not get image data from context`);
		return data;
	}
	/**
	* Returns the canvas frame data as a writable grid.
	* When editing, make as many edits as needed before calling
	* `flip`, which writes buffer back to the canvas.
	* ```js
	* const g = helper.getWritableBuffer();
	* // Get {r,g,b,opacity} of pixel 10,10
	* const pixel = g.get({ x: 10, y: 10 });
	* 
	* // Set a colour to pixel 10,10
	* g.set({ r: 0.5, g: 1, b: 0, opacity: 0 }, { x: 10, y: 10 });
	* 
	* // Write buffer to canvas
	* g.flip();
	* ```
	* 
	* Uses 'physical' size of canvas. Eg with a high-DPI screen, this will
	* mean a higher number of rows and columns compared to the logical size.
	* @returns
	*/
	getWritableBuffer() {
		const ctx = this.ctx;
		const data = this.getImageData();
		const grid = grid$1(data);
		const get = accessor(data);
		const set = setter(data);
		const flip = () => {
			ctx.putImageData(data, 0, 0);
		};
		return {
			grid,
			get,
			set,
			flip
		};
	}
};

//#endregion
//#region ../packages/visual/src/pi-pi.ts
const piPi = Math.PI * 2;

//#endregion
//#region ../packages/visual/src/canvas-region.ts
/**
* Manges the drawing for a region of a canvas
*/
var CanvasSource = class {
	#canvasEl;
	#ctx;
	#sizeBasis;
	#sizeScaler;
	#logicalSize;
	#pixelScaling;
	#regions = [];
	constructor(canvasElementOrQuery, sizeBasis = `min`) {
		this.#canvasEl = resolveEl(canvasElementOrQuery);
		this.#sizeBasis = sizeBasis;
		this.#pixelScaling = window.devicePixelRatio || 1;
		this.#sizeScaler = this.#createSizeScaler();
		this.#logicalSize = this.setLogicalSize({
			width: this.#canvasEl.width,
			height: this.#canvasEl.height
		});
	}
	/**
	* Set logical size for region
	* @param size
	* @returns 
	*/
	setLogicalSize(size) {
		this.#logicalSize = size;
		const el = this.#canvasEl;
		el.width = size.width * this.#pixelScaling;
		el.height = size.height * this.#pixelScaling;
		el.style.width = `${size.width.toString()}px`;
		el.style.height = `${size.height.toString()}px`;
		this.#sizeScaler = this.#createSizeScaler();
		this.invalidateContext();
		return size;
	}
	#createSizeScaler() {
		let inMax = 1;
		switch (this.#sizeBasis) {
			case `min`:
				inMax = Math.min(this.#canvasEl.width, this.#canvasEl.height);
				break;
			case `max`:
				inMax = Math.max(this.#canvasEl.width, this.#canvasEl.height);
				break;
		}
		const s = scalerTwoWay(0, inMax, 0, 1);
		return {
			abs: s.in,
			rel: s.out
		};
	}
	/**
	* Causes drawing context to be re-created
	*/
	invalidateContext() {
		this.#ctx = void 0;
	}
	#add(region) {
		if (!region) throw new Error(`Param 'region' is undefined/null`);
		if (this.#regions.includes(region)) throw new Error(`Region already exists`);
		this.#regions.push(region);
		return region;
	}
	/**
	* Convert relative to absolute
	* @param pt 
	* @param kind 
	* @returns 
	*/
	toAbsPoint(pt, kind = `independent`) {
		let { x, y } = pt;
		switch (kind) {
			case `independent`:
				x *= this.width;
				y *= this.height;
		}
		return {
			x,
			y
		};
	}
	/**
	* Gets the offset x,y
	*/
	get offset() {
		const b = this.#canvasEl.getBoundingClientRect();
		return {
			x: b.left,
			y: b.top
		};
	}
	/**
	* Converts an absolute point to relative
	* @param pt 
	* @param source 
	* @param kind 
	* @param clamped 
	* @returns 
	*/
	toRelPoint(pt, source, kind = `independent`, clamped = true) {
		let { x, y } = pt;
		if (source === `screen`) {
			const b = this.#canvasEl.getBoundingClientRect();
			x -= b.x;
			y -= b.y;
		}
		switch (kind) {
			case `independent`:
				x /= this.width;
				y /= this.height;
				break;
			case `skip`: break;
		}
		if (clamped) {
			x = clamp$1(x);
			y = clamp$1(y);
		}
		return {
			x,
			y
		};
	}
	/**
	* Converts a rectangle to absolute coordinates
	* @param rect 
	* @param kind 
	* @returns 
	*/
	toAbsRect(rect, kind = `independent`) {
		let { width, height } = rect;
		switch (kind) {
			case `independent`:
				width *= this.width;
				height *= this.height;
				if (isRectPositioned(rect)) return {
					...this.toAbsPoint(rect),
					width,
					height
				};
		}
		return {
			width,
			height
		};
	}
	/**
	* Creates a region
	* 
	* Absolute positioned. Uses source coordinates which don't change
	* ```js
	* source.createRegion({ 
	*  absPositioned: { x: 0, y: 0, width: 100, height: 100} 
	* });
	* ```
	* 
	* Relative positioned. Uses coordiantes relative to source dimensions.
	* Updated if source changes.
	* ```js
	* source.createRegion({
	*  relativePositioned: { x: 0, y:0, width: 1, height: 0.5 },
	*  scale: `independent`
	* });
	* ```
	* 
	* Relative sized. Uses size relative to source dimension. By default centers.
	* ```js
	* source.createRegion({
	*  relativeSize: { width: 0.5, height: 0.5 }
	*  position: `center`
	* })
	* ```
	* @param spec 
	* @returns 
	*/
	createRegion(spec) {
		const marginPx = spec.marginPx ?? 0;
		const marginPx2 = marginPx * 2;
		if (`absPositioned` in spec) {
			const rect = subtractSize(spec.absPositioned, marginPx, marginPx);
			return this.#add(new CanvasRegion(this, () => rect));
		}
		if (`relativePositioned` in spec) {
			let compute;
			const rect = spec.relativePositioned;
			switch (spec.scale) {
				case `independent`:
					compute = (source) => ({
						x: rect.x * source.width + marginPx,
						y: rect.y * source.height + marginPx,
						width: rect.width * source.width - marginPx2,
						height: rect.height * source.height - marginPx2
					});
					break;
				default: throw new Error(`Param 'kind' unknown (${spec.scale})`);
			}
			return this.#add(new CanvasRegion(this, compute));
		}
		if (`relativeSize` in spec) {
			let compute;
			const rect = spec.relativeSize;
			const position = spec.position;
			switch (spec.scale) {
				case `independent`:
					compute = (source) => {
						const width = rect.width * source.width - marginPx2;
						const height = rect.height * source.height - marginPx2;
						let x = source.width / 2 - width / 2;
						let y = source.height / 2 - height / 2;
						switch (position) {
							case `n`:
								y = 0;
								break;
							case `s`:
								y = source.height - height;
								break;
							default:
						}
						x += marginPx;
						y += marginPx;
						return {
							width,
							height,
							x,
							y
						};
					};
					break;
				default: throw new Error(`Param 'kind' unknown (${spec.scale})`);
			}
			return this.#add(new CanvasRegion(this, compute));
		}
		if (`match` in spec) {
			const result = resolveElementTry(spec.match);
			if (!result.success) throw new Error(`Could not resolve match element. ${resultErrorToString(result)}`);
			const compute = (_source) => {
				const bounds = result.value.getBoundingClientRect();
				return {
					x: bounds.x + marginPx,
					y: bounds.y + marginPx,
					width: bounds.width - marginPx2,
					height: bounds.height - marginPx2
				};
			};
			return this.#add(new CanvasRegion(this, compute));
		}
		throw new Error(`Spec doesn't seem valid`);
	}
	/**
	* Clears the region of the canvas
	*/
	clear() {
		this.context.clearRect(0, 0, this.width, this.height);
	}
	/**
	* Gets - or creates - the drawing context
	*/
	get context() {
		if (this.#ctx) return this.#ctx;
		const c = this.#canvasEl.getContext(`2d`);
		if (!c) throw new Error(`Could not create 2d context`);
		c.setTransform(1, 0, 0, 1, 0, 0);
		c.scale(this.#pixelScaling, this.#pixelScaling);
		this.#ctx = c;
		for (const r of this.#regions) r.recomputeRegion();
		return this.#ctx;
	}
	/**
	* Gets a scaler for size
	*/
	get sizeScaler() {
		return this.#sizeScaler;
	}
	/**
	* Gets the logical width
	*/
	get width() {
		return this.#logicalSize.width;
	}
	/**
	* Gets the logical height
	*/
	get height() {
		return this.#logicalSize.height;
	}
	get element() {
		return this.#canvasEl;
	}
};
/**
* Draws on a canvas, constrained to a specific region
*/
var CanvasRegion = class {
	source;
	#regionCompute;
	#r;
	/**
	* Creates, using coordinate in canvas coordinates
	*/
	constructor(source, regionCompute) {
		this.source = source;
		this.#regionCompute = regionCompute;
		this.#r = regionCompute(source);
	}
	/**
	* Calls the original `regionCompute` function passed in to the constructor
	* to recompute the absolute region
	*/
	recomputeRegion() {
		this.#r = this.#regionCompute(this.source);
	}
	/**
	* Converts a region-relative point (0..1) to an absolute
	* point, which uses region-relative coordinates.
	* 
	* Eg if the region had an x,y of 100,100, `toAbsRegion({x:0,y:0})`
	* will return 0,0.
	*
	* @param regionRel 
	* @param scaleBy 
	* @returns 
	*/
	toAbsRegion(regionRel, scaleBy = `both`) {
		switch (scaleBy) {
			case `both`: return {
				x: regionRel.x * this.#r.width,
				y: regionRel.y * this.#r.height
			};
		}
	}
	/**
	* Returns a copy of `p` offset by the region's x & y
	* @param p 
	* @returns 
	*/
	applyRegionOffset(p) {
		return {
			x: p.x + this.#r.x,
			y: p.y + this.#r.y
		};
	}
	/**
	* Draws a line from a series of points.
	* Assumes region-relative, % coordinates (ie 0..1 scale)
	* @param relativePoints Points to connect, in region-relative coordinates
	* @param strokeStyle Stroke style
	* @param lineWidth Line with
	*/
	drawConnectedPointsRelative(relativePoints, strokeStyle, lineWidth = 1) {
		const points = relativePoints.map((p) => this.toAbsRegion(p));
		this.drawConnectedPoints(points, strokeStyle, lineWidth);
	}
	/**
	* Draws connected points in absolute coordinates,
	* however with 0,0 being the top-left of the region.
	* 
	* Thus, this will apply the region offset before drawing.
	* @param points Points to draw
	* @param strokeStyle Stroke style
	* @param lineWidth Line width
	*/
	drawConnectedPoints(points, strokeStyle, lineWidth = 1) {
		const c = this.context;
		c.save();
		c.translate(this.#r.x, this.#r.y);
		c.beginPath();
		c.strokeStyle = strokeStyle;
		c.lineWidth = lineWidth;
		for (let index = 0; index < points.length; index++) if (index === 0) c.moveTo(points[index].x, points[index].y);
		else c.lineTo(points[index].x, points[index].y);
		c.stroke();
		c.restore();
	}
	/**
	* Fills text at a relative position
	* @param text 
	* @param relPos Relative, meaning 0.5,0.5 is the middle of the region
	* @param fillStyle 
	* @param baseline 
	* @param align 
	*/
	fillTextRelative(text, relPos, fillStyle = `black`, font, baseline = `alphabetic`, align = `start`) {
		const point = this.toAbsRegion(relPos);
		this.fillTextRelative(text, point, fillStyle, font, baseline, align);
	}
	/**
	* Fills text at a region-relative position
	* @param text 
	* @param point Region relative, meaning 0,0 is top-left of region
	* @param fillStyle 
	* @param baseline 
	* @param align 
	*/
	fillText(text, point, fillStyle = `black`, font, baseline = `alphabetic`, align = `start`) {
		const c = this.context;
		c.save();
		c.translate(this.#r.x, this.#r.y);
		if (font.length > 0) c.font = font;
		c.textBaseline = baseline;
		c.textAlign = align;
		c.fillStyle = fillStyle;
		c.fillText(text, point.x, point.y);
		c.restore();
	}
	drawCircles(relativeCircles, fillStyle, strokeStyle = ``, lineWidth = 1) {
		const circles = relativeCircles.map((c) => {
			return {
				...this.toAbsRegion(c),
				radius: this.source.sizeScaler.abs(c.radius)
			};
		});
		const c = this.context;
		c.save();
		c.translate(this.#r.x, this.#r.y);
		c.fillStyle = fillStyle;
		c.strokeStyle = strokeStyle;
		c.lineWidth = lineWidth;
		for (const circle of circles) {
			c.beginPath();
			c.arc(circle.x, circle.y, circle.radius, 0, piPi);
			c.closePath();
			if (fillStyle.length > 0) c.fill();
			if (strokeStyle.length > 0) c.stroke();
		}
		c.restore();
	}
	/**
	* Clears the region
	*/
	clear() {
		this.context.clearRect(this.#r.x, this.#r.y, this.#r.width, this.#r.height);
	}
	/**
	* Fills the region
	* @param fillStyle
	*/
	fill(fillStyle = `white`) {
		const c = this.context;
		c.fillStyle = fillStyle;
		c.fillRect(this.#r.x, this.#r.y, this.#r.width, this.#r.height);
	}
	/**
	* For debugging, draws an outline of the bounds
	* @param strokeStyle 
	* @param lineWidth 
	*/
	drawBounds(strokeStyle, lineWidth = 1) {
		this.drawConnectedPointsRelative([
			{
				x: 0,
				y: 0
			},
			{
				x: 1,
				y: 0
			},
			{
				x: 1,
				y: 1
			},
			{
				x: 0,
				y: 1
			},
			{
				x: 0,
				y: 0
			}
		], strokeStyle, lineWidth);
		this.drawConnectedPointsRelative([{
			x: 0,
			y: 1
		}, {
			x: 1,
			y: 0
		}], strokeStyle, lineWidth);
		this.drawConnectedPointsRelative([{
			x: 0,
			y: 0
		}, {
			x: 1,
			y: 1
		}], strokeStyle, lineWidth);
	}
	/**
	* Converts a  point to a region-relative one.
	* @param pt 
	* @param kind 
	* @returns 
	*/
	toRelPoint(pt, source = `screen`, kind = `independent`, clamped = true) {
		pt = this.source.toRelPoint(pt, source, `skip`, false);
		let { x, y } = pt;
		x -= this.x;
		y -= this.y;
		switch (kind) {
			case `independent`:
				x /= this.width;
				y /= this.height;
		}
		if (clamped) {
			x = clamp$1(x);
			y = clamp$1(y);
		}
		return {
			x,
			y
		};
	}
	/**
	* Converts absolute to region point
	* @param pt 
	* @param source 
	* @param clamped 
	* @returns 
	*/
	absToRegionPoint(pt, source, clamped) {
		if (source === `screen`) pt = subtract(pt, this.source.offset);
		let { x, y } = pt;
		x -= this.x;
		y -= this.y;
		if (clamped) {
			if (x < 0) x = 0;
			if (y < 0) y = 0;
			if (x > this.width + this.x) x = this.x + this.width;
			if (y > this.height + this.y) y = this.y + this.height;
		}
		return {
			x,
			y
		};
	}
	/**
	* Get center of region
	*/
	get center() {
		return center(this.#r);
	}
	/**
	* Gets the drawing context
	*/
	get context() {
		return this.source.context;
	}
	/**
	* SEts the region
	*/
	set region(value) {
		this.#r = value;
	}
	/**
	* Gets the region
	*/
	get region() {
		return this.#r;
	}
	/**
	* Gets the width
	*/
	get width() {
		return this.#r.width;
	}
	/**
	* Gets the height
	*/
	get height() {
		return this.#r.height;
	}
	/**
	* Gets the x offset
	*/
	get x() {
		return this.#r.x;
	}
	/**
	* Gets they y offset
	*/
	get y() {
		return this.#r.y;
	}
	/**
	* Gets the width/height, whichever is smaller
	*/
	get dimensionMin() {
		return Math.min(this.#r.width, this.#r.height);
	}
};

//#endregion
//#region ../packages/visual/src/svg/apply.ts
/**
* Applies drawing options to given SVG element.
* Applies: fillStyle
* @param elem Element
* @param opts Drawing options
*/
function applyOpts(elem, opts) {
	if (opts.fillStyle) elem.setAttributeNS(null, `fill`, opts.fillStyle);
	if (opts.opacity) elem.setAttributeNS(null, `opacity`, opts.opacity.toString());
}

//#endregion
//#region ../packages/visual/src/svg/bounds.ts
/**
* Get the bounds of an SVG element (determined by its width/height attribs)
* @param svg
*/
function getBounds(svg) {
	const w = svg.getAttributeNS(null, `width`);
	const width = w === null ? 0 : Number.parseFloat(w);
	const h = svg.getAttributeNS(null, `height`);
	return {
		width,
		height: h === null ? 0 : Number.parseFloat(h)
	};
}
/**
* Set the bounds of an element, using its width/height attribs.
* @param svg
* @param bounds
*/
function setBounds(svg, bounds) {
	svg.setAttributeNS(null, `width`, bounds.width.toString());
	svg.setAttributeNS(null, `height`, bounds.height.toString());
}

//#endregion
//#region ../packages/visual/src/svg/create.ts
/**
* Creates an element of `type` and with `id` (if specified)
* @param type Element type, eg `circle`
* @param id Optional id to assign to element
* @returns Element
*/
function createEl(type, id) {
	const m = document.createElementNS(`http://www.w3.org/2000/svg`, type);
	if (id) m.id = id;
	return m;
}
/**
* Creates and appends a SVG element.
*
* ```js
* // Create a circle
* const circleEl = createOrResolve(parentEl, `SVGCircleElement`);
* ```
*
* If `queryOrExisting` is specified, it is used as a query to find an existing element. If
* query starts with `#`, this will be set as the element id, if created.
*
* ```js
* // Creates an element with id 'myCircle' if it doesn't exist
* const circleEl = createOrResolve(parentEl, `SVGCircleElement`, `#myCircle`);
* ```
* @param parent Parent element
* @param type Type of SVG element
* @param queryOrExisting Query, eg `#id`
*/
function createOrResolve(parent, type, queryOrExisting, suffix) {
	let existing = null;
	if (queryOrExisting !== void 0) existing = typeof queryOrExisting === `string` ? parent.querySelector(queryOrExisting) : queryOrExisting;
	if (existing === null) {
		const p = document.createElementNS(`http://www.w3.org/2000/svg`, type);
		parent.append(p);
		if (queryOrExisting && typeof queryOrExisting === `string` && queryOrExisting.startsWith(`#`)) p.id = suffix !== void 0 && !queryOrExisting.endsWith(suffix) ? queryOrExisting.slice(1) + suffix : queryOrExisting.slice(1);
		return p;
	}
	return existing;
}

//#endregion
//#region ../packages/visual/src/svg/markers.ts
function createMarker(id, opts, childCreator) {
	const m = createEl(`marker`, id);
	if (opts.markerWidth) m.setAttribute(`markerWidth`, opts.markerWidth?.toString());
	if (opts.markerHeight) m.setAttribute(`markerHeight`, opts.markerHeight?.toString());
	if (opts.orient) m.setAttribute(`orient`, opts.orient.toString());
	else m.setAttribute(`orient`, `auto-start-reverse`);
	if (opts.viewBox) m.setAttribute(`viewBox`, opts.viewBox.toString());
	if (opts.refX) m.setAttribute(`refX`, opts.refX.toString());
	if (opts.refY) m.setAttribute(`refY`, opts.refY.toString());
	if (childCreator) {
		const c = childCreator();
		m.appendChild(c);
	}
	return m;
}
function markerPrebuilt(elem, opts, _context) {
	if (elem === null) return `(elem null)`;
	const parent = elem.ownerSVGElement;
	if (parent === null) throw new Error(`parent for elem is null`);
	const defsEl = createOrResolve(parent, `defs`, `defs`);
	let defEl = defsEl.querySelector(`#${opts.id}`);
	if (defEl !== null) return `url(#${opts.id})`;
	if (opts.id === `triangle`) {
		opts = {
			...opts,
			strokeStyle: `transparent`
		};
		if (!opts.markerHeight) opts = {
			...opts,
			markerHeight: 6
		};
		if (!opts.markerWidth) opts = {
			...opts,
			markerWidth: 6
		};
		if (!opts.refX) opts = {
			...opts,
			refX: opts.markerWidth
		};
		if (!opts.refY) opts = {
			...opts,
			refY: opts.markerHeight
		};
		if (!opts.fillStyle || opts.fillStyle === `none`) opts = {
			...opts,
			fillStyle: `black`
		};
		if (!opts.viewBox) opts = {
			...opts,
			viewBox: `0 0 10 10`
		};
		defEl = createMarker(opts.id, opts, () => {
			const tri = createEl(`path`);
			tri.setAttribute(`d`, `M 0 0 L 10 5 L 0 10 z`);
			if (opts) applyOpts(tri, opts);
			return tri;
		});
	} else throw new Error(`Do not know how to make ${opts.id}`);
	defEl.id = opts.id;
	defsEl.appendChild(defEl);
	return `url(#${opts.id})`;
}

//#endregion
//#region ../packages/visual/src/svg/path.ts
/**
* Applies path drawing options to given element
* Applies: markerEnd, markerStart, markerMid
* @param elem Element (presumed path)
* @param opts Options
*/
const applyPathOpts = (elem, opts) => {
	if (opts.markerEnd) elem.setAttribute(`marker-end`, markerPrebuilt(elem, opts.markerEnd, opts));
	if (opts.markerStart) elem.setAttribute(`marker-start`, markerPrebuilt(elem, opts.markerStart, opts));
	if (opts.markerMid) elem.setAttribute(`marker-mid`, markerPrebuilt(elem, opts.markerMid, opts));
};

//#endregion
//#region ../packages/visual/src/svg/stroke.ts
/**
* Applies drawing options to given SVG element.
* Applies: strokeStyle, strokeWidth, strokeDash, strokeLineCap
* @param elem Element
* @param opts
*/
const applyStrokeOpts = (elem, opts) => {
	if (opts.strokeStyle) elem.setAttributeNS(null, `stroke`, opts.strokeStyle);
	if (opts.strokeWidth) elem.setAttributeNS(null, `stroke-width`, opts.strokeWidth.toString());
	if (opts.strokeDash) elem.setAttribute(`stroke-dasharray`, opts.strokeDash);
	if (opts.strokeLineCap) elem.setAttribute(`stroke-linecap`, opts.strokeLineCap);
};

//#endregion
//#region ../packages/visual/src/svg/elements.ts
var elements_exports = /* @__PURE__ */ __exportAll({
	circle: () => circle,
	circleUpdate: () => circleUpdate,
	grid: () => grid,
	group: () => group,
	groupUpdate: () => groupUpdate,
	line: () => line,
	lineUpdate: () => lineUpdate,
	path: () => path,
	pathUpdate: () => pathUpdate,
	polarRayUpdate: () => polarRayUpdate,
	text: () => text,
	textPath: () => textPath,
	textPathUpdate: () => textPathUpdate,
	textUpdate: () => textUpdate
});
function numberOrPercentage(v) {
	if (v >= 0 && v <= 1) return `${v * 100}%`;
	return v.toString();
}
/**
* Creates and adds an SVG path element
* @example
* ```js
* const paths = [
*  `M300,200`,
*  `a25,25 -30 0,1 50, -25 l 50,-25`
* ]
* const pathEl = path(paths, parentEl);
* ```
* @param svgOrArray Path syntax, or array of paths. Can be empty if path data will be added later
* @param parent SVG parent element
* @param opts Options Drawing options
*/
function path(svgOrArray, parent, opts, queryOrExisting) {
	const elem = createOrResolve(parent, `path`, queryOrExisting);
	const svg = typeof svgOrArray === `string` ? svgOrArray : svgOrArray.join(`\n`);
	elem.setAttributeNS(null, `d`, svg);
	parent.append(elem);
	return pathUpdate(elem, opts);
}
function pathUpdate(elem, opts) {
	if (opts) applyOpts(elem, opts);
	if (opts) applyStrokeOpts(elem, opts);
	return elem;
}
/**
* Updates an existing `SVGCircleElement` with potentially updated circle data and drawing options
* @param elem Element
* @param circle Circle
* @param opts Drawing options
* @returns SVGCircleElement
*/
function circleUpdate(elem, circle, opts) {
	elem.setAttributeNS(null, `cx`, circle.x.toString());
	elem.setAttributeNS(null, `cy`, circle.y.toString());
	elem.setAttributeNS(null, `r`, circle.radius.toString());
	if (opts) applyOpts(elem, opts);
	if (opts) applyStrokeOpts(elem, opts);
	return elem;
}
/**
* Creates or reuses a `SVGCircleElement`.
*
* To update an existing element, use `circleUpdate`
* @param circle
* @param parent
* @param opts
* @param queryOrExisting
*/
function circle(circle, parent, opts, queryOrExisting) {
	return circleUpdate(createOrResolve(parent, `circle`, queryOrExisting), circle, opts);
}
/**
* Creates or resuses a `SVGGElement` (group)
*
* To update an existing elemnet, use `groupUpdate`
* @param children
* @param parent
* @param queryOrExisting
*/
function group(children, parent, queryOrExisting) {
	return groupUpdate(createOrResolve(parent, `g`, queryOrExisting), children);
}
function groupUpdate(elem, children) {
	for (const c of children) if (c.parentNode !== elem) elem.append(c);
	return elem;
}
/**
* Creates or reuses a SVGLineElement.
*
* @param line
* @param parent
* @param opts
* @param queryOrExisting
*/
function line(line, parent, opts, queryOrExisting) {
	return lineUpdate(createOrResolve(parent, `line`, queryOrExisting), line, opts);
}
/**
* Updates a SVGLineElement instance with potentially changed line and drawing data
* @param lineEl
* @param line
* @param opts
*/
function lineUpdate(lineEl, line, opts) {
	lineEl.setAttributeNS(null, `x1`, line.a.x.toString());
	lineEl.setAttributeNS(null, `y1`, line.a.y.toString());
	lineEl.setAttributeNS(null, `x2`, line.b.x.toString());
	lineEl.setAttributeNS(null, `y2`, line.b.y.toString());
	if (opts) applyOpts(lineEl, opts);
	if (opts) applyPathOpts(lineEl, opts);
	if (opts) applyStrokeOpts(lineEl, opts);
	return lineEl;
}
function polarRayUpdate(lineEl, ray, opts) {
	const l = toCartesian(ray);
	lineEl.setAttributeNS(null, `x1`, l.a.x.toString());
	lineEl.setAttributeNS(null, `y1`, l.a.y.toString());
	lineEl.setAttributeNS(null, `x2`, l.b.x.toString());
	lineEl.setAttributeNS(null, `y2`, l.b.y.toString());
	if (opts) applyOpts(lineEl, opts);
	if (opts) applyPathOpts(lineEl, opts);
	if (opts) applyStrokeOpts(lineEl, opts);
	return lineEl;
}
/**
* Updates an existing SVGTextPathElement instance with text and drawing options
* @param el
* @param text
* @param opts
*/
function textPathUpdate(el, text, opts) {
	if (opts?.method) el.setAttributeNS(null, `method`, opts.method);
	if (opts?.side) el.setAttributeNS(null, `side`, opts.side);
	if (opts?.spacing) el.setAttributeNS(null, `spacing`, opts.spacing);
	if (opts?.startOffset) el.setAttributeNS(null, `startOffset`, numberOrPercentage(opts.startOffset));
	if (opts?.textLength) el.setAttributeNS(null, `textLength`, numberOrPercentage(opts.textLength));
	if (text) el.textContent = text;
	if (opts) applyOpts(el, opts);
	if (opts) applyStrokeOpts(el, opts);
	return el;
}
/**
* Creates or reuses a SVGTextPathElement.
* @param pathReference
* @param text
* @param parent
* @param opts
* @param textQueryOrExisting
* @param pathQueryOrExisting
*/
function textPath(pathReference, text, parent, opts, textQueryOrExisting, pathQueryOrExisting) {
	const textEl = createOrResolve(parent, `text`, textQueryOrExisting, `-text`);
	textUpdate(textEl, void 0, void 0, opts);
	const p = createOrResolve(textEl, `textPath`, pathQueryOrExisting);
	p.setAttributeNS(null, `href`, pathReference);
	return textPathUpdate(p, text, opts);
}
/**
* Updates an existing SVGTextElement instance with position, text and drawing options
* @param el
* @param pos
* @param text
* @param opts
*/
function textUpdate(el, pos, text, opts) {
	if (pos) {
		el.setAttributeNS(null, `x`, pos.x.toString());
		el.setAttributeNS(null, `y`, pos.y.toString());
	}
	if (text) el.textContent = text;
	if (opts) {
		applyOpts(el, opts);
		if (opts) applyStrokeOpts(el, opts);
		if (opts.anchor) el.setAttributeNS(null, `text-anchor`, opts.anchor);
		if (opts.align) el.setAttributeNS(null, `alignment-baseline`, opts.align);
		if (!(opts.userSelect ?? true)) el.style.userSelect = `none`;
	}
	return el;
}
/**
* Creates or reuses a SVGTextElement
* @param text Text
* @param parent
* @param pos Position of text
* @param opts
* @param queryOrExisting
*/
function text(text, parent, pos, opts, queryOrExisting) {
	return textUpdate(createOrResolve(parent, `text`, queryOrExisting), pos, text, opts);
}
/**
* Creates a square grid based at a center point, with cells having `spacing` height and width.
*
* It fits in as many cells as it can within `width` and `height`.
*
* Returns a SVG group, consisting of horizontal and vertical lines
* @param parent Parent element
* @param center Center point of grid
* @param spacing Width/height of cells
* @param width How wide grid should be
* @param height How high grid should be
* @param opts
*/
function grid(parent, center, spacing, width, height, opts = {}) {
	if (!opts.strokeStyle) opts = {
		...opts,
		strokeStyle: toStringFirst(`bg-dim`, `silver`)
	};
	if (!opts.strokeWidth) opts = {
		...opts,
		strokeWidth: 1
	};
	const g = createEl(`g`);
	applyOpts(g, opts);
	applyPathOpts(g, opts);
	applyStrokeOpts(g, opts);
	let y = 0;
	while (y < height) {
		line(fromNumbers(0, y, width, y), g);
		y += spacing;
	}
	let x = 0;
	while (x < width) {
		line(fromNumbers(x, 0, x, height), g);
		x += spacing;
	}
	parent.append(g);
	return g;
}

//#endregion
//#region ../packages/visual/src/svg/geometry.ts
/**
* Returns a Line type from an SVGLineElement
* @param el SVG Line Element
*/
function lineFromSvgLine(el) {
	if (!el) throw new Error(`Param 'el' is undefined`);
	return {
		a: {
			x: el.x1.baseVal.value,
			y: el.y1.baseVal.value
		},
		b: {
			x: el.x2.baseVal.value,
			y: el.y2.baseVal.value
		}
	};
}
function polarRayFromSvgLine(el, origin) {
	const l = lineFromSvgLine(el);
	return fromLine(l, origin);
}

//#endregion
//#region ../packages/visual/src/svg/remove.ts
/**
* Removes an SVG element from a parent
* @param parent Parent
* @param queryOrExisting Query or existing element 
* @returns 
*/
const remove = (parent, queryOrExisting) => {
	if (typeof queryOrExisting === `string`) {
		const elem = parent.querySelector(queryOrExisting);
		if (elem === null) return;
		elem.remove();
	} else queryOrExisting.remove();
};
/**
* Removes all children of `parent`, but not `parent` itself.
* @param parent 
*/
const clear = (parent) => {
	let c = parent.lastElementChild;
	while (c) {
		c.remove();
		c = parent.lastElementChild;
	}
};

//#endregion
//#region ../packages/visual/src/svg/helper.ts
/**
* Creates a {@link SvgHelper} for the creating and management of SVG elements.
* @param parent
* @param parentOpts
*/
function makeHelper(parent, parentOpts) {
	if (parentOpts) {
		applyOpts(parent, parentOpts);
		applyStrokeOpts(parent, parentOpts);
	}
	return {
		remove: (queryOrExisting) => {
			remove(parent, queryOrExisting);
		},
		text: (text$1, pos, opts, queryOrExisting) => text(text$1, parent, pos, opts, queryOrExisting),
		textPath: (pathReference, text, opts, textQueryOrExisting, pathQueryOrExisting) => textPath(pathReference, text, parent, opts, textQueryOrExisting, pathQueryOrExisting),
		line: (line$2, opts, queryOrExisting) => line(line$2, parent, opts, queryOrExisting),
		circle: (circle$2, opts, queryOrExisting) => circle(circle$2, parent, opts, queryOrExisting),
		path: (svgString, opts, queryOrExisting) => path(svgString, parent, opts, queryOrExisting),
		group: (children, queryOrExisting) => group(children, parent, queryOrExisting),
		grid: (center, spacing, width, height, opts) => grid(parent, center, spacing, width, height, opts),
		query: (selectors) => parent.querySelector(selectors),
		get width() {
			const w = parent.getAttributeNS(null, `width`);
			if (w === null) return 0;
			return Number.parseFloat(w);
		},
		set width(width) {
			parent.setAttributeNS(null, `width`, width.toString());
		},
		get parent() {
			return parent;
		},
		get height() {
			const w = parent.getAttributeNS(null, `height`);
			if (w === null) return 0;
			return Number.parseFloat(w);
		},
		set height(height) {
			parent.setAttributeNS(null, `height`, height.toString());
		},
		clear: () => {
			while (parent.firstChild) parent.lastChild.remove();
		}
	};
}

//#endregion
//#region ../packages/visual/src/svg/index.ts
var svg_exports = /* @__PURE__ */ __exportAll({
	Elements: () => elements_exports,
	applyOpts: () => applyOpts,
	applyPathOpts: () => applyPathOpts,
	applyStrokeOpts: () => applyStrokeOpts,
	clear: () => clear,
	createEl: () => createEl,
	createMarker: () => createMarker,
	createOrResolve: () => createOrResolve,
	getBounds: () => getBounds,
	lineFromSvgLine: () => lineFromSvgLine,
	makeHelper: () => makeHelper,
	markerPrebuilt: () => markerPrebuilt,
	polarRayFromSvgLine: () => polarRayFromSvgLine,
	remove: () => remove,
	setBounds: () => setBounds
});

//#endregion
//#region ../packages/visual/src/pointer-visualise.ts
/**
* Visualises pointer events within a given element.
*
* ```js
* // Show pointer events for whole document
* pointerVis(document);
* ```
*
* Note you may need to set the following CSS properties on the target element:
*
* ```css
* touch-action: none;
* user-select: none;
* overscroll-behavior: none;
* ```
*
* Options
* * touchRadius/mouseRadius: size of circle for these kinds of pointer events
* * trace: if true, intermediate events are captured and displayed
* @param elOrQuery Element to monitor
* @param options Options
*/
const pointerVisualise = (elOrQuery, options = {}) => {
	const touchRadius = options.touchRadius ?? 45;
	const mouseRadius = options.touchRadius ?? 20;
	const trace = options.trace ?? false;
	const hue = options.hue ?? 100;
	const startFillStyle = `hsla(${hue}, 100%, 10%, 10%)`;
	let currentHue = hue;
	const el = resolveEl(elOrQuery);
	const tracker = new PointsTracker({ storeIntermediate: trace });
	const svg = document.createElementNS(`http://www.w3.org/2000/svg`, `svg`);
	svg.id = `pointerVis`;
	svg.style.zIndex = `-1000`;
	svg.style.position = `fixed`;
	svg.style.top = `0`;
	svg.style.left = `0`;
	svg.style.width = `100%`;
	svg.style.height = `100%`;
	svg.style.boxSizing = `border-box`;
	svg.style.border = `3px solid red`;
	svg.style.pointerEvents = `none`;
	svg.style.touchAction = `none`;
	ElementSizer.svgViewport(svg);
	let pointerCount = 0;
	const lostPointer = (event) => {
		const id = event.pointerId.toString();
		tracker.delete(id);
		currentHue = hue;
		svg.querySelector(`#pv-start-${id}`)?.remove();
		for (let index = 0; index < pointerCount + 10; index++) svg.querySelector(`#pv-progress-${id}-${index}`)?.remove();
		pointerCount = 0;
	};
	const trackPointer = async (event) => {
		const id = event.pointerId.toString();
		const pt = {
			x: event.x,
			y: event.y
		};
		const type = event.pointerType;
		if (event.type === `pointermove` && !tracker.has(id)) return;
		const info = await tracker.seen(event.pointerId.toString(), {
			x: event.clientX,
			y: event.clientY
		});
		if (info.values.length === 1) {
			const el = circle({
				...info.values[0],
				radius: type === `touch` ? touchRadius : mouseRadius
			}, svg, { fillStyle: startFillStyle }, `#pv-start-${id}`);
			el.style.pointerEvents = `none`;
			el.style.touchAction = `none`;
		}
		const fillStyle = `hsla(${currentHue}, 100%, 50%, 50%)`;
		const el2 = circle({
			...pt,
			radius: type === `touch` ? touchRadius : mouseRadius
		}, svg, { fillStyle }, `#pv-progress-${id}-${info.values.length}`);
		el2.style.pointerEvents = `none`;
		el2.style.touchAction = `none`;
		currentHue += 1;
		pointerCount = info.values.length;
	};
	document.body.append(svg);
	el.addEventListener(`pointerdown`, trackPointer);
	el.addEventListener(`pointermove`, trackPointer);
	el.addEventListener(`pointerup`, lostPointer);
	el.addEventListener(`pointerleave`, lostPointer);
	el.addEventListener(`contextmenu`, (event) => {
		event.preventDefault();
	});
};

//#endregion
//#region ../packages/visual/src/convolve-2d.ts
var convolve_2d_exports = /* @__PURE__ */ __exportAll({
	averageNumberReducer: () => averageNumberReducer,
	boxBlurKernel: () => boxBlurKernel,
	convolve: () => convolve,
	convolveCell: () => convolveCell,
	convolveImage: () => convolveImage,
	convolveMutateGrid: () => convolveMutateGrid,
	edgeDetectionKernel: () => edgeDetectionKernel,
	gaussianBlur3Kernel: () => gaussianBlur3Kernel,
	gaussianBlur5Kernel: () => gaussianBlur5Kernel,
	identityKernel: () => identityKernel,
	kernel2dToArray: () => kernel2dToArray,
	multiply: () => multiply,
	rgbReducer: () => rgbReducer,
	sharpenKernel: () => sharpenKernel,
	unsharpMasking5Kernel: () => unsharpMasking5Kernel
});
function averageNumberReducer(values) {
	let sum = 0;
	let count = 0;
	for (const value of values) {
		if (value.value === void 0) continue;
		sum += value.value * value.kernel;
		count += value.kernel;
	}
	if (count === 0) return void 0;
	return sum / count;
}
/**
* Multiply every element of kernel by the same `scalar` value.
* Returns new result, input is unmodified
* @param kernel
* @param scalar
* @returns Kernel with every element multiplied by `scalar`
*/
function multiply(kernel, scalar) {
	const rows = kernel.length;
	const cols = kernel[0].length;
	const copy = [];
	for (let row = 0; row < rows; row++) {
		copy[row] = [];
		for (let col = 0; col < cols; col++) copy[row][col] = kernel[row][col] * scalar;
	}
	return copy;
}
function convolveCell(cell, kernel, source, reduce) {
	return reduce(kernel.map((o) => {
		const pos = offset(source, cell, o.cell, `stop`);
		let sourceValue;
		if (pos) sourceValue = source.get(pos, `undefined`);
		return {
			cell: o.cell,
			value: sourceValue,
			kernel: o.value
		};
	}));
}
/**
* Performs kernel-based convolution over `image`.
* @param kernel
* @param image
*/
function* convolveImage(kernel, image) {
	const imageDataAsGrid = wrap(image);
	yield* convolve(kernel, imageDataAsGrid, cells(imageDataAsGrid), rgbReducer);
}
/**
* Performs kernel-based convolution over a grid, mutating the source grid with the results.
*
* ```js
* const gridData = Grids.Array2d.wrapMutable(gridArray);
* Convolve2d.convolveMutateGrid(
*    Convolve2d.gaussianBlur3Kernel, // Use the Gaussian blur kernel
*    gridData,  // Provide grid values in an accessible form
*    Convolve2d.averageNumberReducer,
*    (conv, original) => {
*      return interpolate(0.1, original, conv);
*   }
* );
* ```
* @param kernel Kernel data
* @param source Source data
* @param reduce Function to combine values at a position
* @param blend Optional function to blend the convolved value with the original value. If not provided, the convolved value will replace the original value.
* @param visitor Visitor to iterate over the source grid. If not provided, all cells will be visited.
* @param origin Optional origin of the kernel. If not provided, the center of the kernel will be used.
* @returns Returns 'source' grid, which has been mutated with the results of the convolution.
*/
function convolveMutateGrid(kernel, source, reduce, blend, visitor, origin) {
	const result = convolve(kernel, source, visitor ?? cells(source), reduce, origin);
	for (const r of result) {
		if (typeof r.value === `undefined`) continue;
		if (blend) source.set(blend(r.value, source.get(r.cell, `undefined`)), r.cell);
		else source.set(r.value, r.cell);
	}
	return source;
}
function* convolve(kernel, source, visitor, reduce, origin) {
	if (!origin) {
		const kernelRows = kernel.length;
		const kernelCols = kernel[0].length;
		origin = {
			x: Math.floor(kernelRows / 2),
			y: Math.floor(kernelCols / 2)
		};
	}
	const asArray = kernel2dToArray(kernel, origin);
	for (const cell of visitor) yield {
		cell,
		value: convolveCell(cell, asArray, source, reduce)
	};
}
/**
* For a given kernel, returns an array of offsets. These
* consist of a cell offset (eg `{x:-1,y:-1}`) and the value at that kernel position.
* @param kernel
* @param origin
* @returns Array of offsets and values
*/
function kernel2dToArray(kernel, origin) {
	const offsets = [];
	const rows = kernel.length;
	const cols = kernel[0].length;
	if (!origin) origin = {
		x: Math.floor(rows / 2),
		y: Math.floor(cols / 2)
	};
	for (let xx = 0; xx < rows; xx++) for (let yy = 0; yy < cols; yy++) {
		const v = {
			cell: {
				x: xx - origin.x,
				y: yy - origin.y
			},
			value: kernel[xx][yy]
		};
		offsets.push(v);
	}
	return offsets;
}
function rgbReducer(values) {
	let r = 0;
	let g = 0;
	let b = 0;
	let opacity = 0;
	for (const value of values) {
		const rgb = value.value;
		const kernelValue = value.kernel;
		if (!rgb) continue;
		if (rgb.opacity === 0) continue;
		if (kernelValue === 0) continue;
		r += rgb.r * kernelValue;
		g += rgb.g * kernelValue;
		b += rgb.b * kernelValue;
		opacity += (rgb.opacity ?? 1) * kernelValue;
	}
	return {
		r,
		g,
		b,
		unit: `8bit`,
		space: `srgb`,
		opacity
	};
}
const identityKernel = [
	[
		0,
		0,
		0
	],
	[
		0,
		1,
		0
	],
	[
		0,
		0,
		0
	]
];
const edgeDetectionKernel = [
	[
		0,
		-1,
		0
	],
	[
		-1,
		4,
		-1
	],
	[
		0,
		-1,
		0
	]
];
const sharpenKernel = [
	[
		0,
		-1,
		0
	],
	[
		-1,
		5,
		-1
	],
	[
		0,
		-1,
		0
	]
];
const boxBlurKernel = multiply([
	[
		1,
		1,
		1
	],
	[
		1,
		1,
		1
	],
	[
		1,
		1,
		1
	]
], 1 / 9);
const gaussianBlur3Kernel = multiply([
	[
		1,
		2,
		1
	],
	[
		2,
		4,
		2
	],
	[
		1,
		2,
		1
	]
], 1 / 16);
const gaussianBlur5Kernel = multiply([
	[
		1,
		4,
		6,
		4,
		1
	],
	[
		4,
		16,
		24,
		16,
		4
	],
	[
		6,
		24,
		36,
		24,
		6
	],
	[
		4,
		16,
		24,
		16,
		4
	],
	[
		1,
		4,
		6,
		4,
		1
	]
], 1 / 256);
const unsharpMasking5Kernel = multiply([
	[
		1,
		4,
		6,
		4,
		1
	],
	[
		4,
		16,
		24,
		16,
		4
	],
	[
		6,
		24,
		-476,
		24,
		6
	],
	[
		4,
		16,
		24,
		16,
		4
	],
	[
		1,
		4,
		6,
		4,
		1
	]
], -1 / 256);

//#endregion
//#region ../packages/visual/src/named-colour-palette.ts
var named_colour_palette_exports = /* @__PURE__ */ __exportAll({ create: () => create });
const create = (fallbacks) => new NamedColourPaletteImpl(fallbacks);
var NamedColourPaletteImpl = class {
	#store = /* @__PURE__ */ new Map();
	#aliases = /* @__PURE__ */ new Map();
	fallbacks;
	#lastFallback = 0;
	#elementBase;
	constructor(fallbacks) {
		if (fallbacks !== void 0) this.fallbacks = fallbacks;
		else this.fallbacks = [
			`red`,
			`blue`,
			`green`,
			`orange`
		];
		this.#elementBase = document.body;
	}
	setElementBase(el) {
		this.#elementBase = el;
	}
	add(key, colour) {
		this.#store.set(key, colour);
	}
	alias(from, to) {
		this.#aliases.set(from, to);
	}
	get(key, fallback) {
		const alias = this.#aliases.get(key);
		if (alias !== void 0) key = alias;
		const c = this.#store.get(key);
		if (c !== void 0) return c;
		const variableName = `--` + key;
		let fromCss = getComputedStyle(this.#elementBase).getPropertyValue(variableName).trim();
		if (fromCss === void 0 || fromCss.length === 0) {
			if (fallback !== void 0) return fallback;
			fromCss = this.fallbacks[this.#lastFallback];
			this.#lastFallback++;
			if (this.#lastFallback === this.fallbacks.length) this.#lastFallback = 0;
		}
		return fromCss;
	}
	getOrAdd(key, fallback) {
		if (this.has(key)) return this.get(key);
		const c = this.get(key, fallback);
		this.add(key, c);
		return c;
	}
	has(key) {
		return this.#store.has(key);
	}
};

//#endregion
//#region ../packages/visual/src/video.ts
var video_exports = /* @__PURE__ */ __exportAll({
	capture: () => capture,
	frames: () => frames,
	manualCapture: () => manualCapture
});
/**
* Generator that yields frames from a video element as [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData).
*
* ```js
* import { Video } from '@ixfx/visual.js'
*
* const ctx = canvasEl.getContext(`2d`);
* for await (const frame of Video.frames(videoEl)) {
*   // TODO: Some processing of pixels
*
*   // Draw image on to the visible canvas
*   ctx.putImageData(frame, 0, 0);
* }
* ```
*
* Under the hood it creates a hidden canvas where frames are drawn to. This is necessary
* to read back pixel data. An existing canvas can be used if it is passed in as an option.
*
* Options:
* * `canvasEl`: CANVAS element to use as a buffer (optional)
* * `maxIntervalMs`: Max frame rate (0 by default, ie runs as fast as possible)
* * `showCanvas`: Whether buffer canvas will be shown (false by default)
* @param sourceVideoEl
* @param opts
*/
async function* frames(sourceVideoEl, opts = {}) {
	const maxIntervalMs = opts.maxIntervalMs ?? 0;
	const showCanvas = opts.showCanvas ?? false;
	let canvasEl = opts.canvasEl;
	let w, h;
	w = h = 0;
	if (canvasEl === void 0) {
		canvasEl = document.createElement(`CANVAS`);
		canvasEl.classList.add(`ixfx-frames`);
		if (!showCanvas) canvasEl.style.display = `none`;
		document.body.appendChild(canvasEl);
	}
	const updateSize = () => {
		if (canvasEl === void 0) return;
		w = sourceVideoEl.videoWidth;
		h = sourceVideoEl.videoHeight;
		canvasEl.width = w;
		canvasEl.height = h;
	};
	let c = null;
	const looper = delayLoop(maxIntervalMs);
	for await (const _ of looper) {
		if (w === 0 || h === 0) updateSize();
		if (w === 0 || h === 0) continue;
		c ??= canvasEl.getContext(`2d`);
		if (c === null) return;
		c.drawImage(sourceVideoEl, 0, 0, w, h);
		yield c.getImageData(0, 0, w, h);
	}
}
/**
* Captures frames from a video element. It can send pixel data to a function or post to a worker script.
*
* @example Using a function
* ```js
* // Capture from a VIDEO element, handling frame data
* // imageData is ImageData type: https://developer.mozilla.org/en-US/docs/Web/API/ImageData
* Video.capture(sourceVideoEl, {
*  onFrame(imageData => {
*    // Do something with pixels...
*  });
* });
* ```
*
* @example Using a worker
* ```js
* Video.capture(sourceVideoEl, {
*  workerScript: `./frameProcessor.js`
* });
* ```
*
* In frameProcessor.js:
* ```
* const process = (frame) => {
*  // ...process frame
*
*  // Send image back?
*  self.postMessage({frame});
* };
*
* self.addEventListener(`message`, evt => {
*   const {pixels, width, height} = evt.data;
*   const frame = new ImageData(new Uint8ClampedArray(pixels),
*     width, height);
*
*   // Process it
*   process(frame);
* });
* ```
*
* Options:
* * `canvasEl`: CANVAS element to use as a buffer (optional)
* * `maxIntervalMs`: Max frame rate (0 by default, ie runs as fast as possible)
* * `showCanvas`: Whether buffer canvas will be shown (false by default)
* * `workerScript`: If this specified, this URL will be loaded as a Worker, and frame data will be automatically posted to it
*
* Implementation: frames are captured using a animation-speed loop to a hidden canvas. From there
* the pixel data is extracted and sent to either destination. In future the intermediate drawing to a
* canvas could be skipped if it becomes possible to get pixel data from an ImageBitmap.
* @param sourceVideoEl Source VIDEO element
* @param opts
* @returns
*/
const capture = (sourceVideoEl, opts = {}) => {
	const maxIntervalMs = opts.maxIntervalMs ?? 0;
	const showCanvas = opts.showCanvas ?? false;
	const onFrame = opts.onFrame;
	const w = sourceVideoEl.videoWidth;
	const h = sourceVideoEl.videoHeight;
	const canvasEl = document.createElement(`CANVAS`);
	canvasEl.classList.add(`ixfx-capture`);
	if (!showCanvas) canvasEl.style.display = `none`;
	canvasEl.width = w;
	canvasEl.height = h;
	let c = null;
	let worker;
	if (opts.workerScript) worker = new Worker(opts.workerScript);
	const getPixels = worker || onFrame;
	if (!getPixels && !showCanvas) console.warn(`Video will be captured to hidden element without any processing. Is this what you want?`);
	const loop = continuously(() => {
		if (c === null) c = canvasEl.getContext(`2d`);
		if (c === null) return;
		c.drawImage(sourceVideoEl, 0, 0, w, h);
		let pixels;
		if (getPixels) pixels = c.getImageData(0, 0, w, h);
		if (worker) worker.postMessage({
			pixels: pixels.data.buffer,
			width: w,
			height: h,
			channels: 4
		}, [pixels.data.buffer]);
		if (onFrame) try {
			onFrame(pixels);
		} catch (e) {
			console.error(e);
		}
	}, maxIntervalMs);
	return {
		start: () => {
			loop.start();
		},
		cancel: () => {
			loop.cancel();
		},
		canvasEl
	};
};
const manualCapture = (sourceVideoEl, opts = {}) => {
	const showCanvas = opts.showCanvas ?? false;
	const w = sourceVideoEl.videoWidth;
	const h = sourceVideoEl.videoHeight;
	const definedCanvasEl = opts.canvasEl !== void 0;
	let canvasEl = opts.canvasEl;
	if (!canvasEl) {
		canvasEl = document.createElement(`CANVAS`);
		canvasEl.classList.add(`ixfx-capture`);
		document.body.append(canvasEl);
		if (!showCanvas) canvasEl.style.display = `none`;
	}
	canvasEl.width = w;
	canvasEl.height = h;
	const capture = () => {
		let c;
		if (!c) c = canvasEl.getContext(`2d`, { willReadFrequently: true });
		if (!c) throw new Error(`Could not create graphics context`);
		c.drawImage(sourceVideoEl, 0, 0, w, h);
		const pixels = c.getImageData(0, 0, w, h);
		pixels.currentTime = sourceVideoEl.currentTime;
		if (opts.postCaptureDraw) opts.postCaptureDraw(c, w, h);
		return pixels;
	};
	const dispose = () => {
		if (definedCanvasEl) return;
		try {
			canvasEl.remove();
		} catch (_) {}
	};
	return {
		canvasEl,
		capture,
		dispose
	};
};

//#endregion
//#region ../packages/visual/src/plot/bipolar-view.ts
var bipolar_view_exports = /* @__PURE__ */ __exportAll({ init: () => init });
function getNumericAttribute(el, name, defaultValue) {
	const a = el.getAttribute(name);
	if (a === null) return defaultValue;
	return Number.parseInt(a);
}
/**
* Initialises a plotter for bipolar values (-1...1)
* 
* ```js
* const p = BipolarView.init(`#my-canvas`);
* // Shows the dot at 1, 0.5
* p(1, 0.5);
* ```
* @param elementQuery 
* @param options 
* @returns 
*/
const init = (elementQuery, options = {}) => {
	const element = document.querySelector(elementQuery);
	if (!element) throw new Error(`Element query could not be found (${elementQuery})`);
	const labels = options.labels ?? [`x`, `y`];
	const labelPrecision = options.labelPrecision ?? 2;
	const asPercentages = options.asPercentages ?? false;
	const displayLastValues = options.displayLastValues ?? 0;
	const showWhiskers = options.showWhiskers ?? true;
	const showDot = options.showDot ?? true;
	const showLabels = options.showLabels ?? true;
	const yAxisBottomNegative = options.yAxisBottomNegative ?? true;
	const axisColour = toStringFirst(options.axisColour, `silver`);
	const bgColour = toStringFirst(options.bgColour, `white`);
	const whiskerColour = toStringFirst(options.whiskerColour, `black`);
	const dotColour = toStringFirst(options.dotColour, options.whiskerColour, `black`);
	const labelColour = toStringFirst(options.labelColour, options.axisColour, `silver`);
	const axisWidth = options.axisWidth ?? 1 * window.devicePixelRatio;
	const dotRadius = options.dotRadius ?? 5 * window.devicePixelRatio;
	const pad = options.padding ?? 10 * window.devicePixelRatio;
	const whiskerSize = options.whiskerSize ?? 5 * window.devicePixelRatio;
	const width = options.width ?? getNumericAttribute(element, `width`, 200) * window.devicePixelRatio;
	const height = options.height ?? getNumericAttribute(element, `height`, 200) * window.devicePixelRatio;
	let lastValues;
	if (displayLastValues > 0) lastValues = new QueueImmutable({
		capacity: displayLastValues,
		discardPolicy: `older`
	});
	element.width = width;
	element.height = height;
	element.style.width = `${width / window.devicePixelRatio}px`;
	element.style.height = `${height / window.devicePixelRatio}px`;
	const midY = height / 2;
	const midX = width / 2;
	const ctx = element.getContext(`2d`);
	if (!ctx) throw new Error(`Could not create drawing context`);
	if (window.devicePixelRatio >= 2) ctx.font = `20px sans-serif`;
	const percentageFormat = (v) => `${Math.round(v * 100)}%`;
	const fixedFormat = (v) => v.toFixed(labelPrecision);
	const valueFormat = asPercentages ? percentageFormat : fixedFormat;
	if (showLabels) {
		labels[0] = labels[0] + `:`;
		labels[1] = labels[1] + `:`;
	} else {
		labels[0] = ``;
		labels[1] = ``;
	}
	const renderBackground = options.renderBackground ?? ((ctx, width, height) => {
		if (options.bgColour === `transparent`) ctx.clearRect(0, 0, width, height);
		else {
			ctx.fillStyle = bgColour;
			ctx.fillRect(0, 0, width, height);
		}
	});
	return (x, y) => {
		x = clamp$2(x);
		y = clamp$2(y);
		renderBackground(ctx, width, height);
		ctx.fillStyle = labelColour;
		ctx.textBaseline = `top`;
		ctx.save();
		ctx.translate(midX, midY);
		ctx.rotate(-Math.PI / 2);
		ctx.fillText((labels[1] + ` ` + valueFormat(y)).trim(), -midX + pad, 1);
		ctx.restore();
		ctx.fillText((labels[0] + ` ` + valueFormat(x)).trim(), pad, midX + 2);
		if (!yAxisBottomNegative) y *= -1;
		ctx.strokeStyle = axisColour;
		ctx.lineWidth = axisWidth;
		ctx.beginPath();
		ctx.moveTo(pad, midY);
		ctx.lineTo(width - pad, midY);
		ctx.moveTo(midX, pad);
		ctx.lineTo(midX, height - pad);
		ctx.stroke();
		ctx.closePath();
		const yy = (height - pad - pad) / 2 * -y;
		const xx = (width - pad - pad) / 2 * x;
		const dotPos = {
			x: xx,
			y: yy,
			radius: dotRadius
		};
		if (lastValues) lastValues = lastValues.enqueue(dotPos);
		ctx.save();
		ctx.translate(midX, midY);
		if (showDot) if (lastValues) {
			const opacityStep = 1 / lastValues.length;
			let opacity = 1;
			lastValues.forEach((d) => {
				const colour = multiplyOpacity(dotColour, opacity);
				circle$1(ctx, d, { fillStyle: colour });
				opacity -= opacityStep;
			});
		} else circle$1(ctx, dotPos, { fillStyle: dotColour });
		if (showWhiskers) {
			ctx.strokeStyle = whiskerColour;
			ctx.beginPath();
			ctx.moveTo(0, yy - whiskerSize);
			ctx.lineTo(0, yy + whiskerSize);
			ctx.moveTo(xx - whiskerSize, 0);
			ctx.lineTo(xx + whiskerSize, 0);
			ctx.stroke();
			ctx.closePath();
		}
		ctx.restore();
	};
};

//#endregion
//#region ../packages/visual/src/plot/cartesian.ts
const computeMinMax = (mm) => {
	const x = mm.map((m) => m.x);
	const y = mm.map((m) => m.y);
	const minX = Math.min(...x);
	const maxX = Math.max(...x);
	const minY = Math.min(...y);
	const maxY = Math.max(...y);
	const width = maxX - minX;
	const height = maxY - minY;
	return {
		min: {
			x: minX,
			y: minY
		},
		max: {
			x: maxX,
			y: maxY
		},
		width,
		height,
		minDim: Math.min(width, height),
		maxDim: Math.max(width, height)
	};
};
const relativeCompute = (minMax) => {
	if (!Number.isFinite(minMax.height)) return (point) => point;
	const xScale = scaler(minMax.min.x, minMax.max.x);
	const yScale = scaler(minMax.min.y, minMax.max.y);
	return (point) => ({
		x: xScale(point.x),
		y: yScale(point.y)
	});
};
const absoluteCompute = (minMax) => {
	const xScale = scaler(0, 1, minMax.min.x, minMax.max.x);
	const yScale = scaler(0, 1, minMax.min.y, minMax.max.y);
	return (point) => ({
		x: xScale(point.x),
		y: yScale(point.y)
	});
};
const computeAxisMark = (mm, increments, major) => {
	const xValues = [];
	let count = 0;
	for (let x = mm.min.x; x < mm.max.x; x += increments) {
		const isMajor = count % major === 0;
		xValues.push({
			x,
			y: 0,
			major: isMajor
		});
		count++;
	}
	count = 0;
	const yValues = [];
	for (let y = mm.min.y; y < mm.max.y; y += increments) {
		const isMajor = count % major === 0;
		yValues.push({
			x: 0,
			y,
			major: isMajor
		});
		count++;
	}
	return {
		x: xValues,
		y: yValues
	};
};

//#endregion
//#region ../packages/visual/src/plot/DataSet.ts
var DataSet = class {
	#data;
	#meta;
	lastChange;
	constructor() {
		this.lastChange = performance.now();
		this.#data = new MapOfSimpleMutable();
		this.#meta = /* @__PURE__ */ new Map();
	}
	get metaCount() {
		return this.#meta.size;
	}
	clear() {
		this.#data.clear();
		this.lastChange = performance.now();
	}
	set(series, data) {
		this.#data.setValues(series, data);
	}
	deleteBySeries(series) {
		const changed = this.#data.delete(series);
		if (changed) this.lastChange = performance.now();
		return changed;
	}
	setMeta(series, meta) {
		this.#meta.set(series, meta);
	}
	hasMeta(series) {
		return this.#meta.has(series);
	}
	getMeta(series) {
		return this.#meta.get(series);
	}
	*getValues() {
		yield* this.#data.valuesFlat();
	}
	*getEntries() {
		yield* this.#data.entries();
	}
	*getSeries() {
		yield* this.#data.values();
	}
	add(value, series = `default`) {
		this.#data.addKeyedValues(series, value);
		this.lastChange = performance.now();
	}
};

//#endregion
//#region ../packages/visual/src/plot/cartesian-canvas-plot.ts
const insert = (insertOptions, options = {}) => {
	const parentEl = insertOptions.parent === void 0 ? document.body : resolveEl(insertOptions.parent);
	const canvasEl = document.createElement(`canvas`);
	parentEl.prepend(canvasEl);
	const ds = new DataSet();
	const source = new CanvasSource(canvasEl, `min`);
	const spec = insertOptions.region ?? { relativePositioned: {
		x: 0,
		y: 0,
		width: 1,
		height: 1
	} };
	const p = new CartesianCanvasPlot(source.createRegion(spec), ds, options);
	if (insertOptions.canvasResizeTo === `viewport`) ElementSizer.canvasViewport(canvasEl, { onSizeChanging: (size, _el) => {
		source.setLogicalSize(size);
		p.invalidateRange();
		p.draw();
	} });
	else ElementSizer.canvasParent(canvasEl, { onSizeChanging: (size, _el) => {
		source.setLogicalSize(size);
		p.invalidateRange();
		p.draw();
	} });
	return p;
};
/**
* Simple plotting of cartesian values.
* 
* Create a plot that fills screen
* ```js
* const p = Plot.insert({fill`viewport});
* const dataSet = p.dataSet;
* 
* // Add data
* ds.add({ x: 1, y: 2 });
* 
* // Draw
* p.draw();
* ```
*
* Create a plot that fills a container
* ```js
* const p = Plot.insert({parent:`#someel`});
* ```
* 
* Add data using the created data set
* ```js
* 
* // Add a value to the `alpha` series
* p.dataSet.add({x:1,y:1}, `alpha`);
* ```
* 
* Set default series formatting
* ```js
* p.setMeta(`default`, {
*  colour: `hsl(50,100%,50%)`,
*  lineWidth: 10
* });
* ```
* 
* Series can have metadata associated with it in the DataSet
* ```js
* // Use 'pink' by default for the series 'alpha'
* p.setMeta(`alpha`, { colour: `pink` });
* ``
* 
*/
var CartesianCanvasPlot = class CartesianCanvasPlot {
	#data;
	#lastDataChange;
	#canvasRegion;
	actualDataRange = EmptyPositioned;
	visibleRange = PlaceholderPositioned;
	show;
	whiskerLength;
	axisRounder = round$1(1, true);
	onInvalidated;
	/**
	* List of lines to draw after drawing everything else.
	* Lines are given in value-coordinate space
	*/
	overlayLines = [];
	#grid;
	#rangeMode;
	#currentRange;
	#axisStyle;
	#valueStyle;
	#connectStyle;
	#rangeManual;
	#textStyle;
	#visualPadding;
	#visualClear;
	constructor(cr, data, options = {}) {
		if (!data) throw new TypeError(`Param 'data' is undefined`);
		if (typeof data !== `object`) throw new TypeError(`Param 'data' is not an object. Got: ${typeof data}`);
		this.onInvalidated = options.onInvalidated;
		this.#data = data;
		this.#canvasRegion = cr;
		this.#lastDataChange = 0;
		this.#visualClear = options.clear ?? `region`;
		this.#rangeMode = options.range ?? `auto`;
		this.#valueStyle = options.valueStyle ?? `dot`;
		this.#connectStyle = options.connectStyle ?? ``;
		this.whiskerLength = options.whiskerLength ?? 5;
		this.#visualPadding = options.visualPadding ?? 20;
		this.show = {
			axes: true,
			axisValues: true,
			grid: true,
			whiskers: true,
			...options.show
		};
		this.#axisStyle = {
			colour: `black`,
			width: 2,
			...options.axisStyle
		};
		this.#textStyle = {
			colour: `black`,
			size: `1em`,
			font: `system-ui`,
			...options.textStyle
		};
		this.#grid = {
			increments: .1,
			major: 5,
			colour: `whitesmoke`,
			width: 1,
			...options.grid
		};
	}
	static fromCanvas(queryOrEl, data, options = {}) {
		const source = new CanvasSource(queryOrEl, `min`);
		const bounds = source.element.getBoundingClientRect();
		return new CartesianCanvasPlot(source.createRegion({
			absPositioned: {
				x: 0,
				y: 0,
				width: bounds.width,
				height: bounds.height
			},
			scale: `independent`
		}), data, options);
	}
	getCurrentRange() {
		if (this.#data.lastChange === this.#lastDataChange && this.#currentRange) return this.#currentRange;
		this.#lastDataChange = this.#data.lastChange;
		const r = this.#createRange();
		this.#currentRange = r;
		if (this.onInvalidated) this.onInvalidated();
		return r;
	}
	invalidateRange() {
		this.#currentRange = void 0;
	}
	#createRange() {
		const range = this.getDataRange();
		const absDataToRelative = relativeCompute(range);
		const relDataToAbs = absoluteCompute(range);
		const cr = this.#canvasRegion;
		const padding = this.#visualPadding;
		let xOffset = cr.x + padding;
		let yOffset = cr.y + padding;
		const allowedHeight = cr.height - padding * 2;
		const allowedWidth = cr.width - padding * 2;
		const dimensionMin = Math.min(allowedHeight, allowedWidth);
		if (allowedWidth >= allowedHeight) xOffset += allowedWidth / 2 - dimensionMin / 2;
		else yOffset += allowedHeight / 2 - dimensionMin / 2;
		const relDataToCanvas = (pt) => {
			let { x, y } = pt;
			if (x === Number.NEGATIVE_INFINITY) x = 0;
			else if (x === Number.POSITIVE_INFINITY) x = 1;
			if (y === Number.NEGATIVE_INFINITY) y = 0;
			else if (y === Number.POSITIVE_INFINITY) y = 1;
			x = x * dimensionMin;
			y = (1 - y) * dimensionMin;
			x += xOffset;
			y += yOffset;
			return {
				x,
				y
			};
		};
		const canvasToRelData = (pt) => {
			let { x, y } = pt;
			x -= xOffset;
			y -= yOffset;
			x = x / dimensionMin;
			y = 1 - y / dimensionMin;
			return {
				x,
				y
			};
		};
		const regionSpaceToRelative = (pt) => {
			let { x, y } = pt;
			x = x - cr.x + this.#visualPadding;
			y = dimensionMin + this.#visualPadding - y;
			x /= dimensionMin;
			y = y / dimensionMin;
			return {
				x,
				y
			};
		};
		return {
			absDataToRelative,
			relDataToCanvas,
			canvasToRelData,
			regionSpaceToRelative,
			relDataToAbs,
			range
		};
	}
	/**
	* Positions an element at the viewport location of `data` point.
	* Ensure the element has `position:absolute` set.
	* @param data 
	* @param elementToPosition 
	* @param by 
	*/
	positionElementAt(data, elementToPosition, by = `middle`, relativeToQuery) {
		const el = resolveEl(elementToPosition);
		let { x, y } = this.valueToScreenSpace(data);
		if (by === `middle`) {
			const bounds = el.getBoundingClientRect();
			x -= bounds.width / 2;
			y -= bounds.height / 2;
		} else if (by === `top-left`) {} else throw new Error(`Param 'by' expected to be 'middle' or 'top-left'.`);
		if (relativeToQuery) {
			const bounds = resolveEl(relativeToQuery).getBoundingClientRect();
			x -= bounds.x;
			y -= bounds.y;
		}
		el.style.left = `${x}px`;
		el.style.top = `${y}px`;
	}
	/**
	* When range is auto, returns the range of the data
	* Otherwise returns the user-provided range.
	* @returns 
	*/
	getDataRange() {
		if (this.#rangeMode === `auto`) return computeMinMax([...this.#data.getValues()]);
		else {
			if (!this.#rangeManual) this.#rangeManual = computeMinMax([this.#rangeMode.max, this.#rangeMode.min]);
			return this.#rangeManual;
		}
	}
	valueToScreenSpace(dataPoint) {
		const region = this.valueToRegionSpace(dataPoint);
		const offset = this.canvasSource.offset;
		return {
			x: region.x + offset.x,
			y: region.y + offset.y
		};
	}
	valueToRegionSpace(dataValue, debug = false) {
		const ds = this.getCurrentRange();
		const rel = ds.absDataToRelative(dataValue);
		const region = ds.relDataToCanvas(rel);
		if (debug) console.log(`orig: ${dataValue.x}x${dataValue.y} rel: ${rel.x}x${rel.y} region: ${region.x}x${region.y}`);
		return {
			...dataValue,
			x: region.x,
			y: region.y
		};
	}
	/**
	* Converts a point in pixel coordinates to a value.
	* Useful for converting from user input coordinates.
	* @param point 
	* @returns 
	*/
	pointToValue(point, _source) {
		const ds = this.getCurrentRange();
		const canvasPoint = subtract(point, this.canvasSource.offset);
		const v = ds.canvasToRelData(canvasPoint);
		return ds.relDataToAbs(v);
	}
	/**
	* Compute canvas-relative coordinates based on two points in value space
	* @param valueA 
	* @param valueB 
	*/
	#valueLineToCanvasSpace(valueA, valueB, debug = false) {
		valueA = this.valueToRegionSpace(valueA, debug);
		valueB = this.valueToRegionSpace(valueB, debug);
		return {
			a: valueA,
			b: valueB
		};
	}
	getDefaultMeta() {
		return {
			colour: goldenAngleColour(this.#data.metaCount),
			lineWidth: 2,
			dotRadius: 5
		};
	}
	draw() {
		if (this.#visualClear === `region`) this.#canvasRegion.clear();
		else this.canvasSource.clear();
		this.#useGrid();
		if (this.show.axes) this.#drawAxes();
		for (const [k, v] of this.#data.getEntries()) {
			let meta = this.#data.getMeta(k);
			if (!meta) {
				meta = this.getDefaultMeta();
				this.#data.setMeta(k, meta);
			}
			this.#drawSeries(k, v, meta);
		}
		for (const line of this.overlayLines) this.drawLine(line, line.colour, line.width);
	}
	/**
	* Draws a line in value-coordinate space
	* @param line 
	* @param colour 
	* @param width 
	*/
	drawLine(line, colour, width) {
		const l = this.#valueLineToCanvasSpace(line.a, line.b);
		this.#drawLineCanvasSpace(l, colour, width);
	}
	setMeta(series, meta) {
		this.#data.setMeta(series, {
			...this.getDefaultMeta(),
			...meta
		});
	}
	#drawAxes() {
		const { colour, width } = this.#axisStyle;
		const yAxis = this.#valueLineToCanvasSpace({
			x: 0,
			y: Number.NEGATIVE_INFINITY
		}, {
			x: 0,
			y: Number.POSITIVE_INFINITY
		}, false);
		const xAxis = this.#valueLineToCanvasSpace({
			x: Number.NEGATIVE_INFINITY,
			y: 0
		}, {
			x: Number.POSITIVE_INFINITY,
			y: 0
		}, false);
		this.#drawLineCanvasSpace(xAxis, colour, width, false);
		this.#drawLineCanvasSpace(yAxis, colour, width, false);
	}
	#drawYAxisValues(yPoints) {
		const ctx = this.#canvasRegion.context;
		ctx.font = this.#textStyle.size + ` ` + this.#textStyle.font;
		ctx.fillStyle = this.#textStyle.colour;
		ctx.textBaseline = `middle`;
		for (const p of yPoints) {
			if (p.x === 0 && p.y === 0) continue;
			const reg = this.valueToRegionSpace(p, false);
			const label = this.axisRounder(p.y).toString();
			const measure = ctx.measureText(label);
			const x = reg.x - measure.width - this.whiskerLength / 2 - 5;
			const y = reg.y;
			ctx.fillText(label, x, y);
		}
	}
	#drawXAxisValues(xPoints) {
		const ctx = this.#canvasRegion.context;
		ctx.font = this.#textStyle.size + ` ` + this.#textStyle.font;
		ctx.fillStyle = this.#textStyle.colour;
		ctx.textBaseline = `top`;
		for (const p of xPoints) {
			const reg = this.valueToRegionSpace(p, false);
			const label = this.axisRounder(p.x).toString();
			const measure = ctx.measureText(label);
			const x = reg.x - measure.width / 2;
			const y = reg.y + measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent + this.whiskerLength / 2;
			ctx.fillText(label, x, y);
		}
	}
	#drawWhisker(p, vertical) {
		const whiskerHalfLength = this.whiskerLength / 2;
		const v = vertical ? {
			x: p.x,
			y: 0
		} : {
			y: p.y,
			x: 0
		};
		const reg = this.valueToRegionSpace(v, false);
		const line = vertical ? {
			a: {
				x: reg.x,
				y: reg.y - whiskerHalfLength
			},
			b: {
				x: reg.x,
				y: reg.y + whiskerHalfLength
			}
		} : {
			a: {
				y: reg.y,
				x: reg.x - whiskerHalfLength
			},
			b: {
				y: reg.y,
				x: reg.x + whiskerHalfLength
			}
		};
		this.#drawLineCanvasSpace(line, this.#axisStyle.colour, this.#axisStyle.width, false);
	}
	#drawGridline(p, vertical) {
		const line = vertical ? this.#valueLineToCanvasSpace({
			x: p.x,
			y: Number.NEGATIVE_INFINITY
		}, {
			x: p.x,
			y: Number.POSITIVE_INFINITY
		}) : this.#valueLineToCanvasSpace({
			y: p.y,
			x: Number.NEGATIVE_INFINITY
		}, {
			y: p.y,
			x: Number.POSITIVE_INFINITY
		}, false);
		this.#drawLineCanvasSpace(line, this.#grid.colour, p.major ? this.#grid.width * 2 : this.#grid.width);
	}
	#useGrid() {
		const g = this.#grid;
		const showGrid = this.show.grid;
		const showWhiskers = this.show.whiskers;
		const showValues = this.show.axisValues;
		const mm = this.getCurrentRange().range;
		const { increments, major } = g;
		const axisMarks = computeAxisMark(mm, increments, major);
		for (const p of axisMarks.x) {
			if (showGrid) this.#drawGridline(p, true);
			if (showWhiskers && p.major) this.#drawWhisker(p, true);
		}
		for (const p of axisMarks.y) {
			if (showGrid) this.#drawGridline(p, false);
			if (showWhiskers && p.major) this.#drawWhisker(p, false);
		}
		if (showValues) {
			this.#drawXAxisValues(axisMarks.x.filter((p) => p.major));
			this.#drawYAxisValues(axisMarks.y.filter((p) => p.major));
		}
	}
	#drawSeries(name, series, meta) {
		if (this.#connectStyle === `line`) this.#drawConnected(series, meta.colour, meta.lineWidth);
		if (this.#valueStyle === `dot`) for (const v of series) this.#drawDot(v, meta.colour, meta.dotRadius);
	}
	#drawConnected(dots, colour, width) {
		const ctx = this.#canvasRegion.context;
		ctx.beginPath();
		for (const [index, dot_] of dots.entries()) {
			const dot = this.valueToRegionSpace(dot_, false);
			if (index === 0) ctx.moveTo(dot.x, dot.y);
			ctx.lineTo(dot.x, dot.y);
		}
		ctx.strokeStyle = toCssColour(colour);
		ctx.lineWidth = width;
		ctx.stroke();
		ctx.closePath();
	}
	#drawDot(originalDot, fallbackColour, fallbackRadius) {
		const colour = toCssColour(originalDot.fillStyle ?? fallbackColour);
		const pos = this.valueToRegionSpace(originalDot);
		const radius = originalDot.radius ?? fallbackRadius;
		this.#canvasRegion.drawCircles([{
			...pos,
			radius
		}], colour);
	}
	#drawLineCanvasSpace(line, colour, width, debug = false) {
		if (debug) console.log(line);
		const ctx = this.#canvasRegion.context;
		colour = toCssColour(colour);
		ctx.beginPath();
		ctx.moveTo(line.a.x, line.a.y);
		ctx.lineTo(line.b.x, line.b.y);
		ctx.strokeStyle = toCssColour(colour);
		ctx.lineWidth = width;
		ctx.stroke();
		ctx.closePath();
	}
	get dataSet() {
		return this.#data;
	}
	get canvasRegion() {
		return this.#canvasRegion;
	}
	get canvasSource() {
		return this.#canvasRegion.source;
	}
};

//#endregion
//#region ../packages/visual/src/plot/index.ts
var plot_exports = /* @__PURE__ */ __exportAll({
	BipolarView: () => bipolar_view_exports,
	CartesianCanvasPlot: () => CartesianCanvasPlot,
	DataSet: () => DataSet,
	absoluteCompute: () => absoluteCompute,
	computeAxisMark: () => computeAxisMark,
	computeMinMax: () => computeMinMax,
	insert: () => insert,
	relativeCompute: () => relativeCompute
});

//#endregion
//#region ../packages/visual/src/index.ts
var src_exports = /* @__PURE__ */ __exportAll({
	CanvasHelper: () => CanvasHelper,
	CanvasRegion: () => CanvasRegion,
	CanvasSource: () => CanvasSource,
	Colour: () => colour_exports,
	Convolve2d: () => convolve_2d_exports,
	Drawing: () => drawing_exports,
	ImageDataGrid: () => image_data_grid_exports,
	Plot: () => plot_exports,
	Svg: () => svg_exports,
	Video: () => video_exports,
	pointerVisualise: () => pointerVisualise
});
try {
	if (typeof window !== `undefined`) window.ixfx = {
		...window.ixfx,
		Visuals: {
			NamedColourPalette: named_colour_palette_exports,
			Colour: colour_exports,
			Video: video_exports
		}
	};
} catch {}

//#endregion
export { fromCss$3 as _, convolve_2d_exports as a, CanvasRegion as c, image_data_grid_exports as d, drawing_exports as f, fromCss$2 as g, toCssColour as h, video_exports as i, CanvasSource as l, toColour as m, plot_exports as n, pointerVisualise as o, colour_exports as p, manualCapture as r, svg_exports as s, src_exports as t, CanvasHelper as u, toCssString$2 as v };
//# sourceMappingURL=src-rbv0r-Un.js.map