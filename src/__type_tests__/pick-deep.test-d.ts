import {expectType, expectError} from 'tsd'
import {pickDeep} from '../objects/pick-deep'

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
  } as const,
)

test('expected properties should exist', () => {
  expectType<900>(pickedObject.test.other)
})

test('explicitly not selected items should be "never"', () => {
  expectType<never>(pickedObject.test.explicitNo)
})

test('arrays should not be unwrapped', () => {
  expectType<3000>(pickedObject.test.arr[0].other)
  // @ts-expect-error "Other should not be found on unwrapped item"
  expectError(pickedObject.test.arr.other)
})

test('arrays should not have incorrect items present', () => {
  // @ts-expect-error "Ignored should not be present"
  expectError(pickedObject.test.arr[0].ignored)
})

test('should handle undefineable objects', () => {
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

  // @ts-expect-error "We're not chaining here"
  expectError(undefineableResults.test.hello)
  expectType<1 | undefined>(undefineableResults.test?.hello)
})
export {}
