function Animal(name) {
    this.name = name;
}

Animal.prototype.getName = function() {
    console.log(this.name);
}

function Dog(name) {
    Animal.call(this, name);
}

Dog.prototype = Object.create(Animal.prototype, {
    constructor: {
        value: Dog,
        writable: true,
        enumerable: false,
        configurable: true
    }
});

let jack = new Dog('jack');

jack.getName();