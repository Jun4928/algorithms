const assert = require('node:assert')
const test = require('node:test')
const { permute } = require('./permute')

test('', t => {
  const input = [1, 2, 3]
  const output = [
    [1, 2, 3],
    [1, 3, 2],
    [2, 1, 3],
    [2, 3, 1],
    [3, 1, 2],
    [3, 2, 1],
  ]
  const result = permute(input)
  assert.deepEqual(result, output)
})

test('', t => {
  const input = [0, 1]
  const output = [
    [0, 1],
    [1, 0],
  ]
  const result = permute(input)
  assert.deepEqual(result, output)
})

test('', t => {
  const input = [1]
  const output = [[1]]
  const result = permute(input)
  assert.deepEqual(result, output)
})
