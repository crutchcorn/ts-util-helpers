import {objectImmutablySetProp} from '../objects/immutably-set-prop'

test('expect object to be changed', () => {
  const originalObj = {
    a: 1,
    b: 2,
    c: 3,
  } as const
  const mappedObj = objectImmutablySetProp(originalObj, 'a', 2)
  expect(mappedObj.a).toBe(2)
  expect(mappedObj.b).toBe(2)
  expect(mappedObj.c).toBe(3)
})

test('expect object change to not mutate', () => {
  const originalObj = {
    a: 1,
    b: 2,
    c: 3,
  } as const
  const mappedObj = objectImmutablySetProp(originalObj, 'a', 2)
  expect(mappedObj).not.toEqual(originalObj)
})
