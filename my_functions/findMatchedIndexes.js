/**
 *
 * @param {string} str
 * @param {string} word
 * @returns {number[]} matched indecies of string with keyword
 */
const findMatchedIndecies = (str, keyword) => {
  let matched
  const indecies = []
  const regExp = new RegExp(`${keyword}`, 'g')
  while ((matched = regExp.exec(str))) indecies.push(matched.index)

  return indecies
}
