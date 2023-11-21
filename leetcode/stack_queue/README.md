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

## [Example 2: 1047. Remove All Adjacent Duplicates In String](https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/)

```js
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
```

- keep a history of characters
- stack maintains the order :w
- deletion follows the LIFO pattern, where the last character is the first one to be deleted because adjacency
- Time: O(N)
- Space: O(N)

## [Example 3: 844. Backspace String Compare](https://leetcode.com/problems/backspace-string-compare/description/)

```js
var backspaceCompare = function (s, t) {
  return buildString(s) === buildString(t)
}

function buildString(s) {
  const stack = []
  for (const char of s) {
    if (char === '#') {
      stack.pop()
    } else {
      stack.push(char)
    }
  }

  return stack.join(``)
}
```

- LIFO pattern
- the most recent character is the target being deleted when meets #
- Time: O(N)
- Space: O(N)

---

# Queue

- FIFO: First In First Out
- elements are added and removed from the **opposite** side
- any system that handles a job on a first come, first serve basis, like printer pending documents
- O(N): operations on the front of the array (adding and removal)
- O(1): when it is implemented using a doubly linked list
- less common than stacks, the problems are generally more difficult
- The most common use: BFS(Breadth-first search)

## [Example: 933. Number of Recent Calls](https://leetcode.com/problems/number-of-recent-calls/)

```js
var RecentCounter = function () {
  this.requests = []
}

RecentCounter.prototype.ping = function (t) {
  this.requests.push(t)

  while (this.requests[0] < t - 3000) {
    this.requests.shift()
  }

  return this.requests.length
}
```

- Time: O(N)
- Queue shines when BFS appears!
