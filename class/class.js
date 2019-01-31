class Animal {
    constructor(name) {
        this.name = name;
    }
    get name() {
        console.log(this.name);
    }
    // set name(val) {
    //     console.log(val);
    // }
}

const dog = new Animal('dog');
dog.name = 'jack'