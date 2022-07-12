/*
 * @lc app=leetcode id=3 lang=javascript
 *
 * [3] Longest Substring Without Repeating Characters
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let l = 0;
    let r = 1;
    let max = 0;

    while (r < s.length) {
        let str = s.slice(l, r);

        console.log(str)

        if (str.indexOf(s.charAt(r)) > -1) {
            l ++;
            continue;
        }
        else {
            r ++;
        }

        max = Math.max(max, r-l)
    }

    return max;
};
// @lc code=end

var s = "abcabcbb";
console.log(lengthOfLongestSubstring(s));