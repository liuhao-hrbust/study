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
 var swapPairs = function(head) {
    if (!head || !head.next) {
        return head;
    }

    let p = head;
    let c = head;

    const res = head.next;

    while (c && c.next) {
        let prevT = c;
        const next = c.next.next;

        c.next.next = c;

        if (c !== head) {
            p.next = c.next;
        }
        c.next = next;
        c = next;
        p = prevT;
    }

    return res;
};