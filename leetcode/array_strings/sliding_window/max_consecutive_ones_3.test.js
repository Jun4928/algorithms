const assert = require('node:assert')
const test = require('node:test')
const { longestOnes } = require('./max_consecutive_ones_3')

test(`1.`, t => {
  const input = [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0]
  const k = 2
  const output = 6

  const result = longestOnes(input, k)
  assert.equal(result, output)
})

test(`2.`, t => {
  const input = [0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1]
  const k = 3
  const output = 10

  const result = longestOnes(input, k)
  assert.equal(result, output)
})
