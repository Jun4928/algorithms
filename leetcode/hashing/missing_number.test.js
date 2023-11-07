const assert = require('node:assert')
const test = require('node:test')
const { missingNumber } = require('./missing_number')

test(`1.`, t => {
  const nums = [3, 0, 1]
  const output = 2

  const result = missingNumber(nums)
  assert.deepEqual(result, output)
})

test(`2.`, t => {
  const nums = [0, 1]
  const output = 2

  const result = missingNumber(nums)
  assert.deepEqual(result, output)
})

test(`3.`, t => {
  const nums = [9, 6, 4, 2, 3, 5, 7, 0, 1]
  const output = 8

  const result = missingNumber(nums)
  assert.deepEqual(result, output)
})
