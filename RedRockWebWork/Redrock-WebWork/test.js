//1.导入 express
const express = require('express')
//2.创造应用对象
const app = express()
//3.创造路由
app.get('/home',(req,res)=>{
    res.end('hello express')
})
//4.监听端口，启动服务
app.listen(3000,()=>{
    console.log('服务已启动')
})
