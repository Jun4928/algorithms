# Sliding Window

> Like two pointers, it works with iterables with ordered elements.
> actually implemented using two pointers

## Sub-arrays

- a sub-array is a contiguous section of the array. They must be adjacent to each other in the original array with their original order

- [ [1], [2], [3], [4] ]
- [ [1, 2], [2, 3], [3, 4] ]
- [ [1, 2, 3], [2, 3, 4] ]
- [ 1, 2, 3, 4 ]

- they can be defined by two indexes, left and right

## When Sliding Window?

**First**

- criteria says sub-array `valid`
- a constraint metric
  - ex. sum, the number of unique elements, the frequency of a specific element, etc.
- a numeric restriction on the constraint metric, which is for a sub-array
  - the sum of sub-array <= 10, this is valid

**Second**

- `best` valid sub-array, defined what makes a sub-array better than another, longest
- the number of valid sub-arrays

> When a problem is about sub-arrays, consider if sliding window is good option

- Find the longest sub-array with a sum less than or equal to k
- Find the longest substring that has at most one "0"
- Find the number of sub-arrays that have a product less than k

## The algorithm

- sliding window is only about valid sub-arrays
- `left` and `right`, represent the current under consideration
- at first, `left=right=0`, the first sub-array is just the first element of the array
- expand this size of window by incrementing `right`, adding a new element to the window
- remove some elements from the window until it becomes valid again, by incrementing `left`, shirking the window
- the window grows and shrinks, but always slides along to the right, until it reaches the end of the input iterable

## Example

- `nums = [3, 2, 1, 3, 1, 1] and k = 5.` find the longest sub-array, the sum of which is less or equal than K.

- `left=0, right=2`, the sub-array is `[3, 2, 1]`
- the sum is 6, greater than K.
- it's broken that's why remove 3, because it's never going to be valid by adding elements to the right

- we don't actually need a sub-array to store the elements
- just need a variable that stores the current value whether it is valid or not **curr**, all operations are done in O(1)
- In each iteration, add the element **array[right]** to the window, which grows the window
- only remove **array[left]**, when it becomes invalid

```js
function findLongestSumLessAndEqualThanK(nums, K) {
    let left = 0
    let curr = 0
    let answer = 0
    for (let right = 0; right < nums.length - 1, right++) {
        curr += nums[right]
        while (curr > k) { // until it's valid
            curr -= nums[left]
            left ++
        }

        answer = Math.max(answer, right - left + 1) // to find the longest
    }

    return answer
}

```

```js
function fn(arr):
    left = 0
    for (int right = 0; right < arr.length; right++):
        Do some logic to "add" element at arr[right] to window

        while WINDOW_IS_INVALID:
            Do some logic to "remove" element at arr[left] from window
            left++

        Do some logic to update the answer
```

## why efficient?

- any algorithm that visits every sub-array will be at least O(n^2), too slow
- Sliding window guarantees a maximum of 2n window iterations
  - the right n times
  - the left n times
  - each window is O(1)
  - O(2n) = O(n), much faster
- the while loop to increase left pointer, it starts at 0, only increases and never exceeds n