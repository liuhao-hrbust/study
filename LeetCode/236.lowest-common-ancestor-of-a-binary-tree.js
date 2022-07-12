/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
 var lowestCommonAncestor = function(root, p, q) {
    let map = new Map();

    map.set(root, root)

    getListFatherNode(root, map);

    let set = new Set();

    set.add(p)

    while (map.get(p) !== p) {
        set.add(p);

        p = map.get(p);
    }

    set.add(root);

    while (q) {
        if (set.has(q)) {
            return q;
        }

        q = map.get(q);
    }

    return root
};

function getListFatherNode(node, map) {
    if (!node) {
        return;
    }

    map.set(node.left, node);
    map.set(node.right, node);

    getListFatherNode(node.left, map);
    getListFatherNode(node.right, map);
}