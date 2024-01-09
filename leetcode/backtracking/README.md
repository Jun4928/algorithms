# Backtracking

- the most brute force way to solve a problem is through exhaustive search
- `a-z`, generate strings of length `n` using the letters.
- There are 26^n possibilities, if it was a tree, each node has 26 children
- Even with constraints, an exhaustive search would still generate all strings of length `n` as **candidates**
- Time: O(K \* 26^N), K is the work it costs to check if a string meets the constraint

**Backtracking**

- an optimization that involves **abandoning a path** once it is determined that path cannot lead to a solution (similar to binary search trees)
  - if you're looking for a value X, and the root node has a value greater than X, then you ignore the entire right subtree
- If the constraint was that the sting could only have vowels - an exhaustive search would generate all 26^N strings
- With Backtracking, discard all the subtrees that don't have vowels
  - Improving from O(26^N) to O(5^N)

> we prune(abandon) paths that cannot lead to a solution, generating far fewer possibilities

- Backtracking is a great tool whenever a problem wants to find all of something, or there isn't a clear way to find a solution without checking all logical possibilities.
- A strong hint is if the input constraints are very small (N <= ~15), as backtracking algorithms usually have exponential time complexities

## Implementation

- with recursion
- building something, either directly (modifying an array) or indirectly (using variables to represent some state)

```js
// it could be an array or a combination of variables
let curr = `represent the thing should be built`

function backTrack(curr) {
    if (base case) {
        Increment or add to answer
        return
    }

    for (iter of input) {
        Modify curr
        backTrack(curr)
        Undo whatever modification was done to curr
    }
}
```

- each call to the function **backtrack** represents a node in the tree
- each iteration in the for loop represents **a child** of the current node
- calling **backtrack** in the loop, represents moving to a child
- after the call of backtrack in the loop, the next statement is about **moving back up the tree from a child to its parent**

- at any given node, the path from the root the the current node represents a candidate that is being built
- **the leaf nodes are complete solutions and represent when the base case is reached**
- the root of this tree is an empty candidate and represents the scope that **the original backtrack call** is being made from

## [Example 1: 46. Permutations](https://leetcode.com/problems/permutations/description/)

```js
/**
https://leetcode.com/problems/permutations/description/
46. Permutations
 * @param {number[]} nums
 * @return {number[][]}
 */
const permuteBacktrack2 = nums => {
  let answer = []

  const backtrack = curr => {
    if (curr.length === nums.length) {
      answer.push([...curr])
      return
    }

    for (const num of nums) {
      if (!curr.includes(num)) {
        curr.push(num)
        backtrack(curr)
        curr.pop() // go back to the parent node
      }
    }
  }

  backtrack([])
  return answer
}
```

- curr is only a reference to the array's address, this is why it should be copied
- the base case is to check all elements used
- the most important one is to go back to the parent node, it can simply implemented by popping out the last element of the current array
- Time: O(N \* N!), each of those calls makes N - 1 calls, N - 2, etc.
- Space: O(N) for curr and the recursion call stack
