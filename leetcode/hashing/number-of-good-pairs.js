/**
https://leetcode.com/problems/number-of-good-pairs/description/ 1512. Number of Good Pairs
 * @param {number[]} nums
 * @return {number}
 */
// function calculateCombinations(n, k) {
//   function factorial(num) {
//     if (num <= 1) {
//       return 1;
//     } else {
//       return num * factorial(num - 1);
//     }
//   }

//   return factorial(n) / (factorial(k) * factorial(n - k));
// }

// var numIdenticalPairs = function(nums) {
//   const m = new Map()
//   for (const num of nums) {
//     m.set(num, (m.get(num) ?? 0) + 1)
//   }

//   return [...m.values()]
//   .filter((freq) => freq > 1)
//   .reduce((acc, v) => acc += calculateCombinations(v, 2), 0)
// };

var numIdenticalPairs = function (nums) {
  const m = new Map()
  let ans = 0
  for (const num of nums) {
    ans += m.get(num) ?? 0
    m.set(num, (m.get(num) ?? 0) + 1)
  }

  return ans
}
