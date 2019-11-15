# 函数的扩展

1. [函数参数的默认值](#函数参数的默认值)
2. [rest参数](#rest参数)
3. [name属性](#name属性)
4. [箭头函数](#箭头函数)
5. [尾调用优化](#尾调用优化)
6. [尾递归](#尾递归)

## 函数参数的默认值

-   es6 允许为函数参数设置默认值，即直接写在参数定义的后面

```js
function log(x, y) {
    y = y || 'World';
    console.log(x, y);
}

function log(x, y = 'World') {
    console.log(x, y);
}
```

> ES6 的写法还有两个好处：首先，阅读代码的人，可以立刻意识到哪些参数是可以省略的，不用查看函数体或文档；其次，有利于将来的代码优化，即使未来的版本在对外接口中，彻底拿掉这个参数，也不会导致以前的代码无法运行。

### 使用函数默认值的一些限制

-   参数变量是默认声明的，不能在函数体中使用**let**或**const**再次声明

```js
function foo(x = 5) {
    let x = 1; // error
    const x = 2; // error
    var x = 3; // √
}
```

- 使用参数默认值时，函数带有同名参数会报错，不使用参数默认值时函数带有同名参数不会报错。

```js
// 不报错
function foo(x, x, y) {
    // ...
}

// 报错
function foo(x, x, y = 1) {
    // ...
}
// SyntaxError: Duplicate parameter name not allowed in this context
```

- 参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。

```js
let x = 99;
function foo(p = x + 1) {
    console.log(p);
}
foo() // 100

x = 100;
foo() // 101，每次调用时都会重新计算x + 1 的值
```

### 解构赋值与参数默认值结合使用

- 目前的开发风格很少使用这一特性，可能主要考虑的是一些复杂的赋值操作不应放在参数中，一般将函数参数解构放在函数体中，下面是两者结合的一个例子，可以看到将x与y放在对象中是解构赋值的做法，而且易读性较差，容易将对象参数看成分离的多个参数。

```js
function foo({x, y = 5}) {
    console.log(x, y);
}

foo({}) // undefined 5
foo({x: 1}) // 1 5
foo({x: 1, y: 2}) // 1 2
foo() // TypeError: Cannot read property 'x' of undefined
```

### 参数默认值使用的位置

- 参数默认值的作用是当传参为undefind或者未传参时对参数进行赋值，可是在调用函数时，不能使用类似fn(1, , 3)的形式，即使第二个参数设置了默认值，也会报错，因此将参数默认值放在最后来标记函数参数的可选性是比较合适的。

### 参数默认值对length属性的影响

- 函数的length属性的本意是期望得到的参数个数，所以在使用参数默认值后length属性将失真，包括使用了默认值的参数和在使用了默认值后的所有参数将不被计入length中

## rest参数

- ES6引入rest参数（形式为...变量名），用于获取函数的多余参数，可以代替arguments对象，rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

- 下面是一个利用 rest 参数改写数组push方法的例子。

```js
function push(array, ...items) {
    items.forEach(function(item) {
        array.push(item);
        console.log(item);
    });
}

var a = [];
push(a, 1, 2, 3)
```

### 使用rest参数的注意事项

- rest参数后不能再有其他参数（即rest参数只能是最后一个参数），否则会报错

- 函数的length属性，不包括rest参数

## name属性

- 如果将一个匿名函数赋值给一个变量，es5中name属性是一个空字符串，es6中的name属性将返回变量名

```js
var f = function () {};

// ES5
f.name // ""

// ES6
f.name // "f"
```

- 如果将一个具名函数赋值给一个变量，则 ES5 和 ES6 的name属性都返回这个具名函数原本的名字。

```js
const bar = function baz() {};

// ES5
bar.name // "baz"

// ES6
bar.name // "baz"
```

- Function构造函数返回的函数实例，name属性的值为anonymous。

```js
(new Function).name // "anonymous"
```

- bind返回的函数，name属性值会加上bound前缀。

```js
function foo() {};
foo.bind({}).name // "bound foo"

(function(){}).bind({}).name // "bound "
```

## 箭头函数

### 箭头函数相比function写法优点

- 参数只有一个的时候括号可以省略

- 如果不需要参数或者有多个参数，参数外需要使用圆括号包围

- 如果函数体中只有一条语句，可以不写大括号

- 声明时绑定this，调用时不会改变
  - 作为不知什么时候会调用的回调函数，使用声明时使用箭头函数是比较合适的

```js
function foo() {
    setTimeout(() => {
        console.log('id:', this.id);
    }, 100);
}

var id = 21;

foo.call({ id: 42 });
// id: 42
```

### 箭头函数使用注意点

- 如果箭头函数返回一个对象字面量，必须在对象外面加上括号，否则会报错

- 不能当做构造函数，即不能使用new命令，否则会抛出一个错误

- 不能使用arguments对象，该对象在函数体内不存在。如果要用，可以用rest参数代替

- 不能使用yield命令，因此箭头函数不能用作Generator函数

### 箭头函数不适用的场合

- 箭头函数使得this从“动态”变成“静态”，下面两个场合不适合使用箭头函数

1. 第一个场合是定义对象的方法，且该方法内部包括this。

```js
const cat = {
    lives: 9,
    jumps: () => {
        this.lives--;
    }
}
```
- 上面代码中，cat.jumps()方法是一个箭头函数，这是错误的。调用cat.jumps()时，如果是普通函数，该方法内部的this指向cat；如果写成上面那样的箭头函数，使得this指向全局对象，因此不会得到预期结果。这是因为对象不构成单独的作用域，导致jumps箭头函数定义时的作用域就是全局作用域。

2. 第二个场合是需要动态this的时候，也不应使用箭头函数。

```js
var button = document.getElementById('press');
button.addEventListener('click', () => {
    this.classList.toggle('on');
});
```

- 上面代码运行时，点击按钮会报错，因为button的监听函数是一个箭头函数，导致里面的this就是全局对象。如果改成普通函数，this就会动态指向被点击的按钮对象。

## 尾调用优化

> 注意，目前只有 Safari 浏览器支持尾调用优化，Chrome 和 Firefox 都不支持。

- 如果一个函数嵌套了其他函数，那么在运行时不仅会保留子函数的调用帧，保存调用位置和内部变量等信息，还会保留父函数的调用帧以供子函数使用。

- 如果父函数的最后一步操作是return子函数的调用，且子函数不再依赖父函数中的变量，那么父函数的调用帧就可以销毁以节省内存，下面是几个例子

```js
// 尾调用
function f(x) {
    return g(x);
}

// 调用子函数不是最后一步，后面还有赋值操作
function f(x) {
    let y = g(x);
    return y;
}

// 在调用后还有计算
function f(x) {
    return g(x) + 1;
}

// 没有返回调用，等同于返回undefined
function f(x) {
    g(x);
}

// 下面的函数不会进行尾调用优化，因为内层函数inner用到了外层函数addOne的内部变量one。
function addOne(a){
    var one = 1;
    function inner(b){
        return b + one;
    }
    return inner(a);
}
```

## 尾递归

函数调用自身，称为递归。如果尾调用自身，就称为尾递归。

递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。

```js
function factorial(n) {
    if (n === 1) return 1;
    return n * factorial(n - 1);
}

factorial(5) // 120
```

上面代码是一个阶乘函数，计算n的阶乘，最多需要保存n个调用记录，空间复杂度 O(n) 。

如果改写成尾递归，只保留一个调用记录，空间复杂度 O(1) 。

```js
function factorial(n, total) {
    if (n === 1) return total;
    return factorial(n - 1, n * total);
}

factorial(5, 1) // 120
```
