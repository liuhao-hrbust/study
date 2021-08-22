class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(data) {
        let node = new Node(data);

        if (this.length === 0) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }

        this.length++;

        return true;
    }

    print() {
        let current = this.head;
        let str = '';
        while (current) {
            str = str + current.data + '->';
            current = current.next;
        }
        str += 'null';
        console.log(str);
    }

    get_node(index) {
        if (index < 0 || index >= this.length) {
            return null;
        }
        let current_index = 0;
        let current_node = this.head;
        while (current_index !== index) {
            current_node = current_node.next;
            current_index++;
        }
        return current_node;
    }

    insert(index, data) {
        if (index < 0 || index > this.length) {
            return false;
        }

        if (index === this.length) {
            return this.append(data);
        }

        let node = new Node(data);
        if (index === 0) {
            node.next = this.head;
            this.head = node;
        } else {
            let prev_node = this.get_node(index - 1);
            let behind_node = prev_node.next;
            prev_node.next = node;
            node.next = behind_node;
        }

        this.length++;
        return true;
    }

    remove(index) {
        let target = null;
        if (index < 0 || index >= length) {
            return null;
        }

        if (index === 0) {
            target = this.head;
            this.head = this.head.next;
            if (!this.head) {
                // 如果之前只有一个元素，删除后链表为空
                tail = null;
            }
        } else {
            let prev = this.get_node(index - 1);
            let target = prev.next;
            prev.next = prev.next.next;
            if (target === null) {
                this.tail = prev;
            }
        }

        this.length--;
        target.next = null;
        return target.data;
    }

    get(index) {
        let node = this.get_node(index);
        if (node) {
            return node.data;
        }

        return null;
    }

    indexOf(data) {
        let current_node = head;
        let index = 0;
        while (current_node !== null) {
            if (current_node.data === data) {
                return index;
            } else {
                current_node = current_node.next;
            }
        }
        return -1;
    }
    // 删除尾节点
    remove_tail = function () {
        return this.remove(length - 1);
    };

    // 删除头节点
    remove_head = function () {
        return this.remove(0);
    };

    // 返回链表头节点的值
    getHead = function () {
        return this.get(0);
    };

    // 返回链表尾节点的值
    getTail = function () {
        return this.get(length - 1);
    };

    // isEmpty
    isEmpty = function () {
        return length == 0;
    };

    // 清空链表
    clear = function () {
        head = null;
        tail = null;
        length = 0;
    };
}

let ll = new LinkList();
ll.append(1);
ll.append(2);
ll.insert(0, 3);
ll.insert(1, 5);

ll.print();
ll.get_node(1);

console.log(ll.head());
