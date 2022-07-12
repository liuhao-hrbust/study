/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
    const { length } = matrix;

    if (length === 1) {
        return matrix;
    }

    for (let i = 0; i < length; i++) {
        for (let j = 0; j < i; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }

    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length / 2; j++) {
            [matrix[i][j], matrix[i][length - 1 - j]] = [
                matrix[i][length - 1 - j],
                matrix[i][j],
            ];
        }
    }

    return matrix;
};
