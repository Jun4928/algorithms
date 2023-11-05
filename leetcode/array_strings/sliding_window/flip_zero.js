/**
 *
 * @param {string} s
 * @return {number} the longest substring that only contains "1"
 */
function flipZero(s) {
  let left = 0
  let curr = 0
  let result = 0

  // it's much easier to find the longest substring that contains at most one "0"
  for (let right = 0; right < s.length; right++) {
    if (s[right] === '0') {
      curr += 1
    }

    while (curr > 1) {
      if (s[left] === '0') {
        curr -= 1
      }

      left++
    }

    // store current window size
    result = Math.max(result, right - left + 1)
  }

  return result
}

module.exports = { flipZero }
