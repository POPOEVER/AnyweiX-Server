const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./router/router.js')


// 生成实例
const app = express()

// 注册解析器
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({extended:true})
app.use(jsonParser)
app.use(urlencodedParser)

// 解决跨域
app.use(cors())

// 注册静态文件目录
app.use(express.static(__dirname + '/assets'))

router(app)

const server = app.listen(12345, function () {
    console.log("app running on port:",server.address().port);
})
