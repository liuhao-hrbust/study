// 主线程
let main = new Worker('my_task.js');
main.postMessage([1, 3]);
main.onmessage = (e) => {
    console.log(e.data);
}

// worker线程
onmessage = function(e) {
    postMessage(e,data.length);
}