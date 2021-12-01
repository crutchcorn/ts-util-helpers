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
  expectError(obj.b)
  expectError(obj.c)
})

export {}
