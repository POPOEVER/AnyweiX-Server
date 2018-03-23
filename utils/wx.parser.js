const url = require('url')
const domParser = require('cheerio')

function hotWords(data, result, cb) {
	let $ = domParser.load(data)
	$('#topwords a').each((i,e) => {
		let keyword = $(e).text()
		result.data[result.data.length] = {
			"keyword": keyword
		}
	})
	cb(result)
}

function articleList(data, result, cb) {
	let $ = domParser.load(data)
	$('ul.news-list li').each((i,e) => {
		let titleObj = $(e).find('.txt-box h3 a')
		let link = titleObj.attr('href')
		let title = titleObj.text()
		let author = $(e).find('.s-p .account').text()
		let imgObj = $(e).find('.img-box img').length > 0 ? $(e).find('.img-box img') : $(e).find('.txt-box .img-d img').eq(0)
		let img = imgObj.attr('src')
		let query = url.parse(link,true).query
		result.data[result.data.length] = {
			"title": title,
			"author": author,
			"link": link,
			"image": img,
			"query": query
		}
	})
	cb(result)
}

module.exports = {
	articleList: articleList,
	hotWords: hotWords
}
