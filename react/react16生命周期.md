# React16.4生命周期

- 在引入react Fiber后，第一周期（Reconciliation Phase）中的生命周期函数可能会被执行多次，为了避免这个问题，react新增了一个render前的生命周期函数**getDerivedStateFromProps**取代了第一周期中的三个，这几个生命周期是被**弃用**了
    - componentWillReceiveProps
    - componentWillMount
    - componentWillUpdate
    保留了shouldComponentUpdate

- getDerivedStateFromProps是一个静态函数，所以在函数体内无法使用this，包括mount和无论什么原因触发的update都会触发这个生命周期执行
```js
static getDerivedStateFromProps(nextProps, prevState) {
  //根据nextProps和prevState计算出预期的状态改变，返回结果会被送给setState
}
```

- 用一个静态函数getDerivedStateFromProps来取代被deprecate的几个生命周期函数，就是强制开发者在render之前只做无副作用的操作，而且能做的操作局限在根据props和state决定新的state，而已。

![image](https://pic1.zhimg.com/80/v2-930c5299db442e73dbb1d2f9c92310d4_hd.jpg)