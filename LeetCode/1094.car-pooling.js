/*
 * @lc app=leetcode id=1094 lang=javascript
 *
 * [1094] Car Pooling
 */

// @lc code=start
/**
 * @param {number[][]} trips
 * @param {number} capacity
 * @return {boolean}
 */
var carPooling = function (trips, capacity) {
    const diff = new Diffrence(new Array(1000).fill(0));

    for (let i = 0; i < trips.length; i++) {
        const [num, f, t] = trips[i];

        diff.increment(f, t - 1, num);
    }

    const res = diff.getResult();

    for (let index = 0; index < res.length; index++) {
        const element = res[index];

        if (element > capacity) {
            return false;
        }
    }

    return true;
};
// @lc code=end

class Diffrence {
    constructor(arr = []) {
        this.diffArr = [arr[0]];

        for (let i = 1; i < arr.length; i++) {
            this.diffArr[i] = arr[i] - arr[i - 1];
        }
    }

    increment(i, j, num) {
        this.diffArr[i] += num;

        if (j + 1 < this.diffArr.length) {
            this.diffArr[j + 1] -= num;
        }
    }

    getResult() {
        let res = [this.diffArr[0]];

        for (let i = 1; i < this.diffArr.length; i++) {
            res[i] = res[i - 1] + this.diffArr[i];
        }

        return res;
    }
}
