// 5.1 查找单链表中的倒数第K个节点（k > 0）（普通模式）
// 实现函数reverse_find，返回链表倒数第k个节点的数值

function reverse_find(head, k) {
    let length = 1;
    let curr = head;
    while (curr.next) {
        curr = curr.next;
        length ++;
    }
    curr = head;
    for (let i = 0; i < length-k; i++) {
        curr = curr.next;
    }
    return curr.data;
}

function reverse_find2(head, k) {
    let fast = head;
    let slow = head;
    let step = k;
    while (fast && step) {
        fast = fast.next;
        step--;
    }

    if (step !== 0) {
        return null;
    } else {
        while (fast) {
            fast = fast.next;
            slow = slow.next;
        }
    }
    return slow.data;
}

var Node = function(data) {
    this.data = data;
    this.next = null;
};

var node1 = new Node(1);
var node2 = new Node(2);
var node3 = new Node(3);
var node4 = new Node(4);
var node5 = new Node(5);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;

console.log(reverse_find2(node1, 2));
