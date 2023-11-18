/** * https://leetcode.com/problems/reverse-linked-list-ii/description/
 * 92. Reverse Linked List II
 *
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 *
 * 1 <= left <= right <= n
 */
var reverseBetween = function (head, left, right) {
  if (left === right) {
    return head
  }

  let before = head
  let end = head

  for (let i = 1; i < left - 1; i++) {
    before = before.next
  }

  for (let i = 1; i <= right; i++) {
    end = end.next
  }

  let prev = left === 1 ? null : before
  let curr = left === 1 ? head : before.next
  let start = curr

  while (curr != end) {
    const next = curr.next
    curr.next = prev
    prev = curr
    curr = next
  }

  start.next = end

  if (left === 1) {
    return prev
  }

  before.next = prev
  return head
}

/**
 * left === 1 일 때 ListNode(0, head) 사용
 */
var reverseBetween = function (head, left, right) {
  if (left === right) {
    return head
  }

  let before = new ListNode(0, head)
  let end = head

  for (let i = 1; i <= left - 1; i++) {
    before = before.next
  }

  // store ending point
  for (let i = 1; i <= right; i++) {
    end = end.next
  }

  let prev = before // this is going to be head of the reversed list
  let curr = before.next
  let start = before.next // store starting point

  while (curr != end) {
    const next = curr.next
    curr.next = prev
    prev = curr
    curr = next
  } // being reversed until the end point

  start.next = end // connect start to end
  before.next = prev // connect the node right before the starting point to reversed head
  if (left === 1) {
    return before.next
  }

  return head
}

/**
 * sentinel node can generalize this logic
 * before: immutable pointer until reverse done, which is going to point at reversed head (=prev)
 * start: immutable pointer until reverse done, which is going to point at end (=curr)
 */
var reverseBetween = function (head, left, right) {
  if (left === right) {
    return head
  }

  let sentinel = new ListNode(0, head)
  let before = sentinel
  for (let i = 1; i < left; i++) {
    before = before.next
  }
  let start = before.next

  let prev = null
  let curr = start
  for (let i = left; i <= right; i++) {
    const next = curr.next
    curr.next = prev
    prev = curr
    curr = next
  }

  before.next = prev
  start.next = curr
  return sentinel.next
}
