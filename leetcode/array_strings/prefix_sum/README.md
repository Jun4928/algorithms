# Prefix Sum

- is for arrays of numbers
- **prefix[i]** is the sum of all elements up to index i (inclusive)
- `nums = [5, 2, 1, 6, 3, 8]`, `prefix = [5, 7, 8, 14, 17, 25]`
- allows to find the sum of any subarray in O(1).
- the subarray from i to j (inclusive) => `prefix[j] - prefix[i] + nums[i]`
- `prefix[i - 1]` is the sum of all elements before index i
- `prefix[j] - prefix[i- 1]`, left with the sum of all elements starting at index i and ending at index j

> Building a prefix sum is a from of pre-processing. It only costs O(n) to build, and subarray queries to be O(1), it can improve main parts of the algorithm.

## Example1

- A query is true if the sum of the subarray from x to y is less than limit
- `queries[i] = [x, y]`
- `nums = [1, 6, 3, 2, 7, 2]`
- `queries = [[0, 3], [2, 5], [2, 4]]` and limit = 13,
- the answer is `[true, false, false]`

```js
/**
 *
 * @param {number[]} nums
 * @param {number[][]} queries
 * @param {number} limit
 *
 * @return {boolean[]}
 */
function querySubArraySum(nums, queries, limit) {
  const prefixSum = nums.reduce((acc, curr, idx) => {
    acc.push((acc[idx - 1] ?? 0) + curr)
    return acc
  }, [])

  return queries.map(query => {
    const [i, j] = query
    const subSum = prefixSum[j] - prefixSum[i] + nums[i]

    if (subSum < limit) {
      return true
    }

    return false
  })
}
```

- Time: O(n + m) => O(n)
- without it: each query takes O(n), m = queries.length => O(n \* m)

## Example2

## Example3
