function Dog(name) {
    this.name = name;
}

Dog.prototype.sayName = function() {
    console.log(this.name);
}

const jack = new Dog('jack');

class Cat {
    constructor(name) {
        this.name = name;
    }
    sayName() {
        console.log(this.name);
    }
}

const tom = new Cat('tom')