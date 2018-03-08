const http = require('http')
const cheerio = require('cheerio')

function getResult(req, success) {
	console.log(req)

	let param = 'http://weixin.sogou.com/weixin?type=' + req.Type + '&s_from=input&query=' + req.Keyword

	console.log(param)

	req = http.get(param, function(res) {

		let data = ''
		res.setEncoding('utf8')
		res.on('data',function(chunk) {
			data += chunk
		})
		res.on('end',function() {
			let result = {
				"isSucceeded": true,
				"data": []
			}
			let $ = cheerio.load(data)
			$('ul.news-list li').each(function(i, e) {
				result.data[result.data.length] = {
					// "imgUrl": $(e).find('.img-box a').attr('href'),
					"title": $(e).find('.txt-box h3 a').text(),
					"url": $(e).find('.txt-box h3 a').attr('href'),
					"author": $(e).find('.s-p .account').text()
				}
			})
			success(result)
		})
	})

	req.on('error', function(e) {
		console.log(e.message)
	})

	req.end()
}

module.exports = getResult
