import { n as __exportAll } from "./chunk-CaR5F9JI.js";
import { a as sum, i as rank, n as max, o as tally, r as min, t as average } from "./basic-Bepd6Tc6.js";

//#region ../packages/process/src/cancel-error.ts
var CancelError = class extends Error {
	constructor(message) {
		super(message);
		this.name = `CancelError`;
	}
};

//#endregion
//#region ../packages/process/src/flow.ts
/**
* Creates a flow of data processors (up to 5 are supported).
* The flow is encapsulated in a function that accepts an input value an returns an output.
* 
* ```js
* const p = flow(
*  (value:string) => value.toUpperCase(), // Convert to uppercase
*  (value:string) => value.at(0) === 'A') // If first letter is an A, return true
* );
* p('apple'); // True
* ```
* 
* Each processing function is expected to take in one input value and return one value.
* @param processors 
* @returns 
*/
function flow(...processors) {
	return (value) => {
		let v = value;
		for (const p of processors) try {
			v = p(v);
		} catch (err) {
			if (err instanceof CancelError) break;
			else throw err;
		}
		return v;
	};
}

//#endregion
//#region ../packages/process/src/if-undefined.ts
/**
* Calls a function if the input value is not undefined.
* Return value from function is passed to next function in flow.
* 
* ```js
* const flow = Process.flow(
*  Process.max(),
*  Process.seenLastToUndefined(),
*  Process.ifNotUndefined(v => {
*    console.log(`v:`, v);
*  })
* );
* flow(100); // Prints 'v:100'
* flow(90);  // Nothing happens max value has not changed
* flow(110); // Prints 'v:110'
* ```
* @param fn 
* @returns 
*/
function ifNotUndefined(fn) {
	return (value) => {
		if (value === void 0) return value;
		return fn(value);
	};
}
/**
* Cancels the remaining flow operations if _undefined_ is an input.
* See also {@link ifUndefined} or {@link ifNotUndefined}.
* 
* ```js
* const c3 = Process.flow(
*  Basic.max(),
*  Process.seenLastToUndefined(),
*  Process.cancelIfUndefined(),
*  (v => {
*   console.log(v);
*  })
* );
* c3(100); // Prints '100'
* c3(90);  // Doesn't print anything since max does not change
* c3(110); // Prints '110'
* ```
* @returns 
*/
function cancelIfUndefined() {
	return (value) => {
		if (value === void 0) throw new CancelError(`cancel`);
		return value;
	};
}
/**
* Returns the output of `fn` if the input value is _undefined_.
* See also: {@link ifNotUndefined} and {@link cancelIfUndefined}.
* @param fn 
* @returns 
*/
function ifUndefined(fn) {
	return (value) => {
		if (value === void 0) return fn();
		else return value;
	};
}

//#endregion
//#region ../packages/process/src/util.ts
/**
* Default comparer function is equiv to checking `a === b`.
* Use {@link isEqualValueDefault} to compare by value, via comparing JSON string representation.
*/
const isEqualDefault = (a, b) => a === b;
/**
* A default converter to string that uses JSON.stringify if its an object, or the thing itself if it's a string
*/
const toStringDefault = (itemToMakeStringFor) => typeof itemToMakeStringFor === `string` ? itemToMakeStringFor : JSON.stringify(itemToMakeStringFor);

//#endregion
//#region ../packages/process/src/seen.ts
/**
* If a value is same as the previous value, _undefined_ is emitted instead.
* 
* @param eq Equality function. If not specified, === semantics are used.
* @returns 
*/
function seenLastToUndefined(eq) {
	if (typeof eq === `undefined`) eq = isEqualDefault;
	let lastValue;
	return (value) => {
		if (value !== lastValue) {
			lastValue = value;
			return value;
		}
	};
}
/**
* If a value is same as any previously-seen value, _undefined_ is emitted instead.
* 
* It stores all previous values and compares against them for each new value. 
* This would likely be not very efficient compared to {@link seenToUndefinedByKey} which uses a one-time computed
* key and efficient storage of only the keys (using a Set).
*  
* @param eq Equality function. If not specified, === semantics are used.
* @returns 
*/
function seenToUndefined(eq) {
	const seen = [];
	if (typeof eq === `undefined`) eq = isEqualDefault;
	return (value) => {
		if (value === void 0) return;
		for (const s of seen) if (eq(s, value)) return;
		seen.push(value);
		return value;
	};
}
/**
* If a value is the same as any previously-seen value, _undefined_ is emitted instead.
* 
* This version uses a function to create a string key of the object, by default JSON.stringify.
* Thus we don't need to store all previously seen objects, just their keys.
* 
* Alternatively, if a key function doesn't make sense for the value, use
* {@link seenToUndefined}, which stores the values (less efficient).
* 
* @param toString 
* @returns 
*/
function seenToUndefinedByKey(toString) {
	const seen = /* @__PURE__ */ new Set();
	if (typeof toString === `undefined`) toString = toStringDefault;
	return (value) => {
		if (value === void 0) return;
		const key = toString(value);
		if (seen.has(key)) return;
		seen.add(key);
		return value;
	};
}

//#endregion
//#region ../packages/process/src/index.ts
var src_exports = /* @__PURE__ */ __exportAll({
	CancelError: () => CancelError,
	average: () => average,
	cancelIfUndefined: () => cancelIfUndefined,
	flow: () => flow,
	ifNotUndefined: () => ifNotUndefined,
	ifUndefined: () => ifUndefined,
	max: () => max,
	min: () => min,
	rank: () => rank,
	seenLastToUndefined: () => seenLastToUndefined,
	seenToUndefined: () => seenToUndefined,
	seenToUndefinedByKey: () => seenToUndefinedByKey,
	sum: () => sum,
	tally: () => tally
});

//#endregion
export { cancelIfUndefined as a, flow as c, seenToUndefinedByKey as i, CancelError as l, seenLastToUndefined as n, ifNotUndefined as o, seenToUndefined as r, ifUndefined as s, src_exports as t };
//# sourceMappingURL=src-tNPfpM40.js.map