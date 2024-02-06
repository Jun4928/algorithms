/**
 * https://leetcode.com/problems/move-zeroes/description/
 * 283. Move Zeroes
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

const swap = (left, right, nums) => {
  const tmp = nums[right]
  nums[right] = nums[left]
  nums[left] = tmp
}

var moveZeroes = function (nums) {
  let nonZero = 0 // non-zero
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      swap(i, nonZero, nums)
      nonZero++ // 바꿀때마다 한칸씩 증가
    }
  }
}
