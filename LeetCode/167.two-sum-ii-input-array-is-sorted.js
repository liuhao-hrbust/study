/*
 * @lc app=leetcode id=167 lang=javascript
 *
 * [167] Two Sum II - Input Array Is Sorted
 */

// @lc code=start
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
    let left = 0;
    let right = numbers.length - 1;

    while (left < right) {
        let sum = numbers[left] + numbers[right];

        if (sum > target) {
            right--;
        } else if (sum < target) {
            left++;
        } else if (sum === target) {
            return [left + 1, right + 1];
        }
    }

    return [];
};
// @lc code=end
