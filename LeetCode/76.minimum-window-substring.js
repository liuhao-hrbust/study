/*
 * @lc app=leetcode id=76 lang=javascript
 *
 * [76] Minimum Window Substring
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
    let map1 = new Map();
    for (let i = 0; i < t.length; i++) {
        if (map1.has(t[i])) {
            map1.set(t[i], map1.get(t[i]) + 1);
        } else {
            map1.set(t[i], 1);
        }
    }

    let map = new Map(t.split('').map(str => [str, 0]));

    let l = 0;
    let r = 0;
    let min = Infinity;

    let res = '';

    while (l <= r && r < s.length) {
        if (map.has(s[r])) {
            map.set(s[r], map.get(s[r]) + 1);
        }

        r++;

        while ([...map].every(([key, value]) => value >= map1.get(key))) {
            if (r - l < min) {
                res = s.substring(l, r);
                min = r - l;
            }

            if (map.has(s[l])) {
                map.set(s[l], map.get(s[l]) - 1);
            }

            l++;
        }
    }

    return res;
};
// @lc code=end
