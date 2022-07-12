/*
 * @lc app=leetcode id=958 lang=javascript
 *
 * [958] Check Completeness of a Binary Tree
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isCompleteTree = function(root) {
    
};

function judge(head) {
    if (!head) {
        return true;
    }

    const {left, right} = head;

    const l = judge(left);
    const r = judge(right);

    if (left && !right || right && !left) {
        return false;
    }
}
// @lc code=end

