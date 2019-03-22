let http = require("http");

let server = http.createServer();

server.on("request", (Req, Res) => {
    console.log("收到了请求");
    console.log(Req.url);
    Res.write("hello");
    Res.end();
});

server.listen(3000, () => {
    console.log("服务启动成功");
});
