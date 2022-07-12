// /**
//  * @param {Node} head
//  * @return {Node}
//  */
// var copyRandomList = function (head) {
//     const map = new Map();

//     let current = head;

//     while (current) {
//         map.set(current, {val: current.val, next: null, random: null});
//         current = current.next
//     }


//     current = head;

//     while (current) {
//         if (current.random) {
//             map.get(current).random = map.get(current.random)
//         }

//         map.get(current).next = map.get(current.next) || null;
//         current = current.next
//     }

//     return map.get(head);
// };

/**
 * @param {Node} head
 * @return {Node}
 */
 var copyRandomList = function(head) {
    if (!head) {
        return null;
    }
    
     let c = head;

    while (c) {
        let newNode = {val: c.val, next: c.next, random: null}
        c.next = newNode;
        c = newNode.next;
    }

    c = head;

    while (c) {
        if (c.random) {
            c.next.random = c.random.next;
        }

        c = c.next.next;
    }

    c = head;

    let cloneHead = head.next;

    while(c) {
        const nextOriginNode = c.next.next;
        if (c.next.next) {
            c.next.next = c.next.next.next;
        }
        else {
            c.next.next = null;
        }

        c.next = nextOriginNode;
        c = c.next
    }

    return cloneHead
 }

