const assert = require('node:assert')
const test = require('node:test')
const { querySubArraySum } = require('./query_subarray_sum')

test(`1.`, t => {
  const nums = [1, 6, 3, 2, 7, 2]
  const queries = [
    [0, 3],
    [2, 5],
    [2, 4],
  ]
  const limit = 13

  const result = querySubArraySum(nums, queries, limit)
  const output = [true, false, true]
  assert.deepEqual(result, output)
})
