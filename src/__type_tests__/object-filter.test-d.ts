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
  expectType<1 | undefined>(filteredObj.a)
  expectType<2 | undefined>(filteredObj.b)
  expectType<3 | undefined>(filteredObj.c)
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
  expectType<1 | undefined>(filteredObj.a)
  expectType<2 | undefined>(filteredObj.b)
  expectType<3 | undefined>(filteredObj.c)
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
  expectType<1 | undefined>(filteredObj.a)
  expectType<2 | undefined>(filteredObj.b)
  expectType<3 | undefined>(filteredObj.c)
})

export {}
