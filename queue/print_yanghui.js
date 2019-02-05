function Queue() {
    let items = []; // 存储数据

    // 向队列尾部添加一个元素
    this.enqueue = function(item) {
        items.push(item);
    };

    // 移除队列头部的元素
    this.dequeue = function() {
        return items.shift();
    };

    // 返回队列头部的元素
    this.head = function() {
        return items[0];
    };

    // 返回队列大小
    this.size = function() {
        return items.length;
    };

    // clear
    this.clear = function() {
        items = [];
    };

    // isEmpty 判断是否为空队列
    this.isEmpty = function() {
        return items.length == 0;
    };

    this.tail = function() {
        return items[items.length - 1];
    };
}

function print_yanghui(n) {
    let queue = new Queue();
    queue.enqueue(1);
    let line = '';
    // 第一层for循环控制打印几层
    for (let i = 1; i <= n; i++) {
        line = "";
        let pre = 0;
        for (let j = 0; j < i; j++) {
            let item = queue.dequeue();
            line += item + "  ";
            // 计算下一行的内容
            let value = item + pre;
            pre = item;
            queue.enqueue(value);
        }
        // 每一层最后一个数字是1,上面的for循环没有计算最后一个数
        queue.enqueue(1);
        console.log(line);
    }
}

print_yanghui(10)