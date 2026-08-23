import { a as KeyValue } from "./types-BE4PFAIb.js";

//#region ../packages/core/src/key-value.d.ts
type KeyValueSorter = (data: KeyValue[]) => KeyValue[];
type KeyValueSortSyles = `value` | `value-reverse` | `key` | `key-reverse`;
declare function keyValueSorter(sortStyle: KeyValueSortSyles): KeyValueSorter;
//#endregion
export { KeyValueSorter as n, keyValueSorter as r, KeyValueSortSyles as t };