const assert = require('node:assert')
const test = require('node:test')
const { countElements } = require('./count_elements')

test(`1.`, t => {
  const arr = [1, 2, 3]
  const output = 2

  const result = countElements(arr)
  assert.deepEqual(result, output)
})

test(`2.`, t => {
  const arr = [1, 1, 3, 3, 5, 5, 7, 7]
  const output = 0

  const result = countElements(arr)
  assert.deepEqual(result, output)
})
