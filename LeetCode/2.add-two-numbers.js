/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
 var addTwoNumbers = function(l1, l2) {
    let c1 = l1;
    let c2 = l2;

    let carry = 0;

    while (c1 && c2) {
        const res = c1.val + c2.val + carry;

        const singleNumber = res % 10;

        c1.val = c2.val = singleNumber;

        carry = parseInt(res / 10);

        c1 = c1.next;
        c2 = c2.next;
    }

    let longerHead = c1 ? l1 : l2;
    let longerNode = c1 ? c1 : c2;

    if (carry) {
        if (!longerNode) {
            longerHead = join(longerHead, 1);
        }
        else {
            while (longerNode) {
                const res = carry + longerNode.val;

                const singleNumber = res % 10;

                longerNode.val = singleNumber;

                carry = parseInt(res / 10);

                longerNode = longerNode.next;
            }

            if (carry) {
                longerHead = join(longerHead, 1)
            }
        }
    }

    return longerHead;
};

function join(head, val) {
    let c = head;

    while (c) {
        if (!c.next) {
            c.next = {
                val,
                next: null
            };

            return head;
        }
        
        c = c.next;
    }

    return head;
}

var addTwoNumbers = function(l1, l2) {
    function Node(val) {
        this.val = val;
        this.next = null;
    }

    let carry = 0;
    const head = new Node(0);
    let current = head;

    while (l1 || l2) {
        const val1 = l1 ? l1.val : 0;
        const val2 = l2 ? l2.val : 0;

        const res = val1 + val2 + carry;

        carry = parseInt(res / 10);

        current.next = new Node(res % 10);
        current = current.next;

        l1 = !!l1 && l1.next;
        l2 = !!l2 && l2.next;
    }

    if (carry) {
        current.next = new Node(carry);
    }

    return head.next;
}