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
  expectError(pickedObject.test.arr.other)
})

test('arrays should not have incorrect items present', () => {
  expectError(pickedObject.test.arr[0].ignored)
})

type OptionalObj = {
  test?: {
    hello: 1
    ignored: 2
  }
}

test('should handle undefineable objects', () => {
  const undefineableResults = pickDeep(
    {
      test: undefined,
    } as const as OptionalObj,
    {
      test: {
        hello: true,
      },
    } as const,
  )

  expectType<1 | undefined>(undefineableResults.test?.hello)
  expectError(undefineableResults.test?.ignored)
})
export {}
