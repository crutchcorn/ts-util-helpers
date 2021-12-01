import {pickDeep} from '../objects/pick-deep'

// 🙄
type Whatever = {
  [key: string]: Whatever
}

const pickedObject = pickDeep(
  {
    test: {
      other: 900,
      ignored: 9,
      explicitNo: 77,
      arr: [
        {
          other: 3000,
          ignored: 999,
        },
      ],
    },
    one: 1,
  } as const,
  {
    test: {
      other: true,
      arr: {
        other: true,
      },
      explicitNo: false,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as const,
) as never as Whatever

test('expected basic properties should exist', () => {
  expect(pickedObject.test.other).toBe(900)
})

test('explicitly not selected items should not exist', () => {
  expect(pickedObject.test.explicitNo).toBeFalsy()
})

test('arrays should not be unwrapped', () => {
  expect(pickedObject.test.arr[0].other).toBe(3000)
  expect(pickedObject.test.arr.other).toBeFalsy()
})

test('arrays should not have incorrect items present', () => {
  expect(pickedObject.test.arr[0].ignored).toBeFalsy()
})

test('should be able to handle undefined objects gracefully', () => {
  const undefineableResults = pickDeep<{
    test?: {
      hello: 1
      ignored: 2
    }
  }>({} as never, {
    test: {
      hello: true,
    },
  })

  expect(undefineableResults.test?.hello).toBeFalsy()
})
