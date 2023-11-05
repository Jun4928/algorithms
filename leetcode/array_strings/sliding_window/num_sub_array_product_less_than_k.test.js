const assert = require('node:assert')
const test = require('node:test')
const {
  numSubarrayProductLessThanK,
} = require('./num_sub_array_product_less_than_k')

test(`1.`, t => {
  const input = [10, 5, 2, 6]
  const k = 100
  const output = 8

  // left = 0, right = 0 => [10] count: 1
  // left = 0, right = 1 => [10, 5], [5] count: 2
  // left = 1, right = 2 => [5, 2], [2], count: 2
  // left = 1, right = 3 => [5, 2, 6], [2, 6], [6], count: 3
  const result = numSubarrayProductLessThanK(input, k)
  assert.equal(result, output)
})

test(`1.`, t => {
  const input = [1, 2, 3]
  const k = 0
  const output = 0

  const result = numSubarrayProductLessThanK(input, k)
  assert.equal(result, output)
})
