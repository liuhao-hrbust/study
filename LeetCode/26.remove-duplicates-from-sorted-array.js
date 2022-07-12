/*
 * @lc app=leetcode id=26 lang=javascript
 *
 * [26] Remove Duplicates from Sorted Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    let fast = 0;
    let slow = -1;

    while (fast < nums.length) {
        if (nums[fast] !== nums[slow]) {
            nums[++slow] = nums[fast++];
        } else {
            fast++;
        }
    }

    return slow + 1;
};
// @lc code=end
