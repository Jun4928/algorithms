const assert = require('node:assert')
const test = require('node:test')
const { largestAltitude } = require('./largest_altitude')

test(`1.`, t => {
  const gain = [-5, 1, 5, 0, -7]
  const result = largestAltitude(gain)
  const output = 1
  assert.deepEqual(result, output)
})

test(`2.`, t => {
  const gain = [-4, -3, -2, -1, 4, 3, 2]
  const result = largestAltitude(gain)
  const output = 0
  assert.deepEqual(result, output)
})
