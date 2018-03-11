const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./router.js')


// 生成实例
const app = express()

// 注册解析器
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({extended:true})


app.use(jsonParser)
app.use(urlencodedParser)

// 解决跨域
app.use(cors())
app.use(express.static(__dirname + '/assets'))

router(app)

const server = app.listen(12345, function () {
    console.log("app running on port:",server.address().port);
})
