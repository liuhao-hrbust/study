function del_value(head, val) {
    if (head === null) {
        return head;
    }

    let new_head = del_value(head.next, val);
    return head.val === val ? new_head : head; 
}