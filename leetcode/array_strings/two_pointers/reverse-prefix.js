/**
 * @param {string} word
 * @param {character} ch
 * @return {string}
 */
var reversePrefix = function (word, ch) {
  const arr = [...word]
  let right = 0
  for (let i = 0; i < arr.length; i++) {
    if (word[i] === ch) {
      right = i
      break
    }
  }

  let left = 0
  while (left < right) {
    const temp = arr[right]
    arr[right] = arr[left]
    arr[left] = temp

    left++
    right--
  }

  return arr.join(``)
}

// var reversePrefix = function(word, ch) {
//   const foundIndex= word.indexOf(ch)
//   if (foundIndex === -1) {
//     return word
//   }

//   const sub = word.substring(0, foundIndex + 1)
//   const res = word.substring(foundIndex + 1)
//   return `${[...sub].reverse().join('')}${res}`
// };
