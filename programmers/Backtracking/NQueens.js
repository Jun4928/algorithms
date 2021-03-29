const log = console.log

const range = (n) => [...Array(n).keys()]

function solution(n) {
  const result = []
  const columnsSet = new Set()
  const diagonalDownSet = new Set() // 차
  const diagonalUpSet = new Set() // 합

  const NQueens = (row) => {
    if (row >= n) {
      log('ending!!')
      log('row', row)
      log('columnSet::', columnsSet)
      result.push([...columnsSet])
      return
    }

    for (const column of range(n)) {
      if (canPlaceQueen(row, column)) {
        NQueens(row + 1)
        columnsSet.delete(column)
        diagonalDownSet.delete(row - column)
        diagonalUpSet.delete(row + column)
      }
    }
  }

  const canPlaceQueen = (row, column) => {
    log(row, column)
    log('columnsSet:;', columnsSet)
    if (columnsSet.has(column)) return false
    if (diagonalDownSet.has(row - column)) return false
    if (diagonalUpSet.has(row + column)) return false

    columnsSet.add(column)
    diagonalDownSet.add(row - column)
    diagonalUpSet.add(row + column)
    return true
  }

  NQueens(0)
  return result.length
}

log(solution(4)) // 2
