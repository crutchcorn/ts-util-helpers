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

  expect(obj.a).toBe(1)
  // @ts-expect-error "Property not picked"
  expect(obj.b).toBe(undefined)
  // @ts-expect-error "Property not picked"
  expect(obj.c).toBe(undefined)
})
