const assert = require('node:assert')
const test = require('node:test')
const { sortedSquares } = require('./squares_of_a_sorted_array')

test(`1.`, t => {
  const input = [-4, -1, 0, 3, 10]
  const output = [0, 1, 9, 16, 100]

  const result = sortedSquares(input)
  assert.deepEqual(result, output)
})

test(`2.`, t => {
  const input = [-7, -3, 2, 3, 11]
  const output = [4, 9, 9, 49, 121]

  const result = sortedSquares(input)
  assert.deepEqual(result, output)
})

test(`3.`, t => {
  const input = [-7, -3, 2, 10]
  const output = [4, 9, 49, 100]

  const result = sortedSquares(input)
  assert.deepEqual(result, output)
})

test(`4.`, t => {
  const input = [-5, -3, -2, -1]
  const output = [1, 4, 9, 25]

  const result = sortedSquares(input)
  assert.deepEqual(result, output)
})
