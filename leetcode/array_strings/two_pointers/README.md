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

```javascript

```
