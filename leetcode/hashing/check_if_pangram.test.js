const assert = require('node:assert')
const test = require('node:test')
const { checkIfPangram } = require('./check_if_pangram')

test(`1.`, t => {
  const sentence = 'thequickbrownfoxjumpsoverthelazydog'
  const output = true

  const result = checkIfPangram(sentence)
  assert.deepEqual(result, output)
})

test(`2.`, t => {
  const sentence = 'leetcode'
  const output = false

  const result = checkIfPangram(sentence)
  assert.deepEqual(result, output)
})
