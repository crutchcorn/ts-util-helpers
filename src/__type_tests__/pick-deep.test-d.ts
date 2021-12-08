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

test('should handle truthy object keys', () => {
  const undefineableResults = pickDeep(
    {
      test: {
        hello: 1,
        notIgnored: 2,
      },
    } as const,
    {
      test: true,
    } as const,
  )

  expectType<1>(undefineableResults.test.hello)
  expectType<2>(undefineableResults.test.notIgnored)
})

test('should handle falsy object keys', () => {
  const undefineableResults = pickDeep(
    {
      test: {
        hello: 1,
        notIgnored: 2,
      },
    } as const,
    {
      test: false,
    } as const,
  )

  expectError(undefineableResults.test.hello)
  expectError(undefineableResults.test.notIgnored)
})

test('should handle loosely defined objects', () => {
  const undefineableResults = pickDeep(
    {
      test: {
        hello: 1,
        notIgnored: 2,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as Record<string, any>,
    {
      test: true,
    },
  )
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access
  expectType<any>(undefineableResults.test.hello)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access
  expectType<any>(undefineableResults.test.notIgnored)
})

export {}
