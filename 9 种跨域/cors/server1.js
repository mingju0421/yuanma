const koa = require('koa')
const app = new koa()
app.use(ctx => {
    // const { require: { url } } = ctx
    const { request: { url, query } } = ctx
    console.log(url)
    ctx.body = '3005'
})
app.listen(3005, () => console.log(3005))