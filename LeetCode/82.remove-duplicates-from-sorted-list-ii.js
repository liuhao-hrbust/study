/*
 * @lc app=leetcode id=82 lang=javascript
 *
 * [82] Remove Duplicates from Sorted List II
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
var deleteDuplicates = function(head) {
    if (!head || !head.next) {
        return head;
    }

    let newHead = {next: head};

    let p = newHead;
    let c = head;

    let  needDelete = false;

    while (c) {
        if (p.next === c.next.val) {
            c = c.next;
        }
    }

};
// @lc code=end

