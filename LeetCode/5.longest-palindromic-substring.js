/*
 * @lc app=leetcode id=5 lang=javascript
 *
 * [5] Longest Palindromic Substring
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    if (!s || s.length === 1) {
        return s;
    }

    const s1 = `#${s.split('').join('#')}#`;

    let R = -1;
    let arr = [];
    let C = -1;
    let max = -1;
    let res = '';

    for (let i = 0; i < s1.length && R <= s1.length; i++) {
        arr[i] = i >= R ? 1 : Math.min(arr[2 * C - i], R - i);
        while (i + arr[i] < s1.length && i - arr[i] > -1) {
            
            if (s1[i + arr[i]] === s1[i - arr[i]]) {
                
                arr[i] ++;
            }
            else {
                break;
            }
        }
        if (i + arr[i] > R) {
            R = i + arr[i];
            C = i;
        }

        if (arr[i] > max) {
            max = arr[i];
            res = s1.substring(i - arr[i] + 1, i + arr[i]);
        }
    }

    return res.replace(/#/g,'');
};
// @lc code=end

let s = 'babad';

console.log(longestPalindrome(s))