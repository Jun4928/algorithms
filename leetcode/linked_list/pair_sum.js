/**
 * https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list/description/
 * 2130. Maximum Twin Sum of a Linked List
 */
// using array
var pairSum = function (head) {
  let prev = null
  let curr = head
  let length = 0
  let values = []

  // 1. reverse
  while (curr) {
    values.push(curr.val)

    const next = curr.next
    curr.next = prev
    prev = curr
    curr = next

    length += 1
  }

  let maximum = -1
  let reversed = prev
  // 2. find maximum
  for (let i = 0; i < length / 2; i++) {
    maximum = Math.max(maximum, values[i] + reversed.val)
    reversed = reversed.next
  }

  return maximum
}
// Time: O(N)
// Space: O(N)

var pairSum = function (head) {
  let slow = head
  let fast = head

  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
  }

  let reversed = null
  let curr = slow
  while (curr) {
    const next = curr.next
    curr.next = reversed
    reversed = curr
    curr = next
  }

  let maximum = -1
  while (reversed) {
    maximum = Math.max(maximum, head.val + reversed.val)

    head = head.next
    reversed = reversed.next
  }

  return maximum
}
// Time: O(N)
// Space: O(1), which doesn't use array
