/**
 * 冒泡排序
 * 稳定
 * 时间复杂度 n^2 n
 */

function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j + 1], arr[j]);
            }
        }
    }
    return arr;
}

function swap(a, b) {
    temp = a;
    a = b;
    b = temp;
}