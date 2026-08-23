import { U as Result } from "./index-B7GxYnpL.js";
import { C as ISetMutable, c as TraversableTree } from "./index-CGEkIDnm.js";
import { H as RandomSource } from "./index-DOYketdq.js";
import { _ as TrackedValueOpts, h as TimestampedObject, n as TrackedValueMap, r as ObjectTracker, v as TrimReason } from "./index-DMvBzC6_.js";

//#region ../packages/geometry/src/point/point-type.d.ts
/**
 * A point, consisting of x, y and maybe z fields.
 */
type Point = {
  readonly x: number;
  readonly y: number;
  readonly z?: number;
};
type Point3d = Point & {
  readonly z: number;
};
/**
 * Placeholder point: `{ x: NaN, y: NaN }`
 * Use `isPlaceholder` to check if a point is a placeholder.
 * Use `Placeholder3d` get a point with `z` property.
 */
declare const Placeholder$3: Point;
/**
 * Placeholder point: `{x: NaN, y:NaN, z:NaN }`
 * Use `isPlaceholder` to check if a point is a placeholder.
 * Use `Placeholder` to get a point without `z` property.
 */
declare const Placeholder3d: Point3d;
//#endregion
//#region ../packages/geometry/src/point/abs.d.ts
declare function abs(pt: Point3d): Point3d;
declare function abs(pt: Point): Point;
//#endregion
//#region ../packages/geometry/src/point/angle.d.ts
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
declare const angleRadian$1: (a: Point, b?: Point, c?: Point) => number;
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
declare const angleRadianCircle: (a: Point, b?: Point, c?: Point) => number;
/**
 * Return the angle of a wedge, defined by a, b and C points, where 'b'
 * could be thought of as the origin or pivot.
 *
 * @param a
 * @param b
 * @param c
 * @returns
 */
declare const angleRadianThreePoint: (a: Point, b: Point, c: Point) => number;
//#endregion
//#region ../packages/geometry/src/point/apply.d.ts
type PointApplyFn = (v: number, field: `x` | `y`) => number;
type Point3dApplyFn = (v: number, field: `x` | `y` | `z`) => number;
declare function apply$2(pt: Point3d, fn: Point3dApplyFn): Point3d;
declare function apply$2(pt: Point, fn: PointApplyFn): Point;
//#endregion
//#region ../packages/geometry/src/point/averager.d.ts
type PointAverager = (point: Point) => Point;
type PointAveragerKinds = `moving-average-light`;
type PointAverageKinds = `mean`;
/**
 * Averages a set of points, by default as a 'mean'.
 *
 * List of points has to all have Z property or none of them -- it's not
 * possible to mix 2D and 3D points.
 * @param points
 * @returns
 */
declare const average$1: (points: Iterable<Point>, kind?: PointAverageKinds) => Point;
/**
 * Keeps track of average x, y and z values.
 *
 * When calling, you have to specify the averaging technique. At the moment
 * only 'moving-average-light' is supported. This uses @ixfx/numbers.movingAverageLight
 * under-the-hood.
 *
 * ```js
 * // Create averager
 * const averager = Points.averager(`moving-average-light`);
 *
 * // Call function with a point to add it to average
 * // and return the current average.
 * averager(somePoint); // Yields current average {x,y,z?}
 * ```
 *
 * @param kind Averaging strategy
 * @param opts Scaling parameter. Higher means more smoothing, lower means less (minimum: 1). Default: 3
 * @returns
 */
declare function averager(kind: `moving-average-light`, opts: Partial<{
  scaling: number;
}>): PointAverager;
//#endregion
//#region ../packages/geometry/src/rect/rect-types.d.ts
/**
 * Rectangle as array: `[width, height]`
 */
type RectArray = readonly [width: number, height: number];
/**
 * Positioned rectangle as array: `[x, y, width, height]`
 */
type RectPositionedArray = readonly [x: number, y: number, width: number, height: number];
type Rect = {
  readonly width: number;
  readonly height: number;
};
type Rect3d = Rect & {
  readonly depth: number;
};
type RectPositioned = Point & Rect;
type Rect3dPositioned = Point3d & Rect3d;
//#endregion
//#region ../packages/geometry/src/point/bbox.d.ts
/**
 * Returns the minimum rectangle that can enclose all provided points
 * @param points
 * @returns
 */
declare const bbox$5: (...points: ReadonlyArray<Point>) => RectPositioned;
declare const bbox3d: (...points: ReadonlyArray<Point3d>) => Rect3dPositioned;
//#endregion
//#region ../packages/geometry/src/point/centroid.d.ts
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
declare const centroid$1: (...points: readonly (Point | undefined)[]) => Point;
//#endregion
//#region ../packages/geometry/src/point/clamp.d.ts
declare function clamp(a: Point, min?: number, max?: number): Point;
declare function clamp(a: Point3d, min?: number, max?: number): Point3d;
//#endregion
//#region ../packages/geometry/src/point/compare.d.ts
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
declare function compare(a: Point, b: Point): number;
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
declare function compareRowwise(a: Point, b: Point): number;
/**
 * Returns a rectangle from two points, where it's uncertain if
 * a/b ought to be top-left or bottom-right.
 *
 * To resolve this, we use Points.compareRowwise to determine which point is top-left and which is bottom-right.
 * @param a
 * @param b
 */
declare function getAsBounds(a: Point, b: Point): {
  topLeft: Point;
  bottomRight: Point;
};
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
declare function compareByX(a: Point, b: Point): number;
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
declare function compareByY(a: Point, b: Point): number;
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
declare function compareByZ(a: Point3d, b: Point3d): number;
//#endregion
//#region ../packages/geometry/src/point/convex-hull.d.ts
/**
 * Simple convex hull impementation. Returns a set of points which
 * enclose `pts`.
 *
 * For more power, see something like [Hull.js](https://github.com/AndriiHeonia/hull)
 * @param pts
 * @returns
 */
declare const convexHull: (...pts: ReadonlyArray<Point>) => ReadonlyArray<Point>;
//#endregion
//#region ../packages/geometry/src/point/distance.d.ts
declare function distance$2(a: Point, b?: Point): number;
declare function distance$2(a: Point, x: number, y: number): number;
/**
 * As {@link distance} but always compares by x,y only.
 * @param a
 * @param xOrB
 * @param y
 * @returns
 */
declare function distance2d(a: Point, xOrB?: Point | number, y?: number): number;
//#endregion
//#region ../packages/geometry/src/circle/circle-type.d.ts
/**
 * A circle
 */
type Circle = {
  readonly radius: number;
};
type CircleToSvg = {
  (circleOrRadius: Circle | number, sweep: boolean, origin: Point): readonly string[];
  (circle: CirclePositioned, sweep: boolean): readonly string[];
};
/**
 * A {@link Circle} with position
 */
type CirclePositioned = Point & Circle;
type CircleRandomPointOpts = {
  /**
   * Algorithm to calculate random values.
   * Default: 'uniform'
   */
  readonly strategy: `naive` | `uniform`;
  /**
   * Random number source.
   * Default: Math.random
   */
  readonly randomSource: () => number;
  /**
   * Margin within shape to start generating random points
   * Default: 0
   */
  readonly margin: number;
};
//#endregion
//#region ../packages/geometry/src/line/line-type.d.ts
/**
 * A line, which consists of an `a` and `b` {@link Point}.
 */
type Line = {
  readonly a: Point;
  readonly b: Point;
};
/**
 * A PolyLine, consisting of more than one line.
 */
type PolyLine = readonly Line[];
//#endregion
//#region ../packages/geometry/src/shape/shape-type.d.ts
type ShapePositioned = CirclePositioned | RectPositioned;
type ContainsResult = `none` | `contained`;
type Sphere = Point3d & {
  readonly radius: number;
};
type PointCalculableShape = PolyLine | Line | RectPositioned | Point | CirclePositioned;
//#endregion
//#region ../packages/geometry/src/shape/arrow.d.ts
type ArrowOpts = {
  readonly arrowSize?: number;
  readonly tailLength?: number;
  readonly tailThickness?: number;
  readonly angleRadian?: number;
};
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
declare const arrow: (origin: Point, from: `tip` | `tail` | `middle`, opts?: ArrowOpts) => ReadonlyArray<Point>;
//#endregion
//#region ../packages/geometry/src/triangle/triangle-type.d.ts
type Triangle = {
  readonly a: Point;
  readonly b: Point;
  readonly c: Point;
};
type BarycentricCoord = {
  readonly a: number;
  readonly b: number;
  readonly c: number;
};
//#endregion
//#region ../packages/geometry/src/shape/etc.d.ts
type ShapeRandomPointOpts = {
  readonly randomSource: RandomSource;
};
/**
 * Returns a random point within a shape.
 * `shape` can be {@link Circles.CirclePositioned} or {@link Rects.RectPositioned}
 * @param shape
 * @param opts
 * @returns
 */
declare const randomPoint$2: (shape: ShapePositioned, opts?: Partial<ShapeRandomPointOpts>) => Point;
/**
 * Returns the center of a shape
 * Shape can be: rectangle, triangle, circle
 * @param shape
 * @returns
 */
declare const center$2: (shape?: Rect | Triangle | Circle) => Point;
//#endregion
//#region ../packages/geometry/src/shape/is-intersecting.d.ts
/**
 * Returns the intersection result between a and b.
 * `a` can be a {@link Circles.CirclePositioned} or {@link Rects.RectPositioned}
 * `b` can be as above or a {@link Point}.
 * @param a
 * @param b
 */
declare function isIntersecting$2(a: ShapePositioned, b: ShapePositioned | Point): boolean;
//#endregion
//#region ../packages/geometry/src/shape/starburst.d.ts
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
declare const starburst: (outerRadius: number, points?: number, innerRadius?: number, origin?: Point, opts?: {
  readonly initialAngleRadian?: number;
}) => readonly Point[];
declare namespace index_d_exports$13 {
  export { ArrowOpts, ContainsResult, PointCalculableShape, ShapePositioned, ShapeRandomPointOpts, Sphere, arrow, center$2 as center, isIntersecting$2 as isIntersecting, randomPoint$2 as randomPoint, starburst };
}
//#endregion
//#region ../packages/geometry/src/point/distance-to-center.d.ts
/**
 * Returns the distance from point `a` to the center of `shape`.
 * @param a Point
 * @param shape Point, or a positioned Rect or Circle.
 * @returns
 */
declare const distanceToCenter: (a: Point, shape: PointCalculableShape) => number;
//#endregion
//#region ../packages/geometry/src/point/distance-to-exterior.d.ts
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
declare const distanceToExterior: (a: Point, shape: PointCalculableShape) => number;
//#endregion
//#region ../packages/geometry/src/point/divider.d.ts
declare function divide$4(a: Point, b: Point): Point;
declare function divide$4(a: Point3d, b: Point3d): Point3d;
declare function divide$4(a: Point, x: number, y: number): Point;
declare function divide$4(a: Point3d, x: number, y: number, z: number): Point3d;
declare function divide$4(ax: number, ay: number, bx: number, by: number): Point;
declare function divide$4(ax: number, ay: number, az: number, bx: number, by: number, bz: number): Point3d;
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
declare function divider(a: Point3d | Point | number | number[], b?: number, c?: number): (aa: Point3d | Point | number | number[], bb?: number, cc?: number) => Point;
//#endregion
//#region ../packages/geometry/src/point/dot-product.d.ts
declare const dotProduct$2: (...pts: readonly Point[]) => number;
/**
 * Returns the cross-product:
 * ```
 * ax * by - ay * bx
 * ```
 * @param a
 * @param b
 * @returns
 */
declare function cross(a: Point, b: Point): number;
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
declare function crossProductRaw(ax: number, ay: number, bx: number, by: number): number;
//#endregion
//#region ../packages/geometry/src/point/empty.d.ts
/**
 * An empty point of `{ x: 0, y: 0 }`.
 *
 * Use `isEmpty` to check if a point is empty.
 * Use `Empty3d` to get an empty point with `z`.
 */
declare const Empty$3: Point;
/**
 * Returns { x:1, y:1 }
 */
declare const Unit: Point;
/**
 * An empty Point of `{ x: 0, y: 0, z: 0}`
 * Use `isEmpty` to check if a point is empty.
 * Use `Empty` to get an empty point without `z`.
 */
declare const Empty3d: Point3d;
/**
 * Returns { x:1,y:1,z:1 }
 */
declare const Unit3d: Point3d;
//#endregion
//#region ../packages/geometry/src/point/find-minimum.d.ts
declare function findMinimum(comparer: (a: Point, b: Point) => Point, ...points: ReadonlyArray<Point>): Point;
declare function findMinimum(comparer: (a: Point3d, b: Point3d) => Point3d, ...points: ReadonlyArray<Point3d>): Point3d;
//#endregion
//#region ../packages/geometry/src/point/from.d.ts
declare function from(x: number, y: number, z: number): Point3d;
declare function from(x: number, y: number): Point;
declare function from(array: [x: number, y: number, z: number]): Point3d;
declare function from(array: [x: number, y: number]): Point;
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
declare const fromString: (string_: string) => Point;
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
declare const fromNumbers$2: (...coords: readonly (readonly number[])[] | readonly number[]) => readonly Point[];
//#endregion
//#region ../packages/geometry/src/point/get-point-parameter.d.ts
declare function getTwoPointParameters(a: Point, b: Point): [a: Point, b: Point];
declare function getTwoPointParameters(a: Point3d, b: Point3d): [a: Point3d, b: Point3d];
declare function getTwoPointParameters(a: Point, x: number, y: number): [a: Point, b: Point];
declare function getTwoPointParameters(a: Point3d, x: number, y: number, z: number): [a: Point3d, b: Point3d];
declare function getTwoPointParameters(ax: number, ay: number, bx: number, by: number): [a: Point, b: Point];
declare function getTwoPointParameters(ax: number, ay: number, az: number, bx: number, by: number, bz: number): [a: Point3d, b: Point3d];
/**
 * Returns a Point form of either a point, x,y params or x,y,z params.
 * If parameters are undefined, an empty point is returned (0, 0)
 * @ignore
 * @param a
 * @param b
 * @returns
 */
declare function getPointParameter$1(a?: Point3d | Point | number | Array<number> | ReadonlyArray<number>, b?: number | boolean, c?: number): Point | Point3d;
//#endregion
//#region ../packages/geometry/src/point/guard.d.ts
/**
 * Returns true if xy (and z, if present) are _null_.
 * @param p
 * @returns True if all props are null
 */
declare function isNull(p: Point): boolean;
/***
 * Returns true if either x, y, z isNaN.
 */
declare function isNaN$1(p: Point): boolean;
declare function pointTest(p: Point, name?: string, extraInfo?: string): Result<Point, string>;
/**
 * Throws an error if point is invalid
 * @param p
 * @param name
 */
declare function guard$5(p: Point, name?: string, info?: string): void;
/**
 * Throws if parameter is not a valid point, or either x or y is 0
 * @param pt
 * @returns Throws an error if not a valid point or zero.
 */
declare function guardNonZeroPoint(pt: Point | Point3d, name?: string): boolean;
/**
 * Returns _true_ if `p` has x & y properties.
 * Returns _false_ if `p` is undefined, null or does not contain properties.
 * Use {@link isPoint3d} to check further check for `z`.
 * @param p
 * @returns True if `p` has x & y props
 */
declare function isPoint(p: number | unknown): p is Point;
/**
 * Returns _true_ if `p` has x, y, & z properties.
 * Returns _false_ if `p` is undefined, null or does not contain properties.
 * @param p
 * @returns _True_ if `p` has x, y, & z props
 */
declare function isPoint3d(p: Point | unknown): p is Point3d;
/**
 * Returns true if both xy (and z, if present) are 0.
 * Use `Points.Empty` to return an empty point.
 * @param p
 * @returns _True_ is all props are 0
 */
declare function isEmpty$3(p: Point): boolean;
/**
 * Returns true if point is a placeholder, where xy (and z, if present)
 * are `NaN`.
 *
 * Use Points.Placeholder to return a placeholder point.
 * @param p
 * @returns True if all props are NaN
 */
declare function isPlaceholder$3(p: Point): boolean;
//#endregion
//#region ../packages/geometry/src/point/interpolate.d.ts
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
declare function interpolate$4(amount: number, a: Point, b: Point, allowOverflow?: boolean): Point;
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
declare const interpolator$2: (a: Point, b: Point, allowOverflow?: boolean) => (amount: number) => Point;
//#endregion
//#region ../packages/geometry/src/point/invert.d.ts
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
declare const invert$1: (pt: Point | Point3d, what?: `both` | `x` | `y` | `z`) => Point;
//#endregion
//#region ../packages/geometry/src/point/is-equal.d.ts
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
declare const isEqual$6: (...p: ReadonlyArray<Point>) => boolean;
//#endregion
//#region ../packages/geometry/src/point/magnitude.d.ts
/**
 * Clamps the magnitude of a point.
 * This is useful when using a Point as a vector, to limit forces.
 * @param pt
 * @param max Maximum magnitude (1 by default)
 * @param min Minimum magnitude (0 by default)
 * @returns
 */
declare const clampMagnitude$2: (pt: Point, max?: number, min?: number) => Point;
//#endregion
//#region ../packages/geometry/src/point/most.d.ts
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
declare const leftmost: (...points: ReadonlyArray<Point>) => Point;
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
declare const rightmost: (...points: ReadonlyArray<Point>) => Point;
//#endregion
//#region ../packages/geometry/src/point/multiply.d.ts
declare function multiply$4(a: Point, b: Point): Point;
declare function multiply$4(a: Point3d, b: Point3d): Point3d;
declare function multiply$4(a: Point, x: number, y: number): Point;
declare function multiply$4(a: Point3d, x: number, y: number, z: number): Point3d;
declare function multiply$4(ax: number, ay: number, bx: number, by: number): Point;
declare function multiply$4(ax: number, ay: number, az: number, bx: number, by: number, bz: number): Point3d;
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
declare const multiplyScalar$2: (pt: Point | Point3d, v: number) => Point | Point3d;
//#endregion
//#region ../packages/geometry/src/point/normalise.d.ts
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
declare const normalise$2: (ptOrX: Point | number, y?: number) => Point;
//#endregion
//#region ../packages/geometry/src/point/normalise-by-rect.d.ts
/**
 * Normalises a point by a given width and height
 *
 * ```js
 * normaliseByRect({ x: 10, y: 10 }, 20, 40 }); // { x: 0.5, y: 0.2 }
 * ```
 * @param point Point
 * @param width Width
 * @param height Height
 */
declare function normaliseByRect$1(point: Point, width: number, height: number): Point;
/**
 * Normalises a point by a given rect's width and height
 *
 * ```js
 * normaliseByRect({ x: 10, y: 10, width: 20, height: 40 }); // { x: 0.5, y: 0.2 }
 * ```
 * @param pt
 * @param rect
 */
declare function normaliseByRect$1(pt: Point, rect: Rect): Point;
/**
 * Normalises x,y by width and height so it is on a 0..1 scale
 *
 * ```js
 * normaliseByRect(10, 10, 20, 40); // { x: 0.5, y: 0.2 }
 * ```
 * @param x
 * @param y
 * @param width
 * @param height
 */
declare function normaliseByRect$1(x: number, y: number, width: number, height: number): Point;
//#endregion
//#region ../packages/geometry/src/point/pipeline.d.ts
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
declare const pipelineApply: (point: Point, ...pipelineFns: readonly ((pt: Point) => Point)[]) => Point;
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
declare const pipeline: (...pipeline: readonly ((pt: Point) => Point)[]) => (pt: Point) => Point;
//#endregion
//#region ../packages/geometry/src/point/point-relation-types.d.ts
type PointRelation = (a: Point | number, b?: number) => PointRelationResult;
type PointRelationResult = {
  /**
   * Angle from start
   */
  readonly angle: number;
  /**
   * Distance from start
   */
  readonly distanceFromStart: number;
  /**
   * Distance from last compared point
   */
  readonly distanceFromLast: number;
  /**
   * Center point from start
   */
  readonly centroid: Point;
  /**
   * Average of all points seen
   * This is calculated by summing x,y and dividing by total points
   */
  readonly average: Point;
  /**
   * Speed. Distance/millisecond from one sample to the next.
   */
  readonly speed: number;
};
//#endregion
//#region ../packages/geometry/src/polar/types.d.ts
/**
 * Converts to Cartesian coordiantes
 */
type PolarToCartesian = {
  (point: Coord, origin?: Point): Point;
  (distance: number, angleRadians: number, origin?: Point): Point;
};
/**
 * A polar ray allows you to express a line in polar coordinates
 * rather than two x,y points.
 *
 * It consists of an angle (in radians) with a given offset and length.
 * This way of defining a line makes some manipulations really easy, for example, to
 * make a set of lines that radiate out from a point in a circular direction, and then animate
 * them inwards and outwards.
 *
 * An alternative is  {@link PolarLine} which defines a line as two {@link Coord}s with a common origin.
 *
 * Properties
 * * angleRadian: Angle of line
 * * offset: distance from the polar origin (default: 0)
 * * length: length of ray
 * * origin: Start Cartesian coordinate of line
 */
type PolarRay = Readonly<{
  /**
   * Angle of ray in radian
   */
  angleRadian: number;
  /**
   * Starting point of a ray, defined as an
   * offset from the polar origin.
   */
  offset?: number;
  /**
   * Length of ray
   */
  length: number;
  /**
   * Optional origin point of ray (ie. start)
   */
  origin?: Point;
}>;
type PolarRayWithOrigin = PolarRay & Readonly<{
  origin: Point;
}>;
/**
 * Expresses a line as two angles and offset from a
 * common origin.
 *
 * Alternatives:
 * * {@link PolarRay}: Defines a line along a single ray
 * * {@link Line}: Defines a line by two Cartesian (x,y) pairs
 */
type PolarLine = Readonly<{
  a: Coord;
  b: Coord;
}>;
/**
 * Polar coordinate, made up of a distance and angle in radians.
 * Most computations involving PolarCoord require an `origin` as well.
 */
type Coord = Readonly<{
  distance: number;
  angleRadian: number;
}>;
//#endregion
//#region ../packages/geometry/src/polar/angles.d.ts
/**
 * Returns a rotated coordinate
 * @param c Coordinate
 * @param amountRadian Amount to rotate, in radians
 * @returns
 */
declare const rotate$3: (c: Coord, amountRadian: number) => Coord;
/**
 * Inverts the direction of coordinate. Ie if pointing north, will point south.
 * @param p
 * @returns
 */
declare const invert: (p: Coord) => Coord;
/**
 * Returns true if PolarCoords have same magnitude but opposite direction
 * @param a
 * @param b
 * @returns
 */
declare const isOpposite: (a: Coord, b: Coord) => boolean;
/**
 * Returns true if Coords have the same direction, regardless of magnitude
 * @param a
 * @param b
 * @returns
 */
declare const isParallel$1: (a: Coord, b: Coord) => boolean;
/**
 * Returns true if coords are opposite direction, regardless of magnitude
 * @param a
 * @param b
 * @returns
 */
declare const isAntiParallel: (a: Coord, b: Coord) => boolean;
/**
 * Returns a rotated coordinate
 * @param c Coordinate
 * @param amountDeg Amount to rotate, in degrees
 * @returns
 */
declare const rotateDegrees: (c: Coord, amountDeg: number) => Coord;
//#endregion
//#region ../packages/geometry/src/polar/conversions.d.ts
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
declare const toLine$1: (c: Coord, start: Point) => Line;
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
declare const toCartesian$2: PolarToCartesian;
type FromCartesianOptions = {
  /**
   * Rounding to apply to distance and angle calculations
   */
  digits: number;
  /**
   * If false, returns angle on half-circle basis
   * such that negative angles are possible (0..PI..-PI).
   * By default uses (0..2*PI) range.
   */
  fullCircle: boolean;
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
declare const fromCartesian: (point: Point, origin?: Point, options?: Partial<FromCartesianOptions>) => Coord;
/**
 * Returns a human-friendly string representation `(distance, angleDeg)`.
 * If `precision` is supplied, this will be the number of significant digits.
 * @param p
 * @returns
 */
declare const toString$5: (p: Coord, digits?: number) => string;
declare const toPoint: (v: Coord, origin?: Point) => Point;
type ToPolarLineOptions = FromCartesianOptions & {
  orderBy: `none` | `angle-min` | `angle-max` | `distance`;
};
declare function toPolarLine(line: Line, origin: Point, opts?: Partial<ToPolarLineOptions>): PolarLine;
declare function toPolarLine(lines: Line[] | readonly Line[], origin: Point, opts?: Partial<ToPolarLineOptions>): PolarLine[];
/**
 * Returns a string representation of a PolarLine
 * @param line
 * @param digits
 * @returns
 */
declare function polarLineToString(line: PolarLine, digits?: number): string;
declare function lineToCartesian(line: PolarLine, origin: Point): Line;
declare function lineToCartesian(lines: PolarLine[], origin: Point): Line[];
//#endregion
//#region ../packages/geometry/src/polar/guard.d.ts
/**
 * Returns true if `p` seems to be a {@link Polar.Coord} (ie has both distance & angleRadian fields)
 * @param p
 * @returns True if `p` seems to be a PolarCoord
 */
declare const isPolarCoord: (p: unknown) => p is Coord;
/**
 * Throws an error if Coord is invalid
 * @param p
 * @param name
 */
declare const guard$4: (p: Coord, name?: string) => void;
//#endregion
//#region ../packages/geometry/src/polar/math.d.ts
declare const normalise$1: (c: Coord) => Coord;
/**
 * Clamps the magnitude of a vector
 * @param v
 * @param max
 * @param min
 * @returns
 */
declare const clampMagnitude$1: (v: Coord, max?: number, min?: number) => Coord;
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
declare const dotProduct$1: (a: Coord, b: Coord) => number;
/**
 * Multiplies the magnitude of a coord by `amt`.
 * Direction is unchanged.
 * @param v
 * @param amt
 * @returns
 */
declare const multiply$3: (v: Coord, amt: number) => Coord;
/**
 * Divides the magnitude of a coord by `amt`.
 * Direction is unchanged.
 * @param v
 * @param amt
 * @returns
 */
declare const divide$3: (v: Coord, amt: number) => Coord;
/**
 * Returns _true_ if `check` is between `start` and `end` angles.
 * @param start
 * @param end
 * @param check
 * @returns
 */
declare const between: (check: {
  angleRadian: number;
}, start: {
  angleRadian: number;
}, end: {
  angleRadian: number;
}) => boolean;
declare namespace ray_d_exports {
  export { fromLine, isParallel, toCartesian$1 as toCartesian, toString$4 as toString };
}
declare function toCartesian$1(rays: PolarRay[], origin?: Point): Line[];
declare function toCartesian$1(ray: PolarRay, origin?: Point): Line;
declare const isParallel: (a: PolarRay, b: PolarRay) => boolean;
/**
 * Returns a string representation of the ray, useful for debugging.
 *
 * ```js
 * "PolarRay(angle: ... offset: ... len: ... origin: ...)"
 * ```
 * @param ray
 * @returns
 */
declare const toString$4: (ray: PolarRay) => string;
declare function fromLine(line: Line[] | PolyLine, origin?: Point): PolarRay[];
declare function fromLine(line: Line, origin?: Point): PolarRay;
//#endregion
//#region ../packages/geometry/src/polar/spiral.d.ts
declare function spiral(smoothness: number, zoom: number): IterableIterator<Coord & {
  readonly step: number;
}>;
/**
 * Produces an Archimedian spiral with manual stepping.
 * @param step Step number. Typically 0, 1, 2 ...
 * @param smoothness 0.1 pretty rounded, at around 5 it starts breaking down
 * @param zoom At smoothness 0.1, zoom starting at 1 is OK
 * @returns
 */
declare const spiralRaw: (step: number, smoothness: number, zoom: number) => Coord;
//#endregion
//#region ../packages/geometry/src/polar/intersects.d.ts
type IntersectionDistanceCompute = {
  compute: (angleRadian: number) => Generator<{
    distance: number;
    line: PolarLine;
  }>;
  visibilityPolygon: (feather: number) => Coord[];
};
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
declare const intersectionDistanceCompute: (...lines: PolarLine[]) => IntersectionDistanceCompute;
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
declare const intersectionDistance: (angleRadian: number, line: PolarLine) => number;
declare namespace index_d_exports$12 {
  export { Coord, FromCartesianOptions, IntersectionDistanceCompute, PolarLine, PolarRay, PolarRayWithOrigin, PolarToCartesian, ray_d_exports as Ray, ToPolarLineOptions, between, clampMagnitude$1 as clampMagnitude, divide$3 as divide, dotProduct$1 as dotProduct, fromCartesian, guard$4 as guard, intersectionDistance, intersectionDistanceCompute, invert, isAntiParallel, isOpposite, isParallel$1 as isParallel, isPolarCoord, lineToCartesian, multiply$3 as multiply, normalise$1 as normalise, polarLineToString, rotate$3 as rotate, rotateDegrees, spiral, spiralRaw, toCartesian$2 as toCartesian, toLine$1 as toLine, toPoint, toPolarLine, toString$5 as toString };
}
//#endregion
//#region ../packages/geometry/src/point/point-tracker.d.ts
/**
 * Information about seen points
 */
type PointTrack = PointRelationResult & {};
/**
 * Results of point tracking
 */
type PointTrackerResults = Readonly<{
  /**
   * Relation of last point to previous point
   */
  fromLast: PointTrack;
  /**
   * Relation of last point to 'initial' point.
   * This will be the oldest point in the buffer of the tracker.
   */
  fromInitial: PointTrack;
  /**
   * Relation of last point to a 'mark' point,
   * which is manually set.
   *
   * Will give _undefined_ if `.mark()` has not been called on tracker.
   */
  fromMark: PointTrack | undefined;
  values: readonly Point[];
}>;
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
declare class PointTracker<TPoint extends Point = Point> extends ObjectTracker<TPoint, PointTrackerResults> {
  initialRelation: PointRelation | undefined;
  markRelation: PointRelation | undefined;
  lastResult: PointTrackerResults | undefined;
  constructor(opts?: TrackedValueOpts);
  /**
   * Notification that buffer has been knocked down to `sampleLimit`.
   *
   * This will reset the `initialRelation`, which will use the new oldest value.
   */
  onTrimmed(_reason: TrimReason): void;
  /**
   * @ignore
   */
  onReset(): void;
  /**
   * Makes a 'mark' in the tracker, allowing you to compare values
   * to this point.
   */
  mark(): void;
  /**
   * Tracks a point, returning data on its relation to the
   * initial point and the last received point.
   *
   * @param _p Point
   */
  computeResults(_p: TimestampedObject<Point>[]): PointTrackerResults;
  /**
   * Returns a polyline representation of stored points.
   * Returns an empty array if points were not saved, or there's only one.
   */
  get line(): PolyLine;
  /**
   * Returns a vector of the initial/last points of the tracker.
   * Returns as a polar coordinate
   */
  get vectorPolar(): Coord;
  /**
   * Returns a vector of the initial/last points of the tracker.
   * Returns as a Cartesian coordinate
   */
  get vectorCartesian(): Point;
  /**
   * Returns a line from initial point to last point.
   *
   * If there are less than two points, Lines.Empty is returned
   */
  get lineStartEnd(): Line;
  /**
   * Returns distance from latest point to initial point.
   * If there are less than two points, zero is returned.
   *
   * This is the direct distance from initial to last,
   * not the accumulated length. Use {@link lengthTotal} for that.
   * @param force2d If _true_ distance is calculated only in 2d
   * @returns Distance
   */
  distanceFromStart(force2d?: boolean): number;
  /**
   * Returns the speed (over milliseconds) based on accumulated travel distance.
   *
   * If there's no initial point, 0 is returned.
   * @param force2d If _true_, speed is calculated with x,y only
   * @returns
   */
  speedFromStart(force2d?: boolean): number;
  speedFromLast(force2d?: boolean): number;
  /**
   * Difference between last point and the initial point, calculated
   * as a simple subtraction of x,y & z.
   *
   * `Points.Placeholder` is returned if there's only one point so far.
   */
  difference(): Point | Point3d;
  /**
   * Returns angle (in radians) from latest point to the initial point
   * If there are less than two points, undefined is return.
   * @returns Angle in radians
   */
  angleFromStart(): number | undefined;
  /**
   * Returns the total distance from accumulated points.
   * Returns 0 if points were not saved, or there's only one.
   *
   * Use {@link lengthAverage} to get the average length for all segments
   * @param force2d If _true_ length is calculated using x&y only
   */
  lengthTotal(force2d?: boolean): number;
  /**
   * Adds up the accumulated length of all points (using {@link lengthTotal})
   * dividing by the total number of points.
   * @param force2d
   * @returns
   */
  lengthAverage(force2d?: boolean): number;
  /**
  * Returns the last x coord
  */
  get x(): number;
  /**
   * Returns the last y coord
   */
  get y(): number;
  /**
   * Returns the last z coord (or _undefined_ if not available)
   */
  get z(): number | undefined;
}
/**
 * A {@link TrackedValueMap} for points. Uses {@link PointTracker} to
 * track added values.
 */
declare class PointsTracker<TPoint extends Point = Point> extends TrackedValueMap<TPoint, PointTracker<TPoint>, PointTrackerResults> {
  constructor(opts?: TrackedValueOpts);
  get(id: string): PointTracker<TPoint> | undefined;
}
declare class UserPointerTracker extends PointTracker {
  /**
   * Adds a PointerEvent along with its
   * coalesced events, if available.
   * @param p
   * @returns
   */
  seenEvent(p: PointerEvent | MouseEvent): PointTrackerResults;
}
declare class UserPointersTracker extends TrackedValueMap<Point, PointTracker, PointTrackerResults> {
  constructor(opts?: TrackedValueOpts);
  get(id: string): UserPointerTracker | undefined;
  /**
  * Track a PointerEvent
  * @param event
  */
  seenEvent(event: PointerEvent): Promise<PointTrackerResults[]>;
}
//#endregion
//#region ../packages/geometry/src/point/progress-between.d.ts
/**
 * Computes the progress between two waypoints, given `position`.
 *
 * [Source](https://www.habrador.com/tutorials/math/2-passed-waypoint/?s=09)
 * @param position Current position
 * @param waypointA Start
 * @param waypointB End
 * @returns
 */
declare const progressBetween: (position: Point | Point3d, waypointA: Point | Point3d, waypointB: Point | Point3d) => number;
//#endregion
//#region ../packages/geometry/src/point/project.d.ts
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
declare const project: (origin: Point, distance: number, angle: number) => Point;
//#endregion
//#region ../packages/geometry/src/point/quantise.d.ts
declare function quantiseEvery(pt: Point3d, snap: Point3d, middleRoundsUp?: boolean): Point3d;
declare function quantiseEvery(pt: Point, snap: Point, middleRoundsUp?: boolean): Point;
//#endregion
//#region ../packages/geometry/src/point/random.d.ts
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
declare const random$2: (rando?: RandomSource) => Point;
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
declare const random3d: (rando?: RandomSource) => Point3d;
//#endregion
//#region ../packages/geometry/src/point/reduce.d.ts
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
declare const reduce: (pts: ReadonlyArray<Point>, fn: (p: Point, accumulated: Point) => Point, initial?: Point) => Point;
//#endregion
//#region ../packages/geometry/src/point/relation.d.ts
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
declare const relation: (a: Point | number, b?: number) => PointRelation;
//#endregion
//#region ../packages/geometry/src/angles.d.ts
/**
 * Convert angle in degrees to angle in radians.
 * @param angleInDegrees
 * @returns Radian
 */
declare function degreeToRadian(angleInDegrees: number): number;
/**
 * Convert angles in degrees to angles in radians
 * @param angleInDegrees
 */
declare function degreeToRadian(angleInDegrees: readonly number[]): readonly number[];
/**
 * Inverts the angle so it points in the opposite direction of a unit circle
 * @param angleInRadians
 * @returns Radians
 */
declare function radianInvert(angleInRadians: number): number;
declare function degreeToGradian(angleInDegrees: number): number;
/**
 * Returns the gradian value converted to degrees.
 * By default it wraps, so any value 360 or greater wraps around.
 * @param angleInGradians
 * @param wrap
 * @returns Degrees
 */
declare function gradianToDegree(angleInGradians: number, wrap?: boolean): number;
declare function radianToGradian(angleInRadians: number): number;
declare function gradianToRadian(angleInGradian: number): number;
/**
 * Convert angle in radians to angle in degrees
 * @param angleInRadians
 * @returns Degrees
 */
declare function radianToDegree(angleInRadians: number): number;
/**
 * Convert angles in radians to angles in degrees
 * @param angleInRadians
 */
declare function radianToDegree(angleInRadians: readonly number[]): readonly number[];
/**
 * Angle from x-axis to point (ie. `Math.atan2`)
 * @param point
 * @returns Radians
 */
declare const radiansFromAxisX: (point: Point) => number;
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
declare function radiansSum(start: number, amount: number, clockwise?: boolean): number;
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
declare function degreesSum(start: number, amount: number, clockwise?: boolean): number;
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
declare function radianArc(start: number, end: number, direction?: AngleDirection): number;
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
declare function degreeArc(start: number, end: number, direction?: AngleDirection): number;
/**
 * An angle with unit.
 * - [Degrees](https://en.wikipedia.org/wiki/Degree_(angle)): 0..360
 * - [Radians](https://en.wikipedia.org/wiki/Radian): 0...2Pi
 * - [Gradians](https://en.wikipedia.org/wiki/Gradian): 0..400
 * - [Turns](https://en.wikipedia.org/wiki/Turn_(angle)): 0..1
 *
 *
 * ```
 *             100 grad
 *             1/4 turn
 *              90 deg
 *             PI/2 rad
 *                |
 *  Pi rad        |        0 or 2PI rad
 *  180deg -------+------- 0 or 360 deg
 *  1/2 turn      |        0 or 1 turn
 *  200 grad      |        0 or 400 grad
 *                |
 *             270 deg
 *            3PI/2 rad
 *             3/4 turn
 *             300 grad
 * ```
 */
type Angle = {
  value: number;
  unit: `deg` | `rad` | `turn` | `grad`;
};
type AngleRad = {
  value: number;
  unit: `rad`;
};
type AngleConvertible = Angle | number | string;
type AngleDirection = `cw` | `ccw` | `short` | `long`;
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
declare function angleParse(value: AngleConvertible): Angle;
declare function isAngleType(v: any): v is Angle;
/**
 * Returns _true_ if `v` is a number, string or `Angle` type.
 * @param v
 */
declare function isAngleTypeConvertible(v: any): v is AngleConvertible;
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
declare function toRadian(angleOrDegrees: Angle | number | string): number;
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
declare function angleConvert(angleOrDegrees: Angle | number | string, destination: Angle[`unit`]): Angle;
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
declare function toUnitVector(angleOrDegrees: Angle | string | number): {
  x: number;
  y: number;
};
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
declare function fromUnitVector(vector: Point, unit?: Angle[`unit`]): Angle;
/**
 * Converts 'turns' to degrees. By defaults wraps the value, so
 * turn value of 1 or 2 equal 0deg instead of 360 or 720deg.
 * @param turns
 * @param wrap
 * @returns Degrees
 */
declare function turnToDegree(turns: number, wrap?: boolean): number;
/**
 * Calculates the average of angles
 * @param angles Angles to average
 * @param kind Kind of average to calculate. See {@link PointAverageKinds} for details.
 * @returns Average angle
 */
declare function average(angles: Array<Angle | string | number>, kind?: PointAverageKinds): Angle;
/**
 * Normalise a radian angle to 0..2*PI range
 * @param angleRadian
 * @returns Normalised angle
 */
declare function radiansNormalise(angleRadian: number): number;
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
declare function radiansBetweenCircular(check: number, start: number, end: number): boolean;
/**
 * Given two radian (0..2PI) angles, it returns the sweep angles
 * between them that is either minimised or maximised.
 * @param a
 * @param b
 */
declare function radianRange(a: number, b: number): {
  min: {
    start: number;
    end: number;
    sweep: number;
  };
  max: {
    start: number;
    end: number;
    sweep: number;
  };
};
declare function turnToRadian(turns: number): number;
declare function degreeToTurn(degrees: number): number;
declare function radianToTurn(radians: number): number;
//#endregion
//#region ../packages/geometry/src/point/rotate.d.ts
/**
 * Rotate a single point by a given amount in radians
 * @param pt
 * @param amountRadian
 * @param origin
 */
declare function rotate$2(pt: Point, amountRadian: number, origin?: Point): Point;
/**
 * Rotate several points by a given amount in radians
 * @param pt Points
 * @param amountRadian Amount to rotate in radians. If 0 is given, a copy of the input array is returned
 * @param origin Origin to rotate around. Defaults to 0,0
 */
declare function rotate$2(pt: readonly Point[], amountRadian: number, origin?: Point): readonly Point[];
declare function rotateByAngle(pt: Point, angle: Angle | number): Point;
//#endregion
//#region ../packages/geometry/src/point/rotate-point-array.d.ts
declare const rotatePointArray: (v: ReadonlyArray<ReadonlyArray<number>>, amountRadian: number) => Array<Array<number>>;
//#endregion
//#region ../packages/geometry/src/point/round.d.ts
/**
 * Round the point's _x_ and _y_ to given number of digits
 * @param ptOrX
 * @param yOrDigits
 * @param digits
 * @returns
 */
declare const round: (ptOrX: Point | number, yOrDigits?: number, digits?: number) => Point;
//#endregion
//#region ../packages/geometry/src/point/subtract.d.ts
declare function subtract$3(a: Point, b: Point): Point;
declare function subtract$3(a: Point3d, b: Point3d): Point3d;
declare function subtract$3(a: Point, x: number, y: number): Point;
declare function subtract$3(a: Point3d, x: number, y: number, z: number): Point3d;
declare function subtract$3(ax: number, ay: number, bx: number, by: number): Point;
declare function subtract$3(ax: number, ay: number, az: number, bx: number, by: number, bz: number): Point3d;
//#endregion
//#region ../packages/geometry/src/point/sum.d.ts
declare function sum$3(a: Point, b: Point): Point;
declare function sum$3(a: Point3d, b: Point3d): Point3d;
declare function sum$3(a: Point, x: number, y: number): Point;
declare function sum$3(a: Point3d, x: number, y: number, z: number): Point3d;
declare function sum$3(ax: number, ay: number, bx: number, by: number): Point;
declare function sum$3(ax: number, ay: number, az: number, bx: number, by: number, bz: number): Point3d;
//#endregion
//#region ../packages/geometry/src/point/to.d.ts
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
declare function toIntegerValues(pt: Point, rounder?: (x: number) => number): Point;
/**
 * Returns a copy of `pt` with `z` field omitted.
 * If it didn't have one to begin within, a copy is still returned.
 * @param pt
 * @returns
 */
declare function to2d(pt: Point): Point;
/**
 * Returns a copy of `pt` with a `z` field set.
 * Defaults to a z value of 0.
 * @param pt Point
 * @param z Z-value, defaults to 0
 * @returns
 */
declare function to3d(pt: Point, z?: number): Point3d;
/**
 * Returns a human-friendly string representation `(x, y)`.
 * If `precision` is supplied, this will be the number of significant digits.
 * @param p
 * @returns
 */
declare function toString$3(p: Point, digits?: number): string;
//#endregion
//#region ../packages/geometry/src/point/to-array.d.ts
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
declare const toArray$1: (p: Point) => ReadonlyArray<number>;
//#endregion
//#region ../packages/geometry/src/point/within-range.d.ts
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
declare const withinRange$1: (a: Point, b: Point, maxRange: Point | number) => boolean;
//#endregion
//#region ../packages/geometry/src/point/wrap.d.ts
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
declare const wrap$2: (pt: Point, ptMax?: Point, ptMin?: Point) => Point;
declare namespace index_d_exports$11 {
  export { Empty$3 as Empty, Empty3d, Placeholder$3 as Placeholder, Placeholder3d, Point, Point3d, Point3dApplyFn, PointApplyFn, PointAverageKinds, PointAverager, PointAveragerKinds, PointRelation, PointRelationResult, PointTrack, PointTracker, PointTrackerResults, PointsTracker, Unit, Unit3d, UserPointerTracker, UserPointersTracker, abs, angleRadian$1 as angleRadian, angleRadianCircle, angleRadianThreePoint, apply$2 as apply, average$1 as average, averager, bbox$5 as bbox, bbox3d, centroid$1 as centroid, clamp, clampMagnitude$2 as clampMagnitude, compare, compareByX, compareByY, compareByZ, compareRowwise, convexHull, cross, crossProductRaw, distance$2 as distance, distance2d, distanceToCenter, distanceToExterior, divide$4 as divide, divider, dotProduct$2 as dotProduct, findMinimum, from, fromNumbers$2 as fromNumbers, fromString, getAsBounds, getPointParameter$1 as getPointParameter, getTwoPointParameters, guard$5 as guard, guardNonZeroPoint, interpolate$4 as interpolate, interpolator$2 as interpolator, invert$1 as invert, isEmpty$3 as isEmpty, isEqual$6 as isEqual, isNaN$1 as isNaN, isNull, isPlaceholder$3 as isPlaceholder, isPoint, isPoint3d, leftmost, multiply$4 as multiply, multiplyScalar$2 as multiplyScalar, normalise$2 as normalise, normaliseByRect$1 as normaliseByRect, pipeline, pipelineApply, pointTest, progressBetween, project, quantiseEvery, random$2 as random, random3d, reduce, relation, rightmost, rotate$2 as rotate, rotateByAngle, rotatePointArray, round, subtract$3 as subtract, sum$3 as sum, to2d, to3d, toArray$1 as toArray, toIntegerValues, toString$3 as toString, withinRange$1 as withinRange, wrap$2 as wrap };
}
//#endregion
//#region ../packages/geometry/src/rect/apply.d.ts
/**
 * An operation between two fields of a rectangle.
 * Used in the context of {@link applyMerge}
 * ```
 * // Multiply fields
 * const op = (a, b) => a*b;
 * ```
 */
type ApplyMergeOp = (a: number, b: number) => number;
type ApplyFieldOp = (fieldValue: number, fieldName?: `x` | `y` | `width` | `height`) => number;
declare function applyFields(op: ApplyFieldOp, rect: RectPositioned): RectPositioned;
declare function applyFields(op: ApplyFieldOp, rect: Rect): Rect;
declare function applyFields(op: ApplyFieldOp, width: number, height: number): Rect;
declare function applyMerge(op: ApplyMergeOp, rect: RectPositioned, width: number, height?: number): RectPositioned;
declare function applyMerge(op: ApplyMergeOp, rect: Rect, width: number, height: number): Rect;
declare function applyMerge(op: ApplyMergeOp, a: RectPositioned, b: Rect): RectPositioned;
declare function applyMerge(op: ApplyMergeOp, a: Rect, b: Rect): Rect;
/**
 * Uses `op` with `param` to width and height.
 * @param op
 * @param rect
 * @param parameter
 */
declare function applyScalar(op: ApplyMergeOp, rect: Rect, parameter: number): Rect;
/**
 * Uses `op` to apply with `param` to width, height, x & y.
 * Use `applyDim` to apply just to dimensions.
 * @param op
 * @param rect
 * @param parameter
 */
declare function applyScalar(op: ApplyMergeOp, rect: RectPositioned, parameter: number): RectPositioned;
/**
 * Applies `op` with `param` to `rect`'s width and height.
 * @param op
 * @param rect
 * @param parameter
 * @returns
 */
declare function applyDim(op: ApplyMergeOp, rect: Rect | RectPositioned, parameter: number): Rect | RectPositioned;
//#endregion
//#region ../packages/geometry/src/rect/area.d.ts
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
declare const area$5: (rect: Rect) => number;
//#endregion
//#region ../packages/geometry/src/grid/types.d.ts
type GridVisual = UniformGrid & {
  readonly size: number;
};
/**
 * A uniform grid where each row has the same number of columns.
 *
 * Consider {@link JaggedGrid} if you want a grid where rows can have different numbers of columns.
 */
type UniformGrid = {
  readonly rows: number;
  readonly cols: number;
};
type Grid = UniformGrid | JaggedGrid;
/**
 * A grid where rows can have different numbers of columns.
 *
 * ```js
 * // Create a grid where first two rows have 2 columns,
 * // third row has 5 columns and last as 2 columns
 * const grid = {
 *  rows: [ 2, 2, 5, 2 ]
 * }
 * ```
 * Consider using {@link Grid} if all rows will have the same number of columns.
 */
type JaggedGrid = Readonly<{
  rows: number[];
}>;
type GridCell = {
  readonly x: number;
  readonly y: number;
};
type GridNeighbours = {
  readonly n: GridCell | undefined;
  readonly e: GridCell | undefined;
  readonly s: GridCell | undefined;
  readonly w: GridCell | undefined;
  readonly ne: GridCell | undefined;
  readonly nw: GridCell | undefined;
  readonly se: GridCell | undefined;
  readonly sw: GridCell | undefined;
};
type GridCardinalDirection = `n` | `ne` | `e` | `se` | `s` | `sw` | `w` | `nw`;
type GridCardinalDirectionOptional = GridCardinalDirection | ``;
type GridArray1d<T> = GridReadable<T> & GridWritable<T> & {
  array: T[];
};
/**
 * Bounds logic
 * Unbounded: attempts to read beyond limits
 * Undefined: returns _undefined_ when reading beyond limits
 * Stop: returns cell value at edge of limits
 * Wrap: Wrap-around cell positions
 *
 */
type GridBoundsLogic = `unbounded`
/**
 * Undefined: returns _undefined_ when reading beyond limits
 */
| `undefined`
/**
 * Stop: returns cell value at edge of limits
 */
| `stop`
/**
 * Wrap-around cell positions
 */
| `wrap`;
/**
 * Logic to select the next cell based on a list of neighbours.
 *
 * These functions are pure functions and have no internal state.
 */
type GridNeighbourSelectionLogic = {
  /**
   * Returns neighbours for a given cell in a grid
   */
  readonly getNeighbours?: GridIdentifyNeighbours;
  /**
   * Select a neighbour from given list
   */
  readonly select: GridNeighbourSelector;
};
type GridVisitorOpts = Readonly<{
  start: GridCell;
  visited: ISetMutable<GridCell>;
  reversed: boolean;
  debug: boolean;
  boundsWrap: GridBoundsLogic;
}>;
type GridCreateVisitor = (grid: Grid, opts?: Partial<GridVisitorOpts>) => Generator<GridCell>;
type GridCellAndValue<T> = {
  cell: GridCell;
  value: T | undefined;
};
type GridNeighbourMaybe = readonly [keyof GridNeighbours, GridCell | undefined];
type GridNeighbour = readonly [keyof GridNeighbours, GridCell];
/**
 * A function that returns a value (or _undefined_) based on a _cell_
 *
 * Implementations:
 * {@link Grids.Array1d.access}: For accessing a single-dimension array as a grid
 * {@link Grids.Array2d.access}: For accessing a two-dimension array as a grid
 *
 */
type GridCellAccessor<TValue> = (cell: GridCell, wrap?: GridBoundsLogic) => TValue | undefined;
/**
 * A function that sets the value of a cell.
 */
type GridCellSetter<TValue> = (value: TValue, cell: GridCell, wrap?: GridBoundsLogic) => void;
/**
 * Shape of a grid and a function to read values from it, based on
 * cell location.
 *
 * These functions create a GridReadable:
 * {@link Grids.Array1d.wrap}: wrap an array and read as a grid
 * {@link Grids.Array1d.wrapMutable}: wrap and modify an array as a grid
 * {@link Grids.Array2d.wrap}: wrap a two-dimensional grid
 * {@link Grids.Array2d.wrapMutable}
 */
type GridReadable<T> = UniformGrid & {
  get: GridCellAccessor<T>;
};
type GridWritable<T> = UniformGrid & {
  set: GridCellSetter<T>;
};
/**
 * Neighbour selector logic. For a given set of `neighbours` pick one to visit next.
 *
 * Pure function with no internal state.
 */
type GridNeighbourSelector = (neighbours: readonly GridNeighbour[]) => GridNeighbour | undefined;
/**
 * Identify neighbours logic. For a given `grid` and `origin`, return a list of neighbours
 * according to the logic of the visitor.
 *
 * For example, if the visitor is meant to go row-wise
 * (eg left-to-right, top-to-bottom), there's only one valid neighbour to return: the cell to the right
 * (or cell at next row when it's time to wrap).
 *
 * In other cases, the function might return multiple neighbours.
 *
 * Pure function with no internal state.
 */
type GridIdentifyNeighbours = (grid: Grid, origin: GridCell) => readonly GridNeighbour[];
/**
 * Defines a position between two contiguous cells
 */
type GridPositionBetween = Readonly<{
  a: GridCell;
  b: GridCell;
}>;
//#endregion
//#region ../packages/geometry/src/grid/apply-bounds.d.ts
declare function applyBounds(grid: Grid, cell: GridCell, wrap: GridBoundsLogic): GridCell;
declare function applyBounds(grid: Grid, cell: GridCell): GridCell | undefined;
declare function applyBounds(grid: Grid, cell: GridCell, wrap: `undefined`): GridCell | undefined;
declare namespace array_1d_d_exports {
  export { access$1 as access, accessWithGrid, createArray$1 as createArray, createMutable, set$1 as set, setMutate$1 as setMutate, wrap$1 as wrap, wrapMutable$1 as wrapMutable };
}
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
declare function access$1<V>(array: readonly V[], grid: Grid): GridCellAccessor<V>;
declare function accessWithGrid<T>(grid: Grid, array: readonly T[] | T[], cell: GridCell, wrap: GridBoundsLogic): T | undefined;
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
declare function setMutate$1<V>(array: V[], grid: Grid): GridCellSetter<V>;
declare function set$1<V>(array: readonly V[], cols: number): (value: V, cell: GridCell, wrap: GridBoundsLogic) => V[];
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
declare function wrapMutable$1<T>(array: T[], grid: UniformGrid): GridArray1d<T>;
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
declare function wrap$1<T>(array: T[], grid: UniformGrid): GridArray1d<T>;
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
declare function createArray$1<T>(initialValue: T, grid: Grid): T[];
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
declare function createMutable<T>(initialValue: T, grid: UniformGrid): GridArray1d<T>;
declare namespace array_2d_d_exports {
  export { ArrayGrid, access, createArray, createUniformGrid, set, setMutate, wrap, wrapMutable };
}
type ArrayGrid<T> = GridReadable<T> & GridWritable<T> & {
  array: T[][];
};
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
declare function createUniformGrid<T>(array: readonly T[][] | T[][]): UniformGrid;
declare function setMutate<V>(array: V[][]): GridCellSetter<V>;
declare function access<T>(array: readonly T[][]): GridCellAccessor<T>;
declare function wrapMutable<T>(array: T[][]): ArrayGrid<T>;
declare function set<V>(array: readonly V[][]): (value: V, cell: GridCell, wrap: GridBoundsLogic) => V[][];
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
declare function wrap<T>(array: T[][]): ArrayGrid<T>;
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
declare function createArray<T>(initialValue: T, grid: UniformGrid): T[][];
declare namespace as_d_exports {
  export { columns, getMaxColumnLength, rows$1 as rows };
}
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
declare function rows$1(grid: Grid, start?: GridCell): Generator<GridCell[], void, unknown>;
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
declare function columns(grid: Grid, start?: GridCell): Generator<GridCell[], void, unknown>;
declare function getMaxColumnLength(grid: JaggedGrid): number;
declare namespace cursor_d_exports {
  export { GridSelection };
}
type ContiguousSelection = Readonly<{
  start: GridCell;
  end: GridCell;
  kind: `contiguous`;
}>;
type RectangularTwoPointSelection = Readonly<{
  topLeft: GridCell;
  bottomRight: GridCell;
  kind: `rect-two-point`;
}>;
type Selection = ContiguousSelection | RectangularTwoPointSelection;
declare class GridSelection {
  #private;
  constructor(grid: Grid, start?: GridCell);
  moveCursorByVector(vector: GridCell): GridCell;
  setCursor(cell: GridCell, withSelection: `cancel` | `contiguous`): GridCell;
  get selectionInProgress(): Selection | undefined;
  extendContiguous(to: GridCell): ContiguousSelection;
  get cursor(): GridCell;
  clear(): void;
}
//#endregion
//#region ../packages/geometry/src/grid/directions.d.ts
/**
 * Returns a list of all cardinal directions: n, ne, nw, e, s, se, sw, w
 */
declare const allDirections: readonly GridCardinalDirection[];
/**
 * Returns a list of + shaped directions: n, e, s, w
 */
declare const crossDirections: readonly GridCardinalDirection[];
/**
 * Returns cells that correspond to the cardinal directions at a specified distance
 * i.e. it projects a line from `start` cell in all cardinal directions and returns the cells at `steps` distance.
 * @param grid Grid
 * @param start Start point
 * @param steps Distance
 * @param bounds Logic for if bounds of grid are exceeded
 * @returns Cells corresponding to cardinals
 */
declare function offsetCardinals(grid: Grid, start: GridCell, steps: number, bounds?: GridBoundsLogic): GridNeighbours;
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
declare function getVectorFromCardinal(cardinal: GridCardinalDirectionOptional, multiplier?: number): GridCell;
//#endregion
//#region ../packages/geometry/src/grid/distance.d.ts
declare function distance$1(a: GridCell, b: GridCell, grid: Grid, logic?: string): number;
declare function distanceRowwise(a: GridCell, b: GridCell, grid: Grid): number;
//#endregion
//#region ../packages/geometry/src/grid/enumerators/cells.d.ts
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
declare function cells(grid: Grid, start?: GridCell, wrap?: boolean): Generator<GridCell, void, unknown>;
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
declare function cellValues<T>(grid: GridReadable<T>, start?: GridCell, wrap?: boolean): Generator<T, void>;
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
declare function cellsAndValues<T>(grid: GridReadable<T>, start?: GridCell, wrap?: boolean): Generator<GridCellAndValue<T>>;
//#endregion
//#region ../packages/geometry/src/grid/enumerators/rows.d.ts
/**
 * Enumerate rows of a grid as arrays of cell coordinates.
 *
 * Works with Uniform and Jagged grids. In the case of JaggedGrids, the returned rows might be of different lengths.
 * @param grid
 * @param startRow Starting row index, by default 0
 * @param endRowInclusive Ending row index, by default last row of grid (ie grid.rows -1)
 */
declare function rows(grid: Grid, startRow?: number, endRowInclusive?: number): Generator<GridCell[]>;
declare namespace index_d_exports$10 {
  export { cellValues, cells, cellsAndValues, rows };
}
//#endregion
//#region ../packages/geometry/src/grid/geometry.d.ts
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
declare function lastCellColumnwise(grid: Grid): GridCell;
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
declare function lastCellRowwise(grid: Grid): GridCell;
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
declare function firstCellColumnwise(grid: Grid): GridCell;
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
declare function getLine(start: GridCell, end: GridCell): readonly GridCell[];
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
declare function simpleLine(start: GridCell, end: GridCell, endInclusive?: boolean): readonly GridCell[];
//#endregion
//#region ../packages/geometry/src/grid/guards.d.ts
declare const CellPlaceholder: GridCell;
/**
 * Returns _true_ if `cell` is a placeholder cell, i.e. has x and y as NaN.
 * @param cell
 */
declare function isPlaceholderCell(cell: GridCell): boolean;
/**
 * Returns true if `cell` parameter is a cell with x,y fields.
 * Does not check validity of fields.
 *
 * @param cell
 * @return True if parameter is a cell
 */
declare function isCell(cell: GridCell | undefined): cell is GridCell;
declare function isJaggedGrid(grid: Grid): grid is JaggedGrid;
/**
 * Throws an exception if any of the cell's parameters are invalid.
 *
 * Uses {@link testCell} under the hood.
 * @private
 * @param cell
 * @param parameterName
 * @param grid
 */
declare function guardCell_(cell: GridCell, parameterName?: string, grid?: Grid): void;
/**
 * Tests a cell.
 * If `grid` is provided, cell will be checked that it's inside the bounds of the grid.
 * @param cell
 * @param parameterName
 * @param grid
 */
declare function testCell(cell: GridCell, parameterName?: string, grid?: Grid): Result<GridCell, string>;
/**
 * Throws an exception if any of the grid's parameters are invalid.
 *
 * In the case of a {@link JaggedGrid}, each row is checked for validity.
 * @param grid
 * @param parameterName
 */
declare function testGrid(grid: Grid, parameterName?: string): Result<Grid | JaggedGrid, string>;
declare function testUniformGrid(grid: UniformGrid, parameterName?: string): Result<UniformGrid, string>;
declare function testJaggedGrid(grid: JaggedGrid, parameterName?: string): Result<JaggedGrid, string>;
//#endregion
//#region ../packages/geometry/src/grid/indexing.d.ts
declare function indexFromCell(grid: Grid, cell: GridCell, wrap: `undefined`): number | undefined;
declare function indexFromCell(grid: Grid, cell: GridCell, wrap: GridBoundsLogic): number;
declare function indexFromCellUniform(grid: UniformGrid, cell: GridCell, wrap: GridBoundsLogic): number | undefined;
declare function cellFromIndexUniform(colsOrGrid: number | UniformGrid, index: number): GridCell;
/**
 * Returns an index for a given cell in a JaggedGrid.
 * This is useful if a grid is stored in an array. Assumes rows are stored end-to-end.
 * @param grid
 * @param cell
 * @param wrap
 */
declare function indexFromCellJagged(grid: JaggedGrid, cell: GridCell, wrap: GridBoundsLogic): number | undefined;
/**
 * Returns the grid cell that corresponds to a given index in a JaggedGrid. Assumes rows are stored end-to-end.
 * @param grid
 * @param index
 */
declare function cellFromIndexJagged(grid: JaggedGrid, index: number): GridCell | undefined;
//#endregion
//#region ../packages/geometry/src/grid/inside.d.ts
/**
 * Returns _true_ if cell coordinates are above zero and within bounds of grid.
 *
 * @param grid
 * @param cell
 * @return True if cell is inside grid
 */
declare function inside(grid: Grid, cell: GridCell): boolean;
//#endregion
//#region ../packages/geometry/src/grid/is-equal.d.ts
/**
 * Returns _true_ if grids `a` and `b` are equal in value.
 * Returns _false_ if either parameter is undefined.
 *
 * @param a
 * @param b
 * @return
 */
declare const isEqual$5: (a: Grid | GridVisual, b: Grid | GridVisual) => boolean;
/**
 * Returns _true_ if two cells equal.
 * Returns _false_ if either cell are undefined
 *
 * @param a
 * @param b
 * @returns
 */
declare const cellEquals: (a: GridCell | undefined, b: GridCell | undefined) => boolean;
//#endregion
//#region ../packages/geometry/src/grid/neighbour.d.ts
declare const randomNeighbour: (nbos: readonly GridNeighbour[]) => GridNeighbour;
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
declare function neighbourList(grid: Grid, cell: GridCell, directions: readonly GridCardinalDirection[], bounds: GridBoundsLogic): readonly GridNeighbour[];
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
declare function neighbours(grid: Grid, cell: GridCell, bounds?: GridBoundsLogic, directions?: readonly GridCardinalDirection[]): GridNeighbours;
//#endregion
//#region ../packages/geometry/src/grid/offset.d.ts
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
declare function offset(grid: Grid, start: GridCell, vector: GridCell, bounds?: GridBoundsLogic): GridCell | undefined;
//#endregion
//#region ../packages/geometry/src/grid/to-array.d.ts
declare function toArray2d<V>(grid: Grid, initialValue?: V): V[][];
//#endregion
//#region ../packages/geometry/src/grid/to-string.d.ts
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
declare const cellKeyString: (v: GridCell) => string;
/**
 * Returns a string representation of the grid, handy for debugging.
 *
 * @param grid
 */
declare function gridString(grid: Grid): string;
//#endregion
//#region ../packages/geometry/src/grid/values.d.ts
declare function values<T>(grid: GridReadable<T>, iter: Iterable<GridCell>): Generator<T>;
declare function values<T>(grid: GridReadable<T>, iter: Iterable<GridCell[]>): Generator<T[]>;
//#endregion
//#region ../packages/geometry/src/grid/visitors/breadth.d.ts
declare function breadthLogic(): GridNeighbourSelectionLogic;
//#endregion
//#region ../packages/geometry/src/grid/visitors/cell-neighbours.d.ts
declare const neighboursLogic: () => GridNeighbourSelectionLogic;
//#endregion
//#region ../packages/geometry/src/grid/visitors/columns.d.ts
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
declare function columnLogic(opts?: Partial<GridVisitorOpts>): GridNeighbourSelectionLogic;
//#endregion
//#region ../packages/geometry/src/grid/visitors/depth.d.ts
declare const depthLogic: () => GridNeighbourSelectionLogic;
//#endregion
//#region ../packages/geometry/src/grid/visitors/random-contiguous.d.ts
declare const randomContiguousLogic: () => GridNeighbourSelectionLogic;
//#endregion
//#region ../packages/geometry/src/grid/visitors/random.d.ts
declare const randomLogic: () => GridNeighbourSelectionLogic;
//#endregion
//#region ../packages/geometry/src/grid/visitors/rows.d.ts
/**
 * Visit by following rows. Normal order is left-to-right, top-to-bottom.
 * @param options Options
 */
declare function rowLogic(options?: Partial<GridVisitorOpts>): GridNeighbourSelectionLogic;
//#endregion
//#region ../packages/geometry/src/grid/visitors/step.d.ts
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
declare function stepper(grid: Grid, createVisitor: GridCreateVisitor, start?: GridCell, resolution?: number): (step: number, fromStart?: boolean) => GridCell | undefined;
//#endregion
//#region ../packages/geometry/src/grid/visitors/visitor.d.ts
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
declare function visitByNeighbours(logic: GridNeighbourSelectionLogic, grid: Grid, opts?: Partial<GridVisitorOpts>): Generator<GridCell>;
declare namespace index_d_exports$9 {
  export { VisitorTypes, breadthLogic, columnLogic, create, createWithLogic, depthLogic, neighboursLogic, randomContiguousLogic, randomLogic, rowLogic, stepper, visitByNeighbours };
}
type VisitorTypes = `row` | `column` | `neighbours` | `breadth` | `depth` | `random` | `random-contiguous`;
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
declare function create(type: VisitorTypes, opts?: Partial<GridVisitorOpts>): (grid: Grid, optionsOverride?: Partial<GridVisitorOpts>) => Generator<GridCell>;
/**
 * Returns a function which creates a generator to iterate over cells with a given logic. Use {@link create} to specify this logic with a string.
 *
 * This lower-level function is used if you have a custom {@link GridNeighbourSelectionLogic} implementation.
 * @param logic
 * @param options
 */
declare function createWithLogic(logic: GridNeighbourSelectionLogic, options?: Partial<GridVisitorOpts>): (grid: Grid, optionsOverride?: Partial<GridVisitorOpts>) => Generator<GridCell>;
//#endregion
//#region ../packages/geometry/src/grid/visual.d.ts
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
declare function asRectangles(grid: GridVisual): IterableIterator<RectPositioned>;
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
declare function cellAtPoint(grid: GridVisual, position: Point): GridCell | undefined;
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
declare function rectangleForCell(grid: GridVisual, cell: GridCell): RectPositioned;
/**
 * Returns the visual midpoint of a cell (eg. pixel coordinate)
 *
 * @param grid
 * @param cell
 */
declare function cellMiddle(grid: GridVisual, cell: GridCell): Point;
declare namespace index_d_exports$8 {
  export { array_1d_d_exports as Array1d, array_2d_d_exports as Array2d, as_d_exports as As, index_d_exports$10 as By, CellPlaceholder, cursor_d_exports as Cursor, Grid, GridArray1d, GridBoundsLogic, GridCardinalDirection, GridCardinalDirectionOptional, GridCell, GridCellAccessor, GridCellAndValue, GridCellSetter, GridCreateVisitor, GridIdentifyNeighbours, GridNeighbour, GridNeighbourMaybe, GridNeighbourSelectionLogic, GridNeighbourSelector, GridNeighbours, GridPositionBetween, GridReadable, GridVisitorOpts, GridVisual, GridWritable, JaggedGrid, UniformGrid, index_d_exports$9 as Visit, allDirections, applyBounds, asRectangles, cellAtPoint, cellEquals, cellFromIndexJagged, cellFromIndexUniform, cellKeyString, cellMiddle, crossDirections, distance$1 as distance, distanceRowwise, firstCellColumnwise, getLine, getVectorFromCardinal, gridString, guardCell_, indexFromCell, indexFromCellJagged, indexFromCellUniform, inside, isCell, isEqual$5 as isEqual, isJaggedGrid, isPlaceholderCell, lastCellColumnwise, lastCellRowwise, neighbourList, neighbours, offset, offsetCardinals, randomNeighbour, rectangleForCell, simpleLine, testCell, testGrid, testJaggedGrid, testUniformGrid, toArray2d, values };
}
//#endregion
//#region ../packages/geometry/src/rect/cardinal.d.ts
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
declare const cardinal: (rect: RectPositioned, card: GridCardinalDirection | `center`) => Point;
//#endregion
//#region ../packages/geometry/src/rect/center-origin.d.ts
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
declare const centerOrigin: (rectAbsolute: RectPositioned) => {
  relativeToAbsolute: (point: Point) => Point;
  absoluteToRelative: (point: Point) => Point;
};
//#endregion
//#region ../packages/geometry/src/rect/center.d.ts
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
declare const center$1: (rect: RectPositioned | Rect, origin?: Point) => Point;
//#endregion
//#region ../packages/geometry/src/rect/corners.d.ts
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
declare const corners$1: (rect: RectPositioned | Rect, origin?: Point) => readonly Point[];
//#endregion
//#region ../packages/geometry/src/rect/distance.d.ts
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
declare function distanceFromExterior$1(rect: RectPositioned, pt: Point): number;
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
declare function distanceFromCenter(rect: RectPositioned, pt: Point): number;
//#endregion
//#region ../packages/geometry/src/rect/divide.d.ts
/**
 * Divides positioned `rect` by width/height. Useful for normalising a value.
 * x & y value of second parameter are ignored
 * ```js
 * // Normalise based on window size
 * const r = { x: 10, y: 200, width: 100, height: 30 };
 * const rr = Rects.divide(r, window.innerWidth, window.innerHeight);
 * ```
 *
 * Division applies to the first parameter's x/y fields. X is affected by `width`, Y is affected by `height`.
 */
declare function divide$2(rect: RectPositioned, width: number, height?: number): RectPositioned;
/**
 * Divides `rect` by width/height. Useful for denormalising a value.
 *
 * ```js
 * // Normalise based on window size
 * const r = { width: 100, height: 30 };
 * const rr = Rects.divide(r, window.innerWidth, window.innerHeight);
 * ```
 *
 */
declare function divide$2(rect: Rect, width: number, height: number): Rect;
/**
 * Divides positioned rect `a` by width and height of rect `b`.
 * ```js
 * // Returns { ...a, width: a.width / b.width, height: a.height/b.height, x: a.x / b.width, y: a.y / b.height }
 * Rects.divide(a, b);
 * ```
 *
 * @param a
 * @param b
 */
declare function divide$2(a: RectPositioned, b: Rect | RectPositioned): RectPositioned;
/**
 * Divides rect `a` by width and height of rect `b`.
 *
 * ```js
 * // Returns {...a, width: a.width / b.width, height: a.height/b.height }
 * Rects.divide(a, b);
 * ```
 *
 * @param a
 * @param b
 */
declare function divide$2(a: Rect, b: Rect): Rect;
/**
 * Divides all components of `rect` by `amount`.
 * ```js
 * divideScalar({ width:10, height:20 }, 2); // { width:5, height: 10 }
 * ```
 * @param rect
 * @param amount
 */
declare function divideScalar(rect: Rect, amount: number): Rect;
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
declare function divideScalar(rect: RectPositioned, amount: number): RectPositioned;
declare function divideDim(rect: Rect | RectPositioned, amount: number): Rect | RectPositioned;
//#endregion
//#region ../packages/geometry/src/rect/edges.d.ts
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
declare const edges$1: (rect: RectPositioned | Rect, origin?: Point) => readonly Line[];
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
declare const getEdgeX: (rect: RectPositioned | Rect, edge: `right` | `bottom` | `left` | `top`) => number;
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
declare const getEdgeY: (rect: RectPositioned | Rect, edge: `right` | `bottom` | `left` | `top`) => number;
//#endregion
//#region ../packages/geometry/src/rect/encompass.d.ts
/**
 * Returns a copy of `rect` with `rect` resized so it also encompasses `points`.
 * If provided point(s) are within bounds of `rect`, a copy of `rect` is returned.
 * @param rect
 * @param points
 * @returns
 */
declare const encompass: (rect: RectPositioned, ...points: Point[]) => RectPositioned;
//#endregion
//#region ../packages/geometry/src/rect/from-center.d.ts
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
declare const fromCenter$2: (origin: Point, width: number, height: number) => RectPositioned;
//#endregion
//#region ../packages/geometry/src/rect/from-element.d.ts
/**
 * Initialise a rectangle based on the width and height of a HTML element.
 *
 * ```js
 * Rects.fromElement(document.querySelector(`body`));
 * ```
 * @param el
 * @returns
 */
declare const fromElement: (el: HTMLElement) => Rect;
//#endregion
//#region ../packages/geometry/src/rect/from-numbers.d.ts
/**
 * Returns a rectangle from width, height
 * ```js
 * const r = Rects.fromNumbers(100, 200);
 * // {width: 100, height: 200}
 * ```
 *
 * Use {@link toArray} for the opposite conversion.
 *
 * @param width
 * @param height
 */
declare function fromNumbers$1(width: number, height: number): Rect;
/**
 * Returns a rectangle from x,y,width,height
 *
 * ```js
 * const r = Rects.fromNumbers(10, 20, 100, 200);
 * // {x: 10, y: 20, width: 100, height: 200}
 * ```
 *
 * Use the spread operator (...) if the source is an array:
 * ```js
 * const r3 = Rects.fromNumbers(...[10, 20, 100, 200]);
 * ```
 *
 * Use {@link toArray} for the opposite conversion.
 *
 * @param x
 * @param y
 * @param width
 * @param height
 */
declare function fromNumbers$1(x: number, y: number, width: number, height: number): RectPositioned;
//#endregion
//#region ../packages/geometry/src/rect/from-top-left.d.ts
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
declare function fromTopLeft(origin: Point, width: number, height: number): RectPositioned;
//#endregion
//#region ../packages/geometry/src/rect/get-rect-positionedparameter.d.ts
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
declare function getRectPositionedParameter(a: number | Point | Rect | RectPositioned, b?: Rect | number | Point, c?: number | Rect, d?: number): RectPositioned;
//#endregion
//#region ../packages/geometry/src/rect/guard.d.ts
/**
 * Throws an error if the dimensions of the rectangle are undefined, NaN or negative.
 * @param d
 * @param name
 */
declare const guardDim: (d: number, name?: string) => void;
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
declare const guard$3: (rect: Rect, name?: string) => void;
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
declare const getRectPositioned: (rect: Rect | RectPositioned, origin?: Point) => RectPositioned;
/**
 * Throws an error if `rect` is does not have a position, or
 * is an invalid rectangle
 * @param rect
 * @param name
 */
declare const guardPositioned$1: (rect: RectPositioned, name?: string) => void;
/**
 * Returns _true_ if `rect` has width and height values of 0.
 * Use Rects.Empty or Rects.EmptyPositioned to generate an empty rectangle.
 * @param rect
 * @returns
 */
declare const isEmpty$2: (rect: Rect) => boolean;
/**
 * Returns _true_ if `rect` is a placeholder, with both width and height values of NaN.
 * Use Rects.Placeholder or Rects.PlaceholderPositioned to generate a placeholder.
 * @param rect
 * @returns
 */
declare const isPlaceholder$2: (rect: Rect) => boolean;
/**
 * Returns _true_ if `rect` has position (x,y) fields.
 * @param rect Point, Rect or RectPositiond
 * @returns
 */
declare const isPositioned$2: (rect: Point | Rect | RectPositioned) => rect is Point;
/**
 * Returns _true_ if `rect` has width and height fields.
 * @param rect
 * @returns
 */
declare const isRect: (rect: unknown) => rect is Rect;
/**
 * Returns _true_ if `rect` is a positioned rectangle
 * Having width, height, x and y properties.
 * @param rect
 * @returns
 */
declare const isRectPositioned: (rect: any) => rect is RectPositioned;
//#endregion
//#region ../packages/geometry/src/rect/initialisers.d.ts
declare const Empty$2: Rect;
declare const EmptyPositioned: RectPositioned;
declare const Placeholder$2: Rect;
declare const PlaceholderPositioned: RectPositioned;
//#endregion
//#region ../packages/geometry/src/rect/intersects.d.ts
/**
 * Returns _true_ if `point` is within, or on boundary of `rect`.
 *
 * ```js
 * Rects.intersectsPoint(rect, { x: 100, y: 100});
 * ```
 * @param rect
 * @param point
 */
declare function intersectsPoint$1(rect: Rect | RectPositioned, point: Point): boolean;
/**
 * Returns true if x,y coordinate is within, or on boundary of `rect`.
 * ```js
 * Rects.intersectsPoint(rect, 100, 100);
 * ```
 * @param rect
 * @param x
 * @param y
 */
declare function intersectsPoint$1(rect: Rect | RectPositioned, x: number, y: number): boolean;
/**
 * Returns true if `a` or `b` overlap, are equal, or `a` contains `b`.
 * A rectangle can be checked for intersections with another RectPositioned, CirclePositioned or Point.
 *
 */
declare const isIntersecting$1: (a: RectPositioned, b: CirclePositioned | Point) => boolean;
//#endregion
//#region ../packages/geometry/src/rect/is-equal.d.ts
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
declare const isEqualSize: (a: Rect, b: Rect) => boolean;
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
declare const isEqual$4: (a: Rect | RectPositioned, b: Rect | RectPositioned) => boolean;
//#endregion
//#region ../packages/geometry/src/rect/lengths.d.ts
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
declare const lengths$1: (rect: RectPositioned) => readonly number[];
//#endregion
//#region ../packages/geometry/src/rect/max.d.ts
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
declare const maxFromCorners: (topLeft: Point, topRight: Point, bottomRight: Point, bottomLeft: Point) => RectPositioned;
//#endregion
//#region ../packages/geometry/src/rect/multiply.d.ts
/**
 * Multiplies positioned `rect` by width/height. Useful for denormalising a value.
 * x/y value of second parameter are ignored.
 * ```js
 * // Normalised rectangle
 * const r = { x:0.5, y:0.5, width: 0.5, height: 0.5};
 *
 * // Map to window:
 * const rr = Rects.multiply(r, window.innerWidth, window.innerHeight);
 * ```
 *
 * Multiplication applies to the first parameter's x/y fields.
 */
declare function multiply$2(rect: RectPositioned, width: number, height?: number): RectPositioned;
/**
 * Multiplies `rect` by width/height. Useful for denormalising a value.
 *
 * ```js
 * // Normalised rectangle of width 50%, height 50%
 * const r = { width: 0.5, height: 0.5 };
 *
 * // Map to window:
 * const rr = Rects.multiply(r, window.innerWidth, window.innerHeight);
 * ```
 *
 * Multiplication applies to the first parameter's x/y fields, if present.
 */
declare function multiply$2(rect: Rect, width: number, height: number): Rect;
/**
 * Multiplies positioned rect `a` by width and height of rect `b`.
 * ```js
 * // Returns {width: someRect.width * someOtherRect.width ...}
 * Rects.multiply(someRect, someOtherRect);
 * ```
 *
 * @param a
 * @param b
 */
declare function multiply$2(a: RectPositioned, b: Rect | RectPositioned): RectPositioned;
/**
 * Multiplies rect `a` by width and height of rect `b`.
 *
 * ```js
 * // Returns {width: someRect.width * someOtherRect.width ...}
 * Rects.multiply(someRect, someOtherRect);
 * ```
 *
 * @param a
 * @param b
 */
declare function multiply$2(a: Rect, b: Rect): Rect;
/**
 * Multiplies all components of `rect` by `amount`.
 * ```js
 * multiplyScalar({ width:10, height:20 }, 2); // { width:20, height: 40 }
 * ```
 * @param rect
 * @param amount
 */
declare function multiplyScalar$1(rect: Rect, amount: number): Rect;
/**
 * Multiplies all components of `rect` by `amount`.
 * This includes x,y if present.
 *
 * ```js
 * multiplyScalar({ width:10, height:20 }, 2); // { width:20, height: 40 }
 * multiplyScalar({ x: 1, y: 2, width:10, height:20 }, 2); // { x: 2, y: 4, width:20, height: 40 }
 * ```
 * @param rect
 * @param amount
 */
declare function multiplyScalar$1(rect: RectPositioned, amount: number): RectPositioned;
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
declare function multiplyDim(rect: Rect | RectPositioned, amount: number): Rect | RectPositioned;
//#endregion
//#region ../packages/geometry/src/rect/nearest.d.ts
/**
 * If `p` is inside of `rect`, a copy of `p` is returned.
 * If `p` is outside of `rect`, a point is returned closest to `p` on the edge
 * of the rectangle.
 * @param rect
 * @param p
 * @returns
 */
declare const nearestInternal: (rect: RectPositioned, p: Point) => Point;
//#endregion
//#region ../packages/geometry/src/rect/normalise-by-rect.d.ts
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
declare const dividerByLargestDimension: (rect: Rect) => (value: number | Point) => number | Point;
//#endregion
//#region ../packages/geometry/src/rect/perimeter.d.ts
/**
 * Returns the perimeter of `rect` (ie. sum of all edges)
 *  * ```js
 * const rect = { width: 100, height: 100, x: 100, y: 100 };
 * Rects.perimeter(rect);
 * ```
 * @param rect
 * @returns
 */
declare const perimeter$4: (rect: Rect) => number;
//#endregion
//#region ../packages/geometry/src/rect/random.d.ts
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
declare const random$1: (rando?: RandomSource) => RectPositioned;
type RectRandomPointOpts = {
  readonly strategy?: `naive`;
  readonly randomSource?: RandomSource;
  readonly margin?: {
    readonly x: number;
    readonly y: number;
  };
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
declare const randomPoint$1: (within: Rect | RectPositioned, options?: RectRandomPointOpts) => Point;
//#endregion
//#region ../packages/geometry/src/rect/subtract.d.ts
/**
 * Subtracts width/height of `b` from `a` (ie: a - b), returning result.
 * x,y of second parameter is ignored.
 * ```js
 * const rectA = { width: 100, height: 100 };
 * const rectB = { width: 200, height: 200 };
 *
 * // Yields: { width: -100, height: -100 }
 * Rects.subtract(rectA, rectB);
 * ```
 * @param a
 * @param b
 */
declare function subtract$2(a: Rect, b: Rect | RectPositioned): Rect;
declare function subtract$2(a: RectPositioned, b: Rect | RectPositioned): RectPositioned;
/**
 * Subtracts a width/height from `a`, returning result.
 * ```js
 * const rect = { width: 100, height: 100 };
 * Rects.subtract(rect, 200, 200);
 * // Yields: { width: -100, height: -100 }
 * ```
 * @param a
 * @param width
 * @param height
 */
declare function subtract$2(a: Rect, width: number, height: number): Rect;
declare function subtract$2(a: RectPositioned, width: number, height: number): RectPositioned;
/**
 * Subtracts a width & height from `a`. Leaves x & y as-is.
 * ```js
 * const rect = { x: 10, y: 20, width: 100, height: 200 };
 * subtractSize(rect, { width: 50, height: 100 });
 * subtractSize(rec, 50, 100);
 * // Both yields: { x:10, y: 20, width: 50, height: 100 }
 * ```
 * @param a Rectangle
 * @param b Rectangle to subtract by, or width
 * @param c Height, if second parameter is width
 */
declare function subtractSize(a: RectPositioned, b: Rect | number, c?: number): RectPositioned;
/**
 * Subtracts a width & height from `a`.
 * ```js
 * const rect = { width: 100, height: 200 };
 * subtractSize(rect, { width: 50, height: 100 });
 * subtractSize(rec, 50, 100);
 * // Both yields: { width: 50, height: 100 }
 * ```
 * @param a Rectangle
 * @param b Rectangle to subtract by, or width
 * @param c Height, if second parameter is width
 */
declare function subtractSize(a: Rect, b: Rect | number, c?: number): Rect;
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
declare function subtractOffset(a: RectPositioned | Rect, b: RectPositioned | Rect): RectPositioned;
//#endregion
//#region ../packages/geometry/src/rect/sum.d.ts
/**
 * Sums width/height of `b` with `a` (ie: a + b), returning result.
 * x/y of second parameter are ignored
 * ```js
 * import { Rects } from "@ixfx/geometry.js";
 * const rectA = { width: 100, height: 100 };
 * const rectB = { width: 200, height: 200 };
 *
 * // Yields: { width: 300, height: 300 }
 * Rects.sum(rectA, rectB);
 * ```
 * @param a
 * @param b
 */
declare function sum$2(a: Rect, b: Rect | RectPositioned): Rect;
/**
 * Sums width/height of `b` with `a`, returning result.
 *
 * Note that width/height of `b` is also added to `a`'s x & y properties
 * ```js
 * // Yields: { x:101, y:202, width: 110, height: 220 }
 * sum({x:1, y:2, width:10, height:20}, {width:100, height: 200});
 * ```
 *
 * x & y values of `b` are ignored. If you want to sum with those, use `sumOffset`
 * @param a
 * @param b
 */
declare function sum$2(a: RectPositioned, b: Rect | RectPositioned): RectPositioned;
/**
 * Sums width/height of `rect` with given `width` and `height`
 * ```js
 * import { Rects } from "@ixfx/geometry.js";
 * const rect = { width: 100, height: 100 };
 *
 * // Yields: { width: 300, height: 300 }
 * Rects.subtract(rect, 200, 200);
 * ```
 * @param rect
 * @param width
 * @param height
 */
declare function sum$2(rect: Rect, width: number, height: number): Rect;
/**
 * Sums width/height of `rect` with `width` and `height`
 *
 * `width` and `height` is added to `rect`'s `x` and `y` values.
 * ```js
 * // Yields: { x:101, y:202, width: 110, height: 220 }
 * sum({x:1, y:2, width:10, height:20}, 100, 200);
 * ```
 * @param rect
 * @param width
 * @param height
 */
declare function sum$2(rect: RectPositioned, width: number, height: number): RectPositioned;
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
declare function sumOffset(a: RectPositioned | Rect, b: RectPositioned | Rect): RectPositioned;
//#endregion
//#region ../packages/geometry/src/rect/to-array.d.ts
/**
 * Converts a rectangle to an array of numbers. See {@link fromNumbers} for the opposite conversion.
 *
 * ```js
 *
 * const r1 = Rects.toArray({ x: 10, y:20, width: 100, height: 200 });
 * // [10, 20, 100, 200]
 * const r2 = Rects.toArray({ width: 100, height: 200 });
 * // [100, 200]
 * ```
 * @param rect
 * @see fromNumbers
 */
declare function toArray(rect: Rect): RectArray;
/**
 * Converts a rectangle to an array of numbers. See {@link fromNumbers} for the opposite conversion.
 *
 * ```js
 *
 * const r1 = Rects.toArray({ x: 10, y:20, width: 100, height: 200 });
 * // [10, 20, 100, 200]
 * const r2 = Rects.toArray({ width: 100, height: 200 });
 * // [100, 200]
 * ```
 * @param rect
 * @see fromNumbers
 */
declare function toArray(rect: RectPositioned): RectPositionedArray;
declare namespace index_d_exports$7 {
  export { ApplyFieldOp, ApplyMergeOp, Empty$2 as Empty, EmptyPositioned, Placeholder$2 as Placeholder, PlaceholderPositioned, Rect, Rect3d, Rect3dPositioned, RectArray, RectPositioned, RectPositionedArray, RectRandomPointOpts, applyDim, applyFields, applyMerge, applyScalar, area$5 as area, cardinal, center$1 as center, centerOrigin, corners$1 as corners, distanceFromCenter, distanceFromExterior$1 as distanceFromExterior, divide$2 as divide, divideDim, divideScalar, dividerByLargestDimension, edges$1 as edges, encompass, fromCenter$2 as fromCenter, fromElement, fromNumbers$1 as fromNumbers, fromTopLeft, getEdgeX, getEdgeY, getRectPositioned, getRectPositionedParameter, guard$3 as guard, guardDim, guardPositioned$1 as guardPositioned, intersectsPoint$1 as intersectsPoint, isEmpty$2 as isEmpty, isEqual$4 as isEqual, isEqualSize, isIntersecting$1 as isIntersecting, isPlaceholder$2 as isPlaceholder, isPositioned$2 as isPositioned, isRect, isRectPositioned, lengths$1 as lengths, maxFromCorners, multiply$2 as multiply, multiplyDim, multiplyScalar$1 as multiplyScalar, nearestInternal, perimeter$4 as perimeter, random$1 as random, randomPoint$1 as randomPoint, subtract$2 as subtract, subtractOffset, subtractSize, sum$2 as sum, sumOffset, toArray };
}
//#endregion
//#region ../packages/geometry/src/arc/arc-type.d.ts
/**
 * Arc, defined by radius, start and end point in radians and direction
 */
type Arc = {
  /**
   * Radius of arc
   */
  readonly radius: number;
  /**
   * Start radian
   */
  readonly startRadian: number;
  /**
   * End radian
   */
  readonly endRadian: number;
  /**
   * If true, arc runs in clockwise direction
   */
  readonly clockwise: boolean;
};
/**
 * An {@link Arc} that also has a center position, given in x, y
 */
type ArcPositioned = Point & Arc;
/**
 * Function which can interpolate along an {@link Arc} or {@link ArcPositioned}.
 */
type ArcInterpolate = {
  (amount: number, arc: Arc, allowOverflow: boolean, origin: Point): Point;
  (amount: number, arc: ArcPositioned, allowOverflow?: boolean): Point;
};
/**
 * Function to convert an arc to SVG segments
 */
type ArcToSvg = {
  /**
   * SVG path for arc description
   * @param origin Origin of arc
   * @param radius Radius
   * @param startRadian Start
   * @param endRadian End
   */
  (origin: Point, radius: number, startRadian: number, endRadian: number, opts?: ArcSvgOpts): readonly string[];
  /**
   * SVG path for non-positioned arc.
   * If `arc` does have a position, `origin` will override it.
   */
  (arc: Arc, origin: Point, opts?: ArcSvgOpts): readonly string[];
  /**
   * SVG path for positioned arc
   */
  (arc: ArcPositioned, opts?: ArcSvgOpts): readonly string[];
};
type ArcSvgOpts = {
  /**
   * "If the arc should be greater or less than 180 degrees"
   * ie. tries to maximise arc length
   */
  readonly largeArc?: boolean;
  /**
   * "If the arc should begin moving at positive angles"
   * ie. the kind of bend it makes to reach end point
   */
  readonly sweep?: boolean;
};
//#endregion
//#region ../packages/geometry/src/path/path-type.d.ts
type Path = {
  /**
   * Length of path
   */
  length(): number;
  /**
   * Returns a point at a relative (0.0-1.0) position along the path
   *
   * Inverse of {@link relativePosition}.
   * @param {number} t Relative position (0.0-1.0)
   * @returns {Point} Point
   */
  interpolate(t: number): Point;
  /**
   * Returns relative position of `point` along path.
   * If `pt` is same as start, result will be 0, if it's the same as end, it will be 1.
   *
   * Inverse of {@link interpolate}.
   * @param point
   * @param intersectionThreshold
   */
  relativePosition(point: Point, intersectionThreshold: number): number;
  /**
   * Gets smallest box that encloses path
   */
  bbox(): RectPositioned;
  /**
   * Returns the nearest point on path to `point`
   * @param point
   */
  nearest(point: Point): Point;
  /**
   * Distance from start of path to this point.
   * If path is closed (eg. a circle) it may have some arbitary 'start' point
   * @param point
   */
  distanceToPoint(point: Point): number;
  /**
   * Returns a string representation of pth values
   */
  toString(): string;
  /**
   * Returns an array of SVG segments that can render path
   */
  toSvgString(): ReadonlyArray<string>;
  /**
   * Well-known path kind
   */
  readonly kind: `compound` | `elliptical` | `circular` | `arc` | `bezier/cubic` | `bezier/quadratic` | `line`;
};
type WithBeziers = {
  getBeziers(): ReadonlyArray<Path>;
};
type CompoundPath = Path & {
  readonly segments: ReadonlyArray<Path>;
  readonly kind: `compound`;
};
type Dimensions = {
  /**
   * Width of each path (based on bounding box)
   */
  readonly widths: ReadonlyArray<number>;
  /**
   * Length of each path
   */
  readonly lengths: ReadonlyArray<number>;
  /**
   * Total length of all paths
   */
  readonly totalLength: number;
  /**
   * Total width of all paths
   */
  readonly totalWidth: number;
};
declare namespace index_d_exports$6 {
  export { Arc, ArcInterpolate, ArcPositioned, ArcSvgOpts, ArcToSvg, angularSize, bbox$4 as bbox, distanceCenter$1 as distanceCenter, fromCircle, fromCircleAmount, fromDegrees$1 as fromDegrees, getStartEnd, guard$2 as guard, interpolate$3 as interpolate, isArc, isEqual$3 as isEqual, isPositioned$1 as isPositioned, length$2 as length, point, toLine, toPath$3 as toPath, toSvg$1 as toSvg };
}
/**
 * Returns true if parameter is an arc
 * @param p Arc or number
 * @returns Boolean
 */
declare const isArc: (p: unknown) => p is Arc;
/**
 * Returns true if parameter has a positioned (x,y)
 * @param p Point, Arc or ArcPositiond
 * @returns Boolean
 */
declare const isPositioned$1: (p: Point | Arc | ArcPositioned) => p is Point;
/**
 * Returns an arc from degrees, rather than radians
 * @param radius Radius of arc
 * @param startDegrees Start angle in degrees
 * @param endDegrees End angle in degrees
 * @returns Arc
 */
declare function fromDegrees$1(radius: number, startDegrees: number, endDegrees: number, clockwise: boolean): Arc;
/**
 * Returns an arc from degrees, rather than radians
 * @param radius Radius of arc
 * @param startDegrees Start angle in degrees
 * @param endDegrees End angle in degrees
 * @param clockwise Whether arc moves in clockwise direction
 * @param origin Optional center of arc
 * @returns Arc
 */
declare function fromDegrees$1(radius: number, startDegrees: number, endDegrees: number, clockwise: boolean, origin: Point): ArcPositioned;
/**
 * Returns a {@link Line} linking the start and end points of an {@link ArcPositioned}.
 *
 * @param arc
 * @returns Line from start to end of arc
 */
declare function toLine(arc: ArcPositioned): Line;
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
declare function getStartEnd(arc: ArcPositioned | Arc, origin?: Point): [start: Point, end: Point];
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
declare function point(arc: Arc | ArcPositioned, angleRadian: number, origin?: Point): Point;
/**
 * Throws an error if arc instance is invalid
 * @param arc
 */
declare function guard$2(arc: Arc | ArcPositioned): void;
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
declare const interpolate$3: ArcInterpolate;
/**
 * Returns the angular size of arc.
 * Eg if arc runs from 45-315deg in clockwise direction, size will be 90deg.
 * @param arc
 * @param direction Optionally specify direction to calculate size in. If not specified, will use arc's clockwise property to determine direction.
 */
declare function angularSize(arc: Arc, direction?: AngleDirection): number;
/**
 * Creates a {@link Path} instance from the arc. This wraps up some functions for convienence.
 * @param arc
 * @returns Path
 */
declare function toPath$3(arc: ArcPositioned): Path;
/**
 * Returns an arc based on a circle using start and end angles.
 * If you don't have the end angle, but rather the size of the arc, use {@link fromCircleAmount}
 * @param circle Circle
 * @param startRadian Start radian
 * @param endRadian End radian
 * @param clockwise Whether arc goes in a clockwise direction (default: true)
 * @returns ArcPositioned
 */
declare function fromCircle(circle: CirclePositioned, startRadian: number, endRadian: number, clockwise?: boolean): ArcPositioned;
/**
 * Returns an arc based on a circle, a start angle, and the size of the arc.
 * See {@link fromCircle} if you already have start and end angles.
 * @param circle Circle to base off
 * @param startRadian Starting angle
 * @param sizeRadian Size of arc
 * @param clockwise Whether arc moves in clockwise direction (default: true)
 * @returns ArcPositioned
 */
declare function fromCircleAmount(circle: CirclePositioned, startRadian: number, sizeRadian: number, clockwise?: boolean): ArcPositioned;
/**
 * Calculates the length of the arc
 * @param arc
 * @returns Length
 */
declare function length$2(arc: Arc): number;
/**
 * Calculates a {@link Rect} bounding box for arc.
 * @param arc
 * @returns Rectangle encompassing arc.
 */
declare function bbox$4(arc: ArcPositioned | Arc): RectPositioned | Rect;
/**
 * Creates an SV path snippet for arc
 * @returns
 */
declare function toSvg$1(a: Point | Arc | ArcPositioned, b?: number | Point | ArcSvgOpts, c?: number | ArcSvgOpts, d?: number, e?: ArcSvgOpts): readonly string[];
/**
 * Calculates the distance between the centers of two arcs
 * @param a
 * @param b
 * @returns Distance
 */
declare const distanceCenter$1: (a: ArcPositioned, b: ArcPositioned) => number;
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
declare function isEqual$3(a: Arc | ArcPositioned, b: Arc | ArcPositioned): boolean;
//#endregion
//#region ../packages/geometry/src/bezier/bezier-type.d.ts
type QuadraticBezier = {
  readonly a: Point;
  readonly b: Point;
  readonly quadratic: Point;
};
type QuadraticBezierPath = Path & QuadraticBezier;
type CubicBezier = {
  readonly a: Point;
  readonly b: Point;
  readonly cubic1: Point;
  readonly cubic2: Point;
};
type CubicBezierPath = Path & CubicBezier;
//#endregion
//#region ../packages/geometry/src/bezier/guard.d.ts
declare const isQuadraticBezier: (path: Path | QuadraticBezier | CubicBezier) => path is QuadraticBezier;
declare const isCubicBezier: (path: Path | CubicBezier | QuadraticBezier) => path is CubicBezier;
declare namespace index_d_exports$5 {
  export { CubicBezier, CubicBezierPath, QuadraticBezier, QuadraticBezierPath, cubic, interpolator$1 as interpolator, isCubicBezier, isQuadraticBezier, quadratic, quadraticSimple, quadraticToSvgString, toPath$2 as toPath };
}
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
declare const quadraticSimple: (start: Point, end: Point, bend?: number) => QuadraticBezier;
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
declare const interpolator$1: (q: QuadraticBezier | CubicBezier) => (amount: number) => Point;
declare const quadraticToSvgString: (start: Point, end: Point, handle: Point) => ReadonlyArray<string>;
declare const toPath$2: (cubicOrQuadratic: CubicBezier | QuadraticBezier) => CubicBezierPath | QuadraticBezierPath;
declare const cubic: (start: Point, end: Point, cubic1: Point, cubic2: Point) => CubicBezier;
declare const quadratic: (start: Point, end: Point, handle: Point) => QuadraticBezier;
//#endregion
//#region ../packages/geometry/src/circle/area.d.ts
/**
 * Returns the area of `circle`.
 * @param circle
 * @returns
 */
declare const area$4: (circle: Circle) => number;
//#endregion
//#region ../packages/geometry/src/circle/bbox.d.ts
/**
 * Computes a bounding box that encloses circle
 * @param circle
 * @returns
 */
declare const bbox$3: (circle: CirclePositioned | Circle) => RectPositioned;
//#endregion
//#region ../packages/geometry/src/circle/center.d.ts
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
declare const center: (circle: CirclePositioned | Circle) => Point;
declare namespace compound_path_d_exports {
  export { bbox$2 as bbox, computeDimensions, distanceToPoint, fromPaths, guardContinuous, interpolate$2 as interpolate, relativePosition$1 as relativePosition, setSegment, toString$2 as toString, toSvgString$1 as toSvgString };
}
/**
 * Returns a new compoundpath, replacing a path at a given index
 *
 * @param compoundPath Existing compoundpath
 * @param index Index to replace at
 * @param path Path to substitute in
 * @returns New compoundpath
 */
declare const setSegment: (compoundPath: CompoundPath, index: number, path: Path) => CompoundPath;
/**
 * Computes x,y point at a relative position along compoundpath
 *
 * @param paths Combined paths (assumes contiguous)
 * @param t Position (given as a percentage from 0 to 1)
 * @param useWidth If true, widths are used for calulcating. If false, lengths are used
 * @param dimensions Precalculated dimensions of paths, will be computed if omitted
 * @returns
 */
declare const interpolate$2: (paths: readonly Path[], t: number, useWidth?: boolean, dimensions?: Dimensions) => Point;
/**
 * Returns the shortest distance of `point` to any point on `paths`.
 * @param paths
 * @param point
 * @returns
 */
declare const distanceToPoint: (paths: readonly Path[], point: Point) => number;
/**
 * Relative position
 * @param paths Paths
 * @param point Point
 * @param intersectionThreshold Threshold
 * @param dimensions Pre-computed dimensions
 * @returns
 */
declare const relativePosition$1: (paths: readonly Path[], point: Point, intersectionThreshold: number, dimensions?: Dimensions) => number;
/**
 * Computes the widths and lengths of all paths, adding them up as well
 *
 * @param paths
 * @returns
 */
declare const computeDimensions: (paths: readonly Path[]) => Dimensions;
/**
 * Computes the bounding box that encloses entire compoundpath
 *
 * @param paths
 * @returns
 */
declare const bbox$2: (paths: readonly Path[]) => RectPositioned;
/**
 * Produce a human-friendly representation of paths
 *
 * @param paths
 * @returns
 */
declare const toString$2: (paths: readonly Path[]) => string;
/**
 * Throws an error if paths are not connected together, in order
 *
 * @param paths
 */
declare const guardContinuous: (paths: readonly Path[]) => void;
declare const toSvgString$1: (paths: readonly Path[]) => readonly string[];
/**
 * Create a compoundpath from an array of paths.
 * All this does is verify they are connected, and precomputes dimensions
 *
 * @param paths
 * @returns
 */
declare const fromPaths: (...paths: readonly Path[]) => CompoundPath;
//#endregion
//#region ../packages/geometry/src/path/start-end.d.ts
/**
 * Return the start point of a path
 *
 * @param path
 * @return Point
 */
declare const getStart: (path: Path) => Point;
/**
 * Return the end point of a path
 *
 * @param path
 * @return Point
 */
declare const getEnd: (path: Path) => Point;
declare namespace index_d_exports$4 {
  export { CompoundPath, Dimensions, Path, WithBeziers, bbox$2 as bbox, computeDimensions, distanceToPoint, fromPaths, getEnd, getStart, guardContinuous, interpolate$2 as interpolate, relativePosition$1 as relativePosition, setSegment, toString$2 as toString, toSvgString$1 as toSvgString };
}
//#endregion
//#region ../packages/geometry/src/circle/circular-path.d.ts
type CircularPath = Circle & Path & {
  readonly kind: `circular`;
};
//#endregion
//#region ../packages/geometry/src/circle/distance-center.d.ts
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
declare const distanceCenter: (a: CirclePositioned, b: CirclePositioned | Point) => number;
//#endregion
//#region ../packages/geometry/src/circle/distance-from-exterior.d.ts
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
declare const distanceFromExterior: (a: CirclePositioned, b: CirclePositioned | Point) => number;
//#endregion
//#region ../packages/geometry/src/circle/exterior-points.d.ts
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
declare function exteriorIntegerPoints(circle: CirclePositioned): IterableIterator<Point>;
//#endregion
//#region ../packages/geometry/src/circle/guard.d.ts
/**
 * Throws if radius is out of range. If x,y is present, these will be validated too.
 * @param circle
 * @param parameterName
 */
declare const guard$1: (circle: CirclePositioned | Circle, parameterName?: string) => void;
/**
 * Throws if `circle` is not positioned or has dodgy fields
 * @param circle
 * @param parameterName
 * @returns
 */
declare const guardPositioned: (circle: CirclePositioned, parameterName?: string) => void;
/***
 * Returns true if radius, x or y are NaN
 */
declare const isNaN: (a: Circle | CirclePositioned) => boolean;
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
declare const isPositioned: (p: Circle | Point) => p is Point;
declare const isCircle: (p: any) => p is Circle;
declare const isCirclePositioned: (p: any) => p is CirclePositioned;
//#endregion
//#region ../packages/geometry/src/circle/interior-points.d.ts
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
declare function interiorIntegerPoints(circle: CirclePositioned): IterableIterator<Point>;
//#endregion
//#region ../packages/geometry/src/circle/interpolate.d.ts
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
declare const interpolate$1: (circle: CirclePositioned, t: number) => Point;
//#endregion
//#region ../packages/geometry/src/circle/intersecting.d.ts
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
declare const isIntersecting: (a: CirclePositioned, b: CirclePositioned | Point | RectPositioned, c?: number) => boolean;
//#endregion
//#region ../packages/geometry/src/circle/intersections.d.ts
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
declare const intersectionLine: (circle: CirclePositioned, line: Line) => readonly Point[];
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
declare const intersections$1: (a: CirclePositioned, b: CirclePositioned) => readonly Point[];
//#endregion
//#region ../packages/geometry/src/circle/is-contained-by.d.ts
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
declare const isContainedBy: (a: CirclePositioned, b: CirclePositioned | Point, c?: number) => boolean;
//#endregion
//#region ../packages/geometry/src/circle/is-equal.d.ts
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
declare const isEqual$2: (a: CirclePositioned | Circle, b: CirclePositioned | Circle) => boolean;
//#endregion
//#region ../packages/geometry/src/circle/multiply.d.ts
declare function multiplyScalar(a: CirclePositioned, value: number): CirclePositioned;
declare function multiplyScalar(a: Circle, value: number): Circle;
//#endregion
//#region ../packages/geometry/src/circle/perimeter.d.ts
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
declare const nearest$1: (circle: CirclePositioned | CirclePositioned[], point: Point) => Point;
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
declare const pointOnPerimeter: (circle: Circle | CirclePositioned, angleRadian: number, origin?: Point) => Point;
/**
 * Returns circumference of `circle` (alias of {@link length})
 * @param circle
 * @returns
 */
declare const circumference: (circle: Circle) => number;
/**
 * Returns circumference of `circle` (alias of {@link circumference})
 * @param circle
 * @returns
 */
declare const length$1: (circle: Circle) => number;
//#endregion
//#region ../packages/geometry/src/circle/random.d.ts
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
declare const randomPoint: (within: Circle | CirclePositioned, opts?: Partial<CircleRandomPointOpts>) => Point;
//#endregion
//#region ../packages/geometry/src/circle/svg.d.ts
/**
 * Creates a SVG path segment.
 * @param a Circle or radius
 * @param sweep If true, path is 'outward'
 * @param origin Origin of path. Required if first parameter is just a radius or circle is non-positioned
 * @returns
 */
declare const toSvg: CircleToSvg;
//#endregion
//#region ../packages/geometry/src/circle/to-path.d.ts
/**
 * Returns a `CircularPath` representation of a circle
 *
 * @param {CirclePositioned} circle
 * @returns {CircularPath}
 */
declare const toPath$1: (circle: CirclePositioned) => CircularPath;
//#endregion
//#region ../packages/geometry/src/circle/to-positioned.d.ts
/**
 * Returns a positioned version of a circle.
 * If circle is already positioned, it is returned.
 * If no default position is supplied, 0,0 is used.
 * @param circle
 * @param defaultPositionOrX
 * @param y
 * @returns
 */
declare const toPositioned: (circle: Circle | CirclePositioned, defaultPositionOrX?: Point | number, y?: number) => CirclePositioned;
declare namespace index_d_exports$3 {
  export { Circle, CirclePositioned, CircleRandomPointOpts, CircleToSvg, CircularPath, area$4 as area, bbox$3 as bbox, center, circumference, distanceCenter, distanceFromExterior, exteriorIntegerPoints, guard$1 as guard, guardPositioned, interiorIntegerPoints, interpolate$1 as interpolate, intersectionLine, intersections$1 as intersections, isCircle, isCirclePositioned, isContainedBy, isEqual$2 as isEqual, isIntersecting, isNaN, isPositioned, length$1 as length, multiplyScalar, nearest$1 as nearest, pointOnPerimeter, randomPoint, toPath$1 as toPath, toPositioned, toSvg };
}
declare namespace curve_simplification_d_exports {
  export { rdpPerpendicularDistance, rdpShortestDistance };
}
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
declare const rdpShortestDistance: (points: Array<Point>, epsilon?: number) => Array<Point>;
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
declare const rdpPerpendicularDistance: (points: Array<Point>, epsilon?: number) => Array<Point>;
declare namespace ellipse_d_exports {
  export { Ellipse, EllipsePositioned, EllipticalPath, fromDegrees };
}
/**
 * An ellipse
 */
type Ellipse = {
  readonly radiusX: number;
  readonly radiusY: number;
  /**
   * Rotation, in radians
   */
  readonly rotation?: number;
  readonly startAngle?: number;
  readonly endAngle?: number;
};
/**
 * A {@link Ellipse} with position
 */
type EllipsePositioned = Point & Ellipse;
declare const fromDegrees: (radiusX: number, radiusY: number, rotationDeg?: number, startAngleDeg?: number, endAngleDeg?: number) => Ellipse;
type EllipticalPath = Ellipse & Path & {
  readonly kind: `elliptical`;
};
declare namespace circle_packing_d_exports {
  export { RandomOpts, random };
}
type RandomOpts = {
  readonly attempts?: number;
  readonly randomSource?: RandomSource;
};
/**
 * Naive randomised circle packing.
 * [Algorithm by Taylor Hobbs](https://tylerxhobbs.com/essays/2016/a-randomized-approach-to-cicle-packing)
 */
declare const random: (circles: readonly Circle[], container: ShapePositioned, opts?: RandomOpts) => CirclePositioned[];
//#endregion
//#region ../packages/geometry/src/layout/ring.d.ts
type CircleRingsOpts = {
  readonly rings?: number;
  /**
   * Rotation offset, in radians
   */
  readonly rotation?: number;
};
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
declare function circleRings(circle?: Circle | CirclePositioned, opts?: CircleRingsOpts): IterableIterator<Point>;
declare namespace layout_d_exports {
  export { circle_packing_d_exports as CirclePacking, CircleRingsOpts, circleRings };
}
//#endregion
//#region ../packages/geometry/src/line/angles.d.ts
/**
 * Returns a parallel line to `line` at `distance`.
 *
 * ```js
 * const l = Lines.parallel(line, 10);
 * ```
 * @param line
 * @param distance
 */
declare const parallel: (line: Line, distance: number) => Line;
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
declare const perpendicularPoint: (line: Line, distance: number, amount?: number) => Point;
//#endregion
//#region ../packages/geometry/src/line/bbox.d.ts
/**
 * Returns a rectangle that encompasses dimension of line
 *
 * ```js
 * const rect = Lines.bbox(line);
 * ```
 */
declare const bbox$1: (line: Line) => RectPositioned;
//#endregion
//#region ../packages/geometry/src/line/distance-single-line.d.ts
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
declare function distanceSingleLine(line: Line, point: Point): number;
//#endregion
//#region ../packages/geometry/src/line/divide.d.ts
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
declare const divide$1: (line: Line, point: Point) => Line;
//#endregion
//#region ../packages/geometry/src/line/from-flat-array.d.ts
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
declare const fromFlatArray$1: (array: readonly number[]) => Line;
//#endregion
//#region ../packages/geometry/src/line/from-numbers.d.ts
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
declare const fromNumbers: (x1: number, y1: number, x2: number, y2: number) => Line;
//#endregion
//#region ../packages/geometry/src/line/from-points.d.ts
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
declare const fromPoints$2: (a: Point, b: Point) => Line;
//#endregion
//#region ../packages/geometry/src/line/from-pivot.d.ts
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
declare const fromPivot: (origin?: Point, length?: number, angleRadian?: number, balance?: number) => Line;
//#endregion
//#region ../packages/geometry/src/line/line-path-type.d.ts
type LinePath = Line & Path & {
  toFlatArray(): readonly number[];
  toPoints(): readonly Point[];
  rotate(amountRadian: number, origin: Point): LinePath;
  sum(point: Point): LinePath;
  divide(point: Point): LinePath;
  multiply(point: Point): LinePath;
  subtract(point: Point): LinePath;
  apply(fn: (point: Point) => Point): LinePath;
  midpoint(): Point;
  parallel(distance: number): Line;
  perpendicularPoint(distance: number, amount?: number): Point;
  slope(): number;
  withinRange(point: Point, maxRange: number): boolean;
  isEqual(otherLine: Line): boolean;
};
//#endregion
//#region ../packages/geometry/src/line/from-points-to-path.d.ts
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
declare const fromPointsToPath: (a: Point, b: Point) => LinePath;
//#endregion
//#region ../packages/geometry/src/line/get-points-parameter.d.ts
/**
 * Returns [a,b] points from either a line parameter, or two points.
 * It additionally applies the guardPoint function to ensure validity.
 * This supports function overloading.
 * @ignore
 * @param aOrLine
 * @param b
 * @returns
 */
declare const getPointParameter: (aOrLine: Point | Line, b?: Point) => readonly [Point, Point];
//#endregion
//#region ../packages/geometry/src/line/guard.d.ts
/**
 * Returns true if `p` is a valid line, containing `a` and `b` Points.
 * ```js
 * Lines.isLine(l);
 * ```
 * @param p Value to check
 * @returns True if a valid line.
 */
declare function isLine(p: any): p is Line;
/**
 * Returns true if `p` is a {@link PolyLine}, ie. an array of {@link Line}s.
 * Validates all items in array.
 * @param p
 * @returns
 */
declare function isPolyLine(p: any): p is PolyLine;
/**
 * Returns a failure if:
 * - line is undefined
 * - a or b parameters are missing
 *
 * Does not validate points
 * @param line
 * @param name
 */
declare function lineTest(line: Line, name?: string): Result<boolean, string>;
//#endregion
//#region ../packages/geometry/src/line/interpolate.d.ts
/**
 * Calculates a point in-between `a` and `b`.
 *
 * If an interpolation amount below 0 or above 1 is given, _and_
 * `allowOverflow_ is true, a point will be returned that is extended
 * past `line`. This is useful for easing functions which might
 * briefly go past the limits.
 *
 * ```js
 * // Get {x,y} at 50% along line
 * Lines.interpolate(0.5, line);
 *
 * // Get {x,y} at 80% between point A and B
 * Lines.interpolate(0.8, ptA, ptB);
 * ```
 * @param amount Relative position, 0 being at a, 0.5 being halfway, 1 being at b
 * @param a Start
 * @param pointB End
 * @returns Point between a and b
 */
declare function interpolate(amount: number, a: Point, pointB: Point, allowOverflow?: boolean): Point;
/**
 * Calculates a point in-between `line`'s start and end points.
 *
 * ```js
 * // Get {x, y } at 50% along line
 * Lines.interpolate(0.5, line);
 * ```
 *
 * Any additional properties from `b`  are returned on the result as well.
 * @param amount 0..1
 * @param line Line
 * @param allowOverflow If true, interpolation amount is permitted to exceed 0..1, extending the line
 */
declare function interpolate(amount: number, line: Line, allowOverflow?: boolean): Point;
/**
 * Returns a function that interpolates along `line`, returning a {@link Point}.
 * ```js
 * const i = interpolator(a: {x:0,y:0}, b:{x:100, y:100});
 * i(0.5); // Returns point 50% between a and b.
 * ```
 * @param line Line to interpolate along
 * @param allowOverflow If _true_ interpolation amount can exceed 0..1, extending the line.
 */
declare function interpolator(line: Line, allowOverflow?: boolean): (amount: number) => Point;
/**
 * Returns the point along a line from its start (A)
 * @param line Line
 * @param distance Distance
 * @param fromA If _true_ (default) returns from A. Use _false_ to calculate from end
 * @returns Point at distance along line
 */
declare function pointAtDistance(line: Line, distance: number, fromA?: boolean): Point;
//#endregion
//#region ../packages/geometry/src/line/is-equal.d.ts
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
declare const isEqual$1: (a: Line, b: Line) => boolean;
//#endregion
//#region ../packages/geometry/src/line/join-points-to-lines.d.ts
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
declare const joinPointsToLines: (...points: readonly Point[]) => PolyLine;
/**
 * Converts a {@link PolyLine} to an array of points.
 * Duplicate points are optionally excluded
 * @param line
 * @returns
 */
declare const polyLineToPoints: (line: PolyLine, skipDuplicates?: boolean) => Point[];
//#endregion
//#region ../packages/geometry/src/line/length.d.ts
/**
 * Returns the length between two points
 * ```js
 * Lines.length(ptA, ptB);
 * ```
 * @param a First point
 * @param b Second point
 * @returns
 */
declare function length(a: Point, b: Point, force2d?: boolean): number;
/**
 * Returns length of line. If a polyline (array of lines) is provided,
 * it is the sum total that is returned.
 *
 * ```js
 * Lines.length(a: {x:0, y:0}, b: {x: 100, y:100});
 * Lines.length(lines);
 * ```
 * @param line Line
 */
declare function length(line: Line | PolyLine, force2d?: boolean): number;
//#endregion
//#region ../packages/geometry/src/line/midpoint.d.ts
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
declare const midpoint: (aOrLine: Point | Line, pointB?: Point) => Point;
//#endregion
//#region ../packages/geometry/src/line/multiply.d.ts
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
declare const multiply$1: (line: Line, point: Point) => Line;
//#endregion
//#region ../packages/geometry/src/line/nearest.d.ts
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
declare const nearest: (lineOrLines: Line | Line[] | readonly Line[], point: Point) => Point;
//#endregion
//#region ../packages/geometry/src/line/relative-position.d.ts
/**
 * Returns the relative position of `pt` along `line`.
 * Warning: assumes `pt` is actually on `line`. Results may be bogus if not.
 * @param line
 * @param pt
 */
declare const relativePosition: (line: Line, pt: Point) => number;
//#endregion
//#region ../packages/geometry/src/line/reverse.d.ts
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
declare function reverse(line: Line): Line;
//#endregion
//#region ../packages/geometry/src/line/rotate.d.ts
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
declare const rotate$1: (line: Line, amountRadian?: number, origin?: Point | number) => Line;
//#endregion
//#region ../packages/geometry/src/line/subtract.d.ts
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
declare const subtract$1: (line: Line, point: Point) => Line;
//#endregion
//#region ../packages/geometry/src/line/sum.d.ts
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
declare const sum$1: (line: Line, point: Point) => Line;
//#endregion
//#region ../packages/geometry/src/line/to-path.d.ts
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
declare const toPath: (line: Line) => LinePath;
//#endregion
//#region ../packages/geometry/src/line/to-string.d.ts
/**
 * Returns a string representation of two points
 * ```js
 * console.log(Lines.toString(a, b)));
 * ```
 * @param a
 * @param b
 * @returns String representation of two points
 */
declare function toString$1(a: Point, b: Point): string;
/**
 * Returns a string representation of a line
 * ```js
 * Lines.toString(line);
 * ```
 * @param line
 */
declare function toString$1(line: Line): string;
declare namespace index_d_exports$2 {
  export { Empty$1 as Empty, Line, LinePath, Placeholder$1 as Placeholder, PolyLine, angleRadian, apply$1 as apply, asPoints, bbox$1 as bbox, distance, distanceSingleLine, divide$1 as divide, extendFromA, fromFlatArray$1 as fromFlatArray, fromNumbers, fromPivot, fromPoints$2 as fromPoints, fromPointsToPath, getPointParameter, interpolate, interpolator, isEmpty$1 as isEmpty, isEqual$1 as isEqual, isLine, isPlaceholder$1 as isPlaceholder, isPolyLine, joinPointsToLines, length, lineTest, midpoint, multiply$1 as multiply, nearest, normaliseByRect, parallel, perpendicularPoint, pointAtDistance, pointAtX, pointsOf, polyLineToPoints, relativePosition, reverse, rotate$1 as rotate, scaleFromMidpoint, slope, subtract$1 as subtract, sum$1 as sum, toFlatArray$1 as toFlatArray, toPath, toString$1 as toString, toSvgString, withinRange };
}
declare const Empty$1: Line;
declare const Placeholder$1: Line;
/**
 * Returns true if `l` is the same as Line.Empty, that is
 * the `a` and `b` points are Points.Empty.
 * @param l
 * @returns
 */
declare const isEmpty$1: (l: Line) => boolean;
declare const isPlaceholder$1: (l: Line) => boolean;
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
declare const apply$1: (line: Line, fn: (p: Point) => Point) => Readonly<Line>;
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
declare const angleRadian: (lineOrPoint: Line | Point, b?: Point) => number;
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
declare const normaliseByRect: (line: Line, width: number, height: number) => Line;
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
declare const withinRange: (line: Line, point: Point, maxRange: number) => boolean;
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
declare const slope: (lineOrPoint: Line | Point, b?: Point) => number;
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
declare const scaleFromMidpoint: (line: Line, factor: number) => Line;
/**
 * Calculates `y` where `line` intersects `x`.
 * @param line Line to extend
 * @param x Intersection of x-axis.
 */
declare const pointAtX: (line: Line, x: number) => Point;
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
declare const extendFromA: (line: Line, distance: number) => Line;
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
declare function pointsOf(line: Line): Generator<Point>;
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
declare const distance: (line: Line | readonly Line[], point: Point) => number;
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
declare const toFlatArray$1: (a: Point | Line, b: Point) => readonly number[];
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
declare function asPoints(lines: Iterable<Line>): Generator<Point, void, unknown>;
/**
 * Returns an SVG description of line
 * ```
 * Lines.toSvgString(ptA, ptB);
 * ```
 * @param a
 * @param b
 * @returns
 */
declare const toSvgString: (a: Point, b: Point) => readonly string[];
declare namespace quad_tree_d_exports {
  export { Direction, QuadTreeItem, QuadTreeNode, QuadTreeOpts, quadTree };
}
/**
 * Options for quad tree
 */
type QuadTreeOpts = {
  /**
   * Maximum items per node
   */
  readonly maxItems: number;
  /**
   * Maximum level of sub-division
   */
  readonly maxLevels: number;
};
/**
 * Direction
 */
declare enum Direction {
  Nw = 0,
  Ne = 1,
  Sw = 2,
  Se = 3
}
/**
 * A Point or ShapePositioned
 */
type QuadTreeItem = Point | ShapePositioned;
/**
 * Creates a QuadTreeNode
 * @param bounds Bounds of region
 * @param initialData Initial items to place in quad tree
 * @param opts Options
 * @returns New quad tree
 */
declare function quadTree(bounds: RectPositioned, initialData?: readonly QuadTreeItem[], opts?: Partial<QuadTreeOpts>): QuadTreeNode;
/**
 * QuadTreeNode. The values of the node is an array of {@link QuadTreeItem}.
 *
 * To create, you probably want the {@link quadTree} function.
 *
 */
declare class QuadTreeNode implements TraversableTree<QuadTreeItem[]> {
  #private;
  readonly boundary: RectPositioned;
  readonly level: number;
  readonly opts: QuadTreeOpts;
  /**
   * Constructor
   * @param boundary
   * @param level
   * @param opts
   */
  constructor(parent: QuadTreeNode | undefined, boundary: RectPositioned, level: number, opts: QuadTreeOpts);
  getLengthChildren(): number;
  parents(): IterableIterator<QuadTreeNode>;
  getParent(): QuadTreeNode | undefined;
  /**
   * Iterates over immediate children
   */
  children(): IterableIterator<QuadTreeNode>;
  /**
   * Array of QuadTreeItem
   * @returns
   */
  getValue(): QuadTreeItem[];
  getIdentity(): this;
  /**
   * Get a descendant node in a given direction
   * @param d
   * @returns
   */
  direction(d: Direction): QuadTreeNode | undefined;
  /**
   * Add an item to the quadtree
   * @param p
   * @returns False if item is outside of boundary, True if item was added
   */
  add(p: QuadTreeItem): boolean;
  /**
   * Returns true if point is inside node's boundary
   * @param p
   * @returns
   */
  couldHold(p: Point): boolean;
}
declare namespace raycast_d_exports {
  export { RaycastHit, asFan, intersections, raycast2d };
}
type RaycastHit = {
  x: number;
  y: number;
  d: number;
  line: number;
};
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
declare function intersections(a: Point, b: Point, lines: Line[]): Generator<RaycastHit>;
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
declare function raycast2d(lines: Line[]): (light: Point) => RaycastHit[];
declare function asFan(samples: RaycastHit[], light: CirclePositioned): RaycastHit[];
//#endregion
//#region ../packages/geometry/src/scaler.d.ts
/**
 * A scale function that takes an input value to scale.
 * Input can be in the form of `{ x, y }` or two number parameters.
 *
 * ```js
 * scale(10, 20);
 * scale({ x:10, y:20 });
 * ```
 *
 * Output range can be specified as a `{ width, height }` or two number parameters.
 * If omitted, the default range
 * is used.
 *
 * ```js
 * // Scale 10,20 with range w:800 h:600
 * scale(10, 20, 800, 600);
 * scale({x:10, y:20}, 800, 600);
 * scale({x:10, y:20}, {width: 800, height: 600});
 * ```
 */
type Scaler = (a: number | Point, b?: number | Rect, c?: number | Rect, d?: number) => Point;
/**
 * A scaler than can convert to a from an output range
 */
type ScalerCombined = {
  /**
   * Relative to absolute coordinates
   */
  readonly abs: Scaler;
  /**
   * Absolute to relative coordintes
   */
  readonly rel: Scaler;
  readonly width: number;
  readonly height: number;
  computeScale(): Point;
};
type ScaleBy = `both` | `min` | `max` | `width` | `height`;
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
declare const scaler: (scaleBy?: ScaleBy, defaultRect?: Rect) => ScalerCombined;
declare namespace surface_points_d_exports {
  export { RingOptionsCount, RingOptionsDegreeInterval, RingOptionsRadianInterval, VogelSpiralOpts, circleVogelSpiral, ring, sphereFibonacci };
}
/**
 * Options for a Vogel spiral
 */
type VogelSpiralOpts = {
  /**
   * Upper limit of points to produce.
   * By default, 5000.
   */
  readonly maxPoints?: number;
  /**
   * Density value (0..1) which determines spacing of points.
   * This is useful because it scales with whatever circle radius is given
   * Use this parameter OR the `spacing` parameter.
   */
  readonly density?: number;
  /**
   * Spacing between points.
   * Use this option OR the density value.
   */
  readonly spacing?: number;
  /**
   * Rotation offset to apply, in radians. 0 by default
   */
  readonly rotation?: number;
};
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
declare function circleVogelSpiral(circle?: Circle, opts?: VogelSpiralOpts): IterableIterator<Point>;
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
declare function sphereFibonacci(samples?: number, rotationRadians?: number, sphere?: Sphere): IterableIterator<Point3d>;
type RingOptionsCount = {
  count: number;
};
type RingOptionsRadianInterval = {
  radians: number;
};
type RingOptionsDegreeInterval = {
  degrees: number;
};
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
declare function ring(circle: CirclePositioned, opts: {
  offset?: number;
} & (RingOptionsCount | RingOptionsRadianInterval | RingOptionsDegreeInterval)): Generator<Point, void, unknown>;
//#endregion
//#region ../packages/geometry/src/triangle/angles.d.ts
/**
 * Return the three interior angles of the triangle, in radians.
 * @param t
 * @returns
 */
declare const angles: (t: Triangle) => ReadonlyArray<number>;
/**
 * Returns the three interior angles of the triangle, in degrees
 * @param t
 * @returns
 */
declare const anglesDegrees: (t: Triangle) => ReadonlyArray<number>;
//#endregion
//#region ../packages/geometry/src/triangle/area.d.ts
/**
 * Calculates the area of a triangle
 * @param t
 * @returns
 */
declare const area$3: (t: Triangle) => number;
//#endregion
//#region ../packages/geometry/src/triangle/barycentric.d.ts
/**
 * Returns the [Barycentric coordinate](https://en.wikipedia.org/wiki/Barycentric_coordinate_system) of a point within a triangle
 *
 * @param t
 * @param a
 * @param b
 * @returns
 */
declare const barycentricCoord: (t: Triangle, a: Point | number, b?: number) => BarycentricCoord;
/**
 * Convert Barycentric coordinate to Cartesian
 * @param t
 * @param bc
 * @returns
 */
declare const barycentricToCartestian: (t: Triangle, bc: BarycentricCoord) => Point;
//#endregion
//#region ../packages/geometry/src/triangle/bbox.d.ts
/**
 * Returns the bounding box that encloses the triangle.
 * @param t
 * @param inflation If specified, box will be inflated by this much. Default: 0.
 * @returns
 */
declare const bbox: (t: Triangle, inflation?: number) => RectPositioned;
//#endregion
//#region ../packages/geometry/src/triangle/centroid.d.ts
/**
 * Returns simple centroid of triangle
 * @param t
 * @returns
 */
declare const centroid: (t: Triangle) => Point;
//#endregion
//#region ../packages/geometry/src/triangle/corners.d.ts
/**
 * Returns the corners (vertices) of the triangle as an array of points
 * @param t
 * @returns Array of length three
 */
declare const corners: (t: Triangle) => ReadonlyArray<Point>;
//#endregion
//#region ../packages/geometry/src/triangle/create.d.ts
/**
 * A triangle consisting of three empty points (Points.Empty)
 */
declare const Empty: Triangle;
/**
 * A triangle consisting of three placeholder points (Points.Placeholder)
 */
declare const Placeholder: Triangle;
/**
 * Returns a triangle anchored at `origin` with a given `length` and `angleRadian`.
 * The origin will be point `b` of the triangle, and the angle will be the angle for b.
 * @param origin Origin
 * @param length Length
 * @param angleRadian Angle
 * @returns
 */
declare const equilateralFromVertex: (origin?: Point, length?: number, angleRadian?: number) => Triangle;
//#endregion
//#region ../packages/geometry/src/triangle/edges.d.ts
/**
 * Returns the edges (ie sides) of the triangle as an array of lines
 * @param t
 * @returns Array of length three
 */
declare const edges: (t: Triangle) => PolyLine;
//#endregion
//#region ../packages/geometry/src/triangle/from.d.ts
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
declare const fromRadius: (origin: Point, radius: number, opts?: {
  readonly initialAngleRadian?: number;
}) => Triangle;
/**
 * Returns a triangle from a set of coordinates in a flat array form:
 * [xA, yA, xB, yB, xC, yC]
 * @param coords
 * @returns
 */
declare const fromFlatArray: (coords: readonly number[]) => Triangle;
/**
 * Returns a triangle from an array of three points
 * @param points
 * @returns
 */
declare const fromPoints$1: (points: readonly Point[]) => Triangle;
//#endregion
//#region ../packages/geometry/src/triangle/inner-circle.d.ts
/**
 * Returns the largest circle enclosed by triangle `t`.
 * @param t
 */
declare const innerCircle: (t: Triangle) => CirclePositioned;
//#endregion
//#region ../packages/geometry/src/triangle/intersects.d.ts
/**
 * Returns true if point is within or on the boundary of triangle
 * @param t
 * @param a
 * @param b
 */
declare function intersectsPoint(t: Triangle, a: Point | number, b?: number): boolean;
//#endregion
//#region ../packages/geometry/src/triangle/kinds.d.ts
/**
 * Returns true if it is an equilateral triangle
 * @param t
 * @returns
 */
declare const isEquilateral: (t: Triangle) => boolean;
/**
 * Returns true if it is an isosceles triangle
 * @param t
 * @returns
 */
declare const isIsosceles: (t: Triangle) => boolean;
/**
 * Returns true if at least one interior angle is 90 degrees
 * @param t
 * @returns
 */
declare const isRightAngle: (t: Triangle) => boolean;
/**
 * Returns true if triangle is oblique: No interior angle is 90 degrees
 * @param t
 * @returns
 */
declare const isOblique: (t: Triangle) => boolean;
/**
 * Returns true if triangle is actue: all interior angles less than 90 degrees
 * @param t
 * @returns
 */
declare const isAcute: (t: Triangle) => boolean;
/**
 * Returns true if triangle is obtuse: at least one interior angle is greater than 90 degrees
 * @param t
 * @returns
 */
declare const isObtuse: (t: Triangle) => boolean;
//#endregion
//#region ../packages/geometry/src/triangle/lengths.d.ts
/**
 * Returns the lengths of the triangle sides
 * @param t
 * @returns Array of length three
 */
declare const lengths: (t: Triangle) => ReadonlyArray<number>;
//#endregion
//#region ../packages/geometry/src/triangle/math.d.ts
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
declare const apply: (t: Triangle, fn: (p: Point, label?: string) => Point) => Triangle;
//#endregion
//#region ../packages/geometry/src/triangle/outer-circle.d.ts
/**
 * Returns the largest circle touching the corners of triangle `t`.
 * @param t
 * @returns
 */
declare const outerCircle: (t: Triangle) => CirclePositioned;
//#endregion
//#region ../packages/geometry/src/triangle/perimeter.d.ts
/**
 * Calculates perimeter of a triangle
 * @param t
 * @returns
 */
declare const perimeter$3: (t: Triangle) => number;
//#endregion
//#region ../packages/geometry/src/triangle/rotate.d.ts
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
declare const rotate: (triangle: Triangle, amountRadian?: number, origin?: Point) => Triangle;
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
declare const rotateByVertex: (triangle: Triangle, amountRadian: number, vertex?: `a` | `b` | `c`) => Triangle;
//#endregion
//#region ../packages/geometry/src/triangle/to.d.ts
/**
 * Returns the coordinates of triangle in a flat array form:
 * [xA, yA, xB, yB, xC, yC]
 * @param t
 * @returns
 */
declare const toFlatArray: (t: Triangle) => readonly number[];
//#endregion
//#region ../packages/geometry/src/triangle/guard.d.ts
/**
 * Throws an exception if the triangle is invalid
 * @param t
 * @param name
 */
declare const guard: (t: Triangle, name?: string) => void;
/**
 * Returns true if the parameter appears to be a valid triangle
 * @param p
 * @returns
 */
declare const isTriangle: (p: unknown) => p is Triangle;
/**
 * Returns true if triangle is empty
 * @param t
 * @returns
 */
declare const isEmpty: (t: Triangle) => boolean;
/**
 * Returns true if triangle is a placeholder
 * @param t
 * @returns
 */
declare const isPlaceholder: (t: Triangle) => boolean;
/**
 * Returns true if the two parameters have equal values
 * @param a
 * @param b
 * @returns
 */
declare const isEqual: (a: Triangle, b: Triangle) => boolean;
declare namespace equilateral_d_exports {
  export { TriangleEquilateral, area$2 as area, centerFromA, centerFromB, centerFromC, circumcircle$2 as circumcircle, fromCenter$1 as fromCenter, height$2 as height, incircle$2 as incircle, perimeter$2 as perimeter };
}
type TriangleEquilateral = {
  readonly length: number;
} | number;
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
declare const fromCenter$1: (t: TriangleEquilateral, origin?: Point, rotationRad?: number) => Triangle;
/**
 * Calculate center from the given point A
 * @param t
 * @param ptA
 * @returns
 */
declare const centerFromA: (t: TriangleEquilateral, ptA?: Point) => Point;
/**
 * Calculate center from the given point B
 * @param t
 * @param ptB
 * @returns
 */
declare const centerFromB: (t: TriangleEquilateral, ptB?: Point) => Point;
/**
 * Calculate center from the given point C
 * @param t
 * @param ptC
 * @returns
 */
declare const centerFromC: (t: TriangleEquilateral, ptC?: Point) => Point;
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
declare const height$2: (t: TriangleEquilateral) => number;
declare const perimeter$2: (t: TriangleEquilateral) => number;
declare const area$2: (t: TriangleEquilateral) => number;
/**
 * Circle that encompasses all points of triangle
 * @param t
 */
declare const circumcircle$2: (t: TriangleEquilateral) => Circle;
/**
 * Circle that is inside the edges of the triangle
 * @param t
 * @returns
 */
declare const incircle$2: (t: TriangleEquilateral) => Circle;
declare namespace right_d_exports {
  export { DefinedRight, Right, adjacentFromHypotenuse, adjacentFromOpposite, angleAtPointA, angleAtPointB, area$1 as area, circumcircle$1 as circumcircle, fromA$1 as fromA, fromB$1 as fromB, fromC$1 as fromC, height$1 as height, hypotenuseFromAdjacent, hypotenuseFromOpposite, hypotenuseSegments, incircle$1 as incircle, medians$1 as medians, oppositeFromAdjacent, oppositeFromHypotenuse, perimeter$1 as perimeter, resolveLengths };
}
type Right = {
  readonly adjacent?: number;
  readonly hypotenuse?: number;
  readonly opposite?: number;
};
type DefinedRight = {
  readonly adjacent: number;
  readonly hypotenuse: number;
  readonly opposite: number;
};
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
declare const fromA$1: (t: Right, origin?: Point) => Triangle;
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
declare const fromB$1: (t: Right, origin?: Point) => Triangle;
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
declare const fromC$1: (t: Right, origin?: Point) => Triangle;
/**
 * Returns a right triangle with all lengths defined.
 * At least two lengths must already exist
 * @param t
 * @returns
 */
declare const resolveLengths: (t: Right) => DefinedRight;
/**
 * Height of right-triangle
 * @param t
 * @returns
 */
declare const height$1: (t: Right) => number;
/**
 * Returns the lengths of the hypotenuse split into p and q segments.
 * In other words, if one makes a line from the right-angle vertex down to hypotenuse.
 *
 * [See here](https://rechneronline.de/pi/right-triangle.php)
 * @param t
 * @returns
 */
declare const hypotenuseSegments: (t: Right) => readonly [p: number, q: number];
declare const perimeter$1: (t: Right) => number;
declare const area$1: (t: Right) => number;
/**
 * Angle (in radians) between hypotenuse and adjacent edge
 * @param t
 * @returns
 */
declare const angleAtPointA: (t: Right) => number;
/**
 * Angle (in radians) between opposite edge and hypotenuse
 * @param t
 * @returns
 */
declare const angleAtPointB: (t: Right) => number;
/**
 * Returns the median line lengths a, b and c in an array.
 *
 * The median lines are the lines from each vertex to the center.
 *
 * @param t
 * @returns
 */
declare const medians$1: (t: Right) => readonly [a: number, b: number, c: number];
/**
 * The circle which passes through the points of the triangle
 * @param t
 * @returns
 */
declare const circumcircle$1: (t: Right) => Circle;
/**
 * Circle enclosed by triangle
 * @param t
 * @returns
 */
declare const incircle$1: (t: Right) => Circle;
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
declare const oppositeFromAdjacent: (angleRad: number, adjacent: number) => number;
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
declare const oppositeFromHypotenuse: (angleRad: number, hypotenuse: number) => number;
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
declare const adjacentFromHypotenuse: (angleRadian: number, hypotenuse: number) => number;
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
declare const adjacentFromOpposite: (angleRadian: number, opposite: number) => number;
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
declare const hypotenuseFromOpposite: (angleRadian: number, opposite: number) => number;
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
declare const hypotenuseFromAdjacent: (angleRadian: number, adjacent: number) => number;
declare namespace isosceles_d_exports {
  export { Isosceles, apexAngle, area, baseAngle, circumcircle, fromA, fromB, fromC, fromCenter, height, incircle, legHeights, medians, perimeter };
}
type Isosceles = {
  readonly legs: number;
  readonly base: number;
};
declare const baseAngle: (t: Isosceles) => number;
declare const apexAngle: (t: Isosceles) => number;
declare const height: (t: Isosceles) => number;
declare const legHeights: (t: Isosceles) => number;
declare const perimeter: (t: Isosceles) => number;
declare const area: (t: Isosceles) => number;
declare const circumcircle: (t: Isosceles) => Circle;
declare const incircle: (t: Isosceles) => Circle;
declare const medians: (t: Isosceles) => readonly [a: number, b: number, c: number];
/**
 * Returns a positioned `Triangle` based on a center origin.
 * Center is determined by the intesecting of the medians.
 *
 * See: https://rechneronline.de/pi/isosceles-triangle.php
 * @param t
 * @param origin
 * @returns
 */
declare const fromCenter: (t: Isosceles, origin?: Point) => Triangle;
declare const fromA: (t: Isosceles, origin?: Point) => Triangle;
declare const fromB: (t: Isosceles, origin?: Point) => Triangle;
declare const fromC: (t: Isosceles, origin?: Point) => Triangle;
declare namespace index_d_exports$1 {
  export { BarycentricCoord, Empty, equilateral_d_exports as Equilateral, isosceles_d_exports as Isosceles, Placeholder, right_d_exports as Right, Triangle, angles, anglesDegrees, apply, area$3 as area, barycentricCoord, barycentricToCartestian, bbox, centroid, corners, edges, equilateralFromVertex, fromFlatArray, fromPoints$1 as fromPoints, fromRadius, guard, innerCircle, intersectsPoint, isAcute, isEmpty, isEqual, isEquilateral, isIsosceles, isOblique, isObtuse, isPlaceholder, isRightAngle, isTriangle, lengths, outerCircle, perimeter$3 as perimeter, rotate, rotateByVertex, toFlatArray };
}
declare namespace vector_d_exports {
  export { Vector, clampMagnitude, divide, dotProduct, fromAngle, fromLineCartesian, fromLinePolar, fromPointPolar, fromRadians, multiply, normalise, quadrantOffsetAngle, subtract, sum, toCartesian, toPolar, toRadians, toString };
}
type Vector = Point | Coord;
/**
 * Returns a Cartesian-coordinate vector from an angle in radians.
 * To create a vector from an angle in arbitrary units, use {@link fromAngle}.
 * ```js
 * fromRadians(Math.PI); // { x: -1, y: 0 }
 * ```
 * @param radians
 * @returns Point in Cartesian coordinates
 */
declare function fromRadians(radians: number): Point;
/**
 * Returns a vector from an angle. If a number is given, it's assumed to be degrees
 * ```js
 * fromAngle(90); // { x: 0, y: 1 }
 * fromAngle({ value: 90, unit: `deg` }); // { x: 0, y: 1 }
 * ```
 * @param angle
 * @returns Vector in Cartesian coordinates
 */
declare function fromAngle(angle: Angle | number): Point;
declare function toRadians(point: Point): number;
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
declare function fromPointPolar(pt: Point, angleNormalisation?: `` | `unipolar` | `bipolar`, origin?: Point): Coord;
/**
 * Returns a Cartesian-coordinate vector from a line a -> b
 * @param line
 * @returns Point in Cartesian coordinates
 */
declare function fromLineCartesian(line: Line): Point;
/**
 * Returns a polar-coordinate vector from a line a -> b
 * @param line
 * @returns Polar coordinate
 */
declare function fromLinePolar(line: Line): Coord;
/**
 * Returns the normalised vector (aka unit vector). This is where
 * direction is kept, but magnitude set to 1. This then just
 * suggests direction.
 * @param v
 * @returns Vector with magnitude of 1
 */
declare function normalise(v: Vector): Vector;
declare function quadrantOffsetAngle(p: Point): number;
/**
 * Converts a vector to a polar coordinate. If the provided
 * value is already Polar, it is returned.
 * @param v
 * @param origin
 * @returns Polar vector
 */
declare function toPolar(v: Vector, origin?: Point): Coord;
/**
 * Converts a Vector to a Cartesian coordinate. If the provided
 * value is already Cartesian, it is returned.
 * @param v
 * @returns Cartestian vector
 */
declare function toCartesian(v: Vector): Point;
/**
 * Return a human-friendly representation of vector
 * @param v
 * @param digits
 * @returns string
 */
declare function toString(v: Vector, digits?: number): string;
/**
 * Calculate dot product of a vector
 * @param a
 * @param b
 * @returns Dot product of two vectors
 */
declare function dotProduct(a: Vector, b: Vector): number;
/**
 * Clamps the magnitude of a vector
 * @param v Vector to clamp
 * @param max Maximum magnitude
 * @param min Minium magnitude
 * @returns Point
 */
declare function clampMagnitude(v: Vector, max?: number, min?: number): Point | Readonly<{
  distance: number;
  angleRadian: number;
}>;
/**
 * Returns `a + b`.
 *
 * Vector is returned in the same type as `a`.
 * @param a
 * @param b
 * @returns Vector in the same type as `a`
 */
declare function sum(a: Vector, b: Vector): Point | Readonly<{
  distance: number;
  angleRadian: number;
}>;
/**
 * Returns `a - b`.
 *
 * Vector is returned in the same type as `a`
 * @param a
 * @param b
 */
declare function subtract(a: Vector, b: Vector): Point | Readonly<{
  distance: number;
  angleRadian: number;
}>;
/**
 * Returns `a * b`.
 *
 * Vector is returned in the same type `a`.
 * @param a
 * @param b
 */
declare function multiply(a: Vector, b: Vector): Point | Readonly<{
  distance: number;
  angleRadian: number;
}>;
/**
 * Returns `a / b`.
 *
 * Vector is returned in the same type `a`.
 * @param a
 * @param b
 */
declare function divide(a: Vector, b: Vector): Point | Readonly<{
  distance: number;
  angleRadian: number;
}>;
declare namespace waypoint_d_exports {
  export { Waypoint, WaypointOpts, WaypointResult, Waypoints, fromPoints, init };
}
type Waypoint = CirclePositioned;
type WaypointOpts = {
  readonly maxDistanceFromLine: number;
  readonly enforceOrder: boolean;
};
/**
 * Create from set of points, connected in order starting at array position 0.
 * @param waypoints
 * @param opts
 * @returns
 */
declare const fromPoints: (waypoints: readonly Point[], opts?: Partial<WaypointOpts>) => Waypoints;
/**
 * Result
 */
type WaypointResult = {
  /**
   * Path being compared against
   */
  path: Path;
  /**
   * Index of this path in original `paths` array
   */
  index: number;
  /**
   * Nearest point on path. See also {@link distance}
   */
  nearest: Point;
  /**
   * Closest distance to path. See also {@link nearest}
   */
  distance: number;
  /**
   * Rank of this result, 0 being highest.
   */
  rank: number;
  /**
   * Relative position on this path segment
   * 0 being start, 0.5 middle and so on.
   */
  positionRelative: number;
};
/**
 * Given point `pt`, returns a list of {@link WaypointResult}, comparing
 * this point to a set of paths.
 * ```js
 * // Init once with a set of paths
 * const w = init(paths);
 * // Now call with a point to get results
 * const results = w({ x: 10, y: 20 });
 * ```
 */
type Waypoints = (pt: Point) => WaypointResult[];
/**
 * Initialise
 *
 * Options:
 * * maxDistanceFromLine: Distances greater than this are not matched. Default 0.1
 * @param paths
 * @param opts
 * @returns
 */
declare const init: (paths: readonly Path[], opts?: Partial<WaypointOpts>) => Waypoints;
declare namespace index_d_exports {
  export { Angle, AngleConvertible, AngleDirection, AngleRad, Arc, ArcInterpolate, ArcPositioned, ArcSvgOpts, ArcToSvg, index_d_exports$6 as Arcs, BarycentricCoord, index_d_exports$5 as Beziers, Circle, CirclePositioned, CircleRandomPointOpts, CircleToSvg, index_d_exports$3 as Circles, compound_path_d_exports as Compound, CompoundPath, ContainsResult, Coord, CubicBezier, CubicBezierPath, curve_simplification_d_exports as CurveSimplification, Dimensions, ellipse_d_exports as Ellipses, Grid, GridArray1d, GridBoundsLogic, GridCardinalDirection, GridCardinalDirectionOptional, GridCell, GridCellAccessor, GridCellAndValue, GridCellSetter, GridCreateVisitor, GridIdentifyNeighbours, GridNeighbour, GridNeighbourMaybe, GridNeighbourSelectionLogic, GridNeighbourSelector, GridNeighbours, GridPositionBetween, GridReadable, GridVisitorOpts, GridVisual, GridWritable, index_d_exports$8 as Grids, JaggedGrid, layout_d_exports as Layouts, Line, LinePath, index_d_exports$2 as Lines, Path, index_d_exports$4 as Paths, Placeholder$3 as Placeholder, Placeholder3d, Point, Point3d, PointCalculableShape, PointRelation, PointRelationResult, PointTrack, PointTracker, PointTrackerResults, index_d_exports$11 as Points, PointsTracker, index_d_exports$12 as Polar, PolarLine, PolarRay, PolarRayWithOrigin, PolarToCartesian, PolyLine, quad_tree_d_exports as QuadTree, QuadraticBezier, QuadraticBezierPath, raycast_d_exports as Rays, Rect, Rect3d, Rect3dPositioned, RectArray, RectPositioned, RectPositionedArray, index_d_exports$7 as Rects, ScaleBy, Scaler, ScalerCombined, ShapePositioned, index_d_exports$13 as Shapes, Sphere, surface_points_d_exports as SurfacePoints, Triangle, index_d_exports$1 as Triangles, UniformGrid, UserPointerTracker, UserPointersTracker, vector_d_exports as Vectors, waypoint_d_exports as Waypoints, WithBeziers, angleConvert, angleParse, average, degreeArc, degreeToGradian, degreeToRadian, degreeToTurn, degreesSum, fromUnitVector, gradianToDegree, gradianToRadian, isAngleType, isAngleTypeConvertible, radianArc, radianInvert, radianRange, radianToDegree, radianToGradian, radianToTurn, radiansBetweenCircular, radiansFromAxisX, radiansNormalise, radiansSum, scaler, toRadian, toUnitVector, turnToDegree, turnToRadian };
}
//#endregion
export { GridNeighbours as $, index_d_exports$13 as $t, WithBeziers as A, radianToTurn as At, GridBoundsLogic as B, PointTracker as Bt, CubicBezierPath as C, isAngleType as Ct, CompoundPath as D, radianRange as Dt, index_d_exports$6 as E, radianInvert as Et, ArcToSvg as F, toRadian as Ft, GridCellAndValue as G, index_d_exports$12 as Gt, GridCardinalDirectionOptional as H, PointsTracker as Ht, index_d_exports$7 as I, toUnitVector as It, GridIdentifyNeighbours as J, PolarRay as Jt, GridCellSetter as K, Coord as Kt, index_d_exports$8 as L, turnToDegree as Lt, ArcInterpolate as M, radiansFromAxisX as Mt, ArcPositioned as N, radiansNormalise as Nt, Dimensions as O, radianToDegree as Ot, ArcSvgOpts as P, radiansSum as Pt, GridNeighbourSelector as Q, PointRelationResult as Qt, Grid as R, turnToRadian as Rt, CubicBezier as S, gradianToRadian as St, QuadraticBezierPath as T, radianArc as Tt, GridCell as U, UserPointerTracker as Ut, GridCardinalDirection as V, PointTrackerResults as Vt, GridCellAccessor as W, UserPointersTracker as Wt, GridNeighbourMaybe as X, PolarToCartesian as Xt, GridNeighbour as Y, PolarRayWithOrigin as Yt, GridNeighbourSelectionLogic as Z, PointRelation as Zt, curve_simplification_d_exports as _, RectPositionedArray as _n, degreeToRadian as _t, surface_points_d_exports as a, Sphere as an, JaggedGrid as at, compound_path_d_exports as b, Point as bn, fromUnitVector as bt, ScalerCombined as c, Circle as cn, Angle as ct, quad_tree_d_exports as d, CircleToSvg as dn, AngleRad as dt, BarycentricCoord as en, GridPositionBetween as et, index_d_exports$2 as f, Rect as fn, angleConvert as ft, ellipse_d_exports as g, RectPositioned as gn, degreeToGradian as gt, EllipsePositioned as h, RectArray as hn, degreeArc as ht, index_d_exports$1 as i, ShapePositioned as in, GridWritable as it, Arc as j, radiansBetweenCircular as jt, Path as k, radianToGradian as kt, scaler as l, CirclePositioned as ln, AngleConvertible as lt, layout_d_exports as m, Rect3dPositioned as mn, average as mt, waypoint_d_exports as n, ContainsResult as nn, GridVisitorOpts as nt, ScaleBy as o, Line as on, UniformGrid as ot, LinePath as p, Rect3d as pn, angleParse as pt, GridCreateVisitor as q, PolarLine as qt, vector_d_exports as r, PointCalculableShape as rn, GridVisual as rt, Scaler as s, PolyLine as sn, index_d_exports$11 as st, index_d_exports as t, Triangle as tn, GridReadable as tt, raycast_d_exports as u, CircleRandomPointOpts as un, AngleDirection as ut, index_d_exports$3 as v, Placeholder$3 as vn, degreeToTurn as vt, QuadraticBezier as w, isAngleTypeConvertible as wt, index_d_exports$5 as x, Point3d as xn, gradianToDegree as xt, index_d_exports$4 as y, Placeholder3d as yn, degreesSum as yt, GridArray1d as z, PointTrack as zt };
//# sourceMappingURL=index-qtIs-QFt.d.ts.map