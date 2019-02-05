/**
 * 斐波那契数列（队列实现）
 */

function fibonacci(n) {
    let index = 0;
    let queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(1);
    let del_item, next_item;
    while(index < n - 2) {
        del_item = queue.dequeue();
        next_item = del_item + queue.head();
        queue.enqueue(next_item);
        index++;
    }

    queue.dequeue();
    return queue.head();
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
};

console.log(fibonacci(8));