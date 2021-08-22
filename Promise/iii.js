function Promise(executor) {
    var _this = this;
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledFunc = [];
    this.onRejectedFunc = [];

    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e.message);
    }

    function resolve(value) {
        if (_this.state === 'pending') {
            _this.value = value;
            _this.state = 'resolved';
            _this.onFulfilledFunc.forEach(f => f(value));
        }
    }

    function reject(reason) {
        if (_this.state === 'pending') {
            _this.reason = reason;
            _this.state = 'rejected';
            _this.onRejectedFunc.forEach(f => f(reason));
        }
    }
}

/**
 * 状态更新后执行
 * @param {Function} onFulfilled 成功态回调
 * @param {Function} onRejected 失败态回调
 */
Promise.prototype.then = function (onFulfilled, onRejected) {
    //解决值的传递，如果没给任何参数就使用默认回调，值的穿透
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val;
    onRejected =
        typeof onRejected === 'function'
            ? onRejected
            : e => {
                  throw e;
              };

    var promise2 = new Promise((resolve, reject) => {
        if (this.state === 'pending') {
            if (typeof onFulfilled === 'function') {
                this.onFulfilledFunc.push(value => {
                    /**
                     * 2.2.4 onFulfilled or onRejected must not be called until the execution context stack contains only platform code.
                     * 按照规定，Promise.then应该是异步的
                     */
                    setTimeout(() => {
                        try {
                            // pending状态说明有异步操作未完成，所以把onFulfilled放入回调队列中
                            let x = onFulfilled(value);
                            /**
                             * 如果 onFulfilled  和 onRejected 是函数，就用函数调用的返回值，来改变新返回的 promise2 对象的状态。
                             * 2.2.7.1 If either onFulfilled or onRejected returns a value x, run the Promise Resolution Procedure [[Resolve]](promise2, x).
                             * 规范规定，then 方法必须返回一个新的 Promise 对象（promise2），
                             * 新的 promise2 的状态必须依赖于调用 then 方法的 Promise 对象（promise1）的状态，
                             * 也就是说，必须要等到 promise1 的状态变成 fulfilled 或者 rejected 之后，promise2 的状态才能进行改变。
                             */
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    });
                });
            }
            if (typeof onRejected === 'function') {
                this.onRejectedFunc.push(reason => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    });
                });
            }
        }

        if (this.state === 'resolved') {
            if (typeof onFulfilled === 'function') {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                });
            }
        }
        if (this.state === 'rejected') {
            if (typeof onRejected === 'function') {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                });
            }
        }
    });

    return promise2;
};

/**
 * 根据上一个then的结果解析Promise，
 * 可以这样理解：我们将改变 promise2 对象的状态的过程，移动到了 resolvePromise 方法中，以便处理更多的细节问题。
 * 规范中提到，对于 onFulfilled 或 onRejected 的返回值的，提供一个 Promise Resolution Procedure 方法进行统一的处理，以适应不同的返回值类型。
 * @param {Object} promise2 新Promise对象
 * @param {Object} x 上一个then的返回值
 * @param {Function} resovle 新Promise的成功态回调
 * @param {Function} reject 新Promise的失败态回调
 */
function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        reject(new TypeError('Promise发生了循环引用'));
    }

    let called = false; //调用标记，防止成功和失败都调用
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        //是对象或函数
        try {
            let then = x.then;
            if (typeof then === 'function') {
                //如果是Promise就执行它，继续递归
                then.call(
                    x,
                    y => {
                        if (called) return;
                        called = true; //调用过了，将标记更新
                        resolvePromise(promise2, y, resolve, reject);
                    },
                    r => {
                        if (called) return;
                        called = true; //调用过了，将标记更新
                        reject(r);
                    }
                );
            } else {
                resolve(x);
            }
        } catch (error) {
            if (called) return;
            called = true; //调用过了，将标记更新
            reject(error);
        }
    } else {
        //是普通值
        resolve(x);
    }
}

let p = new Promise((a, b) => {
    setTimeout(() => {
        a('333');
    }, 1000);
})
    .then(value => {
        console.log(value);
        return 3;
    })
    .then(x => {
        console.log(x);
    });

Promise.all = promiseArr => {
    let res = [];
    let index = 0;

    return new Promise((resolve, reject) => {
        promiseArr.forEach((p, i) => {
            Promise.resolve(p)
                .then(r => {
                    res[i] = r;
                    index++;

                    if (index === promiseArr.length) {
                        resolve(res);
                    }
                })
                .catch(err => reject(err));
        });
    });
};

Promise.race = promiseArr => {
    return new Promise((reslove, reject) => {
        promiseArr.forEach(p => {
            Promise.resolve(p)
                .then(res => {
                    reslove(res);
                })
                .catch(err => reject(err));
        });
    });
};

function red() {
    console.log('red');
}
function green() {
    console.log('green');
}
function yellow() {
    console.log('yellow');
}

const light = (time, cb) =>
    new Promise(resolve => {
        setTimeout(() => {
            cb();
            resolve();
        }, time);
    });

const step = () =>
    Promise.resolve()
        .then(() => light(1000, red))
        .then(() => light(2000, green))
        .then(() => light(3000, yellow))
        .then(() => {
            return step();
        });

step();

function reduce(arr, cb, init) {
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];

        init = cb(init, item, i, arr);
    }

    return init;
}

function myInstanceof(obj, con) {
    let proto = Object.getPrototypeOf(obj);
    let prototype = con.prototype;

    while (true) {
        if (proto === prototype) return true;
        if (prototype === null) return false;

        prototype = Object.getPrototypeOf(prototype);
    }
}

function applyy(fn, thisArg, ...args) {
    const temp = Symbol();
    thisArg[temp] = fn;
    const res = thisArg[temp](...args);

    delete thisArg[temp];

    return res;
}

var urls = [
    'https://i.gsxcdn.com/1138845330_rit2wl87.png',
    'https://i.gsxcdn.com/1138415037_70xx0k8u.png',
    'https://p.gsxcdn.com/1136513227_vwlsmnwr.png',
    'https://p.gsxcdn.com/1136893614_k1ev9sha.png',
    'https://i.gsxcdn.com/1134314385_gwb1ygdu.png',
    'https://p.gsxcdn.com/1221647374_bfmovo4g.jpg',
    'https://p.gsxcdn.com/1187148362_bm8o1tcv.png',
    'https://p.gsxcdn.com/1134294760_z6gsbj52.png',
    'https://i.gsxcdn.com/1134343869_o2qydx89.png',
];
function loadImg(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function () {
            console.log('一张图片加载完成');
            resolve(img);
        };
        img.onerror = function () {
            reject(new Error('Could not load image at' + url));
        };
        img.src = url;
    });
}

function limitLoad(urls, handler, limit) {
    const group1 = urls
        .splice(0, 3)
        .map((url, index) => handler(url).then(() => index));

    return group1
        .reduce(
            (pendingGroup, url, index) =>
                pendingGroup
                    .then(() => Promise.race(group1))
                    .then(fastIndex => {
                        group1[fastIndex] = handler(url).then(() => fastIndex);
                    })
                    .catch(err => console.log(err)),
            Promise.resolve()
        )
        .then(() => {
            return Promise.all(group1);
        });
}

limitLoad(urls, loadImg, 3)
    .then(res => {
        console.log('done');
    })
    .catch(err => {
        console.log(err);
    });
