/**
 * 防抖
 */


function debounce(fn, wait) {
    var timeout = null;
    return function() {
        if (timeout !== null) clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
    };
}
// 处理函数
function handle() {
    count++;
    console.log("点击了", count, "次");
}
// 滚动事件
window.addEventListener("click", debounce(handle, 1000));