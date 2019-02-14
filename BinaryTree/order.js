// 迭代中序遍历
function in_order(root) {
    let stack = new Stack();
    let res = [];
    let curr = root;
    while (true) {
        while (curr) {
            if (curr.left) {
                stack.push(curr);
                curr = curr.left;
            }
        }

        let top_item = stack.pop();
        res.push(top_item.val);
        curr = top_item.right;
        if (!curr && stack.isEmpty()) {
            break;
        }
    }
    return res;
}

// 迭代前序（先序）遍历
function pre_order(root) {
    let stack = new Stack();
    let curr = root;
    let res = [];
    while (curr) {
        res.push(curr.data);
        if (curr.right) {
            stack.push(curr.right);
        }
        if (curr.left) {
            curr = curr.left;
        } else {
            curr = stack.pop();
        }
        
    }
}

// 迭代后序遍历
function post_order(root) {
// state为0表示左子树已经遍历结束， 1表示右子树已经遍历结束
    class Tag {
        constructor(curr, state) {
            this.curr = curr;
            this.state = state;
        }
    }

    let stack = new Stack;
    let res = [];
    while (true) {
        while (curr) {
            let new_tag = new Tag(curr, 0);
            curr = curr.left;
            stack.push(new_tag);
        }

        let top_item = stack.pop();
        if (top_item.curr.right && top_item.state === 0) {
            top_item.state = 1;
            stack.push(top_item);
            curr = top_item.curr.right;
        } else {
            res.push(top_item.curr.data);
        }
        if(!curr && stack.isEmpty()){
            break;
        }
    }
}

if ((curr.left && curr.left.val >= curr.val) || (curr.right && curr.right.val <= curr.val) ) {
    return false;
}