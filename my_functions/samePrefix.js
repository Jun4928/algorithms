// 문제 [start, stair, staep],
// strs은 단어가 담긴 배열입니다.
// 공통된 시작 단어(prefix)를 반환해주세요.
// result ='sta'

const groupByIdx = (acc, arr) => {
  arr.forEach((el, idx) => acc[idx] ? acc[idx].push(el) : acc[idx] = [el])
  return acc
}

const allElementsEqual = (arr) => arr.length > 1 && arr.every((el) => el === arr[0])

const getPrefix2 = (words) => {
  const [firstWord] = words

  return words.map((word) => word.split(''))
              .reduce(groupByIdx, [])
              .map(allElementsEqual)
              .filter(Boolean)
              .map((_, idx) => firstWord[idx])
              .join('')
};

console.log(getPrefix2(['start', 'stair', 'staep']))  // sta
console.log(getPrefix2(['start', 'stair', 'step'])) // st
console.log(getPrefix2(['start', 'wework', 'today'])) // ''
console.log(getPrefix2(['aaa','aaaaa','aabbbbbbbb'])) // 'aa'

