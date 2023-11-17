/**
 * https://leetcode.com/problems/remove-duplicates-from-sorted-list/description/
 * # 83. Remove Duplicates from Sorted List
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
var deleteDuplicates = function (head) {
  if (head == null) {
    return head
  }

  let prev = head
  let curr = head.next
  const values = new Set([head.val])

  while (curr != null) {
    if (values.has(curr.val)) {
      prev.next = curr.next
    } else {
      values.add(curr.val)
      prev = curr
    }

    curr = curr.next
  }

  return head
}
