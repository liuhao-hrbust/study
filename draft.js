// Promise.resolve('foo')
//     .then(Promise.resolve('bar'))
//     .then(function (result) {
//         console.log(result);
//     });

// let p = new Promise(resolve => resolve(1, console.log(123)))

// const arr = [1, 2, 3];
// arr.reduce((prev, current, index, array) => {
//     return prev.then(() => log(current));
// }, Promise.resolve());

// function log(num) {
//     return new Promise((reslove) => {
//         setTimeout(() => {
//             num && console.log(num);
//             reslove();
//         }, 1000);
//     });
// }

// const arr = [1, 2, 3];
// arr.reduce((p, x) => {
//     return p.then(() => {
//         return new Promise((r) => {
//             setTimeout(() => r(console.log(x)), 1000);
//         });
//     });
// }, Promise.resolve());

// function red() {
//     console.log('red');
// }
// function green() {
//     console.log('green');
// }
// function yellow() {
//     console.log('yellow');
// }

// const config = [
//     {
//         func: red,
//         time: 3000
//     },
//     {
//         func: green,
//         time: 1000
//     },
//     {
//         func: yellow,
//         time: 2000
//     }
// ]

// function redGreenLight(count = 0) {
//     const current = config[count % 3];
//     new Promise((r) => {
//         setTimeout(() => {
//             current.func.call(null);
//             r();
//         }, current.time);
//     })
//     .then(() => {
//         redGreenLight(count + 1);
//     });
// }

// redGreenLight();

const time = timer => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, timer);
    });
};
const ajax1 = () =>
    time(2000).then(() => {
        console.log(1);
        return 1;
    });
const ajax2 = () =>
    time(1000).then(() => {
        console.log(2);
        return 2;
    });
const ajax3 = () =>
    time(1000).then(() => {
        console.log(3);
        return 3;
    });

function mergePromise(ajaxArray) {
    // 存放每个ajax的结果
    const data = [];
    let promise = Promise.resolve();
    ajaxArray.forEach(ajax => {
        // 第一次的then为了用来调用ajax
        // 第二次的then是为了获取ajax的结果
        promise = promise.then(ajax).then(res => {
            data.push(res);
            return data; // 把每次的结果返回
        });
    });
    // 最后得到的promise它的值就是data
    return promise;
}

mergePromise([ajax1, ajax2, ajax3]).then(data => {
    console.log('done');
    console.log(data); // data 为 [1, 2, 3]
});

// 要求分别输出
// 1
// 2
// 3
// done
// [1, 2, 3]

function loadImg(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.src = url;

        img.onload = () => {
            resolve();
        };

        img.onerror = () => {
            reject();
        };
    });
}

// 防抖：设定一个等待时间，触发函数后过了等待时间才会执行，等待时间内重复触发等待时间重置
function debounce(fn, delay) {
    const timeout = -1;

    return function () {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            fn().apply(this, arguments);
        }, delay);
    };
}

// 节流：设定一个等待时间，持续触发函数时会间隔等待时间再执行
function throttle(fn, delay) {
    let prevTime = Date.now();

    return function () {
        if (Date.now() - prevTime > delay) {
            fn().apply(this, arguments);
        }
    };
}

function Foo() {
    Foo.a = function () {
        console.log(1);
    };
    this.a = function () {
        console.log(2);
    };
}
Foo.prototype.a = function () {
    console.log(3);
};
Foo.a = function () {
    console.log(4);
};
Foo.a();
let obj = new Foo();
obj.a();
Foo.a();

async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    return new Promise(r => {
        setTimeout(() => {
            console.log('async2');
            r(1);
        }, 100);
    });
}
async1();
console.log('start');

var p1 = Promise.resolve();

for (var i = 0; i < 5; i++) {
    new Promise.then();
}

console.log(i);

function Father(name) {
    this.name = name;

    this.color = [1, 2];
}

Father.prototype.sayname = function () {
    console.log(this.name);
};

function Son(name) {
    Father.call(this, name);

    this.res = 'res';
}

Son.prototype = new Father();

var a = new Son('ll');

function deepClone(source) {
    const targetObj = Array.isArray(source) ? [] : {}; // 判断复制的目标是数组还是对象
    Object.keys(source).forEach(key => {
        // 遍历目标
        if (source[key] && typeof source[key] === 'object') {
            // 如果值是对象，就递归一下
            targetObj[key] = deepClone(source[key]);
        } else {
            // 如果不是，就直接赋值
            targetObj[keys] = source[keys];
        }
    });
    return targetObj;
}

let x = [1, 2, 3];
let y = x;
let z = [4, 5, 6];
y[0] = 10;
y = z;
z[1] = 20;
[4, 20, 6];

x[2] = z = 30;

console.log(x)[(10, 2, 30)];
console.log(y)[(4, 20, 6)];
console.log(z);
30;

// 数组转树
var arr = [
    { id: 1, name: '部门1', pid: 0 },
    { id: 2, name: '部门2', pid: 1 },
    { id: 3, name: '部门3', pid: 1 },
    { id: 4, name: '部门4', pid: 3 },
    { id: 5, name: '部门5', pid: 65 },
];

function arrayToTree(items) {
    const result = []; // 存放结果集
    const itemMap = {}; //

    // 先转成map存储
    for (const item of items) {
        itemMap[item.id] = { ...item, children: [] };
    }

    for (const item of items) {
        const { id, pid } = item;

        // 当前ID在itemMap中的元素
        const treeItem = itemMap[id];

        if (pid === 0) {
            // 将根节点放到result中
            result.push(treeItem);
        } else {
            // 没有父级，放到顶层
            if (itemMap[pid]) {
                itemMap[pid].children.push(treeItem);
            }
        }
    }
    return result;
}

/*方法说明：快速排序
@param  array 待排序数组*/
//方法一
function quickSort(array, left, right) {
    console.time('1.快速排序耗时');
    if (left < right) {
        var x = array[right],
            i = left - 1,
            temp;
        for (var j = left; j <= right; j++) {
            if (array[j] <= x) {
                i++;
                temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
        quickSort(array, left, i - 1);
        quickSort(array, i + 1, right);
    }
    console.timeEnd('1.快速排序耗时');
    return array;
}

function myNew(construct, ...args) {
    const obj = {};
    obj.setPrototypeOf(construct.prototype);
    res = construct.apply(obj, args);

    return typeof res === 'object' ? res : obj;
}

Function.prototype.myApply = (thisArg, ...argArray) => {
    if (!thisArg) {
        thisArg = {};
    }
    let key = Symbol();
    thisArg[key] = this;
    const res = thisArg[key](...argArray);
    delete thisArg[key];
    return res;
};

function instanceoff(obj, constructor) {
    const p = constructor.prototype;
    let op = obj.getProtoTypeOf();

    while (true) {
        if (op === p) {
            return true;
        }

        if (op === null) {
            return false;
        }

        op = op.getProtoTypeOf();
    }
}

function debounce(fn, delay) {
    let timout;

    return function () {
        clearTimeout(timeout);
        setTimeout(() => {
            fn.apply(this, arguments);
        }, delay);
    };
}

function throttle(fn, delay) {
    let prevTime = Date.now();

    return function (...args) {
        const now = Date.now();

        if (now - prevTime > delay) {
            fn.apply(this, args);
            prevTime = now;
        }
    };
}

function updateCount() {
    var count = 0;
    function getCount(val) {
        count = val;
        console.log(count);
    }
    return getCount; //外部函数返回
}
var count = updateCount();
count(815); //815
count(816); //816

function fullPer(str) {
    const length = str.length;

    if (length <= 1) {
        return [str];
    }

    let result = [];

    for (let i = 0; i < str.length; i++) {
        const s = str[i];
        const rest = str.replace(s, '');

        const middle = fullPer(rest).map(item => item + s);

        result = [...result, ...middle];
    }

    return result;
}

function inherit(superType, subType) {
    function F() {}
    F.prototype = superType.prototype;
    const prototype = new F();
    prototype.constructor = subType;
    subType.prototype = prototype;
}

function flat(arr) {
    return arr.reduce((res, current) => {
        res.concat(Array.isArray(current) ? flat(current) : current);
    }, []);
}

function binary_search(arr, key) {
    var low = 0,
        high = arr.length - 1;
    while (low <= high) {
        var mid = parseInt(low + (high - low) / 2);
        if (key === arr[mid]) {
            return mid;
        } else if (key > arr[mid]) {
            low = mid + 1;
        } else if (key < arr[mid]) {
            high = mid - 1;
        } else {
            return -1;
        }
    }
}
var arr = [5, 13, 19, 21, 37, 56, 64, 75, 80, 88, 92];
var result = binary_search(arr, 21);
console.log(result);

function quickSort(arr) {
    if (arr.length <= 2) {
        return arr;
    }

    let midItem = arr.splice(Math.floor(arr.length / 2), 1);

    let left = [];
    let right = [];

    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if (element < midItem) {
            left.push(element);
        } else {
            right.push(element);
        }
    }
}

Promise.resolve()
    .then(() => {
        console.log(11);
    })
    .then(() => console.log(12))
    .then(() => console.log(13))
    .then(() => console.log(14))
    .then(() => console.log(15));
Promise.resolve()
    .then(() => {
        console.log(21);
    })
    .then(() => console.log(22))
    .then(() => console.log(23))
    .then(() => console.log(24))
    .then(() => console.log(25));

function myNew(con, ...args) {
    let obj = {};
    Object.setPrototypeOf(obj.prototype, con.prototype);
    res = con.bind(obj, ...args);

    return typeof res === 'object' ? res : {};
}

function loadImg(src) {
    const img = new Image();

    img.src = src;

    return new Promise((resolve, reject) => {
        img.onload = () => {
            resolve();
        };

        img.onerror = err => {
            reject(err);
        };
    });
}

function limitLoad(loadFn, arr, limit) {
    const copy = [...arr];

    let promiseArr = copy.splice(0, limit).map(url =>
        loadImg(url, index).then(res => {
            return index;
        })
    );

    return copy
        .reduce(
            (prev, curr, index) =>
                prev.then(() =>
                    Promise.race(promiseArr).then(fastIndex => {
                        promiseArr[fastIndex] = loadImg(curr).then(
                            fastIndex => {
                                return fastIndex;
                            }
                        );
                    })
                ),

            Promise.resolve()
        )
        .then(() => Promise.all(promiseArr));
}

function Fn() {
    var n = 10;
    this.m = 20;
    this.aa = function () {
        console.log(this.m);
    };
}
Fn.prototype.bb = function () {
    console.log(this.n);
};
var f1 = new Fn();
Fn.prototype = {
    aa: function () {
        console.log(this);
        console.log(this.m + 10);
    },
};
var f2 = new Fn();
console.log(f1.constructor);
console.log(f2.constructor);
f1.bb();
f1.aa();
console.log(f2);
f2.aa();
f2.__proto__.aa();
f2.bb();

function Fn() {
    this.m = 1;
}

Fn.prototype = {
    aa() {
        console.log(this);
        console.log(this.m);
    },
};

const f1 = new Fn();
f1.__proto__.aa();

function deepClone(targetObj, map = new Map()) {
    if (!targetObj instanceof Object) {
        return targetObj;
    }

    if (map.has(targetObj)) {
        return map.get(targetObj);
    }

    const res = {};

    if (targetObj instanceof Map) {
        targetObj.forEach((item, index) => {
            res.set(cloneDeep(index, map), cloneDeep(item, map));
        });
    }
    if (targetObj instanceof Set) {
        targetObj.forEach(item => {
            res.add(cloneDeep(item, map));
        });
    }

    map.set(targetObj, res);

    Object.keys(targetObj).forEach(key => {
        res[key] = deepClone(targetObj[key]);
    });

    return res;
}

var name = 'window';
function Person(name) {
    this.name = name;
    (this.foo1 = function () {
        console.log(this.name);
    }),
        (this.foo2 = () => console.log(this.name)),
        (this.foo3 = function () {
            return function () {
                console.log(this.name);
            };
        }),
        (this.foo4 = function () {
            return () => {
                console.log(this.name);
            };
        });
}
var person1 = new Person('person1');
var person2 = new Person('person2');

person1.foo1();
person1.foo1.call(person2);

person1.foo2();
person1.foo2.call(person2);

person1.foo3()(); // window
/**
 * foo3生成了一个函数 function () {
      console.log(this.name)
    }
    直接调用这个函数，this指向window
 */

person1.foo3.call(person2)(); // window
/**
 * foo3生成了一个函数 function () {
      console.log(this.name)
    }
    直接调用这个函数，this指向window
 */

person1.foo3().call(person2); // person2
/**
 * foo3生成了一个函数 function () {
      console.log(this.name)
    }
    用call调用这个函数，this指向person2
 */

person1.foo4()(); // person1
/**
 * foo4生成了一个箭头函数，这个箭头函数的this在创建的时候规定，就是person1.foo4()的时候
 * 所以箭头函数this指向了上级作用域的this  person1
 */

person1.foo4.call(person2)(); // person2
/**
 * foo4生成了一个箭头函数，这个箭头函数的this在创建的时候规定，就是person1.foo4.call(person2)的时候
 * 所以箭头函数this指向了上级作用域的this  person2
 */

person1.foo4().call(person2); // person1
// 生成的箭头函数this指向person1，调用call也不会改变

console.log('start');

setTimeout(() => {
    // callback1
    console.log(111);
    setTimeout(() => {
        // callback2
        console.log(222);
    }, 0);
    setImmediate(() => {
        // callback3
        console.log(333);
    });
    process.nextTick(() => {
        // callback4
        console.log(444);
    });
}, 0);

setImmediate(() => {
    // callback5
    console.log(555);
    process.nextTick(() => {
        // callback6
        console.log(666);
    });
});

setTimeout(() => {
    // callback7
    console.log(777);
    process.nextTick(() => {
        // callback8
        console.log(888);
    });
}, 0);

process.nextTick(() => {
    // callback9
    console.log(999);
});

console.log('end');

// start
// end
/**
 * 9
 * 1
 * 7
 * 4
 * 8
 * 2
 * 5
 * 3
 * 6
 */

Function.prototype.call2 = function (thisArg, [...args]) {
    const a = new Symbol();
    thisArg[a] = this;

    thisArg[a](...args);

    delete thisArg.tempFunction;
};

function judge(str) {
    const stack = [];

    let map = {
        '(': ')',
        '[': ']',
        '{': '}',
    };

    const arr = ['[', '{', '('];

    for (let i = 0; i < str.length; i++) {
        if (arr.includes(str[i])) {
            stack.push(map[str[i]]);
        } else if (stack.pop() !== str[i]) {
            return false;
        }
    }

    return !stack.length;
}

console.log(judge('([]){}'));

function getMaxArea(matrix) {
    let areaArr = [];

    const { length: width } = matrix[0];
    const { length: height } = matrix;

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            const area = record(i, j);

            if (area) {
                areaArr.push(area);
            }
        }
    }

    function record(i, j) {
        if (i >= width || i < 0 || j >= height || j < 0) {
            return 0;
        }

        let area = 0;

        if (matrix[j][i] === 1) {
            area++;
            matrix[j][i] = 0;
        } else {
            return 0;
        }

        area += record(i + 1, j);
        area += record(i - 1, j);
        area += record(i, j - 1);
        area += record(i, j + 1);

        return area;
    }

    return Math.max(...areaArr);
}

// 这段代码演示了 Promise 的错误使用(回调地狱)，你能将其改正(链式调用或 async/await)吗？
// 代码功能：                先后调用了两个 http 接口，并将其返回结果组装成一个对象
// fetch() 文档参考:         https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// response.json() 文档参考: https://developer.mozilla.org/en-US/docs/Web/API/Body/json
function showMeIP() {
    return new Promise((resolve, reject) => {
        fetch('https://httpbin.org/ip')
            .then(ipRes => {
                ipRes
                    .json()
                    .then(ipData => {
                        fetch('https://httpbin.org/json')
                            .then(jsonRes => {
                                jsonRes
                                    .json()
                                    .then(jsonData => {
                                        resolve({ ip: ipData, json: jsonData });
                                    })
                                    .catch(reject);
                            })
                            .catch(reject);
                    })
                    .catch(reject);
            })
            .catch(reject);
    });
}

showMeIP().then(data => {
    console.log(data);
});

function request(url) {
    return fetch(url).then(
        res => res.json(),
        err => Promise.reject(err)
    );
}

async function showMeIP() {
    let res = await Promise.all([
        request('https://httpbin.org/ip'),
        request('https://httpbin.org/json'),
    ]);

    const { origin } = res[0];

    return Promise.resolve({
        ip: origin,
        json: res[1],
    });
}

showMeIP();
