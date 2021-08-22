/*
 *
 * @param {*} sourceArr
 * 一层数组的深复制，只能深复制值类型
 */
function arrCopy(sourceArr) {
    let newArr = [];
    for (item in sourceArr) {
        newArr[item] = sourceArr[item];
    }
    return newArr;
}

let arr = ['a', 'b', 'c'];
let newArr = arrCopy(arr);
newArr[3] = 'd';
// console.log(newArr);
// console.log(arr);

/**
 *
 * 伪多维数组的深复制,使用递归
 */

function deepCopy(sourceArr) {
    let newArr = [];
    for (item in sourceArr) {
        newArr[item] =
            typeof sourceArr[item] === 'array'
                ? deepCopy(sourceArr[item])
                : sourceArr[item];
    }
    return newArr;
}

let deepArr = [5, 6, [1, 3], 5, 9];
let newDeepArr = deepCopy(deepArr);
newDeepArr[0] = 1;
// console.log(deepArr);
// console.log(newDeepArr);

/**
 * 使用slice(0) 深拷贝各项都为值类型的数组
 * slice(start, end) 返回从开始下标到结束（不包含结束下标）的新数组，不会修改原数组
 */

newArr = arr.slice(0);

/**
 * concat()
 * concat() 方法用于连接两个或多个数组
 * 该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本
 * 使用这种方法的思路是我们用原数组去拼接一个空内容，返回的便是这个数组的拷贝
 */

newArr = arr.concat();

/**
 * 扩展运算符深复制数组，只能深复制值类型
 */

arr = [3, 4, 6, 7];
[...newArr] = arr;
newArr[0] = 1;

console.log(arr);
console.log(newArr);

function deepClone(obj) {
    const isArray = Array.isArray(obj);
    let target = isArray ? [] : {};

    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const element = obj[key];

            target[key] =
                typeof element === 'object' ? deepClone(element) : element;
        }
    }

    return target;
}

/**
 * 浅克隆
 * @param {*} val
 */
function clone(val) {
    if (typeof val !== 'object') return val;
    return {
        ...val,
    };
}

/**
 * 深克隆
 *  1. Date 和 RegExp需要特殊处理
 *  2. 循环引用也需要复制过去
 *
 * @param {*} val
 */
function deepClone(target, map = new WeakMap()) {
    if (target instanceof RegExp) return new RegExp(target);
    if (target instanceof Date) return new Date(target);

    if (target === null || typeof target !== 'object') return target;

    if (map.get(target)) return map.get(target);

    const obj = new target.constructor();

    map.set(target, obj);

    Object.keys(obj).forEach(key => {
        obj[key] = deepClone(obj[key], map);
    });

    let symbolKeys = Object.getOwnPropertySymbols(target);

    symbolKeys.forEach(symbolKey => {
        if (target.hasOwnProperty(symbolKey)) {
            obj[symbolKey] = deepClone(target[symbolKey], map);
        }
    });

    return obj;
}

function flat(arr) {
    return arr.reduce(
        (prev, current, index, arr) =>
            prev.concat(Array.isArray(current) ? flat(current) : current),
        []
    );
}
