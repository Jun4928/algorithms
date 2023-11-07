/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const previous = new Map()

  for (let idx = 0; idx < nums.length; idx++) {
    const num = nums[idx]
    const exists = previous.get(target - num)
    if (exists != null) {
      return [exists, idx]
    } else {
      previous.set(num, idx)
    }
  }

  throw TypeError('MUST BE EXIST')
}

module.exports = { twoSum }
