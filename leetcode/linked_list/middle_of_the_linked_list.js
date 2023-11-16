/**
 * https://leetcode.com/problems/middle-of-the-linked-list/description/
 * # 876. Middle of the Linked List
 *
 *
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function (head) {
  let slow = head
  let fast = head

  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
  }

  return slow
}

/**
 * faster pointer moves twice as fast
 * which means faster reaches the end, slow is exactly in the middle
 *
 * Time: O(N)
 * Space: O(1)
 */
