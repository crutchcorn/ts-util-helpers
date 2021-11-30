/**
 * @callback objectMapCallback
 * @param value - The value of the key that is currently being modified. Added as an attempt to duplicate Array.map `value`
 * @param {string} key - The key that is currently being modified. Added as an attempt to duplicate Array.map `index`
 * @param object - The original untouched object that the map function is being called on. Added as an attempt to duplicate Array.map `array`
 */

export type ObjectIterableCallback<TT, K extends keyof TT, R> = (
  value: TT[K],
  key: K,
  object: TT,
) => R
