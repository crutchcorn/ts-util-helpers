import {expectType, expectError} from 'tsd'
import {OnlyNonOptional, OnlyOptional} from '../helper-types'

interface ObjectToTest {
  optional?: 0
  requirement: 1
}

test('OnlyNonOptional should throw with optional passed', () => {
  expectError(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onlyRequired: OnlyNonOptional<ObjectToTest> = {
      requirement: 1,
      // @ts-expect-error 'OnlyNonOptional should throw with optional passed'
      optional: 0,
    }
  })
})

test('OnlyNonOptional should not throw with required passed', () => {
  const onlyRequired: OnlyNonOptional<ObjectToTest> = {
    requirement: 1,
  }

  expectType<{requirement: 1}>(onlyRequired)
})

test('OnlyOptional should throw with optional passed', () => {
  expectError(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onlyOptional: OnlyOptional<ObjectToTest> = {
      // @ts-expect-error 'OnlyOptional should throw with optional passed'
      requirement: 1,
      optional: 0,
    }
  })
})

test('OnlyOptional should not throw with optional passed', () => {
  const onlyOptional: OnlyOptional<ObjectToTest> = {
    optional: 0,
  }

  expectType<{optional?: 0}>(onlyOptional)
})

export {}
