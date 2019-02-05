/**
 *  约瑟夫环（普通模式）
 */

 function del_ring() {
     let queue = new Queue();
     for (let i = 0; i < 100; i++) {
         queue.enqueue(i);
     }
     let count = 0;
     while (queue.size() !== 1) {
         count ++;
        if(count < 3) {
            queue.enqueue(queue.dequeue());
        } else {
            queue.dequeue();
            count = 0;
        }
     }
     console.log(queue.head());
 }
 del_ring();
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