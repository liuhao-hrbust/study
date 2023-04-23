const identity: <T>(x: T) => T = x => x;

let as = 1;

let b = '';
const n: 1 = identity(1);

b = identity(as);

let c = identity(as) + 1;

console.log(b);
