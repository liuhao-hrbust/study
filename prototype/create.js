// new的实现

function create() {
    let obj = new Object();
    let con = [].prototype.shift.call(arguments);
    obj._proto_ = con.prototype;
    let object = con.apply(obj, [...arguments]);
    return typeof object === 'object' ? object : obj;
}
