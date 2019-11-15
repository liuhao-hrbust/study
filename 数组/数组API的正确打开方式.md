# 数组API的一些正确打开方式

> 正确使用API，让你搬砖又快又稳。

- 从es5开始，js中出现了多个遍历数组的API，如何用这些高效的API代替for循环，取代for循环后如何能做到更低的复杂度，是提升代码质量的众多方法之一。

## 1.用includes代替indexOf

- indexOf：当数组中不存在这个元素时，返回-1，所以判断indexOf返回的索引值成了我们判断一个数组是否包含某个元素的常用方法，可是在判断元素是否存在时我们想要得到的是**一个布尔值而不是索引**，es6引入的includes方法在语义上和返回值上提供了更好的解决方式。

```js
const characters = [
  'ironman',
  'black_widow',
  'hulk',
  'captain_america',
  'hulk',
  'thor',
];

console.log(characters.indexOf('hulk'));
// 2
console.log(characters.indexOf('batman'));
// -1

console.log(characters.includes('hulk'));
// true
console.log(characters.includes('batman'));
// false
```

## 2.使用find替代filter

- 在某些场景下，我们想要得到数组中满足条件的一项元素，比如在一些学生对象里找到特定number的一项，我们可能会使用filter，filter会返回由满足回调函数条件的元素组成的数组，通过索引0就可以拿到我们的期望值了，而由此带来的后果就是为了找到所有满足条件的元素，必须**把整个数组都遍历一遍，取值的时候还要访问一遍新数组**。
- find就解决了这个问题，find根据在回调函数中的条件找到第一个满足条件的元素直接返回，返回值就是你想要的那一项，而且学生number是不会重复的，同样增强语义化也兼顾了性能。

```js
const characters = [
  { id: 1, name: 'ironman' },
  { id: 2, name: 'black_widow' },
  { id: 3, name: 'captain_america' },
  { id: 4, name: 'captain_america' },
];

function getCharacter(name) {
  return character => character.name === name;
}

console.log(characters.filter(getCharacter('captain_america')));
// [
//   { id: 3, name: 'captain_america' },
//   { id: 4, name: 'captain_america' },
// ]

console.log(characters.find(getCharacter('captain_america')));
// { id: 3, name: 'captain_america' }
```

## 3.使用some替代find

- 判断一个数组中是否存在满足条件的元素时，有多种实现方式，如果是简单类型，可以使用for || indexOf || includes，通过前面的分析可以得出最优解。

- 如果数组中存的是对象类型，indexOf和includes又变得不适用了，map，reduce，forEach当然可以做到这点，但是这几个方法都会完全遍历数组，find会在找到满足条件的第一个元素后就终止遍历，判断返回值是否为undefined即可得到答案，可我们想要得到的不是一个确切的元素，而是布尔值，那么some就比较合适了，some会直接帮助你判断“是”或“否”。

```js
const characters = [
  { id: 1, name: 'ironman', env: 'marvel' },
  { id: 2, name: 'black_widow', env: 'marvel' },
  { id: 3, name: 'wonder_woman', env: 'dc_comics' },
];

function hasCharacterFrom(env) {
  return character => character.env === env;
}

console.log(characters.find(hasCharacterFrom('marvel')));
// { id: 1, name: 'ironman', env: 'marvel' }

console.log(characters.some(hasCharacterFrom('marvel')));
// true
```
## 4.使用reduce替代filter与map的结合

- 想象一个场景，现在需要找到分数高于90分的学生，给这些学生加上标签留做他用，按照需求的步骤，首先在数组中找到所有满足条件的进行缓存，再将结果中的元素加上tag属性，这就涉及到了filter与map，先过滤，再处理。在这种方式中存在的问题就是为了解决这个问题我们写了两个回调函数，创建了两个数组才解决了问题。

- reduce允许你将过滤后切加工过的项放进累加器中。累加器可以是需要待递增的数字、待填充的对象、 待拼接的字符串或数组等。使用reduce可以同时进行上面两个操作，满足条件就放入累加器中，不满足就跳过。

```js
const students = [
  { name: 'ironman', score: 91 },
  { name: 'black_widow', score: 93 },
  { name: 'wonder_woman', score: 80 },
];

console.log(
  students
    .filter(student => student.score >= 90)
    .map(student => student.tag = 'good')
);
// [
//   { name: 'ironman', env: 'marvel', tag: 'good },
//   { name: 'black_widow', env: 'marvel', tag: 'good' }
// ]

console.log(
  students
    .reduce((acc, student) => {
      return student.score >= 90
        ? acc.push({...student, tag: 'good'})
        : acc;
    }, [])
)
// [
//   { name: 'ironman', env: 'marvel', tag: 'good },
//   { name: 'black_widow', env: 'marvel', tag: 'good' }
// ]
```

- 注意：IE中不能使用includes或者find，推荐使用MDN的polyfill。