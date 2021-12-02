import {AnyArray, Falsy} from '../shared'

type DeepReplaceKeysPartialObj<Obj extends object, T> = {
  // If this is an array, we want to flatten it to an object for QGL-like queries
  [key in keyof Obj]: Obj[key] extends AnyArray<infer Q>
    ? DeepReplaceKeys<Q, T>
    : // We need to handle `undefined` for optional objects
    Exclude<Obj[key], undefined> extends object
    ? DeepReplaceKeys<Obj[key], T>
    : T
}

export type DeepReplaceKeys<Obj, T> = Obj extends object
  ? DeepReplaceKeysPartialObj<Obj, T>
  : Obj

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

type PickDeepObj<
  ReplaceType,
  ToPick extends object,
  PickObj extends DeepPartial<DeepReplaceKeys<ToPick, ReplaceType>>,
> = {
  // A key must be in the query object to be added to final object
  [key in keyof PickObj]: key extends keyof ToPick
    ? // If in array, we need to unwrap the objects within for the "PickObj" object,
      // but not unwrap the "ToPick" query object
      ToPick[key] extends AnyArray<infer Q>
      ? Array<PickDeep<ReplaceType, Q, PickObj[key]>>
      : // If it's an object, pick it
      ToPick[key] extends object
      ? PickDeep<ReplaceType, ToPick[key], PickObj[key]>
      : // This trick only really works on `const` objects where falsyness can be eval'd at runtime
      PickObj[key] extends Falsy
      ? never
      : ToPick[key]
    : never
}

export type PickDeep<ReplaceType, Obj, T> = Obj extends object
  ? PickDeepObj<ReplaceType, Obj, T>
  : Obj

export function pickDeep<
  Obj extends object,
  ObjDec extends DeepPartial<DeepReplaceKeys<Obj, true | false>> = DeepPartial<
    DeepReplaceKeys<Obj, true | false>
  >,
>(
  objToPick: Obj,
  pickObjDeclare: ObjDec,
): PickDeepObj<true | false, Obj, ObjDec> {
  // It may be a primitive
  if (typeof objToPick !== 'object') return objToPick
  const returnObject: PickDeepObj<true | false, Obj, ObjDec> = {} as never
  for (const key in pickObjDeclare) {
    if (key in objToPick) {
      const oKey = key as never
      if (Array.isArray(objToPick[oKey])) {
        returnObject[key] = (objToPick[oKey] as object[]).map(
          (item: object) => {
            return pickDeep(item, pickObjDeclare[key] as never)
          },
        ) as never
      } else if (typeof objToPick[oKey] === 'object') {
        returnObject[key] = pickDeep(
          objToPick[oKey],
          pickObjDeclare[key] as never,
        )
      } else if (pickObjDeclare[key]) returnObject[key] = objToPick[oKey]
    }
  }
  return returnObject
}
