/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
    let head1 = {};
    let head2 = {};

    let c = head;
    let c1 = head1;
    let c2 = head2;

    while (c) {
        if (c.val >= x) {
            c1.next = c;
            c1 = c1.next;
        } else {
            c2.next = c;
            c2 = c2.next;
        }

        c = c.next;
    }

    c1.next = null;
    c2.next = null;

    if (head2.next) {
        c2.next = head1.next;
        return head2.next;
    } else {
        return head1.next;
    }
};
