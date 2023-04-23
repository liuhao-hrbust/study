// const timeoutVal = (ms, val) =>
//     new Promise(r => setTimeout(() => r(val), ms)).then(e => {
//         console.log(e);
//         return e;
//     });
// const func1 = () => timeoutVal(2000, 1);
// const func2 = () => timeoutVal(1000, 2);
// const func3 = () => timeoutVal(2000, 3);

// const executePromise = ajaxArray => {
//     let count = 0;
//     const { length } = ajaxArray;
//     const result = [];

//     return new Promise((resolve, reject) => {
//         for (let index = 0; index < length; index++) {
//             const element = ajaxArray[index];
//             element()
//                 .then(res => {
//                     result[index] = res;
//                     count++;

//                     if (count === length) {
//                         resolve(result);
//                     }
//                 })
//                 .catch(err => reject(err));
//         }
//     });
// };

// executePromise([func1, func2, func3]).then(data => {
//     console.log('done');
//     console.log(data);
// });

// // 无法处理函数
// const deepClone1 = target => JSON.parse(JSON.stringify(target));

// const deepClone2 = (target, map = new Map()) => {
//     if (!target instanceof Object) {
//         return target;
//     }

//     const res = Array.isArray(target) ? [] : {};

//     map.set(target, res);

//     Object.keys(target).forEach(key => {
//         if (target[key] instanceof Object) {
//             res[key] = deepClone2(target[key], map);
//         } else {
//             res[key] = target[key];
//         }
//     });

//     return res;
// };

function count(n) {
    if (n <= 2) {
        return n;
    }

    const memo = [0, 1, 2];

    function dp(n) {
        if (memo[n]) {
            return memo[n];
        } else {
            return dp(n - 1) + dp(n - 2);
        }
    }

    return dp(n);
}

// // console.log(count(3));

// // function shuffle(ary: number[]): number[] {
// //     // your code here

// //     return ary.sort(() => Math.random() - 0.5);
// // }

// // type Ary = (number | undefined | Ary)[];
// function getVal(ary) {
//     // your code here
//     function flat(arr) {
//         let res = [];
//         for (let index = 0; index < arr.length; index++) {
//             const element = arr[index];
//             if (Array.isArray(element)) {
//                 res = [...res, ...flat(element)];
//             } else {
//                 res.push(element);
//             }
//         }

//         return res;
//     }

//     const initArr = flat(ary).filter(item => !!item);

//     const soredArr = [...initArr].sort((a, b) => a - b);

//     return {
//         ary1: initArr,
//         ary2: soredArr,
//     };
// }
// console.log(getVal([1, 2, 3, [9, undefined, 8], 5, 6, 7]));

// http://www.lubansoft.com/?a=1&b=2&c=&d=xxx&e
function parseQuery(url) {
    const queryString = (url.split('?') || [])[1];

    if (!queryString) {
        return {};
    }

    const res = {};

    const queryArr = queryString.split('&') || [];

    if (!queryArr.length) {
        return {};
    }

    queryArr.forEach(str => {
        const [key, value] = str.split('=');

        if (res[key]) {
            res[key] = [...res[key], value];
        } else {
            res[key] = value;
        }
    });

    return res;
}

console.log(parseQuery('http://www.lubansoft.com/?a=1&b=2&c=&d=xxx&e'));

let uri =
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/20/16e87e5e320b92a~tplv-t2oaga2asx-zoom-crop-mark:3024:3024:3024:1702.awebp';
let res;
try {
    res = fetch(uri);
} catch (error) {
    console.log(err, 'err');
}

console.log({ res });

fetch(uri)
    .then()
    .catch(e => console.log({ err: e }));
fetch(uri)
    .then()
    .catch(e => console.log({ err: e }));
