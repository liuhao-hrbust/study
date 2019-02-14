class Stack {
    constructor() {
        this.item = [];
    }

    push(num) {
        this.item.push(num);
    }

    pop() {
        return this.item.pop();
    }

    isEmpty() {
        return this.item.length === 0;
    }

    clear() {
        this.item = [];
    }

    print() {
        console.log(this.item.join("-"));
    }

    top() {
        return this.item[this.item.length - 1];
    }

    size() {
        return this.item.length;
    }
}

class BinTreeNode {
    constructor(data) {
        this.data = data;
        this.leftChild = null;
        this.rightChild = null;
        this.parentNode = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }
    init_tree(str) {
        let stack = new Stack();
        let k = 0;
        let new_node = null;
        for (let i = 0; i < str.length; i++) {
            let item = str[i];
            if (item === "#") {
                return;
            } else if (item === "(") {
                stack.push(new_node);
                k = 1;
            } else if (item === ",") {
                k = 2;
            } else if (item === ")") {
                stack.pop();
            } else {
                new_node = new BinTreeNode(item);
                if (this.root === null) {
                    this.root = new_node;
                } else if (k === 1) {
                    let top_item = stack.top();
                    new_node.parentNode = top_item;
                    top_item.leftChild = new_node;
                } else {
                    let top_item = stack.top();
                    new_node.parentNode = top_item;
                    top_item.rightChild = new_node;
                }
            }
        }
    }
    tree_node_count = function(node) {
        // 左子树的节点数量加上右子树的节点数量 再加上1
        if (!node) {
            return 0;
        }
        var left_node_count = tree_node_count(node.leftChild);
        var right_node_count = tree_node_count(node.rightChild);
        return left_node_count + right_node_count + 1;
    };
    // 返回节点数量
    size = function() {
        return tree_node_count(root);
    };
}

let tree_node_count = function(node) {
    // 左子树的节点数量加上右子树的节点数量 再加上1
    if (!node) {
        return 0;
    }
    var left_node_count = tree_node_count(node.leftChild);
    var right_node_count = tree_node_count(node.rightChild);
    return left_node_count + right_node_count + 1;
};

// 返回节点数量
size = function() {
    return tree_node_count(root);
};

function in_order(node) {
    if (node === null) {
        return;
    }
    in_order(node.leftChild);
    console.log(node.data);
    in_order(node.rightChild);
}

// 迭代中序遍历
function in_order(root) {
    let stack = new Stack();
    let res = [];
    let curr = root;
    while (true) {
        while (curr) {
            if (curr.left) {
                stack.push(curr);
                curr = curr.left;
            }
        }

        let top_item = stack.pop();
        res.push(top_item.val);
        curr = curr.right;
        if (!curr && stack.isEmpty()) {
            break;
        }
    }
    return res;
}

let tree = new BinaryTree();
let str = "A(B(D,E(G,)),C(,F))#";
tree.init_tree(str);
