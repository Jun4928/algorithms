/**
 * https://leetcode.com/problems/swap-nodes-in-pairs/description/?source=submission-ac
 * 24. Swap Nodes in Pairs
 * using two pointers
 *
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  if (head == null || head.next == null) {
    return head
  }

  const newHead = head.next
  let prev = null
  let curr = head

  while (curr && curr.next) {
    const next = curr.next
    curr.next = next.next
    next.next = curr
    if (prev) {
      prev.next = next
    }

    // move forward
    // prev is curr because curr has been swap with the next one
    prev = curr
    curr = curr.next
  }

  return newHead
}

/**
 *
 * slower version, because uses 3 pointers, including chain
 *
 */
var swapPairs = function (head) {
  if (head == null || head.next == null) {
    return head
  }

  let prev = head
  let curr = head.next
  head = curr

  let chain = null
  while (curr != null) {
    const tmp = curr.next
    curr.next = prev
    prev.next = tmp
    if (chain != null) {
      chain.next = curr
    }

    // move forward
    chain = prev
    prev = tmp
    if (prev == null) {
      break
    }
    curr = prev.next
  }

  return head
}
