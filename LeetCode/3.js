/**
 * 无重复字符的最长子串
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let l = 0;
    let r = -1;
    let freq = new Array(256).fill(0);
    let res = 0;

    while (l < s.length) {
        if (r + 1 < s.length && freq[s[r + 1].charCodeAt()] === 0) {
            freq[s[++r].charCodeAt()]++;
        } else {
            freq[s[l++].charCodeAt()]--;
        }
        res = Math.max(res, r - l + 1);
    }
    return res;
};

var s = "abcabcbb";
lengthOfLongestSubstring(s);