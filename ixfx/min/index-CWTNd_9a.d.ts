//#region ../packages/events/src/types.d.ts
type Listener<Events> = (event: unknown, sender: ISimpleEventEmitter<Events>) => void;
type ISimpleEventEmitter<Events> = {
  addEventListener<K extends keyof Events>(type: K, listener: (event: Events[K], sender: ISimpleEventEmitter<Events>) => void): void;
  removeEventListener<K extends keyof Events>(type: K, listener: (event: Events[K], sender: ISimpleEventEmitter<Events>) => void): void;
};
//#endregion
//#region ../packages/events/src/simple-event-emitter.d.ts
declare class SimpleEventEmitter<Events> implements ISimpleEventEmitter<Events> {
  #private;
  dispose(): void;
  get isDisposed(): boolean;
  /**
   * Fire event
   * @param type Type of event
   * @param args Arguments for event
   * @returns
   */
  protected fireEvent<K extends keyof Events>(type: K, args: Events[K]): void;
  /**
   * Adds event listener.
   *
   * @throws Error if emitter is disposed
   * @typeParam K - Events
   * @param name Event name
   * @param listener Event handler
   */
  addEventListener<K extends keyof Events>(name: K, listener: (event: Events[K], sender: SimpleEventEmitter<Events>) => void): void;
  /**
   * Remove event listener
   *
   * @param listener
   */
  removeEventListener<K extends keyof Events>(type: K, listener: (event: Events[K], sender: SimpleEventEmitter<Events>) => void): void;
  /**
   * Clear all event listeners
   * @private
   */
  clearEventListeners(): void;
}
declare namespace index_d_exports {
  export { ISimpleEventEmitter, Listener, SimpleEventEmitter };
}
//#endregion
export { Listener as i, SimpleEventEmitter as n, ISimpleEventEmitter as r, index_d_exports as t };