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

function minStack() {
    let data_stack = new Stack();
    let min_stack = new Stack();
    this.push = (item) => {
        data_stack.push(item);
        if (min_stack.isEmpty() || min_stack.top() > item) {
            min_stack.push(item);
        } else {
            min_stack.push(min_stack.top());
        }
    };

    this.pop = () => {
        min_stack.pop();
        return data_stack.pop();
    }

    this.min = () => {
        return min_stack.top();
    };
}

let stack = new minStack();

stack.push(1);
stack.push(3);
stack.push(12);
stack.push(11);
stack.push(16);

stack.min();
