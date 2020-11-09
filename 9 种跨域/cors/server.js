const koa = require('koa')
const app = new koa()
const serve = require('koa-static')
app.use(serve(__dirname + '/'))

app.listen(3004, () => console.log(3004))