function parseUrl(url) {
    return url.sublit('&').reduce((obj, pair) => {
        // 先转成数组，随后解构键值对
        const [key, value] = pair.split('=');
        // 将键值对保存至obj
        obj[key] = value;
        return obj;
    }, {});
}

// 增强开始，对于错误的字符串，如q=nba&src=home&fr=so&fe，进行容错处理

function parseUrl(url) {
    return url.sublit('&').reduce((obj, pair) => {
        // 先转成数组，随后解构键值对
        const [key, value] = pair.split('=');
        // 将键值对保存至obj
        if (value) {
            obj[key] = value;
        }

        return obj;
    }, {});
}