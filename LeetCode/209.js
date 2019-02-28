/**
 * 长度最小的子数组
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(s, nums) {
    let l = 0;
    let r = -1;
    let sum = 0;
    let res = nums.length + 1;
    while (l < nums.length) {
        if (sum < s&& r+1<nums.length) {
            sum += nums[++r];
        } else {
            sum -= nums[l++];
        }
        if ( sum >= s) {
            res = Math.min(res, r-l+1);
        }
    }
    if (res===nums.length + 1) {
        return -1;
    }
};