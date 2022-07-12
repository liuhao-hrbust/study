/*
 * @lc app=leetcode id=219 lang=javascript
 *
 * [219] Contains Duplicate II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
    if (nums.length < 2) {
        return false;
    }

    if (!k) {
        return false;
    }

    let map = new Map();

    map.set(nums[0], 1);

    let l = 0;
    let r = 1;

    while (r < nums.length) {
        if (map.get(nums[r])) {
            return true;
        } else {
            map.set(nums[r], 1);
        }

        if (r - l < k) {
            r++;
        } else {
            r++;
            map.set(nums[l++], 0);
        }
    }

    return false;
};
// @lc code=end

console.log(containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2));
