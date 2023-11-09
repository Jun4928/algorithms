/**
 * https://leetcode.com/problems/find-players-with-zero-or-one-losses/description/
 * # 2225. Find Players With Zero or One Losses
 *
 *
 * @param {number[][]} matches
 * @return {number[][]}
 * answer[0] a list of all players that have not lost any matches
 * answer[1] a list of all players that have lost exactly one match
 *
 * should be increasing order!
 * - the players that have played at lest one match
 * - no two matches will have the same outcome
 *
 */
var findWinners = function (matches) {
  const { won, lost } = matches.reduce(
    (prev, curr) => {
      const { won, lost } = prev
      const [winner, loser] = curr

      won.add(winner)
      lost.set(loser, (lost.get(loser) ?? 0) + 1)

      return { won, lost }
    },
    { won: new Set(), lost: new Map() }
  )

  const notLost = Array.from(won)
    .filter(winner => lost.has(winner) == false)
    .sort((a, b) => a - b)
  const lostOnce = Array.from(lost.entries())
    .filter(([loser, freq]) => freq === 1)
    .map(([loser]) => loser)
    .sort((a, b) => a - b)

  return [notLost, lostOnce]
}

console.log(
  findWinners([
    [1, 3],
    [2, 3],
    [3, 6],
    [5, 6],
    [5, 7],
    [4, 5],
    [4, 8],
    [4, 9],
    [10, 4],
    [10, 9],
  ])
)
// 0: [1, 2, 10]
// 1: [4, 5, 7 ,8]

console.log(
  findWinners([
    [2, 3],
    [1, 3],
    [5, 4],
    [6, 4],
  ])
)
// 0: [1, 2, 5, 6]
// 1: []
