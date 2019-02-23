typeof [] // 'object'

let arr = [];
arr instanceof Array  //true

arr.constructor === Array  // true

Array.isArray(arr)  // true

Object.prototype.toString.call(arr)  // "[object Array]"

