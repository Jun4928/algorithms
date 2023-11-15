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