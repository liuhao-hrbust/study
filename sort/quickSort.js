// 先找到一个基准点（一般指数组的中部），然后数组被该基准点分为两部分，
// 依次与该基准点数据比较，如果比它小，放左边；反之，放右边。
// 左右分别用一个空数组去存储比较后的数据。
// 最后递归执行上述操作，直到数组长度 <= 1;

function quickSort(arr) {
    if (arr.length < 2) {
        return arr;
    }

    const midIndex = Math.floor(arr.length / 2);

    const midIndexVal = arr.splice(midIndex, 1);

    const left = [];
    const right = [];

    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];

        if (item > midIndexVal) {
            right.push(item)
        }
        else {
            left.push(item);
        }
    }

    return quickSort(left).concat(midIndexVal, quickSort(right));
}