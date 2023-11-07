const assert = require('node:assert')
const test = require('node:test')
const { twoSum } = require('./two_sum')

test(`1.`, t => {
  const nums = [2, 7, 11, 15]
  const target = 9
  const output = [0, 1]

  const result = twoSum(nums, target)
  assert.deepEqual(result, output)
})

test(`2.`, t => {
  const nums = [3, 2, 4]
  const target = 6
  const output = [1, 2]

  const result = twoSum(nums, target)
  assert.deepEqual(result, output)
})

test(`3.`, t => {
  const nums = [3, 3]
  const target = 6
  const output = [0, 1]

  const result = twoSum(nums, target)
  assert.deepEqual(result, output)
})
