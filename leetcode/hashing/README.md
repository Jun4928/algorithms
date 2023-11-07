# Hashing

### Hash Functions

- Hash functions can convert any input into an integer
- when a hash function is combined with an array, it creates a hash map, also known as hash table
- With arrays, map indices to values
- With hash maps, map keys to values, a key can be almost anything
- he only constraint is the keys are immutable

> A Hash map is an unordered ds that stores key-value paris.
> Add and Remove elements in O(1), as well as update and check existence in O(1).
> iteration won't necessarily guarantee any order

### Comparison with Arrays

**the same**

- find length/number of elements
- updating values
- iterate over elements
- with hash maps, don't need to worry about the maximum size, the key will be converted to a new integer within the size limit anyways.

**disadvantages**

- For smaller input sizes, slower due to overhead
- every key needs to go through hash function, and there can be collisions
- can also take up more space.
- Dynamic arrays are fixed-size arrays that resize themselves when they go beyond their capacity. The problem is resizing a hash table is much more expensive because every key needs to be re-hashed through hash function.
- when you don't know how many elements need to store, arrays are more flexible with resizing and not wasting space

### Collisions

- Without handling collisions, older keys will get overridden and data will be lost. One of the ways to handle this is **chaining**
- store linked lists inside the hash map's array instead of the elements themselves. The linked list nodes store both key and the value. If there are collisions, the collided key-value paris are linked together in a linked list. When accessing one of them, traverse through the linked list until the key matches.
- the size of hash table's array and modulus is a prime number.
  - ex. 10,007, 1,000,003, 1,000,000,007

### Sets

- Similar to Hash Table
- add, remove, check existence is all in O(1)
- they don't track frequency, which means it can give you unique results

### Arrays as Keys?

- arrays are mutable in many languages
- A string joined by separator can be a key in hash map, set

---

# Checking For Existence

- the most common applications of a hash table or set is to determine if an element exists in O(1). An array needs O(n) to do this.

### Example1

- Two Sum

```js
var twoSum = function (nums, target) {
  const previous = new Map()

  for (let idx = 0; idx < nums.length; idx++) {
    const num = nums[idx]
    const exists = previous.get(target - num)
    if (exists != null) {
      return [exists, idx]
    } else {
      previous.set(num, idx)
    }
  }

  throw TypeError('MUST BE EXIST')
}
```

- Time: O(n) as the hasp map operations are O(1).
- Space: O(n) the number of keys to store as the same as the length of the input array

### Example2
