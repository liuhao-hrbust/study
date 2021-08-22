// function f() {
//     let value = 0;

//     return function a() {
//         return value++;
//     };
// }

// const a = f();

// console.log(a());
// console.log(a());
// console.log(a());

/**
 * 有这样一个结构
 *
 * interface ANode {
 *   name: string
 *   children: ANode[]
 * }
 *
 * 请写一个方法打印该结构 name，测试数据如下，要求打印该测试数据 name 的顺序为 root, child_0, child_1, child_0_0, child_1_0
 *
 */

const data = {
    name: 'root',
    children: [
        {
            name: 'child_0',
            children: [
                {
                    name: 'child_0_0',
                    children: [],
                },
            ],
        },
        {
            name: 'child_1',
            children: [
                {
                    name: 'child_1_0',
                    children: [],
                },
            ],
        },
    ],
};

function f(data) {
    const res = [];
    let queue = data.children;
    res.push(data.name);

    while (queue.length) {
        [...queue].forEach(child => {
            res.push(child.name);
            queue.shift();
            child.children && queue.push(...child.children);
        });
    }

    return res;
}

console.log(f(data));

const p = new Promise((resolve, reject) => {
    console.log(1)
    resolve()
    console.log(2)
});

Promise.resolve().then(() => {
    console.log(3)
})

p.then(() => {
    console.log(4)
})

console.log(5)