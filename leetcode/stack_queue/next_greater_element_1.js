/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 *
 * https://leetcode.com/problems/next-greater-element-i/description/
 * 496. Next Greater Element I
 */
var nextGreaterElementMine = function (nums1, nums2) {
  const answer = new Array(nums1.length).fill(-1)
  const matcher = new Map(nums1.map((val, idx) => [val, idx]))
  const deque = []

  for (let right = nums2.length - 1; right >= 0; right--) {
    const curr = nums2[right]
    while (deque.length && deque[deque.length - 1] < curr) {
      deque.pop()
    }
    deque.push(curr)

    if (matcher.has(curr) && deque.length >= 2) {
      answer[matcher.get(nums2[right])] = deque[deque.length - 2]
    }
  }

  return answer
}

// it's the same as the above, but more intuitive
var nextGreaterElement = function (nums1, nums2) {
  const matcher = new Map()
  const decreasing = []

  for (const num of nums2) {
    // maintain decreasing order
    while (decreasing.length && decreasing.at(-1) < num) {
      // if the last one is less than num, it is matched with num
      // because the next greater element is num
      matcher.set(decreasing.pop(), num)
    }
    decreasing.push(num)
  }

  return nums1.map(val => matcher.get(val) ?? -1)
}

console.log(nextGreaterElement([4, 1, 2], [1, 3, 4, 2])) // [-1, 3, -1]
console.log(nextGreaterElement([2, 4], [1, 2, 3, 4])) // [3, -1]
console.log(nextGreaterElement([4, 1, 2], [1, 3, 4, 2, 7])) // [-1, 3, -1]
