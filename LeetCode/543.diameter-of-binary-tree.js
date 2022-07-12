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
 * @return {number}
 */
 var diameterOfBinaryTree = function(root) {
    let info = getHeight(root);

    return info.maxLength;
};

function getHeight(head) {
    let empty = {
        height: 0,
        maxLength: 0
    };

    if (!head) {
        return {
            height: 0,
            maxLength: 0
        };
    }

    
    let lInfo = empty;
    let rInfo = empty;

    const {left, right} = head;

    if (left) {
        lInfo = getHeight(left);
    }

    if (right) {
        rInfo = getHeight(right);
    }

    let treeHeight = Math.max(lInfo.height, rInfo.height) + 1;
    const treeMaxLength = Math.max(lInfo.height + rInfo.height, lInfo.maxLength, rInfo.maxLength)

    return {
        height: treeHeight,
        maxLength: treeMaxLength
    }
}