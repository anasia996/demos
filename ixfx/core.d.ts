import { a as ChangeRecord, i as ChangeKind, n as pathed_d_exports, o as CompareChangeSet, r as records_d_exports } from "./pathed-BzJuw32Z.js";
import { a as RecursiveWriteable, c as Rest, i as RecursiveReplace, l as Writeable, n as ReadonlyRemapObjectPropertyType, o as RemapObjectPropertyType, r as RecursivePartial, s as RequireOnlyOne, t as PartialBy } from "./ts-utility-q8tixyWv.js";
import { a as isEqualDefault, c as isEqualValuePartial, i as isEqualContextString, n as IsEqualContext, o as isEqualValueDefault, r as isEmptyEntries, s as isEqualValueIgnoreOrder, t as IsEqual } from "./is-equal-1be1DQKa.js";
import { a as KeyValue, c as RankArrayOptions, d as StringOrNumber, f as ToString, i as Interval, l as RankFunction, n as IDictionary, o as Primitive, r as IWithEntries, s as PrimitiveOrObject, t as BasicType, u as RankOptions } from "./types-BE4PFAIb.js";
import { C as maps_d_exports } from "./maps-CoZD_exS.js";
import { a as jsComparer, i as defaultComparer, n as Comparer, o as numericComparer, r as comparerInverse, t as CompareResult } from "./comparers-DjWD56WI.js";
import { a as HasCompletion, c as continuously, i as ContinuouslySyncCallback, n as ContinuouslyAsyncCallback, o as HasCompletionRunStates, r as ContinuouslyOpts, s as OnStartCalled, t as Continuously } from "./continuously-CBWOyNQH.js";
import { A as elapsedOnce, C as isPrimitiveOrObject, D as Since, E as filterValue, F as Similarity, I as align, L as alignById, M as defaultKeyer, N as AlignOpts, O as elapsedInfinity, P as DataWithId, S as isPrimitive, T as isEqualTrace, _ as elapsedToHumanString, a as ResolvedObject, b as isInterval, c as hasLast, d as runningiOS, f as defaultToString, g as toStringOrdered, h as toStringDefault, i as parseUrlParameters, j as elapsedSince, k as elapsedInterval, l as isReactive, m as isSet, n as ArrayLengthMutationKeys, o as resolveFields, p as isMap, r as FixedLengthArray, s as resolveFieldsSync, t as ArrayItems, u as promiseFromEvent, v as intervalToMs, w as isInteger, x as compareIterableValuesShallow, y as isDateObject } from "./types-array-CAnC2PMz.js";
import { n as KeyValueSorter, r as keyValueSorter, t as KeyValueSortSyles } from "./key-value-UUIpsz1x.js";
import { a as resolve, c as resolveWithFallbackSync, d as ReactiveInitial, f as ReactiveNonInitial, i as ResolveToValueSync, l as Passed, m as Unsubscriber, n as ResolveToValue, o as resolveSync, p as SignalKinds, r as ResolveToValueAsync, s as resolveWithFallback, t as ResolveFallbackOptions, u as Reactive } from "./resolve-core-Cs9xhh5G.js";
import { n as sleep, r as sleepWhile, t as SleepOpts } from "./sleep-aOD7WyQT.js";

//#region ../packages/core/src/trackers/track-unique.d.ts
type TrackUnique<T> = (value: T) => boolean;
/**
 * Tracks unique values. Returns _true_ if value is unique.
 * Alternatively: {@link uniqueInstances}
 *
 * ```js
 * const t = unique();
 * t(`hello`); // true
 * t(`hello`); // false
 * ```
 *
 * Uses JSON.stringify to compare anything which is not a string.
 *
 * Provide a custom function to convert to string to track uniqueness
 * for more complicated objects.
 *
 * ```js
 * const t = unique(p => p.name);
 * t({ name:`John`, level:2 }); // true
 *
 * // Since we're judging uniques by name only
 * t({ name:`John`, level:3 }); // false
 * ```
 *
 * Return function throws an error if `value` is null or undefined.
 * @returns
 */
declare const unique: <T>(toString?: ToString<T>) => TrackUnique<T>;
/**
 * Tracks unique object instances. Returns _true_ if value is unique.
 * Alternatively: {@link unique} to track by value.
 */
declare const uniqueInstances: <T>() => TrackUnique<T>;
declare namespace trackers_d_exports {
  export { TrackUnique, unique, uniqueInstances };
}
//#endregion
export { AlignOpts, ArrayItems, ArrayLengthMutationKeys, BasicType, ChangeKind, ChangeRecord, CompareChangeSet, CompareResult, Comparer, Continuously, ContinuouslyAsyncCallback, ContinuouslyOpts, ContinuouslySyncCallback, DataWithId, FixedLengthArray, HasCompletion, HasCompletionRunStates, IDictionary, IWithEntries, Interval, IsEqual, IsEqualContext, KeyValue, KeyValueSortSyles, KeyValueSorter, maps_d_exports as Maps, OnStartCalled, PartialBy, Passed, pathed_d_exports as Pathed, Primitive, PrimitiveOrObject, RankArrayOptions, RankFunction, RankOptions, Reactive, ReactiveInitial, ReactiveNonInitial, ReadonlyRemapObjectPropertyType, records_d_exports as Records, RecursivePartial, RecursiveReplace, RecursiveWriteable, RemapObjectPropertyType, RequireOnlyOne, ResolveFallbackOptions, ResolveToValue, ResolveToValueAsync, ResolveToValueSync, ResolvedObject, Rest, SignalKinds, Similarity, Since, SleepOpts, StringOrNumber, ToString, trackers_d_exports as Trackers, Unsubscriber, Writeable, align, alignById, compareIterableValuesShallow, comparerInverse, continuously, defaultComparer, defaultKeyer, defaultToString, elapsedInfinity, elapsedInterval, elapsedOnce, elapsedSince, elapsedToHumanString, filterValue, hasLast, intervalToMs, isDateObject, isEmptyEntries, isEqualContextString, isEqualDefault, isEqualTrace, isEqualValueDefault, isEqualValueIgnoreOrder, isEqualValuePartial, isInteger, isInterval, isMap, isPrimitive, isPrimitiveOrObject, isReactive, isSet, jsComparer, keyValueSorter, numericComparer, parseUrlParameters, promiseFromEvent, resolve, resolveFields, resolveFieldsSync, resolveSync, resolveWithFallback, resolveWithFallbackSync, runningiOS, sleep, sleepWhile, toStringDefault, toStringOrdered };
//# sourceMappingURL=core.d.ts.map