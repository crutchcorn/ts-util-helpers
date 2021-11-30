export function objectImmutablySetProp<T extends object, K extends keyof T, V>(
  object: T,
  key: K,
  val: V,
): {
  [P in keyof T]: P extends K ? V : T[P]
} {
  return Object.assign({}, object, {[key]: val}) as never
}
