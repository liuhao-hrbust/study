/*
 * @lc app=leetcode id=110 lang=javascript
 *
 * [110] Balanced Binary Tree
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
var isBalanced = function(root) {
    let info = judge(root);

    return info.isBalanced;
};

function judge(head) {
    if (!head) {
        return {
            isBalanced: true,
            height: 0
        }
    }

    let lh = judge(head.left);
    let rh = judge(head.right);

    return {
        height: Math.max(lh.height, rh.height) + 1,
        isBalanced: lh.isBalanced && rh.isBalanced && Math.abs(lh.height - rh.height) < 1
    }
}
// @lc code=end

