# Fiber与react新生命周期

## Fiber是什么

- 伴随着React16发布的新功能，官方的一句话解释是“React Fiber是对核心算法的一次重新实现”。

## 没有Fiber之前的React

> 同步任务时间可能过长

- 当react执行组件加载和组件更新时，采用了同步的方式，把所有生命周期跑一遍，直至没有钩子函数可执行，由此带来的问题就是当这个同步任务特别复杂时，可能会执行几百毫秒甚至更长时间，同步任务完全占据了js引擎线程，由此带来的表现就是用户无法和页面进行交互，对于用户来说这就是页面卡顿，是一个减分项。

- 下图为传统方式更新的react调用栈示意图，调用栈很深，且因为要执行的任务很多，调用栈长时间不会执行完毕

 ![image](https://pic1.zhimg.com/80/v2-d8f4598c70df94d69825f11dfbf2ca2c_hd.png)

### 如何解决同步任务时间过长的问题

- 采用分片的方式，将多个同步任务按照执行顺序进行分片，同步任务的总时间没有缩短，但有了更小的可控制单位，当执行完一小片之后，将线程控制权交给负责任务协调的模块，检查是否有高优的任务等待执行，如果有就优先执行高优任务，如果没有高优任务就继续向下执行，在react中维护每一个分片的数据结构，就是Fiber。

- 下图为经过分片的更新过程调用栈示意图，可以发现庞大的任务经过分片后，子任务的划分更加明确，在每个波峰处都可以调用其他任务，程序可控性更强

![image](https://pic1.zhimg.com/80/v2-78011f3365ab4e0b6184e1e9201136d0_hd.png)

## 使用React Fiber对现有代码的影响

- 在React Fiber中，一次更新过程会分成多个分片完成，所以完全有可能一个更新任务还没有完成，就被另一个更高优先级的更新过程打断，这时候，优先级高的更新任务会优先处理完，而低优先级更新任务所做的工作则会完全作废，然后等待机会**重头再来**。

- 因为一个更新过程可能被打断，所以React Fiber一个更新过程被分为两个阶段(Phase)：第一个阶段Reconciliation Phase和第二阶段Commit Phase。

- 在第一阶段Reconciliation Phase，React Fiber会找出需要更新哪些DOM，这个阶段是可以被打断的；但是到了第二阶段Commit Phase，那就一鼓作气把DOM更新完，绝不会被打断。

- 阶段划分是根据render函数为界的，render及render之前的生命周期函数属于第一周期，包括
    - componentWillMount
    - componentWillReceiveProps
    - shouldComponentUpdate
    - componentWillUpdate
- 第二周期包括
    - componentDidMount
    - componentDidUpdate
    - componentWillUnmount

- 因为第一阶段的生命周期可能会被打断作废而再次执行，一些有副作用的操作不要放在第一周期中
