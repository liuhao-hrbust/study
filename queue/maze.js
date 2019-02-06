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

function find_path(maze, start_pos, end_pos) {
    // 创建迷宫坐标系
    let maze_node = [];

    for (let i = 0; i < maze.length; i++) {
        let arr = maze[i];
        let node_arr = [];
        for (let j = 0; j < arr.length; j++) {
            node_arr.push(new Node(j, i));
        }
        maze_node.push(node_arr);
    }

    let b_arrive = false;
    let max_step = 0;
    let queue = new Queue();
    queue.enqueue(start_pos);
    while (true) {
        let position = queue.dequeue();
        let pos_arr = find_position(position, maze_node);

        // 构建出所有可达的步数图
        for (let i = 0; i < pos_arr.length; i++) {
            let pos = pos_arr[i];
            if (pos.x === end_pos.x && pos.y === end_pos.y) {
                b_arrive = true;
                max_step = maze_node[position.x][position.y].step;
                break;
            }

            // 起始点
            if (pos.x === start_pos.x && pos.y === start_pos.y) {
                continue;
            }

            // 不能通过
            if (maze[pos.x][pos.y] === 1) {
                continue;
            }

            // 已经标识过步数
            if (maze_node[pos.x][pos.y].step > 0) {
                continue;
            }

            // 这个点的步数加 1
            maze_node[pos.x][pos.y].step =
                maze_node[position.x][position.y].step + 1;
            // 从当前点再向后找
            queue.enqueue(pos);
        }

        if (b_arrive) {
            break;
        }

        // 如果队列为空
        if (queue.isEmpty()) {
            break;
        }
    }

    //开始反向查找路径
    let path = [];
    if (b_arrive) {
        path.push(end_pos);
        let step = max_step;
        let old_pos = end_pos;
        while (step > 0) {
            let pos_arr = find_position(old_pos, maze);
            for (let i = 0; i < pos_arr.length; i++) {
                let pos = pos_arr[i];
                if (maze_node[pos.x][pos.y].step === step) {
                    step -= 1;
                    old_pos = pos;
                    path.push(pos);
                    break;
                }
            }
        }
        path.push(start_pos);
    }
    console.log(path.reverse());
}

// 找到当前点周围可达的点
function find_position(pos, maze) {
    let horizontal_range = maze[0].length; // 水平长度
    let vertical_range = maze.length; // 竖直长度
    let pos_arr = [];
    let x = pos.x;
    let y = pos.y;

    if (x + 1 < horizontal_range) {
        pos_arr.push(new Position(x + 1, y));
    }

    if (x - 1 >= 0) {
        pos_arr.push(new Position(x - 1, y));
    }

    if (y - 1 >= 0) {
        pos_arr.push(new Position(x, y - 1));
    }

    if (y + 1 < vertical_range) {
        pos_arr.push(new Position(x, y + 1));
    }
    return pos_arr;
}

let maze_array = [
    [0, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1, 0, 0],
    [1, 0, 0, 0, 1, 0, 0],
    [1, 1, 1, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 0]
];

var start_pos = new Position(2, 1);
var end_pos = new Position(3, 5);

find_path(maze_array, start_pos, end_pos);

/**
 * 从maze_array[2][1]开始，把这个点能到达的邻近点都标记为1（表示与起始点距离为1），
 * 然后把标记为1的点能够到达的邻近点标记为2（表示与起始点距离为2），
 * 如此继续处理，直到到达终点，或者找不到可以到达的邻近点为止。标记后的结构图如下

[ 3, 2, 0, 0, 0, 0, 0 ]
[ 2, 1, 0, 0, 0, 0, 0 ]
[ 1, 0, 1, 2, 0, 0, 0 ]
[ 2, 1, 2, 0, 0, 0, 0 ]
[ 0, 2, 3, 4, 0, 8, 0 ]
[ 0, 0, 0, 5, 6, 7, 8 ]
[ 0, 0, 0, 6, 7, 8, 0 ]
 * 从起始点到终点，需要经过8个点，这是最短的连通路径。
 * 这时，要从终点开始反方向寻找路径，在终点的四周，一定存在一个点被标记为8，
 * 这个标记为8的点的四周一定存在一个点被标记为7，
 * 以此类推，最终找到标记为1的那个点，这个点的四周一定有一个点是起始点。
 */
