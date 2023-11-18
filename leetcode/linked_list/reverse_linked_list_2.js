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

  for (let i = 1; i <= right; i++) {
    end = end.next
  }

  let prev = before
  let curr = before.next
  let start = before.next

  while (curr != end) {
    const next = curr.next
    curr.next = prev
    prev = curr
    curr = next
  }

  start.next = end
  before.next = prev
  if (left === 1) {
    return before.next
  }

  return head
}

/**
 * sentinel node 를 사용하면 아래와 같이 일반화 가능
 * before: reverse 를 시작해야 하는 노드의 앞전 노드 (불변)
 * curr: reverse 를 하는 노드, 한 단계씩 자기 앞에 있는 놈과 자리를 바꾼다.
 * reversing 뿐만 아니라 before 와의 연결도 잊지 말아야한다.
 * curr 의 앞에 있는 놈이 before 바로 다음에 올 아이가 된다.
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
  let curr = before.next // starting point

  for (let i = left; i < right; i++) {
    let next = curr.next
    curr.next = next.next
    next.next = before.next
    before.next = next
  }

  return sentinel.next
}
