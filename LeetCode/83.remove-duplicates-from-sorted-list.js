/*
 * @lc app=leetcode id=83 lang=javascript
 *
 * [83] Remove Duplicates from Sorted List
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

    let p = head;
    let c = head.next;

    while (c) {
        let next = c.next;
        if (p.val === c.val) {
            p.next = next;
        }
        else {
            p = c;
        }

        c = next;
    }

    return head;
};
// @lc code=end

