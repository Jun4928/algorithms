/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * https://leetcode.com/problems/linked-list-cycle/description/
 * # 141. Linked List Cycle
 *
 * @param {ListNode} head
 * @return {boolean}
 */
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
