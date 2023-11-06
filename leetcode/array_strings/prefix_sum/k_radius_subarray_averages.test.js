const assert = require('node:assert')
const test = require('node:test')
const { getAverages } = require('./k_radius_subarray_averages')

test(`1.`, t => {
  const nums = [7, 4, 3, 9, 1, 8, 5, 2, 6]
  const k = 3
  const result = getAverages(nums, k)
  const output = [-1, -1, -1, 5, 4, 4, -1, -1, -1]

  // 0, 1, 2 before K is -1
  // index 3 radius 3  37 /7 = 5
  // index 4, radius 3
  // index 5, radius 3
  // 6, 7, 8 after K is -1

  assert.deepEqual(result, output)
})

test(`2.`, t => {
  const nums = [100000]
  const k = 0
  const result = getAverages(nums, k)
  const output = [100000]
  assert.deepEqual(result, output)
})

test(`3.`, t => {
  const nums = [8]
  const k = 10000
  const result = getAverages(nums, k)
  const output = [-1]
  assert.deepEqual(result, output)
})
