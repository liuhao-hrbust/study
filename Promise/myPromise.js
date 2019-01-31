function myPromise(executor) {
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;
    const self = this;
    this.onFulfilledFunc = [];//保存成功回调
    this.onRejectedFunc = [];

    executor(resolve, reject);

    function resolve(value) {
        if (self.state === 'pending') {
            self.value = value;
            self.state = 'resolved';
            self.onFulfilledFunc.forEach(fn => fn(value));
        }
    }

    function reject(reason) {
        if (self.state === 'pending') {
            self.reason = reason;
            self.state = 'rejected';
            self.onRejectedFunc.forEach(fn => fn(value));
        }
    }

}

myPromise.prototype.then = function (onFulfilled, onRejected) {
    if (this.state === 'pending') {
        if (typeof onFulfilled === 'function') {
            this.onFulfilledFunc.push(onFulfilled);
        }
        if (typeof onRejected === 'function') {
            this.onRejectedFunc.push(onRejected);
        }
    }


    if (this.state === 'resolved') {
        if (typeof onFulfilled === 'function') {
            onFulfilled(this.value);
        }

    }
    if (this.state === 'rejected') {
        if (typeof onRejected === 'function') {
            onRejected(this.reason);
        }
    }
};


// export default myPromise;

const p = new myPromise((resolve,reject) => {
    setTimeout(resolve, 0, 333);
})

p.then((value)=>{
    console.log(value);
})
