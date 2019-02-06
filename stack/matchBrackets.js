class stack {
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

function matchBrackets(s) {
    let stack = new Stack();
    for (let i = 0; i < s.length; i++) {
        if(s[i]==='(') {
            stack.push(s[i]);
        } else {
            if (!stack.pop()) {
                return false;
            }
        }
    }
}
