const assert = require('node:assert')
const test = require('node:test')
const { waysToSplitArray } = require('./ways_to_split_array')

test(`1.`, t => {
  const nums = [10, 4, -8, 7]
  // [10], [4, -8, 7] 10 >= 3
  // [10, 4], [-8, 7] 14 >= -1

  const result = waysToSplitArray(nums)
  const output = 2
  assert.equal(result, output)
})

test(`2.`, t => {
  const nums = [2, 3, 1, 0]
  // [2, 3], [1, 0] 5 >= 1
  // [2, 3, 1], [0] 6 >= 0

  const result = waysToSplitArray(nums)
  const output = 2
  assert.equal(result, output)
})
