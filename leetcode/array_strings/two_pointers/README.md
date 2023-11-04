# TWO POINTERS

> Set the pointers at the edges of the input. Move them towards each other until they meet.

1. Start left at arr[0] and right at arr[length - 1]
2. iterate until they meet each other, which means they are equal index
3. at each iteration, move the left and the right towards each other. Increment the left, decrement the right. Decide which positions to move depending on the problem to solve

```javascript
const fn = (arr) => {
    const left = 0
    const right = arr.length - 1

    while (left < right) {
        DO SOME LOGIC
        DECIDE BETWEEN THESE OPTIONS
            1. left++
            2. right--
            3. both
    }
}
```

It will never have more than O(n) time complexity.

### Palindrome

- check if both elements on the left and the right indexes are the same
- if yes go on with moving both pointers, if not return false
- Time: O(n), O(1) each in total it should'be more than O(n) iterations
- Space: O(1), because it needs only spaces for pointers

### Two Sum with sorted array of unique integers

- the brute force solution: iterate over all paris of integers => O(n^2)
- because the array is sorted, two pointers to improve to an O(n)
- if the target is less than two sum like **20 + 40 > 30**, should move the right pointer to get the sum smaller, vice versa.
- the numbers are sorted, moving the left pointer increases the sum, the right pointer decreases the value of the sum.

---

# Another way to use two pointers

- when the problem has two iterables in the input, two arrays

> Move along both arrays at the same time until every element has been visited

1. Each pointer starts at the first index
2. Iterate until one of the pointers reaches the end of its array, or string
3. At each loop, move the pointers towards the end, depending on the problem
   - once at a time
   - both at a time
4. If we need to check all the elements of both iterables, need some extra code to make sure it

### Sorted Integer, return a new array that combines both of them and is also sorted

- if they're not sorted, it's better to combine and sort, which gives a time O(n\*logn), the cost of sorting.
- with two pointers we can improve it to O(n+m) = O(n)

```javascript
/**
 *  @param {number[]} arr1
 *  @param {number[]} arr2
 *  @return {number[]}
 *
 */

function combineSorted(arr1, arr2) {
  const result = []
  let first = 0
  let second = 0

  while (first < arr1.length && second < arr2.length) {
    if (arr1[first] < arr2[second]) {
      result.push(arr1[first])
      first++
    } else {
      result.push(arr2[second])
      second++
    }
  }

  while (first < arr1.length) {
    result.push(arr1[first])
    first++
  }

  while (second < arr2.length) {
    result.push(arr2[second])
    second++
  }

  return result
}
```

- Time: O(n)
- Space: O(1)

### Is Subsequence

> Given the string s and t, return true if s is a subsequence of t, or false otherwise
> a subsequence of string is a sequence of characters that can be obtained by deleting some (or none) of the characters from the original string, while maintaining the relative order of the remaining characters.
> "ace" is a subsequence of "abcde" while "aec" is not.

- In the same order

```javascript
/**
 *
 * @param {string} s
 * @param {string} t
 * @return {bool}
 *
 */
function isSubsequence(s, t) {
  let sPointer = 0
  let tPointer = 0

  while (sPointer < s.length && tPointer < t.length) {
    if (s[sPointer] === t[tPointer]) {
      sPointer++
    }

    tPointer++
  }

  return sPointer === s.length
}
```

- in the mismatch scenario, discard the character since it's not useful
- only move forward sPointer when we find a match, since the task is to match all characters in s.
