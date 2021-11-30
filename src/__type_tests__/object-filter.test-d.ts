import {expectType} from 'tsd'
import {objectFilter} from '../objects/object-filter'

test('expect basic prop mapping to occur', () => {
  const filteredObj = objectFilter(
    {
      a: 1,
      b: 2,
      c: 3,
    } as const,
    val => val > 2,
  )
  expectType<number | undefined>(filteredObj.a)
  expectType<number | undefined>(filteredObj.b)
  expectType<number | undefined>(filteredObj.c)
})

test('expect key to pass through', () => {
  const filteredObj = objectFilter(
    {
      a: 1,
      b: 2,
      c: 3,
    } as const,
    (_, key) => key === 'a',
  )
  expectType<number | undefined>(filteredObj.a)
  expectType<number | undefined>(filteredObj.b)
  expectType<number | undefined>(filteredObj.c)
})

test('expect full object to pass through', () => {
  const filteredObj = objectFilter(
    {
      a: 1,
      b: 2,
      c: 3,
    } as const,
    (_, __, obj) => Object.keys(obj).length === 2,
  )
  expectType<number | undefined>(filteredObj.a)
  expectType<number | undefined>(filteredObj.b)
  expectType<number | undefined>(filteredObj.c)
})

export {}
