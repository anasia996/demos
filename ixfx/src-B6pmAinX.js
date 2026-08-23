import { n as __exportAll } from "./chunk-CaR5F9JI.js";
import { N as resultThrow, f as arrayIndexTest, m as arrayTest, s as functionTest, w as numberTest, y as integerTest, z as throwIfFailed } from "./src-DZFdrMH_.js";

//#region ../packages/arrays/src/at-wrap.ts
/**
* Similar to Javascript's in-built Array.at function, but allows offsets
* to wrap.
* 
* @remarks
* ```js
* const test = [1,2,3,4,5,6];
* atWrap(0);   // 1
* atWrap(-1);  // 6
* atWrap(-6);  // 1
* ```
* 
* These values would return _undefined_ using Array.at since its beyond
* the length of the array
* ```js
* atWrap(6);   // 1
* atWrap(-7);  // 6
* ```
* @param array Array
* @param index Index
* @returns 
*/
const atWrap = (array, index) => {
	resultThrow(numberTest(index, ``, `index`));
	if (!Array.isArray(array)) throw new Error(`Param 'array' is not an array`);
	index = index % array.length;
	return array.at(index);
};

//#endregion
//#region ../packages/arrays/src/chunks.ts
/**
* Return `array` broken up into chunks of `size` values
*
* ```js
* chunks([1,2,3,4,5,6,7,8,9,10], 3);
* // Yields: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
* ```
* @param array
* @param size
* @returns
*/
function chunks(array, size) {
	throwIfFailed(integerTest(size, "aboveZero", `size`), arrayTest(array, `array`));
	const output = [];
	for (let index = 0; index < array.length; index += size) output.push(array.slice(index, index + size));
	return output;
}

//#endregion
//#region ../packages/arrays/src/compare-to.ts
/**
* Yields the result of comparing a value with a sibling.
*
* ```js
* const data = [ 1, 2, 4, 8, 16 ];
* // Compare values with its previous sibling (-1)
* // Since -1 is the offset, the first A and B values will be 2 and 1,
* // then 4 and 2, etc.
* compareTo(data, -1, (a, b) => b-a)];
* // Yields: -1, -2, -4, -8
* ```
*
* Note that one less value is yielded compared to the input array.
*
* You can just as well go forward as well:
* ```js
* const data = [ 1, 2, 4, 8, 16 ];
* // Compare values with its next-next sibling (2)
* // With an offset of 2, the first A and B values will be 1 and 4, then
* // 8 and 2 etc.
* // then 4 and 2, etc.
* compareTo(data, 2, (a, b) => b-a)];
* // Yields: 3, 6, 12
* ```
* @param data
* @param offset
* @param fn
*/
function* compareTo(data, offset, fn) {
	if (offset === 0) throw new TypeError(`Offset cannot be 0.`);
	if (offset < 0) {
		offset = Math.abs(offset);
		for (let i = offset; i < data.length; i++) yield fn(data[i], data[i - offset]);
	} else for (let i = 0; i < data.length - offset; i++) yield fn(data[i], data[i + offset]);
}

//#endregion
//#region ../packages/arrays/src/util/to-string.ts
/**
* A default converter to string that uses JSON.stringify if its an object, or the thing itself if it's a string
*/
const toStringDefault = (itemToMakeStringFor) => typeof itemToMakeStringFor === `string` ? itemToMakeStringFor : JSON.stringify(itemToMakeStringFor);

//#endregion
//#region ../packages/arrays/src/util/is-equal.ts
/**
* If input is a string, it is returned.
* Otherwise, it returns the result of JSON.stringify() with fields ordered.
* 
* This allows for more consistent comparisons when object field orders are different but values the same.
* @param itemToMakeStringFor 
* @returns 
*/
/**
* Default comparer function is equiv to checking `a === b`.
* Use {@link isEqualValueDefault} to compare by value, via comparing JSON string representation.
*/
const isEqualDefault = (a, b) => a === b;
/**
* Comparer returns true if string representation of `a` and `b` are equal.
* Use {@link isEqualDefault} to compare using === semantics
* Uses `toStringDefault` to generate a string representation (via `JSON.stringify`).
* 
* Returns _false_ if the ordering of fields is different, even though values are identical:
* ```js
* isEqualValueDefault({ a: 10, b: 20}, { b: 20, a: 10 }); // false
* ```
* 
* Use {@link isEqualValueIgnoreOrder} to ignore order (with an overhead of additional processing).
* ```js
* isEqualValueIgnoreOrder({ a: 10, b: 20}, { b: 20, a: 10 }); // true
* ```
* 
* Use {@link isEqualValuePartial} to partially match `b` against `a`.
* @returns True if the contents of `a` and `b` are equal
*/
const isEqualValueDefault = (a, b) => {
	if (a === b) return true;
	return toStringDefault(a) === toStringDefault(b);
};

//#endregion
//#region ../packages/arrays/src/contains.ts
/**
* Returns _true_ if all value in `needles` is contained in `haystack`, 
* by default using === semantics. 
* 
* ```js
* const a = ['apples','oranges','pears','mandarins'];
* const b = ['pears', 'apples'];
* contains(a, b); // True
*
* const c = ['pears', 'bananas'];
* contains(a, b); // False ('bananas' does not exist in a)
* ```
* 
* If `needles` is empty, `contains` will return true.
* 
* Compare by value using ixfx's `isEqualValueDefault`, or a custom function of your own
* ```js
* contains(a, b, isEqualValueDefault);
* contains(a, b, (valueA, valueV) => {
*  return valueA.name === valueB.name
* })
* ```
* @throws {TypeError} If parameters are not valid
* @param haystack Array to search
* @param needles Things to look for
* @param eq Optional function to compare equality. By default uses === semantics
*/
const contains = (haystack, needles, eq = isEqualDefault) => {
	resultThrow(arrayTest(haystack, `haystack`), arrayTest(needles, `needles`), functionTest(eq, `eq`));
	for (const needle of needles) {
		let found = false;
		for (const element of haystack) if (eq(needle, element)) {
			found = true;
			break;
		}
		if (!found) return false;
	}
	return true;
};
/**
* Returns _true_ if array contains duplicate values.
*
* ```js
* containsDuplicateValues(['a','b','a']); // True
* containsDuplicateValues([
*  { name: 'Apple' },
*  { name: 'Apple' }
* ]); // True
* ```
* 
* Uses JSON.toString() by default to compare values.
* 
* See also:
* * {@link unique}: Get unique set of values in an array
* * {@link containsDuplicateInstances}: Compare based on reference, rather than value
* * {@link containsDuplicateValues}: Returns _true_ if every item in array is the same
* @param data Array to examine
* @param keyFunction Function to generate key string for object, uses JSON.stringify by default.
* @returns
*/
const containsDuplicateValues = (data, keyFunction = toStringDefault) => {
	if (typeof data !== `object`) throw new Error(`Param 'data' is expected to be an Iterable. Got type: ${typeof data}`);
	const set = /* @__PURE__ */ new Set();
	for (const v of data) {
		const string_ = keyFunction(v);
		if (set.has(string_)) return true;
		set.add(string_);
	}
	return false;
};
/**
* Returns _true_ if array contains duplicate instances based on `===` equality checking.
* 
* ```js
* const o1 = { hello: `there` };
* const o2 = { hello: `there` };
* containsDuplicateInstances([ o1, o2 ]); // False
* containsDuplicateInstances([ o1, o1 ]); // True
* ```
* 
* Primitive values are compared by value:
* ```js
* containsDuplicateInstances([ 1, 2, 1 ]); // True
* containsDuplicateInstances([ `a`, `b`, `a` ]); // True
* ```
* 
* Use {@link containsDuplicateValues} if you'd rather compare by value.
* @param array 
* @throws {TypeError} If `array` parameter is not an array
* @returns 
*/
const containsDuplicateInstances = (array) => {
	resultThrow(arrayTest(array, `array`));
	for (let index = 0; index < array.length; index++) for (let x = 0; x < array.length; x++) {
		if (index === x) continue;
		if (array[index] === array[x]) return true;
	}
	return false;
};

//#endregion
//#region ../packages/arrays/src/cycle.ts
/**
* Returns a function that cycles through the contents of an array. By default starts at index 0.
* 
* ```js
* const c = arrayCycle([`apples`, `oranges`, `pears`]);
* c.current; // `apples`
* c.next();  // `oranges`
* c.next();  // `pears`
* c.next();  // `apples`
* c.prev();  // `pears`
* ```
* 
* You can select an item by index or value:
* ```
* c.select(1); // `oranges`
* c.select(`pears`); // `pears`
* ```
* 
* Other features:
* ```js
* c.current;   // Current value
* c.toArray(); // Copy of array being cycled over
* ```
* 
* Additional info:
* * Selecting by value uses === semantics.
* * Works with a copy of input array
* @param options Array to cycle over 
* @returns 
*/
const cycle = (options) => {
	throwIfFailed(arrayTest(options, `options`));
	const opts = [...options];
	let index = 0;
	const next = () => {
		index++;
		if (index === opts.length) index = 0;
		return value();
	};
	const prev = () => {
		index--;
		if (index === -1) index = opts.length - 1;
		return value();
	};
	const value = () => {
		return opts.at(index);
	};
	const select = (indexOrValue) => {
		if (typeof indexOrValue === `number`) index = indexOrValue;
		else {
			const found = opts.indexOf(indexOrValue);
			if (found === -1) throw new Error(`Could not find value`);
			index = found;
		}
	};
	const toArray = () => [...opts];
	return {
		toArray,
		next,
		prev,
		get current() {
			return value();
		},
		select
	};
};

//#endregion
//#region ../packages/arrays/src/ensure-length.ts
/**
* Returns a copy of an array with specified length - padded or truncated as needed.
*
* If the input array is too short, it will be expanded based on the `expand` strategy:
*  - 'undefined': fill with _undefined_ (default)
*  - 'repeat': repeat array elements, starting from position 0
*  - 'first': repeat with first element from `data`
*  - 'last': repeat with last element from `data`
*
* Truncate:
* ```js
* ensureLength([1,2,3], 2); // [1,2]
* ```
*
* Padded:
* ```js
* ensureLength([1,2,3], 5, `undefined`); // [1,2,3,undefined,undefined]
* ensureLength([1,2,3], 5, `repeat`);    // [1,2,3,1,2]
* ensureLength([1,2,3], 5, `first`);     // [1,2,3,1,1]
* ensureLength([1,2,3], 5, `last`);      // [1,2,3,3,3]
* ```
* @param data Input array to expand
* @param length Desired length
* @param expandStrategy Expand strategy
* @param truncateStrategy Truncation strategy. By default removes from end ('from-end')
* @typeParam V Type of array
*/
function ensureLength(data, length, expandStrategy = `undefined`, truncateStrategy = `from-end`) {
	if (data === void 0) throw new Error(`Data undefined`);
	if (!Array.isArray(data)) throw new Error(`data is not an array`);
	if (data.length === length) return [...data];
	if (data.length > length) if (truncateStrategy === `from-end`) return data.slice(0, length);
	else return data.slice(data.length - length);
	const d = [...data];
	const add = length - d.length;
	for (let index = 0; index < add; index++) switch (expandStrategy) {
		case `undefined`:
			d.push(void 0);
			break;
		case `repeat`:
			d.push(data[index % data.length]);
			break;
		case `first`:
			d.push(data[0]);
			break;
		case `last`:
			d.push(data.at(-1));
			break;
	}
	return d;
}

//#endregion
//#region ../packages/arrays/src/intersection.ts
/**
* Returns the _intersection_ of two arrays: the elements that are in common. Duplicates are removed in the process.
* 
* By default compares based on a string representation of object.
* 
* ```js
* intersection([1, 2, 3], [2, 4, 6]); // returns [2]
* ```
* 
* To compare object instances:
* ```js
* intersection(arrayA, arrayB, (a,b) => a === b)
* ```
* 
* To use a custom string representation, eg, to only compare based on 'name' property of objects:
* ```js
* intersection(arrayA, arrayB, (v) => v.name)
* ```
* 
* See also: 
* * `uniqueByKey`/`uniqueByComparer`: Get unique items across one or more arrays, including within the array
* @param arrayA First array
* @param arrayB Second array
* @param comparerOrKey Comparer or key-generating function 
* @returns 
*/
function intersection(arrayA, arrayB, comparerOrKey) {
	if (arrayA.length === 0) return arrayB;
	if (arrayB.length === 0) return arrayA;
	comparerOrKey ??= toStringDefault;
	if (typeof comparerOrKey(arrayA[0], arrayB[0]) === `string`) return intersectionByKeyImpl(arrayA, arrayB, comparerOrKey);
	else return intersectionByComparerImpl(arrayA, arrayB, comparerOrKey);
}
const intersectionByComparerImpl = (arrayA, arrayB, equality) => {
	return arrayA.filter((valueFromA) => arrayB.some((valueFromB) => equality(valueFromA, valueFromB)));
};
const intersectionByKeyImpl = (arrayA, arrayB, key) => {
	const aKeys = /* @__PURE__ */ new Set();
	const result = [];
	for (const v of arrayA) aKeys.add(key(v));
	const bUsed = /* @__PURE__ */ new Set();
	for (const v of arrayB) {
		const bKey = key(v);
		if (bUsed.has(bKey)) continue;
		if (aKeys.has(bKey)) {
			result.push(v);
			bUsed.add(bKey);
		}
	}
	return result;
};

//#endregion
//#region ../packages/arrays/src/equality.ts
/**
* Returns _true_ if the two arrays have the same length, and have the same items at the same indexes. 
* 
* By default uses === semantics for equality checking.
* 
* Use {@link isEqualIgnoreOrder} if you don't care whether items are in same order.
* 
* ```js
* isEqual([ 1, 2, 3], [ 1, 2, 3 ]); // true
* isEqual([ 1, 2, 3], [ 3, 2, 1 ]); // false
* ```
* 
* Compare by value instead:
* ```js
* // Eg. compare objects based on their 'name' property
* isEqual(a, b, v => v.name);
* ```
* 
* @param arrayA 
* @param arrayB 
* @param comparerOrKey Function to compare values or produce a string key
* @throws {TypeError} If inputs are not arrays
*/
function isEqual(arrayA, arrayB, comparerOrKey = isEqualDefault) {
	resultThrow(arrayTest(arrayA, `arrayA`), arrayTest(arrayB, `arrayB`), functionTest(comparerOrKey));
	if (arrayA.length !== arrayB.length) return false;
	if (typeof comparerOrKey(arrayA[0], arrayB[0]) === `string`) {
		const c = comparerOrKey;
		for (let indexA = 0; indexA < arrayA.length; indexA++) if (c(arrayA[indexA]) !== c(arrayB[indexA])) return false;
	} else {
		const c = comparerOrKey;
		for (let indexA = 0; indexA < arrayA.length; indexA++) if (!c(arrayA[indexA], arrayB[indexA])) return false;
	}
	return true;
}
/**
* Returns _true_ if arrays contain same value items, regardless of order. Will return _false_ if
* arrays are of different length.
* 
* By default uses === semantics to compare items. Pass in a comparer function or key generating function otherwise:
* ```js
* isEqualIgnoreOrder(arrayA, arrayB, (v) => v.name);
* ```
* 
* @param arrayA Array
* @param arrayB Array
* @param comparerOrKey Function to compare objects or produce a string representation. Defaults to {@link isEqualDefault}
* @throws {TypeError} If input parameters are not correct
*/
function isEqualIgnoreOrder(arrayA, arrayB, comparerOrKey = isEqualDefault) {
	resultThrow(arrayTest(arrayA, `arrayA`), arrayTest(arrayB, `arrayB`), functionTest(comparerOrKey));
	if (arrayA.length !== arrayB.length) return false;
	return intersection(arrayA, arrayB, comparerOrKey).length === arrayA.length;
}
/**
* Returns _true_ if all values in the array are the same. Uses value-based equality checking by default.
* 
* @example Using default equality function
* ```js
* const a1 = [ 10, 10, 10 ];
* containsIdenticalValues(a1); // True
*
* const a2 = [ { name:`Jane` }, { name:`John` } ];
* containsIdenticalValues(a2); // True, even though object references are different
* ```
*
* If we want to compare by value for objects that aren't readily
* converted to JSON, you need to provide a function:
*
* ```js
* containsIdenticalValues(someArray, (a, b) => {
*  return (a.eventType === b.eventType);
* });
* ```
*
* Returns _true_ if `array` is empty.
* @param array Array
* @param equality Equality checker. Uses string-conversion checking by default
* @throws {TypeError} If input is not an array
* @returns
*/
const containsIdenticalValues = (array, equality) => {
	if (!Array.isArray(array)) throw new TypeError(`Param 'array' is not an array.`);
	if (array.length === 0) return true;
	const eq = equality ?? isEqualValueDefault;
	const a = array[0];
	if (array.some((v) => !eq(a, v))) return false;
	return true;
};

//#endregion
//#region ../packages/arrays/src/filter.ts
/**
* Like Array.findIndex but with optional `startAt` and `length` parameters to limit the search to a specific section of the array.
*
* ```js
* const data = ["red","blue","red","blue"]
* data.findIndex(v => v === `red`); // 0 - finds first match
* findIndex(data, v => v === `red`, 1); // 2 - finds first match after start index of 1
* ```
*
* Use {@link findIndexReverse} to search backwards through the array.
* @param array
* @param predicate
* @param startInclusive
* @param endExclusive End index (exclusive). By default, uses array.length
*/
function findIndex(array, predicate, startInclusive, endExclusive) {
	const _start = startInclusive ?? 0;
	const _end = endExclusive ?? array.length;
	if (_start >= array.length) throw new RangeError(`Start ${_start} is out of bounds for array of length ${array.length}`);
	if (_end > array.length) throw new RangeError(`End ${_end} is out of bounds for array of length ${array.length}`);
	if (_start > _end) throw new RangeError(`Start ${_start} is greater than end ${_end}`);
	for (let i = _start; i < _end; i++) if (predicate(array[i], i, array)) return i;
	return -1;
}
/**
* Returns a matching index, starting at index `start` and working backwards up until `end` (both inclusive).
* ```
* const data = ["red","blue","red","blue","red"];
* findIndexReverse(data, v=> v === `red`);     // 4
* findIndexReverse(data, v=> v === `red`, 3);  // 2
* findIndexReverse(data, v=> v === `red`, 2);  // 2
* ```
* @param array
* @param predicate
* @param startInclusive
* @param endInclusive
* @returns
*/
function findIndexReverse(array, predicate, startInclusive, endInclusive) {
	const _start = startInclusive ?? array.length - 1;
	const _end = endInclusive ?? 0;
	if (_start >= array.length) throw new RangeError(`Start ${_start} is out of bounds for array of length ${array.length}`);
	if (_end < 0) throw new RangeError(`End ${_end} is out of bounds`);
	if (_start < _end) throw new RangeError(`Start ${_start} is less than end ${_end}`);
	for (let i = _start; i >= _end; i--) if (predicate(array[i], i, array)) return i;
	return -1;
}
/**
* Enumerates the index of all array values that match `predicate`.
*
* ```js
* const data =  [`red`,`blue`,`red`,`blue`,`red`];
* for (const index of filterWithIndex(data, v=> v === `red`)) {
*  // Yields 0, 2, 4
* }
* ```
* @param array
* @param predicate
*/
function* filterWithIndex(array, predicate) {
	for (let i = 0; i < array.length; i++) if (predicate(array[i], i, array)) yield i;
}
/**
* Returns two separate arrays of everything that `filter` returns _true_,
* and everything it returns _false_ on.
*
* Same idea as the in-built Array.filter, but that only returns values for one case.
*
* ```js
* const [ matching, nonMatching ] = filterAB(data, v => v.enabled);
* // `matching` is a list of items from `data` where .enabled is true
* // `nonMatching` is a list of items from `data` where .enabled is false
* ```
* @param data Array of data to filter
* @param filter Function which returns _true_ to add items to the A list, or _false_ for items to add to the B list
* @returns Array of two elements. The first is items that match `filter`, the second is items that do not.
*/
function filterAB(data, filter) {
	const a = [];
	const b = [];
	for (const datum of data) if (filter(datum)) a.push(datum);
	else b.push(datum);
	return [a, b];
}
/**
* Yields elements from `array` that match a given `predicate`, and moreover are between
* the given `startIndex` (inclusive) and `endIndex` (exclusive).
*
* While this can be done with in the in-built `array.filter` function, it will
* needlessly iterate through the whole array. It also avoids another alternative
* of slicing the array before using `filter`.
*
* ```js
* // Return 'registered' people between and including array indexes 5-10
* const filtered = [...filterBetween(people, person => person.registered, 5, 10)];
* ```
* @param array Array to filter
* @param predicate Filter function
* @param startIndex Start index (defaults to 0)
* @param endIndex End index (by default runs until end)
*/
function* filterBetween(array, predicate, startIndex, endIndex) {
	resultThrow(arrayTest(array, `array`));
	if (typeof startIndex === `undefined`) startIndex = 0;
	if (typeof endIndex === `undefined`) endIndex = array.length;
	resultThrow(arrayIndexTest(array, startIndex, `startIndex`));
	resultThrow(arrayIndexTest(array, endIndex - 1, `endIndex`));
	for (let index = startIndex; index < endIndex; index++) if (predicate(array[index], index, array)) yield array[index];
}

//#endregion
//#region ../packages/arrays/src/flatten.ts
/**
* Returns a 'flattened' copy of array, un-nesting arrays one level
* ```js
* flatten([1, [2, 3], [[4]] ]);
* // Yields: [ 1, 2, 3, [4]];
* ```
* @param array
* @returns
*/
const flatten = (array) => [...array].flat();

//#endregion
//#region ../packages/arrays/src/for-each.ts
/**
* Returns the array.map() output, or a value if `array`
* is not an array or empty.
* 
* ```js
* mapWithEmptyFallback([1,2,3], v => v+2, 100); // Yields: [3,4,5]
* mapWithEmptyFallback([], v=>v+2, 100); // Yields: [100]
* mapWithEmptyFallback({}, v=>v+2, [100]); // Yields: [100]
* ```
* 
* If the fallback value is an array, it is returned as an
* array if needed. If it's a single value, it is wrapped as an array.
* @param array Array of values
* @param fn Function to use for mapping values
* @param fallback Fallback single value or array of values
* @returns 
*/
const mapWithEmptyFallback = (array, fn, fallback) => {
	if (typeof array !== `object` || !Array.isArray(array) || array.length === 0) {
		if (Array.isArray(fallback)) return fallback;
		return [fallback];
	}
	return array.map(fn);
};

//#endregion
//#region ../packages/arrays/src/frequency.ts
/**
* Computes the frequency of values by a grouping function.
*
* ```js
* const data = [1,2,3,4,5,6,7,8,9,10];
* // Returns 'odd' or 'even' for an input value
*
* const groupBy = v => v % 2 === 0 ? `even`:`odd`;
*
* FrequencyByGroup.fromArray(data, groupBy);
* // Yields map with:
* //  key: 'even', value: 5
* //  key: 'odd', value: 5
* ```
*
* Or for example, group by the value itself:
* ```js
* const data = [1,2,3,1,2,0];
* const groupBy = v => v.toString();
* FrequencyByGroup.fromArray(data, groupBy);
* // "1" = 2, "2" = 2, "3" = 1, "0" = 1
* ```
* @param groupBy
* @param data
*/
var FrequencyByGroup = class FrequencyByGroup {
	#store = /* @__PURE__ */ new Map();
	#groupBy;
	#total = 0;
	constructor(groupBy = (v) => v.toString()) {
		this.#groupBy = groupBy;
	}
	add(data) {
		if (!Array.isArray(data)) throw new TypeError(`Param 'array' is expected to be an array. Got type: '${typeof data}'`);
		for (const value of data) {
			const group = this.#groupBy(value);
			if (typeof group !== `string` && typeof group !== `number`) throw new TypeError(`groupBy function is expected to return type string or number. Got type: '${typeof group}' for value: '${value}'`);
			const groupValue = (this.#store.get(group) ?? 0) + 1;
			this.#total++;
			this.#store.set(group, groupValue);
		}
	}
	/**
	* Creates a new FrequencyByGroup instance, adds data to it and returns the instance.
	* If you just want the computed frequencies, consider using {@link entriesFromArray}.
	* @param data
	* @param groupBy
	* @returns FrequencyGroup instance with data added
	*/
	static fromArray(data, groupBy) {
		const instance = new FrequencyByGroup(groupBy);
		instance.add(data);
		return instance;
	}
	/**
	* Computes the frequency of `data`, yielding results as entries consisting of the key and frequency.
	* ```js
	* const v = [...FrequencyByGroup.entriesFromArray([1, 2, 3, 1, 2, 3, 0, 1, 1, 1, 4], v => v.toString())];
	* // Yields: [ ["1", 5], ["2", 2], ["3", 2], ["0", 1], ["4", 1] ]
	* ```
	*
	* It's a generator, so you can also use it like this:
	* ```js
	* for (const [key,freq] of FrequencyByGroup.entriesFromArray(data, v => v.toString())) {
	*   console.log(key, freq);// Logs key and frequency for each group
	* }
	* ```
	* @param data
	* @param groupBy
	* @returns Iterator over entries
	*/
	static *entriesFromArray(data, groupBy) {
		return yield* FrequencyByGroup.fromArray(data, groupBy).entries();
	}
	/**
	* Returns the relative frequency for a group, or _undefined_ if not found.
	* @param group
	* @returns Relative frequency or _undefined_ if not found
	*/
	getRelative(group) {
		const freq = this.#store.get(group);
		if (typeof freq === `undefined`) return void 0;
		return freq / this.#total;
	}
	/**
	* Returns _true_ if group was found.
	* @param group
	* @returns _True_ if group was found
	*/
	has(group) {
		return this.#store.has(group);
	}
	/**
	* Gets the frequency for this group, or _undefined_ if the group does not exist
	* @param group
	* @returns Frequency for this group, or _undefined_ if the group does not exist
	*/
	get(group) {
		return this.#store.get(group);
	}
	/**
	* Returns an iterator over the entries, ie `[group, frequency]` pairs.
	* Use {@link entriesRelative} to get the relative frequency instead of the absolute frequency.
	* @returns Iterator
	*/
	entries() {
		return this.#store.entries();
	}
	/**
	* Returns an iterator over the entries, ie `[group, relativeFrequency]` pairs.
	* Use {@link entries} to get the absolute frequency instead.
	* @returns Iterator
	*/
	*entriesRelative() {
		for (const [group, freq] of this.#store.entries()) yield [group, freq / this.#total];
	}
	/**
	* Returns an iterator over keys (ie. groups).
	*/
	keys() {
		return this.#store.keys();
	}
	/**
	* Returns an iterator over values (ie. absolute frequencies)
	* @returns
	*/
	values() {
		return this.#store.values();
	}
	/**
	* Gets the average frequency across all groups.
	* @returns Average frequency
	*/
	averageFrequency() {
		let total = 0;
		for (const freq of this.#store.values()) total += freq;
		return total / this.#store.size;
	}
};

//#endregion
//#region ../packages/arrays/src/group-by.ts
/**
* Groups data by a function `grouper`, returning data as a map with string
* keys and array values. Multiple values can be assigned to the same group.
*
* `grouper` must yield a string designated group for a given item.
*
* @example
* ```js
* const data = [
*  { age: 39, city: `London` },
*  { age: 14, city: `Copenhagen` },
*  { age: 23, city: `Stockholm` },
*  { age: 56, city: `London` }
* ];
*
* // Whatever the function returns will be the designated group
* // for an item
* const map = Arrays.groupBy(data, item => item.city);
* ```
*
* This yields a Map with keys London, Stockholm and Copenhagen, and the corresponding values.
*
* ```
* London: [{ age: 39, city: `London` }, { age: 56, city: `London` }]
* Stockhom: [{ age: 23, city: `Stockholm` }]
* Copenhagen: [{ age: 14, city: `Copenhagen` }]
* ```
* @param array Array to group
* @param grouper Function that returns a key for a given item
* @typeParam K Type of key to group by. Typically string.
* @typeParam V Type of values
* @returns Map
*/
const groupBy = (array, grouper) => {
	const map = /* @__PURE__ */ new Map();
	for (const a of array) {
		const key = grouper(a);
		let existing = map.get(key);
		if (!existing) {
			existing = [];
			map.set(key, existing);
		}
		existing.push(a);
	}
	return map;
};

//#endregion
//#region ../packages/arrays/src/insert-at.ts
/**
* Inserts `values` at position `index`, shuffling remaining
* items further down and returning changed result.
* 
* Does not modify the input array.
* 
* ```js
* const data = [ 1, 2, 3 ]
* 
* // Inserts 20,30,40 at index 1
* Arrays.insertAt(data, 1, 20, 30, 40);
* 
* // Yields: 1, 20, 30, 40, 2, 3
* ```
* @param data 
* @param index 
* @param values 
* @returns 
*/
const insertAt = (data, index, ...values) => {
	throwIfFailed(arrayTest(data, `data`), arrayIndexTest(data, index, `index`));
	if (index === data.length - 1) return [...data, ...values];
	if (index === 0) return [...values, ...data];
	return [
		...data.slice(0, index),
		...values,
		...data.slice(index)
	];
};

//#endregion
//#region ../packages/arrays/src/interleave.ts
/**
* Returns an interleaving of two or more arrays. All arrays must be the same length.
*
* ```js
* const a = [`a`, `b`, `c`];
* const b = [`1`, `2`, `3`];
* const c = Arrays.interleave(a, b);
* // Yields:
* // [`a`, `1`, `b`, `2`, `c`, `3`]
* ```
* @param arrays
* @returns
*/
const interleave = (...arrays) => {
	if (arrays.some((a) => !Array.isArray(a))) throw new Error(`All parameters must be an array`);
	const lengths = arrays.map((a) => a.length);
	if (!containsIdenticalValues(lengths)) throw new Error(`Arrays must be of same length`);
	const returnValue = [];
	const length = lengths[0];
	for (let index = 0; index < length; index++) for (const array of arrays) returnValue.push(array[index]);
	return returnValue;
};

//#endregion
//#region ../packages/arrays/src/merge-by-key.ts
/**
* Merges arrays left to right, using the provided
* `reconcile` function to choose a winner when keys overlap.
*
* There's also Core.Maps.mergeByKey if the input data is in Map form.
*
* For example, if we have the array A:
* [`A-1`, `A-2`, `A-3`]
*
* And array B:
* [`B-1`, `B-2`, `B-4`]
*
* And with the key function:
* ```js
* // Make a key for value based on last char
* const keyFn = (v) => v.substr(-1, 1);
* ```
*
* If they are merged with the reconile function:
* ```js
* const reconcile = (a, b) => b.replace(`-`, `!`);
* const output = mergeByKey(keyFn, reconcile, arrayA, arrayB);
* ```
*
* The final result will be:
*
* [`B!1`, `B!2`, `A-3`, `B-4`]
*
* In this toy example, it's obvious how the reconciler transforms
* data where the keys overlap. For the keys that do not overlap -
* 3 and 4 in this example - they are copied unaltered.
*
* A practical use for `mergeByKey` has been in smoothing keypoints
* from a TensorFlow pose. In this case, we want to smooth new keypoints
* with older keypoints. But if a keypoint is not present, for it to be
* passed through.
*
* @param keyFunction Function to generate a unique key for data
* @param reconcile Returns value to decide 'winner' when keys conflict.
* @param arrays Arrays of data to merge
*/
const mergeByKey = (keyFunction, reconcile, ...arrays) => {
	const result = /* @__PURE__ */ new Map();
	for (const m of arrays) for (const mv of m) {
		if (mv === void 0) continue;
		const mk = keyFunction(mv);
		let v = result.get(mk);
		v = v ? reconcile(v, mv) : mv;
		result.set(mk, v);
	}
	return [...result.values()];
};

//#endregion
//#region ../packages/arrays/src/moving-window.ts
/**
* Creates a moving window
* 
* ```js
* // Create a moving window of 3 samples
* const window = movingWindow(3);
* 
* window(1); // [ 1 ]
* window(2); // [ 1, 2 ]
* window(3); // [ 1, 2, 3 ]
* window(4); // [ 2, 3, 4 ]
* ```
* 
* 'reject' option allows values to be discarded:
* ```js
* // Reject all NaN values
* const window = movingWindow({ samples: 3, reject: (v) => Number.isNaN(v) });
* ```
* 
* 'allow' is similar, but is applied after 'reject' (if provided). Instead, values
* must pass _true_
* 
* If a reject/disallow is triggered, the current state of the queue is returned.
* 
* @param samplesOrOptions
* @returns 
*/
const movingWindow = (samplesOrOptions) => movingWindowWithContext(samplesOrOptions).seen;
/**
* As {@link movingWindow} but also allows access to context, namely you 
* can access the window at any time without adding to it.
* 
* ```js
* const window = movingWindowWithContext(3);
* window.seen(1); // [ 1 ]
* window.data;    // [ 1 ]
* ```
* @param samplesOrOptions 
* @returns 
*/
const movingWindowWithContext = (samplesOrOptions) => {
	const q = [];
	const reject = typeof samplesOrOptions === `object` ? samplesOrOptions.reject : void 0;
	const allow = typeof samplesOrOptions === `object` ? samplesOrOptions.allow : void 0;
	const samples = typeof samplesOrOptions === `number` ? samplesOrOptions : samplesOrOptions.samples;
	const seen = (value) => {
		if (reject) {
			if (reject(value)) return q;
		}
		if (allow) {
			if (!allow(value)) return q;
		}
		q.push(value);
		while (q.length > samples) q.shift();
		return q;
	};
	return {
		seen,
		get data() {
			return [...q];
		}
	};
};

//#endregion
//#region ../packages/arrays/src/pairwise.ts
/**
* Yields pairs made up of overlapping items from the input array.
* 
* Throws an error if there are less than two entries.
* 
* ```js
* pairwise([1, 2, 3, 4, 5]);
* Yields:
* [ [1,2], [2,3], [3,4], [4,5] ]
* ```
* @param values 
*/
function* pairwise(values) {
	resultThrow(arrayTest(values, `values`));
	if (values.length < 2) throw new Error(`Array needs to have at least two entries. Length: ${values.length}`);
	for (let index = 1; index < values.length; index++) yield [values[index - 1], values[index]];
}
/**
* Reduces in a pairwise fashion.
*
* Eg, if we have input array of [1, 2, 3, 4, 5], the
* `reducer` fn will run with 1,2 as parameters, then 2,3, then 3,4 etc.
* ```js
* const values = [1, 2, 3, 4, 5]
* reducePairwise(values, (acc, a, b) => {
*  return acc + (b - a);
* }, 0);
* ```
*
* If input array has less than two elements, the initial value is returned.
*
* ```js
* const reducer = (acc:string, a:string, b:string) => acc + `[${a}-${b}]`;
* const result = reducePairwise(`a b c d e f g`.split(` `), reducer, `!`);
* Yields: `![a-b][b-c][c-d][d-e][e-f][f-g]`
* ```
* @param array
* @param reducer
* @param initial
* @returns
*/
const pairwiseReduce = (array, reducer, initial) => {
	resultThrow(arrayTest(array, `arr`));
	if (array.length < 2) return initial;
	for (let index = 0; index < array.length - 1; index++) initial = reducer(initial, array[index], array[index + 1]);
	return initial;
};

//#endregion
//#region ../packages/arrays/src/random.ts
/**
* Returns a shuffled copy of the input array.
* @example
* ```js
* const d = [1, 2, 3, 4];
* const s = shuffle(d);
* // d: [1, 2, 3, 4], s: [3, 1, 2, 4]
* ```
* 
* It can be useful to randomly access each item from an array exactly once:
* ```js
* for (const value of shuffle(inputArray)) {
*  // Do something with the value...
* }
* ```
* 
* @throws {TypeError} If `array` is not an array and `rand` is not a function
* @param dataToShuffle Input array
* @param rand Random generator. `Math.random` by default.
* @returns Copy with items moved around randomly
* @typeParam V - Type of array items
*/
const shuffle = (dataToShuffle, rand = Math.random) => {
	resultThrow(arrayTest(dataToShuffle, `dataToShuffle`), functionTest(rand, `rand`));
	const array = [...dataToShuffle];
	for (let index = array.length - 1; index > 0; index--) {
		const randomIndex = Math.floor(rand() * (index + 1));
		[array[index], array[randomIndex]] = [array[randomIndex], array[index]];
	}
	return array;
};
/**
* Returns a random element of an array
*
* ```js
* const v = [`blue`, `red`, `orange`];
* randomElement(v); // Yields `blue`, `red` or `orange`
* ```
*
* Note that repeated calls might yield the same value
* multiple times. If you want to random unique values, consider using {@link shuffle}.
* 
* See also:
* * {@link randomIndex} if you want a random index rather than value.
* 
* @throws {TypeError} If `array` is not an array and `rand` is not a function
* @param array
* @param rand Random generator. `Math.random` by default.
* @returns
*/
const randomElement = (array, rand = Math.random) => {
	resultThrow(arrayTest(array, `array`), functionTest(rand, `rand`));
	return array[Math.floor(rand() * array.length)];
};
/**
* Returns a random array index.
*
* ```js
* const v = [`blue`, `red`, `orange`];
* randomIndex(v); // Yields 0, 1 or 2
* ```
*
* Use {@link randomElement} if you want a value from `array`, not index.
*
* @throws {TypeError} If `array` is not an array and `rand` is not a function
* @param array Array
* @param rand Random generator. `Math.random` by default.
* @returns
*/
const randomIndex = (array, rand = Math.random) => {
	resultThrow(arrayTest(array, `array`), functionTest(rand, `rand`));
	return Math.floor(rand() * array.length);
};

//#endregion
//#region ../packages/arrays/src/remove.ts
/**
* Removes an element at `index` index from `data`, returning the resulting array without modifying the original.
*
* ```js
* const v = [ 100, 20, 50 ];
* const vv = Arrays.remove(2);
*
* Yields:
*  v: [ 100, 20, 50 ]
* vv: [ 100, 20 ]
* ```
*
* Consider {@link without} if you want to remove an item by value.
*
* Throws an exception if `index` is outside the range of `data` array.
* @param data Input array
* @param index Index to remove
* @typeParam V Type of array
* @returns
*/
function remove(data, index) {
	if (!Array.isArray(data)) throw new TypeError(`Parameter 'data' should be an array`);
	resultThrow(arrayIndexTest(data, index, `index`));
	return [...data.slice(0, index), ...data.slice(index + 1)];
}
/**
* Removes items from `input` array that match `predicate`.
* A modified array is returned along with the number of items removed.
*
* If `predicate` matches no items, a new array will still be returned, and the removed count will be 0.
*
* @param input
* @param predicate
* @returns
*/
function removeByFilter(input, predicate) {
	if (!Array.isArray(input)) throw new TypeError(`Parameter 'input' should be an array`);
	if (typeof predicate !== `function`) throw new TypeError(`Parameter 'prediate' should be a function. Got type: ${typeof predicate}`);
	const count = input.length;
	const changed = input.filter((v) => !predicate(v));
	return [changed, count - changed.length];
}

//#endregion
//#region ../packages/arrays/src/sample.ts
/**
* Samples values from an array. 
* 
* If `amount` is less or equal to 1, it's treated as a percentage to sample.
* Otherwise it's treated as every _n_th value to sample.
*
* @example 
* By percentage - get half of the items
* ```
* const list = [1,2,3,4,5,6,7,8,9,10];
* const sub = Arrays.sample(list, 0.5);
* // Yields: [2, 4, 6, 8, 10]
* ```
*
* @example
* By steps - every third value
* ```
* const list = [1,2,3,4,5,6,7,8,9,10];
* const sub = Arrays.sample(list, 3);
* // Yields:
* // [3, 6, 9]
* ```
* @param array Array to sample
* @param amount Amount, given as a percentage (0..1) or the number of interval (ie 3 for every third item)
* @returns
*/
const sample = (array, amount) => {
	if (!Array.isArray(array)) throw new TypeError(`Param 'array' is not actually an array. Got type: ${typeof array}`);
	let subsampleSteps = 1;
	if (amount <= 1) {
		const numberOfItems = array.length * amount;
		subsampleSteps = Math.round(array.length / numberOfItems);
	} else subsampleSteps = amount;
	resultThrow(integerTest(subsampleSteps, `positive`, `amount`));
	if (subsampleSteps > array.length - 1) throw new Error(`Subsample steps exceeds array length`);
	const r = [];
	for (let index = subsampleSteps - 1; index < array.length; index += subsampleSteps) r.push(array[index]);
	return r;
};

//#endregion
//#region ../packages/arrays/src/sort.ts
/**
* Sorts an array of objects in ascending order
* by the given property name, assuming it is a number.
*
* ```js
* const data = [
*  { size: 10, colour: `red` },
*  { size: 20, colour: `blue` },
*  { size: 5, colour: `pink` }
* ];
* const sorted = Arrays.sortByNumericProperty(data, `size`);
*
* Yields items ascending order:
* [ { size: 5, colour: `pink` }, { size: 10, colour: `red` }, { size: 20, colour: `blue` } ]
* ```
* @param data
* @param propertyName
* @throws {TypeError} If data is not an array
*/
function sortByNumericProperty(data, propertyName) {
	return data.toSorted((a, b) => {
		resultThrow(arrayTest(data, `data`));
		const av = a[propertyName];
		const bv = b[propertyName];
		if (av < bv) return -1;
		if (av > bv) return 1;
		return 0;
	});
}
/**
* Sorts an array of objects by some named property.
*
* ```js
* const data = [
*  { size: 10, colour: `red` },
*  { size: 20, colour: `blue` },
*  { size: 5, colour: `pink` }
* ];
* sortByProperty(data, `colour`);
*
* Yields [
*  { size: 20, colour: `blue` },
*  { size: 5, colour: `pink` }
*  { size: 10, colour: `red` },
* ]
* ```
*
* You can also provide a custom comparer that is passed property values.
* This function should return 0 if values are equal, 1 if `a > b` and -1 if `a < b`.
* @param data
* @param propertyName
* @throws {TypeError} If data is not an array
* @returns Sorted array of objects by the given property name. Original array is not mutated.
*/
function sortByProperty(data, propertyName, comparer) {
	return data.toSorted((a, b) => {
		resultThrow(arrayTest(data, `data`));
		const av = a[propertyName];
		const bv = b[propertyName];
		if (comparer === void 0) {
			if (av < bv) return -1;
			if (av > bv) return 1;
			return 0;
		} else return comparer(av, bv);
	});
}

//#endregion
//#region ../packages/arrays/src/clamp.ts
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

//#endregion
//#region ../packages/arrays/src/index-wrap.ts
/**
* Returns a valid index within the given range.
*
* Logic:
* 'brickwall': if limit is reached, return limit
* 'bounce': if limit is reached, continue stepping in opposite direction (default)
* 'cycle': if limit is reached, wrap around to the other side and continue
*
* Examples:
* ```js
* // Within range
* indexWrap(3, 2, 5) // 3
* indexWrap(5, 2, 5) // 5
*
* // Bounce  logic (default)
* indexWrap(1, 2, 5, `bounce`) // 3
* indexWrap(0, 2, 5, `bounce`) // 4
* indexWrap(6, 2, 5, `bounce`) // 4
*
* // Cycle logic
* indexWrap(1, 2, 5, `cycle`) // 4
* indexWrap(0, 2, 5, `cycle`) // 3
* indexWrap(6, 2, 5, `cycle`) // 3
* ```
*
* @param index
* @param startIndex
* @param endIndex
* @param wrapLogic
*/
function indexWrap(index, startIndex, endIndex, wrapLogic, iterations = 0) {
	if (typeof wrapLogic === `undefined`) throw new TypeError(`Param 'wrapLogic' is required.`);
	if (startIndex > endIndex) throw new TypeError(`startIndex must be less than or equal to endIndex.`);
	if (index >= startIndex && index <= endIndex) return {
		index,
		iterations
	};
	if (wrapLogic === `brickwall`) {
		if (index < startIndex) return {
			index: startIndex,
			iterations
		};
		return {
			index: endIndex,
			iterations
		};
	}
	if (wrapLogic === `bounce`) if (index < startIndex) return indexWrap(startIndex - index + startIndex, startIndex, endIndex, `bounce`, iterations + 1);
	else return indexWrap(endIndex - (index - endIndex), startIndex, endIndex, `bounce`, iterations + 1);
	if (wrapLogic === `cycle`) if (index < startIndex) return indexWrap(endIndex - (startIndex - index), startIndex, endIndex, `cycle`, iterations + 1);
	else return indexWrap(startIndex + (index - endIndex), startIndex, endIndex, `cycle`, iterations + 1);
	throw new TypeError(`Invalid wrapLogic: ${wrapLogic}`);
}

//#endregion
//#region ../packages/arrays/src/util/random.ts
/**
* Returns a random integer based on a chance probability.
*
* If `chance` is less than 0, `minInclusive` is returned.
* If `chance` is greater than 1, `maxInclusive` is returned.
*
* Otherwise, we compute a random number to see if it's less than `chance`. It this is the case,
* we return a random integer in the inclusive min-max range. Eg. a chance of 0.9 means that 90% of the time
* (assuming even random distribution) we will return a random integer.
*
* If the random number is greater than `chance`, then we return `minInclusive`.
* @param chance
* @param maxInclusive Maximum value
* @param minInclusive Minimum value. By default 0.
* @param randomSource Random source, by default Math.random
* @returns
*/
function randomChanceInteger(chance, maxInclusive, minInclusive = 0, randomSource = Math.random) {
	if (minInclusive > maxInclusive) throw new Error(`minInclusive (${minInclusive}) cannot be greater than maxInclusive (${maxInclusive})`);
	if (minInclusive === maxInclusive) throw new Error(`minInclusive (${minInclusive}) cannot be equal to maxInclusive (${maxInclusive})`);
	if (chance <= 0) return minInclusive;
	if (chance > 1) return maxInclusive;
	if (randomSource() <= chance) return randomInteger(maxInclusive, minInclusive, randomSource);
	return minInclusive;
}
function randomInteger(maxInclusive, minInclusive = 0, randomSource = Math.random) {
	return Math.floor(randomSource() * (maxInclusive - minInclusive + 1)) + minInclusive;
}

//#endregion
//#region ../packages/arrays/src/traverse.ts
/**
* Given an input step state, take a step and return the new state.
* This is a lower-level function, you probably want to use {@link arrayIndexStepper} instead.
* @param state Current step state
* @param options How to step
* @param context Context in which we are stepping
* @returns New step state
*/
function step(state, options, context) {
	if (context.startIndex > context.endIndex) throw new TypeError(`startIndex must be less than or equal to endIndex. startIndex: ${context.startIndex} endIndex: ${context.endIndex}`);
	if (context.startIndex === context.endIndex) throw new TypeError(`startIndex cannot be the same as endIndex (${context.startIndex}).`);
	let incrementing = state.incrementing;
	const delta = incrementing ? options.steps : -options.steps;
	let index = state.index + delta;
	let done = false;
	const wrapLogic = options.loop === `none` ? `brickwall` : `bounce`;
	if (options.debug ?? false) console.log(`Step: index: ${state.index} incrementing: ${state.incrementing} delta: ${delta} index after step: ${index} start: ${context.startIndex} end: ${context.endIndex} loop: ${options.loop}`);
	const r = indexWrap(index, context.startIndex, context.endIndex, wrapLogic);
	index = r.index;
	if (r.iterations > 0) {
		if (r.iterations % 2 === 1) incrementing = !state.incrementing;
	}
	if (options.loop === `none` && (index === context.endIndex || index === context.startIndex)) done = true;
	return {
		index,
		incrementing,
		done
	};
}
/**
* Creates a generator to step through array indices.
*
* Supports moving forward/backward through an array, looping, 'drunken walk', and random step lengths.
*
* ```js
* const data [ `a`, `b`, `c`, `d`, `e` ];
*
* // Step one by one through each index
* for (const index of arrayIndexStepper({step:1, loop:`none`}, data)) {
*  console.log(`index: ${index} value: ${data[index]}`);
* }
* ```
*
* More examples:
* ```js
* // A generator that never ends, going back and forth between start and end
* arrayIndexStepper({ steps: 1, loop: `pingpong` }, data);
* // As above, but when we hit the end/start, repeat that index
* arrayIndexStepper({ steps: 1, loop: `pingpong`, repeatLoopedIndex:true }, data);
*
* // Move backwards. from the end, through the indicies, jumping by two
* arrayIndexStepper({ steps: 2, forward:false }, data);
*
* ```
* @param optionsP
* @param context
* @returns Iterator over array indicies
*/
function arrayIndexStepper(optionsP, context) {
	const options = {
		steps: 1,
		loop: `none`,
		repeatLoopedIndex: false,
		debug: false,
		forward: true,
		randomDirectionFlip: 0,
		randomChanceSteps: 0,
		randomStepsMax: 2,
		...optionsP
	};
	const range = {
		startIndex: 0,
		endIndex: context.data.length - 1,
		randomSource: Math.random,
		...context
	};
	const fn = function* (overrideOptions = {}, overrideContext = {}) {
		const _options = {
			...options,
			...overrideOptions
		};
		const data = overrideContext.data ?? context.data;
		if (!Array.isArray(data)) throw new TypeError(`Param 'data' must be an array. Got: ${typeof data}`);
		if (data.length === 0) return;
		if (data.length === 1) {
			yield 0;
			return;
		}
		const startIndex = clampIndex(overrideContext.startIndex ?? range.startIndex, data);
		const endIndex = clampIndex(overrideContext.endIndex ?? range.endIndex, data);
		if (startIndex === endIndex) throw new Error(`startIndex and endIndex cannot be the same. startIndex: ${startIndex} endIndex: ${endIndex}. Data length: ${data.length} Override: ${JSON.stringify(overrideContext)}`);
		const _context = {
			startIndex,
			endIndex
		};
		let state = {
			index: _options.forward ? startIndex : endIndex,
			incrementing: _options.forward,
			done: false
		};
		let lastIndex = NaN;
		const debug = _options.debug ?? false;
		while (!state.done) {
			yield state.index;
			if (_options.randomDirectionFlip > 0 && range.randomSource() < _options.randomDirectionFlip) state.incrementing = !state.incrementing;
			if (_options.randomChanceSteps > 0) {
				const randomSteps = randomChanceInteger(_options.randomChanceSteps, _options.randomStepsMax, _options.steps, range.randomSource);
				state = step(state, {
					..._options,
					steps: randomSteps
				}, _context);
			} else state = step(state, _options, _context);
			if (debug) console.log(`index: ${state.index} state: ${JSON.stringify(state)}`);
			if (state.done && state.index !== lastIndex) yield state.index;
			if (_options.repeatLoopedIndex && _options.loop !== `none`) {
				if (state.index === startIndex || state.index === endIndex) yield state.index;
			}
			lastIndex = state.index;
		}
	};
	return fn;
}

//#endregion
//#region ../packages/arrays/src/unique.ts
/**
* Combines the values of one or more arrays, removing duplicates.
* 
* By default compares values based on a JSON string representation.
* 
* @param arrays Array (or array of arrays) to examine
* @param toString Function to convert values to a string for comparison purposes. By default uses JSON formatting.
* @returns
*/
function unique(arrays, comparer) {
	const flattened = arrays.flat(10);
	if (flattened.length <= 1) return flattened;
	comparer ??= toStringDefault;
	if (typeof comparer(flattened[0], flattened[1]) === `string`) return uniqueByKeyImpl(flattened, comparer);
	else return uniqueByComparerImpl(flattened, comparer);
}
const uniqueByKeyImpl = (flattened, toString) => {
	const matching = /* @__PURE__ */ new Set();
	const t = [];
	for (const a of flattened) {
		const stringRepresentation = toString(a);
		if (matching.has(stringRepresentation)) continue;
		matching.add(stringRepresentation);
		t.push(a);
	}
	return t;
};
const uniqueByComparerImpl = (flattened, comparer) => {
	const t = [];
	const contains = (v) => {
		for (const tValue of t) if (comparer(tValue, v)) return true;
		return false;
	};
	for (const v of flattened) if (!contains(v)) t.push(v);
	return t;
};

//#endregion
//#region ../packages/arrays/src/until.ts
/**
* Yields all items in the input array for as long as `predicate` returns true.
*
* `predicate` yields arrays of `[stop:boolean, acc:A]`. The first value
* is _true_ when the iteration should stop, and the `acc` is the accumulated value.
* This allows `until` to be used to carry over some state from item to item.
*
* @example Stop when we hit an item with value of 3
* ```js
* const v = [...until([1,2,3,4,5], v => v === 3];
* // [ 1, 2 ]
* ```
*
* @example Stop when we reach a total, using 0 as initial value
* ```js
* // Stop when accumulated value reaches 6
* const v = Arrays.until[1,2,3,4,5], (v, acc) => [acc >= 7, v+acc], 0);
* // [1, 2, 3]
* ```
* @param data
* @param predicate
*/
function* until(data, predicate, initial) {
	let total = initial;
	for (const datum of data) {
		const r = predicate(datum, total);
		if (typeof r === `boolean`) {
			if (r) break;
		} else {
			const [stop, accumulator] = r;
			if (stop) break;
			total = accumulator;
		}
		yield datum;
	}
}
/**
* Returns up to `count` items from the generator. If the generator finishes before `count` items are returned, then only the available items are returned.
* @param generator
* @param count
*/
function takeFromGenerator(generator, count) {
	const result = [];
	for (let i = 0; i < count; i++) {
		const { value, done } = generator.next();
		if (done) break;
		result.push(value);
	}
	if (result.length > count) throw new Error(`Bug: takeFromGenerator returned more items than requested.`);
	return result;
}

//#endregion
//#region ../packages/arrays/src/without.ts
/**
* Returns a copy of an input array with _undefined_ values removed.
* @param data 
* @returns 
*/
const withoutUndefined = (data) => {
	resultThrow(arrayTest(data, `sourceArray`));
	return data.filter((v) => v !== void 0);
};
/**
* Returns an array with value(s) omitted. 
* 
* If value is not found, result will be a copy of input.
* Value checking is completed via the provided `comparer` function.
* By default checking whether `a === b`. To compare based on value, use the `isEqualValueDefault` comparer.
*
* @example
* ```js
* const data = [100, 20, 40];
* const filtered = without(data, 20); // [100, 40]
* ```
*
* @example Using value-based comparison
* ```js
* const data = [{ name: `Alice` }, { name:`Sam` }];
*
* // This wouldn't work as expected, because the default comparer uses instance,
* // not value:
* without(data, { name: `Alice` });
*
* // So instead we can use a value comparer:
* without(data, { name:`Alice` }, isEqualValueDefault);
* ```
*
* @example Use a function
* ```js
* const data = [ { name: `Alice` }, { name:`Sam` }];
* without(data, { name:`ALICE` }, (a, b) => {
*  return (a.name.toLowerCase() === b.name.toLowerCase());
* });
* ```
*
* Consider {@link remove} to remove an item by index.
*
* @typeParam V - Type of array items
* @param sourceArray Source array
* @param toRemove Value(s) to remove
* @param comparer Comparison function. If not provided `isEqualDefault` is used, which compares using `===`
* @throws {TypeError} If `sourceArray` is not an array, or compare function is not a function
* @return Copy of array without value.
*/
const without = (sourceArray, toRemove, comparer = isEqualDefault) => {
	resultThrow(arrayTest(sourceArray, `sourceArray`), functionTest(comparer, `comparer`));
	if (Array.isArray(toRemove)) {
		const returnArray = [];
		for (const source of sourceArray) if (!toRemove.some((v) => comparer(source, v))) returnArray.push(source);
		return returnArray;
	} else return sourceArray.filter((v) => !comparer(v, toRemove));
};

//#endregion
//#region ../packages/arrays/src/zip.ts
/**
* Zip combines the elements of two or more arrays based on their index.
*
* ```js
* const a = [ 1, 2, 3 ];
* const b = [ `red`, `blue`, `green` ];
*
* const c = Arrays.zip(a, b);
* // Yields:
* // [
* //   [ 1, `red` ],
* //   [ 2, `blue` ],
* //   [ 3, `green` ]
* // ]
* ```
*
* Typically the arrays you zip together are all about the same logical item. Eg, in the above example
* perhaps `a` is size and `b` is colour. So thing #1 (at array index 0) is a red thing of size 1. Before
* zipping we'd access it by `a[0]` and `b[0]`. After zipping, we'd have c[0], which is array of [1, `red`].
* @param arrays
* @returns Zipped together array
* @throws {TypeError} If any of the parameters are not arrays
* @throws {Error} If the arrays are not all of the same length
*/
const zip = (...arrays) => {
	if (arrays.some((a) => !Array.isArray(a))) throw new TypeError(`All parameters must be an array`);
	const lengths = arrays.map((a) => a.length);
	if (!containsIdenticalValues(lengths)) throw new Error(`Arrays must be of same length`);
	const returnValue = [];
	const length = lengths[0];
	for (let index = 0; index < length; index++) returnValue.push(arrays.map((a) => a[index]));
	return returnValue;
};

//#endregion
//#region ../packages/arrays/src/index.ts
var src_exports = /* @__PURE__ */ __exportAll({
	FrequencyByGroup: () => FrequencyByGroup,
	arrayIndexStepper: () => arrayIndexStepper,
	atWrap: () => atWrap,
	chunks: () => chunks,
	compareTo: () => compareTo,
	contains: () => contains,
	containsDuplicateInstances: () => containsDuplicateInstances,
	containsDuplicateValues: () => containsDuplicateValues,
	containsIdenticalValues: () => containsIdenticalValues,
	cycle: () => cycle,
	ensureLength: () => ensureLength,
	filterAB: () => filterAB,
	filterBetween: () => filterBetween,
	filterWithIndex: () => filterWithIndex,
	findIndex: () => findIndex,
	findIndexReverse: () => findIndexReverse,
	flatten: () => flatten,
	groupBy: () => groupBy,
	insertAt: () => insertAt,
	interleave: () => interleave,
	intersection: () => intersection,
	isEqual: () => isEqual,
	isEqualIgnoreOrder: () => isEqualIgnoreOrder,
	mapWithEmptyFallback: () => mapWithEmptyFallback,
	mergeByKey: () => mergeByKey,
	movingWindow: () => movingWindow,
	movingWindowWithContext: () => movingWindowWithContext,
	pairwise: () => pairwise,
	pairwiseReduce: () => pairwiseReduce,
	randomElement: () => randomElement,
	randomIndex: () => randomIndex,
	remove: () => remove,
	removeByFilter: () => removeByFilter,
	sample: () => sample,
	shuffle: () => shuffle,
	sortByNumericProperty: () => sortByNumericProperty,
	sortByProperty: () => sortByProperty,
	step: () => step,
	takeFromGenerator: () => takeFromGenerator,
	unique: () => unique,
	until: () => until,
	without: () => without,
	withoutUndefined: () => withoutUndefined,
	zip: () => zip
});

//#endregion
export { filterBetween as A, contains as B, interleave as C, mapWithEmptyFallback as D, FrequencyByGroup as E, isEqual as F, atWrap as G, containsDuplicateValues as H, isEqualIgnoreOrder as I, intersection as L, findIndex as M, findIndexReverse as N, flatten as O, containsIdenticalValues as P, ensureLength as R, mergeByKey as S, groupBy as T, compareTo as U, containsDuplicateInstances as V, chunks as W, shuffle as _, takeFromGenerator as a, movingWindow as b, arrayIndexStepper as c, sortByProperty as d, sample as f, randomIndex as g, randomElement as h, withoutUndefined as i, filterWithIndex as j, filterAB as k, step as l, removeByFilter as m, zip as n, until as o, remove as p, without as r, unique as s, src_exports as t, sortByNumericProperty as u, pairwise as v, insertAt as w, movingWindowWithContext as x, pairwiseReduce as y, cycle as z };
//# sourceMappingURL=src-B6pmAinX.js.map