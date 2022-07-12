/*
 * @lc app=leetcode id=297 lang=javascript
 *
 * [297] Serialize and Deserialize Binary Tree
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    if (!root) {
        return '#_';
    }
    let str = '';

    str += root.val + '_';

    str += serialize(root.left);
    str += serialize(root.right);

    return str;
};


function Node(val, left = null, right = null) {
    this.val = val === '#' ? null : val;
    this.left = left;
    this.right = right;
}

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    let arr = data.split('_');

    if (!arr.length) {
        return null;
    }

    

    return reconPreOrder(arr)
};

function reconPreOrder(arr) {
    let val = arr.shift();

    if (val === '#') {
        return null;
    }

    const head = new Node(val);

    head.left = reconPreOrder(arr);

    head.right = reconPreOrder(arr);

    return head;
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
// @lc code=end

