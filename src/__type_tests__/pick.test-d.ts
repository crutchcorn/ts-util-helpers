import {expectType, expectError} from 'tsd'
import {pick} from '../objects/pick'

test('only pick a single item from object', () => {
  const obj = pick(
    {
      a: 1,
      b: 2,
      c: 3,
    } as const,
    ['a'],
  )

  expectType<1>(obj.a)
  // @ts-expect-error "Property not picked"
  expectError(obj.b)
  // @ts-expect-error "Property not picked"
  expectError(obj.c)
})

export {}
