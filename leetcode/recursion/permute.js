/**
 * url: https://leetcode.com/problems/permutations/description/
 * #46 Permutations
 *
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = nums => {
  if (nums.length <= 1) {
    return [nums]
  }

  return nums
    .map((num, idx) => {
      const rest = toSpliced(nums, idx)
      const permutations = permute(rest)
      return permutations.map(p => [num, ...p])
    })
    .flat()
}

/**
 *
 * @param {number[]} nums
 * @param {number} index
 * @returns {number[][]}
 */
const toSpliced = (nums, index) => {
  return nums.filter((_, idx) => idx !== index)
}

// permute([1,2,3])
// permute([1])..permute([2,3])
// [[1]]
// [[2,3]], [[3, 2]]
// [  [ [1, 2, 3], [[1, 3, 2] ], [ [2, 1, 3], [2, 3, 1] ], [ [3, 1, 2], [3, 2, 1] ]  ]
// permute([2])..permute([1,3])
// permute([3])..permute([1,2])

module.exports = { permute }
