import {AnyArray, Falsy} from '../shared'

type DeepReplaceKeysPartialObj<Obj extends object> = {
  // If this is an array, we want to flatten it to an object for QGL-like queries
  [key in keyof Obj]: Obj[key] extends AnyArray<infer Q>
    ? DeepReplaceKeys<Q> | true | false
    : // We need to handle `undefined` for optional objects
    Exclude<Obj[key], undefined> extends object
    ? DeepReplaceKeys<Obj[key]> | true | false
    : true | false
}

export type DeepReplaceKeys<Obj> = Obj extends object
  ? DeepReplaceKeysPartialObj<Obj>
  : Obj

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

type PickDeepObj<
  Obj extends object,
  ObjQuery extends DeepPartial<DeepReplaceKeys<Obj>>,
> = {
  // A key must be in the query object to be added to final object
  [key in keyof ObjQuery]: key extends keyof Obj
    // If the query wants, query gets - regardless of type
    ? ObjQuery[key] extends true
      ? Obj[key]
      : // If in array, we need to unwrap the objects within for the "ToPick" object,
      // but not unwrap the "ToPick" query object
      Obj[key] extends AnyArray<infer Q>
      ? Array<PickDeep<Q, ObjQuery[key]>>
      : // If it's an object, pick it
      Exclude<Obj[key], undefined> extends object
      ? // Check if the object is optional. If it is, we need to unwrap the undefined object
        // and then rewrap it (to keep the `undefined` types
        Obj[key] extends Exclude<Obj[key], undefined>
        ? PickDeep<Obj[key], ObjQuery[key]>
        : PickDeep<Exclude<Obj[key], undefined>, ObjQuery[key]> | undefined
      : // This trick only really works on `const` objects where falsyness can be eval'd at runtime
      ObjQuery[key] extends Falsy
      ? never
      : Obj[key]
    : never
}

export type PickDeep<Obj, T> = Obj extends object ? PickDeepObj<Obj, T> : Obj

export function pickDeep<
  Obj extends object,
  ObjQuery extends DeepPartial<DeepReplaceKeys<Obj>> = DeepPartial<
    DeepReplaceKeys<Obj>
  >,
>(objToPick: Obj, pickObjDeclare: ObjQuery): PickDeepObj<Obj, ObjQuery> {
  // It may be a primitive
  if (typeof objToPick !== 'object') return objToPick
  const returnObject: PickDeepObj<Obj, ObjQuery> = {} as never
  for (const key in pickObjDeclare) {
    if (key in objToPick) {
      const oKey = key as never
      const toPickKeyVal = pickObjDeclare[key] as never
      if (toPickKeyVal === true) {
        returnObject[key] = objToPick[oKey]
        continue
      }
      if (toPickKeyVal === false) {
        continue
      }
      if (Array.isArray(objToPick[oKey])) {
        returnObject[key] = (objToPick[oKey] as object[]).map(
          (item: object) => {
            return pickDeep(item, pickObjDeclare[key] as never)
          },
        ) as never
      } else if (typeof objToPick[oKey] === 'object') {
        returnObject[key] = pickDeep(objToPick[oKey], toPickKeyVal)
      }
    }
  }
  return returnObject
}
