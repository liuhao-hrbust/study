/**
 * @description 盛水最多的容器
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let l = 0;
    let r = height.length - 1;
    let maxArea = Math.min(height[l], height[r]) * (r-l);
    while (l < r) {
        let area = Math.min(height[l], height[r]) * (r-l);
        if (height[l] <= height[r]) {
            l++;
        } else {
            r--;
        }
        if (area > maxArea) {
            maxArea = area;
        }
    }
    return maxArea;
};
var height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
console.log(maxArea(height));
