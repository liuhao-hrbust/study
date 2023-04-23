const arr = [
    { id: 2, title: '部门2', pid: 1 },
    { id: 3, title: '部门3', pid: 1 },
    { id: 1, title: '部门1', pid: 0 },
    { id: 4, title: '部门4', pid: 3 },
    { id: 5, title: '部门5', pid: 4 },
];
/*
[
    {
        "id": 1,
        "title": "部门1",
        "pid": 0,
        "children": [
            {
                "id": 2,
                "title": "部门2",
                "pid": 1,
                "children": []
            },
            {
                "id": 3,
                "title": "部门3",
                "pid": 1,
                "children": []
            }
        ]
    }
]
*/
const arrayToTree = (source, rootId) => {
    let res = [];
    let temp = {};

    source.forEach(item => {
        temp[item.id] = {
            ...item,
            children: temp[item.id] ? temp[item.id].children : [],
        };

        if (item.pid === rootId) {
            res.push(temp[item.id]);
        }

        if (temp[item.pid]) {
            temp[item.pid].children.push(temp[item.id]);
        } else {
            temp[item.pid] = { children: [temp[item.id]] };
        }
    });

    return res;
};

console.log(JSON.stringify(arrayToTree(arr, 0)));


<Component onClick={() => {console.log('1')}} ref={componentRef} />
componentRef.addEventListener('click', () => {console.log('2')})
document.addEventListener('click', () => {console.log('3')})

async function async1() {
    console.log('1')
    await async2()
    console.log('2')
}

async function async2() {
    console.log('3')
}

console.log('4')

setTimeout(function() {
    console.log('5')
}, 0)

async1()

new Promise(function(resolve) {
    console.log('6')
    resolve()
}).then(function() {
    console.log('7')
})

console.log('8')

// 4 1 3 6 8 2 7 5


<div>
    <div>。</div>
    <div>。</div>
    <div>。</div>
</div>
。
  。
    。
    
interface Demo{
    a?:string
}
interface Demo{
    b?:number
}

Partital<{a: number}>
	
	