/**
 * Map through all keys in an object and call a CB. Decide to keep the Object key in the return object based on the truthyness of the CB's return value
 * @param object - The object to make this call on
 * @param {objectFilterCallback} cb - The callback in order to run the `Object.map` function
 * @returns - The object with its keys altered by the cb param
 */
import {Falsy} from '../shared'
import {ObjectIterableCallback} from './shared'

export function objectFilter<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Record<string, any>,
  CB extends ObjectIterableCallback<
    T,
    keyof T,
    boolean
  > = ObjectIterableCallback<T, keyof T, boolean>,
>(
  object: T,
  cb: CB,
): {
  // If we KNOW for a fact (as false) that a return type is falsy, we know
  // that key isn't present. Otherwise, if function is just generally returning
  // a boolean of unknown truthyness, we tread carefully and assume it can also be undefined
  [key in keyof T]: ReturnType<CB> extends boolean
    ? T[key] | undefined
    : ReturnType<CB> extends Falsy
    ? never
    : T[key]
} {
  return Object.keys(object).reduce((prev, key) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const toKeep = cb(object[key], key as never, object)
    if (toKeep) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      ;(prev as Record<string, never>)[key] = object[key] as never
    }
    return prev
  }, {}) as never
}
