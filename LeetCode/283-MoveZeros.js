function moveZeros(arr) {
    let k = 0;

    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if (element) {
            swap(arr[index], arr[k++]);
        }
    }

    return arr;
}

const arr = [0, 1, 0, 2, 3];

console.log(moveZeros(arr));

const swap = (a, b) => {
    const temp;
    temp = a;
    a = b;
    b = temp;
}