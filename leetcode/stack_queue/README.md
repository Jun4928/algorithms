# Stack

- **LIFO**: last in, first out
- PUSH, POP, RANDOM ACCESS: O(1)
- SEARCH: O(N)
- You can only add and remove elements from the same end
- Recursion is actually done using a stack.
- On a return statement reached, the current call is popped off the stack
- Problems involving elements in the input interacting with each other
- matching elements together, querying some property such as **how far is the next largest element**, evaluating a mathematical equation given as a sting, comparing elements against each other, etc.

---

# String Problems

- stacks are useful for string matching because it saves a **history** of the previous characters

## [Example1 Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)

```js
var isValid = function (s) {
  const stack = []
  const match = new Map([
    ['(', ')'],
    ['{', '}'],
    ['[', ']'],
  ])

  for (const character of s) {
    if (match.has(character)) {
      stack.push(character)
    } else {
      const top = stack.pop()
      if (match.get(top) !== character) {
        return false
      }
    }
  }

  return stack.length === 0
}
```

- Time: O(N), because push and pop operations are O(1)
- Space: O(N), stack can grow linearly with the input size
- **LIFO**: the last(most recent) opening bracket is the first to be closed
