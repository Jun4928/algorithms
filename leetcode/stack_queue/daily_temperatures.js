/**
 * https://leetcode.com/problems/daily-temperatures/
 * 739. Daily Temperatures
 *
 * @param {number[]} temperatures
 * @return {number[]}
 *
 * how many diff until it gets warmer
 * curr temp < the other temp
 */
var dailyTemperatures = function (temperatures) {
  const stack = []
  const answer = new Array(temperatures.length).fill(0)

  temperatures.forEach((temp, idx) => {
    while (stack.length > 0 && stack[stack.length - 1].temp < temp) {
      const lowerTemp = stack.pop()
      answer[lowerTemp.idx] = idx - lowerTemp.idx
    }

    stack.push({ temp, idx })
  })

  return answer
}
