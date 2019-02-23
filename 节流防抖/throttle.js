var throttle = function(func, delay) {
    var prev = Date.now();
    return function() {
        var context = this;
        var args = arguments;
        var now = Date.now();
        if (now - prev >= delay) {
            func.apply(context, args);
            prev = Date.now();
        }
    };
};
function handle() {
    console.log(Math.random());
}
window.addEventListener("scroll", throttle(handle, 1000));

function throttle(fn, delay) {
    let prev = Date.now;
    return function() {
        let now = new Date();
        if (now - prev > delay) {
            fn.apply(this, args);
            prev = Date.now;
        }
    };
}

function handle(e) {
    console.log(e.target);
}

addEventListener("clock", throttle(handle, 1000));
