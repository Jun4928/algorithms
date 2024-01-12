/**
https://leetcode.com/problems/word-search/description/
79. Word Search
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  let answer = false
  const rows = board.length
  const cols = board[0].length
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]
  const notSafe = (x, y) => x < 0 || y < 0 || x >= rows || y >= cols

  const backtrack = (len, row, col, seen) => {
    if (len === word.length) {
      answer = true
      return
    }

    for (const [dx, dy] of directions) {
      const x = row + dx
      const y = col + dy
      if (!notSafe(x, y) && !seen[x][y] && word[len] === board[x][y]) {
        seen[x][y] = true
        backtrack(len + 1, x, y, seen)
        seen[x][y] = false
      }
    }
  }

  board.forEach((chars, row) => {
    chars.forEach((char, col) => {
      if (char === word[0]) {
        let seen = [...Array(rows)].map(_ => Array(cols).fill(false))
        seen[row][col] = true
        backtrack(1, row, col, seen)
      }
    })
  })

  return answer
}

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  let answer = false
  const rows = board.length
  const cols = board[0].length
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]
  const notSafe = (x, y) => x < 0 || y < 0 || x >= rows || y >= cols

  const backtrack = (w, row, col, seen) => {
    // 어차피 w.length 가 궁금하다면, w 를 만들어 낼 필요 없다.
    // 길만 찾으면 돼!
    if (w.length === word.length) {
      answer = true
      return
    }

    for (const [dx, dy] of directions) {
      const x = row + dx
      const y = col + dy
      if (!notSafe(x, y) && !seen[x][y] && word[w.length] === board[x][y]) {
        w.push(board[x][y])
        seen[x][y] = true
        backtrack(w, x, y, seen)
        w.pop()
        seen[x][y] = false
      }
    }
  }

  board.forEach((chars, row) => {
    chars.forEach((char, col) => {
      if (char === word[0]) {
        let seen = [...Array(rows)].map(_ => Array(cols).fill(false))
        seen[row][col] = true
        backtrack([word[0]], row, col, seen)
      }
    })
  })

  return answer
}
