/*
 * @lc app=leetcode id=98 lang=javascript
 *
 * [98] Validate Binary Search Tree
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
var isValidBST = function(root) {
    if (!root) {
        return true;
    }

    return judge(root).isBST;
};

function judge(head) {
    if (!head) {
        return {
            max: -Infinity,
            isBST: true,
            min: Infinity
        }
    }

    let leftInfo = judge(head.left);
    let rightInfo = judge(head.right);

    return {
        max: Math.max(leftInfo.max, head.val, rightInfo.max),
        min: Math.min(leftInfo.min, head.val, rightInfo.min),
        isBST: leftInfo.isBST && rightInfo.isBST && leftInfo.max < head.val && rightInfo.min > head.val
    }

}
// @lc code=end

