/**
 * 原型继承
 * 缺点
 * 两个子类实例操作的原型链上的引用类型属性是同一个，基本类型值是不同的
 */
function Animal(color) {
    this.color = color;
    this.test = [1, 2, 3, 4];
}
Animal.prototype.say = function () {
    console.log('hello');
}
function Dog(name) {
    this.name = name;
}
Dog.prototype = new Animal('red');

Dog.prototype.constructor = Dog;

let Jack = new Dog('Jack');
let Alice = new Dog('Alice');
Jack.color = 'blue';
console.log(Alice.color);
Jack
    .test
    .push(5);
console.log(Alice.test);

Jack.say();

// 通过 hasOwnProperty() 方法来确定自身属性与其原型属性
console.log(Jack.hasOwnProperty('name'));
Jack.hasOwnProperty('say');
// 通过 isPrototypeOf() 方法来确定原型和实例的关系
console.log(Animal.prototype.isPrototypeOf(Jack));

/**
 *  子类和父类共用一个原型对象
 * 优点：
 * 不用遍历原型链，效率高
 * 构建继承关系时不需要新建父类实例
 * 缺点：
 * 1.两个子类实例操作的原型链上的引用类型属性是同一个，基本类型值是不同的
 * 2.原型constructor指向不明
 */

function Animal(color) {
    this.color = color;
}
Animal.prototype.say = function () {
    console.log('hello');
}
Animal.prototype.test = [1, 2, 3, 4];
function Dog(name) {
    this.name = name;
}
Dog.prototype = Animal.prototype;

Dog.prototype.constructor = Dog;

let cat = new Animal('white');
let Jack = new Dog('Jack');
let Alice = new Dog('Alice');
Jack.color = 'blue';
console.log(Alice.color);
Jack
    .test
    .push(5);
console.log(Alice.test);

Jack.say();

// 通过 hasOwnProperty() 方法来确定自身属性与其原型属性
console.log(Jack.hasOwnProperty('name'));
Jack.hasOwnProperty('say');
// 通过 isPrototypeOf() 方法来确定原型和实例的关系
console.log(Animal.prototype.isPrototypeOf(Jack));
console.log(Animal.prototype.isPrototypeOf(cat));

/**
 * 组合继承：综合借用构造函数法和原型链法
 * 1.保证每次新建实例都新建实例自己的引用类型值
 * 缺点：
 * 1.每次新建子类实例的时候会加上父类中无用属性
 * 2.父类构造函数会被调用两次
 */

function Animal(color) {
    this.color = color;
    this.test = [1, 2, 3, 4];
}
Animal.prototype.say = function() {
    console.log('hello');
}
function Dog(color, name) {
    Animal.call(this);
    this.name = name;
}
Dog.prototype = new Animal('red');

Dog.prototype.constructor = Dog;

let Jack = new Dog('Jack');
let Alice = new Dog('Alice');
Jack.color = 'blue';
console.log(Alice.color);
Jack.test.push(5);
console.log(Alice.test);

Jack.say();

// 通过 hasOwnProperty() 方法来确定自身属性与其原型属性
console.log(Jack.hasOwnProperty('name'));
Jack.hasOwnProperty('say');
// 通过 isPrototypeOf() 方法来确定原型和实例的关系
console.log(Animal.prototype.isPrototypeOf(Jack));

/**
 * 
 */