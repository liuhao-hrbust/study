/*
 * @lc app=leetcode id=1109 lang=javascript
 *
 * [1109] Corporate Flight Bookings
 */

// @lc code=start
/**
 * @param {number[][]} bookings
 * @param {number} n
 * @return {number[]}
 */
var corpFlightBookings = function (bookings, n) {
    const diff = new Diffrence(new Array(n).fill(0));

    for (let i = 0; i < bookings.length; i++) {
        const [start, end, num] = bookings[i];

        diff.increment(start - 1, end - 1, num);
    }

    return diff.getResult();
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
