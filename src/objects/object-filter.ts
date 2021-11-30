/**
 * Map through all keys in an object and call a CB. Decide to keep the Object key in the return object based on the truthyness of the CB's return value
 * @param object - The object to make this call on
 * @param {objectFilterCallback} cb - The callback in order to run the `Object.map` function
 * @returns - The object with its keys altered by the cb param
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function objectFilter<T extends Record<string, any>>(
  object: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cb: (value: T[keyof T], key: keyof T, object: T) => any,
): Partial<T> {
  return Object.keys(object).reduce<Partial<T>>((prev, key) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-assignment
    const toKeep = cb(object[key], key as never, object)
    if (toKeep) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      prev[key as keyof T] = object[key]
    }
    return prev
  }, {})
}
