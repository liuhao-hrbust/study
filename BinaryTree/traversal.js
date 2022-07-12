function pre(root) {
    const res = [];

    if (!root) {
        return []
    }

    let stack = [];

    stack.push(root)

    while (stack.length) {
        let node = stack.pop();

        res.push(node.val);

        node.right && stack.push(node.right);
        node.left && stack.push(node.left);
    }

    return res;
}

function post(root) {
    if (!root) {
        return [];
    }

    let stack1 = stack2 = []

    stack1.push(root)

    while (stack1.length) {
        const node = stack1.pop();

        stack2.push(node);

        node.left && stack1.push(node.left);
        node.right && stack1.push(node.right);
    }

    let res = [];

    while (stack2.length) {
        res.push(stack2.pop().val)
    }

    return res;
}

function inOrder(root) {
    if (!root) {
        return [];
    }

    let s = [];

    let res = []

    while (s.length || root) {
        if (root) {
            s.push(root)
            root = root.left
        }
        else {
            root = s.pop();
            res.push(root);
            root = root.right;
        }
    }

    return res
}