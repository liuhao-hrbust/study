function maxSlidingWindow(nums, k) {
    let res = [];
    let q = [];

    for (let i = 0; i < nums.length; ++i) {
        while (q.length && nums[i] > q[q.length - 1]) {
            q.pop();
        }

        q.push(nums[i]);

        const startIdx = i - k + 1;

        if (startIdx < 0) continue;

        res.push(q[0]);
        if (nums[startIdx] === q[0]) q.shift(); // make sure no duplicated one
    }

    return res;
}
