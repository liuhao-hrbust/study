//add(1)传入参数 返回tmp函数 重写toString方法进行计算返回.
//add(1)(2) 2的参数传递给y 进行1+2的计算 然后重新返回tmp函数
//以此类推 最后结果为10
function add(sum) {
    var tmp = function(y) {
        sum = sum + y;
        return tmp;
    };
    // tmp.toString = function() {
    //     return sum;
    // };
    return tmp;
}
function add() {
    // 第一次执行时，定义一个数组专门用来存储所有的参数
    var _args = [].slice.call(arguments);
    console.log(_args);
    // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
    var adder = function() {
        var _adder = function() {
            // [].push.apply(_args, [].slice.call(arguments));
            _args.push(...arguments);
            return _adder;
        };

        // 利用隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
        _adder.toString = function() {
            return _args.reduce(function(a, b) {
                return a + b;
            });
        };

        return _adder;
    };
    // return adder.apply(null, _args);
    return adder(..._args);
}

function add() {
    var _args = [...arguments];
    console.log(_args);
    var _add = function() {
        _args.push(...arguments);
        return _add;
    };
    _add.toString = function() {
        return _args.reduce(function(a, b) {
            return a + b;
        });
    };
    return _add;
}

console.log(add(1)(2)(3)(4));
document.getElementById("aaa").innerHTML = add(1)(2)(3)(4);
