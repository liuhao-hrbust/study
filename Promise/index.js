/**
 *
 * @param {*} ms
 * Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。
 * 它们是两个函数，由 JavaScript 引擎提供，不用自己部署。
 * resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），
 * 在异步操作成功时调用，并将异步操作的结果，作为参数传递出去
 */

function timeout(ms) {
    return new Promise((resolve, reject) => {
        console.log("constructor");
        setTimeout(resolve, ms, "done");
    });
}

/**
 *  'hhh'不会输出，因为上一步抛出了一个错误
 */
timeout(100)
    .then(value => {
        console.log(value);
        return 1;
    })
    .then(value => {
        console.log(value);
        throw new Error("111");
    })
    .then(() => {
        return timeout(100);
    })
    .then(() => {
        console.log("hhh");
    })
    .catch(value => {
        console.log(value + "222");
    });
console.log("tail");

const promise1 = Promise.resolve("lala");
// 等于new Promise(resolve => resolve('lala'));
promise1.then(value => {
    console.log(value);
});

const makeRequest = () => {
    return promise1().then(value1 => {
        return promise2(value1).then(value2 => {
            return promise3(value1, value2);
        });
    });
};

