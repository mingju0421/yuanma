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
- jsonp
- cors (纯后端)
- postMessage
- document.domain(子域和父域)
- `window.name`
- loacation.hash
- http-proxy
- nginx
- websocket
