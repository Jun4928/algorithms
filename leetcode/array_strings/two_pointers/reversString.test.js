const assert = require('node:assert')
const test = require('node:test')
const { reverseString } = require('./reverseString')

test(`1.`, t => {
  const input = ['h', 'e', 'l', 'l', 'o']
  const output = ['o', 'l', 'l', 'e', 'h']

  reverseString(input)
  assert.deepEqual(input, output)
})

test(`2.`, t => {
  const input = ['H', 'a', 'n', 'n', 'a', 'h']
  const output = ['h', 'a', 'n', 'n', 'a', 'H']
  reverseString(input)
  assert.deepEqual(input, output)
})
