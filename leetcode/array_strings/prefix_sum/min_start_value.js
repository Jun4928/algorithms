/**
 * @param {number[]} nums
 * @return {number}
 */
var minStartValue = function (nums) {
  let acc = 0
  let minimumPrefixSum = 0
  for (const num of nums) {
    acc += num
    minimumPrefixSum = Math.min(minimumPrefixSum, acc)
  }

  console.log(minimumPrefixSum)

  return -minimumPrefixSum + 1
}

module.exports = { minStartValue }

// var minStartValue = function (nums) {
//   let acc = 0
//   let minimumPrefixSum = Number.POSITIVE_INFINITY
//   let allPositive = true
//   for (const num of nums) {
//     acc += num

//     if (acc < minimumPrefixSum) {
//       minimumPrefixSum = acc
//     }

//     if (acc < 0) {
//       allPositive = false
//     }
//   }

//   if (allPositive) {
//     return 1
//   }

//   return minimumPrefixSum < 0 ? minimumPrefixSum * -1 + 1 : minimumPrefixSum
// }
