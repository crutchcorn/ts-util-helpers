import {expectType} from 'tsd'
import {objectMap} from '../objects/object-map'

test('expect basic prop mapping to occur', () => {
  const mappedObj = objectMap(
    {
      a: 1,
      b: 2,
      c: 3,
    } as const,
    val => val + 10,
  )
  expectType<number>(mappedObj.a)
  expectType<number>(mappedObj.b)
  expectType<number>(mappedObj.c)
})

test('expect key to pass through', () => {
  const mappedObj = objectMap(
    {
      a: 1,
      b: 2,
      c: 3,
    } as const,
    (_, key) => key,
  )
  expectType<'a' | 'b' | 'c'>(mappedObj.a)
  expectType<'a' | 'b' | 'c'>(mappedObj.b)
  expectType<'a' | 'b' | 'c'>(mappedObj.c)
})

test('expect full object to pass through', () => {
  const mappedObj = objectMap(
    {
      a: 1,
      b: 2,
      c: 3,
    } as const,
    (_, __, obj) => Object.keys(obj).length,
  )
  expectType<number>(mappedObj.a)
  expectType<number>(mappedObj.b)
  expectType<number>(mappedObj.c)
})

export {}
