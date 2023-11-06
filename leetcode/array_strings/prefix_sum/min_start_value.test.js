const assert = require('node:assert')
const test = require('node:test')
const { minStartValue } = require('./min_start_value')

test(`1.`, t => {
  const nums = [-3, 2, -3, 4, 2]
  const result = minStartValue(nums)

  // if it is 4, 4 -3 = 1 is less than 1
  // prefix sum: [-3, 1, -4, 0, 2]

  const output = 5
  assert.deepEqual(result, output)
})

test(`2.`, t => {
  const nums = [1, 2]
  const result = minStartValue(nums)
  const output = 1
  assert.deepEqual(result, output)
})

test(`3.`, t => {
  const nums = [1, -2, -3]
  const result = minStartValue(nums)
  const output = 5
  assert.deepEqual(result, output)
})

test(`4.`, t => {
  const nums = [2, 3, 5, -5, -1]
  const result = minStartValue(nums)
  const output = 1
  assert.deepEqual(result, output)
})

test(`5.`, t => {
  const nums = [-1, -2, -3]
  const result = minStartValue(nums)
  const output = 7
  assert.deepEqual(result, output)
})

test(`6.`, t => {
  const nums = [1, -4, 3]
  const result = minStartValue(nums)
  // prefix-sum: [1, -3, 0]
  const output = 4
  assert.deepEqual(result, output)
})

test(`7.`, t => {
  const nums = [4, -5, 2]
  const result = minStartValue(nums)
  // prefix-sum: [4, -1, 1]
  const output = 2
  assert.deepEqual(result, output)
})
