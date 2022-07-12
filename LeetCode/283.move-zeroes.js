/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
    let s = 0;
    let f = 1;

    while (f < nums.length) {
        if (nums[s] !== 0 && nums[f] === 0) {
            s = f;
            f++;
            continue;
        }

        if (nums[s] === 0 && nums[f] !== 0) {
            [nums[s], nums[f]] = [nums[f], nums[s]];

            s++;
            f++;
        } else {
            f++;
        }
    }

    return nums;
};
