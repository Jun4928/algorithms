/**
https://leetcode.com/problems/longest-subsequence-with-limited-sum/description/
2389. Longest Subsequence With Limited Sum

sort + slidingWindow * M
O(N * logN) + O(N * M)
Time: O(N * M + N * logN)
Space: O(N) for TimSort (merge and insertion)
 * @param {number[]} nums
 * @param {number[]} queries
 * @return {number[]}
 */
var answerQueries = function (nums, queries) {
  nums.sort((a, b) => (a < b ? -1 : 1))

  const slidingWindow = query => {
    let left = 0
    let curr = 0
    let ans = 0
    for (let right = 0; right < nums.length; right++) {
      curr += nums[right]
      while (curr > query) {
        curr -= nums[left]
        left++
      }
      ans = Math.max(ans, right - left + 1)
    }

    return ans
  }

  let answer = []
  for (const query of queries) {
    answer.push(slidingWindow(query))
  }

  return answer
}

/**
https://leetcode.com/problems/longest-subsequence-with-limited-sum/description/
2389. Longest Subsequence With Limited Sum

sort + prefixSum + binarySearch * M(queries)
O(N*logN) O(N) O(M * logN)
Time: O((M +N) * logN)
Space: O(N) for TimSort (merge and insertion)
 * @param {number[]} nums
 * @param {number[]} queries
 * @return {number[]}
 */
var answerQueries = function (nums, queries) {
  nums.sort((a, b) => (a < b ? -1 : 1))
  let acc = 0
  const prefixSum = nums.map(n => (acc += n))
  const binarySearch = query => {
    let left = 0
    let right = prefixSum.length - 1

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      if (prefixSum[mid] === query) {
        return mid + 1
      }

      if (prefixSum[mid] > query) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    }

    return left
  }

  let answer = []
  for (const query of queries) {
    answer.push(binarySearch(query))
  }

  return answer
}
