//#region ../packages/guards/src/types.d.ts
type NumberGuardRange = `` | `finite`
/**
 * Can be any number, except zero
 */
| `nonZero` | `positive` | `negative`
/**
 * Must be above zero
 */
| `aboveZero` | `belowZero` | `percentage` | `bipolar`;
type ResultOk<TValue> = {
  success: true;
  value: TValue;
  info?: string;
};
type ResultError<TError> = {
  success: false;
  error: TError;
  info?: string;
};
type ResultOrFunction = boolean | Result<any, any> | (() => undefined | Result<any, any>);
type Result<TValue, TError> = ResultOk<TValue> | ResultError<TError>;
//#endregion
//#region ../packages/guards/src/arrays.d.ts
/**
 * Throws an error if parameter is not an array
 * @param value
 * @param parameterName
 */
declare const arrayTest: (value: unknown, parameterName?: string) => Result<any[], string>;
/**
 * Throws if `index` is an invalid array index for `array`, and if
 * `array` itself is not a valid array.
 * @param array
 * @param index
 */
declare const arrayIndexTest: <V>(array: ArrayLike<V>, index: number, name?: string) => Result<ArrayLike<V>, string>;
/**
 * Returns true if parameter is an array of strings
 * @param value
 * @returns
 */
declare const arrayStringsTest: (value: unknown) => Result<string[], string>;
//#endregion
//#region ../packages/guards/src/boolean.d.ts
/**
 * Throws an error if parameter is not an boolean
 * @param value
 * @param parameterName
 */
declare function booleanTest(value: unknown, parameterName?: string): Result<boolean, string>;
//#endregion
//#region ../packages/guards/src/empty.d.ts
declare const nullUndefTest: <TValue>(value: TValue, parameterName?: string) => Result<TValue, string>;
declare const isDefined: <T>(argument: T | undefined) => argument is T;
//#endregion
//#region ../packages/guards/src/function.d.ts
declare const isFunction: (object: unknown) => object is (...args: any[]) => any;
declare function functionTest(value: unknown, parameterName?: string): Result<Function, string>;
//#endregion
//#region ../packages/guards/src/numbers.d.ts
/**
 * Returns true if `x` is a power of two
 * @param x
 * @returns True if `x` is a power of two
 */
declare const isPowerOfTwo: (x: number) => boolean;
/**
 * Returns `fallback` if `v` is NaN, otherwise returns `v`.
 *
 * Throws if `v` is not a number type, null or undefined
 * @param v
 * @param fallback
 */
declare function ifNaN(v: unknown, fallback: number): number;
/**
 * Parses `value` as an integer, returning it if it meets the `range` criteria.
 * If not, `defaultValue` is returned.
 *
 * ```js
 * const i = integerParse('10', 'positive');    // 10
 * const i = integerParse('10.5', 'positive');  // 10
 * const i = integerParse('0', 'nonZero', 100); // 100
 * ```
 *
 * NaN is returned if criteria does not match and no default is given
 * ```js
 * const i = integerParse('10', 'negative');    // NaN
 * ```
 *
 * @param value
 * @param range
 * @param defaultValue
 */
declare function integerParse(value: string | number | null, range?: NumberGuardRange, defaultValue?: number): number;
/**
 * Checks if `t` is not a number or within specified range.
 * Returns `[false, reason:string]` if invalid or `[true]` if valid.
 *
 * Alternatives: {@link integerTest} for additional integer check, {@link percentTest} for percentage-range.
 *
 * (empty, default): must be a number type and not NaN.
 * finite: must be a number, not NaN and not infinite
 * positive: must be at least zero
 * negative: must be zero or lower
 * aboveZero: must be above zero
 * belowZero: must be below zero
 * percentage: must be within 0-1, inclusive
 * nonZero: can be anything except zero
 * bipolar: can be -1 to 1, inclusive
 * @param value Value to check
 * @param range Range to enforce
 * @param parameterName Name of parameter (for more helpful exception messages)
 * @param info Additional info
 */
declare function numberTest(value?: unknown, range?: NumberGuardRange, parameterName?: string, info?: string): Result<number, string>;
/**
 * Checks if `t` is not a number or within specified range.
 * Throws if invalid. Use {@link numberTest} to test without throwing.
 *
 * (empty, default): must be a number type and not NaN.
 * positive: must be at least zero
 * negative: must be zero or lower
 * aboveZero: must be above zero
 * belowZero: must be below zero
 * percentage: must be within 0-1, inclusive
 * nonZero: can be anything except zero
 * bipolar: can be -1 to 1, inclusive
 *
 * Alternatives: {@link integerTest} for additional integer check, {@link percentTest} for percentage-range.
 * @param value Value to test
 * @param range Range
 * @param parameterName Name of parameter
 */
/**
 * Compares two numbers with a given number of decimal places
 * ```js
 * a: 10.123 b: 10.1    decimals: 1 = true
 * a: 10.123 b: 10.2    decimals: 0 = true
 * a: 10.123 b: 10.14   decimals: 1 = true
 * a: 10.123 b: 10.14   decimals: 2 = false
 * ``
 * @param a
 * @param b
 * @param decimals How many decimals to include
 * @returns
 */
declare function numberDecimalTest(a: number, b: number, decimals?: number): Result<number, string>;
/**
 * Returns test of `value` being in the range of 0-1.
 * Equiv to `number(value, `percentage`);`
 *
 * This is the same as calling ```number(t, `percentage`)```
 * @param value Value to check
 * @param parameterName Param name for customising exception message
 * @param info Additional info for exception message
 */
declare function percentTest(value: number, parameterName?: string, info?: string): Result<number, string>;
/**
 * Checks if `value` an integer and meets additional criteria.
 * See {@link numberTest} for guard details, or use that if integer checking is not required.
 *
 * Note:
 * `bipolar` will mean -1, 0 or 1.
 * positive: must be at least zero
 * negative: must be zero or lower
 * aboveZero: must be above zero
 * belowZero: must be below zero
 * percentage: must be within 0-1, inclusive
 * nonZero: can be anything except zero
 * @param value Value to check
 * @param range Guard specifier.
 * @param parameterName Param name for customising exception message
 */
declare function integerTest(value: unknown, range?: NumberGuardRange, parameterName?: string): Result<number, string>;
declare function integerArrayTest(numbers: Iterable<number>): Result<Iterable<number>, string>;
/**
 * Returns _true_ if `value` is an integer in number or string form
 * @param value
 *
 */
declare function isInteger(value: number | string): boolean;
declare function numberInclusiveRangeTest(value: number | undefined, min: number, max: number, parameterName?: string): Result<number, string>;
/**
 * Returns a success if values are equal, considering the set digits of precision (1..21)
 *
 * @param expected Expected value
 * @param got Received value
 * @param precision Precision in terms of decimal digits. 1...21, default 21
 * @param parameterName Name of parameter (for more helpful exception messages)
 */
declare function equalWithPrecisionTest(expected: number, got: number, precision?: number, parameterName?: string): Result<number, string>;
//#endregion
//#region ../packages/guards/src/object.d.ts
/**
 * Tests_if `value` is a plain object
 *
 * ```js
 * isPlainObject(`text`); // false
 * isPlainObject(document); // false
 * isPlainObject({ hello: `there` }); // true
 * ```
 * @param value
 * @returns
 */
declare const testPlainObject: (value: unknown) => Result<object, string>;
/**
 * Tests if `value` is primitive value (bigint,number,string or boolean) or plain object
 * @param value
 * @returns
 */
declare const testPlainObjectOrPrimitive: (value: unknown) => Result<object | bigint | number | string | boolean, string>;
//#endregion
//#region ../packages/guards/src/range.d.ts
type ExpectedOpts = {
  minInclusive?: number;
  maxInclusive?: number;
  minExclusive?: number;
  maxExclusive?: number;
};
declare const rangeIntegerTest: (v: Iterable<number>, expected: ExpectedOpts) => Result<Iterable<number>, string>;
/**
 * Inclusive range 4-6 = 4, 5, 6
 * Exclusive range 4-6 = 5
 *
 * @param numbers
 * @param expected
 * @returns
 */
declare const rangeTest: (numbers: Iterable<number>, expected: ExpectedOpts) => Result<Iterable<number>, string>;
//#endregion
//#region ../packages/guards/src/result.d.ts
declare function getErrorMessage(ex: unknown): string;
/**
 * Throws an error if any result is a failure.
 * Error message will be the combined from all errors.
 * @param results
 */
declare function throwIfFailed(...results: Array<Result<any, any>>): void;
/**
 * If any of `results` is an error, throws it, otherwise ignored.
 * @param results
 * @returns _true_ or throws
 */
declare function resultThrow(...results: ResultOrFunction[]): boolean;
declare function resultThrowSingle<TValue>(result: Result<TValue, any>): result is ResultOk<TValue>;
/**
 * Returns the first failed result, or _undefined_ if there are no fails
 * @param results
 */
declare function resultFirstFail_<TError>(...results: ResultOrFunction[]): ResultError<TError> | undefined;
/**
 * Returns _true_ if `result` is an error
 * @param result
 */
declare function resultIsError<TValue, TError>(result: Result<TValue, TError>): result is ResultError<TError>;
/**
 * Returns _true_ if `result` is OK and has a value
 * @param result
 */
declare function resultIsOk<TValue, TError>(result: Result<TValue, TError>): result is ResultOk<TValue>;
declare class IxfxError extends Error {
  cause: string | undefined;
  constructor(message: string, cause?: string);
  static fromError(error: Error, cause?: string): IxfxError;
  static fromString(message: string, cause?: string): IxfxError;
}
/**
 * Gets the result as an Error
 * @param result
 */
declare function resultToError(result: ResultError<any>): Error;
/**
 * Unwraps the result, returning its value if OK.
 * If not, an exception is thrown.
 * @param result
 */
declare function resultToValue<TValue, TError>(result: Result<TValue, TError>): TValue;
/**
 * Returns the error as a string.
 * @param result
 */
declare function resultErrorToString(result: ResultError<any>): string;
/**
 * Returns a {@link ResultError} using 'error' as the message.
 * @param error
 * @param info
 */
declare function errorResult(error: string, info?: string): ResultError<string>;
/**
 * Returns first failed result or final value.
 * @param results
 */
declare function resultsCollate<TValue, TError>(...results: ResultOrFunction[]): Result<TValue, TError>;
/**
 * If `result` is an error, calls `callback`, passing the error.
 * Otherwise does nothing
 * @param result
 * @param callback
 */
declare function resultWithFail<TError>(result: Result<any, TError>, callback: (r: ResultError<TError>) => void): void;
//#endregion
//#region ../packages/guards/src/string.d.ts
type StringGuardRange = `` | `non-empty`;
/**
 * Throws an error if parameter is not an string
 * @param value Value to check
 * @param range Range conditions, if any
 * @param parameterName Name of parameter, for customising error message
 */
declare function stringTest(value: unknown, range?: StringGuardRange, parameterName?: string): Result<string, string>;
declare namespace index_d_exports {
  export { ExpectedOpts, IxfxError, NumberGuardRange, Result, ResultError, ResultOk, ResultOrFunction, StringGuardRange, arrayIndexTest, arrayStringsTest, arrayTest, booleanTest, equalWithPrecisionTest, errorResult, functionTest, getErrorMessage, ifNaN, integerArrayTest, integerParse, integerTest, isDefined, isFunction, isInteger, isPowerOfTwo, nullUndefTest, numberDecimalTest, numberInclusiveRangeTest, numberTest, percentTest, rangeIntegerTest, rangeTest, resultErrorToString, resultFirstFail_, resultIsError, resultIsOk, resultThrow, resultThrowSingle, resultToError, resultToValue, resultWithFail, resultsCollate, stringTest, testPlainObject, testPlainObjectOrPrimitive, throwIfFailed };
}
//#endregion
export { numberDecimalTest as A, arrayStringsTest as B, equalWithPrecisionTest as C, integerTest as D, integerParse as E, isFunction as F, ResultOk as G, NumberGuardRange as H, isDefined as I, ResultOrFunction as K, nullUndefTest as L, numberTest as M, percentTest as N, isInteger as O, functionTest as P, booleanTest as R, testPlainObjectOrPrimitive as S, integerArrayTest as T, Result as U, arrayTest as V, ResultError as W, throwIfFailed as _, errorResult as a, rangeTest as b, resultFirstFail_ as c, resultThrow as d, resultThrowSingle as f, resultsCollate as g, resultWithFail as h, IxfxError as i, numberInclusiveRangeTest as j, isPowerOfTwo as k, resultIsError as l, resultToValue as m, StringGuardRange as n, getErrorMessage as o, resultToError as p, stringTest as r, resultErrorToString as s, index_d_exports as t, resultIsOk as u, ExpectedOpts as v, ifNaN as w, testPlainObject as x, rangeIntegerTest as y, arrayIndexTest as z };