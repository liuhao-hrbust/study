// console.log('start');

// setTimeout(() => {
//     // callback1
//     console.log(111);
//     setTimeout(() => {
//         // callback2
//         console.log(222);
//     }, 0);
//     setImmediate(() => {
//         // callback3
//         console.log(333);
//     });
//     process.nextTick(() => {
//         // callback4
//         console.log(444);
//     });
// }, 0);

// setImmediate(() => {
//     iuuuuuuuuuuu8ik2qwa// callback5
//     console.log(555);
//     process.nextTick(() => {
//         // callback6
//         console.log(666);
//     });
// });

// setTimeout(() => {
//     // callback7
//     console.log(777);
//     process.nextTick(() => {
//         // callback8
//         console.log(888);
//     });
// }, 0);

// process.nextTick(() => {
//     // callback9
//     console.log(999);
// });

// console.log('end');

console.log('1');

setTimeout(function () {
    console.log('2');
    process.nextTick(function () {
        console.log('3');
    });
    new Promise(function (resolve) {
        console.log('4');
        resolve();
    }).then(function () {
        console.log('5');
    });
});

new Promise(function (resolve) {
    console.log('7');
    resolve();
}).then(function () {
    console.log('8');
});
process.nextTick(function () {
    console.log('6');
});

setTimeout(function () {
    console.log('9');
    process.nextTick(function () {
        console.log('10');
    });
    new Promise(function (resolve) {
        console.log('11');
        resolve();
    }).then(function () {
        console.log('12');
    });
});

function Foo() {
    Foo.a = function () {
        console.log(1);
    };

    this.a = function () {
        console.log(2);
    };
}

Foo.prototype.a = function () {
    console.log(3);
};

Foo.a = function () {
    console.log(4);
};

Foo.a();
let obj = new Foo();
obj.a();
Foo.a();

let arr = [
    ['内容1', '内容2'],
    ['内容3', '内筒4'],
];

arr.map((item, index) =>
    item.reduce(
        (prev, content, i) => ({
            ...prev,
            [`content${i + 1}`]: content,
        }),
        { key: index + 1 }
    )
);
