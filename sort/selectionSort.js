/**
 * 选择排序
 * 时间复杂度 O(n^2)
 * 不稳定
 */

 function selectionSort(arr) {
     let minIndex = 0;
     for (let i = 0; i < arr.length; i++) {
         minIndex = i;
         for (let j = i + 1; j < arr.length; j++) {
             if (arr[j] < arr[minIndex]) {
                 minIndex = j;
             }
         }
         swap(arr[i], arr[minIndex]);
     }
 }

