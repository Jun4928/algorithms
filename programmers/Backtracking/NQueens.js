const log = console.log
const range = (n) => [...Array(n).keys()]

function solution(n) {
  const result = []
  const columnsSet = new Set()
  const diagonalDownSet = new Set() // 차
  const diagonalUpSet = new Set() // 합

  const NQueens = (row) => {
    if (row >= n) {
      // 현재 열들의 정보가 담긴 집합이 Queen 이 놓인 자리
      result.push([...columnsSet])
      return
    }

    for (const column of range(n)) {
      if (canPlaceQueen(row, column)) {
        NQueens(row + 1)
        // DFS 로 재귀호출 하고 난 후
        // 이전의 상태로 만들어 주어야 한다.
        columnsSet.delete(column)
        diagonalDownSet.delete(row - column)
        diagonalUpSet.delete(row + column)
      }
    }
  }

  const canPlaceQueen = (row, column) => {
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
