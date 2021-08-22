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

function matchBrackets(str) {
    const s = new Stack();

    for (let i = 0; i < str.length; i++) {
        const item = str[i];
        if (item === '(') {
            s.push(str[i]);
        }

        if (item === ')') {
            if (s.isEmpty()) {
                return false;
            }

            s.pop();
        }
    }

    return s.isEmpty();
}

console.log(matchBrackets("()()))"));
console.log(matchBrackets("sdf(ds(ew(we)rw)rwqq)qwewe"));
console.log(matchBrackets("()()sd()(sd()fw))("));