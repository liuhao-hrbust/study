/*
 * @lc app=leetcode id=234 lang=javascript
 *
 * [234] Palindrome Linked List
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
// const genLinkList = require('./genLinkList');
// /**
//  * @param {ListNode} head
//  * @return {boolean}
//  */
// var isPalindrome = function (head) {
//     let stack = [];

//     let p = head;

//     while (p) {
//         stack.push(p.val);
//         console.log(p.val);
//         p = p.next;
//     }

//     p = head;

//     let res = true;

//     while (p) {
//         if (p.val !== stack.pop()) {
//             res = false;
//             break;
//         }
//         p = p.next;
//     }

//     return res;
// };

// const genLinkList = require('./genLinkList');
// /**
//  * @param {ListNode} head
//  * @return {boolean}
//  */
// var isPalindrome = function (head) {
//     let prev = null;
//     let slow = head;
//     let fast = head;

//     while (fast.next && fast.next.next) {
//         fast = fast.next.next;

//         slow = slow.next;
//     }

//     fast = slow.next;

//     while (fast) {
//         let next = fast.next;

//         fast.next = prev;
//         prev = fast;
//         fast = next;
//     }

//     console.log(prev);

//     let right = prev;

//     while (right) {
//         if (right.val !== head.val) {
//             return false;
//         }

//         right = right.next;
//         head = head.next;
//     }

//     return true;
// };

// @lc code=end

console.log(isPalindrome(genLinkList([1, 2, 3, 2, 1])));
