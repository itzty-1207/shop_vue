const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const {connect , initSchemas} = require('./database/init.js')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')

app.use(bodyParser());   //为了获取post数据
app.use(cors())
let user = require('./appApi/user.js')
let goods = require('./appApi/goods.js')
//装载所有子路由
let router = new Router();
router.use('/user',user.routes())
router.use('/goods',goods.routes())
//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

//立即执行函数
;(async () =>{
    await connect()
    initSchemas()
})()

app.use(async(ctx)=>{
    ctx.body = '<h1>hello Koa2</h1>'
})

app.listen(3000,()=>{
    console.log('[Server] starting at port 3000')
})