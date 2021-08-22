function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let flag = false;

        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                flag = true;
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }

        if (!flag) {
            break;
        }
    }

    return arr;
}

function swap(a, b) {
    let temp = a;
    a = b;
    b = temp;
}

// 解析输入 -> 建立请求 -> 下载资源 -> 解析资源 -> 渲染
// 三次握手原因
// 事件 网络 js引擎 渲染 事件触发
// script defer async
// 防抖
function debounce(cb, delay) {
    let timeout = -1;

    return function(...args) {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            cb.apply(this, args);
        }, delay);
    }
}
// 团队：广告，广告sdk，可视化数据统计，lowcode，电商
// Vue node mongo
// web 8人 项目划分



// 给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。

// 说明:

// 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
// 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。

// 示例:

// 输入:

// nums1 = [1,2,3,0,0,0], m = 3
// nums2 = [2,5,6], n = 3

// 输出: [1,2,2,3,5,6]

function merge(nums1, nums2) {
    let j = 0, k = 0;
}