//#region ../packages/process/src/basic.ts
/**
* Outputs the current largest-seen value
* @returns 
*/
const max = () => {
	let max = Number.MIN_SAFE_INTEGER;
	const compute = (value) => {
		const valueArray = Array.isArray(value) ? value : [value];
		for (const subValue of valueArray) {
			if (typeof subValue !== `number`) break;
			max = Math.max(subValue, max);
		}
		return max;
	};
	return compute;
};
/**
* Outputs the current smallest-seen value
* @returns
*/
const min = () => {
	let min = Number.MAX_SAFE_INTEGER;
	const compute = (value) => {
		const valueArray = Array.isArray(value) ? value : [value];
		for (const subValue of valueArray) {
			if (typeof subValue !== `number`) break;
			min = Math.min(subValue, min);
		}
		return min;
	};
	return compute;
};
/**
* Returns a sum of values
* @returns 
*/
const sum = () => {
	let t = 0;
	const compute = (value) => {
		const valueArray = Array.isArray(value) ? value : [value];
		for (const subValue of valueArray) {
			if (typeof subValue !== `number`) continue;
			t += subValue;
		}
		return t;
	};
	return compute;
};
/**
* Returns the current average of input values
* @returns 
*/
const average = () => {
	let total = 0;
	let tally = 0;
	const compute = (value) => {
		const valueArray = Array.isArray(value) ? value : [value];
		for (const subValue of valueArray) {
			if (typeof subValue !== `number`) continue;
			tally++;
			total += subValue;
		}
		return total / tally;
	};
	return compute;
};
/**
* Returns the tally (ie number of) values
* @param countArrayItems 
* @returns 
*/
const tally = (countArrayItems) => {
	let t = 0;
	const compute = (value) => {
		if (countArrayItems) if (Array.isArray(value)) t += value.length;
		else t++;
		else t++;
		return t;
	};
	return compute;
};
/**
* Returns the 'best' value seen so far as determined by a ranking function.
* This is similar to min/max but usable for objects.
* @param r 
* @param options 
* @returns 
*/
function rank(r, options = {}) {
	const includeType = options.includeType;
	const emitEqualRanked = options.emitEqualRanked ?? false;
	const emitRepeatHighest = options.emitRepeatHighest ?? false;
	let best;
	return (value) => {
		if (includeType && typeof value !== includeType) return;
		if (best === void 0) {
			best = value;
			return best;
		} else {
			const result = r(value, best);
			if (result == `a`) {
				best = value;
				return best;
			} else if (result === `eq` && emitEqualRanked) return best;
			else if (emitRepeatHighest) return best;
		}
	};
}

//#endregion
export { sum as a, rank as i, max as n, tally as o, min as r, average as t };
//# sourceMappingURL=basic-Bepd6Tc6.js.map