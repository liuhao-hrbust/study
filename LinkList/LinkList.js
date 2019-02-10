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
        let str = "";
        while (current) {
            str = str + current.data + "->";
            current = current.next;
        }
        str += "null";
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
            target = this.head.data;
            this.head = this.head.next;
            if (!this.head) {
                tail = null;
            }
        } else if ((index = this.length - 1)) {
            let prev = this.get_node(index - 1);
            target = this.tail.data;
            this.tail = prev;
            this.tail.next = null;
        } else {
            let prev = this.get_node(index - 1);
            let target = prev.next;
            prev.next = prev.next.next;
            return target.data;
        }

        this.length--;
        return target;
    }
}

let ll = new LinkList();
ll.append(1);
ll.append(2);
ll.insert(0, 3);
ll.insert(1, 5);

ll.print();
ll.get_node(1);
