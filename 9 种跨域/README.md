## 同源策略
协议 域名 端口号 同域


>http://localhost:8080

> http://localhost:8081

端口号不一致, 跨域

## 浏览器为什么不支持跨域

> 不支持跨域
>>cookie, LocalStorage

>>DOM元素也有同源策略: iframe

>>ajax


## 实现跨域
- jsonp 通过 src 获取数据, 后端返回一个函数调用, 参数就是需要的数据
- cors (纯后端)  后端设置请求头
- postMessage
- document.domain(子域和父域)
- `window.name`
- loacation.hash
- http-proxy
- nginx
- websocket
