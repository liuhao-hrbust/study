function reverse_iter(head) {
    if(!head) {
        return null;
    }
    let prev = null;
    let curr = head;
    while (curr) {
        next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}

var Node = function(data){
    this.data = data;
    this.next = null;
}

var node1 = new Node(1);
var node2 = new Node(2);
var node3 = new Node(3);
var node4 = new Node(4);
var node5 = new Node(5);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;

function print(node){
    var curr_node = node;
    while(curr_node){
        console.log(curr_node.data);
        curr_node = curr_node.next;
    }
};
let node = reverse_digui(node1);

print(node);

function reverse_digui(head) {
    if (!head) {
        return null;
    }

    if (!head.next) {
        return head;
    }
    let new_head = reverse_digui(head.next); 
    head.next.next = head;
    head.next = null;
    return new_head;
}