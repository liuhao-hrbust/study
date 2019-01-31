/**
 * super作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次super函数。
 * 如果子类没有定义constructor方法，这个方法会被默认添加
 * 如果定义了constructor方法就必须执行super函数
 * 作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错。
 * 注意，super虽然代表了父类A的构造函数，但是返回的是子类B的实例，
 * 即super内部的this指的是B，因此super()在这里相当于A.prototype.constructor.call(this)。
 */

class A {
    constructor() {
        console.log(new.target.name);
    }
    static sayHello() {
        console.log('hello');
    }
}

class B extends A {
    constructor(sss) {
        // super();
        console.log(super());
        this.sss = sss;
    }
}

let a = new A();
let b = new B();
Object.getPrototypeOf(a).sayHello();


/**
 * super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
 * 
 */

 