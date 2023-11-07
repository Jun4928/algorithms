const assert = require('node:assert')
const test = require('node:test')
const { minSubArrayLen } = require('./min_size_subarray_sum')

test(`1.`, t => {
  const target = 7
  const nums = [2, 3, 1, 2, 4, 3]
  const output = 2

  const result = minSubArrayLen(target, nums)
  assert.equal(result, output)
})

test(`2.`, t => {
  const target = 4
  const nums = [1, 4, 4]
  const output = 1

  const result = minSubArrayLen(target, nums)
  assert.equal(result, output)
})

test(`3.`, t => {
  const target = 11
  const nums = [1, 1, 1, 1, 1, 1, 1, 1]
  const output = 0

  const result = minSubArrayLen(target, nums)
  assert.equal(result, output)
})
