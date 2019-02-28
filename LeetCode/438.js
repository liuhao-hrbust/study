/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
    let freq = new Array(256).fill(0);
    let l = 0;
    let r = -1;
    let res = [];
    for (let i = 0; i < p.length; i++) {
        freq[p[i].charCodeAt()] ++;
    }
    while (l < s.length - p.length) {
        if ()
    }
};