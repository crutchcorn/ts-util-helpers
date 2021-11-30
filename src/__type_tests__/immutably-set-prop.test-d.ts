import {expectType} from 'tsd'
import {objectImmutablySetProp} from '../objects/immutably-set-prop'

test('expect exact prop mapping to occur', () => {
  const originalObj = {
    a: 1,
    b: 2,
    c: 3,
  } as const
  const mappedObj = objectImmutablySetProp(originalObj, 'a', 2 as const)
  expectType<2>(mappedObj.a)
  expectType<2>(mappedObj.b)
  expectType<3>(mappedObj.c)
})

export {}
