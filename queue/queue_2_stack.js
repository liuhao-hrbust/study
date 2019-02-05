/**
 * 两个队列实现一个栈
 */

class queue_2_stack {
    constructor(params) {
        this.q1 = new Queue();
        this.q2 = new Queue();
        this.data_queue = null;
        this.empty_queue = null;
    }
    init_stack() {
        if (this.q1.isEmpty() && !this.q2.isEmpty()) {
            this.data_queue = this.q2;
            this.empty_queue = this.q1;
        } else {
            this.data_queue = this.q1;
            this.empty_queue = this.q2;
        }
    }

    push(data) {
        this.init_stack();
        this.data_queue.enqueue(data);
    }

    top() {
        this.init_stack();
        return this.data_queue.tail();
    }

    pop() {
        this.init_stack();
        while (this.data_queue.size() > 1) {
            this.empty_queue.enqueue(this.data_queue.dequeue());
        }
        return this.data_queue.dequeue()
    }
}

function Queue(){
    var items = [];   // 存储数据

    // 向队列尾部添加一个元素
    this.enqueue = function(item){
        items.push(item);
    };

    // 移除队列头部的元素
    this.dequeue = function(){
        return items.shift();
    };

    // 返回队列头部的元素
    this.head = function(){
        return items[0];
    }

    // 返回队列大小
    this.size = function(){
        return items.length;
    }

    // clear
    this.clear = function(){
        items = [];
    }

    // isEmpty 判断是否为空队列
    this.isEmpty = function(){
        return items.length == 0;
    }

    this.tail = function() {
        return items[items.length - 1];
    }
};


let s = new queue_2_stack();

s.push(2);
s.push(4);
s.push(6);
s.push(4);
s.push(1);

s.pop()
s.pop();
s.top();