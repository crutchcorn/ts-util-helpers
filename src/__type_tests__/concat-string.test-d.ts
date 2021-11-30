import {expectType} from 'tsd'
import {concatStr} from '../concat-string'

test('ConcatString should be strictly typed', () => {
  expectType<'Hi'>(concatStr('H', 'i'))
})

export {}
