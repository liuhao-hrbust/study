function PromiseAll(promiseArr) {
    const res = [];
    let count = 0;
    const { length } = promiseArr;

    return new Promise((resolve, reject) => {
        for (let i = 0; i < promiseArr.length; i++) {
            const p = promiseArr[i];

            p.then(
                result => {
                    res[i] = result;

                    count++;

                    if (count === length) {
                        resolve(res);
                    }
                },
                err => {
                    reject(err);
                }
            );
        }
    });
}

function PromiseRace(promiseArr) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promiseArr.length; i++) {
            const p = promiseArr[i];

            p.then(
                result => {
                    resolve(result);
                },
                err => {
                    reject(err);
                }
            );
        }
    });
}
