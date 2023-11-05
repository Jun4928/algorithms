const assert = require('node:assert')
const test = require('node:test')
const { findLargestSumWithK } = require('./find_largest_sum_with_k')

test(`1.`, t => {
  const input = [3, -1, 4, 12, -8, 5, 6]
  const k = 4
  const output = 18

  const result = findLargestSumWithK(input, k)
  assert.equal(result, output)
})
