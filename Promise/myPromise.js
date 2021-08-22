class MyPromise {
    constructor(executor) {
        try {
            executor(this.resolve, this.reject);
        } catch (error) {
            this.reject(error);
        }
    }

    pendding = Symbol('pending');
    fulfilled = Symbol('fulfilled');
    rejected = Symbol('rejected');

    status = this.pendding;

    value = undefined;

    reason = undefined;

    onFulfilledHandlerList = [];
    onRejectedHandlerList = [];

    resolve = (value) => {
        if ((this.status = this.pendding)) {
            this.status = this.fulfilled;
            this.value = value;
            while (this.onFulfilledHandlerList.length) {
                this.onFulfilledHandlerList.shift()(value);
            }
        }
    };

    reject = (reason) => {
        if ((this.status = this.pendding)) {
            this.status = this.rejected;
            this.reason = reason;

            while (this.onRejectedHandlerList.length) {
                this.onRejectedHandlerList.shift()(reason);
            }
        }
    };

    then = (onFulfilled, onRejected) => {
        const promise2 = new MyPromise((reslove, reject) => {
            if (this.status === this.fulfilled) {
                // 创建一个微任务等待promise2完成初始化，相当于跳过这一段代码
                // 待初始化完成有了promise2实例后再使用 queueMicrotask 方法
                queueMicrotask(() => {
                    try {
                        // 如果当前回调函数执行成功
                        // then方法中将当前回调结果包装成一个新的promise2，所以可以链式调用then
                        reslovePromise(
                            promise2,
                            onFulfilled(this.value),
                            reslove,
                            reject
                        );
                    } catch (error) {
                        reject(error);
                    }
                });
            }

            if (this.status === this.rejected) {
                onRejected(this.reason);
            }

            if ((this.status = this.pendding)) {
                this.onFulfilledHandlerList.push(onFulfilled);
                this.onRejectedHandlerList.push(onRejected);
            }
        });

        // then返回一个promise
        return promise2;
    };
}

function reslovePromise(promise2, value, reslove, reject) {
    // 如果相等了，说明return的是自己，抛出类型错误并返回
    if (promise2 === value) {
        reject(
            new TypeError('Chaining cycle detected for promise #<MyPromise>')
        );
    }

    if (value instanceof MyPromise) {
        // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
        // x.then(value => resolve(value), reason => reject(reason))
        return value.then(reslove, reject);
    } else {
        return reslove(value);
    }
}

const promise = new MyPromise((resolve, reject) => {
    resolve('success');
});

// 这个时候将promise定义一个p1，然后返回的时候返回p1这个promise
const p1 = promise.then((value) => {
    console.log(1);
    console.log('resolve', value);
    return p1;
});

// 运行的时候会走reject
p1.then(
    (value) => {
        console.log(2);
        console.log('resolve', value);
    },
    (reason) => {
        console.log(3);
        console.log(reason.message);
    }
);
