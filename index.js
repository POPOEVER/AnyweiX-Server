const express = require('express')
// const crypto = require('crypto')
const fs = require('fs')
const http = require('http')
// const httpsRedirect = require('express-https-redirect')
// const https = require('https')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./router/router.js')

// const privateKey  = fs.readFileSync('cert/server.key', 'utf8')
// const certificate = fs.readFileSync('cert/server.crt', 'utf8')
// const credentials = {key: privateKey, cert: certificate}

// 生成实例
const app = express()

// 注册解析器
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({extended:true})

// const handler = function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World\n');
// };

app.use(jsonParser)
app.use(urlencodedParser)
app.use(cors())
// app.use('/',httpsRedirect(true))

router(app)


// your express configuration here

// const httpServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);

// httpServer.listen(12345, function () {
//     console.log("app is running on port:",httpServer.address().port);
// });
// httpsServer.listen(12346,function () {
//     console.log("app is running on secure port:",httpsServer.address().port);
// });

const server = app.listen(12345, function () {
    console.log("app running on port:",server.address().port);
})
