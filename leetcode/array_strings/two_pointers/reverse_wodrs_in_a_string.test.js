const assert = require('node:assert')
const test = require('node:test')
const { reverseWords } = require('./reverse_wodrs_in_a_string')

test(`1.`, t => {
  const input = "Let's take LeetCode contest"
  const output = "s'teL ekat edoCteeL tsetnoc"
  const result = reverseWords(input)
  assert.equal(result, output)
})

test(`2.`, t => {
  const input = 'God Ding'
  const output = 'doG gniD'
  const result = reverseWords(input)
  assert.equal(result, output)
})
