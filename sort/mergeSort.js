// 合并两个有序数组
function merge(arr1, arr2) {
    // console.log(arr1, arr2, '22222')
    let res = [];

    while (arr1.length && arr2.length) {
        if (arr1[0] > arr2[0]) {
            res.push(arr2.shift());
        }
        else {
            res.push(arr1.shift());
        }
    }

    if (arr1.length) {
        res = res.concat(arr1)
    }
    if (arr2.length) {
        res = res.concat(arr2)
    }

    console.log(res);

    return res;
}

function mergeSort(arr) {
    const {length} = arr;
    const mid = Math.floor(length / 2);

    if (length < 2) {
        return arr;
    }

    return merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)))
}

// 测试
const arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.time('归并排序耗时');
console.log('arr :', mergeSort(arr));
console.timeEnd('归并排序耗时');
// arr : [2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
// 归并排序耗时: 0.739990234375ms
