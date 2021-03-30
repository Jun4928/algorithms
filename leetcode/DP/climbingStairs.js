/**
 * @param {number} n
 * @return {number}
 */
// Time: O(n), Space: O(n) => dp array
var climbStairsDP = function (n) {
  // Staris(1) = 1
  // Stairs(2) = 2
  const stairsDP = [0, 1, 2]
  if (stairsDP[n]) return stairsDP[n]

  let stair = 3
  while (stair <= n) {
    const current = stairsDP[stair - 1] + stairsDP[stair - 2]
    stairsDP.push(current)
    stair += 1
  }

  return stairsDP[n]
}

console.log(climbStairsDP(3))
console.log(climbStairsDP(4))
console.log(climbStairsDP(100))

// Time: O(n), Space: O(1)
var climbStairsFib = function (n) {
  if (n === 1) return 1
  let first = 1
  let second = 2

  let stair = 3
  while (stair <= n) {
    let thrid = first + second
    first = second
    second = thrid
    stair += 1
  }

  return second
}

console.log(climbStairsFib(3))
console.log(climbStairsFib(4))
console.log(climbStairsFib(100))
