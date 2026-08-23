import { n as __exportAll } from "./chunk-CaR5F9JI.js";
import { N as resultThrow, w as numberTest, y as integerTest } from "./src-DZFdrMH_.js";
import { n as zip, x as movingWindowWithContext } from "./src-B6pmAinX.js";

//#region ../packages/numbers/src/apply-to-values.ts
/**
* Apples `fn` to every key of `obj` which is numeric.
* ```js
* const o = {
*  name: 'john',
*  x: 10,
*  y: 20
* };
* const o2 = applyToValues(o, (v) => v * 2);
* 
* // Yields: { name: 'john', x: 20, y: 40 }
* ```
* @param object 
* @param apply 
* @returns 
*/
const applyToValues = (object, apply) => {
	const o = { ...object };
	for (const [key, value] of Object.entries(object)) if (typeof value === `number`) o[key] = apply(value);
	else o[key] = value;
	return o;
};

//#endregion
//#region ../packages/numbers/src/numeric-arrays.ts
/**
* Applies a function `fn` to the elements of an array, weighting them based on their relative position.
*
* ```js
* // Six items
* weight([1,1,1,1,1,1], Modulation.gaussian());
*
* // Yields:
* // [0.02, 0.244, 0.85, 0.85, 0.244, 0.02]
* ```
*
* `fn` is expected to map (0..1) => (0..1), such as an easing function. The input to the
* `fn` is the relative position of an element. Thus the first element will be 0, the middle 0.5 and so on.
* The output of `fn` is then multiplied by the original value.
*
* In the below example (which is also the default if `fn` is not specified), the relative position is
* how values are weighted:
*
* ```js
* weight([1,1,1,1,1,1], (relativePos) => relativePos);
* // Yields:
* // [0, 0.2, 0.4, 0.6, 0.8, 1]
* ```
*
* Throws TypeError if `data` is not an array or for any element not a number.
* @param data Array of numbers
* @param fn Returns a weighting based on the given relative position. If unspecified, `(x) => x` is used.
*/
const weight = (data, fn) => {
	if (!Array.isArray(data)) throw new TypeError(`Param 'data' is expected to be an array. Got type: ${typeof data}`);
	const weightingFunction = fn ?? ((x) => x);
	return data.map((value, index) => {
		if (typeof value !== `number`) throw new TypeError(`Param 'data' contains non-number at index: '${index}'. Type: '${typeof value}' value: '${value}'`);
		const relativePos = index / (data.length - 1);
		const weightForPosition = weightingFunction(relativePos);
		if (typeof weightForPosition !== `number`) throw new TypeError(`Weighting function returned type '${typeof weightForPosition}' rather than number for input: '${relativePos}'`);
		return value * weightForPosition;
	});
};
/**
* Returns an array of all valid numbers from `data`
*
* @param data
* @returns
*/
const validNumbers = (data) => data.filter((d) => typeof d === `number` && !Number.isNaN(d));
/**
* Returns the dot product of arbitrary-sized arrays. Assumed they are of the same length.
* @param values
* @param nonNumber What to do if array contains an invalid number. Error: throw an exception, 'treat-as-zero' use as 0 instead, 'ignore', let math run with invalid number
* @returns
*/
const dotProduct = (values, nonNumber = `ignore`) => {
	let r = 0;
	const length = values[0].length;
	for (let index = 0; index < length; index++) {
		let t = 0;
		for (const [p, value] of values.entries()) {
			let v = value[index];
			if (Number.isNaN(v) || !Number.isFinite(v)) {
				if (nonNumber === `treat-as-zero`) v = 0;
				else if (nonNumber === `error`) throw new TypeError(`Invalid number at index ${index},${p}`);
			}
			if (p === 0) t = v;
			else t *= v;
		}
		r += t;
	}
	return r;
};
/**
* Calculates the average of all numbers in an array.
* Array items which aren't a valid number are ignored and do not factor into averaging.
*
* Use {@link numberArrayCompute} if you want min, max and total as well.
*
* @example
* ```js
* // Average of a list
* const avg = Numbers.average([1, 1.4, 0.9, 0.1]);
*
* // Average of a variable
* const data = [100,200];
* Numbers.average(data);
* ```
*
* @see {@link averageWeighted} To weight items based on position in array
* @param data Data to average.
* @returns Average of array
*/
const average = (data) => {
	if (typeof data !== `object`) throw new Error(`Param 'data' should be an array. Got: ${typeof data}`);
	if (!Array.isArray(data)) throw new TypeError(`Param 'data' is not an array`);
	const valid = validNumbers(data);
	return valid.reduce((accumulator, v) => accumulator + v, 0) / valid.length;
};
/**
* Returns the minimum number out of `data`.
* Undefined and non-numbers are silently ignored.
*
* ```js
* Numbers.min([10, 20, 0]); // Yields 0
* ```
* @param data
* @returns Minimum number
*/
const min = (data) => Math.min(...validNumbers(data));
/**
* Returns the index of the largest value.
* ```js
* const v = [ 10, 40, 5 ];
* Numbers.maxIndex(v); // Yields 1
* ```
* @param data Array of numbers
* @returns Index of largest value
*/
const maxIndex = (data) => data.reduce((bestIndex, value, index, array) => value > array[bestIndex] ? index : bestIndex, 0);
/**
* Returns the index of the smallest value.
*
* ```js
* const v = [ 10, 40, 5 ];
* Numbers.minIndex(v); // Yields 2
* ```
* @param data Array of numbers
* @returns Index of smallest value
*/
const minIndex = (data) => data.reduce((bestIndex, value, index, array) => value < array[bestIndex] ? index : bestIndex, 0);
/**
* Returns the maximum number out of `data`.
* Undefined and non-numbers are silently ignored.
*
* ```js
* Numbers.max(100, 200, 50); // 200
* ```
* @param data List of numbers
* @returns Maximum number
*/
const max = (data) => Math.max(...validNumbers(data));
/**
* Returns the total of `data`.
* Undefined and non-numbers are silently ignored.
*
* ```js
* Numbers.total([1, 2, 3]); // 6
* ```
* @param data Array of numbers
* @returns Total
*/
const total = (data) => data.reduce((previous, current) => {
	if (typeof current !== `number`) return previous;
	if (Number.isNaN(current)) return previous;
	if (!Number.isFinite(current)) return previous;
	return previous + current;
}, 0);
/**
* Returns the maximum out of `data` without pre-filtering for speed.
*
* For most uses, {@link max} should suffice.
*
* ```js
* Numbers.maxFast([ 10, 0, 4 ]); // 10
* ```
* @param data
* @returns Maximum
*/
const maxFast = (data) => {
	let m = Number.MIN_SAFE_INTEGER;
	for (const datum of data) m = Math.max(m, datum);
	return m;
};
/**
* Returns the total of `data` without pre-filtering for speed.
*
* For most uses, {@link total} should suffice.
*
* ```js
* Numbers.totalFast([ 10, 0, 4 ]); // 14
* ```
* @param data
* @returns Maximum
*/
const totalFast = (data) => {
	let m = 0;
	for (const datum of data) m += datum;
	return m;
};
/**
* Returns the maximum out of `data` without pre-filtering for speed.
*
* For most uses, {@link max} should suffice.
*
* ```js
* Numbers.minFast([ 10, 0, 100 ]); // 0
* ```
* @param data
* @returns Maximum
*/
const minFast = (data) => {
	let m = Number.MAX_SAFE_INTEGER;
	for (const datum of data) m = Math.min(m, datum);
	return m;
};

//#endregion
//#region ../packages/numbers/src/average.ts
/**
* Calculate median value of an array of numbers
* @param data 
* @returns 
*/
const median = (data) => {
	if (!Array.isArray(data)) throw new TypeError(`Param 'data' is expected to be an array`);
	const n = data.length;
	data.sort((a, b) => a - b);
	let result = 0;
	if (n % 2 === 0) result = Math.floor((data[n / 2] + data[n / 2 - 1]) / 2);
	else result = data[Math.floor(n / 2)];
	return result;
};
/**
* Calculate the mean of `array`.
* @param array 
* @returns 
*/
const mean = (array) => array.reduce((accumulator, value) => accumulator + value, 0) / array.length;
/**
* Computes an average of an array with a set of weights applied.
*
* Weights can be provided as an array, expected to be on 0..1 scale, with indexes
* matched up to input data. Ie. data at index 2 will be weighed by index 2 in the weightings array.
*
* ```js
* // All items weighted evenly
* averageWeighted([1,2,3], [1,1,1]); // 2
*
* // First item has full weight, second half, third quarter
* averageWeighted([1,2,3], [1, 0.5, 0.25]); // 1.57
*
* // With reversed weighting of [0.25,0.5,1] value is 2.42
* ```
*
* A function can alternatively be provided to compute the weighting based on array index, via {@link weight}.
*
* ```js
* averageWeighted[1,2,3], Random.gaussian()); // 2.0
* ```
*
* This is the same as:
*
* ```js
* const data = [ 1, 2, 3 ];
* const w = weight(data, Random.gaussian());
* const avg = averageWeighted(data, w); // 2.0
* ```
* @param data Data to average
* @param weightings Array of weightings that match up to data array, or an easing function
* @see {@link average} Compute averages without weighting.
*/
const averageWeighted = (data, weightings) => {
	if (typeof weightings === `function`) weightings = weight(data, weightings);
	const [totalV, totalW] = zip(data, weightings).reduce((accumulator, v) => [accumulator[0] + v[0] * v[1], accumulator[1] + v[1]], [0, 0]);
	return totalV / totalW;
};
/**
* Returns a function that computes a weighted average of an array
* 
* ```js
* const w = averageWeigher(v => Math.random() * v);
* 
* // Give each array index a random
* w([1,2,3,4]);
* ```
* @param weigher 
* @returns 
*/
const averageWeigher = (weigher) => {
	return (data) => averageWeighted(data, weigher);
};

//#endregion
//#region ../packages/numbers/src/clamp.ts
/**
* Clamps a value between min and max (both inclusive)
* Defaults to a 0-1 range, useful for percentages.
*
* @example Usage
* ```js
* // 0.5 - just fine, within default of 0 to 1
* clamp(0.5);
* // 1 - above default max of 1
* clamp(1.5);
* // 0 - below range
* clamp(-50, 0, 100);
* // 50 - within range
* clamp(50, 0, 50);
* ```
*
* For clamping integer ranges, consider {@link clampIndex }
* For clamping `{ x, y }` points, consider {@link https://api.ixfx.fun/_ixfx/geometry/Points/clamp/ @ixfx/geometry/Points.clamp}.
* For clamping bipolar values: {@link Bipolar.clamp}
* @param value Value to clamp
* @param min value (inclusive)
* @param max value (inclusive)
* @returns Clamped value
*/
function clamp$1(value, min = 0, max = 1) {
	if (Number.isNaN(value)) throw new Error(`Param 'value' is NaN`);
	if (Number.isNaN(min)) throw new Error(`Param 'min' is NaN`);
	if (Number.isNaN(max)) throw new Error(`Param 'max' is NaN`);
	if (value < min) return min;
	if (value > max) return max;
	return value;
}
/**
* Returns a function that clamps values.
*
* ```js
* const c = clamper(0,100);
* c(50);   // 50
* c(101); // 100
* c(-5);  // 0
* ```
* @param min Minimum value. Default: 0
* @param max Maximum value. Default: 1
*/
function clamper(min = 0, max = 1) {
	if (Number.isNaN(min)) throw new Error(`Param 'min' is NaN`);
	if (Number.isNaN(max)) throw new Error(`Param 'max' is NaN`);
	return (v) => {
		if (v > max) return max;
		if (v < min) return min;
		return v;
	};
}
/**
* Clamps integer `v` between 0 (inclusive) and array length or length (exclusive).
* Returns value then will always be at least zero, and a valid array index.
*
* @example Usage
* ```js
* // Array of length 4
* const myArray = [`a`, `b`, `c`, `d`];
* clampIndex(0, myArray);    // 0
* clampIndex(5, 3); // 2
* ```
*
* Throws an error if `v` is not an integer.
*
* For some data it makes sense that data might 'wrap around' if it exceeds the
* range. For example rotation angle. Consider using {@link wrap} for this.
*
* @param v Value to clamp (must be an interger)
* @param arrayOrLength Array, or length of bounds (must be an integer)
* @returns Clamped value, minimum will be 0, maximum will be one less than `length`.
*/
function clampIndex(v, arrayOrLength) {
	if (!Number.isInteger(v)) throw new TypeError(`v parameter must be an integer (${v})`);
	const length = Array.isArray(arrayOrLength) ? arrayOrLength.length : arrayOrLength;
	if (!Number.isInteger(length)) throw new TypeError(`length parameter must be an integer (${length}, ${typeof length})`);
	v = Math.round(v);
	if (v < 0) return 0;
	if (v >= length) return length - 1;
	return v;
}
/**
* Returns the largest value, ignoring the sign of numbers
*
* ```js
* maxAbs(1, 5);    // 5
* maxAbs(-10, 5);  // -10 (since sign is ignored)
* maxAbs(arrayOfNumbers);
* ```
*
* Non-valid numbers are silently ignored.
* @param values
* @returns
*/
function maxAbs(...values) {
	let maxA = Number.MIN_SAFE_INTEGER;
	let max = Number.MIN_SAFE_INTEGER;
	const checkV = (v) => {
		if (!Number.isNaN(v) && Number.isFinite(v)) {
			const va = Math.abs(v);
			if (va > maxA) {
				maxA = va;
				max = v;
			}
		}
	};
	for (const v of values) if (typeof v === `number`) checkV(v);
	else for (const subV of v) checkV(subV);
	return max;
}

//#endregion
//#region ../packages/numbers/src/count.ts
/**
* Yields `amount` integers, counting by one from zero. If a negative amount is used,
* count decreases. If `offset` is provided, this is added to the return result.
* @example
* ```js
* const a = [...count(5)]; // Yields five numbers: [0,1,2,3,4]
* const b = [...count(-5)]; // Yields five numbers: [0,-1,-2,-3,-4]
* for (const v of count(5, 5)) {
*  // Yields: 5, 6, 7, 8, 9
* }
* const c = [...count(5,1)]; // Yields [1,2,3,4,5]
* ```
*
* @example Used with forEach
* ```js
* // Prints `Hi` 5x
* forEach(count(5), () => // do something);
* ```
*
* If you want to accumulate return values, consider using Flow.repeat.
*
* @example Run some code every 100ms, 10 times:
* ```js
* import { interval } from '@ixfx/flow.js'
* import { count } from '@ixfx/numbers.js'
* const counter = count(10);
* for await (const v of interval(counter, { fixedIntervalMs: 100 })) {
*  // Do something
* }
* ```
* @param amount Number of integers to yield
* @param offset Added to result
*/
function* count(amount, offset = 0) {
	resultThrow(integerTest(amount, ``, `amount`), integerTest(offset, ``, `offset`));
	if (amount === 0) return;
	let index = 0;
	do
		yield amount < 0 ? -index + offset : index + offset;
	while (index++ < Math.abs(amount) - 1);
}

//#endregion
//#region ../packages/numbers/src/difference.ts
/**
* Returns the difference from the `initial` value. Defaults to absolute difference.
* ```js
* const rel = differenceFromFixed(100);
* rel(100); // 0
* rel(150); // 50
* rel(50);  // 50
* ```
*
* 'numerical' gives sign:
* ```js
* const rel = differenceFromFixed(100, `numerical`);
* rel(100); // 0
* rel(150); // 50
* rel(50); // -50
* ```
* 
* 'relative' gives proportion to initial
* ```js
* const rel = differenceFromFixed(100, `relative`);
* rel(100); // 0
* rel(150); // 0.5
* rel(10);  // 0.90
* ```
* 
* Using 'relativeSigned', we get negative relative result
* when value is below the initial value.
* 
* Use {@link differenceFromLast} to compare against the last value,
* rather than the same fixed value.
* @param {number} initial Value to compare against
* @returns Difference from initial value
*/
const differenceFromFixed = (initial, kind = `absolute`) => (value) => differenceFrom(kind, value, initial);
/**
* Returns a function which yields difference compared to last value.
* 
* If no initial value is provided, the first difference will be returned as 0.
* 
* Difference can be returned in various formats:
* * 'absolute': numerical difference, without sign
* * 'numerical': numerical difference, with sign, so you can see if difference is higher or lower
* * 'relative': difference divided by last value, giving a proportional difference. Unsigned.
* * 'relativeSigned': as above, but with sign
* 
* Use {@link differenceFromFixed} to compare against a fixed value instead of the last value.
* 
* ```js
* let d = differenceFromLast(`absolute`);
* d(10); // 0
* d(11); // 1
* d(10); // 1
* ```
* 
* ```js
* let d = differenceFromLast(`numerical`);
* d(10); // 0
* d(11); // 1
* d(10); // -1
* ```
* 
* ```js
* let d = differenceFromLast(`relative`);
* d(10); // 0
* d(11); // 0.1
* d(10); // 0.1
* ```
* ```js
* let d = differenceFromLast(`relativeSigned`);
* d(10); // 0
* d(11); // 0.1
* d(10); // -0.1
* ```
* 
* An initial value can be provided, eg:
* ```js
* let d = differenceFromLast(`absolute`, 10);
* d(11); // 1
* ```
* @param kind Kind of output value
* @param initialValue Optional initial value 
* @returns 
*/
const differenceFromLast = (kind = `absolute`, initialValue = NaN) => {
	let lastValue = initialValue;
	return (value) => {
		const x = differenceFrom(kind, value, lastValue);
		lastValue = value;
		return x;
	};
};
const differenceFrom = (kind = `absolute`, value, from) => {
	if (Number.isNaN(from)) return 0;
	const d = value - from;
	let r = 0;
	if (kind === `absolute`) r = Math.abs(d);
	else if (kind === `numerical`) r = d;
	else if (kind === `relative`) r = Math.abs(d / from);
	else if (kind === `relativeSigned`) r = d / from;
	else throw new TypeError(`Unknown kind: '${kind}' Expected: 'absolute', 'relative', 'relativeSigned' or 'numerical'`);
	return r;
};

//#endregion
//#region ../packages/numbers/src/guard.ts
/**
* Returns true if `possibleNumber` is a number and not NaN
* @param possibleNumber
* @returns _True_ if is a number and not NaN
*/
function isValid(possibleNumber) {
	if (typeof possibleNumber !== `number`) return false;
	if (Number.isNaN(possibleNumber)) return false;
	return true;
}

//#endregion
//#region ../packages/numbers/src/filter.ts
/**
* Filters an iterator of values, only yielding
* those that are valid numbers
*
* ```js
* const data = [true, 10, '5', { x: 5 }];
* for (const n of Numbers.filterIterable(data)) {
*  // 10
* }
* ```
* @param it
*/
function* filterIterable(it) {
	for (const v of it) if (isValid(v)) yield v;
}
/**
* Returns a function that yields _true_ if a value
* is at least `threshold`
* ```js
* const t = thresholdAtLeast(50);
* t(50); // true
* t(0);  // false
* t(55); // true
* ```
* @param threshold 
* @returns 
*/
const thresholdAtLeast = (threshold) => {
	return (v) => {
		return v >= threshold;
	};
};
/**
* Returns a function that yields _true_
* if a number is at least _min_ and no greater than _max_
* 
* ```js
* const t = rangeInclusive(50, 100);
* t(40); // false
* t(50); // true
* t(60); // true
* t(100); // true
* t(101);  // false
* ```
* @param min 
* @param max 
* @returns 
*/
const rangeInclusive = (min, max) => {
	return (v) => {
		return v >= min && v <= max;
	};
};

//#endregion
//#region ../packages/numbers/src/flip.ts
/**
* Flips a percentage-scale number: `1 - v`.
*
* The utility of this function is that it sanity-checks
* that `v` is in 0..1 scale.
*
* ```js
* flip(1);   // 0
* flip(0.5); // 0.5
* flip(0);   // 1
* ```
* @param v
* @returns
*/
const flip = (v) => {
	if (typeof v === `function`) v = v();
	resultThrow(numberTest(v, `percentage`, `v`));
	return 1 - v;
};

//#endregion
//#region ../packages/numbers/src/generate.ts
/**
* Generates a range of numbers, starting from `start` and counting by `interval`.
* If `end` is provided, generator stops when reached
*
* Unlike {@link numericRange}, numbers might contain rounding errors
*
* ```js
* for (const c of numericRangeRaw(10, 100)) {
*  // 100, 110, 120 ...
* }
* ```
* 
* Get results as an array
* ```js
* const c = [...numericRangeRaw(1,0,5)]; // [0,1,2,3,4]
* ```
* @param interval Interval between numbers
* @param start Start
* @param end End (if undefined, range never ends). Inclusive.
*/
const numericRangeRaw = function* (interval, start = 0, end, repeating = false) {
	if (interval <= 0) throw new Error(`Interval is expected to be above zero`);
	if (typeof end === `undefined`) end = Number.MAX_SAFE_INTEGER;
	let v = start;
	do
		while (v <= end) {
			yield v;
			v += interval;
		}
	while (repeating);
};
/**
* Generates a range of numbers, with a given interval.
*
* @example For-loop
* ```
* let loopForever = numericRange(0.1); // By default starts at 0 and counts upwards forever
* for (v of loopForever) {
*  console.log(v);
* }
* ```
*
* @example If you want more control over when/where incrementing happens...
* ```js
* let percent = numericRange(0.1, 0, 1);
*
* let percentResult = percent.next().value;
* ```
*
* Note that computations are internally rounded to avoid floating point math issues. So if the `interval` is very small (eg thousandths), specify a higher rounding
* number.
*
* @param interval Interval between numbers
* @param start Start. Defaults to 0
* @param end End (if undefined, range never ends). Inclusive.
* @param repeating Range loops from start indefinately. Default _false_
* @param rounding A rounding that matches the interval avoids floating-point math hikinks. Eg if the interval is 0.1, use a rounding of 10
*/
const numericRange = function* (interval, start = 0, end, repeating = false, rounding) {
	resultThrow(numberTest(interval, `nonZero`));
	const negativeInterval = interval < 0;
	if (end === void 0) {} else {
		if (negativeInterval && start < end) throw new Error(`Interval of ${interval.toString()} will never go from ${start.toString()} to ${end.toString()}`);
		if (!negativeInterval && start > end) throw new Error(`Interval of ${interval.toString()} will never go from ${start.toString()} to ${end.toString()}`);
	}
	rounding = rounding ?? 1e3;
	if (end === void 0) end = Number.MAX_SAFE_INTEGER;
	else end *= rounding;
	interval = interval * rounding;
	do {
		let v = start * rounding;
		while (!negativeInterval && v <= end || negativeInterval && v >= end) {
			yield v / rounding;
			v += interval;
		}
	} while (repeating);
};
/**
* Yields numeric range between 0.0-1.0.
*
* ```
* // Yields: [0, 0.2, 0.4, 0.6, 0.8, 1]
* const a = [...numericPercent(0.2)];
*
* // Repeating flag set to true:
* for (const v of numericPercent(0.2, true)) {
*  // Infinite loop. V loops back to 0 after hitting 1
* }
* ```
*
* If `repeating` is true, it loops back to 0 after reaching 1
* @param interval Interval (default: 0.01, ie. 1%)
* @param repeating Whether generator should loop (default: false)
* @param start Start (default: 0)
* @param end End (default: 1)
* @returns
*/
const numericPercent = function(interval = .01, repeating = false, start = 0, end = 1) {
	resultThrow(numberTest(interval, `percentage`, `interval`), numberTest(start, `percentage`, `start`), numberTest(end, `percentage`, `end`));
	return numericRange(interval, start, end, repeating);
};

//#endregion
//#region ../packages/numbers/src/is-approx.ts
/**
* Checks if a value is within range of a base value
* 
* ```js
* // Check if 101 is within 10% of 100
* isApprox(0.1, 100, 101);
* 
* // Gets a function to compare some value of 10% range to 100
* const c = isApprox(0.1,100);
* c(101);
* 
* // Gets a function to compare some base value and value to 10% range
* const c = isApprox(0.1);
* c(100, 101);
* ```
* 
* Throws an error if range or base values are NaN.
* If value being checked is NaN or infinity, _false_ is returned.
* @param rangePercent 
* @param baseValue 
* @param v 
* @returns 
*/
function isApprox(rangePercent, baseValue, v) {
	resultThrow(numberTest(rangePercent, `percentage`, `rangePercent`));
	const range = Math.floor(rangePercent * 100);
	const test = (base, value) => {
		try {
			if (typeof value !== `number`) return false;
			if (Number.isNaN(value)) return false;
			if (!Number.isFinite(value)) return false;
			const diff = Math.abs(value - base);
			return (base === 0 ? Math.floor(diff * 100) : Math.floor(diff / base * 100)) <= range;
		} catch {
			return false;
		}
	};
	if (baseValue === void 0) return test;
	resultThrow(numberTest(baseValue, ``, `baseValue`));
	if (v === void 0) return (value) => test(baseValue, value);
	else return test(baseValue, v);
}
/**
* Yields a function that checks if a value is close to any target value
* ```js
* const c = isCloseToAny(1, 10, 20, 30, 40);
* c(11); // True - within 1 range of 10
* c(19); // True - within 1 range of 20
* c(0);  // False
* ```
* 
* Returned function accepts multiple values, returning
* _true_ if any of them are within range
* ```js
* c(0, 1, 11); // Would return true based on 11
* ```
* @param allowedRangeAbsolute 
* @param targets 
* @returns 
*/
const isCloseToAny = (allowedRangeAbsolute, ...targets) => {
	const targetsMin = targets.map((t) => t - allowedRangeAbsolute);
	const targetsMax = targets.map((t) => t + allowedRangeAbsolute);
	return (...values) => {
		for (const v of values) for (let index = 0; index < targets.length; index++) if (v >= targetsMin[index] && v <= targetsMax[index]) return true;
		return false;
	};
};

//#endregion
//#region ../packages/numbers/src/kalman.ts
/**
* KalmanFilter
* 
* author: Wouter Bulten
* see {@link http://github.com/wouterbulten/kalmanjs}
* version Version: 1.0.0-beta
* copyright Copyright 2015-2018 Wouter Bulten
* license MIT License
*/
var Kalman1dFilter = class {
	R;
	Q;
	A;
	C;
	B;
	cov;
	x;
	/**
	* Create 1-dimensional kalman filter
	*/
	constructor(options = {}) {
		this.R = options.r ?? 1;
		this.Q = options.q ?? 1;
		this.A = options.a ?? 1;
		this.C = options.c ?? 1;
		this.B = options.b ?? 0;
		this.cov = NaN;
		this.x = NaN;
	}
	/**
	* Filter a new value
	* @param  {Number} z Measurement
	* @param  {Number} u Control
	* @return {Number}
	*/
	filter(z, u = 0) {
		if (isNaN(this.x)) {
			this.x = 1 / this.C * z;
			this.cov = 1 / this.C * this.Q * (1 / this.C);
		} else {
			const predX = this.predict(u);
			const predCov = this.uncertainty();
			const K = predCov * this.C * (1 / (this.C * predCov * this.C + this.Q));
			this.x = predX + K * (z - this.C * predX);
			this.cov = predCov - K * this.C * predCov;
		}
		return this.x;
	}
	/**
	* Predict next value
	* @param  {Number} [u] Control
	* @return {Number}
	*/
	predict(u = 0) {
		return this.A * this.x + this.B * u;
	}
	/**
	* Return uncertainty of filter
	* @return {Number}
	*/
	uncertainty() {
		return this.A * this.cov * this.A + this.R;
	}
	/**
	* Return the last filtered measurement
	* @return {Number}
	*/
	lastMeasurement() {
		return this.x;
	}
	/**
	* Set measurement noise Q
	* @param {Number} noise
	*/
	setMeasurementNoise(noise) {
		this.Q = noise;
	}
	/**
	* Set the process noise R
	* @param {Number} noise
	*/
	setProcessNoise(noise) {
		this.R = noise;
	}
};
/**
* Returns a function that performs 1D Kalman filtering.
* 
* ```js
* const f = kalman1dFilter();
* f(10); // 10
* ```
* 
* Under the hood creates a {@link Kalman1dFilter} instance and returns its `filter` method.
* @param options 
* @returns 
*/
const kalman1dFilter = (options = {}) => {
	const f = new Kalman1dFilter(options);
	return f.filter.bind(f);
};

//#endregion
//#region ../packages/numbers/src/bipolar.ts
var bipolar_exports = /* @__PURE__ */ __exportAll({
	clamp: () => clamp,
	fromScalar: () => fromScalar,
	immutable: () => immutable,
	scale: () => scale$1,
	scaleUnclamped: () => scaleUnclamped,
	toScalar: () => toScalar,
	towardZero: () => towardZero
});
/**
* Wrapper for bipolar-based values. Immutable.
* All functions will clamp to keep it in legal range.
* 
* ```js
* let v = immutable(); // Starts with 0 by default
* v = v.add(0.1);      // v.value is 0.1
* v = v.inverse();     // v.value is -0.1
* v = v.multiply(0.2); // v.value is -0.02
* 
* v = immutable(1);
* v = v.towardZero(0.1); // 0.9
* v = v.interpolate(0.1, 1);
* ```
* 
* Wrapped values can be coerced into number:
* ```js
* const v = immutable(1);
* const x = +v+10;
* // x = 11
* ```
* @param startingValueOrBipolar Initial numeric value or BipolarWrapper instance
* @throws {TypeError} If start value is out of bipolar range or invalid
* @returns 
*/
const immutable = (startingValueOrBipolar = 0) => {
	const startingValue = typeof startingValueOrBipolar === `number` ? startingValueOrBipolar : startingValueOrBipolar.value;
	if (startingValue > 1) throw new TypeError(`Start value cannot be larger than 1`);
	if (startingValue < -1) throw new TypeError(`Start value cannot be smaller than -1`);
	if (Number.isNaN(startingValue)) throw new TypeError(`Start value is NaN`);
	const v = startingValue;
	return {
		[Symbol.toPrimitive](hint) {
			if (hint === `number` || hint === `default`) return v;
			else if (hint === `string`) return v.toString();
			return true;
		},
		value: v,
		towardZero: (amount) => {
			return immutable(towardZero(v, amount));
		},
		add: (amount) => {
			return immutable(clamp(v + amount));
		},
		multiply: (amount) => {
			return immutable(clamp(v * amount));
		},
		inverse: () => {
			return immutable(-v);
		},
		interpolate: (amount, target) => {
			return immutable(clamp(interpolate(amount, v, target)));
		},
		asScalar: (max = 1, min = 0) => {
			return toScalar(v, max, min);
		}
	};
};
/**
* Converts bipolar value to a scalar. That is, converts from
* -1..1 range to 0..1.
* 
* ```js
* Bipolar.toScalar(-1); // 0.0
* Bipolar.toScalar( 0); // 0.5
* Bipolar.toScalar( 1); // 1.0
* ```
* 
* Range can be changed:
* ```js
* Bipolar.toScalar(0, 100); // Uses 0..100 scale, so output is 50
* Bipolar.toScalar(0, 100, 50); // Uses 50..1000 scale, so output is 75
* ```
* 
* Throws an error if `bipolarValue` is not a number or NaN
* @param bipolarValue Value to convert to scalar
* @returns Scalar value on 0..1 range.
*/
const toScalar = (bipolarValue, max = 1, min = 0) => {
	if (typeof bipolarValue !== `number`) throw new Error(`Param 'bipolarValue' to be a number. Got: ${typeof bipolarValue}`);
	if (Number.isNaN(bipolarValue)) throw new Error(`Param 'bipolarValue' is NaN`);
	return scale(bipolarValue, -1, 1, min, max);
};
/**
* Makes a scalar into a bipolar value.
* 
* That is, input range is 0..1, output range is -1...1
*
* ```js
* Bipolar.fromScalar(1);   // 1
* Bipolar.fromScalar(0);   // -1
* Bipolar.fromScalar(0.5); // 0
* ```
* 
* Throws an error if `scalarValue` is outside 0..1 scale.
* @param scalarValue Scalar value to convert
* @returns Bipolar value on -1..1 scale
*/
const fromScalar = (scalarValue) => {
	resultThrow(numberTest(scalarValue, `percentage`, `v`));
	return scalarValue * 2 - 1;
};
/**
* Scale & clamp value to bipolar range (-1..1).
* ```js
* // Scale 100 on 0..100 scale
* Bipolar.scale(100, 0, 100); // 1
* Bipolar.scale(50, 0, 100);  // 0
* Bipolar.scale(0, 0, 100);   // -1
* ```
* 
* Return value is clamped.
* @param inputValue Value to scale
* @param inMin Minimum of scale
* @param inMax Maximum of scale
* @returns Bipolar value on -1..1 scale
*/
const scale$1 = (inputValue, inMin, inMax) => {
	return clamp(scaler(inMin, inMax, -1, 1)(inputValue));
};
/**
* Scale a number to bipolar range (-1..1). Not clamped, so we might exceed range.
* 
* ```js
* // Scale 100 on 0..100 scale
* Bipolar.scaleUnclamped(100, 0, 100); // 1
* Bipolar.scaleUnclamped(50, 0, 100);  // 0
* Bipolar.scaleUnclamped(0, 0, 100);   // -1
* ```
* 
* @param inputValue Value to scale
* @param inMin Minimum of scale
* @param inMax Maximum of scale
* @returns Bipolar value on -1..1 scale
*/
const scaleUnclamped = (inputValue, inMin, inMax) => {
	return scaler(inMin, inMax, -1, 1)(inputValue);
};
/**
* Clamp a bipolar value
* ```js
* Bipolar.clamp(-1);   // -1
* Bipolar.clamp(-1.1); // -1
* ```
* 
* Throws an error if `bipolarValue` is not a number or NaN.
* @param bipolarValue Value to clamp
* @returns Clamped value on -1..1 scale
*/
const clamp = (bipolarValue) => {
	if (typeof bipolarValue !== `number`) throw new Error(`Param 'bipolarValue' must be a number. Got: ${typeof bipolarValue}`);
	if (Number.isNaN(bipolarValue)) throw new Error(`Param 'bipolarValue' is NaN`);
	if (bipolarValue > 1) return 1;
	if (bipolarValue < -1) return -1;
	return bipolarValue;
};
/**
* Pushes a bipolar value toward zero by `amount`.
* Return value is clamped on bipolar range of -1..1
* 
* ```js
* Bipolar.towardZero(-1, 0.1); // -0.9
* Bipolar.towardZero( 1, 0.1); //  0.9
* Bipolar.towardZero( 0, 0.1); //  0.0
* Bipolar.towardZero( 1, 1.1); //  0.0
* ```
* 
* If `amount` is greater than 1, 0 is returned.
* Throws an error if `bipolarValue` or `amount` are not numbers.
* Throws an error if `amount` is below zero.
* @param bipolarValue Bipolar value to nudge toward zero
* @param amount Amount to nudge by
* @returns Bipolar value -1...1
*/
const towardZero = (bipolarValue, amount) => {
	if (typeof bipolarValue !== `number`) throw new Error(`Parameter 'bipolarValue' must be a number. Got: ${typeof bipolarValue}`);
	if (typeof amount !== `number`) throw new Error(`Parameter 'amount' must be a number. Got: ${typeof amount}`);
	if (amount < 0) throw new Error(`Parameter 'amount' must be positive`);
	if (bipolarValue < 0) {
		bipolarValue += amount;
		if (bipolarValue > 0) bipolarValue = 0;
	} else if (bipolarValue > 0) {
		bipolarValue -= amount;
		if (bipolarValue < 0) bipolarValue = 0;
	}
	return bipolarValue;
};

//#endregion
//#region ../packages/numbers/src/wrap.ts
/**
* Wraps an integer number within a specified range, defaulting to degrees (0-360). Use {@link wrap} for floating-point wrapping.
*
* This is useful for calculations involving degree angles and hue, which wrap from 0-360.
* Eg: to add 200 to 200, we don't want 400, but 40.
*
* ```js
* const v = wrapInteger(200+200, 0, 360); // 40
* ```
*
* Or if we minus 100 from 10, we don't want -90 but 270
* ```js
* const v = wrapInteger(10-100, 0, 360); // 270
* ```
*
* `wrapInteger` uses 0-360 as a default range, so both of these
* examples could just as well be:
*
* ```js
* wrapInteger(200+200);  // 40
* wrapInteger(10-100);  // 270
* ```
*
* Non-zero starting points can be used. A range of 20-70:
* ```js
* const v = wrapInteger(-20, 20, 70); // 50
* ```
*
* Note that the minimum value is inclusive, while the maximum is _exclusive_.
* So with the default range of 0-360, 360 is never reached:
*
* ```js
* wrapInteger(360); // 0
* wrapInteger(361); // 1
* ```
*
* If you just want to lock values to a range without wrapping, consider {@link clamp}.
*
* @param v Value to wrap
* @param min Integer minimum of range (default: 0). Inclusive
* @param max Integer maximum of range (default: 360). Exlusive
* @returns
*/
const wrapInteger = (v, min = 0, max = 360) => {
	resultThrow(integerTest(v, void 0, `v`), integerTest(min, void 0, `min`), integerTest(max, void 0, `max`));
	if (v === min) return min;
	if (v === max) return min;
	if (v > 0 && v < min) v += min;
	v -= min;
	max -= min;
	v = v % max;
	if (v < 0) v = max - Math.abs(v) + min;
	return v + min;
};
/**
* Wraps floating point numbers to be within a range (default: 0..1). Use {@link wrapInteger} if you want to wrap integer values.
*
* This logic makes sense for some things like rotation angle.
*
* If you just want to lock values to a range without wrapping, consider {@link clamp}.
*
* ```js
* wrap(1.2);   // 0.2
* wrap(2);     // 1.0
* wrap(-0.2); // 0.8
* ```
*
* A range can be provided too:
* ```js
* wrap(30, 20, 50);  	 // 30
* wrap(60, 20, 50);    //  30
* ```
* @param v
* @param min
* @param max
* @returns
*/
const wrap = (v, min = 0, max = 1) => {
	resultThrow(numberTest(v, ``, `min`), numberTest(min, ``, `min`), numberTest(max, ``, `max`));
	if (v === min) return min;
	if (v === max) return min;
	while (v <= min || v >= max) {
		if (v === max) break;
		if (v === min) break;
		if (v > max) v = min + (v - max);
		else if (v < min) v = max - (min - v);
	}
	return v;
};
/**
* Performs a calculation within a wrapping number range. This is a lower-level function.
* See also: {@link wrapInteger} for simple wrapping within a range.
*
* `min` and `max` define the start and end of the valid range, inclusive. Eg for hue degrees it'd be 0, 360.
* `a` and `b` is the range you want to work in.
*
* For example, let's say you want to get the middle point between a hue of 30 and a hue of 330 (ie warmer colours):
* ```js
* wrapRange(0,360, (distance) => {
*  // for a:0 and b:330, distance would be 90 from 30 degrees to 330 (via zero)
*  return distance * 0.5; // eg return middle point
* }, 30, 330);
* ```
*
* The return value of the callback should be in the range of 0-distance. `wrapRange` will subsequently
* conform it to the `min` and `max` range before it's returned to the caller.
*
* @param a Output start (eg. 60)
* @param b Output end (eg 300)
* @param min Range start (eg 0)
* @param max Range end (eg 360)
* @param fn Returns a computed value from 0 to `distance`.
* @returns
*/
const wrapRange = (min, max, fn, a, b) => {
	let r = 0;
	const distF = Math.abs(b - a);
	const distFwrap = Math.abs(max - a + b);
	const distBWrap = Math.abs(a + (360 - b));
	const distMin = Math.min(distF, distFwrap, distBWrap);
	if (distMin === distBWrap) r = a - fn(distMin);
	else if (distMin === distFwrap) r = a + fn(distMin);
	else if (a > b) r = a - fn(distMin);
	else r = a + fn(distMin);
	return wrapInteger(r, min, max);
};

//#endregion
//#region ../packages/numbers/src/pi-pi.ts
const piPi = Math.PI * 2;

//#endregion
//#region ../packages/numbers/src/interpolate.ts
/**
* Interpolates between `a` and `b` by `amount`. Aka `lerp`.
*
* [ixfx Guide on Interpolation](https://ixfx.fun/data/interpolation/overview/)
*
* @example Get the halfway point between 30 and 60
* ```js
* interpolate(0.5, 30, 60);
* ```
*
* See also {@link interpolatorStepped} and {@link https://api.ixfx.fun/_ixfx/modulation/interpolatorInterval/} for functions
* which help to manage progression from A->B over steps or interval.
* 
* Usually interpolation amount is on a 0...1 scale, inclusive. What is the interpolation result
* if this scale is exceeded? By default it is clamped to 0..1, so the return value is always between `a` and `b` (inclusive).
* 
* Alternatively, set the `limits` option to process `amount`:
* * 'wrap': wrap amount, eg 1.5 is the same as 0.5, 2 is the same as 1
* * 'ignore': allow exceeding values. eg 1.5 will yield b*1.5.
* * 'clamp': default behaviour of clamping interpolation amount to 0..1
* 
* Interpolation can be non-linear using 'easing' option or 'transform' funciton.
* ```js
* interpolate(0.1, 0, 100, { easing: `quadIn` });
* ```
* There are a few variations when calling `interpolate`, depending on what parameters are fixed.
* * `interpolate(amount)`: returns a function that needs a & b 
* * `interpolate(a, b)`:  returns a function that needs the interpolation amount
*/
function interpolate(pos1, pos2, pos3, pos4) {
	let amountProcess;
	let limits = `clamp`;
	const handleAmount = (amount) => {
		if (amountProcess) amount = amountProcess(amount);
		if (limits === void 0 || limits === `clamp`) amount = clamp$1(amount);
		else if (limits === `wrap`) {
			if (amount > 1) amount = amount % 1;
			else if (amount < 0) amount = 1 + amount % 1;
		}
		return amount;
	};
	const doTheEase = (_amt, _a, _b) => {
		resultThrow(numberTest(_a, ``, `a`), numberTest(_b, ``, `b`), numberTest(_amt, ``, `amount`));
		_amt = handleAmount(_amt);
		return (1 - _amt) * _a + _amt * _b;
	};
	const readOpts = (o = {}) => {
		if (o.transform !== void 0) {
			if (typeof o.transform !== `function`) throw new Error(`Param 'transform' is expected to be a function. Got: ${typeof o.transform}`);
			amountProcess = o.transform;
		}
		limits = o.limits ?? `clamp`;
	};
	const rawEase = (_amt, _a, _b) => (1 - _amt) * _a + _amt * _b;
	if (typeof pos1 !== `number`) throw new TypeError(`First param is expected to be a number. Got: ${typeof pos1}`);
	if (typeof pos2 === `number`) {
		let a;
		let b;
		if (pos3 === void 0 || typeof pos3 === `object`) {
			a = pos1;
			b = pos2;
			readOpts(pos3);
			return (amount) => doTheEase(amount, a, b);
		} else if (typeof pos3 === `number`) {
			a = pos2;
			b = pos3;
			readOpts(pos4);
			return doTheEase(pos1, a, b);
		} else throw new Error(`Values for 'a' and 'b' not defined`);
	} else if (pos2 === void 0 || typeof pos2 === `object`) {
		const amount = handleAmount(pos1);
		readOpts(pos2);
		resultThrow(numberTest(amount, ``, `amount`));
		return (aValue, bValue) => rawEase(amount, aValue, bValue);
	}
}
/**
* Returns a function that interpolates from A to B.
* It steps through the interpolation with each call to the returned function.
* This means that the `incrementAmount` will hinge on the rate
* at which the function is called. Alternatively, consider {@link https://api.ixfx.fun/_ixfx/modulation/interpolatorInterval/}
* which steps on the basis of clock time.
* 
* ```js
* // Interpolate from 0..1 by 0.01
* const v = interpolatorStepped(0.01, 100, 200);
* v(); // Each call returns a value closer to target
* // Eg: 100, 110, 120, 130 ...
* ```
* 
* Under the hood, it calls `interpolate` with an amount that
* increases by `incrementAmount` each time.
* 
* When calling `v()` to step the interpolator, you can also pass
* in new B and A values. Note that the order is swapped: the B (target) is provided first, and
* then optionally A.
* 
* ```js
* const v = interpolatorStepped(0.1, 100, 200); // Interpolate 100->200
* v(300, 200); // Retarget to 200->300 and return result
* v(150); // Retarget 200->150 and return result
* ```
* 
* This allows you to maintain the current interpolation progress.
* @param incrementAmount Amount to increment by
* @param a Start value. Default: 0
* @param b End value. Default: 1
* @param startInterpolationAt Starting interpolation amount. Default: 0
* @param options Options for interpolation
* @returns 
*/
const interpolatorStepped = (incrementAmount, a = 0, b = 1, startInterpolationAt = 0, options) => {
	let amount = startInterpolationAt;
	return (retargetB, retargetA) => {
		if (retargetB !== void 0) b = retargetB;
		if (retargetA !== void 0) a = retargetA;
		if (amount >= 1) return b;
		const value = interpolate(amount, a, b, options);
		amount += incrementAmount;
		return value;
	};
};
/**
* Interpolate between angles `a` and `b` by `amount`. Angles are in radians.
*
* ```js
* interpolateAngle(0.5, Math.PI, Math.PI/2);
* ```
* @param amount
* @param aRadians Start angle (radian)
* @param bRadians End angle (radian)
* @returns
*/
const interpolateAngle = (amount, aRadians, bRadians, options) => {
	const t = wrap(bRadians - aRadians, 0, piPi);
	return interpolate(amount, aRadians, aRadians + (t > Math.PI ? t - piPi : t), options);
};

//#endregion
//#region ../packages/numbers/src/iqr.ts
/**
* Calculate interquartile range.
* 
* If `n` is unspecified, `data.length` is used.
* @param data 
* @param n 
* @returns 
*/
const interquartileRange = (data, n) => {
	return getQuantile(data, .75) - getQuantile(data, .25);
};
/**
* Returns a function which itself returns _true_ if a value is an outlier.
* 
* This can be used for example to get a copy of an array without outliers:
* ```js
* const p = computeIsOutlier(someData);
* const someDataWithoutOutliers = someData.filter(value => !p(value));
* ```
* 
* Outliers are defined as: "a point which falls more than 1.5 times the interquartile range above the third quartile or below the first quartile." [Wolfram](https://mathworld.wolfram.com/Outlier.html)
* 
* If array length is less than 4, no value will be considered an outlier.
* @param data Data to filter
* @param multiplier Multiplier of Q3 Q1. Default: 1.5 
* @returns 
*/
const computeIsOutlier = (data, multiplier = 1.5) => {
	if (data.length < 4) return (value) => false;
	const values = data.toSorted((a, b) => a - b);
	const q1 = getQuantile(values, .25, true);
	const q3 = getQuantile(values, .75, true);
	const iqr = q3 - q1;
	const maxValue = q3 + iqr * multiplier;
	const minValue = q1 - iqr * multiplier;
	return (value) => value < minValue || value > maxValue;
};
/**
* Gets the value at a specific quantile
* ```js
* getQuantile(data, 25); // 1st quartile
* getQuantile(data, 75); // 3rd quartile
* ```
* @param data 
* @param quantile 
* @param presorted Pass _true_ if `data` is already sorted
* @returns 
*/
const getQuantile = (data, quantile, presorted = false) => {
	if (quantile > 1 || quantile < 0) throw new TypeError(`Param 'quantile' is expected to be in 0..1 range. Got: '${quantile}'`);
	if (!Array.isArray(data)) throw new TypeError(`Param 'data' is expected to be an array. Got: ${typeof data}`);
	const index = quantile * (data.length - 1);
	if (!presorted) data = data.toSorted((a, b) => a - b);
	if (quantile === 0) return data[0];
	if (quantile === 1) return data[data.length - 1];
	if (index % 1 === 0) return data[index];
	const lowerIndex = Math.floor(index);
	if (data[lowerIndex + 1] !== void 0) return (data[lowerIndex] + data[lowerIndex + 1]) / 2;
	return data[lowerIndex];
};

//#endregion
//#region ../packages/numbers/src/round.ts
/**
* Rounds a number.
*
* If one parameter is given, it's the decimal places,
* and a rounding function is returned:
* ```js
* const r = round(2);
* r(10.12355); // 10.12
* ```
*
* If two parameters are given, the first is decimal places,
* the second the value to round.
* ```js
* round(2, 10.12355); // 10.12
* ```
* @param decimalPlaces
* @returns
*/
function round(a, b, roundUp) {
	resultThrow(integerTest(a, `positive`, `decimalPlaces`));
	const up = typeof b === `boolean` ? b : roundUp ?? false;
	let rounder;
	if (a === 0) rounder = Math.round;
	else {
		const p = Math.pow(10, a);
		if (up) rounder = (v) => Math.ceil(v * p) / p;
		else rounder = (v) => Math.floor(v * p) / p;
	}
	if (typeof b === `number`) return rounder(b);
	return rounder;
}

//#endregion
//#region ../packages/numbers/src/linear-space.ts
/**
* Generates a `step`-length series of values between `start` and `end` (inclusive).
* Each value will be equally spaced.
*
* ```js
* for (const v of linearSpace(1, 5, 6)) {
*  // Yields: [ 1, 1.8, 2.6, 3.4, 4.2, 5 ]
* }
* ```
*
* Numbers can be produced from large to small as well
* ```js
* const values = [...linearSpace(10, 5, 3)];
* // Yields: [10, 7.5, 5]
* ```
* @param start Start number (inclusive)
* @param end  End number (inclusive)
* @param steps How many steps to make from start -> end
* @param precision Number of decimal points to round to
*/
function* linearSpace(start, end, steps, precision) {
	resultThrow(numberTest(start, ``, `start`), numberTest(end, ``, `end`), numberTest(steps, ``, `steps`));
	const r = precision ? round(precision) : (v) => v;
	const step = (end - start) / (steps - 1);
	resultThrow(numberTest(step, ``, `step`));
	if (!Number.isFinite(step)) throw new TypeError(`Calculated step value is infinite`);
	for (let index = 0; index < steps; index++) yield r(start + step * index);
}

//#endregion
//#region ../packages/numbers/src/moving-average.ts
const PiPi = Math.PI * 2;
/**
* A moving average calculator (exponential weighted moving average) which does not keep track of
* previous samples. Less accurate, but uses less system resources.
*
* The `scaling` parameter determines smoothing. A value of `1` means that
* the latest value is used as the average - that is, no smoothing. Higher numbers
* introduce progressively more smoothing by weighting the accumulated prior average more heavily.
*
* ```
* const ma = movingAverageLight(); // default scaling of 3
* ma(50);  // 50
* ma(100); // 75
* ma(75);  // 75
* ma(0);   // 50
* ```
*
* Note that the final average of 50 is pretty far from the last value of 0. To make it more responsive,
* we could use a lower scaling factor: `movingAverageLight(2)`. This yields a final average of `37.5` instead.
*
* @param scaling Scaling factor. 1 is no smoothing. Default: 3
* @returns Function that adds to average.
*/
const movingAverageLight = (scaling = 3) => {
	resultThrow(numberTest(scaling, `aboveZero`, `scaling`));
	let average = 0;
	let count = 0;
	return (v) => {
		if (numberTest(v, ``, `v`).success && v !== void 0) {
			count++;
			average = average + (v - average) / Math.min(count, scaling);
		}
		return average;
	};
};
/**
* Creates a moving average for a set number of `samples`.
* It returns a function which in turn yields an average value.
* 
* Moving average are useful for computing the average over a recent set of numbers.
* A lower number of samples produces a computed value that is lower-latency yet more jittery.
* A higher number of samples produces a smoother computed value which takes longer to respond to
* changes in data.
*
* Sample size is considered with respect to the level of latency/smoothness trade-off, and also
* the rate at which new data is added to the moving average.
*
*
* ```js
* const ma = movingAverage(10);
* ma(10); // 10
* ma(5);  // 7.5
* ```
*
* A weighting function can be provided to shape how the average is
* calculated - eg privileging the most recent data over older data.
* It uses `Arrays.averageWeighted` under the hood.
*
* ```js
* import { movingAverage } from '@ixfx/numbers.js';
* import { gaussian } from '@ixfx/modulation.js';
* 
* // Give more weight to data in middle of sampling window
* const ma = movingAverage(100, gaussian());
* ```
*
* Because it keeps track of `samples` previous data, there is a memory impact. A lighter version is {@link movingAverageLight} which does not keep a buffer of prior data, but can't be as easily fine-tuned.
* @param samplesOrOptions Number of samples to compute average from, or object of options
* @returns
*/
const movingAverage = (samplesOrOptions) => movingAverageWithContext(samplesOrOptions).seen;
const movingAverageWithContext = (samplesOrOptions) => {
	const nanPolicy = typeof samplesOrOptions === `number` ? `ignore` : samplesOrOptions.nanPolicy ?? `ignore`;
	const w = movingWindowWithContext(samplesOrOptions);
	const averageFunction = typeof samplesOrOptions === `number` ? average : samplesOrOptions.weighter ? averageWeigher(samplesOrOptions.weighter) : average;
	const seen = (value) => {
		if (Number.isNaN(value)) {
			if (nanPolicy === `throw`) throw new TypeError(`Value is NaN`);
			if (nanPolicy === `ignore`) return w.data;
		}
		return averageFunction(w.seen(value));
	};
	return {
		seen,
		get data() {
			return [...w.data];
		},
		get average() {
			return averageFunction(w.data);
		}
	};
};
const smoothingFactor = (timeDelta, cutoff) => {
	const r = PiPi * cutoff * timeDelta;
	return r / (r + 1);
};
const exponentialSmoothing = (smoothingFactor, value, previous) => {
	return smoothingFactor * value + (1 - smoothingFactor) * previous;
};
/**
* Noise filtering
* 
* Algorithm: https://gery.casiez.net/1euro/
* 
* Based on [Jaan Tollander de Balsch's implementation](https://jaantollander.com/post/noise-filtering-using-one-euro-filter/)
* @param cutoffMin Default: 1
* @param speedCoefficient Default: 0
* @param cutoffDefault Default: 1
*/
const noiseFilter = (cutoffMin = 1, speedCoefficient = 0, cutoffDefault = 1) => {
	let previousValue = 0;
	let derivativeLast = 0;
	let timestampLast = 0;
	const compute = (value, timestamp) => {
		timestamp ??= performance.now();
		const timeDelta = timestamp - timestampLast;
		const derivative = exponentialSmoothing(smoothingFactor(timeDelta, cutoffDefault), (value - previousValue) / timeDelta, derivativeLast);
		const smoothed = exponentialSmoothing(smoothingFactor(timeDelta, cutoffMin + speedCoefficient * Math.abs(derivative)), value, previousValue);
		previousValue = smoothed;
		derivativeLast = derivative;
		timestampLast = timestamp;
		return smoothed;
	};
	return compute;
};

//#endregion
//#region ../packages/numbers/src/number-array-compute.ts
/**
* Calculate the min, max, total, average and count of input array `data`.
* ```js
* const { total, min, max, avg, count } = numberArrayCompute([ 1, 2, 3 ]);
* ```
* @param data 
* @param opts 
* @returns 
*/
const numberArrayCompute = (data, opts = {}) => {
	if (data.length === 0) return {
		total: NaN,
		min: NaN,
		max: NaN,
		avg: NaN,
		count: NaN
	};
	const nonNumbers = opts.nonNumbers ?? `throw`;
	let total = 0;
	let min = Number.MAX_SAFE_INTEGER;
	let max = Number.MIN_SAFE_INTEGER;
	let count = 0;
	for (let index = 0; index < data.length; index++) {
		let value = data[index];
		if (typeof value !== `number`) {
			if (nonNumbers === `ignore`) continue;
			if (nonNumbers === `throw`) throw new Error(`Param 'data' contains a non-number at index: ${index.toString()}`);
			if (nonNumbers === `nan`) value = NaN;
		}
		if (Number.isNaN(value)) continue;
		if (value !== void 0) {
			min = Math.min(min, value);
			max = Math.max(max, value);
			total += value;
			count++;
		}
	}
	return {
		total,
		max,
		min,
		count,
		avg: total / count
	};
};

//#endregion
//#region ../packages/numbers/src/normalise-minmax.ts
var normalise_minmax_exports = /* @__PURE__ */ __exportAll({
	array: () => array$3,
	arrayWithContext: () => arrayWithContext$3,
	compute: () => compute$2,
	stream: () => stream$1,
	streamWithContext: () => streamWithContext$1
});
/**
* Returns a function which can do min-max normalisation, baking-in the min and max values.
* ```js
* // Normalise with min value of 20, max of 100
* const fn = compute(20, 100);
* 
* // Use function with input value of 40
* fn(40);
* ```
* 
* @param min Minimum value of range
* @param max Maximum value of range
* @param clamp Whether to clamp input value to min/max range. Default: _false_
* @returns 
*/
const compute$2 = (min, max, clamp = false) => {
	const range = max - min;
	return (value) => {
		if (clamp && value < min) value = min;
		if (clamp && value > max) value = max;
		return (value - min) / range;
	};
};
/**
* Normalises an array using the [min-max](https://en.wikipedia.org/wiki/Feature_scaling#Rescaling_(min-max_normalization)) technique.
* 
* This version returns additional context of the normalisation, alternatively use {@link array}
*
* ```js
* const c = arrayWithContext(someValues);
* c.values;    // Array of normalised values
* c.original;  // Original input array
* c.min / c.max / c.range
* ```
* 
* By default, computes min and max values based on contents of `values`. Clamping is not required
* for this case, so it's _false_ by default.
* 
* @param values Values
* @param options Optionally uses 'minForced' and 'maxForced' properties to scale values instead of actual min/max values of data.
*/
const arrayWithContext$3 = (values, options = {}) => {
	if (!Array.isArray(values)) throw new TypeError(`Param 'values' should be an array. Got: ${typeof values}`);
	let clamp = false;
	let minForced = NaN;
	let maxForced = NaN;
	if (typeof options.minForced === `undefined` || typeof options.maxForced === `undefined`) {
		const c = numberArrayCompute(values);
		minForced = options.minForced ?? c.min;
		maxForced = options.maxForced ?? c.max;
		clamp = options.clamp ?? false;
	} else {
		clamp = options.clamp ?? true;
		minForced = options.minForced;
		maxForced = options.maxForced;
	}
	resultThrow(numberTest(minForced), numberTest(maxForced));
	const fn = compute$2(minForced, maxForced, clamp);
	return {
		values: values.map(fn),
		original: values,
		min: minForced,
		max: maxForced,
		range: Math.abs(maxForced - minForced)
	};
};
/**
* Normalises an array using the [min-max](https://en.wikipedia.org/wiki/Feature_scaling#Rescaling_(min-max_normalization)) technique.
* By default uses the actual min/max of the array as the normalisation range. 
* 
* [ixfx Guide on Normalising](https://ixfx.fun/cleaning/normal/)
*
* Use {@link arrayWithContext} to get back the min/max/range and original values
* 
* ```js
* // Yields: [0.5, 0.1, 0.0, 0.9, 1]
* Normalise.MinMax.array([5,1,0,9,10]);
* ```
*
* `minForced` and/or `maxForced` can
* be provided to use an arbitrary range.
* 
* ```js
* // Forced range 0-100
* // Yields: [0.05, 0.01, 0.0, 0.09, 0.10]
* Normalise.MinMax.array([5,1,0,9,10], { minForced: 0, maxForced: 100 });
* ```
*
* Return values are clamped to always be 0-1, inclusive.
*
* @param values Values
* @param options Options to override or min/max values.
*/
const array$3 = (values, options = {}) => {
	return arrayWithContext$3(values, options).values;
};
/**
* [Min-max scaling](https://en.wikipedia.org/wiki/Feature_scaling#Rescaling_(min-max_normalization))
* 
* A more advanced form of {@link stream}
* 
* With this version
* @example
* ```js
* const s = Normalise.MinMax.streamWithContext();
* s.seen(2);    // 1 (because 2 is highest seen)
* s.seen(1);    // 0 (because 1 is the lowest so far)
* s.seen(1.5);  // 0.5 (50% of range 1-2)
* s.seen(0.5);  // 0 (because it's the new lowest)
* ```
* 
* And the more advanced features
* ```js
* s.min / s.max / s.range
* s.reset();
* s.reset(10, 100);
* ```
* @returns
*/
const streamWithContext$1 = (options = {}) => {
	let min = options.minDefault ?? Number.MAX_SAFE_INTEGER;
	let max = options.maxDefault ?? Number.MIN_SAFE_INTEGER;
	resultThrow(numberTest(min), numberTest(max));
	return {
		seen: (v) => {
			resultThrow(numberTest(v));
			min = Math.min(min, v);
			max = Math.max(max, v);
			if (v === min && v === max) return 1;
			const result = (v - min) / (max - min);
			if (Number.isNaN(result)) throw new Error(`Would return NaN. v: ${v} min: ${min} max: ${max}`);
			return result;
		},
		reset: (minDefault, maxDefault) => {
			min = minDefault ?? Number.MAX_SAFE_INTEGER;
			max = maxDefault ?? Number.MIN_SAFE_INTEGER;
		},
		get min() {
			return min;
		},
		get max() {
			return max;
		},
		get range() {
			return Math.abs(max - min);
		}
	};
};
/**
* Normalises numbers using the [min-max](https://en.wikipedia.org/wiki/Feature_scaling#Rescaling_(min-max_normalization)) technique.
*  
* Adjusts min/max as new values are processed. Return values will be in the range of 0-1 (inclusive).
*
* [ixfx Guide on Normalising](https://ixfx.fun/cleaning/normal/)
*
* Use {@link streamWithContext} if you want to be able to check the min/max or reset the normaliser.
* 
* @example
* ```js
* const s = Normalise.MinMax.stream();
* s(2);    // 1 (because 2 is highest seen)
* s(1);    // 0 (because 1 is the lowest so far)
* s(1.5);  // 0.5 (50% of range 1-2)
* s(0.5);  // 0 (because it's the new lowest)
* ```
*
* Since normalisation is being adjusted as new min/max are encountered, it might
* be that value normalised to 1 at one time is different to what normalises to 1
* at a later time.
*
* If you already know what to expect of the number range, passing in `minDefault`
* and `maxDefault` primes the normalisation.
* ```js
* const s = Normalise.MinMax.stream();
* s(5); // 1, because it's the highest seen
*
* // With priming:
* const s = Normalise.MinMax.stream({ minDefault:0, maxDefault:10 });
* s(5); // 0.5, because we're expecting range 0-10
* ```
*
* If a value exceeds the default range, normalisation adjusts.
* Errors are thrown if min/max defaults are NaN or if one attempts to
* normalise NaN.
* 
* @returns
*/
const stream$1 = (options) => streamWithContext$1(options).seen;

//#endregion
//#region ../packages/numbers/src/standard-deviation.ts
/**
* Calculates the standard deviation of an array of numbers.
* 
* If you already have the mean value of the array, this can be passed in.
* Otherwise it will be computed.
* 
* If `usePopulation` is true, `array` is assumed to be the entire population (same as Excel's STDEV.P function)
* Otherwise, it's like Excel's STDEV.S function which assumes data represents a sample of entire population.
* 
* @param array Array of values
* @param meanValue Mean value if pre-computed, otherwise skip this parameter for it to be computed automatically
* @param usePopulation If _true_ result is similar to Excel's STDEV.P. Otherwise like STDEV.S
* @returns 
*/
const standardDeviation = (array, usePopulation = false, meanValue) => {
	const meanV = typeof meanValue === `undefined` ? mean(array) : meanValue;
	return Math.sqrt(array.reduce((accumulator, value) => accumulator.concat((value - meanV) ** 2), []).reduce((accumulator, value) => accumulator + value, 0) / (array.length - (usePopulation ? 0 : 1)));
};

//#endregion
//#region ../packages/numbers/src/normalise-zscore.ts
var normalise_zscore_exports = /* @__PURE__ */ __exportAll({
	array: () => array$2,
	arrayWithContext: () => arrayWithContext$2,
	compute: () => compute$1
});
/**
* Returns a function that computes zscore-based normalisation.
* 
* ```js
* // Calculate necessary components
* const m = mean(data);
* const s = standardDeviation(data);
* 
* // Get the function
* const fn = compute(m, s);
* 
* // Use it
* fn(10); // Yields the normalised value
* ```
* 
* It can be used to normalise a whole array
* ```js
* const normalised = someData.map(fn);
* ```
* 
* If you want to calculate for a whole array, use {@link array}.
* @param mean Mean of data
* @param standardDeviation Standard deviation of data
* @returns 
*/
const compute$1 = (mean, standardDeviation) => (value) => (value - mean) / standardDeviation;
/**
* Returns the an array of normalised values, along with the mean and standard deviation of `array`.
* If you just want the computed results, use {@link Normalise.ZScore.array}.
* 
* By default it will compute mean and std.dev based on `array`. If you have these already, they
* can be passed as options.
* @param array 
* @returns 
*/
const arrayWithContext$2 = (array, options = {}) => {
	const m = options.meanForced ?? mean(array);
	const s = options.standardDeviationForced ?? standardDeviation(array);
	const fn = compute$1(m, s);
	return {
		mean: m,
		standardDeviation: s,
		values: array.map(fn),
		original: array
	};
};
/**
* Returns an array of normalised values using the 'z score' algorithm.
* 
* By default it will compute mean and std.dev based on `array`. If you have these already, they
* can be passed as options.
* @param values 
* @param options 
* @returns 
*/
const array$2 = (values, options = {}) => arrayWithContext$2(values, options).values;

//#endregion
//#region ../packages/numbers/src/normalise-robust.ts
var normalise_robust_exports = /* @__PURE__ */ __exportAll({
	array: () => array$1,
	arrayWithContext: () => arrayWithContext$1,
	compute: () => compute
});
/**
* Calculates 'robust scaling' of a single value, `x`, based on provided mean and standard deviation.
* 
* ```js
* const m = median(someData);
* const i = interquartileRange(someData);
* const fn = compute(m, i);
* 
* // Use normaliser function
* fn(10);
* ```
* If you want to calculate for a whole array, use {@link array}.
* @param median Median of data
* @param iqr Interquartile range of data
* @returns 
*/
const compute = (median, iqr) => (value) => (value - median) / iqr;
/**
* Returns the an array of normalised values, along with the mean and standard deviation of `array`.
* If you just want the computed results, use {@link Normalise.Robust.array}.
* 
* By default it will compute mean and std.dev based on `array`. If you have these already, they
* can be passed as options.
* @param array 
* @returns 
*/
const arrayWithContext$1 = (array, options = {}) => {
	if (!Array.isArray(array)) throw new TypeError(`Param 'array' is expected to be an array. Got: ${typeof array}`);
	const m = options.medianForced ?? median(array);
	const iqr = options.iqrForced ?? interquartileRange(array);
	const fn = compute(m, iqr);
	return {
		median: m,
		iqr,
		values: array.map(fn),
		original: array
	};
};
/**
* Returns an array of normalised values using the 'z score' algorithm.
* 
* By default it will compute mean and std.dev based on `array`. If you have these already, they
* can be passed as options.
* @param values 
* @param options 
* @returns 
*/
const array$1 = (values, options = {}) => arrayWithContext$1(values, options).values;

//#endregion
//#region ../packages/numbers/src/normalise.ts
var normalise_exports = /* @__PURE__ */ __exportAll({
	MinMax: () => normalise_minmax_exports,
	Robust: () => normalise_robust_exports,
	ZScore: () => normalise_zscore_exports,
	array: () => array,
	arrayWithContext: () => arrayWithContext,
	stream: () => stream,
	streamWithContext: () => streamWithContext
});
/**
* Normalises numbers with additional context on the range.
* 
* For more details, see:
* * {@link MinMax.streamWithContext}
* 
* @param strategy 
* @param options 
* @returns 
*/
const streamWithContext = (strategy, options = {}) => {
	switch (strategy) {
		case `minmax`: return streamWithContext$1(options);
		default: throw new Error(`Param 'strategy' has an unknown value: '${strategy}'. Expected: minmax`);
	}
};
/**
* Normalises numbers. Return values will be in the range of 0-1 (inclusive).
*
* [ixfx Guide on Normalising](https://ixfx.fun/cleaning/normal/)
*
* Use {@link streamWithContext} if you want to be able to check the min/max or reset the normaliser.
* 
* @example
* ```js
* const s = Normalise.stream(`minmax`);
* s(2);    // 1 (because 2 is highest seen)
* s(1);    // 0 (because 1 is the lowest so far)
* s(1.5);  // 0.5 (50% of range 1-2)
* s(0.5);  // 0 (because it's the new lowest)
* ```
*
* For more details, see:
* * {@link MinMax.stream}
* @returns
*/
const stream = (strategy = `minmax`, options = {}) => {
	switch (strategy) {
		case `minmax`: return stream$1(options);
		default: throw new Error(`Param 'strategy' has an unknown value: '${strategy}'. Expected: minmax`);
	}
};
/**
* Normalise an array of values with added context, depending on strategy.
* 
* Strategies are available: minmax, zscore & robust
* 
* [ixfx Guide on Normalising](https://ixfx.fun/cleaning/normal/)
*
* Use {@link array} to get back the min/max/range and original values
* 
* ```js
* const { values, min, max, range } = Normalise.arrayWithContext(`minmax`, [5,1,0,9,10]);
* // values will be normalised output
* ```
* 
* For more details, see:
* * {@link MinMax.array}
* * {@link ZScore.array}
* * {@link Robust.array}
* @param strategy 
* @param values 
* @param options 
* @returns 
*/
const arrayWithContext = (strategy, values, options = {}) => {
	switch (strategy) {
		case `minmax`: return arrayWithContext$3(values, options);
		case `zscore`: return arrayWithContext$2(values, options);
		case `robust`: return arrayWithContext$1(values, options);
		default: throw new Error(`Param 'strategy' has an unknown value: '${strategy}'. Expected: minmax|zscore`);
	}
};
/**
* Normalise an array of values.
* 
* Strategies are available: minmax, zscore & robust
* 
* [ixfx Guide on Normalising](https://ixfx.fun/cleaning/normal/)
*
* Use {@link arrayWithContext} to get back the min/max/range and original values
* 
* ```js
* // Yields: [0.5, 0.1, 0.0, 0.9, 1]
* Normalise.array(`minmax`, [5,1,0,9,10]);
* ```
* 
* For more details, see:
* * {@link MinMax.array} [Wikipedia](https://en.wikipedia.org/wiki/Feature_scaling#Rescaling_(min-max_normalization))
* * {@link ZScore.array} [Wikipedia](https://en.wikipedia.org/wiki/Feature_scaling#Standardization_(Z-score_Normalization))
* * {@link Robust.array} [Wikipedia](https://en.wikipedia.org/wiki/Feature_scaling#Robust_Scaling)
* 
* @param strategy 
* @param values 
* @param options 
* @returns 
*/
const array = (strategy, values, options = {}) => arrayWithContext(strategy, values, options).values;

//#endregion
//#region ../packages/numbers/src/proportion.ts
/**
* Scales a percentage-scale number, ie: `v * t`.
* 
* The utility of this function is that it sanity-checks that
* both parameters are in the 0..1 scale.
* 
* Parameters can also be a function that takes no parameters
* and returns a number. It will be invoked when `proportion` is called.
* @param v Value
* @param t Scale amount
* @returns Scaled value
*/
const proportion = (v, t) => {
	if (typeof v === `function`) v = v();
	if (typeof t === `function`) t = t();
	resultThrow(numberTest(v, `percentage`, `v`), numberTest(t, `percentage`, `t`));
	return v * t;
};

//#endregion
//#region ../packages/numbers/src/quantise.ts
/**
* Rounds `v` by `every`. Middle values are rounded up by default.
*
* ```js
* quantiseEvery(11, 10);  // 10
* quantiseEvery(25, 10);  // 30
* quantiseEvery(0, 10);   // 0
* quantiseEvery(4, 10);   // 0
* quantiseEvery(100, 10); // 100
* ```
* 
* Also works with decimals
* ```js
* quantiseEvery(1.123, 0.1); // 1.1
* quantiseEvery(1.21, 0.1);  // 1.2
* ```
*
* @param v Value to quantise
* @param every Number to quantise to
* @param middleRoundsUp If _true_ (default), the exact middle rounds up to next step.
* @returns
*/
const quantiseEvery = (v, every, middleRoundsUp = true) => {
	const everyString = every.toString();
	const decimal = everyString.indexOf(`.`);
	let multiplier = 1;
	if (decimal >= 0) {
		multiplier = 10 * everyString.substring(decimal + 1).length;
		every = Math.floor(multiplier * every);
		v = v * multiplier;
	}
	resultThrow(numberTest(v, ``, `v`), integerTest(every, ``, `every`));
	let div = v / every;
	const divModule = div % 1;
	div = Math.floor(div);
	if (divModule === .5 && middleRoundsUp || divModule > .5) div++;
	return every * div / multiplier;
};

//#endregion
//#region ../packages/numbers/src/scale.ts
/**
* Scales `v` from an input range to an output range (aka `map`)
*
* For example, if a sensor's useful range is 100-500, scale it to a percentage:
*
* ```js
*
* scale(sensorReading, 100, 500, 0, 1);
* ```
*
* `scale` defaults to a percentage-range output, so you can get away with:
* ```js
* scale(sensorReading, 100, 500);
* ```
*
* If `v` is outside of the input range, it will likewise be outside of the output range.
* Use {@link scaleClamped} to clip value to range.
*
* If inMin and inMax are equal, outMax will be returned.
*
* An easing function can be provided for non-linear scaling. In this case
* the input value is 'pre scaled' using the function before it is applied to the
* output range.
*
* ```js
* scale(sensorReading, 100, 500, 0, 1, Easings.gaussian());
* ```
* @param v Value to scale
* @param inMin Input minimum
* @param inMax Input maximum
* @param outMin Output minimum. If not specified, 0
* @param outMax Output maximum. If not specified, 1
* @param easing Easing function
* @returns Scaled value
*/
const scale = (v, inMin, inMax, outMin, outMax, easing) => scaler(inMin, inMax, outMin, outMax, easing)(v);
/**
* Returns a scaling function
* @param inMin Input minimum
* @param inMax Input maximum
* @param outMin Output minimum. If not specified, 0
* @param outMax Output maximum. If not specified, 1
* @param easing Easing function
* @param clamped If true, value is clamped. Default: false
* @returns
*/
const scaler = (inMin, inMax, outMin, outMax, easing, clamped) => {
	resultThrow(numberTest(inMin, `finite`, `inMin`), numberTest(inMax, `finite`, `inMax`));
	const oMax = outMax ?? 1;
	const oMin = outMin ?? 0;
	const clampFunction = clamped ? clamper(outMin, outMax) : void 0;
	return (v) => {
		if (inMin === inMax) return oMax;
		let a = (v - inMin) / (inMax - inMin);
		if (easing !== void 0) a = easing(a);
		const x = a * (oMax - oMin) + oMin;
		if (clampFunction) return clampFunction(x);
		return x;
	};
};
/**
* Returns a 'null' scaler that does nothing - the input value is returned as output.
* @returns 
*/
const scalerNull = () => (v) => v;
/**
* As {@link scale}, but result is clamped to be
* within `outMin` and `outMax`. Useful if you can't be sure
* that `v` is in 0..1 range.
*
* @param value
* @param inMin
* @param inMax
* @param outMin 1 by default
* @param outMax 0 by default d
* @param easing
* @returns
*/
const scaleClamped = (value, inMin, inMax, outMin, outMax, easing) => {
	if (typeof outMax === `undefined`) outMax = 1;
	if (typeof outMin === `undefined`) outMin = 0;
	if (inMin === inMax) return outMax;
	return clamp$1(scale(value, inMin, inMax, outMin, outMax, easing), outMin, outMax);
};
/**
* Scales an input percentage to a new percentage range.
*
* If you have an input percentage (0-1), `scalePercentageOutput` maps it to an
* _output_ percentage of `outMin`-`outMax`.
*
* ```js
* // Scales 50% to a range of 0-10%
* scalePercentages(0.5, 0, 0.10); // 0.05 - 5%
* ```
*
* An error is thrown if any parameter is outside of percentage range. This added
* safety is useful for catching bugs. Otherwise, you could just as well call
* `scale(percentage, 0, 1, outMin, outMax)`.
*
* If you want to scale some input range to percentage output range, just use `scale`:
* ```js
* // Yields 0.5
* scale(2.5, 0, 5);
* ```
* @param percentage Input value, within percentage range
* @param outMin Output minimum, between 0-1
* @param outMax Output maximum, between 0-1
* @returns Scaled value between outMin-outMax.
*/
const scalePercentages = (percentage, outMin, outMax = 1) => {
	resultThrow(numberTest(percentage, `percentage`, `v`), numberTest(outMin, `percentage`, `outMin`), numberTest(outMax, `percentage`, `outMax`));
	return scale(percentage, 0, 1, outMin, outMax);
};
/**
* Scales an input percentage value to an output range
* If you have an input percentage (0-1), `scalePercent` maps it to an output range of `outMin`-`outMax`.
* ```js
* scalePercent(0.5, 10, 20); // 15
* ```
*
* @see {@link scalerPercent} Returns a function
* @param v Value to scale
* @param outMin Minimum for output
* @param outMax Maximum for output
* @returns
*/
const scalePercent = (v, outMin, outMax) => scalerPercent(outMin, outMax)(v);
/**
* Returns a function that scales an input percentage value to an output range
* @see {@link scalePercent} Calculates value
* @param outMin
* @param outMax
* @returns Function that takes a single argument
*/
const scalerPercent = (outMin, outMax) => {
	return (v) => {
		resultThrow(numberTest(v, `percentage`, `v`));
		return scale(v, 0, 1, outMin, outMax);
	};
};
/**
* Returns a two-way scaler
* ```js
* // Input range 0..100, output range 0..1
* const s = scalerTwoWay(0,100,0,1);
* 
* // Scale from input to output
* s.out(50); // 0.5
* 
* // Scale from output range to input
* s.in(1); // 100
* ```
* @param inMin 
* @param inMax 
* @param outMin 
* @param outMax 
* @returns 
*/
const scalerTwoWay = (inMin, inMax, outMin = 0, outMax = 1, clamped = false, easing) => {
	return {
		out: scaler(inMin, inMax, outMin, outMax, easing, clamped),
		in: scaler(outMin, outMax, inMin, inMax, easing, clamped)
	};
};

//#endregion
//#region ../packages/numbers/src/range.ts
/**
* Computes min/max based on a new value and previous range.
* Returns existing object reference if value is within existing range.
*
* If `value` is not a number, by default it will be ignored. Use the 'nonNumberHandling' param to set it
* to throw an error instead if you want to catch that
* @param value Value to compare against range
* @param previous Previous range
* @param nonNumberHandling 'skip' (default), non numbers are ignored; 'error' an error is thrown
* @returns NumericRange
*/
function rangeMergeValue(value, previous, nonNumberHandling = `skip`) {
	if (typeof value === `number`) {
		if (Number.isNaN(value) || !Number.isFinite(value)) {
			if (nonNumberHandling === `error`) throw new TypeError(`Param 'value' is NaN or infinite, and nonNumberHandling is set to 'error'`);
			return previous;
		}
		if (value >= previous.min && value <= previous.max) return previous;
		return {
			min: Math.min(value, previous.min),
			max: Math.max(value, previous.max)
		};
	} else if (nonNumberHandling === `error`) throw new TypeError(`Param 'value' is not a number (type: '${typeof value}') and nonNumberHandling is set to 'error'`);
	return previous;
}
/**
* Returns a function that scales values in a range, by default on 0..1 scale.
* ```js
* const range = { min: 10, max: 20 }
* const s = rangeScaler(range);
* s(15); // 0.5
* ```
* @param range Range to scale on
* @param outMax Output range max. Default: 1
* @param outMin Output range min. Default: 0
* @param easing Easing function: Default: none
* @param clamped Whether input values should be clamped if they exceed range. Default: true
* @returns NumberScaler
*/
function rangeScaler(range, outMax = 1, outMin = 0, easing, clamped = true) {
	return scaler(range.min, range.max, outMin, outMax, easing, clamped);
}
/**
* Expands a range to encompass a new range.
* Returns `existingRange` if `newRange` is within it.
* @param newRange
* @param existingRange
*/
function rangeMergeRange(newRange, existingRange) {
	if (newRange.max <= existingRange.max && newRange.min >= existingRange.min) return existingRange;
	return {
		min: Math.min(newRange.min, existingRange.min),
		max: Math.max(newRange.max, existingRange.max)
	};
}
/**
* Returns an empty range:
* ```js
* {
*  min: Number.MAX_SAFE_INTEGER,
*  max: Number.MIN_SAFE_INTEGER
* }
* ```
*/
const rangeInit = () => ({
	min: Number.MAX_SAFE_INTEGER,
	max: Number.MIN_SAFE_INTEGER
});
/**
* Returns _true_ if ranges `a` and `b` have identical min/max values.
* Returns _false_ if not, or if either/both values are _undefined_
* @param a
* @param b
* @returns True if ranges are identical, false if not or if either/both are _undefined_
*/
function rangeIsEqual(a, b) {
	if (typeof a === `undefined`) return false;
	if (typeof b === `undefined`) return false;
	return a.max === b.max && a.min === b.min;
}
/**
* Returns _true_ if range 'a' is within or same as range 'b'.
* Returns _false_ if not or if either/both ranges are _undefined_
*
* ```js
* rangeIsWithin({ min: 5, max: 10 }, { min: 0, max: 10 }); // true
* rangeIsWithin({ min: 5, max: 10 }, { min: 6, max: 20 }); // false
* ```
*
* By default the matching is inclusive, in that `a` could share a min/max with `b`.
* If you want to check whether `a` is strictly within `b`, with a higher min and lower max, set `exclusive` to _true_.
*
* ```js
* rangeIsWithin({ min: 5, max: 10 }, { min: 0, max: 10 }, true); // false
* rangeIsWithin({ min: 5, max: 9 }, { min: 0, max: 10 }, true); // true
* ```
*
* If either `a` or `b` is _undefined_, the function returns _false_.
* @param a Range
* @param b Parent
* @param exclusive If _true_,
* @returns True if `a` is within `b`, false if not or if either/both are _undefined_
*/
function rangeIsWithin(a, b, exclusive = false) {
	if (typeof a === `undefined`) return false;
	if (typeof b === `undefined`) return false;
	if (exclusive) return a.min > b.min && a.max < b.max;
	return a.min >= b.min && a.max <= b.max;
}
/**
* Keeps track of min/max values.
*
* ```js
* const s = rangeStream();
* s.seen(10);  // { min: 10, max: 10 }
* s.seen(5);   // { min: 5,  max: 10 }
* ```
*
* When calling `seen()`, non-numbers, or non-finite numbers are silently ignored.
*
* ```js
* s.reset();   // Reset
* s.min/s.max; // Current min/max
* s.range;     // Current { min, max }
* ```
* @param initWith
* @returns RangeStream
*/
function rangeStream(initWith = rangeInit()) {
	let { min, max } = initWith;
	const seen = (v) => {
		if (typeof v === `number`) {
			if (!Number.isNaN(v) && Number.isFinite(v)) {
				min = Math.min(min, v);
				max = Math.max(max, v);
			}
		}
		return {
			min,
			max
		};
	};
	const reset = () => {
		min = Number.MAX_SAFE_INTEGER;
		max = Number.MIN_SAFE_INTEGER;
		return {
			min,
			max
		};
	};
	return {
		seen,
		reset,
		get range() {
			return {
				min,
				max
			};
		},
		get min() {
			return min;
		},
		get max() {
			return max;
		}
	};
}
/**
* Iterates over `values` finding the min/max.
* By default non-numbers, as well as NaN and infinite values are skipped.
* @param values
* @param nonNumberHandling
* @returns NumericRange
*/
function rangeCompute(values, nonNumberHandling = `skip`) {
	let min = Number.MAX_SAFE_INTEGER;
	let max = Number.MIN_SAFE_INTEGER;
	let position = 0;
	for (const v of values) {
		if (typeof v === `number`) {
			if (Number.isNaN(v) || !Number.isFinite(v)) {
				if (nonNumberHandling === `error`) throw new Error(`Value NaN or infinite at position: ${position}`);
				continue;
			}
		} else {
			if (nonNumberHandling === `error`) throw new Error(`Contains non number value. Type: '${typeof v}' Position: ${position}`);
			continue;
		}
		if (v < min) min = v;
		if (v > max) max = v;
		position++;
	}
	return {
		min,
		max
	};
}

//#endregion
//#region ../packages/numbers/src/softmax.ts
/**
* Via: https://gist.github.com/cyphunk/6c255fa05dd30e69f438a930faeb53fe
* @param logits 
* @returns 
*/
const softmax = (logits) => {
	const maxLogit = logits.reduce((a, b) => Math.max(a, b), Number.NEGATIVE_INFINITY);
	const scores = logits.map((l) => Math.exp(l - maxLogit));
	const denom = scores.reduce((a, b) => a + b);
	return scores.map((s) => s / denom);
};

//#endregion
//#region ../packages/numbers/src/track-simple.ts
/**
* Track values
* 
* When not yet used:
*  total: 0
*  count: 0
*  min: MAX_SAFE_INTEGER,
*  max: MIN_SAFE_INTEGER
* @returns 
*/
const trackSimple = () => {
	let count = 0;
	let min = Number.MAX_SAFE_INTEGER;
	let max = Number.MIN_SAFE_INTEGER;
	let total = 0;
	const seen = (v) => {
		min = Math.min(v, min);
		max = Math.max(v, max);
		total += v;
		count++;
	};
	const reset = () => {
		count = 0;
		min = Number.MAX_SAFE_INTEGER;
		max = Number.MIN_SAFE_INTEGER;
		total = 0;
	};
	const rangeToString = (digits = 2) => {
		return `${min.toFixed(2)} - ${max.toFixed(2)}`;
	};
	return {
		seen,
		reset,
		rangeToString,
		get avg() {
			return total / count;
		},
		get min() {
			return min;
		},
		get max() {
			return max;
		},
		get total() {
			return total;
		},
		get count() {
			return count;
		}
	};
};

//#endregion
//#region ../packages/numbers/src/index.ts
var src_exports = /* @__PURE__ */ __exportAll({
	Bipolar: () => bipolar_exports,
	Kalman1dFilter: () => Kalman1dFilter,
	Normalise: () => normalise_exports,
	applyToValues: () => applyToValues,
	average: () => average,
	averageWeigher: () => averageWeigher,
	averageWeighted: () => averageWeighted,
	clamp: () => clamp$1,
	clampIndex: () => clampIndex,
	clamper: () => clamper,
	computeIsOutlier: () => computeIsOutlier,
	count: () => count,
	differenceFromFixed: () => differenceFromFixed,
	differenceFromLast: () => differenceFromLast,
	dotProduct: () => dotProduct,
	filterIterable: () => filterIterable,
	flip: () => flip,
	getQuantile: () => getQuantile,
	interpolate: () => interpolate,
	interpolateAngle: () => interpolateAngle,
	interpolatorStepped: () => interpolatorStepped,
	interquartileRange: () => interquartileRange,
	isApprox: () => isApprox,
	isCloseToAny: () => isCloseToAny,
	isValid: () => isValid,
	kalman1dFilter: () => kalman1dFilter,
	linearSpace: () => linearSpace,
	max: () => max,
	maxAbs: () => maxAbs,
	maxFast: () => maxFast,
	maxIndex: () => maxIndex,
	mean: () => mean,
	median: () => median,
	min: () => min,
	minFast: () => minFast,
	minIndex: () => minIndex,
	movingAverage: () => movingAverage,
	movingAverageLight: () => movingAverageLight,
	movingAverageWithContext: () => movingAverageWithContext,
	noiseFilter: () => noiseFilter,
	numberArrayCompute: () => numberArrayCompute,
	numericPercent: () => numericPercent,
	numericRange: () => numericRange,
	numericRangeRaw: () => numericRangeRaw,
	proportion: () => proportion,
	quantiseEvery: () => quantiseEvery,
	rangeCompute: () => rangeCompute,
	rangeInclusive: () => rangeInclusive,
	rangeInit: () => rangeInit,
	rangeIsEqual: () => rangeIsEqual,
	rangeIsWithin: () => rangeIsWithin,
	rangeMergeRange: () => rangeMergeRange,
	rangeMergeValue: () => rangeMergeValue,
	rangeScaler: () => rangeScaler,
	rangeStream: () => rangeStream,
	round: () => round,
	scale: () => scale,
	scaleClamped: () => scaleClamped,
	scalePercent: () => scalePercent,
	scalePercentages: () => scalePercentages,
	scaler: () => scaler,
	scalerNull: () => scalerNull,
	scalerPercent: () => scalerPercent,
	scalerTwoWay: () => scalerTwoWay,
	softmax: () => softmax,
	standardDeviation: () => standardDeviation,
	thresholdAtLeast: () => thresholdAtLeast,
	total: () => total,
	totalFast: () => totalFast,
	trackSimple: () => trackSimple,
	validNumbers: () => validNumbers,
	weight: () => weight,
	wrap: () => wrap,
	wrapInteger: () => wrapInteger,
	wrapRange: () => wrapRange
});

//#endregion
export { isValid as $, round as A, bipolar_exports as B, standardDeviation as C, applyToValues as Ct, movingAverageWithContext as D, movingAverageLight as E, interpolateAngle as F, isCloseToAny as G, Kalman1dFilter as H, interpolatorStepped as I, numericRangeRaw as J, numericPercent as K, wrap as L, getQuantile as M, interquartileRange as N, noiseFilter as O, interpolate as P, thresholdAtLeast as Q, wrapInteger as R, normalise_exports as S, weight as St, movingAverage as T, kalman1dFilter as U, clamp as V, isApprox as W, filterIterable as X, flip as Y, rangeInclusive as Z, scalerNull as _, minFast as _t, rangeInit as a, clamper as at, quantiseEvery as b, totalFast as bt, rangeMergeRange as c, averageWeighted as ct, rangeStream as d, average as dt, differenceFromFixed as et, scale as f, dotProduct as ft, scaler as g, min as gt, scalePercentages as h, maxIndex as ht, rangeCompute as i, clampIndex as it, computeIsOutlier as j, linearSpace as k, rangeMergeValue as l, mean as lt, scalePercent as m, maxFast as mt, trackSimple as n, count as nt, rangeIsEqual as o, maxAbs as ot, scaleClamped as p, max as pt, numericRange as q, softmax as r, clamp$1 as rt, rangeIsWithin as s, averageWeigher as st, src_exports as t, differenceFromLast as tt, rangeScaler as u, median as ut, scalerPercent as v, minIndex as vt, numberArrayCompute as w, proportion as x, validNumbers as xt, scalerTwoWay as y, total as yt, wrapRange as z };
//# sourceMappingURL=src-C1pyiFt0.js.map