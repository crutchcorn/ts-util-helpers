import {objectMap} from '../objects'

test('expect basic prop mapping to occur', () => {
  const mappedObj = objectMap(
    {
      a: 1,
      b: 2,
      c: 3,
    } as const,
    val => val + 10,
  )
  expect(mappedObj.a).toBe(11)
  expect(mappedObj.b).toBe(12)
  expect(mappedObj.c).toBe(13)
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
  expect(mappedObj.a).toBe('a')
  expect(mappedObj.b).toBe('b')
  expect(mappedObj.c).toBe('c')
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
  expect(mappedObj.a).toBe(3)
  expect(mappedObj.b).toBe(3)
  expect(mappedObj.c).toBe(3)
})
