/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
 var removeNthFromEnd = function(head, n) {
    let h = reverse(head);

    let c = h;
    let p = null;

    if (n === 1) {
        return reverse(h.next);
    }

    for (let i = 1; i <= n; i ++) {
        if (i === n) {
            p.next = c.next;

            return reverse(h);
        }

        p = c;
        c = c.next;
    }
};

function reverse(head) {
    if (!head) {
        return head;
    }

    let prev = null;
    let c = head;

    while (c) {
        let next = c.next;
        c.next = prev;
        prev = c;
        c = next;
    }

    return prev;
}

var removeNthFromEnd = function(head, n) {
    let forward = head;
    let behind = head;

    let step = 0;

    while (forward) {
        if (step > n) {
            behind = behind.next;
        }
        forward = forward.next;
        step ++;
    }

    if (!behind.next) {
        return null;
    }

    if (step === n) {
        return head.next;
    }

    behind.next = behind.next.next;

    return head;
};