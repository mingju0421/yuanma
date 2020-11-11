# cookies、 sessionStorage和localstorage区别

  特性| cookie   | sessionStorage  | localStorage
 |-- | --  | --  | --
 数据生命周期  | 生成时就会被指定一个 maxAge 值, 这就是 cookie 的生存周期, 在这个周期内 cookie 有效, 默认关闭浏览器失效 | 页面会话期间可用 | 除非数据被清除, 否则一直存在
 存放数据大小  | 4K 左右(每次 http 请求都会携带 cookie) | 一般 5M 或者更大 | 一般 5M 或者更大
与服务器通信 | 由于对服务器的请求来传递, 每次都会携带在 HTTP 头中, 如果使用 cookie 保存过多数据, 会带来性能问题 | 不参与和服务器通信 | 不参与和服务器通信
易用性 | cookie 需要自己封装 setCookie, getCookie | 可以用原生接口, 也可以再次封装来对 Object 和 Array 有更好的支持 | 可以用原生接口, 也可以再次封装来对 Object 和 Array 有更好的支持 


# cookie 操作
```javascript
// 读取
function getCookie(name) {
    let list, reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`)
    return (list = document.cookie.match(reg)) && list[2] || null
}
// 设置
function setCookie(name, value) {
    let days = 30
    let exp = new Date()
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `name=${escape(value)};expires=${exp.toGMTString()}`
}
// 删除
function delCookie(name) {
    let exp = new Date()
    exp.setTime(exp.getTime() - 1)
    let cval = getCookie(name)
    if(cval != null) document.cookie = `name=${cval};expires=${exp.toGMTString()}` 
}
```