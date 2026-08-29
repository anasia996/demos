import { n as __exportAll } from "./chunk-CaR5F9JI.js";
import { Ct as zipKeyValue } from "./src-D552aW4b.js";
import { D as errorResult, N as resultThrow, T as percentTest, d as booleanTest, n as stringTest, w as numberTest, y as integerTest, z as throwIfFailed } from "./src-DZFdrMH_.js";
import { M as findIndex, N as findIndexReverse, j as filterWithIndex, u as sortByNumericProperty } from "./src-B6pmAinX.js";
import { c as mutable } from "./src-CkNW04JY.js";
import { A as round$1, E as movingAverageLight, L as wrap$3, _t as minFast, b as quantiseEvery$1, f as scale, ft as dotProduct$3, it as clampIndex, k as linearSpace, rt as clamp$1, vt as minIndex } from "./src-C1pyiFt0.js";
import { n as TrackedValueMap, r as ObjectTracker } from "./src-kofdJIYS.js";
import { O as randomElement } from "./src-C_3O0Q5h.js";

//#region ../packages/geometry/src/point/guard.ts
/**
* Returns true if xy (and z, if present) are _null_.
* @param p
* @returns True if all props are null
*/
function isNull(p) {
	if (isPoint3d(p)) {
		if (p.z !== null) return false;
	}
	return p.x === null && p.y === null;
}
/***
* Returns true if either x, y, z isNaN.
*/
function isNaN$1(p) {
	if (isPoint3d(p)) {
		if (!Number.isNaN(p.z)) return false;
	}
	return Number.isNaN(p.x) || Number.isNaN(p.y);
}
function pointTest(p, name = `Point`, extraInfo = ``) {
	if (p === void 0) return errorResult(`Param '${name}' is undefined. Expected {x,y}}`, extraInfo);
	if (p === null) return errorResult(`Param '${name}' is null. Expected {x,y}`, extraInfo);
	if (typeof p !== `object`) return errorResult(`Param '${name}' is type '${typeof p}'. Expected object.`, extraInfo);
	if (p.x === void 0) return errorResult(`Param '${name}.x' is undefined. Expected {x,y} got ${JSON.stringify(p)}`, extraInfo);
	if (p.y === void 0) return errorResult(`Param '${name}.y' is undefined. Expected {x,y} got ${JSON.stringify(p)}`, extraInfo);
	if (typeof p.x !== `number`) return errorResult(`Param '${name}.x' must be a number. Got ${typeof p.x}`, extraInfo);
	if (typeof p.y !== `number`) return errorResult(`Param '${name}.y' must be a number. Got ${typeof p.y}`, extraInfo);
	if (p.z !== void 0) {
		if (typeof p.z !== `number`) return errorResult(`${name}.z must be a number. Got: ${typeof p.z}`, extraInfo);
		if (Number.isNaN(p.z)) return errorResult(`'${name}.z' is NaN. Got: ${JSON.stringify(p)}`, extraInfo);
	}
	if (p.x === null) return errorResult(`'${name}.x' is null`, extraInfo);
	if (p.y === null) return errorResult(`'${name}.y' is null`, extraInfo);
	if (Number.isNaN(p.x)) return errorResult(`'${name}.x' is NaN`, extraInfo);
	if (Number.isNaN(p.y)) return errorResult(`'${name}.y' is NaN`, extraInfo);
	return {
		success: true,
		value: p
	};
}
/**
* Throws an error if point is invalid
* @param p
* @param name
*/
function guard$5(p, name = `Point`, info) {
	resultThrow(pointTest(p, name, info));
}
/**
* Throws if parameter is not a valid point, or either x or y is 0
* @param pt
* @returns Throws an error if not a valid point or zero.
*/
function guardNonZeroPoint(pt, name = `pt`) {
	guard$5(pt, name);
	resultThrow(numberTest(pt.x, `nonZero`, `${name}.x`), numberTest(pt.y, `nonZero`, `${name}.y`), () => {
		if (typeof pt.z !== `undefined`) return numberTest(pt.z, `nonZero`, `${name}.z`);
	});
	return true;
}
/**
* Returns _true_ if `p` has x & y properties.
* Returns _false_ if `p` is undefined, null or does not contain properties.
* Use {@link isPoint3d} to check further check for `z`.
* @param p
* @returns True if `p` has x & y props
*/
function isPoint(p) {
	if (p === void 0) return false;
	if (p === null) return false;
	if (p.x === void 0) return false;
	if (p.y === void 0) return false;
	return true;
}
/**
* Returns _true_ if `p` has x, y, & z properties.
* Returns _false_ if `p` is undefined, null or does not contain properties.
* @param p
* @returns _True_ if `p` has x, y, & z props
*/
function isPoint3d(p) {
	if (p === void 0) return false;
	if (p === null) return false;
	if (p.x === void 0) return false;
	if (p.y === void 0) return false;
	if (p.z === void 0) return false;
	return true;
}
/**
* Returns true if both xy (and z, if present) are 0.
* Use `Points.Empty` to return an empty point.
* @param p
* @returns _True_ is all props are 0
*/
function isEmpty$3(p) {
	if (isPoint3d(p)) {
		if (p.z !== 0) return false;
	}
	return p.x === 0 && p.y === 0;
}
/**
* Returns true if point is a placeholder, where xy (and z, if present)
* are `NaN`.
*
* Use Points.Placeholder to return a placeholder point.
* @param p
* @returns True if all props are NaN
*/
function isPlaceholder$3(p) {
	if (isPoint3d(p)) {
		if (!Number.isNaN(p.z)) return false;
	}
	return Number.isNaN(p.x) && Number.isNaN(p.y);
}

//#endregion
//#region ../packages/geometry/src/rect/guard.ts
/**
* Throws an error if the dimensions of the rectangle are undefined, NaN or negative.
* @param d 
* @param name 
*/
const guardDim = (d, name = `Dimension`) => {
	if (d === void 0) throw new Error(`${name} is undefined`);
	if (Number.isNaN(d)) throw new Error(`${name} is NaN`);
	if (d < 0) throw new Error(`${name} cannot be negative`);
};
/**
* Throws an error if rectangle is missing fields or they
* are not valid.
* 
* Checks:
* * `width` and `height` must be defined on `rect`
* * dimensions (w & h) must not be NaN
* * dimensions (w & h) must not be negative
* 
* If `rect` has x,y, this value is checked as well.
* @param rect
* @param name
*/
const guard$4 = (rect, name = `rect`) => {
	if (rect === void 0) throw new Error(`{$name} undefined`);
	if (isPositioned$2(rect)) guard$5(rect, name);
	guardDim(rect.width, name + `.width`);
	guardDim(rect.height, name + `.height`);
};
/**
* Returns a positioned rect or if it's not possible, throws an error.
* 
* If `rect` does not have a position, `origin` is used.
* If `rect` is positioned and `origin` is provided, returned result uses `origin` as x,y instead.
* ```js
* // Returns input because it's positioned
* getRectPositioned({ x:1, y:2, width:10, height:20 });
* 
* // Returns { x:1, y:2, width:10, height:20 }
* getRectPositioned({ width:10, height:20 }, { x:1, y:2 });
*  
* // Throws, because we have no point
* getRectPositioned({width:10,height:20})
* ```
* @param rect 
* @param origin 
* @returns 
*/
const getRectPositioned = (rect, origin) => {
	guard$4(rect);
	if (isPositioned$2(rect) && origin === void 0) return rect;
	if (origin === void 0) throw new Error(`Unpositioned rect needs origin parameter`);
	return Object.freeze({
		...rect,
		...origin
	});
};
/**
* Throws an error if `rect` is does not have a position, or
* is an invalid rectangle
* @param rect 
* @param name 
*/
const guardPositioned$1 = (rect, name = `rect`) => {
	if (!isPositioned$2(rect)) throw new Error(`Expected ${name} to have x,y`);
	guard$4(rect, name);
};
/**
* Returns _true_ if `rect` has width and height values of 0.
* Use Rects.Empty or Rects.EmptyPositioned to generate an empty rectangle.
* @param rect 
* @returns 
*/
const isEmpty$2 = (rect) => rect.width === 0 && rect.height === 0;
/**
* Returns _true_ if `rect` is a placeholder, with both width and height values of NaN.
* Use Rects.Placeholder or Rects.PlaceholderPositioned to generate a placeholder.
* @param rect 
* @returns 
*/
const isPlaceholder$2 = (rect) => Number.isNaN(rect.width) && Number.isNaN(rect.height);
/**
* Returns _true_ if `rect` has position (x,y) fields.
* @param rect Point, Rect or RectPositiond
* @returns
*/
const isPositioned$2 = (rect) => rect.x !== void 0 && rect.y !== void 0;
/**
* Returns _true_ if `rect` has width and height fields.
* @param rect
* @returns
*/
const isRect = (rect) => {
	if (rect === void 0) return false;
	if (rect.width === void 0) return false;
	if (rect.height === void 0) return false;
	return true;
};
/**
* Returns _true_ if `rect` is a positioned rectangle
* Having width, height, x and y properties.
* @param rect
* @returns
*/
const isRectPositioned = (rect) => isRect(rect) && isPositioned$2(rect);

//#endregion
//#region ../packages/geometry/src/rect/apply.ts
/**
* Applies an operation over each field of a rectangle.
* ```js
* // Convert x,y,width,height to integer values
* applyFields(v => Number.floor(v), someRect);
* ```
* @param op
* @param rectOrWidth 
* @param heightValue 
* @returns 
*/
function applyFields(op, rectOrWidth, heightValue) {
	let width = typeof rectOrWidth === `number` ? rectOrWidth : rectOrWidth.width;
	let height = typeof rectOrWidth === `number` ? heightValue : rectOrWidth.height;
	if (width === void 0) throw new Error(`Param 'width' undefined`);
	if (height === void 0) throw new Error(`Param 'height' undefined`);
	width = op(width, `width`);
	height = op(height, `height`);
	if (typeof rectOrWidth === `object`) if (isPositioned$2(rectOrWidth)) {
		const x = op(rectOrWidth.x, `x`);
		const y = op(rectOrWidth.y, `y`);
		return {
			...rectOrWidth,
			width,
			height,
			x,
			y
		};
	} else return {
		...rectOrWidth,
		width,
		height
	};
	return {
		width,
		height
	};
}
/**
* Applies an joint operation field-wise on two rectangles, returning a single rectangle. This is used to support operations like summing two rectangles.
* ```js
* // Eg make a new rectangle by summing each field of rectangle A & B.
* apply((valueA,valueB) => valueA+valueB, rectA, rectB);
* ```
* @param op 
* @param a 
* @param b 
* @param c 
* @returns 
*/
function applyMerge(op, a, b, c) {
	guard$4(a, `a`);
	if (isRect(b)) return isRectPositioned(a) ? Object.freeze({
		...a,
		x: op(a.x, b.width),
		y: op(a.y, b.height),
		width: op(a.width, b.width),
		height: op(a.height, b.height)
	}) : Object.freeze({
		...a,
		width: op(a.width, b.width),
		height: op(a.height, b.height)
	});
	else {
		if (typeof b !== `number`) throw new TypeError(`Expected second parameter of type Rect or number. Got ${JSON.stringify(b)}`);
		if (typeof c !== `number`) throw new Error(`Expected third param as height. Got ${JSON.stringify(c)}`);
		return isRectPositioned(a) ? Object.freeze({
			...a,
			x: op(a.x, b),
			y: op(a.y, c),
			width: op(a.width, b),
			height: op(a.height, c)
		}) : Object.freeze({
			...a,
			width: op(a.width, b),
			height: op(a.height, c)
		});
	}
}
function applyScalar(op, rect, parameter) {
	return isPositioned$2(rect) ? Object.freeze({
		...rect,
		x: op(rect.x, parameter),
		y: op(rect.y, parameter),
		width: op(rect.width, parameter),
		height: op(rect.height, parameter)
	}) : Object.freeze({
		...rect,
		width: op(rect.width, parameter),
		height: op(rect.height, parameter)
	});
}
/**
* Applies `op` with `param` to `rect`'s width and height.
* @param op 
* @param rect 
* @param parameter 
* @returns 
*/
function applyDim(op, rect, parameter) {
	return Object.freeze({
		...rect,
		width: op(rect.width, parameter),
		height: op(rect.height, parameter)
	});
}

//#endregion
//#region ../packages/geometry/src/rect/area.ts
/**
* Returns the area of `rect`
*
* ```js
* const rect = { width: 100, height: 100, x: 100, y: 100 };
* Rects.area(rect);
* ```
* @param rect
* @returns
*/
const area$5 = (rect) => {
	guard$4(rect);
	return rect.height * rect.width;
};

//#endregion
//#region ../packages/geometry/src/rect/cardinal.ts
/**
* Returns a point on cardinal direction, or 'center' for the middle.
*
* ```js
* cardinal({x: 10, y:10, width:100, height: 20}, 'center');
* ```
* @param rect Rectangle
* @param card Cardinal direction or 'center'
* @returns Point
*/
const cardinal = (rect, card) => {
	const { x, y, width, height } = rect;
	switch (card) {
		case `nw`: return Object.freeze({
			x,
			y
		});
		case `n`: return Object.freeze({
			x: x + width / 2,
			y
		});
		case `ne`: return Object.freeze({
			x: x + width,
			y
		});
		case `sw`: return Object.freeze({
			x,
			y: y + height
		});
		case `s`: return Object.freeze({
			x: x + width / 2,
			y: y + height
		});
		case `se`: return Object.freeze({
			x: x + width,
			y: y + height
		});
		case `w`: return Object.freeze({
			x,
			y: y + height / 2
		});
		case `e`: return Object.freeze({
			x: x + width,
			y: y + height / 2
		});
		case `center`: return Object.freeze({
			x: x + width / 2,
			y: y + height / 2
		});
		default: throw new Error(`Unknown direction: ${card}`);
	}
};

//#endregion
//#region ../packages/geometry/src/rect/center.ts
/**
* Returns the center of a rectangle as a {@link Point}.
*  If the rectangle lacks a position and `origin` parameter is not provided, 0,0 is used instead.
*
* ```js
* const p = Rects.center({x:10, y:20, width:100, height:50});
* const p2 = Rects.center({width: 100, height: 50}); // Assumes 0,0 for rect x,y
* ```
* @param rect Rectangle
* @param origin Optional origin. Overrides `rect` position if available. If no position is available 0,0 is used by default.
* @returns
*/
const center$2 = (rect, origin) => {
	guard$4(rect);
	if (origin === void 0 && isPoint(rect)) origin = rect;
	else if (origin === void 0) origin = {
		x: 0,
		y: 0
	};
	getRectPositioned(rect, origin);
	return Object.freeze({
		x: origin.x + rect.width / 2,
		y: origin.y + rect.height / 2
	});
};

//#endregion
//#region ../packages/geometry/src/rect/center-origin.ts
/**
* Perform basic point translation using a rectangle where its center is the origin.
* 
* Thus the relative coordinate { x: 0, y: 0} corresponds to the absolute middle of the
* rectangle.
* 
* The relative coordinate { x: -1, y: -1 } corresponds to the rectangle's {x,y} properties, and so on.
* @param rectAbsolute 
* @returns 
*/
const centerOrigin = (rectAbsolute) => {
	const c = center$2(rectAbsolute);
	const w = rectAbsolute.width / 2;
	const h = rectAbsolute.height / 2;
	const relativeToAbsolute = (point) => {
		return {
			...point,
			x: point.x * w + c.x,
			y: point.y * h + c.y
		};
	};
	const absoluteToRelative = (point) => {
		return {
			...point,
			x: (point.x - rectAbsolute.x) / w - 1,
			y: (point.y - rectAbsolute.y) / h - 1
		};
	};
	return {
		relativeToAbsolute,
		absoluteToRelative
	};
};

//#endregion
//#region ../packages/geometry/src/rect/corners.ts
/**
* Returns the four corners of a rectangle as an array of Points.
*
* ```js
* const rect = { width: 100, height: 100, x: 0, y: 0};
* const pts = Rects.corners(rect);
* ```
*
* If the rectangle is not positioned, is origin can be provided.
* Order of corners: ne, nw, sw, se
* @param rect
* @param origin
* @returns
*/
const corners$1 = (rect, origin) => {
	const r = getRectPositioned(rect, origin);
	return [
		{
			x: r.x,
			y: r.y
		},
		{
			x: r.x + r.width,
			y: r.y
		},
		{
			x: r.x + r.width,
			y: r.y + r.height
		},
		{
			x: r.x,
			y: r.y + r.height
		}
	];
};

//#endregion
//#region ../packages/geometry/src/point/get-point-parameter.ts
function getTwoPointParameters(a1, ab2, ab3, ab4, ab5, ab6) {
	if (isPoint3d(a1) && isPoint3d(ab2)) return [a1, ab2];
	if (isPoint(a1) && isPoint(ab2)) return [a1, ab2];
	if (isPoint3d(a1)) {
		const b = {
			x: ab2,
			y: ab3,
			z: ab4
		};
		if (!isPoint3d(b)) throw new Error(`Expected x, y & z parameters`);
		return [a1, b];
	}
	if (isPoint(a1)) {
		const b = {
			x: ab2,
			y: ab3
		};
		if (!isPoint(b)) throw new Error(`Expected x & y parameters`);
		return [a1, b];
	}
	if (typeof ab5 !== `undefined` && typeof ab4 !== `undefined`) {
		const a = {
			x: a1,
			y: ab2,
			z: ab3
		};
		const b = {
			x: ab4,
			y: ab5,
			z: ab6
		};
		if (!isPoint3d(a)) throw new Error(`Expected x,y,z for first point`);
		if (!isPoint3d(b)) throw new Error(`Expected x,y,z for second point`);
		return [a, b];
	}
	const a = {
		x: a1,
		y: ab2
	};
	const b = {
		x: ab3,
		y: ab4
	};
	if (!isPoint(a)) throw new Error(`Expected x,y for first point`);
	if (!isPoint(b)) throw new Error(`Expected x,y for second point`);
	return [a, b];
}
/**
* Returns a Point form of either a point, x,y params or x,y,z params.
* If parameters are undefined, an empty point is returned (0, 0)
* @ignore
* @param a
* @param b
* @returns
*/
function getPointParameter$1(a, b, c) {
	if (a === void 0) return {
		x: 0,
		y: 0
	};
	if (Array.isArray(a)) {
		if (a.length === 0) return Object.freeze({
			x: 0,
			y: 0
		});
		if (a.length === 1) return Object.freeze({
			x: a[0],
			y: 0
		});
		if (a.length === 2) return Object.freeze({
			x: a[0],
			y: a[1]
		});
		if (a.length === 3) return Object.freeze({
			x: a[0],
			y: a[1],
			z: a[2]
		});
		throw new Error(`Expected array to be 1-3 elements in length. Got ${a.length}.`);
	}
	if (isPoint(a)) return a;
	else if (typeof a !== `number` || typeof b !== `number`) throw new TypeError(`Expected point or x,y as parameters. Got: a: ${JSON.stringify(a)} b: ${JSON.stringify(b)}`);
	if (typeof c === `number`) return Object.freeze({
		x: a,
		y: b,
		z: c
	});
	return Object.freeze({
		x: a,
		y: b
	});
}

//#endregion
//#region ../packages/geometry/src/point/distance.ts
/**
* Calculate distance between two points.
* If both points have a `z` property, the distance is 3D distance is calculated.
* If only one point has a `z`, it is ignored. To force 2D distance, use {@link distance2d}
*
* ```js
* // Distance between two points
* const ptA = { x: 0.5, y:0.8 };
* const ptB = { x: 1, y: 0.4 };
* distance(ptA, ptB);
* // Or, provide x,y as parameters
* distance(ptA, 0.4, 0.9);
*
* // Distance from ptA to x: 0.5, y:0.8, z: 0.1
* const ptC = { x: 0.5, y:0.5, z: 0.3 };
* // With x,y,z as parameters:
* distance(ptC, 0.5, 0.8, 0.1);
* ```
* @param a First point
* @param xOrB Second point, or x coord
* @param y y coord, if x coord is given
* @param z Optional z coord, if x and y are given.
* @returns
*/
function distance$2(a, xOrB, y, z) {
	const pt = getPointParameter$1(xOrB, y, z);
	guard$5(pt, `b`);
	guard$5(a, `a`);
	return isPoint3d(pt) && isPoint3d(a) ? Math.hypot(pt.x - a.x, pt.y - a.y, pt.z - a.z) : Math.hypot(pt.x - a.x, pt.y - a.y);
}
/**
* As {@link distance} but always compares by x,y only.
* @param a
* @param xOrB 
* @param y
* @returns 
*/
function distance2d(a, xOrB, y) {
	const pt = getPointParameter$1(xOrB, y);
	guard$5(pt, `b`);
	guard$5(a, `a`);
	return Math.hypot(pt.x - a.x, pt.y - a.y);
}

//#endregion
//#region ../packages/geometry/src/circle/guard.ts
/**
* Throws if radius is out of range. If x,y is present, these will be validated too.
* @param circle 
* @param parameterName 
*/
const guard$3 = (circle, parameterName = `circle`) => {
	if (isCirclePositioned(circle)) guard$5(circle, `circle`);
	if (Number.isNaN(circle.radius)) throw new Error(`${parameterName}.radius is NaN`);
	if (circle.radius <= 0) throw new Error(`${parameterName}.radius must be greater than zero`);
};
/**
* Throws if `circle` is not positioned or has dodgy fields
* @param circle 
* @param parameterName 
* @returns 
*/
const guardPositioned = (circle, parameterName = `circle`) => {
	if (!isCirclePositioned(circle)) throw new Error(`Expected a positioned circle with x,y`);
	guard$3(circle, parameterName);
};
/***
* Returns true if radius, x or y are NaN
*/
const isNaN = (a) => {
	if (Number.isNaN(a.radius)) return true;
	if (isCirclePositioned(a)) {
		if (Number.isNaN(a.x)) return true;
		if (Number.isNaN(a.y)) return true;
	}
	return false;
};
/**
* Returns true if parameter has x,y. Does not verify if parameter is a circle or not
* 
* ```js
* const circleA = { radius: 5 };
* Circles.isPositioned(circle); // false
* 
* const circleB = { radius: 5, x: 10, y: 10 }
* Circles.isPositioned(circle); // true
* ```
* @param p Circle
* @returns 
*/
const isPositioned$1 = (p) => p.x !== void 0 && p.y !== void 0;
const isCircle = (p) => p.radius !== void 0;
const isCirclePositioned = (p) => isCircle(p) && isPositioned$1(p);

//#endregion
//#region ../packages/geometry/src/circle/is-equal.ts
/**
* Returns true if the two objects have the same values
*
* ```js
* const circleA = { radius: 10, x: 5, y: 5 };
* const circleB = { radius: 10, x: 5, y: 5 };
* 
* circleA === circleB; // false, because identity of objects is different
* Circles.isEqual(circleA, circleB); // true, because values are the same
* ```
* 
* Circles must both be positioned or not.
* @param a
* @param b
* @returns
*/
const isEqual$6 = (a, b) => {
	if (a.radius !== b.radius) return false;
	if (isCirclePositioned(a) && isCirclePositioned(b)) {
		if (a.x !== b.x) return false;
		if (a.y !== b.y) return false;
		if (a.z !== b.z) return false;
		return true;
	} else if (!isCirclePositioned(a) && !isCirclePositioned(b)) return true;
	else return false;
	return false;
};

//#endregion
//#region ../packages/geometry/src/point/sum.ts
/**
* Returns a Point with the x,y,z values of two points added.
* 
* `z` parameter is used, if present. Uses a default value of 0 for 'z' when adding a 2D point with a 3D one.
*
* Examples:
*
* ```js
* sum(ptA, ptB);
* sum(x1, y1, x2, y2);
* sum(ptA, x2, y2);
* ```
*/
function sum$3(a1, ab2, ab3, ab4, ab5, ab6) {
	const [ptA, ptB] = getTwoPointParameters(a1, ab2, ab3, ab4, ab5, ab6);
	guard$5(ptA, `a`);
	guard$5(ptB, `b`);
	const pt = {
		x: ptA.x + ptB.x,
		y: ptA.y + ptB.y
	};
	if (isPoint3d(ptA) || isPoint3d(ptB)) pt.z = (ptA.z ?? 0) + (ptB.z ?? 0);
	return Object.freeze(pt);
}

//#endregion
//#region ../packages/geometry/src/point/subtract.ts
/**
* Returns a Point with the x,y,z values of two points subtracted (a-b).
* 
* `z` parameter is used if present. Uses a default value of 0 for 'z' when subtracting a 2D point with a 3D one.
*
* Examples:
*
* ```js
* subtract(ptA, ptB);
* subtract(x1, y1, x2, y2);
* subtract(ptA, x2, y2);
* ```
*/
function subtract$3(a1, ab2, ab3, ab4, ab5, ab6) {
	const [ptA, ptB] = getTwoPointParameters(a1, ab2, ab3, ab4, ab5, ab6);
	guard$5(ptA, `a`);
	guard$5(ptB, `b`);
	const pt = {
		x: ptA.x - ptB.x,
		y: ptA.y - ptB.y
	};
	if (isPoint3d(ptA) || isPoint3d(ptB)) pt.z = (ptA.z ?? 0) - (ptB.z ?? 0);
	return Object.freeze(pt);
}

//#endregion
//#region ../packages/geometry/src/circle/intersections.ts
/**
* Returns the point(s) of intersection between a circle and line.
* 
* ```js
* const circle = { radius: 5, x: 5, y: 5 };
* const line = { a: { x: 0, y: 0 }, b: { x: 10, y: 10 } };
* const pts = Circles.intersectionLine(circle, line);
* ```
* @param circle 
* @param line 
* @returns Point(s) of intersection, or empty array
*/
const intersectionLine = (circle, line) => {
	const v1 = {
		x: line.b.x - line.a.x,
		y: line.b.y - line.a.y
	};
	const v2 = {
		x: line.a.x - circle.x,
		y: line.a.y - circle.y
	};
	const b = (v1.x * v2.x + v1.y * v2.y) * -2;
	const c = 2 * (v1.x * v1.x + v1.y * v1.y);
	const d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - circle.radius * circle.radius));
	if (Number.isNaN(d)) return [];
	const u1 = (b - d) / c;
	const u2 = (b + d) / c;
	const returnValue = [];
	if (u1 <= 1 && u1 >= 0) returnValue.push({
		x: line.a.x + v1.x * u1,
		y: line.a.y + v1.y * u1
	});
	if (u2 <= 1 && u2 >= 0) returnValue.push({
		x: line.a.x + v1.x * u2,
		y: line.a.y + v1.y * u2
	});
	return returnValue;
};
/**
* 
* Returns the points of intersection betweeen `a` and `b`.
* 
* Returns an empty array if circles are equal, one contains the other or if they don't touch at all.
*
* @param a Circle
* @param b Circle
* @returns Points of intersection, or an empty list if there are none
*/
const intersections$1 = (a, b) => {
	const vector = subtract$3(b, a);
	const centerD = Math.hypot(vector.y, vector.x);
	if (centerD > a.radius + b.radius) return [];
	if (centerD < Math.abs(a.radius - b.radius)) return [];
	if (isEqual$6(a, b)) return [];
	const centroidD = (a.radius * a.radius - b.radius * b.radius + centerD * centerD) / (2 * centerD);
	const centroid = {
		x: a.x + vector.x * centroidD / centerD,
		y: a.y + vector.y * centroidD / centerD
	};
	const centroidIntersectionD = Math.sqrt(a.radius * a.radius - centroidD * centroidD);
	const intersection = {
		x: -vector.y * (centroidIntersectionD / centerD),
		y: vector.x * (centroidIntersectionD / centerD)
	};
	return [sum$3(centroid, intersection), subtract$3(centroid, intersection)];
};

//#endregion
//#region ../packages/geometry/src/intersects.ts
const circleRect = (a, b) => {
	const deltaX = a.x - Math.max(b.x, Math.min(a.x, b.x + b.width));
	const deltaY = a.y - Math.max(b.y, Math.min(a.y, b.y + b.height));
	return deltaX * deltaX + deltaY * deltaY < a.radius * a.radius;
};
const circleCircle = (a, b) => intersections$1(a, b).length === 2;

//#endregion
//#region ../packages/geometry/src/rect/intersects.ts
/**
* Returns true if point is within or on boundary of `rect`.
*
* ```js
* Rects.intersectsPoint(rect, { x: 100, y: 100});
* Rects.intersectsPoint(rect, 100, 100);
* ```
* @param rect
* @param a
* @param b
* @returns
*/
function intersectsPoint$1(rect, a, b) {
	guard$4(rect, `rect`);
	let x = 0;
	let y = 0;
	if (typeof a === `number`) {
		if (b === void 0) throw new Error(`x and y coordinate needed`);
		x = a;
		y = b;
	} else {
		x = a.x;
		y = a.y;
	}
	if (isPositioned$2(rect)) {
		if (x - rect.x > rect.width || x < rect.x) return false;
		if (y - rect.y > rect.height || y < rect.y) return false;
	} else {
		if (x > rect.width || x < 0) return false;
		if (y > rect.height || y < 0) return false;
	}
	return true;
}
/**
* Returns true if `a` or `b` overlap, are equal, or `a` contains `b`.
* A rectangle can be checked for intersections with another RectPositioned, CirclePositioned or Point.
*
*/
const isIntersecting$2 = (a, b) => {
	if (!isRectPositioned(a)) throw new Error(`a parameter should be RectPositioned`);
	if (isCirclePositioned(b)) return circleRect(b, a);
	else if (isPoint(b)) return intersectsPoint$1(a, b);
	throw new Error(`Unknown shape for b: ${JSON.stringify(b)}`);
};

//#endregion
//#region ../packages/geometry/src/rect/distance.ts
/**
* Returns the distance from the perimeter of `rect` to `pt`.
* If the point is within the rectangle, 0 is returned.
*
* If `rect` does not have an x,y it's assumed to be 0,0
*
* ```js
* const rect = { width: 100, height: 100, x: 0, y: 0 };
* Rects.distanceFromExterior(rect, { x: 20, y: 20 });
* ```
* @param rect Rectangle
* @param pt Point
* @returns Distance
*/
function distanceFromExterior$1(rect, pt) {
	guardPositioned$1(rect, `rect`);
	guard$5(pt, `pt`);
	if (intersectsPoint$1(rect, pt)) return 0;
	const dx = Math.max(rect.x - pt.x, 0, pt.x - rect.x + rect.width);
	const dy = Math.max(rect.y - pt.y, 0, pt.y - rect.y + rect.height);
	return Math.hypot(dx, dy);
}
/**
* Return the distance of `pt` to the center of `rect`.
*
* ```js
* const rect = { width: 100, height: 100, x: 0, y: 0 };
* Rects.distanceFromCenter(rect, { x: 20, y: 20 });
* ```
* @param rect
* @param pt
* @returns
*/
function distanceFromCenter(rect, pt) {
	return distance$2(center$2(rect), pt);
}

//#endregion
//#region ../packages/geometry/src/rect/divide.ts
const divideOp = (a, b) => a / b;
/**
* @internal
* @param a 
* @param b 
* @param c 
* @returns 
*/
function divide$4(a, b, c) {
	return applyMerge(divideOp, a, b, c);
}
/**
* Divides all components of `rect` by `amount`.
* This includes x,y if present.
* 
* ```js
* divideScalar({ width:10, height:20 }, 2); // { width:5, height: 10 }
* divideScalar({ x: 1, y: 2, width:10, height:20 }, 2); // { x: 0.5, y: 1, width:5, height: 10 }
* ```
* @param rect
* @param amount
*/
function divideScalar(rect, amount) {
	return applyScalar(divideOp, rect, amount);
}
function divideDim(rect, amount) {
	return applyDim(divideOp, rect, amount);
}

//#endregion
//#region ../packages/geometry/src/point/to.ts
/**
* Returns a point with rounded x,y coordinates. By default uses `Math.round` to round.
* ```js
* toIntegerValues({x:1.234, y:5.567}); // Yields: {x:1, y:6}
* ```
*
* ```js
* toIntegerValues(pt, Math.ceil); // Use Math.ceil to round x,y of `pt`.
* ```
* @param pt Point to round
* @param rounder Rounding function, or Math.round by default
* @returns
*/
function toIntegerValues(pt, rounder = Math.round) {
	guard$5(pt, `pt`);
	return Object.freeze({
		x: rounder(pt.x),
		y: rounder(pt.y)
	});
}
/**
* Returns a copy of `pt` with `z` field omitted.
* If it didn't have one to begin within, a copy is still returned.
* @param pt
* @returns
*/
function to2d(pt) {
	guard$5(pt, `pt`);
	const copy = { ...pt };
	delete copy.z;
	return Object.freeze(copy);
}
/**
* Returns a copy of `pt` with a `z` field set.
* Defaults to a z value of 0.
* @param pt Point
* @param z Z-value, defaults to 0
* @returns
*/
function to3d(pt, z = 0) {
	guard$5(pt, `pt`);
	return Object.freeze({
		...pt,
		z
	});
}
/**
* Returns a human-friendly string representation `(x, y)`.
* If `precision` is supplied, this will be the number of significant digits.
* @param p
* @returns
*/
function toString$5(p, digits) {
	if (p === void 0) return `(undefined)`;
	if (p === null) return `(null)`;
	guard$5(p, `pt`);
	const x = digits ? p.x.toFixed(digits) : p.x;
	const y = digits ? p.y.toFixed(digits) : p.y;
	if (p.z === void 0) return `(${x},${y})`;
	else return `(${x},${y},${digits ? p.z.toFixed(digits) : p.z})`;
}

//#endregion
//#region ../packages/geometry/src/line/from-points.ts
/**
* Returns a line from two points
* 
* ```js
* // Line from 0,1 to 10,15
* const line = Lines.fromPoints( { x:0, y:1 }, { x:10, y:15 });
* // line is: { a: { x: 0, y: 1}, b: { x: 10, y: 15 } };
* ```
* @param a Start point
* @param b End point
* @returns 
*/
const fromPoints$2 = (a, b) => {
	guard$5(a, `a`);
	guard$5(b, `b`);
	a = Object.freeze({ ...a });
	b = Object.freeze({ ...b });
	return Object.freeze({
		a,
		b
	});
};

//#endregion
//#region ../packages/geometry/src/line/join-points-to-lines.ts
/**
* Returns an array of lines that connects provided points. Note that line is not closed.
* 
* Eg, if points a,b,c are provided, two lines are provided: a->b and b->c.
* 
* ```js
* const lines = Lines.joinPointsToLines(ptA, ptB, ptC);
* // lines is an array of, well, lines
* ```
* @param points 
* @returns 
*/
const joinPointsToLines = (...points) => {
	const lines = [];
	let start = points[0];
	for (let index = 1; index < points.length; index++) {
		lines.push(fromPoints$2(start, points[index]));
		start = points[index];
	}
	return lines;
};
/**
* Converts a {@link PolyLine} to an array of points.
* Duplicate points are optionally excluded
* @param line 
* @returns 
*/
const polyLineToPoints = (line, skipDuplicates = false) => {
	if (skipDuplicates) {
		const pt = [];
		const seen = /* @__PURE__ */ new Set();
		for (const l of line) {
			const aa = toString$5(l.a);
			const bb = toString$5(l.b);
			if (!seen.has(aa)) {
				seen.add(aa);
				pt.push(l.a);
			}
			if (seen.has(bb)) {
				seen.add(bb);
				pt.push(l.b);
			}
		}
		return pt;
	} else {
		const pt = [];
		for (const l of line) pt.push(l.a, l.b);
		return pt;
	}
};

//#endregion
//#region ../packages/geometry/src/rect/edges.ts
/**
* Returns four lines based on each corner.
* Lines are given in order: top, right, bottom, left
*
* ```js
* const rect = { width: 100, height: 100, x: 100, y: 100 };
* // Yields: array of length four
* const lines = Rects.lines(rect);
* ```
*
* @param {(RectPositioned|Rect)} rect
* @param {Points.Point} [origin]
* @returns {Lines.Line[]}
*/
const edges$1 = (rect, origin) => {
	const c = corners$1(rect, origin);
	return joinPointsToLines(...c, c[0]);
};
/**
* Returns a point on the edge of rectangle
* ```js
* const r1 = {x: 10, y: 10, width: 100, height: 50};
* Rects.getEdgeX(r1, `right`);  // Yields: 110
* Rects.getEdgeX(r1, `bottom`); // Yields: 10
*
* const r2 = {width: 100, height: 50};
* Rects.getEdgeX(r2, `right`);  // Yields: 100
* Rects.getEdgeX(r2, `bottom`); // Yields: 0
* ```
* @param rect
* @param edge Which edge: right, left, bottom, top
* @returns
*/
const getEdgeX = (rect, edge) => {
	guard$4(rect);
	switch (edge) {
		case `top`: return isPoint(rect) ? rect.x : 0;
		case `bottom`: return isPoint(rect) ? rect.x : 0;
		case `left`: return isPoint(rect) ? rect.y : 0;
		case `right`: return isPoint(rect) ? rect.x + rect.width : rect.width;
	}
};
/**
* Returns a point on the edge of rectangle
*
* ```js
* const r1 = {x: 10, y: 10, width: 100, height: 50};
* Rects.getEdgeY(r1, `right`);  // Yields: 10
* Rects.getEdgeY(r1, `bottom`); // Yields: 60
*
* const r2 = {width: 100, height: 50};
* Rects.getEdgeY(r2, `right`);  // Yields: 0
* Rects.getEdgeY(r2, `bottom`); // Yields: 50
* ```
* @param rect
* @param edge Which edge: right, left, bottom, top
* @returns
*/
const getEdgeY = (rect, edge) => {
	guard$4(rect);
	switch (edge) {
		case `top`: return isPoint(rect) ? rect.y : 0;
		case `bottom`: return isPoint(rect) ? rect.y + rect.height : rect.height;
		case `left`: return isPoint(rect) ? rect.y : 0;
		case `right`: return isPoint(rect) ? rect.y : 0;
	}
};

//#endregion
//#region ../packages/geometry/src/rect/encompass.ts
/**
* Returns a copy of `rect` with `rect` resized so it also encompasses `points`.
* If provided point(s) are within bounds of `rect`, a copy of `rect` is returned.
* @param rect 
* @param points 
* @returns 
*/
const encompass = (rect, ...points) => {
	const x = points.map((p) => p.x);
	const y = points.map((p) => p.y);
	let minX = Math.min(...x, rect.x);
	let minY = Math.min(...y, rect.y);
	let maxX = Math.max(...x, rect.x + rect.width);
	let maxY = Math.max(...y, rect.y + rect.height);
	let rectW = Math.max(rect.width, maxX - minX);
	let rectH = Math.max(rect.height, maxY - minY);
	return Object.freeze({
		...rect,
		x: minX,
		y: minY,
		width: rectW,
		height: rectH
	});
};

//#endregion
//#region ../packages/geometry/src/rect/from-center.ts
/**
* Initialises a rectangle based on its center, a width and height
*
* ```js
* // Rectangle with center at 50,50, width 100 height 200
* Rects.fromCenter({x: 50, y:50}, 100, 200);
* ```
* @param origin
* @param width
* @param height
* @returns
*/
const fromCenter$2 = (origin, width, height) => {
	guard$5(origin, `origin`);
	guardDim(width, `width`);
	guardDim(height, `height`);
	const halfW = width / 2;
	const halfH = height / 2;
	return {
		x: origin.x - halfW,
		y: origin.y - halfH,
		width,
		height
	};
};

//#endregion
//#region ../packages/geometry/src/rect/from-element.ts
/**
* Initialise a rectangle based on the width and height of a HTML element.
*
* ```js
* Rects.fromElement(document.querySelector(`body`));
* ```
* @param el
* @returns
*/
const fromElement = (el) => ({
	width: el.clientWidth,
	height: el.clientHeight
});

//#endregion
//#region ../packages/geometry/src/rect/from-numbers.ts
/**
* Returns a rectangle from a series of numbers: x, y, width, height OR width, height
*
* ```js
* const r1 = Rects.fromNumbers(100, 200);
* // {width: 100, height: 200}
*
* const r2 = Rects.fromNumbers(10, 20, 100, 200);
* // {x: 10, y: 20, width: 100, height: 200}
* ```
* Use the spread operator (...) if the source is an array:
*
* ```js
* const r3 = Rects.fromNumbers(...[10, 20, 100, 200]);
* ```
*
* Use {@link toArray} for the opposite conversion.
*
* @see toArray
* @param xOrWidth
* @param yOrHeight
* @param width
* @param height
* @returns
*/
function fromNumbers$2(xOrWidth, yOrHeight, width, height) {
	if (width === void 0 || height === void 0) {
		if (typeof xOrWidth !== `number`) throw new Error(`width is not an number`);
		if (typeof yOrHeight !== `number`) throw new TypeError(`height is not an number`);
		return Object.freeze({
			width: xOrWidth,
			height: yOrHeight
		});
	}
	if (typeof xOrWidth !== `number`) throw new Error(`x is not an number`);
	if (typeof yOrHeight !== `number`) throw new Error(`y is not an number`);
	if (typeof width !== `number`) throw new Error(`width is not an number`);
	if (typeof height !== `number`) throw new Error(`height is not an number`);
	return Object.freeze({
		x: xOrWidth,
		y: yOrHeight,
		width,
		height
	});
}

//#endregion
//#region ../packages/geometry/src/rect/from-top-left.ts
/**
* Creates a rectangle from its top-left coordinate, a width and height.
*
* ```js
* // Rectangle at 50,50 with width of 100, height of 200.
* const rect = Rects.fromTopLeft({ x: 50, y:50 }, 100, 200);
* ```
* @param origin
* @param width
* @param height
*/
function fromTopLeft(origin, width, height) {
	guardDim(width, `width`);
	guardDim(height, `height`);
	guard$5(origin, `origin`);
	return {
		x: origin.x,
		y: origin.y,
		width,
		height
	};
}

//#endregion
//#region ../packages/geometry/src/rect/get-rect-positionedparameter.ts
/**
* Accepts:
* * x,y,w,h
* * x,y,rect
* * point,rect
* * RectPositioned
* * Rect, x,y
* * Rect, Point
* @param a 
* @param b 
* @param c 
* @param d 
* @returns 
*/
function getRectPositionedParameter(a, b, c, d) {
	if (typeof a === `number`) if (typeof b === `number`) if (typeof c === `number` && typeof d === `number`) return {
		x: a,
		y: b,
		width: c,
		height: d
	};
	else if (isRect(c)) return {
		x: a,
		y: b,
		width: c.width,
		height: c.height
	};
	else throw new TypeError(`If params 'a' & 'b' are numbers, expect following parameters to be x,y or Rect`);
	else throw new TypeError(`If parameter 'a' is a number, expect following parameters to be: y,w,h`);
	else if (isRectPositioned(a)) return a;
	else if (isRect(a)) if (typeof b === `number` && typeof c === `number`) return {
		width: a.width,
		height: a.height,
		x: b,
		y: c
	};
	else if (isPoint(b)) return {
		width: a.width,
		height: a.height,
		x: b.x,
		y: b.y
	};
	else throw new TypeError(`If param 'a' is a Rect, expects following parameters to be x,y`);
	else if (isPoint(a)) if (typeof b === `number` && typeof c === `number`) return {
		x: a.x,
		y: a.y,
		width: b,
		height: c
	};
	else if (isRect(b)) return {
		x: a.x,
		y: a.y,
		width: b.width,
		height: b.height
	};
	else throw new TypeError(`If parameter 'a' is a Point, expect following params to be: Rect or width,height`);
	throw new TypeError(`Expect a first parameter to be x,RectPositioned,Rect or Point`);
}

//#endregion
//#region ../packages/geometry/src/rect/initialisers.ts
const Empty$3 = Object.freeze({
	width: 0,
	height: 0
});
const EmptyPositioned = Object.freeze({
	x: 0,
	y: 0,
	width: 0,
	height: 0
});
const Placeholder$3 = Object.freeze({
	width: NaN,
	height: NaN
});
const PlaceholderPositioned = Object.freeze({
	x: NaN,
	y: NaN,
	width: NaN,
	height: NaN
});

//#endregion
//#region ../packages/geometry/src/point/is-equal.ts
/**
* Returns _true_ if the points have identical values
*
* ```js
* const a = {x: 10, y: 10};
* const b = {x: 10, y: 10;};
* a === b        // False, because a and be are different objects
* isEqual(a, b)   // True, because a and b are same value
* ```
* @param p Points
* @returns _True_ if points are equal
*/
const isEqual$5 = (...p) => {
	if (p === void 0) throw new Error(`parameter 'p' is undefined`);
	if (p.length < 2) return true;
	for (let index = 1; index < p.length; index++) {
		if (p[index].x !== p[0].x) return false;
		if (p[index].y !== p[0].y) return false;
	}
	return true;
};

//#endregion
//#region ../packages/geometry/src/rect/is-equal.ts
/**
* Returns _true_ if the width & height of the two rectangles is the same.
*
* ```js
* const rectA = { width: 10, height: 10, x: 10, y: 10 };
* const rectB = { width: 10, height: 10, x: 20, y: 20 };
*
* // True, even though x,y are different
* Rects.isEqualSize(rectA, rectB);
*
* // False, because coordinates are different
* Rects.isEqual(rectA, rectB)
* ```
* @param a
* @param b
* @returns
*/
const isEqualSize = (a, b) => {
	if (a === void 0) throw new Error(`a undefined`);
	if (b === void 0) throw new Error(`b undefined`);
	return a.width === b.width && a.height === b.height;
};
/**
* Returns _true_ if two rectangles have identical values.
* Both rectangles must be positioned or not.
*
* ```js
* const rectA = { width: 10, height: 10, x: 10, y: 10 };
* const rectB = { width: 10, height: 10, x: 20, y: 20 };
*
* // False, because coordinates are different
* Rects.isEqual(rectA, rectB)
*
* // True, even though x,y are different
* Rects.isEqualSize(rectA, rectB);
* ```
* @param a
* @param b
* @returns
*/
const isEqual$4 = (a, b) => {
	if (isPositioned$2(a) && isPositioned$2(b)) {
		if (!isEqual$5(a, b)) return false;
		return a.width === b.width && a.height === b.height;
	} else if (!isPositioned$2(a) && !isPositioned$2(b)) return a.width === b.width && a.height === b.height;
	else return false;
};

//#endregion
//#region ../packages/geometry/src/line/guard.ts
/**
* Returns true if `p` is a valid line, containing `a` and `b` Points.
* ```js
* Lines.isLine(l);
* ```
* @param p Value to check
* @returns True if a valid line.
*/
function isLine(p) {
	if (p === void 0) return false;
	if (p.a === void 0) return false;
	if (p.b === void 0) return false;
	if (!isPoint(p.a)) return false;
	if (!isPoint(p.b)) return false;
	return true;
}
/**
* Returns true if `p` is a {@link PolyLine}, ie. an array of {@link Line}s.
* Validates all items in array.
* @param p
* @returns
*/
function isPolyLine(p) {
	if (!Array.isArray(p)) return false;
	return !p.some((v) => !isLine(v));
}
/**
* Returns a failure if:
* - line is undefined
* - a or b parameters are missing
*
* Does not validate points
* @param line
* @param name
*/
function lineTest(line, name = `line`) {
	if (line === void 0) return {
		success: false,
		error: `${name} undefined`
	};
	if (line.a === void 0) return {
		success: false,
		error: `${name}.a undefined. Expected {a:Point, b:Point}. Got: ${JSON.stringify(line)}`
	};
	if (line.b === void 0) return {
		success: false,
		error: `${name}.b undefined. Expected {a:Point, b:Point} Got: ${JSON.stringify(line)}`
	};
	return {
		success: true,
		value: true
	};
}

//#endregion
//#region ../packages/geometry/src/line/get-points-parameter.ts
/**
* Returns [a,b] points from either a line parameter, or two points.
* It additionally applies the guardPoint function to ensure validity.
* This supports function overloading.
* @ignore
* @param aOrLine 
* @param b 
* @returns 
*/
const getPointParameter = (aOrLine, b) => {
	let a;
	if (isLine(aOrLine)) {
		b = aOrLine.b;
		a = aOrLine.a;
	} else {
		a = aOrLine;
		if (b === void 0) throw new Error(`Since first parameter is not a line, two points are expected. Got a: ${JSON.stringify(a)} b: ${JSON.stringify(b)}`);
	}
	guard$5(a, `a`);
	guard$5(a, `b`);
	return [a, b];
};

//#endregion
//#region ../packages/geometry/src/line/length.ts
/**
* Returns length of line, polyline or between two points
* 
* @param aOrLine Point A, line or polyline (array of lines)
* @param pointB Point B, if first parameter is a point
* @returns Length (total accumulated length for arrays)
*/
function length$3(aOrLine, pointBOrForce2d, force2d) {
	if (isPolyLine(aOrLine)) {
		const _force2d = typeof pointBOrForce2d === `boolean` ? pointBOrForce2d : false;
		return aOrLine.reduce((accumulator, v) => length$3(v, _force2d) + accumulator, 0);
	}
	if (aOrLine === void 0) throw new TypeError(`Parameter 'aOrLine' is undefined`);
	const [a, b] = typeof pointBOrForce2d === `object` ? getPointParameter(aOrLine, pointBOrForce2d) : getPointParameter(aOrLine);
	const x = b.x - a.x;
	const y = b.y - a.y;
	if (!(typeof pointBOrForce2d === `boolean` ? pointBOrForce2d : typeof force2d === `boolean` ? force2d : false) && a.z !== void 0 && b.z !== void 0) {
		const z = b.z - a.z;
		return Math.hypot(x, y, z);
	} else return Math.hypot(x, y);
}

//#endregion
//#region ../packages/geometry/src/rect/lengths.ts
/**
* Returns the length of each side of the rectangle (top, right, bottom, left)
*
* ```js
* const rect = { width: 100, height: 100, x: 100, y: 100 };
* // Yields: array of length four
* const lengths = Rects.lengths(rect);
* ```
* @param rect
* @returns
*/
const lengths$1 = (rect) => {
	guardPositioned$1(rect, `rect`);
	return edges$1(rect).map((l) => length$3(l));
};

//#endregion
//#region ../packages/geometry/src/rect/max.ts
/**
* Returns a rectangle based on provided four corners.
*
* To create a rectangle that contains an arbitary set of points, use {@link Points.bbox}.
*
* Does some sanity checking such as:
*  - x will be smallest of topLeft/bottomLeft
*  - y will be smallest of topRight/topLeft
*  - width will be largest between top/bottom left and right
*  - height will be largest between left and right top/bottom
*
*/
const maxFromCorners = (topLeft, topRight, bottomRight, bottomLeft) => {
	if (topLeft.y > bottomRight.y) throw new Error(`topLeft.y greater than bottomRight.y`);
	if (topLeft.y > bottomLeft.y) throw new Error(`topLeft.y greater than bottomLeft.y`);
	const w1 = topRight.x - topLeft.x;
	const w2 = bottomRight.x - bottomLeft.x;
	const h1 = Math.abs(bottomLeft.y - topLeft.y);
	const h2 = Math.abs(bottomRight.y - topRight.y);
	return {
		x: Math.min(topLeft.x, bottomLeft.x),
		y: Math.min(topRight.y, topLeft.y),
		width: Math.max(w1, w2),
		height: Math.max(h1, h2)
	};
};

//#endregion
//#region ../packages/geometry/src/rect/multiply.ts
const multiplyOp = (a, b) => a * b;
/**
* @internal
* @param a 
* @param b 
* @param c 
* @returns 
*/
function multiply$4(a, b, c) {
	return applyMerge(multiplyOp, a, b, c);
}
/**
* Multiplies all components of `rect` by `amount`.
* This includes x,y if present.
* 
* ```js
* multiplyScalar({ width:10, height:20 }, 2); // { width:20, height: 40 }
* multiplyScalar({ x: 1, y: 2, width:10, height:20 }, 2); // { x: 2, y: 4, width:20, height: 40 }
* ```
* 
* Use {@link multiplyDim} to only multiply width & height.
* @param rect
* @param amount
*/
function multiplyScalar$2(rect, amount) {
	return applyScalar(multiplyOp, rect, amount);
}
/**
* Multiplies only the width/height of `rect`, leaving `x` and `y` as they are.
* ```js
* multiplyDim({ x:1,y:2,width:3,height:4 }, 2);
* // Yields: { x:1, y:2, width:6, height: 8 }
* ```
* 
* In comparison, {@link multiply} will also include x & y.
* @param rect Rectangle
* @param amount Amount to multiply by
* @returns 
*/
function multiplyDim(rect, amount) {
	return applyDim(multiplyOp, rect, amount);
}

//#endregion
//#region ../packages/geometry/src/rect/nearest.ts
/**
* If `p` is inside of `rect`, a copy of `p` is returned.
* If `p` is outside of `rect`, a point is returned closest to `p` on the edge
* of the rectangle.
* @param rect 
* @param p 
* @returns 
*/
const nearestInternal = (rect, p) => {
	let { x, y } = p;
	if (x < rect.x) x = rect.x;
	else if (x > rect.x + rect.width) x = rect.x + rect.width;
	if (y < rect.y) y = rect.y;
	else if (y > rect.y + rect.height) y = rect.y + rect.height;
	return Object.freeze({
		...p,
		x,
		y
	});
};

//#endregion
//#region ../packages/geometry/src/rect/normalise-by-rect.ts
/**
* Returns a function that divides numbers or points by the largest dimension of `rect`.
* 
* ```js
* const d = dividerByLargestDimension({width:100,height:50});
* d(50);                // 0.5 (50/100)
* d({ x: 10, y: 20 }); // { x: 0.1, y: 0.2 }
* ```
* @param rect 
* @returns 
*/
const dividerByLargestDimension = (rect) => {
	const largest = Math.max(rect.width, rect.height);
	return (value) => {
		if (typeof value === `number`) return value / largest;
		else if (isPoint3d(value)) return Object.freeze({
			...value,
			x: value.x / largest,
			y: value.y / largest,
			z: value.x / largest
		});
		else if (isPoint(value)) return Object.freeze({
			...value,
			x: value.x / largest,
			y: value.y / largest
		});
		else throw new Error(`Param 'value' is neither number nor Point`);
	};
};

//#endregion
//#region ../packages/geometry/src/rect/perimeter.ts
/**
* Returns the perimeter of `rect` (ie. sum of all edges)
*  * ```js
* const rect = { width: 100, height: 100, x: 100, y: 100 };
* Rects.perimeter(rect);
* ```
* @param rect
* @returns
*/
const perimeter$4 = (rect) => {
	guard$4(rect);
	return rect.height + rect.height + rect.width + rect.width;
};

//#endregion
//#region ../packages/geometry/src/rect/random.ts
/**
* Returns a random positioned Rect on a 0..1 scale.
* ```js
* const r = Rects.random(); // eg {x: 0.2549012, y:0.859301, width: 0.5212, height: 0.1423 }
* ```
*
* A custom source of randomness can be provided:
* ```js
* import { Rects } from "@ixfx/geometry.js";
* import { weightedSource } from "@ixfx/random.js"
* const r = Rects.random(weightedSource(`quadIn`));
* ```
* @param rando
* @returns
*/
const random$2 = (rando) => {
	rando ??= Math.random;
	return Object.freeze({
		x: rando(),
		y: rando(),
		width: rando(),
		height: rando()
	});
};
/**
* Returns a random point within a rectangle.
*
* By default creates a uniform distribution.
*
* ```js
* const pt = randomPoint({width: 5, height: 10});
* ```'
* @param within Rectangle to generate a point within
* @param options Options
* @returns
*/
const randomPoint$2 = (within, options = {}) => {
	const rand = options.randomSource ?? Math.random;
	const margin = options.margin ?? {
		x: 0,
		y: 0
	};
	const x = rand() * (within.width - margin.x - margin.x);
	const y = rand() * (within.height - margin.y - margin.y);
	const pos = {
		x: x + margin.x,
		y: y + margin.y
	};
	return isPositioned$2(within) ? sum$3(pos, within) : Object.freeze(pos);
};

//#endregion
//#region ../packages/geometry/src/rect/subtract.ts
const subtractOp = (a, b) => a - b;
/**
* Subtracts width/height from `a`.
*
* ```js
* const rectA = { width: 100, height: 100 };
* const rectB = { width: 200, height: 200 };
*
* // Yields: { width: -100, height: -100 }
* Rects.subtract(rectA, rectB);
* Rects.subtract(rectA, 200, 200);
* ```
* @param a
* @param b
* @param c
* @returns
*/
function subtract$2(a, b, c) {
	return applyMerge(subtractOp, a, b, c);
}
function subtractSize(a, b, c) {
	const w = typeof b === `number` ? b : b.width;
	const h = typeof b === `number` ? c : b.height;
	if (h === void 0) throw new Error(`Expected height as third parameter`);
	return {
		...a,
		width: a.width - w,
		height: a.height - h
	};
}
/**
* Subtracts A-B. Applies to x, y, width & height
* ```js
* subtractOffset(
*  { x:100, y:100, width:100, height:100 }, 
*  { x:10, y:20,   width: 30, height: 40 }
* );
* // Yields: {x: 90, y: 80, width: 70, height: 60 }
* ```
* If either `a` or `b` are missing x & y, 0 is used.
* @param a 
* @param b 
* @returns 
*/
function subtractOffset(a, b) {
	let x = 0;
	let y = 0;
	if (isPositioned$2(a)) {
		x = a.x;
		y = a.y;
	}
	let xB = 0;
	let yB = 0;
	if (isPositioned$2(b)) {
		xB = b.x;
		yB = b.y;
	}
	return Object.freeze({
		...a,
		x: x - xB,
		y: y - yB,
		width: a.width - b.width,
		height: a.height - b.height
	});
}

//#endregion
//#region ../packages/geometry/src/rect/sum.ts
const sumOp = (a, b) => a + b;
/**
* Sums width/height of `b` with `a` (ie: a + b), returning result.
*
* ```js
* const rectA = { width: 100, height: 100 };
* const rectB = { width: 200, height: 200 };
*
* // Yields: { width: 300, height: 300 }
* Rects.sum(rectA, rectB);
* Rects.sum(rectA, 200, 200);
* ```
* @param a
* @param b
* @param c
* @returns
*/
function sum$2(a, b, c) {
	return applyMerge(sumOp, a, b, c);
}
/**
* Sums x,y,width,height of a+b.
* ```js
* sumOffset({x:100,y:100,width:100,height:100}, {x:10, y:20, width: 30, height: 40});
* // Yields: {x: 110, y: 120, width: 130, height: 140 }
* ```
* If either `a` or `b` are missing x & y, 0 is used
* @param a 
* @param b 
* @returns 
*/
function sumOffset(a, b) {
	let x = 0;
	let y = 0;
	if (isPositioned$2(a)) {
		x = a.x;
		y = a.y;
	}
	let xB = 0;
	let yB = 0;
	if (isPositioned$2(b)) {
		xB = b.x;
		yB = b.y;
	}
	return Object.freeze({
		...a,
		x: x + xB,
		y: y + yB,
		width: a.width + b.width,
		height: a.height + b.height
	});
}

//#endregion
//#region ../packages/geometry/src/rect/to-array.ts
/**
* Converts a rectangle to an array of numbers. See {@link fromNumbers} for the opposite conversion.
*
* ```js
* const r1 = Rects.toArray({ x: 10, y:20, width: 100, height: 200 });
* // [10, 20, 100, 200]
* const r2 = Rects.toArray({ width: 100, height: 200 });
* // [100, 200]
* ```
* @param rect
* @see fromNumbers
*/
function toArray$1(rect) {
	if (isPositioned$2(rect)) return [
		rect.x,
		rect.y,
		rect.width,
		rect.height
	];
	else if (isRect(rect)) return [rect.width, rect.height];
	else throw new Error(`Param 'rect' is not a rectangle. Got: ${JSON.stringify(rect)}`);
}

//#endregion
//#region ../packages/geometry/src/rect/index.ts
var rect_exports = /* @__PURE__ */ __exportAll({
	Empty: () => Empty$3,
	EmptyPositioned: () => EmptyPositioned,
	Placeholder: () => Placeholder$3,
	PlaceholderPositioned: () => PlaceholderPositioned,
	applyDim: () => applyDim,
	applyFields: () => applyFields,
	applyMerge: () => applyMerge,
	applyScalar: () => applyScalar,
	area: () => area$5,
	cardinal: () => cardinal,
	center: () => center$2,
	centerOrigin: () => centerOrigin,
	corners: () => corners$1,
	distanceFromCenter: () => distanceFromCenter,
	distanceFromExterior: () => distanceFromExterior$1,
	divide: () => divide$4,
	divideDim: () => divideDim,
	divideScalar: () => divideScalar,
	dividerByLargestDimension: () => dividerByLargestDimension,
	edges: () => edges$1,
	encompass: () => encompass,
	fromCenter: () => fromCenter$2,
	fromElement: () => fromElement,
	fromNumbers: () => fromNumbers$2,
	fromTopLeft: () => fromTopLeft,
	getEdgeX: () => getEdgeX,
	getEdgeY: () => getEdgeY,
	getRectPositioned: () => getRectPositioned,
	getRectPositionedParameter: () => getRectPositionedParameter,
	guard: () => guard$4,
	guardDim: () => guardDim,
	guardPositioned: () => guardPositioned$1,
	intersectsPoint: () => intersectsPoint$1,
	isEmpty: () => isEmpty$2,
	isEqual: () => isEqual$4,
	isEqualSize: () => isEqualSize,
	isIntersecting: () => isIntersecting$2,
	isPlaceholder: () => isPlaceholder$2,
	isPositioned: () => isPositioned$2,
	isRect: () => isRect,
	isRectPositioned: () => isRectPositioned,
	lengths: () => lengths$1,
	maxFromCorners: () => maxFromCorners,
	multiply: () => multiply$4,
	multiplyDim: () => multiplyDim,
	multiplyScalar: () => multiplyScalar$2,
	nearestInternal: () => nearestInternal,
	perimeter: () => perimeter$4,
	random: () => random$2,
	randomPoint: () => randomPoint$2,
	subtract: () => subtract$2,
	subtractOffset: () => subtractOffset,
	subtractSize: () => subtractSize,
	sum: () => sum$2,
	sumOffset: () => sumOffset,
	toArray: () => toArray$1
});

//#endregion
//#region ../packages/geometry/src/point/abs.ts
/**
* Returns a point with Math.abs applied to x,y and z if present.
* ```js
* Points.abs({ x:1,  y:1  }); // { x: 1, y: 1 }
* Points.abs({ x:-1, y:1  }); // { x: 1, y: 1 }
* Points.abs({ x:-1, y:-1 }); // { x: 1, y: 1 }
* ```
* @param pt
* @returns
*/
function abs$2(pt) {
	if (isPoint3d(pt)) return Object.freeze({
		...pt,
		x: Math.abs(pt.x),
		y: Math.abs(pt.y),
		z: Math.abs(pt.z)
	});
	else if (isPoint(pt)) return Object.freeze({
		...pt,
		x: Math.abs(pt.x),
		y: Math.abs(pt.y)
	});
	else throw new TypeError(`Param 'pt' is not a point`);
}

//#endregion
//#region ../packages/geometry/src/pi.ts
const piPi$5 = Math.PI * 2;

//#endregion
//#region ../packages/geometry/src/point/angle.ts
/**
* Returns the angle in radians between `a` and `b`.
*
* Eg if `a` is the origin, and `b` is another point,
* in degrees one would get 0 to -180 when `b` was above `a`.
*  -180 would be `b` in line with `a`.
* Same for under `a`.
*
* Providing a third point `c` gives the interior angle, where `b` is the middle point.
* 
* See also {@link angleRadianCircle} which returns coordinates on 0..Math.Pi*2
* range. This avoids negative numbers.
* 
* @example Calculate angle between a middle of canvas and the cursor
* ```js
* const canvasEl = document.querySelector('canvas');
* const middle = { x: canvasEl.width/2, y: canvasEl.height /2 }
* 
* canvasEl.addEventListener(`pointermove`, event => { 
*  const cursor = {
*    x: event.offsetX,
*    y: event.offsetY
*  }
*  const a = G.Points.angleRadian(middle, cursor);
*});
* ```
* @param a
* @param b
* @param c
* @returns
*/
const angleRadian$1 = (a, b, c) => {
	guard$5(a, `a`);
	if (b === void 0) return Math.atan2(a.y, a.x);
	guard$5(b, `b`);
	if (c === void 0) return Math.atan2(b.y - a.y, b.x - a.x);
	guard$5(c, `c`);
	return Math.atan2(b.y - a.y, b.x - a.x) - Math.atan2(c.y - a.y, c.x - a.x);
};
/**
* Returns the angle between point(s) using a radian circle system.
* ```
*       90deg
*       Pi/2
*        |
* Pi  ---+--- 0
* 180    |
*       3PI/2
*       270deg
* ```
* @param a 
* @param b 
* @param c 
* @returns 
*/
const angleRadianCircle = (a, b, c) => {
	const angle = angleRadian$1(a, b, c);
	if (angle < 0) return angle + piPi$5;
	return angle;
};
/**
* Return the angle of a wedge, defined by a, b and C points, where 'b'
* could be thought of as the origin or pivot.
* 
* @param a 
* @param b 
* @param c 
* @returns 
*/
const angleRadianThreePoint = (a, b, c) => {
	const ab = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
	const bc = Math.sqrt(Math.pow(b.x - c.x, 2) + Math.pow(b.y - c.y, 2));
	const ac = Math.sqrt(Math.pow(c.x - a.x, 2) + Math.pow(c.y - a.y, 2));
	return Math.acos((bc * bc + ab * ab - ac * ac) / (2 * bc * ab));
};

//#endregion
//#region ../packages/geometry/src/point/apply.ts
/**
* Applies `fn` on x,y & z (if present) fields, returning all other fields as well
* ```js
* const p = {x:1.234, y:4.9};
* const p2 = Points.apply(p, Math.round);
* // Yields: {x:1, y:5}
* ```
*
* The name of the field is provided as well. Here we only round the `x` field:
*
* ```js
* const p = {x:1.234, y:4.9};
* const p2 = Points.apply(p, (v, field) => {
*  if (field === `x`) return Math.round(v);
*  return v;
* });
* ```
* @param pt
* @param fn
* @returns
*/
function apply$2(pt, fn) {
	guard$5(pt, `pt`);
	if (isPoint3d(pt)) return Object.freeze({
		...pt,
		x: fn(pt.x, `x`),
		y: fn(pt.y, `y`),
		z: fn(pt.z, `z`)
	});
	return Object.freeze({
		...pt,
		x: fn(pt.x, `x`),
		y: fn(pt.y, `y`)
	});
}

//#endregion
//#region ../packages/geometry/src/point/averager.ts
/**
* Averages a set of points, by default as a 'mean'.
* 
* List of points has to all have Z property or none of them -- it's not
* possible to mix 2D and 3D points.
* @param points 
* @returns 
*/
const average$1 = (points, kind = `mean`) => {
	let xSum = 0;
	let ySum = 0;
	let zSum = NaN;
	let total = 0;
	if (kind !== `mean`) throw new Error(`Unknown averaging kind: '${kind}' expected: 'mean'`);
	for (const p of points) {
		xSum += p.x;
		ySum += p.y;
		if (`z` in p && p.z !== void 0) zSum += p.z;
		else if (Number.isNaN(zSum)) throw new Error(`List of points should all have Z property, or none`);
		total++;
	}
	xSum /= total;
	ySum /= total;
	if (Number.isNaN(zSum)) return {
		x: xSum,
		y: ySum
	};
	else return {
		x: xSum,
		y: ySum,
		z: zSum / total
	};
};
function averager(kind, opts = {}) {
	let x;
	let y;
	let z;
	switch (kind) {
		case `moving-average-light`: {
			const scaling = opts.scaling ?? 3;
			x = movingAverageLight(scaling);
			y = movingAverageLight(scaling);
			z = movingAverageLight(scaling);
			break;
		}
		default: throw new Error(`Unknown averaging kind '${kind}'. Expected: 'moving-average-light'`);
	}
	return (point) => {
		const ax = x(point.x);
		const ay = y(point.y);
		if (isPoint3d(point)) {
			const az = z(point.z);
			return Object.freeze({
				x: ax,
				y: ay,
				z: az
			});
		} else return Object.freeze({
			x: ax,
			y: ay
		});
	};
}

//#endregion
//#region ../packages/geometry/src/point/find-minimum.ts
/**
* Returns the 'minimum' point from an array of points, using a comparison function.
*
* @example Find point closest to a coordinate
* ```js
* const points = [...];
* const center = {x: 100, y: 100};
*
* const closestToCenter = findMinimum((a, b) => {
*  const aDist = distance(a, center);
*  const bDist = distance(b, center);
*  if (aDistance < bDistance) return a;
*  return b;
* }, points);
* ```
* @param comparer Compare function returns the smallest of `a` or `b`
* @param points
* @returns
*/
function findMinimum(comparer, ...points) {
	if (points.length === 0) throw new Error(`No points provided`);
	let min = points[0];
	for (const p of points) if (isPoint3d(min) && isPoint3d(p)) min = comparer(min, p);
	else min = comparer(min, p);
	return min;
}

//#endregion
//#region ../packages/geometry/src/point/bbox.ts
/**
* Returns the minimum rectangle that can enclose all provided points
* @param points
* @returns
*/
const bbox$5 = (...points) => {
	const leftMost = findMinimum((a, b) => {
		return a.x < b.x ? a : b;
	}, ...points);
	const rightMost = findMinimum((a, b) => {
		return a.x > b.x ? a : b;
	}, ...points);
	const topMost = findMinimum((a, b) => {
		return a.y < b.y ? a : b;
	}, ...points);
	const bottomMost = findMinimum((a, b) => {
		return a.y > b.y ? a : b;
	}, ...points);
	return maxFromCorners({
		x: leftMost.x,
		y: topMost.y
	}, {
		x: rightMost.x,
		y: topMost.y
	}, {
		x: rightMost.x,
		y: bottomMost.y
	}, {
		x: leftMost.x,
		y: bottomMost.y
	});
};
const bbox3d = (...points) => {
	const box = bbox$5(...points);
	const zMin = findMinimum((a, b) => {
		return a.z < b.z ? a : b;
	}, ...points);
	const zMax = findMinimum((a, b) => {
		return a.z > b.z ? a : b;
	}, ...points);
	return {
		...box,
		z: zMin.z,
		depth: zMax.z - zMin.z
	};
};

//#endregion
//#region ../packages/geometry/src/point/centroid.ts
/**
* Calculates the [centroid](https://en.wikipedia.org/wiki/Centroid#Of_a_finite_set_of_points) of a set of points
* Undefined values are skipped over. Calculation and return value is 2D.
*
* ```js
* // Find centroid of a list of points
* const c1 = centroid(p1, p2, p3, ...);
*
* // Find centroid of an array of points
* const c2 = centroid(...pointsArray);
* ```
* @param points
* @returns A single point
*/
const centroid$1 = (...points) => {
	if (!Array.isArray(points)) throw new Error(`Expected list of points`);
	const sum = points.reduce((previous, p) => {
		if (p === void 0) return previous;
		if (Array.isArray(p)) throw new TypeError(`'points' list contains an array. Did you mean: centroid(...myPoints)?`);
		if (!isPoint(p)) throw new Error(`'points' contains something which is not a point: ${JSON.stringify(p)}`);
		return {
			x: previous.x + p.x,
			y: previous.y + p.y
		};
	}, {
		x: 0,
		y: 0
	});
	return Object.freeze({
		x: sum.x / points.length,
		y: sum.y / points.length
	});
};

//#endregion
//#region ../packages/geometry/src/point/clamp.ts
/**
* Clamps a point to be between `min` and `max` (0 & 1 by default)
* @param pt Point
* @param min Minimum value (0 by default)
* @param max Maximum value (1 by default)
*/
function clamp(a, min = 0, max = 1) {
	if (isPoint3d(a)) return Object.freeze({
		x: clamp$1(a.x, min, max),
		y: clamp$1(a.y, min, max),
		z: clamp$1(a.z, min, max)
	});
	else return Object.freeze({
		x: clamp$1(a.x, min, max),
		y: clamp$1(a.y, min, max)
	});
}

//#endregion
//#region ../packages/geometry/src/point/compare.ts
/**
* Returns -2 if both x & y of a is less than b
* Returns -1 if either x/y of a is less than b
*
* Returns 2 if both x & y of a is greater than b
* Returns 1 if either x/y of a is greater than b's x/y
*
* Returns 0 if x/y of a and b are equal
* @param a
* @param b
*/
function compare(a, b) {
	if (a.x < b.x && a.y < b.y) return -2;
	if (a.x > b.x && a.y > b.y) return 2;
	if (a.x < b.x || a.y < b.y) return -1;
	if (a.x > b.x || a.y > b.y) return 1;
	if (a.x === b.x && a.x === b.y) return 0;
	return NaN;
}
/**
* Compares points row-wise.
*
* A point is considered less if has a lower `y` value, or if `y` values are equal, a lower `x` value.
*
* Returns 0 if points are equal, -1 if a is less than b, 1 if a is greater than b.
*
* This can be used for sorting points in a row-wise manner, for example:
* ```js
* arrayOfPoints.sort(Points.compareRowwise);
* ```
* @param a
* @param b
*/
function compareRowwise(a, b) {
	if (a.y < b.y) return -1;
	if (a.y > b.y) return 1;
	if (a.x < b.x) return -1;
	if (a.x > b.x) return 1;
	return 0;
}
/**
* Returns a rectangle from two points, where it's uncertain if
* a/b ought to be top-left or bottom-right.
*
* To resolve this, we use Points.compareRowwise to determine which point is top-left and which is bottom-right.
* @param a
* @param b
*/
function getAsBounds(a, b) {
	const topLeft = compareRowwise(a, b) <= 0 ? a : b;
	return {
		topLeft,
		bottomRight: topLeft === a ? b : a
	};
}
/**
* Compares points based on x value. Y value is ignored.
*
* Return values:
* 0: If a.x === b.x
* 1: a is to the right of b (ie. a.x > b.x)
* -1: a is to the left of b (ie. a.x < b.x)
*
* @example Sorting by x
* ```js
* arrayOfPoints.sort(Points.compareByX);
* ```
*
* @param a
* @param b
* @returns
*/
function compareByX(a, b) {
	if (a.x === b.x) return 0;
	if (a.x < b.x) return -1;
	return 1;
}
/**
* Compares points based on Y value. X value is ignored.
*
* Return values:
* 0: If a.y === b.y
* 1: A is below B (ie. a.y > b.y)
* -1: A is above B (ie. a.y < b.y)
*
* @example Sorting by Y
* ```js
* arrayOfPoints.sort(Points.compareByY);
* ```
* @param a
* @param b
* @returns
*/
function compareByY(a, b) {
	if (a.y === b.y) return 0;
	if (a.y < b.y) return -1;
	return 1;
}
/**
* Compares points based on Z value. XY values are ignored.
*
* Return values:
* 0: If a.z === b.z
* 1: A is below B (ie. a.z > b.z)
* -1: A is above B (ie. a.z < b.z)
*
* @example Sorting by Y
* ```js
* arrayOfPoints.sort(Points.compareByZ);
* ```
* @param a
* @param b
* @returns
*/
function compareByZ(a, b) {
	if (a.z === b.z) return 0;
	if (a.z < b.z) return -1;
	return 1;
}

//#endregion
//#region ../packages/geometry/src/point/convex-hull.ts
/**
* Simple convex hull impementation. Returns a set of points which
* enclose `pts`.
*
* For more power, see something like [Hull.js](https://github.com/AndriiHeonia/hull)
* @param pts
* @returns
*/
const convexHull = (...pts) => {
	const sorted = [...pts].sort(compareByX);
	if (sorted.length === 1) return sorted;
	const x = (points) => {
		const v = [];
		for (const p of points) {
			while (v.length >= 2) {
				const q = v.at(-1);
				const r = v.at(-2);
				if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) v.pop();
				else break;
			}
			v.push(p);
		}
		v.pop();
		return v;
	};
	const upper = x(sorted);
	const lower = x(sorted.reverse());
	if (upper.length === 1 && lower.length === 1 && isEqual$5(lower[0], upper[0])) return upper;
	return [...upper, ...lower];
};

//#endregion
//#region ../packages/geometry/src/circle/distance-center.ts
/**
* Returns the distance between two circle centers.
* 
* ```js
* const circleA = { radius: 5, x: 5, y: 5 }
* const circleB = { radius: 10, x: 20, y: 20 }
* const distance = Circles.distanceCenter(circleA, circleB);
* ```
* Throws an error if either is lacking position.
* @param a 
* @param b 
* @returns Distance
*/
const distanceCenter$1 = (a, b) => {
	guardPositioned(a, `a`);
	if (isCirclePositioned(b)) guardPositioned(b, `b`);
	return distance$2(a, b);
};

//#endregion
//#region ../packages/geometry/src/circle/distance-from-exterior.ts
/**
* Returns the distance between the exterior of two circles, or between the exterior of a circle and point.
* If `b` overlaps or is enclosed by `a`, distance is 0.
* 
* ```js
* const circleA = { radius: 5, x: 5, y: 5 }
* const circleB = { radius: 10, x: 20, y: 20 }
* const distance = Circles.distanceCenter(circleA, circleB);
* ```
* @param a
* @param b 
*/
const distanceFromExterior = (a, b) => {
	guardPositioned(a, `a`);
	if (isCirclePositioned(b)) return Math.max(0, distanceCenter$1(a, b) - a.radius - b.radius);
	else if (isPoint(b)) {
		const distribution = distance$2(a, b);
		if (distribution < a.radius) return 0;
		return distribution;
	} else throw new Error(`Second parameter invalid type`);
};

//#endregion
//#region ../packages/geometry/src/point/distance-to-center.ts
/**
* Returns the distance from point `a` to the center of `shape`.
* @param a Point
* @param shape Point, or a positioned Rect or Circle.
* @returns
*/
const distanceToCenter = (a, shape) => {
	if (isRectPositioned(shape)) return distanceFromExterior$1(shape, a);
	if (isCirclePositioned(shape)) return distanceFromExterior(shape, a);
	if (isPoint(shape)) return distance$2(a, shape);
	throw new Error(`Unknown shape`);
};

//#endregion
//#region ../packages/geometry/src/point/distance-to-exterior.ts
/**
* Returns the distance from point `a` to the exterior of `shape`.
*
* @example Distance from point to rectangle
* ```
* const distance = distanceToExterior(
*  {x: 50, y: 50},
*  {x: 100, y: 100, width: 20, height: 20}
* );
* ```
*
* @example Find closest shape to point
* ```
* import {minIndex} from '../data/arrays.js';
* const shapes = [ some shapes... ]; // Shapes to compare against
* const pt = { x: 10, y: 10 };       // Comparison point
* const distances = shapes.map(v => distanceToExterior(pt, v));
* const closest = shapes[minIndex(...distances)];
* ```
* @param a Point
* @param shape Point, or a positioned Rect or Circle.
* @returns
*/
const distanceToExterior = (a, shape) => {
	if (isRectPositioned(shape)) return distanceFromExterior$1(shape, a);
	if (isCirclePositioned(shape)) return distanceFromExterior(shape, a);
	if (isPoint(shape)) return distance$2(a, shape);
	throw new Error(`Unknown shape`);
};

//#endregion
//#region ../packages/geometry/src/point/divider.ts
/**
* Returns a Point with the x,y,z values of two points divide (a/b).
* 
* `z` parameter is used, if present. Uses a default value of 0 for 'z' when dividing a 2D point with a 3D one.
*
* Examples:
*
* ```js
* divide(ptA, ptB);
* divide(x1, y1, x2, y2);
* divide(ptA, x2, y2);
* ```
*/
function divide$3(a1, ab2, ab3, ab4, ab5, ab6) {
	const [ptA, ptB] = getTwoPointParameters(a1, ab2, ab3, ab4, ab5, ab6);
	guard$5(ptA, `a`);
	guard$5(ptB, `b`);
	if (ptB.x === 0) throw new TypeError("Cannot divide by zero (b.x is 0)");
	if (ptB.y === 0) throw new TypeError("Cannot divide by zero (b.y is 0)");
	const pt = {
		x: ptA.x / ptB.x,
		y: ptA.y / ptB.y
	};
	if (isPoint3d(ptA) || isPoint3d(ptB)) {
		if (ptB.z === 0) throw new TypeError("Cannot divide by zero (b.z is 0)");
		pt.z = (ptA.z ?? 0) / (ptB.z ?? 0);
	}
	return Object.freeze(pt);
}
/**
* Returns a function that divides a point:
* ```js
* const f = divider(100, 200);
* f(50,100); // Yields: { x: 0.5, y: 0.5 }
* ```
*
* Input values can be Point, separate x,y and optional z values or an array:
* ```js
* const f = divider({ x: 100, y: 100 });
* const f = divider( 100, 100 );
* const f = divider([ 100, 100 ]);
* ```
*
* Likewise the returned function an take these as inputs:
* ```js
* f({ x: 100, y: 100});
* f( 100, 100 );
* f([ 100, 100 ]);
* ```
*
* Function throws if divisor has 0 for any coordinate (since we can't divide by 0)
* @param a Divisor point, array of points or x
* @param b Divisor y value
* @param c Divisor z value
* @returns
*/
function divider(a, b, c) {
	const divisor = getPointParameter$1(a, b, c);
	guardNonZeroPoint(divisor, `divisor`);
	return (aa, bb, cc) => {
		const dividend = getPointParameter$1(aa, bb, cc);
		return typeof dividend.z === `undefined` ? Object.freeze({
			x: dividend.x / divisor.x,
			y: dividend.y / divisor.y
		}) : Object.freeze({
			x: dividend.x / divisor.x,
			y: dividend.y / divisor.y,
			z: dividend.z / (divisor.z ?? 1)
		});
	};
}

//#endregion
//#region ../packages/geometry/src/point/to-array.ts
/**
* Returns point as an array in the form [x,y]. This can be useful for some libraries
* that expect points in array form.
*
* ```
* const p = {x: 10, y:5};
* const p2 = toArray(p); // yields [10,5]
* ```
* @param p
* @returns
*/
const toArray = (p) => [p.x, p.y];

//#endregion
//#region ../packages/geometry/src/point/dot-product.ts
const dotProduct$2 = (...pts) => {
	return dotProduct$3(pts.map((p) => toArray(p)));
};
/**
* Returns the cross-product:
* ```
* ax * by - ay * bx
* ```
* @param a 
* @param b
* @returns 
*/
function cross(a, b) {
	return a.x * b.y - a.y * b.x;
}
/**
* Returns the cross-product:
* ```
* ax * by - ay * bx
* ```
* @param ax 
* @param ay 
* @param bx 
* @param by 
* @returns 
*/
function crossProductRaw(ax, ay, bx, by) {
	return ax * by - ay * bx;
}

//#endregion
//#region ../packages/geometry/src/point/empty.ts
/**
* An empty point of `{ x: 0, y: 0 }`.
*
* Use `isEmpty` to check if a point is empty.
* Use `Empty3d` to get an empty point with `z`.
*/
const Empty$2 = {
	x: 0,
	y: 0
};
/**
* Returns { x:1, y:1 }
*/
const Unit = {
	x: 1,
	y: 1
};
/**
* An empty Point of `{ x: 0, y: 0, z: 0}`
* Use `isEmpty` to check if a point is empty.
* Use `Empty` to get an empty point without `z`.
*/
const Empty3d = {
	x: 0,
	y: 0,
	z: 0
};
/**
* Returns { x:1,y:1,z:1 }
*/
const Unit3d = {
	x: 1,
	y: 1,
	z: 1
};

//#endregion
//#region ../packages/geometry/src/point/from.ts
/**
* Returns a point from two or three coordinates or an array of [x,y] or [x,y,z].
* @example
* ```js
* let p = from([10, 5]);    // yields {x:10, y:5}
* let p = from([10, 5, 2]); // yields: {x:10, y:5, z:2}
* let p = from(10, 5);      // yields {x:10, y:5}
* let p = from(10, 5, 2);   // yields: {x:10, y:5, z:2}
* ```
* @param xOrArray
* @param [y]
* @returns Point
*/
function from(xOrArray, y, z) {
	if (Array.isArray(xOrArray)) if (xOrArray.length === 3) return Object.freeze({
		x: xOrArray[0],
		y: xOrArray[1],
		z: xOrArray[2]
	});
	else if (xOrArray.length === 2) return Object.freeze({
		x: xOrArray[0],
		y: xOrArray[1]
	});
	else throw new Error(`Expected array of length two or three, got ${xOrArray.length}`);
	else {
		if (xOrArray === void 0) throw new Error(`Requires an array of [x,y] or x,y parameters at least`);
		else if (Number.isNaN(xOrArray)) throw new Error(`x is NaN`);
		if (y === void 0) throw new Error(`Param 'y' is missing`);
		else if (Number.isNaN(y)) throw new Error(`y is NaN`);
		if (z === void 0) return Object.freeze({
			x: xOrArray,
			y
		});
		else return Object.freeze({
			x: xOrArray,
			y,
			z
		});
	}
}
/**
* Parses a point as a string, in the form 'x,y' or 'x,y,z'.
* eg '10,15' will be returned as `{ x: 10, y: 15 }`.
* 
* Throws an error if `str` is not a string.
* 
* ```js
* Points.fromString(`10,15`);  // { x:10, y:15 }
* Points.fromString(`a,10`);   // { x:NaN, y:10 }
* ```
* 
* Use {@link Points.isNaN} to check if returned point has NaN for either coordinate.
* @param string_ 
*/
const fromString = (string_) => {
	if (typeof string_ !== `string`) throw new TypeError(`Param 'str' ought to be a string. Got: ${typeof string_}`);
	const comma = string_.indexOf(`,`);
	const x = Number.parseFloat(string_.substring(0, comma));
	const nextComma = string_.indexOf(",", comma + 1);
	if (nextComma > 0) return {
		x,
		y: Number.parseFloat(string_.substring(comma + 1, nextComma - comma + 2)),
		z: Number.parseFloat(string_.substring(nextComma + 1))
	};
	else return {
		x,
		y: Number.parseFloat(string_.substring(comma + 1))
	};
};
/**
* Returns an array of points from an array of numbers.
*
* Array can be a continuous series of x, y values:
* ```
* [1,2,3,4] would yield: [{x:1, y:2}, {x:3, y:4}]
* ```
*
* Or it can be an array of arrays:
* ```
* [[1,2], [3,4]] would yield: [{x:1, y:2}, {x:3, y:4}]
* ```
* @param coords
* @returns
*/
const fromNumbers$1 = (...coords) => {
	const pts = [];
	if (Array.isArray(coords[0])) for (const coord of coords) {
		if (!(coord.length % 2 === 0)) throw new Error(`coords array should be even-numbered`);
		pts.push(Object.freeze({
			x: coord[0],
			y: coord[1]
		}));
	}
	else {
		if (coords.length % 2 !== 0) throw new Error(`Expected even number of elements: [x,y,x,y...]`);
		for (let index = 0; index < coords.length; index += 2) pts.push(Object.freeze({
			x: coords[index],
			y: coords[index + 1]
		}));
	}
	return pts;
};

//#endregion
//#region ../packages/geometry/src/line/reverse.ts
/**
* Reverses a line.
* ````js
* const a = { x: 10, y: 20 };
* const b = { x: 100, y: 200 };
* const line = reverse({ a, b });
* // { a: { x: 100, y: 200 }, b: { x: 10, y: 20 } }
* ```
* @param line
* @returns
*/
function reverse(line) {
	resultThrow(lineTest(line, `line`));
	return {
		a: line.b,
		b: line.a
	};
}

//#endregion
//#region ../packages/geometry/src/line/interpolate.ts
/**
* Calculates a point in-between a line's start and end points.
*
* @param amount Interpolation amount
* @param aOrLine Line, or first point
* @param pointBOrAllowOverflow Second point (if needed) or allowOverflow.
* @param allowOverflow If true, interpolation amount is permitted to exceed 0..1, extending the line.
*/
function interpolate$4(amount, aOrLine, pointBOrAllowOverflow, allowOverflow) {
	if (typeof pointBOrAllowOverflow === `boolean`) {
		allowOverflow = pointBOrAllowOverflow;
		pointBOrAllowOverflow = void 0;
	}
	if (!allowOverflow) resultThrow(percentTest(amount, `amount`));
	else resultThrow(numberTest(amount, ``, `amount`));
	const [a, b] = getPointParameter(aOrLine, pointBOrAllowOverflow);
	return interpolator$2({
		a,
		b
	}, allowOverflow)(amount);
}
/**
* Returns a function that interpolates along `line`, returning a {@link Point}.
* ```js
* const i = interpolator(a: {x:0,y:0}, b:{x:100, y:100});
* i(0.5); // Returns point 50% between a and b.
* ```
* @param line Line to interpolate along
* @param allowOverflow If _true_ interpolation amount can exceed 0..1, extending the line.
*/
function interpolator$2(line, allowOverflow = false) {
	resultThrow(lineTest(line));
	const d = length$3(line);
	const { a, b } = line;
	return (amount) => {
		if (!allowOverflow) resultThrow(percentTest(amount, `amount`));
		else resultThrow(numberTest(amount, ``, `amount`));
		const d2 = d * (1 - amount);
		if (d === 0 && d2 === 0) return Object.freeze({ ...b });
		const x = b.x - d2 * (b.x - a.x) / d;
		const y = b.y - d2 * (b.y - a.y) / d;
		return Object.freeze({
			...b,
			x,
			y
		});
	};
}
/**
* Returns the point along a line from its start (A)
* @param line Line
* @param distance Distance
* @param fromA If _true_ (default) returns from A. Use _false_ to calculate from end
* @returns Point at distance along line
*/
function pointAtDistance(line, distance, fromA = true) {
	if (!fromA) line = reverse(line);
	const dx = line.b.x - line.a.x;
	const dy = line.b.y - line.a.y;
	const theta = Math.atan2(dy, dx);
	const xp = distance * Math.cos(theta);
	const yp = distance * Math.sin(theta);
	return {
		x: xp + line.a.x,
		y: yp + line.a.y
	};
}

//#endregion
//#region ../packages/geometry/src/point/interpolate.ts
/**
* Returns a relative point between two points.
*
* ```js
* interpolate(0.5, { x:0, y:0 }, { x:10, y:10 }); // Halfway { x, y }
* ```
*
* Alias for Lines.interpolate(amount, a, b);
*
* If you find yourself calling `interpolate` repeatedly with the same points, consider using {@link interpolator} to create a function that bakes in the points.
* @param amount Relative amount, 0-1
* @param a
* @param b
* @param allowOverflow If true, length of line can be exceeded for `amount` of below 0 and above `1`.
* @returns {@link Point} Point
*/
function interpolate$3(amount, a, b, allowOverflow = false) {
	return interpolate$4(amount, a, b, allowOverflow);
}
/**
* Returns a function that interpolates between two points. If you just want to interpolate between two points, use {@link interpolate}.
*
* ```js
* const i = interpolator({ x:0, y:0 }, { x:10, y:10 });
* i(0.5); // Halfway { x, y }
* ```
*
* If you find yourself not needing to reuse the function because you're always calling `interpolator` with different point values all the time, use {@link interpolate} instead.
* @param a
* @param b
* @param allowOverflow
* @returns Function to interpolate
*/
const interpolator$1 = (a, b, allowOverflow = false) => interpolator$2({
	a,
	b
}, allowOverflow);

//#endregion
//#region ../packages/geometry/src/point/invert.ts
/**
* Inverts one or more axis of a point
* ```js
* invert({x:10, y:10}); // Yields: {x:-10, y:-10}
* invert({x:10, y:10}, `x`); // Yields: {x:-10, y:10}
* ```
* @param pt Point to invert
* @param what Which axis. If unspecified, both axies are inverted
* @returns
*/
const invert$1 = (pt, what = `both`) => {
	switch (what) {
		case `both`: return isPoint3d(pt) ? Object.freeze({
			...pt,
			x: pt.x * -1,
			y: pt.y * -1,
			z: pt.z * -1
		}) : Object.freeze({
			...pt,
			x: pt.x * -1,
			y: pt.y * -1
		});
		case `x`: return Object.freeze({
			...pt,
			x: pt.x * -1
		});
		case `y`: return Object.freeze({
			...pt,
			y: pt.y * -1
		});
		case `z`: if (isPoint3d(pt)) return Object.freeze({
			...pt,
			z: pt.z * -1
		});
		else throw new Error(`pt parameter is missing z`);
		default: throw new Error(`Unknown what parameter. Expecting 'both', 'x' or 'y'`);
	}
};

//#endregion
//#region ../packages/geometry/src/point/multiply.ts
/**
* Returns a Point with the x,y,z values of two points multiply (a/b).
* 
* `z` parameter is used, if present. Uses a default value of 0 for 'z' when multiplying a 2D point with a 3D one.
*
* Examples:
*
* ```js
* multiply(ptA, ptB);
* multiply(x1, y1, x2, y2);
* multiply(ptA, x2, y2);
* ```
*/
function multiply$3(a1, ab2, ab3, ab4, ab5, ab6) {
	const [ptA, ptB] = getTwoPointParameters(a1, ab2, ab3, ab4, ab5, ab6);
	guard$5(ptA, `a`);
	guard$5(ptB, `b`);
	const pt = {
		x: ptA.x * ptB.x,
		y: ptA.y * ptB.y
	};
	if (isPoint3d(ptA) || isPoint3d(ptB)) pt.z = (ptA.z ?? 0) * (ptB.z ?? 0);
	return Object.freeze(pt);
}
/**
* Multiplies all components by `v`.
* Existing properties of `pt` are maintained.
*
* ```js
* multiplyScalar({ x:2, y:4 }, 2);
* // Yields: { x:4, y:8 }
* ```
* @param pt Point
* @param v Value to multiply by
* @returns
*/
const multiplyScalar$1 = (pt, v) => {
	return isPoint3d(pt) ? Object.freeze({
		...pt,
		x: pt.x * v,
		y: pt.y * v,
		z: pt.z * v
	}) : Object.freeze({
		...pt,
		x: pt.x * v,
		y: pt.y * v
	});
};

//#endregion
//#region ../packages/geometry/src/point/magnitude.ts
/**
* Clamps the magnitude of a point.
* This is useful when using a Point as a vector, to limit forces.
* @param pt
* @param max Maximum magnitude (1 by default)
* @param min Minimum magnitude (0 by default)
* @returns
*/
const clampMagnitude$2 = (pt, max = 1, min = 0) => {
	const length = distance$2(pt);
	let ratio = 1;
	if (length > max) ratio = max / length;
	else if (length < min) ratio = min / length;
	return ratio === 1 ? pt : multiply$3(pt, ratio, ratio);
};

//#endregion
//#region ../packages/geometry/src/point/most.ts
/**
* Returns the left-most of the provided points.
*
* Same as:
* ```js
* findMinimum((a, b) => {
*  if (a.x <= b.x) return a;
*  return b;
*}, ...points)
* ```
*
* @param points
* @returns
*/
const leftmost = (...points) => findMinimum((a, b) => a.x <= b.x ? a : b, ...points);
/**
* Returns the right-most of the provided points.
*
* Same as:
* ```js
* findMinimum((a, b) => {
*  if (a.x >= b.x) return a;
*  return b;
*}, ...points)
* ```
*
* @param points
* @returns
*/
const rightmost = (...points) => findMinimum((a, b) => a.x >= b.x ? a : b, ...points);

//#endregion
//#region ../packages/geometry/src/point/normalise.ts
const length$2 = (ptOrX, y) => {
	if (isPoint(ptOrX)) {
		y = ptOrX.y;
		ptOrX = ptOrX.x;
	}
	if (y === void 0) throw new Error(`Expected y`);
	return Math.hypot(ptOrX, y);
};
/**
* Normalise point as a unit vector.
*
* ```js
* normalise({x:10, y:20});
* normalise(10, 20);
* ```
* @param ptOrX Point, or x value
* @param y y value if first param is x
* @returns
*/
const normalise$2 = (ptOrX, y) => {
	const pt = getPointParameter$1(ptOrX, y);
	const l = length$2(pt);
	if (l === 0) return Empty$2;
	return Object.freeze({
		...pt,
		x: pt.x / l,
		y: pt.y / l
	});
};

//#endregion
//#region ../packages/geometry/src/point/normalise-by-rect.ts
/**
* Normalises a point so it is on a 0..1 scale
* 
* ```js
* normaliseByRect({ x: 10, y: 10, width: 20, height: 40 }); 
* normaliseByRect({ x: 10, y: 10 }, 20, 40); 
* normaliseByRect(10, 10, 20, 40);
* ```
* @param a Point, or x
* @param b y coord or width
* @param c height or width
* @param d height
* @returns Point
*/
function normaliseByRect$1(a, b, c, d) {
	if (isPoint(a)) {
		if (typeof b === `number` && c !== void 0) resultThrow(numberTest(b, `positive`, `width`), numberTest(c, `positive`, `height`));
		else {
			if (!isRect(b)) throw new Error(`Expected second parameter to be a rect`);
			c = b.height;
			b = b.width;
		}
		return Object.freeze({
			x: a.x / b,
			y: a.y / c
		});
	} else {
		resultThrow(numberTest(a, `positive`, `x`));
		if (typeof b !== `number`) throw new TypeError(`Expecting second parameter to be a number (width)`);
		if (typeof c !== `number`) throw new TypeError(`Expecting third parameter to be a number (height)`);
		resultThrow(numberTest(b, `positive`, `y`));
		resultThrow(numberTest(c, `positive`, `width`));
		if (d === void 0) throw new Error(`Expected height parameter`);
		resultThrow(numberTest(d, `positive`, `height`));
		return Object.freeze({
			x: a / c,
			y: b / d
		});
	}
}

//#endregion
//#region ../packages/geometry/src/point/pipeline.ts
/**
* Runs a sequential series of functions on `pt`. The output from one feeding into the next.
* 
* ```js
* const p = Points.pipelineApply(somePoint, Points.normalise, Points.invert);
* ```
*
* If you want to make a reusable pipeline of functions, consider {@link pipeline} instead.
* @param point
* @param pipelineFns
* @returns
*/
const pipelineApply = (point, ...pipelineFns) => pipeline(...pipelineFns)(point);
/**
* Returns a pipeline function that takes a point to be transformed through a series of functions
* ```js
* // Create pipeline
* const p = Points.pipeline(Points.normalise, Points.invert);
*
* // Now run it on `somePoint`.
* // First we normalised, and then invert
* const changedPoint = p(somePoint);
* ```
*
* If you don't want to create a pipeline, use {@link pipelineApply}.
* @param pipeline Pipeline of functions
* @returns
*/
const pipeline = (...pipeline) => (pt) => pipeline.reduce((previous, current) => current(previous), pt);

//#endregion
//#region ../packages/geometry/src/angles.ts
function degreeToRadian(angleInDegrees) {
	return Array.isArray(angleInDegrees) ? angleInDegrees.map((v) => v * (Math.PI / 180)) : angleInDegrees * (Math.PI / 180);
}
/**
* Inverts the angle so it points in the opposite direction of a unit circle
* @param angleInRadians
* @returns Radians
*/
function radianInvert(angleInRadians) {
	return (angleInRadians + Math.PI) % (2 * Math.PI);
}
function degreeToGradian(angleInDegrees) {
	return angleInDegrees * 1.111111;
}
/**
* Returns the gradian value converted to degrees.
* By default it wraps, so any value 360 or greater wraps around.
* @param angleInGradians
* @param wrap
* @returns Degrees
*/
function gradianToDegree(angleInGradians, wrap = true) {
	if (wrap) return angleInGradians * .9 % 360;
	return angleInGradians * .9;
}
function radianToGradian(angleInRadians) {
	return angleInRadians * 63.6619772368;
}
function gradianToRadian(angleInGradian) {
	return angleInGradian * .0157079633;
}
function radianToDegree(angleInRadians) {
	return Array.isArray(angleInRadians) ? angleInRadians.map((v) => v * 180 / Math.PI) : angleInRadians * 180 / Math.PI;
}
/**
* Angle from x-axis to point (ie. `Math.atan2`)
* @param point
* @returns Radians
*/
const radiansFromAxisX = (point) => Math.atan2(point.x, point.y);
/**
* Sum angles together, accounting for the 'wrap around'.
*
* `clockwise` of _true_ (default) means angles are added in clockwise direction
*
* ```js
* // From 180deg, add 90deg in the clockwise direction
* radiansSum(Math.PI, Math.PI/2, true);
* ```
*
* Orientation of angles is as follows:
* ```
*       90deg
*       Pi/2
*        |
* Pi  ---+--- 0
* 180    |
*       3PI/2
*       270deg
* ```
* {@link degreesSum} is the same, but uses degrees (0..360)
* @param start Starting angle, in radian
* @param amount Angle to add, in radian
* @param clockwise Add in clockwise direction (default: _true_)
* @returns Sum result, in radians
*/
function radiansSum(start, amount, clockwise = true) {
	if (clockwise) {
		let x = start + amount;
		if (x >= piPi$5) x = x % piPi$5;
		return x;
	} else {
		const x = start - amount;
		if (x < 0) return piPi$5 + x;
		return x;
	}
}
/**
* Sum angles together, accounting for the 'wrap around'.
*
* `clockwise` of _true_ (default) means angles are added in clockwise direction
*
* ```js
* // From 180deg, add 90deg in the clockwise direction
* radiansSum(180, 90, true);
* ```
*
* {@link radiansSum} is the same, but uses radians (0..2 Pi)
*
* Orientation of angles is as follows:
* ```
*       90
*        |
* 180 ---+--- 0
*        |
*       270
* ```
* @param start Starting angle, in degrees
* @param amount Angle to add, in degrees
* @param clockwise Add in clockwise direction (default: _true_)
* @returns Sum result, in degrees
*/
function degreesSum(start, amount, clockwise = true) {
	resultThrow(numberTest(start, ``, `start`), numberTest(amount, ``, `amount`), booleanTest(clockwise, `clockwise`));
	return radianToDegree(radiansSum(degreeToRadian(start), degreeToRadian(amount), clockwise));
}
/**
* Computes the angle arc between a start and end angle,
* given in radians. It properly accounts for the wrap-around
* values.
*
* Note that clockwise direction yields a negative angle.
* ```js
* // Between 0-90deg in clockwise direction
* radianArc(0, Math.PI/2, true); // Yields: 3Pi/2 (270 deg)
*
* // In counter-clockwise direction
* radianArc(0, Math.PI/2, false); // Yields: Math.PI/2 (90deg)
* ```
*
* See {@link degreeArc} to operate in degrees.
*
* Orientation of angles is as follows:
* ```
*       90deg
*       PI/2
*        |
* Pi  ---+--- 0 2PI
* 180    |
*       3PI/2
*       270deg
* ```
* @param start Start angle, in radians
* @param end End angle, in radians
* @param direction Calculate in the specified direction (default: _short_)
* @returns Angle of arc, in radians.
*/
function radianArc(start, end, direction = `short`) {
	resultThrow(numberTest(start, ``, `start`), numberTest(end, ``, `end`), stringTest(direction, ``, `direction`));
	const mod = (n, m) => (n % m + m) % m;
	const ccw = mod(end - start, piPi$5);
	const cw = ccw === 0 ? 0 : ccw - piPi$5;
	switch (direction) {
		case `ccw`: return end > start && ccw === 0 ? piPi$5 : ccw;
		case `cw`: return end < start && ccw === 0 ? -piPi$5 : cw;
		case `short`:
			if (ccw === 0) return 0;
			return Math.abs(ccw) <= Math.abs(cw) ? ccw : cw;
		case `long`:
			if (ccw === 0) return start === end ? 0 : piPi$5;
			return Math.abs(ccw) >= Math.abs(cw) ? ccw : cw;
		default: throw new TypeError(`Invalid direction: ${direction}. Expected: 'short', 'long', 'cw' or 'ccw'`);
	}
}
/**
* Computes the angle arc between a `start` and `end` angle,
* given in degrees. It properly accounts for the wrap-around
* values.
*
* Clockwise movement is negative.
*
* Orientation of angles on a circle is as follows:
* ```
*       90
*        |
* 180 ---+--- 0
*        |
*       270
* ```
*
* Example, from 'east' (0deg) to 'south' (270deg)
* ```js
* degreeArc(0, 270);          // 'short' is default, result: -90
* degreeArc(0, 270, `long`);  // 270
* degreeArc(0, 270, `short`); // -90
* degreeArc(0, 270, `cw`);    // clockwise: -90
* degreeArc(0, 270, `ccw`);   // counter-clockwise: 270
* ```
*
* Or from 'east' (0deg) to 'north' (90deg):
* ```js
* degreeArc(0, 90);          // 'short' is default, result: 90
* degreeArc(0, 90, `long`);  // -270
* degreeArc(0, 90, `short`); // 90
* degreeArc(0, 90, `cw`);    // clockwise: -270
* degreeArc(0, 90, `ccw`);   // counter-clockwise: 90
* ```
*
* Use {@link radianArc} to operate in radians (which this function calls behind the scenes).
*
* @param start Start angle, in degrees
* @param end End angle, in degrees
* @param direction Calculate in the specified direction (default: _short_)
* @returns Angle of arc, in degrees.
*/
function degreeArc(start, end, direction = `short`) {
	resultThrow(numberTest(start, ``, `start`), numberTest(end, ``, `end`), stringTest(direction, ``, `direction`));
	return radianToDegree(radianArc(degreeToRadian(start), degreeToRadian(end), direction));
}
/**
* Parses CSS-style angle strings into an 'Angle' type. By default assumes degrees.
*
* ```js
* angleParse(`100`);     // { value: 100, unit: `deg` }
* angleParse(100);       // { value: 100, unit: `deg` }
* angleParse(`100deg`);  // { value: 100, unit: `deg` }
*
* // More exotic units:
* angleParse(`100rad`);  // { value: 100, unit: `rad` }
* angleParse(`100turn`); // { value: 100, unit: `turn` }
* angleParse(`100grad`); // { value: 100, unit: `grad` }
* angleParse(`n`); // { value: 90, unit: `deg` }
* angleParse(`e`); // { value: 0, unit: `deg` }
* angleParse(`s`); // { value: 270, unit: `deg` }
* angleParse(`w`); // { value: 180, unit: `deg` }
* angleParse(`ne`); // ne/nw/se/sw supported
* // Once parsed, use angleConvert to convert to a different unit:
* angleConvert(`100rad`, `deg`); // { value: 5729.57795, unit: `deg` }
* ```
*
* Once parsed in this format, use {@link angleConvert} to convert to
* a different unit.
* @param value
* @returns Angle
*/
function angleParse(value) {
	if (isAngleType(value)) return value;
	if (typeof value === `number`) return {
		value,
		unit: `deg`
	};
	value = value.toLowerCase();
	let unit = `deg`;
	let numberValue = NaN;
	if (value.endsWith(`grad`)) {
		numberValue = Number.parseFloat(value.substring(0, value.length - 4));
		unit = `grad`;
	} else if (value.endsWith(`rad`)) {
		numberValue = Number.parseFloat(value.substring(0, value.length - 3));
		unit = `rad`;
	} else if (value.endsWith(`turn`)) {
		numberValue = Number.parseFloat(value.substring(0, value.length - 4));
		unit = `turn`;
	} else if (value.endsWith(`deg`)) {
		numberValue = Number.parseFloat(value.substring(0, value.length - 3));
		unit = `deg`;
	} else numberValue = Number.parseFloat(value);
	if (Number.isNaN(numberValue)) if (value === `n`) return {
		value: 90,
		unit: `deg`
	};
	else if (value === `e`) return {
		value: 0,
		unit: `deg`
	};
	else if (value === `s`) return {
		value: 270,
		unit: `deg`
	};
	else if (value === `w`) return {
		value: 180,
		unit: `deg`
	};
	else if (value === `ne`) return {
		value: 45,
		unit: `deg`
	};
	else if (value === `se`) return {
		value: 315,
		unit: `deg`
	};
	else if (value === `sw`) return {
		value: 225,
		unit: `deg`
	};
	else if (value === `nw`) return {
		value: 135,
		unit: `deg`
	};
	else throw new Error(`Invalid angle (bad value?): '${value}'. If using cardinals, use: 'n', 'se', etc.`);
	if (unit.length === 0) throw new Error(`Invalid angle (no unit)`);
	return {
		value: numberValue,
		unit
	};
}
function isAngleType(v) {
	if (typeof v !== `object`) return false;
	if (`unit` in v && `value` in v) {
		if (typeof v.unit !== `string`) return false;
		if (typeof v.value !== `number`) return false;
		return true;
	}
	return false;
}
/**
* Returns _true_ if `v` is a number, string or `Angle` type.
* @param v
*/
function isAngleTypeConvertible(v) {
	if (typeof v === `undefined`) return false;
	if (typeof v === `number` || typeof v === `string`) return true;
	if (typeof v === `object`) {
		if (`unit` in v && `value` in v) {
			if (typeof v.unit !== `string`) return false;
			if (typeof v.value !== `number`) return false;
			return true;
		}
	}
	return false;
}
/**
* Converts some angle representation to a simple numeric radian angle.
*
* ```js
* toRadian(90); // 90deg
* toRadian(`90`); // 90deg
* toRadian(`1.2rad`)
* toRadian(`90deg`)
* ```
*
* Unitless values provided as a number or string are assumed to be degrees.
* @param angleOrDegrees
* @returns Radians
*/
function toRadian(angleOrDegrees) {
	if (typeof angleOrDegrees === `number`) return angleOrDegrees;
	return angleConvert(angleOrDegrees, `rad`).value;
}
/**
* Converts an angle to another representation.
* Input value is assumed degrees unless it's an {@link Angle} type of has the unit.
*
* These are all identical inputs: 100, `100`, `100deg`
* ```js
* angleConvert(100, `rad`); // Converts 100deg to radians
* ```
*
* Other units can be used for string input: `2turn`, `1grad`, `2rad`.
* ```js
* angleConvert(`2rad`, `deg`); // Converts 2radians to degrees
* ```
*
* Can also use an object input:
* ```js
* angleConvert({ value: 10, unit: `deg`}, `rad`);
* ```
* @param angleOrDegrees
* @param destination
* @returns Angle
*/
function angleConvert(angleOrDegrees, destination) {
	const input = typeof angleOrDegrees === `object` ? angleOrDegrees : angleParse(angleOrDegrees);
	switch (destination) {
		case `deg`:
			if (input.unit === `deg`) return input;
			if (input.unit === `rad`) return {
				value: radianToDegree(input.value),
				unit: `deg`
			};
			if (input.unit === `grad`) return {
				value: gradianToDegree(input.value),
				unit: `deg`
			};
			if (input.unit === `turn`) return {
				value: turnToDegree(input.value),
				unit: `deg`
			};
			throw new Error(`Unknown unit: ${input.unit}`);
		case `grad`:
			if (input.unit === `deg`) return {
				value: degreeToGradian(input.value),
				unit: `grad`
			};
			if (input.unit === `rad`) return {
				value: radianToGradian(input.value),
				unit: `grad`
			};
			if (input.unit === `grad`) return input;
			if (input.unit === `turn`) return {
				value: radianToGradian(turnToRadian(input.value)),
				unit: `grad`
			};
			throw new Error(`Unknown unit: ${input.unit}`);
		case `rad`:
			if (input.unit === `deg`) return {
				value: degreeToRadian(input.value),
				unit: `rad`
			};
			if (input.unit === `rad`) return input;
			if (input.unit === `grad`) return {
				value: gradianToRadian(input.value),
				unit: `rad`
			};
			if (input.unit === `turn`) return {
				value: turnToRadian(input.value),
				unit: `rad`
			};
			throw new Error(`Unknown unit: ${input.unit}`);
		case `turn`:
			if (input.unit === `deg`) return {
				value: degreeToTurn(input.value),
				unit: `turn`
			};
			if (input.unit === `rad`) return {
				value: radianToTurn(input.value),
				unit: `turn`
			};
			if (input.unit === `grad`) return {
				value: radianToTurn(gradianToRadian(input.value)),
				unit: `turn`
			};
			if (input.unit === `turn`) return input;
			throw new Error(`Unknown unit: ${input.unit}`);
		default: throw new Error(`Destination unit unknown ('${destination}). Expects: deg, grad, rad or turn`);
	}
}
/**
* Compute [unit vector](https://en.wikipedia.org/wiki/Unit_vector) of an angle. The unit vector is essentially the direction of an angle.
*
* ```js
* unitVector(90); // 90 deg
* unitVector(`1.2rad`); // 1.2 in radians
* ```
*
* The coordinate space is -1..1:
* ```
*    y 1
*      |
*      |
* -1 --+--- 1 x
*      |
*      |
*     -1
* ```
*
* See {@link fromUnitVector} to convert back to an angle
* @param angleOrDegrees Angle specified in degrees, or an angle with units
*/
function toUnitVector(angleOrDegrees) {
	const radians = toRadian(angleOrDegrees);
	return {
		x: Math.cos(radians),
		y: Math.sin(radians)
	};
}
/**
* Convert from a [unit vector](https://en.wikipedia.org/wiki/Unit_vector) to an angle,
* by default radians.
*
* ```js
* fromUnitVector({ x: 1, y: 0.5 });          // { unit: `rad`, value: ... }
* fromUnitVector({ x: -0.2, y: 0.4 }, `deg`) // { unit: `deg`, value ... }
* ```
* @param vector
* @param unit
* @returns Angle
*/
function fromUnitVector(vector, unit = `rad`) {
	const r = Math.atan2(vector.x, vector.y);
	if (unit === `rad`) return {
		unit: `rad`,
		value: r
	};
	return angleConvert(r, unit);
}
/**
* Converts 'turns' to degrees. By defaults wraps the value, so
* turn value of 1 or 2 equal 0deg instead of 360 or 720deg.
* @param turns
* @param wrap
* @returns Degrees
*/
function turnToDegree(turns, wrap = true) {
	if (wrap) return turns * 360 % 360;
	return turns * 360;
}
/**
* Calculates the average of angles
* @param angles Angles to average
* @param kind Kind of average to calculate. See {@link PointAverageKinds} for details.
* @returns Average angle
*/
function average(angles, kind = `mean`) {
	const anglesProper = angles.map((a) => angleParse(a));
	return fromUnitVector(average$1(anglesProper.map((a) => toUnitVector(a)), kind), anglesProper[0].unit);
}
/**
* Normalise a radian angle to 0..2*PI range
* @param angleRadian
* @returns Normalised angle
*/
function radiansNormalise(angleRadian) {
	angleRadian %= piPi$5;
	return angleRadian < 0 ? angleRadian + piPi$5 : angleRadian;
}
/**
* Returns _true_ if `check` is between `start` and `end` angles, using 0...2PI range.
*
* Assumes a clockwise order. Ie. the checked angle is a wedge from `start`,
* clockwise to `end`.
*
* Tip: use {@link radiansNormalise} on all angles first if uncertain if they are on 0...2PI range.
* @param check
* @param start
* @param end
* @returns Boolean
*/
function radiansBetweenCircular(check, start, end) {
	if (start < 0 || start > piPi$5) throw new TypeError(`Param 'start' out of range. Expecting 0..2PI. Got: ${start}`);
	if (end < 0 || end > piPi$5) throw new TypeError(`Param 'end' out of range. Expecting 0..2PI. Got: ${end}`);
	if (start > Math.PI && end <= Math.PI) if (check > Math.PI) return check >= start;
	else return check <= end;
	return check >= start && check <= end;
}
/**
* Given two radian (0..2PI) angles, it returns the sweep angles
* between them that is either minimised or maximised.
* @param a
* @param b
*/
function radianRange(a, b) {
	if (a < 0 || a > piPi$5) throw new TypeError(`Param 'a' out of range. Expecting 0..2PI. Got: ${a}`);
	if (b < 0 || b > piPi$5) throw new TypeError(`Param 'b' out of range. Expecting 0..2PI. Got: ${b}`);
	const aa = Math.min(a, b);
	const bb = Math.max(a, b);
	if (aa < Math.PI && bb > Math.PI) {
		const dCw = piPi$5 - bb + aa;
		const dCcw = bb - aa;
		if (dCw < dCcw) return {
			min: {
				start: bb,
				end: aa,
				sweep: dCw
			},
			max: {
				start: aa,
				end: bb,
				sweep: dCcw
			}
		};
	}
	return {
		min: {
			start: aa,
			end: bb,
			sweep: bb - aa
		},
		max: {
			start: bb,
			end: aa,
			sweep: piPi$5 - (bb - aa)
		}
	};
}
function turnToRadian(turns) {
	return turns * piPi$5;
}
function degreeToTurn(degrees) {
	return degrees / 360;
}
function radianToTurn(radians) {
	return radians / piPi$5;
}

//#endregion
//#region ../packages/geometry/src/polar/guard.ts
/**
* Returns true if `p` seems to be a {@link Polar.Coord} (ie has both distance & angleRadian fields)
* @param p
* @returns True if `p` seems to be a PolarCoord
*/
const isPolarCoord = (p) => {
	if (p.distance === void 0) return false;
	if (p.angleRadian === void 0) return false;
	return true;
};
/**
* Throws an error if Coord is invalid
* @param p
* @param name
*/
const guard$2 = (p, name = `Point`) => {
	if (p === void 0) throw new Error(`'${name}' is undefined. Expected {distance, angleRadian} got ${JSON.stringify(p)}`);
	if (p === null) throw new Error(`'${name}' is null. Expected {distance, angleRadian} got ${JSON.stringify(p)}`);
	if (p.angleRadian === void 0) throw new Error(`'${name}.angleRadian' is undefined. Expected {distance, angleRadian} got ${JSON.stringify(p)}`);
	if (p.distance === void 0) throw new Error(`'${name}.distance' is undefined. Expected {distance, angleRadian} got ${JSON.stringify(p)}`);
	if (typeof p.angleRadian !== `number`) throw new TypeError(`'${name}.angleRadian' must be a number. Got ${p.angleRadian}`);
	if (typeof p.distance !== `number`) throw new TypeError(`'${name}.distance' must be a number. Got ${p.distance}`);
	if (p.angleRadian === null) throw new Error(`'${name}.angleRadian' is null`);
	if (p.distance === null) throw new Error(`'${name}.distance' is null`);
	if (Number.isNaN(p.angleRadian)) throw new TypeError(`'${name}.angleRadian' is NaN`);
	if (Number.isNaN(p.distance)) throw new Error(`'${name}.distance' is NaN`);
};

//#endregion
//#region ../packages/geometry/src/polar/angles.ts
/**
* Returns a rotated coordinate
* @param c Coordinate
* @param amountRadian Amount to rotate, in radians
* @returns
*/
const rotate$3 = (c, amountRadian) => Object.freeze({
	...c,
	angleRadian: c.angleRadian + amountRadian
});
/**
* Inverts the direction of coordinate. Ie if pointing north, will point south.
* @param p
* @returns
*/
const invert = (p) => {
	guard$2(p, `c`);
	return Object.freeze({
		...p,
		angleRadian: p.angleRadian - Math.PI
	});
};
/**
* Returns true if PolarCoords have same magnitude but opposite direction
* @param a
* @param b
* @returns
*/
const isOpposite = (a, b) => {
	guard$2(a, `a`);
	guard$2(b, `b`);
	if (a.distance !== b.distance) return false;
	return a.angleRadian === -b.angleRadian;
};
/**
* Returns true if Coords have the same direction, regardless of magnitude
* @param a
* @param b
* @returns
*/
const isParallel$1 = (a, b) => {
	guard$2(a, `a`);
	guard$2(b, `b`);
	return a.angleRadian === b.angleRadian;
};
/**
* Returns true if coords are opposite direction, regardless of magnitude
* @param a
* @param b
* @returns
*/
const isAntiParallel = (a, b) => {
	guard$2(a, `a`);
	guard$2(b, `b`);
	return a.angleRadian === -b.angleRadian;
};
/**
* Returns a rotated coordinate
* @param c Coordinate
* @param amountDeg Amount to rotate, in degrees
* @returns
*/
const rotateDegrees = (c, amountDeg) => Object.freeze({
	...c,
	angleRadian: c.angleRadian + degreeToRadian(amountDeg)
});

//#endregion
//#region ../packages/geometry/src/polar/conversions.ts
/**
* Converts a polar coordinate to a Line.
* 
* ```js
* const line = toLine({ angleRadian: Math.Pi, distance: 0.5 }, { x: 0.2, y: 0.1 });
* // Yields { a: { x, y}, b: { x, y } }
* ```
* 
* The 'start' parameter is taken to be the origin of the Polar coordinate.
* @param c 
* @param start 
* @returns 
*/
const toLine$1 = (c, start) => {
	return {
		a: start,
		b: toCartesian$2(c, start)
	};
};
/**
* Converts to Cartesian coordinate from polar.
*
* ```js
*
* const origin = { x: 50, y: 50}; // Polar origin
* // Yields: { x, y }
* const polar = Polar.toCartesian({ distance: 10, angleRadian: 0 }, origin);
* ```
*
* Distance and angle can be provided as numbers intead:
*
* ```
* // Yields: { x, y }
* const polar = Polar.toCartesian(10, 0, origin);
* ```
*
* @param a
* @param b
* @param c
* @returns
*/
const toCartesian$2 = (a, b, c) => {
	if (isPolarCoord(a)) {
		if (typeof b === `undefined`) b = Empty$2;
		if (isPoint(b)) return polarToCartesian(a.distance, a.angleRadian, b);
		throw new Error(`Expecting (Coord, Point). Second parameter is not a point`);
	} else if (typeof a === `object`) throw new TypeError(`First param is an object, but not a Coord: ${JSON.stringify(a)}`);
	else if (typeof a === `number` && typeof b === `number`) {
		if (typeof c === `undefined`) c = Empty$2;
		if (!isPoint(c)) throw new Error(`Expecting (number, number, Point). Point param wrong type`);
		return polarToCartesian(a, b, c);
	} else throw new TypeError(`Expecting parameters of (number, number). Got: (${typeof a}, ${typeof b}, ${typeof c}). a: ${JSON.stringify(a)}`);
};
/**
* Converts a Cartesian coordinate to polar
*
* ```js
*
* // Yields: { angleRadian, distance }
* const polar = Polar.fromCartesian({x: 50, y: 50}, origin);
* ```
*
* Any additional properties of `point` are copied to object.
* 
* Options:
* * fullCircle: If _true_ (default) returns values on 0..2PI range. If _false_, 0....PI..-PI range.
* * digits: Rounding to apply
* @param point Point
* @param origin Origin. If unspecified, {x:0,y:0} is used
* @param options Options
* @returns
*/
const fromCartesian = (point, origin, options = {}) => {
	if (typeof point !== `object`) throw new TypeError(`Param 'point' wrong. Expecting a Point, got: ${typeof point}`);
	const fullCircle = options.fullCircle ?? true;
	if (typeof origin === `object`) point = subtract$3(point, origin);
	let angle = Math.atan2(point.y, point.x);
	if (fullCircle) angle = radiansNormalise(angle);
	let distance = Math.hypot(point.x, point.y);
	if (typeof options.digits === `number`) {
		angle = parseFloat(angle.toFixed(options.digits));
		distance = parseFloat(distance.toFixed(options.digits));
	}
	const polar = {
		...point,
		angleRadian: angle,
		distance
	};
	delete polar.x;
	delete polar.y;
	return Object.freeze(polar);
};
/**
* Converts a polar coordinate to Cartesian
* @param distance Distance
* @param angleRadians Angle in radians
* @param origin Origin, or 0,0 by default.
* @returns
*/
const polarToCartesian = (distance, angleRadians, origin = Empty$2) => {
	guard$5(origin);
	return Object.freeze({
		x: origin.x + distance * Math.cos(angleRadians),
		y: origin.y + distance * Math.sin(angleRadians)
	});
};
/**
* Returns a human-friendly string representation `(distance, angleDeg)`.
* If `precision` is supplied, this will be the number of significant digits.
* @param p
* @returns
*/
const toString$4 = (p, digits) => {
	if (p === void 0) return `(undefined)`;
	if (p === null) return `(null)`;
	const angleDeg = radianToDegree(p.angleRadian);
	return `(${digits ? p.distance.toFixed(digits) : p.distance},${digits ? angleDeg.toFixed(digits) : angleDeg})`;
};
const toPoint = (v, origin = Empty$2) => {
	guard$2(v, `v`);
	return Object.freeze({
		x: origin.x + v.distance * Math.cos(v.angleRadian),
		y: origin.y + v.distance * Math.sin(v.angleRadian)
	});
};
/**
* Converts a line to a PolarLine
* 
* A/B points of the line can optionally be reordered based on angle or distance.
* @param lineOrLines 
* @param origin 
* @param orderBy Whether a/b points are reordered based on `angle` or `distance`. Default: `none`
* @returns 
*/
function toPolarLine(lineOrLines, origin, opts = {}) {
	const lines = Array.isArray(lineOrLines) ? lineOrLines : [lineOrLines];
	if (lines.length === 0) return [];
	const orderBy = opts.orderBy ?? `none`;
	const pl = lines.map((line) => {
		let a = fromCartesian(line.a, origin, opts);
		let b = fromCartesian(line.b, origin, opts);
		const ranges = radianRange(a.angleRadian, b.angleRadian);
		if (orderBy === `angle-min` && ranges.min.start !== a.angleRadian) [a, b] = [b, a];
		else if (orderBy === `angle-max` && ranges.max.start < a.angleRadian) [a, b] = [b, a];
		else if (orderBy === `distance` && b.distance < a.distance) [a, b] = [b, a];
		return Object.freeze({
			a,
			b,
			origin
		});
	});
	if (Array.isArray(lineOrLines)) return pl;
	return pl[0];
}
/**
* Returns a string representation of a PolarLine
* @param line 
* @param digits 
* @returns 
*/
function polarLineToString(line, digits = 2) {
	return `angle: ${line.a.angleRadian.toFixed(digits)}-${line.b.angleRadian.toFixed(digits)} dist: ${line.a.distance.toFixed(digits)}-${line.b.distance.toFixed(digits)}`;
}
function lineToCartesian(lineOrLines, origin) {
	const lines = Array.isArray(lineOrLines) ? lineOrLines : [lineOrLines];
	if (lines.length === 0) return [];
	const cart = lines.map((line) => Object.freeze({
		a: toCartesian$2(line.a, origin),
		b: toCartesian$2(line.b, origin)
	}));
	if (Array.isArray(lineOrLines)) return cart;
	return cart[0];
}

//#endregion
//#region ../packages/geometry/src/polar/math.ts
const normalise$1 = (c) => {
	if (c.distance === 0) throw new Error(`Cannot normalise vector of length 0`);
	return Object.freeze({
		...c,
		distance: 1
	});
};
/**
* Clamps the magnitude of a vector
* @param v
* @param max
* @param min
* @returns
*/
const clampMagnitude$1 = (v, max = 1, min = 0) => {
	let mag = v.distance;
	if (mag > max) mag = max;
	if (mag < min) mag = min;
	return Object.freeze({
		...v,
		distance: mag
	});
};
/**
* Calculate dot product of two PolarCoords.
*
* Eg, power is the dot product of force and velocity
*
* Dot products are also useful for comparing similarity of
*  angle between two unit PolarCoords.
* @param a
* @param b
* @returns
*/
const dotProduct$1 = (a, b) => {
	guard$2(a, `a`);
	guard$2(b, `b`);
	return a.distance * b.distance * Math.cos(b.angleRadian - a.angleRadian);
};
/**
* Multiplies the magnitude of a coord by `amt`.
* Direction is unchanged.
* @param v
* @param amt
* @returns
*/
const multiply$2 = (v, amt) => {
	guard$2(v);
	resultThrow(numberTest(amt, ``, `amt`));
	return Object.freeze({
		...v,
		distance: v.distance * amt
	});
};
/**
* Divides the magnitude of a coord by `amt`.
* Direction is unchanged.
* @param v
* @param amt
* @returns
*/
const divide$2 = (v, amt) => {
	guard$2(v);
	resultThrow(numberTest(amt, ``, `amt`));
	return Object.freeze({
		...v,
		distance: v.distance / amt
	});
};
/**
* Returns _true_ if `check` is between `start` and `end` angles.
* @param start 
* @param end 
* @param check 
* @returns 
*/
const between = (check, start, end) => {
	return radiansBetweenCircular(check.angleRadian, start.angleRadian, end.angleRadian);
};

//#endregion
//#region ../packages/geometry/src/polar/ray.ts
var ray_exports = /* @__PURE__ */ __exportAll({
	fromLine: () => fromLine,
	isParallel: () => isParallel,
	toCartesian: () => toCartesian$1,
	toString: () => toString$3
});
/**
* Converts a ray (or array of rays) to a Line in cartesian coordinates.
* 
* By default, the ray's origin is taken to be 0,0.
* Passing in an origin will override this default, or whatever
* the ray's origin property is.
* @param ray Ray
* @param origin Override or provide origin point
* @returns 
*/
function toCartesian$1(rayOrRays, origin) {
	const rays = Array.isArray(rayOrRays) ? rayOrRays : [rayOrRays];
	if (rays.length === 0) return [];
	const lines = rays.map((ray) => {
		const o = getOrigin(ray, origin);
		return {
			a: toCartesian$2(ray.offset ?? 0, ray.angleRadian, o),
			b: toCartesian$2((ray.offset ?? 0) + ray.length, ray.angleRadian, o)
		};
	});
	if (Array.isArray(rayOrRays)) return lines;
	return lines[0];
}
const isParallel = (a, b) => a.angleRadian === b.angleRadian;
const getOrigin = (ray, origin) => {
	if (origin !== void 0) return origin;
	if (ray.origin !== void 0) return ray.origin;
	return {
		x: 0,
		y: 0
	};
};
/**
* Returns a string representation of the ray, useful for debugging.
* 
* ```js
* "PolarRay(angle: ... offset: ... len: ... origin: ...)"
* ```
* @param ray 
* @returns 
*/
const toString$3 = (ray) => {
	let basic = `PolarRay(angle: ${ray.angleRadian} offset: ${ray.offset} len: ${ray.length}`;
	if (ray.origin) basic += ` origin: ${toString$5(ray.origin)}`;
	basic += `)`;
	return basic;
};
/**
* Returns a PolarRay based on a line(s) and origin.
* 
* If `origin` is omitted, the origin is taken to be the 'a' point of the line.
* Otherwise, the origin value is used to determine the 'offset' of the ray.
* 
* @param lineOrLines Single line or array of lines 
* @param origin 
* @returns 
*/
function fromLine(lineOrLines, origin) {
	const lines = Array.isArray(lineOrLines) ? lineOrLines : [lineOrLines];
	if (lines.length === 0) return [];
	const rays = lines.map((line) => {
		if (origin) return {
			angleRadian: angleRadian$1(line.a, origin),
			offset: distance$2(line.a, origin),
			length: distance$2(line.b, line.a),
			origin
		};
		else return {
			angleRadian: angleRadian$1(line.a, line.b),
			length: distance$2(line.b, line.a),
			origin: line.a
		};
	});
	if (Array.isArray(lineOrLines)) return rays;
	return rays[0];
}

//#endregion
//#region ../packages/geometry/src/polar/spiral.ts
function* spiral(smoothness, zoom) {
	let step = 0;
	while (true) {
		const a = smoothness * step++;
		yield {
			distance: zoom * a,
			angleRadian: a,
			step
		};
	}
}
/**
* Produces an Archimedian spiral with manual stepping.
* @param step Step number. Typically 0, 1, 2 ...
* @param smoothness 0.1 pretty rounded, at around 5 it starts breaking down
* @param zoom At smoothness 0.1, zoom starting at 1 is OK
* @returns
*/
const spiralRaw = (step, smoothness, zoom) => {
	const a = smoothness * step;
	return Object.freeze({
		distance: zoom * a,
		angleRadian: a
	});
};

//#endregion
//#region ../packages/geometry/src/polar/intersects.ts
/**
* Returns a generator function that checks for intersections with a static set of lines.
* The generator yields values of `{ distance: number, line: PolarLine }`. Lines which have no
* intersecton are not returned.
* 
* ```js
* const c = intersectionDistanceCompute(line1, line2, line3);
* 
* // Get all results for angle 0.2 as an array
* const computed = [...c.compute(0.2)]
* 
* // Sort array by distance (ascending)
* computed.sort((a, b) => a.distance - b.distance);
* ```
* @param lines 
* @returns 
*/
const intersectionDistanceCompute = (...lines) => {
	const precompute = (line) => {
		const angleMin = Math.min(line.a.angleRadian, line.b.angleRadian);
		const angleMax = Math.max(line.a.angleRadian, line.b.angleRadian);
		return {
			...line,
			sinBA: Math.sin(line.b.angleRadian - line.a.angleRadian),
			angleMin,
			angleMax,
			wraps: Math.abs(line.b.angleRadian - line.a.angleRadian) > Math.PI
		};
	};
	const cache = lines.map((line) => precompute(line));
	const visibilityPolygon = (feather = 1e-6) => {
		const angles = [];
		lines.forEach((line) => {
			angles.push(line.a.angleRadian, line.b.angleRadian, line.a.angleRadian - feather, line.a.angleRadian + feather, line.b.angleRadian - feather, line.b.angleRadian + feather);
		});
		angles.sort((a, b) => a - b);
		const polygon = [];
		for (const angleCalc of angles) {
			let minDistribution = Infinity;
			for (const seg of cache) {
				const d = distance(angleCalc, seg);
				if (d < minDistribution) minDistribution = d;
			}
			if (minDistribution < Infinity) polygon.push({
				angleRadian: angleCalc,
				distance: minDistribution
			});
		}
		return polygon;
	};
	const distance = (angle, seg) => {
		if (!(seg.wraps ? angle >= seg.angleMax || angle <= seg.angleMin : angle >= seg.angleMin && angle <= seg.angleMax)) return NaN;
		const sin2θ = Math.sin(seg.b.angleRadian - angle);
		const sinθ1 = Math.sin(angle - seg.a.angleRadian);
		const denom = seg.b.distance * sin2θ + seg.a.distance * sinθ1;
		if (denom <= 0) return NaN;
		return seg.a.distance * seg.b.distance * seg.sinBA / denom;
	};
	function* compute(angleRadian) {
		for (let index = 0; index < cache.length; index++) {
			const d = distance(angleRadian, cache[index]);
			if (Number.isNaN(d)) continue;
			yield {
				distance: d,
				line: lines[index]
			};
		}
	}
	return {
		compute,
		visibilityPolygon
	};
};
/**
* Returns the distance at which a line from `angleRadian` hits `line`. Returns `Infinity`
* if there's no intersection.
* 
* Calculations assume that all angles etc are in relation to a common origin point.
* If repeatedly comparing against the same line (or set of lines), use {@link intersectionDistanceCompute} for
* improved performance.
* 
* @param angleRadian 
* @param line 
* @returns 
*/
const intersectionDistance = (angleRadian, line) => {
	const ray = radiansNormalise(angleRadian);
	const a = radiansNormalise(line.a.angleRadian);
	const b = radiansNormalise(line.b.angleRadian);
	if (!radiansBetweenCircular(ray, a, b)) return Infinity;
	const ad = line.a.distance;
	const ab = line.b.distance;
	const sineBA = Math.sin(b - a);
	const sineBRay = Math.sin(b - ray);
	const sineRayA = Math.sin(ray - a);
	const denominator = ab * sineBRay + ad * sineRayA;
	if (Math.abs(denominator) < 1e-10) return Infinity;
	const r = ad * ab * sineBA / denominator;
	if (r < 0) return Infinity;
	return r;
};

//#endregion
//#region ../packages/geometry/src/polar/index.ts
var polar_exports = /* @__PURE__ */ __exportAll({
	Ray: () => ray_exports,
	between: () => between,
	clampMagnitude: () => clampMagnitude$1,
	divide: () => divide$2,
	dotProduct: () => dotProduct$1,
	fromCartesian: () => fromCartesian,
	guard: () => guard$2,
	intersectionDistance: () => intersectionDistance,
	intersectionDistanceCompute: () => intersectionDistanceCompute,
	invert: () => invert,
	isAntiParallel: () => isAntiParallel,
	isOpposite: () => isOpposite,
	isParallel: () => isParallel$1,
	isPolarCoord: () => isPolarCoord,
	lineToCartesian: () => lineToCartesian,
	multiply: () => multiply$2,
	normalise: () => normalise$1,
	polarLineToString: () => polarLineToString,
	rotate: () => rotate$3,
	rotateDegrees: () => rotateDegrees,
	spiral: () => spiral,
	spiralRaw: () => spiralRaw,
	toCartesian: () => toCartesian$2,
	toLine: () => toLine$1,
	toPoint: () => toPoint,
	toPolarLine: () => toPolarLine,
	toString: () => toString$4
});

//#endregion
//#region ../packages/geometry/src/vector.ts
var vector_exports = /* @__PURE__ */ __exportAll({
	clampMagnitude: () => clampMagnitude,
	divide: () => divide$1,
	dotProduct: () => dotProduct,
	fromAngle: () => fromAngle,
	fromLineCartesian: () => fromLineCartesian,
	fromLinePolar: () => fromLinePolar,
	fromPointPolar: () => fromPointPolar,
	fromRadians: () => fromRadians,
	multiply: () => multiply$1,
	normalise: () => normalise,
	quadrantOffsetAngle: () => quadrantOffsetAngle,
	subtract: () => subtract$1,
	sum: () => sum$1,
	toCartesian: () => toCartesian,
	toPolar: () => toPolar,
	toRadians: () => toRadians,
	toString: () => toString$2
});
const EmptyCartesian = Object.freeze({
	x: 0,
	y: 0
});
const piPi$4 = Math.PI * 2;
const pi$3 = Math.PI;
/**
* Returns a Cartesian-coordinate vector from an angle in radians.
* To create a vector from an angle in arbitrary units, use {@link fromAngle}.
* ```js
* fromRadians(Math.PI); // { x: -1, y: 0 }
* ```
* @param radians
* @returns Point in Cartesian coordinates
*/
function fromRadians(radians) {
	return Object.freeze({
		x: Math.cos(radians),
		y: Math.sin(radians)
	});
}
/**
* Returns a vector from an angle. If a number is given, it's assumed to be degrees
* ```js
* fromAngle(90); // { x: 0, y: 1 }
* fromAngle({ value: 90, unit: `deg` }); // { x: 0, y: 1 }
* ```
* @param angle
* @returns Vector in Cartesian coordinates
*/
function fromAngle(angle) {
	return fromRadians(toRadian(angle));
}
function toRadians(point) {
	return Math.atan2(point.y, point.x);
}
/**
* Create a vector from a point
*
* If `unipolar` normalisation is used, direction will be fixed to 0..2π
* if `bipolar` normalisation is used, direction will be fixed to -π...π
* @param pt Point
* @param angleNormalisation Technique to normalise angle
* @param origin Origin to calculate vector from or 0,0 if left empty
* @returns Polar coordinate
*/
function fromPointPolar(pt, angleNormalisation = ``, origin = EmptyCartesian) {
	pt = subtract$3(pt, origin);
	let direction = Math.atan2(pt.y, pt.x);
	if (angleNormalisation === `unipolar` && direction < 0) direction += piPi$4;
	else if (angleNormalisation === `bipolar`) {
		if (direction > pi$3) direction -= piPi$4;
		else if (direction <= -pi$3) direction += piPi$4;
	}
	return Object.freeze({
		distance: distance$2(pt),
		angleRadian: direction
	});
}
/**
* Returns a Cartesian-coordinate vector from a line a -> b
* @param line
* @returns Point in Cartesian coordinates
*/
function fromLineCartesian(line) {
	return subtract$3(line.b, line.a);
}
/**
* Returns a polar-coordinate vector from a line a -> b
* @param line
* @returns Polar coordinate
*/
function fromLinePolar(line) {
	resultThrow(lineTest(line, `line`));
	return fromPointPolar(subtract$3(line.b, line.a));
}
function isPolar(v) {
	if (isPolarCoord(v)) return true;
	return false;
}
function isCartesian(v) {
	if (isPoint(v)) return true;
	return false;
}
/**
* Returns the normalised vector (aka unit vector). This is where
* direction is kept, but magnitude set to 1. This then just
* suggests direction.
* @param v
* @returns Vector with magnitude of 1
*/
function normalise(v) {
	if (isPolar(v)) return normalise$1(v);
	else if (isCartesian(v)) return normalise$2(v);
	throw new Error(`Expected polar/cartesian vector. Got: ${v}`);
}
function quadrantOffsetAngle(p) {
	if (p.x >= 0 && p.y >= 0) return 0;
	if (p.x < 0 && p.y >= 0) return pi$3;
	if (p.x < 0 && p.y < 0) return pi$3;
	return piPi$4;
}
/**
* Converts a vector to a polar coordinate. If the provided
* value is already Polar, it is returned.
* @param v
* @param origin
* @returns Polar vector
*/
function toPolar(v, origin = Empty$2) {
	if (isPolar(v)) return v;
	else if (isCartesian(v)) return fromCartesian(v, origin);
	throw new Error(`Expected polar/cartesian vector. Got: ${v}`);
}
/**
* Converts a Vector to a Cartesian coordinate. If the provided
* value is already Cartesian, it is returned.
* @param v
* @returns Cartestian vector
*/
function toCartesian(v) {
	if (isPolar(v)) return toPoint(v);
	else if (isCartesian(v)) return v;
	throw new Error(`Expected polar/cartesian vector. Got: ${v}`);
}
/**
* Return a human-friendly representation of vector
* @param v
* @param digits
* @returns string
*/
function toString$2(v, digits) {
	if (isPolar(v)) return toString$4(v, digits);
	else if (isCartesian(v)) return toString$5(v, digits);
	throw new Error(`Expected polar/cartesian vector. Got: ${v}`);
}
/**
* Calculate dot product of a vector
* @param a
* @param b
* @returns Dot product of two vectors
*/
function dotProduct(a, b) {
	if (isPolar(a) && isPolar(b)) return dotProduct$1(a, b);
	else if (isCartesian(a) && isCartesian(b)) return dotProduct$2(a, b);
	throw new Error(`Expected two polar/Cartesian vectors.`);
}
/**
* Clamps the magnitude of a vector
* @param v Vector to clamp
* @param max Maximum magnitude
* @param min Minium magnitude
* @returns Point
*/
function clampMagnitude(v, max = 1, min = 0) {
	if (isPolar(v)) return clampMagnitude$1(v, max, min);
	else if (isCartesian(v)) return clampMagnitude$2(v, max, min);
	throw new Error(`Expected either polar or Cartesian vector`);
}
/**
* Returns `a + b`.
*
* Vector is returned in the same type as `a`.
* @param a
* @param b
* @returns Vector in the same type as `a`
*/
function sum$1(a, b) {
	const polar = isPolar(a);
	a = toCartesian(a);
	b = toCartesian(b);
	const c = sum$3(a, b);
	return polar ? toPolar(c) : c;
}
/**
* Returns `a - b`.
*
* Vector is returned in the same type as `a`
* @param a
* @param b
*/
function subtract$1(a, b) {
	const polar = isPolar(a);
	a = toCartesian(a);
	b = toCartesian(b);
	const c = subtract$3(a, b);
	return polar ? toPolar(c) : c;
}
/**
* Returns `a * b`.
*
* Vector is returned in the same type `a`.
* @param a
* @param b
*/
function multiply$1(a, b) {
	const polar = isPolar(a);
	a = toCartesian(a);
	b = toCartesian(b);
	const c = multiply$3(a, b);
	return polar ? toPolar(c) : c;
}
/**
* Returns `a / b`.
*
* Vector is returned in the same type `a`.
* @param a
* @param b
*/
function divide$1(a, b) {
	const polar = isPolar(a);
	a = toCartesian(a);
	b = toCartesian(b);
	const c = divide$3(a, b);
	return polar ? toPolar(c) : c;
}

//#endregion
//#region ../packages/geometry/src/line/nearest.ts
/**
* Returns the nearest point on line(s) closest to `point`.
* 
* ```js
* const pt = Lines.nearest(line, {x:10,y:10});
* ```
* 
* If an array of lines is provided, it will be the closest point amongst all the lines
* @param lineOrLines Line or array of lines
* @param point Point to check
* @returns Point `{ x, y }`
*/
const nearest$1 = (lineOrLines, point) => {
	const nearestImpl = (line) => {
		const { a, b } = line;
		const atob = {
			x: b.x - a.x,
			y: b.y - a.y
		};
		const atop = {
			x: point.x - a.x,
			y: point.y - a.y
		};
		const length = atob.x * atob.x + atob.y * atob.y;
		let dot = atop.x * atob.x + atop.y * atob.y;
		const t = Math.min(1, Math.max(0, dot / length));
		dot = (b.x - a.x) * (point.y - a.y) - (b.y - a.y) * (point.x - a.x);
		return {
			x: a.x + atob.x * t,
			y: a.y + atob.y * t
		};
	};
	if (Array.isArray(lineOrLines)) {
		const pts = lineOrLines.map((line) => nearestImpl(line));
		const dists = pts.map((p) => distance$2(p, point));
		return Object.freeze(pts[minIndex(dists)]);
	} else return Object.freeze(nearestImpl(lineOrLines));
};

//#endregion
//#region ../packages/geometry/src/line/distance-single-line.ts
/**
* Returns the distance of `point` to the nearest point on `line`
*
* ```js
* const distance = Lines.distanceSingleLine(line, pt);
* ```
* @param line Line
* @param point Target point
* @returns
*/
function distanceSingleLine(line, point) {
	resultThrow(lineTest(line, `line`), pointTest(point, `point`));
	if (length$3(line) === 0) return length$3(line.a, point);
	return length$3(nearest$1(line, point), point);
}

//#endregion
//#region ../packages/geometry/src/line/angles.ts
const directionVector = (line) => ({
	x: line.b.x - line.a.x,
	y: line.b.y - line.a.y
});
const directionVectorNormalised = (line) => {
	const l = length$3(line);
	const v = directionVector(line);
	return {
		x: v.x / l,
		y: v.y / l
	};
};
/**
* Returns a parallel line to `line` at `distance`.
* 
* ```js
* const l = Lines.parallel(line, 10);
* ```
* @param line
* @param distance 
*/
const parallel = (line, distance) => {
	const dv = directionVector(line);
	const dvn = directionVectorNormalised(line);
	const a = {
		x: line.a.x - dvn.y * distance,
		y: line.a.y + dvn.x * distance
	};
	return {
		a,
		b: {
			x: a.x + dv.x,
			y: a.y + dv.y
		}
	};
};
/**
* Returns a point perpendicular to `line` at a specified `distance`. Use negative
* distances for the other side of line.
* ```
* // Project a point 100 units away from line, at its midpoint.
* const pt = Lines.perpendicularPoint(line, 100, 0.5);
* ```
* @param line Line
* @param distance Distance from line. Use negatives to flip side
* @param amount Relative place on line to project point from. 0 projects from A, 0.5 from the middle, 1 from B.
*/
const perpendicularPoint = (line, distance, amount = 0) => {
	const origin = interpolate$4(amount, line);
	const dvn = directionVectorNormalised(line);
	return {
		x: origin.x - dvn.y * distance,
		y: origin.y + dvn.x * distance
	};
};

//#endregion
//#region ../packages/geometry/src/line/bbox.ts
/**
* Returns a rectangle that encompasses dimension of line
* 
* ```js
* const rect = Lines.bbox(line);
* ```
*/
const bbox$4 = (line) => bbox$5(line.a, line.b);

//#endregion
//#region ../packages/geometry/src/line/divide.ts
/**
* Divides both start and end points by given x,y
* ```js
* // Line 1,1 -> 10,10
* const l = Lines.fromNumbers(1,1,10,10);
* const ll = Lines.divide(l, {x:2, y:4});
* // Yields: 0.5,0.25 -> 5,2.5
* ```
* 
* Dividing by zero will give Infinity for that dimension.
* @param line 
* @param point 
* @returns 
*/
const divide = (line, point) => Object.freeze({
	...line,
	a: divide$3(line.a, point),
	b: divide$3(line.b, point)
});

//#endregion
//#region ../packages/geometry/src/line/from-numbers.ts
/**
* Returns a line from a basis of coordinates (x1, y1, x2, y2)
* 
* ```js
* // Line from 0,1 -> 10,15
* Lines.fromNumbers(0, 1, 10, 15);
* ```
* @param x1 
* @param y1 
* @param x2 
* @param y2 
* @returns 
*/
const fromNumbers = (x1, y1, x2, y2) => {
	if (Number.isNaN(x1)) throw new Error(`x1 is NaN`);
	if (Number.isNaN(x2)) throw new Error(`x2 is NaN`);
	if (Number.isNaN(y1)) throw new Error(`y1 is NaN`);
	if (Number.isNaN(y2)) throw new Error(`y2 is NaN`);
	return fromPoints$2({
		x: x1,
		y: y1
	}, {
		x: x2,
		y: y2
	});
};

//#endregion
//#region ../packages/geometry/src/line/from-flat-array.ts
/**
* Returns a line from four numbers [x1,y1,x2,y2].
* 
* See {@link toFlatArray} to create an array from a line.
* 
* ```js
* const line = Lines.fromFlatArray(...[0, 0, 100, 100]);
* // line is {a: { x:0, y:0 }, b: { x: 100, y: 100 } }
* ```
* @param array Array in the form [x1,y1,x2,y2]
* @returns Line
*/
const fromFlatArray$1 = (array) => {
	if (!Array.isArray(array)) throw new Error(`arr parameter is not an array`);
	if (array.length !== 4) throw new Error(`array is expected to have length four`);
	return fromNumbers(array[0], array[1], array[2], array[3]);
};

//#endregion
//#region ../packages/geometry/src/line/from-pivot.ts
/**
* Creates a line from an origin point.
* ```js
* // Line of length 0.2 with middle at 0.5,0.5
* fromPivot({ x:0.5, y:0.5 }, 0.2);
* // Same line, but on an angle
* fromPivot({ x:0.5, y:0.5 }, 0.2, degreesToRadian(45));
* 
* // ...now with pivot point at 20%, rather than center
* fromPivot({ x:0.5, y:0.5 }, 0.2, degreesToRadian(45), 0.2);
* ```
* 
* Examples:
* * Angle of 0 (deg/rad) results in a horizontal line,
* * Angle of 90deg in a vertical line. 
* * Angle of 45deg will be angled downwards.
* 
* @param origin Origin to pivot around
* @param length Total length of line
* @param angleRadian Angle of line, in radians
* @param balance Percentage of where origin ought to be on line. Default: 0.5, meaning the middle of line
*/
const fromPivot = (origin = {
	x: .5,
	y: .5
}, length = 1, angleRadian = 0, balance = .5) => {
	const left = length * balance;
	const right = length * (1 - balance);
	const a = toCartesian$2(left, radianInvert(angleRadian), origin);
	const b = toCartesian$2(right, angleRadian, origin);
	return Object.freeze({
		a,
		b
	});
};

//#endregion
//#region ../packages/geometry/src/line/midpoint.ts
/**
* Returns the mid-point of a line (same as `interpolate` with an amount of 0.5)
* 
* ```js
* Lines.midpoint(line); // Returns {x, y}
* ```
* @param aOrLine 
* @param pointB 
* @returns 
*/
const midpoint = (aOrLine, pointB) => {
	const [a, b] = getPointParameter(aOrLine, pointB);
	return interpolate$4(.5, a, b);
};

//#endregion
//#region ../packages/geometry/src/line/relative-position.ts
/**
* Returns the relative position of `pt` along `line`.
* Warning: assumes `pt` is actually on `line`. Results may be bogus if not.
* @param line 
* @param pt 
*/
const relativePosition$1 = (line, pt) => {
	return distance$2(line.a, pt) / length$3(line);
};

//#endregion
//#region ../packages/geometry/src/line/sum.ts
/**
* Adds both start and end points by given x,y
* ```js
* 
* // Line 1,1 -> 10,10
* const l = Lines.fromNumbers(1,1,10,10);
* const ll = Lines.sum(l, {x:2, y:4});
* // Yields: 3,5 -> 12,14
* ```
* @param line 
* @param point 
* @returns 
*/
const sum = (line, point) => Object.freeze({
	...line,
	a: sum$3(line.a, point),
	b: sum$3(line.b, point)
});

//#endregion
//#region ../packages/geometry/src/line/rotate.ts
/**
* Returns a line that is rotated by `angleRad`. By default it rotates
* around its center, but an arbitrary `origin` point can be provided.
* If `origin` is a number, it's presumed to be a 0..1 percentage of the line.
* 
* ```js
* // Rotates line by 0.1 radians around point 10,10
* const r = Lines.rotate(line, 0.1, {x:10,y:10});
* 
* // Rotate line by 5 degrees around its center
* const r = Lines.rotate(line, degreeToRadian(5));
* 
* // Rotate line by 5 degres around its end point
* const r = Lines.rotate(line, degreeToRadian(5), line.b);
* 
* // Rotate by 90 degrees at the 80% position
* const r = Lines.rotated = rotate(line, Math.PI / 2, 0.8);
* ```
* @param line Line to rotate
* @param amountRadian Angle in radians to rotate by
* @param origin Point to rotate around. If undefined, middle of line will be used
* @returns 
*/
const rotate$2 = (line, amountRadian, origin) => {
	if (typeof amountRadian === `undefined` || amountRadian === 0) return line;
	if (typeof origin === `undefined`) origin = .5;
	if (typeof origin === `number`) origin = interpolate$4(origin, line.a, line.b);
	return Object.freeze({
		...line,
		a: rotate$1(line.a, amountRadian, origin),
		b: rotate$1(line.b, amountRadian, origin)
	});
};

//#endregion
//#region ../packages/geometry/src/line/is-equal.ts
/**
* Returns true if the lines have the same value. Note that only
* the line start and end points are compared. So the lines might
* be different in other properties, and `isEqual` will still return
* true.
* 
* ```js
* const a = { a: {x:0,  y: 10 }, b: { x: 20, y: 20 }};
* const b = { a: {x:0,  y: 10 }, b: { x: 20, y: 20 }};
* a === b; // false, because they are different objects
* Lines.isEqual(a, b); // true, because they have the same value
* ```
* @param {Line} a
* @param {Line} b
* @returns {boolean}
*/
const isEqual$3 = (a, b) => isEqual$5(a.a, b.a) && isEqual$5(a.b, b.b);

//#endregion
//#region ../packages/geometry/src/line/multiply.ts
/**
* Multiplies start and end of line by point.x, point.y.
* 
* ```js
* 
* // Line 1,1 -> 10,10
* const l = Lines.fromNumbers(1, 1, 10, 10);
* const ll = Lines.multiply(l, {x:2, y:3});
* // Yields: 2,20 -> 3,30
* ```
* @param line 
* @param point 
* @returns 
*/
const multiply = (line, point) => Object.freeze({
	...line,
	a: multiply$3(line.a, point),
	b: multiply$3(line.b, point)
});

//#endregion
//#region ../packages/geometry/src/line/subtract.ts
/**
* Subtracts both start and end points by given x,y
* ```js
* // Line 1,1 -> 10,10
* const l = Lines.fromNumbers(1,1,10,10);
* const ll = Lines.subtract(l, {x:2, y:4});
* // Yields: -1,-3 -> 8,6
* ```
* @param line 
* @param point 
* @returns 
*/
const subtract = (line, point) => Object.freeze({
	...line,
	a: subtract$3(line.a, point),
	b: subtract$3(line.b, point)
});

//#endregion
//#region ../packages/geometry/src/line/to-string.ts
/**
* Returns a string representation of a line or two points.
* @param a
* @param b
* @returns String representation of a line or two points
*/
function toString$1(a, b) {
	if (isLine(a)) {
		resultThrow(lineTest(a, `line`));
		b = a.b;
		a = a.a;
	} else if (b === void 0) throw new Error(`Expect second point if first is a point`);
	return `${toString$5(a)}-${toString$5(b)}`;
}

//#endregion
//#region ../packages/geometry/src/line/to-path.ts
/**
* Returns a path wrapper around a line instance. This is useful if there are a series
* of operations you want to do with the same line because you don't have to pass it
* in as an argument to each function.
* 
* Note that the line is immutable, so a function like `sum` returns a new LinePath,
* wrapping the result of `sum`.
* 
* ```js
* // Create a path
* const l = Lines.toPath(fromNumbers(0,0,10,10));
* 
* // Now we can use it...
* l.length();
* 
* // Mutate functions return a new path
* const ll = l.sum({x:10,y:10});
* ll.length();
* ```
* @param line 
* @returns 
*/
const toPath$3 = (line) => {
	const { a, b } = line;
	return Object.freeze({
		...line,
		length: () => length$3(a, b),
		interpolate: (amount) => interpolate$4(amount, a, b),
		relativePosition: (point) => relativePosition$1(line, point),
		bbox: () => bbox$4(line),
		toString: () => toString$1(a, b),
		toFlatArray: () => toFlatArray$1(a, b),
		toSvgString: () => toSvgString$1(a, b),
		toPoints: () => [a, b],
		rotate: (amountRadian, origin) => toPath$3(rotate$2(line, amountRadian, origin)),
		nearest: (point) => nearest$1(line, point),
		sum: (point) => toPath$3(sum(line, point)),
		divide: (point) => toPath$3(divide(line, point)),
		multiply: (point) => toPath$3(multiply(line, point)),
		subtract: (point) => toPath$3(subtract(line, point)),
		midpoint: () => midpoint(a, b),
		distanceToPoint: (point) => distanceSingleLine(line, point),
		parallel: (distance) => parallel(line, distance),
		perpendicularPoint: (distance, amount) => perpendicularPoint(line, distance, amount),
		slope: () => slope(line),
		withinRange: (point, maxRange) => withinRange$1(line, point, maxRange),
		isEqual: (otherLine) => isEqual$3(line, otherLine),
		apply: (fn) => toPath$3(apply$1(line, fn)),
		kind: `line`
	});
};

//#endregion
//#region ../packages/geometry/src/line/from-points-to-path.ts
/**
* Returns a {@link LinePath} from two points
* 
* ```js
* const path = Lines.fromPointsToPath(ptA, ptB);
* ```
* @param a 
* @param b 
* @returns 
*/
const fromPointsToPath = (a, b) => toPath$3(fromPoints$2(a, b));

//#endregion
//#region ../packages/geometry/src/line/index.ts
var line_exports = /* @__PURE__ */ __exportAll({
	Empty: () => Empty$1,
	Placeholder: () => Placeholder$2,
	angleRadian: () => angleRadian,
	apply: () => apply$1,
	asPoints: () => asPoints,
	bbox: () => bbox$4,
	distance: () => distance$1,
	distanceSingleLine: () => distanceSingleLine,
	divide: () => divide,
	extendFromA: () => extendFromA,
	fromFlatArray: () => fromFlatArray$1,
	fromNumbers: () => fromNumbers,
	fromPivot: () => fromPivot,
	fromPoints: () => fromPoints$2,
	fromPointsToPath: () => fromPointsToPath,
	getPointParameter: () => getPointParameter,
	interpolate: () => interpolate$4,
	interpolator: () => interpolator$2,
	isEmpty: () => isEmpty$1,
	isEqual: () => isEqual$3,
	isLine: () => isLine,
	isPlaceholder: () => isPlaceholder$1,
	isPolyLine: () => isPolyLine,
	joinPointsToLines: () => joinPointsToLines,
	length: () => length$3,
	lineTest: () => lineTest,
	midpoint: () => midpoint,
	multiply: () => multiply,
	nearest: () => nearest$1,
	normaliseByRect: () => normaliseByRect,
	parallel: () => parallel,
	perpendicularPoint: () => perpendicularPoint,
	pointAtDistance: () => pointAtDistance,
	pointAtX: () => pointAtX,
	pointsOf: () => pointsOf,
	polyLineToPoints: () => polyLineToPoints,
	relativePosition: () => relativePosition$1,
	reverse: () => reverse,
	rotate: () => rotate$2,
	scaleFromMidpoint: () => scaleFromMidpoint,
	slope: () => slope,
	subtract: () => subtract,
	sum: () => sum,
	toFlatArray: () => toFlatArray$1,
	toPath: () => toPath$3,
	toString: () => toString$1,
	toSvgString: () => toSvgString$1,
	withinRange: () => withinRange$1
});
const Empty$1 = Object.freeze({
	a: Object.freeze({
		x: 0,
		y: 0
	}),
	b: Object.freeze({
		x: 0,
		y: 0
	})
});
const Placeholder$2 = Object.freeze({
	a: Object.freeze({
		x: NaN,
		y: NaN
	}),
	b: Object.freeze({
		x: NaN,
		y: NaN
	})
});
/**
* Returns true if `l` is the same as Line.Empty, that is
* the `a` and `b` points are Points.Empty.
* @param l 
* @returns 
*/
const isEmpty$1 = (l) => isEmpty$3(l.a) && isEmpty$3(l.b);
const isPlaceholder$1 = (l) => isPlaceholder$3(l.a) && isPlaceholder$3(l.b);
/**
* Applies `fn` to both start and end points.
* 
* ```js
* // Line 10,10 -> 20,20
* const line = Lines.fromNumbers(10,10, 20,20);
* 
* // Applies randomisation to both x and y.
* const rand = (p) => ({
*  x: p.x * Math.random(),
*  y: p.y * Math.random()
* });
* 
* // Applies our randomisation function
* const line2 = apply(line, rand);
* ```
* @param line Line
* @param fn Function that takes a point and returns a point
* @returns 
*/
const apply$1 = (line, fn) => Object.freeze({
	...line,
	a: fn(line.a),
	b: fn(line.b)
});
/**
* Returns the angle in radians of a line, or two points
* ```js
* Lines.angleRadian(line);
* Lines.angleRadian(ptA, ptB);
* ```
* @param lineOrPoint 
* @param b 
* @returns 
*/
const angleRadian = (lineOrPoint, b) => {
	let a;
	if (isLine(lineOrPoint)) {
		a = lineOrPoint.a;
		b = lineOrPoint.b;
	} else {
		a = lineOrPoint;
		if (b === void 0) throw new Error(`b point must be provided`);
	}
	return Math.atan2(b.y - a.y, b.x - a.x);
};
/**
* Normalises start and end points by given width and height. Useful
* for converting an absolutely-defined line to a relative one.
* 
* ```js
* 
* // Line 1,1 -> 10,10
* const l = Lines.fromNumbers(1,1,10,10);
* const ll = Lines.normaliseByRect(l, 10, 10);
* // Yields: 0.1,0.1 -> 1,1
* ```
* @param line 
* @param width
* @param height 
* @returns 
*/
const normaliseByRect = (line, width, height) => Object.freeze({
	...line,
	a: normaliseByRect$1(line.a, width, height),
	b: normaliseByRect$1(line.b, width, height)
});
/**
* Returns true if `point` is within `maxRange` of `line`.
* 
* ```js
* const line = Lines.fromNumbers(0,20,20,20);
* Lines.withinRange(line, {x:0,y:21}, 1); // True
* ```
* @param line
* @param point
* @param maxRange 
* @returns True if point is within range
*/
const withinRange$1 = (line, point, maxRange) => {
	return distance$1(line, point) <= maxRange;
};
/**
* Calculates [slope](https://en.wikipedia.org/wiki/Slope) of line.
* 
* @example
* ```js
* Lines.slope(line);
* Lines.slope(ptA, ptB)
* ```
* @param lineOrPoint Line or point. If point is provided, second point must be given too
* @param b Second point if needed
* @returns 
*/
const slope = (lineOrPoint, b) => {
	let a;
	if (isLine(lineOrPoint)) {
		a = lineOrPoint.a;
		b = lineOrPoint.b;
	} else {
		a = lineOrPoint;
		if (b === void 0) throw new Error(`b parameter required`);
	}
	if (b === void 0) throw new TypeError(`Second point missing`);
	else return (b.y - a.y) / (b.x - a.x);
};
/**
* Scales a line from its midpoint
* 
* @example Shorten by 50%, anchored at the midpoint
* ```js
* const l = {
*  a: {x:50, y:50}, b: {x: 100, y: 90}
* }
* const l2 = Lines.scaleFromMidpoint(l, 0.5);
* ```
* @param line
* @param factor 
*/
const scaleFromMidpoint = (line, factor) => {
	return {
		a: interpolate$4(factor / 2, line),
		b: interpolate$4(.5 + factor / 2, line)
	};
};
/**
* Calculates `y` where `line` intersects `x`.
* @param line Line to extend
* @param x Intersection of x-axis.
*/
const pointAtX = (line, x) => {
	const y = line.a.y + (x - line.a.x) * slope(line);
	return Object.freeze({
		x,
		y
	});
};
/**
* Returns a line extended from its `a` point by a specified distance
*
* ```js
* const line = {a: {x: 0, y:0}, b: {x:10, y:10} }
* const extended = Lines.extendFromA(line, 2);
* ```
* @param line
* @param distance
* @return Newly extended line
*/
const extendFromA = (line, distance) => {
	const calculatedLength = length$3(line);
	return Object.freeze({
		...line,
		a: line.a,
		b: Object.freeze({
			x: line.b.x + (line.b.x - line.a.x) / calculatedLength * distance,
			y: line.b.y + (line.b.y - line.a.y) / calculatedLength * distance
		})
	});
};
/**
* Yields every integer point along `line`. 
* 
* @example Basic usage
* ```js
* const l = { a: {x: 0, y: 0}, b: {x: 100, y: 100} };
* for (const p of Lines.pointsOf(l)) {
*  // Do something with point `p`...
* }
* ```
* 
* Some precision is lost as start and end
* point is also returned as an integer.
* 
* Uses [Bresenham's line algorithm](https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm)
* @param line Line
*/
function* pointsOf(line) {
	const { a, b } = line;
	let x0 = Math.floor(a.x);
	let y0 = Math.floor(a.y);
	const x1 = Math.floor(b.x);
	const y1 = Math.floor(b.y);
	const dx = Math.abs(x1 - x0);
	const dy = -Math.abs(y1 - y0);
	const sx = x0 < x1 ? 1 : -1;
	const sy = y0 < y1 ? 1 : -1;
	let err = dx + dy;
	while (true) {
		yield {
			x: x0,
			y: y0
		};
		if (x0 === x1 && y0 === y1) break;
		const e2 = 2 * err;
		if (e2 >= dy) {
			err += dy;
			x0 += sx;
		}
		if (e2 <= dx) {
			err += dx;
			y0 += sy;
		}
	}
}
/**
* Returns the distance of `point` to the 
* nearest point on `line`.
* 
* ```js
* const d = Lines.distance(line, {x:10,y:10});
* ```
* 
* If an array of lines is provided, the shortest distance is returned.
* @param line Line (or array of lines)
* @param point Point to check against
* @returns Distance
*/
const distance$1 = (line, point) => {
	if (Array.isArray(line)) return minFast(line.map((l) => distanceSingleLine(l, point)));
	else return distanceSingleLine(line, point);
};
/**
* Returns an array representation of line: [a.x, a.y, b.x, b.y]
* 
* See {@link fromFlatArray} to create a line _from_ this representation.
*
* ```js
* Lines.toFlatArray(line);
* Lines.toFlatArray(pointA, pointB);
* ```
* @param {Point} a
* @param {Point} b
* @returns {number[]}
*/
const toFlatArray$1 = (a, b) => {
	if (isLine(a)) return [
		a.a.x,
		a.a.y,
		a.b.x,
		a.b.y
	];
	else if (isPoint(a) && isPoint(b)) return [
		a.x,
		a.y,
		b.x,
		b.y
	];
	else throw new Error(`Expected single line parameter, or a and b points`);
};
/**
* Yields all the points of all the lines.
* 
* ```js
* const lines = [ ..some array of lines.. ];
* for (const pt of Lines.asPoints(lines)) {
*  // Yields a and then b of each point sequentially
* }
* ```
* @param lines 
*/
function* asPoints(lines) {
	for (const l of lines) {
		yield l.a;
		yield l.b;
	}
}
/**
* Returns an SVG description of line
* ```
* Lines.toSvgString(ptA, ptB);
* ```
* @param a 
* @param b 
* @returns 
*/
const toSvgString$1 = (a, b) => [`M${a.x} ${a.y} L ${b.x} ${b.y}`];

//#endregion
//#region ../packages/geometry/src/point/relation.ts
/**
* Tracks the relation between two points.
* 
* 1. Call `Points.relation` with the initial reference point
* 2. You get back a function
* 3. Call the function with a new point to compute relational information.
* 
* It computes angle, average, centroid, distance and speed.
* 
* ```js
* // Reference point: 50,50
* const t = Points.relation({x:50,y:50}); // t is a function
*
* // Invoke the returned function with a point
* const relation = t({ x:0, y:0 }); // Juicy relational data
* ```
* 
* Or with destructuring:
* 
* ```js
* const { angle, distanceFromStart, distanceFromLast, average, centroid, speed } = t({ x:0,y:0 });
* ```
*
* x & y coordinates can also be used as parameters:
* ```js
* const t = Points.relation(50, 50);
* const result = t(0, 0);
* // result.speed, result.angle ...
* ```
*
* Note that intermediate values are not stored. It keeps the initial
* and most-recent point. If you want to compute something over a set
* of prior points, you may want to use {@link PointsTracker}
* @param a Initial point, or x value
* @param b y value, if first option is a number.
* @returns
*/
const relation = (a, b) => {
	const start = getPointParameter$1(a, b);
	let totalX = 0;
	let totalY = 0;
	let count = 0;
	let lastUpdate = performance.now();
	let lastPoint = start;
	const update = (aa, bb) => {
		const p = getPointParameter$1(aa, bb);
		totalX += p.x;
		totalY += p.y;
		count++;
		const distanceFromStart = distance$2(p, start);
		const distanceFromLast = distance$2(p, lastPoint);
		const now = performance.now();
		const speed = distanceFromLast / (now - lastUpdate);
		lastUpdate = now;
		lastPoint = p;
		return Object.freeze({
			angle: angleRadian$1(p, start),
			distanceFromStart,
			distanceFromLast,
			speed,
			centroid: centroid$1(p, start),
			average: {
				x: totalX / count,
				y: totalY / count
			}
		});
	};
	return update;
};

//#endregion
//#region ../packages/geometry/src/point/point-type.ts
/**
* Placeholder point: `{ x: NaN, y: NaN }`
* Use `isPlaceholder` to check if a point is a placeholder.
* Use `Placeholder3d` get a point with `z` property.
*/
const Placeholder$1 = Object.freeze({
	x: NaN,
	y: NaN
});
/**
* Placeholder point: `{x: NaN, y:NaN, z:NaN }`
* Use `isPlaceholder` to check if a point is a placeholder.
* Use `Placeholder` to get a point without `z` property.
*/
const Placeholder3d = Object.freeze({
	x: NaN,
	y: NaN,
	z: NaN
});

//#endregion
//#region ../packages/geometry/src/point/point-tracker.ts
/**
* A tracked point. Mutable. Useful for monitoring how
* it changes over time. Eg. when a pointerdown event happens, to record the start position and then
* track the pointer as it moves until pointerup.
*
* See also
* * [Playground](https://clinth.github.io/ixfx-play/data/point-tracker/index.html)
* * {@link PointsTracker}: Track several points, useful for multi-touch.
* * [ixfx Guide to Point Tracker](https://ixfx.fun/geometry/tracking/)
* 
* ```js
* // Create a tracker on a pointerdown
* const t = new PointTracker();
*
* // ...and later, tell it when a point is seen (eg. pointermove)
* const nfo = t.seen({x: evt.x, y:evt.y});
* // nfo gives us some details on the relation between the seen point, the start, and points inbetween
* // nfo.angle, nfo.centroid, nfo.speed etc.
* ```
*
* Compute based on last seen point
* ```js
* t.angleFromStart();
* t.distanceFromStart();
* t.x / t.y
* t.length; // Total length of accumulated points
* t.elapsed; // Total duration since start
* t.lastResult; // The PointSeenInfo for last seen point
* ```
*
* Housekeeping
* ```js
* t.reset(); // Reset tracker
* ```
*
* By default, the tracker only keeps track of the initial point and
* does not store intermediate 'seen' points. To use the tracker as a buffer,
* set `storeIntermediate` option to _true_.
*
* ```js
* // Keep only the last 10 points
* const t = new PointTracker({
*  sampleLimit: 10
* });
*
* // Store all 'seen' points
* const t = new PointTracker({
*  storeIntermediate: true
* });
*
* // In this case, the whole tracker is automatically
* // reset after 10 samples
* const t = new PointTracker({
*  resetAfterSamples: 10
* })
* ```
*
* When using a buffer limited by `sampleLimit`, the 'initial' point will be the oldest in the
* buffer, not actually the very first point seen.
*/
var PointTracker = class extends ObjectTracker {
	initialRelation;
	markRelation;
	lastResult;
	constructor(opts = {}) {
		super(opts);
	}
	/**
	* Notification that buffer has been knocked down to `sampleLimit`.
	* 
	* This will reset the `initialRelation`, which will use the new oldest value.
	*/
	onTrimmed(_reason) {
		this.initialRelation = void 0;
	}
	/**
	* @ignore
	*/
	onReset() {
		super.onReset();
		this.lastResult = void 0;
		this.initialRelation = void 0;
		this.markRelation = void 0;
	}
	/**
	* Makes a 'mark' in the tracker, allowing you to compare values
	* to this point.
	*/
	mark() {
		this.markRelation = relation(this.last);
	}
	/**
	* Tracks a point, returning data on its relation to the
	* initial point and the last received point.
	* 
	* @param _p Point
	*/
	computeResults(_p) {
		const currentLast = this.last;
		const previousLast = this.values.at(-2);
		if (this.initialRelation === void 0 && this.initial) this.initialRelation = relation(this.initial);
		else if (this.initialRelation === void 0) throw new Error(`Bug: No initialRelation, and this.inital is undefined?`);
		const lastRelation = previousLast === void 0 ? relation(currentLast) : relation(previousLast);
		const initialRel = this.initialRelation(currentLast);
		const markRel = this.markRelation !== void 0 ? this.markRelation(currentLast) : void 0;
		const speed = previousLast === void 0 ? 0 : length$3(previousLast, currentLast, true) / (currentLast.at - previousLast.at);
		const r = {
			fromInitial: initialRel,
			fromLast: {
				...lastRelation(currentLast),
				speed
			},
			fromMark: markRel,
			values: [...this.values]
		};
		this.lastResult = r;
		return r;
	}
	/**
	* Returns a polyline representation of stored points.
	* Returns an empty array if points were not saved, or there's only one.
	*/
	get line() {
		if (this.values.length === 1) return [];
		return joinPointsToLines(...this.values);
	}
	/**
	* Returns a vector of the initial/last points of the tracker.
	* Returns as a polar coordinate
	*/
	get vectorPolar() {
		return fromLinePolar(this.lineStartEnd);
	}
	/**
	* Returns a vector of the initial/last points of the tracker.
	* Returns as a Cartesian coordinate
	*/
	get vectorCartesian() {
		return fromLineCartesian(this.lineStartEnd);
	}
	/**
	* Returns a line from initial point to last point.
	*
	* If there are less than two points, Lines.Empty is returned
	*/
	get lineStartEnd() {
		const initial = this.initial;
		if (this.values.length < 2 || !initial) return Empty$1;
		return {
			a: initial,
			b: this.last
		};
	}
	/**
	* Returns distance from latest point to initial point.
	* If there are less than two points, zero is returned.
	*
	* This is the direct distance from initial to last,
	* not the accumulated length. Use {@link lengthTotal} for that.
	* @param force2d If _true_ distance is calculated only in 2d
	* @returns Distance
	*/
	distanceFromStart(force2d = false) {
		const initial = this.initial;
		return this.values.length >= 2 && initial !== void 0 ? force2d ? distance2d(initial, this.last) : distance$2(initial, this.last) : 0;
	}
	/**
	* Returns the speed (over milliseconds) based on accumulated travel distance.
	* 
	* If there's no initial point, 0 is returned.
	* @param force2d If _true_, speed is calculated with x,y only
	* @returns 
	*/
	speedFromStart(force2d = false) {
		const d = this.lengthTotal(force2d);
		const t = this.timespan;
		if (Number.isNaN(t)) return 0;
		if (d === 0) return 0;
		return Math.abs(d) / t;
	}
	speedFromLast(force2d = false) {
		const l = this.lastResult;
		if (!l) return 0;
		return l.fromLast.speed;
	}
	/**
	* Difference between last point and the initial point, calculated
	* as a simple subtraction of x,y & z.
	*
	* `Points.Placeholder` is returned if there's only one point so far.
	*/
	difference() {
		const initial = this.initial;
		return this.values.length >= 2 && initial !== void 0 ? subtract$3(this.last, initial) : Placeholder$1;
	}
	/**
	* Returns angle (in radians) from latest point to the initial point
	* If there are less than two points, undefined is return.
	* @returns Angle in radians
	*/
	angleFromStart() {
		const initial = this.initial;
		if (initial !== void 0 && this.values.length > 2) return angleRadian$1(initial, this.last);
	}
	/**
	* Returns the total distance from accumulated points.
	* Returns 0 if points were not saved, or there's only one.
	* 
	* Use {@link lengthAverage} to get the average length for all segments
	* @param force2d If _true_ length is calculated using x&y only
	*/
	lengthTotal(force2d = false) {
		if (this.values.length === 1) return 0;
		const l = this.line;
		return length$3(l, force2d);
	}
	/**
	* Adds up the accumulated length of all points (using {@link lengthTotal})
	* dividing by the total number of points.
	* @param force2d 
	* @returns 
	*/
	lengthAverage(force2d = false) {
		return this.lengthTotal(force2d) / this.values.length;
	}
	/**
	* Returns the last x coord
	*/
	get x() {
		return this.last.x;
	}
	/**
	* Returns the last y coord
	*/
	get y() {
		return this.last.y;
	}
	/**
	* Returns the last z coord (or _undefined_ if not available)
	*/
	get z() {
		return this.last.z;
	}
};
/**
* A {@link TrackedValueMap} for points. Uses {@link PointTracker} to
* track added values.
*/
var PointsTracker = class extends TrackedValueMap {
	constructor(opts = {}) {
		super((key, start) => {
			if (start === void 0) throw new Error(`Requires start point`);
			const p = new PointTracker({
				...opts,
				id: key
			});
			p.seen(start);
			return p;
		});
	}
	get(id) {
		return super.get(id);
	}
};
var UserPointerTracker = class extends PointTracker {
	/**
	* Adds a PointerEvent along with its
	* coalesced events, if available.
	* @param p 
	* @returns 
	*/
	seenEvent(p) {
		if (`getCoalescedEvents` in p) {
			const asPoints = p.getCoalescedEvents().map((event) => ({
				x: event.clientX,
				y: event.clientY
			}));
			return this.seen(...asPoints);
		} else return this.seen({
			x: p.clientX,
			y: p.clientY
		});
	}
};
var UserPointersTracker = class extends TrackedValueMap {
	constructor(opts = {}) {
		super((key, start) => {
			if (start === void 0) throw new Error(`Requires start point`);
			const p = new UserPointerTracker({
				...opts,
				id: key
			});
			p.seen(start);
			return p;
		});
	}
	get(id) {
		return super.get(id);
	}
	/**
	* Track a PointerEvent
	* @param event
	*/
	seenEvent(event) {
		if (`getCoalescedEvents` in event) {
			const seens = event.getCoalescedEvents().map((subEvent) => super.seen(subEvent.pointerId.toString(), subEvent));
			return Promise.all(seens);
		} else return Promise.all([super.seen(event.pointerId.toString(), event)]);
	}
};

//#endregion
//#region ../packages/geometry/src/point/progress-between.ts
/**
* Computes the progress between two waypoints, given `position`.
* 
* [Source](https://www.habrador.com/tutorials/math/2-passed-waypoint/?s=09)
* @param position Current position
* @param waypointA Start
* @param waypointB End
* @returns 
*/
const progressBetween = (position, waypointA, waypointB) => {
	const a = subtract$3(position, waypointA);
	const b = subtract$3(waypointB, waypointA);
	return isPoint3d(a) && isPoint3d(b) ? (a.x * b.x + a.y * b.y + a.z * b.z) / (b.x * b.x + b.y * b.y + b.z * b.z) : (a.x * b.x + a.y * b.y) / (b.x * b.x + b.y * b.y);
};

//#endregion
//#region ../packages/geometry/src/point/project.ts
/**
* Project `origin` by `distance` and `angle` (radians).
*
* To figure out rotation, imagine a horizontal line running through `origin`.
* * Rotation = 0 deg puts the point on the right of origin, on same y-axis
* * Rotation = 90 deg/3:00 puts the point below origin, on the same x-axis
* * Rotation = 180 deg/6:00 puts the point on the left of origin on the same y-axis
* * Rotation = 270 deg/12:00 puts the point above the origin, on the same x-axis
*
* ```js
* // Yields a point 100 units away from 10,20 with 10 degrees rotation (ie slightly down)
* const a = Points.project({x:10, y:20}, 100, degreeToRadian(10));
* ```
* @param origin
* @param distance
* @param angle
* @returns
*/
const project = (origin, distance, angle) => {
	return {
		x: Math.cos(angle) * distance + origin.x,
		y: Math.sin(angle) * distance + origin.y
	};
};

//#endregion
//#region ../packages/geometry/src/point/quantise.ts
/**
* Quantises a point.
* @param pt 
* @param snap 
* @param middleRoundsUp 
* @returns 
*/
function quantiseEvery(pt, snap, middleRoundsUp = true) {
	guard$5(pt, `pt`);
	guard$5(snap, `snap`);
	if (isPoint3d(pt)) {
		if (!isPoint3d(snap)) throw new TypeError(`Param 'snap' is missing 'z' field`);
		return Object.freeze({
			x: quantiseEvery$1(pt.x, snap.x, middleRoundsUp),
			y: quantiseEvery$1(pt.y, snap.y, middleRoundsUp),
			z: quantiseEvery$1(pt.z, snap.z, middleRoundsUp)
		});
	}
	return Object.freeze({
		x: quantiseEvery$1(pt.x, snap.x, middleRoundsUp),
		y: quantiseEvery$1(pt.y, snap.y, middleRoundsUp)
	});
}

//#endregion
//#region ../packages/geometry/src/point/random.ts
/**
* Returns a random 2D point on a 0..1 scale.
* ```js
* import { Points } from "@ixfx/geometry.js";
* const pt = Points.random(); // eg {x: 0.2549012, y:0.859301}
* ```
*
* A custom source of randomness can be provided:
* ```js
* import { Points } from "@ixfx/geometry.js";
* import { weightedSource } from "@ixfx/random.js"
* const pt = Points.random(weightedSource(`quadIn`));
* ```
* @param rando
* @returns
*/
const random$1 = (rando) => {
	if (typeof rando === `undefined`) rando = Math.random;
	return Object.freeze({
		x: rando(),
		y: rando()
	});
};
/**
* Returns a random 3D point on a 0..1 scale.
* ```js
* import { Points } from "@ixfx/geometry";
* const pt = Points.random(); // eg {x: 0.2549012, y:0.859301}
* ```
*
* A custom source of randomness can be provided:
* ```js
* import { Points } from "@ixfx/geometry";
* import { weightedSource } from "@ixfx/random.js"
* const pt = Points.random(weightedSource(`quadIn`));
* ```
* @param rando
* @returns
*/
const random3d = (rando) => {
	if (typeof rando === `undefined`) rando = Math.random;
	return Object.freeze({
		x: rando(),
		y: rando(),
		z: rando()
	});
};

//#endregion
//#region ../packages/geometry/src/point/reduce.ts
/**
* Reduces over points, treating _x_ and _y_ separately.
*
* ```
* // Sum x and y values
* const total = Points.reduce(points, (p, acc) => {
*  return {x: p.x + acc.x, y: p.y + acc.y}
* });
* ```
* @param pts Points to reduce
* @param fn Reducer
* @param initial Initial value, uses `{ x:0, y:0 }` by default
* @returns
*/
const reduce = (pts, fn, initial) => {
	if (initial === void 0) initial = {
		x: 0,
		y: 0
	};
	let accumulator = initial;
	for (const p of pts) accumulator = fn(p, accumulator);
	return accumulator;
};

//#endregion
//#region ../packages/geometry/src/point/rotate.ts
function rotate$1(pt, amountRadian, origin) {
	if (typeof origin === `undefined`) origin = {
		x: 0,
		y: 0
	};
	guard$5(origin, `origin`);
	resultThrow(numberTest(amountRadian, ``, `amountRadian`));
	const arrayInput = Array.isArray(pt);
	if (amountRadian === 0) return pt;
	if (!arrayInput) pt = [pt];
	const ptAr = pt;
	for (const [index, p] of ptAr.entries()) guard$5(p, `pt[${index}]`);
	const asCartesisan = ptAr.map((p) => fromCartesian(p, origin)).map((p) => rotate$3(p, amountRadian)).map((p) => toCartesian$2(p, origin));
	return arrayInput ? asCartesisan : asCartesisan[0];
}
function rotateByAngle(pt, angle) {
	const r = toRadian(angle);
	const cos = Math.cos(r);
	const sin = Math.sin(r);
	return {
		...pt,
		x: pt.x * cos - pt.y * sin,
		y: pt.x * sin + pt.y * cos
	};
}

//#endregion
//#region ../packages/geometry/src/point/rotate-point-array.ts
const rotatePointArray = (v, amountRadian) => {
	const mat = [[Math.cos(amountRadian), -Math.sin(amountRadian)], [Math.sin(amountRadian), Math.cos(amountRadian)]];
	const result = [];
	for (const [index, element] of v.entries()) result[index] = [mat[0][0] * element[0] + mat[0][1] * element[1], mat[1][0] * element[0] + mat[1][1] * element[1]];
	return result;
};

//#endregion
//#region ../packages/geometry/src/point/round.ts
/**
* Round the point's _x_ and _y_ to given number of digits
* @param ptOrX 
* @param yOrDigits 
* @param digits 
* @returns 
*/
const round = (ptOrX, yOrDigits, digits) => {
	const pt = getPointParameter$1(ptOrX, yOrDigits);
	digits = digits ?? yOrDigits;
	digits = digits ?? 2;
	return Object.freeze({
		...pt,
		x: round$1(digits, pt.x),
		y: round$1(digits, pt.y)
	});
};

//#endregion
//#region ../packages/geometry/src/point/within-range.ts
/**
* Returns true if two points are within a specified range on both axes.
* 
* Provide a point for the range to set different x/y range, or pass a number
* to use the same range for both axis.
*
* Note this simply compares x,y values it does not calcuate distance.
*
* @example
* ```js
* withinRange({x:100,y:100}, {x:101, y:101}, 1); // True
* withinRange({x:100,y:100}, {x:105, y:101}, {x:5, y:1}); // True
* withinRange({x:100,y:100}, {x:105, y:105}, {x:5, y:1}); // False - y axis too far
* ```
* @param a
* @param b
* @param maxRange
* @returns
*/
const withinRange = (a, b, maxRange) => {
	guard$5(a, `a`);
	guard$5(b, `b`);
	if (typeof maxRange === `number`) {
		resultThrow(numberTest(maxRange, `positive`, `maxRange`));
		maxRange = {
			x: maxRange,
			y: maxRange
		};
	} else guard$5(maxRange, `maxRange`);
	const x = Math.abs(b.x - a.x);
	const y = Math.abs(b.y - a.y);
	return x <= maxRange.x && y <= maxRange.y;
};

//#endregion
//#region ../packages/geometry/src/point/wrap.ts
/**
* Wraps a point to be within `ptMin` and `ptMax`.
* Note that max values are _exclusive_, meaning the return value will always be one less.
*
* Eg, if a view port is 100x100 pixels, wrapping the point 150,100 yields 50,99.
*
* ```js
* // Wraps 150,100 to on 0,0 -100,100 range
* wrap({x:150,y:100}, {x:100,y:100});
* ```
*
* Wrap normalised point:
* ```js
* wrap({x:1.2, y:1.5}); // Yields: {x:0.2, y:0.5}
* ```
* @param pt Point to wrap
* @param ptMax Maximum value, or `{ x:1, y:1 }` by default
* @param ptMin Minimum value, or `{ x:0, y:0 }` by default
* @returns Wrapped point
*/
const wrap$2 = (pt, ptMax, ptMin) => {
	if (ptMax === void 0) ptMax = {
		x: 1,
		y: 1
	};
	if (ptMin === void 0) ptMin = {
		x: 0,
		y: 0
	};
	guard$5(pt, `pt`);
	guard$5(ptMax, `ptMax`);
	guard$5(ptMin, `ptMin`);
	return Object.freeze({
		x: wrap$3(pt.x, ptMin.x, ptMax.x),
		y: wrap$3(pt.y, ptMin.y, ptMax.y)
	});
};

//#endregion
//#region ../packages/geometry/src/point/index.ts
var point_exports = /* @__PURE__ */ __exportAll({
	Empty: () => Empty$2,
	Empty3d: () => Empty3d,
	Placeholder: () => Placeholder$1,
	Placeholder3d: () => Placeholder3d,
	PointTracker: () => PointTracker,
	PointsTracker: () => PointsTracker,
	Unit: () => Unit,
	Unit3d: () => Unit3d,
	UserPointerTracker: () => UserPointerTracker,
	UserPointersTracker: () => UserPointersTracker,
	abs: () => abs$2,
	angleRadian: () => angleRadian$1,
	angleRadianCircle: () => angleRadianCircle,
	angleRadianThreePoint: () => angleRadianThreePoint,
	apply: () => apply$2,
	average: () => average$1,
	averager: () => averager,
	bbox: () => bbox$5,
	bbox3d: () => bbox3d,
	centroid: () => centroid$1,
	clamp: () => clamp,
	clampMagnitude: () => clampMagnitude$2,
	compare: () => compare,
	compareByX: () => compareByX,
	compareByY: () => compareByY,
	compareByZ: () => compareByZ,
	compareRowwise: () => compareRowwise,
	convexHull: () => convexHull,
	cross: () => cross,
	crossProductRaw: () => crossProductRaw,
	distance: () => distance$2,
	distance2d: () => distance2d,
	distanceToCenter: () => distanceToCenter,
	distanceToExterior: () => distanceToExterior,
	divide: () => divide$3,
	divider: () => divider,
	dotProduct: () => dotProduct$2,
	findMinimum: () => findMinimum,
	from: () => from,
	fromNumbers: () => fromNumbers$1,
	fromString: () => fromString,
	getAsBounds: () => getAsBounds,
	getPointParameter: () => getPointParameter$1,
	getTwoPointParameters: () => getTwoPointParameters,
	guard: () => guard$5,
	guardNonZeroPoint: () => guardNonZeroPoint,
	interpolate: () => interpolate$3,
	interpolator: () => interpolator$1,
	invert: () => invert$1,
	isEmpty: () => isEmpty$3,
	isEqual: () => isEqual$5,
	isNaN: () => isNaN$1,
	isNull: () => isNull,
	isPlaceholder: () => isPlaceholder$3,
	isPoint: () => isPoint,
	isPoint3d: () => isPoint3d,
	leftmost: () => leftmost,
	multiply: () => multiply$3,
	multiplyScalar: () => multiplyScalar$1,
	normalise: () => normalise$2,
	normaliseByRect: () => normaliseByRect$1,
	pipeline: () => pipeline,
	pipelineApply: () => pipelineApply,
	pointTest: () => pointTest,
	progressBetween: () => progressBetween,
	project: () => project,
	quantiseEvery: () => quantiseEvery,
	random: () => random$1,
	random3d: () => random3d,
	reduce: () => reduce,
	relation: () => relation,
	rightmost: () => rightmost,
	rotate: () => rotate$1,
	rotateByAngle: () => rotateByAngle,
	rotatePointArray: () => rotatePointArray,
	round: () => round,
	subtract: () => subtract$3,
	sum: () => sum$3,
	to2d: () => to2d,
	to3d: () => to3d,
	toArray: () => toArray,
	toIntegerValues: () => toIntegerValues,
	toString: () => toString$5,
	withinRange: () => withinRange,
	wrap: () => wrap$2
});

//#endregion
//#region ../packages/geometry/src/arc/index.ts
var arc_exports = /* @__PURE__ */ __exportAll({
	angularSize: () => angularSize,
	bbox: () => bbox$3,
	distanceCenter: () => distanceCenter,
	fromCircle: () => fromCircle,
	fromCircleAmount: () => fromCircleAmount,
	fromDegrees: () => fromDegrees$1,
	getStartEnd: () => getStartEnd,
	guard: () => guard$1,
	interpolate: () => interpolate$2,
	isArc: () => isArc,
	isEqual: () => isEqual$2,
	isPositioned: () => isPositioned,
	length: () => length$1,
	point: () => point,
	toLine: () => toLine,
	toPath: () => toPath$2,
	toSvg: () => toSvg$1
});
/**
* Returns true if parameter is an arc
* @param p Arc or number
* @returns Boolean
*/
const isArc = (p) => typeof p.startRadian !== `undefined` && typeof p.endRadian !== `undefined` && typeof p.clockwise !== `undefined`;
/**
* Returns true if parameter has a positioned (x,y)
* @param p Point, Arc or ArcPositiond
* @returns Boolean
*/
const isPositioned = (p) => typeof p.x !== `undefined` && typeof p.y !== `undefined`;
/**
* Returns an arc from degrees, rather than radians
* @param radius Radius of arc
* @param startDegrees Start angle in degrees
* @param endDegrees End angle in degrees
* @param clockwise Whether arc moves in clockwise direction
* @param origin Optional center of arc
* @returns Arc
*/
function fromDegrees$1(radius, startDegrees, endDegrees, clockwise, origin) {
	const a = {
		radius,
		startRadian: degreeToRadian(startDegrees),
		endRadian: degreeToRadian(endDegrees),
		clockwise
	};
	if (isPoint(origin)) {
		guard$5(origin);
		const ap = {
			...a,
			x: origin.x,
			y: origin.y
		};
		return Object.freeze(ap);
	} else return Object.freeze(a);
}
/**
* Returns a {@link Line} linking the start and end points of an {@link ArcPositioned}.
*
* @param arc
* @returns Line from start to end of arc
*/
function toLine(arc) {
	return fromPoints$2(point(arc, arc.startRadian), point(arc, arc.endRadian));
}
/**
* Return start and end points of `arc`.
* `origin` will override arc's origin, if defined.
*
* See also:
* {@link point} - get point on arc by angle
* {@link interpolate} - get point on arc by interpolation percentage
* @param arc
* @param origin
* @returns Points
*/
function getStartEnd(arc, origin) {
	guard$1(arc);
	return [point(arc, arc.startRadian, origin), point(arc, arc.endRadian, origin)];
}
/**
* Calculates a coordinate on an arc, based on an angle.
* `origin` will override arc's origin, if defined.
*
* See also:
* {@link getStartEnd} - get start and end of arc
* {@link interpolate} - get point on arc by interpolation percentage
* @param arc Arc
* @param angleRadian Angle of desired coordinate
* @param origin Origin of arc (0,0 used by default)
* @returns Coordinate
*/
function point(arc, angleRadian, origin) {
	if (typeof origin === `undefined`) origin = isPositioned(arc) ? arc : {
		x: 0,
		y: 0
	};
	return {
		x: Math.cos(angleRadian) * arc.radius + origin.x,
		y: Math.sin(angleRadian) * arc.radius + origin.y
	};
}
/**
* Throws an error if arc instance is invalid
* @param arc
*/
function guard$1(arc) {
	if (typeof arc === `undefined`) throw new TypeError(`Arc is undefined`);
	if (isPositioned(arc)) guard$5(arc, `arc`);
	if (typeof arc.radius === `undefined`) throw new TypeError(`Arc radius is undefined (${JSON.stringify(arc)})`);
	if (typeof arc.radius !== `number`) throw new TypeError(`Radius must be a number`);
	if (Number.isNaN(arc.radius)) throw new TypeError(`Radius is NaN`);
	if (arc.radius <= 0) throw new TypeError(`Radius must be greater than zero`);
	if (typeof arc.startRadian === `undefined`) throw new TypeError(`Arc is missing 'startRadian' field`);
	if (typeof arc.endRadian === `undefined`) throw new TypeError(`Arc is missing 'startRadian' field`);
	if (Number.isNaN(arc.endRadian)) throw new TypeError(`Arc endRadian is NaN`);
	if (Number.isNaN(arc.startRadian)) throw new TypeError(`Arc endRadian is NaN`);
	if (typeof arc.clockwise === `undefined`) throw new TypeError(`Arc is missing 'clockwise field`);
	if (arc.startRadian >= arc.endRadian) throw new TypeError(`startRadian is expected to be les than endRadian`);
}
/**
* Compute relative position on arc.
*
* See also:
* {@link getStartEnd} - get start and end of arc
* {@link point} - get point on arc by angle
* @param amount Relative position 0-1
* @param arc Arc
* @param allowOverflow If _true_ allows point to overflow arc dimensions (default: _false_)
* @param origin If arc is not positioned, pass in an origin
* @returns Point on arc
*/
const interpolate$2 = (amount, arc, allowOverflow, origin) => {
	guard$1(arc);
	if (!(allowOverflow ?? false)) {
		if (amount < 0) throw new Error(`Param 'amount' is under zero, and overflow is not allowed`);
		if (amount > 1) throw new Error(`Param 'amount' is above 1 and overflow is not allowed`);
	}
	const rel = angularSize(arc) * amount;
	return point(arc, radiansSum(arc.startRadian, rel, arc.clockwise), origin);
};
/**
* Returns the angular size of arc.
* Eg if arc runs from 45-315deg in clockwise direction, size will be 90deg.
* @param arc
* @param direction Optionally specify direction to calculate size in. If not specified, will use arc's clockwise property to determine direction.
*/
function angularSize(arc, direction) {
	return radianArc(arc.startRadian, arc.endRadian, direction ?? (arc.clockwise ? `cw` : `ccw`));
}
/**
* Creates a {@link Path} instance from the arc. This wraps up some functions for convienence.
* @param arc
* @returns Path
*/
function toPath$2(arc) {
	guard$1(arc);
	return Object.freeze({
		...arc,
		nearest: (_point) => {
			throw new Error(`not implemented`);
		},
		interpolate: (amount) => interpolate$2(amount, arc),
		bbox: () => bbox$3(arc),
		length: () => length$1(arc),
		toSvgString: () => toSvg$1(arc),
		relativePosition: (_point, _intersectionThreshold) => {
			throw new Error(`Not implemented`);
		},
		distanceToPoint: (_point) => {
			throw new Error(`Not implemented`);
		},
		kind: `arc`
	});
}
/**
* Returns an arc based on a circle using start and end angles.
* If you don't have the end angle, but rather the size of the arc, use {@link fromCircleAmount}
* @param circle Circle
* @param startRadian Start radian
* @param endRadian End radian
* @param clockwise Whether arc goes in a clockwise direction (default: true)
* @returns ArcPositioned
*/
function fromCircle(circle, startRadian, endRadian, clockwise = true) {
	return Object.freeze({
		...circle,
		endRadian,
		startRadian,
		clockwise
	});
}
/**
* Returns an arc based on a circle, a start angle, and the size of the arc.
* See {@link fromCircle} if you already have start and end angles.
* @param circle Circle to base off
* @param startRadian Starting angle
* @param sizeRadian Size of arc
* @param clockwise Whether arc moves in clockwise direction (default: true)
* @returns ArcPositioned
*/
function fromCircleAmount(circle, startRadian, sizeRadian, clockwise = true) {
	return fromCircle(circle, startRadian, radiansSum(startRadian, sizeRadian, clockwise));
}
/**
* Calculates the length of the arc
* @param arc
* @returns Length
*/
function length$1(arc) {
	return piPi$5 * arc.radius * ((arc.startRadian - arc.endRadian) / piPi$5);
}
/**
* Calculates a {@link Rect} bounding box for arc.
* @param arc
* @returns Rectangle encompassing arc.
*/
function bbox$3(arc) {
	if (isPositioned(arc)) {
		const middle = interpolate$2(.5, arc);
		const asLine = toLine(arc);
		return bbox$5(middle, asLine.a, asLine.b);
	} else return {
		width: arc.radius * 2,
		height: arc.radius * 2
	};
}
/**
* Creates an SV path snippet for arc
* @returns
*/
function toSvg$1(a, b, c, d, e) {
	if (isArc(a)) if (isPositioned(a)) if (isPoint(b)) return toSvgFull$1(b, a.radius, a.startRadian, a.endRadian, c);
	else return toSvgFull$1(a, a.radius, a.startRadian, a.endRadian, b);
	else return isPoint(b) ? toSvgFull$1(b, a.radius, a.startRadian, a.endRadian, c) : toSvgFull$1({
		x: 0,
		y: 0
	}, a.radius, a.startRadian, a.endRadian);
	else {
		if (c === void 0) throw new Error(`startAngle undefined`);
		if (d === void 0) throw new Error(`endAngle undefined`);
		if (isPoint(a)) if (typeof b === `number` && typeof c === `number` && typeof d === `number`) return toSvgFull$1(a, b, c, d, e);
		else throw new TypeError(`Expected (point, number, number, number). Missing a number param.`);
		else throw new Error(`Expected (point, number, number, number). Missing first point.`);
	}
}
function toSvgFull$1(origin, radius, startRadian, endRadian, opts) {
	if (opts === void 0 || typeof opts !== `object`) opts = {};
	const isFullCircle = endRadian - startRadian === 360;
	const start = toCartesian$2(radius, endRadian - .01, origin);
	const end = toCartesian$2(radius, startRadian, origin);
	const { largeArc = false, sweep = false } = opts;
	const d = [`
    M ${start.x} ${start.y}
    A ${radius} ${radius} 0 ${largeArc ? `1` : `0`} ${sweep ? `1` : `0`} ${end.x} ${end.y},
  `];
	if (isFullCircle) d.push(`z`);
	return d;
}
/**
* Calculates the distance between the centers of two arcs
* @param a
* @param b
* @returns Distance
*/
const distanceCenter = (a, b) => distance$2(a, b);
/**
* Returns true if the two arcs have the same values
*
* ```js
* const arcA = { radius: 5, endRadian: 0, startRadian: 1 };
* const arcA = { radius: 5, endRadian: 0, startRadian: 1 };
* arcA === arcB; // false, because object identities are different
* Arcs.isEqual(arcA, arcB); // true, because values are identical
* ```
* @param a
* @param b
* @returns Boolean
*/
function isEqual$2(a, b) {
	if (a.radius !== b.radius) return false;
	if (a.endRadian !== b.endRadian) return false;
	if (a.startRadian !== b.startRadian) return false;
	if (a.clockwise !== b.clockwise) return false;
	if (isPositioned(a) && isPositioned(b)) {
		if (a.x !== b.x) return false;
		if (a.y !== b.y) return false;
		if (a.z !== b.z) return false;
	} else if (!isPositioned(a) && !isPositioned(b)) {} else return false;
	return true;
}

//#endregion
//#region ../node_modules/.pnpm/bezier-js@6.1.4/node_modules/bezier-js/src/utils.js
const { abs: abs$1, cos: cos$2, sin: sin$2, acos: acos$1, atan2, sqrt: sqrt$2, pow: pow$1 } = Math;
function crt(v) {
	return v < 0 ? -pow$1(-v, 1 / 3) : pow$1(v, 1 / 3);
}
const pi$2 = Math.PI, tau = 2 * pi$2, quart = pi$2 / 2, epsilon = 1e-6, nMax = Number.MAX_SAFE_INTEGER || 9007199254740991, nMin = Number.MIN_SAFE_INTEGER || -9007199254740991, ZERO = {
	x: 0,
	y: 0,
	z: 0
};
const utils = {
	Tvalues: [
		-.06405689286260563,
		.06405689286260563,
		-.1911188674736163,
		.1911188674736163,
		-.3150426796961634,
		.3150426796961634,
		-.4337935076260451,
		.4337935076260451,
		-.5454214713888396,
		.5454214713888396,
		-.6480936519369755,
		.6480936519369755,
		-.7401241915785544,
		.7401241915785544,
		-.820001985973903,
		.820001985973903,
		-.8864155270044011,
		.8864155270044011,
		-.9382745520027328,
		.9382745520027328,
		-.9747285559713095,
		.9747285559713095,
		-.9951872199970213,
		.9951872199970213
	],
	Cvalues: [
		.12793819534675216,
		.12793819534675216,
		.1258374563468283,
		.1258374563468283,
		.12167047292780339,
		.12167047292780339,
		.1155056680537256,
		.1155056680537256,
		.10744427011596563,
		.10744427011596563,
		.09761865210411388,
		.09761865210411388,
		.08619016153195327,
		.08619016153195327,
		.0733464814110803,
		.0733464814110803,
		.05929858491543678,
		.05929858491543678,
		.04427743881741981,
		.04427743881741981,
		.028531388628933663,
		.028531388628933663,
		.0123412297999872,
		.0123412297999872
	],
	arcfn: function(t, derivativeFn) {
		const d = derivativeFn(t);
		let l = d.x * d.x + d.y * d.y;
		if (typeof d.z !== "undefined") l += d.z * d.z;
		return sqrt$2(l);
	},
	compute: function(t, points, _3d) {
		if (t === 0) {
			points[0].t = 0;
			return points[0];
		}
		const order = points.length - 1;
		if (t === 1) {
			points[order].t = 1;
			return points[order];
		}
		const mt = 1 - t;
		let p = points;
		if (order === 0) {
			points[0].t = t;
			return points[0];
		}
		if (order === 1) {
			const ret = {
				x: mt * p[0].x + t * p[1].x,
				y: mt * p[0].y + t * p[1].y,
				t
			};
			if (_3d) ret.z = mt * p[0].z + t * p[1].z;
			return ret;
		}
		if (order < 4) {
			let mt2 = mt * mt, t2 = t * t, a, b, c, d = 0;
			if (order === 2) {
				p = [
					p[0],
					p[1],
					p[2],
					ZERO
				];
				a = mt2;
				b = mt * t * 2;
				c = t2;
			} else if (order === 3) {
				a = mt2 * mt;
				b = mt2 * t * 3;
				c = mt * t2 * 3;
				d = t * t2;
			}
			const ret = {
				x: a * p[0].x + b * p[1].x + c * p[2].x + d * p[3].x,
				y: a * p[0].y + b * p[1].y + c * p[2].y + d * p[3].y,
				t
			};
			if (_3d) ret.z = a * p[0].z + b * p[1].z + c * p[2].z + d * p[3].z;
			return ret;
		}
		const dCpts = JSON.parse(JSON.stringify(points));
		while (dCpts.length > 1) {
			for (let i = 0; i < dCpts.length - 1; i++) {
				dCpts[i] = {
					x: dCpts[i].x + (dCpts[i + 1].x - dCpts[i].x) * t,
					y: dCpts[i].y + (dCpts[i + 1].y - dCpts[i].y) * t
				};
				if (typeof dCpts[i].z !== "undefined") dCpts[i].z = dCpts[i].z + (dCpts[i + 1].z - dCpts[i].z) * t;
			}
			dCpts.splice(dCpts.length - 1, 1);
		}
		dCpts[0].t = t;
		return dCpts[0];
	},
	computeWithRatios: function(t, points, ratios, _3d) {
		const mt = 1 - t, r = ratios, p = points;
		let f1 = r[0], f2 = r[1], f3 = r[2], f4 = r[3], d;
		f1 *= mt;
		f2 *= t;
		if (p.length === 2) {
			d = f1 + f2;
			return {
				x: (f1 * p[0].x + f2 * p[1].x) / d,
				y: (f1 * p[0].y + f2 * p[1].y) / d,
				z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z) / d,
				t
			};
		}
		f1 *= mt;
		f2 *= 2 * mt;
		f3 *= t * t;
		if (p.length === 3) {
			d = f1 + f2 + f3;
			return {
				x: (f1 * p[0].x + f2 * p[1].x + f3 * p[2].x) / d,
				y: (f1 * p[0].y + f2 * p[1].y + f3 * p[2].y) / d,
				z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z + f3 * p[2].z) / d,
				t
			};
		}
		f1 *= mt;
		f2 *= 1.5 * mt;
		f3 *= 3 * mt;
		f4 *= t * t * t;
		if (p.length === 4) {
			d = f1 + f2 + f3 + f4;
			return {
				x: (f1 * p[0].x + f2 * p[1].x + f3 * p[2].x + f4 * p[3].x) / d,
				y: (f1 * p[0].y + f2 * p[1].y + f3 * p[2].y + f4 * p[3].y) / d,
				z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z + f3 * p[2].z + f4 * p[3].z) / d,
				t
			};
		}
	},
	derive: function(points, _3d) {
		const dpoints = [];
		for (let p = points, d = p.length, c = d - 1; d > 1; d--, c--) {
			const list = [];
			for (let j = 0, dpt; j < c; j++) {
				dpt = {
					x: c * (p[j + 1].x - p[j].x),
					y: c * (p[j + 1].y - p[j].y)
				};
				if (_3d) dpt.z = c * (p[j + 1].z - p[j].z);
				list.push(dpt);
			}
			dpoints.push(list);
			p = list;
		}
		return dpoints;
	},
	between: function(v, m, M) {
		return m <= v && v <= M || utils.approximately(v, m) || utils.approximately(v, M);
	},
	approximately: function(a, b, precision) {
		return abs$1(a - b) <= (precision || epsilon);
	},
	length: function(derivativeFn) {
		const z = .5, len = utils.Tvalues.length;
		let sum = 0;
		for (let i = 0, t; i < len; i++) {
			t = z * utils.Tvalues[i] + z;
			sum += utils.Cvalues[i] * utils.arcfn(t, derivativeFn);
		}
		return z * sum;
	},
	map: function(v, ds, de, ts, te) {
		const d1 = de - ds;
		return ts + (te - ts) * ((v - ds) / d1);
	},
	lerp: function(r, v1, v2) {
		const ret = {
			x: v1.x + r * (v2.x - v1.x),
			y: v1.y + r * (v2.y - v1.y)
		};
		if (v1.z !== void 0 && v2.z !== void 0) ret.z = v1.z + r * (v2.z - v1.z);
		return ret;
	},
	pointToString: function(p) {
		let s = p.x + "/" + p.y;
		if (typeof p.z !== "undefined") s += "/" + p.z;
		return s;
	},
	pointsToString: function(points) {
		return "[" + points.map(utils.pointToString).join(", ") + "]";
	},
	copy: function(obj) {
		return JSON.parse(JSON.stringify(obj));
	},
	angle: function(o, v1, v2) {
		const dx1 = v1.x - o.x, dy1 = v1.y - o.y, dx2 = v2.x - o.x, dy2 = v2.y - o.y;
		return atan2(dx1 * dy2 - dy1 * dx2, dx1 * dx2 + dy1 * dy2);
	},
	round: function(v, d) {
		const s = "" + v;
		const pos = s.indexOf(".");
		return parseFloat(s.substring(0, pos + 1 + d));
	},
	dist: function(p1, p2) {
		const dx = p1.x - p2.x, dy = p1.y - p2.y;
		return sqrt$2(dx * dx + dy * dy);
	},
	closest: function(LUT, point) {
		let mdist = pow$1(2, 63), mpos, d;
		LUT.forEach(function(p, idx) {
			d = utils.dist(point, p);
			if (d < mdist) {
				mdist = d;
				mpos = idx;
			}
		});
		return {
			mdist,
			mpos
		};
	},
	abcratio: function(t, n) {
		if (n !== 2 && n !== 3) return false;
		if (typeof t === "undefined") t = .5;
		else if (t === 0 || t === 1) return t;
		const bottom = pow$1(t, n) + pow$1(1 - t, n);
		return abs$1((bottom - 1) / bottom);
	},
	projectionratio: function(t, n) {
		if (n !== 2 && n !== 3) return false;
		if (typeof t === "undefined") t = .5;
		else if (t === 0 || t === 1) return t;
		const top = pow$1(1 - t, n);
		return top / (pow$1(t, n) + top);
	},
	lli8: function(x1, y1, x2, y2, x3, y3, x4, y4) {
		const nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4), ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4), d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
		if (d == 0) return false;
		return {
			x: nx / d,
			y: ny / d
		};
	},
	lli4: function(p1, p2, p3, p4) {
		const x1 = p1.x, y1 = p1.y, x2 = p2.x, y2 = p2.y, x3 = p3.x, y3 = p3.y, x4 = p4.x, y4 = p4.y;
		return utils.lli8(x1, y1, x2, y2, x3, y3, x4, y4);
	},
	lli: function(v1, v2) {
		return utils.lli4(v1, v1.c, v2, v2.c);
	},
	makeline: function(p1, p2) {
		return new Bezier(p1.x, p1.y, (p1.x + p2.x) / 2, (p1.y + p2.y) / 2, p2.x, p2.y);
	},
	findbbox: function(sections) {
		let mx = nMax, my = nMax, MX = nMin, MY = nMin;
		sections.forEach(function(s) {
			const bbox = s.bbox();
			if (mx > bbox.x.min) mx = bbox.x.min;
			if (my > bbox.y.min) my = bbox.y.min;
			if (MX < bbox.x.max) MX = bbox.x.max;
			if (MY < bbox.y.max) MY = bbox.y.max;
		});
		return {
			x: {
				min: mx,
				mid: (mx + MX) / 2,
				max: MX,
				size: MX - mx
			},
			y: {
				min: my,
				mid: (my + MY) / 2,
				max: MY,
				size: MY - my
			}
		};
	},
	shapeintersections: function(s1, bbox1, s2, bbox2, curveIntersectionThreshold) {
		if (!utils.bboxoverlap(bbox1, bbox2)) return [];
		const intersections = [];
		const a1 = [
			s1.startcap,
			s1.forward,
			s1.back,
			s1.endcap
		];
		const a2 = [
			s2.startcap,
			s2.forward,
			s2.back,
			s2.endcap
		];
		a1.forEach(function(l1) {
			if (l1.virtual) return;
			a2.forEach(function(l2) {
				if (l2.virtual) return;
				const iss = l1.intersects(l2, curveIntersectionThreshold);
				if (iss.length > 0) {
					iss.c1 = l1;
					iss.c2 = l2;
					iss.s1 = s1;
					iss.s2 = s2;
					intersections.push(iss);
				}
			});
		});
		return intersections;
	},
	makeshape: function(forward, back, curveIntersectionThreshold) {
		const bpl = back.points.length;
		const fpl = forward.points.length;
		const start = utils.makeline(back.points[bpl - 1], forward.points[0]);
		const end = utils.makeline(forward.points[fpl - 1], back.points[0]);
		const shape = {
			startcap: start,
			forward,
			back,
			endcap: end,
			bbox: utils.findbbox([
				start,
				forward,
				back,
				end
			])
		};
		shape.intersections = function(s2) {
			return utils.shapeintersections(shape, shape.bbox, s2, s2.bbox, curveIntersectionThreshold);
		};
		return shape;
	},
	getminmax: function(curve, d, list) {
		if (!list) return {
			min: 0,
			max: 0
		};
		let min = nMax, max = nMin, t, c;
		if (list.indexOf(0) === -1) list = [0].concat(list);
		if (list.indexOf(1) === -1) list.push(1);
		for (let i = 0, len = list.length; i < len; i++) {
			t = list[i];
			c = curve.get(t);
			if (c[d] < min) min = c[d];
			if (c[d] > max) max = c[d];
		}
		return {
			min,
			mid: (min + max) / 2,
			max,
			size: max - min
		};
	},
	align: function(points, line) {
		const tx = line.p1.x, ty = line.p1.y, a = -atan2(line.p2.y - ty, line.p2.x - tx), d = function(v) {
			return {
				x: (v.x - tx) * cos$2(a) - (v.y - ty) * sin$2(a),
				y: (v.x - tx) * sin$2(a) + (v.y - ty) * cos$2(a)
			};
		};
		return points.map(d);
	},
	roots: function(points, line) {
		line = line || {
			p1: {
				x: 0,
				y: 0
			},
			p2: {
				x: 1,
				y: 0
			}
		};
		const order = points.length - 1;
		const aligned = utils.align(points, line);
		const reduce = function(t) {
			return 0 <= t && t <= 1;
		};
		if (order === 2) {
			const a = aligned[0].y, b = aligned[1].y, c = aligned[2].y, d = a - 2 * b + c;
			if (d !== 0) {
				const m1 = -sqrt$2(b * b - a * c), m2 = -a + b;
				return [-(m1 + m2) / d, -(-m1 + m2) / d].filter(reduce);
			} else if (b !== c && d === 0) return [(2 * b - c) / (2 * b - 2 * c)].filter(reduce);
			return [];
		}
		const pa = aligned[0].y, pb = aligned[1].y, pc = aligned[2].y, pd = aligned[3].y;
		let d = -pa + 3 * pb - 3 * pc + pd, a = 3 * pa - 6 * pb + 3 * pc, b = -3 * pa + 3 * pb, c = pa;
		if (utils.approximately(d, 0)) {
			if (utils.approximately(a, 0)) {
				if (utils.approximately(b, 0)) return [];
				return [-c / b].filter(reduce);
			}
			const q = sqrt$2(b * b - 4 * a * c), a2 = 2 * a;
			return [(q - b) / a2, (-b - q) / a2].filter(reduce);
		}
		a /= d;
		b /= d;
		c /= d;
		const p = (3 * b - a * a) / 3, p3 = p / 3, q = (2 * a * a * a - 9 * a * b + 27 * c) / 27, q2 = q / 2, discriminant = q2 * q2 + p3 * p3 * p3;
		let u1, v1, x1, x2, x3;
		if (discriminant < 0) {
			const mp3 = -p / 3, r = sqrt$2(mp3 * mp3 * mp3), t = -q / (2 * r), phi = acos$1(t < -1 ? -1 : t > 1 ? 1 : t), t1 = 2 * crt(r);
			x1 = t1 * cos$2(phi / 3) - a / 3;
			x2 = t1 * cos$2((phi + tau) / 3) - a / 3;
			x3 = t1 * cos$2((phi + 2 * tau) / 3) - a / 3;
			return [
				x1,
				x2,
				x3
			].filter(reduce);
		} else if (discriminant === 0) {
			u1 = q2 < 0 ? crt(-q2) : -crt(q2);
			x1 = 2 * u1 - a / 3;
			x2 = -u1 - a / 3;
			return [x1, x2].filter(reduce);
		} else {
			const sd = sqrt$2(discriminant);
			u1 = crt(-q2 + sd);
			v1 = crt(q2 + sd);
			return [u1 - v1 - a / 3].filter(reduce);
		}
	},
	droots: function(p) {
		if (p.length === 3) {
			const a = p[0], b = p[1], c = p[2], d = a - 2 * b + c;
			if (d !== 0) {
				const m1 = -sqrt$2(b * b - a * c), m2 = -a + b;
				return [-(m1 + m2) / d, -(-m1 + m2) / d];
			} else if (b !== c && d === 0) return [(2 * b - c) / (2 * (b - c))];
			return [];
		}
		if (p.length === 2) {
			const a = p[0], b = p[1];
			if (a !== b) return [a / (a - b)];
			return [];
		}
		return [];
	},
	curvature: function(t, d1, d2, _3d, kOnly) {
		let num, dnm, adk, dk, k = 0, r = 0;
		const d = utils.compute(t, d1);
		const dd = utils.compute(t, d2);
		const qdsum = d.x * d.x + d.y * d.y;
		if (_3d) {
			num = sqrt$2(pow$1(d.y * dd.z - dd.y * d.z, 2) + pow$1(d.z * dd.x - dd.z * d.x, 2) + pow$1(d.x * dd.y - dd.x * d.y, 2));
			dnm = pow$1(qdsum + d.z * d.z, 3 / 2);
		} else {
			num = d.x * dd.y - d.y * dd.x;
			dnm = pow$1(qdsum, 3 / 2);
		}
		if (num === 0 || dnm === 0) return {
			k: 0,
			r: 0
		};
		k = num / dnm;
		r = dnm / num;
		if (!kOnly) {
			const pk = utils.curvature(t - .001, d1, d2, _3d, true).k;
			const nk = utils.curvature(t + .001, d1, d2, _3d, true).k;
			dk = (nk - k + (k - pk)) / 2;
			adk = (abs$1(nk - k) + abs$1(k - pk)) / 2;
		}
		return {
			k,
			r,
			dk,
			adk
		};
	},
	inflections: function(points) {
		if (points.length < 4) return [];
		const p = utils.align(points, {
			p1: points[0],
			p2: points.slice(-1)[0]
		}), a = p[2].x * p[1].y, b = p[3].x * p[1].y, c = p[1].x * p[2].y, d = p[3].x * p[2].y, v1 = 18 * (-3 * a + 2 * b + 3 * c - d), v2 = 18 * (3 * a - b - 3 * c), v3 = 18 * (c - a);
		if (utils.approximately(v1, 0)) {
			if (!utils.approximately(v2, 0)) {
				let t = -v3 / v2;
				if (0 <= t && t <= 1) return [t];
			}
			return [];
		}
		const d2 = 2 * v1;
		if (utils.approximately(d2, 0)) return [];
		const trm = v2 * v2 - 4 * v1 * v3;
		if (trm < 0) return [];
		const sq = Math.sqrt(trm);
		return [(sq - v2) / d2, -(v2 + sq) / d2].filter(function(r) {
			return 0 <= r && r <= 1;
		});
	},
	bboxoverlap: function(b1, b2) {
		const dims = ["x", "y"], len = dims.length;
		for (let i = 0, dim, l, t, d; i < len; i++) {
			dim = dims[i];
			l = b1[dim].mid;
			t = b2[dim].mid;
			d = (b1[dim].size + b2[dim].size) / 2;
			if (abs$1(l - t) >= d) return false;
		}
		return true;
	},
	expandbox: function(bbox, _bbox) {
		if (_bbox.x.min < bbox.x.min) bbox.x.min = _bbox.x.min;
		if (_bbox.y.min < bbox.y.min) bbox.y.min = _bbox.y.min;
		if (_bbox.z && _bbox.z.min < bbox.z.min) bbox.z.min = _bbox.z.min;
		if (_bbox.x.max > bbox.x.max) bbox.x.max = _bbox.x.max;
		if (_bbox.y.max > bbox.y.max) bbox.y.max = _bbox.y.max;
		if (_bbox.z && _bbox.z.max > bbox.z.max) bbox.z.max = _bbox.z.max;
		bbox.x.mid = (bbox.x.min + bbox.x.max) / 2;
		bbox.y.mid = (bbox.y.min + bbox.y.max) / 2;
		if (bbox.z) bbox.z.mid = (bbox.z.min + bbox.z.max) / 2;
		bbox.x.size = bbox.x.max - bbox.x.min;
		bbox.y.size = bbox.y.max - bbox.y.min;
		if (bbox.z) bbox.z.size = bbox.z.max - bbox.z.min;
	},
	pairiteration: function(c1, c2, curveIntersectionThreshold) {
		const c1b = c1.bbox(), c2b = c2.bbox(), r = 1e5, threshold = curveIntersectionThreshold || .5;
		if (c1b.x.size + c1b.y.size < threshold && c2b.x.size + c2b.y.size < threshold) return [(r * (c1._t1 + c1._t2) / 2 | 0) / r + "/" + (r * (c2._t1 + c2._t2) / 2 | 0) / r];
		let cc1 = c1.split(.5), cc2 = c2.split(.5), pairs = [
			{
				left: cc1.left,
				right: cc2.left
			},
			{
				left: cc1.left,
				right: cc2.right
			},
			{
				left: cc1.right,
				right: cc2.right
			},
			{
				left: cc1.right,
				right: cc2.left
			}
		];
		pairs = pairs.filter(function(pair) {
			return utils.bboxoverlap(pair.left.bbox(), pair.right.bbox());
		});
		let results = [];
		if (pairs.length === 0) return results;
		pairs.forEach(function(pair) {
			results = results.concat(utils.pairiteration(pair.left, pair.right, threshold));
		});
		results = results.filter(function(v, i) {
			return results.indexOf(v) === i;
		});
		return results;
	},
	getccenter: function(p1, p2, p3) {
		const dx1 = p2.x - p1.x, dy1 = p2.y - p1.y, dx2 = p3.x - p2.x, dy2 = p3.y - p2.y, dx1p = dx1 * cos$2(quart) - dy1 * sin$2(quart), dy1p = dx1 * sin$2(quart) + dy1 * cos$2(quart), dx2p = dx2 * cos$2(quart) - dy2 * sin$2(quart), dy2p = dx2 * sin$2(quart) + dy2 * cos$2(quart), mx1 = (p1.x + p2.x) / 2, my1 = (p1.y + p2.y) / 2, mx2 = (p2.x + p3.x) / 2, my2 = (p2.y + p3.y) / 2, mx1n = mx1 + dx1p, my1n = my1 + dy1p, mx2n = mx2 + dx2p, my2n = my2 + dy2p, arc = utils.lli8(mx1, my1, mx1n, my1n, mx2, my2, mx2n, my2n), r = utils.dist(arc, p1);
		let s = atan2(p1.y - arc.y, p1.x - arc.x), m = atan2(p2.y - arc.y, p2.x - arc.x), e = atan2(p3.y - arc.y, p3.x - arc.x), _;
		if (s < e) {
			if (s > m || m > e) s += tau;
			if (s > e) {
				_ = e;
				e = s;
				s = _;
			}
		} else if (e < m && m < s) {
			_ = e;
			e = s;
			s = _;
		} else e += tau;
		arc.s = s;
		arc.e = e;
		arc.r = r;
		return arc;
	},
	numberSort: function(a, b) {
		return a - b;
	}
};

//#endregion
//#region ../node_modules/.pnpm/bezier-js@6.1.4/node_modules/bezier-js/src/poly-bezier.js
/**
* Poly Bezier
* @param {[type]} curves [description]
*/
var PolyBezier = class PolyBezier {
	constructor(curves) {
		this.curves = [];
		this._3d = false;
		if (!!curves) {
			this.curves = curves;
			this._3d = this.curves[0]._3d;
		}
	}
	valueOf() {
		return this.toString();
	}
	toString() {
		return "[" + this.curves.map(function(curve) {
			return utils.pointsToString(curve.points);
		}).join(", ") + "]";
	}
	addCurve(curve) {
		this.curves.push(curve);
		this._3d = this._3d || curve._3d;
	}
	length() {
		return this.curves.map(function(v) {
			return v.length();
		}).reduce(function(a, b) {
			return a + b;
		});
	}
	curve(idx) {
		return this.curves[idx];
	}
	bbox() {
		const c = this.curves;
		var bbox = c[0].bbox();
		for (var i = 1; i < c.length; i++) utils.expandbox(bbox, c[i].bbox());
		return bbox;
	}
	offset(d) {
		const offset = [];
		this.curves.forEach(function(v) {
			offset.push(...v.offset(d));
		});
		return new PolyBezier(offset);
	}
};

//#endregion
//#region ../node_modules/.pnpm/bezier-js@6.1.4/node_modules/bezier-js/src/bezier.js
/**
A javascript Bezier curve library by Pomax.

Based on http://pomax.github.io/bezierinfo

This code is MIT licensed.
**/
const { abs, min, max, cos: cos$1, sin: sin$1, acos, sqrt: sqrt$1 } = Math;
const pi$1 = Math.PI;
/**
* Bezier curve constructor.
*
* ...docs pending...
*/
var Bezier = class Bezier {
	constructor(coords) {
		let args = coords && coords.forEach ? coords : Array.from(arguments).slice();
		let coordlen = false;
		if (typeof args[0] === "object") {
			coordlen = args.length;
			const newargs = [];
			args.forEach(function(point) {
				[
					"x",
					"y",
					"z"
				].forEach(function(d) {
					if (typeof point[d] !== "undefined") newargs.push(point[d]);
				});
			});
			args = newargs;
		}
		let higher = false;
		const len = args.length;
		if (coordlen) {
			if (coordlen > 4) {
				if (arguments.length !== 1) throw new Error("Only new Bezier(point[]) is accepted for 4th and higher order curves");
				higher = true;
			}
		} else if (len !== 6 && len !== 8 && len !== 9 && len !== 12) {
			if (arguments.length !== 1) throw new Error("Only new Bezier(point[]) is accepted for 4th and higher order curves");
		}
		const _3d = this._3d = !higher && (len === 9 || len === 12) || coords && coords[0] && typeof coords[0].z !== "undefined";
		const points = this.points = [];
		for (let idx = 0, step = _3d ? 3 : 2; idx < len; idx += step) {
			var point = {
				x: args[idx],
				y: args[idx + 1]
			};
			if (_3d) point.z = args[idx + 2];
			points.push(point);
		}
		const order = this.order = points.length - 1;
		const dims = this.dims = ["x", "y"];
		if (_3d) dims.push("z");
		this.dimlen = dims.length;
		const aligned = utils.align(points, {
			p1: points[0],
			p2: points[order]
		});
		const baselength = utils.dist(points[0], points[order]);
		this._linear = aligned.reduce((t, p) => t + abs(p.y), 0) < baselength / 50;
		this._lut = [];
		this._t1 = 0;
		this._t2 = 1;
		this.update();
	}
	static quadraticFromPoints(p1, p2, p3, t) {
		if (typeof t === "undefined") t = .5;
		if (t === 0) return new Bezier(p2, p2, p3);
		if (t === 1) return new Bezier(p1, p2, p2);
		return new Bezier(p1, Bezier.getABC(2, p1, p2, p3, t).A, p3);
	}
	static cubicFromPoints(S, B, E, t, d1) {
		if (typeof t === "undefined") t = .5;
		const abc = Bezier.getABC(3, S, B, E, t);
		if (typeof d1 === "undefined") d1 = utils.dist(B, abc.C);
		const d2 = d1 * (1 - t) / t;
		const selen = utils.dist(S, E), lx = (E.x - S.x) / selen, ly = (E.y - S.y) / selen, bx1 = d1 * lx, by1 = d1 * ly, bx2 = d2 * lx, by2 = d2 * ly;
		const e1 = {
			x: B.x - bx1,
			y: B.y - by1
		}, e2 = {
			x: B.x + bx2,
			y: B.y + by2
		}, A = abc.A, v1 = {
			x: A.x + (e1.x - A.x) / (1 - t),
			y: A.y + (e1.y - A.y) / (1 - t)
		}, v2 = {
			x: A.x + (e2.x - A.x) / t,
			y: A.y + (e2.y - A.y) / t
		};
		return new Bezier(S, {
			x: S.x + (v1.x - S.x) / t,
			y: S.y + (v1.y - S.y) / t
		}, {
			x: E.x + (v2.x - E.x) / (1 - t),
			y: E.y + (v2.y - E.y) / (1 - t)
		}, E);
	}
	static getUtils() {
		return utils;
	}
	getUtils() {
		return Bezier.getUtils();
	}
	static get PolyBezier() {
		return PolyBezier;
	}
	valueOf() {
		return this.toString();
	}
	toString() {
		return utils.pointsToString(this.points);
	}
	toSVG() {
		if (this._3d) return false;
		const p = this.points, s = [
			"M",
			p[0].x,
			p[0].y,
			this.order === 2 ? "Q" : "C"
		];
		for (let i = 1, last = p.length; i < last; i++) {
			s.push(p[i].x);
			s.push(p[i].y);
		}
		return s.join(" ");
	}
	setRatios(ratios) {
		if (ratios.length !== this.points.length) throw new Error("incorrect number of ratio values");
		this.ratios = ratios;
		this._lut = [];
	}
	verify() {
		const print = this.coordDigest();
		if (print !== this._print) {
			this._print = print;
			this.update();
		}
	}
	coordDigest() {
		return this.points.map(function(c, pos) {
			return "" + pos + c.x + c.y + (c.z ? c.z : 0);
		}).join("");
	}
	update() {
		this._lut = [];
		this.dpoints = utils.derive(this.points, this._3d);
		this.computedirection();
	}
	computedirection() {
		const points = this.points;
		this.clockwise = utils.angle(points[0], points[this.order], points[1]) > 0;
	}
	length() {
		return utils.length(this.derivative.bind(this));
	}
	static getABC(order = 2, S, B, E, t = .5) {
		const u = utils.projectionratio(t, order), um = 1 - u, C = {
			x: u * S.x + um * E.x,
			y: u * S.y + um * E.y
		}, s = utils.abcratio(t, order);
		return {
			A: {
				x: B.x + (B.x - C.x) / s,
				y: B.y + (B.y - C.y) / s
			},
			B,
			C,
			S,
			E
		};
	}
	getABC(t, B) {
		B = B || this.get(t);
		let S = this.points[0];
		let E = this.points[this.order];
		return Bezier.getABC(this.order, S, B, E, t);
	}
	getLUT(steps) {
		this.verify();
		steps = steps || 100;
		if (this._lut.length === steps + 1) return this._lut;
		this._lut = [];
		steps++;
		this._lut = [];
		for (let i = 0, p, t; i < steps; i++) {
			t = i / (steps - 1);
			p = this.compute(t);
			p.t = t;
			this._lut.push(p);
		}
		return this._lut;
	}
	on(point, error) {
		error = error || 5;
		const lut = this.getLUT(), hits = [];
		for (let i = 0, c, t = 0; i < lut.length; i++) {
			c = lut[i];
			if (utils.dist(c, point) < error) {
				hits.push(c);
				t += i / lut.length;
			}
		}
		if (!hits.length) return false;
		return t /= hits.length;
	}
	project(point) {
		const LUT = this.getLUT(), l = LUT.length - 1, closest = utils.closest(LUT, point), mpos = closest.mpos, t1 = (mpos - 1) / l, t2 = (mpos + 1) / l, step = .1 / l;
		let mdist = closest.mdist, t = t1, ft = t, p;
		mdist += 1;
		for (let d; t < t2 + step; t += step) {
			p = this.compute(t);
			d = utils.dist(point, p);
			if (d < mdist) {
				mdist = d;
				ft = t;
			}
		}
		ft = ft < 0 ? 0 : ft > 1 ? 1 : ft;
		p = this.compute(ft);
		p.t = ft;
		p.d = mdist;
		return p;
	}
	get(t) {
		return this.compute(t);
	}
	point(idx) {
		return this.points[idx];
	}
	compute(t) {
		if (this.ratios) return utils.computeWithRatios(t, this.points, this.ratios, this._3d);
		return utils.compute(t, this.points, this._3d, this.ratios);
	}
	raise() {
		const p = this.points, np = [p[0]], k = p.length;
		for (let i = 1, pi, pim; i < k; i++) {
			pi = p[i];
			pim = p[i - 1];
			np[i] = {
				x: (k - i) / k * pi.x + i / k * pim.x,
				y: (k - i) / k * pi.y + i / k * pim.y
			};
		}
		np[k] = p[k - 1];
		return new Bezier(np);
	}
	derivative(t) {
		return utils.compute(t, this.dpoints[0], this._3d);
	}
	dderivative(t) {
		return utils.compute(t, this.dpoints[1], this._3d);
	}
	align() {
		let p = this.points;
		return new Bezier(utils.align(p, {
			p1: p[0],
			p2: p[p.length - 1]
		}));
	}
	curvature(t) {
		return utils.curvature(t, this.dpoints[0], this.dpoints[1], this._3d);
	}
	inflections() {
		return utils.inflections(this.points);
	}
	normal(t) {
		return this._3d ? this.__normal3(t) : this.__normal2(t);
	}
	__normal2(t) {
		const d = this.derivative(t);
		const q = sqrt$1(d.x * d.x + d.y * d.y);
		return {
			t,
			x: -d.y / q,
			y: d.x / q
		};
	}
	__normal3(t) {
		const r1 = this.derivative(t), r2 = this.derivative(t + .01), q1 = sqrt$1(r1.x * r1.x + r1.y * r1.y + r1.z * r1.z), q2 = sqrt$1(r2.x * r2.x + r2.y * r2.y + r2.z * r2.z);
		r1.x /= q1;
		r1.y /= q1;
		r1.z /= q1;
		r2.x /= q2;
		r2.y /= q2;
		r2.z /= q2;
		const c = {
			x: r2.y * r1.z - r2.z * r1.y,
			y: r2.z * r1.x - r2.x * r1.z,
			z: r2.x * r1.y - r2.y * r1.x
		};
		const m = sqrt$1(c.x * c.x + c.y * c.y + c.z * c.z);
		c.x /= m;
		c.y /= m;
		c.z /= m;
		const R = [
			c.x * c.x,
			c.x * c.y - c.z,
			c.x * c.z + c.y,
			c.x * c.y + c.z,
			c.y * c.y,
			c.y * c.z - c.x,
			c.x * c.z - c.y,
			c.y * c.z + c.x,
			c.z * c.z
		];
		return {
			t,
			x: R[0] * r1.x + R[1] * r1.y + R[2] * r1.z,
			y: R[3] * r1.x + R[4] * r1.y + R[5] * r1.z,
			z: R[6] * r1.x + R[7] * r1.y + R[8] * r1.z
		};
	}
	hull(t) {
		let p = this.points, _p = [], q = [], idx = 0;
		q[idx++] = p[0];
		q[idx++] = p[1];
		q[idx++] = p[2];
		if (this.order === 3) q[idx++] = p[3];
		while (p.length > 1) {
			_p = [];
			for (let i = 0, pt, l = p.length - 1; i < l; i++) {
				pt = utils.lerp(t, p[i], p[i + 1]);
				q[idx++] = pt;
				_p.push(pt);
			}
			p = _p;
		}
		return q;
	}
	split(t1, t2) {
		if (t1 === 0 && !!t2) return this.split(t2).left;
		if (t2 === 1) return this.split(t1).right;
		const q = this.hull(t1);
		const result = {
			left: this.order === 2 ? new Bezier([
				q[0],
				q[3],
				q[5]
			]) : new Bezier([
				q[0],
				q[4],
				q[7],
				q[9]
			]),
			right: this.order === 2 ? new Bezier([
				q[5],
				q[4],
				q[2]
			]) : new Bezier([
				q[9],
				q[8],
				q[6],
				q[3]
			]),
			span: q
		};
		result.left._t1 = utils.map(0, 0, 1, this._t1, this._t2);
		result.left._t2 = utils.map(t1, 0, 1, this._t1, this._t2);
		result.right._t1 = utils.map(t1, 0, 1, this._t1, this._t2);
		result.right._t2 = utils.map(1, 0, 1, this._t1, this._t2);
		if (!t2) return result;
		t2 = utils.map(t2, t1, 1, 0, 1);
		return result.right.split(t2).left;
	}
	extrema() {
		const result = {};
		let roots = [];
		this.dims.forEach(function(dim) {
			let mfn = function(v) {
				return v[dim];
			};
			let p = this.dpoints[0].map(mfn);
			result[dim] = utils.droots(p);
			if (this.order === 3) {
				p = this.dpoints[1].map(mfn);
				result[dim] = result[dim].concat(utils.droots(p));
			}
			result[dim] = result[dim].filter(function(t) {
				return t >= 0 && t <= 1;
			});
			roots = roots.concat(result[dim].sort(utils.numberSort));
		}.bind(this));
		result.values = roots.sort(utils.numberSort).filter(function(v, idx) {
			return roots.indexOf(v) === idx;
		});
		return result;
	}
	bbox() {
		const extrema = this.extrema(), result = {};
		this.dims.forEach(function(d) {
			result[d] = utils.getminmax(this, d, extrema[d]);
		}.bind(this));
		return result;
	}
	overlaps(curve) {
		const lbbox = this.bbox(), tbbox = curve.bbox();
		return utils.bboxoverlap(lbbox, tbbox);
	}
	offset(t, d) {
		if (typeof d !== "undefined") {
			const c = this.get(t), n = this.normal(t);
			const ret = {
				c,
				n,
				x: c.x + n.x * d,
				y: c.y + n.y * d
			};
			if (this._3d) ret.z = c.z + n.z * d;
			return ret;
		}
		if (this._linear) {
			const nv = this.normal(0);
			return [new Bezier(this.points.map(function(p) {
				const ret = {
					x: p.x + t * nv.x,
					y: p.y + t * nv.y
				};
				if (p.z && nv.z) ret.z = p.z + t * nv.z;
				return ret;
			}))];
		}
		return this.reduce().map(function(s) {
			if (s._linear) return s.offset(t)[0];
			return s.scale(t);
		});
	}
	simple() {
		if (this.order === 3) {
			const a1 = utils.angle(this.points[0], this.points[3], this.points[1]);
			const a2 = utils.angle(this.points[0], this.points[3], this.points[2]);
			if (a1 > 0 && a2 < 0 || a1 < 0 && a2 > 0) return false;
		}
		const n1 = this.normal(0);
		const n2 = this.normal(1);
		let s = n1.x * n2.x + n1.y * n2.y;
		if (this._3d) s += n1.z * n2.z;
		return abs(acos(s)) < pi$1 / 3;
	}
	reduce() {
		let i, t1 = 0, t2 = 0, step = .01, segment, pass1 = [], pass2 = [];
		let extrema = this.extrema().values;
		if (extrema.indexOf(0) === -1) extrema = [0].concat(extrema);
		if (extrema.indexOf(1) === -1) extrema.push(1);
		for (t1 = extrema[0], i = 1; i < extrema.length; i++) {
			t2 = extrema[i];
			segment = this.split(t1, t2);
			segment._t1 = t1;
			segment._t2 = t2;
			pass1.push(segment);
			t1 = t2;
		}
		pass1.forEach(function(p1) {
			t1 = 0;
			t2 = 0;
			while (t2 <= 1) for (t2 = t1 + step; t2 <= 1 + step; t2 += step) {
				segment = p1.split(t1, t2);
				if (!segment.simple()) {
					t2 -= step;
					if (abs(t1 - t2) < step) return [];
					segment = p1.split(t1, t2);
					segment._t1 = utils.map(t1, 0, 1, p1._t1, p1._t2);
					segment._t2 = utils.map(t2, 0, 1, p1._t1, p1._t2);
					pass2.push(segment);
					t1 = t2;
					break;
				}
			}
			if (t1 < 1) {
				segment = p1.split(t1, 1);
				segment._t1 = utils.map(t1, 0, 1, p1._t1, p1._t2);
				segment._t2 = p1._t2;
				pass2.push(segment);
			}
		});
		return pass2;
	}
	translate(v, d1, d2) {
		d2 = typeof d2 === "number" ? d2 : d1;
		const o = this.order;
		let d = this.points.map((_, i) => (1 - i / o) * d1 + i / o * d2);
		return new Bezier(this.points.map((p, i) => ({
			x: p.x + v.x * d[i],
			y: p.y + v.y * d[i]
		})));
	}
	scale(d) {
		const order = this.order;
		let distanceFn = false;
		if (typeof d === "function") distanceFn = d;
		if (distanceFn && order === 2) return this.raise().scale(distanceFn);
		const clockwise = this.clockwise;
		const points = this.points;
		if (this._linear) return this.translate(this.normal(0), distanceFn ? distanceFn(0) : d, distanceFn ? distanceFn(1) : d);
		const r1 = distanceFn ? distanceFn(0) : d;
		const r2 = distanceFn ? distanceFn(1) : d;
		const v = [this.offset(0, 10), this.offset(1, 10)];
		const np = [];
		const o = utils.lli4(v[0], v[0].c, v[1], v[1].c);
		if (!o) throw new Error("cannot scale this curve. Try reducing it first.");
		[0, 1].forEach(function(t) {
			const p = np[t * order] = utils.copy(points[t * order]);
			p.x += (t ? r2 : r1) * v[t].n.x;
			p.y += (t ? r2 : r1) * v[t].n.y;
		});
		if (!distanceFn) {
			[0, 1].forEach((t) => {
				if (order === 2 && !!t) return;
				const p = np[t * order];
				const d = this.derivative(t);
				const p2 = {
					x: p.x + d.x,
					y: p.y + d.y
				};
				np[t + 1] = utils.lli4(p, p2, o, points[t + 1]);
			});
			return new Bezier(np);
		}
		[0, 1].forEach(function(t) {
			if (order === 2 && !!t) return;
			var p = points[t + 1];
			var ov = {
				x: p.x - o.x,
				y: p.y - o.y
			};
			var rc = distanceFn ? distanceFn((t + 1) / order) : d;
			if (distanceFn && !clockwise) rc = -rc;
			var m = sqrt$1(ov.x * ov.x + ov.y * ov.y);
			ov.x /= m;
			ov.y /= m;
			np[t + 1] = {
				x: p.x + rc * ov.x,
				y: p.y + rc * ov.y
			};
		});
		return new Bezier(np);
	}
	outline(d1, d2, d3, d4) {
		d2 = d2 === void 0 ? d1 : d2;
		if (this._linear) {
			const n = this.normal(0);
			const start = this.points[0];
			const end = this.points[this.points.length - 1];
			let s, mid, e;
			if (d3 === void 0) {
				d3 = d1;
				d4 = d2;
			}
			s = {
				x: start.x + n.x * d1,
				y: start.y + n.y * d1
			};
			e = {
				x: end.x + n.x * d3,
				y: end.y + n.y * d3
			};
			mid = {
				x: (s.x + e.x) / 2,
				y: (s.y + e.y) / 2
			};
			const fline = [
				s,
				mid,
				e
			];
			s = {
				x: start.x - n.x * d2,
				y: start.y - n.y * d2
			};
			e = {
				x: end.x - n.x * d4,
				y: end.y - n.y * d4
			};
			mid = {
				x: (s.x + e.x) / 2,
				y: (s.y + e.y) / 2
			};
			const bline = [
				e,
				mid,
				s
			];
			const ls = utils.makeline(bline[2], fline[0]);
			const le = utils.makeline(fline[2], bline[0]);
			return new PolyBezier([
				ls,
				new Bezier(fline),
				le,
				new Bezier(bline)
			]);
		}
		const reduced = this.reduce(), len = reduced.length, fcurves = [];
		let bcurves = [], p, alen = 0, tlen = this.length();
		const graduated = typeof d3 !== "undefined" && typeof d4 !== "undefined";
		function linearDistanceFunction(s, e, tlen, alen, slen) {
			return function(v) {
				const f1 = alen / tlen, f2 = (alen + slen) / tlen, d = e - s;
				return utils.map(v, 0, 1, s + f1 * d, s + f2 * d);
			};
		}
		reduced.forEach(function(segment) {
			const slen = segment.length();
			if (graduated) {
				fcurves.push(segment.scale(linearDistanceFunction(d1, d3, tlen, alen, slen)));
				bcurves.push(segment.scale(linearDistanceFunction(-d2, -d4, tlen, alen, slen)));
			} else {
				fcurves.push(segment.scale(d1));
				bcurves.push(segment.scale(-d2));
			}
			alen += slen;
		});
		bcurves = bcurves.map(function(s) {
			p = s.points;
			if (p[3]) s.points = [
				p[3],
				p[2],
				p[1],
				p[0]
			];
			else s.points = [
				p[2],
				p[1],
				p[0]
			];
			return s;
		}).reverse();
		const fs = fcurves[0].points[0], fe = fcurves[len - 1].points[fcurves[len - 1].points.length - 1], bs = bcurves[len - 1].points[bcurves[len - 1].points.length - 1], be = bcurves[0].points[0], ls = utils.makeline(bs, fs), le = utils.makeline(fe, be);
		return new PolyBezier([ls].concat(fcurves).concat([le]).concat(bcurves));
	}
	outlineshapes(d1, d2, curveIntersectionThreshold) {
		d2 = d2 || d1;
		const outline = this.outline(d1, d2).curves;
		const shapes = [];
		for (let i = 1, len = outline.length; i < len / 2; i++) {
			const shape = utils.makeshape(outline[i], outline[len - i], curveIntersectionThreshold);
			shape.startcap.virtual = i > 1;
			shape.endcap.virtual = i < len / 2 - 1;
			shapes.push(shape);
		}
		return shapes;
	}
	intersects(curve, curveIntersectionThreshold) {
		if (!curve) return this.selfintersects(curveIntersectionThreshold);
		if (curve.p1 && curve.p2) return this.lineIntersects(curve);
		if (curve instanceof Bezier) curve = curve.reduce();
		return this.curveintersects(this.reduce(), curve, curveIntersectionThreshold);
	}
	lineIntersects(line) {
		const mx = min(line.p1.x, line.p2.x), my = min(line.p1.y, line.p2.y), MX = max(line.p1.x, line.p2.x), MY = max(line.p1.y, line.p2.y);
		return utils.roots(this.points, line).filter((t) => {
			var p = this.get(t);
			return utils.between(p.x, mx, MX) && utils.between(p.y, my, MY);
		});
	}
	selfintersects(curveIntersectionThreshold) {
		const reduced = this.reduce(), len = reduced.length - 2, results = [];
		for (let i = 0, result, left, right; i < len; i++) {
			left = reduced.slice(i, i + 1);
			right = reduced.slice(i + 2);
			result = this.curveintersects(left, right, curveIntersectionThreshold);
			results.push(...result);
		}
		return results;
	}
	curveintersects(c1, c2, curveIntersectionThreshold) {
		const pairs = [];
		c1.forEach(function(l) {
			c2.forEach(function(r) {
				if (l.overlaps(r)) pairs.push({
					left: l,
					right: r
				});
			});
		});
		let intersections = [];
		pairs.forEach(function(pair) {
			const result = utils.pairiteration(pair.left, pair.right, curveIntersectionThreshold);
			if (result.length > 0) intersections = intersections.concat(result);
		});
		return intersections;
	}
	arcs(errorThreshold) {
		errorThreshold = errorThreshold || .5;
		return this._iterate(errorThreshold, []);
	}
	_error(pc, np1, s, e) {
		const q = (e - s) / 4, c1 = this.get(s + q), c2 = this.get(e - q), ref = utils.dist(pc, np1), d1 = utils.dist(pc, c1), d2 = utils.dist(pc, c2);
		return abs(d1 - ref) + abs(d2 - ref);
	}
	_iterate(errorThreshold, circles) {
		let t_s = 0, t_e = 1, safety;
		do {
			safety = 0;
			t_e = 1;
			let np1 = this.get(t_s), np2, np3, arc, prev_arc;
			let curr_good = false, prev_good = false, done;
			let t_m = t_e, prev_e = 1, step = 0;
			do {
				prev_good = curr_good;
				prev_arc = arc;
				t_m = (t_s + t_e) / 2;
				step++;
				np2 = this.get(t_m);
				np3 = this.get(t_e);
				arc = utils.getccenter(np1, np2, np3);
				arc.interval = {
					start: t_s,
					end: t_e
				};
				curr_good = this._error(arc, np1, t_s, t_e) <= errorThreshold;
				done = prev_good && !curr_good;
				if (!done) prev_e = t_e;
				if (curr_good) {
					if (t_e >= 1) {
						arc.interval.end = prev_e = 1;
						prev_arc = arc;
						if (t_e > 1) {
							let d = {
								x: arc.x + arc.r * cos$1(arc.e),
								y: arc.y + arc.r * sin$1(arc.e)
							};
							arc.e += utils.angle({
								x: arc.x,
								y: arc.y
							}, d, this.get(1));
						}
						break;
					}
					t_e = t_e + (t_e - t_s) / 2;
				} else t_e = t_m;
			} while (!done && safety++ < 100);
			if (safety >= 100) break;
			prev_arc = prev_arc ? prev_arc : arc;
			circles.push(prev_arc);
			t_s = prev_e;
		} while (t_e < 1);
		return circles;
	}
};

//#endregion
//#region ../packages/geometry/src/bezier/guard.ts
const isQuadraticBezier = (path) => path.quadratic !== void 0;
const isCubicBezier = (path) => path.cubic1 !== void 0 && path.cubic2 !== void 0;

//#endregion
//#region ../packages/geometry/src/bezier/index.ts
var bezier_exports = /* @__PURE__ */ __exportAll({
	cubic: () => cubic,
	interpolator: () => interpolator,
	isCubicBezier: () => isCubicBezier,
	isQuadraticBezier: () => isQuadraticBezier,
	quadratic: () => quadratic,
	quadraticSimple: () => quadraticSimple,
	quadraticToSvgString: () => quadraticToSvgString,
	toPath: () => toPath$1
});
/**
* Returns a new quadratic bezier with specified bend amount
*
* @param {QuadraticBezier} b Curve
* @param {number} [bend=0] Bend amount, from -1 to 1
* @returns {QuadraticBezier}
*/
/**
* Creates a simple quadratic bezier with a specified amount of 'bend'.
* Bend of -1 will pull curve down, 1 will pull curve up. 0 is no curve.
* 
* Use {@link interpolator} to calculate a point along the curve.
* @param {Point} start Start of curve
* @param {Point} end End of curve
* @param {number} [bend=0] Bend amount, -1 to 1
* @returns {QuadraticBezier}
*/
const quadraticSimple = (start, end, bend = 0) => {
	if (Number.isNaN(bend)) throw new Error(`bend is NaN`);
	if (bend < -1 || bend > 1) throw new Error(`Expects bend range of -1 to 1`);
	const middle = interpolate$4(.5, start, end);
	let target = middle;
	if (end.y < start.y) target = bend > 0 ? {
		x: Math.min(start.x, end.x),
		y: Math.min(start.y, end.y)
	} : {
		x: Math.max(start.x, end.x),
		y: Math.max(start.y, end.y)
	};
	else target = bend > 0 ? {
		x: Math.max(start.x, end.x),
		y: Math.min(start.y, end.y)
	} : {
		x: Math.min(start.x, end.x),
		y: Math.max(start.y, end.y)
	};
	return quadratic(start, end, interpolate$4(Math.abs(bend), middle, target));
};
/**
* Returns a relative point on a simple quadratic 
* @param start Start
* @param end  End
* @param bend Bend (-1 to 1)
* @param amt Amount
* @returns Point
*/
/**
* Interpolate cubic or quadratic bezier
* ```js
* const i = interpolator(myBezier);
* 
* // Get point at 50%
* i(0.5); // { x, y }
* ```
* @param q 
* @returns 
*/
const interpolator = (q) => {
	const bzr = isCubicBezier(q) ? new Bezier(q.a.x, q.a.y, q.cubic1.x, q.cubic1.y, q.cubic2.x, q.cubic2.y, q.b.x, q.b.y) : new Bezier(q.a, q.quadratic, q.b);
	return (amount) => bzr.compute(amount);
};
const quadraticToSvgString = (start, end, handle) => [`M ${start.x} ${start.y} Q ${handle.x} ${handle.y} ${end.x} ${end.y}`];
const toPath$1 = (cubicOrQuadratic) => {
	if (isCubicBezier(cubicOrQuadratic)) return cubicToPath(cubicOrQuadratic);
	else if (isQuadraticBezier(cubicOrQuadratic)) return quadratictoPath(cubicOrQuadratic);
	else throw new Error(`Unknown bezier type`);
};
const cubic = (start, end, cubic1, cubic2) => ({
	a: Object.freeze(start),
	b: Object.freeze(end),
	cubic1: Object.freeze(cubic1),
	cubic2: Object.freeze(cubic2)
});
const cubicToPath = (cubic) => {
	const { a, cubic1, cubic2, b } = cubic;
	const bzr = new Bezier(a, cubic1, cubic2, b);
	return Object.freeze({
		...cubic,
		length: () => bzr.length(),
		interpolate: (t) => bzr.compute(t),
		nearest: (_) => {
			throw new Error(`not implemented`);
		},
		bbox: () => {
			const { x, y } = bzr.bbox();
			const xSize = x.size;
			const ySize = y.size;
			if (xSize === void 0) throw new Error(`x.size not present on calculated bbox`);
			if (ySize === void 0) throw new Error(`x.size not present on calculated bbox`);
			return fromTopLeft({
				x: x.min,
				y: y.min
			}, xSize, ySize);
		},
		relativePosition: (_point, _intersectionThreshold) => {
			throw new Error(`Not implemented`);
		},
		distanceToPoint: (_point) => {
			throw new Error(`Not implemented`);
		},
		toSvgString: () => [`brrup`],
		kind: `bezier/cubic`
	});
};
const quadratic = (start, end, handle) => ({
	a: Object.freeze(start),
	b: Object.freeze(end),
	quadratic: Object.freeze(handle)
});
const quadratictoPath = (quadraticBezier) => {
	const { a, b, quadratic } = quadraticBezier;
	const bzr = new Bezier(a, quadratic, b);
	return Object.freeze({
		...quadraticBezier,
		length: () => bzr.length(),
		interpolate: (t) => bzr.compute(t),
		nearest: (_) => {
			throw new Error(`not implemented`);
		},
		bbox: () => {
			const { x, y } = bzr.bbox();
			const xSize = x.size;
			const ySize = y.size;
			if (xSize === void 0) throw new Error(`x.size not present on calculated bbox`);
			if (ySize === void 0) throw new Error(`x.size not present on calculated bbox`);
			return fromTopLeft({
				x: x.min,
				y: y.min
			}, xSize, ySize);
		},
		distanceToPoint: (_point) => {
			throw new Error(`Not implemented`);
		},
		relativePosition: (_point, _intersectionThreshold) => {
			throw new Error(`Not implemented`);
		},
		toString: () => bzr.toString(),
		toSvgString: () => quadraticToSvgString(a, b, quadratic),
		kind: `bezier/quadratic`
	});
};

//#endregion
//#region ../packages/geometry/src/circle/area.ts
/**
* Returns the area of `circle`.
* @param circle 
* @returns 
*/
const area$4 = (circle) => {
	guard$3(circle);
	return Math.PI * circle.radius * circle.radius;
};

//#endregion
//#region ../packages/geometry/src/circle/bbox.ts
/**
* Computes a bounding box that encloses circle
* @param circle
* @returns 
*/
const bbox$2 = (circle) => {
	return isCirclePositioned(circle) ? fromCenter$2(circle, circle.radius * 2, circle.radius * 2) : {
		width: circle.radius * 2,
		height: circle.radius * 2,
		x: 0,
		y: 0
	};
};

//#endregion
//#region ../packages/geometry/src/circle/center.ts
/**
* Returns the center of a circle
* 
* If the circle has an x,y, that is the center.
* If not, `radius` is used as the x and y.
* 
* ```js
* const circle = { radius: 5, x: 10, y: 10};
* 
* // Yields: { x: 5, y: 10 }
* Circles.center(circle);
* ```
* 
* It's a trivial function, but can make for more understandable code
* @param circle 
* @returns Center of circle
*/
const center$1 = (circle) => {
	return isCirclePositioned(circle) ? Object.freeze({
		x: circle.x,
		y: circle.y
	}) : Object.freeze({
		x: circle.radius,
		y: circle.radius
	});
};

//#endregion
//#region ../packages/geometry/src/circle/exterior-points.ts
/**
* Yields the points making up the exterior (ie. circumference) of the circle.
* Uses [Midpoint Circle Algorithm](http://en.wikipedia.org/wiki/Midpoint_circle_algorithm)
* 
* @example Draw outline of circle
* ```js
* const circle = { x: 100, y: 100, radius: 50 }
* for (const pt of Circles.exteriorIntegerPoints(circle)) {
*  // Fill 1x1 pixel
*  ctx.fillRect(pt.x, pt.y, 1, 1);
* }
* ```
* @param circle 
*/
function* exteriorIntegerPoints(circle) {
	const { x, y, radius } = circle;
	let xx = radius;
	let yy = 0;
	let radiusError = 1 - x;
	while (xx >= yy) {
		yield {
			x: xx + x,
			y: yy + y
		};
		yield {
			x: yy + x,
			y: xx + y
		};
		yield {
			x: -xx + x,
			y: yy + y
		};
		yield {
			x: -yy + x,
			y: xx + y
		};
		yield {
			x: -xx + x,
			y: -yy + y
		};
		yield {
			x: -yy + x,
			y: -xx + y
		};
		yield {
			x: xx + x,
			y: -yy + y
		};
		yield {
			x: yy + x,
			y: -xx + y
		};
		yy++;
		if (radiusError < 0) radiusError += 2 * yy + 1;
		else {
			xx--;
			radiusError += 2 * (yy - xx + 1);
		}
	}
}

//#endregion
//#region ../packages/geometry/src/circle/interior-points.ts
/**
* Returns all integer points contained within `circle`.
* 
* ```js
* const c = { x:100, y:100, radius:100 };
* for (const pt of Circles.interiorIntegerPoints(c)) {
*   ctx.fillRect(pt.x, pt.y, 1, 1);
* }
* ```
* @param circle 
*/
function* interiorIntegerPoints(circle) {
	const xMin = circle.x - circle.radius;
	const xMax = circle.x + circle.radius;
	const yMin = circle.y - circle.radius;
	const yMax = circle.y + circle.radius;
	for (let x = xMin; x < xMax; x++) for (let y = yMin; y < yMax; y++) if (Math.abs(distance$2(circle, x, y)) <= circle.radius) yield {
		x,
		y
	};
}

//#endregion
//#region ../packages/geometry/src/circle/perimeter.ts
const piPi$3 = Math.PI * 2;
/**
* Returns the nearest point on `circle`'s perimeter closest to `point`.
* 
* ```js
* const pt = Circles.nearest(circle, {x:10,y:10});
* ```
* 
* If an array of circles is provided, it will be the closest point amongst all the circles
* @param circle Circle or array of circles
* @param point
* @returns Point `{ x, y }`
*/
const nearest = (circle, point) => {
	const n = (a) => {
		const l = Math.sqrt(Math.pow(point.x - a.x, 2) + Math.pow(point.y - a.y, 2));
		return {
			x: a.x + a.radius * ((point.x - a.x) / l),
			y: a.y + a.radius * ((point.y - a.y) / l)
		};
	};
	if (Array.isArray(circle)) {
		const pts = circle.map((l) => n(l));
		const dists = pts.map((p) => distance$2(p, point));
		return Object.freeze(pts[minIndex(dists)]);
	} else return Object.freeze(n(circle));
};
/**
* Returns a point on a circle's perimeter at a specified angle in radians
* 
* ```js
* // Circle without position
* const circleA = { radius: 5 };
* 
* // Get point at angle Math.PI, passing in a origin coordinate
* const ptA = Circles.pointOnPerimeter(circleA, Math.PI, {x: 10, y: 10 });
* 
* // Point on circle with position
* const circleB = { radius: 5, x: 10, y: 10};
* const ptB = Circles.pointOnPerimeter(circleB, Math.PI);
* ```
* @param circle
* @param angleRadian Angle in radians
* @param origin or offset of calculated point. By default uses center of circle or 0,0 if undefined
* @returns Point oo circle
*/
const pointOnPerimeter = (circle, angleRadian, origin) => {
	origin ??= isCirclePositioned(circle) ? circle : {
		x: 0,
		y: 0
	};
	return {
		x: Math.cos(-angleRadian) * circle.radius + origin.x,
		y: Math.sin(-angleRadian) * circle.radius + origin.y
	};
};
/**
* Returns circumference of `circle` (alias of {@link length})
* @param circle 
* @returns 
*/
const circumference = (circle) => {
	guard$3(circle);
	return piPi$3 * circle.radius;
};
/**
* Returns circumference of `circle` (alias of {@link circumference})
* @param circle 
* @returns 
*/
const length = (circle) => circumference(circle);

//#endregion
//#region ../packages/geometry/src/circle/interpolate.ts
const piPi$2 = Math.PI * 2;
/**
* Computes relative position along circle perimeter
* 
* ```js
* const circle = { radius: 100, x: 100, y: 100 };
* 
* // Get a point halfway around circle
* // Yields { x, y }
* const pt = Circles.interpolate(circle, 0.5);
* ```
* @param circle 
* @param t Position, 0-1
* @returns 
*/
const interpolate$1 = (circle, t) => pointOnPerimeter(circle, t * piPi$2);

//#endregion
//#region ../packages/geometry/src/circle/is-contained-by.ts
/**
* Returns true if `b` is completely contained by `a`
*
* ```js
* // Compare two points
* isContainedBy(circleA, circleB);
* 
* // Compare a circle with a point
* isContainedBy(circleA, {x: 10, y: 20});
* 
* // Define radius as third parameter
* isContainedBy(circleA, {x: 10, y: 20}, 20);
* ```
* @param a Circle
* @param b Circle or point to compare to
* @param c Radius to accompany parameter b if it's a point
* @returns
*/
const isContainedBy = (a, b, c) => {
	const d = distanceCenter$1(a, b);
	if (isCircle(b)) return d < Math.abs(a.radius - b.radius);
	else if (isPoint(b)) if (c === void 0) return d <= a.radius;
	else return d < Math.abs(a.radius - c);
	else throw new Error(`b parameter is expected to be CirclePositioned or Point`);
};

//#endregion
//#region ../packages/geometry/src/circle/intersecting.ts
/**
* Returns true if `a` or `b` overlap, are equal, or `a` contains `b`.
* A circle can be checked for intersections with another CirclePositioned, Point or RectPositioned.
* 
* Use `intersections` to find the points of intersection.
*
* @param a Circle
* @param b Circle or point to test
* @returns True if circle overlap
*/
const isIntersecting$1 = (a, b, c) => {
	if (isEqual$5(a, b)) return true;
	if (isContainedBy(a, b, c)) return true;
	if (isCircle(b)) return circleCircle(a, b);
	else if (isRectPositioned(b)) return circleRect(a, b);
	else if (isPoint(b) && c !== void 0) return circleCircle(a, {
		...b,
		radius: c
	});
	return false;
};

//#endregion
//#region ../packages/geometry/src/circle/multiply.ts
/**
* Multiplies a circle's radius and position (if provided) by `value`.
* 
* ```js
* multiplyScalar({ radius: 5 }, 5);
* // Yields: { radius: 25 }
* 
* multiplyScalar({ radius: 5, x: 10, y: 20 }, 5);
* // Yields: { radius: 25, x: 50, y: 100 }
* ```
*/
function multiplyScalar(a, value) {
	if (isCirclePositioned(a)) {
		const pt = multiplyScalar$1(a, value);
		return Object.freeze({
			...a,
			...pt,
			radius: a.radius * value
		});
	} else return Object.freeze({
		...a,
		radius: a.radius * value
	});
}

//#endregion
//#region ../packages/geometry/src/circle/random.ts
const piPi$1 = Math.PI * 2;
/**
* Returns a random point within a circle.
* 
* By default creates a uniform distribution.
* 
* ```js
* const pt = randomPoint({radius: 5});
* const pt = randomPoint({radius: 5, x: 10, y: 20});
* ```'
* 
* Generate points with a gaussian distribution
* ```js
* const pt = randomPoint(circle, {
*  randomSource: Random.gaussian
* })
* ```
* @param within Circle to generate a point within
* @param opts Options
* @returns 
*/
const randomPoint$1 = (within, opts = {}) => {
	const offset = isCirclePositioned(within) ? within : {
		x: 0,
		y: 0
	};
	const strategy = opts.strategy ?? `uniform`;
	const margin = opts.margin ?? 0;
	const radius = within.radius - margin;
	const rand = opts.randomSource ?? Math.random;
	switch (strategy) {
		case `naive`: return sum$3(offset, toCartesian$2(rand() * radius, rand() * piPi$1));
		case `uniform`: return sum$3(offset, toCartesian$2(Math.sqrt(rand()) * radius, rand() * piPi$1));
		default: throw new Error(`Unknown strategy '${strategy}'. Expects 'uniform' or 'naive'`);
	}
};

//#endregion
//#region ../packages/geometry/src/circle/svg.ts
/**
* Creates a SVG path segment.
* @param a Circle or radius
* @param sweep If true, path is 'outward'
* @param origin Origin of path. Required if first parameter is just a radius or circle is non-positioned
* @returns 
*/
const toSvg = (a, sweep, origin) => {
	if (isCircle(a)) {
		if (origin !== void 0) return toSvgFull(a.radius, origin, sweep);
		if (isCirclePositioned(a)) return toSvgFull(a.radius, a, sweep);
		else throw new Error(`origin parameter needed for non-positioned circle`);
	} else if (origin === void 0) throw new Error(`origin parameter needed`);
	else return toSvgFull(a, origin, sweep);
};
const toSvgFull = (radius, origin, sweep) => {
	const { x, y } = origin;
	const s = sweep ? `1` : `0`;
	return `
    M ${x}, ${y}
    m -${radius}, 0
    a ${radius},${radius} 0 1,${s} ${radius * 2},0
    a ${radius},${radius} 0 1,${s} -${radius * 2},0
  `.split(`\n`);
};

//#endregion
//#region ../packages/geometry/src/circle/to-path.ts
/**
* Returns a `CircularPath` representation of a circle
*
* @param {CirclePositioned} circle
* @returns {CircularPath}
*/
const toPath = (circle) => {
	guard$3(circle);
	return {
		...circle,
		nearest: (point) => nearest(circle, point),
		interpolate: (t) => interpolate$1(circle, t),
		bbox: () => bbox$2(circle),
		length: () => circumference(circle),
		toSvgString: (sweep = true) => toSvg(circle, sweep),
		relativePosition: (_point, _intersectionThreshold) => {
			throw new Error(`Not implemented`);
		},
		distanceToPoint: (_point) => {
			throw new Error(`Not implemented`);
		},
		kind: `circular`
	};
};

//#endregion
//#region ../packages/geometry/src/circle/to-positioned.ts
/**
* Returns a positioned version of a circle.
* If circle is already positioned, it is returned.
* If no default position is supplied, 0,0 is used.
* @param circle 
* @param defaultPositionOrX 
* @param y 
* @returns 
*/
const toPositioned = (circle, defaultPositionOrX, y) => {
	if (isCirclePositioned(circle)) return circle;
	const pt = getPointParameter$1(defaultPositionOrX, y);
	return Object.freeze({
		...circle,
		...pt
	});
};

//#endregion
//#region ../packages/geometry/src/circle/index.ts
var circle_exports = /* @__PURE__ */ __exportAll({
	area: () => area$4,
	bbox: () => bbox$2,
	center: () => center$1,
	circumference: () => circumference,
	distanceCenter: () => distanceCenter$1,
	distanceFromExterior: () => distanceFromExterior,
	exteriorIntegerPoints: () => exteriorIntegerPoints,
	guard: () => guard$3,
	guardPositioned: () => guardPositioned,
	interiorIntegerPoints: () => interiorIntegerPoints,
	interpolate: () => interpolate$1,
	intersectionLine: () => intersectionLine,
	intersections: () => intersections$1,
	isCircle: () => isCircle,
	isCirclePositioned: () => isCirclePositioned,
	isContainedBy: () => isContainedBy,
	isEqual: () => isEqual$6,
	isIntersecting: () => isIntersecting$1,
	isNaN: () => isNaN,
	isPositioned: () => isPositioned$1,
	length: () => length,
	multiplyScalar: () => multiplyScalar,
	nearest: () => nearest,
	pointOnPerimeter: () => pointOnPerimeter,
	randomPoint: () => randomPoint$1,
	toPath: () => toPath,
	toPositioned: () => toPositioned,
	toSvg: () => toSvg
});

//#endregion
//#region ../packages/geometry/src/curve-simplification.ts
var curve_simplification_exports = /* @__PURE__ */ __exportAll({
	rdpPerpendicularDistance: () => rdpPerpendicularDistance,
	rdpShortestDistance: () => rdpShortestDistance
});
/**
* Simplifies a curve by dropping points based on shortest distance.
* 
* Values of `epsilon` approaching zero keep more of the original points.
* Making `epsilon` larger will filter out more points, making the curve more lossy and jagged.
* 
* ```js
* // Source set of points that define the curve
* const pts = [ {x:100,y:200}, {x:10, y:20}, ... ];
* 
* const simplified = rdpShortestDistance(pts, 3); // Yields an array of points
* ```
* It is an implementation of the [Ramer Douglas Peucker algorithm](https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm)
* by Marius Karthaus. Try the online playground: https://karthaus.nl/rdp/
* 
* @param points 
* @param epsilon 
* @returns 
*/
const rdpShortestDistance = (points, epsilon = .1) => {
	const firstPoint = points[0];
	const lastPoint = points.at(-1);
	if (points.length < 3) return points;
	let index = -1;
	let distribution = 0;
	for (let index_ = 1; index_ < points.length - 1; index_++) {
		const cDistribution = distanceFromPointToLine(points[index_], firstPoint, lastPoint);
		if (cDistribution > distribution) {
			distribution = cDistribution;
			index = index_;
		}
	}
	if (distribution > epsilon) {
		const l1 = points.slice(0, index + 1);
		const l2 = points.slice(index);
		const r1 = rdpShortestDistance(l1, epsilon);
		const r2 = rdpShortestDistance(l2, epsilon);
		return [...r1.slice(0, -1), ...r2];
	} else return [firstPoint, lastPoint];
};
/**
* Simplifies a curve by dropping points based on perpendicular distance
* 
* Values of `epsilon` approaching zero keep more of the original points.
* Making `epsilon` larger will filter out more points, making the curve more lossy and jagged.
* 
* ```js
* // Source set of points that define the curve
* const pts = [ {x:100,y:200}, {x:10, y:20}, ... ];
* 
* const simplified = rdpShortestDistance(pts, 3); // Yields an array of points
* ```
* It is an implementation of the [Ramer Douglas Peucker algorithm](https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm)
* by Marius Karthaus. Try the online playground: https://karthaus.nl/rdp/
* 
* @param points 
* @param epsilon 
* @returns 
*/
const rdpPerpendicularDistance = (points, epsilon = .1) => {
	const firstPoint = points[0];
	const lastPoint = points.at(-1);
	if (points.length < 3) return points;
	let index = -1;
	let distribution = 0;
	for (let index_ = 1; index_ < points.length - 1; index_++) {
		const cDistribution = findPerpendicularDistance(points[index_], firstPoint, lastPoint);
		if (cDistribution > distribution) {
			distribution = cDistribution;
			index = index_;
		}
	}
	if (distribution > epsilon) {
		const l1 = points.slice(0, index + 1);
		const l2 = points.slice(index);
		const r1 = rdpPerpendicularDistance(l1, epsilon);
		const r2 = rdpPerpendicularDistance(l2, epsilon);
		return [...r1.slice(0, -1), ...r2];
	} else return [firstPoint, lastPoint];
};
function findPerpendicularDistance(p, p1, p2) {
	let result;
	let slope;
	let intercept;
	if (p1.x == p2.x) result = Math.abs(p.x - p1.x);
	else {
		slope = (p2.y - p1.y) / (p2.x - p1.x);
		intercept = p1.y - slope * p1.x;
		result = Math.abs(slope * p.x - p.y + intercept) / Math.sqrt(Math.pow(slope, 2) + 1);
	}
	return result;
}
const distanceFromPointToLine = (p, index, index_) => {
	const lineLength = distance$2(index, index_);
	if (lineLength == 0) return distance$2(p, index);
	const t = ((p.x - index.x) * (index_.x - index.x) + (p.y - index.y) * (index_.y - index.y)) / lineLength;
	if (t < 0) return distance$2(p, index);
	if (t > 1) return distance$2(p, index_);
	return distance$2(p, {
		x: index.x + t * (index_.x - index.x),
		y: index.y + t * (index_.y - index.y)
	});
};

//#endregion
//#region ../packages/geometry/src/ellipse.ts
var ellipse_exports = /* @__PURE__ */ __exportAll({ fromDegrees: () => fromDegrees });
const fromDegrees = (radiusX, radiusY, rotationDeg = 0, startAngleDeg = 0, endAngleDeg = 360) => ({
	radiusX,
	radiusY,
	rotation: degreeToRadian(rotationDeg),
	startAngle: degreeToRadian(startAngleDeg),
	endAngle: degreeToRadian(endAngleDeg)
});

//#endregion
//#region ../packages/geometry/src/grid/inside.ts
/**
* Returns _true_ if cell coordinates are above zero and within bounds of grid.
*
* @param grid
* @param cell
* @return True if cell is inside grid
*/
function inside(grid, cell) {
	if (cell.x < 0 || cell.y < 0) return false;
	if (isJaggedGrid(grid)) {
		if (cell.y >= grid.rows.length) return false;
		if (cell.x >= grid.rows[cell.y]) return false;
	} else {
		if (cell.y >= grid.rows) return false;
		if (cell.x >= grid.cols) return false;
	}
	return true;
}

//#endregion
//#region ../packages/geometry/src/grid/to-string.ts
/**
* Returns a key string for a cell instance
* A key string allows comparison of instances by value rather than reference
*
* ```js
* cellKeyString({x:10,y:20});
* // Yields: "Cell{10,20}";
* ```
* @param v
*/
const cellKeyString = (v) => `Cell{${v.x},${v.y}}`;
/**
* Returns a string representation of the grid, handy for debugging.
*
* @param grid
*/
function gridString(grid) {
	if (isJaggedGrid(grid)) return `{ rows: ${grid.rows.join(`,`)}}`;
	else return `{ cols: ${grid.cols} rows: ${grid.rows}}`;
}

//#endregion
//#region ../packages/geometry/src/grid/guards.ts
const CellPlaceholder = Object.freeze({
	x: NaN,
	y: NaN
});
/**
* Returns _true_ if `cell` is a placeholder cell, i.e. has x and y as NaN.
* @param cell
*/
function isPlaceholderCell(cell) {
	return Number.isNaN(cell.x) && Number.isNaN(cell.y);
}
/**
* Returns true if `cell` parameter is a cell with x,y fields.
* Does not check validity of fields.
*
* @param cell
* @return True if parameter is a cell
*/
function isCell(cell) {
	if (cell === void 0) return false;
	return `x` in cell && `y` in cell;
}
function isJaggedGrid(grid) {
	if (`rows` in grid) {
		if (Array.isArray(grid.rows)) return true;
	}
	return false;
}
/**
* Throws an exception if any of the cell's parameters are invalid.
*
* Uses {@link testCell} under the hood.
* @private
* @param cell
* @param parameterName
* @param grid
*/
function guardCell_(cell, parameterName = `Param`, grid) {
	throwIfFailed(testCell(cell, parameterName, grid));
}
/**
* Tests a cell.
* If `grid` is provided, cell will be checked that it's inside the bounds of the grid.
* @param cell
* @param parameterName
* @param grid
*/
function testCell(cell, parameterName = `Param`, grid) {
	if (cell === void 0) return {
		success: false,
		error: `${parameterName} is undefined. Expecting {x,y}`
	};
	if (cell.x === void 0) return {
		success: false,
		error: `${parameterName}.x is undefined`
	};
	if (cell.y === void 0) return {
		success: false,
		error: `${parameterName}.y is undefined`
	};
	if (Number.isNaN(cell.x)) return {
		success: false,
		error: `${parameterName}.x is NaN`
	};
	if (Number.isNaN(cell.y)) return {
		success: false,
		error: `${parameterName}.y is NaN`
	};
	if (!Number.isInteger(cell.x)) return {
		success: false,
		error: `${parameterName}.x is non-integer`
	};
	if (!Number.isInteger(cell.y)) return {
		success: false,
		error: `${parameterName}.y is non-integer`
	};
	if (grid !== void 0 && !inside(grid, cell)) return {
		success: false,
		error: `${parameterName} is outside of grid. Cell: ${cell.x},${cell.y} Grid: ${gridString(grid)}`
	};
	return {
		success: true,
		value: cell
	};
}
/**
* Throws an exception if any of the grid's parameters are invalid.
*
* In the case of a {@link JaggedGrid}, each row is checked for validity.
* @param grid
* @param parameterName
*/
function testGrid(grid, parameterName = `Param`) {
	if (typeof grid === `undefined`) return {
		success: false,
		error: `${parameterName} is undefined. Expecting Grid or JaggedGrid`
	};
	if (typeof grid !== `object`) return {
		success: false,
		error: `${parameterName} is not an object. Expecting Grid or JaggedGrid, got: ${typeof grid}`
	};
	if (isJaggedGrid(grid)) return testJaggedGrid(grid, parameterName);
	return testUniformGrid(grid, parameterName);
}
function testUniformGrid(grid, parameterName = `Param`) {
	if (typeof grid === `undefined`) return {
		success: false,
		error: `${parameterName} is undefined. Expecting UniformGrid: { rows: number, cols: number }`
	};
	if (typeof grid !== `object`) return {
		success: false,
		error: `${parameterName} is not an object. Expecting UniformGrid: { rows: number, cols: number }. Got: ${typeof grid}`
	};
	if (!(`rows` in grid)) return {
		success: false,
		error: `${parameterName}.rows is missing`
	};
	if (!(`cols` in grid)) return {
		success: false,
		error: `${parameterName}.cols is missing`
	};
	if (!Number.isInteger(grid.rows)) return {
		success: false,
		error: `${parameterName}.rows is not an integer`
	};
	if (!Number.isInteger(grid.cols)) return {
		success: false,
		error: `${parameterName}.cols is not an integer`
	};
	return {
		success: true,
		value: grid
	};
}
function testJaggedGrid(grid, parameterName = `Param`) {
	if (typeof grid === `undefined`) return {
		success: false,
		error: `${parameterName} is undefined. Expecting JaggedGrid: { rows: number[] }`
	};
	if (typeof grid !== `object`) return {
		success: false,
		error: `${parameterName} is not an object. Expecting JaggedGrid: { rows: number[] }. Got: ${typeof grid}`
	};
	if (!(`rows` in grid)) return {
		success: false,
		error: `${parameterName}.rows is missing`
	};
	if (!Array.isArray(grid.rows)) return {
		success: false,
		error: `${parameterName}.rows is not an array as expected for a JaggedGrid. Got: ${typeof grid.rows}`
	};
	for (const [index, rowColCount] of grid.rows.entries()) if (!Number.isInteger(rowColCount)) return {
		success: false,
		error: `${parameterName}.rows[${index}] is not an integer. Got: ${typeof rowColCount}, value: ${rowColCount}`
	};
	return {
		success: true,
		value: grid
	};
}

//#endregion
//#region ../packages/geometry/src/grid/apply-bounds.ts
/**
* Calculates a legal position for a cell based on
* `grid` size and `bounds` wrapping logic.
*
* May return _undefined_ if `wrap` is `undefined` (default) and `cell` is out of bounds.
*
* @param grid
* @param cell
* @param wrap
*/
function applyBounds(grid, cell, wrap) {
	if (isJaggedGrid(grid)) return applyBoundsJagged(grid, cell, wrap);
	else return applyBoundsUniform(grid, cell, wrap);
}
function applyBoundsUniform(grid, cell, wrap) {
	resultThrow(testGrid(grid, `grid`), testCell(cell, `cell`));
	let x = cell.x;
	let y = cell.y;
	switch (wrap) {
		case `wrap`:
			x = x % grid.cols;
			y = y % grid.rows;
			if (x < 0) x = grid.cols + x;
			else if (x >= grid.cols) x -= grid.cols;
			if (y < 0) y = grid.rows + y;
			else if (y >= grid.rows) y -= grid.rows;
			x = Math.abs(x);
			y = Math.abs(y);
			break;
		case `stop`:
			x = clampIndex(x, grid.cols);
			y = clampIndex(y, grid.rows);
			break;
		case void 0:
		case `undefined`:
			if (x < 0 || y < 0) return;
			if (x >= grid.cols || y >= grid.rows) return;
			break;
		case `unbounded`: break;
		default: throw new Error(`Unknown BoundsLogic '${wrap}'. Expected: 'wrap', 'stop', 'undefined' or 'unbounded'`);
	}
	return Object.freeze({
		x,
		y
	});
}
/**
* Returns a legal position for a cell based on `grid` size and `bounds` wrapping logic.
*
* When wrapping for JaggedGrids, the row is wrapped first, and then column based on the number of columns for that row.
* @param grid
* @param cell
* @param wrap
*/
function applyBoundsJagged(grid, cell, wrap) {
	throwIfFailed(testJaggedGrid(grid, `grid`), testCell(cell, `cell, grid`));
	let x = cell.x;
	let y = cell.y;
	switch (wrap) {
		case `wrap`:
			y = y % grid.rows.length;
			x = x % grid.rows[y];
			if (y < 0) y = grid.rows.length + y;
			else if (y >= grid.rows.length) y -= grid.rows.length;
			if (x < 0) x = grid.rows[y] + x;
			else if (x >= grid.rows[y]) x -= grid.rows[y];
			x = Math.abs(x);
			y = Math.abs(y);
			break;
		case `stop`:
			y = clampIndex(y, grid.rows);
			x = clampIndex(x, grid.rows[y]);
			break;
		case void 0:
		case `undefined`:
			if (x < 0 || y < 0) return;
			if (y >= grid.rows.length) return;
			if (x >= grid.rows[y]) return;
			break;
		case `unbounded`: break;
		default: throw new Error(`Unknown BoundsLogic '${wrap}'. Expected: 'wrap', 'stop', 'undefined' or 'unbounded'`);
	}
	return Object.freeze({
		x,
		y
	});
}

//#endregion
//#region ../packages/geometry/src/grid/values.ts
/**
* Converts an 1D or 2D array of cell coordinates into values
* 
* ```js
* // 1D (ie an array of coordinates)
* const cells = Grid.As.cells(grid);
* for (const v of Grid.values(grid, cells)) {
* 
* }
* ```
* ```js
* // 2D (ie an array of rows)
* const rows = Grid.As.rows(grid);
* for (const v of Grid.values(grid, rows)) {
* }
* ```
* @param grid 
* @param iter 
*/
function* values(grid, iter) {
	for (const d of iter) if (Array.isArray(d)) yield d.map((v) => grid.get(v, `undefined`));
	else yield grid.get(d, `undefined`);
}

//#endregion
//#region ../packages/geometry/src/grid/enumerators/cells.ts
/**
* Enumerate all cell coordinates in an efficient manner.
* Runs left-to-right, top-to-bottom.
*
* If end of grid is reached, behaviour depends on `wrap`:
* _true_ (default): iterator will wrap to ensure all are visited.
* _false_: iterator stops at end of grid
*
* ```js
* import { Grids } from 'ixfx/geometry.js';
*
* // Enumerate each cell position, left-to-right, top-to-bottom
* for (const cell of Grids.By.cells(grid)) {
*  // cell will be { x, y }
* }
* ```
*
* See also:
* {@link cellValues}: Iterate over cell values
* {@link cellsAndValues}: Iterate over pairs of cell coordinates and cell values
* @param grid Grid to iterate over
* @param start Starting cell position (default: {x:0,y:0})
* @param wrap If true (default), iteration will wrap around through (0,0) when end of grid is reached.
*/
function* cells(grid, start, wrap = true) {
	if (!start) start = {
		x: 0,
		y: 0
	};
	resultThrow(testGrid(grid, `grid`), testCell(start, `start`, grid));
	let { x, y } = start;
	let canMove = true;
	const isJag = isJaggedGrid(grid);
	let currentColLimit = isJag ? grid.rows[y] : grid.cols;
	const rowCount = isJag ? grid.rows.length : grid.rows;
	do {
		yield {
			x,
			y
		};
		x++;
		if (x === currentColLimit) {
			y++;
			currentColLimit = isJag ? grid.rows[y] : grid.cols;
			x = 0;
		}
		if (y === rowCount) if (wrap) {
			y = 0;
			x = 0;
			currentColLimit = isJag ? grid.rows[y] : grid.cols;
		} else canMove = false;
		if (x === start.x && y === start.y) canMove = false;
	} while (canMove);
}
/**
* Yield all the values of a grid, left-to-right, top-to-bottom.
*
* This is just a wrapper around Grids.values:
* ```js
* yield* values(grid, cells(grid, start, wrap));
* ```
*
* See also:
* {@link cells}: Iterate over cell coordinates
* {@link cellsAndValues}: Iterate over pairs of cell coordinates and cell values
* @param grid
* @param start
* @param wrap
*/
function* cellValues(grid, start, wrap = true) {
	yield* values(grid, cells(grid, start, wrap));
}
/**
* Yield all cell coordinates and values of a grid, left-to-right, top-to-bottom
*
* See also:
* {@link cells}: Iterate over cell coordinates
* {@link cellValues}: Iterate over cell values
* @param grid
* @param start
* @param wrap
*/
function* cellsAndValues(grid, start, wrap = true) {
	for (const cell of cells(grid, start, wrap)) yield {
		cell,
		value: grid.get(cell)
	};
}

//#endregion
//#region ../packages/geometry/src/grid/array-1d.ts
var array_1d_exports = /* @__PURE__ */ __exportAll({
	access: () => access$1,
	accessWithGrid: () => accessWithGrid$1,
	createArray: () => createArray$1,
	createMutable: () => createMutable,
	set: () => set$1,
	setMutate: () => setMutate$1,
	wrap: () => wrap$1,
	wrapMutable: () => wrapMutable$1
});
/**
* Returns a {@link GridCellAccessor} to get values from `array`
* based on cell (`{x,y}`) coordinates.
*
* ```js
* const arr = [
*  1,2,3,
*  4,5,6
* ]
* const a = access(arr, {rows:2,cols:3});
* a({x:0,y:0});  // 1
* a({x:2, y:2}); // 6
* ```
* @param array Source data
* @param grid Grid shape
*/
function access$1(array, grid) {
	resultThrow(testGrid(grid), Array.isArray(array));
	const fn = (cell, wrap = `undefined`) => accessWithGrid$1(grid, array, cell, wrap);
	return fn;
}
function accessWithGrid$1(grid, array, cell, wrap) {
	const index = indexFromCell(grid, cell, wrap);
	if (index === void 0) return void 0;
	return array[index];
}
/**
* Returns a {@link GridCellSetter} that can mutate
* array values based on cell {x,y} positions.
* ```js
* const arr = [
*  1,2,3,
*  4,5,6
* ]
* const a = setMutate(arr, 3);
* a(10, {x:0,y:0});
* a(20, {x:2, y:2});
*
* // Arr is now:
* // [
* //  10, 2, 3,
* //  4, 5, 20
* // ]
* ```
* @param array Source data
* @param grid Grid shape
*/
function setMutate$1(array, grid) {
	return (value, cell, wrap = `undefined`) => setMutateWithGrid$1(grid, array, value, cell, wrap);
}
function setMutateWithGrid$1(grid, array, value, cell, wrap) {
	resultThrow(testGrid(grid), Array.isArray(array));
	const index = indexFromCell(grid, cell, wrap);
	if (index === void 0) throw new RangeError(`Cell (${cell.x},${cell.y}) is out of range of grid: ${gridString(grid)}`);
	array[index] = value;
	return array;
}
function set$1(array, cols) {
	const grid = gridFromArrayDimensions(array, cols);
	return (value, cell, wrap) => setWithGrid$1(grid, array, value, cell, wrap);
}
function setWithGrid$1(grid, array, value, cell, wrap) {
	const index = indexFromCell(grid, cell, wrap);
	if (index === void 0) throw new RangeError(`Cell (${cell.x},${cell.y}) is out of range of grid: ${gridString(grid)}`);
	const copy = [...array];
	copy[index] = value;
	array = copy;
	return copy;
}
/**
* Creates a {@link UniformGrid} from the basis of an array and a given number of columns.
* Assumes a uniform grid.
* @param array
* @param cols
*/
function gridFromArrayDimensions(array, cols) {
	return {
		cols,
		rows: Math.ceil(array.length / cols)
	};
}
/**
* Wraps `array` for grid access.
* Mutable, meaning that `array` gets modified if `set` function is used.
*
* ```js
* const g = wrapMutable(myArray, {rows:2, cols:5});
* g.get({x:1,y:2});     // Get value at cell position
* g.set(10, {x:1,y:2}); // Set value at cell position
* g.array;              // Get reference to original passed-in array
* ```
*
* Use {@link wrap} for an immutable version.
*
* @param array Array to wrap
* @param grid Grid shape
*/
function wrapMutable$1(array, grid) {
	return {
		...grid,
		get: access$1(array, grid),
		set: setMutate$1(array, grid),
		get array() {
			return array;
		}
	};
}
/**
* Wraps `array` for grid access.
* Immutable, such that underlying array is not modified and a
* call to `set` returns a new `GridArray1d`.
*
* ```js
* const myArray = [
*    `a`, `b`, `c`,
*    `d`, `e`, `f`
* ];
* let g = wrap(myArray, {rows: 2, cols:3});
* g.get({ x:1, y:2 });          // Get value at cell position
*
* // Note that `set` returns a new instance
* g = g.set(10, { x:1, y:2 });  // Set value at cell position
* g.array;                      // Get reference to current array
* ```
*
* Use {@link wrapMutable} to modify an array in-place
* @param array Array to wrap
* @param grid Grid shape
*/
function wrap$1(array, grid) {
	return {
		...grid,
		get: (cell, boundsLogic = `undefined`) => accessWithGrid$1(grid, array, cell, boundsLogic),
		set: (value, cell, boundsLogic = `undefined`) => {
			array = setWithGrid$1(grid, array, value, cell, boundsLogic);
			return wrap$1(array, grid);
		},
		get array() {
			return array;
		}
	};
}
/**
* Creates a 1-dimensional array to fit a grid of rows x cols.
* Use {@link createArray} if you want to create this array and wrap it for grid access.
*
* ```js
* const arr = createArray(0, { rows: 10, cols: 20 });
* ```
* @param initialValue Initial value to fill array
* @param grid Grid shape to make
*/
function createArray$1(initialValue, grid) {
	resultThrow(testGrid(grid));
	const t = [];
	for (const c of cells(grid)) {
		const index = indexFromCell(grid, c, `undefined`);
		if (index === void 0) throw new Error(`Cell ${cellKeyString(c)} is out of bounds of grid ${gridString(grid)}`);
		t[index] = initialValue;
	}
	return t;
}
/**
* Creates a {@link GridArray1d} instance given the dimensions of the grid.
* Use {@link createArray} if you just want to create an array sized for a grid.
*
* Behind the scenes, it runs:
* ```js
* const arr = createArray(initialValue, grid);
* return wrapMutable(arr, grid);
* ```
* @param initialValue
* @param grid
*/
function createMutable(initialValue, grid) {
	resultThrow(testGrid(grid));
	return wrapMutable$1(createArray$1(initialValue, grid), grid);
}

//#endregion
//#region ../packages/geometry/src/grid/array-2d.ts
var array_2d_exports = /* @__PURE__ */ __exportAll({
	access: () => access,
	createArray: () => createArray,
	createUniformGrid: () => createUniformGrid,
	set: () => set,
	setMutate: () => setMutate,
	wrap: () => wrap,
	wrapMutable: () => wrapMutable
});
/**
* Create a uniform grid from a 2-dimensional array.
* ```js
* const data = [
*  [1,2,3],
*  [4,5,6]
* ]
* const g = create(data);
* // { rows: 2, cols: 3 }
* ```
* @param array
* @returns New grid
*/
function createUniformGrid(array) {
	let colLen = NaN;
	for (const row of array) if (Number.isNaN(colLen)) colLen = row.length;
	else if (colLen !== row.length) throw new Error(`Array does not have uniform column length`);
	return {
		rows: array.length,
		cols: colLen
	};
}
function setMutate(array) {
	const grid = createUniformGrid(array);
	return (value, cell, wrap = `undefined`) => setMutateWithGrid(grid, array, value, cell, wrap);
}
/**
* Returns a function that updates a 2D array representation
* of a grid. Array is mutated.
*
* ```js
* const m = Grids.Array2d.setMutateWithGrid(grid, array);
* m(someValue, { x:2, y:3 });
* ```
* @param grid
* @param array
*/
function setMutateWithGrid(grid, array, value, cell, bounds) {
	const boundCell = applyBounds(grid, cell, bounds);
	if (boundCell === void 0) throw new RangeError(`Cell (${cell.x},${cell.y}) is out of range of grid: ${gridString(grid)}`);
	array[boundCell.y][boundCell.x] = value;
	return array;
}
function access(array) {
	const grid = createUniformGrid(array);
	const fn = (cell, wrap = `undefined`) => accessWithGrid(grid, array, cell, wrap);
	return fn;
}
function accessWithGrid(grid, array, cell, wrap) {
	const boundCell = applyBounds(grid, cell, wrap);
	if (boundCell === void 0) return void 0;
	return array[boundCell.y][boundCell.x];
}
function wrapMutable(array) {
	return {
		...createUniformGrid(array),
		get: access(array),
		set: setMutate(array),
		get array() {
			return array;
		}
	};
}
function set(array) {
	const grid = createUniformGrid(array);
	return (value, cell, wrap) => setWithGrid(grid, array, value, cell, wrap);
}
function setWithGrid(grid, array, value, cell, wrap) {
	const boundCell = applyBounds(grid, cell, wrap);
	if (boundCell === void 0) throw new RangeError(`Cell (${cell.x},${cell.y}) is out of range of grid: ${gridString(grid)}`);
	const copyWhole = [...array];
	const copyRow = [...copyWhole[boundCell.y]];
	copyRow[boundCell.x] = value;
	copyWhole[boundCell.y] = copyRow;
	array = copyWhole;
	return copyWhole;
}
/**
* Wraps `array` with two dimensions for grid access.
* Immutable, such that underlying array is not modified and a
* call to `set` returns a new `GridArray1d`.
*
* ```js
* // Grid of rows: 2, cols: 3
* const myArray = [
*  [ `a`, `b`, `c` ],
*  [ `d`, `e`, `f` ]
* ]
* let g = wrap(myArray);
* g.get({x:1,y:2});          // Get value at cell position
* g = g.set(10, {x:1,y:2}); // Set value at cell position
* g.array;                  // Get reference to current array
* ```
*
* Use {@link wrapMutable} to modify an array in-place
* @param array Array to wrap
*/
function wrap(array) {
	const grid = createUniformGrid(array);
	return {
		...grid,
		get: (cell, boundsLogic = `undefined`) => accessWithGrid(grid, array, cell, boundsLogic),
		set: (value, cell, boundsLogic = `undefined`) => {
			array = setWithGrid(grid, array, value, cell, boundsLogic);
			return wrap(array);
		},
		get array() {
			return array;
		}
	};
}
/**
* Creates a 2-dimensional array to fit a grid of rows x cols.
* The outer array is the rows, the inner arrays are the columns.
*
* ```js
* const arr = createArray(0, { rows: 10, cols: 20 });
* arr[4][9]; // Get value at row 5, col 10
* ```
* @param initialValue Initial value to fill array
* @param grid Grid shape to make
*/
function createArray(initialValue, grid) {
	resultThrow(testGrid(grid));
	const t = [];
	for (const c of cells(grid)) {
		const row = Array.from({ length: grid.cols }).fill(initialValue);
		t[c.y] = row;
	}
	return t;
}

//#endregion
//#region ../packages/geometry/src/grid/as.ts
var as_exports = /* @__PURE__ */ __exportAll({
	columns: () => columns,
	getMaxColumnLength: () => getMaxColumnLength,
	rows: () => rows$1
});
/**
* Enumerate rows of grid, returning all the cells in the row
* as an array
*
* ```js
* for (const row of Grid.As.rows(shape)) {
*  // row is an array of Cells.
*  // [ {x:0, y:0}, {x:1, y:0} ... ]
* }
* ```
*
* Use `Grid.values` to convert the returned iterator into values:
* ```js
* for (const v of Grid.values(Grid.rows(shape))) {
* }
* ```
* @param grid
* @param start
*/
function* rows$1(grid, start) {
	if (!start) start = {
		x: 0,
		y: 0
	};
	resultThrow(testGrid(grid), testCell(start));
	let row = start.y;
	let rowCells = [];
	for (const c of cells(grid, start)) if (c.y === row) rowCells.push(c);
	else {
		yield rowCells;
		rowCells = [c];
		row = c.y;
	}
	if (rowCells.length > 0) yield rowCells;
}
/**
* Enumerate columns of grid, returning all the cells in the
* same column as an array.
*
* ```js
* for (const col of Grid.As.columns(grid)) {
* }
* ```
*
* Use `Grid.values` to convert into values
* ```js
* for (const value of Grid.values(Grid.As.columns(grid))) {
* }
* ```
*
* In the case of jagged arrays, it might be that some rows don't have
* column as long as its peers. In those cases, it returns {@link PlaceholderCell} ({x: NaN, y: NaN}) for those positions.
* @param grid
* @param start
*/
function* columns(grid, start) {
	if (!start) start = {
		x: 0,
		y: 0
	};
	resultThrow(testGrid(grid), testCell(start));
	if (isJaggedGrid(grid)) {
		const cols = getMaxColumnLength(grid);
		for (let x = start.x; x < cols; x++) {
			const colCells = [];
			for (let y = start.y; y < grid.rows.length; y++) if (x < grid.rows[y]) colCells.push({
				x,
				y
			});
			else colCells.push(CellPlaceholder);
			yield colCells;
		}
	} else for (let x = start.x; x < grid.cols; x++) {
		const colCells = [];
		for (let y = start.y; y < grid.rows; y++) colCells.push({
			x,
			y
		});
		yield colCells;
	}
}
function getMaxColumnLength(grid) {
	let cols = 0;
	for (const colCount of grid.rows) if (colCount > cols) cols = colCount;
	return cols;
}

//#endregion
//#region ../packages/geometry/src/grid/distance.ts
function distance(a, b, grid, logic = `rowwise`) {
	switch (logic) {
		case `rowwise`: return distanceRowwise(a, b, grid);
		default: throw new Error(`Unknown logic '${logic}'. Expected 'rowwise'`);
	}
}
function distanceRowwise(a, b, grid) {
	if (isJaggedGrid(grid)) throw new Error(`Jagged grids are not supported yet`);
	else {
		const rows = b.y - a.y;
		const cols = b.x - a.x;
		const d = Math.abs(rows) * grid.cols + Math.abs(cols);
		if (compareRowwise(a, b) > 0) return Math.abs(d - grid.rows * grid.cols);
		return d;
	}
}

//#endregion
//#region ../packages/geometry/src/grid/offset.ts
/**
* Returns a coordinate offset from `start` by `vector` amount.
*
* Different behaviour can be specified for how to handle when coordinates exceed the bounds of the grid
*
* Note: x and y wrapping are calculated independently. A large wrapping of x, for example won't shift up/down a line.
*
* Use {@link Grids.applyBounds} if you need to calculate a wrapped coordinate without adding two together.
* @param grid Grid to traverse
* @param start Start point
* @param vector Offset in x/y
* @param bounds Bounds logic
* @returns Cell
*/
function offset(grid, start, vector, bounds = `undefined`) {
	return applyBounds(grid, {
		x: start.x + vector.x,
		y: start.y + vector.y
	}, bounds);
}

//#endregion
//#region ../packages/geometry/src/grid/cursor.ts
var cursor_exports = /* @__PURE__ */ __exportAll({ GridSelection: () => GridSelection });
var GridSelection = class {
	#cursor;
	#selections = [];
	#selectionInProgress;
	#grid;
	constructor(grid, start = {
		x: 0,
		y: 0
	}) {
		resultThrow(testGrid(grid), testCell(start, `start`));
		this.#grid = grid;
		this.#cursor = start;
	}
	moveCursorByVector(vector) {
		const c = offset(this.#grid, this.#cursor, vector, `wrap`);
		if (c === void 0) throw new Error(`Cannot make move, offset returned undefined`);
		this.#cursor = c;
		return c;
	}
	setCursor(cell, withSelection) {
		this.#cursor = cell;
		if (withSelection === `cancel`) this.#selectionInProgress = void 0;
		else if (withSelection === `contiguous`) this.extendContiguous(cell);
		console.log(`cursor: ${cell.x},${cell.y}`);
		return this.#cursor;
	}
	get selectionInProgress() {
		return this.#selectionInProgress;
	}
	extendContiguous(to) {
		let sel;
		if (this.#selectionInProgress !== void 0) if (this.#selectionInProgress.kind !== `contiguous`) {
			this.#selections.push(this.#selectionInProgress);
			this.#selectionInProgress = void 0;
		} else sel = this.#selectionInProgress;
		if (sel === void 0) sel = {
			start: this.#cursor,
			end: to,
			kind: `contiguous`
		};
		else sel = {
			...sel,
			end: to
		};
		this.#selectionInProgress = sel;
		return sel;
	}
	get cursor() {
		return this.#cursor;
	}
	clear() {
		this.#selections = [];
	}
};

//#endregion
//#region ../packages/geometry/src/grid/directions.ts
/**
* Returns a list of all cardinal directions: n, ne, nw, e, s, se, sw, w
*/
const allDirections = Object.freeze([
	`n`,
	`ne`,
	`nw`,
	`e`,
	`s`,
	`se`,
	`sw`,
	`w`
]);
/**
* Returns a list of + shaped directions: n, e, s, w
*/
const crossDirections = Object.freeze([
	`n`,
	`e`,
	`s`,
	`w`
]);
/**
* Returns cells that correspond to the cardinal directions at a specified distance
* i.e. it projects a line from `start` cell in all cardinal directions and returns the cells at `steps` distance.
* @param grid Grid
* @param start Start point
* @param steps Distance
* @param bounds Logic for if bounds of grid are exceeded
* @returns Cells corresponding to cardinals
*/
function offsetCardinals(grid, start, steps, bounds = `stop`) {
	resultThrow(testGrid(grid, `grid`), testCell(start, `start`), integerTest(steps, `aboveZero`, `steps`));
	const directions = allDirections;
	const vectors = directions.map((d) => getVectorFromCardinal(d, steps));
	return zipKeyValue(directions, directions.map((d, index) => offset(grid, start, vectors[index], bounds)));
}
/**
* Returns an `{ x, y }` signed vector corresponding to the provided cardinal direction.
* ```js
* const n = getVectorFromCardinal(`n`); // {x: 0, y: -1}
* ```
*
* Optional `multiplier` can be applied to vector
* ```js
* const n = getVectorFromCardinal(`n`, 10); // {x: 0, y: -10}
* ```
*
* Blank direction returns `{ x: 0, y: 0 }`
* @param cardinal Direction
* @param multiplier Multipler
* @returns Signed vector in the form of `{ x, y }`
*/
function getVectorFromCardinal(cardinal, multiplier = 1) {
	let v;
	switch (cardinal) {
		case `n`:
			v = {
				x: 0,
				y: -1 * multiplier
			};
			break;
		case `ne`:
			v = {
				x: 1 * multiplier,
				y: -1 * multiplier
			};
			break;
		case `e`:
			v = {
				x: 1 * multiplier,
				y: 0
			};
			break;
		case `se`:
			v = {
				x: 1 * multiplier,
				y: 1 * multiplier
			};
			break;
		case `s`:
			v = {
				x: 0,
				y: 1 * multiplier
			};
			break;
		case `sw`:
			v = {
				x: -1 * multiplier,
				y: 1 * multiplier
			};
			break;
		case `w`:
			v = {
				x: -1 * multiplier,
				y: 0
			};
			break;
		case `nw`:
			v = {
				x: -1 * multiplier,
				y: -1 * multiplier
			};
			break;
		default: v = {
			x: 0,
			y: 0
		};
	}
	return Object.freeze(v);
}

//#endregion
//#region ../packages/geometry/src/grid/enumerators/rows.ts
/**
* Enumerate rows of a grid as arrays of cell coordinates.
*
* Works with Uniform and Jagged grids. In the case of JaggedGrids, the returned rows might be of different lengths.
* @param grid
* @param startRow Starting row index, by default 0
* @param endRowInclusive Ending row index, by default last row of grid (ie grid.rows -1)
*/
function* rows(grid, startRow = 0, endRowInclusive) {
	if (isJaggedGrid(grid)) {
		const _endRow = endRowInclusive ?? grid.rows.length - 1;
		for (let y = startRow; y <= _endRow; y++) {
			const row = [];
			for (let x = 0; x < grid.rows[y]; x++) row.push({
				x,
				y
			});
			yield row;
		}
	} else {
		const _endRow = endRowInclusive ?? grid.rows - 1;
		for (let y = startRow; y <= _endRow; y++) {
			const row = [];
			const colLimit = isJaggedGrid(grid) ? grid.rows[y] : grid.cols;
			for (let x = 0; x < colLimit; x++) row.push({
				x,
				y
			});
			yield row;
		}
	}
}

//#endregion
//#region ../packages/geometry/src/grid/enumerators/index.ts
var enumerators_exports = /* @__PURE__ */ __exportAll({
	cellValues: () => cellValues,
	cells: () => cells,
	cellsAndValues: () => cellsAndValues,
	rows: () => rows
});

//#endregion
//#region ../packages/geometry/src/grid/geometry.ts
/**
* Returns the last cell of a grid, column-wise
*
* For uniform grids, this is simply `{ x: grid.cols - 1, y: grid.rows - 1 }`.
*
* For jagged grids, consider all the rows with the max cols.
* In the below case, row indexes 1 and 2 have the max cols of 3,
* and we take the last of those rows. Thus the last cell is { x: 2, y: 2 } (position 7)
*
* ```
* { rows: [2, 3, 3, 1] }
* 0 1
* 2 3 4
* 5 6 7
* 8
* ```
*
* See also {@link firstCellColumnwise}
* @param grid
*/
function lastCellColumnwise(grid) {
	if (!isJaggedGrid(grid)) return {
		x: grid.cols - 1,
		y: grid.rows - 1
	};
	const maxCols = Math.max(...grid.rows);
	const y = [...filterWithIndex(grid.rows, (colCount) => colCount === maxCols)].at(-1);
	return {
		x: maxCols - 1,
		y
	};
}
/**
* Returns the last cell of a grid, row-wise
*
* For uniform grids, this is simply `{ x: grid.cols - 1, y: grid.rows - 1 }`.
*
* For jagged grids, the last position is the last cell of the last row, in this
* case { x: 0, y: 3 } (position 8).
*
* ```
* { rows: [2, 3, 3, 1] }
* 0 1
* 2 3 4
* 5 6 7
* 8
* ```
*
* See also {@link firstCellColumnwise}
* @param grid
*/
function lastCellRowwise(grid) {
	if (!isJaggedGrid(grid)) return {
		x: grid.cols - 1,
		y: grid.rows - 1
	};
	return {
		x: grid.rows.at(-1) - 1,
		y: grid.rows.length - 1
	};
}
/**
* Returns the first cell of a grid.
*
* For uniform grids, this is simply `{ x: 0, y: 0 }`.
*
* For jagged grids returns first cell in a row with cols.
*
* ```
* { rows: [0, 2, 3] }
*
* 0 1
* 2 3 4
* ```
*
* See also {@link firstCellColumnwise}
* @param grid
*/
function firstCellColumnwise(grid) {
	if (!isJaggedGrid(grid)) return {
		x: 0,
		y: 0
	};
	return {
		x: 0,
		y: grid.rows.findIndex((colCount) => colCount > 0)
	};
}
/**
* Returns the cells on the line of `start` and `end`, inclusive
*
* ```js
* // Get cells that connect 0,0 and 10,10
* const cells = Grids.getLine({x:0,y:0}, {x:10,y:10});
* ```
*
* This function does not handle wrapped coordinates.
* @param start Starting cell
* @param end End cell
*/
function getLine(start, end) {
	resultThrow(testCell(start), testCell(end));
	let startX = start.x;
	let startY = start.y;
	const dx = Math.abs(end.x - startX);
	const dy = Math.abs(end.y - startY);
	const sx = startX < end.x ? 1 : -1;
	const sy = startY < end.y ? 1 : -1;
	let error = dx - dy;
	const cells = [];
	while (true) {
		cells.push(Object.freeze({
			x: startX,
			y: startY
		}));
		if (startX === end.x && startY === end.y) break;
		const error2 = 2 * error;
		if (error2 > -dy) {
			error -= dy;
			startX += sx;
		}
		if (error2 < dx) {
			error += dx;
			startY += sy;
		}
	}
	return cells;
}
/**
* Returns a list of cells from `start` to `end`.
*
* Throws an error if start and end are not on same row or column.
*
* @param start Start cell
* @param end end clel
* @param endInclusive
* @return Array of cells
*/
function simpleLine(start, end, endInclusive = false) {
	const cells = [];
	if (start.x === end.x) {
		const lastY = endInclusive ? end.y + 1 : end.y;
		for (let y = start.y; y < lastY; y++) cells.push({
			x: start.x,
			y
		});
	} else if (start.y === end.y) {
		const lastX = endInclusive ? end.x + 1 : end.x;
		for (let x = start.x; x < lastX; x++) cells.push({
			x,
			y: start.y
		});
	} else throw new Error(`Only does vertical and horizontal: ${start.x},${start.y} - ${end.x},${end.y}`);
	return cells;
}

//#endregion
//#region ../packages/geometry/src/grid/indexing.ts
/**
* Returns the index for a given cell in a UniformGrid.
* This is useful if a grid is stored in an array.
*
* ```js
* const data = [
*  1, 2,
*  3, 4,
*  5, 6
* ];
*
* // Get index for cell {x: 1, y: 1} (ie. second column, second row)
* const index = indexFromCell({ rows: 2, cols: 2}, {x: 1, y: 1}); // Yields 3
* console.log(data[index]); // Yields 4
* ```
*
* Bounds logic is applied to cell.x/y separately. Wrapping
* only ever happens in same col/row.
* @see cellFromIndex
* @param grid Grid
* @param cell Cell to get index for
* @param wrap Logic for if we hit bounds of grid
*/
function indexFromCell(grid, cell, wrap) {
	if (isJaggedGrid(grid)) return indexFromCellJagged(grid, cell, wrap);
	else return indexFromCellUniform(grid, cell, wrap);
}
function indexFromCellUniform(grid, cell, wrap) {
	resultThrow(testGrid(grid), testCell(cell));
	if (wrap === `unbounded`) throw new Error(`Wrap logic "unbounded" not supported for indexFromCell`);
	const cellBounded = applyBounds(grid, cell, wrap);
	if (cellBounded === void 0) return;
	return cellBounded.y * grid.cols + cellBounded.x;
}
function cellFromIndexUniform(colsOrGrid, index) {
	let cols = 0;
	cols = typeof colsOrGrid === `number` ? colsOrGrid : colsOrGrid.cols;
	resultThrow(integerTest(cols, `aboveZero`, `colsOrGrid`));
	return {
		x: index % cols,
		y: Math.floor(index / cols)
	};
}
/**
* Returns an index for a given cell in a JaggedGrid.
* This is useful if a grid is stored in an array. Assumes rows are stored end-to-end.
* @param grid
* @param cell
* @param wrap
*/
function indexFromCellJagged(grid, cell, wrap) {
	resultThrow(testJaggedGrid(grid), testCell(cell));
	const cellBounded = applyBounds(grid, cell, wrap);
	if (cellBounded === void 0) return;
	if (wrap === `unbounded`) throw new Error(`Wrap logic "unbounded" not supported for indexFromCell`);
	let count = 0;
	for (let i = 0; i < cellBounded.y; i++) count += grid.rows[i];
	count += cellBounded.x;
	return count;
}
/**
* Returns the grid cell that corresponds to a given index in a JaggedGrid. Assumes rows are stored end-to-end.
* @param grid
* @param index
*/
function cellFromIndexJagged(grid, index) {
	resultThrow(testJaggedGrid(grid));
	let remaining = index;
	for (let i = 0; i < grid.rows.length; i++) {
		if (remaining < grid.rows[i]) return {
			x: remaining,
			y: i
		};
		remaining -= grid.rows[i];
	}
}

//#endregion
//#region ../packages/geometry/src/grid/is-equal.ts
/**
* Returns _true_ if grids `a` and `b` are equal in value.
* Returns _false_ if either parameter is undefined.
*
* @param a
* @param b
* @return
*/
const isEqual$1 = (a, b) => {
	if (b === void 0) return false;
	if (a === void 0) return false;
	if (`rows` in a && `cols` in a) if (`rows` in b && `cols` in b) {
		if (a.rows !== b.rows || a.cols !== b.cols) return false;
	} else return false;
	if (`size` in a) if (`size` in b) {
		if (a.size !== b.size) return false;
	} else return false;
	return true;
};
/**
* Returns _true_ if two cells equal.
* Returns _false_ if either cell are undefined
*
* @param a
* @param b
* @returns
*/
const cellEquals = (a, b) => {
	if (b === void 0) return false;
	if (a === void 0) return false;
	return a.x === b.x && a.y === b.y;
};

//#endregion
//#region ../packages/geometry/src/grid/neighbour.ts
const randomNeighbour = (nbos) => randomElement(nbos);
/**
* Returns _true_ if `n` is a Neighbour type, eliminating NeighbourMaybe possibility
*
* @param n
* @return
*/
function isNeighbour(n) {
	if (n === void 0) return false;
	if (n[1] === void 0) return false;
	return true;
}
/**
* Gets a list of neighbours for `cell` (using {@link neighbours}), filtering
* results to only those that are valid neighbours (using {@link isNeighbour})
*
* ```js
* // Get all eight surrounding cells
* const n = Grids.neighbourList(grid, cell, Grids.allDirections);
*
* // Get north, east, south, west cells
* const n = Grids.neighbourList(grid, cell, Grids.crossDirections);
* ```
* @param grid Grid
* @param cell Cell
* @param directions Directions
* @param bounds Bounds
* @returns Array of valid neighbours
*/
function neighbourList(grid, cell, directions, bounds) {
	const cellNeighbours = neighbours(grid, cell, bounds, directions);
	return Object.entries(cellNeighbours).filter((n) => isNeighbour(n));
}
/**
* Returns neighbours for a cell. If no `directions` are provided, it defaults to {@link allDirections}.
*
* ```js
* const grid = { rows: 5, cols: 5 };
* const cell = { x:2, y:2 };
*
* // Get n,ne,nw,e,s,se,sw and w neighbours
* const n = Grids.neighbours(grid, cell, `wrap`);
*
* Yields:
* {
*  n: {x: 2, y: 1}
*  s: {x: 2, y: 3}
*  ....
* }
* ```
*
* Returns neighbours without diagonals (ie: n, e, s, w):
* ```js
* const n = Grids.neighbours(grid, cell, `stop`, Grids.crossDirections);
* ```
* @returns Returns a map of cells, keyed by cardinal direction
* @param grid Grid
* @param cell Cell
* @param bounds How to handle edges of grid
* @param directions Directions to return
*/
function neighbours(grid, cell, bounds = `undefined`, directions) {
	const _directions = directions ?? allDirections;
	return zipKeyValue(_directions, _directions.map((c) => offset(grid, cell, getVectorFromCardinal(c), bounds)));
}

//#endregion
//#region ../packages/geometry/src/grid/to-array.ts
function toArray2d(grid, initialValue) {
	if (isJaggedGrid(grid)) {
		const returnValue = [];
		for (let row = 0; row < grid.rows.length; row++) {
			const colCount = grid.rows[row];
			returnValue[row] = Array.from({ length: colCount });
			if (initialValue) for (let col = 0; col < colCount; col++) returnValue[row][col] = initialValue;
		}
		return returnValue;
	} else {
		const returnValue = [];
		for (let row = 0; row < grid.rows; row++) {
			returnValue[row] = Array.from({ length: grid.cols });
			if (initialValue) for (let col = 0; col < grid.cols; col++) returnValue[row][col] = initialValue;
		}
		return returnValue;
	}
}

//#endregion
//#region ../packages/geometry/src/grid/visitors/breadth.ts
function breadthLogic() {
	return { select: (nbos) => nbos[0] };
}

//#endregion
//#region ../packages/geometry/src/grid/visitors/cell-neighbours.ts
const neighboursLogic = () => {
	return {
		select: (neighbours) => {
			return neighbours.at(0);
		},
		getNeighbours: (grid, cell) => {
			return neighbourList(grid, cell, allDirections, `undefined`);
		}
	};
};

//#endregion
//#region ../packages/geometry/src/grid/visitors/columns.ts
/**
* Visits cells running down columns, left-to-right.
* When `reverse` option is provided, we go up columns, right-to-left instead.
*
* The `getNeigbours` function only ever returns a single cell.
*
* Returns an object with two functions, all of which are pure functions.
* That is, the result of `columnLogic` has no internal state.
* @param opts Options
* @returns Visitor generator
*/
function columnLogic(opts = {}) {
	const reversed = opts.reversed ?? false;
	return {
		select: (nbos) => nbos.find((n) => n[0] === (reversed ? `n` : `s`)),
		getNeighbours: reversed ? getNeighboursReverse$1 : getNeighboursRegular$1
	};
}
function getNeighboursRegular$1(grid, cell) {
	if (isJaggedGrid(grid)) return getNeighboursRegularJagged$1(grid, cell);
	const rows = grid.rows;
	if (cell.y < rows - 1) cell = {
		x: cell.x,
		y: cell.y + 1
	};
	else {
		const nextCol = cell.x + 1;
		if (cell.x < grid.cols - 1) cell = {
			x: nextCol,
			y: 0
		};
		else cell = {
			x: 0,
			y: 0
		};
	}
	return [[`s`, cell]];
}
function getNeighboursRegularJagged$1(grid, cell) {
	const rows = grid.rows.length;
	let y = cell.y;
	let x = cell.x;
	if (cell.y < rows - 1) y++;
	else {
		y = 0;
		x++;
	}
	if (x >= grid.rows[y]) {
		if (y >= rows) return [[`s`, {
			x: 0,
			y: 0
		}]];
		y = findIndex(grid.rows, (colCount) => colCount > x, y);
		if (y === -1) return [[`s`, {
			x: 0,
			y: 0
		}]];
	}
	return [[`s`, {
		x,
		y
	}]];
}
function getNeighboursReverseJagged$1(grid, cell) {
	const rows = grid.rows.length;
	let y = cell.y;
	let x = cell.x;
	if (cell.y > 0) y--;
	else {
		x--;
		y = rows - 1;
	}
	if (x < 0) return [[`n`, lastCellColumnwise(grid)]];
	if (x < grid.rows[y]) return [[`n`, {
		x,
		y
	}]];
	y = findIndexReverse(grid.rows, (colCount) => colCount > x, y);
	if (y > -1) return [[`n`, {
		x,
		y
	}]];
	return getNeighboursReverseJagged$1(grid, {
		x: x - 1,
		y: rows - 1
	});
}
function getNeighboursReverse$1(grid, cell) {
	if (isJaggedGrid(grid)) return getNeighboursReverseJagged$1(grid, cell);
	if (cell.y > 0) cell = {
		x: cell.x,
		y: cell.y - 1
	};
	else if (cell.x === 0) cell = {
		x: grid.cols - 1,
		y: grid.rows - 1
	};
	else cell = {
		x: cell.x - 1,
		y: grid.rows - 1
	};
	return [[`n`, cell]];
}

//#endregion
//#region ../packages/geometry/src/grid/visitors/depth.ts
const depthLogic = () => {
	return { select: (nbos) => nbos.at(-1) };
};

//#endregion
//#region ../packages/geometry/src/grid/visitors/random-contiguous.ts
const randomContiguousLogic = () => {
	return { select: randomNeighbour };
};

//#endregion
//#region ../packages/geometry/src/grid/visitors/random.ts
const randomLogic = () => {
	return {
		getNeighbours: (grid, cell) => {
			const t = [];
			for (const c of cells(grid, cell)) t.push([`n`, c]);
			return t;
		},
		select: randomNeighbour
	};
};

//#endregion
//#region ../packages/geometry/src/grid/visitors/rows.ts
/**
* Visit by following rows. Normal order is left-to-right, top-to-bottom.
* @param options Options
*/
function rowLogic(options = {}) {
	const reversed = options.reversed ?? false;
	return {
		select: (nbos) => nbos.find((n) => n[0] === (reversed ? `w` : `e`)),
		getNeighbours: reversed ? getNeighboursReverse : getNeighboursRegular
	};
}
function getNeighboursReverse(grid, cell) {
	if (isJaggedGrid(grid)) return getNeighboursReverseJagged(grid, cell);
	if (cell.x > 0) cell = {
		x: cell.x - 1,
		y: cell.y
	};
	else if (cell.y > 0) cell = {
		x: grid.cols - 1,
		y: cell.y - 1
	};
	else cell = {
		x: grid.cols - 1,
		y: grid.rows - 1
	};
	return [[`w`, cell]];
}
function getNeighboursRegular(grid, cell) {
	if (isJaggedGrid(grid)) return getNeighboursRegularJagged(grid, cell);
	if (cell.x < grid.rows - 1) cell = {
		x: cell.x + 1,
		y: cell.y
	};
	else if (cell.y < grid.rows - 1) cell = {
		x: 0,
		y: cell.y + 1
	};
	else cell = {
		x: 0,
		y: 0
	};
	return [[`e`, cell]];
}
function getNeighboursRegularJagged(grid, cell) {
	let x = cell.x + 1;
	if (x < grid.rows[cell.y]) return [[`e`, {
		x,
		y: cell.y
	}]];
	x = 0;
	const y = cell.y + 1;
	if (y >= grid.rows.length) return [[`e`, {
		x: 0,
		y: 0
	}]];
	return [[`e`, {
		x,
		y
	}]];
}
function getNeighboursReverseJagged(grid, cell) {
	let x = cell.x - 1;
	let y = cell.y;
	if (x < 0) {
		if (y <= 0) return [[`w`, lastCellRowwise(grid)]];
		y--;
		x = grid.rows[y] - 1;
	}
	if (x >= 0 && x < grid.rows[y]) return [[`w`, {
		x,
		y
	}]];
	return getNeighboursReverseJagged(grid, cell);
}

//#endregion
//#region ../packages/geometry/src/grid/visitors/visitor.ts
/**
* Visits every cell in grid using supplied selection function.
*
* If you want a reusable 'visitor' function to use with different grids, use {@link create} instead.
*
* In-built functions to use: visitorDepth, visitorBreadth, visitorRandom,
* visitorColumn, visitorRow.
*
* Usage example:
*
* ```js
* let visitor = Grids.visitor(Grids.visitorRandom, grid, startCell);
* for (let cell of visitor) {
*  // do something with cell
* }
* ```
*
* If you want to keep tabs on the visitor, pass in a @ixfx/collections.Sets.ISetMutable instance. This gets
* updated as cells are visited to make sure we don't visit the same one twice. If a set is not passed
* in, one will be created internally.
*
* ```js
* let visited = new SetStringMutable<Grids.Cell>(c => Grids.cellKeyString(c));
* let visitor = Grids.visitor(Grids.visitorRandom, grid, startCell, visited);
* ```
*
* To visit with some delay, try this pattern:
*
* ```js
*  const delayMs = 100;
*  const run = () => {
*   let cell = visitor.next().value;
*   if (cell === undefined) return;
*   // Do something with cell
*   setTimeout(run, delayMs);
*  }
*  setTimeout(run, delayMs);
* ```
* @param logic Logic for selecting next cell
* @param grid Grid to visit
* @param opts Options
* @returns Cells
*/
function* visitByNeighbours(logic, grid, opts = {}) {
	throwIfFailed(testGrid(grid, `grid`));
	const start = opts.start ?? {
		x: 0,
		y: 0
	};
	throwIfFailed(testCell(start, `opts.start`, grid));
	const v = opts.visited ?? mutable(cellKeyString);
	const possibleNeighbours = logic.getNeighbours ?? ((g, c) => neighbourList(g, c, crossDirections, `undefined`));
	let cellQueue = [start];
	let moveQueue = [];
	let current;
	while (cellQueue.length > 0) {
		if (current === void 0) {
			const nv = cellQueue.pop();
			if (nv === void 0) break;
			current = nv;
		}
		if (!v.has(current)) {
			v.add(current);
			yield current;
			const nextSteps = possibleNeighbours(grid, current).filter((step) => {
				if (step[1] === void 0) return false;
				return !v.has(step[1]);
			});
			if (nextSteps.length === 0) {
				if (current !== void 0) cellQueue = cellQueue.filter((cq) => cellEquals(cq, current));
			} else for (const n of nextSteps) {
				if (n === void 0) continue;
				if (n[1] === void 0) continue;
				moveQueue.push(n);
			}
		}
		moveQueue = moveQueue.filter((step) => !v.has(step[1]));
		if (moveQueue.length === 0) current = void 0;
		else {
			const potential = logic.select(moveQueue);
			if (potential !== void 0) {
				cellQueue.push(potential[1]);
				current = potential[1];
			}
		}
	}
}

//#endregion
//#region ../packages/geometry/src/grid/visitors/step.ts
/**
* Runs the provided `visitor` for a number of steps, returning the cell we end at
* ```js
* // Create visitor & stepper
* const visitor = Grids.Visit.create(`row`);
* const stepper = Grids.Visit.stepper(grid, visitor);
*
* // Step by 10
* stepper(10); // GridCell {x,y}
*
* // Step by another 2
* stepper(2);
* ```
* @param grid Grid to traverse
* @param start Start point
* @param createVisitor Visitor function
*/
function stepper(grid, createVisitor, start = {
	x: 0,
	y: 0
}, resolution = 1) {
	resultThrow(testGrid(grid, `grid`), testCell(start, `start`), integerTest(resolution, ``, `resolution`));
	const steps = [];
	let count = 0;
	let position = 0;
	for (const c of createVisitor(grid, {
		start,
		boundsWrap: `undefined`
	})) {
		count++;
		if (count % resolution !== 0) continue;
		steps.push(c);
	}
	return (step, fromStart = false) => {
		resultThrow(integerTest(step, ``, `step`));
		if (fromStart) position = step;
		else position += step;
		return steps.at(position % steps.length);
	};
}

//#endregion
//#region ../packages/geometry/src/grid/visitors/index.ts
var visitors_exports = /* @__PURE__ */ __exportAll({
	breadthLogic: () => breadthLogic,
	columnLogic: () => columnLogic,
	create: () => create,
	createWithLogic: () => createWithLogic,
	depthLogic: () => depthLogic,
	neighboursLogic: () => neighboursLogic,
	randomContiguousLogic: () => randomContiguousLogic,
	randomLogic: () => randomLogic,
	rowLogic: () => rowLogic,
	stepper: () => stepper,
	visitByNeighbours: () => visitByNeighbours
});
/**
* Returns a generator that iterates over cells with a given logic.
* Once created, the same logic can be used on different grids - it is a pure function.
*
* ```js
* const v = create(`random`); // Randomly visit cells
* for (const cell of v(grid)) {
*  // do something with cell
* }
* ```
*
* Logic types:
* 'row': left-to-right, top-to-bottom
* 'column': top-to-bottom, left-to-right
* 'neighbours': neighbours surrounding cell (eight)
* 'breadth': breadth-first
* 'depth': depth-first
* 'random': any random cell in grid
* 'random-contiguous': any random cell neighbouring an already visited cell
*
* Under the hood it uses {@link createWithLogic}, but lets you specify the logic with a simple string.
* @param type
* @param opts
*/
function create(type, opts = {}) {
	switch (type) {
		case `random-contiguous`: return createWithLogic(randomContiguousLogic(), opts);
		case `random`: return createWithLogic(randomLogic(), opts);
		case `depth`: return createWithLogic(depthLogic(), opts);
		case `breadth`: return createWithLogic(breadthLogic(), opts);
		case `neighbours`: return createWithLogic(neighboursLogic(), opts);
		case `row`: return createWithLogic(rowLogic(opts), opts);
		case `column`: return createWithLogic(columnLogic(opts), opts);
		default: throw new TypeError(`Param 'type' unknown. Value: ${type}`);
	}
}
/**
* Returns a function which creates a generator to iterate over cells with a given logic. Use {@link create} to specify this logic with a string.
*
* This lower-level function is used if you have a custom {@link GridNeighbourSelectionLogic} implementation.
* @param logic
* @param options
*/
function createWithLogic(logic, options = {}) {
	return (grid, optionsOverride = {}) => {
		return visitByNeighbours(logic, grid, {
			...options,
			...optionsOverride
		});
	};
}

//#endregion
//#region ../packages/geometry/src/grid/visual.ts
/**
* Generator that returns rectangles for each cell in a grid
*
* @example Draw rectangles
* ```js
* import { Drawing } from 'visuals.js'
* const rects = [...Grids.asRectangles(grid)];
* Drawing.rect(ctx, rects, { strokeStyle: `silver`});
* ```
* @param grid
*/
function* asRectangles(grid) {
	for (const c of cells(grid)) yield rectangleForCell(grid, c);
}
/**
* Returns the cell at a specified visual coordinate
* or _undefined_ if the position is outside of the grid.
*
* `position` must be in same coordinate/scale as the grid.
*
* @param grid Grid
* @param position Position, eg in pixels
* @return Cell at position or undefined if outside of the grid
*/
function cellAtPoint(grid, position) {
	const size = grid.size;
	resultThrow(numberTest(size, `positive`, `grid.size`));
	if (position.x < 0 || position.y < 0) return;
	const x = Math.floor(position.x / size);
	const y = Math.floor(position.y / size);
	if (x >= grid.cols) return;
	if (y >= grid.rows) return;
	return {
		x,
		y
	};
}
/**
* Returns a visual rectangle of the cell, positioned from the top-left corner
*
* ```js
* const cell = { x: 1, y: 0 };
*
* // 5x5 grid, each cell 5px in size
* const grid = { rows: 5, cols: 5, size: 5 }
*
* const r = rectangleForCell(grid, cell,);
*
* // Yields: { x: 5, y: 0, width: 5, height: 5 }
* ```
* @param grid
* @param cell
*/
function rectangleForCell(grid, cell) {
	resultThrow(testCell(cell));
	const size = grid.size;
	return fromTopLeft({
		x: cell.x * size,
		y: cell.y * size
	}, size, size);
}
/**
* Returns the visual midpoint of a cell (eg. pixel coordinate)
*
* @param grid
* @param cell
*/
function cellMiddle(grid, cell) {
	resultThrow(testCell(cell));
	const size = grid.size;
	const x = cell.x * size;
	const y = cell.y * size;
	return Object.freeze({
		x: x + size / 2,
		y: y + size / 2
	});
}

//#endregion
//#region ../packages/geometry/src/grid/index.ts
var grid_exports = /* @__PURE__ */ __exportAll({
	Array1d: () => array_1d_exports,
	Array2d: () => array_2d_exports,
	As: () => as_exports,
	By: () => enumerators_exports,
	CellPlaceholder: () => CellPlaceholder,
	Cursor: () => cursor_exports,
	Visit: () => visitors_exports,
	allDirections: () => allDirections,
	applyBounds: () => applyBounds,
	asRectangles: () => asRectangles,
	cellAtPoint: () => cellAtPoint,
	cellEquals: () => cellEquals,
	cellFromIndexJagged: () => cellFromIndexJagged,
	cellFromIndexUniform: () => cellFromIndexUniform,
	cellKeyString: () => cellKeyString,
	cellMiddle: () => cellMiddle,
	crossDirections: () => crossDirections,
	distance: () => distance,
	distanceRowwise: () => distanceRowwise,
	firstCellColumnwise: () => firstCellColumnwise,
	getLine: () => getLine,
	getVectorFromCardinal: () => getVectorFromCardinal,
	gridString: () => gridString,
	guardCell_: () => guardCell_,
	indexFromCell: () => indexFromCell,
	indexFromCellJagged: () => indexFromCellJagged,
	indexFromCellUniform: () => indexFromCellUniform,
	inside: () => inside,
	isCell: () => isCell,
	isEqual: () => isEqual$1,
	isJaggedGrid: () => isJaggedGrid,
	isPlaceholderCell: () => isPlaceholderCell,
	lastCellColumnwise: () => lastCellColumnwise,
	lastCellRowwise: () => lastCellRowwise,
	neighbourList: () => neighbourList,
	neighbours: () => neighbours,
	offset: () => offset,
	offsetCardinals: () => offsetCardinals,
	randomNeighbour: () => randomNeighbour,
	rectangleForCell: () => rectangleForCell,
	simpleLine: () => simpleLine,
	testCell: () => testCell,
	testGrid: () => testGrid,
	testJaggedGrid: () => testJaggedGrid,
	testUniformGrid: () => testUniformGrid,
	toArray2d: () => toArray2d,
	values: () => values
});

//#endregion
//#region ../packages/geometry/src/triangle/create.ts
/**
* A triangle consisting of three empty points (Points.Empty)
*/
const Empty = Object.freeze({
	a: {
		x: 0,
		y: 0
	},
	b: {
		x: 0,
		y: 0
	},
	c: {
		x: 0,
		y: 0
	}
});
/**
* A triangle consisting of three placeholder points (Points.Placeholder)
*/
const Placeholder = Object.freeze({
	a: {
		x: NaN,
		y: NaN
	},
	b: {
		x: NaN,
		y: NaN
	},
	c: {
		x: NaN,
		y: NaN
	}
});
/**
* Returns a triangle anchored at `origin` with a given `length` and `angleRadian`.
* The origin will be point `b` of the triangle, and the angle will be the angle for b.
* @param origin Origin
* @param length Length
* @param angleRadian Angle
* @returns
*/
const equilateralFromVertex = (origin, length = 10, angleRadian = Math.PI / 2) => {
	if (!origin) origin = Object.freeze({
		x: 0,
		y: 0
	});
	const a = project(origin, length, Math.PI - -angleRadian / 2);
	const c = project(origin, length, Math.PI - angleRadian / 2);
	return {
		a,
		b: origin,
		c
	};
};

//#endregion
//#region ../packages/geometry/src/shape/arrow.ts
/**
* Returns the points forming an arrow.
*
* @example Create an arrow anchored by its tip at 100,100
* ```js
* const opts = {
*  tailLength: 10,
*  arrowSize: 20,
*  tailThickness: 5,
*  angleRadian: degreeToRadian(45)
* }
* const arrow = Shapes.arrow({x:100, y:100}, `tip`, opts); // Yields an array of points
*
* // Eg: draw points
* Drawing.connectedPoints(ctx, arrow, {strokeStyle: `red`, loop: true});
* ```
*
* @param origin Origin of arrow
* @param from Does origin describe the tip, tail or middle?
* @param opts Options for arrow
* @returns
*/
const arrow = (origin, from, opts = {}) => {
	const tailLength = opts.tailLength ?? 10;
	const tailThickness = opts.tailThickness ?? Math.max(tailLength / 5, 5);
	const angleRadian = opts.angleRadian ?? 0;
	const arrowSize = opts.arrowSize ?? Math.max(tailLength / 5, 15);
	const triAngle = Math.PI / 2;
	let tri;
	let tailPoints;
	if (from === `tip`) {
		tri = equilateralFromVertex(origin, arrowSize, triAngle);
		tailPoints = corners$1(fromTopLeft({
			x: tri.a.x - tailLength,
			y: origin.y - tailThickness / 2
		}, tailLength, tailThickness));
	} else if (from === `middle`) {
		const midX = tailLength + arrowSize / 2;
		const midY = tailThickness / 2;
		tri = equilateralFromVertex({
			x: origin.x + arrowSize * 1.2,
			y: origin.y
		}, arrowSize, triAngle);
		tailPoints = corners$1(fromTopLeft({
			x: origin.x - midX,
			y: origin.y - midY
		}, tailLength + arrowSize, tailThickness));
	} else {
		tailPoints = corners$1(fromTopLeft({
			x: origin.x,
			y: origin.y - tailThickness / 2
		}, tailLength, tailThickness));
		tri = equilateralFromVertex({
			x: origin.x + tailLength + arrowSize * .7,
			y: origin.y
		}, arrowSize, triAngle);
	}
	return rotate$1([
		tailPoints[0],
		tailPoints[1],
		tri.a,
		tri.b,
		tri.c,
		tailPoints[2],
		tailPoints[3]
	], angleRadian, origin);
};

//#endregion
//#region ../packages/geometry/src/triangle/guard.ts
/**
* Throws an exception if the triangle is invalid
* @param t
* @param name
*/
const guard = (t, name = `t`) => {
	if (t === void 0) throw new Error(`{$name} undefined`);
	guard$5(t.a, name + `.a`);
	guard$5(t.b, name + `.b`);
	guard$5(t.c, name + `.c`);
};
/**
* Returns true if the parameter appears to be a valid triangle
* @param p
* @returns
*/
const isTriangle = (p) => {
	if (p === void 0) return false;
	const tri = p;
	if (!isPoint(tri.a)) return false;
	if (!isPoint(tri.b)) return false;
	if (!isPoint(tri.c)) return false;
	return true;
};
/**
* Returns true if triangle is empty
* @param t
* @returns
*/
const isEmpty = (t) => isEmpty$3(t.a) && isEmpty$3(t.b) && isEmpty$3(t.c);
/**
* Returns true if triangle is a placeholder
* @param t
* @returns
*/
const isPlaceholder = (t) => isPlaceholder$3(t.a) && isPlaceholder$3(t.b) && isPlaceholder$3(t.c);
/**
* Returns true if the two parameters have equal values
* @param a
* @param b
* @returns
*/
const isEqual = (a, b) => isEqual$5(a.a, b.a) && isEqual$5(a.b, b.b) && isEqual$5(a.c, b.c);

//#endregion
//#region ../packages/geometry/src/triangle/centroid.ts
/**
* Returns simple centroid of triangle
* @param t
* @returns
*/
const centroid = (t) => {
	guard(t);
	const total = reduce([
		t.a,
		t.b,
		t.c
	], (p, accumulator) => ({
		x: p.x + accumulator.x,
		y: p.y + accumulator.y
	}));
	return {
		x: total.x / 3,
		y: total.y / 3
	};
};

//#endregion
//#region ../packages/geometry/src/shape/etc.ts
/**
* Returns a random point within a shape.
* `shape` can be {@link Circles.CirclePositioned} or {@link Rects.RectPositioned}
* @param shape 
* @param opts 
* @returns 
*/
const randomPoint = (shape, opts = {}) => {
	if (isCirclePositioned(shape)) return randomPoint$1(shape, opts);
	else if (isRectPositioned(shape)) return randomPoint$2(shape, opts);
	throw new Error(`Unknown shape. Only CirclePositioned and RectPositioned are supported.`);
};
/**
* Returns the center of a shape
* Shape can be: rectangle, triangle, circle
* @param shape
* @returns
*/
const center = (shape) => {
	if (shape === void 0) return Object.freeze({
		x: .5,
		y: .5
	});
	else if (isRect(shape)) return center$2(shape);
	else if (isTriangle(shape)) return centroid(shape);
	else if (isCircle(shape)) return center$1(shape);
	else throw new Error(`Unknown shape: ${JSON.stringify(shape)}`);
};

//#endregion
//#region ../packages/geometry/src/shape/is-intersecting.ts
/**
* Returns the intersection result between a and b.
* `a` can be a {@link Circles.CirclePositioned} or {@link Rects.RectPositioned}
* `b` can be as above or a {@link Point}.
* @param a
* @param b
*/
function isIntersecting(a, b) {
	if (isCirclePositioned(a)) return isIntersecting$1(a, b);
	else if (isRectPositioned(a)) return isIntersecting$2(a, b);
	throw new Error(`a or b are unknown shapes. a: ${JSON.stringify(a)} b: ${JSON.stringify(b)}`);
}

//#endregion
//#region ../packages/geometry/src/shape/starburst.ts
/**
* Generates a starburst shape, returning an array of points. By default, initial point is top and horizontally-centred.
*
* ```
* // Generate a starburst with four spikes
* const pts = starburst(4, 100, 200);
* ```
*
* `points` of two produces a lozenge shape.
* `points` of three produces a triangle shape.
* `points` of five is the familiar 'star' shape.
*
* Note that the path will need to be closed back to the first point to enclose the shape.
*
* @example Create starburst and draw it. Note use of 'loop' flag to close the path
* ```
* const points = starburst(4, 100, 200);
* Drawing.connectedPoints(ctx, pts, {loop: true, fillStyle: `orange`, strokeStyle: `red`});
* ```
*
* Options:
* * initialAngleRadian: angle offset to begin from. This overrides the `-Math.PI/2` default.
*
* @param points Number of points in the starburst. Defaults to five, which produces a typical star
* @param innerRadius Inner radius. A proportionally smaller inner radius makes for sharper spikes. If unspecified, 50% of the outer radius is used.
* @param outerRadius Outer radius. Maximum radius of a spike to origin
* @param opts Options
* @param origin Origin, or `{ x:0, y:0 }` by default.
*/
const starburst = (outerRadius, points = 5, innerRadius, origin = Empty$2, opts) => {
	resultThrow(integerTest(points, `positive`, `points`));
	const angle = Math.PI * 2 / points;
	const angleHalf = angle / 2;
	const initialAngle = opts?.initialAngleRadian ?? -Math.PI / 2;
	if (innerRadius === void 0) innerRadius = outerRadius / 2;
	let a = initialAngle;
	const pts = [];
	for (let index = 0; index < points; index++) {
		const peak = toCartesian$2(outerRadius, a, origin);
		const left = toCartesian$2(innerRadius, a - angleHalf, origin);
		const right = toCartesian$2(innerRadius, a + angleHalf, origin);
		pts.push(left, peak);
		if (index + 1 < points) pts.push(right);
		a += angle;
	}
	return pts;
};

//#endregion
//#region ../packages/geometry/src/shape/index.ts
var shape_exports = /* @__PURE__ */ __exportAll({
	arrow: () => arrow,
	center: () => center,
	isIntersecting: () => isIntersecting,
	randomPoint: () => randomPoint,
	starburst: () => starburst
});

//#endregion
//#region ../packages/geometry/src/layout/circle-packing.ts
var circle_packing_exports = /* @__PURE__ */ __exportAll({ random: () => random });
/**
* Naive randomised circle packing.
* [Algorithm by Taylor Hobbs](https://tylerxhobbs.com/essays/2016/a-randomized-approach-to-cicle-packing)
*/
const random = (circles, container, opts = {}) => {
	if (!Array.isArray(circles)) throw new Error(`Parameter 'circles' is not an array`);
	const attempts = opts.attempts ?? 2e3;
	const sorted = sortByNumericProperty(circles, `radius`);
	const positionedCircles = [];
	const willHit = (b, radius) => positionedCircles.some((v) => isIntersecting$1(v, b, radius));
	while (sorted.length > 0) {
		const circle = sorted.pop();
		if (!circle) break;
		const randomPointOpts = {
			...opts,
			margin: circle.radius
		};
		for (let index = 0; index < attempts; index++) {
			const position = randomPoint(container, randomPointOpts);
			if (!willHit(position, circle.radius)) {
				positionedCircles.push(Object.freeze({
					...circle,
					...position
				}));
				break;
			}
		}
	}
	return positionedCircles;
};

//#endregion
//#region ../packages/geometry/src/layout/ring.ts
/**
* Generates points spaced out on the given number of rings.
*
* Get points as array
* ```js
* const circle = { radius: 5, x: 100, y: 100 };
* const opts = { rings: 5 };
* const points = [...circleRings(circle, rings)];
* ```
*
* Or iterate over them
* ```js
* for (const point of circleRings(circle, opts)) {
* }
* ```
* Source: http://www.holoborodko.com/pavel/2015/07/23/generating-equidistant-points-on-unit-disk/#more-3453
* @param circle
*/
function* circleRings(circle, opts = {}) {
	const rings = opts.rings ?? 5;
	const c = toPositioned(circle ?? {
		radius: 1,
		x: 0,
		y: 0
	});
	const ringR = 1 / rings;
	const rotationOffset = opts.rotation ?? 0;
	const cos = Math.cos;
	const sin = Math.sin;
	const asin = Math.asin;
	const pi = Math.PI;
	const piPi = Math.PI * 2;
	let ringCount = 1;
	yield Object.freeze({
		x: c.x,
		y: c.y
	});
	for (let r = ringR; r <= 1; r += ringR) {
		const n = Math.round(pi / asin(1 / (2 * ringCount)));
		for (const theta of linearSpace(0, piPi, n + 1)) yield Object.freeze({
			x: c.x + r * cos(theta + rotationOffset) * c.radius,
			y: c.y + r * sin(theta + rotationOffset) * c.radius
		});
		ringCount++;
	}
}

//#endregion
//#region ../packages/geometry/src/layout.ts
var layout_exports = /* @__PURE__ */ __exportAll({
	CirclePacking: () => circle_packing_exports,
	circleRings: () => circleRings
});

//#endregion
//#region ../packages/geometry/src/path/start-end.ts
/**
* Return the start point of a path
*
* @param path
* @return Point
*/
const getStart = function(path) {
	if (isQuadraticBezier(path)) return path.a;
	else if (isLine(path)) return path.a;
	else throw new Error(`Unknown path type ${JSON.stringify(path)}`);
};
/**
* Return the end point of a path
*
* @param path
* @return Point
*/
const getEnd = function(path) {
	if (isQuadraticBezier(path)) return path.b;
	else if (isLine(path)) return path.b;
	else throw new Error(`Unknown path type ${JSON.stringify(path)}`);
};

//#endregion
//#region ../packages/geometry/src/path/compound-path.ts
var compound_path_exports = /* @__PURE__ */ __exportAll({
	bbox: () => bbox$1,
	computeDimensions: () => computeDimensions,
	distanceToPoint: () => distanceToPoint,
	fromPaths: () => fromPaths,
	guardContinuous: () => guardContinuous,
	interpolate: () => interpolate,
	relativePosition: () => relativePosition,
	setSegment: () => setSegment,
	toString: () => toString,
	toSvgString: () => toSvgString
});
/**
* Returns a new compoundpath, replacing a path at a given index
*
* @param compoundPath Existing compoundpath
* @param index Index to replace at
* @param path Path to substitute in
* @returns New compoundpath
*/
const setSegment = (compoundPath, index, path) => {
	const existing = [...compoundPath.segments];
	existing[index] = path;
	return fromPaths(...existing);
};
/**
* Computes x,y point at a relative position along compoundpath
*
* @param paths Combined paths (assumes contiguous)
* @param t Position (given as a percentage from 0 to 1)
* @param useWidth If true, widths are used for calulcating. If false, lengths are used
* @param dimensions Precalculated dimensions of paths, will be computed if omitted
* @returns
*/
const interpolate = (paths, t, useWidth, dimensions) => {
	if (dimensions === void 0) dimensions = computeDimensions(paths);
	const expected = t * (useWidth ? dimensions.totalWidth : dimensions.totalLength);
	let soFar = 0;
	const l = useWidth ? dimensions.widths : dimensions.lengths;
	for (const [index, element] of l.entries()) if (soFar + element >= expected) {
		let amt = (expected - soFar) / element;
		if (amt > 1) amt = 1;
		return paths[index].interpolate(amt);
	} else soFar += element;
	return {
		x: 0,
		y: 0
	};
};
/**
* Returns the shortest distance of `point` to any point on `paths`.
* @param paths 
* @param point 
* @returns 
*/
const distanceToPoint = (paths, point) => {
	if (paths.length === 0) return 0;
	let distances = paths.map((p, index) => ({
		path: p,
		index,
		distance: p.distanceToPoint(point)
	}));
	distances = sortByNumericProperty(distances, `distance`);
	if (distances.length === 0) throw new Error(`Could not look up distances`);
	return distances[0].distance;
};
/**
* Relative position
* @param paths Paths
* @param point Point
* @param intersectionThreshold Threshold 
* @param dimensions Pre-computed dimensions
* @returns 
*/
const relativePosition = (paths, point, intersectionThreshold, dimensions) => {
	if (dimensions === void 0) dimensions = computeDimensions(paths);
	let distances = paths.map((p, index) => ({
		path: p,
		index,
		distance: p.distanceToPoint(point)
	}));
	distances = sortByNumericProperty(distances, `distance`);
	if (distances.length < 0) throw new Error(`Point does not intersect with path`);
	const d = distances[0];
	if (d.distance > intersectionThreshold) throw new Error(`Point does not intersect with path. Minimum distance: ${d.distance}, threshold: ${intersectionThreshold}`);
	const relativePositionOnPath = d.path.relativePosition(point, intersectionThreshold);
	let accumulated = 0;
	for (let index = 0; index < d.index; index++) accumulated += dimensions.lengths[index];
	accumulated += dimensions.lengths[d.index] * relativePositionOnPath;
	const accumulatedRel = accumulated / dimensions.totalLength;
	console.log(`acc: ${accumulated} rel: ${accumulatedRel} on path: ${relativePositionOnPath} path: ${d.index}`);
	return accumulatedRel;
};
/**
* Computes the widths and lengths of all paths, adding them up as well
*
* @param paths
* @returns
*/
const computeDimensions = (paths) => {
	const widths = paths.map((l) => l.bbox().width);
	const lengths = paths.map((l) => l.length());
	let totalLength = 0;
	let totalWidth = 0;
	for (const length of lengths) totalLength += length;
	for (const width of widths) totalWidth += width;
	return {
		totalLength,
		totalWidth,
		widths,
		lengths
	};
};
/**
* Computes the bounding box that encloses entire compoundpath
*
* @param paths
* @returns
*/
const bbox$1 = (paths) => {
	return bbox$5(...paths.map((p) => p.bbox()).flatMap((b) => corners$1(b)));
};
/**
* Produce a human-friendly representation of paths
*
* @param paths
* @returns
*/
const toString = (paths) => paths.map((p) => p.toString()).join(`, `);
/**
* Throws an error if paths are not connected together, in order
*
* @param paths
*/
const guardContinuous = (paths) => {
	let lastPos = getEnd(paths[0]);
	for (let index = 1; index < paths.length; index++) {
		const start = getStart(paths[index]);
		if (!isEqual$5(start, lastPos)) throw new Error(`Path index ${index} does not start at prior path end. Start: ${start.x},${start.y} expected: ${lastPos.x},${lastPos.y}`);
		lastPos = getEnd(paths[index]);
	}
};
const toSvgString = (paths) => paths.flatMap((p) => p.toSvgString());
/**
* Create a compoundpath from an array of paths.
* All this does is verify they are connected, and precomputes dimensions
*
* @param paths
* @returns
*/
const fromPaths = (...paths) => {
	guardContinuous(paths);
	const dims = computeDimensions(paths);
	return Object.freeze({
		segments: paths,
		length: () => dims.totalLength,
		nearest: (_) => {
			throw new Error(`not implemented`);
		},
		interpolate: (t, useWidth = false) => interpolate(paths, t, useWidth, dims),
		relativePosition: (point, intersectionThreshold) => relativePosition(paths, point, intersectionThreshold, dims),
		distanceToPoint: (point) => distanceToPoint(paths, point),
		bbox: () => bbox$1(paths),
		toString: () => toString(paths),
		toSvgString: () => toSvgString(paths),
		kind: `compound`
	});
};

//#endregion
//#region ../packages/geometry/src/path/index.ts
var path_exports = /* @__PURE__ */ __exportAll({
	bbox: () => bbox$1,
	computeDimensions: () => computeDimensions,
	distanceToPoint: () => distanceToPoint,
	fromPaths: () => fromPaths,
	getEnd: () => getEnd,
	getStart: () => getStart,
	guardContinuous: () => guardContinuous,
	interpolate: () => interpolate,
	relativePosition: () => relativePosition,
	setSegment: () => setSegment,
	toString: () => toString,
	toSvgString: () => toSvgString
});

//#endregion
//#region ../packages/geometry/src/quad-tree.ts
var quad_tree_exports = /* @__PURE__ */ __exportAll({
	Direction: () => Direction,
	QuadTreeNode: () => QuadTreeNode,
	quadTree: () => quadTree
});
/**
* Direction
*/
let Direction = /* @__PURE__ */ function(Direction) {
	Direction[Direction["Nw"] = 0] = "Nw";
	Direction[Direction["Ne"] = 1] = "Ne";
	Direction[Direction["Sw"] = 2] = "Sw";
	Direction[Direction["Se"] = 3] = "Se";
	return Direction;
}({});
/**
* Creates a QuadTreeNode
* @param bounds Bounds of region
* @param initialData Initial items to place in quad tree
* @param opts Options
* @returns New quad tree
*/
function quadTree(bounds, initialData = [], opts = {}) {
	const n = new QuadTreeNode(void 0, bounds, 0, {
		maxItems: opts.maxItems ?? 4,
		maxLevels: opts.maxLevels ?? 4
	});
	for (const d of initialData) n.add(d);
	return n;
}
/**
* QuadTreeNode. The values of the node is an array of {@link QuadTreeItem}.
*
* To create, you probably want the {@link quadTree} function.
*
*/
var QuadTreeNode = class QuadTreeNode {
	#items = [];
	#children = [];
	#parent;
	/**
	* Constructor
	* @param boundary
	* @param level
	* @param opts
	*/
	constructor(parent, boundary, level, opts) {
		this.boundary = boundary;
		this.level = level;
		this.opts = opts;
		this.#parent = parent;
	}
	getLengthChildren() {
		return this.#children.length;
	}
	*parents() {
		let n = this;
		while (n.#parent !== void 0) {
			yield n.#parent;
			n = n.#parent;
		}
	}
	getParent() {
		return this.#parent;
	}
	/**
	* Iterates over immediate children
	*/
	*children() {
		for (const c of this.#children) yield c;
	}
	/**
	* Array of QuadTreeItem
	* @returns
	*/
	getValue() {
		return this.#items;
	}
	getIdentity() {
		return this;
	}
	/**
	* Get a descendant node in a given direction
	* @param d
	* @returns
	*/
	direction(d) {
		return this.#children[d];
	}
	/**
	* Add an item to the quadtree
	* @param p
	* @returns False if item is outside of boundary, True if item was added
	*/
	add(p) {
		if (!isIntersecting(this.boundary, p)) return false;
		if (this.#children.length > 0) {
			for (const d of this.#children) d.add(p);
			return true;
		}
		this.#items.push(p);
		if (this.#items.length > this.opts.maxItems && this.level < this.opts.maxLevels) {
			if (this.#children.length === 0) this.#subdivide();
			for (const item of this.#items) for (const d of this.#children) d.add(item);
			this.#items = [];
		}
		return true;
	}
	/**
	* Returns true if point is inside node's boundary
	* @param p
	* @returns
	*/
	couldHold(p) {
		return intersectsPoint$1(this.boundary, p);
	}
	#subdivide() {
		const w = this.boundary.width / 2;
		const h = this.boundary.height / 2;
		const x = this.boundary.x;
		const y = this.boundary.y;
		this.#children = fromNumbers$1(x + w, y, x, y, x, y + h, x + w, y + h).map((p) => fromTopLeft(p, w, h)).map((r) => new QuadTreeNode(this, r, this.level + 1, this.opts));
	}
};

//#endregion
//#region ../packages/geometry/src/raycast.ts
var raycast_exports = /* @__PURE__ */ __exportAll({
	asFan: () => asFan,
	intersections: () => intersections,
	raycast2d: () => raycast2d
});
/**
* Yields the intersecting points from `a` to `b` against a set of lines.
* 
* ```js
* const a = { x: 0, y: 0 };
* const b = { x: 640, y: 320 };
* for (const point of G.Rays.intersections(a,b, lines)) {
*  // Do something with  { x,, y } 
* }
* ```
* 
* Results are a {@link RaycastHit}, consisting of `x,y` for coordinates,
* `d` for relative distance of point from `a`, and `line` which is the index of the line.
* @param a 
* @param b 
* @param lines 
*/
function* intersections(a, b, lines) {
	for (let index = 0; index < lines.length; index++) {
		const line = lines[index];
		const d = intersectDistanceRay(a.x, a.y, b.x, b.y, [
			line.a.x,
			line.a.y,
			line.b.x,
			line.b.y
		]);
		if (Number.isFinite(d)) {
			const t = Math.sqrt(d);
			yield {
				x: a.x + b.x * t,
				y: a.y + b.y * t,
				d: t,
				line: index
			};
		}
	}
}
function intersectDistanceRay(ox, oy, dx, dy, s) {
	const vx = s[2] - s[0];
	const vy = s[3] - s[1];
	const wx = s[0] - ox;
	const wy = s[1] - oy;
	const d = crossProductRaw(dx, dy, vx, vy);
	if (d === 0) return Infinity;
	const t = crossProductRaw(wx, wy, vx, vy) / d;
	if (t <= 0) return Infinity;
	const u = crossProductRaw(wx, wy, dx, dy) / d;
	if (u < 0 || u > 1) return Infinity;
	return t * t;
}
/**
* Returns a function that performs raycasting.
* 
* The raycast function takes in the position of a ray source,
* and returns the x,y coordinates of where rays land on a provided list of lines.
* 
* ```js
* const raycaster = raycast2d(lines);
* const light = { x: 10, y: 20 }
* raycaster(light); // Yields: { x, y, index }
* ```
* 
* An `index` property is given for each coordinate, which corresponds to the `lines` array.
* This allows correspondence between hits and lines.
* @param lines 
* @returns 
*/
function raycast2d(lines) {
	const segments = lines.map((l) => [
		l.a.x,
		l.a.y,
		l.b.x,
		l.b.y
	]);
	return (light) => raycast2dImpl(light, segments);
}
function raycast2dImpl(light, segments, threshold = 1e-4) {
	const ox = light.x;
	const oy = light.y;
	const events = [];
	for (let index = 0; index < segments.length; index++) {
		const s = segments[index];
		const a1 = Math.atan2(s[1] - oy, s[0] - ox);
		const a2 = Math.atan2(s[3] - oy, s[2] - ox);
		events.push({
			angle: a1 - threshold,
			x: Math.cos(a1 - threshold),
			y: Math.sin(a1 - threshold)
		}, {
			angle: a1,
			x: Math.cos(a1),
			y: Math.sin(a1)
		}, {
			angle: a1 + threshold,
			x: Math.cos(a1 + threshold),
			y: Math.sin(a1 + threshold)
		}, {
			angle: a2 - threshold,
			x: Math.cos(a2 - threshold),
			y: Math.sin(a2 - threshold)
		}, {
			angle: a2,
			x: Math.cos(a2),
			y: Math.sin(a2)
		}, {
			angle: a2 + threshold,
			x: Math.cos(a2 + threshold),
			y: Math.sin(a2 + threshold)
		});
	}
	events.sort((a, b) => a.angle - b.angle);
	const result = [];
	for (let eventIndex = 0; eventIndex < events.length; eventIndex++) {
		const event = events[eventIndex];
		let min = Infinity;
		let hitX = 0;
		let hitY = 0;
		let hitIndex = -1;
		for (let s = 0; s < segments.length; s++) {
			const d = intersectDistanceRay(ox, oy, event.x, event.y, segments[s]);
			if (d < min) {
				min = d;
				const t = Math.sqrt(d);
				hitX = ox + event.x * t;
				hitY = oy + event.y * t;
				hitIndex = s;
			}
		}
		if (min < Infinity) result.push({
			d: min,
			x: hitX,
			y: hitY,
			line: hitIndex
		});
	}
	return result;
}
function asFan(samples, light) {
	const cx = light.x;
	const cy = light.y;
	samples.sort((a, b) => Math.atan2(a.y - cy, a.x - cx) - Math.atan2(b.y - cy, b.x - cx));
	samples.push({ ...samples[0] });
	return samples;
}

//#endregion
//#region ../packages/geometry/src/scaler.ts
/**
* Returns a set of scaler functions, to convert to and from ranges.
*
* ```js
* const scaler = Scaler.scaler(`both`, {width:window.innerWidth, height:window.innerHeight});
* // Assuming screen of 800x400...
* scaler.abs(400,200);          // Yields { x:0.5, y:0.5 }
* scaler.abs({ x:400, y:200 }); // Yields { x:0.5, y:0.5 }
*
* scaler.rel(0.5, 0.5);         // Yields: { x:400, y:200 }
* scaler.rel({ x:0.5, y:0.5 }); // Yields: { x:400, y:200 }
* ```
*
* If no default range is provided, it must be given each time the scale function is used.
*
* ```js
* const scaler = Scaler.scaler(`both`);
*
* scaler.abs(400, 200, 800, 400);
* scaler.abs(400, 200, { width: 800, height: 400 });
* scaler.abs({ x:400, y: 200}, { width: 800, height: 400 });
* scaler.abs({ x:400, y: 200}, 800, 400);
* // All are the same, yielding { x:0.5, y:0.5 }
*
* scaler.abs(400, 200); // Throws an exception because there is no scale
* ```
* @param scaleBy Dimension to scale by
* @param defaultRect Default range
* @returns
*/
const scaler = (scaleBy = `both`, defaultRect) => {
	const defaultBounds = defaultRect ?? Placeholder$3;
	let sw = 1;
	let sh = 1;
	let s = {
		x: 1,
		y: 1
	};
	const computeScale = () => {
		switch (scaleBy) {
			case `height`: return {
				x: sh,
				y: sh
			};
			case `width`: return {
				x: sw,
				y: sw
			};
			case `min`: return {
				x: Math.min(sw, sh),
				y: Math.min(sw, sh)
			};
			case `max`: return {
				x: Math.max(sw, sh),
				y: Math.max(sw, sh)
			};
			default: return {
				x: sw,
				y: sh
			};
		}
	};
	const normalise = (a, b, c, d) => {
		let inX = NaN;
		let inY = NaN;
		let outW = defaultBounds.width;
		let outH = defaultBounds.height;
		if (typeof a === `number`) {
			inX = a;
			if (typeof b === `number`) {
				inY = b;
				if (c === void 0) return [
					inX,
					inY,
					outW,
					outH
				];
				if (isRect(c)) {
					outW = c.width;
					outH = c.height;
				} else if (typeof c === `number`) {
					outW = c;
					if (typeof d === `number`) outH = d;
					else throw new TypeError(`Missing final height value`);
				} else throw new Error(`Missing valid output range`);
			} else if (isRect(b)) {
				outW = b.width;
				outH = b.height;
			} else throw new Error(`Expected input y or output Rect to follow first number parameter`);
		} else if (isPoint(a)) {
			inX = a.x;
			inY = a.y;
			if (b === void 0) return [
				inX,
				inY,
				outW,
				outH
			];
			if (isRect(b)) {
				outW = b.width;
				outH = b.height;
			} else if (typeof b === `number`) {
				outW = b;
				if (typeof c === `number`) outH = c;
				else throw new TypeError(`Expected height as third parameter after Point and output width`);
			} else throw new TypeError(`Expected Rect or width as second parameter when first parameter is a Point`);
		} else throw new Error(`Expected input Point or x value as first parameter`);
		return [
			inX,
			inY,
			outW,
			outH
		];
	};
	const scaleAbs = (a, b, c, d) => {
		return scaleNormalised(true, ...normalise(a, b, c, d));
	};
	const scaleRel = (a, b, c, d) => {
		return scaleNormalised(false, ...normalise(a, b, c, d));
	};
	const scaleNormalised = (abs, x, y, w, h) => {
		if (Number.isNaN(w)) throw new Error(`Output width range missing`);
		if (Number.isNaN(h)) throw new Error(`Output height range missing`);
		if (w !== sw || h !== sh) {
			sw = w;
			sh = h;
			s = computeScale();
		}
		return abs ? {
			x: x * s.x,
			y: y * s.y
		} : {
			x: x / s.x,
			y: y / s.y
		};
	};
	return {
		computeScale,
		rel: scaleRel,
		abs: scaleAbs,
		width: defaultBounds.width,
		height: defaultBounds.height
	};
};

//#endregion
//#region ../packages/geometry/src/surface-points.ts
var surface_points_exports = /* @__PURE__ */ __exportAll({
	circleVogelSpiral: () => circleVogelSpiral,
	ring: () => ring,
	sphereFibonacci: () => sphereFibonacci
});
const cos = Math.cos;
const sin = Math.sin;
const sqrt = Math.sqrt;
const pow = Math.pow;
const pi = Math.PI;
const piPi = Math.PI * 2;
const goldenAngle = pi * (3 - sqrt(5));
const goldenSection = (1 + sqrt(5)) / 2;
/**
* Generates points on a Vogel spiral - a sunflower-like arrangement of points.
*
* @example With no arguments, assumes a unit circle
* ```js
* for (const pt of circleVogelSpiral()) {
*  // Generate points on a unit circle, with 95% density
* }
* ```
*
*
* @example Specifying a circle and options
* ```js
* const circle = { radius: 100, x: 100, y: 100 };
* const opts = {
*  maxPoints: 50,
*  density: 0.99
* };
* for (const pt of circleVogelSpiral(circle, opts)) {
*  // Do something with point...
* }
* ```
*
* @example Array format
* ```js
* const ptsArray = [...circleVogelSpiral(circle, opts)];
* ```
* @param circle
* @param opts
*/
function* circleVogelSpiral(circle, opts = {}) {
	const maxPoints = opts.maxPoints ?? 5e3;
	const density = opts.density ?? .95;
	const rotationOffset = opts.rotation ?? 0;
	const c = toPositioned(circle ?? {
		radius: 1,
		x: 0,
		y: 0
	});
	const max = c.radius;
	let spacing = c.radius * scale(density, 0, 1, .3, .01);
	if (opts.spacing) spacing = opts.spacing;
	let radius = 0;
	let count = 0;
	let angle = 0;
	while (count < maxPoints && radius < max) {
		radius = spacing * count ** .5;
		angle = rotationOffset + count * 2 * pi / goldenSection;
		yield Object.freeze({
			x: c.x + radius * cos(angle),
			y: c.y + radius * sin(angle)
		});
		count++;
	}
}
/**
* Fibonacci sphere algorithm. Generates points
* distributed on a sphere.
*
* @example Generate points of a unit sphere
* ```js
* for (const pt of sphereFibonacci(100)) {
*  // pt.x, pt.y, pt.z
* }
* ```
*
* @example Generate points into an array
* ```js
* const sphere = { radius: 10, x: 10, y: 200 }
* const pts = [...sphereFibonacci(100, 0, sphere)];
* ```
*
* Source: https://codepen.io/elchininet/pen/vXeRyL
*
* @param samples
* @returns
*/
function* sphereFibonacci(samples = 100, rotationRadians = 0, sphere) {
	const offset = 2 / samples;
	const s = sphere ?? {
		x: 0,
		y: 0,
		z: 0,
		radius: 1
	};
	for (let index = 0; index < samples; index++) {
		const y = index * offset - 1 + offset / 2;
		const r = sqrt(1 - pow(y, 2));
		const a = (index + 1) % samples * goldenAngle + rotationRadians;
		const x = cos(a) * r;
		const z = sin(a) * r;
		yield Object.freeze({
			x: s.x + x * s.radius,
			y: s.y + y * s.radius,
			z: s.z + z * s.radius
		});
	}
}
/**
* Yields points distributed around a ring.
* ```js
* // 5 points evenly distributed
* for (const point of ring(circle, { count: 5})) {
*   // { x, y }
* }
* 
* // Get a list of points, spaced by 10 degrees
* const points = [...ring(circle, { degrees: 0.1 })]
* ```
* @param circle 
* @param opts 
*/
function* ring(circle, opts) {
	let intervalRad = pi;
	let angleRadian = opts.offset ?? 0;
	if (`count` in opts) intervalRad = (piPi - angleRadian) / opts.count;
	else if (`radians` in opts) intervalRad = opts.radians;
	else if (`degrees` in opts) intervalRad = degreeToRadian(opts.degrees);
	if (angleRadian < 0) throw new Error(`Offset should be at least 0`);
	if (angleRadian > piPi) throw new Error(`Offset should be less than 2*PI`);
	if (intervalRad === 0) throw new Error(`Interval cannot be 0`);
	while (angleRadian < piPi) {
		yield toCartesian$2({
			angleRadian,
			distance: circle.radius
		}, circle);
		angleRadian += intervalRad;
	}
}

//#endregion
//#region ../packages/geometry/src/triangle/angles.ts
/**
* Return the three interior angles of the triangle, in radians.
* @param t
* @returns
*/
const angles = (t) => {
	guard(t);
	return [
		angleRadian$1(t.a, t.b),
		angleRadian$1(t.b, t.c),
		angleRadian$1(t.c, t.a)
	];
};
/**
* Returns the three interior angles of the triangle, in degrees
* @param t
* @returns
*/
const anglesDegrees = (t) => {
	guard(t);
	return radianToDegree(angles(t));
};

//#endregion
//#region ../packages/geometry/src/triangle/edges.ts
/**
* Returns the edges (ie sides) of the triangle as an array of lines
* @param t
* @returns Array of length three
*/
const edges = (t) => {
	guard(t);
	return joinPointsToLines(t.a, t.b, t.c, t.a);
};

//#endregion
//#region ../packages/geometry/src/triangle/area.ts
/**
* Calculates the area of a triangle
* @param t
* @returns
*/
const area$3 = (t) => {
	guard(t, `t`);
	const lengths = edges(t).map((l) => length$3(l));
	const p = (lengths[0] + lengths[1] + lengths[2]) / 2;
	return Math.sqrt(p * (p - lengths[0]) * (p - lengths[1]) * (p - lengths[2]));
};

//#endregion
//#region ../packages/geometry/src/triangle/barycentric.ts
/**
* Returns the [Barycentric coordinate](https://en.wikipedia.org/wiki/Barycentric_coordinate_system) of a point within a triangle
*
* @param t
* @param a
* @param b
* @returns
*/
const barycentricCoord = (t, a, b) => {
	const pt = getPointParameter$1(a, b);
	const ab = (x, y, pa, pb) => (pa.y - pb.y) * x + (pb.x - pa.x) * y + pa.x * pb.y - pb.x * pa.y;
	return {
		a: ab(pt.x, pt.y, t.b, t.c) / ab(t.a.x, t.a.y, t.b, t.c),
		b: ab(pt.x, pt.y, t.c, t.a) / ab(t.b.x, t.b.y, t.c, t.a),
		c: ab(pt.x, pt.y, t.a, t.b) / ab(t.c.x, t.c.y, t.a, t.b)
	};
};
/**
* Convert Barycentric coordinate to Cartesian
* @param t
* @param bc
* @returns
*/
const barycentricToCartestian = (t, bc) => {
	guard(t);
	const { a, b, c } = t;
	const x = a.x * bc.a + b.x * bc.b + c.x * bc.c;
	const y = a.y * bc.a + b.y * bc.b + c.y * bc.c;
	if (a.z && b.z && c.z) {
		const z = a.z * bc.a + b.z * bc.b + c.z * bc.c;
		return Object.freeze({
			x,
			y,
			z
		});
	} else return Object.freeze({
		x,
		y
	});
};

//#endregion
//#region ../packages/geometry/src/triangle/bbox.ts
/**
* Returns the bounding box that encloses the triangle.
* @param t
* @param inflation If specified, box will be inflated by this much. Default: 0.
* @returns
*/
const bbox = (t, inflation = 0) => {
	const { a, b, c } = t;
	const xMin = Math.min(a.x, b.x, c.x) - inflation;
	const xMax = Math.max(a.x, b.x, c.x) + inflation;
	const yMin = Math.min(a.y, b.y, c.y) - inflation;
	const yMax = Math.max(a.y, b.y, c.y) + inflation;
	return {
		x: xMin,
		y: yMin,
		width: xMax - xMin,
		height: yMax - yMin
	};
};

//#endregion
//#region ../packages/geometry/src/triangle/corners.ts
/**
* Returns the corners (vertices) of the triangle as an array of points
* @param t
* @returns Array of length three
*/
const corners = (t) => {
	guard(t);
	return [
		t.a,
		t.b,
		t.c
	];
};

//#endregion
//#region ../packages/geometry/src/triangle/from.ts
/**
* Returns an equilateral triangle centered at the origin.
*
* ```js
* // Create a triangle at 100,100 with radius of 60
* const tri = fromRadius({x:100,y:100}, 60);
*
* // Triangle with point A upwards, B to the right, C to the left
* constr tri2 = fromRadius({x:100,y:100}, 60, {initialAngleRadian: -Math.PI / 2});
* ```
*
*
* @param origin Origin
* @param radius Radius of triangle
* @param opts Options
*/
const fromRadius = (origin, radius, opts = {}) => {
	resultThrow(numberTest(radius, `positive`, `radius`));
	guard$5(origin, `origin`);
	const initialAngleRadian = opts.initialAngleRadian ?? 0;
	return fromPoints$1([
		initialAngleRadian,
		initialAngleRadian + piPi$5 * 1 / 3,
		initialAngleRadian + piPi$5 * 2 / 3
	].map((a) => toCartesian$2(radius, a, origin)));
};
/**
* Returns a triangle from a set of coordinates in a flat array form:
* [xA, yA, xB, yB, xC, yC]
* @param coords
* @returns
*/
const fromFlatArray = (coords) => {
	if (!Array.isArray(coords)) throw new Error(`coords expected as array`);
	if (coords.length !== 6) throw new Error(`coords array expected with 6 elements. Got ${coords.length}`);
	return fromPoints$1(fromNumbers$1(...coords));
};
/**
* Returns a triangle from an array of three points
* @param points
* @returns
*/
const fromPoints$1 = (points) => {
	if (!Array.isArray(points)) throw new Error(`points expected as array`);
	if (points.length !== 3) throw new Error(`points array expected with 3 elements. Got ${points.length}`);
	return {
		a: points[0],
		b: points[1],
		c: points[2]
	};
};

//#endregion
//#region ../packages/geometry/src/triangle/perimeter.ts
/**
* Calculates perimeter of a triangle
* @param t
* @returns
*/
const perimeter$3 = (t) => {
	guard(t);
	return edges(t).reduce((accumulator, v) => accumulator + length$3(v), 0);
};

//#endregion
//#region ../packages/geometry/src/triangle/inner-circle.ts
/**
* Returns the largest circle enclosed by triangle `t`.
* @param t
*/
const innerCircle = (t) => {
	const c = centroid(t);
	const p = perimeter$3(t) / 2;
	return {
		radius: area$3(t) / p,
		...c
	};
};

//#endregion
//#region ../packages/geometry/src/triangle/intersects.ts
/**
* Returns true if point is within or on the boundary of triangle
* @param t
* @param a
* @param b
*/
function intersectsPoint(t, a, b) {
	const box = bbox(t);
	const pt = getPointParameter$1(a, b);
	if (!intersectsPoint$1(box, pt)) return false;
	const bc = barycentricCoord(t, pt);
	return bc.a >= 0 && bc.a <= 1 && bc.b >= 0 && bc.b <= 1 && bc.c >= 0 && bc.c <= 1;
}

//#endregion
//#region ../packages/geometry/src/triangle/lengths.ts
/**
* Returns the lengths of the triangle sides
* @param t
* @returns Array of length three
*/
const lengths = (t) => {
	guard(t);
	return [
		distance$2(t.a, t.b),
		distance$2(t.b, t.c),
		distance$2(t.c, t.a)
	];
};

//#endregion
//#region ../packages/geometry/src/triangle/kinds.ts
/**
* Returns true if it is an equilateral triangle
* @param t
* @returns
*/
const isEquilateral = (t) => {
	guard(t);
	const [a, b, c] = lengths(t);
	return a === b && b === c;
};
/**
* Returns true if it is an isosceles triangle
* @param t
* @returns
*/
const isIsosceles = (t) => {
	const [a, b, c] = lengths(t);
	if (a === b) return true;
	if (b === c) return true;
	if (c === a) return true;
	return false;
};
/**
* Returns true if at least one interior angle is 90 degrees
* @param t
* @returns
*/
const isRightAngle = (t) => angles(t).includes(Math.PI / 2);
/**
* Returns true if triangle is oblique: No interior angle is 90 degrees
* @param t
* @returns
*/
const isOblique = (t) => !isRightAngle(t);
/**
* Returns true if triangle is actue: all interior angles less than 90 degrees
* @param t
* @returns
*/
const isAcute = (t) => !angles(t).some((v) => v >= Math.PI / 2);
/**
* Returns true if triangle is obtuse: at least one interior angle is greater than 90 degrees
* @param t
* @returns
*/
const isObtuse = (t) => angles(t).some((v) => v > Math.PI / 2);

//#endregion
//#region ../packages/geometry/src/triangle/math.ts
/**
* Applies `fn` to each of a triangle's corner points, returning the result.
*
* @example Add some random to the x of each corner
* ```
* const t = apply(tri, p => {
*  const r = 10;
*  return {
*    x: p.x + (Math.random()*r*2) - r,
*    y: p.y
*  }
* });
* ```
* @param t
* @param fn
* @returns
*/
const apply = (t, fn) => Object.freeze({
	...t,
	a: fn(t.a, `a`),
	b: fn(t.b, `b`),
	c: fn(t.c, `c`)
});

//#endregion
//#region ../packages/geometry/src/triangle/outer-circle.ts
/**
* Returns the largest circle touching the corners of triangle `t`.
* @param t
* @returns
*/
const outerCircle = (t) => {
	const [a, b, c] = edges(t).map((l) => length$3(l));
	const cent = centroid(t);
	return {
		radius: a * b * c / Math.sqrt((a + b + c) * (-a + b + c) * (a - b + c) * (a + b - c)),
		...cent
	};
};

//#endregion
//#region ../packages/geometry/src/triangle/rotate.ts
/**
* Returns a triangle that is rotated by `angleRad`. By default it rotates
* around its center but an arbitrary `origin` point can be provided.
*
* ```js
* let triangle = Triangles.fromPoints([a, b, c]);
* 
* // Rotate triangle by 5 degrees
* triangle = Triangles.rotate(triangle, degreeToRadian(5));
*
* // Rotate by 90 degrees
* triangle = Triangles.rotate(triangle, Math.PI / 2);
* ```
* @param triangle Triangle to rotate
* @param amountRadian Angle in radians to rotate by
* @param origin Point to rotate around. If undefined, middle of triangle will be used
* @returns A new triangle
*/
const rotate = (triangle, amountRadian, origin) => {
	if (amountRadian === void 0 || amountRadian === 0) return triangle;
	if (origin === void 0) origin = centroid(triangle);
	return Object.freeze({
		...triangle,
		a: rotate$1(triangle.a, amountRadian, origin),
		b: rotate$1(triangle.b, amountRadian, origin),
		c: rotate$1(triangle.c, amountRadian, origin)
	});
};
/**
* Rotates the vertices of the triangle around one point (by default, `b`), returning
* as a new object.
* 
* ```js
* let triangle = Triangles.fromPoints([a, b, c]);
* triangle = Triangles.rotateByVertex(triangle, Math.Pi, `a`);
* ```
* @param triangle Triangle
* @param amountRadian Angle to rotate by
* @param vertex Name of vertex: a, b or c.
* @returns A new triangle
*/
const rotateByVertex = (triangle, amountRadian, vertex = `b`) => {
	const origin = vertex === `a` ? triangle.a : vertex === `b` ? triangle.b : triangle.c;
	return Object.freeze({
		a: rotate$1(triangle.a, amountRadian, origin),
		b: rotate$1(triangle.b, amountRadian, origin),
		c: rotate$1(triangle.c, amountRadian, origin)
	});
};

//#endregion
//#region ../packages/geometry/src/triangle/to.ts
/**
* Returns the coordinates of triangle in a flat array form:
* [xA, yA, xB, yB, xC, yC]
* @param t
* @returns
*/
const toFlatArray = (t) => {
	guard(t);
	return [
		t.a.x,
		t.a.y,
		t.b.x,
		t.b.y,
		t.c.x,
		t.c.y
	];
};

//#endregion
//#region ../packages/geometry/src/triangle/equilateral.ts
var equilateral_exports = /* @__PURE__ */ __exportAll({
	area: () => area$2,
	centerFromA: () => centerFromA,
	centerFromB: () => centerFromB,
	centerFromC: () => centerFromC,
	circumcircle: () => circumcircle$2,
	fromCenter: () => fromCenter$1,
	height: () => height$2,
	incircle: () => incircle$2,
	perimeter: () => perimeter$2
});
const pi4over3 = Math.PI * 4 / 3;
const pi2over3 = Math.PI * 2 / 3;
const resolveLength = (t) => {
	if (typeof t === `number`) return t;
	return t.length;
};
/**
* Returns a positioned `Triangle` from an equilateral triangle definition.
* By default the rotation is such that point `a` and `c` are lying on the horizontal,
* and `b` is the upward-facing tip.
*
* Default is a triangle pointing upwards with b at the top, c to the left and b to right on the baseline.
*
* Example rotation values in radians:
* * ▶️ 0: a and c on vertical, b at the tip
* * ◀️ Math.PI: `c`and `a` are on vertical, with `b` at the tip.
* * 🔽 Math.PI/2: `c` and `a` are on horizontal, `c` to the left. `b` at the bottom.
* * 🔼 Math.PI*1.5: `c` and `a` are on horizontal, `c` to the right. `b` at the top. (default)
* @param t
* @param origin
* @param rotationRad
* @returns
*/
const fromCenter$1 = (t, origin, rotationRad) => {
	if (!origin) origin = Object.freeze({
		x: 0,
		y: 0
	});
	const r = resolveLength(t) / Math.sqrt(3);
	const rot = rotationRad ?? Math.PI * 1.5;
	const b = {
		x: r * Math.cos(rot) + origin.x,
		y: r * Math.sin(rot) + origin.y
	};
	const a = {
		x: r * Math.cos(rot + pi4over3) + origin.x,
		y: r * Math.sin(rot + pi4over3) + origin.y
	};
	const c = {
		x: r * Math.cos(rot + pi2over3) + origin.x,
		y: r * Math.sin(rot + pi2over3) + origin.y
	};
	return Object.freeze({
		a,
		b,
		c
	});
};
/**
* Calculate center from the given point A
* @param t
* @param ptA
* @returns
*/
const centerFromA = (t, ptA) => {
	if (!ptA) ptA = Object.freeze({
		x: 0,
		y: 0
	});
	const r = resolveLength(t);
	const { radius } = incircle$2(t);
	return {
		x: ptA.x + r / 2,
		y: ptA.y - radius
	};
};
/**
* Calculate center from the given point B
* @param t
* @param ptB
* @returns
*/
const centerFromB = (t, ptB) => {
	if (!ptB) ptB = Object.freeze({
		x: 0,
		y: 0
	});
	const { radius } = incircle$2(t);
	return {
		x: ptB.x,
		y: ptB.y + radius * 2
	};
};
/**
* Calculate center from the given point C
* @param t
* @param ptC
* @returns
*/
const centerFromC = (t, ptC) => {
	if (!ptC) ptC = Object.freeze({
		x: 0,
		y: 0
	});
	const r = resolveLength(t);
	const { radius } = incircle$2(t);
	return {
		x: ptC.x - r / 2,
		y: ptC.y - radius
	};
};
/**
* Returns the height (or rise) of an equilateral triangle.
* Ie. from one vertex to the perpendicular edge.
* (line marked x in the diagram below)
*
* ```
*      .
*     .x .
*    . x  .
*   .  x   .
*  ..........
* ```
* @param t
*/
const height$2 = (t) => Math.sqrt(3) / 2 * resolveLength(t);
const perimeter$2 = (t) => resolveLength(t) * 3;
const area$2 = (t) => Math.pow(resolveLength(t), 2) * Math.sqrt(3) / 4;
/**
* Circle that encompasses all points of triangle
* @param t
*/
const circumcircle$2 = (t) => ({ radius: Math.sqrt(3) / 3 * resolveLength(t) });
/**
* Circle that is inside the edges of the triangle
* @param t
* @returns
*/
const incircle$2 = (t) => ({ radius: Math.sqrt(3) / 6 * resolveLength(t) });

//#endregion
//#region ../packages/geometry/src/triangle/right.ts
var right_exports = /* @__PURE__ */ __exportAll({
	adjacentFromHypotenuse: () => adjacentFromHypotenuse,
	adjacentFromOpposite: () => adjacentFromOpposite,
	angleAtPointA: () => angleAtPointA,
	angleAtPointB: () => angleAtPointB,
	area: () => area$1,
	circumcircle: () => circumcircle$1,
	fromA: () => fromA$1,
	fromB: () => fromB$1,
	fromC: () => fromC$1,
	height: () => height$1,
	hypotenuseFromAdjacent: () => hypotenuseFromAdjacent,
	hypotenuseFromOpposite: () => hypotenuseFromOpposite,
	hypotenuseSegments: () => hypotenuseSegments,
	incircle: () => incircle$1,
	medians: () => medians$1,
	oppositeFromAdjacent: () => oppositeFromAdjacent,
	oppositeFromHypotenuse: () => oppositeFromHypotenuse,
	perimeter: () => perimeter$1,
	resolveLengths: () => resolveLengths
});
/**
* Returns a positioned triangle from a point for A.
*
* ```
*             c (90 deg)
*             .
*          .   .
*       .       .
*    .           .
* a .............. b
* ```
* @param t
* @param origin
* @returns
*/
const fromA$1 = (t, origin) => {
	if (!origin) origin = Object.freeze({
		x: 0,
		y: 0
	});
	const tt = resolveLengths(t);
	const seg = hypotenuseSegments(t);
	const h = height$1(t);
	return {
		a: {
			x: origin.x,
			y: origin.y
		},
		b: {
			x: origin.x + tt.hypotenuse,
			y: origin.y
		},
		c: {
			x: origin.x + seg[1],
			y: origin.y - h
		}
	};
};
/**
* Returns a positioned triangle from a point for B.
*
* ```
*             c (90 deg)
*             .
*          .   .
*       .       .
*    .           .
* a .............. b
* ```
* @param t
* @param origin
* @returns
*/
const fromB$1 = (t, origin) => {
	if (!origin) origin = Object.freeze({
		x: 0,
		y: 0
	});
	const tt = resolveLengths(t);
	const seg = hypotenuseSegments(t);
	const h = height$1(t);
	const b = {
		x: origin.x,
		y: origin.y
	};
	return {
		a: {
			x: origin.x - tt.hypotenuse,
			y: origin.y
		},
		b,
		c: {
			x: origin.x - seg[0],
			y: origin.y - h
		}
	};
};
/**
* Returns a positioned triangle from a point for C.
*
* ```
*             c (90 deg)
*             .
*          .   .
*       .       .
*    .           .
* a .............. b
* ```
*
*
* ```js
* // Triangle pointing up to 0,0 with sides of 15
* Triangles.Right.fromC({ adjacent: 15, opposite:15 }, { x: 0, y: 0 });
* ```
* @param t
* @param origin
* @returns
*/
const fromC$1 = (t, origin) => {
	if (!origin) origin = Object.freeze({
		x: 0,
		y: 0
	});
	const seg = hypotenuseSegments(t);
	const h = height$1(t);
	const c = {
		x: origin.x,
		y: origin.y
	};
	return {
		a: {
			x: origin.x - seg[1],
			y: origin.y + h
		},
		b: {
			x: origin.x + seg[0],
			y: origin.y + h
		},
		c
	};
};
/**
* Returns a right triangle with all lengths defined.
* At least two lengths must already exist
* @param t
* @returns
*/
const resolveLengths = (t) => {
	const a = t.adjacent;
	const o = t.opposite;
	const h = t.hypotenuse;
	if (a !== void 0 && o !== void 0) return {
		...t,
		adjacent: a,
		opposite: o,
		hypotenuse: Math.hypot(a, o)
	};
	else if (a && h) return {
		...t,
		adjacent: a,
		hypotenuse: h,
		opposite: h * h - a * a
	};
	else if (o && h) return {
		...t,
		hypotenuse: h,
		opposite: o,
		adjacent: h * h - o * o
	};
	else if (t.opposite && t.hypotenuse && t.adjacent) return t;
	throw new Error(`Missing at least two edges`);
};
/**
* Height of right-triangle
* @param t
* @returns
*/
const height$1 = (t) => {
	const tt = resolveLengths(t);
	const p = tt.opposite * tt.opposite / tt.hypotenuse;
	const q = tt.adjacent * tt.adjacent / tt.hypotenuse;
	return Math.sqrt(p * q);
};
/**
* Returns the lengths of the hypotenuse split into p and q segments.
* In other words, if one makes a line from the right-angle vertex down to hypotenuse.
*
* [See here](https://rechneronline.de/pi/right-triangle.php)
* @param t
* @returns
*/
const hypotenuseSegments = (t) => {
	const tt = resolveLengths(t);
	return [tt.opposite * tt.opposite / tt.hypotenuse, tt.adjacent * tt.adjacent / tt.hypotenuse];
};
const perimeter$1 = (t) => {
	const tt = resolveLengths(t);
	return tt.adjacent + tt.hypotenuse + tt.opposite;
};
const area$1 = (t) => {
	const tt = resolveLengths(t);
	return tt.opposite * tt.adjacent / 2;
};
/**
* Angle (in radians) between hypotenuse and adjacent edge
* @param t
* @returns
*/
const angleAtPointA = (t) => {
	const tt = resolveLengths(t);
	return Math.acos((tt.adjacent * tt.adjacent + tt.hypotenuse * tt.hypotenuse - tt.opposite * tt.opposite) / (2 * tt.adjacent * tt.hypotenuse));
};
/**
* Angle (in radians) between opposite edge and hypotenuse
* @param t
* @returns
*/
const angleAtPointB = (t) => {
	const tt = resolveLengths(t);
	return Math.acos((tt.opposite * tt.opposite + tt.hypotenuse * tt.hypotenuse - tt.adjacent * tt.adjacent) / (2 * tt.opposite * tt.hypotenuse));
};
/**
* Returns the median line lengths a, b and c in an array.
*
* The median lines are the lines from each vertex to the center.
*
* @param t
* @returns
*/
const medians$1 = (t) => {
	const tt = resolveLengths(t);
	const b = tt.adjacent * tt.adjacent;
	const c = tt.hypotenuse * tt.hypotenuse;
	const a = tt.opposite * tt.opposite;
	return [
		Math.sqrt(2 * (b + c) - a) / 2,
		Math.sqrt(2 * (c + a) - b) / 2,
		Math.sqrt(2 * (a + b) - c) / 2
	];
};
/**
* The circle which passes through the points of the triangle
* @param t
* @returns
*/
const circumcircle$1 = (t) => {
	return { radius: resolveLengths(t).hypotenuse / 2 };
};
/**
* Circle enclosed by triangle
* @param t
* @returns
*/
const incircle$1 = (t) => {
	const tt = resolveLengths(t);
	return { radius: (tt.adjacent + tt.opposite - tt.hypotenuse) / 2 };
};
/**
* Returns the opposite length of a right-angle triangle,
* marked here
*
* ```
*    .  <
*   ..  <
* ....  <
* ```
*
* This is just:
* ```js
* opposite = Math.tan(angle) * adjacent
* ```
* @param angleRad
* @param adjacent
* @returns
*/
const oppositeFromAdjacent = (angleRad, adjacent) => Math.tan(angleRad) * adjacent;
/**
* Returns the opposite length of a right-angle triangle,
* marked here
*
* ```
*    .  <
*   ..  <
* ....  <
* ```
*
* This is just:
* ```js
* opposite = Math.tan(angle) * adjacent
* ```
* @param angleRad
* @param hypotenuse
* @returns
*/
const oppositeFromHypotenuse = (angleRad, hypotenuse) => Math.sin(angleRad) * hypotenuse;
/**
* Returns the adjecent length of a right-angle triangle,
* marked here
* ```
*    .
*   ..  o
* ....
* ^^^^
* ```
* This is just:
* ```js
* opposite = Math.tan(angle) * adjacent
* ```
* @param angleRadian
* @param hypotenuse
* @returns
*/
const adjacentFromHypotenuse = (angleRadian, hypotenuse) => Math.cos(angleRadian) * hypotenuse;
/**
* Returns the adjecent length of a right-angle triangle,
* marked here
* ```
*    .
*   ..  o
* ....
* ^^^^
* ```
* This is just:
* ```js
* opposite = Math.tan(angle) * adjacent
* ```
* @param angleRadian
* @param opposite
* @returns
*/
const adjacentFromOpposite = (angleRadian, opposite) => opposite / Math.tan(angleRadian);
/**
* Returns the hypotenuse length of a right-angle triangle,
* marked here
* ```
*      .
* >   ..
* >  ...
* > ....  opp
*  .....
*   adj
* ```
* This is just:
* ```js
* opposite = Math.tan(angle) * adjacent
* ```
* @param angleRadian
* @param opposite
* @returns
*/
const hypotenuseFromOpposite = (angleRadian, opposite) => opposite / Math.sin(angleRadian);
/**
* Returns the hypotenuse length of a right-angle triangle,
* marked here
* ```
*      .
* >   ..
* >  ...
* > ....  opp
*  .....
*   adj
* ```
* This is just:
* ```js
* opposite = Math.tan(angle) * adjacent
* ```
* @param angleRadian
* @param adjacent
* @returns
*/
const hypotenuseFromAdjacent = (angleRadian, adjacent) => adjacent / Math.cos(angleRadian);

//#endregion
//#region ../packages/geometry/src/triangle/isosceles.ts
var isosceles_exports = /* @__PURE__ */ __exportAll({
	apexAngle: () => apexAngle,
	area: () => area,
	baseAngle: () => baseAngle,
	circumcircle: () => circumcircle,
	fromA: () => fromA,
	fromB: () => fromB,
	fromC: () => fromC,
	fromCenter: () => fromCenter,
	height: () => height,
	incircle: () => incircle,
	legHeights: () => legHeights,
	medians: () => medians,
	perimeter: () => perimeter
});
const baseAngle = (t) => Math.acos(t.base / (2 * t.legs));
const apexAngle = (t) => {
	const aa = t.legs * t.legs;
	const cc = t.base * t.base;
	return Math.acos((2 * aa - cc) / (2 * aa));
};
const height = (t) => {
	const aa = t.legs * t.legs;
	const cc = t.base * t.base;
	return Math.sqrt((4 * aa - cc) / 4);
};
const legHeights = (t) => {
	const b = baseAngle(t);
	return t.base * Math.sin(b);
};
const perimeter = (t) => 2 * t.legs + t.base;
const area = (t) => {
	return height(t) * t.base / 2;
};
const circumcircle = (t) => {
	const h = height(t);
	const hh = h * h;
	const cc = t.base * t.base;
	return { radius: (4 * hh + cc) / (8 * h) };
};
const incircle = (t) => {
	const h = height(t);
	return { radius: t.base * h / (2 * t.legs + t.base) };
};
const medians = (t) => {
	const aa = t.legs * t.legs;
	const cc = t.base * t.base;
	const medianAB = Math.sqrt(aa + 2 * cc) / 2;
	return [
		medianAB,
		medianAB,
		Math.sqrt(4 * aa - cc) / 2
	];
};
/**
* Returns a positioned `Triangle` based on a center origin.
* Center is determined by the intesecting of the medians.
*
* See: https://rechneronline.de/pi/isosceles-triangle.php
* @param t
* @param origin
* @returns
*/
const fromCenter = (t, origin) => {
	if (!origin) origin = Object.freeze({
		x: 0,
		y: 0
	});
	const h = height(t);
	const incircleR = incircle(t).radius;
	const verticalToApex = h - incircleR;
	return {
		a: {
			x: origin.x - t.base / 2,
			y: origin.y + incircleR
		},
		b: {
			x: origin.x + t.base / 2,
			y: origin.y + incircleR
		},
		c: {
			x: origin.x,
			y: origin.y - verticalToApex
		}
	};
};
const fromA = (t, origin) => {
	if (!origin) origin = Object.freeze({
		x: 0,
		y: 0
	});
	const h = height(t);
	return {
		a: {
			x: origin.x,
			y: origin.y
		},
		b: {
			x: origin.x + t.base,
			y: origin.y
		},
		c: {
			x: origin.x + t.base / 2,
			y: origin.y - h
		}
	};
};
const fromB = (t, origin) => {
	if (!origin) origin = Object.freeze({
		x: 0,
		y: 0
	});
	const h = height(t);
	const b = {
		x: origin.x,
		y: origin.y
	};
	return {
		a: {
			x: origin.x - t.base,
			y: origin.y
		},
		b,
		c: {
			x: origin.x - t.base / 2,
			y: origin.y - h
		}
	};
};
const fromC = (t, origin) => {
	if (!origin) origin = Object.freeze({
		x: 0,
		y: 0
	});
	const h = height(t);
	const c = {
		x: origin.x,
		y: origin.y
	};
	return {
		a: {
			x: origin.x - t.base / 2,
			y: origin.y + h
		},
		b: {
			x: origin.x + t.base / 2,
			y: origin.y + h
		},
		c
	};
};

//#endregion
//#region ../packages/geometry/src/triangle/index.ts
var triangle_exports = /* @__PURE__ */ __exportAll({
	Empty: () => Empty,
	Equilateral: () => equilateral_exports,
	Isosceles: () => isosceles_exports,
	Placeholder: () => Placeholder,
	Right: () => right_exports,
	angles: () => angles,
	anglesDegrees: () => anglesDegrees,
	apply: () => apply,
	area: () => area$3,
	barycentricCoord: () => barycentricCoord,
	barycentricToCartestian: () => barycentricToCartestian,
	bbox: () => bbox,
	centroid: () => centroid,
	corners: () => corners,
	edges: () => edges,
	equilateralFromVertex: () => equilateralFromVertex,
	fromFlatArray: () => fromFlatArray,
	fromPoints: () => fromPoints$1,
	fromRadius: () => fromRadius,
	guard: () => guard,
	innerCircle: () => innerCircle,
	intersectsPoint: () => intersectsPoint,
	isAcute: () => isAcute,
	isEmpty: () => isEmpty,
	isEqual: () => isEqual,
	isEquilateral: () => isEquilateral,
	isIsosceles: () => isIsosceles,
	isOblique: () => isOblique,
	isObtuse: () => isObtuse,
	isPlaceholder: () => isPlaceholder,
	isRightAngle: () => isRightAngle,
	isTriangle: () => isTriangle,
	lengths: () => lengths,
	outerCircle: () => outerCircle,
	perimeter: () => perimeter$3,
	rotate: () => rotate,
	rotateByVertex: () => rotateByVertex,
	toFlatArray: () => toFlatArray
});
/**
* Triangle.
*
* Helpers for creating:
*  - {@link Triangles.fromFlatArray}: Create from [x1, y1, x2, y2, x3, y3]
*  - {@link Triangles.fromPoints}: Create from three `{x,y}` sets
*  - {@link Triangles.fromRadius}: Equilateral triangle of a given radius and center
*/

//#endregion
//#region ../packages/geometry/src/waypoint.ts
var waypoint_exports = /* @__PURE__ */ __exportAll({
	fromPoints: () => fromPoints,
	init: () => init
});
/**
* Create from set of points, connected in order starting at array position 0.
* @param waypoints 
* @param opts 
* @returns 
*/
const fromPoints = (waypoints, opts = {}) => {
	return init(joinPointsToLines(...waypoints).map((l) => toPath$3(l)), opts);
};
/**
* Initialise
* 
* Options:
* * maxDistanceFromLine: Distances greater than this are not matched. Default 0.1
* @param paths 
* @param opts 
* @returns 
*/
const init = (paths, opts = {}) => {
	const maxDistanceFromLine = opts.maxDistanceFromLine ?? .1;
	const checkUnordered = (pt) => {
		const sorted = sortByNumericProperty(paths.map((p, index) => {
			const nearest = p.nearest(pt);
			const distance = distance$2(pt, nearest);
			return {
				positionRelative: p.relativePosition(nearest, maxDistanceFromLine),
				path: p,
				index,
				nearest,
				distance,
				rank: Number.MAX_SAFE_INTEGER
			};
		}).filter((v) => v.distance <= maxDistanceFromLine), `distance`);
		for (let rank = 0; rank < sorted.length; rank++) sorted[rank].rank = rank;
		return sorted;
	};
	return checkUnordered;
};

//#endregion
//#region ../packages/geometry/src/index.ts
var src_exports = /* @__PURE__ */ __exportAll({
	Arcs: () => arc_exports,
	Beziers: () => bezier_exports,
	Circles: () => circle_exports,
	Compound: () => compound_path_exports,
	CurveSimplification: () => curve_simplification_exports,
	Ellipses: () => ellipse_exports,
	Grids: () => grid_exports,
	Layouts: () => layout_exports,
	Lines: () => line_exports,
	Paths: () => path_exports,
	PointTracker: () => PointTracker,
	Points: () => point_exports,
	PointsTracker: () => PointsTracker,
	Polar: () => polar_exports,
	QuadTree: () => quad_tree_exports,
	Rays: () => raycast_exports,
	Rects: () => rect_exports,
	Shapes: () => shape_exports,
	SurfacePoints: () => surface_points_exports,
	Triangles: () => triangle_exports,
	UserPointerTracker: () => UserPointerTracker,
	UserPointersTracker: () => UserPointersTracker,
	Vectors: () => vector_exports,
	Waypoints: () => waypoint_exports,
	angleConvert: () => angleConvert,
	angleParse: () => angleParse,
	average: () => average,
	degreeArc: () => degreeArc,
	degreeToGradian: () => degreeToGradian,
	degreeToRadian: () => degreeToRadian,
	degreeToTurn: () => degreeToTurn,
	degreesSum: () => degreesSum,
	fromUnitVector: () => fromUnitVector,
	gradianToDegree: () => gradianToDegree,
	gradianToRadian: () => gradianToRadian,
	isAngleType: () => isAngleType,
	isAngleTypeConvertible: () => isAngleTypeConvertible,
	radianArc: () => radianArc,
	radianInvert: () => radianInvert,
	radianRange: () => radianRange,
	radianToDegree: () => radianToDegree,
	radianToGradian: () => radianToGradian,
	radianToTurn: () => radianToTurn,
	radiansBetweenCircular: () => radiansBetweenCircular,
	radiansFromAxisX: () => radiansFromAxisX,
	radiansNormalise: () => radiansNormalise,
	radiansSum: () => radiansSum,
	scaler: () => scaler,
	toRadian: () => toRadian,
	toUnitVector: () => toUnitVector,
	turnToDegree: () => turnToDegree,
	turnToRadian: () => turnToRadian
});

//#endregion
export { isAngleType as $, PointTracker as A, subtractSize as At, toCartesian$1 as B, sum$3 as Bt, interpolator as C, Empty$2 as Ct, isQuadraticBezier as D, angleRadian$1 as Dt, isCubicBezier as E, compare as Et, line_exports as F, EmptyPositioned as Ft, degreeArc as G, cardinal as Gt, angleConvert as H, getPointParameter$1 as Ht, fromNumbers as I, PlaceholderPositioned as It, degreeToTurn as J, isPlaceholder$2 as Jt, degreeToGradian as K, applyFields as Kt, vector_exports as L, getEdgeX as Lt, UserPointerTracker as M, isLine as Mt, UserPointersTracker as N, isEqual$4 as Nt, arc_exports as O, abs$2 as Ot, Placeholder$1 as P, Empty$3 as Pt, gradianToRadian as Q, polar_exports as R, getEdgeY as Rt, cubic as S, interpolate$3 as St, toPath$1 as T, divide$3 as Tt, angleParse as U, corners$1 as Ut, toCartesian$2 as V, distance$2 as Vt, average as W, center$2 as Wt, fromUnitVector as X, guard$5 as Xt, degreesSum as Y, isRectPositioned as Yt, gradianToDegree as Z, isPlaceholder$3 as Zt, cells as _, normalise$2 as _t, surface_points_exports as a, radianToGradian as at, circle_exports as b, multiplyScalar$1 as bt, quad_tree_exports as c, radiansFromAxisX as ct, layout_exports as d, toRadian as dt, isAngleTypeConvertible as et, shape_exports as f, toUnitVector as ft, rows$1 as g, pipelineApply as gt, offset as h, pipeline as ht, corners as i, radianToDegree as it, PointsTracker as j, multiplyScalar$2 as jt, point_exports as k, rect_exports as kt, path_exports as l, radiansNormalise as lt, indexFromCell as m, turnToRadian as mt, waypoint_exports as n, radianInvert as nt, scaler as o, radianToTurn as ot, grid_exports as p, turnToDegree as pt, degreeToRadian as q, guard$4 as qt, triangle_exports as r, radianRange as rt, raycast_exports as s, radiansBetweenCircular as st, src_exports as t, radianArc as tt, compound_path_exports as u, radiansSum as ut, ellipse_exports as v, clampMagnitude$2 as vt, quadraticSimple as w, Unit as wt, bezier_exports as x, invert$1 as xt, curve_simplification_exports as y, multiply$3 as yt, fromLine as z, subtract$3 as zt };
//# sourceMappingURL=src-D8pW0Dyk.js.map