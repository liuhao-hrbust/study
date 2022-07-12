/*
 * @lc app=leetcode id=27 lang=javascript
 *
 * [27] Remove Element
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
    let s = 0;
    let f = 0;

    while (f < nums.length) {
        if (nums[f] !== val) {
            nums[s++] = nums[f++];
        } else {
            f++;
        }
    }

    return s;
};
// @lc code=end
