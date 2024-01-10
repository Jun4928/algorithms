/**
https://leetcode.com/problems/subsets/
78. Subsets
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const answer = []
  const seen = new Set()
  const key = arr => [...arr].sort().join(``)
  const backtrack = curr => {
    if (seen.has(key(curr))) {
      return
    }

    answer.push([...curr])
    seen.add(key(curr))
    for (const num of nums) {
      if (!curr.includes(num)) {
        curr.push(num)
        backtrack(curr)
        curr.pop()
      }
    }
  }

  backtrack([])
  return answer
}

var subsets = function (nums) {
  const answer = []
  const backtrack = (subset, prev) => {
    if (prev > nums.length) {
      return
    }

    answer.push([...subset])
    for (let curr = prev; curr < nums.length; curr++) {
      subset.push(nums[curr])
      backtrack(subset, curr + 1)
      subset.pop()
    }
  }

  backtrack([], 0)
  return answer
}
