var Node = function(data){
    this.data = data;
    this.next = null;
}

var node1 = new Node(1);
var node2 = new Node(4);
var node3 = new Node(9);
var node4 = new Node(2);
var node5 = new Node(5);
var node6 = new Node(6);
var node7 = new Node(10);


node1.next = node2;
node2.next = node3;

node4.next = node5;
node5.next = node6;
node6.next = node7;

print(merge_link(node1, node4));

function print(node){
    var curr_node = node;
    while(curr_node){
        console.log(curr_node.data);
        curr_node = curr_node.next;
    }
};


// iterator
function merge_link(head1, head2){
    //在这里实现你的代码
    let curr1 = head1;
    let curr2 = head2;
    let new_head = null;
    tail = null;
    if (curr1.data >= curr2.data) {
        new_head = new Node(curr2.data);
        tail = new_head;
        curr2.next = head2.next;
    } else {
        new_head = new Node(curr1.data);
        tail = new_head;
        curr1.next = head1.next;
    }

    while (curr1.next && curr2.next) {
        if (curr1.data >= curr2.data) {
            tail.next = curr2;
            tail = tail.next;
            curr2 = curr2.next;
        } else {
            tail.next = curr1;
            tail = tail.next;
            curr1 = curr1.next;
        }
    }

    if (curr1.next) {
        tail.next = curr1;
    } else {
        tail.next = curr2;
    }
    return new_head;
};

// mergeing
