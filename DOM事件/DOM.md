# DOM

> W3C对DOM的定义是：“一个与系统平台和编程语言无关的接口，程序和脚本可以通过这个接口动态地访问和修改文档的内容，结构，样式”

在HTML发展早期，网页是由纯文档组成的，无法动态改变实现炫丽的交互，如表单验证、轮播特效、小游戏等，为此js应运而生。

学习js分为三大块：基础语法，DOM与BOM。

基础语法部分对于初学者来说比较抽象，但是它规定了js这门语言的基本使用规则，任何功能都要依赖于基础语法的拼装来实现。可是单纯使用基础语法只能够做一些加减乘除等的运算工作。前面说到没有js的网页仅供阅读，为了增强网页的功能，浏览器为js提供了操作文档的API，这就是本篇主要探讨的内容-DOM。

## DOM的构成

> 按照规范制定的先后，DOM分别分为DOM0级，DOM1级，DOM2级和DOM3级，这里对规范与浏览器兼容性不作过多赘述。

DOM（文档对象模型），初步来看分为三个部分：

- 文档（document）：如果没有document，DOM也就无从谈起，document表示由开发者编写的HTML组成的文档结构。

- 对象（object）：浏览器为js提供了一系列操作文档的宿主对象，这些宿主对象是DOM API的实例，js通过这些对象来进行有关DOM的操作。

- 模型（modal）：DOM把一份文档映射为一棵树，将组成文档的各个节点的关系用树的节点关系来表示，于是DOM节点就有了层次，有了前后关系。

## DOM中的节点-Node

DOM中的所有节点继承自同一基类型：Node（节点）类型。除了IE以外，在所有浏览器中都可以访问到这一类型，Node类型的实例中有一个nodeType属性，保存着节点类型的相关信息，通过nodeType与节点类型表的比较可以确定当前节点所属类型。

因为DOM是以树形结构保存的，所以节点间就有了位置上的联系，每个节点都有childNodes属性与parentNode属性，childNodes保存着一个NodeList对象，NodeList对象是一种类似数组的对象，通过索引的方式即可访问其中的元素，使用一些生成数组的方式也可以将其转换为数组，如扩展运算符，Array.prototype.slice等。

```js
    var firstChild = someNode.childNodes[0];
    var secondChild = someNode.childNodes.item(1);
    var count = someNode.childNodes.length;
    var arrayOfNodes = Array.prototype.slice.call(someNode.childNodes,0);
```

除此之外，节点间还有前后的关系，使用nextSibling与previousSibling属性表示，有了以上属性就可以快速定位一个元素的父子节点和兄弟节点了。

![image](https://note.youdao.com/yws/public/resource/3da3e0371ceaa1192d223135911f773a/xmlnote/9A23A4BF1D2842C798FB8C3F39C427C9/6264)

在定位到这些节点后如果要对其进行结构上的变化，以下几个方法提供了操作DOM结构的功能：

- appendChild：向childNodes列表的末尾添加一个节点。
- insertBefore：向目标节点前面添加一个节点。
- replaceChild：替换/删除一个节点。

> 以上几个方法生效后，相关节点的前后指针和childNodes等属性会立即得到更新，如果在操作之前缓存了childNodes的值，那么不需要重新获取即可得到刷新后的列表。

## Document类型

JavaScript通过Document类型表示文档。在浏览器中，document对象是HTMLDocument（继承自Document 类型）的一个实例，表示**整个HTML页面**。而且，document对象是window对象的一个属性，因此可以将其作为全局对象来访问。同样地，Document节点也继承自Node类型，所以也具有nodeType、parentNode等属性。

对于开发者来说，document对象包含了一些网页开发常用的属性

- body：表示body元素
- title：包含着 \<title>元素中的文本--显示在浏览器窗口的标题栏或标签页上。通过这个属性可以取得当前页面的 标题，也可以修改当前页面的标题并反映在浏览器的标题栏中。修改 title 属性的值不会改变\<title> 元素。

除此之外，使用document获取节点是开发中最高频的操作，document提供了以下几个方法来获取特定节点：

- getElementById：如果找到相应的元素则返回该元素，如果不存在带有相应ID的元素，则返回null。参数区分大小写。

- getElementsByTagName：通过标签名查找元素，返回值为一个HTMLCollection对象。

- querySelector：接收一个 CSS 选择符，返回与该模式匹配的第一个元素，如果没有找到匹 配的元素，返回 null。
- getEmelentByClassName：通过类名查找元素，返回值为一个HTMLCollection对象。
