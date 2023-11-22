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

---

# Monotonic

- varying in such a way that it either never decreases or never increases
- A monotonic stack | queue is one whose elements are always sorted
- maintain sorted property by removing elements that would violate the property before adding new elements
- `stack = [1, 5, 8, 15, 23]`, push **14**, becomes `stack = [1, 5, 8, 14]`

```py
stack = []
for num in nums:
    while stack.length > 0 AND stack.top >= num:
        stack.pop()
    # Between the above and below lines, do some logic depending on the problem

    stack.push(num)
```

- check the top element is bigger than number, pop it out
- Time: O(N), the inner while loop can only iterate over each element once
- they're useful for problems involving the **next** element based on criteria. A dynamic window of elements, maintain the maximum or minimum element as the window changes

## [Example 1: 739. Daily Temperatures](https://leetcode.com/problems/daily-temperatures/)

```js
var dailyTemperatures = function (temperatures) {
  const stack = []
  const answer = new Array(temperatures.length).fill(0)

  temperatures.forEach((temp, idx) => {
    while (stack.length > 0 && stack[stack.length - 1].temp < temp) {
      const lowerTemp = stack.pop()
      answer[lowerTemp.idx] = idx - lowerTemp.idx
    }

    stack.push({ temp, idx })
  })

  return answer
}
```

- the stack is monotonically decreasing, guaranteed to pop elements only when the first warmer temperature!
- Time: O(N)
- Space: O(N)

## [Example 2: 239. Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/)

```js
var maxSlidingWindow = function (nums, k) {
  let deque = []
  let answer = []

  for (let idx = 0; idx < nums.length; idx++) {
    // maintain monotonic decreasing deque
    while (deque.length && nums[deque[deque.length - 1]] < nums[idx]) {
      deque.pop()
    }
    deque.push(idx)

    // if right - left (the difference between right and left pointers)
    // is the same as k, it's outside the window
    // ex) idx = 3 deque[0] = 0, k = 3
    // the window is left: 1, right: 3, 0 should be out
    if (idx - deque[0] === k) {
      deque.shift()
    }

    // window has reached size k
    if (idx >= k - 1) {
      answer.push(nums[deque[0]])
    }
  }

  return answer
}
```

- Time: O(N)
- Space: O(K), because the deque can't grow beyond this K size
  **KEY TAKEAWAYS**
- monotonic decreasing deque, the first element is the maximum
- the maximum element (the first one) is out of the window size, remove it, because idx increases one by one, we can assure that the first element is the target being deleted, `idx - deque[0] === k` if is the same as window size, it should be out, `right - left >= k` is the same meaning, **ex. idx = 3, dequeue[0]= 0, k =3, 0 is out of the window**
- `idx >= k - 1`, when reaches window size, we push the maximum to the answer, **ex. idx = 2, k =3, window size is reached**

## [Example 3: 1438. Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit](https://leetcode.com/explore/featured/card/leetcodes-interview-crash-course-data-structures-and-algorithms/706/stacks-and-queues/4517/)

```js
var longestSubarrayWrong = function (nums, limit) {
  const maxDeque = []
  const minDeque = []
  let maximumSize = -1

  let left = 0
  for (let idx = 0; idx < nums.length; idx++) {
    // maintain decreasing order
    while (maxDeque.length && nums[maxDeque[maxDeque.length - 1]] < nums[idx]) {
      maxDeque.pop()
    }
    maxDeque.push(idx)

    // maintain increasing order
    while (minDeque.length && nums[minDeque[minDeque.length - 1]] > nums[idx]) {
      minDeque.pop()
    }
    minDeque.push(idx)

    while (nums[maxDeque[0]] - nums[minDeque[0]] > limit) {
      if (maxDeque[0] === left) {
        maxDeque.shift()
      }
      if (minDeque[0] === left) {
        minDeque.shift()
      }

      left++
    }

    maximumSize = Math.max(maximumSize, idx - left + 1)
  }

  return maximumSize
}
```

- Time: O(N)
- Space: O(N)
- maximum deque, minimum deque maintain the order
- just apply the standard sliding window algorithm: add elements from the right, remove them from the left whenever constraint is broken
- when constraint broken, increase window size by **left++**
- the thing is, just check if the maximum or minimum is the same as left
