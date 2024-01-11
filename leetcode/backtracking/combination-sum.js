/**
https://leetcode.com/problems/combination-sum/description/
39. Combination Sum
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  const answer = []
  const seen = new Set()
  const getKey = p => p.join(`-`)

  const backtrack = (sum, path) => {
    if (sum > target) {
      return
    } else if (sum === target) {
      const p = [...path].sort()
      const key = getKey(p)
      if (!seen.has(key)) {
        answer.push(p)
        seen.add(key)
      }
      return
    }

    for (const num of candidates) {
      path.push(num)
      backtrack(sum + num, path)
      path.pop()
    }
  }

  backtrack(0, [])
  return answer
}

/**
https://leetcode.com/problems/combination-sum/description/
39. Combination Sum
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 * 
 * better answer! without using Hash to check it has been visited
 */
var combinationSum = function (candidates, target) {
  const answer = []
  const backtrack = (sum, path, start) => {
    if (sum === target) {
      answer.push([...path])
      return
    }

    for (let idx = start; idx < candidates.length; idx++) {
      const num = candidates[idx]
      path.push(num)
      if (sum + num <= target) {
        backtrack(sum + num, path, idx) // start from this index
      }
      path.pop()
    }
  }

  backtrack(0, [], 0)
  return answer
}
