/**
 * Util type to only keep the keys from an array of an object
 * @param obj - The object to make this call on
 * @param keyArr - A string array of the keys to keep
 * @constructor
 */
export function pick<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Obj extends Record<string, any>,
  Keys extends Array<keyof Obj>,
>(
  obj: Obj,
  keyArr: Keys,
): {
  [key in keyof Obj as Exclude<Keys[number], key> extends never
    ? key
    : never]: key extends keyof Obj ? Obj[key] : key
} {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Object.entries(obj).reduce<any>((prev, [key, val]) => {
    if (!keyArr.includes(key)) return prev
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    prev[key] = val
    return prev
  }, {})
}
