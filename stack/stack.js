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
