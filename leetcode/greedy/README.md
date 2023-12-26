# Greedy Algorithms

- it makes the locally optimal decision at every step
- **Optimal**
  - depending on the problem
  - between two numbers, the problem wants us to find the maximum sum of elements, then it is optimal to take the larger one
- **Local**
  - it considers only the available options at the current step
  - based on the information it has at the time
  - doesn't matter any consequences that may happen in the future

> Most greedy problems will be asking for the maximum and minimum of something, but not always

- a lot of algorithms involving heaps can be considered greedy
- a heap gives a max or min element, generally greedy approaches will be choosing max/min elements at each step
- many greedy problems, the input will be sorted at the start

> Implementing greedy algorithms is very easy. The thing is realizing/proving it actually works. A greedy may lead to an answer that is very close to the correct answer, but still wrong

- In real life, it can give good approximations with significantly less computation. A good example is [the travelling salesman problem (TSP)](https://en.wikipedia.org/wiki/Travelling_salesman_problem).
- it yields an answer that is only wrong by about 25%, with a time complexity O(N^2)

> greedy is a way to approach a problem. This concept is extremely general and to practice is recognizing when it applies

## [Example 1: 2126. Destroying Asteroids](https://leetcode.com/problems/destroying-asteroids/)

```js
/**
https://leetcode.com/problems/destroying-asteroids/
2126. Destroying Asteroids
 * @param {number} mass
 * @param {number[]} asteroids
 * @return {boolean}
 */
var asteroidsDestroyed = function (mass, asteroids) {
  asteroids.sort((a, b) => (a < b ? -1 : 1))

  let theMass = mass
  for (let i = 0; i < asteroids.length; i++) {
    if (theMass < asteroids[i]) {
      return false
    }

    theMass += asteroids[i]
  }

  return true
}
```

- Time: O(N \*log N) to sort
- Space: O(logN), quicksort
