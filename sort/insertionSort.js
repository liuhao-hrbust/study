/**
 * 插入排序
 */

 function insertionSort(arr) {
     for (let i = 0; i < arr.length; i++) {
         let current = arr[i];
         let prevIndex = i - 1;
         while (prevIndex >= 0 && current < arr[prevIndex]) {
             arr[prevIndex + 1] = arr[prevIndex];
             prevIndex --;
         }
         arr[prevIndex + 1] = current;
     }
     return arr;
 }
 function swap(a, b) {
    temp = a;
    a = b;
    b = temp;
}

var arr = [1, 5, 3 ,2, 4];
insertionSort(arr);