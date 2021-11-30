import {objectFilter} from '../objects/object-filter'

test('expect basic prop filter to occur', () => {
  const filteredObj = objectFilter(
    {
      a: 1,
      b: 2,
      c: 3,
    } as const,
    val => val < 2,
  )
  expect(filteredObj.a).toBe(1)
  expect(filteredObj.b).toBe(undefined)
  expect(filteredObj.c).toBe(undefined)
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
  expect(filteredObj.a).toBe(1)
  expect(filteredObj.b).toBe(undefined)
  expect(filteredObj.c).toBe(undefined)
})

test('expect full object to pass through', () => {
  const filteredObj = objectFilter(
    {
      a: 1,
      b: 2,
      c: 3,
    } as const,
    (_, __, obj) => Object.keys(obj).length === 1,
  )
  expect(filteredObj.a).toBe(undefined)
  expect(filteredObj.b).toBe(undefined)
  expect(filteredObj.c).toBe(undefined)
})
