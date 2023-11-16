# Linked Lists

- Arrays are implemented under the hood in a way that the elements are stored contiguously in memory.
- A linked list is similar to an array.
- Nodes are abstract data
- Each node will have a `next` pointer, points to the node that has next element in sequence

```js
class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

let one = new Node(1)
let two = new Node(1)
let three = new Node(1)
one.next = ttwo
two.next = three
let head = one
```

- **head** is the first pointer, which is a starting point
- by keeping a reference to it, never lose any elements

---

# Comparison with arrays

### Advantages

- add and remove elements at any position in O(1), when you have a reference to a node at the point that will be added or removed
- Otherwise, the operation is O(n), iterate from the head
- not having fixed size, array is resized, which is expensive

### Disadvantages

- there is no random access. iterate through whole list to find where a node is
- An array has O(1) indexing, a linked list could require O(n) to access an element at a given position
- more overhead than arrays - every element needs to have extra storage for the pointers(reference), more spaces

---

# Mechanics of a linked list

```js
let ptr = head
head = head.next
head = null
```

- head.next.next, everything before the final `.next` refers to one node

```js
let getSum = head => {
  let ans = 0
  while (head) {
    ans += head.val
    head = head.next
  }

  return ans
}

let getSumRecur = head => {
  if (!head) {
    return 0
  }

  return head.val + getSumRecur(head.next)
}
```

- the final node's **next** pointer is **null**
- so while loop ends, when head becomes **null** by doing `head = head.next`
- traverse could be done recursively

---

# Types of linked lists

### Singly linked list

```js
class ListNode {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

// Let prevNode be the node at position i - 1
const addNode = (prevNode, nodeToAdd) => {
  nodeToAdd.next = prevNode.next
  prevNode.next = nodeToAdd
}

// Let prevNode be the node at position i - 1
const deleteNode = prevNode => {
  prevNode.next = prevNode.next.next
}
```

- connect nodeToAdd to next node by pointing **prevNode.next**
- connect preNode to nodeToAdd by pointing **nodeToAdd**
- delete by connecting next pointer **prevNode.next.next**
- O(1): if you have a reference to the node at `i-1`(prevNode)
- O(n): arbitrary position

### Doubly linked list

```js
class ListNode {
  constructor(val) {
    this.val = val
    this.next = null
    this.prev = null
  }
}

let addNode = (node, nodeToAdd) => {
  let prevNode = node.prev
  nodeToAdd.next = node
  nodeToAdd.prev = prevNode
  prevNode.next = nodeToAdd
  node.prev = nodeToAdd
}

let deleteNode = node => {
  let prevNode = node.prev
  let nextNode = node.next
  prevNode.next = nextNode
  nextNode.prev = prevNode
}
```

- with a doubly linked list, we only need a reference to the node at **i**, because simply can reference the prev pointer, which is **i - 1**

### Linked lists with sentinel nodes

> start: head
> end: tail
> The previous code we looked at is prone to errors. For example, if we are trying to delete the last node in the list, then nextNode will be null, and trying to access nextNode.next would result in an error. With sentinel nodes, we don't need to worry about this scenario because the last node's next points to the sentinel tail.

- with the sentinel tail node, operations at the end of the list in O(1)

```js
class ListNode {
  constructor(val) {
    this.val = val
    this.next = null
    this.prev = null
  }
}

let addToEnd = nodeToAdd => {
  nodeToAdd.next = tail
  nodeToAdd.prev = tail.prev
  tail.prev.next = nodeToAdd
  tail.prev = nodeToAdd
}

let removeFromEnd = () => {
  if (head.next == tail) {
    return
  }

  let nodeToRemove = tail.prev
  nodeToRemove.prev.next = tail
  tail.prev = nodeToRemove.prev
}

let addToStart = nodeToAdd => {
  nodeToAdd.prev = head
  nodeToAdd.next = head.next
  head.next.prev = nodeToAdd
  head.next = nodeToAdd
}

let removeFromStart = () => {
  if (head.next == tail) {
    return
  }

  let nodeToRemove = head.next
  nodeToRemove.next.prev = head
  head.next = nodeToRemove.next
}

let head = new ListNode(-1)
let tail = new ListNode(-1)
head.next = tail
tail.prev = head
```

- the idea is that, even when there are no nodes in a linked list, just keep pointers to a head and tail!
- the real head is `head.next`
- the real tail is `tail.prev`
- **the sentinel nodes themselves are not part of the linked list**

### Dummy pointers

```js
let getSum = head => {
  let ans = 0
  let dummy = head
  while (dummy) {
    ans += dummy.val
    dummy = dummy.next
  }
  // same as before, but we still have a pointer at the head
  return ans
}
```

- it's much better to keep a reference to the **head**
- using the **dummy** pointer helps to keep head at the head

---

# Fast and Slow Pointers

- similar to two pointers technique
- two pointers that don't move side by side
- move at different **speeds** during iteration
- usually fast pointer moves two nodes per iteration, whereas the slow one moves one node per iteration (isn't always the case)

```js
function fn(head):
    slow = head
    fast = head

    while fast and fast.next:
        Do something here
        slow = slow.next
        fast = fast.next.next
```

- should check **fast.next**, because if **fast** is at the final node, **fast.next** is null, trying to access **fast.next.next** would result in error. Doing **null.next**

### Example1

> Example 1: Given the head of a linked list with an odd number of nodes head, return the value of the node in the middle.
> For example, given a linked list that represents 1 -> 2 -> 3 -> 4 -> 5, return 3.

- the difficulty comes from the fact that we don't know how long the input linked list is

```js
let getMiddle = head => {
  let length = 0
  let dummy = head
  while (dummy) {
    length++
    dummy = dummy.next
  }

  for (let i = 0; i < Math.floor(length / 2); i++) {
    head = head.next
  }

  // arrive at the math.floor(length / 2), which is middle
  return head.val
}
```

- the easy solution is get the length by iteration through all
- by moving dummy to the end, we can get the length
- and then move head to the middle

```js
const getMiddle = head => {
  // two pointers
  let slow = head
  let fast = head

  while (fast && fast.next) {
    slow = slow.next // move only one by one
    fast = fast.next.next // move two times faster
  }

  // when fast reaches the end
  // the slow will be middle
  return slow.val
}
```

- the most elegant way comes from using **fast and slow pointer**
- slow moves at half the speed of fast
- slow and fast completely independent of each other
- when fast reaches the end, the slow will be middle, because the input length is odd numbers

### [Example2](https://leetcode.com/problems/linked-list-cycle/)

```js
var hasCycle = function (head) {
  // when faster reaches the visited, it is cycle
  // or slower reaches null, it is not cycle
  let slow = head
  let fast = head
  const visited = new Set([slow])

  while (slow && fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
    visited.add(slow)

    if (visited.has(fast)) {
      return true
    }
  }

  return false
}

// the same
var hasCycleWithoutSet = function (head) {
  // when faster reaches the visited, it is cycle
  // or slower reaches null, it is not cycle
  let slow = head
  let fast = head

  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next

    if (slow == fast) {
      return true
    }
  }

  return false
}
```

- if a linked list has a cycle, eventually there's a point where two pointers meet each other, faster will pass the slower runner
- if fast runner never passes the slower one, it is not cycle
- Time: O(n)
- Space: O(1)

```js
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  let seen = new Set()
  while (head) {
    if (seen.has(head)) {
      return true
    }

    seen.add(head)
    head = head.next
  }

  return false
}
```

- just store the previous one, and iterate through all the nodes
- if it is cycle, eventually visit a node **twice**
- Time: O(n)
- Space: O(n)

### Example3

> Given the head of a linked list and an integer k, return the Kth node from the end.
> For example, given the linked list that represents 1 -> 2 -> 3 -> 4 -> 5 and k = 2, return the node with value 4, as it is the 2nd node from the end.

```js
const findNoe = (head, k) => {
  let slow = head
  let fast = head

  for (let i = 0; i < k; i++) {
    fast = fast.next
  }

  while (fast) {
    slow = slow.next
    fast = fast.next
  }

  return slow.value
}
```

- after move fast pointer K times
- move both pointers at the same speed
- when faster arrives the end, the slow pointer will be the answer
- Time: O(n)
- Space: O(1)
