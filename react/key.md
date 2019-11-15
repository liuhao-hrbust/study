# react key值规则

对于通过数组动态创建的一组元素，react会要求开发者为每个元素提供唯一标识来为更新过程减轻性能负担，不提供就warning，但是还是能正常渲染，但是如果开发者提供了错误的key值，react会根据默认的原则渲染出出乎意料的结果。

更新前后：

- key值有变化，删除key值不存在的节点，创建新增key值的节点，这两种方式都不会向下层节点再比较。

- key值没有变化，比较节点属性，判断是否需要更新，下层节点会进行比较。

由更新过程的表现可以得出：key值要**稳定**，不能用不可预测的random，这样会导致即使更新前后没有变化的元素key值改变而强制删除新建，影响性能。

除此之外，key值还要**唯一**，react把key值不唯一的后果让开发者自己承担：react认为开发者会对同一组元素提供不同的key值，如果提供的key值有重复，那么就只展示相同key值中的第一个元素，导致数据展示不全的问题。

> 参考资料
> [[React技术内幕] key带来了什么](https://juejin.im/post/59abb01c518825243f1b6dad)
> [React中key的用处](https://www.jianshu.com/p/0c9a8a90c40d)
> [React 源码剖析系列 － 不可思议的 react diff](https://www.zhihu.com/search?type=content&q=react%20diff)