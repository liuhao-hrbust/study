/*
 * @lc app=leetcode id=187 lang=javascript
 *
 * [187] Repeated DNA Sequences
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[]}
 */
var findRepeatedDnaSequences = function (s) {
    if (s.length <= 10) {
        return [];
    }

    let map = new Map();

    let res = [];

    let l = 0;
    let r = 9;
    let temp;

    while (r < s.length) {
        temp = s.slice(l, r + 1);

        map.has(temp) ? map.set(temp, map.get(temp) + 1) : map.set(temp, 1);

        l++;
        r++;
    }

    for (let [key, value] of map.entries()) {
        if (value > 1) {
            res.push(key);
        }
    }

    return res;
};
// @lc code=end
s = 'AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT';
console.log(findRepeatedDnaSequences(s));
