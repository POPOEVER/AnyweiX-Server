const http = require('http')
const fs = require('fs')
var SOURCES, UA

const wxParser = require('../utils/wx.parser')

// 读取抓取源列表
fs.readFile('json/sources.json', 'utf8', (err, data) => {
	if (err) throw err
	SOURCES = JSON.parse(data)
})

// 读取 User-Agent 列表
fs.readFile('json/ua.json','utf8', (err, data) => {
	if (err) throw err
	UA = JSON.parse(data)
})


function getResult(req, success) {
	console.log(req)
	let param = {
		hostname: SOURCES.wechat.base_url,
		headers: { // 随机模拟 UA
			'User-Agent': UA.browser[Math.floor(Math.random() * UA.browser.length)].value
		},
		action: req.action
	}
	switch (req.action) {
		case 'hotwords': // 查询热词
			param.path = SOURCES.wechat.action.hotwords
			break
		case 'toparticles': // 查询热文
			param.path = SOURCES.wechat.action.hotwords
			break
		case 'loadmorearticles': // 加载更多热文
			param.path = SOURCES.wechat.action.load_more_articles + req.category + '/' + req.page + '.html'
			break
		case 'search': // 关键字查询返回文章列表
			param.path = SOURCES.wechat.action.search  + req.type + '&query=' + req.q + '&page=' + req.page
			break
		case 'article': // 通过文章地址抓取单篇文章
			param.path = SOURCES.wechat.action.article
			break
		default:
	}

	console.log(param)

	req = http.get(param, function(res) {
		let data = ''
		res.setEncoding('utf8')
		res.on('data',function(chunk) {
			data += chunk
		})
		res.on('end',function() {
			let response = {
				"isSucceeded": true,
				"data": {}
			}
			dataDispatcher(data, param.action, response, (res) => {success(res)})
		})
	})

	req.on('error', function(e) {
		console.log(e.message)
	})

	req.end()
}

function dataDispatcher(data, action, response, cb) {
	switch (action) {
		case 'hotwords':
			wxParser.hotWords(data, response, res => cb(res))
			break
		case 'toparticles':
			wxParser.articleList(data, response, res => cb(res))
			break
		case 'all':
			wxParser.all(data, response, res => cb(res))
			break
		case 'loadmorearticles':
			wxParser.articleList(data, response, res => cb(res))
			break
		case 'search':
			wxParser.articleList(data, response, res => cb(res))
			break
		case 'article':
			wxParser.article(data, response, res => cb(res))
			break
		default:
	}
}


module.exports = getResult
