/**
 * Map through all keys in an object and call a CB. Assign that CB's return value to the key in question
 * @param object - The object to make this call on. This would otherwise be bound to `Object.prototype` but I don't like breaking the web
 * @param {objectMapCallback} cb - The callback in order to run the `Object.map` function
 * @returns - The object with it's keys altered by the cb param
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function objectMap<T extends Record<string, any>, R>(
  object: T,
  cb: (value: T[keyof T], key: keyof T, object: T) => R,
): {
  [key in keyof T]: R extends infer Q ? Q : never
} {
  return Object.keys(object).reduce((prev, key) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    prev[key as keyof T] = cb(object[key], key as never, object) as never
    return prev
    // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
  }, {} as Record<keyof T, never>)
}
