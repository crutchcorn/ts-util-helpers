/**
 * Given an array of strings, create an object with those keys and some initialized value
 * @param arr - The array to make this call on
 * @returns - The object with its keys altered by the cb param
 */

export function objectFromKeys<
  Arr extends ReadonlyArray<string | symbol | number>,
  T
>(
  arr: Arr,
  initializer: T = undefined
): Record<Arr[number], T> {
  return  arr.reduce((prev, key) => {
    prev[key] = initializer
    return prev
  }, {} as Record<Arr[number], T>)
}
