// Promise.all = promiseArr => {
//     let { length } = promiseArr;
//     const res = [];

//     return new Promise((resolve, reject) => {
//         for (let i = 0; i < length; i++) {
//             const p = promiseArr[i];

//             Promise.resolve(p).then(
//                 result => {
//                     res[i] = result;

//                     if (res.length === length) {
//                         resolve(res);
//                     }
//                 },
//                 err => {
//                     reject(err);
//                 }
//             );
//         }
//     });
// };

// 1.给定一个有序(非降序)数组A，可能含有重复元素，求最小的i使得A[i]等于target，不存在则返回-1。
// array =[1,2,3,5,6,7,7,10]
// target  = 7，return  5
// target = 8,  return -1

// function find(arr, target) {
//     let res = -1;
//     let l = 0,
//         r = arr.length - 1;

//     while (l <= r) {
//         let mid = Math.floor((l + r) / 2);
//         const midItem = arr[mid];

//         if (target > midItem) {
//             l = mid + 1;
//         } else if (target === midItem) {
//             res = mid;
//             for (let i = 0; i < mid - l; i--) {
//                 const element = array[i];
//                 if (element === target) {
//                     res = i;
//                 } else {
//                     return res;
//                 }
//             }
//         } else if (target < midItem) {
//             r = mid - 1;
//         }
//     }

//     return res;
// }

// const array = [1, 2, 3, 5, 6, 7, 7, 10];
// console.log(find(array, 8));

// function find2(arr, target) {}

// for (var i = 0; i < 5; i++) {
//     setTimeout(() => {
//         return (function (j) {
//             console.log(new Date(), j);
//         })(i);
//     }, 1000);
// }

const p = new Promise((resolve, reject) => {
    for (var i = 0; i < 5; i++) {
        setTimeout(() => {
            return (function (j) {
                console.log(new Date(), j);
                resolve(i)
            })(i);
        }, 1000);
    }
});
p.then((i) => {
    console.log(new Date(), i, 123);
})
// 5
// 5 5 5 5 5
