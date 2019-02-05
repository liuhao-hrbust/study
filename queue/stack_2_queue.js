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

class stackQueue {
    constructor() {
        this.s1 = new Stack();
        this.s2 = new Stack();
    }

    enqueue(data) {
        this.s1.push(data);
    }

    dequeue() {
        while (this.s1.size() > 1) {
            this.s2.push(this.s1.pop());
        }

        let del = this.s1.pop();
        while (this.s2.size()) {
            this.s1.push(this.s2.pop());
        }
        return del;
    }

    head() {
        while (this.s1.size() > 1) {
            this.s2.push(this.s1.pop());
        }
        let top = this.s1.top();
        while (this.s2.size()) {
            this.s1.push(this.s2.pop());
        }
        return top;
    }
}

var sq = new stackQueue();
sq.enqueue(1);
sq.enqueue(4);
sq.enqueue(8);
console.log(sq.head());
sq.dequeue();
sq.enqueue(9);
console.log(sq.dequeue())
