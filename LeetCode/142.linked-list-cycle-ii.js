/*
 * @lc app=leetcode id=142 lang=javascript
 *
 * [142] Linked List Cycle II
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
    if (!head || !head.next) {
        return null;
    }

    if (head === head.next) {
        return head;
    }

    let slow = head.next;
    let fast = head.next.next;

    while (slow !== fast) {
        if (!fast || !fast.next) {
            return null;
        }

        slow = slow.next;
        fast = fast.next.next;
    }

    fast = head;

    while (fast !== slow) {
        fast = fast.next;
        slow = slow.next;
    }

    return slow;
};
// @lc code=end

