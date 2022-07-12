/*
 * @lc app=leetcode id=88 lang=javascript
 *
 * [88] Merge Sorted Array
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
    let p1 = m - 1;
    let p2 = n - 1;
    let cur = nums1.length - 1;

    while (p1 >= 0 || p2 >= 0) {
        if (nums1[p1] > nums2[p2] || (p1 >= 0 && p2 < 0)) {
            nums1[cur--] = nums1[p1--];
        } else {
            nums1[cur--] = nums2[p2--];
        }
    }

    return nums1;
};
// @lc code=end
