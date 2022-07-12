/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function (root) {
    if (!root) return root;

    process(root.left, root.right);

    return root;
};

function process(l, r) {
    if (!l || !r) {
        return;
    }

    l.next = r;

    process(l.left, l.right);
    process(r.left, r.right);
    process(l.right, r.left);
}
