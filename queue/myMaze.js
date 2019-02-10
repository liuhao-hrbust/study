class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.step = 0;
    }
}

function find_position(pos, maze) {
    let width = maze[0].length; // 横向
    let height = maze.length; // 纵向
    let pos_arr = [];

    let { x, y } = pos;

    if (x - 1 >= 0) {
        pos_arr.push(new Position(x - 1, y));
    }

    if (x + 1 < width) {
        pos_arr.push(new Position(x + 1, y));
    }

    if (y + 1 < height) {
        pos_arr.push(new Position(x, y + 1));
    }

    if (y - 1 >= 0) {
        pos_arr.push(new Position(x, y - 1));
    }

    return pos_arr;
}

function Queue() {
    var items = []; // 存储数据

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

function find_path(start_pos, end_pos, maze) {
    let node_arr = [];
    let line_arr = [];
    for (let i = 0; i < maze.length; i++) {
        line_arr = [];
        for (let j = 0; j < maze[0].length; j++) {
            line_arr.push(new Node(j, i));
        }
        node_arr.push(line_arr);
    }

    let b_arrive = false;
    let max_step = 0;
    let queue = new Queue();
    queue.enqueue(start_pos);
    while (true) {
        let position = queue.dequeue();
        let pos_arr = find_position(position, maze);

        for (let i = 0; i < pos_arr.length; i++) {
            let pos = pos_arr[i];
            if (pos.x === end_pos.x && pos.y === end_pos.y) {
                b_arrive = true;
                max_step = position.step + 1;
            }

            if (maze[position.x][position.y] === 1) {
                continue;
            }

            if (maze_node[pos.x][pos.y].step > 0) {
                continue;
            }

            if (pos.x === start_pos.x && pos.y === start_pos.y) {
                continue;
            }

            if (maze[pos.x][pos.y] === 1) {
                continue;
            }

            node_arr[pos.x][pos.y].step =
                node_arr[position.x][position.y].step + 1;
            queue.enqueue(pos);
        }
        if (queue.isEmpty()) {
            break;
        }

        if (b_arrive) {
            break;
        }
    }

    let path = [];
    path.push(end_pos);
    let step = max_step;
    let prev_pos = end_pos;
    while (step > 0) {
        let pos_arr = find_position(prev_pos, maze);
        for (let i = 0; i < pos_arr.length; i++) {
            let pos = pos_arr[i];
            if (node_arr[pos.x][pos.y] === step) {
                path.push(new Position(pos.x, pos.y));
                step--;
                prev_pos = pos;
                break;
            }
        }
    }
    path.push(start_pos);
    return path.reverse;
}
