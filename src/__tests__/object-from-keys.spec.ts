import {objectFromKeys} from '../objects/object-from-keys'

test('expect basic object init from array', () => {
  const filteredObj = objectFromKeys(
    ["Test", "Other"], null
  )
  expect(filteredObj["Test"]).toBe(null)
  expect(filteredObj["Other"]).toBe(null)
  expect(filteredObj["None"]).toBe(undefined)
})
