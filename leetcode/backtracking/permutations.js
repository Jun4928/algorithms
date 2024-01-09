/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = nums => {
  if (nums.length <= 1) {
    return [nums]
  }

  return nums.flatMap((num, idx) => {
    const rest = toSpliced(nums, idx)
    const permutations = permute(rest)
    return permutations.map(p => [num, ...p])
  })
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

/**
https://leetcode.com/problems/permutations/description/
46. Permutations
 * @param {number[]} nums
 * @return {number[][]}
 */
const permuteBacktrack = nums => {
  let curr = []
  let answer = []

  const backtrack = (curr, rest) => {
    if (curr.length === nums.length) {
      answer.push(curr)
      return
    }

    for (const num of rest) {
      const before = [...curr]
      curr.push(num)
      backtrack(
        curr,
        rest.filter(v => v !== num)
      )
      curr = before
    }
  }

  backtrack(curr, nums)
  return answer
}

/**
https://leetcode.com/problems/permutations/description/
46. Permutations
 * @param {number[]} nums
 * @return {number[][]}
 */
const permuteBacktrack2 = nums => {
  let answer = []

  const backtrack = curr => {
    if (curr.length === nums.length) {
      answer.push([...curr])
      return
    }

    for (const num of nums) {
      if (!curr.includes(num)) {
        curr.push(num)
        backtrack(curr)
        curr.pop() // go back to the parent node
      }
    }
  }

  backtrack([])
  return answer
}
