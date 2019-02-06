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
}


function calc_exp(exp) {
    let stack = new Stack();
    let calc = '';
    let left , right;
    let res = 0;
    const options = ['+', '-', '*', '/'];
    for (let i = 0; i < exp.length; i++) {
        if (options.includes(exp[i])) {
            right = stack.pop();
            left = stack.pop();
            calc = `${left}${exp[i]}${right}`;
            res = Number(eval(calc));
            stack.push(res.toString());
        } else {
            stack.push(exp[i]);
        }
    }
    console.log(stack.pop());
}

calc_exp([ '1', '4', '5', '+', '3', '+', '+', '3', '-', '9', '8', '+', '+' ]);