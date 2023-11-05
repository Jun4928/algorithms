const assert = require('node:assert')
const test = require('node:test')
const { flipZero } = require('./flip_zero')

test(`1.`, t => {
  const input = '1101100111'
  const output = 5

  const result = flipZero(input)
  assert.equal(result, output)
})
