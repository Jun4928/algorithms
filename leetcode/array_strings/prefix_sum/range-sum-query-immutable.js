/**
https://leetcode.com/problems/range-sum-query-immutable/description/
303. Range Sum Query - Immutable
 * @param {number[]} nums
 */
var NumArray = function (nums) {
  let acc = 0
  this.prefixSum = nums.reduce((arr, v) => {
    acc += v
    arr.push(acc)
    return arr
  }, [])
}

/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function (left, right) {
  return this.prefixSum[right] - (this.prefixSum[left - 1] ?? 0)
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */
