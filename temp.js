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
            left.push(element)
        }
        else {
            right.push(element);
        }
    }
}