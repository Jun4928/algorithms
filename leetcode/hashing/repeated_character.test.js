const assert = require('node:assert')
const test = require('node:test')
const { repeatedCharacter } = require('./repeated_character')

test(`1.`, t => {
  const input = 'abccbaacz'
  const output = 'c'

  const result = repeatedCharacter(input)
  assert.deepEqual(result, output)
})

test(`2.`, t => {
  const input = 'abcdd'
  const output = 'd'

  const result = repeatedCharacter(input)
  assert.deepEqual(result, output)
})
