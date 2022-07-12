/*
 * @lc app=leetcode id=160 lang=javascript
 *
 * [160] Intersection of Two Linked Lists
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
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    if (!headA ||!headB) {
        return null;
    }

    if (headA === headB) {
        return headA;
    }

    let n1 = headA;
    let n2 = headB;

    let diff = 0;

    while (n1.next) {
        diff ++;
        n1 = n1.next;
    }

    while (n2.next) {
        diff --;
        n2 = n2.next;
    }

    if (n1 !== n2) {
        return null;
    }

    n1 = diff > 0 ? headA : headB;
    n2 = diff < 0 ? headA : headB;

    diff = Math.abs(diff);
    while (diff > 0) {
        diff --;
        n1 = n1.next;
    }

    while (n1 !== n2) {
        n1 = n1.next;
        n2 = n2.next;
    }

    return n1;
};
// @lc code=end

