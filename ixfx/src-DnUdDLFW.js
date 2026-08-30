import { n as __exportAll } from "./chunk-CaR5F9JI.js";
import { $ as addValue$1, At as isEqualValueIgnoreOrder, Ct as toObject, Ht as isPrimitive, Nt as defaultComparer, Ot as isEqualDefault, Q as addObjectEntriesMutate, St as toArray$1, Tt as zipKeyValue, V as defaultKeyer, at as findEntryByPredicate, bt as sortByValue, ct as fromIterable, dt as getOrGenerate, et as addValueMutate, ft as getOrGenerateSync, gt as mapToObjectTransform, h as intervalToMs, ht as mapToArray, it as findBySomeKey, k as toStringAbbreviate, kt as isEqualValueDefault, lt as fromObject, mt as hasKeyValue, nt as deleteByValueCompareMutate, ot as findEntryByValue, pt as hasAnyValue, rt as filterValues, st as findValue, tt as addValueMutator, ut as getClosestIntegerKey, vt as mergeByKey, wt as transformMap, xt as sortByValueProperty, yt as some, zt as toStringDefault } from "./src-CHZXopuG.js";
import { N as resultThrow, j as resultIsError, n as stringTest, u as nullUndefTest, w as numberTest, y as integerTest, z as throwIfFailed } from "./src-DZFdrMH_.js";
import { I as isEqualIgnoreOrder, V as containsDuplicateInstances, r as without } from "./src-B6pmAinX.js";
import { n as SimpleEventEmitter } from "./src-CRR1VQls.js";
import { B as map, g as last, v as max$1, y as min$1, z as last$1 } from "./src-lurwxDqA.js";

//#region ../packages/collections/src/circular-array.ts
/**
* A circular array keeps a maximum number of values, overwriting older values as needed. Immutable.
*
* `CircularArray` extends the regular JS array. Only use `add` to change the array if you want
* to keep the `CircularArray` behaviour.
*
* @example Basic functions
* ```js
* let a = new CircularArray(10);
* a = a.add(`hello`);  // Because it's immutable, capture the return result of `add`
* a.isFull;            // True if circular array is full
* a.pointer;           // The current position in array it will write to
* ```
*
* Since it extends the regular JS array, you can access items as usual:
* @example Accessing
* ```js
* let a = new CircularArray(10);
* ... add some stuff ..
* a.forEach(item => // do something with item);
* ```
* @param capacity Maximum capacity before recycling array entries
* @return Circular array
*/
var CircularArray = class CircularArray extends Array {
	#capacity;
	#pointer;
	constructor(capacity = 0) {
		super();
		resultThrow(integerTest(capacity, `positive`, `capacity`));
		this.#capacity = capacity;
		this.#pointer = 0;
	}
	/**
	* Add to array
	* @param value Thing to add
	* @returns 
	*/
	add(value) {
		const ca = CircularArray.from(this);
		ca[this.#pointer] = value;
		ca.#capacity = this.#capacity;
		if (this.#capacity > 0) ca.#pointer = this.#pointer + 1 === this.#capacity ? 0 : this.#pointer + 1;
		else ca.#pointer = this.#pointer + 1;
		return ca;
	}
	get pointer() {
		return this.#pointer;
	}
	get isFull() {
		if (this.#capacity === 0) return false;
		return this.length === this.#capacity;
	}
};

//#endregion
//#region ../packages/collections/src/sorted-array.ts
/**
* Returns first index of data in an ascended sorted array using a binary search.
* Returns -1 if data was not found.
* ```js
* indexOf([1,2,3], 3); // 2
* indexOf([1,2,3], 0); // -1, not found
* ```
*
* By default uses Javascript comparision semantics.
* Passing in `comparer` is needed when working with an array of objects.
* @param data Array of data
* @param sought Item to search for
* @param comparer Comparer (by default uses JS semantics)
* @returns Index of sought item or -1 if not found.
*/
function indexOf(data, sought, comparer = defaultComparer) {
	const range = matchingRange(data, sought, comparer);
	if (!range) return -1;
	return range.startIndex;
}
/**
* Returns the lower bound index for an item in a sorted array using a binary search.
* This is the index at which the item would be inserted to maintain sorted order, and is to the left of any existing entries in the case of equal values.
*
* ```js
* const data = [2, 8, 16, 32];
* Sorted.lowerBound(data, 1);   // 0
* Sorted.lowerBound(data, 2);   // 0
* Sorted.lowerBound(data, 3);   // 1
* Sorted.lowerBound(data, 320); // 4
* ```
*
* If item is past the end of the array, the length of the array is returned (which is the index at which the item would be inserted to maintain sorted order).
*
* @param sortedList Sorted list
* @param item Item
* @param comparer Comparer
* @returns Index
*/
function lowerBound(sortedList, item, comparer = defaultComparer) {
	let left = 0;
	let right = sortedList.length;
	while (left < right) {
		const mid = left + right >> 1;
		if (comparer(sortedList[mid], item) < 0) left = mid + 1;
		else right = mid;
	}
	return left;
}
/**
* Returns the upper bound index for an item in a sorted array using a binary search.
* This is the index at which the item would be inserted to maintain sorted order, and is to the right of any existing entries in the case of equal values.
* ```js
* const data = [2, 8, 16, 32];
* Sorted.upperBound(data, 1); // 0
* Sorted.upperBound(data, 2); // 1
* Sorted.upperBound(data, 3); // 1
* ```
* It the item is past the end of the array, the length of the array is returned (which is the index at which the item would be inserted to maintain sorted order).
* @param sortedList
* @param item
* @param comparer
*/
function upperBound(sortedList, item, comparer = defaultComparer) {
	let left = 0;
	let right = sortedList.length;
	while (left < right) {
		const mid = left + right >> 1;
		if (comparer(sortedList[mid], item) <= 0) left = mid + 1;
		else right = mid;
	}
	return left;
}
/**
* Returns the index range of `sortedList` where item(s) equal to `item` are found. Returns `undefined`
* if `item` was not found.
*
* ```js
* const data = [2, 8, 16, 16, 32];
* Sorted.matchingRange(data, 1);  // _undefined_
* Sorted.matchingRange(data, 8);  // { startIndex: 1, endIndex: 1 }
* Sorted.matchingRange(data, 16); // { startIndex: 2, endIndex: 3 }
* ```
* @param sortedList
* @param item
* @param comparer
* @returns Matching range of `item`, or _undefined_ if not found.
*/
function matchingRange(sortedList, item, comparer = defaultComparer) {
	if (sortedList.length === 0) return;
	const start = lowerBound(sortedList, item, comparer);
	if (start >= sortedList.length || comparer(sortedList[start], item) !== 0) return;
	return {
		startIndex: start,
		endIndex: upperBound(sortedList, item, comparer) - 1
	};
}
/**
* Returns index to insert data into a sorted array using a binary search.
* Adds to the right of existing entries in the case of equal values.
*
* By default uses Javascript comparision semantics.
* Passing in `comparer` is needed when working with an array of objects.
* @param data
* @param toInsert
* @param comparer
*/
function insertionIndex(data, toInsert, comparer = defaultComparer) {
	if (typeof comparer !== `function`) throw new TypeError(`Param 'comparer' is not a function`);
	if (!Array.isArray(data)) throw new TypeError(`Param 'data' is not an array`);
	return upperBound(data, toInsert, comparer);
}

//#endregion
//#region ../packages/collections/src/events/events-fns.ts
/**
* Sorts by start, such that 'start' values are ascending.
*
* Returns:
* 0 if A and B are have same start & end.
* positive if B is before A.
* negative if B is after A.
*
* If A and B have the same start point, they are secondarily sorted based on end time, with earlier end time considered "before" later end time.
*
* Use {@link CompareByStartOnly} to ignore end time and consider events equal if they share a `start`.
* @param a
* @param b
*/
const CompareByStart = (a, b) => {
	if (typeof a === `undefined`) throw new TypeError(`Param 'a' is undefined`);
	if (typeof b === `undefined`) throw new TypeError(`Param 'b' is undefined`);
	if (a.start === b.start) return a.end - b.end;
	return a.start - b.start;
};
const CompareByStartOnly = (a, b) => {
	if (typeof a === `undefined`) throw new TypeError(`Param 'a' is undefined`);
	if (typeof b === `undefined`) throw new TypeError(`Param 'b' is undefined`);
	return a.start - b.start;
};
/**
* Sorts by end, such that 'end' values are ascending.
*
* Returns:
* 0 if A and B are have same start & end.
* Returns positive if B is before A.
* Returns negative if B is after A.
*
* If A and B share the same end, shorter items will come first (ie. those with higher start)
* @param a
* @param b
*/
const CompareByEnd = (a, b) => {
	if (typeof a === `undefined`) throw new TypeError(`Param 'a' is undefined`);
	if (typeof b === `undefined`) throw new TypeError(`Param 'b' is undefined`);
	if (a.end === b.end) return a.start - b.start;
	return a.end - b.end;
};
const CompareByEndOnly = (a, b) => {
	if (typeof a === `undefined`) throw new TypeError(`Param 'a' is undefined`);
	if (typeof b === `undefined`) throw new TypeError(`Param 'b' is undefined`);
	return a.end - b.end;
};
/**
* Returns a new array of events ordered by their start time (ascending)
* @param events
* @returns Events ordered by start time
*/
function sortByStart(events) {
	return events.toSorted(CompareByStart);
}
/**
* Returns a new array of events ordered by their end time (ascending)
* @param events
* @returns Events ordered by end time
*/
function sortByEnd(events) {
	return events.toSorted(CompareByEnd);
}
/**
* Yields every item in `sortedEvents` that has the specified `start` value
*
* Return item is a wrapped object consisting of the event as well as its index.
* ```js
* const events = [ { start: 1, end: 2}, { start: 5, end: 10 }, { start: 10, end: 12 }];
* const matched = [...itemsWithStart(events, 5)];
* // matched is [{ event: { start: 5, end: 10 }, index: 1 }]
* ```
* @param sortedEvents Sorted events
* @param start Start position
*/
function* itemsWithStart(sortedEvents, start) {
	if (!Array.isArray(sortedEvents)) throw new TypeError(`Param 'sortedEvents' is not an array`);
	const range = matchingRange(sortedEvents, {
		start,
		end: start
	}, CompareByStartOnly);
	if (!range) return;
	for (let i = range.startIndex; i <= range.endIndex; i++) yield {
		event: sortedEvents[i],
		index: i
	};
}
/**
* Yields every item in `eventsByEnd` that has the specified `end` value.
* Return item is a wrapped object consisting of the event as well as its index.
*
* The function expects that the input array has been sorted using {@link sortByEnd}, and therefore
* sorted by ascending end value.
*
* ```js
* const events = [ { start: 1, end: 2}, { start: 5, end: 10 }, { start: 10, end: 12 }];
* const matched = [...itemsWithEnd(events, 10)];
* // matched is [{ event: { start: 5, end: 10 }, index: 1 }]
* ```
* @param eventsByEnd Events sorted with {@link sortByEnd}
* @param end End position
*/
function* itemsWithEnd(eventsByEnd, end) {
	if (!Array.isArray(eventsByEnd)) throw new TypeError(`Param 'eventsByEnd' is not an array`);
	const range = matchingRange(eventsByEnd, {
		start: end,
		end
	}, CompareByEndOnly);
	if (!range) return;
	for (let i = range.startIndex; i <= range.endIndex; i++) yield {
		event: eventsByEnd[i],
		index: i
	};
}
/**
* Converts a collection of `IndexedEventItem` back into an array of `EventItem`, placing items at their original index.
*
* ```js
* // Get all items that start at position 5
* const itemsAtPosition = [...itemsWithStart(sortedEvents, 5)];
*
* // Make this into an array:
* const items = arrayFromItems(itemsAtPosition);
* ```
*
* By default, the `index` field is used to construct the array. If `ignoreIndexes` is set to _true_,
* the the returned array is constructed in the order of the input items, ignoring the `index` field. This can be useful if you just want to extract the events from a generator without caring about their original position.
* @param items
* @returns EventItems
*/
function arrayFromItems(items, ignoreIndexes = false) {
	const result = [];
	if (ignoreIndexes) for (const item of items) result.push(item.event);
	else for (const { event, index } of items) result[index] = event;
	return result;
}
/**
* Yields all events that overlap with `point`.
* By default event end is considered exclusive, meaning that if `point == event.end`, it is not considered overlapping.
* If `endInclusive` is true, event end is considered inclusive, and the aforementioned would be considered ovlerapping.
*
* By default start is inclusive.
*
* @param sortedEvents
* @param point
* @param endInclusive Whether event end is considered inclusive for determining overlap (default:false)
* @param startInclusive Whether event start is considered inclusive for determining overlap (default:true)
*/
function* overlapping(sortedEvents, point, endInclusive = false, startInclusive = true) {
	for (let index = 0; index < sortedEvents.length; index++) {
		const event = sortedEvents[index];
		const start = startInclusive ? point >= event.start : point > event.start;
		if ((endInclusive ? point <= event.end : point < event.end) && start) yield {
			event,
			index
		};
	}
}
/**
* Inserts space within `sortedEvents`. It does this by shifting events forward.
*
* If `start` overlaps with existing item(s), `overlappingPolicy` is used:
* - 'ignore': Event duration is not changed
* - 'stretch': Events that overlap are stretched by `length`.
*
* When considering overlap, both end is exclusive and start are considered exclusive.
*
* Eg, if we have the event `{ start: 5, end: 10 }`.
* - insertSpace(data, 5, 1, `ignore`);  // Would not be considered overlapping, but event would be shifted to { start: 6, end: 11 }
* - insertSpace(data, 10, 1, `ignore`); // Would not be considered overlapping, event would remain { start: 5, end: 10 }
* - insertSpace(data, 5, 1, `stretch`); // Would be considered overlapping, event shifted to { start: 6, end: 11 }
* - insertSpace(data, 6, 1, `stretch`); // Would be considered overlapping, event would be stretched to { start: 5, end: 11 }
* @param sortedEvents
* @param start
* @param length
* @param overlappingPolicy
*/
function insertSpace(sortedEvents, start, length, overlappingPolicy) {
	let i = insertionIndex(sortedEvents, {
		start,
		end: start
	}, CompareByStart);
	if (overlappingPolicy === `stretch`) {
		const events = [...sortedEvents];
		for (const { event, index } of overlapping(sortedEvents, start, false, false)) events[index] = {
			...event,
			end: event.end + length
		};
		sortedEvents = events;
	}
	while (sortedEvents[i - 1]?.start === start) i--;
	const pre = sortedEvents.slice(0, i);
	const post = sortedEvents.slice(i).map((event) => translate(event, length));
	const result = [...pre, ...post];
	if (result.length !== sortedEvents.length) throw new Error(`Bug in insertSpace: result length ${result.length} does not match original length ${sortedEvents.length}`);
	return result;
}
/**
* Punches a hole in `sortedEvents` which overlap `hole`.
* It does this by splitting/trimming events, or removing an event entirely it is fully covered by the hole.
*
* This will never shift events in time.
* @param sortedEvents
* @param hole
*/
function holepunch(sortedEvents, hole) {
	throwIfFailed(isValid(hole));
	const result = [];
	for (const e of sortedEvents) {
		const c = compareRange(e, hole);
		if (c === `none`) {
			result.push(e);
			continue;
		}
		if (c === `equal`) continue;
		if (c === `full-border`) {
			if (e.start < hole.start) result.push({
				...e,
				end: hole.start
			});
			else if (e.end > hole.end) result.push({
				...e,
				start: hole.end
			});
			continue;
		}
		if (c === `full`) {
			result.push({
				...e,
				end: hole.start
			});
			result.push({
				...e,
				start: hole.end
			});
			continue;
		}
		if (c === `partial`) {
			if (e.start < hole.start) result.push({
				...e,
				end: hole.start
			});
			else if (e.end > hole.end) result.push({
				...e,
				start: hole.end
			});
			continue;
		}
	}
	return result;
}
/**
* Returns _true_ if `item` has zero duration (start and end are the same), _false_ otherwise.
* ```js
* isEmpty({ start: 1, end: 1 }); // true
* isEmpty({ start: 1, end: 2 }); // false
* ```
* @param item
* @returns _true_ if `item` is empty.
*/
function isEmpty$2(item) {
	return item.start === item.end;
}
/**
* Creates an `EventItem` from an `EventItemAsDuration` by calculating the end as start + duration.
* ```js
* fromDuration({ start: 1, duration: 2 }); // { start: 1, end: 3 }
* ```
*
* Copies additional properties to the return result.
* @param item
* @returns EventItem
*/
function fromDuration(item) {
	return {
		...item,
		start: item.start,
		end: item.start + item.duration
	};
}
/**
* Creats an `EventItemAsDuration` from an `EventItem` by calculating the duration as end - start.
* ```js
* toDuration({ start: 1, end: 3 }); // { start: 1, duration: 2 }
* ```
*
* Copies additional properties to the return result.
* @param item
* @returns EventItemAsDuration
*/
function toDuration(item) {
	return {
		...item,
		start: item.start,
		duration: item.end - item.start
	};
}
/**
* Returns the intervals between pairs of events.
*
* If `sortedEvents` has less than two events, yields nothing
* @param sortedEvents
*/
function* intervals(sortedEvents) {
	if (sortedEvents.length <= 1) return;
	for (let index = 1; index < sortedEvents.length; index++) {
		const prev = sortedEvents[index - 1];
		const current = sortedEvents[index];
		yield {
			indexA: index - 1,
			indexB: index,
			a: prev,
			b: current,
			startInterval: current.start - prev.start,
			endInterval: current.end - prev.end,
			betweenInterval: current.start - prev.end
		};
	}
}
function isValid(item) {
	if (!isEventItem(item)) return {
		success: false,
		error: `Item is not a valid EventItem`
	};
	if (item.end < item.start) return {
		success: false,
		error: `Invalid EventItem. End (${item.end}) is before start (${item.start})`
	};
	return {
		success: true,
		value: item
	};
}
function isEventItem(item) {
	if (typeof item !== `object`) return false;
	if (item === null || item === void 0) return false;
	return `start` in item && `end` in item && typeof item.start === `number` && typeof item.end === `number`;
}
/**
* Removes `toRemove` from `sortedEvents`.
*
* Consider {@link holepunch} if you want to create an empty hole in the events and maintain overall length of event series.
*
* After removing:
* - 'nothing': Gap is left, other items not affected
* - 'shuffle-following': Events after 'toRemove' are shifted back by duration of `toRemove`, maintaining their spacing after that
* - 'shuffle-leading': Events before 'toRemove' are shifted forward by duration of `toRemove`, maintaining their spacing before that
* - 'slice-following': Events after 'toRemove' are shifted back to start at `toRemoved.start`, maintaining their spacing after that
* - 'slice-leading': Events before 'toRemove' are shifted forward to end at `toRemoved.end`, maintaining their spacing before that
* @param sortedEvents
* @param toRemove
*/
function remove$2(sortedEvents, toRemove, andThen) {
	const i = indexOf(sortedEvents, toRemove, CompareByStart);
	if (i === -1) return sortedEvents;
	if (andThen === `shuffle-following`) return [...sortedEvents.slice(0, i), ...sortedEvents.slice(i + 1).map((event) => translate(event, toRemove.start - toRemove.end))];
	else if (andThen === `slice-following`) {
		const shiftAmount = toRemove.start - sortedEvents[i + 1].start;
		return [...sortedEvents.slice(0, i), ...sortedEvents.slice(i + 1).map((event) => translate(event, shiftAmount))];
	} else if (andThen === `shuffle-leading`) return [...sortedEvents.slice(0, i).map((event) => translate(event, toRemove.end - toRemove.start)), ...sortedEvents.slice(i + 1)];
	else if (andThen === `slice-leading`) {
		const shiftAmount = toRemove.end - sortedEvents[i - 1].end;
		return [...sortedEvents.slice(0, i).map((event) => translate(event, shiftAmount)), ...sortedEvents.slice(i + 1)];
	}
	return sortedEvents.toSpliced(i, 1);
}
/**
* Splits `event` into two events by either a percentange of duration or by a specific start position.
*
* If `options` has a `percentage` field, the split point is calculated as `event.start + (event.end - event.start) * percentage`.
* If `options` has a `start` field, the split point is simply that value.
*
* ```js
* splitEvent({ start: 0, end: 10 }, { percentage: 0.5 }); // [{ start: 0, end: 5 }, { start: 5, end: 10 }]
* splitEvent({ start: 0, end: 10 }, { start: 3 });        // [{ start: 0, end: 3 }, { start: 3, end: 10 }]
* ```
*
* Any other properties on `event` are copied to split events.
* @param event Input event
* @param options How to split
* @returns Split event
*/
function splitEvent(event, options) {
	if (`percentage` in options) {
		const splitPoint = event.start + (event.end - event.start) * options.percentage;
		return [{
			...event,
			start: event.start,
			end: splitPoint
		}, {
			...event,
			start: splitPoint,
			end: event.end
		}];
	} else {
		const splitPoint = options.start;
		return [{
			...event,
			start: event.start,
			end: splitPoint
		}, {
			...event,
			start: splitPoint,
			end: event.end
		}];
	}
}
/**
* Applies `fn` to both `start` and `end` fields, returning a new event.
*
* Existing data on `event` is maintained.
*
* ```js
* applyToPosition( { start:1.2, end:2.4 }, v => Math.round(v)); // { start:1, end:2 }
* applyToPosition( { start:1,   end:2   }, v => v*2);           // { start:2, end:4 }
* ```
*
* Use {@link translate} if you just want to add an amount to start and end, instead of applying a custom function.
* @param event Input event
* @param fn Function to run over start and end
* @returns New event with `fn` applied to start and end
*/
function applyToPositions(event, fn) {
	return {
		...event,
		start: fn(event.start),
		end: fn(event.end)
	};
}
/**
* Translates an event by adding `amount` to both `start` and `end`, returning a new event.
* ```js
* translate( { start:1, end:2 }, 3);  // { start:4, end:5 }
* translate( { start:1, end:2 }, -1); // { start:0, end:1 }
* ```
*
* Existing data on `event` is maintained.
*
* Use {@link applyToPositions} if you want to apply a custom function to the start and end, instead of just adding an amount.
* @param event
* @param amount
* @returns New EventItem
*/
function translate(event, amount) {
	return {
		...event,
		start: event.start + amount,
		end: event.end + amount
	};
}
/**
* Returns how `b` overlaps with `a`.
*
* Returns:
* - `none` if `b` does not overlap with `a`
* - `equal` if `b` has the same start and end as `a`
* - `full` if `b` is fully contained within `a` and `a` does not share a start/end
* - `full-border` if `b` is fully contained within `a` and `a` shares a start/end
* - `partial` if `b` overlaps with `a` but is not fully contained within it
*
* ```js
* compareRange({ start:2, end:4 }, { start:0, end:1 }); // 'none'
* compareRange({ start:2, end:4 }, { start: 2, end:4 }); // 'equal'
* compareRange({ start:2, end:4 }, { start: 3, end: 3 }); // 'full'
* compareRange({ start:2, end:4 }, { start: 3, end: 4 }); // 'full-border'
* compareRange({ start:2, end:4 }, { start: 1, end: 3 }); // 'partial'
* ```
* @param a
* @param b
*/
function compareRange(a, b) {
	if (b.start > a.end) return `none`;
	if (b.end < a.start) return `none`;
	if (b.start === a.start && b.end === a.end) return `equal`;
	if (b.start > a.start && b.end < a.end) return `full`;
	if (b.start >= a.start && b.end <= a.end) return `full-border`;
	return `partial`;
}
/**
* Lays out events end-to-end, removing gaps between them and having the first start at 0.
* Duration of events is maintained.
* @param sortedEvents
*/
function defragment(sortedEvents, options = {}) {
	let time = options.startAt ?? 0;
	const gap = options.gap ?? 0;
	const results = [];
	for (const event of sortedEvents) {
		results.push({
			...event,
			start: time,
			end: time + (event.end - event.start)
		});
		time = results.at(-1).end + gap;
	}
	return results;
}
function createFromStarts(starts, duration, idPrefix = `event`) {
	return starts.map((start, i) => ({
		start,
		end: start + duration,
		id: `${idPrefix}-${i}`
	}));
}
/**
* Gets the range of `events`: the smallest 'start' and the largest 'end'.
*
* If there are gaps between events, this is still included in the range. Use {@link sumDuration}
* to add up the duration of all events as if they are stacked end-to-end.
* @param events
* @returns Range of events
*/
function computeRange(events) {
	let minStart = Number.MAX_SAFE_INTEGER;
	let maxEnd = Number.MIN_SAFE_INTEGER;
	for (const event of events) {
		if (event.start < minStart) minStart = event.start;
		if (event.end > maxEnd) maxEnd = event.end;
	}
	return {
		start: minStart,
		end: maxEnd
	};
}
/**
* Returns the total duration of all events. Doesn't take into account
* the spacing between events, just sums the duration of each one.
*
* Use {@link computeRange} if you want to calculate the min and max starting points.
* @param events
* @returns Duration
*/
function sumDuration(events) {
	return events.reduce((sum, event) => sum + (event.end - event.start), 0);
}

//#endregion
//#region ../packages/collections/src/stack/StackFns.ts
const trimStack = (opts, stack, toAdd) => {
	const potentialLength = stack.length + toAdd.length;
	const policy = opts.discardPolicy ?? `additions`;
	const capacity = opts.capacity ?? potentialLength;
	const toRemove = potentialLength - capacity;
	if (opts.debug) console.log(`Stack.push: stackLen: ${stack.length} potentialLen: ${potentialLength} toRemove: ${toRemove} policy: ${policy}`);
	switch (policy) {
		case `additions`:
			if (opts.debug) console.log(`Stack.push:DiscardAdditions: stackLen: ${stack.length} slice: ${potentialLength - capacity} toAddLen: ${toAdd.length}`);
			if (stack.length === opts.capacity) return stack;
			else return [...stack, ...toAdd.slice(0, toAdd.length - toRemove)];
		case `newer`: {
			if (toAdd.length >= capacity) return toAdd.slice(toAdd.length - capacity);
			const keepFromOld = capacity - toAdd.length;
			return [...stack.slice(0, keepFromOld), ...toAdd];
		}
		case `older`: return [...stack, ...toAdd].slice(toRemove);
		default: throw new Error(`Unknown discard policy ${policy}`);
	}
};
const push = (opts, stack, ...toAdd) => {
	const potentialLength = stack.length + toAdd.length;
	return opts.capacity && potentialLength > opts.capacity ? trimStack(opts, stack, toAdd) : [...stack, ...toAdd];
};
const pop = (opts, stack) => {
	if (stack.length === 0) throw new Error(`Stack is empty`);
	return stack.slice(0, -1);
};
/**
* Peek at the top of the stack (end of array)
*
* @typeParam V - Type of stored items
* @param {StackOpts} opts
* @param {V[]} stack
* @returns {(V | undefined)}
*/
const peek$1 = (opts, stack) => stack.at(-1);
const isEmpty$1 = (opts, stack) => stack.length === 0;
const isFull$1 = (opts, stack) => {
	if (opts.capacity) return stack.length >= opts.capacity;
	return false;
};

//#endregion
//#region ../packages/collections/src/stack/StackMutable.ts
/**
* Creates a stack. Mutable. Use {@link StackImmutable} for an immutable alternative.
*
* @example Basic usage
* ```js
* // Create
* const s = new StackMutable();
* // Add one or more items
* s.push(1, 2, 3, 4);
*
* // See what's on top
* s.peek;  // 4
*
* // Remove the top-most, and return it
* s.pop();   // 4
*
* // Now there's a new top-most element
* s.peek;  // 3
* ```
*/
var StackMutable = class {
	opts;
	data;
	/**
	* Create a new StackMutable.
	* 
	* @param opts Options
	* @param data Initial data to use
	*/
	constructor(opts = {}, data = []) {
		this.opts = opts;
		this.data = data;
	}
	/**
	* Push data onto the stack.
	* If `toAdd` is empty, nothing happens
	* @param toAdd Data to add
	* @returns Length of stack
	*/
	push(...toAdd) {
		if (toAdd.length === 0) return this.data.length;
		this.data = push(this.opts, this.data, ...toAdd);
		return this.data.length;
	}
	/**
	* Iterate from bottom to top. Note that `forEachFromTop` iterates from top to bottom, so this is the reverse.
	* @param fn
	*/
	forEach(fn) {
		this.data.forEach(fn);
	}
	/**
	* Iterate from top to bottom. Note that `forEach` iterates from bottom to top, so this is the reverse.
	* @param fn 
	*/
	forEachFromTop(fn) {
		[...this.data].reverse().forEach(fn);
	}
	/**
	* Pop the top-most item from the stack, and return it. If the stack is empty, returns _undefined_.
	* @returns 
	*/
	pop() {
		const v = peek$1(this.opts, this.data);
		this.data = pop(this.opts, this.data);
		return v;
	}
	/**
	* Returns _true_ if the stack is empty, _false_ otherwise.
	*/
	get isEmpty() {
		return isEmpty$1(this.opts, this.data);
	}
	/**
	* Returns _true_ if the stack is full, _false_ otherwise. Note that a stack is only full if a `maxSize` option was provided at construction time.
	*/
	get isFull() {
		return isFull$1(this.opts, this.data);
	}
	/**
	* Returns the top-most item on the stack, without modifying the stack. If the stack is empty, returns _undefined_.
	*/
	get peek() {
		return peek$1(this.opts, this.data);
	}
	/**
	* Returns the number of items currently on the stack.
	*/
	get length() {
		return this.data.length;
	}
};
/**
* Creates a stack. Mutable. Use {@link Stacks.immutable} for an immutable alternative.
*
* @example Basic usage
* ```js
* // Create
* const s = Stacks.mutable();
* // Add one or more items
* s.push(1, 2, 3, 4);
*
* // See what's on top
* s.peek;  // 4
*
* // Remove the top-most, and return it
* s.pop();   // 4
*
* // Now there's a new top-most element
* s.peek;  // 3
* ```
*/
const mutable$3 = (opts = {}, ...startingItems) => new StackMutable({ ...opts }, [...startingItems]);

//#endregion
//#region ../packages/collections/src/queue/queue-fns.ts
const debug = (opts, message) => {
	opts.debug && console.log(`queue:${message}`);
};
const trimQueue = (opts, queue, toAdd) => {
	const potentialLength = queue.length + toAdd.length;
	const capacity = opts.capacity ?? potentialLength;
	const toRemove = potentialLength - capacity;
	const policy = opts.discardPolicy ?? `additions`;
	switch (policy) {
		case `additions`:
			if (queue.length === 0) return toAdd.slice(0, toAdd.length - toRemove);
			if (queue.length === opts.capacity) return queue;
			else return [...queue, ...toAdd.slice(0, toRemove - 1)];
		case `newer`: if (toRemove >= queue.length) {
			if (queue.length === 0) return [...toAdd.slice(0, capacity - 1), toAdd.at(-1)];
			return toAdd.slice(Math.max(0, toAdd.length - capacity), Math.min(toAdd.length, capacity) + 1);
		} else {
			const countToAdd = Math.max(1, toAdd.length - queue.length);
			const toAddFinal = toAdd.slice(toAdd.length - countToAdd, toAdd.length);
			return [...queue.slice(0, Math.min(queue.length, capacity - 1)), ...toAddFinal];
		}
		case `older`: return [...queue, ...toAdd].slice(toRemove);
		default: throw new Error(`Unknown overflow policy ${policy}`);
	}
};
/**
* Adds to the back of the queue (last array index)
* Last item of `toAdd` will potentially be the new end of the queue (depending on capacity limit and overflow policy)
* @typeParam V - Type of values
* @param {QueueOpts} opts
* @param {V[]} queue
* @param {...V[]} toAdd
* @returns {V[]}
*/
const enqueue = (opts, queue, ...toAdd) => {
	if (opts === void 0) throw new Error(`opts parameter undefined`);
	const potentialLength = queue.length + toAdd.length;
	const overSize = opts.capacity && potentialLength > opts.capacity;
	const toReturn = overSize ? trimQueue(opts, queue, toAdd) : [...queue, ...toAdd];
	if (opts.capacity && toReturn.length !== opts.capacity && overSize) throw new Error(`Bug! Expected return to be at capacity. Return len: ${toReturn.length} capacity: ${opts.capacity} opts: ${JSON.stringify(opts)}`);
	if (!opts.capacity && toReturn.length !== potentialLength) throw new Error(`Bug! Return length not expected. Return len: ${toReturn.length} expected: ${potentialLength} opts: ${JSON.stringify(opts)}`);
	return toReturn;
};
const dequeue = (opts, queue) => {
	if (queue.length === 0) throw new Error(`Queue is empty`);
	return queue.slice(1);
};
/**
* Returns front of queue (oldest item), or undefined if queue is empty
*
* @typeParam V - Type of values stored
* @param {QueueOpts} opts
* @param {V[]} queue
* @returns {(V | undefined)}
*/
const peek = (opts, queue) => queue[0];
const isEmpty = (opts, queue) => queue.length === 0;
const isFull = (opts, queue) => {
	if (opts.capacity) return queue.length >= opts.capacity;
	return false;
};

//#endregion
//#region ../packages/collections/src/queue/queue-mutable.ts
/**
* Mutable queue that fires events when manipulated.
* 
* Queues are useful if you want to treat 'older' or 'newer'
* items differently. _Enqueing_ adds items at the back of the queue, while
* _dequeing_ removes items from the front (ie. the oldest).
*
* ```js
* const q = Queues.mutable();       // Create
* q.enqueue(`a`, `b`);     // Add two strings
* const front = q.dequeue();  // `a` is at the front of queue (oldest)
* ```
*
* @example Cap size to 5 items, throwing away newest items already in queue.
* ```js
* const q = Queues.mutable({capacity: 5, discardPolicy: `newer`});
* ```
*
* Events can be used to monitor data flows.
* * 'enqueue': fires when item(s) are added
* * 'dequeue': fires when an item is dequeued from front
* * 'removed': fires when an item is dequeued, queue is cleared or .removeWhere is used to trim queue
* 
* Each of the event handlers return the state of the queue as the 'finalData'
* field.
* 
* ```js
* q.addEventListener(`enqueue`, e => {
*  // e.added, e.finalData
* });
* q.addEventListener(`removed`, e => {
*  // e.removed, e.finalData
* });
* q.addEventListener(`dequeue`, e=> {
*  // e.removed, e.finalData
* })
* ```
* @typeParam V - Data type of items
*/
var QueueMutable = class extends SimpleEventEmitter {
	options;
	data;
	eq;
	constructor(opts = {}, data = []) {
		super();
		if (opts === void 0) throw new Error(`opts parameter undefined`);
		this.options = opts;
		this.data = data;
		this.eq = opts.eq ?? isEqualDefault;
	}
	clear() {
		const copy = [...this.data];
		this.data = [];
		this.fireEvent(`removed`, {
			finalData: this.data,
			removed: copy
		});
		this.onClear();
	}
	/**
	* Called when all data is cleared
	*/
	onClear() {}
	at(index) {
		if (index >= this.data.length) throw new Error(`Index outside bounds of queue`);
		const v = this.data.at(index);
		if (v === void 0) throw new Error(`Index appears to be outside range of queue`);
		return v;
	}
	enqueue(...toAdd) {
		this.data = enqueue(this.options, this.data, ...toAdd);
		const length = this.data.length;
		this.onEnqueue(this.data, toAdd);
		return length;
	}
	onEnqueue(result, attemptedToAdd) {
		this.fireEvent(`enqueue`, {
			added: attemptedToAdd,
			finalData: result
		});
	}
	dequeue() {
		const v = peek(this.options, this.data);
		if (v === void 0) return;
		this.data = dequeue(this.options, this.data);
		this.fireEvent(`dequeue`, {
			removed: v,
			finalData: this.data
		});
		this.onRemoved([v], this.data);
		return v;
	}
	onRemoved(removed, finalData) {
		this.fireEvent(`removed`, {
			removed,
			finalData
		});
	}
	/**
	* Removes values that match `predicate`.
	* @param predicate 
	* @returns Returns number of items removed.
	*/
	removeWhere(predicate) {
		const countPre = this.data.length;
		const toRemove = this.data.filter((v) => predicate(v));
		if (toRemove.length === 0) return 0;
		this.data = this.data.filter((element) => !predicate(element));
		this.onRemoved(toRemove, this.data);
		return countPre - this.data.length;
	}
	/**
	* Return a copy of the array
	* @returns 
	*/
	toArray() {
		return [...this.data];
	}
	get isEmpty() {
		return isEmpty(this.options, this.data);
	}
	get isFull() {
		return isFull(this.options, this.data);
	}
	get length() {
		return this.data.length;
	}
	get peek() {
		return peek(this.options, this.data);
	}
};
/**
* Creates a new QueueMutable
* @param options 
* @param startingItems 
* @returns 
*/
function mutable$2(options = {}, ...startingItems) {
	return new QueueMutable({ ...options }, [...startingItems]);
}

//#endregion
//#region ../packages/collections/src/queue/priority-mutable.ts
/**
* Simple priority queue implementation.
* Higher numbers mean higher priority.
* 
* ```js
* const pm = new PriorityMutable();
* 
* // Add items with a priority (higher numeric value = higher value)
* pm.enqueueWithPriority(`hello`, 4);
* pm.enqueueWithPriotity(`there`, 1);
* 
* ```
*/
var PriorityMutable = class extends QueueMutable {
	constructor(opts = {}) {
		if (opts.eq === void 0) opts = {
			...opts,
			eq: (a, b) => {
				return isEqualDefault(a.item, b.item);
			}
		};
		super(opts);
	}
	/**
	* Adds an item with a given priority
	* @param item Item
	* @param priority Priority (higher numeric value means higher priority)
	*/
	enqueueWithPriority(item, priority) {
		resultThrow(numberTest(priority, `positive`));
		super.enqueue({
			item,
			priority
		});
	}
	changePriority(item, priority, addIfMissing = false, eq) {
		if (item === void 0) throw new Error(`Item cannot be undefined`);
		let toDelete;
		for (const d of this.data) if (eq) {
			if (eq(d.item, item)) {
				toDelete = d;
				break;
			}
		} else if (this.eq(d, {
			item,
			priority: 0
		})) {
			toDelete = d;
			break;
		}
		if (toDelete === void 0 && !addIfMissing) throw new Error(`Item not found in priority queue. Item: ${JSON.stringify(item)}`);
		if (toDelete !== void 0) this.removeWhere((item) => toDelete === item);
		this.enqueueWithPriority(item, priority);
	}
	dequeueMax() {
		const m = last(max$1(this.data, (a, b) => a.priority >= b.priority));
		if (m === void 0) return;
		this.removeWhere((item) => item === m);
		return m.item;
	}
	dequeueMin() {
		const m = last(max$1(this.data, (a, b) => a.priority >= b.priority));
		if (m === void 0) return;
		this.removeWhere((item) => item.item === m);
		return m.item;
	}
	peekMax() {
		const m = last(max$1(this.data, (a, b) => a.priority >= b.priority));
		if (m === void 0) return;
		return m.item;
	}
	peekMin() {
		const m = last(min$1(this.data, (a, b) => a.priority >= b.priority));
		if (m === void 0) return;
		return m.item;
	}
};
/**
* Creates a {@link PriorityMutable} queue.
* 
* Options:
* * eq: Equality function
* * capacity: limit on number of items
* * discardPolicy: what to do if capacity is reached
* @param opts 
* @returns 
*/
function priority(opts = {}) {
	return new PriorityMutable(opts);
}

//#endregion
//#region ../packages/collections/src/map/map-immutable-fns.ts
/**
* Adds an array o [k,v] to the map, returning a new instance
* @param map Initial data
* @param data Data to add
* @returns New map with data added
*/
const addArray = (map, data) => {
	const x = new Map(map.entries());
	for (const d of data) {
		if (d[0] === void 0) throw new Error(`key cannot be undefined`);
		if (d[1] === void 0) throw new Error(`value cannot be undefined`);
		x.set(d[0], d[1]);
	}
	return x;
};
/**
* Adds objects to the map, returning a new instance
* @param map Initial data
* @param data Data to add
* @returns A new map with data added
*/
const addObjects = (map, data) => {
	const x = new Map(map.entries());
	for (const d of data) {
		if (d.key === void 0) throw new Error(`key cannot be undefined`);
		if (d.value === void 0) throw new Error(`value cannot be undefined`);
		x.set(d.key, d.value);
	}
	return x;
};
/**
* Returns true if map contains key
*
* @example
* ```js
* if (has(map, `London`)) ...
* ```
* @param map Map to search
* @param key Key to find
* @returns True if map contains key
*/
const has$1 = (map, key) => map.has(key);
/**
* Adds data to a map, returning the new map.
*
* Can add items in the form of [key,value] or {key, value}.
* @example These all produce the same result
* ```js
* map.set(`hello`, `samantha`);
* map.add([`hello`, `samantha`]);
* map.add({key: `hello`, value: `samantha`})
* ```
* @param map Initial data
* @param data One or more data to add in the form of [key,value] or {key, value}
* @returns New map with data added
*/
const add$1 = (map, ...data) => {
	if (map === void 0) throw new Error(`map parameter is undefined`);
	if (data === void 0) throw new Error(`data parameter i.s undefined`);
	if (data.length === 0) return map;
	const firstRecord = data[0];
	return typeof firstRecord.key !== `undefined` && typeof firstRecord.value !== `undefined` ? addObjects(map, data) : addArray(map, data);
};
/**
* Sets data in a copy of the initial map
* @param map Initial map
* @param key Key
* @param value Value to  set
* @returns New map with data set
*/
const set = (map, key, value) => {
	const x = new Map(map.entries());
	x.set(key, value);
	return x;
};
/**
* Delete a key from the map, returning a new map
* @param map Initial data
* @param key
* @returns New map with data deleted
*/
const del = (map, key) => {
	const x = new Map(map.entries());
	x.delete(key);
	return x;
};

//#endregion
//#region ../packages/collections/src/map/map.ts
/**
* Returns an {@link IMapImmutable}.
* Use {@link Maps.mutable} as a mutable alternatve.
*
* @example Basic usage
* ```js
* // Creating
* let m = map();
* // Add
* m = m.set("name", "sally");
* // Recall
* m.get("name");
* ```
*
* @example Enumerating
* ```js
* for (const [key, value] of map.entries()) {
*  console.log(`${key} = ${value}`);
* }
* ```
*
* @example Overview
* ```js
* // Create
* let m = map();
* // Add as array or key & value pair
* m = m.add(["name" , "sally"]);
* m = m.add({ key: "name", value: "sally" });
* // Add using the more typical set
* m = m.set("name", "sally");
* m.get("name");   // "sally";
* m.has("age");    // false
* m.has("name");   // true
* m.isEmpty;       // false
* m = m.delete("name");
* m.entries();     // Iterator of key value pairs
* ```
*
* Since it is immutable, `add()`, `delete()` and `clear()` return a new version with change.
*
* @param dataOrMap Optional initial data in the form of an array of `{ key: value }` or `[ key, value ]`
*/
const immutable$3 = (dataOrMap) => {
	if (dataOrMap === void 0) return immutable$3([]);
	if (Array.isArray(dataOrMap)) return immutable$3(add$1(/* @__PURE__ */ new Map(), ...dataOrMap));
	const data = dataOrMap;
	return {
		add: (...itemsToAdd) => {
			return immutable$3(add$1(data, ...itemsToAdd));
		},
		set: (key, value) => {
			return immutable$3(set(data, key, value));
		},
		get: (key) => data.get(key),
		delete: (key) => immutable$3(del(data, key)),
		clear: () => immutable$3(),
		has: (key) => data.has(key),
		entries: () => data.entries(),
		values: () => data.values(),
		isEmpty: () => data.size === 0
	};
};

//#endregion
//#region ../packages/collections/src/map/number-map.ts
/**
* Simple map for numbers.
* 
* Keys not present in map return the `defaultValue` given in the constructor
* ```js
* // All keys default to zero.
* const map = new Maps.NumberMap();
* map.get(`hello`); // 0
* ```
* 
* To check if a key is present, use `has`:
* ```js
* map.has(`hello`); // false
* ```
* 
* Math:
* ```js
* // Adds 1 by default to value of `hello`
* map.add(`hello`);         // 1
* map.multiply(`hello`, 2); // 2 
* 
* // Reset key to default value
* map.reset(`hello`); // 0
* ```
* 
* Different default value:
* ```js
* const map = new Maps.NumberMap(10);
* map.get(`hello`); // 10
* ```
* 
* Regular `set` works, overriding the value to whatever is given:
* ```js
* map.set(`hello`, 5);
* map.add(`hello`, 2); // 7
* ```
*/
var NumberMap = class extends Map {
	defaultValue;
	/**
	* Creates a NumberMap with default value of 0
	*/
	constructor(defaultValue = 0) {
		super();
		this.defaultValue = defaultValue;
	}
	/**
	* Gets the value at a key. If not found, returns the default value
	* @param key 
	* @returns 
	*/
	get(key) {
		const v = super.get(key);
		if (v === void 0) return this.defaultValue;
		return v;
	}
	/**
	* Resets the key's value to the default value
	* @param key 
	* @returns 
	*/
	reset(key) {
		super.set(key, this.defaultValue);
		return this.defaultValue;
	}
	/**
	* Multiplies the value of `key` by `amount`. If key is not found, it is treated as the default value.
	* The new value is set and returned.
	* @param key 
	* @param amount 
	* @returns 
	*/
	multiply(key, amount) {
		let value = super.get(key) ?? this.defaultValue;
		value *= amount;
		super.set(key, value);
		return value;
	}
	/**
	* Divides the value of `key` by `amount`. If key is not found, it is treated as the default value.
	* The new value is set and returned.
	* @param key 
	* @param amount 
	* @returns 
	*/
	divide(key, amount) {
		let value = super.get(key) ?? this.defaultValue;
		value /= amount;
		super.set(key, value);
		return value;
	}
	/**
	* Applies a function to all values
	* ```js
	* // Round all the values
	* map.mapValue((value,key)=> Math.round(value));
	* ```
	*/
	mapValue(fn) {
		for (const [key, value] of this.entries()) {
			const newValue = fn(value, key);
			super.set(key, newValue);
		}
	}
	/**
	* Returns the largest value in the map. If the map is empty, returns `NaN`.
	* ```js
	* // Eg find all the keys corresponding to the maximum value
	* const largestKeys = [...map.keysByValue(map.findValueMax())];
	* ```
	* @returns 
	*/
	findValueMax() {
		if (this.size === 0) return NaN;
		let maxValue = Number.MIN_VALUE;
		for (const value of this.values()) if (value > maxValue) maxValue = value;
		return maxValue;
	}
	/**
	* Returns the smallest value in the map. If the map is empty, returns `NaN`.
	* 
	* ```js
	* // Eg find all the keys corresponding to the minimum value
	* const smallestKeys = [...map.keysByValue(map.findValueMin())];
	* ```
	* @returns 
	*/
	findValueMin() {
		if (this.size === 0) return NaN;
		let minValue = Number.MAX_SAFE_INTEGER;
		for (const value of this.values()) if (value < minValue) minValue = value;
		return minValue;
	}
	/**
	* Iterates over all keys that have a corresponding value
	* @param v 
	*/
	*keysByValue(v) {
		for (const [key, value] of this.entries()) if (value === v) yield key;
	}
	/**
	* Iterates over entries, sorted by value. By default ascending order.
	*/
	*entriesSorted(sorter) {
		const entries = [...this.entries()];
		if (sorter) entries.sort(sorter);
		else entries.sort((a, b) => a[1] - b[1]);
		for (const entry of entries) yield entry;
	}
	/**
	* Iterates over all keys that have a value matching `fn`.
	* ```js
	* // Iterate over all keys that store a value greater than 1
	* const greaterThanOne = (v) => v > 1;
	* for (const key of map.filterKeysByValue(greaterThanOne)) {
	* }
	* ```
	* @param fn Predicate to test values 
	*/
	*filterKeysByValue(fn) {
		for (const [key, value] of this.entries()) if (fn(value)) yield key;
	}
	/**
	* Deletes a set of keys
	*/
	deleteKeys(keys) {
		let deleted = 0;
		for (const key of keys) if (super.delete(key)) deleted++;
		return deleted;
	}
	/**
	* Adds an amount to `key`'s value. If `key` is not found, it is treated as the default value. The new value is set and returned.
	* @param key 
	* @param amount 
	* @returns 
	*/
	add(key, amount = 1) {
		let value = super.get(key) ?? this.defaultValue;
		value += amount;
		super.set(key, value);
		return value;
	}
	/**
	* Subtracts an amount from `key`'s value. If `key` is not found, it is treated as the default value. The new value is set and returned.
	* @param key 
	* @param amount 
	* @returns 
	*/
	subtract(key, amount = 1) {
		let value = super.get(key) ?? this.defaultValue;
		value -= amount;
		super.set(key, value);
		return value;
	}
};

//#endregion
//#region ../packages/collections/src/table.ts
/**
* Stores values in a table of rows (vertical) and columns (horizontal)
*/
var Table = class {
	rows = [];
	rowLabels = [];
	colLabels = [];
	/**
	* Keep track of widest row
	*/
	columnMaxLength = 0;
	/**
	* Gets the label for a given column index,
	* returning _undefined_ if not found.
	* 
	* Case-sensitive
	* @param label Label to seek
	* @returns Index of column, or _undefined_ if not found
	*/
	getColumnLabelIndex(label) {
		for (const [index, l] of this.colLabels.entries()) if (l === label) return index;
	}
	/**
	* Gets the label for a given row index,
	* returning _undefined_ if not found.
	* 
	* Case-sensitive
	* @param label Label to seek
	* @returns Index of row, or _undefined_ if not found
	*/
	getRowLabelIndex(label) {
		for (const [index, l] of this.rowLabels.entries()) if (l === label) return index;
	}
	/**
	* Dumps the values of the table to the console
	*/
	print() {
		console.table([...this.rowsWithLabelsObject()]);
	}
	/**
	* Return a copy of table as nested array
	* 
	* ```js
	* const t = new Table();
	* // add stuff
	* // ...
	* const m = t.asArray();
	* for (const row of m) {
	*  for (const colValue of row) {
	*    // iterate over all column values for this row
	*  }
	* }
	* ```
	* 
	* Alternative: get value at row Y and column X
	* ```js
	* const value = m[y][x];
	* ```
	* @returns 
	*/
	asArray() {
		const r = [];
		for (const row of this.rows) if (row === void 0) r.push([]);
		else r.push([...row]);
		return r;
	}
	/**
	* Return the number of rows
	*/
	get rowCount() {
		return this.rows.length;
	}
	/**
	* Return the maximum number of columns in any row
	*/
	get columnCount() {
		return this.columnMaxLength;
	}
	/**
	* Iterates over the table row-wise, in object format.
	* @see {@link rowsWithLabelsArray} to get rows in array format
	*/
	*rowsWithLabelsObject() {
		for (let index = 0; index < this.rows.length; index++) yield this.getRowWithLabelsObject(index);
	}
	/**
	* Iterates over each row, including the labels if available
	* @see {@link rowsWithLabelsObject} to get rows in object format
	*/
	*rowsWithLabelsArray() {
		for (let index = 0; index < this.rows.length; index++) yield this.getRowWithLabelsArray(index);
	}
	/**
	* Assign labels to columns
	* @param labels 
	*/
	labelColumns(...labels) {
		this.colLabels = labels;
	}
	/**
	* Assign label to a specific column
	* First column has an index of 0
	* @param columnIndex 
	* @param label 
	*/
	labelColumn(columnIndex, label) {
		this.colLabels[columnIndex] = label;
	}
	/**
	* Label rows
	* @param labels Labels 
	*/
	labelRows(...labels) {
		this.rowLabels = labels;
	}
	/**
	* Assign label to a specific row
	* First row has an index of 0
	* @param rowIndex 
	* @param label 
	*/
	labelRow(rowIndex, label) {
		this.rowLabels[rowIndex] = label;
	}
	/**
	* Adds a new row
	* @param data Columns
	*/
	appendRow(...data) {
		this.columnMaxLength = Math.max(this.columnMaxLength, data.length);
		this.rows.push(data);
		return data;
	}
	/**
	* Gets a row along with labels, as an array
	* @param rowIndex 
	* @returns 
	*/
	getRowWithLabelsArray(rowIndex) {
		const row = this.rows.at(rowIndex);
		if (row === void 0) return void 0;
		return row.map((value, index) => [this.colLabels.at(index), value]);
	}
	/**
	* Return a row of objects. Keys use the column labels.
	* 
	* ```js
	* const row = table.getRowWithLabelsObject(10);
	* // eg:
	* // [{ colour: red, size: 10}, { colour: blue, size: 20 }]
	* ```
	* @param rowIndex 
	* @returns 
	*/
	getRowWithLabelsObject(rowIndex) {
		const row = this.rows.at(rowIndex);
		if (row === void 0) return void 0;
		const object = {};
		for (let index = 0; index < this.colLabels.length; index++) {
			const label = this.colLabels.at(index) ?? index.toString();
			object[label] = row[index];
		}
		return object;
	}
	/**
	* Gets or creates a row at given position
	* @param row Index or label of row 
	* @returns 
	*/
	#getOrCreateRawRow(row) {
		const index = typeof row === `number` ? row : this.getRowLabelIndex(row);
		if (index === void 0) return {
			success: false,
			error: `row-label-notfound`
		};
		if (index < 0) return {
			success: false,
			error: `row-index-invalid`
		};
		if (index < this.rows.length) return {
			success: true,
			value: this.rows[index]
		};
		const newRow = [];
		this.rows[index] = newRow;
		return {
			success: true,
			value: newRow
		};
	}
	/**
	* Gets a copy of values at given row, specified by index or label
	* @param row 
	* @returns Returns row or throws an error if label or index not found 
	*/
	row(row) {
		const r = this.#getRowRaw(row);
		if (resultIsError(r)) throw new Error(r.error);
		return [...r.value];
	}
	/**
	* Set the value of row,columm.
	* Row is created if it doesn't exist, with the other column values being _undefined_
	* @param row Index or label 
	* @param column Column 
	* @param value Value to set at row,column
	*/
	set(row, column, value) {
		const result = this.#getOrCreateRawRow(row);
		if (resultIsError(result)) throw new Error(result.error);
		const r = result.value;
		const columnIndex = typeof column === `number` ? column : this.getColumnLabelIndex(column);
		if (typeof columnIndex === `undefined`) throw new Error(`Column label '${column}' not found or is invalid`);
		if (columnIndex < 0) throw new Error(`Column index invalid (less than zero)`);
		r[columnIndex] = value;
	}
	/**
	* Gets the value at a specified row and column.
	* Throws an error if coordinates are out of range or missing.
	* @param row Row index or label
	* @param column Column index or label
	* @returns 
	*/
	get(row, column) {
		const rowR = this.#getRowRaw(row);
		if (resultIsError(rowR)) throw new Error(rowR.error);
		const colR = this.#getColumnRaw(rowR.value, column);
		if (resultIsError(colR)) throw new Error(colR.error);
		return colR.value.value;
	}
	#getRowRaw(row) {
		let index = 0;
		if (typeof row === `number`) index = row;
		else {
			index = this.getRowLabelIndex(row);
			if (typeof index !== `number`) return {
				error: `row-label-notfound`,
				success: false
			};
		}
		if (typeof index !== `number`) return {
			error: `row-invalid`,
			success: false
		};
		if (index < 0 || index >= this.rows.length) return {
			error: `row-index-out-of-range`,
			success: false
		};
		return {
			success: true,
			value: this.rows[index]
		};
	}
	#getColumnRaw(row, column) {
		const colIndex = typeof column === `number` ? column : this.getColumnLabelIndex(column);
		if (typeof colIndex !== `number`) return {
			success: false,
			error: `col-label-notfound`
		};
		if (colIndex < 0 || colIndex >= row.length) return {
			success: false,
			error: `col-index-out-of-range`
		};
		return {
			success: true,
			value: {
				index: colIndex,
				value: row[colIndex]
			}
		};
	}
	/**
	* Set all the columns of a row to a specified value.
	*
	* By default, sets the number of columns corresponding to
	* the table's maximum column length. To set an arbitrary
	* length of the row, use `length`
	* @param row Index or label of row
	* @param length How wide the row is. If unset, uses the current maximum width of rows.
	* @param value Value to set
	*/
	setRow(row, value, length) {
		const rowResult = this.#getOrCreateRawRow(row);
		if (resultIsError(rowResult)) throw new Error(rowResult.error);
		const r = rowResult.value;
		const width = typeof length === `number` ? length : this.columnMaxLength;
		for (let columnNumber = 0; columnNumber < width; columnNumber++) r[columnNumber] = value;
		return r;
	}
};

//#endregion
//#region ../packages/collections/src/graph/directed-graph.ts
var directed_graph_exports = /* @__PURE__ */ __exportAll({
	adjacentVertices: () => adjacentVertices$1,
	areAdjacent: () => areAdjacent,
	bfs: () => bfs,
	clone: () => clone,
	connect: () => connect$1,
	connectTo: () => connectTo$1,
	connectWithEdges: () => connectWithEdges$1,
	createVertex: () => createVertex$1,
	dfs: () => dfs,
	disconnect: () => disconnect,
	distance: () => distance,
	distanceDefault: () => distanceDefault,
	dumpGraph: () => dumpGraph$1,
	edges: () => edges,
	get: () => get,
	getCycles: () => getCycles,
	getOrCreate: () => getOrCreate$1,
	getOrFail: () => getOrFail,
	graph: () => graph$1,
	graphFromVertices: () => graphFromVertices,
	hasKey: () => hasKey,
	hasNoOuts: () => hasNoOuts,
	hasOnlyOuts: () => hasOnlyOuts,
	hasOut: () => hasOut,
	isAcyclic: () => isAcyclic,
	pathDijkstra: () => pathDijkstra,
	toAdjacencyMatrix: () => toAdjacencyMatrix$1,
	topologicalSort: () => topologicalSort,
	transitiveReduction: () => transitiveReduction,
	updateGraphVertex: () => updateGraphVertex$1,
	vertexHasOut: () => vertexHasOut,
	vertices: () => vertices
});
/**
* Create a vertex with given id
* @param id 
* @returns 
*/
const createVertex$1 = (id) => {
	return {
		id,
		out: []
	};
};
/**
* Returns _true_ if graph contains `key`.
* 
* ```js
* // Same as
* g.vertices.has(key)
* ```
* @param graph
* @param key 
* @returns 
*/
function hasKey(graph, key) {
	resultThrow(graphTest(graph));
	return graph.vertices.has(key);
}
/**
* Returns {@link Vertex} under `key`, or _undefined_
* if not found.
* 
* ```js
* // Same as
* g.vertices.get(key)
* ```
* @param graph 
* @param key 
* @returns 
*/
function get(graph, key) {
	resultThrow(graphTest(graph));
	resultThrow(stringTest(key, `non-empty`, `key`));
	return graph.vertices.get(key);
}
/**
* Returns the graph connections as an adjacency matrix
* @param graph 
* @returns 
*/
function toAdjacencyMatrix$1(graph) {
	resultThrow(graphTest(graph));
	const v = [...graph.vertices.values()];
	const table = new Table();
	table.labelColumns(...v.map((vv) => vv.id));
	table.labelRows(...v.map((vv) => vv.id));
	for (let i = 0; i < v.length; i++) {
		table.setRow(i, false, v.length);
		const ii = v[i];
		for (const [j, jj] of v.entries()) if (ii.out.some((o) => o.id === jj.id)) table.set(i, j, true);
	}
	return table;
}
/**
* Return a string representation of the graph for debug inspection
* @param graph 
* @returns 
*/
const dumpGraph$1 = (graph) => {
	return debugGraphToArray$1(graph).join(`\n`);
};
/**
* Return an array of a debug-print of every vertex.
* @param graph 
* @returns 
*/
const debugGraphToArray$1 = (graph) => {
	const r = [];
	const vertices = `vertices` in graph ? graph.vertices.values() : graph;
	for (const v of vertices) {
		const str = debugDumpVertex(v);
		r.push(...str.map((line) => ` ${line}`));
	}
	return r;
};
/**
* Returns the weight of an edge, or 1 if undefined.
* @param graph
* @param edge 
* @returns 
*/
const distance = (graph, edge) => {
	if (edge.weight !== void 0) return edge.weight;
	return 1;
};
/**
* Iterate over all the edges in the graph
* @param graph 
*/
function* edges(graph) {
	resultThrow(graphTest(graph));
	const vertices = [...graph.vertices.values()];
	for (const vertex of vertices) for (const edge of vertex.out) yield edge;
}
/**
* Iterate over all the vertices of the graph
* @param graph 
*/
function* vertices(graph) {
	resultThrow(graphTest(graph));
	const vertices = [...graph.vertices.values()];
	for (const vertex of vertices) yield vertex;
}
function graphTest(g, parameterName = `graph`) {
	if (g === void 0) return {
		success: false,
		error: `Param '${parameterName}' is undefined. Expected Graph`
	};
	if (g === null) return {
		success: false,
		error: `Param '${parameterName}' is null. Expected Graph`
	};
	if (typeof g === `object`) {
		if (!(`vertices` in g)) return {
			success: false,
			error: `Param '${parameterName}.vertices' does not exist. Is it a Graph type?`
		};
	} else return {
		success: false,
		error: `Param '${parameterName} is type '${typeof g}'. Expected an object Graph`
	};
	return {
		success: true,
		value: g
	};
}
/**
* Iterate over all the vertices connected to `context` vertex
* @param graph Graph
* @param context id or Vertex.
* @returns 
*/
function* adjacentVertices$1(graph, context) {
	resultThrow(graphTest(graph));
	if (context === void 0) return;
	const vertex = typeof context === `string` ? graph.vertices.get(context) : context;
	if (vertex === void 0) throw new Error(`Vertex not found ${JSON.stringify(context)}`);
	for (const edge of vertex.out) {
		const edgeV = graph.vertices.get(edge.id);
		if (edgeV === void 0) throw new Error(`Could not find vertex: ${edge.id}`);
		yield edgeV;
	}
}
/**
* Returns _true_ if `vertex` has an outgoing connection to
* the supplied id or vertex.
* 
* If `vertex` is undefined, _false_ is returned.
* @param vertex From vertex
* @param outIdOrVertex To vertex
* @returns 
*/
const vertexHasOut = (vertex, outIdOrVertex) => {
	if (vertex === void 0) return false;
	const outId = typeof outIdOrVertex === `string` ? outIdOrVertex : outIdOrVertex.id;
	return vertex.out.some((edge) => edge.id === outId);
};
/**
* Returns _true_ if `vertex` has no outgoing connections
* @param graph 
* @param vertex 
* @returns 
*/
const hasNoOuts = (graph, vertex) => {
	resultThrow(graphTest(graph));
	const context = typeof vertex === `string` ? graph.vertices.get(vertex) : vertex;
	if (context === void 0) return false;
	return context.out.length === 0;
};
/**
* Returns _true_ if `vertex` only has the given list of vertices.
* Returns _false_ early if the length of the list does not match up with `vertex.out`
* @param graph 
* @param vertex 
* @param outIdOrVertex 
* @returns 
*/
const hasOnlyOuts = (graph, vertex, ...outIdOrVertex) => {
	resultThrow(graphTest(graph));
	const context = resolveVertex$1(graph, vertex);
	const outs = outIdOrVertex.map((o) => resolveVertex$1(graph, o));
	if (outs.length !== context.out.length) return false;
	for (const out of outs) if (!hasOut(graph, context, out)) return false;
	return true;
};
/**
* Returns _true_ if `vertex` has an outgoing connection to the given vertex.
* @param graph 
* @param vertex 
* @param outIdOrVertex 
* @returns 
*/
const hasOut = (graph, vertex, outIdOrVertex) => {
	resultThrow(graphTest(graph));
	const context = resolveVertex$1(graph, vertex);
	const outId = typeof outIdOrVertex === `string` ? outIdOrVertex : outIdOrVertex.id;
	return context.out.some((edge) => edge.id === outId);
};
/**
* Gets a vertex by id, creating it if it does not exist.
* @param graph 
* @param id 
* @returns 
*/
const getOrCreate$1 = (graph, id) => {
	resultThrow(graphTest(graph));
	const v = graph.vertices.get(id);
	if (v !== void 0) return {
		graph,
		vertex: v
	};
	const vv = createVertex$1(id);
	return {
		graph: updateGraphVertex$1(graph, vv),
		vertex: vv
	};
};
/**
* Gets a vertex by id, throwing an error if it does not exist
* @param graph 
* @param id 
* @returns 
*/
const getOrFail = (graph, id) => {
	resultThrow(graphTest(graph));
	const v = graph.vertices.get(id);
	if (v === void 0) throw new Error(`Vertex '${id}' not found in graph`);
	return v;
};
/**
* Updates a vertex by returning a mutated graph
* @param graph Graph
* @param vertex Newly changed vertex
* @returns 
*/
const updateGraphVertex$1 = (graph, vertex) => {
	resultThrow(graphTest(graph));
	return {
		...graph,
		vertices: graph.vertices.set(vertex.id, vertex)
	};
};
/**
* Default distance computer. Uses `weight` property of edge, or `1` if not found.
* @param graph 
* @param edge 
* @returns 
*/
const distanceDefault = (graph, edge) => {
	if (edge.weight !== void 0) return edge.weight;
	return 1;
};
/**
* Returns a mutation of `graph`, with a given edge removed.
* 
* If edge was not there, original graph is returned.
* @param graph 
* @param from 
* @param to 
* @returns 
*/
function disconnect(graph, from, to) {
	resultThrow(graphTest(graph));
	const fromV = resolveVertex$1(graph, from);
	const toV = resolveVertex$1(graph, to);
	return hasOut(graph, fromV, toV) ? updateGraphVertex$1(graph, {
		...fromV,
		out: fromV.out.filter((t) => t.id !== toV.id)
	}) : graph;
}
/**
* Make a connection between two vertices with a given weight.
* It returns the new graph as wll as the created edge.
* @param graph 
* @param from 
* @param to 
* @param weight 
* @returns 
*/
function connectTo$1(graph, from, to, weight) {
	resultThrow(graphTest(graph));
	const fromResult = getOrCreate$1(graph, from);
	graph = fromResult.graph;
	const toResult = getOrCreate$1(graph, to);
	graph = toResult.graph;
	const edge = {
		id: to,
		weight
	};
	if (!hasOut(graph, fromResult.vertex, toResult.vertex)) graph = updateGraphVertex$1(graph, {
		...fromResult.vertex,
		out: [...fromResult.vertex.out, edge]
	});
	return {
		graph,
		edge
	};
}
/**
* Connect from -> to. Same as {@link connectWithEdges}, but this version just returns the graph.
* 
* By default unidirectional, meaning a connection is made only from->to. Use `bidi` option to set a bidirection connection, adding also to->from.
* 
* Returns a result of `{ graph, edges }`, where `graph` is the new {@link DirectedGraph} and `edges`
* is an array of {@link Edge Edges}. One for unidirectional, or two for bidirectional.
* @param graph 
* @param options 
* @returns 
*/
function connect$1(graph, options) {
	if (typeof graph !== `object`) throw new TypeError(`Param 'graph' is expected to be a DirectedGraph object. Got: ${typeof graph}`);
	if (typeof options !== `object`) throw new TypeError(`Param 'options' is expected to be ConnectOptions object. Got: ${typeof options}`);
	return connectWithEdges$1(graph, options).graph;
}
/**
* Connect from -> to. Same as {@link connect} except you get back the edges as well. 
* 
* By default unidirectional, meaning a connection is made only from->to. Use `bidi` option to set a bidirection connection, adding also to->from.
* 
* Returns a result of `{ graph, edges }`, where `graph` is the new {@link DirectedGraph} and `edges`
* is an array of {@link Edge Edges}. One for unidirectional, or two for bidirectional.
* @param graph 
* @param options 
* @returns 
*/
function connectWithEdges$1(graph, options) {
	resultThrow(graphTest(graph));
	const { to, weight, from } = options;
	const bidi = options.bidi ?? false;
	const toList = Array.isArray(to) ? to : [to];
	const edges = [];
	for (const toSingle of toList) {
		const result = connectTo$1(graph, from, toSingle, weight);
		graph = result.graph;
		edges.push(result.edge);
	}
	if (!bidi) return {
		graph,
		edges
	};
	for (const toSingle of toList) {
		const result = connectTo$1(graph, toSingle, from, weight);
		graph = result.graph;
		edges.push(result.edge);
	}
	return {
		graph,
		edges
	};
}
/**
* Returns an array of debug-representations for the given vertex.
* @param v 
* @returns 
*/
const debugDumpVertex = (v) => {
	const r = [v.id];
	const stringForEdge = (edge) => edge.weight === void 0 ? edge.id : `${edge.id} (${edge.weight})`;
	for (const edge of v.out) r.push(` -> ${stringForEdge(edge)}`);
	if (v.out.length === 0) r[0] += ` (terminal)`;
	return r;
};
/**
* Returns _true_ if a->b or b->a
* @param graph 
* @param a 
* @param b 
* @returns 
*/
function areAdjacent(graph, a, b) {
	resultThrow(graphTest(graph));
	if (hasOut(graph, a, b.id)) return true;
	if (hasOut(graph, b, a.id)) return true;
}
/**
* Resolves the id or vertex into a Vertex.
* throws an error if vertex is not found
* @param graph 
* @param idOrVertex 
* @returns 
*/
function resolveVertex$1(graph, idOrVertex) {
	resultThrow(graphTest(graph));
	if (idOrVertex === void 0) throw new Error(`Param 'idOrVertex' is undefined. Expected string or Vertex`);
	const v = typeof idOrVertex === `string` ? graph.vertices.get(idOrVertex) : idOrVertex;
	if (v === void 0) throw new Error(`Id not found ${idOrVertex}`);
	return v;
}
/**
* Iterates over vertices from a starting vertex in an bread-first-search
* @param graph 
* @param startIdOrVertex 
* @param targetIdOrVertex 
* @returns 
*/
function* bfs(graph, startIdOrVertex, targetIdOrVertex) {
	resultThrow(graphTest(graph));
	const start = resolveVertex$1(graph, startIdOrVertex);
	const target = targetIdOrVertex === void 0 ? void 0 : resolveVertex$1(graph, targetIdOrVertex);
	const queue = new QueueMutable();
	const seen = /* @__PURE__ */ new Set();
	queue.enqueue(start);
	while (!queue.isEmpty) {
		const v = queue.dequeue();
		yield v;
		if (target !== void 0 && target === v) return;
		for (const edge of adjacentVertices$1(graph, v)) if (!seen.has(edge.id)) {
			seen.add(edge.id);
			queue.enqueue(resolveVertex$1(graph, edge.id));
		}
	}
}
/**
* Iterates over vertices from a starting vertex in an depth-first-search
* @param graph 
* @param startIdOrVertex 
*/
function* dfs(graph, startIdOrVertex) {
	resultThrow(graphTest(graph));
	const source = resolveVertex$1(graph, startIdOrVertex);
	const s = new StackMutable();
	const seen = /* @__PURE__ */ new Set();
	s.push(source);
	while (!s.isEmpty) {
		const v = s.pop();
		if (v === void 0) continue;
		if (!seen.has(v.id)) {
			seen.add(v.id);
			yield v;
			for (const edge of v.out) {
				const destination = graph.vertices.get(edge.id);
				if (destination) s.push(destination);
			}
		}
	}
}
/**
* Compute shortest distance from the source vertex to the rest of the graph.
* @param graph 
* @param sourceOrId 
* @returns 
*/
const pathDijkstra = (graph, sourceOrId) => {
	resultThrow(graphTest(graph));
	const source = typeof sourceOrId === `string` ? graph.vertices.get(sourceOrId) : sourceOrId;
	if (source === void 0) throw new Error(`source vertex not found`);
	const distances = /* @__PURE__ */ new Map();
	const previous = /* @__PURE__ */ new Map();
	distances.set(source.id, 0);
	const pq = new PriorityMutable();
	const vertices = [...graph.vertices.values()];
	for (const v of vertices) {
		if (v.id !== source.id) {
			distances.set(v.id, Number.MAX_SAFE_INTEGER);
			previous.set(v.id, null);
		}
		pq.enqueueWithPriority(v.id, Number.MAX_SAFE_INTEGER);
	}
	while (!pq.isEmpty) {
		const u = pq.dequeueMin();
		if (u === void 0) throw new Error(`Bug. Queue unexpectedly empty`);
		const vertexU = graph.vertices.get(u);
		for (const neighbour of vertexU.out) {
			const alt = distances.get(u) + distance(graph, neighbour);
			if (alt < distances.get(neighbour.id)) {
				distances.set(neighbour.id, alt);
				previous.set(neighbour.id, vertexU);
				pq.changePriority(neighbour.id, alt, true);
			}
		}
	}
	const pathTo = (id) => {
		const path = [];
		while (true) {
			if (id === source.id) break;
			const v = previous.get(id);
			if (v === void 0 || v === null) throw new Error(`Id not present: ${id}`);
			path.push({
				id,
				weight: distances.get(id)
			});
			id = v.id;
		}
		return path;
	};
	return {
		distances,
		previous,
		pathTo
	};
};
/**
* Clones the graph. Uses shallow clone, because it's all immutable
* @param graph 
* @returns 
*/
const clone = (graph) => {
	resultThrow(graphTest(graph));
	return { vertices: immutable$3([...graph.vertices.entries()]) };
};
/**
* Create a graph
* ```js
* let g = graph();
* ```
* 
* Can optionally provide initial connections:
* ```js
* let g = graph(
*  { from: `a`, to: `b` },
*  { from: `b`, to: `c` }
* )
* ```
* @param initialConnections 
* @returns 
*/
const graph$1 = (...initialConnections) => {
	let g = { vertices: immutable$3() };
	for (const ic of initialConnections) g = connect$1(g, ic);
	return g;
};
/**
* Returns _true_ if the graph contains is acyclic - that is, it has no loops
* @param graph 
*/
function isAcyclic(graph) {
	resultThrow(graphTest(graph));
	return getCycles(graph).length === 0;
}
/**
* Topological sort using Kahn's algorithm.
* Returns a new graph that is sorted
* @param graph 
*/
function topologicalSort(graph) {
	resultThrow(graphTest(graph));
	const indegrees = new NumberMap(0);
	for (const edge of edges(graph)) indegrees.add(edge.id, 1);
	const queue = new QueueMutable();
	let vertexCount = 0;
	for (const vertex of vertices(graph)) {
		if (indegrees.get(vertex.id) === 0) queue.enqueue(vertex);
		vertexCount++;
	}
	const topOrder = [];
	while (!queue.isEmpty) {
		const u = queue.dequeue();
		topOrder.push(u);
		for (const neighbour of u.out) if (indegrees.subtract(neighbour.id, 1) === 0) queue.enqueue(graph.vertices.get(neighbour.id));
	}
	if (topOrder.length !== vertexCount) throw new Error(`Graph contains cycles`);
	return graphFromVertices(topOrder);
}
/**
* Create a graph from an iterable of vertices
* @param vertices 
* @returns 
*/
function graphFromVertices(vertices) {
	return { vertices: immutable$3([...map(vertices, (f) => {
		return [f.id, f];
	})]) };
}
/**
* Get all the cycles ('strongly-connected-components') within the graph
* [Read more](https://en.wikipedia.org/wiki/Strongly_connected_component)
* @param graph 
* @returns 
*/
function getCycles(graph) {
	resultThrow(graphTest(graph));
	let index = 0;
	const stack = new StackMutable();
	const vertices = /* @__PURE__ */ new Map();
	const scc = [];
	for (const v of graph.vertices.values()) vertices.set(v.id, {
		...v,
		lowlink: NaN,
		index: NaN,
		onStack: false
	});
	const strongConnect = (vertex) => {
		vertex.index = index;
		vertex.lowlink = index;
		index++;
		stack.push(vertex);
		vertex.onStack = true;
		for (const edge of vertex.out) {
			const edgeV = vertices.get(edge.id);
			if (Number.isNaN(edgeV.index)) {
				strongConnect(edgeV);
				vertex.lowlink = Math.min(vertex.lowlink, edgeV.lowlink);
			} else if (edgeV.onStack) vertex.lowlink = Math.min(vertex.lowlink, edgeV.lowlink);
		}
		if (vertex.lowlink === vertex.index) {
			const stronglyConnected = [];
			let w;
			while (vertex !== w) {
				w = stack.pop();
				w.onStack = false;
				stronglyConnected.push({
					id: w.id,
					out: w.out
				});
			}
			if (stronglyConnected.length > 1) scc.push(stronglyConnected);
		}
	};
	for (const v of vertices.values()) if (Number.isNaN(v.index)) strongConnect(v);
	return scc;
}
/**
* Returns a new graph which is transitively reduced.
* That is, redundant edges are removed
* @param graph 
* @returns 
*/
function transitiveReduction(graph) {
	resultThrow(graphTest(graph));
	for (const u of vertices(graph)) for (const v of adjacentVertices$1(graph, u)) for (const v1 of dfs(graph, v)) {
		if (v.id === v1.id) continue;
		if (hasOut(graph, u, v1)) return transitiveReduction(disconnect(graph, u, v1));
	}
	return graph;
}

//#endregion
//#region ../packages/collections/src/graph/undirected-graph.ts
var undirected_graph_exports = /* @__PURE__ */ __exportAll({
	adjacentVertices: () => adjacentVertices,
	connect: () => connect,
	connectTo: () => connectTo,
	connectWithEdges: () => connectWithEdges,
	createVertex: () => createVertex,
	dumpGraph: () => dumpGraph,
	edgesForVertex: () => edgesForVertex,
	getConnection: () => getConnection,
	getOrCreate: () => getOrCreate,
	graph: () => graph,
	hasConnection: () => hasConnection,
	toAdjacencyMatrix: () => toAdjacencyMatrix,
	updateGraphVertex: () => updateGraphVertex
});
const createVertex = (id) => {
	return { id };
};
const updateGraphVertex = (graph, vertex) => {
	return {
		...graph,
		vertices: graph.vertices.set(vertex.id, vertex)
	};
};
const getOrCreate = (graph, id) => {
	const v = graph.vertices.get(id);
	if (v !== void 0) return {
		graph,
		vertex: v
	};
	const vv = createVertex(id);
	return {
		graph: updateGraphVertex(graph, vv),
		vertex: vv
	};
};
function resolveVertex(graph, idOrVertex) {
	if (typeof idOrVertex !== `string` && typeof idOrVertex !== `object`) throw new TypeError(`Param 'idOrVertex' is undefined. Expected string or Vertex. Got: ${typeof idOrVertex}`);
	if (typeof graph !== `object`) throw new TypeError(`Param 'graph' is expected to be object. Got: ${typeof graph}`);
	const v = typeof idOrVertex === `string` ? graph.vertices.get(idOrVertex) : idOrVertex;
	if (v === void 0) throw new Error(`Id not found ${idOrVertex}`);
	return v;
}
/**
* Returns _true/false_ if there is a connection between `a` and `b` in `graph`.
* Use {@link getConnection} if you want to the edge.
* @param graph Graph to search 
* @param a
* @param b
* @returns _true_ if edge exists 
*/
const hasConnection = (graph, a, b) => {
	return getConnection(graph, a, b) !== void 0;
};
/**
* Gets the connection, if it exists between `a` and `b` in `graph`.
* If it doesn't exist, _undefined_ is returned.
* Use {@link hasConnection} for a simple true/false if edge exists.
* @param graph Graph
* @param a 
* @param b 
* @returns 
*/
const getConnection = (graph, a, b) => {
	const aa = resolveVertex(graph, a);
	const bb = resolveVertex(graph, b);
	for (const edge of graph.edges) {
		if (edge.a == aa.id && edge.b === bb.id) return edge;
		if (edge.a == bb.id && edge.b === aa.id) return edge;
	}
};
/**
* Connects A with B, returning the changed graph and created edge.
* If the connection already exists, the original graph & edge is returned.
* @param graph 
* @param a 
* @param b 
* @param weight 
* @returns 
*/
function connectTo(graph, a, b, weight) {
	graph = getOrCreate(graph, a).graph;
	graph = getOrCreate(graph, b).graph;
	let edge = getConnection(graph, a, b);
	if (edge !== void 0) return {
		graph,
		edge
	};
	edge = {
		a,
		b,
		weight
	};
	return {
		graph: {
			...graph,
			edges: [...graph.edges, edge]
		},
		edge
	};
}
/**
* Makes a connection between `options.a` and one or more nodes in `options.b`.
* Same as {@link connectWithEdges} but only the {@link Graph} is returned.
* 
* ```js
* let g = graph(); // Create an empty graph
* // Make a connection between `red` and `orange`
* g = connect(g, { a: `red`, b: `orange` });
* 
* // Make a connection between `red` and `orange as well as `red` and `yellow`.
* g = connect(g, { a: `red`, b: [`orange`, `yellow`] })
* ```
* @param graph Initial graph
* @param options Options
*/
function connect(graph, options) {
	return connectWithEdges(graph, options).graph;
}
/**
* Makes a connection between `options.a` and one or more nodes in `options.b`.
* Same as {@link connect} but graph and edges are returned.
* 
* ```js
* let g = graph(); // Create an empty graph
* 
* // Make a connection between `red` and `orange`
* result = connectWithEdges(g, { a: `red`, b: `orange` });
* 
* // Make a connection between `red` and `orange as well as `red` and `yellow`.
* result = connectWithEdges(g, { a: `red`, b: [`orange`, `yellow`] })
* ```
* @param graph Initial graph
* @param options Options
*/
function connectWithEdges(graph, options) {
	const { a, weight, b } = options;
	const destinations = Array.isArray(b) ? b : [b];
	const edges = [];
	for (const destination of destinations) {
		const result = connectTo(graph, a, destination, weight);
		graph = result.graph;
		edges.push(result.edge);
	}
	return {
		graph,
		edges
	};
}
const graph = (...initialConnections) => {
	let g = {
		vertices: immutable$3(),
		edges: []
	};
	for (const ic of initialConnections) g = connect(g, ic);
	return g;
};
function toAdjacencyMatrix(graph) {
	const v = [...graph.vertices.values()];
	const table = new Table();
	table.labelColumns(...v.map((vv) => vv.id));
	table.labelRows(...v.map((vv) => vv.id));
	for (let i = 0; i < v.length; i++) {
		table.setRow(i, false, v.length);
		const ii = v[i];
		for (const [j, jj] of v.entries()) if (hasConnection(graph, ii, jj)) table.set(i, j, true);
	}
	return table;
}
/**
* Return a string representation of the graph for debug inspection
* @param graph 
* @returns 
*/
const dumpGraph = (graph) => {
	return debugGraphToArray(graph).join(`\n`);
};
/**
* Return an array of a debug-print of every vertex.
* @param graph 
* @returns 
*/
const debugGraphToArray = (graph) => {
	const r = [];
	r.push(`Vertices: ${[...graph.vertices.values()].map((v) => v.id).join(`, `)}`);
	r.push(`Edges:`);
	for (const edge of graph.edges) r.push(stringForEdge(edge));
	return r;
};
const stringForEdge = (edge) => {
	const weight = edge.weight ? ` (${edge.weight})` : ``;
	return `${edge.a} <-> ${edge.b}${weight}`;
};
/**
* Iterate over all the vertices connectd to `context` vertex
* 
* If `context` is _undefined_, returns nothing
* @param graph Graph
* @param context id or Vertex
* @returns 
*/
function* adjacentVertices(graph, context) {
	if (typeof context === `undefined`) return;
	if (typeof (typeof context === `string` ? graph.vertices.get(context) : context) === `undefined`) throw new Error(`Vertex not found ${JSON.stringify(context)}`);
	for (const edge of graph.edges) if (edge.a === context) yield resolveVertex(graph, edge.b);
	else if (edge.b === context) yield resolveVertex(graph, edge.a);
}
/**
* Get all the edges for a vertex.
* 
* ```js
* // Iterate all edges for vertex with id '0'
* for (const edge of edgesForVertex(graph, '0')) {
* }
* ```
* 
* If the vertex has no edges, no values are returned. If the vertex was not found in the graph, an error is thrown.
* @throws Throws an error if `context` was not found, if it's _undefined_ or `graph` is invalid.
* @param graph 
* @param context 
* @returns 
*/
function* edgesForVertex(graph, context) {
	if (typeof graph !== `object`) throw new TypeError(`Param 'graph' is expected to be an object. Got: ${typeof graph}`);
	if (typeof context === `undefined`) return;
	if (typeof (typeof context === `string` ? graph.vertices.get(context) : context) === `undefined`) throw new Error(`Vertex not found ${JSON.stringify(context)}`);
	for (const edge of graph.edges) if (edge.a === context) yield edge;
	else if (edge.b === context) yield edge;
}

//#endregion
//#region ../packages/collections/src/graph/index.ts
var graph_exports = /* @__PURE__ */ __exportAll({
	Directed: () => directed_graph_exports,
	Undirected: () => undirected_graph_exports
});

//#endregion
//#region ../packages/collections/src/map/expiring-map.ts
/**
* Create a ExpiringMap instance
* @param options Options when creating map
* @returns
*/
const create$2 = (options = {}) => new ExpiringMap(options);
/***
* A map that can have a capacity limit. The elapsed time for each get/set
* operation is maintained allowing for items to be automatically removed.
* `has()` does not affect the last access time.
*
* By default, it uses the `none` eviction policy, meaning that when full
* an error will be thrown if attempting to add new keys.
*
* Eviction policies:
* `oldestGet` removes the item that hasn't been accessed the longest,
* `oldestSet` removes the item that hasn't been updated the longest.
*
* ```js
* const map = new ExpiringMap();
* map.set(`fruit`, `apple`);
*
* // Remove all entries that were set more than 100ms ago
* map.deleteWithElapsed(100, `set`);
* // Remove all entries that were last accessed more than 100ms ago
* map.deleteWithElapsed(100, `get`);
* // Returns the elapsed time since `fruit` was last accessed
* map.elapsedGet(`fruit`);
* // Returns the elapsed time since `fruit` was last set
* map.elapsedSet(`fruit`);
* ```
*
* Last set/get time for a key can be manually reset using {@link touch}.
*
*
* Events:
* * 'expired': when an item is automatically removed.
* * 'removed': when an item is manually or automatically removed due to expiry. Note: does not fire when .clear() is called
* * 'newKey': when a new key is added
*
* ```js
* map.addEventListener(`expired`, evt => {
*  const { key, value } = evt;
* });
* ```
* The map can automatically remove items based on elapsed intervals.
*
* @example
* Automatically delete items that haven't been accessed for one second
* ```js
* const map = new ExpiringMap({
*  autoDeleteElapsed: 1000,
*  autoDeletePolicy: `get`
* });
* ```
*
* @example
* Automatically delete the oldest item if we reach a capacity limit
* ```js
* const map = new ExpiringMap({
*  capacity: 5,
*  evictPolicy: `oldestSet`
* });
* ```
* @typeParam K - Type of keys
* @typeParam V - Type of values
*/
var ExpiringMap = class extends SimpleEventEmitter {
	capacity;
	store;
	evictPolicy;
	autoDeleteElapsedMs;
	autoDeletePolicy;
	autoDeleteTimer;
	disposed = false;
	constructor(opts = {}) {
		super();
		this.capacity = opts.capacity ?? -1;
		resultThrow(integerTest(this.capacity, `nonZero`, `capacity`));
		this.store = /* @__PURE__ */ new Map();
		if (opts.evictPolicy && this.capacity <= 0) throw new Error(`evictPolicy is set, but no capacity limit is set`);
		this.evictPolicy = opts.evictPolicy ?? `none`;
		this.autoDeleteElapsedMs = opts.autoDeleteElapsedMs ?? -1;
		this.autoDeletePolicy = opts.autoDeletePolicy ?? `none`;
		if (this.autoDeleteElapsedMs > 0) this.autoDeleteTimer = setInterval(() => {
			this.#maintain();
		}, Math.max(1e3, this.autoDeleteElapsedMs * 2));
	}
	dispose() {
		if (this.disposed) return;
		this.disposed = true;
		if (this.autoDeleteTimer) {
			clearInterval(this.autoDeleteTimer);
			this.autoDeleteTimer = void 0;
		}
	}
	/**
	* Returns the number of keys being stored.
	*/
	get keyLength() {
		return this.store.size;
	}
	*entries() {
		for (const entry of this.store.entries()) yield [entry[0], entry[1].value];
	}
	*values() {
		for (const v of this.store.values()) yield v.value;
	}
	*keys() {
		yield* this.store.keys();
	}
	/**
	* Returns the elapsed time since `key`
	* was set. Returns _undefined_ if `key`
	* does not exist
	*/
	elapsedSet(key) {
		const v = this.store.get(key);
		if (typeof v === `undefined`) return;
		return Date.now() - v.lastSet;
	}
	/**
	* Returns the elapsed time since `key`
	* was accessed. Returns _undefined_ if `key`
	* does not exist
	*/
	elapsedGet(key) {
		const v = this.store.get(key);
		if (typeof v === `undefined`) return;
		return Date.now() - v.lastGet;
	}
	/**
	* Returns true if `key` is stored.
	* Does not affect the key's last access time.
	* @param key
	* @returns
	*/
	has(key) {
		return this.store.has(key);
	}
	/**
	* Gets an item from the map by key, returning
	* undefined if not present
	* @param key Key
	* @returns Value, or undefined
	*/
	get(key) {
		const v = this.store.get(key);
		if (v) {
			if (this.autoDeletePolicy === `either` || this.autoDeletePolicy === `get`) this.store.set(key, {
				...v,
				lastGet: performance.now()
			});
			return v.value;
		}
	}
	/**
	* Deletes the value under `key`, if present.
	*
	* Returns _true_ if something was removed.
	* @param key
	* @returns
	*/
	delete(key) {
		const value = this.store.get(key);
		if (!value) return false;
		const d = this.store.delete(key);
		this.fireEvent(`removed`, {
			key,
			value: value.value
		});
		return d;
	}
	/**
	* Clears the contents of the map.
	* Note: does not fire `removed` event
	*/
	clear() {
		this.store.clear();
	}
	/**
	* Updates the lastSet/lastGet time for a value
	* under `key`. If key was not found, nothing happens.
	*
	* Returns _false_ if key was not found
	* @param key
	* @returns
	*/
	touch(key) {
		const v = this.store.get(key);
		if (!v) return false;
		this.store.set(key, {
			...v,
			lastSet: Date.now(),
			lastGet: Date.now()
		});
		return true;
	}
	findEvicteeKey() {
		if (this.evictPolicy === `none`) return;
		let sortBy = ``;
		if (this.evictPolicy === `oldestGet`) sortBy = `lastGet`;
		else if (this.evictPolicy === `oldestSet`) sortBy = `lastSet`;
		else throw new Error(`Unknown eviction policy ${this.evictPolicy}`);
		return sortByValueProperty(this.store, sortBy)[0][0];
	}
	#maintain() {
		if (this.autoDeletePolicy === `none`) return;
		this.deleteWithElapsed(this.autoDeleteElapsedMs, this.autoDeletePolicy);
	}
	/**
	* Deletes all values where elapsed time has past
	* for get/set or either.
	* ```js
	* // Delete all keys (and associated values) not accessed for a minute
	* em.deleteWithElapsed({mins:1}, `get`);
	* // Delete things that were set 1s ago
	* em.deleteWithElapsed(1000, `set`);
	* ```
	* 
	* @param interval Interval
	* @param property Basis for deletion 'get','set' or 'either'
	* @returns Items removed
	*/
	deleteWithElapsed(interval, property) {
		const entries = [...this.store.entries()];
		const prune = [];
		const intervalMs = intervalToMs(interval, 1e3);
		const now = performance.now();
		for (const entry of entries) {
			const elapsedGet = now - entry[1].lastGet;
			const elapsedSet = now - entry[1].lastSet;
			if ((property === `get` ? elapsedGet : property === `set` ? elapsedSet : Math.max(elapsedGet, elapsedSet)) >= intervalMs) prune.push([entry[0], entry[1].value]);
		}
		for (const entry of prune) {
			this.store.delete(entry[0]);
			const eventArguments = {
				key: entry[0],
				value: entry[1]
			};
			this.fireEvent(`expired`, eventArguments);
			this.fireEvent(`removed`, eventArguments);
		}
		return prune;
	}
	/**
	* Sets the `key` to be `value`.
	*
	* If the key already exists, it is updated.
	*
	* If the map is full, according to its capacity,
	* another value is selected for removal.
	* @param key
	* @param value
	* @returns
	*/
	set(key, value) {
		const existing = this.store.get(key);
		if (existing) {
			this.store.set(key, {
				...existing,
				lastSet: performance.now()
			});
			return;
		}
		if (this.keyLength === this.capacity && this.capacity > 0) {
			const key = this.findEvicteeKey();
			if (!key) throw new Error(`ExpiringMap full (capacity: ${this.capacity})`);
			const existing = this.store.get(key);
			this.store.delete(key);
			if (existing) {
				const eventArguments = {
					key,
					value: existing.value
				};
				this.fireEvent(`expired`, eventArguments);
				this.fireEvent(`removed`, eventArguments);
			}
		}
		this.store.set(key, {
			lastGet: 0,
			lastSet: performance.now(),
			value
		});
		this.fireEvent(`newKey`, {
			key,
			value
		});
	}
};

//#endregion
//#region ../packages/collections/src/map/map-multi-fns.ts
/**
* Finds first entry by iterable value. Expects a map with an iterable as values.
*
* ```js
* const map = new Map();
* map.set('hello', ['a', 'b', 'c']);
* map.set('there', ['d', 'e', 'f']);
*
* const entry = firstEntry(map, (value, key) => {
*  return (value === 'e');
* });
* // Entry is: ['there', ['d', 'e', 'f']]
* ```
*
* An alternative is {@link firstEntryByValue} to search by value.
* @param map Map to search
* @param predicate Filter function returns true when there is a match of value
* @returns Entry, or _undefined_ if `filter` function never returns _true_
*/
const firstEntry = (map, predicate) => {
	for (const entry of map.entries()) {
		const value = entry[1];
		for (const subValue of value) if (predicate(subValue, entry[0])) return entry;
	}
};
/**
* Returns the entry with the largest count of elements,
* or _undefined_ if `map` is empty.
*/
const longestEntry = (map) => {
	if (typeof map !== `object`) throw new TypeError(`Param 'map' is not an object. Got: ${typeof map}`);
	if (!(`entries` in map)) throw new TypeError(`Param 'map' does not have 'entries' function`);
	let largestEntry;
	const largest = Number.MIN_SAFE_INTEGER;
	for (const entry of map.entries()) {
		const v = entry[1];
		if (typeof v !== `object`) throw new TypeError(`All items in map are expected to be an object type. Got: ${typeof v}`);
		if (!(`length` in v)) throw new TypeError(`All items in map must have a 'length' field`);
		if (v.length > largest) largestEntry = entry;
	}
	return largestEntry;
};
/**
* Finds first entry by iterable value. Expects a map with an iterable as values.
*
* ```js
* const map = new Map();
* map.set('hello', ['a', 'b', 'c']);
* map.set('there', ['d', 'e', 'f']);
*
* const entry = firstEntryByValue(map, 'e');
* // Entry is: ['there', ['d', 'e', 'f']]
* ```
*
* An alternative is {@link firstEntry} to search by predicate function.
* @param map Map to search
* @param soughtValue Value to seek
* @param isEqual Filter function which checks equality. Uses JS comparer by default.
* @returns Entry, or _undefined_ if `value` not found.
* @throws If 'map' doesn't seem like a map
*/
const firstEntryByValue = (map, soughtValue, isEqual = isEqualDefault) => {
	if (typeof map !== `object`) throw new TypeError(`Param 'map' is expected to be an object. Got: ${typeof map}`);
	if (!(`entries` in map)) throw new TypeError(`Param 'map' is expected to have 'entries()'`);
	for (const entry of map.entries()) {
		const entryValue = entry[1];
		for (const subValue of entryValue) if (isEqual(subValue, soughtValue)) return entry;
	}
};
/**
* Returns a copy of `map`, with the internal arrays being a different object.
* Values contained inside are not copied.
* @param map 
* @returns 
*/
const cloneShallow = (map) => {
	const copied = [...map.entries()].map((entry) => [entry[0], [...entry[1]]]);
	return new Map(copied);
};
/**
* Returns true if both sets of data have the same keys, and iterables at each key contain the same values, regardless of order.
* By default uses === comparison semantics.
* @param a 
* @param b 
* @param comparerOrKey 
* @returns 
*/
const equals = (a, b, comparerOrKey = isEqualDefault) => {
	const aa = [...a.entries()];
	const bb = [...b.entries()];
	if (aa.length !== bb.length) return false;
	for (const ae of aa) {
		const be = bb.find((v) => v[0] === ae[0]);
		if (!be) return false;
		if (!isEqualIgnoreOrder(Array.from(ae[1]), Array.from(be[1]), comparerOrKey)) return false;
	}
	return true;
};

//#endregion
//#region ../packages/collections/src/map/map-of-simple-base.ts
var MapOfSimpleBase = class {
	map;
	groupBy;
	valueEq;
	/**
	* Constructor
	*
	* ```js
	* const m = new MapOfSimpleBase();
	* m.valuesFor(`apple`); // Iterator over all values stored under key `apple`
	* ```
	* @param groupBy Creates keys for values when using `addValue`. By default uses JSON.stringify
	* @param valueEq Compare values. By default uses JS logic for equality
	*/
	constructor(groupBy = defaultKeyer, valueEq = isEqualDefault, initial = []) {
		this.groupBy = groupBy;
		this.valueEq = valueEq;
		if (Array.isArray(initial)) this.map = new Map(initial);
		else this.map = new Map(initial.entries());
	}
	/**
	* Returns the underlying map storage. Do not manipulate.
	*/
	get getRawMapUnsafe() {
		return this.map;
	}
	/**
	* Returns _true_ if `key` exists
	* @param key
	* @returns
	*/
	has(key) {
		return this.map.has(key);
	}
	/**
	* Returns _true_ if `value` exists under `key`.
	* @param key Key
	* @param value Value to seek under `key`
	* @returns _True_ if `value` exists under `key`.
	*/
	hasKeyValue(key, value) {
		const values = this.map.get(key);
		if (!values) return false;
		for (const v of values) if (this.valueEq(v, value)) return true;
		return false;
	}
	/**
	* Debug dump of contents
	*/
	debugString() {
		let r = ``;
		[...this.map.keys()].every((k) => {
			const v = this.map.get(k);
			if (v === void 0) return;
			r += `${k} (${v.length}) = ${JSON.stringify(v)}\r\n`;
		});
		return r;
	}
	/**
	* Return number of values stored under `key`.
	* Returns 0 if `key` is not found.
	* @param key
	* @returns
	*/
	count(key) {
		const values = this.map.get(key);
		if (!values) return 0;
		return values.length;
	}
	/**
	* Returns first key that contains `value`
	* @param value
	* @param eq
	* @returns
	*/
	firstKeyByValue(value, eq = isEqualDefault) {
		const entry = firstEntryByValue(this, value, eq);
		if (entry) return entry[0];
	}
	/**
	* Iterate over all entries
	*/
	*entriesFlat() {
		for (const entries of this.map.entries()) for (const value of entries[1]) yield [entries[0], value];
	}
	/**
	* Iterate over keys and array of values for that key
	*/
	*entries() {
		for (const [k, v] of this.map.entries()) yield [k, [...v]];
	}
	/**
	* Get all values under `key`
	* @param key
	* @returns
	*/
	*valuesFor(key) {
		const m = this.map.get(key);
		if (!m) return;
		yield* m.values();
	}
	/**
	* Iterate over all keys
	*/
	*keys() {
		yield* this.map.keys();
	}
	/**
	* Iterate over all values (regardless of key).
	* Use {@link values} to iterate over a set of values per key
	*/
	*valuesFlat() {
		for (const entries of this.map) yield* entries[1];
	}
	/**
	* Returns all values under 'key', or
	* an empty array if key is not found.
	*
	* Array is a copy of stored array.
	* @param key
	* @returns
	*/
	/**
	* Returns the underlying array that stores values for `key`.
	*
	* Returns _undefined_ if key does not exist.
	*
	* Be careful about modifying array.
	* @param key
	* @returns
	*/
	getRawArray(key) {
		const v = this.map.get(key);
		if (!v) return;
		return v;
	}
	/**
	* Yields the values for each key in sequence, returning an array.
	* Use {@link valuesFlat} to iterate over all keys regardless of key.
	*/
	*values() {
		for (const entries of this.map) yield entries[1];
	}
	/**
	* Iterate over keys and length of values stored under keys
	*/
	*keysAndCounts() {
		for (const entries of this.map) yield [entries[0], entries[1].length];
	}
	/**
	* Returns the count of keys.
	*/
	get lengthKeys() {
		return this.map.size;
	}
	/**
	* _True_ if empty
	*/
	get isEmpty() {
		return this.map.size === 0;
	}
};

//#endregion
//#region ../packages/collections/src/map/map-of-simple-mutable.ts
/**
* A simple mutable map of arrays, without events. It can store multiple values
* under the same key.
*
* For a fancier approaches, consider ofArrayMutable, ofCircularMutable or ofSetMutable.
*
* @example
* ```js
* const m = mapOfSimpleMutable();
* m.add(`hello`, 1, 2, 3); // Adds numbers under key `hello`
* m.delete(`hello`);       // Deletes everything under `hello`

* const hellos = m.valuesFor(`hello`); // Enumerate items stored under key `hello`
* ```
*
* Constructor takes a `groupBy` parameter, which yields a string key for a value. This is the
* basis by which values are keyed when using `addValues`.
*
* Constructor takes a `valueEq` parameter, which compares values. This is used when checking
* if a value exists under a key, for example.
* @typeParam V - Type of items
*/
var MapOfSimpleMutable = class extends MapOfSimpleBase {
	addKeyedValues(key, ...values) {
		const existing = this.map.get(key);
		if (existing === void 0) this.map.set(key, values);
		else this.map.set(key, [...existing, ...values]);
	}
	/**
	* Set `values` to `key`.
	* Previous data stored under `key` is thrown away.
	* @param key
	* @param values
	*/
	setValues(key, values) {
		this.map.set(key, values);
	}
	/**
	* Adds a value, automatically extracting a key via the
	* `groupBy` function assigned in the constructor options.
	* @param values Adds several values
	*/
	addValue(...values) {
		for (const v of values) {
			const key = this.groupBy(v);
			this.addKeyedValues(key, v);
		}
	}
	/**
	* Delete `value` under a particular `key`
	* @param key
	* @param value
	* @returns _True_ if `value` was found under `key`
	*/
	deleteKeyValue(key, value) {
		const existing = this.map.get(key);
		if (existing === void 0) return false;
		const without = existing.filter((existingValue) => !this.valueEq(existingValue, value));
		this.map.set(key, without);
		return without.length < existing.length;
	}
	/**
	* Deletes `value` regardless of key.
	*
	* Uses the constructor-defined equality function.
	* @param value Value to delete
	* @returns
	*/
	deleteByValue(value) {
		let del = false;
		const entries = [...this.map.entries()];
		for (const keyEntries of entries) for (const values of keyEntries[1]) if (this.valueEq(values, value)) {
			del = true;
			this.deleteKeyValue(keyEntries[0], value);
		}
		return del;
	}
	/**
	* Deletes all values under `key`,
	* @param key
	* @returns _True_ if `key` was found and values stored
	*/
	delete(key) {
		const values = this.map.get(key);
		if (!values) return false;
		if (values.length === 0) return false;
		this.map.delete(key);
		return true;
	}
	/**
	* Clear contents
	*/
	clear() {
		this.map.clear();
	}
};
/**
* A simple mutable map of arrays, without events. It can store multiple values
* under the same key.
*
* For a fancier approaches, consider {@link ofArrayMutable}, {@link ofCircularMutable} or {@link ofSetMutable}.
*
* @example
* ```js
* const m = mapOfSimpleMutable();
* m.add(`hello`, 1, 2, 3); // Adds numbers under key `hello`
* m.delete(`hello`);       // Deletes everything under `hello`
*
* const hellos = m.get(`hello`); // Get list of items under `hello`
* ```
*
* @typeParam V - Type of items
* @returns New instance
*/
function ofSimpleMutable(groupBy = defaultKeyer, valueEq = isEqualDefault) {
	return new MapOfSimpleMutable(groupBy, valueEq);
}

//#endregion
//#region ../packages/collections/src/map/map-mutable.ts
/**
* Returns a {@link IMapMutable} (which just wraps the in-built Map)
* Use {@link Maps.immutable} for the immutable alternative.
*
* @example Basic usage
* ```js
* const m = mapMutable();
* // Add one or more entries
* m.add(["name", "sally"]);
* // Alternatively:
* m.set("name", "sally");
* // Recall
* m.get("name");           // "sally"
* m.delete("name");
* m.isEmpty; // True
* m.clear();
* ```
* @param data Optional initial data in the form of an array of `{ key: value }` or `[ key, value ]`
*/
const mutable$1 = (...data) => {
	let m = add$1(/* @__PURE__ */ new Map(), ...data);
	return {
		add: (...data) => {
			m = add$1(m, ...data);
		},
		delete: (key) => {
			m = del(m, key);
		},
		clear: () => {
			m = add$1(/* @__PURE__ */ new Map());
		},
		set: (key, value) => {
			m = set(m, key, value);
		},
		get: (key) => m.get(key),
		entries: () => m.entries(),
		values: () => m.values(),
		isEmpty: () => m.size === 0,
		has: (key) => has$1(m, key)
	};
};

//#endregion
//#region ../packages/collections/src/map/map-of-multi-impl.ts
/**
* @internal
*/
var MapOfMutableImpl = class extends SimpleEventEmitter {
	#map = /* @__PURE__ */ new Map();
	groupBy;
	type;
	constructor(type, opts = {}) {
		super();
		this.type = type;
		this.groupBy = opts.groupBy ?? toStringDefault;
	}
	/**
	* Returns the type name. For in-built implementations, it will be one of: array, set or circular
	*/
	get typeName() {
		return this.type.name;
	}
	/**
	* Returns the number of keys
	*/
	get lengthKeys() {
		return this.#map.size;
	}
	/**
	* Returns the length of the longest child list
	*/
	get lengthMax() {
		let m = 0;
		for (const v of this.#map.values()) m = Math.max(m, this.type.count(v));
		return m;
	}
	debugString() {
		const keys = [...this.#map.keys()];
		let r = `Keys: ${keys.join(`, `)}\r\n`;
		for (const k of keys) {
			const v = this.#map.get(k);
			if (v === void 0) r += ` - ${k} (undefined)\r\n`;
			else {
				const asArray = this.type.toArrayCopy(v);
				if (asArray !== void 0) r += ` - ${k} (${this.type.count(v)}) = ${JSON.stringify(asArray)}\r\n`;
			}
		}
		return r;
	}
	get isEmpty() {
		return this.#map.size === 0;
	}
	clear() {
		this.#map.clear();
		super.fireEvent(`clear`, true);
	}
	addKeyedValues(key, ...values) {
		const set = this.#map.get(key);
		if (set === void 0) {
			this.#map.set(key, this.type.addKeyedValues(void 0, values));
			super.fireEvent(`addedKey`, { key });
			super.fireEvent(`addedValues`, { values });
		} else {
			this.#map.set(key, this.type.addKeyedValues(set, values));
			super.fireEvent(`addedValues`, { values });
		}
	}
	set(key, values) {
		this.addKeyedValues(key, ...values);
		return this;
	}
	addValue(...values) {
		for (const v of values) this.addKeyedValues(this.groupBy(v), v);
	}
	hasKeyValue(key, value, eq) {
		const m = this.#map.get(key);
		if (m === void 0) return false;
		return this.type.has(m, value, eq);
	}
	has(key) {
		return this.#map.has(key);
	}
	deleteKeyValue(key, value) {
		const a = this.#map.get(key);
		if (a === void 0) return false;
		return this.deleteKeyValueFromMap(a, key, value);
	}
	deleteKeyValueFromMap(map, key, value) {
		const preCount = this.type.count(map);
		const filtered = this.type.without(map, value);
		const postCount = filtered.length;
		this.#map.set(key, this.type.addKeyedValues(void 0, filtered));
		return preCount > postCount;
	}
	deleteByValue(value) {
		let something = false;
		[...this.#map.keys()].filter((key) => {
			const a = this.#map.get(key);
			if (!a) throw new Error(`Bug: map could not be accessed`);
			if (this.deleteKeyValueFromMap(a, key, value)) {
				something = true;
				if (this.count(key) === 0) this.delete(key);
			}
		});
		return something;
	}
	delete(key) {
		if (this.#map.get(key) === void 0) return false;
		this.#map.delete(key);
		this.fireEvent(`deleteKey`, { key });
		return true;
	}
	firstKeyByValue(value, eq = isEqualDefault) {
		return [...this.#map.keys()].find((key) => {
			const a = this.#map.get(key);
			if (a === void 0) throw new Error(`Bug: map could not be accessed`);
			return this.type.has(a, value, eq);
		});
	}
	count(key) {
		const entry = this.#map.get(key);
		if (entry === void 0) return 0;
		return this.type.count(entry);
	}
	/**
	* Iterates over values stored under `key`
	* If `key` is not found, no error is thrown - the iterator returns no values
	* 
	* Alternatively use {@link valuesFor}
	*/
	/**
	* Iterate over the values stored under `key`.
	* If key does not exist, iteration is essentially a no-op.
	* 
	* Alternatively, use {@link valuesForAsArray} to get values as an array.
	* @param key
	* @returns
	*/
	*valuesFor(key) {
		const m = this.#map.get(key);
		if (m === void 0) return;
		yield* this.type.iterable(m);
	}
	getSource(key) {
		return this.#map.get(key);
	}
	*keys() {
		yield* this.#map.keys();
	}
	*entriesFlat() {
		for (const entry of this.#map.entries()) for (const v of this.type.iterable(entry[1])) yield [entry[0], v];
	}
	*valuesFlat() {
		for (const entry of this.#map.entries()) yield* this.type.iterable(entry[1]);
	}
	*entries() {
		for (const [k, v] of this.#map.entries()) yield [k, [...this.type.iterable(v)]];
	}
	*keysAndCounts() {
		for (const key of this.keys()) yield [key, this.count(key)];
	}
	merge(other) {
		for (const key of other.keys()) this.addKeyedValues(key, ...other.valuesFor(key));
	}
	get size() {
		return this.#map.size;
	}
	get [Symbol.toStringTag]() {
		return this.#map[Symbol.toStringTag];
	}
};

//#endregion
//#region ../packages/collections/src/map/map-of-set-mutable.ts
/**
* Returns a {@link IMapOfMutableExtended} that uses a set to hold values.
* This means that only unique values are stored under each key. By default it
* uses the JSON representation to compare items.
*
* Options: `{ hash: toStringFn } }`
*
* `hash` is Util.ToString function: `(object) => string`. By default it uses
* `JSON.stringify`.
*
* @example Only storing the newest three items per key
* ```js
* const map = ofSetMutable();
* map.addKeyedValues(`hello`, [1, 2, 3, 1, 2, 3]);
* const hello = map.get(`hello`); // [1, 2, 3]
* ```
*
* @example
* ```js
* const hash = (v) => v.name; // Use name as the key
* const map = ofSetMutable({hash});
* map.addValue({age:40, name: `Mary`});
* map.addValue({age:29, name: `Mary`}); // Value ignored as same name exists
* ```
* @param options
* @returns
*/
const ofSetMutable = (options) => {
	const hash = options?.hash ?? toStringDefault;
	const comparer = (a, b) => hash(a) === hash(b);
	return new MapOfMutableImpl({
		get name() {
			return `set`;
		},
		iterable: (source) => source.values(),
		addKeyedValues: (dest, values) => addValue$1(dest, hash, `skip`, ...values),
		count: (source) => source.size,
		find: (source, predicate) => findValue(source, predicate),
		filter: (source, predicate) => filterValues(source, predicate),
		toArrayCopy: (source) => toArray$1(source),
		has: (source, value) => hasAnyValue(source, value, comparer),
		without: (source, value) => without(toArray$1(source), value, comparer)
	}, options);
};

//#endregion
//#region ../packages/collections/src/map/map-of-circular-mutable.ts
/**
* Returns a {@link IMapOfMutableExtended} that uses a {@link ICircularArray} to hold values. Mutable.
* This means that the number of values stored under each key will be limited to the defined
* capacity.
*
* Required option:
* * `capacity`: how many items to hold
*
* @example Only store the most recent three items per key
* ```js
* const map = ofCircularMutable({capacity: 3});
* map.add(`hello`, 1, 2, 3, 4, 5);
* const hello = [...map.get(`hello`)]; // [3, 4, 5]
* ```
* @param options
* @returns
*/
const ofCircularMutable = (options) => {
	const comparer = isEqualDefault;
	return new MapOfMutableImpl({
		get name() {
			return `circular`;
		},
		addKeyedValues: (destination, values) => {
			let ca = destination ?? new CircularArray(options.capacity);
			for (const v of values) ca = ca.add(v);
			return ca;
		},
		count: (source) => source.length,
		find: (source, predicate) => source.find(predicate),
		filter: (source, predicate) => source.filter(predicate),
		toArrayCopy: (source) => [...source],
		iterable: (source) => source.values(),
		has: (source, value) => source.find((v) => comparer(v, value)) !== void 0,
		without: (source, value) => source.filter((v) => !comparer(v, value))
	}, options);
};

//#endregion
//#region ../packages/collections/src/map/map-of-array-mutable.ts
/**
* Returns a {@link IMapOfMutableExtended} to allow storing multiple values under a key, unlike a regular Map.
* @example
* ```js
* const map = ofArrayMutable();
* map.addKeyedValues(`hello`, [1,2,3,4]); // Adds series of numbers under key `hello`
*
* const hello = map.get(`hello`); // Get back values
* ```
*
* Takes options:
* * `comparer`: {@link IsEqual}
* * `toString`: Util.ToString
*
* A custom Util.ToString function can be provided as the `convertToString` opion. This is then used when checking value equality (`has`, `without`)
* ```js
* const map = ofArrayMutable({ convertToString:(v) => v.name}); // Compare values based on their `name` field;
* ```
*
* Alternatively, a {@link IsEqual} function can be used:
* ```js
* const map = ofArrayMutable({comparer: (a, b) => a.name === b.name });
* ```
* @param options Optiosn for mutable array
* @typeParam V - Data type of items
* @returns {@link IMapOfMutableExtended}
*/
const ofArrayMutable = (options = {}) => {
	const convertToString = options.convertToString;
	const toStringFunction = typeof convertToString === `undefined` ? isEqualDefault : (a, b) => convertToString(a) === convertToString(b);
	const comparer = options.comparer ?? toStringFunction;
	return new MapOfMutableImpl({
		get name() {
			return `array`;
		},
		addKeyedValues: (destination, values) => {
			if (destination === void 0) return [...values];
			return [...destination, ...values];
		},
		iterable: (source) => source.values(),
		count: (source) => source.length,
		find: (source, predicate) => source.find((f) => predicate(f)),
		filter: (source, predicate) => source.filter((f) => predicate(f)),
		toArrayCopy: (source) => [...source],
		has: (source, value) => source.some((v) => comparer(v, value)),
		without: (source, value) => source.filter((v) => !comparer(v, value))
	}, options);
};

//#endregion
//#region ../packages/collections/src/map/map-of-simple.ts
/**
* Simple immutable MapOf
*/
var MapOfSimple = class MapOfSimple extends MapOfSimpleBase {
	addKeyedValues(key, ...values) {
		return this.addBatch([[key, values]]);
	}
	addValue(...values) {
		const temporary = new MapOfSimpleMutable(this.groupBy, this.valueEq, this.getRawMapUnsafe);
		temporary.addValue(...values);
		return new MapOfSimple(this.groupBy, this.valueEq, [...temporary.entries()]);
	}
	addBatch(batch) {
		const temporary = new MapOfSimpleMutable(this.groupBy, this.valueEq, this.getRawMapUnsafe);
		for (const b of batch) temporary.addKeyedValues(b[0], ...b[1]);
		return new MapOfSimple(this.groupBy, this.valueEq, [...temporary.entries()]);
	}
	clear() {
		return new MapOfSimple(this.groupBy, this.valueEq);
	}
	deleteKeyValue(_key, _value, eq) {
		const eqFunction = eq ?? this.valueEq;
		const x = [...this.map.entries()].map((entry) => {
			const k = entry[0];
			if (k !== _key) return entry;
			return [k, entry[1].filter((v) => !eqFunction(v, _value))];
		}).filter((entry) => entry[1].length > 0);
		return new MapOfSimple(this.groupBy, this.valueEq, x);
	}
	deleteByValue(value, eq) {
		const entries = [...this.map.entries()];
		const eqFunction = eq ?? this.valueEq;
		const x = entries.map((entry) => {
			return [entry[0], entry[1].filter((vv) => !eqFunction(vv, value))];
		}).filter((entry) => entry[1].length > 0);
		return new MapOfSimple(this.groupBy, this.valueEq, x);
	}
	delete(key) {
		const entries = [...this.map.entries()].filter((entry) => entry[0] !== key);
		return new MapOfSimple(this.groupBy, this.valueEq, entries);
	}
};
/**
* A simple immutable map of arrays, without events. It can store multiple values
* under the same key.
*
* For a fancier approaches, consider {@link ofArrayMutable}, {@link ofCircularMutable} or {@link ofSetMutable}.
*
* @example
* ```js
* let m = mapSimple();
* m = m.add(`hello`, 1, 2, 3); // Adds numbers under key `hello`
* m = m.delete(`hello`);       // Deletes everything under `hello`
*
* const hellos = m.get(`hello`); // Get list of items under `hello`
* ```
*
* @typeParam V - Type of items
* @returns New instance
*/
const ofSimple = (groupBy = defaultKeyer, valueEq = isEqualDefault) => new MapOfSimple(groupBy, valueEq);

//#endregion
//#region ../packages/collections/src/map/map-mutable-events.ts
/**
* A wrapper around a regular Map, but one that fires events when data changes.
* 
* Events:
* * removed: Key/value removed
* * added: Key/value added/updated
* * key-added: Key/value pair added that resulted in a new key
* * key-updated: Value updated for an existing key
* * cleared: Map has been cleared
*/
var MapWithEvents = class extends SimpleEventEmitter {
	#map = /* @__PURE__ */ new Map();
	add(...itemsToAdd) {
		for (const kv of itemsToAdd) if (`key` in kv && `value` in kv) this.set(kv.key, kv.value);
		else this.set(kv[0], kv[1]);
	}
	set(key, value) {
		const newKey = this.#map.has(key);
		this.#map.set(key, value);
		const kv = {
			key,
			value
		};
		if (newKey) this.fireEvent(`key-added`, kv);
		else this.fireEvent(`key-updated`, kv);
		this.fireEvent(`added`, kv);
	}
	delete(key) {
		const value = this.#map.get(key);
		if (value === void 0) return;
		this.#map.delete(key);
		this.fireEvent(`removed`, {
			key,
			value
		});
	}
	clear() {
		this.#map.clear();
		this.fireEvent(`cleared`, void 0);
	}
	get(key) {
		return this.#map.get(key);
	}
	has(key) {
		return this.#map.has(key);
	}
	isEmpty() {
		return this.#map.size === 0;
	}
	entries() {
		return this.#map.entries();
	}
	values() {
		return this.#map.values();
	}
};

//#endregion
//#region ../packages/collections/src/map/index.ts
var map_exports = /* @__PURE__ */ __exportAll({
	ExpiringMap: () => ExpiringMap,
	MapOfMutableImpl: () => MapOfMutableImpl,
	MapOfSimple: () => MapOfSimple,
	MapOfSimpleMutable: () => MapOfSimpleMutable,
	MapWithEvents: () => MapWithEvents,
	NumberMap: () => NumberMap,
	addObjectEntriesMutate: () => addObjectEntriesMutate,
	addValue: () => addValue$1,
	addValueMutate: () => addValueMutate,
	addValueMutator: () => addValueMutator,
	cloneShallow: () => cloneShallow,
	deleteByValueCompareMutate: () => deleteByValueCompareMutate,
	equals: () => equals,
	expiringMap: () => create$2,
	filterValues: () => filterValues,
	findBySomeKey: () => findBySomeKey,
	findEntryByPredicate: () => findEntryByPredicate,
	findEntryByValue: () => findEntryByValue,
	findValue: () => findValue,
	firstEntry: () => firstEntry,
	firstEntryByValue: () => firstEntryByValue,
	fromIterable: () => fromIterable,
	fromObject: () => fromObject,
	getClosestIntegerKey: () => getClosestIntegerKey,
	getOrGenerate: () => getOrGenerate,
	getOrGenerateSync: () => getOrGenerateSync,
	hasAnyValue: () => hasAnyValue,
	hasKeyValue: () => hasKeyValue,
	immutable: () => immutable$3,
	longestEntry: () => longestEntry,
	mapOfSimpleMutable: () => ofSimpleMutable,
	mapToArray: () => mapToArray,
	mapToObjectTransform: () => mapToObjectTransform,
	mergeByKey: () => mergeByKey,
	mutable: () => mutable$1,
	ofArrayMutable: () => ofArrayMutable,
	ofCircularMutable: () => ofCircularMutable,
	ofSetMutable: () => ofSetMutable,
	ofSimple: () => ofSimple,
	ofSimpleMutable: () => ofSimpleMutable,
	some: () => some,
	sortByValue: () => sortByValue,
	sortByValueProperty: () => sortByValueProperty,
	toArray: () => toArray$1,
	toObject: () => toObject,
	transformMap: () => transformMap,
	zipKeyValue: () => zipKeyValue
});

//#endregion
//#region ../packages/collections/src/queue/queue-immutable.ts
var QueueImmutable = class QueueImmutable {
	opts;
	#data;
	/**
	* Creates an instance of Queue.
	* @param {QueueOpts} opts Options foor queue
	* @param {V[]} data Initial data. Index 0 is front of queue
	*/
	constructor(opts = {}, data = []) {
		if (opts === void 0) throw new Error(`opts parameter undefined`);
		this.opts = opts;
		this.#data = data;
	}
	forEach(fn) {
		for (let index = this.#data.length - 1; index >= 0; index--) fn(this.#data[index]);
	}
	forEachFromFront(fn) {
		this.#data.forEach((item) => {
			fn(item);
		});
	}
	enqueue(...toAdd) {
		return new QueueImmutable(this.opts, enqueue(this.opts, this.#data, ...toAdd));
	}
	dequeue() {
		return new QueueImmutable(this.opts, dequeue(this.opts, this.#data));
	}
	get isEmpty() {
		return isEmpty(this.opts, this.#data);
	}
	get isFull() {
		return isFull(this.opts, this.#data);
	}
	get length() {
		return this.#data.length;
	}
	get peek() {
		return peek(this.opts, this.#data);
	}
	toArray() {
		return [...this.#data];
	}
};
/**
* Returns an immutable queue. Queues are useful if you want to treat 'older' or 'newer'
* items differently. _Enqueing_ adds items at the back of the queue, while
* _dequeing_ removes items from the front (ie. the oldest).
*
* ```js
* let q = Queues.immutable();           // Create
* q = q.enqueue(`a`, `b`);   // Add two strings
* const front = q.peek();    // `a` is at the front of queue (oldest)
* q = q.dequeue();           // q now just consists of `b`
* ```
* @example Cap size to 5 items, throwing away newest items already in queue.
* ```js
* const q = Queues.immutable({capacity: 5, discardPolicy: `newer`});
* ```
*
* @typeParam V - Type of values stored
* @param options
* @param startingItems Index 0 is the front of the queue
* @returns A new queue
*/
const immutable$2 = (options = {}, ...startingItems) => {
	options = { ...options };
	return new QueueImmutable(options, [...startingItems]);
};

//#endregion
//#region ../packages/collections/src/queue/index.ts
var queue_exports = /* @__PURE__ */ __exportAll({
	PriorityMutable: () => PriorityMutable,
	QueueImmutable: () => QueueImmutable,
	QueueMutable: () => QueueMutable,
	debug: () => debug,
	dequeue: () => dequeue,
	enqueue: () => enqueue,
	immutable: () => immutable$2,
	isEmpty: () => isEmpty,
	isFull: () => isFull,
	mutable: () => mutable$2,
	peek: () => peek,
	priority: () => priority,
	trimQueue: () => trimQueue
});

//#endregion
//#region ../packages/collections/src/set/set-mutable.ts
/**
* Creates a {@link ISetMutable}.
* @param keyString Function that produces a key based on a value. If unspecified, uses `JSON.stringify`
* @returns
*/
const mutable = (keyString) => new SetStringMutable(keyString);
/**
* Mutable string set
*/
var SetStringMutable = class extends SimpleEventEmitter {
	store = /* @__PURE__ */ new Map();
	keyString;
	/**
	* Constructor
	* @param keyString Function which returns a string version of added items. If unspecified `JSON.stringify`
	*/
	constructor(keyString) {
		super();
		this.keyString = keyString ?? defaultKeyer;
	}
	/**
	* Number of items stored in set
	*/
	get size() {
		return this.store.size;
	}
	/**
	* Adds one or more items to set. `add` event is fired for each item
	* @param values items to add
	*/
	add(...values) {
		let somethingAdded = false;
		for (const value of values) {
			const isUpdated = this.has(value);
			this.store.set(this.keyString(value), value);
			super.fireEvent(`add`, {
				value,
				updated: isUpdated
			});
			if (!isUpdated) somethingAdded = true;
		}
		return somethingAdded;
	}
	/**
	* Returns values from set as an iterable
	* @returns
	*/
	values() {
		return this.store.values();
	}
	/**
	* Clear items from set
	*/
	clear() {
		this.store.clear();
		super.fireEvent(`clear`, true);
	}
	/**
	* Delete value from set.
	* @param v Value to delete
	* @returns _True_ if item was found and removed
	*/
	delete(v) {
		const isDeleted = this.store.delete(this.keyString(v));
		if (isDeleted) super.fireEvent(`delete`, v);
		return isDeleted;
	}
	/**
	* Returns _true_ if item exists in set
	* @param v
	* @returns
	*/
	has(v) {
		return this.store.has(this.keyString(v));
	}
	/**
	* Returns array copy of set
	* @returns Array copy of set
	*/
	toArray() {
		return [...this.store.values()];
	}
};

//#endregion
//#region ../packages/collections/src/set/SetImmutable.ts
var SetStringImmutable = class SetStringImmutable {
	store;
	keyString;
	constructor(keyString, map) {
		this.store = map ?? /* @__PURE__ */ new Map();
		this.keyString = keyString ?? defaultKeyer;
	}
	get size() {
		return this.store.size;
	}
	add(...values) {
		const s = new Map(this.store);
		for (const v of values) {
			const key = this.keyString(v);
			s.set(key, v);
		}
		return new SetStringImmutable(this.keyString, s);
	}
	delete(v) {
		const s = new Map(this.store);
		const key = this.keyString(v);
		if (s.delete(key)) return new SetStringImmutable(this.keyString, s);
		return this;
	}
	has(v) {
		const key = this.keyString(v);
		return this.store.has(key);
	}
	toArray() {
		return [...this.store.values()];
	}
	*values() {
		yield* this.store.values();
	}
};
/**
* Immutable set that uses a `keyString` function to determine uniqueness
*
* @param keyString Function that produces a key based on a value. If unspecified, uses `JSON.stringify`.
* @returns
*/
const immutable$1 = (keyString = toStringDefault) => new SetStringImmutable(keyString);

//#endregion
//#region ../packages/collections/src/set/massive-set.ts
/**
* MassiveSet supports semantics similar to Set, but without the
* limitation on how much data is stored.
* 
* It only supports strings, and stores data in a hierarchy.
* 
* ```js
* const set = new MassiveSet(); // maxDepth=1 default
* set.add(`test`);
* set.add(`bloorp`);
* ```
* 
* In the above example, it will create a subtree for the first letter
* of each key, putting the value underneath it. So we'd get a sub
* MassiveSet for every key starting with 't' and every one starting with 'b'.
* 
* If `maxDepth` was 2, we'd get the same two top-level nodes, but then
* another sub-node based on the _second_ character of the value.
* 
* It's not a very smart data-structure since it does no self-balancing
* or tuning.
*/
var MassiveSet = class MassiveSet {
	#depth;
	#maxDepth;
	children = /* @__PURE__ */ new Map();
	values = [];
	constructor(maxDepth = 1, depth = 0) {
		this.#depth = depth;
		this.#maxDepth = maxDepth;
	}
	/**
	* Returns the number of values stored in just this level of the set
	* @returns 
	*/
	sizeLocal() {
		return this.values.length;
	}
	/**
	* Returns the number of branches at this node
	* Use {@link sizeChildrenDeep} to count all branches recursively
	* @returns 
	*/
	sizeChildren() {
		return [...this.children.values()].length;
	}
	sizeChildrenDeep() {
		let t = this.sizeChildren();
		for (const c of this.children.values()) t += c.sizeChildrenDeep();
		return t;
	}
	/**
	* Returns the total number of values stored in the set
	*/
	size() {
		let x = this.values.length;
		for (const set of this.children.values()) x += set.size();
		return x;
	}
	add(value) {
		if (typeof value !== `string`) throw new Error(`Param 'value' must be a string. Got: ${typeof value}`);
		if (value.length === 0) throw new Error(`Param 'value' is empty`);
		const destination = this.#getChild(value, true);
		if (destination === this) {
			if (!this.hasLocal(value)) this.values.push(value);
			return;
		}
		if (!destination) throw new Error(`Could not create child set for: ${value}`);
		destination.add(value);
	}
	remove(value) {
		if (typeof value !== `string`) throw new Error(`Param 'value' must be a string. Got: ${typeof value}`);
		if (value.length === 0) throw new Error(`Param 'value' is empty`);
		const destination = this.#getChild(value, false);
		if (destination === void 0) return false;
		if (destination === this) {
			if (this.hasLocal(value)) {
				this.values = this.values.filter((v) => v !== value);
				return true;
			}
			return false;
		}
		return destination.remove(value);
	}
	debugDump() {
		const r = this.#dumpToArray();
		for (const rr of r) console.log(rr);
	}
	#dumpToArray(depth = 0) {
		const r = [];
		r.push(`Depth: ${this.#depth} Max: ${this.#maxDepth}`);
		for (const [key, value] of this.children.entries()) {
			const dumped = value.#dumpToArray(depth + 1);
			r.push(` key: ${key}`);
			for (const d of dumped) r.push(` `.repeat(depth + 1) + d);
		}
		r.push(`Values: (${this.values.length})`);
		for (const v of this.values) r.push(` ${v}`);
		return r.map((line) => ` `.repeat(depth) + line);
	}
	#getChild(value, create) {
		if (value === void 0) throw new Error(`Param 'value' undefined`);
		if (this.#depth === this.#maxDepth) return this;
		if (value.length <= this.#depth) return this;
		const k = value[this.#depth];
		if (k === void 0) throw new Error(`Logic error. Depth: ${this.#depth} Len: ${value.length}`);
		let child = this.children.get(k);
		if (child === void 0 && create) {
			child = new MassiveSet(this.#maxDepth, this.#depth + 1);
			this.children.set(k, child);
		}
		return child;
	}
	/**
	* Returns _true_ if `value` stored on this node
	* @param value 
	* @returns 
	*/
	hasLocal(value) {
		for (const v of this.values) if (v === value) return true;
		return false;
	}
	has(value) {
		if (typeof value !== `string`) return false;
		const destination = this.#getChild(value, false);
		if (destination === void 0) return false;
		if (destination === this) return this.hasLocal(value);
		return destination.has(value);
	}
};

//#endregion
//#region ../packages/collections/src/set/index.ts
var set_exports = /* @__PURE__ */ __exportAll({
	MassiveSet: () => MassiveSet,
	SetStringImmutable: () => SetStringImmutable,
	SetStringMutable: () => SetStringMutable,
	immutable: () => immutable$1,
	mutable: () => mutable
});

//#endregion
//#region ../packages/collections/src/stack/StackImmutable.ts
var StackImmutable = class StackImmutable {
	opts;
	data;
	constructor(opts = {}, data = []) {
		this.opts = opts;
		this.data = data;
	}
	push(...toAdd) {
		return new StackImmutable(this.opts, push(this.opts, this.data, ...toAdd));
	}
	pop() {
		return new StackImmutable(this.opts, pop(this.opts, this.data));
	}
	forEach(fn) {
		this.data.forEach(fn);
	}
	forEachFromTop(fn) {
		[...this.data].reverse().forEach(fn);
	}
	get isEmpty() {
		return isEmpty$1(this.opts, this.data);
	}
	get isFull() {
		return isFull$1(this.opts, this.data);
	}
	get peek() {
		return peek$1(this.opts, this.data);
	}
	get length() {
		return this.data.length;
	}
};
/**
* Returns a stack. Immutable. Use {@link Stacks.mutable} for a mutable alternative.
*
* The basic usage is `push`/`pop` to add/remove, returning the modified stack. Use the
* property `peek` to see what's on top.
*
* @example Basic usage
* ```js
* // Create
* let s = stack();
* // Add one or more items
* s = s.push(1, 2, 3, 4);
* // See what's at the top of the stack
* s.peek;      // 4
*
* // Remove from the top of the stack, returning
* // a new stack without item
* s = s.pop();
* s.peek;        // 3
* ```
* @param options Options
* @param startingItems List of items to add to stack. Items will be pushed 'left to right', ie array index 0 will be bottom of the stack.
*/
const immutable = (options = {}, ...startingItems) => new StackImmutable({ ...options }, [...startingItems]);

//#endregion
//#region ../packages/collections/src/stack/index.ts
var stack_exports = /* @__PURE__ */ __exportAll({
	StackImmutable: () => StackImmutable,
	StackMutable: () => StackMutable,
	immutable: () => immutable,
	isEmpty: () => isEmpty$1,
	isFull: () => isFull$1,
	mutable: () => mutable$3,
	peek: () => peek$1,
	pop: () => pop,
	push: () => push,
	trimStack: () => trimStack
});

//#endregion
//#region ../packages/collections/src/tree/compare.ts
const compare$1 = (a, b, eq = isEqualValueIgnoreOrder, parent) => {
	const valueEqual = valueOrIdentityEqual(a, b, eq);
	const childrenCompare = compareChildren(a, b, eq);
	const diff = {
		valueChanged: !valueEqual,
		a,
		b,
		added: childrenCompare.added,
		removed: childrenCompare.removed,
		childChanged: false
	};
	const diffNode = {
		value: diff,
		childrenStore: [],
		parent
	};
	const childrenDiff = childrenCompare.identical.map((c) => compare$1(c[0], c[1], eq, diffNode));
	const someChildChange = hasChange(diff) || childrenDiff.some((v) => hasChange(v.value));
	setChildren(diffNode, childrenDiff);
	diffNode.toString = () => toString$1(diffNode, 0);
	diffNode.value.childChanged = someChildChange;
	throwTreeTest(diffNode);
	return diffNode;
};
const hasChange = (vv) => {
	if (vv === void 0) return false;
	if (vv.valueChanged) return true;
	if (vv.childChanged) return true;
	if (vv.added.length > 0) return true;
	if (vv.removed.length > 0) return true;
	return false;
};
const compareChildren = (a, b, eq = isEqualValueIgnoreOrder) => {
	const childrenOfA = [...a.children()];
	const childrenOfB = [...b.children()];
	const identical = [];
	const removed = [];
	for (const childA of childrenOfA) {
		let foundIndex = -1;
		for (const [index, childOfB] of childrenOfB.entries()) if (valueOrIdentityEqual(childA, childOfB, eq)) {
			identical.push([childA, childOfB]);
			foundIndex = index;
			break;
		}
		if (foundIndex === -1) removed.push(childA);
		else childrenOfB.splice(foundIndex, 1);
	}
	return {
		added: [...childrenOfB],
		identical,
		removed
	};
};
const valueOrIdentityEqual = (a, b, eq) => {
	if (a.getIdentity() === b.getIdentity()) return true;
	if (eq(a.getValue(), b.getValue())) return true;
	return false;
};
const toStringSingle = (n) => {
	return JSON.stringify(n.getValue());
};
const toString$1 = (n, indent = 0) => {
	if (n === void 0) return `(undefined)`;
	let t = toStringDiff(n.value, indent);
	for (const c of n.childrenStore) t += toString$1(c, indent + 2);
	return t;
};
const toStringDiff = (n, indent) => {
	const spaces = ` `.repeat(indent);
	if (n === void 0) return `${spaces}(undefined)`;
	const t = [];
	t.push(`a: ${toStringSingle(n.a)} b: ${toStringSingle(n.b)}`);
	if (n.valueChanged) t.push(`Value changed. Child changed: ${n.childChanged}`);
	else t.push(`Value unchanged. Child changed: ${n.childChanged}`);
	if (n.added.length > 0) {
		t.push(`Added:`);
		for (const c of n.added) t.push(` - ` + toStringSingle(c));
	}
	if (n.removed.length > 0) {
		t.push(`Removed: ${n.removed.length}`);
		for (const c of n.removed) t.push(` - ` + toStringSingle(c));
	}
	t.push(`----\n`);
	return t.map((line) => spaces + line).join(`\n`);
};

//#endregion
//#region ../packages/collections/src/tree/tree-mutable.ts
var tree_mutable_exports = /* @__PURE__ */ __exportAll({
	add: () => add,
	addValue: () => addValue,
	asDynamicTraversable: () => asDynamicTraversable$1,
	breadthFirst: () => breadthFirst$2,
	children: () => children$2,
	childrenLength: () => childrenLength$1,
	childrenValues: () => childrenValues,
	compare: () => compare,
	computeMaxDepth: () => computeMaxDepth,
	createNode: () => createNode$1,
	depthFirst: () => depthFirst$3,
	findAnyChildByValue: () => findAnyChildByValue$2,
	findChildByValue: () => findChildByValue$1,
	findParentsValue: () => findParentsValue,
	followValue: () => followValue$1,
	fromPlainObject: () => fromPlainObject,
	getRoot: () => getRoot,
	hasAnyChild: () => hasAnyChild$1,
	hasAnyParent: () => hasAnyParent$1,
	hasChild: () => hasChild$1,
	hasParent: () => hasParent$1,
	nodeDepth: () => nodeDepth,
	parents: () => parents$1,
	parentsValues: () => parentsValues,
	queryByValue: () => queryByValue,
	queryParentsValue: () => queryParentsValue,
	remove: () => remove$1,
	removeValuelessNodesFromChild: () => removeValuelessNodesFromChild,
	root: () => root$2,
	rootWrapped: () => rootWrapped$1,
	setChildren: () => setChildren,
	siblings: () => siblings$2,
	stripParentage: () => stripParentage,
	throwTreeTest: () => throwTreeTest,
	toStringDeep: () => toStringDeep$4,
	treeTest: () => treeTest,
	value: () => value,
	wrap: () => wrap$1
});
/**
* Compares two nodes.
*
* By default uses `isEqualValueIgnoreOrder` to compare nodes. This means
* values of nodes will be compared, ignoring the order of fields.
* @param a
* @param b
* @param eq Comparison function. Uses `isEqualValueIgnoreOrder` by default.
* @returns Compare results
*/
function compare(a, b, eq) {
	return compare$1(asDynamicTraversable$1(a), asDynamicTraversable$1(b), eq);
}
/**
* Converts {@link Trees.TreeNode} to {@link Trees.SimplifiedNode}, removing the 'parent' fields.
* This can be useful because if you have the whole tree, the parent field
* is redundant and because it makes circular references can make dumping to console etc more troublesome.
*
* Recursive: strips parentage of all children and so on too.
* @param node
*/
function stripParentage(node) {
	return {
		value: node.value,
		childrenStore: node.childrenStore.map((c) => stripParentage(c))
	};
}
const unwrapped = (node) => `wraps` in node ? node.wraps : node;
const wrapped = (node) => `wraps` in node ? node : wrap$1(node);
/**
* Wraps node `n` for a more object-oriented means of access.
* It will wrap child nodes on demand. For this reason, WrappedNode object
* identity is not stable
* @param n Node to wrap
*/
function wrap$1(n) {
	return {
		*children() {
			for (const c of n.childrenStore) yield wrap$1(c);
		},
		getValue: () => n.value,
		getIdentity: () => n,
		*queryValue(value) {
			for (const v of queryByValue(value, unwrapped(n))) yield wrap$1(v);
		},
		*queryParentsValue(child, value, eq) {
			for (const v of queryParentsValue(unwrapped(child), value, eq)) yield wrap$1(v);
		},
		*parentsValues(child) {
			yield* parentsValues(unwrapped(child));
		},
		findParentsValue(child, value, eq) {
			const n = findParentsValue(child, value, eq);
			if (n !== void 0) return wrap$1(n);
		},
		getParent: () => n.parent === void 0 ? void 0 : wrap$1(n.parent),
		hasParent: (parent) => {
			return hasParent$1(n, unwrapped(parent));
		},
		hasAnyParent: (parent) => {
			return hasAnyParent$1(n, unwrapped(parent));
		},
		hasChild: (child) => {
			return hasChild$1(unwrapped(child), n);
		},
		hasAnyChild: (child) => {
			return hasAnyChild$1(unwrapped(child), n);
		},
		remove: () => {
			remove$1(n);
		},
		addValue: (value) => {
			return wrap$1(addValue(value, n));
		},
		add: (child) => {
			add(unwrapped(child), n);
			return wrapped(child);
		},
		wraps: n
	};
}
/**
* Removes `child` from the tree structure it is in.
* It removes `child` from its parent. Any sub-children of `child` still remain connected.
* @param child
*/
function remove$1(child) {
	const p = child.parent;
	if (p === void 0) return false;
	child.parent = void 0;
	const count = p.childrenStore.length;
	p.childrenStore = without(p.childrenStore, child);
	return count !== p.childrenStore.length;
}
/**
* Starting from a child node, work backwards, removing it and ancestors that have no value
*
* If `child` is an only child, it will recursively call the same function on the parent.
* @param child Child to start from
*/
function removeValuelessNodesFromChild(child) {
	if (typeof child.value !== `undefined`) return false;
	const parent = child.parent;
	if (!parent) return false;
	const sibs = [...siblings$2(child)];
	remove$1(child);
	if (sibs.length === 0) return removeValuelessNodesFromChild(parent);
	return true;
}
/**
* Enumeate all siblings of `child`. This won't include `child` itself.
* If `child` is not part of a tree (ie has no parent) no values are yielded.
*/
function* siblings$2(child, eq = isEqualDefault) {
	const parent = child.parent;
	if (typeof parent === `undefined`) return;
	for (const c of parent.childrenStore) {
		if (eq(c, child)) continue;
		yield c;
	}
}
/**
* Depth-first iteration of the children of `node`
* @param node
*/
function* depthFirst$3(node) {
	if (!root$2) return;
	const stack = new StackMutable();
	stack.push(...node.childrenStore);
	let entry = stack.pop();
	while (entry) {
		yield entry;
		if (entry) stack.push(...entry.childrenStore);
		if (stack.isEmpty) break;
		entry = stack.pop();
	}
}
/**
* Breadth-first iteration of the children of `node`
* @param node
*/
function* breadthFirst$2(node) {
	if (!node) return;
	const queue = new QueueMutable();
	queue.enqueue(...node.childrenStore);
	let entry = queue.dequeue();
	while (entry) {
		yield entry;
		if (entry) queue.enqueue(...entry.childrenStore);
		if (queue.isEmpty) break;
		entry = queue.dequeue();
	}
}
/**
* Validates the tree from `root` downwards.
* @param root
* @param seen
*/
function treeTest(root, seen = []) {
	if (root.parent === root) return [
		false,
		`Root has itself as parent`,
		root
	];
	if (seen.includes(root)) return [
		false,
		`Same node instance is appearing further in tree`,
		root
	];
	seen.push(root);
	if (containsDuplicateInstances(root.childrenStore)) return [
		false,
		`Children list contains duplicates`,
		root
	];
	for (const c of root.childrenStore) {
		if (c.parent !== root) return [
			false,
			`Member of childrenStore does not have .parent set`,
			c
		];
		if (hasAnyChild$1(root, c)) return [
			false,
			`Child has parent as its own child`,
			c
		];
		const v = treeTest(c, seen);
		if (!v[0]) return v;
	}
	return [
		true,
		``,
		root
	];
}
/**
* Throws an exception if `root` fails tree validation
* @param root
*/
function throwTreeTest(root) {
	const v = treeTest(root);
	if (v[0]) return;
	throw new Error(`${v[1]} Node: ${toStringAbbreviate(v[2].value, 30)}`, { cause: v[2] });
}
/**
* Iterate over direct children of `root`, yielding {@link TreeNode} instances.
* Use {@link childrenValues} to iterate over child values
* @param root
*/
function* children$2(root) {
	for (const c of root.childrenStore) yield c;
}
/**
* Iterate over the value of direct children of `root`.
* Use {@link children} if you want to iterate over {@link TreeNode} instances instead.
* @param root
*/
function* childrenValues(root) {
	for (const c of root.childrenStore) if (typeof c.value !== `undefined`) yield c.value;
}
/**
* Iterate over all parents of `child`. First result is the immediate parent.
* @param child
*/
function* parents$1(child) {
	let p = child.parent;
	while (p) {
		yield p;
		p = p.parent;
	}
}
/**
* Returns the depth of `node`. A root node (ie. with no parents) has a depth of 0.
* @param node
*/
function nodeDepth(node) {
	return [...parents$1(node)].length;
}
/**
* Returns _true_ if `child` is an immediate child of `parent`.
* @param child
* @param parent
* @param eq Equality function to compare nodes. Uses `isEqualDefault` by default, which compares by reference.
*/
function hasChild$1(child, parent, eq = isEqualDefault) {
	for (const c of parent.childrenStore) if (eq(c, child)) return true;
	return false;
}
/**
* Returns the first immediate child of `parent` that matches `value`.
*
* Use {@link queryByValue} if you want all matching children.
* @param value
* @param parent
* @param eq
*/
function findChildByValue$1(value, parent, eq = isEqualDefault) {
	for (const c of parent.childrenStore) if (eq(value, c.value)) return c;
}
/**
* Yield all immediate children of `parent` that match `value`.
*
* Use {@link findChildByValue} if you only want the first matching child.
* @param value
* @param parent
* @param eq
*/
function* queryByValue(value, parent, eq = isEqualDefault) {
	for (const c of parent.childrenStore) if (eq(value, c.value)) yield c;
}
/**
* Returns _true_ if `prospectiveChild` is some child node of `parent`,
* anywhere in the tree structure.
*
* Use {@link hasChild} to only check immediate children.
* @param prospectiveChild
* @param parent
*/
function hasAnyChild$1(prospectiveChild, parent) {
	for (const c of breadthFirst$2(parent)) if (c === prospectiveChild) return true;
	return false;
}
/**
* Using a breadth-first search, return the first child of `parent` that has `value`.
* @param value Value being sought
* @param parent Parent node
* @param eq Equality function to compare values. Uses `isEqualDefault` by default, which compares by reference.
*/
function findAnyChildByValue$2(value, parent, eq = isEqualDefault) {
	for (const c of breadthFirst$2(parent)) if (eq(c.value, value)) return c;
}
/**
* Traverses up a node to find the root.
* @param node
*/
function getRoot(node) {
	if (node.parent) return getRoot(node.parent);
	return node;
}
/**
* Returns _true_ if `prospectiveParent` is any ancestor
* parent of `child`.
*
* Use {@link hasParent} to only check immediate parent.
* @param child
* @param prospectiveParent
*/
function hasAnyParent$1(child, prospectiveParent) {
	for (const p of parents$1(child)) if (p === prospectiveParent) return true;
	return false;
}
/**
* Yields the node value of each parent of `child`.
* _undefined_ values are not returned.
*
* Use {@link queryParentsValue} to search for a particular value
* @param child
*/
function* parentsValues(child) {
	for (const p of parents$1(child)) if (typeof p.value !== `undefined`) yield p.value;
	return false;
}
/**
* Yields all parents of `child` that have a given value.
* Use {@link findParentsValue} to find the first match only.
* @param child
* @param value
* @param eq
*/
function* queryParentsValue(child, value, eq = isEqualDefault) {
	for (const p of parents$1(child)) if (typeof p.value !== `undefined`) {
		if (eq(p.value, value)) yield p;
	}
	return false;
}
/**
* Returns the first parent that has a given value.
* @param child
* @param value
* @param eq
*/
function findParentsValue(child, value, eq = isEqualDefault) {
	return [...queryParentsValue(child, value, eq)][0];
}
/**
* Returns _true_ if `prospectiveParent` is the immediate
* parent of `child`.
*
* Use {@link hasAnyParent} to check for any ancestor parent.
* @param child
* @param prospectiveParent
*/
function hasParent$1(child, prospectiveParent) {
	return child.parent === prospectiveParent;
}
/**
* Computes the maximum depth of the tree.
* That is, how many steps down from `node` it can go.
* If a tree is: root -> childA -> subChildB
* ```js
* // Yields 2, since there are at max two steps down from root
* computeMaxDepth(root);
* ```
* @param node
*/
function computeMaxDepth(node) {
	return computeMaxDepthImpl(node, 0);
}
function computeMaxDepthImpl(node, startingDepth = 0) {
	let depth = startingDepth;
	for (const c of node.childrenStore) depth = Math.max(depth, computeMaxDepthImpl(c, startingDepth + 1));
	return depth;
}
/**
* Adds a child node to `parent`.
* If `child` already has a parent, it is removed from that parent.
* @param child
* @param parent
* @throws Error if adding a child would break tree structure
*/
function add(child, parent) {
	throwAttemptedChild(child, parent);
	const p = child.parent;
	parent.childrenStore = [...parent.childrenStore, child];
	child.parent = parent;
	if (p) p.childrenStore = without(p.childrenStore, child);
}
/**
* Adds a new child node based on a value
*/
function addValue(value, parent) {
	return createNode$1(value, parent);
}
/**
* Creates the root for a tree, with an optional `value`.
* Use {@link rootWrapped} if you want a more object-oriented mode of access.
* @param value
*/
function root$2(value) {
	return createNode$1(value);
}
function fromPlainObject(value, label = ``, parent, seen = []) {
	const entries = Object.entries(value);
	parent = parent === void 0 ? root$2() : addValue({
		label,
		value
	}, parent);
	for (const entry of entries) {
		const value = entry[1];
		if (seen.includes(value)) continue;
		seen.push(value);
		if (typeof entry[1] === `object`) fromPlainObject(value, entry[0], parent, seen);
		else addValue({
			label: entry[0],
			value
		}, parent);
	}
	return parent;
}
/**
* Creates a tree, returning it as a {@link WrappedNode} for object-oriented access.
* Use {@link Trees.Mutable.root} alternatively.
* @param value
*/
function rootWrapped$1(value) {
	return wrap$1(createNode$1(value));
}
/**
* Creates a `TreeNode` instance with a given value and parent.
* Parent node, if specified, has its `childrenStore` property changed to include new child.
* @param value
* @param parent
*/
function createNode$1(value, parent) {
	const n = {
		childrenStore: [],
		parent,
		value
	};
	if (parent !== void 0) parent.childrenStore = [...parent.childrenStore, n];
	return n;
}
function childrenLength$1(node) {
	return node.childrenStore.length;
}
function value(node) {
	return node.value;
}
/**
* Projects `node` as a dynamic traversable.
* Dynamic in the sense that it creates the traversable project for nodes on demand.
* A consequence is that node identities are not stable.
* @param node
*/
function asDynamicTraversable$1(node) {
	return {
		*children() {
			for (const c of node.childrenStore) yield asDynamicTraversable$1(c);
		},
		getParent() {
			if (node.parent === void 0) return;
			return asDynamicTraversable$1(node.parent);
		},
		getValue() {
			return node.value;
		},
		getIdentity() {
			return node;
		}
	};
}
/**
* Throws an error if:
* 1. `child` is the same node as `parent`
* 2. `child` is already an immediate child of `parent`
* 3. `child` is an ancestor parent of `parent`
* 4. `child` has `parent` as its own child
* @param c
* @param parent
*/
function throwAttemptedChild(c, parent) {
	if (parent === c) throw new Error(`Cannot add self as child`);
	if (c.parent === parent) return;
	if (hasAnyParent$1(parent, c)) throw new Error(`Child contains parent (1)`, { cause: c });
	if (hasAnyParent$1(c, parent)) throw new Error(`Parent already contains child`, { cause: c });
	if (hasAnyChild$1(parent, c)) throw new Error(`Child contains parent (2)`, { cause: c });
}
/**
* Sets the children of `parent` to a list of `children`.
*
* Any previous children are disconnected from this parent.
* All new children have their parent set to `parent`.
*
* There is some validation to ensure that adding the children doesn't break the tree.
*/
function setChildren(parent, children) {
	for (const c of children) throwAttemptedChild(c, parent);
	parent.childrenStore = [...children];
	for (const c of children) c.parent = parent;
}
function toStringDeep$4(node, indent = 0) {
	const t = `${`  `.repeat(indent)} + ${node.value ? JSON.stringify(node.value) : `-`}`;
	return node.childrenStore.length > 0 ? `${t}\n${node.childrenStore.map((d) => toStringDeep$4(d, indent + 1)).join(`\n`)}` : t;
}
function* followValue$1(root, continuePredicate, depth = 1) {
	for (const c of root.childrenStore) {
		const value = c.value;
		if (value === void 0) continue;
		if (continuePredicate(value, depth)) {
			yield c.value;
			yield* followValue$1(c, continuePredicate, depth + 1);
		}
	}
}

//#endregion
//#region ../packages/collections/src/tree/traverse-object.ts
var traverse_object_exports = /* @__PURE__ */ __exportAll({
	asDynamicTraversable: () => asDynamicTraversable,
	children: () => children$1,
	create: () => create$1,
	createSimplified: () => createSimplified,
	createWrapped: () => createWrapped,
	depthFirst: () => depthFirst$2,
	getByPath: () => getByPath,
	prettyPrint: () => prettyPrint,
	prettyPrintEntries: () => prettyPrintEntries,
	toStringDeep: () => toStringDeep$3,
	traceByPath: () => traceByPath
});
/**
* Helper function to get a 'friendly' string representation of an array of {@link TraverseObjectEntry}.
* @param entries 
* @returns 
*/
function prettyPrintEntries(entries) {
	if (entries.length === 0) return `(empty)`;
	let t = ``;
	for (const [index, entry] of entries.entries()) {
		t += `  `.repeat(index);
		t += entry.name + ` = ` + JSON.stringify(entry.leafValue) + `\n`;
	}
	return t;
}
/**
* Returns a human-friendly debug string for a tree-like structure
* ```js
* console.log(Trees.prettyPrint(obj));
* ```
* @param indent
* @param node
* @param options
* @returns
*/
const prettyPrint = (node, indent = 0, options = {}) => {
	resultThrow(nullUndefTest(node, `node`));
	const entry = getNamedEntry(node, options.name ?? `node`);
	const t = `${`  `.repeat(indent)} + name: ${entry.name} value: ${JSON.stringify(entry.leafValue)}`;
	const childrenAsArray = [...children$1(node, options)];
	return childrenAsArray.length > 0 ? t + `\n` + childrenAsArray.map((d) => prettyPrint(d.leafValue, indent + 1, {
		...options,
		name: d.name
	})).join(`\n`) : t;
};
/**
* Returns a debug string representation of the node (recursive)
* @param node 
* @param indent 
* @returns 
*/
const toStringDeep$3 = (node, indent = 0) => {
	let t = ` `.repeat(indent) + ` ${node.value?.name}`;
	if (node.value !== void 0) {
		if (`sourceValue` in node.value && `leafValue` in node.value) {
			let sourceValue = toStringAbbreviate(node.value.sourceValue, 20);
			const leafValue = toStringAbbreviate(node.value.leafValue, 20);
			sourceValue = sourceValue === leafValue ? `` : `source: ` + sourceValue;
			t += ` = ${leafValue} ${sourceValue}`;
		} else if (`sourceValue` in node.value && node.value.sourceValue !== void 0) t += ` = ${node.value.sourceValue}`;
		if (`ancestors` in node.value) t += ` (ancestors: ${node.value.ancestors.join(`, `)})`;
	}
	t += `\n`;
	for (const c of node.childrenStore) t += toStringDeep$3(c, indent + 1);
	return t;
};
/**
* Yields the direct (ie. non-recursive) children of a tree-like object as a pairing
* of node name and value. Supports basic objects, Maps and arrays.
* 
* To iterate recursively, consider {@link depthFirst}
* 
* Each child is returned in an {@link TraverseObjectEntry} structure:
* ```typescript
* type Entry = Readonly<{
*  // Property name
*  name: string, 
*  // Value of property, as if you called `object[propertyName]`
*  sourceValue: any,
*  // Branch nodes will have _undefined_, leaf nodes will contain the value
*  leafValue: any 
* }>;
* ```
* 
* For example, iterating over a flat object:
* ```js
* const verySimpleObject = { field: `hello`, flag: true }
* const kids = [ ...children(verySimpleObject) ];
* // Yields:
* // [ { name: "field", sourceValue: `hello`, leafValue: `hello` },
* //  { name: "flag", sourceValue: true, leafValue: true } ]
* ```
* 
* For objects containing objects:
* ```js
* const lessSimpleObject = { field: `hello`, flag: true, colour: { `red`, opacity: 0.5 } }
* const kids = [ ...children(verySimpleObject) ];
* // Yields as before, plus:
* //  { name: "colour", sourceValue: { name: 'red', opacity: 0.5 }, leafValue: undefined }
* ```
* 
* Note that 'sourceValue' always contains the property value, as if you 
* access it via `object[propName]`. 'leafValue' only contains the value if it's a leaf
* node.
* 
* Arrays are assigned a name based on index.
* @example Arrays
* ```js
* const colours = [ { r: 1, g: 0, b: 0 }, { r: 0, g: 1, b: 0 }, { r: 0, g: 0, b: 1 } ];
* // Children: 
* // [
* //  { name: "array[0]", value: {r:1,g:0,b:0} },
* //  { name: "array[1]", value: {r:0,g:1,b:0} },
* //  { name: "array[2]", value: {r:0,g:0,b:1} },
* // ]
* ```
* 
* Pass in `options.name` (eg 'colours') to have names generated as 'colours[0]', etc.
* Options can also be used to filter children. By default all direct children are returned.
* @param node 
* @param options  
*/
function* children$1(node, options = {}) {
	resultThrow(nullUndefTest(node, `node`));
	const filteringOption = options.filter ?? `none`;
	const filterByValue = (v) => {
		if (filteringOption === `none`) return [true, isPrimitive(v)];
		else if (filteringOption === `leaves` && isPrimitive(v)) return [true, true];
		else if (filteringOption === `branches` && !isPrimitive(v)) return [true, false];
		return [false, isPrimitive(v)];
	};
	if (Array.isArray(node)) for (const [index, element] of node.entries()) {
		const f = filterByValue(element);
		if (f[0]) yield {
			name: index.toString(),
			_kind: `entry`,
			sourceValue: element,
			leafValue: f[1] ? element : void 0
		};
	}
	else if (typeof node === `object`) {
		const entriesIter = `entries` in node ? node.entries() : Object.entries(node);
		for (const [name, value] of entriesIter) {
			const [filter, isPrimitive] = filterByValue(value);
			if (filter) yield {
				name,
				_kind: `entry`,
				sourceValue: value,
				leafValue: isPrimitive ? value : void 0
			};
		}
	}
}
function* depthFirst$2(node, options = {}, ancestors = []) {
	for (const c of children$1(node, options)) {
		yield {
			...c,
			ancestors: [...ancestors],
			_kind: `entry-ancestors`
		};
		yield* depthFirst$2(c.sourceValue, options, [...ancestors, c.name]);
	}
}
/**
* Finds a given direct child by name
* @param name
* @param node
* @returns
*/
function childByName(name, node) {
	for (const d of children$1(node)) if (d.name === name) return d;
}
/**
* Returns the closest matching entry, tracing `path` in an array, Map or simple object.
* Returns an entry with _undefined_ value at the point where tracing stopped.
* Use {@link traceByPath} to step through all the segments.
*
* ```js
* const people = {
*  jane: {
*   address: {
*    postcode: 1000,
*    street: 'West St',
*    city: 'Blahville'
*   },
* colour: 'red'
*  }
* }
* Trees.getByPath('jane.address.postcode', people); // '.' default separator
* // ['postcode', 1000]
* Trees.getByPath('jane.address.country.state', people);
* // ['country', undefined] - since full path could not be resolved.
* ```
* @param path Path, eg `jane.address.postcode`
* @param node Node to look within
* @param options Options for parsing path. By default '.' is used as a separator
* @returns
*/
function getByPath(path, node, options = {}) {
	const v = last$1(traceByPath(path, node, options));
	if (!v) throw new Error(`Could not trace path: ${path} `);
	return v;
}
/**
* Enumerates over children of `node` towards the node named in `path`.
* This is useful if you want to get the interim steps to the target node.
* 
* Use {@link getByPath} if you don't care about interim steps.
*
* ```js
* const people = {
*  jane: {
*   address: {
*    postcode: 1000,
*    street: 'West St',
*    city: 'Blahville'
*   },
* colour: 'red'
*  }
* }
* for (const p of Trees.traceByPath('jane.address.street', people)) {
* // { name: "jane", value: { address: { postcode: 1000,street: 'West St', city: 'Blahville' }, colour: 'red'} },
* // { name: "address", value: { postcode: 1000, street: 'West St', city: 'Blahville' } },
* // { name: "street", value: "West St" } }
* }
* ```
*
* Results stop when the path can't be followed any further.
* The last entry will have a name of the last sought path segment, and _undefined_ as its value.
* 
* @param path Path to traverse
* @param node Starting node
* @param options Options for path traversal logic
* @returns
*/
function* traceByPath(path, node, options = {}) {
	resultThrow(nullUndefTest(path, `path`), nullUndefTest(node, `node`));
	const separator = options.separator ?? `.`;
	const pathSplit = path.split(separator);
	const ancestors = [];
	for (const p of pathSplit) {
		const entry = childByName(p, node);
		if (!entry) {
			yield {
				name: p,
				sourceValue: void 0,
				leafValue: void 0,
				ancestors,
				_kind: `entry-ancestors`
			};
			return;
		}
		node = entry.sourceValue;
		yield {
			...entry,
			ancestors: [...ancestors],
			_kind: `entry-ancestors`
		};
		ancestors.push(p);
	}
}
/**
* Returns a projection of `node` as a dynamic traversable.
* This means that the tree structure is dynamically created as last-minute as possible.
* 
* The type when calling `getValue()` is {@link TraverseObjectEntryStatic}:
* ```typescript
* type EntryStatic = Readonly<{ 
*  name: string,
*  value: any
*  ancestors: string[] 
* }>
* ```
* 
* Note that the object identity of TraversableTree return results is not stable.
* This is because they are created on-the-fly by reading fields of `node`.
* 
* ```js
* const c1 = [ ...asDynamicTraversable(someObject).children() ];
* const c2 = [ ...asDynamicTraversable(someObject).children() ];
* 
* // Object identity is not the same
* c1[ 0 ] === c1[ 0 ]; // false
* 
* // ...even though its referring to the same value
* c1[ 0 ].getValue() === c1[ 0 ].getValue(); // true
* ```
* 
* Instead .getIdentity() to get a stable identity:
* ```js
* c1[ 0 ].getIdentity() === c2[ 0 ].getIdentity(); // true
* ```
* 
* @example
* ```js
* const myObj = { name: `Pedro`, size: 45, colour: `orange` };
* const root = Trees.FromObject.asDynamicTraversable(myObj);
* for (const v of Trees.Traverse.breadthFirst(root)) {
* // v.getValue() yields:
* // { name: 'name', sourceValue: 'Pedro' ...}, 
* // { name: 'size', sourceValue: 45 ... }
* // ...
* }
* ```
* @param node Object to read
* @param options Options when creating traversable
* @param ancestors Do not use
* @param parent Do not use
* @returns 
*/
const asDynamicTraversable = (node, options = {}, ancestors = [], parent) => {
	const name = options.name ?? `object`;
	const t = {
		*children() {
			for (const { name: childName, sourceValue, leafValue } of children$1(node, options)) yield asDynamicTraversable(sourceValue, {
				...options,
				name: childName
			}, [...ancestors, name], t);
		},
		getParent() {
			return parent;
		},
		getValue() {
			return {
				name,
				sourceValue: node,
				ancestors,
				_kind: `entry-static`
			};
		},
		getIdentity() {
			return node;
		}
	};
	return t;
};
/**
* Reads all fields and sub-fields of `node`, returning as a 'wrapped' tree structure.
* Is a snapshot of `node`, and won't update if it mutates.
* @param node 
* @param options 
* @returns 
*/
const createWrapped = (node, options) => {
	return wrap$1(create$1(node, options));
};
/**
* Reads all fields and sub-fields of `node`, returning as a basic tree structure.
* The structure is a snapshot of the object. If the object changes afterwards, the tree will
* remain the same.
* 
* Alternatively, consider {@link asDynamicTraversable} which reads the object dynamically.
* @example
* ```js
* const myObj = { name: `Pedro`, size: 45, colour: `orange` };
* const root = Trees.FromObject.create(myObj);
* for (const v of Trees.Traverse.breadthFirst(root)) {
* // v.getValue() yields:
* // { name: 'name', sourceValue: 'Pedro' ...}, 
* // { name: 'size', sourceValue: 45 ... }
* // ...
* }
* ```
* @param node 
* @param options 
* @returns 
*/
const create$1 = (node, options = {}) => {
	return createImpl(node, (options.valuesAtLeaves ?? false ? (v) => {
		if (isPrimitive(v)) return v;
	} : (v) => v)(node), options, []);
};
const createImpl = (sourceValue, leafValue, options = {}, ancestors) => {
	const defaultName = options.name ?? `object_ci`;
	const r = root$2({
		name: defaultName,
		sourceValue: leafValue,
		ancestors: [...ancestors],
		_kind: `entry-static`
	});
	ancestors = [...ancestors, defaultName];
	for (const c of children$1(sourceValue, options)) {
		const v = options.valuesAtLeaves ? c.leafValue : c.sourceValue;
		add(createImpl(c.sourceValue, v, {
			...options,
			name: c.name
		}, ancestors), r);
	}
	return r;
};
/**
* Returns a copy of `node` with its (and all its childrens') parent information removed.
* 
* Under the hood:
* ```js
* TreeArrayBacked.stripParentage(create(node, options));
* ```
* @param node 
* @param options 
* @returns 
*/
const createSimplified = (node, options = {}) => {
	return stripParentage(create$1(node, options));
};
/**
* Generates a name for a node.
* Uses the 'name' property if it exists, otherwise uses `defaultName`
* @param node
* @param defaultName
* @returns
*/
function getNamedEntry(node, defaultName = ``) {
	if (`name` in node && `leafValue` in node && `sourceValue` in node) return {
		name: node.name,
		_kind: `entry`,
		leafValue: node.leafValue,
		sourceValue: node.sourceValue
	};
	if (`name` in node) return {
		name: node.name,
		leafValue: node,
		sourceValue: node,
		_kind: `entry`
	};
	return {
		name: defaultName,
		leafValue: node,
		sourceValue: node,
		_kind: `entry`
	};
}

//#endregion
//#region ../packages/collections/src/tree/labelled.ts
function isSingleValue(v) {
	if (`value` in v) return true;
	return false;
}
function isMultiValue(v) {
	if (`values` in v) return Array.isArray(v.values);
	return false;
}

//#endregion
//#region ../packages/collections/src/tree/pathed.ts
var pathed_exports = /* @__PURE__ */ __exportAll({
	Pathed: () => Pathed,
	addValueByPath: () => addValueByPath,
	children: () => children,
	childrenLengthByPath: () => childrenLengthByPath,
	clearValuesByPath: () => clearValuesByPath,
	findAnyChildByValue: () => findAnyChildByValue$1,
	hasValue: () => hasValue,
	parent: () => parent,
	parentValues: () => parentValues,
	removeValueByPath: () => removeValueByPath,
	siblings: () => siblings$1,
	siblingsValues: () => siblingsValues,
	toStringDeep: () => toStringDeep$2,
	valueByPath: () => valueByPath,
	valuesByPath: () => valuesByPath
});
/**
* Creates a wrapper for working with 'pathed' trees.
* An example is a filesystem.
*
* ```js
* const t = new Pathed();
* // Store a value. Path implies a structure of
* //   c -> users -> admin
* // ...which is automatically created
* t.add({x:10}, `c.users.admin`);
*
* t.add({x:20}, `c.users.guest`);
* // Tree will now be:
* // c-> users -> admin
* //            -> guest
*
* t.getValue(`c.users.guest`); // { x:20 }
* ```
*
* By default only a single value can be stored at a path.
* Set options to allow this:
* ```js
* const t = new Pathed({ duplicates: `allow` });
* t.add({x:10}, `c.users.admin`);
* t.add({x:20}, `c.users.admin`);
* t.getValue(`c.users.admin`);   // Throws an error because there are multiple values
* t.getValues(`c.users.admin`);  // [ {x:10}, {x:20 } ]
* ```
* @param pathOpts
* @returns
*/
var Pathed = class {
	#root;
	#pathOpts;
	/**
	* Create, using default options
	* @param pathOpts
	*/
	constructor(pathOpts = {}) {
		this.#pathOpts = {
			separator: `.`,
			startsWithSeparator: false,
			duplicates: `overwrite`,
			...pathOpts
		};
	}
	/**
	* Adds a value at the string path, automatically creating intermediate nodes as needed.
	* By default, if a value already exists at the path, it will be overwritten. Set options to change this.
	* @param value Value to associate with path
	* @param path Path
	*/
	add(value, path) {
		throwIfFailed(this.validate(path));
		const n = addValueByPath(value, path, this.#pathOpts, this.#root);
		if (this.#root === void 0) this.#root = getRoot(n);
	}
	validate(path) {
		if (this.#pathOpts.startsWithSeparator && !path.startsWith(this.#pathOpts.separator)) return {
			success: false,
			error: `Path must start with separator when 'startsWithSeparator' is enabled. Got: ${path}`
		};
		return {
			success: true,
			value: path
		};
	}
	/**
	* Returns a string representation of tree
	* @returns Returns a string representation of tree
	*/
	prettyPrint() {
		if (this.#root === void 0) return `(empty)`;
		return toStringDeep$4(this.#root);
	}
	/**
	* Removes the value at the given path, returning _true_
	* if there was a value. This will delete tree nodes if they become empty
	* @param path
	* @returns _true_ if value was removed
	*/
	remove(path) {
		throwIfFailed(this.validate(path));
		if (this.#root === void 0) return false;
		return removeValueByPath(path, this.#root, this.#pathOpts);
	}
	/**
	* Returns _true_ if we have a value at `path`
	* @param path
	* @returns _true_ if value exists at path
	*/
	hasPath(path) {
		throwIfFailed(this.validate(path));
		if (this.#root === void 0) return false;
		return findChildByPath(path, this.#root, this.#pathOpts) !== void 0;
	}
	/**
	* Returns a tree node for a given path, or _undefined_
	* if path does not exist.
	*
	* Use {@link getValue} to get the value at a node instead.
	* @param path
	* @returns The tree node for the given path, or _undefined_ if not found
	*/
	getNode(path) {
		throwIfFailed(this.validate(path));
		if (this.#root === void 0) return;
		return findChildByPath(path, this.#root, this.#pathOpts);
	}
	/**
	* Returns the value at the path, or _undefined_ if path is not found.
	* Use {@link getNode} to get the tree node instead.
	* @param path
	* @returns The value at the path, or _undefined_ if path is not found
	*/
	getValue(path) {
		throwIfFailed(this.validate(path));
		if (this.#root === void 0) return;
		return valueByPath(path, this.#root, this.#pathOpts);
	}
	/**
	* Gets the containing path to `node`. If _includeNode_ is true, we also include the
	* node's own label.
	*/
	getPath(node, includeNode) {
		if (this.#root === void 0) return ``;
		const segments = [];
		if (includeNode && node.value) segments.push(node.value?.label);
		for (const p of parentValues(node)) segments.unshift(p.label);
		let path = segments.join(this.#pathOpts.separator);
		if (this.#pathOpts.startsWithSeparator) {
			if (!path.startsWith(this.#pathOpts.separator)) path = this.#pathOpts.separator + path;
			if (!path.endsWith(this.#pathOpts.separator) && (node.childrenStore.length > 0 || !includeNode)) path += this.#pathOpts.separator;
		}
		return path;
	}
	/**
	* Gets the number of children at a given path.
	* Returns NaN if path does not exist or has no children.
	* @param path
	* @returns The number of children at the path, or NaN if path is not found
	*/
	childrenLength(path) {
		throwIfFailed(this.validate(path));
		if (this.#root === void 0) return NaN;
		const c = findChildByPath(path, this.#root, this.#pathOpts);
		if (c === void 0) return NaN;
		return c.childrenStore.length;
	}
	/**
	* Get all the values stored at a path, if multiple values are allowed. Returns an empty array if path does not exist or has no value.
	* @param path
	* @returns An array of values at the path, or an empty array if path is not found
	*/
	getValues(path) {
		throwIfFailed(this.validate(path));
		if (this.#root === void 0) return void 0;
		return valuesByPath(path, this.#root, this.#pathOpts);
	}
	/**
	* Removes all values at the given path, but leaves the structure of the tree intact. Returns _true_ if there was a value to clear.
	* @param path
	* @returns _true_ if there was a value to clear at the path
	*/
	clearValues(path) {
		throwIfFailed(this.validate(path));
		if (this.#root === void 0) return false;
		return clearValuesByPath(path, this.#root, this.#pathOpts);
	}
	/**
	* Iterate all children of this path
	*/
	*children(path) {
		throwIfFailed(this.validate(path));
		if (this.#root === void 0) return;
		yield* children(path, this.#root, this.#pathOpts);
	}
	/**
	* Iterate all siblings of this path
	*/
	*siblings(path) {
		throwIfFailed(this.validate(path));
		if (this.#root === void 0) return;
		yield* siblings$1(path, this.#root, this.#pathOpts);
	}
	/**
	* Iterate all siblings of this path
	*/
	*siblingsValues(path) {
		throwIfFailed(this.validate(path));
		if (this.#root === void 0) return;
		yield* siblingsValues(path, this.#root, this.#pathOpts);
	}
	/**
	* Returns the parent node of `path`, or _undefined_ if not found or at root.
	*/
	parent(path) {
		throwIfFailed(this.validate(path));
		if (this.#root === void 0) return;
		return parent(path, this.#root, this.#pathOpts);
	}
	get separator() {
		return this.#pathOpts.separator;
	}
	/**
	* Returns the root tree node.
	* @returns   The root tree node, or _undefined_ if tree is empty
	*/
	get root() {
		return this.#root;
	}
};
/**
* Adds a value by a string path, with '.' as a the default delimiter
* Automatically generates intermediate nodes.
*
* ```js
* const root = addValueByPath({}, 'c');
* addValueByPath({x:'blah'}, 'c.users.admin', root);
* ```
*
* Creates the structure:
* ```
* c          value: { }            label: c
* + users    value: undefined      label: users
*  + admin   value: { x: 'blah' }  label: admin
* ```
*
* By default, multiple values under same key are overwritten, with the most recent winning.
* @param value Value to add
* @param path Path to add at
* @param node Node to insert
* @param pathOpts Options
*/
function addValueByPath(value, path, pathOpts, node) {
	const separator = pathOpts.separator;
	const duplicatePath = pathOpts.duplicates;
	const split = path.split(separator);
	let count = 0;
	for (const p of split) {
		const lastEntry = count === split.length - 1;
		const found = findChildByLabel(p, node);
		if (found === void 0) {
			const labelled = {
				value: lastEntry ? value : void 0,
				label: p
			};
			node = createNode$1(labelled, node);
		} else {
			node = found;
			if (lastEntry) switch (duplicatePath) {
				case `ignore`: break;
				case `allow`: {
					const existing = getValuesFromNode(node);
					node.value = {
						values: [...existing, value],
						label: p
					};
					break;
				}
				case `overwrite`:
					node.value = {
						value,
						label: p
					};
					break;
			}
			else node = found;
		}
		count++;
	}
	if (node === void 0) throw new Error(`Could not create tree`);
	return node;
}
/**
* Removes the value at the given path, returning _true_ if there was something to remove.
* @param node
* @returns _true_ if something removed
*/
function isLabelledNodeEmpty(node) {
	if (node.value === void 0) return true;
	if (`values` in node.value) return node.value.values.length === 0;
	if (`value` in node.value) return node.value.value === void 0;
	return true;
}
function pruneLabelledBranch(node) {
	if (node.childrenStore.length > 0) return;
	if (!isLabelledNodeEmpty(node)) return;
	const parent = node.parent;
	if (!parent) return;
	remove$1(node);
	pruneLabelledBranch(parent);
}
function removeValueByPath(path, root, pathOpts) {
	if (root === void 0) return false;
	const c = findChildByPath(path, root, pathOpts);
	if (c === void 0) return false;
	c.value = void 0;
	pruneLabelledBranch(c);
	return true;
}
function clearValuesByPath(path, root, pathOpts) {
	if (root === void 0) return false;
	const c = findChildByPath(path, root, pathOpts);
	if (c === void 0) return false;
	c.value = {
		label: c.value?.label ?? ``,
		value: void 0
	};
	return true;
}
/**
* Return the length of children of `path`, or NaN if path not found.
*/
function childrenLengthByPath(path, searchStart, pathOpts) {
	if (searchStart === void 0) return NaN;
	const c = findChildByPath(path, searchStart, pathOpts);
	if (c === void 0) return NaN;
	return c.childrenStore.length;
}
/**
* Iterate over all the children of `path`
*/
function* children(path, searchStart, pathOpts) {
	if (searchStart === void 0) return;
	const c = findChildByPath(path, searchStart, pathOpts);
	if (c === void 0) return;
	for (const ch of c.childrenStore) yield ch;
}
/**
* Iterate over all the siblings of `path`, excluding the node at `path` itself.
* Yields LabelledNode instances, which allow you to traverse tree. If all you care about is the values, use {@link siblingsValues} instead.
*/
function* siblings$1(path, searchStart, pathOpts) {
	if (searchStart === void 0) return;
	const c = findChildByPath(path, searchStart, pathOpts);
	if (c === void 0) return;
	const parent = c.parent;
	if (parent === void 0) return;
	for (const ch of parent.childrenStore) {
		if (ch === c) continue;
		if (typeof ch === `undefined`) throw new TypeError(`Unexpected undefined child node`);
		yield ch;
	}
}
/**
* Iterate over the values of all the siblings of `path`, excluding the node at `path` itself. If you need to traverse tree, use {@link siblings} instead.
* @param path
* @param searchStart
* @param pathOpts
*/
function* siblingsValues(path, searchStart, pathOpts) {
	for (const s of siblings$1(path, searchStart, pathOpts)) {
		if (s.value === void 0) continue;
		yield s.value;
	}
}
/**
* Return the parent node of `path`, or undefined if not found or at root.
*/
function parent(path, searchStart, pathOpts) {
	if (searchStart === void 0) return;
	const c = findChildByPath(path, searchStart, pathOpts);
	if (c === void 0) return;
	return c.parent;
}
function* parentValues(start) {
	for (const p of parents$1(start)) {
		if (p.value === void 0) continue;
		yield p.value;
	}
}
/**
* Searches direct children, returning the node that has the given `label`
* @param label
* @param node
* @returns Child node, or _undefined_
*/
function findChildByLabel(label, node) {
	if (node === void 0) return void 0;
	if (label === void 0) throw new Error(`Parameter 'label' cannot be undefined`);
	if (node.value?.label === label) return node;
	for (const c of node.childrenStore) if (c.value?.label === label) return c;
}
/**
* Searches children, returning the node that has the given `value`.
* @param value Value
* @param node Node to start search from
* @param maxDepth Maximum depth, defaults to full recursion
* @param eq Equality function
* @returns Child, or _undefined_ if not found
*/
function findAnyChildByValue$1(value, node, maxDepth = Number.MAX_SAFE_INTEGER, eq = isEqualValueDefault) {
	if (typeof node === `undefined`) throw new TypeError(`Param 'node' is undefined`);
	if (maxDepth <= 0) return;
	if (typeof value === `undefined`) throw new Error(`Param 'value' cannot be undefined`);
	for (const c of node.childrenStore) if (hasValue(value, c, eq)) return c;
	for (const c of node.childrenStore) {
		const result = findAnyChildByValue$1(value, c, maxDepth - 1, eq);
		if (typeof result !== `undefined`) return result;
	}
}
function hasValue(value, node, eq = isEqualDefault) {
	if (typeof node.value === `undefined`) return false;
	if (isSingleValue(node.value)) {
		if (eq(node.value.value, value)) return true;
	} else if (isMultiValue(node.value)) {
		for (const v of node.value.values) if (eq(v, value)) return true;
	}
	return false;
}
function valueByPath(path, node, pathOpts = {}) {
	const values = valuesByPath(path, node, pathOpts);
	if (typeof values === `undefined`) return;
	if (values.length === 0) return void 0;
	if (values.length > 1) throw new Error(`Multiple values at path. Use getValues instead`);
	return values[0];
}
function getValuesFromNode(node) {
	if (node.value === void 0) return [];
	if (`values` in node.value) return node.value.values;
	if (`value` in node.value) {
		if (node.value.value === void 0) return [];
		return [node.value.value];
	}
	return [];
}
function findChildByPath(path, searchStart, pathOpts) {
	if (path.endsWith(pathOpts.separator) && pathOpts.startsWithSeparator) path = path.slice(0, -pathOpts.separator.length);
	const split = path.split(pathOpts.separator);
	let c = searchStart;
	for (const p of split) {
		c = findChildByLabel(p, c);
		if (c === void 0) return;
	}
	return c;
}
function valuesByPath(path, searchStart, pathOpts = {}) {
	const separator = pathOpts.separator ?? `.`;
	const split = path.split(separator);
	let c = searchStart;
	for (const p of split) {
		c = findChildByLabel(p, c);
		if (c === void 0) return;
	}
	return getValuesFromNode(c);
}
function formatInspectValue(v) {
	if (v === void 0) return `undefined`;
	if (v === null) return `null`;
	if (typeof v === `string`) return `"${v}"`;
	if (typeof v === `number` || typeof v === `boolean`) return String(v);
	if (Array.isArray(v)) {
		if (v.length === 0) return `[]`;
		return `[ ${v.map(formatInspectValue).join(`, `)} ]`;
	}
	if (typeof v === `object`) return `{ ${Object.entries(v).map(([k, val]) => `${k}: ${formatInspectValue(val)}`).join(`, `)} }`;
	return String(v);
}
/**
* Returns a string representation of a LabelledNode tree.
* Format: `{ label: "x", value: ..., children: [...] }`
*/
function toStringDeep$2(node) {
	const label = node.value?.label ?? `?`;
	const innerValue = node.value === void 0 ? void 0 : `values` in node.value ? node.value.values : `value` in node.value ? node.value.value : void 0;
	const children = node.childrenStore.map((c) => toStringDeep$2(c));
	const childrenStr = children.length === 0 ? `[]` : `[ ${children.join(`, `)} ]`;
	return `{ label: "${label}", value: ${formatInspectValue(innerValue)}, children: ${childrenStr} }`;
}

//#endregion
//#region ../packages/collections/src/tree/traversable-tree.ts
var traversable_tree_exports = /* @__PURE__ */ __exportAll({
	breadthFirst: () => breadthFirst$1,
	childrenLength: () => childrenLength,
	couldAddChild: () => couldAddChild,
	depthFirst: () => depthFirst$1,
	find: () => find$2,
	findAnyChildByValue: () => findAnyChildByValue,
	findAnyParentByValue: () => findAnyParentByValue,
	findByValue: () => findByValue,
	findChildByValue: () => findChildByValue,
	findParentByValue: () => findParentByValue,
	followValue: () => followValue,
	hasAnyChild: () => hasAnyChild,
	hasAnyChildValue: () => hasAnyChildValue,
	hasAnyParent: () => hasAnyParent,
	hasAnyParentValue: () => hasAnyParentValue,
	hasChild: () => hasChild,
	hasChildValue: () => hasChildValue,
	hasParent: () => hasParent,
	hasParentValue: () => hasParentValue,
	parents: () => parents,
	siblings: () => siblings,
	toString: () => toString,
	toStringDeep: () => toStringDeep$1
});
/**
* Returns the number of children of `tree`.
* Under the hood is just `[ ...tree.children() ].length`
* @param tree 
* @returns 
*/
const childrenLength = (tree) => {
	return [...tree.children()].length;
};
/**
* Returns _true_ if `child` is parented at any level (grand-parented etc) by `possibleParent`
* @param child Child being sought
* @param possibleParent Possible parent of child
* @param eq Equality comparison function {@link isEqualDefault} used by default
* @returns
*/
const hasAnyParent = (child, possibleParent, eq) => {
	return hasParent(child, possibleParent, eq, Number.MAX_SAFE_INTEGER);
};
/**
* Returns _true_ if `child` is parented at any level (grand-parented etc) by a parent with value `possibleParentValue`
* @param child Child being sought
* @param possibleParentValue Value of possible parent of child
* @param eq Equality comparison function {@link isEqualDefault} used by default
* @throws TypeError if `child` is undefined
* @returns
*/
const hasAnyParentValue = (child, possibleParentValue, eq) => {
	if (typeof child === `undefined`) throw new TypeError(`Param 'child' is undefined`);
	return hasParentValue(child, possibleParentValue, eq, Number.MAX_SAFE_INTEGER);
};
/**
* Returns any parent of `child` that has value `possibleParentValue`. Returns _undefined_ if not found.
* @param child Child being sought
* @param possibleParentValue Value of possible parent of child
* @param eq Equality comparison function {@link isEqualDefault} used by default
* @returns
*/
const findAnyParentByValue = (child, possibleParentValue, eq) => {
	return findParentByValue(child, possibleParentValue, eq, Number.MAX_SAFE_INTEGER);
};
/**
* Returns _true_ if `child` exists within `possibleParent`. By default it only looks at the immediate
* parent (maxDepth: 0). Use Number.MAX_SAFE_INTEGER for searching recursively upwards (or {@link hasAnyParent})
* @param child Child being sought
* @param possibleParent Possible parent of child
* @param maxDepth Max depth of traversal. Default of 0 only looks for immediate parent.
* @param eq Equality comparison function. {@link isEqualDefault} used by default.
* @returns
*/
const hasParent = (child, possibleParent, eq = isEqualDefault, maxDepth = 0) => {
	if (maxDepth < 0) return false;
	const isChildTrav = isTraversable(child);
	const isParentTrav = isTraversable(possibleParent);
	const p = isChildTrav ? child.getParent() : child.parent;
	if (typeof p === `undefined`) return false;
	if (eq(p, possibleParent)) return true;
	if (eq(isChildTrav ? p.getIdentity() : p.value, isParentTrav ? possibleParent.getIdentity() : possibleParent.value)) return true;
	return hasParent(p, possibleParent, eq, maxDepth - 1);
};
/**
* Checks if a child node has a parent with a certain value
* Note: by default only checks immediate parent. Set maxDepth to a large value to recurse
* 
* Uses `getValue()` on the parent if that function exists.
* @param child Node to start looking from
* @param possibleParentValue Value to seek
* @param eq Equality checker
* @param maxDepth Defaults to 0, so it only checks immediate parent
* @returns 
*/
const hasParentValue = (child, possibleParentValue, eq = isEqualDefault, maxDepth = 0) => {
	if (child === void 0) throw new Error(`Param 'child' is undefined`);
	if (maxDepth < 0) return false;
	const p = `getParent` in child ? child.getParent() : child.parent;
	if (p === void 0) return false;
	if (eq(`getValue` in p ? p.getValue() : p.value, possibleParentValue)) return true;
	return hasParentValue(p, possibleParentValue, eq, maxDepth - 1);
};
/**
* Returns any parent of `child` that has value `possibleParentValue`. Returns _undefined_ if not found.
* @param child Child being sought
* @param possibleParentValue Value of possible parent of child
* @param eq Equality comparison function {@link isEqualDefault} used by default
* @param maxDepth Maximum depth of traversal. Default of 0 only looks for immediate parent.
* @returns 
*/
const findParentByValue = (child, possibleParentValue, eq = isEqualDefault, maxDepth = 0) => {
	if (maxDepth < 0) return;
	const p = `getParent` in child ? child.getParent() : child.parent;
	if (p === void 0) return;
	if (eq(`getValue` in p ? p.getValue() : p.value, possibleParentValue)) return p;
	return findParentByValue(p, possibleParentValue, eq, maxDepth - 1);
};
/**
* Returns _true_ if `prospectiveChild` can be legally added to `parent`.
* _False_ is returned if:
*  * `parent` and `prospectiveChild` are equal
*  * `parent` already contains `prospectiveChild`
*  * `prospectiveChild` has `parent` as its own child
*
* Throws an error if `parent` or `prospectiveChild` is null/undefined.
* @param parent Parent to add to
* @param prospectiveChild Prospective child
* @param eq Equality function
*/
const couldAddChild = (parent, prospectiveChild, eq = isEqualDefault) => {
	if (eq(parent, prospectiveChild)) throw new Error(`Child equals parent`);
	if (hasAnyChild(parent, prospectiveChild, eq)) throw new Error(`Circular. Parent already has child`);
	if (hasAnyChild(prospectiveChild, parent, eq)) throw new Error(`Prospective child has parent as child relation`);
};
/**
* Returns _true_ if _possibleChild_ is contained within _parent_ tree.
* That is, it is any sub-child.
* @param parent Parent tree
* @param possibleChild Sought child
* @param eq Equality function, or {@link isEqualDefault} if undefined.
* @returns
*/
const hasAnyChild = (parent, possibleChild, eq = isEqualDefault) => {
	return hasChild(parent, possibleChild, eq, Number.MAX_SAFE_INTEGER);
};
/**
* Returns _true_ if `parent` has any child with value `possibleChildValue`. It explores
* at children at any depth from `parent`.
* @param parent 
* @param possibleChildValue 
* @param eq 
* @returns 
*/
const hasAnyChildValue = (parent, possibleChildValue, eq = isEqualDefault) => {
	return hasChildValue(parent, possibleChildValue, eq, Number.MAX_SAFE_INTEGER);
};
/**
* Returns _true_ if _possibleChild_ is contained within _maxDepth_ children
* of _parent_ node. By default only looks at immediate children (maxDepth = 0).
*
* ```js
* // Just check parentNode for childNode
* Trees.hasChild(parentNode, childNode);
* // See if parentNode or parentNode's parents have childNode
* Trees.hasChild(parentNode, childNode, 1);
* // Use custom equality function, in this case comparing on name field
* Trees.hasChild(parentNode, childNode, 0, (a, b) => a.name === b.name);
* ```
* @param parent Parent tree
* @param possibleChild Sought child
* @param maxDepth Maximum depth. 0 for immediate children, Number.MAX_SAFE_INTEGER for boundless
* @param eq Equality function, or {@link isEqualDefault} if undefined.
* @returns
*/
const hasChild = (parent, possibleChild, eq = isEqualDefault, maxDepth = 0) => {
	if (maxDepth < 0) return false;
	if (eq(parent, possibleChild)) return true;
	const pId = `getIdentity` in parent ? parent.getIdentity() : parent.value;
	const pcId = `getIdentity` in possibleChild ? possibleChild.getIdentity() : possibleChild.value;
	if (eq(pId, pcId)) return true;
	for (const c of breadthFirst$1(parent, maxDepth)) {
		const cId = `getIdentity` in c ? c.getIdentity() : c.value;
		if (eq(c, possibleChild)) return true;
		if (eq(cId, pcId)) return true;
	}
	return false;
};
/**
* Returns _true_ if `parent` has any child with value `possibleChildValue`. It explores
* at children up to `maxDepth` from `parent`. By default only looks at immediate children (maxDepth = 0).
* @param parent 
* @param possibleValue 
* @param eq 
* @param maxDepth 
* @returns 
*/
const hasChildValue = (parent, possibleValue, eq = isEqualDefault, maxDepth = 0) => {
	if (maxDepth < 0) return false;
	if (eq(parent.getValue(), possibleValue)) return true;
	for (const c of breadthFirst$1(parent, maxDepth)) if (eq(c.getValue(), possibleValue)) return true;
	return false;
};
/**
* Iterates over siblings of `node`.
* 
* Other iteration options:
* * {@link breadthFirst}: Children, breadth-first
* * {@link depthFirst}: Children, depth-first
* * {@link parents}: Chain of parents, starting with immediate parent
* * {@link siblings}: Nodes with same parent
* @param node Node to begin from
* @returns 
*/
function* siblings(node) {
	const p = node.getParent();
	if (p === void 0) return;
	for (const s of p.children()) {
		if (s === node) continue;
		yield s;
	}
}
/**
* Iterates over parents of `node`, starting with immediate parent
* 
* Other iteration options:
* * {@link breadthFirst}: Children, breadth-first
* * {@link depthFirst}: Children, depth-first
* * {@link parents}: Chain of parents, starting with immediate parent
* * {@link siblings}: Nodes with same parent
* @param node Node to begin from
* @returns 
*/
function* parents(node) {
	if (isTraversable(node)) {
		let p = node.getParent();
		while (p !== void 0) {
			yield p;
			p = p.getParent();
		}
	} else {
		let p = node.parent;
		while (p !== void 0) {
			yield p;
			p = p.parent;
		}
	}
}
/**
* Descends `parent`, breadth-first, looking for a particular value.
* Returns _undefined_ if not found.
* @param parent 
* @param possibleValue 
* @param eq 
* @returns 
*/
function findAnyChildByValue(parent, possibleValue, eq = isEqualDefault) {
	return findChildByValue(parent, possibleValue, eq, Number.MAX_SAFE_INTEGER);
}
/**
* Searches breadth-first for `possibleValue` under and including `parent`.
* `maxDepth` sets he maximum level to which the tree is searched.
* @param parent 
* @param possibleValue 
* @param eq 
* @param maxDepth 
* @returns 
*/
function findChildByValue(parent, possibleValue, eq = isEqualDefault, maxDepth = 0) {
	if (maxDepth < 0) return;
	const isTraver = isTraversable(parent);
	if (isTraver) {
		if (eq(parent.getValue(), possibleValue)) return parent;
	} else if (eq(parent.value, possibleValue)) return parent;
	for (const d of breadthFirst$1(parent, maxDepth)) if (isTraver) {
		if (eq(d.getValue(), possibleValue)) return d;
	} else if (eq(d.value, possibleValue)) return d;
}
/**
* Iterates over children of `root`, depth-first.
* 
* Other iteration options:
* * {@link breadthFirst}: Children, breadth-first
* * {@link depthFirst}: Children, depth-first
* * {@link parents}: Chain of parents, starting with immediate parent
* * {@link siblings}: Nodes with same parent
* @param root Root node 
* @returns 
*/
function* depthFirst$1(root) {
	if (!root) return;
	const stack = new StackMutable();
	let entry = root;
	while (entry) {
		const entries = isTraversable(entry) ? [...entry.children()] : [...entry.childrenStore];
		stack.push(...entries);
		if (stack.isEmpty) break;
		entry = stack.pop();
		if (entry) yield entry;
	}
}
/**
* Iterates over the children of `root`, breadth-first
* 
* Other iteration options:
* * {@link breadthFirst}: Children, breadth-first
* * {@link depthFirst}: Children, depth-first
* * {@link parents}: Chain of parents, starting with immediate parent
* * {@link siblings}: Nodes with same parent
* 
* @example Traversing over a simple object
* ```js
* const myObj = { name: `Pedro`, size: 45, colour: `orange` };
* const root = Trees.FromObject.asDynamicTraversable(myObj);
* for (const v of Trees.Traverse.breadthFirst(root)) {
* // v.getValue() yields:
* // { name: 'name', sourceValue: 'Pedro' ...}, 
* // { name: 'size', sourceValue: 45 ... }
* // ...
* }
* ```
* @param root Root node
* @param depth How many levels to traverse 
* @returns 
*/
function* breadthFirst$1(root, depth = Number.MAX_SAFE_INTEGER) {
	if (!root) return;
	const queue = isTraversable(root) ? new QueueMutable() : new QueueMutable();
	let entry = root;
	while (entry) {
		if (depth < 0) return;
		if (entry !== void 0) {
			const kids = `childrenStore` in entry ? entry.childrenStore : entry.children();
			for (const c of kids) {
				yield c;
				queue.enqueue(c);
			}
		}
		entry = queue.dequeue();
		depth--;
	}
}
/**
* Applies `predicate` to `root` and all its child nodes, returning the node where
* `predicate` yields _true_.
* Use {@link findByValue} to find a node by its value
* @param root 
* @param predicate 
* @param order Iterate children by breadth or depth. Default 'breadth'
* @returns 
*/
function find$2(root, predicate, order = `breadth`) {
	if (predicate(root)) return root;
	const iter = order === `breadth` ? breadthFirst$1 : depthFirst$1;
	for (const c of iter(root)) if (predicate(c)) return c;
}
/**
* Applies `predicate` to `root` and all its child nodes, returning the node value for
* `predicate` yields _true_.
* Use {@link find} to filter by nodes rather than values
* 
* ```js
* const n = findByValue(root, (v) => v.name === 'Bob');
* ```
* @param root 
* @param predicate 
* @param order Iterate children by breadth or depth. Default 'breadth'
* @returns 
*/
function findByValue(root, predicate, order = `breadth`) {
	if (predicate(root.getValue())) return root;
	const iter = order === `breadth` ? breadthFirst$1 : depthFirst$1;
	for (const c of iter(root)) if (predicate(c.getValue())) return c;
}
/**
* Search through children in a path-like manner.
* 
* It finds the first child of `root` that matches `continuePredicate`. 
* The function gets passed a depth of 1 to begin with. It recurses, looking for the next sub-child, etc.
* 
* If it can't find a child, it stops.
* 
* This is different to 'find' functions, which exhaustively search all possible child nodes, regardless of position in tree.
* 
* ```js
* const path = 'a.aa.aaa'.split('.');
* const pred = (nodeValue, depth) => {
*  if (nodeValue === path[0]) {
*    path.shift(); // Remove first element
*    return true;
*  }
*  return false;
* }
* 
* // Assuming we have a tree of string values:
* // a
* //   - aa
* //       - aaa
* //   - ab
* // b
* //   - ba
* for (const c of follow(tree, pred)) {
*  // Returns nodes: a, aa and then aaa
* }
* ```
* @param root 
* @param continuePredicate 
* @param depth 
*/
function* followValue(root, continuePredicate, depth = 1) {
	for (const c of root.children()) if (continuePredicate(c.getValue(), depth)) {
		yield c.getValue();
		yield* followValue(c, continuePredicate, depth + 1);
	}
}
function toStringDeep$1(node, depth = 0) {
	if (node === void 0) return `(undefined)`;
	if (node === null) return `(null)`;
	const v = node.getValue();
	let type = typeof v;
	if (Array.isArray(v)) type = `array`;
	let t = `  `.repeat(depth) + `value: ${JSON.stringify(v)} (${type})\n`;
	for (const n of node.children()) t += toStringDeep$1(n, depth + 1);
	return t;
}
function toString(...nodes) {
	let t = ``;
	for (const node of nodes) {
		const v = node.getValue();
		const vString = toStringAbbreviate(v);
		const children = [...node.children()];
		const parent = node.getParent();
		let type = typeof v;
		if (Array.isArray(v)) type = `array`;
		t += `value: ${vString} (${type}) kids: ${children.length} parented: ${parent ? `y` : `n`}\n`;
	}
	return t;
}

//#endregion
//#region ../packages/collections/src/tree/binary-tree.ts
var binary_tree_exports = /* @__PURE__ */ __exportAll({
	addLeft: () => addLeft,
	addRight: () => addRight,
	balanceFactor: () => balanceFactor,
	breadthFirst: () => breadthFirst,
	createNode: () => createNode,
	depthFirst: () => depthFirst,
	find: () => find$1,
	fromArray: () => fromArray$1,
	getLeft: () => getLeft,
	getRight: () => getRight,
	grandparent: () => grandparent,
	hasLeft: () => hasLeft,
	hasRight: () => hasRight,
	height: () => height,
	inOrder: () => inOrder$1,
	isLeaf: () => isLeaf,
	isParentLeftChild: () => isParentLeftChild,
	isParentRightChild: () => isParentRightChild,
	leftSubtreeHeightFn: () => leftSubtreeHeightFn,
	parentChildSide: () => parentChildSide,
	postOrder: () => postOrder$1,
	preOrder: () => preOrder$1,
	removeNode: () => removeNode,
	rightSubtreeHeightFn: () => rightSubtreeHeightFn,
	root: () => root$1,
	rootWrapped: () => rootWrapped,
	setLeft: () => setLeft,
	setRight: () => setRight,
	sibling: () => sibling,
	toArray: () => toArray,
	toStringDeep: () => toStringDeep,
	uncle: () => uncle,
	wrap: () => wrap
});
const getLeftChild = (node) => {
	return node.childrenStore[0];
};
const getRightChild = (node) => {
	return node.childrenStore[1];
};
const getLeft = (node) => {
	return getLeftChild(node);
};
const getRight = (node) => {
	return getRightChild(node);
};
const hasLeft = (node) => {
	return getLeftChild(node) !== void 0;
};
const hasRight = (node) => {
	return getRightChild(node) !== void 0;
};
const isLeaf = (node) => {
	return !hasLeft(node) && !hasRight(node);
};
const setLeft = (parent, child) => {
	const existingLeft = getLeftChild(parent);
	if (existingLeft) existingLeft.parent = void 0;
	const children = [...parent.childrenStore];
	if (child === void 0 && children.length <= 1) {
		parent.childrenStore = [];
		return;
	} else if (child === void 0) {
		children[0] = void 0;
		parent.childrenStore = children;
		return;
	}
	if (children.length === 0) children.push(child);
	else children[0] = child;
	parent.childrenStore = children;
	child.parent = parent;
};
const setRight = (parent, child) => {
	const existingRight = getRightChild(parent);
	if (existingRight) existingRight.parent = void 0;
	const children = [...parent.childrenStore];
	if (child === void 0) {
		if (children.length >= 2) {
			children[1] = void 0;
			if (children[0] === void 0) parent.childrenStore = [];
			else parent.childrenStore = children;
		}
		return;
	}
	if (children.length === 0) children.push(void 0, child);
	else if (children.length === 1) children.push(child);
	else children[1] = child;
	parent.childrenStore = children;
	child.parent = parent;
};
const removeNode = (node) => {
	const p = node.parent;
	if (!p) return;
	if (p.childrenStore[0] === node) setLeft(p, void 0);
	else if (p.childrenStore[1] === node) setRight(p, void 0);
};
const sibling = (node) => {
	const parent = node.parent;
	if (!parent) return void 0;
	const left = getLeftChild(parent);
	const right = getRightChild(parent);
	if (left === node) return right;
	if (right === node) return left;
};
const uncle = (node) => {
	const parent = node.parent;
	if (!parent) return void 0;
	return sibling(parent);
};
const grandparent = (node) => {
	const parent = node.parent;
	if (!parent) return void 0;
	return parent.parent;
};
const isParentLeftChild = (node) => {
	const parent = node.parent;
	if (!parent) return false;
	return getLeftChild(parent) === node;
};
const isParentRightChild = (node) => {
	const parent = node.parent;
	if (!parent) return false;
	return getRightChild(parent) === node;
};
const parentChildSide = (node) => {
	if (!node.parent) return `neutral`;
	return isParentLeftChild(node) ? `left` : `right`;
};
const leftSubtreeHeight = (node) => {
	const left = getLeftChild(node);
	return left ? subtreeHeight(left) + 1 : 0;
};
const rightSubtreeHeight = (node) => {
	const right = getRightChild(node);
	return right ? subtreeHeight(right) + 1 : 0;
};
const subtreeHeight = (node) => {
	return Math.max(leftSubtreeHeight(node), rightSubtreeHeight(node));
};
const height = (node) => {
	return subtreeHeight(node);
};
const balanceFactor = (node) => {
	return leftSubtreeHeight(node) - rightSubtreeHeight(node);
};
const leftSubtreeHeightFn = leftSubtreeHeight;
const rightSubtreeHeightFn = rightSubtreeHeight;
const addLeft = (value, parent) => {
	const existingLeft = getLeftChild(parent);
	if (existingLeft) existingLeft.parent = void 0;
	const child = {
		value,
		parent,
		childrenStore: []
	};
	const children = [...parent.childrenStore];
	if (children.length === 0) children.push(child);
	else if (children.length === 1) children[0] = child;
	else children[0] = child;
	parent.childrenStore = children;
	return child;
};
const addRight = (value, parent) => {
	const existingRight = getRightChild(parent);
	if (existingRight) existingRight.parent = void 0;
	const child = {
		value,
		parent,
		childrenStore: []
	};
	const children = [...parent.childrenStore];
	if (children.length === 0) {
		children.push(void 0);
		children.push(child);
	} else if (children.length === 1) children.push(child);
	else children[1] = child;
	parent.childrenStore = children;
	return child;
};
const root$1 = (value) => {
	return root$2(value);
};
const createNode = (value, parent) => {
	return createNode$1(value, parent);
};
const unwrapNode = (node) => {
	return `node` in node ? node.node : node;
};
const wrapNode = (node) => {
	return wrap(node);
};
const wrap = (node) => {
	return {
		node,
		get left() {
			const left = getLeftChild(node);
			return left ? wrapNode(left) : void 0;
		},
		get right() {
			const right = getRightChild(node);
			return right ? wrapNode(right) : void 0;
		},
		set left(value) {
			setLeft(node, value ? unwrapNode(value) : void 0);
		},
		set right(value) {
			setRight(node, value ? unwrapNode(value) : void 0);
		},
		get parentChildSide() {
			return parentChildSide(node);
		},
		get isParentLeftChild() {
			return isParentLeftChild(node);
		},
		get isParentRightChild() {
			return isParentRightChild(node);
		},
		get isLeaf() {
			return isLeaf(node);
		},
		get sibling() {
			const sib = sibling(node);
			return sib ? wrapNode(sib) : void 0;
		},
		get uncle() {
			const unc = uncle(node);
			return unc ? wrapNode(unc) : void 0;
		},
		get grandparent() {
			const gp = grandparent(node);
			return gp ? wrapNode(gp) : void 0;
		},
		get leftSubtreeHeight() {
			return leftSubtreeHeight(node);
		},
		get rightSubtreeHeight() {
			return rightSubtreeHeight(node);
		},
		get height() {
			return height(node);
		},
		get balanceFactor() {
			return balanceFactor(node);
		},
		has(value) {
			return find$1(node, value) !== void 0;
		},
		addLeft(value) {
			return wrapNode(addLeft(value, node));
		},
		addRight(value) {
			return wrapNode(addRight(value, node));
		},
		setLeft(nodeOrWrapped) {
			setLeft(node, unwrapNode(nodeOrWrapped));
		},
		setRight(nodeOrWrapped) {
			setRight(node, unwrapNode(nodeOrWrapped));
		},
		remove() {
			removeNode(node);
		}
	};
};
const rootWrapped = (value) => {
	return wrap(root$2(value));
};
const find$1 = (root, value) => {
	for (const n of breadthFirst(root)) if (n.value === value) return n;
};
function* inOrder$1(node) {
	const left = getLeftChild(node);
	if (left) yield* inOrder$1(left);
	yield node;
	const right = getRightChild(node);
	if (right) yield* inOrder$1(right);
}
function* preOrder$1(node) {
	yield node;
	const left = getLeftChild(node);
	if (left) yield* preOrder$1(left);
	const right = getRightChild(node);
	if (right) yield* preOrder$1(right);
}
function* postOrder$1(node) {
	const left = getLeftChild(node);
	if (left) yield* postOrder$1(left);
	const right = getRightChild(node);
	if (right) yield* postOrder$1(right);
	yield node;
}
function* depthFirst(node) {
	const left = getLeftChild(node);
	const right = getRightChild(node);
	if (left) yield* depthFirst(left);
	if (right) yield* depthFirst(right);
	yield node;
}
function* breadthFirst(node) {
	yield node;
	const queue = [];
	queue.push(...node.childrenStore.filter((c) => c !== void 0 && c.value !== void 0));
	while (queue.length > 0) {
		const current = queue.shift();
		yield current;
		queue.push(...current.childrenStore.filter((c) => c !== void 0 && c.value !== void 0));
	}
}
const fromArray$1 = (array) => {
	if (array.length === 0) return void 0;
	const rootNode = root$2(array[0]);
	const insert = (index, parent) => {
		const leftIdx = 2 * index + 1;
		const rightIdx = 2 * index + 2;
		if (leftIdx < array.length) {
			addLeft(array[leftIdx], parent);
			insert(leftIdx, getLeftChild(parent));
		}
		if (rightIdx < array.length) {
			addRight(array[rightIdx], parent);
			insert(rightIdx, getRightChild(parent));
		}
	};
	insert(0, rootNode);
	return rootNode;
};
const toArray = (root) => {
	const result = [];
	for (const node of breadthFirst(root)) if (node.value !== void 0) result.push(node.value);
	return result;
};
const toStringDeep = (node, indent = 0) => {
	const v = node.value !== void 0 ? JSON.stringify(node.value) : `-`;
	const prefix = `  `.repeat(indent);
	const left = getLeftChild(node);
	const right = getRightChild(node);
	let result = `${prefix}${v}`;
	if (left || right) {
		result += `\n`;
		if (left) {
			result += `${prefix}  L: ${toStringDeep(left, indent + 1)}`;
			if (right) result += `\n`;
		}
		if (right) result += `${prefix}  R: ${toStringDeep(right, indent + 1)}`;
	}
	return result;
};

//#endregion
//#region ../packages/collections/src/tree/binary-search-tree.ts
var binary_search_tree_exports = /* @__PURE__ */ __exportAll({
	Bst: () => Bst,
	create: () => create,
	find: () => find,
	fromArray: () => fromArray,
	has: () => has,
	inOrder: () => inOrder,
	insert: () => insert,
	max: () => max,
	min: () => min,
	postOrder: () => postOrder,
	preOrder: () => preOrder,
	remove: () => remove,
	root: () => root,
	valuesInOrder: () => valuesInOrder
});
var Bst = class {
	root;
	comparer;
	constructor(comparer = defaultComparer) {
		this.comparer = comparer;
		this.root = root$1();
	}
	insert(value) {
		this.root = insert(this.root, value, this.comparer);
		return this.root;
	}
	has(value) {
		return has(this.root, value, this.comparer);
	}
	find(value) {
		return find(this.root, value, this.comparer);
	}
	remove(value) {
		const result = remove(this.root, value, this.comparer);
		if (result) this.root = result;
		return result !== void 0;
	}
	min() {
		return min(this.root);
	}
	max() {
		return max(this.root);
	}
	inOrder() {
		return inOrder(this.root);
	}
	preOrder() {
		return preOrder(this.root);
	}
	postOrder() {
		return postOrder(this.root);
	}
	valuesInOrder() {
		return valuesInOrder(this.root);
	}
	toArrayInOrder() {
		return Array.from(this.valuesInOrder());
	}
};
const insert = (root, value, compare = defaultComparer) => {
	if (root.value === void 0) {
		root.value = value;
		return root;
	}
	let current = root;
	while (true) {
		const cmp = compare(value, current.value);
		if (cmp < 0) {
			const left = getLeft(current);
			if (left) current = left;
			else {
				addLeft(value, current);
				break;
			}
		} else if (cmp > 0) {
			const right = getRight(current);
			if (right) current = right;
			else {
				addRight(value, current);
				break;
			}
		} else break;
	}
	return root;
};
const has = (root, value, compare = defaultComparer) => {
	return find(root, value, compare) !== void 0;
};
const find = (root, value, compare = defaultComparer) => {
	if (!root || root.value === void 0) return void 0;
	const cmp = compare(value, root.value);
	if (cmp === 0) return root;
	else if (cmp < 0) {
		const left = getLeft(root);
		return left ? find(left, value, compare) : void 0;
	} else {
		const right = getRight(root);
		return right ? find(right, value, compare) : void 0;
	}
};
const min = (root) => {
	if (!root || root.value === void 0) return void 0;
	let current = root;
	while (getLeft(current)) current = getLeft(current);
	return current;
};
const max = (root) => {
	if (!root || root.value === void 0) return void 0;
	let current = root;
	while (getRight(current)) current = getRight(current);
	return current;
};
const remove = (root, value, compare = defaultComparer) => {
	if (!root || root.value === void 0) return void 0;
	const nodeToRemove = find(root, value, compare);
	if (!nodeToRemove) return;
	const left = getLeft(nodeToRemove);
	const right = getRight(nodeToRemove);
	if (!left && !right) if (nodeToRemove === root) {
		root.value = void 0;
		root.childrenStore = [];
	} else removeNode(nodeToRemove);
	else if (!left) if (nodeToRemove === root) {
		root.value = right.value;
		root.childrenStore = right.childrenStore;
		for (const child of root.childrenStore) if (child) child.parent = root;
	} else {
		const parent = nodeToRemove.parent;
		if (getLeft(parent) === nodeToRemove) setLeft(parent, right);
		else setRight(parent, right);
	}
	else if (!right) if (nodeToRemove === root) {
		root.value = left.value;
		root.childrenStore = left.childrenStore;
		for (const child of root.childrenStore) if (child) child.parent = root;
	} else {
		const parent = nodeToRemove.parent;
		if (getLeft(parent) === nodeToRemove) setLeft(parent, left);
		else setRight(parent, left);
	}
	else {
		const successor = min(right);
		nodeToRemove.value = successor.value;
		const succParent = successor.parent;
		const succRight = getRight(successor);
		if (getLeft(succParent) === successor) setLeft(succParent, succRight);
		else setRight(succParent, succRight);
	}
	return root;
};
function* inOrder(node) {
	if (!node) return;
	const left = getLeft(node);
	if (left) yield* inOrder(left);
	yield node;
	const right = getRight(node);
	if (right) yield* inOrder(right);
}
function* preOrder(node) {
	if (!node) return;
	yield node;
	const left = getLeft(node);
	if (left) yield* preOrder(left);
	const right = getRight(node);
	if (right) yield* preOrder(right);
}
function* postOrder(node) {
	if (!node) return;
	const left = getLeft(node);
	if (left) yield* postOrder(left);
	const right = getRight(node);
	if (right) yield* postOrder(right);
	yield node;
}
function* valuesInOrder(node) {
	for (const n of inOrder(node)) if (n.value !== void 0) yield n.value;
}
const create = (comparer) => {
	return new Bst(comparer);
};
const fromArray = (array, comparer = defaultComparer) => {
	const bst = new Bst(comparer);
	for (const value of array) bst.insert(value);
	return bst;
};
const root = () => {
	return root$1();
};

//#endregion
//#region ../packages/collections/src/tree/index.ts
var tree_exports = /* @__PURE__ */ __exportAll({
	BinarySearchTree: () => binary_search_tree_exports,
	BinaryTree: () => binary_tree_exports,
	FromObject: () => traverse_object_exports,
	Mutable: () => tree_mutable_exports,
	Pathed: () => pathed_exports,
	Traverse: () => traversable_tree_exports,
	compare: () => compare$1,
	isMultiValue: () => isMultiValue,
	isSingleValue: () => isSingleValue,
	isTraversable: () => isTraversable,
	isTreeNode: () => isTreeNode,
	toTraversable: () => toTraversable
});
/**
* Makes a 'traversable' to move around a {@link TreeNode}, 
* an existing {@link TraversableTree} or a plain object.
* 
* @param node 
* @returns 
*/
const toTraversable = (node) => {
	if (isTraversable(node)) return node;
	if (isTreeNode(node)) return asDynamicTraversable$1(node);
	if (typeof node === `object`) return asDynamicTraversable(node);
	throw new Error(`Parameter 'node' not convertible`);
};
/**
* Checks whether `node` is of type {@link TreeNode}.
* 
* Checks for: parent, childrenStore and value defined on `node`.
* @param node 
* @returns 
*/
const isTreeNode = (node) => {
	if (`parent` in node && `childrenStore` in node && `value` in node) {
		if (Array.isArray(node.childrenStore)) return true;
	}
	return false;
};
/**
* Checks if `node` is of type {@link TraversableTree}.
* 
* Checks by looking for: children, getParent, getValue and getIdentity defined on `node`.
* @param node 
* @returns 
*/
const isTraversable = (node) => {
	return `children` in node && `getParent` in node && `getValue` in node && `getIdentity` in node;
};

//#endregion
//#region ../packages/collections/src/index.ts
var src_exports = /* @__PURE__ */ __exportAll({
	CircularArray: () => CircularArray,
	CompareByEnd: () => CompareByEnd,
	CompareByEndOnly: () => CompareByEndOnly,
	CompareByStart: () => CompareByStart,
	CompareByStartOnly: () => CompareByStartOnly,
	ExpiringMap: () => ExpiringMap,
	Graphs: () => graph_exports,
	MapOfSimpleMutable: () => MapOfSimpleMutable,
	Maps: () => map_exports,
	QueueImmutable: () => QueueImmutable,
	QueueMutable: () => QueueMutable,
	Queues: () => queue_exports,
	SetStringImmutable: () => SetStringImmutable,
	SetStringMutable: () => SetStringMutable,
	Sets: () => set_exports,
	StackImmutable: () => StackImmutable,
	StackMutable: () => StackMutable,
	Stacks: () => stack_exports,
	Table: () => Table,
	Trees: () => tree_exports,
	applyToPositions: () => applyToPositions,
	arrayFromItems: () => arrayFromItems,
	compareRange: () => compareRange,
	computeRange: () => computeRange,
	createFromStarts: () => createFromStarts,
	defragment: () => defragment,
	fromDuration: () => fromDuration,
	holepunch: () => holepunch,
	insertSpace: () => insertSpace,
	intervals: () => intervals,
	isEmpty: () => isEmpty$2,
	isEventItem: () => isEventItem,
	isValid: () => isValid,
	itemsWithEnd: () => itemsWithEnd,
	itemsWithStart: () => itemsWithStart,
	overlapping: () => overlapping,
	remove: () => remove$2,
	sortByEnd: () => sortByEnd,
	sortByStart: () => sortByStart,
	splitEvent: () => splitEvent,
	sumDuration: () => sumDuration,
	toDuration: () => toDuration,
	translate: () => translate
});

//#endregion
export { defragment as A, overlapping as B, CompareByStart as C, compareRange as D, arrayFromItems as E, isEmpty$2 as F, sumDuration as G, sortByEnd as H, isEventItem as I, CircularArray as J, toDuration as K, isValid as L, holepunch as M, insertSpace as N, computeRange as O, intervals as P, itemsWithEnd as R, CompareByEndOnly as S, applyToPositions as T, sortByStart as U, remove$2 as V, splitEvent as W, Table as _, set_exports as a, StackMutable as b, mutable as c, map_exports as d, MapOfSimpleMutable as f, graph$1 as g, connect$1 as h, StackImmutable as i, fromDuration as j, createFromStarts as k, queue_exports as l, graph_exports as m, tree_exports as n, SetStringImmutable as o, ExpiringMap as p, translate as q, stack_exports as r, SetStringMutable as s, src_exports as t, QueueImmutable as u, QueueMutable as v, CompareByStartOnly as w, CompareByEnd as x, mutable$2 as y, itemsWithStart as z };
//# sourceMappingURL=src-DnUdDLFW.js.map