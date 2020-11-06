const Koa = require('koa')
const app = new Koa()

app.use(ctx => {
    const { request: { url, query } } = ctx
    console.log(url)
    if (/^\/say/.test(url)) {
        let { wd, cb } = query
        console.log(wd, cb)
        ctx.body = `${cb}('好困')`
    }
})
app.listen(3004, () => {
    console.log(3004)
})