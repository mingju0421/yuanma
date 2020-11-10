const koa = require('koa')
const app = new koa()
let whitList = ['http://localhost:3004']

app.use((ctx, next) => {
    let { request: { header: { origin } } } = ctx
    console.log(ctx.request)
    // 判断当前的请求源是否允许跨域, 如果允许, 就添加 Access-Control-Allow-Origin
    whitList.includes(origin) && ctx.set('Access-Control-Allow-Origin', origin)
    next()
})
app.use(ctx => {
    // console.log(ctx)
    // const { require: { url } } = ctx
    const { request: { url, query } } = ctx
    console.log(url)
    ctx.body = '3005'
})
app.listen(3005, () => console.log(3005))