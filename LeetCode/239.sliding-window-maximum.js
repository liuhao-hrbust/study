/*
 * @lc app=leetcode id=239 lang=javascript
 *
 * [239] Sliding Window Maximum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
    const { length } = nums;

    if (!k || k > nums) {
        return [];
    }

    const q = new MaxQueue(nums);
    let l = 0;
    let r = 0;
    const res = [];

    for (let i = 0; i < k; i++) {
        q.push(i);
    }

    r = k - 1;

    for (let i = k; i <= length; i++) {
        if (l === q.firstItem()) {
            res.push(q.shift());
        } else {
            res.push(nums[q.firstItem()]);
        }

        l++;
        r++;

        q.push(r);
    }

    return res;
};

class MaxQueue {
    constructor(nums) {
        this.queue = [];
        this.nums = nums;
    }

    push(item) {
        if (this.nums[item] >= this.lastItem()) {
            while (this.queue.length && this.lastItem() <= this.nums[item]) {
                this.queue.pop();
            }
        }

        this.queue.push(item);
    }

    lastItem() {
        return this.nums[this.queue[this.queue.length - 1]];
    }

    shift() {
        return this.nums[this.queue.shift()];
    }

    firstItem() {
        return this.queue[0];
    }
}

// @lc code=end
