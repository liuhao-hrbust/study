# 译spa-seo

> [原文链接](https://medium.com/@l.mugnaini/spa-and-seo-is-googlebot-able-to-render-a-single-page-application-1f74e706ab11)

> Googlebot能适当地渲染spa和发送ajax请求

---

为了搞清楚谷歌搜索引擎如何对单页面进行处理，我进行了一些实验，实验的网站是使用Elm构建生成的，但像React,Angular等其他语言或库应该有相同的结果。

## 实验结果

1. Googlebot能执行页面上的js，并且ajax请求也能正常发送

2. Googlebot在每个页面拍摄快照前会等待5-20秒

3. 根据Google Search Console要求进行的抓取（T5）与Google进行的“自然抓取”（T20）是不同的

4. T5在请求完成后5秒左右获取快照，T20在请求完成后20秒左右拍摄快照

5. 页面不同部分获取快照的时间是不同的。例如，在自然抓取中，title标签一般为T19，meta标签为T20

6. 在一些不可能的情况下也会拍摄快照，这有些难以理解，例如页面在五秒时拍摄了快照，但页面展示了十秒后返回请求的效果。

## 实验方法

实验所用网站是由spa构成：

- 使用了[Elm 0.18](http://elm-lang.org/)
- 使用 pushState 进行页面跳转
- 使用斜杠进行url结构分割

网站有五个页面

1. http://elm-spa-seo-testing.guupa.com/
2. http://elm-spa-seo-testing.guupa.com/section1
3. http://elm-spa-seo-testing.guupa.com/section2
4. http://elm-spa-seo-testing.guupa.com/section3
5. http://elm-spa-seo-testing.guupa.com/sitemap

页面会自动更新title和meta标签，这使得当GoogleBot进行遍历时可以知道当前页面的状态（由多个参数组成）。有三种事件可以改变页面状态：

1. 时间：每秒改变
2. A类型的请求：这些请求发送前会有不同的延迟
3. B类型的请求：请求会在一开始就发送，但是会在不同延迟后得到相应

两种请求的延迟时间都是从[0, 1, 3, 6, 10]中取的，单位秒

下面是请求的顺序

![请求顺序](https://i.gsxcdn.com/0cms/d/file/content/2020/04/5e9e554c15121.png)

下面是title的变化历史，顺序是从下往上，从 “No JS, No Ajax”开始，那是当搜索引擎没有执行js时的遍历顺序

![title的变化历史](https://i.gsxcdn.com/0cms/d/file/content/2020/04/5e9e558753a68.png)

> 注：这是[Elm debugger](http://elm-lang.org/blog/the-perfect-bug-report)的页面，点击屏幕右下角的按钮即可激活。

## 结果

这是初步试验获得的结果：

```
╒═════╤══════╤════╤══════╤══════╤══════════════════════╤═══════════╕
│Vers.│ Time │Hist│ Type │ Type │        Date          │   Page    │
│     │      │ory │  A   │   B  │                      │           │
╞═════╪══════╪════╪══════╪══════╪══════════════════════╪═══════════╡
│   1 │      │  1 │    0 │  NaN │ 2017-08-18           │ /         │
│   1 │      │  1 │   10 │    6 │ 2017-08-19           │ /         │
│   3 │      │  1 │    0 │    3 │ 2017-08-20           │ /         │
│   4 │      │  1 │    0 │  NaN │ 2017-08-21T19:35:57Z │ /         │
│   4 │    5 │  1 │    0 │    1 │ 2017-08-24T15:32:53Z │ /section1 │
│   4 │    5 │  1 │    0 │    1 │ 2017-08-24T15:32:57Z │ /         │
│   7 │    5 │  1 │    0 │    6 │ 2017-08-28T07:44:57Z │ /         │
│   7 │   19 │  1 │   10 │   10 │ 2017-08-28T00:00:00Z │ /         │
│   7 │   19 │  1 │   10 │   10 │ 2017-08-30T00:00:00Z │ /sitemap  │
│   7 │   19 │  1 │   10 │   10 │ 2017-09-03T00:00:00Z │ /sitemap  │
│   7 │   20 │  1 │   10 │   10 │ 2017-09-06T00:00:00Z │ /section1 │
│   7 │   20 │  1 │   10 │   10 │ 2017-09-07T00:00:00Z │ /section2 │
│   7 │    5 │  1 │    0 │    1 │ 2017-09-09T13:33:50Z │ /section3 │
│   7 │   20 │  1 │   10 │   11 │ 2017-09-10T00:00:00Z │ /section2 │
╘═════╧══════╧════╧══════╧══════╧══════════════════════╧═══════════╛
```

Googlebot在为页面拍摄快照前会等待5-20秒。在等待时间小于五秒时，无论是A或B类型的请求结果看起来都与这一结论不一致

这是一个在2017年8月24日的[搜索结果](https://www.google.co.jp/search?q=site:elm-spa-seo-testing.guupa.com)

![搜索结果](https://i.gsxcdn.com/0cms/d/file/content/2020/04/5e9e55d3a10a9.png)

我们可以从网页描述和标题中获取下面的信息：

```
V5,T5,H7,A0,B3,2017-08-24T16:46:04Z,/section1
```

- **V5** 代码的版本
- **T5** Googlebot拍摄快照前经过的时间，单位秒
- **H7** 点击的次数或History中的数据条数。当浏览网站的时候这个数字会增长。因为Googlebot不会点击链接而是重新发送http请求，所以常常可能会得到的值为1
- **A0** A类型的请求在0秒得到了第一个响应
- **B3** B类型的请求在第三秒得到了相应
- **2017–08–24T16:46:04Z** 页面被遍历的时间戳
- **/section1** 页面的路径

我将标题放在了body里并使用大字体展示，这样就可以在Google Search Console中的Fetch as Google一栏看清小缩略图了。这个页面展示的结果与Google搜索的结果不同。可能是创建这些快照和搜索引擎创建快照使用了不同的程序。

![Screenshot of the “Fetch as Google” section of the Google Search Console](https://i.gsxcdn.com/0cms/d/file/content/2020/04/5e9e55f39094f.png)

## 神秘的不可能情况

另一个要记录的事情就是快照的时间是**T5**但是ajax得到相应的时间是**B10**。对于这个页面来说是个不可能的状态。这意味着快照是在页面载入5秒时创建的，但是B类型请求得到答复的时间是B10。下面是一个典型的title历史，可以看到并没有类似T5和B10同时记录的情况：

```
V7,T6,H1,A6,B6,2017-08-28T12:57:20Z,/
V7,T6,H1,A6,B3,2017-08-28T12:57:20Z,/
V7,T6,H1,A3,B3,2017-08-28T12:57:20Z,/
V7,T5,H1,A3,B3,2017-08-28T12:57:20Z,/
V7,T4,H1,A3,B3,2017-08-28T12:57:20Z,/
V7,T3,H1,A3,B3,2017-08-28T12:57:20Z,/
V7,T3,H1,A3,B1,2017-08-28T12:57:20Z,/
V7,T3,H1,A1,B1,2017-08-28T12:57:20Z,/
V7,T2,H1,A1,B1,2017-08-28T12:57:20Z,/
V7,T1,H1,A1,B1,2017-08-28T12:57:20Z,/
V7,T1,H1,A1,B0,2017-08-28T12:57:20Z,/
V7,T1,H1,A0,B0,2017-08-28T12:57:20Z,/
V7,T0,H1,A0,B0,2017-08-28T12:57:20Z,/
V7,T0,H1,A0,B[NaN],2017-08-28T12:57:20Z,/
V7,T0,H1,A[NaN],B[NaN],2017-08-28T12:57:20Z,/
No JS, No Ajax
```

在T5的时候，通常的记录是**A3**和**B3**。

## Google Search Console的抓取（T5）与Google进行的“自然抓取”（T20）是不同的

- Google Search Console的抓取不会超过10秒，通常在拍摄快照前要等待5秒左右（这就是为什么叫它T5）。这里的时间戳是一个确定的时间，如13:55:50

- 原生的抓取会在拍摄快照前等待更长时间（19~20秒，这就是为什么叫T20）。这种方式经常使用00:00:00时间戳

## 20170830的搜索结果

![30 August 2017的搜索结果](https://i.gsxcdn.com/0cms/d/file/content/2020/04/5e9e562a0aa65.png)

## 20170910的搜索结果

不同类型的title混在了一起。其中的一些反映了HTML title元素，其他是从页面内容中提取的

![10 September 2017的搜索结果](https://i.gsxcdn.com/0cms/d/file/content/2020/04/5e9e56af46b51.png)

## 20170926的搜索结果

这是第一次所有页面都在T20被收录。记录显示当meta描述在T20时，title总是在T19，这有些奇怪，因为这两个值应该是相同的。A和B类型的请求都是10。

![26 September 2017的搜索结果](https://i.gsxcdn.com/0cms/d/file/content/2020/04/5e9e56e35428a.png)

## 20171002的搜索结果

相对于9月26日的搜索结果有两项更新了。一项是从9月25号变成了9月26号。看起来是爬取和发布中间有些延迟。

![20171002的搜索结果](https://i.gsxcdn.com/0cms/d/file/content/2020/04/5e9e5704b54b6.png)

## 20171019的搜索结果

![](https://i.gsxcdn.com/0cms/d/file/content/2020/04/5e9e5729d658c.png)

## 20171108的搜索结果

看起来sitemap和其它的页面被奇怪的robots.txt给阻止了。或许是我的账号被黑了？
实际的结果是我没被黑，但是surge.sh改变了他们的策略。
我恢复了原始的robots.txt，一起看看接下来的几天发生了什么。

原始的robots.txt

```
User-agent: *
Disallow:
Sitemap: http://elm-spa-seo-testing.surge.sh/sitemap.txt
```

错误的版本

```
User-agent: *
Disallow: /
```

![](https://i.gsxcdn.com/0cms/d/file/content/2020/04/5e9e5757043d4.png)
![](https://i.gsxcdn.com/0cms/d/file/content/2020/04/5e9e577a0f126.png)

---

## 20171127更新

不幸的是surge.sh改变了他们对robots.txt的策略。所以挂载在这个域下的所有页面都不能被收录了。我把这个站点暂时移动到了 https://elm-spa-seo-testing.guupa.com/
下。Google还没有对其进行收录，我刚在Google Search Console注册了账号然后提交了新的url。

![](https://i.gsxcdn.com/0cms/d/file/content/2020/04/5e9e57afece0a.png)

几分钟后Google就收录了新的站点：

![](https://i.gsxcdn.com/0cms/d/file/content/2020/04/5e9e57d446061.png)

## 20171128的搜索结果

24小时后第一个T20出现了

![](https://i.gsxcdn.com/0cms/d/file/content/2020/04/5e9e581f33283.png)

## 20171130的搜索结果

Google更新了其他两条结果。其中一个创建了自己的title。我相信Google如果认为原始的title没有什么意义就会生成新title。在这里我想Google应该是对这些字母和数字感到了困惑。

观察Google如何保持一致也很有趣，在title中展示T19，在meta中展示T20.看起来好像是页面的不同位置会在不同时间渲染一样。

![](https://i.gsxcdn.com/0cms/d/file/content/2020/04/5e9e581f7be4a.png)

## 2017年12月5日更新

因为Google没有收录V9版本，所以我决定主动在Search Console中请求建立索引。

在Fetch as Google中我又一次见到了不可思议的快照，快照是在T5时创建的，但是B类型的请求已经得到了B10的结果。

我没想到T5，B10的情况会发生。如果你有任何见解，请在下面留言。

![](https://i.gsxcdn.com/0cms/d/file/content/2020/04/5e9e581facf10.png)

过了几秒Google更新了搜索结果。新的版本(V9)出现在了第一个结果位置。

在head部分的title元素应该展示像“SPA and SEO Testing — V9,T5,H1,A0,B[NaN],2017–12–05T08:07:51Z,/” 的结果，但是Google决定使用简单的title，大概是从h1元素中取的。

还要注意的是T5，B10这个不可能的情况被另一个可能的但是很奇怪的“T5,B[NaN]”替代了。NaN意味着Elm创建了页面，但是还没有任何响应返回。在T5的时候，A和B类型的请求都应该收到了3秒时的响应(A3,B3)。

![](https://i.gsxcdn.com/0cms/d/file/content/2020/04/5e9e581fead7d.png)

## 2017年12月13日更新

一条结果同时展示了两个页面版本。这明显是另一种意外情况。看起来Google会在不同时间渲染页面不同的部分。这和我之前提到的同时出现T19和T20是相同的问题。

![](https://i.gsxcdn.com/0cms/d/file/content/2020/04/5e9e5820336e2.png)
