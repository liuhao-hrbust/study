/*
 * @lc app=leetcode id=209 lang=javascript
 *
 * [209] Minimum Size Subarray Sum
 */

// @lc code=start
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
    if (!nums.length) {
        return 0;
    }
    let min = Infinity;
    let total = 0;
    let l = 0;
    let r = 0;

    while (r < nums.length) {
        total += nums[r];

        while (l <= r && total >= target) {
            min = Math.min(min, r - l + 1);

            if (min === 1) {
                return min;
            }

            total -= nums[l++];
        }

        r++;
    }

    if (r - l === nums.length) {
        return 0;
    }

    return min;
};
// @lc code=end

const nums = [2, 3, 1, 2, 4, 3];
const target = 7;

console.log(minSubArrayLen(target, nums));
