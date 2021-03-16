/*
 * @lc app=leetcode.cn id=24 lang=javascript
 *
 * [24] 两两交换链表中的节点
 */

// @lc code=start
/**
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
var swapPairs = function (head) {
  let tempPre = null;
  let tempHead = head || {};
  let tempNext = tempHead.next || "";
  while (tempHead && tempNext) {
    tempHead.next = tempNext.next;
    tempNext.next = tempHead;
    // 这时候顺序变为 tempPre tempNext tempHead
    if (tempPre === null) {
      head = tempNext;
    } else {
      tempPre.next = tempNext;
    }
    tempPre = tempHead;
    tempHead = tempHead.next;
    if (tempHead) {
      tempNext = tempHead.next;
    }
  }
  return head;
};
// @lc code=end
