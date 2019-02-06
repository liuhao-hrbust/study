//add(1)传入参数 返回tmp函数 重写toString方法进行计算返回.
//add(1)(2) 2的参数传递给y 进行1+2的计算 然后重新返回tmp函数
//以此类推 最后结果为10
function add(sum) {
    var tmp = function(y) {
        sum = sum + y;
        return tmp;
    };
    tmp.toString = function() {
        return sum;
    };
    return tmp;
}
add(1)(2)(3)(4);
