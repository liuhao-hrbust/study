function jsonp({ url, params, cb }) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        let arr = [];
        params = { ...params, cb };
        for (const key in params) {
            arr.push(`${key}=${params[key]}`);
        }
        window[cb] = function(data) {
            resolve(data);
            document.body.removeChild(script);
        };
        script.src = `${url}?${arr.join("&")}`;
        document.body.appendChild(script);
    });
}

jsonp({
    url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
    params: {
        wd: "跨域"
    },
    cb: "search"
}).then(data => {
    document.body.innerHTML = JSON.stringify(data);
    console.log(data);
});
