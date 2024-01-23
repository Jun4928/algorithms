/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
  let dpCosts = [cost[0], cost[1]]

  let stair = 2
  while (stair < cost.length) {
    const min = Math.min(dpCosts[stair - 1], dpCosts[stair - 2])
    dpCosts.push(cost[stair] + min)
    stair += 1
  }

  return Math.min(dpCosts[stair - 1], dpCosts[stair - 2])
}

console.log(minCostClimbingStairs([10, 15, 20]))
console.log(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]))

// Dynamic Programming
// 아래와 같은 점화식으로 계단 오르기의 최소비용을 구할 수 있다.
// 모든 층에 대해서 그 층에 오르기 까지의 최소 비용을 구한다.
// finalCost = f[i] = cost[i] + min(f[i-1], f[i-2])

/**
https://leetcode.com/problems/min-cost-climbing-stairs/
746. Min Cost Climbing Stairs
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
  let memo = Array(cost.length).fill(-1)
  const DP = curr => {
    if (curr >= cost.length) {
      return 0
    }

    if (memo[curr] > -1) {
      return memo[curr]
    }

    memo[curr] = Math.min(DP(curr + 1) + cost[curr], DP(curr + 2) + cost[curr])
    return memo[curr]
  }

  return Math.min(DP(0), DP(1))
}

/**
https://leetcode.com/problems/min-cost-climbing-stairs/
746. Min Cost Climbing Stairs
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
  let memo = Array(cost.length).fill(-1)
  memo[0] = cost[0]
  memo[1] = cost[1]
  for (let curr = 2; curr < memo.length; curr++) {
    memo[curr] = Math.min(
      memo[curr - 2] + cost[curr],
      memo[curr - 1] + cost[curr]
    )
  }

  return Math.min(memo.at(-1), memo.at(-2))
}
