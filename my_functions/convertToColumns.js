/**
 *
 * @param {arr[][]} matrix
 * @returns {arr[][]} columns 기반 2차원 배열
 */
const converToColumns = (matrix) => {
  const base = [...new Array(matrix.length)].map(() => [])
  return matrix.reduce((acc, row) => {
    row.forEach((val, idx) => {
      acc[idx].push(val)
    })

    return acc
  }, base)
}
