/**
 * 中缀表达式转后缀表达式
 */

function infix_exp_2_postfix_exp(exp) {
    let temp = new Stack();
    let postfix_exp = [];
    let item = "";
    let next = "";
    // 定义运算符的优先级
    let priority_map = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2
    };
    for (let i = 0; i < exp.length; i++) {
        item = exp[i];
        next = exp[i + 1];
        if (!isNaN(item)) {
            postfix_exp.push(item);
        } else if (item === ")") {
            while (temp.top() !== "(") {
                postfix_exp.push(temp.pop());
            }
            temp.pop();
        } else if (item === "(") {
            temp.push(item);
        } else {
            while (
                !temp.isEmpty() &&
                ["+", "-", "*", "/"].includes(item) &&
                priority_map[item] <= priority_map[temp.top()]
            ) {
                postfix_exp.push(temp.pop());
            }
            temp.push(item);
        }
    }
    while (!temp.isEmpty()) {
        postfix_exp.push(temp.pop());
    }
    console.log(postfix_exp);
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

let infix_exp = [
    "(",
    "1",
    "+",
    "(",
    "4",
    "+",
    "5",
    "+",
    "3",
    ")",
    "-",
    "3",
    ")",
    "+",
    "(",
    "9",
    "+",
    "8",
    ")"
];
infix_exp_2_postfix_exp(infix_exp);
