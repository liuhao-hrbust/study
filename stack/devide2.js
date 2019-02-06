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
        console.log(this.item.reverse().join("-"));
    }
}

function devide2(num) {
    let stack = new Stack();


    while (num > 0) {
        stack.push(num % 2);
        num = Math.floor(num / 2);
    }

    stack.print();
}

devide2(10);