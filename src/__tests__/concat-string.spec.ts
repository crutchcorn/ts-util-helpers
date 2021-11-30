import {concatStr} from '../concat-string'

test('strings should concat', () => {
  expect(concatStr('a', 'b', 'c')).toBe('abc')
})
