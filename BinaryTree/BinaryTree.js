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
        for (let i = 0; i < str.length; i++) {
            let item = str[i];
            if (item === '(') {
                stack.push(item);
                k = 1;
            } else if (item === ',')
        }
    }
}

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
}
