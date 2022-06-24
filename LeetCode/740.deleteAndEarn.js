/**
 * @param {number[]} nums
 * @return {number}
 */
var deleteAndEarn = function(nums) {
    let map = {};

    nums.forEach(num => {
        if (map[num]) {
            map[num] += num;
        }
        else {
            map[num] = 0;
        }
    })

};