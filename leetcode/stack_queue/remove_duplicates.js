/**
 * https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/
 * 1047. Remove All Adjacent Duplicates In String
 *
 * @param {string} s
 * @return {string}
 *
 * repeatedly make duplicate removals on s
 * adjacent and equal characters
 */
var removeDuplicates = function (s) {
  const stack = new Stack()
  for (const val of s) {
    const peak = stack.peak()
    if (peak === val) {
      stack.pop()
    } else {
      stack.push(val)
    }
  }

  return stack.get().join(``)
}

class Stack {
  #stack = []

  peak() {
    return this.#stack[this.#stack.length - 1]
  }

  pop() {
    this.#stack.pop()
  }

  push(val) {
    this.#stack.push(val)
  }

  get() {
    return this.#stack
  }
}
