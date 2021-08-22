class Stack {
    constructor() {
        this.items = [];
    }

    push = item => {
        this.items.push(item);
    };

    pop = () => this.items.pop();

    isEmpty = () => !this.items.length;

    size = () => this.items.length;

    clear = () => {
        this.items = [];
    };
}

function poland(arr) {
    const operator = ['+', '-', '*', '/'];

    const s = new Stack();

    arr.forEach(item => {
        if (operator.includes(item)) {
            const right = s.pop();
            const left = s.pop();

            const exprStr = `${left}${item}${right}`;

            s.push(eval(exprStr) + '');
        } else {
            s.push(item);
        }
    });

    return s.pop();
}

var exp_1 = ["4", "13", "5", "/", "+"];

console.log(poland(exp_1))