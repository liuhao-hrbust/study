# Same-origin policy

> 同源策略
>

The same-origin policy is a critical security mechanism that restricts how a document or script loaded by one origin can interact with a resource from another origin.

> 同源策略是一个限制了从一个来源加载的文档或脚本 可以怎样被另一个来源的资源交互的 关键安全机制。
>

It helps isolate potentially malicious documents, reducing possible attack vectors. For example, it prevents a malicious website on the Internet from running JS in a browser to read data from a third-party webmail service (which the user is signed into) or a company intranet (which is protected from direct access by the attacker by not having a public IP address) and relaying that data to the attacker.

> 同源策略可以隔离潜在的恶意的文档，减少可能的攻击载体。比如，它可以阻止Internet上由浏览器运行的通过JS脚本运行的恶意网站读取用户已经登录的第三方邮件服务数据，
或者由这个网站来攻击公司内网（因为攻击者没有公司的公网IP，所以不能直接攻击），然后将数据转发给攻击者。
>

## Definition of an origin

> origin(来源)的定义


Two URLs have the same origin if the protocol, port (if specified), and host are the same for both. You may see this referenced as the "scheme/host/port tuple", or just "tuple". (A "tuple" is a set of items that together comprise a whole — a generic form for double/triple/quadruple/quintuple/etc.)

> 如果两个URL的协议、端口（如果指定了）、域名相同，我们就说它们是同源的。这也被称为“协议/主机/端口元组”，或者是“元组”。元组指的是由几个部分组成的整体，两个、三个或多个这样。


The following table gives examples of origin comparisons with the URL `http://store.company.com/dir/page.html：`

> 下面是与`http://store.company.com/dir/page.html 从origin`方面进行对比的几个例子：


| URL | Outcome | Reason |
| --- | --- | --- |
| http://store.company.com/dir2/other.html | Same Origin |  |
| http://store.company.com/dir/inner/another.html | Same Origin |  |
| https://store.company.com/page.html | Failure |  |
| http://store.company.com:81/dir/page.html | Failure |  |
| http://news.company.com/dir/page.html | Failure |  |
|  |  |  |