/**
https://leetcode.com/problems/find-pivot-index/description/
724. Find Pivot Index

using prefix sum
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function (nums) {
  let acc = 0
  const leftSum = nums.reduce((arr, v) => {
    acc += v
    arr.push(acc)
    return arr
  }, [])
  let accRight = 0
  const rightSum = nums
    .reduceRight((arr, v) => {
      accRight += v
      arr.push(accRight)
      return arr
    }, [])
    .reverse()

  for (let pivot = 0; pivot < nums.length; pivot++) {
    if (pivot === 0 && rightSum[pivot + 1] === 0) {
      return pivot
    } else if (pivot === nums.length - 1 && leftSum[pivot - 1] === 0) {
      return pivot
    } else if (leftSum[pivot - 1] === rightSum[pivot + 1]) {
      return pivot
    }
  }

  return -1
}

/**
https://leetcode.com/problems/find-pivot-index/description/
724. Find Pivot Index

using total sum

 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function (nums) {
  const totalSum = nums.reduce((a, b) => a + b, 0)
  let leftSum = 0

  for (let pivot = 0; pivot < nums.length; pivot++) {
    const rightSum = totalSum - leftSum - nums[pivot]
    if (leftSum === rightSum) {
      return pivot
    }

    leftSum += nums[pivot]
  }

  return -1
}
